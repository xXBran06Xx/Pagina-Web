import * as React from 'react'
// Importamos React para poder definir componentes de tipo JSX

import { cn } from '@/lib/utils'
// Función auxiliar para concatenar clases CSS de forma condicional

// ============================
// Componente principal: Card
// ============================
function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card" // atributo para identificar la sección como "card"
      className={cn(
        'bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm',
        // Estilos base: fondo, color de texto, layout flex con gap, esquinas redondeadas, borde, padding vertical y sombra
        className, // Permite extender con clases personalizadas
      )}
      {...props} // Pasamos cualquier otra prop al div (ej. onClick, id, etc.)
    />
  )
}

// ============================
// Encabezado del Card
// ============================
function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 ' +
          'has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
        // Grid con dos filas, alinea contenido arriba, spacing entre elementos, padding horizontal
        // Si tiene un "card-action", se crean columnas para título + acción
        // Si hay borde inferior, añade padding-bottom
        className,
      )}
      {...props}
    />
  )
}

// ============================
// Título del Card
// ============================
function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        'leading-none font-semibold', // Texto sin interlineado extra y con fuente semibold
        className,
      )}
      {...props}
    />
  )
}

// ============================
// Descripción del Card
// ============================
function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-description"
      className={cn(
        'text-muted-foreground text-sm', // Texto en tono gris y tamaño pequeño
        className,
      )}
      {...props}
    />
  )
}

// ============================
// Acción dentro del Header (ej. botón extra)
// ============================
function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
        // Posiciona la acción en la segunda columna, abarcando dos filas, alineada arriba a la derecha
        className,
      )}
      {...props}
    />
  )
}

// ============================
// Contenido del Card
// ============================
function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-content"
      className={cn(
        'px-6', // Padding horizontal
        className,
      )}
      {...props}
    />
  )
}

// ============================
// Footer del Card
// ============================
function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        'flex items-center px-6 [.border-t]:pt-6',
        // Layout flex para alinear items, padding horizontal
        // Si hay borde superior, se agrega padding-top
        className,
      )}
      {...props}
    />
  )
}

// ============================
// Exportamos todos los subcomponentes
// ============================
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}