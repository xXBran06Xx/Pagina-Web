"use client" // Este componente se ejecuta en el cliente (usa hooks de React y navegación del cliente).

// --------------------------
// Imports: React, hooks y UI
// --------------------------
import { useState } from "react" // Hook para estados locales
import { Button } from "@/components/ui/button" // Botones estilizados reutilizables
import { Textarea } from "@/components/ui/textarea" // Textarea para notas largas
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card" // Tarjetas para agrupar bloques
import { Badge } from "@/components/ui/badge" // Pequeñas etiquetas visuales (status, tipo, etc.)
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar" // Avatar con fallback
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs" // Pestañas
import { Calendar } from "@/components/ui/calendar" // Calendario simple

// Íconos desde lucide-react — decoración y semántica visual.
import {
  ArrowLeft,
  User,
  Heart,
  FileText,
  CalendarDays,
  Edit,
  Save,
  Phone,
  Mail,
  MapPin,
  Building2,
  Clock,
  Pill,
  Activity,
} from "lucide-react"

import Link from "next/link" // Navegación interna de Next.js
import { useParams } from "next/navigation" // Para leer :id desde la URL

// =======================================
// Mock data: paciente (simulación API)
// =======================================
// En una app real esto vendría de un fetch / SWR / React Query.
// Aquí lo dejamos embebido para que la página funcione sin backend.
const patientData = {
  1: {
    id: 1,
    cc: "12345678",
    name: "María Elena Vargas",
    fullName: "María Elena Vargas Rodríguez",
    age: 78,
    gender: "Femenino",
    dateOfBirth: "1946-03-15",
    admissionDate: "2023-06-20",
    room: "101A",
    home: "Hogar 1",
    homeId: 1,
    status: "estable",
    phone: "+57 300 555-0123",
    email: "contacto.familia@email.com",
    emergencyContact: "Ana Vargas (Hija) - +57 301 555-0124",
    address: "Calle 45 #23-67, Bogotá",
    avatar: "/placeholder.svg?height=120&width=120",
    medicalHistory: {
      diagnoses: ["Diabetes Mellitus Tipo 2", "Hipertensión Arterial", "Osteoartritis"],
      allergies: ["Penicilina", "Mariscos"],
      medications: [
        { name: "Metformina", dose: "500mg", frequency: "2 veces al día", time: "Desayuno y cena" },
        { name: "Losartán", dose: "50mg", frequency: "1 vez al día", time: "Mañana" },
        { name: "Ibuprofeno", dose: "400mg", frequency: "Según necesidad", time: "Para dolor" },
      ],
      medicalNotes: "Paciente con buen control glucémico. Requiere monitoreo regular de presión arterial.",
    },
    notes: [
      {
        id: 1,
        date: "2024-01-16",
        time: "14:30",
        author: "Ana María Rodríguez",
        type: "cuidado",
        content:
          "Paciente tomó medicamentos sin problemas. Buen apetito durante el almuerzo. Se mostró animada durante la actividad de lectura.",
      },
      {
        id: 2,
        date: "2024-01-16",
        time: "08:15",
        author: "Carlos Eduardo Pérez",
        type: "médico",
        content: "Signos vitales normales. Presión arterial: 130/80. Glucosa: 110 mg/dl. Sin quejas de dolor.",
      },
      {
        id: 3,
        date: "2024-01-15",
        time: "20:45",
        author: "María José González",
        type: "cuidado",
        content: "Noche tranquila. Durmió bien. No presentó episodios de confusión nocturna.",
      },
    ],
    appointments: [
      {
        id: 1,
        date: "2024-01-18",
        time: "10:00",
        type: "médico",
        title: "Control Endocrinología",
        doctor: "Dr. Ramírez",
        status: "programada",
      },
      {
        id: 2,
        date: "2024-01-20",
        time: "15:30",
        type: "actividad",
        title: "Terapia Ocupacional",
        therapist: "Lic. Morales",
        status: "programada",
      },
      {
        id: 3,
        date: "2024-01-22",
        time: "09:00",
        type: "médico",
        title: "Exámenes de Laboratorio",
        doctor: "Laboratorio Clínico",
        status: "programada",
      },
    ],
  },
}

// =======================================
// Componente: PatientDetailsPage
// - Lee el id desde la URL
// - Muestra datos personales, historial, notas y citas
// - Permite escribir notas (simulado)
// =======================================
export default function PatientDetailsPage() {
  // -------- URL / params ----------
  const params = useParams() // { id: '1' } por ejemplo
  const patientId = params.id as string

  // -------- Obtener paciente (mock) ----------
  const patient = patientData[patientId as keyof typeof patientData] || null

  // -------- Estados locales ----------
  const [isEditing, setIsEditing] = useState(false) // Modo edición (no implementado en profundidad)
  const [newNote, setNewNote] = useState("") // Texto para nueva nota
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date()) // Fecha seleccionada en calendario

  // Si no existe el paciente, mostramos mensaje claro (fallo controlado, sin crash).
  if (!patient) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Paciente no encontrado</h1>
          <p className="text-muted-foreground mb-4">El paciente solicitado no existe en el sistema.</p>
          <Link href="/dashboard">
            <Button>Volver al Dashboard</Button>
          </Link>
        </div>
      </div>
    )
  }

  // -----------------------
  // Handlers / helpers
  // -----------------------
  const handleSaveNote = () => {
    if (newNote.trim()) {
      // Aquí debería guardarse en backend; por ahora solo log.
      console.log("Saving note:", newNote)
      setNewNote("") // Limpiamos el campo
    }
  }

  // Mapea estado a clases CSS de colores para badges
  const getStatusColor = (status: string) => {
    switch (status) {
      case "estable":
        return "bg-green-100 text-green-800"
      case "observación":
        return "bg-yellow-100 text-yellow-800"
      case "crítico":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Color según tipo de nota (médico, cuidado, emergencia)
  const getNoteTypeColor = (type: string) => {
    switch (type) {
      case "médico":
        return "bg-blue-100 text-blue-800"
      case "cuidado":
        return "bg-green-100 text-green-800"
      case "emergencia":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Color según tipo de cita/actividad
  const getAppointmentTypeColor = (type: string) => {
    switch (type) {
      case "médico":
        return "bg-blue-100 text-blue-800"
      case "actividad":
        return "bg-purple-100 text-purple-800"
      case "terapia":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // -----------------------
  // Render: layout completo
  // -----------------------
  return (
    <div className="min-h-screen bg-background">
      {/* HEADER: botón de volver + avatar + datos básicos */}
      <header className="border-b bg-card px-6 py-4">
        <div className="flex items-center gap-4">
          {/* Volver al dashboard */}
          <Link href="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>

          {/* Avatar + nombre + status + habitación */}
          <div className="flex items-center gap-4 flex-1">
            <Avatar className="h-16 w-16">
              <AvatarImage src={patient.avatar || "/placeholder.svg"} />
              <AvatarFallback className="text-lg">
                {/* Genera iniciales (hasta 2 letras) */}
                {patient.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h1 className="text-2xl font-bold">{patient.fullName}</h1>
              <p className="text-muted-foreground">CC: {patient.cc}</p>
              <div className="flex items-center gap-4 mt-2">
                {/* Badge con color según estado (estable / observación / crítico) */}
                <Badge className={getStatusColor(patient.status)}>{patient.status}</Badge>
                <span className="text-sm text-muted-foreground">Habitación {patient.room}</span>
                <span className="text-sm text-muted-foreground">{patient.home}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN: pestañas con secciones del paciente */}
      <main className="p-6">
        {/* Tabs: personal / medical / notes / appointments */}
        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personal" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Datos Personales
            </TabsTrigger>
            <TabsTrigger value="medical" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Historial Clínico
            </TabsTrigger>
            <TabsTrigger value="notes" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Notas y Registros
            </TabsTrigger>
            <TabsTrigger value="appointments" className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              Citas y Actividades
            </TabsTrigger>
          </TabsList>

          {/* ---------------- Personal Data Tab ---------------- */}
          <TabsContent value="personal" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Card: Información Personal (lectura, no edición aquí) */}
              <Card>
                <CardHeader>
                  <CardTitle>Información Personal</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Nombre Completo</label>
                      <p className="font-medium">{patient.fullName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Cédula</label>
                      <p className="font-medium">{patient.cc}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Edad</label>
                      <p className="font-medium">{patient.age} años</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Género</label>
                      <p className="font-medium">{patient.gender}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Fecha de Nacimiento</label>
                      <p className="font-medium">{patient.dateOfBirth}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Fecha de Ingreso</label>
                      <p className="font-medium">{patient.admissionDate}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Card: Contacto */}
              <Card>
                <CardHeader>
                  <CardTitle>Información de Contacto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{patient.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{patient.email}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                      <span>{patient.address}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground mt-1" />
                      <span>
                        {patient.home} - Habitación {patient.room}
                      </span>
                    </div>
                  </div>

                  {/* Contacto de emergencia */}
                  <div className="pt-4 border-t">
                    <label className="text-sm font-medium text-muted-foreground">Contacto de Emergencia</label>
                    <p className="font-medium">{patient.emergencyContact}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ---------------- Medical History Tab ---------------- */}
          <TabsContent value="medical" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Diagnósticos */}
              <Card>
                <CardHeader>
                  <CardTitle>Diagnósticos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {patient.medicalHistory.diagnoses.map((diagnosis, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-red-500" />
                        <span>{diagnosis}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Alergias */}
              <Card>
                <CardHeader>
                  <CardTitle>Alergias</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {patient.medicalHistory.allergies.map((allergy, index) => (
                      <Badge key={index} variant="destructive" className="mr-2">
                        {allergy}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Medicamentos actuales (detalle por cada medicamento) */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Medicamentos Actuales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {patient.medicalHistory.medications.map((medication, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Pill className="h-4 w-4 text-blue-500" />
                          <span className="font-medium">{medication.name}</span>
                        </div>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p>Dosis: {medication.dose}</p>
                          <p>Frecuencia: {medication.frequency}</p>
                          <p>Horario: {medication.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Notas médicas generales */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Notas Médicas</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed">{patient.medicalHistory.medicalNotes}</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ---------------- Notes and Records Tab ---------------- */}
          <TabsContent value="notes" className="space-y-6">
            {/* Form para agregar nota */}
            <Card>
              <CardHeader>
                <CardTitle>Agregar Nueva Nota</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Escribe una nueva nota sobre el paciente..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  rows={3}
                />
                <Button onClick={handleSaveNote} disabled={!newNote.trim()}>
                  <Save className="h-4 w-4 mr-2" />
                  Guardar Nota
                </Button>
              </CardContent>
            </Card>

            {/* Historial de notas */}
            <Card>
              <CardHeader>
                <CardTitle>Historial de Notas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patient.notes.map((note) => (
                    <div key={note.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge className={getNoteTypeColor(note.type)}>{note.type}</Badge>
                          <span className="font-medium">{note.author}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {note.date} - {note.time}
                        </div>
                      </div>
                      <p className="text-sm leading-relaxed">{note.content}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ---------------- Appointments and Activities Tab ---------------- */}
          <TabsContent value="appointments" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Calendario interactivo (selección simple) */}
              <Card>
                <CardHeader>
                  <CardTitle>Calendario</CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>

              {/* Lista de próximas citas y actividades */}
              <Card>
                <CardHeader>
                  <CardTitle>Próximas Citas y Actividades</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {patient.appointments.map((appointment) => (
                      <div key={appointment.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <Badge className={getAppointmentTypeColor(appointment.type)}>{appointment.type}</Badge>
                          <span className="text-sm text-muted-foreground">
                            {appointment.date} - {appointment.time}
                          </span>
                        </div>
                        <h4 className="font-medium mb-1">{appointment.title}</h4>
                        <p className="text-sm text-muted-foreground">{appointment.doctor || appointment.therapist}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* BOTONES DE ACCIÓN: editar (toggle) y volver */}
        <div className="flex gap-4 mt-8">
          <Button size="lg" onClick={() => setIsEditing(!isEditing)}>
            <Edit className="h-5 w-5 mr-2" />
            {isEditing ? "Cancelar Edición" : "Editar Información"}
          </Button>
          <Link href="/dashboard">
            <Button variant="outline" size="lg">
              Volver a la Lista de Pacientes
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
