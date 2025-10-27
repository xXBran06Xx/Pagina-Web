'use client' // Indica que este código se ejecuta en el cliente (Next.js)

import * as React from 'react' // Importa React
import { OTPInput, OTPInputContext } from 'input-otp' // Importa el componente OTPInput y su contexto
import { MinusIcon } from 'lucide-react' // Importa un ícono de "menos"
import { cn } from '@/lib/utils' // Función para concatenar clases dinámicamente

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string
}) {
  // Componente que envuelve al OTPInput de la librería, agregando estilos y soporte de clases personalizadas
  return (
    <OTPInput
      data-slot="input-otp" // Marca para identificar el componente
      containerClassName={cn(
        'flex items-center gap-2 has-disabled:opacity-50', // Estilos del contenedor (alineación, opacidad si está deshabilitado)
        containerClassName, // Permite clases adicionales
      )}
      className={cn(
        'disabled:cursor-not-allowed', // Evita que el cursor funcione si está deshabilitado
        className, // Clases extra pasadas desde fuera
      )}
      {...props} // Propaga las demás propiedades al OTPInput
    />
  )
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<'div'>) {
  // Agrupa varios "slots" del OTP (cada número o carácter)
  return (
    <div
      data-slot="input-otp-group"
      className={cn('flex items-center', className)} // Alinea los elementos horizontalmente
      {...props}
    />
  )
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  index: number
}) {
  // Representa un "slot" individual del código OTP (cada dígito)
  const inputOTPContext = React.useContext(OTPInputContext) // Obtiene el contexto global del OTP
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {} // Extrae datos del slot actual: el carácter, el caret y si está activo

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive} // Indica si el slot está activo
      className={cn(
        // Estilos condicionales para resaltar el slot cuando está activo o inválido
        'data-[active=true]:border-ring data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:ring-destructive/20 dark:data-[active=true]:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-[active=true]:aria-invalid:border-destructive dark:bg-input/30 border-input relative flex h-9 w-9 items-center justify-center border-y border-r text-sm shadow-xs transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md data-[active=true]:z-10 data-[active=true]:ring-[3px]',
        className,
      )}
      {...props}
    >
      {char} {/* Muestra el carácter escrito en este slot */}
      {hasFakeCaret && (
        // Si el slot tiene un caret (cursor), se renderiza aquí
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
        </div>
      )}
    </div>
  )
}

function InputOTPSeparator({ ...props }: React.ComponentProps<'div'>) {
  // Renderiza un separador visual entre grupos de slots (ejemplo: 123-456)
  return (
    <div data-slot="input-otp-separator" role="separator" {...props}>
      <MinusIcon /> {/* Ícono de línea (guion) */}
    </div>
  )
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } // Exporta los componentes para usarlos en otros módulos