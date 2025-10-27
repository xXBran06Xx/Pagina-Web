"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Building2, Users, MapPin, Phone, Mail, Trash2 } from "lucide-react"
import Link from "next/link"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const defaultHomes = [
  {
    id: 1,
    name: "Hogar 1",
    address: "Calle 123 #45-67, Bogotá",
    phone: "+57 1 234-5678",
    email: "hogar1@cuidado.com",
    capacity: 25,
    occupied: 22,
    auxiliaries: 6,
    status: "activo",
    image: "/cozy-elderly-care-home-exterior.jpg",
    description: "Hogar especializado en cuidado integral para adultos mayores",
  },
  {
    id: 2,
    name: "Hogar 2",
    address: "Carrera 89 #12-34, Medellín",
    phone: "+57 4 567-8901",
    email: "hogar2@cuidado.com",
    capacity: 30,
    occupied: 28,
    auxiliaries: 8,
    status: "activo",
    image: "/modern-elderly-care-facility-with-garden.jpg",
    description: "Moderno centro de cuidado con amplios jardines",
  },
  {
    id: 3,
    name: "Hogar 3",
    address: "Avenida 56 #78-90, Cali",
    phone: "+57 2 345-6789",
    email: "hogar3@cuidado.com",
    capacity: 20,
    occupied: 15,
    auxiliaries: 5,
    status: "activo",
    image: "/peaceful-elderly-home-with-trees.jpg",
    description: "Ambiente tranquilo rodeado de naturaleza",
  },
  {
    id: 4,
    name: "Hogar 4",
    address: "Calle 34 #56-78, Barranquilla",
    phone: "+57 5 678-9012",
    email: "hogar4@cuidado.com",
    capacity: 35,
    occupied: 32,
    auxiliaries: 9,
    status: "activo",
    image: "/bright-elderly-care-home-with-flowers.jpg",
    description: "Hogar luminoso con hermosos jardines florales",
  },
  {
    id: 5,
    name: "Hogar 5",
    address: "Carrera 12 #34-56, Bucaramanga",
    phone: "+57 7 901-2345",
    email: "hogar5@cuidado.com",
    capacity: 28,
    occupied: 20,
    auxiliaries: 7,
    status: "mantenimiento",
    image: "/traditional-elderly-care-house.jpg",
    description: "Casa tradicional en proceso de renovación",
  },
  {
    id: 6,
    name: "Hogar 6",
    address: "Avenida 78 #90-12, Cartagena",
    phone: "+57 5 234-5678",
    email: "hogar6@cuidado.com",
    capacity: 22,
    occupied: 18,
    auxiliaries: 6,
    status: "activo",
    image: "/coastal-elderly-care-home.jpg",
    description: "Hogar costero con vista al mar",
  },
]

export default function HomesPage() {
  const [homes, setHomes] = useState(defaultHomes)
  const [selectedHome, setSelectedHome] = useState<number | null>(null)

  useEffect(() => {
    const savedHomes = localStorage.getItem("elderlycare-homes")
    if (savedHomes) {
      try {
        const parsedHomes = JSON.parse(savedHomes)
        setHomes(parsedHomes)
      } catch (error) {
        console.error("Error loading homes from localStorage:", error)
        localStorage.setItem("elderlycare-homes", JSON.stringify(defaultHomes))
      }
    } else {
      localStorage.setItem("elderlycare-homes", JSON.stringify(defaultHomes))
    }
  }, [])

  const getOccupancyRate = (occupied: number, capacity: number) => {
    return Math.round((occupied / capacity) * 100)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "activo":
        return "bg-green-100 text-green-800"
      case "mantenimiento":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const deleteHome = (homeId: number) => {
    const updatedHomes = homes.filter((home) => home.id !== homeId)
    setHomes(updatedHomes)
    localStorage.setItem("elderlycare-homes", JSON.stringify(updatedHomes))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card px-6 py-4">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Gestión de Hogares</h1>
            <p className="text-muted-foreground">Administra todos los hogares de cuidado</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{homes.length}</div>
              <div className="text-sm text-muted-foreground">Total Hogares</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{homes.filter((h) => h.status === "activo").length}</div>
              <div className="text-sm text-muted-foreground">Hogares Activos</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{homes.reduce((sum, h) => sum + h.occupied, 0)}</div>
              <div className="text-sm text-muted-foreground">Residentes</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{homes.reduce((sum, h) => sum + h.auxiliaries, 0)}</div>
              <div className="text-sm text-muted-foreground">Auxiliares</div>
            </CardContent>
          </Card>
        </div>

        {/* Homes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {homes.map((home) => (
            <Card key={home.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video relative">
                <img
                  src={home.image || "/placeholder.svg"}
                  alt={`Ilustración de ${home.name}`}
                  className="w-full h-full object-cover"
                />
                <Badge className={`absolute top-3 right-3 ${getStatusColor(home.status)}`}>{home.status}</Badge>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="icon" className="absolute top-3 left-3 h-8 w-8">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>¿Eliminar hogar?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta acción no se puede deshacer. Se eliminará permanentemente el hogar "{home.name}" y todos
                        sus datos asociados.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => deleteHome(home.id)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Eliminar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  {home.name}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{home.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{home.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{home.email}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary">
                      {home.occupied}/{home.capacity}
                    </div>
                    <div className="text-xs text-muted-foreground">Ocupación</div>
                    <div className="text-xs font-medium">{getOccupancyRate(home.occupied, home.capacity)}%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary">{home.auxiliaries}</div>
                    <div className="text-xs text-muted-foreground">Auxiliares</div>
                    <div className="text-xs font-medium">Asignados</div>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Link href={`/homes/${home.id}/auxiliaries`} className="flex-1">
                    <Button className="w-full" size="sm">
                      <Users className="h-4 w-4 mr-2" />
                      Ver Auxiliares
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm">
                    Detalles
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add New Home Button */}
        <div className="mt-8 text-center">
          <Link href="/homes/add">
            <Button size="lg" className="gap-2">
              <Building2 className="h-5 w-5" />
              Agregar Nuevo Hogar
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
