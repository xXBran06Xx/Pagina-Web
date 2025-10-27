'use client'
// Esta directiva indica que este código se ejecuta en el cliente (navegador) en Next.js

// Inspirado en react-hot-toast
import * as React from 'react'
import type { ToastActionElement, ToastProps } from '@/components/ui/toast'

// Límite de notificaciones simultáneas - máximo número de toasts visibles a la vez
const TOAST_LIMIT = 1
// Tiempo en ms para remover un toast automáticamente después de ser descartado
const TOAST_REMOVE_DELAY = 1000000

// Definición del tipo de un toast en nuestro sistema - extiende las props básicas con campos adicionales
type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

// Tipos de acciones posibles que pueden dispatcharse al reducer
const actionTypes = {
  ADD_TOAST: 'ADD_TOAST',
  UPDATE_TOAST: 'UPDATE_TOAST',
  DISMISS_TOAST: 'DISMISS_TOAST',
  REMOVE_TOAST: 'REMOVE_TOAST',
} as const

// Contador para generar IDs únicos
let count = 0

// Generador de IDs únicos para cada toast
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

// Tipos para las acciones basados en las actionTypes
type ActionType = typeof actionTypes

// Unión de tipos para todas las acciones posibles que puede recibir el reducer
type Action =
  | { type: ActionType['ADD_TOAST']; toast: ToasterToast }
  | { type: ActionType['UPDATE_TOAST']; toast: Partial<ToasterToast> }
  | { type: ActionType['DISMISS_TOAST']; toastId?: ToasterToast['id'] }
  | { type: ActionType['REMOVE_TOAST']; toastId?: ToasterToast['id'] }

// Interfaz del estado global que almacena todos los toasts
interface State {
  toasts: ToasterToast[]
}

// Mapa de timeouts para eliminar toasts automáticamente después del delay
const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

// Agregar un toast a la cola de remoción automática después del delay configurado
const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) return // Evitar timeouts duplicados

  // Configurar timeout para remover el toast automáticamente
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId) // Limpiar el timeout del mapa
    dispatch({ type: 'REMOVE_TOAST', toastId }) // Dispatch acción de remover
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout) // Guardar referencia al timeout
}

// Reducer para manejar acciones y actualizar el estado de los toasts
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TOAST':
      // Agregar nuevo toast al inicio y limitar según TOAST_LIMIT
      return { ...state, toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT) }

    case 'UPDATE_TOAST':
      // Actualizar toast existente manteniendo sus propiedades y mergeando las nuevas
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case 'DISMISS_TOAST': {
      const { toastId } = action
      // Si hay un toastId específico, agregarlo a la cola de remoción
      // Si no, agregar todos los toasts a la cola de remoción
      if (toastId) addToRemoveQueue(toastId)
      else state.toasts.forEach((t) => addToRemoveQueue(t.id))

      // Marcar los toasts como cerrados (open: false)
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined ? { ...t, open: false } : t
        ),
      }
    }

    case 'REMOVE_TOAST':
      // Remover toast específico o limpiar todos los toasts
      if (action.toastId === undefined) return { ...state, toasts: [] }
      return { ...state, toasts: state.toasts.filter((t) => t.id !== action.toastId) }
  }
}

// Lista de listeners para actualizar componentes suscritos cuando cambia el estado
const listeners: Array<(state: State) => void> = []
// Estado en memoria que actúa como store global
let memoryState: State = { toasts: [] }

// Dispatcher para ejecutar acciones y notificar a todos los listeners
function dispatch(action: Action) {
  memoryState = reducer(memoryState, action) // Actualizar estado global
  listeners.forEach((listener) => listener(memoryState)) // Notificar a todos los componentes suscritos
}

// Tipo simplificado de toast sin id (para la API pública)
type Toast = Omit<ToasterToast, 'id'>

// Función principal para crear un toast - API pública
function toast({ ...props }: Toast) {
  const id = genId() // Generar ID único para este toast

  // Función para actualizar este toast específico
  const update = (props: ToasterToast) =>
    dispatch({ type: 'UPDATE_TOAST', toast: { ...props, id } })
  
  // Función para descartar este toast específico
  const dismiss = () => dispatch({ type: 'DISMISS_TOAST', toastId: id })

  // Dispatch acción para agregar el nuevo toast
  dispatch({
    type: 'ADD_TOAST',
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        // Callback cuando cambia el estado open (ej: usuario hace clic en cerrar)
        if (!open) dismiss() // Si se cierra, disparar acción de dismiss
      },
    },
  })

  return { id, dismiss, update } // Devolver API para controlar este toast
}

// Hook para usar toasts dentro de componentes React
function useToast() {
  // Estado local del componente que se sincroniza con el estado global
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    // Al montar el componente, agregar setState a la lista de listeners
    listeners.push(setState)
    return () => {
      // Al desmontar, remover el listener para evitar memory leaks
      const index = listeners.indexOf(setState)
      if (index > -1) listeners.splice(index, 1)
    }
  }, [state])

  // Devolver estado actual y funciones para interactuar con el sistema de toasts
  return {
    ...state,
    toast, // Función para crear nuevos toasts
    dismiss: (toastId?: string) => dispatch({ type: 'DISMISS_TOAST', toastId }), // Función para descartar toasts
  }
}

export { useToast, toast } // Exportar hook y función principal
