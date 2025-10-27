// Indicamos que este componente será ejecutado del lado del cliente en Next.js
"use client"

// Importamos los tipos de React (opcional, para mejor tipado con TypeScript)
import type React from "react"

// Importamos el hook useState para manejar estados internos en el componente
import { useState } from "react"

// Importamos componentes reutilizables de la interfaz (botón, input y tarjeta)
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

// Importamos Link de Next.js para navegar entre páginas
import Link from "next/link"

// Importamos íconos de la librería lucide-react
import { ArrowLeft, Mail, Shield } from "lucide-react"

// Definimos y exportamos el componente principal de la página de restablecer contraseña
export default function ResetPasswordPage() {
  // Estado para controlar el paso actual del flujo ("email" o "verify")
  const [step, setStep] = useState<"email" | "verify">("email")

  // Estado para almacenar los datos del formulario (email y código de verificación)
  const [formData, setFormData] = useState({
    email: "",
    verificationCode: "",
  })

  // Función que maneja el envío del formulario cuando el usuario ingresa su correo
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault() // Evita que la página se recargue
    // TODO: Aquí debería ir la lógica para enviar un correo con el código de verificación
    setStep("verify") // Cambiamos al paso de verificación
  }

  // Función que maneja el envío del formulario de verificación
  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault() // Evita recarga de la página
    // TODO: Aquí debería ir la lógica para verificar el código y restablecer la contraseña
    console.log("Verification attempt:", formData) // Por ahora solo mostramos en consola
  }

  // Lo que el componente devuelve (interfaz de usuario)
  return (
    <div className="min-h-screen flex">
      {/* Sección izquierda: ilustración visual */}
      <div className="flex-1 bg-muted flex items-center justify-center p-8">
        <div className="relative w-full max-w-lg">
          <div className="aspect-square bg-gradient-to-br from-accent/20 to-primary/20 rounded-3xl flex items-center justify-center">
            <img
              src="/happy-elderly-couple-smiling-with-leaves-backgroun.jpg"
              alt="Pareja de adultos mayores sonrientes"
              className="w-80 h-80 object-cover rounded-2xl"
            />
          </div>
          {/* Figuras decorativas (círculos de colores alrededor de la ilustración) */}
          <div className="absolute -top-4 -right-4 w-16 h-16 bg-accent/10 rounded-full"></div>
          <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-primary/10 rounded-full"></div>
        </div>
      </div>

      {/* Sección derecha: formulario de restablecimiento */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          
          {/* Encabezado con título y descripción */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-balance">Restablecer Contraseña</h1>
            
            {/* Texto cambia dependiendo del paso en el que esté el usuario */}
            {step === "email" ? (
              <p className="text-lg text-muted-foreground text-pretty">
                Ingresa tu correo electrónico para recibir las instrucciones
              </p>
            ) : (
              <p className="text-lg text-muted-foreground text-pretty">
                Hemos enviado un correo de verificación. Revisa tu bandeja de entrada
              </p>
            )}
          </div>

          {/* Tarjeta que contiene el formulario */}
          <Card className="p-8 shadow-lg border-0 bg-card">
            {/* Paso 1: Formulario para ingresar el email */}
            {step === "email" ? (
              <form onSubmit={handleEmailSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                    <Mail size={16} /> {/* Icono de sobre */}
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    className="h-12 text-base"
                    placeholder="correo@ejemplo.com"
                    required
                  />
                </div>

                <Button type="submit" className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90">
                  Enviar Código
                </Button>
              </form>
            ) : (
              /* Paso 2: Formulario para verificar código */
              <form onSubmit={handleVerifySubmit} className="space-y-6">
                {/* Campo mostrando el email ingresado (no editable) */}
                <div className="space-y-2">
                  <label htmlFor="email-display" className="text-sm font-medium flex items-center gap-2">
                    <Mail size={16} /> {/* Icono de sobre */}
                    Email
                  </label>
                  <Input
                    id="email-display"
                    type="email"
                    value={formData.email}
                    disabled
                    className="h-12 text-base bg-muted"
                  />
                </div>

                {/* Campo para ingresar el código de verificación */}
                <div className="space-y-2">
                  <label htmlFor="verification-code" className="text-sm font-medium flex items-center gap-2">
                    <Shield size={16} /> {/* Icono de escudo */}
                    Verificar Código
                  </label>
                  <Input
                    id="verification-code"
                    type="text"
                    value={formData.verificationCode}
                    onChange={(e) => setFormData((prev) => ({ ...prev, verificationCode: e.target.value }))}
                    className="h-12 text-base text-center tracking-widest"
                    placeholder="000000"
                    maxLength={6} // Máximo de 6 dígitos para el código
                    required
                  />
                </div>

                <Button type="submit" className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90">
                  Verificar y Restablecer
                </Button>
              </form>
            )}

            {/* Enlace para volver a la página de inicio de sesión */}
            <div className="mt-6 text-center">
              <Link
                href="/login"
                className="text-sm text-accent hover:text-accent/80 underline flex items-center justify-center gap-2"
              >
                <ArrowLeft size={16} /> {/* Icono de flecha hacia atrás */}
                Volver al Inicio
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
