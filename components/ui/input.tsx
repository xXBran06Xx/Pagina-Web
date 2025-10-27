import * as React from 'react' // Importa React para poder usar JSX y componentes

import { cn } from '@/lib/utils' // Importa la función cn para combinar clases condicionalmente

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  // Componente Input que envuelve un <input> HTML y le aplica estilos predeterminados
  return (
    <input
      type={type} // Define el tipo de input (text, password, email, file, etc.)
      data-slot="input" // Atributo personalizado para identificar el slot de input
      className={cn(
        // Estilos base aplicados al input
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        // Estilos adicionales para estados de enfoque
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        // Estilos cuando hay errores de validación (aria-invalid)
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        // Clases extra recibidas desde fuera
        className,
      )}
      {...props} // Propaga todas las demás propiedades (onChange, value, etc.)
    />
  )
}

export { Input } // Exporta el componente para usarlo en otras partes del proyecto