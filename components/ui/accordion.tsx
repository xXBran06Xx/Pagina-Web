'use client'  
// Indicamos que este componente se ejecutará del lado del cliente en Next.js
// Necesario para componentes interactivos que usan hooks o librerías externas

// Importamos React y sus utilidades
import * as React from 'react'

// Importamos todos los componentes primitivos de acordeón de Radix UI
// (Root, Item, Trigger, Content, Header, etc.)
import * as AccordionPrimitive from '@radix-ui/react-accordion'

// Importamos el ícono de "chevron" (flecha hacia abajo) desde la librería Lucide
// Este ícono rotará cuando el acordeón se abra/cierre
import { ChevronDownIcon } from 'lucide-react'

// Importamos la función "cn" desde utils, que permite unir y manejar clases condicionales de forma más sencilla
import { cn } from '@/lib/utils'

// ---------------------------------------------------------
// Componente Accordion
// Contenedor principal del acordeón, que agrupa todos los items
// ---------------------------------------------------------
function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  // Renderiza el contenedor raíz del acordeón de Radix
  // Se le agrega un "data-slot" para identificarlo en el DOM
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

// ---------------------------------------------------------
// Componente AccordionItem
// Representa un ítem individual dentro del acordeón
// ---------------------------------------------------------
function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      // Estilo: cada ítem tiene borde inferior excepto el último
      className={cn('border-b last:border-b-0', className)}
      {...props}
    />
  )
}

// ---------------------------------------------------------
// Componente AccordionTrigger
// Botón que controla la apertura/cierre del contenido del ítem
// ---------------------------------------------------------
function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    // Header envuelve el botón (Trigger)
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          // Clases base para estilos: accesibilidad, espaciado, tipografía y animaciones
          'focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180',
          className,
        )}
        {...props}
      >
        {/* Texto o contenido que se muestra dentro del botón */}
        {children}
        {/* Ícono que rota 180° cuando el acordeón está abierto */}
        <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

// ---------------------------------------------------------
// Componente AccordionContent
// Contenido que se expande/colapsa cuando el Trigger es presionado
// ---------------------------------------------------------
function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      // Clases que controlan la animación al abrir/cerrar
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
      {...props}
    >
      {/* Contenedor interno para dar padding al contenido */}
      <div className={cn('pt-0 pb-4', className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

// ---------------------------------------------------------
// Exportamos todos los componentes del acordeón
// Se pueden importar y usar individualmente según necesidad
// ---------------------------------------------------------
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }

