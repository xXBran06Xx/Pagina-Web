// Indica que este archivo es un Client Component en Next.js
'use client'

// Importa React
import * as React from 'react'

// Importa el componente Drawer y sus partes desde la librería "vaul"
import { Drawer as DrawerPrimitive } from 'vaul'

// Importa la función utilitaria `cn` para combinar clases dinámicamente
import { cn } from '@/lib/utils'

// ---------- COMPONENTE PRINCIPAL DEL DRAWER ----------

// Componente raíz del Drawer
function Drawer({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  // Representa la raíz del Drawer con un atributo de identificación
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />
}

// ---------- TRIGGER DEL DRAWER ----------

// Botón o elemento que abre el Drawer
function DrawerTrigger({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />
}

// ---------- PORTAL DEL DRAWER ----------

// Renderiza el Drawer fuera del flujo normal del DOM
function DrawerPortal({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />
}

// ---------- BOTÓN DE CIERRE ----------

// Elemento que cierra el Drawer
function DrawerClose({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Close>) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />
}

// ---------- OVERLAY DEL DRAWER ----------

// Capa oscura que cubre el fondo cuando el Drawer está abierto
function DrawerOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      // Clases que controlan animaciones de entrada/salida y estilos del overlay
      className={cn(
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50',
        className,
      )}
      {...props}
    />
  )
}

// ---------- CONTENIDO DEL DRAWER ----------

// Contenedor principal del contenido del Drawer
function DrawerContent({
  className,
  children,  // Contenido que se muestra dentro del Drawer
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Content>) {
  return (
    <DrawerPortal data-slot="drawer-portal">
      {/* Overlay de fondo */}
      <DrawerOverlay />
      {/* Caja principal del Drawer */}
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        // Clases que definen la posición, tamaño, bordes y dirección de apertura del Drawer
        className={cn(
          'group/drawer-content bg-background fixed z-50 flex h-auto flex-col',
          // Posicionamiento cuando abre desde arriba
          'data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-lg data-[vaul-drawer-direction=top]:border-b',
          // Posicionamiento cuando abre desde abajo
          'data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-t-lg data-[vaul-drawer-direction=bottom]:border-t',
          // Posicionamiento cuando abre desde la derecha
          'data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=right]:sm:max-w-sm',
          // Posicionamiento cuando abre desde la izquierda
          'data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=left]:sm:max-w-sm',
          className,
        )}
        {...props}
      >
        {/* Barra indicadora (se muestra solo si el Drawer abre desde abajo) */}
        <div className="bg-muted mx-auto mt-4 hidden h-2 w-[100px] shrink-0 rounded-full group-data-[vaul-drawer-direction=bottom]/drawer-content:block" />
        {/* Contenido del Drawer */}
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  )
}

// ---------- HEADER DEL DRAWER ----------

// Encabezado del Drawer (usualmente para título o controles iniciales)
function DrawerHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="drawer-header"
      // Clases para definir alineación según la dirección de apertura
      className={cn(
        'flex flex-col gap-0.5 p-4 group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center group-data-[vaul-drawer-direction=top]/drawer-content:text-center md:gap-1.5 md:text-left',
        className,
      )}
      {...props}
    />
  )
}

// ---------- FOOTER DEL DRAWER ----------

// Pie del Drawer (normalmente botones de acción o información final)
function DrawerFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn('mt-auto flex flex-col gap-2 p-4', className)}
      {...props}
    />
  )
}

// ---------- TÍTULO DEL DRAWER ----------

// Título del Drawer
function DrawerTitle({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn('text-foreground font-semibold', className)}
      {...props}
    />
  )
}

// ---------- DESCRIPCIÓN DEL DRAWER ----------

// Texto descriptivo debajo del título
function DrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

// ---------- EXPORTACIÓN DE TODOS LOS COMPONENTES ----------

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}