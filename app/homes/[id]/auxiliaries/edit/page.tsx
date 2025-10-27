"use client"

import type React from "react"

// Componente para editar un auxiliar existente
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Save, Edit } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"

export default function EditAuxiliaryPage() {
  const params = useParams()
  const router = useRouter()
  const homeId = params.id as string
  const auxiliaryId = params.auxiliaryId as string

  // Estados para el formulario
  const [formData, setFormData] = useState({
    name: "",
    cc: "",
    phone: "",
    email: "",
    shift: "",
    experience: "",
    status: "activo",
    patients: 0,
    tasksCompleted: "",
    tasksPending: "",
  })

  // Cargar datos del auxiliar al montar el componente
  useEffect(() => {
    const stored = localStorage.getItem("elderlycare-auxiliaries")
    if (stored) {
      const auxiliaries = JSON.parse(stored)
      const auxiliary = auxiliaries.find((aux: any) => aux.id === Number.parseInt(auxiliaryId))
      if (auxiliary) {
        setFormData({
          name: auxiliary.name,
          cc: auxiliary.cc,
          phone: auxiliary.phone,
          email: auxiliary.email,
          shift: auxiliary.shift,
          experience: auxiliary.experience,
          status: auxiliary.status,
          patients: auxiliary.patients,
          tasksCompleted: auxiliary.tasksCompleted.join(", "),
          tasksPending: auxiliary.tasksPending.join(", "),
        })
      }
    }
  }, [auxiliaryId])

  // Función para manejar cambios en los inputs
  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Función para actualizar el auxiliar
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Obtener auxiliares existentes
    const stored = localStorage.getItem("elderlycare-auxiliaries")
    if (stored) {
      const auxiliaries = JSON.parse(stored)
      const updatedAuxiliaries = auxiliaries.map((aux: any) => {
        if (aux.id === Number.parseInt(auxiliaryId)) {
          return {
            ...aux,
            ...formData,
            tasksCompleted: formData.tasksCompleted ? formData.tasksCompleted.split(",").map((t) => t.trim()) : [],
            tasksPending: formData.tasksPending ? formData.tasksPending.split(",").map((t) => t.trim()) : [],
          }
        }
        return aux
      })

      // Guardar en localStorage
      localStorage.setItem("elderlycare-auxiliaries", JSON.stringify(updatedAuxiliaries))

      // Redirigir de vuelta a la lista de auxiliares
      router.push(`/homes/${homeId}/auxiliaries`)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card px-6 py-4">
        <div className="flex items-center gap-4">
          <Link href={`/homes/${homeId}/auxiliaries`}>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Edit className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Editar Auxiliar</h1>
              <p className="text-muted-foreground">Actualice la información del auxiliar</p>
            </div>
          </div>
        </div>
      </header>

      {/* Formulario */}
      <main className="p-6 max-w-4xl mx-auto">
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Información del Auxiliar</CardTitle>
              <CardDescription>Modifique los datos del auxiliar de enfermería</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Información personal */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre Completo *</Label>
                  <Input
                    id="name"
                    placeholder="Ej: Ana María Rodríguez"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cc">Cédula de Ciudadanía *</Label>
                  <Input
                    id="cc"
                    placeholder="Ej: 1234567890"
                    value={formData.cc}
                    onChange={(e) => handleChange("cc", e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Información de contacto */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono *</Label>
                  <Input
                    id="phone"
                    placeholder="Ej: +57 300 123-4567"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Ej: auxiliar@cuidado.com"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Información laboral */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="shift">Turno *</Label>
                  <Select value={formData.shift} onValueChange={(value) => handleChange("shift", value)} required>
                    <SelectTrigger id="shift">
                      <SelectValue placeholder="Seleccionar turno" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mañana">Mañana</SelectItem>
                      <SelectItem value="Tarde">Tarde</SelectItem>
                      <SelectItem value="Noche">Noche</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Experiencia *</Label>
                  <Input
                    id="experience"
                    placeholder="Ej: 5 años"
                    value={formData.experience}
                    onChange={(e) => handleChange("experience", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Estado *</Label>
                  <Select value={formData.status} onValueChange={(value) => handleChange("status", value)} required>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Seleccionar estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="activo">Activo</SelectItem>
                      <SelectItem value="vacaciones">Vacaciones</SelectItem>
                      <SelectItem value="licencia">Licencia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Número de pacientes */}
              <div className="space-y-2">
                <Label htmlFor="patients">Número de Pacientes Asignados</Label>
                <Input
                  id="patients"
                  type="number"
                  min="0"
                  placeholder="Ej: 8"
                  value={formData.patients}
                  onChange={(e) => handleChange("patients", Number.parseInt(e.target.value) || 0)}
                />
              </div>

              {/* Tareas */}
              <div className="space-y-2">
                <Label htmlFor="tasksCompleted">Tareas Completadas (separadas por comas)</Label>
                <Textarea
                  id="tasksCompleted"
                  placeholder="Ej: Administrar medicamentos, Revisar signos vitales, Alimentación pacientes"
                  value={formData.tasksCompleted}
                  onChange={(e) => handleChange("tasksCompleted", e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tasksPending">Tareas Pendientes (separadas por comas)</Label>
                <Textarea
                  id="tasksPending"
                  placeholder="Ej: Reporte diario, Limpieza habitaciones"
                  value={formData.tasksPending}
                  onChange={(e) => handleChange("tasksPending", e.target.value)}
                  rows={3}
                />
              </div>

              {/* Botones de acción */}
              <div className="flex gap-4 pt-4">
                <Button type="submit" className="flex-1">
                  <Save className="h-4 w-4 mr-2" />
                  Guardar Cambios
                </Button>
                <Link href={`/homes/${homeId}/auxiliaries`} className="flex-1">
                  <Button type="button" variant="outline" className="w-full bg-transparent">
                    Cancelar
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </form>
      </main>
    </div>
  )
}
