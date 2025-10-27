'use client'

// Importa todas las utilidades de React
import * as React from 'react'

// Importa los componentes de popover desde Radix UI
import * as PopoverPrimitive from '@radix-ui/react-popover'

// Importa la función cn para concatenar clases condicionalmente
import { cn } from '@/lib/utils'

// Componente raíz del Popover
function Popover({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  // Renderiza el componente Root de Radix para Popover
  return <PopoverPrimitive.Root data-slot="popover" {...props} />
}

// Componente que actúa como disparador del Popover (el botón o elemento que lo abre)
function PopoverTrigger({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

// Contenido del Popover, es lo que se muestra al activarse
function PopoverContent({
  className,
  align = 'center',   // Alineación del contenido (por defecto centrado)
  sideOffset = 4,     // Separación respecto al trigger
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal> {/* Se renderiza en un portal para evitar problemas de stacking */}
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}                 // Alineación configurada
        sideOffset={sideOffset}       // Offset lateral
        className={cn(
          // Estilos por defecto + animaciones según el estado (abrir/cerrar)
          'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden',
          className, // Permite agregar clases extra
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
}

// Ancla opcional que permite posicionar el Popover relativo a otro elemento
function PopoverAnchor({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />
}

// Exporta todos los componentes relacionados con el Popover
export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }