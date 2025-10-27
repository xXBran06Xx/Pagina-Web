'use client' // Indica que el componente se ejecuta del lado del cliente

import * as React from 'react' // Importa React
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area' // Importa los componentes base de scroll de Radix
import { cn } from '@/lib/utils' // Utilidad para combinar clases

// Contenedor principal del área de scroll
function ScrollArea({
  className, // Clases personalizadas
  children, // Contenido que se va a desplazar
  ...props // Otras props del componente
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area" // Marca identificadora
      className={cn('relative', className)} // Aplica estilos base y personalizados
      {...props}
    >
      {/* Vista donde se renderiza el contenido scrolleable */}
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className="focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>

      {/* Barra de desplazamiento */}
      <ScrollBar />

      {/* Esquina donde se cruzan barras vertical y horizontal */}
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

// Barra de desplazamiento reutilizable
function ScrollBar({
  className, // Clases personalizadas
  orientation = 'vertical', // Dirección por defecto vertical
  ...props // Otras props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar" // Marca identificadora
      orientation={orientation} // Define la orientación
      className={cn(
        'flex touch-none p-px transition-colors select-none', // Estilos base
        orientation === 'vertical' && 'h-full w-2.5 border-l border-l-transparent', // Estilos si es vertical
        orientation === 'horizontal' && 'h-2.5 flex-col border-t border-t-transparent', // Estilos si es horizontal
        className, // Clases personalizadas
      )}
      {...props}
    >
      {/* Indicador de la posición actual dentro del scroll */}
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className="bg-border relative flex-1 rounded-full"
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
}

// Exporta los componentes
export { ScrollArea, ScrollBar }