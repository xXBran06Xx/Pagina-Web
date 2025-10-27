"use client" 
// Indicamos que este componente se renderiza del lado del cliente en Next.js

import type * as React from "react"
// Importamos los tipos de React para tipado fuerte

import { ChevronLeft, ChevronRight } from "lucide-react"
// Iconos de flechas que usaremos en la navegación del calendario

import { DayPicker } from "react-day-picker"
// Librería de calendario base que vamos a personalizar

import { cn } from "@/lib/utils"
// Función auxiliar para concatenar clases de manera condicional

import { buttonVariants } from "@/components/ui/button"
// Variantes de estilos de botones reutilizables en todo el proyecto

// Definimos el tipo de las props que aceptará el componente Calendar
export type CalendarProps = React.ComponentProps<typeof DayPicker>

// Definición del componente Calendar
function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      // Mostrar los días fuera del mes actual (ej. primeros o últimos días del mes anterior/siguiente)
      showOutsideDays={showOutsideDays}

      // Clases globales para el calendario
      className={cn("p-3", className)}

      // Sobrescribimos estilos internos de DayPicker
      classNames={{
        // Contenedor de todos los meses (permite layout en columnas o filas)
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",

        // Contenedor individual de un mes
        month: "space-y-4",

        // Encabezado del mes (con el nombre y botones de navegación)
        caption: "flex justify-center pt-1 relative items-center",

        // Texto del encabezado (ej. "Septiembre 2025")
        caption_label: "text-sm font-medium",

        // Contenedor de los botones de navegación (prev/next)
        nav: "space-x-1 flex items-center",

        // Estilos base de los botones de navegación
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        ),

        // Posición del botón "anterior"
        nav_button_previous: "absolute left-1",

        // Posición del botón "siguiente"
        nav_button_next: "absolute right-1",

        // Estilo de la tabla (estructura de semanas y días)
        table: "w-full border-collapse space-y-1",

        // Encabezado de la fila con los días de la semana (L, M, X…)
        head_row: "flex",

        // Celda del encabezado (cada nombre de día)
        head_cell: "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",

        // Fila de días (una semana)
        row: "flex w-full mt-2",

        // Celda de día individual, con reglas para rangos y selección
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 " +
            "[&:has([aria-selected])]:bg-accent " +
            "[&:has([aria-selected].day-outside)]:bg-accent/50 " +
            "[&:has([aria-selected].day-range-end)]:rounded-r-md",
          // Si el calendario está en modo "rango"
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md " +
              "[&:has(>.day-range-start)]:rounded-l-md " +
              "first:[&:has([aria-selected])]:rounded-l-md " +
              "last:[&:has([aria-selected])]:rounded-r-md"
            // Si no, selección normal
            : "[&:has([aria-selected])]:rounded-md",
        ),

        // Estilo base de cada día como botón
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 font-normal aria-selected:opacity-100",
        ),

        // Día seleccionado como inicio de rango
        day_range_start: "day-range-start",

        // Día seleccionado como fin de rango
        day_range_end: "day-range-end",

        // Día seleccionado normal
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary " +
          "hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",

        // Día que corresponde a la fecha actual
        day_today: "bg-accent text-accent-foreground",

        // Día fuera del mes actual
        day_outside:
          "day-outside text-muted-foreground opacity-50 " +
          "aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",

        // Día deshabilitado
        day_disabled: "text-muted-foreground opacity-50",

        // Día que está en medio de un rango seleccionado
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",

        // Día oculto (ej. placeholders)
        day_hidden: "invisible",

        // Sobrescribimos con las clases que el usuario pase en props (si hay)
        ...classNames,
      }}

      // Reemplazamos los íconos de navegación por los de Lucide
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}

      // Pasamos las demás props
      {...props}
    />
  )
}

// Nombre para el componente (debugging / DevTools)
Calendar.displayName = "Calendar"

// Exportamos el componente
export { Calendar }