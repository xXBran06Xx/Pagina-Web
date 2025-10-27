'use client' // Indica que este componente se renderiza en el cliente (Next.js)

import * as React from 'react' // Importa React
import * as SwitchPrimitive from '@radix-ui/react-switch' // Importa el componente Switch de Radix

import { cn } from '@/lib/utils' // Importa la función cn para concatenar clases condicionales

// Componente Switch personalizado
function Switch({
  className, // Clase CSS adicional opcional
  ...props // Todas las demás props del componente Radix Switch
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch" // Identificador de slot para estilo o testing
      className={cn(
        'peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
        className, // Se agregan clases externas si se pasan
      )}
      {...props} // Propagamos todas las props al componente Radix
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb" // Identificador del thumb (el círculo móvil)
        className={
          'bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0'
        } // Estilos del thumb y animación al cambiar de estado
      />
    </SwitchPrimitive.Root>
  )
}

// Exporta el componente para usarlo en otras partes de la app
export { Switch }