"use client" // Indica que este archivo se ejecuta en el cliente (no en el servidor)

import * as React from "react" // Importa todo React
import * as ProgressPrimitive from "@radix-ui/react-progress" // Importa todos los componentes de progreso de Radix UI

import { cn } from "@/lib/utils" // Importa la función utilitaria 'cn' para combinar clases CSS

// Crea un componente Progress con forwardRef (permite que el padre acceda a la referencia del DOM interno)
const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>, // Define el tipo de referencia que apunta al elemento Root de Radix
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> // Acepta todas las props del componente Root sin necesidad de referencia
>(
  // Definición del componente que recibe props, className y ref
  ({ className, value, ...props }, ref) => (
    // Componente raíz del progreso
    <ProgressPrimitive.Root
      ref={ref} // Pasa la referencia al componente Root
      className={cn( // Combina las clases CSS predeterminadas con las recibidas por props
        "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
        className
      )}
      {...props} // Pasa todas las demás props al Root
    >
      {/* Indicador de progreso dentro de la barra */}
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1 bg-primary transition-all" // Estilos de la barra interna
        style={{
          // Calcula el desplazamiento en X según el valor recibido
          transform: `translateX(-${100 - (value || 0)}%)`
        }}
      />
    </ProgressPrimitive.Root>
  )
)

// Define el nombre del componente para depuración en React DevTools
Progress.displayName = ProgressPrimitive.Root.displayName

// Exporta el componente Progress para usarlo en otros archivos
export { Progress }