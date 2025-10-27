// Importamos React y tipos necesarios
import * as React from 'react'
// Importamos la utilidad `cva` y `VariantProps` de class-variance-authority
// Esto nos permite definir variantes de estilos de forma declarativa.
import { cva, type VariantProps } from 'class-variance-authority'

// Importamos la función cn que nos ayuda a combinar clases condicionales
import { cn } from '@/lib/utils'

// Definimos las variantes para el componente Alert
// Usamos `cva` para declarar diferentes estilos según la variante
const alertVariants = cva(
  // Estilos base que siempre se aplican al Alert
  'relative w-full rounded-lg border px-4 py-3 text-sm grid ' +
    'has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] ' +
    'has-[>svg]:gap-x-3 gap-y-0.5 items-start ' +
    '[&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current',
  {
    // Variantes posibles
    variants: {
      variant: {
        // Variante por defecto
        default: 'bg-card text-card-foreground',
        // Variante destructiva (alerta de error)
        destructive:
          'text-destructive bg-card [&>svg]:text-current ' +
          '*:data-[slot=alert-description]:text-destructive/90',
      },
    },
    // Variante predeterminada si no se especifica
    defaultVariants: {
      variant: 'default',
    },
  },
)

// Componente principal Alert
function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert" // atributo para identificar el slot
      role="alert"      // atributo ARIA para accesibilidad
      className={cn(alertVariants({ variant }), className)} // combinación de clases dinámicas
      {...props} // Pasamos todas las demás props
    />
  )
}

// Componente para el título de la alerta
function AlertTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-title" // identificador de slot
      className={cn(
        'col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight',
        className, // Permite extender clases desde fuera
      )}
      {...props}
    />
  )
}

// Componente para la descripción de la alerta
function AlertDescription({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        'text-muted-foreground col-start-2 grid justify-items-start ' +
          'gap-1 text-sm [&_p]:leading-relaxed',
        className,
      )}
      {...props}
    />
  )
}

// Exportamos los tres componentes para usarlos de forma independiente o en conjunto
export { Alert, AlertTitle, AlertDescription }