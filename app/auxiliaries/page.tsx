"use client"

// Importaciones necesarias para la gestión de auxiliares
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import {
  ArrowLeft,
  UserCheck,
  Search,
  Plus,
  Edit,
  Trash2,
  Building2,
  Phone,
  Mail,
  Clock,
  Users,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

// Interfaz para tipado de auxiliares
interface Auxiliary {
  id: number
  name: string
  phone: string
  email: string
  shift: string
  homeId: number
  homeName: string
  patients: number
  completedTasks: string[]
  pendingTasks: string[]
  avatar?: string
}

// Interfaz para tipado de hogares
interface Home {
  id: number
  name: string
  capacity: number
  occupied: number
  auxiliaries: number
}

export default function AuxiliariesPage() {
  const router = useRouter()
  const [auxiliaries, setAuxiliaries] = useState<Auxiliary[]>([])
  const [homes, setHomes] = useState<Home[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterHome, setFilterHome] = useState<string>("all")
  const [filterShift, setFilterShift] = useState<string>("all")

  // Cargar datos desde localStorage al montar el componente
  useEffect(() => {
    const storedAuxiliaries = localStorage.getItem("elderlycare-auxiliaries")
    if (storedAuxiliaries) {
      setAuxiliaries(JSON.parse(storedAuxiliaries))
    }

    const storedHomes = localStorage.getItem("elderlycare-homes")
    if (storedHomes) {
      setHomes(JSON.parse(storedHomes))
    }
  }, [])

  // Función para eliminar un auxiliar
  const deleteAuxiliary = (auxiliaryId: number) => {
    const updatedAuxiliaries = auxiliaries.filter((aux) => aux.id !== auxiliaryId)
    setAuxiliaries(updatedAuxiliaries)
    localStorage.setItem("elderlycare-auxiliaries", JSON.stringify(updatedAuxiliaries))
  }

  // Función para asignar un auxiliar a un hogar diferente
  const reassignAuxiliary = (auxiliaryId: number, newHomeId: number) => {
    const home = homes.find((h) => h.id === newHomeId)
    if (!home) return

    const updatedAuxiliaries = auxiliaries.map((aux) =>
      aux.id === auxiliaryId
        ? {
            ...aux,
            homeId: newHomeId,
            homeName: home.name,
          }
        : aux,
    )

    setAuxiliaries(updatedAuxiliaries)
    localStorage.setItem("elderlycare-auxiliaries", JSON.stringify(updatedAuxiliaries))
  }

  // Filtrar auxiliares según búsqueda y filtros
  const filteredAuxiliaries = auxiliaries.filter((aux) => {
    const matchesSearch =
      aux.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      aux.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesHome = filterHome === "all" || aux.homeId.toString() === filterHome
    const matchesShift = filterShift === "all" || aux.shift.toLowerCase().includes(filterShift.toLowerCase())

    return matchesSearch && matchesHome && matchesShift
  })

  // Calcular estadísticas
  const totalAuxiliaries = auxiliaries.length
  const totalPatients = auxiliaries.reduce((sum, aux) => sum + (aux.patients || 0), 0)
  const totalCompletedTasks = auxiliaries.reduce((sum, aux) => sum + (aux.completedTasks?.length || 0), 0)
  const totalPendingTasks = auxiliaries.reduce((sum, aux) => sum + (aux.pendingTasks?.length || 0), 0)

  return (
    <div className="min-h-screen bg-background">
      {/* Encabezado con navegación */}
      <header className="border-b bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <UserCheck className="h-6 w-6" />
                Gestión de Auxiliares
              </h1>
              <p className="text-sm text-muted-foreground">Administra el personal de cuidado</p>
            </div>
          </div>
          <Link href="/auxiliaries/add">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Agregar Auxiliar
            </Button>
          </Link>
        </div>
      </header>

      <main className="p-6 space-y-6">
        {/* Tarjetas de estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Auxiliares</p>
                  <p className="text-2xl font-bold">{totalAuxiliaries}</p>
                </div>
                <UserCheck className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pacientes Asignados</p>
                  <p className="text-2xl font-bold">{totalPatients}</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Tareas Completadas</p>
                  <p className="text-2xl font-bold">{totalCompletedTasks}</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Tareas Pendientes</p>
                  <p className="text-2xl font-bold">{totalPendingTasks}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros y búsqueda */}
        <Card>
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Búsqueda por nombre o email */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nombre o email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filtro por hogar */}
              <Select value={filterHome} onValueChange={setFilterHome}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por hogar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los hogares</SelectItem>
                  {homes.map((home) => (
                    <SelectItem key={home.id} value={home.id.toString()}>
                      {home.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Filtro por turno */}
              <Select value={filterShift} onValueChange={setFilterShift}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por turno" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los turnos</SelectItem>
                  <SelectItem value="mañana">Mañana</SelectItem>
                  <SelectItem value="tarde">Tarde</SelectItem>
                  <SelectItem value="noche">Noche</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Lista de auxiliares */}
        <div className="grid grid-cols-1 gap-4">
          {filteredAuxiliaries.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <UserCheck className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No se encontraron auxiliares</p>
              </CardContent>
            </Card>
          ) : (
            filteredAuxiliaries.map((auxiliary) => (
              <Card key={auxiliary.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Información del auxiliar */}
                    <div className="flex items-start gap-4 flex-1">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={auxiliary.avatar || `/placeholder.svg?height=64&width=64`} />
                        <AvatarFallback>
                          {auxiliary.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 space-y-3">
                        <div>
                          <h3 className="text-xl font-semibold">{auxiliary.name}</h3>
                          <div className="flex flex-wrap items-center gap-2 mt-2">
                            <Badge variant="outline" className="gap-1">
                              <Building2 className="h-3 w-3" />
                              {auxiliary.homeName}
                            </Badge>
                            <Badge variant="secondary" className="gap-1">
                              <Clock className="h-3 w-3" />
                              {auxiliary.shift?.split(" ")[0] || "N/A"}
                            </Badge>
                            <Badge variant="secondary" className="gap-1">
                              <Users className="h-3 w-3" />
                              {auxiliary.patients || 0} pacientes
                            </Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Phone className="h-4 w-4" />
                            {auxiliary.phone}
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Mail className="h-4 w-4" />
                            {auxiliary.email}
                          </div>
                        </div>

                        {/* Tareas */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                          <div>
                            <p className="text-sm font-medium text-green-600 mb-1 flex items-center gap-1">
                              <CheckCircle2 className="h-4 w-4" />
                              Completadas ({auxiliary.completedTasks?.length || 0})
                            </p>
                            <ul className="text-xs text-muted-foreground space-y-1">
                              {(auxiliary.completedTasks || []).slice(0, 2).map((task, idx) => (
                                <li key={idx} className="line-clamp-1">
                                  • {task}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <p className="text-sm font-medium text-orange-600 mb-1 flex items-center gap-1">
                              <AlertCircle className="h-4 w-4" />
                              Pendientes ({auxiliary.pendingTasks?.length || 0})
                            </p>
                            <ul className="text-xs text-muted-foreground space-y-1">
                              {(auxiliary.pendingTasks || []).slice(0, 2).map((task, idx) => (
                                <li key={idx} className="line-clamp-1">
                                  • {task}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Acciones */}
                    <div className="flex md:flex-col gap-2">
                      {/* Reasignar hogar */}
                      <Select
                        value={auxiliary.homeId.toString()}
                        onValueChange={(value) => reassignAuxiliary(auxiliary.id, Number.parseInt(value))}
                      >
                        <SelectTrigger className="w-full md:w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {homes.map((home) => (
                            <SelectItem key={home.id} value={home.id.toString()}>
                              {home.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {/* Botón editar */}
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 bg-transparent"
                        onClick={() => router.push(`/homes/${auxiliary.homeId}/auxiliaries/${auxiliary.id}/edit`)}
                      >
                        <Edit className="h-4 w-4" />
                        Editar
                      </Button>

                      {/* Botón eliminar */}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm" className="gap-2">
                            <Trash2 className="h-4 w-4" />
                            Eliminar
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>¿Eliminar auxiliar?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta acción no se puede deshacer. Se eliminará permanentemente a {auxiliary.name} del
                              sistema.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteAuxiliary(auxiliary.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Eliminar
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  )
}
