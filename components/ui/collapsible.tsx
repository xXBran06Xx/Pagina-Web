'use client'

// Importamos los componentes primitivos de Radix para crear un Collapsible (desplegable)
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'

/**
 * Componente Collapsible principal.
 * Envuelve el contenido que podrá abrirse/cerrarse.
 */
function Collapsible({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />
}

/**
 * Componente Trigger (disparador).
 * Es el botón o elemento que al hacer clic abrirá/cerrará el contenido.
 */
function CollapsibleTrigger({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot="collapsible-trigger"
      {...props}
    />
  )
}

/**
 * Componente Content (contenido colapsable).
 * Se muestra u oculta según el estado del Collapsible.
 */
function CollapsibleContent({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      {...props}
    />
  )
}

// Exportamos los tres componentes para su uso en otras partes de la aplicación
export { Collapsible, CollapsibleTrigger, CollapsibleContent }

