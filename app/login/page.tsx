"use client" // Indicamos a Next.js que este componente debe renderizarse en el cliente

// Importamos React y sus tipos
import type React from "react"

// Importamos useState para manejar estados en el componente
import { useState } from "react"

// Importamos componentes reutilizables de la UI
import { Button } from "@/components/ui/button" // Botón estilizado
import { Input } from "@/components/ui/input" // Campo de entrada de texto
import { Card } from "@/components/ui/card" // Tarjeta para encerrar el formulario

// Importamos Link de Next.js para navegación interna
import Link from "next/link"

// Importamos íconos de visibilidad para el campo de contraseña
import { Eye, EyeOff } from "lucide-react"

// Importamos useRouter para redirigir a otras páginas después del login
import { useRouter } from "next/navigation"

// Componente principal de la página de inicio de sesión
export default function LoginPage() {
  // Estado que controla si se muestra o no la contraseña en texto plano
  const [showPassword, setShowPassword] = useState(false)

  // Estado que controla si se está procesando la autenticación
  const [isLoading, setIsLoading] = useState(false)

  // Estado para manejar errores de credenciales
  const [error, setError] = useState("")

  // Estado para almacenar los datos del formulario (usuario y contraseña)
  const [formData, setFormData] = useState({
    username: "", // Nombre de usuario o correo
    password: "", // Contraseña
  })

  // Hook de enrutamiento de Next.js
  const router = useRouter()

  // Función que maneja el envío del formulario de login
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault() // Evita que la página se recargue
    setIsLoading(true) // Activamos el estado de carga
    setError("") // Limpiamos errores previos

    // Credenciales válidas por defecto (esto simula una base de datos)
    const validCredentials = [
      { username: "admin@residencia.com", password: "admin123" },
      { username: "auxiliar@residencia.com", password: "auxiliar123" },
      { username: "supervisor@residencia.com", password: "supervisor123" },
    ]

    // Simulamos un retraso como si llamáramos a una API real
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Verificamos si el usuario y la contraseña coinciden con alguna credencial válida
    const isValid = validCredentials.some(
      (cred) => cred.username === formData.username && cred.password === formData.password,
    )

    if (isValid) {
      // Si las credenciales son correctas, guardamos la sesión en localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          username: formData.username, // Usuario logueado
          isAuthenticated: true, // Estado de autenticación
        }),
      )
      // Redirigimos al dashboard
      router.push("/dashboard")
    } else {
      // Si no son válidas, mostramos un mensaje de error
      setError("Credenciales incorrectas. Verifica tu usuario y contraseña.")
    }

    setIsLoading(false) // Finalizamos el estado de carga
  }

  // Renderizado del componente
  return (
    <div className="min-h-screen flex">
      {/* Sección izquierda: formulario de inicio de sesión */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          {/* Encabezado del login */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-balance leading-tight">BIENVENIDO AL SISTEMA</h1>
            <p className="text-xl text-muted-foreground text-pretty">INICIA SESIÓN Y MANTÉN TODO AL DÍA</p>
          </div>

          {/* Tarjeta que contiene el formulario */}
          <Card className="p-8 shadow-lg border-0 bg-card">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Mensaje de error si las credenciales no son válidas */}
              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">{error}</div>
              )}

              {/* Campo para el usuario */}
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium">
                  Usuario
                </label>
                <Input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData((prev) => ({ ...prev, username: e.target.value }))} // Actualizamos el estado
                  className="h-12 text-base"
                  placeholder="Ingresa tu usuario"
                  required
                  disabled={isLoading} // Se desactiva mientras carga
                />
              </div>

              {/* Campo para la contraseña */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Contraseña
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"} // Muestra texto o asteriscos según el estado
                    value={formData.password}
                    onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))} // Actualizamos contraseña
                    className="h-12 text-base pr-12"
                    placeholder="Ingresa tu contraseña"
                    required
                    disabled={isLoading} // Se desactiva mientras carga
                  />
                  {/* Botón para mostrar u ocultar la contraseña */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)} // Cambia el estado de visibilidad
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />} {/* Íconos dinámicos */}
                  </button>
                </div>
              </div>

              {/* Botón principal para iniciar sesión */}
              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90"
                disabled={isLoading} // Bloqueado mientras carga
              >
                {isLoading ? "Iniciando sesión..." : "Inicia Sesión"} {/* Texto cambia mientras procesa */}
              </Button>

              {/* Enlace para recuperar contraseña */}
              <div className="text-center">
                <Link href="/reset-password" className="text-sm text-accent hover:text-accent/80 underline">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
            </form>
          </Card>
        </div>
      </div>

      {/* Sección derecha: ilustración visual */}
      <div className="flex-1 bg-muted flex items-center justify-center p-8">
        <div className="relative w-full max-w-lg">
          {/* Imagen decorativa con un fondo de gradiente */}
          <div className="aspect-square bg-gradient-to-br from-accent/20 to-primary/20 rounded-3xl flex items-center justify-center">
            <img
              src="/happy-elderly-couple-smiling-with-leaves-backgroun.jpg"
              alt="Pareja de adultos mayores sonrientes"
              className="w-80 h-80 object-cover rounded-2xl"
            />
          </div>
          {/* Círculos decorativos adicionales */}
          <div className="absolute -top-4 -right-4 w-16 h-16 bg-accent/10 rounded-full"></div>
          <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-primary/10 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}

