'use client' 
// 👉 Esto indica que el componente es "client-side" en Next.js (usa interactividad).

// Importamos todo el namespace de AspectRatio de Radix UI
import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio'

// Definimos el componente `AspectRatio`
// Usamos el componente raíz de Radix (`AspectRatioPrimitive.Root`)
// y le pasamos todas las props que reciba este wrapper.
function AspectRatio({
  ...props
}: React.ComponentProps<typeof AspectRatioPrimitive.Root>) {
  return (
    <AspectRatioPrimitive.Root
      data-slot="aspect-ratio" // Atributo personalizado para identificar el slot
      {...props}               // Pasamos todas las props hacia Radix
    />
  )
}

// Exportamos el componente para poder reutilizarlo
export { AspectRatio }
