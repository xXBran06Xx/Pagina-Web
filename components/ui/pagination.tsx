// Importa todas las utilidades de React
import * as React from 'react'

// Importa íconos desde la librería lucide-react
import {
  ChevronLeftIcon,    // Flecha hacia la izquierda
  ChevronRightIcon,   // Flecha hacia la derecha
  MoreHorizontalIcon, // Icono de tres puntos horizontales
} from 'lucide-react'

// Importa la función cn para combinar clases y buttonVariants para estilos de botones
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'

// Componente principal de paginación
function Pagination({ className, ...props }: React.ComponentProps<'nav'>) {
  return (
    // Elemento <nav> que agrupa la paginación
    <nav
      role="navigation"                     // Indica que es un bloque de navegación
      aria-label="pagination"               // Accesibilidad: describe el propósito
      data-slot="pagination"                // Atributo personalizado para identificar
      className={cn('mx-auto flex w-full justify-center', className)} // Clases de estilo + adicionales
      {...props}                            // Pasa el resto de props
    />
  )
}

// Contenedor de los elementos de paginación
function PaginationContent({
  className,
  ...props
}: React.ComponentProps<'ul'>) {
  return (
    // Elemento <ul> que agrupa ítems de la paginación
    <ul
      data-slot="pagination-content"                 // Identificador personalizado
      className={cn('flex flex-row items-center gap-1', className)} // Clases + extra
      {...props}
    />
  )
}

// Ítem individual dentro de la lista de paginación
function PaginationItem({ ...props }: React.ComponentProps<'li'>) {
  return <li data-slot="pagination-item" {...props} /> // Devuelve un <li> con atributo de slot
}

// Definición de tipos para el componente PaginationLink
type PaginationLinkProps = {
  isActive?: boolean         // Indica si el link está activo
} & Pick<React.ComponentProps<typeof Button>, 'size'> // Toma el tipo "size" del botón
  & React.ComponentProps<'a'>                         // Permite todas las props de <a>

// Enlace de paginación (botón estilo link)
function PaginationLink({
  className,
  isActive,                 // Marca el link como activo
  size = 'icon',            // Tamaño por defecto es "icon"
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? 'page' : undefined} // Accesibilidad: marca como página actual
      data-slot="pagination-link"                  // Identificador
      data-active={isActive}                       // Marca activo en data attribute
      className={cn(
        buttonVariants({                           // Aplica estilos según si está activo o no
          variant: isActive ? 'outline' : 'ghost',
          size,
        }),
        className,
      )}
      {...props}
    />
  )
}

// Botón para ir a la página anterior
function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"     // Texto accesible
      size="default"                       // Tamaño normal
      className={cn('gap-1 px-2.5 sm:pl-2.5', className)} // Estilos
      {...props}
    >
      <ChevronLeftIcon />                  {/* Icono de flecha izquierda */}
      <span className="hidden sm:block">Previous</span> {/* Texto visible solo en pantallas grandes */}
    </PaginationLink>
  )
}

// Botón para ir a la página siguiente
function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"         // Texto accesible
      size="default"                       // Tamaño normal
      className={cn('gap-1 px-2.5 sm:pr-2.5', className)} // Estilos
      {...props}
    >
      <span className="hidden sm:block">Next</span> {/* Texto visible solo en pantallas grandes */}
      <ChevronRightIcon />                 {/* Icono de flecha derecha */}
    </PaginationLink>
  )
}

// Indicador de más páginas (ellipsis)
function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      aria-hidden                           // Se oculta de los lectores de pantalla
      data-slot="pagination-ellipsis"       // Identificador
      className={cn('flex size-9 items-center justify-center', className)} // Estilos
      {...props}
    >
      <MoreHorizontalIcon className="size-4" /> {/* Icono de tres puntos */}
      <span className="sr-only">More pages</span> {/* Texto solo visible para screen readers */}
    </span>
  )
}

// Exporta todos los componentes de paginación
export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}