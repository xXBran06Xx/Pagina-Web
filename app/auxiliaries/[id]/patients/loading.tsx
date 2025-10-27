// Exportamos por defecto una función llamada Loading.
// En Next.js, los archivos llamados "loading.js" o "loading.tsx"
// se utilizan como indicadores de carga mientras la página
// o los datos necesarios se están preparando.
export default function Loading() {
  
  // La función retorna "null".
  // Esto significa que mientras la página carga, no se va a mostrar nada en pantalla.
  // (Podríamos poner un spinner, un mensaje "Cargando...", etc.,
  // pero en este caso se deja vacío).
  return null;
}
