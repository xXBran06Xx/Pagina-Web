// Importa la función clsx y el tipo ClassValue desde la librería clsx
// clsx es una utilidad para concatenar condicionalmente nombres de clases
import { clsx, type ClassValue } from 'clsx'

// Importa la función twMerge desde tailwind-merge
// tailwind-merge combina y optimiza clases de Tailwind CSS eliminando conflictos
import { twMerge } from 'tailwind-merge'

// Define y exporta una función utilitaria llamada 'cn' (className)
// que acepta cualquier número de argumentos de tipo ClassValue
export function cn(...inputs: ClassValue[]) {
  // Primero, clsx procesa todos los inputs y devuelve una cadena de clases concatenadas
  // Luego, twMerge optimiza las clases de Tailwind CSS, resolviendo conflictos
  // Por ejemplo: si hay 'p-2' y 'p-4', twMerge se queda con 'p-4' (el último)
  return twMerge(clsx(inputs))
}
