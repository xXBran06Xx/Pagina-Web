'use client'

import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox' // Librería Radix UI (Checkbox accesible)
import { CheckIcon } from 'lucide-react' // Icono de check (Lucide)

import { cn } from '@/lib/utils' // Utilidad para concatenar clases condicionalmente

// Componente Checkbox personalizado
function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      // Clases de estilo del checkbox base
      className={cn(
        'peer border-input dark:bg-input/30 
         data-[state=checked]:bg-primary 
         data-[state=checked]:text-primary-foreground 
         dark:data-[state=checked]:bg-primary 
         data-[state=checked]:border-primary 
         focus-visible:border-ring focus-visible:ring-ring/50 
         aria-invalid:ring-destructive/20 
         dark:aria-invalid:ring-destructive/40 
         aria-invalid:border-destructive 
         size-4 shrink-0 rounded-[4px] border shadow-xs 
         transition-shadow outline-none focus-visible:ring-[3px] 
         disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props} // Props extra (ej: checked, onCheckedChange, etc.)
    >
      {/* Indicador que se muestra cuando está marcado */}
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        {/* Icono de check */}
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }

