import * as React from 'react'

// Punto de corte para considerar "mobile"
const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  // Estado que indica si estamos en mobile o no
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Media query para detectar cambio de tamaño
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)

    // Función que actualiza el estado cuando cambia la media query
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // Escuchar cambios en la media query
    mql.addEventListener('change', onChange)

    // Inicializar estado al montar
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)

    // Limpiar listener al desmontar
    return () => mql.removeEventListener('change', onChange)
  }, [])

  // Retorna un boolean (no undefined)
  return !!isMobile
}