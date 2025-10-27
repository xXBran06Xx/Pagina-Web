import * as React from 'react'
import { Slot } from '@radix-ui/react-slot' 
// 👉 `Slot` = permite pasar un componente hijo y renderizarlo en lugar del elemento base (útil para composición flexible)
import { ChevronRight, MoreHorizontal } from 'lucide-react' 
// 👉 Iconos SVG listos para usar

import { cn } from '@/lib/utils' 
// 👉 Función para combinar clases dinámicamente

// ---------- Componente raíz del Breadcrumb ----------
function Breadcrumb({ ...props }: React.ComponentProps<'nav'>) {
  // 👉 `aria-label="breadcrumb"`: accesibilidad, indica que es navegación tipo breadcrumb
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />
}

// ---------- Lista que contiene los ítems del breadcrumb ----------
function BreadcrumbList({ className, ...props }: React.ComponentProps<'ol'>) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        // 👉 Estilos: texto gris, flex con wrap, separación entre elementos
        'text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5',
        className,
      )}
      {...props}
    />
  )
}

// ---------- Cada elemento (li) del breadcrumb ----------
function BreadcrumbItem({ className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn('inline-flex items-center gap-1.5', className)} 
      // 👉 `inline-flex` alinea ítems horizontalmente, con pequeña separación
      {...props}
    />
  )
}

// ---------- Enlace dentro del breadcrumb ----------
function BreadcrumbLink({
  asChild, // 👉 Permite renderizar como otro componente usando `Slot`
  className,
  ...props
}: React.ComponentProps<'a'> & {
  asChild?: boolean
}) {
  // 👉 Si `asChild` está activo, renderiza el `Slot`, si no un <a>
  const Comp = asChild ? Slot : 'a'

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn('hover:text-foreground transition-colors', className)}
      {...props}
    />
  )
}

// ---------- Página actual (último ítem, no clickeable) ----------
function BreadcrumbPage({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true" // 👉 Indica que no es clickeable
      aria-current="page"  // 👉 Accesibilidad: esta es la página actual
      className={cn('text-foreground font-normal', className)}
      {...props}
    />
  )
}

// ---------- Separador entre ítems ----------
function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation" // 👉 Solo decorativo, no se lee como link
      aria-hidden="true"  // 👉 Oculto para accesibilidad
      className={cn('[&>svg]:size-3.5', className)} 
      {...props}
    >
      {/* 👉 Usa el ícono ChevronRight por defecto si no se pasa otro */}
      {children ?? <ChevronRight />}
    </li>
  )
}

// ---------- Indicador de "más elementos" (ellipsis ...) ----------
function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn('flex size-9 items-center justify-center', className)}
      {...props}
    >
      {/* 👉 Icono de tres puntos horizontales */}
      <MoreHorizontal className="size-4" />
      {/* 👉 Texto solo para lectores de pantalla */}
      <span className="sr-only">More</span>
    </span>
  )
}

// ---------- Exportamos todos los componentes ----------
export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}