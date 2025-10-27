import type * as React from "react"
import { cva, type VariantProps } from "class-variance-authority" 
// 👉 `cva` = utilidad para definir variantes de clases CSS de forma declarativa y tipada

import { cn } from "@/lib/utils" 
// 👉 `cn` = función que combina clases dinámicamente (similar a clsx)

// ---------- Definición de estilos base y variantes para Badge ----------
const badgeVariants = cva(
  // Clases base que SIEMPRE se aplican al badge
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      // Aquí definimos las variantes disponibles del componente
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground", // Solo borde y texto sin fondo
      },
    },
    // Valor por defecto si no se especifica ninguna variante
    defaultVariants: {
      variant: "default",
    },
  },
)

// ---------- Tipado de las props ----------
export interface BadgeProps 
  extends React.HTMLAttributes<HTMLDivElement>, // Acepta todas las props normales de un <div>
    VariantProps<typeof badgeVariants> {}       // Y además acepta la prop `variant`

// ---------- Componente Badge ----------
function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div
      // Generamos dinámicamente las clases a partir de la variante elegida
      className={cn(badgeVariants({ variant }), className)}
      {...props} // Permite pasar cualquier otra prop válida para <div> (ej: onClick, id, etc.)
    />
  )
}

// Exportamos el componente y las variantes
export { Badge, badgeVariants }