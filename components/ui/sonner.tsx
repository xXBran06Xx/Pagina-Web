'use client' // Indica que este componente se renderiza en el cliente (Next.js)

import { useTheme } from 'next-themes' // Hook para obtener el tema actual (claro/oscuro/system)
import { Toaster as Sonner, ToasterProps } from 'sonner' // Importa el componente Toaster de la librería 'sonner' y sus props

// Componente Toaster personalizado
const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme() // Obtiene el tema actual, por defecto 'system'

  return (
    <Sonner
      theme={theme as ToasterProps['theme']} // Forza el tipo del tema al requerido por Sonner
      className="toaster group" // Clases CSS para el contenedor del toaster
      style={
        {
          '--normal-bg': 'var(--popover)', // Color de fondo del toaster
          '--normal-text': 'var(--popover-foreground)', // Color del texto
          '--normal-border': 'var(--border)', // Color del borde
        } as React.CSSProperties // Se indica que es un objeto CSS válido
      }
      {...props} // Se pasan todas las demás props que se reciban
    />
  )
}

// Exporta el componente para usarlo en otros archivos
export { Toaster }