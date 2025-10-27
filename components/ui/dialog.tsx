// Indica que este archivo es un Client Component en Next.js
'use client'

// Importa React
import * as React from 'react'

// Importa todas las funcionalidades de diálogo de la librería Radix UI
import * as DialogPrimitive from '@radix-ui/react-dialog'

// Importa el ícono de "X" (cerrar) desde la librería de íconos lucide-react
import { XIcon } from 'lucide-react'

// Importa la función utilitaria `cn` que combina clases de CSS dinámicamente
import { cn } from '@/lib/utils'

// ---------- COMPONENTE PRINCIPAL DEL DIÁLOGO ----------

// Define el componente `Dialog` que envuelve la raíz del diálogo de Radix
function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  // Retorna el componente raíz de Radix con un atributo extra `data-slot`
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

// ---------- COMPONENTES RELACIONADOS CON EL TRIGGER ----------

// Define el componente `DialogTrigger` que actúa como el botón/disparador para abrir el diálogo
function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

// ---------- PORTAL DEL DIÁLOGO ----------

// Define el componente `DialogPortal`, que renderiza el contenido del diálogo fuera del flujo normal del DOM
function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

// ---------- BOTÓN DE CIERRE ----------

// Define el componente `DialogClose` que actúa como botón para cerrar el diálogo
function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

// ---------- OVERLAY DEL DIÁLOGO ----------

// Define el componente `DialogOverlay` que cubre el fondo cuando el diálogo está abierto
function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      // Aplica clases para la animación y estilos del overlay oscuro
      className={cn(
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50',
        className,
      )}
      {...props}
    />
  )
}

// ---------- CONTENIDO DEL DIÁLOGO ----------

// Define el componente `DialogContent` que contiene el contenido del modal
function DialogContent({
  className,
  children,            // Contenido que se mostrará dentro del modal
  showCloseButton = true, // Booleano que indica si mostrar o no el botón de cerrar
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean
}) {
  return (
    // El contenido siempre se renderiza dentro de un Portal
    <DialogPortal data-slot="dialog-portal">
      {/* Overlay que cubre el fondo */}
      <DialogOverlay />
      {/* Contenedor principal del contenido del diálogo */}
      <DialogPrimitive.Content
        data-slot="dialog-content"
        // Clases para el estilo, animaciones y posicionamiento del modal
        className={cn(
          'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg',
          className,
        )}
        {...props}
      >
        {/* Aquí se renderizan los elementos hijos pasados al diálogo */}
        {children}

        {/* Si está activada la opción, se muestra el botón de cerrar en la esquina */}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            // Clases que definen posición, accesibilidad y estilos del botón de cerrar
            className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
          >
            {/* Ícono de "X" dentro del botón */}
            <XIcon />
            {/* Texto oculto para accesibilidad (lectores de pantalla) */}
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

// ---------- HEADER DEL DIÁLOGO ----------

// Componente para el encabezado del diálogo
function DialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-header"
      // Clases que definen un diseño en columna y centrado
      className={cn('flex flex-col gap-2 text-center sm:text-left', className)}
      {...props}
    />
  )
}

// ---------- FOOTER DEL DIÁLOGO ----------

// Componente para el pie del diálogo (normalmente para botones de acción)
function DialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-footer"
      // En pantallas pequeñas: botones en columna invertida. En pantallas grandes: alineados a la derecha
      className={cn(
        'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
        className,
      )}
      {...props}
    />
  )
}

// ---------- TÍTULO DEL DIÁLOGO ----------

// Componente que representa el título del diálogo
function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      // Clases para estilo tipográfico del título
      className={cn('text-lg leading-none font-semibold', className)}
      {...props}
    />
  )
}

// ---------- DESCRIPCIÓN DEL DIÁLOGO ----------

// Componente que muestra una descripción del diálogo debajo del título
function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      // Clases para un texto secundario más pequeño
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

// ---------- EXPORTACIÓN DE TODOS LOS COMPONENTES ----------

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}