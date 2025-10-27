'use client' // Indica que este componente se ejecuta en el cliente (Next.js)

import * as React from 'react' // Importa React
import * as HoverCardPrimitive from '@radix-ui/react-hover-card' // Importa el componente base HoverCard de Radix

import { cn } from '@/lib/utils' // Función para combinar clases CSS dinámicamente

function HoverCard({
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Root>) {
  // Componente que envuelve al HoverCard de Radix y le agrega un data-slot para identificación
  return <HoverCardPrimitive.Root data-slot="hover-card" {...props} />
}

function HoverCardTrigger({
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Trigger>) {
  // Define el disparador del HoverCard (lo que el usuario pasa el mouse encima)
  return (
    <HoverCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />
  )
}

function HoverCardContent({
  className,
  align = 'center',
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Content>) {
  // Define el contenido que aparece al hacer hover sobre el trigger
  return (
    <HoverCardPrimitive.Portal data-slot="hover-card-portal">
      <HoverCardPrimitive.Content
        data-slot="hover-card-content"
        align={align} // Alineación del contenido (por defecto centrado)
        sideOffset={sideOffset} // Espaciado entre el trigger y el contenido
        className={cn(
          // Clases para estilos, animaciones y posición
          'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-64 origin-(--radix-hover-card-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden',
          className, // Permite añadir clases extra desde fuera
        )}
        {...props} // Propaga las demás propiedades
      />
    </HoverCardPrimitive.Portal>
  )
}

export { HoverCard, HoverCardTrigger, HoverCardContent } // Exporta los componentes para usarlos en otros lugares