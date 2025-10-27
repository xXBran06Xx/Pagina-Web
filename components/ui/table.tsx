import * as React from "react" // Importa React
import { cn } from "@/lib/utils" // Importa la función cn para concatenar clases condicionales

// Componente Table envuelto en forwardRef para poder usar ref directamente
const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto"> {/* Contenedor con scroll horizontal si la tabla es ancha */}
      <table ref={ref} className={cn("w-full caption-bottom text-sm", className)} {...props} /> {/* Tabla principal */}
    </div>
  ),
)
Table.displayName = "Table"

// Encabezado de tabla
const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />,
)
TableHeader.displayName = "TableHeader"

// Cuerpo de la tabla
const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} />
  ),
)
TableBody.displayName = "TableBody"

// Pie de tabla
const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tfoot ref={ref} className={cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className)} {...props} />
  ),
)
TableFooter.displayName = "TableFooter"

// Fila de la tabla
const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", className)} // Cambia de color al hover o si está seleccionada
      {...props}
    />
  ),
)
TableRow.displayName = "TableRow"

// Celda de encabezado
const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className,
      )} // Ajusta estilos si contiene un checkbox
      {...props}
    />
  ),
)
TableHead.displayName = "TableHead"

// Celda de tabla
const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td
      ref={ref}
      className={cn("p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className)} // Ajusta estilos si contiene un checkbox
      {...props}
    />
  ),
)
TableCell.displayName = "TableCell"

// Pie de tabla (caption)
const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className, ...props }, ref) => (
    <caption ref={ref} className={cn("mt-4 text-sm text-muted-foreground", className)} {...props} /> // Texto descriptivo de la tabla
  ),
)
TableCaption.displayName = "TableCaption"

// Exporta todos los componentes de tabla
export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption }