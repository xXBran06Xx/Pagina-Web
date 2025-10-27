'use client'

import { useToast } from '@/hooks/use-toast'
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/toast'
import React from 'react'

// Componente Toaster que muestra todos los toasts activos
export function Toaster() {
  const { toasts } = useToast() // Hook personalizado que retorna los toasts actuales

  return (
    // Proveedor de Toasts que maneja el contexto y animaciones
    <ToastProvider>
      {/* Mapea todos los toasts */}
      {toasts.map(({ id, title, description, action, ...props }) => (
        <Toast key={id} {...props}>
          {/* Contenedor del contenido principal del toast */}
          <div className="grid gap-1">
            {/* Mostrar título si existe */}
            {title && <ToastTitle>{title}</ToastTitle>}

            {/* Mostrar descripción si existe */}
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>

          {/* Mostrar acción solo si es un elemento React válido */}
          {action && React.isValidElement(action) && action}

          {/* Botón de cerrar toast */}
          <ToastClose />
        </Toast>
      ))}

      {/* Contenedor de los toasts en pantalla */}
      <ToastViewport />
    </ToastProvider>
  )
}