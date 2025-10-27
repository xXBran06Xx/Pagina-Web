// Importa la función "cn" desde la carpeta utils (sirve para unir clases de Tailwind CSS)
import { cn } from '@/lib/utils'

// Define un componente funcional llamado Skeleton
// Recibe como props: className y todas las propiedades que puede tener un <div>
function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    // Renderiza un div que actúa como "skeleton loader" (un efecto de carga visual)
    <div
      // Atributo personalizado para identificar que es un skeleton
      data-slot="skeleton"
      // Aplica las clases de estilos: fondo con color de acento, animación de pulso, bordes redondeados
      // y permite añadir clases adicionales mediante "className"
      className={cn('bg-accent animate-pulse rounded-md', className)}
      // Pasa el resto de las props al div (ej: id, onClick, etc.)
      {...props}
    />
  )
}

// Exporta el componente Skeleton para que pueda usarse en otros archivos
export { Skeleton }