'use client'  
// Este archivo se ejecuta del lado del cliente en Next.js.
// Requerido porque los componentes de Radix UI son interactivos y usan eventos del navegador.

// ---------------------------------------------------------
// Importaciones necesarias
// ---------------------------------------------------------
import * as React from 'react'
// Importamos todos los componentes primitivos de AlertDialog desde Radix UI
// (Root, Trigger, Portal, Overlay, Content, Title, Description, etc.)
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'

// Función utilitaria para concatenar clases de forma condicional
import { cn } from '@/lib/utils'

// Estilos predefinidos para botones que se reutilizan aquí
import { buttonVariants } from '@/components/ui/button'

// ---------------------------------------------------------
// Componente principal: AlertDialog
// Contenedor raíz que envuelve toda la lógica del modal
// ---------------------------------------------------------
function AlertDialog({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Root>) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />
}

// ---------------------------------------------------------
// Trigger (disparador)
// Botón u otro elemento que abre el diálogo al interactuar con él
// ---------------------------------------------------------
function AlertDialogTrigger({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>) {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
  )
}

// ---------------------------------------------------------
// Portal
// Renderiza el contenido del diálogo fuera de la jerarquía DOM normal
// para evitar problemas de stacking (z-index) y estilos
// ---------------------------------------------------------
function AlertDialogPortal({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Portal>) {
  return (
    <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
  )
}

// ---------------------------------------------------------
// Overlay
// Fondo semitransparente detrás del diálogo (oscurece el resto de la pantalla)
// ---------------------------------------------------------
function AlertDialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Overlay>) {
  return (
    <AlertDialogPrimitive.Overlay
      data-slot="alert-dialog-overlay"
      className={cn(
        // Animaciones al abrir/cerrar (fade in/out)
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        // Cubre toda la pantalla con fondo negro semi-transparente
        'fixed inset-0 z-50 bg-black/50',
        className,
      )}
      {...props}
    />
  )
}

// ---------------------------------------------------------
// Content
// Caja principal del diálogo (ventana flotante con título, texto y botones)
// ---------------------------------------------------------
function AlertDialogContent({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Content>) {
  return (
    <AlertDialogPortal>
      {/* Incluye el overlay detrás */}
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        data-slot="alert-dialog-content"
        className={cn(
          // Fondo y estilos de la tarjeta principal
          'bg-background',
          // Animaciones de entrada y salida (fade y zoom)
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          // Posicionamiento centrado absoluto en pantalla
          'fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]',
          // Estilos visuales: borde, sombra, padding, radios, spacing
          'z-50 grid w-full max-w-[calc(100%-2rem)] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg',
          className,
        )}
        {...props}
      />
    </AlertDialogPortal>
  )
}

// ---------------------------------------------------------
// Header
// Encabezado del diálogo (generalmente contiene el título)
// ---------------------------------------------------------
function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn('flex flex-col gap-2 text-center sm:text-left', className)}
      {...props}
    />
  )
}

// ---------------------------------------------------------
// Footer
// Pie del diálogo (usualmente con botones de acción/cancelar)
// ---------------------------------------------------------
function AlertDialogFooter({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        // En móvil: botones en columna invertida
        'flex flex-col-reverse gap-2',
        // En desktop: botones en fila alineados a la derecha
        'sm:flex-row sm:justify-end',
        className,
      )}
      {...props}
    />
  )
}

// ---------------------------------------------------------
// Title
// Texto principal del diálogo (título grande)
// ---------------------------------------------------------
function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn('text-lg font-semibold', className)}
      {...props}
    />
  )
}

// ---------------------------------------------------------
// Description
// Texto secundario que explica el propósito del diálogo
// ---------------------------------------------------------
function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

// ---------------------------------------------------------
// Action
// Botón que confirma la acción principal (ejemplo: "Eliminar")
// Usa estilos de botón por defecto
// ---------------------------------------------------------
function AlertDialogAction({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Action>) {
  return (
    <AlertDialogPrimitive.Action
      className={cn(buttonVariants(), className)}
      {...props}
    />
  )
}

// ---------------------------------------------------------
// Cancel
// Botón secundario que cancela la acción
// Usa estilos de botón variante "outline"
// ---------------------------------------------------------
function AlertDialogCancel({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Cancel>) {
  return (
    <AlertDialogPrimitive.Cancel
      className={cn(buttonVariants({ variant: 'outline' }), className)}
      {...props}
    />
  )
}

// ---------------------------------------------------------
// Exportamos todos los subcomponentes del AlertDialog
// ---------------------------------------------------------
export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}

