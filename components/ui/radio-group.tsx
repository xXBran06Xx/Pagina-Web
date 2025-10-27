'use client' // Indica que este archivo se ejecuta en el cliente (no en el servidor)

import * as React from 'react' // Importa todo React
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group' // Importa todos los componentes de grupo de radio de Radix UI
import { CircleIcon } from 'lucide-react' // Importa el ícono de círculo de lucide-react

import { cn } from '@/lib/utils' // Importa la función utilitaria 'cn' para combinar clases CSS

// Componente RadioGroup que representa un grupo de botones de opción (radio buttons)
function RadioGroup({
  className, // Clases adicionales que se pueden pasar como prop
  ...props // Todas las demás props del componente Root
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group" // Atributo de datos para identificar el slot
      className={cn('grid gap-3', className)} // Aplica estilos base y combina con className recibido
      {...props} // Pasa todas las demás props al componente Root
    />
  )
}

// Componente RadioGroupItem que representa cada botón de opción dentro del grupo
function RadioGroupItem({
  className, // Clases adicionales pasadas al item
  ...props // Todas las demás props del componente Item
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item" // Atributo de datos para identificar el slot del ítem
      className={cn(
        // Estilos por defecto para el ítem del radio button
        'border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
        className, // Combina con clases personalizadas pasadas como prop
      )}
      {...props} // Pasa todas las demás props al componente Item
    >
      {/* Indicador visual del radio button cuando está seleccionado */}
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator" // Identifica el slot del indicador
        className="relative flex items-center justify-center" // Centra el ícono dentro del ítem
      >
        {/* Ícono de círculo que aparece en el centro cuando el radio está activo */}
        <CircleIcon className="fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

// Exporta los componentes para que puedan usarse en otros archivos
export { RadioGroup, RadioGroupItem }