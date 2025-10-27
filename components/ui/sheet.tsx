"use client" // Indica que este archivo se ejecuta en el cliente (navegador).

import * as React from "react" // Importa todas las utilidades de React.
import * as SheetPrimitive from "@radix-ui/react-dialog" // Importa los componentes base de "dialog" de Radix para construir el Sheet.
import { cva, type VariantProps } from "class-variance-authority" // cva sirve para crear clases variantes y VariantProps para tiparlas.
import { X } from "lucide-react" // Importa el ícono de "X" para el botón de cerrar.
import { cn } from "@/lib/utils" // Función utilitaria para unir clases CSS condicionalmente.

// --- Asignación directa de los componentes de Radix ---
const Sheet = SheetPrimitive.Root // Componente raíz del Sheet.
const SheetTrigger = SheetPrimitive.Trigger // Botón o elemento que abre el Sheet.
const SheetClose = SheetPrimitive.Close // Botón o elemento que cierra el Sheet.
const SheetPortal = SheetPrimitive.Portal // Renderiza el contenido del Sheet en un portal (fuera del DOM normal).

// --- Overlay (fondo oscuro detrás del Sheet) ---
const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>, // Tipo de referencia al elemento.
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay> // Props que acepta el Overlay.
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn( // Aplica estilos por defecto y permite añadir más.
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
    ref={ref}
  />
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

// --- Variantes de posición del Sheet ---
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right", // Por defecto el Sheet aparece desde la derecha.
    },
  },
)

// --- Props del contenido del Sheet ---
interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>, // Props base del contenido de Radix.
    VariantProps<typeof sheetVariants> {} // Props adicionales generadas por cva (ej: side).

// --- Contenido principal del Sheet ---
const SheetContent = React.forwardRef<React.ElementRef<typeof SheetPrimitive.Content>, SheetContentProps>(
  ({ side = "right", className, children, ...props }, ref) => (
    <SheetPortal>
      <SheetOverlay /> {/* Fondo oscuro */}
      <SheetPrimitive.Content
        ref={ref}
        className={cn(sheetVariants({ side }), className)} // Aplica clases según la posición (side).
        {...props}
      >
        {children} {/* Contenido interno del Sheet */}
        <SheetPrimitive.Close // Botón de cerrar dentro del Sheet.
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity 
          hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 
          disabled:pointer-events-none data-[state=open]:bg-secondary"
        >
          <X className="h-4 w-4" /> {/* Ícono de cerrar */}
          <span className="sr-only">Close</span> {/* Texto accesible solo para lectores de pantalla */}
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  ),
)
SheetContent.displayName = SheetPrimitive.Content.displayName

// --- Encabezado del Sheet ---
const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
)
SheetHeader.displayName = "SheetHeader"

// --- Pie de página del Sheet ---
const SheetFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
)
SheetFooter.displayName = "SheetFooter"

// --- Título del Sheet ---
const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title ref={ref} className={cn("text-lg font-semibold text-foreground", className)} {...props} />
))
SheetTitle.displayName = SheetPrimitive.Title.displayName

// --- Descripción del Sheet ---
const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
))
SheetDescription.displayName = SheetPrimitive.Description.displayName

// --- Exportaciones ---
export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}