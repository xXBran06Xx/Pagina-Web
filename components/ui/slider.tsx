'use client' // Indica que este componente se renderiza en el cliente (Next.js)

import * as React from 'react' // Importa todas las utilidades de React
import * as SliderPrimitive from '@radix-ui/react-slider' // Importa los componentes base del slider desde Radix UI

import { cn } from '@/lib/utils' // Importa la función 'cn' para combinar clases CSS condicionalmente

// Definición del componente Slider
function Slider({
  className,       // Clase CSS adicional que se puede pasar al componente
  defaultValue,    // Valor inicial del slider
  value,           // Valor controlado del slider
  min = 0,         // Valor mínimo permitido (por defecto 0)
  max = 100,       // Valor máximo permitido (por defecto 100)
  ...props         // Cualquier otra propiedad adicional
}: React.ComponentProps<typeof SliderPrimitive.Root>) {

  // Memoriza los valores iniciales o actuales del slider
  const _values = React.useMemo(
    () =>
      Array.isArray(value)          // Si "value" es un arreglo, úsalo directamente
        ? value
        : Array.isArray(defaultValue) // Si "defaultValue" es un arreglo, úsalo
          ? defaultValue
          : [min, max],             // Si no, usa un rango [min, max]
    [value, defaultValue, min, max], // Dependencias que hacen recalcular este valor
  )

  // Renderizado del slider
  return (
    <SliderPrimitive.Root
      data-slot="slider" // Atributo de datos para identificar este slot
      defaultValue={defaultValue} // Valor inicial del slider
      value={value} // Valor actual (controlado)
      min={min} // Límite inferior
      max={max} // Límite superior
      className={cn(
        // Clases de estilo base + las que reciba desde props
        'relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col',
        className,
      )}
      {...props} // Se pasan las demás propiedades adicionales
    >
      {/* Pista por donde se desliza el thumb */}
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={
          'bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5'
        }
      >
        {/* Rango seleccionado dentro de la pista */}
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={
            'bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full'
          }
        />
      </SliderPrimitive.Track>

      {/* Se generan tantos "thumbs" como valores tenga el slider (ej: rango doble) */}
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index} // Cada thumb necesita una key única
          className="border-primary bg-background ring-ring/50 block size-4 shrink-0 rounded-full border shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  )
}

// Exporta el componente Slider para usarlo en otros archivos
export { Slider }