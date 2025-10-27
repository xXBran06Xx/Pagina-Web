'use client' // Indica que este archivo debe ejecutarse en el cliente (navegador).

import * as React from 'react' // Importa todas las funcionalidades de React.
import * as SeparatorPrimitive from '@radix-ui/react-separator' // Importa el componente Separator de Radix UI.
import { cn } from '@/lib/utils' // Importa una función utilitaria para combinar clases CSS dinámicamente.

function Separator({
  className, // Recibe una clase CSS extra opcional para personalizar estilos.
  orientation = 'horizontal', // Define la orientación, por defecto es "horizontal".
  decorative = true, // Indica si es decorativo (no accesible por lectores de pantalla), por defecto "true".
  ...props // Recoge cualquier otra prop adicional que se pase al componente.
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) { // Define las props basadas en el tipo del componente Root de Radix.
  return (
    <SeparatorPrimitive.Root // Renderiza el componente raíz de Separator de Radix.
      data-slot="separator" // Atributo de datos para identificar el slot.
      decorative={decorative} // Aplica si el separador es decorativo.
      orientation={orientation} // Aplica la orientación (horizontal o vertical).
      className={cn( // Combina las clases predeterminadas con las personalizadas.
        'bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px',
        className, // Aplica la clase extra si se pasa desde fuera.
      )}
      {...props} // Pasa cualquier otra prop al componente.
    />
  )
}

export { Separator } // Exporta el componente Separator para poder usarlo en otros archivos.