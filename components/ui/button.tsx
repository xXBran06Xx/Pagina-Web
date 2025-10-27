import * as React from 'react'
import { Slot } from '@radix-ui/react-slot' 
// 👉 `Slot`: permite reemplazar el elemento raíz por otro (por ejemplo, <a> en lugar de <button>)
import { cva, type VariantProps } from 'class-variance-authority' 
// 👉 `cva`: utilidad para definir clases CSS variantes (colores, tamaños, estilos dinámicos)

import { cn } from '@/lib/utils' 
// 👉 `cn`: función para combinar múltiples clases en una sola cadena

// ---------- Variantes del botón definidas con `cva` ----------
const buttonVariants = cva(
  // 👉 Clases base comunes a todos los botones
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      // ---------- Estilos por variante visual ----------
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      // ---------- Estilos por tamaño ----------
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9', // 👉 Para botones solo con ícono (cuadrado)
      },
    },
    // ---------- Valores por defecto ----------
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

// ---------- Componente Button ----------
function Button({
  className,
  variant,
  size,
  asChild = false, // 👉 Si `true`, renderiza el Slot en vez de un <button>
  ...props
}: React.ComponentProps<'button'> & // 👉 Todas las props válidas de un <button>
  VariantProps<typeof buttonVariants> & { // 👉 Props para variantes (variant, size)
    asChild?: boolean
  }) {
  // 👉 Decide si usar <button> o un `Slot` (para mayor flexibilidad)
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))} 
      // 👉 Aplica las clases generadas dinámicamente según las props
      {...props}
    />
  )
}

// ---------- Exportaciones ----------
export { Button, buttonVariants }