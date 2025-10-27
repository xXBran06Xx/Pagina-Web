import * as React from "react" // Importa React
import { cn } from "@/lib/utils" // Función para concatenar clases condicionalmente

// Define las props del Textarea, extendiendo las props estándar de HTML
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

// Componente Textarea con forwardRef
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref} // Permite acceder al elemento DOM desde el padre
        className={cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", // Estilos base del textarea
          className, // Permite añadir clases adicionales desde el padre
        )}
        {...props} // Pasa todas las demás props (value, onChange, etc.)
      />
    )
  }
)
Textarea.displayName = "Textarea" // Nombre para debugging en React DevTools

export { Textarea } // Exporta el componente