"use client"

import type React from "react"

// Página para agregar nuevos auxiliares al sistema
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, UserCheck, Save } from "lucide-react"

interface Home {
  id: number
  name: string
}

export default function AddAuxiliaryPage() {
  const router = useRouter()
  const [homes, setHomes] = useState<Home[]>([])
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    shift: "",
    homeId: "",
    patients: 0,
    completedTasks: "",
    pendingTasks: "",
  })

  // Cargar hogares disponibles
  useEffect(() => {
    const storedHomes = localStorage.getItem("elderlycare-homes")
    if (storedHomes) {
      setHomes(JSON.parse(storedHomes))
    }
  }, [])

  // Manejar envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validar campos requeridos
    if (!formData.name || !formData.phone || !formData.email || !formData.shift || !formData.homeId) {
      alert("Por favor completa todos los campos requeridos")
      return
    }

    // Obtener auxiliares existentes
    const storedAuxiliaries = localStorage.getItem("elderlycare-auxiliaries")
    const auxiliaries = storedAuxiliaries ? JSON.parse(storedAuxiliaries) : []

    // Encontrar el hogar seleccionado
    const selectedHome = homes.find((h) => h.id.toString() === formData.homeId)

    // Crear nuevo auxiliar
    const newAuxiliary = {
      id: Date.now(),
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      shift: formData.shift,
      homeId: Number.parseInt(formData.homeId),
      homeName: selectedHome?.name || "",
      patients: formData.patients,
      completedTasks: formData.completedTasks ? formData.completedTasks.split("\n").filter((t) => t.trim()) : [],
      pendingTasks: formData.pendingTasks ? formData.pendingTasks.split("\n").filter((t) => t.trim()) : [],
    }

    // Guardar en localStorage
    auxiliaries.push(newAuxiliary)
    localStorage.setItem("elderlycare-auxiliaries", JSON.stringify(auxiliaries))

    // Redirigir a la lista de auxiliares
    router.push("/auxiliaries")
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card px-6 py-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <UserCheck className="h-6 w-6" />
              Agregar Nuevo Auxiliar
            </h1>
            <p className="text-sm text-muted-foreground">Completa la información del nuevo auxiliar</p>
          </div>
        </div>
      </header>

      <main className="p-6">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Información del Auxiliar</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Información básica */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Nombre Completo *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ej: María González"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Teléfono *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+57 300 123 4567"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="maria@residencia.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="shift">Turno *</Label>
                    <Select
                      value={formData.shift}
                      onValueChange={(value) => setFormData({ ...formData, shift: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un turno" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mañana (6:00 AM - 2:00 PM)">Mañana (6:00 AM - 2:00 PM)</SelectItem>
                        <SelectItem value="Tarde (2:00 PM - 10:00 PM)">Tarde (2:00 PM - 10:00 PM)</SelectItem>
                        <SelectItem value="Noche (10:00 PM - 6:00 AM)">Noche (10:00 PM - 6:00 AM)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="homeId">Hogar Asignado *</Label>
                    <Select
                      value={formData.homeId}
                      onValueChange={(value) => setFormData({ ...formData, homeId: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un hogar" />
                      </SelectTrigger>
                      <SelectContent>
                        {homes.map((home) => (
                          <SelectItem key={home.id} value={home.id.toString()}>
                            {home.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="patients">Número de Pacientes Asignados</Label>
                  <Input
                    id="patients"
                    type="number"
                    min="0"
                    value={formData.patients}
                    onChange={(e) => setFormData({ ...formData, patients: Number.parseInt(e.target.value) || 0 })}
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Tareas */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="completedTasks">Tareas Completadas (una por línea)</Label>
                  <Textarea
                    id="completedTasks"
                    value={formData.completedTasks}
                    onChange={(e) => setFormData({ ...formData, completedTasks: e.target.value })}
                    placeholder="Administración de medicamentos&#10;Control de signos vitales"
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="pendingTasks">Tareas Pendientes (una por línea)</Label>
                  <Textarea
                    id="pendingTasks"
                    value={formData.pendingTasks}
                    onChange={(e) => setFormData({ ...formData, pendingTasks: e.target.value })}
                    placeholder="Reporte diario&#10;Actividades recreativas"
                    rows={4}
                  />
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex gap-4 justify-end">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Cancelar
                </Button>
                <Button type="submit" className="gap-2">
                  <Save className="h-4 w-4" />
                  Guardar Auxiliar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
