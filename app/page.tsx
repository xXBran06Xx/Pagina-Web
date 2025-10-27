// Importamos la función "redirect" desde el módulo de navegación de Next.js
// Esta función nos permite redirigir automáticamente al usuario hacia otra ruta de la aplicación
import { redirect } from "next/navigation"

// Definimos el componente principal "HomePage"
// Este representa la página raíz ("/") de la aplicación
export default function HomePage() {
  // Apenas el usuario entra a la página principal, no se muestra nada aquí directamente
  // En lugar de eso, se ejecuta un redireccionamiento inmediato hacia "/login"
  // Es decir, el login se convierte en el punto de entrada principal de la aplicación
  redirect("/login")
}
