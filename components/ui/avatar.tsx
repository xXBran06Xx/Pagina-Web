'use client'
// 👉 Este componente se ejecuta en el cliente (Next.js client-side)

import * as React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar' // Importamos el sistema de Avatar de Radix UI
import { cn } from '@/lib/utils' // Función para combinar clases condicionalmente

// ---------- Avatar contenedor ----------
function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar" // Marcador semántico
      className={cn(
        // Estilos base para el contenedor del avatar
        'relative flex size-8 shrink-0 overflow-hidden rounded-full',
        className, // Permite añadir clases personalizadas al usar el componente
      )}
      {...props}
    />
  )
}

// ---------- Imagen dentro del Avatar ----------
function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(
        // Forzamos que sea cuadrada y que ocupe todo el contenedor
        'aspect-square size-full',
        className,
      )}
      {...props}
    />
  )
}

// ---------- Fallback cuando no carga la imagen ----------
function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        // Fondo neutro + centrado de contenido (iniciales, ícono, etc.)
        'bg-muted flex size-full items-center justify-center rounded-full',
        className,
      )}
      {...props}
    />
  )
}

// Exportamos todo el sistema de Avatar listo para usar
export { Avatar, AvatarImage, AvatarFallback }