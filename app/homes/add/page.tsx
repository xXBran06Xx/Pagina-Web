"use client" 
// Esto le dice a Next.js que este componente se ejecuta en el cliente (navegador)
// porque usa hooks de React como useState o useRouter.

import type React from "react"
// Importamos React solo para tipar eventos como React.FormEvent.

import { useState } from "react" // Hook de estado para manejar los valores del formulario y la carga.
import { Button } from "@/components/ui/button" // Botón reutilizable de la librería UI.
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card" // Tarjetas para agrupar secciones visuales.
import { Input } from "@/components/ui/input" // Campo de entrada de texto/numérico.
import { Label } from "@/components/ui/label" // Etiquetas descriptivas para inputs.
import { Textarea } from "@/components/ui/textarea" // Área de texto para descripciones largas.
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select" 
// Desplegable para elegir estado (activo, mantenimiento, inactivo).

import { ArrowLeft, Building2, Save, Upload } from "lucide-react" 
// Iconos SVG que se usan en botones y títulos.

import Link from "next/link" // Enlaces de Next.js para navegación sin recarga.
import { useRouter } from "next/navigation" // Hook de navegación programática (redirigir a otra página).

// ---------------------
// COMPONENTE PRINCIPAL
// ---------------------
export default function AddHomePage() {
  const router = useRouter() // Permite redirigir al usuario a otra ruta.

  // Estado de carga: true mientras se está "guardando".
  const [isLoading, setIsLoading] = useState(false)

  // Estado del formulario: guarda los valores de cada campo.
  const [formData, setFormData] = useState({
    name: "",         // Nombre del hogar
    address: "",      // Dirección
    phone: "",        // Teléfono
    email: "",        // Correo electrónico
    capacity: "",     // Capacidad (número de pacientes)
    description: "",  // Texto libre con detalles
    status: "activo", // Estado inicial por defecto
    image: "",        // URL de la imagen
  })

  // ---------------------
  // MANEJADORES DE EVENTOS
  // ---------------------

  // Actualiza el valor de un campo del formulario.
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,        // Copiamos lo que ya tenía
      [field]: value, // Cambiamos solo el campo modificado
    }))
  }

  // Se ejecuta al enviar el formulario.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault() // Evita recargar la página.
    setIsLoading(true) // Activamos estado de "guardando".

    // Simulamos llamada a API con retardo de 1.5 segundos.
    await new Promise((resolve) => setTimeout(resolve, 1500))

    try {
      // Traemos los hogares guardados desde localStorage (si no hay, devolvemos un array vacío).
      const existingHomes = JSON.parse(localStorage.getItem("elderlycare-homes") || "[]")

      // Calculamos el nuevo ID: máximo existente + 1 (o 1 si no hay registros).
      const newId = existingHomes.length > 0 
        ? Math.max(...existingHomes.map((h: any) => h.id)) + 1 
        : 1

      // Creamos el objeto con la información del nuevo hogar.
      const newHome = {
        id: newId,
        name: formData.name,
        address: formData.address,
        phone: formData.phone,
        email: formData.email,
        capacity: Number.parseInt(formData.capacity), // Lo pasamos a número entero
        occupied: 0,       // Siempre empieza en 0
        auxiliaries: 0,    // Siempre empieza en 0
        status: formData.status,
        image: formData.image || "/elderly-care-home.jpg", // Imagen por defecto si no se sube ninguna
        description: formData.description,
      }

      // Agregamos el nuevo hogar a la lista existente.
      const updatedHomes = [...existingHomes, newHome]

      // Guardamos la lista actualizada en localStorage.
      localStorage.setItem("elderlycare-homes", JSON.stringify(updatedHomes))

      console.log("[v0] Nuevo hogar guardado exitosamente:", newHome)
    } catch (error) {
      console.error("[v0] Error al guardar hogar:", error)
    }

    // Redirigimos al usuario a la página de hogares.
    router.push("/homes")
  }

  // Validamos que los campos obligatorios no estén vacíos.
  const isFormValid = formData.name && formData.address && formData.phone && formData.email && formData.capacity

  // ---------------------
  // RENDERIZADO (UI)
  // ---------------------
  return (
    <div className="min-h-screen bg-background">
      
      {/* HEADER - Barra superior con botón de volver */}
      <header className="border-b bg-card px-6 py-4">
        <div className="flex items-center gap-4">
          {/* Botón de volver a la lista de hogares */}
          <Link href="/homes">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          {/* Títulos */}
          <div>
            <h1 className="text-2xl font-bold">Agregar Nuevo Hogar</h1>
            <p className="text-muted-foreground">Registra un nuevo hogar de cuidado</p>
          </div>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="container max-w-3xl py-8">
        {/* Formulario con todas las secciones */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* CARD 1 - Información básica */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Información Básica
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              
              {/* Nombre del hogar */}
              <div className="space-y-2">
                <Label htmlFor="name">Nombre del Hogar</Label>
                <Input
                  id="name"
                  placeholder="Ej: Hogar San José"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </div>

              {/* Dirección */}
              <div className="space-y-2">
                <Label htmlFor="address">Dirección</Label>
                <Input
                  id="address"
                  placeholder="Ej: Calle 123 #45-67"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* CARD 2 - Contacto */}
          <Card>
            <CardHeader>
              <CardTitle>Contacto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">

              {/* Teléfono */}
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Ej: +57 300 123 4567"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  required
                />
              </div>

              {/* Correo */}
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Ej: contacto@hogar.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* CARD 3 - Capacidad y estado */}
          <Card>
            <CardHeader>
              <CardTitle>Capacidad y Estado</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              
              {/* Capacidad */}
              <div className="space-y-2">
                <Label htmlFor="capacity">Capacidad de Pacientes</Label>
                <Input
                  id="capacity"
                  type="number"
                  placeholder="Ej: 50"
                  value={formData.capacity}
                  onChange={(e) => handleInputChange("capacity", e.target.value)}
                  required
                />
              </div>

              {/* Estado */}
              <div className="space-y-2">
                <Label htmlFor="status">Estado</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleInputChange("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="activo">Activo</SelectItem>
                    <SelectItem value="mantenimiento">En Mantenimiento</SelectItem>
                    <SelectItem value="inactivo">Inactivo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* CARD 4 - Descripción */}
          <Card>
            <CardHeader>
              <CardTitle>Descripción</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Agrega una descripción del hogar..."
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
              />
            </CardContent>
          </Card>

          {/* CARD 5 - Imagen */}
          <Card>
            <CardHeader>
              <CardTitle>Imagen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Input
                  placeholder="URL de la imagen (opcional)"
                  value={formData.image}
                  onChange={(e) => handleInputChange("image", e.target.value)}
                />
                <Button variant="outline" type="button" className="w-full">
                  <Upload className="mr-2 h-4 w-4" />
                  Subir Imagen
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* BOTONES DE ACCIÓN */}
          <div className="flex justify-end gap-4">
            {/* Cancelar vuelve a /homes */}
            <Link href="/homes">
              <Button variant="outline" type="button">Cancelar</Button>
            </Link>

            {/* Guardar */}
            <Button 
              type="submit" 
              disabled={isLoading || !isFormValid}
            >
              {isLoading ? (
                "Guardando..." // Texto mientras se guarda
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" /> Guardar Hogar
                </>
              )}
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}
