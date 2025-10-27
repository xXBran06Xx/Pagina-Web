'use client' // Marca este archivo como Client Component en Next.js (se ejecuta en el navegador)

import * as React from 'react' // Importa React para usar JSX y hooks
import * as LabelPrimitive from '@radix-ui/react-label' // Importa primitives de Label desde Radix
import { Slot } from '@radix-ui/react-slot' // Importa Slot para componer controles desde Radix
import { // Importa utilidades y tipos de react-hook-form
  Controller,
  FormProvider,
  useFormContext,
  useFormState,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form' // Fin de la importación desde react-hook-form

import { cn } from '@/lib/utils' // Importa helper para concatenar clases CSS
import { Label } from '@/components/ui/label' // Importa componente Label personalizado

const Form = FormProvider // Crea un alias "Form" para usar FormProvider más cómodo

type FormFieldContextValue< // Declara el tipo genérico para el contexto de un campo del formulario
  TFieldValues extends FieldValues = FieldValues, // Parámetro genérico TFieldValues con valor por defecto
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>, // Parámetro genérico TName con default
> = {
  name: TName // El contexto contiene el nombre del campo (clave del form)
} // Cierre del tipo FormFieldContextValue

const FormFieldContext = React.createContext<FormFieldContextValue>( // Crea el contexto para el campo del formulario
  {} as FormFieldContextValue, // Inicializa con un cast vacío para evitar null checks en tiempo de compilación
) // Fin de la creación del contexto FormFieldContext

type FormItemContextValue = { // Declara el tipo para el contexto del ítem de formulario
  id: string // El contexto del ítem contiene un id único
} // Cierra el tipo FormItemContextValue

const FormItemContext = React.createContext<FormItemContextValue>( // Crea el contexto para el item del formulario
  {} as FormItemContextValue, // Inicializa con cast vacío
) // Fin de la creación del contexto FormItemContext

const useFormField = () => { // Hook personalizado para exponer info útil del campo y su estado
  const fieldContext = React.useContext(FormFieldContext) // Obtiene el contexto del campo
  const itemContext = React.useContext(FormItemContext) // Obtiene el contexto del ítem
  const { getFieldState } = useFormContext() // Extrae la función getFieldState del contexto global del form
  const formState = useFormState({ name: fieldContext.name }) // Obtiene el state del formulario para el campo dado
  const fieldState = getFieldState(fieldContext.name, formState) // Recupera el estado puntual del campo (error, touched, etc.)

  if (!fieldContext) { // Si no hay contexto de campo
    throw new Error('useFormField should be used within <FormField>') // Lanza error instructivo
  } // Fin del chequeo de existencia de contexto

  const { id } = itemContext // Extrae el id generado por el FormItem

  return { // Devuelve un objeto con identificadores y estado relevante del campo
    id, // id del FormItem
    name: fieldContext.name, // nombre del campo
    formItemId: `${id}-form-item`, // id accesible del contenedor del campo
    formDescriptionId: `${id}-form-item-description`, // id para la descripción del campo
    formMessageId: `${id}-form-item-message`, // id para mensajes (errores) del campo
    ...fieldState, // propaga el estado real del campo (error, isTouched, etc.)
  } // Fin del return del hook
} // Cierra useFormField

const FormField = < // Componente que envuelve Controller y provee el contexto del campo
  TFieldValues extends FieldValues = FieldValues, // Genérico del valor del formulario
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>, // Genérico del nombre del campo
>({ // Inicio de props del FormField (las mismas que Controller)
  ...props // Recibe todas las props de Controller
}: ControllerProps<TFieldValues, TName>) => { // Tipo de props: ControllerProps
  return ( // Renderiza el provider y el Controller de react-hook-form
    <FormFieldContext.Provider value={{ name: props.name }}> // Provee el name del campo vía contexto
      <Controller {...props} /> // Renderiza Controller con las props recibidas
    </FormFieldContext.Provider> // Cierra el provider
  ) // Fin del retorno JSX
} // Cierra FormField

function FormItem({ className, ...props }: React.ComponentProps<'div'>) { // Componente que envuelve un ítem del form y genera un id único
  const id = React.useId() // Genera un id único por instancia (React 18)

  return ( // Renderiza el provider del item y el div contenedor
    <FormItemContext.Provider value={{ id }}> // Provee el id generado al contexto de item
      <div
        data-slot="form-item" // Atributo data-slot para localización o pruebas
        className={cn('grid gap-2', className)} // Aplica clases por defecto más las pasadas por props
        {...props} // Propaga el resto de props al div
      /> // Cierre del div auto-contenido
    </FormItemContext.Provider> // Cierra el provider del item
  ) // Fin del return
} // Cierra FormItem

function FormLabel({ // Componente que renderiza la etiqueta vinculada al campo
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) { // Props tipo Radix Label Root
  const { error, formItemId } = useFormField() // Obtiene si hay error y el id del item desde el hook

  return ( // Renderiza el Label estilizado
    <Label
      data-slot="form-label" // Data-slot para seguir convención
      data-error={!!error} // Marca si hay error (true/false)
      className={cn('data-[error=true]:text-destructive', className)} // Añade clase si hay error
      htmlFor={formItemId} // Asocia el label al id del control
      {...props} // Propaga restantes props
    /> // Cierre del Label
  ) // Fin del return
} // Cierra FormLabel

function FormControl({ ...props }: React.ComponentProps<typeof Slot>) { // Wrapper que conecta el control al form (usa Slot para composability)
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField() // Extrae ids y estado del campo

  return ( // Renderiza el Slot con atributos ARIA apropiados
    <Slot
      data-slot="form-control" // Identificador del slot
      id={formItemId} // Asigna el id del item al control
      aria-describedby={ // Construye aria-describedby según si hay error o no
        !error
          ? `${formDescriptionId}` // Si no hay error, referencia solo la descripción
          : `${formDescriptionId} ${formMessageId}` // Si hay error, referencia descripción + mensaje
      }
      aria-invalid={!!error} // Marca el control como inválido si existe error
      {...props} // Propaga props al Slot (ej: input, select, etc.)
    /> // Cierre del Slot
  ) // Fin del return
} // Cierra FormControl

function FormDescription({ className, ...props }: React.ComponentProps<'p'>) { // Componente para la descripción del campo
  const { formDescriptionId } = useFormField() // Obtiene el id de la descripción

  return ( // Renderiza un párrafo con el id y clases por defecto
    <p
      data-slot="form-description" // Data-slot para identificar el elemento
      id={formDescriptionId} // Asigna el id generado
      className={cn('text-muted-foreground text-sm', className)} // Estilos base + custom
      {...props} // Propaga resto de props (children, aria, etc.)
    /> // Cierre del párrafo
  ) // Fin del return
} // Cierra FormDescription

function FormMessage({ className, ...props }: React.ComponentProps<'p'>) { // Componente para mostrar mensajes (errores o custom)
  const { error, formMessageId } = useFormField() // Obtiene el error actual y el id del mensaje
  const body = error ? String(error?.message ?? '') : props.children // Define el contenido: mensaje de error o children

  if (!body) { // Si no hay contenido para mostrar
    return null // No renderiza nada
  } // Fin del chequeo de body

  return ( // Si existe body, renderiza el párrafo con el mensaje
    <p
      data-slot="form-message" // Data-slot para identificar el mensaje
      id={formMessageId} // Asigna id del mensaje
      className={cn('text-destructive text-sm', className)} // Aplica estilo de error por defecto + custom
      {...props} // Propaga props (ej: children ya aplicado)
    >
      {body} {/* Inserta el texto calculado */}
    </p> // Cierre del párrafo
  ) // Fin del return con body
} // Cierra FormMessage

export { // Exporta utilidades y componentes para uso externo
  useFormField, // Hook para obtener información del campo
  Form, // Alias de FormProvider
  FormItem, // Componente contenedor del item
  FormLabel, // Componente label ligado al item
  FormControl, // Slot para el control ligado
  FormDescription, // Descripción del campo
  FormMessage, // Mensaje / error del campo
  FormField, // Componente que provee Controller + contexto del campo
} // Fin de exportaciones