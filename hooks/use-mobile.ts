import * as React from 'react'

// Punto de quiebre para considerar dispositivo móvil
const MOBILE_BREAKPOINT = 768

// Hook para determinar si la pantalla actual es móvil
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Creamos un MediaQueryList para detectar cambios en el tamaño de pantalla
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)

    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // Escuchamos cambios en la media query
    mql.addEventListener('change', onChange)

    // Inicializamos el estado al montar
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)

    // Limpiamos el listener al desmontar
    return () => mql.removeEventListener('change', onChange)
  }, [])

  // Devolvemos booleano definitivo
  return !!isMobile
}

