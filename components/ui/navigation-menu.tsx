// Importa todas las utilidades de React
import * as React from 'react'

// Importa todas las primitivas de menú de navegación de Radix UI
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu'

// Importa la función cva (Class Variance Authority) para estilos condicionales
import { cva } from 'class-variance-authority'

// Importa el ícono ChevronDown de la librería lucide-react
import { ChevronDownIcon } from 'lucide-react'

// Importa la función cn desde las utilidades del proyecto
import { cn } from '@/lib/utils'

// Definición del componente NavigationMenu que representa el menú principal
function NavigationMenu({
  className,   // Clase adicional que se pasa como prop
  children,    // Elementos hijos dentro del menú
  viewport = true, // Indica si se muestra el viewport
  ...props     // Resto de las props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
  viewport?: boolean
}) {
  return (
    // Usa el componente Root de NavigationMenuPrimitive
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"      // Atributo personalizado para identificación
      data-viewport={viewport}         // Indica si se renderiza el viewport
      className={cn(                   // Combina clases de Tailwind con las personalizadas
        'group/navigation-menu relative flex max-w-max flex-1 items-center justify-center',
        className,
      )}
      {...props}
    >
      {children}                       {/* Renderiza los elementos hijos */}
      {viewport && <NavigationMenuViewport />} {/* Muestra el viewport si está activado */}
    </NavigationMenuPrimitive.Root>
  )
}

// Definición del componente NavigationMenuList que contiene la lista de ítems
function NavigationMenuList({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return (
    // Usa el componente List de NavigationMenuPrimitive
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn(
        'group flex flex-1 list-none items-center justify-center gap-1',
        className,
      )}
      {...props}
    />
  )
}

// Definición del componente NavigationMenuItem que representa un ítem individual
function NavigationMenuItem({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {
  return (
    // Usa el componente Item de NavigationMenuPrimitive
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      className={cn('relative', className)}
      {...props}
    />
  )
}

// Define estilos condicionales para el disparador (trigger) del menú
const navigationMenuTriggerStyle = cva(
  'group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=open]:hover:bg-accent data-[state=open]:text-accent-foreground data-[state=open]:focus:bg-accent data-[state=open]:bg-accent/50 focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1',
)

// Definición del componente NavigationMenuTrigger que abre el contenido del menú
function NavigationMenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    // Usa el componente Trigger de NavigationMenuPrimitive
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerStyle(), 'group', className)}
      {...props}
    >
      {children}{' '} {/* Texto o contenido del botón */}
      {/* Ícono de flecha que rota cuando se abre el menú */}
      <ChevronDownIcon
        className="relative top-[1px] ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180"
        aria-hidden="true"
      />
    </NavigationMenuPrimitive.Trigger>
  )
}

// Definición del componente NavigationMenuContent que muestra el contenido desplegable
function NavigationMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  return (
    // Usa el componente Content de NavigationMenuPrimitive
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        // Estilos para animaciones de entrada y salida
        'data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 top-0 left-0 w-full p-2 pr-2.5 md:absolute md:w-auto',
        // Estilos adicionales dependiendo del estado viewport
        'group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0 group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0 group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:rounded-md group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:shadow group-data-[viewport=false]/navigation-menu:duration-200 **:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none',
        className,
      )}
      {...props}
    />
  )
}

// Definición del componente NavigationMenuViewport que muestra el contenedor visual del menú
function NavigationMenuViewport({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
  return (
    // Contenedor que posiciona el viewport debajo del menú
    <div
      className={'absolute top-full left-0 isolate z-50 flex justify-center'}
    >
      {/* Usa el componente Viewport de NavigationMenuPrimitive */}
      <NavigationMenuPrimitive.Viewport
        data-slot="navigation-menu-viewport"
        className={cn(
          'origin-top-center bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border shadow md:w-[var(--radix-navigation-menu-viewport-width)]',
          className,
        )}
        {...props}
      />
    </div>
  )
}

// Definición del componente NavigationMenuLink que representa un enlace del menú
function NavigationMenuLink({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {
  return (
    // Usa el componente Link de NavigationMenuPrimitive
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(
        "data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex flex-col gap-1 rounded-sm p-2 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  )
}

// Definición del componente NavigationMenuIndicator que marca el ítem activo
function NavigationMenuIndicator({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>) {
  return (
    // Usa el componente Indicator de NavigationMenuPrimitive
    <NavigationMenuPrimitive.Indicator
      data-slot="navigation-menu-indicator"
      className={cn(
        'data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden',
        className,
      )}
      {...props}
    >
      {/* Dibujar un pequeño rombo como indicador visual */}
      <div className="bg-border relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm shadow-md" />
    </NavigationMenuPrimitive.Indicator>
  )
}

// Exporta todos los componentes y estilos creados
export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
}