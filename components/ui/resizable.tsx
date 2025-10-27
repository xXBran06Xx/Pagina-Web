'use client' // Indica que este código se ejecuta en el cliente

import * as React from 'react' // Importa React
import { GripVerticalIcon } from 'lucide-react' // Importa el ícono de grip vertical
import * as ResizablePrimitive from 'react-resizable-panels' // Importa los componentes de paneles redimensionables
import { cn } from '@/lib/utils' // Importa función utilitaria para combinar clases

// Componente que agrupa paneles redimensionables
function ResizablePanelGroup({
  className, // Clases CSS adicionales
  ...props // Todas las demás props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) {
  return (
    <ResizablePrimitive.PanelGroup
      data-slot="resizable-panel-group" // Identificador para el slot
      className={cn(
        // Estilos base para el contenedor de paneles
        'flex h-full w-full data-[panel-group-direction=vertical]:flex-col',
        className, // Mezcla con clases personalizadas
      )}
      {...props} // Pasa las props al PanelGroup
    />
  )
}

// Componente que representa un panel redimensionable individual
function ResizablePanel({
  ...props // Todas las props del panel
}: React.ComponentProps<typeof ResizablePrimitive.Panel>) {
  return (
    <ResizablePrimitive.Panel
      data-slot="resizable-panel" // Identificador del slot
      {...props} // Pasa las props al Panel
    />
  )
}

// Componente que representa el manejador para redimensionar los paneles
function ResizableHandle({
  withHandle, // Indica si se debe mostrar un ícono en el manejador
  className, // Clases adicionales
  ...props // Todas las demás props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean // Prop extra para decidir si se muestra el ícono
}) {
  return (
    <ResizablePrimitive.PanelResizeHandle
      data-slot="resizable-handle" // Identificador para el slot
      className={cn(
        // Estilos para la barra que sirve de manejador
        'bg-border focus-visible:ring-ring relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-hidden data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:translate-x-0 data-[panel-group-direction=vertical]:after:-translate-y-1/2 [&[data-panel-group-direction=vertical]>div]:rotate-90',
        className, // Combina con clases adicionales
      )}
      {...props} // Pasa props al manejador
    >
      {/* Si la prop withHandle es true, se renderiza el ícono dentro */}
      {withHandle && (
        <div className="bg-border z-10 flex h-4 w-3 items-center justify-center rounded-xs border">
          <GripVerticalIcon className="size-2.5" /> {/* Ícono que indica que se puede arrastrar */}
        </div>
      )}
    </ResizablePrimitive.PanelResizeHandle>
  )
}

// Exporta los tres componentes
export { ResizablePanelGroup, ResizablePanel, ResizableHandle }