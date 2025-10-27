"use client" // Indica que este componente se ejecuta en el cliente (Next.js)

import * as React from "react" // Importa React
import * as LabelPrimitive from "@radix-ui/react-label" // Importa el componente base Label de Radix
import { cva, type VariantProps } from "class-variance-authority" 
// cva permite definir estilos con variantes; VariantProps tipa esas variantes

import { cn } from "@/lib/utils" // Función para combinar clases CSS dinámicamente

// Se definen las clases base para el label con cva (class variance authority)
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>, // Tipo de referencia que apunta al elemento raíz de Radix Label
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants> // Props que acepta el Label
>(
  ({ className, ...props }, ref) => (
    // Se construye el Label con Radix y se combinan las clases
    <LabelPrimitive.Root
      ref={ref} // ForwardRef permite pasar la referencia al componente base
      className={cn(labelVariants(), className)} // Aplica las clases de labelVariants + posibles clases externas
      {...props} // Pasa todas las props adicionales
    />
  )
)

// Se define un nombre de display para que aparezca correctamente en herramientas de depuración
Label.displayName = LabelPrimitive.Root.displayName

export { Label } // Exporta el componente Label para usarlo en el proyecto