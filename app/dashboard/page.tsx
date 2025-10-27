"use client"

// Importaciones necesarias para React y componentes UI
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Menu,
  Home,
  Building2,
  Users,
  UserCheck,
  Shield,
  History,
  LogOut,
  Calendar,
  ChevronRight,
  CheckCircle2,
  Clock,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"

// Datos estáticos de eventos próximos (fechas importantes y actividades)
const upcomingEvents = [
  { date: "20 Jul", name: "Independencia", type: "nacional" },
  { date: "7 Ago", name: "Batalla de Boyacá", type: "nacional" },
  { date: "29 Ago", name: "Día del Adulto Mayor", type: "especial" },
  { date: "15 Sep", name: "Revisión Médica General", type: "medico" },
]

// Configuración de las tarjetas de acceso rápido con iconos y progreso
const quickAccess = [
  { name: "Hogares", icon: Building2, progress: 85, href: "/homes" },
  { name: "Auxiliares", icon: UserCheck, progress: 92, href: "/auxiliaries" },
  { name: "Pacientes", icon: Users, progress: 78, href: "/patients" },
  { name: "Administradores", icon: Shield, progress: 95, href: "/administrators" },
]

// Elementos del menú de navegación principal
const menuItems = [
  { name: "Inicio", icon: Home, href: "/dashboard" },
  { name: "Hogares", icon: Building2, href: "/homes" },
  { name: "Auxiliares", icon: UserCheck, href: "/auxiliaries" },
  { name: "Pacientes", icon: Users, href: "/patients" },
  { name: "Permisos", icon: Shield, href: "/permissions" },
  { name: "Historial", icon: History, href: "/history" },
]

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

const defaultAuxiliaries: Auxiliary[] = [
  {
    id: 1,
    name: "Ana María López",
    phone: "+57 300 123 4567",
    email: "ana.lopez@residencia.com",
    shift: "Mañana (6:00 AM - 2:00 PM)",
    homeId: 1,
    homeName: "Casa del Sol",
    patients: 8,
    completedTasks: ["Administración de medicamentos", "Control de signos vitales"],
    pendingTasks: ["Reporte diario", "Actividades recreativas"],
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    phone: "+57 301 234 5678",
    email: "carlos.rodriguez@residencia.com",
    shift: "Tarde (2:00 PM - 10:00 PM)",
    homeId: 1,
    homeName: "Casa del Sol",
    patients: 7,
    completedTasks: ["Asistencia en alimentación", "Higiene personal"],
    pendingTasks: ["Control de medicamentos noche", "Registro de incidencias"],
  },
  {
    id: 3,
    name: "María Fernanda Gómez",
    phone: "+57 302 345 6789",
    email: "maria.gomez@residencia.com",
    shift: "Noche (10:00 PM - 6:00 AM)",
    homeId: 2,
    homeName: "Villa Esperanza",
    patients: 6,
    completedTasks: ["Rondas nocturnas", "Atención de emergencias"],
    pendingTasks: ["Reporte de turno", "Preparación desayuno"],
  },
  {
    id: 4,
    name: "Jorge Luis Martínez",
    phone: "+57 303 456 7890",
    email: "jorge.martinez@residencia.com",
    shift: "Mañana (6:00 AM - 2:00 PM)",
    homeId: 2,
    homeName: "Villa Esperanza",
    patients: 9,
    completedTasks: ["Terapia física", "Control de glucosa"],
    pendingTasks: ["Documentación médica", "Coordinación con familiares"],
  },
  {
    id: 5,
    name: "Laura Sofía Ramírez",
    phone: "+57 304 567 8901",
    email: "laura.ramirez@residencia.com",
    shift: "Tarde (2:00 PM - 10:00 PM)",
    homeId: 3,
    homeName: "Hogar Tranquilo",
    patients: 5,
    completedTasks: ["Actividades recreativas", "Acompañamiento emocional"],
    pendingTasks: ["Administración medicamentos", "Reporte diario"],
  },
]

// Componente principal del dashboard
export default function DashboardPage() {
  // Estado para almacenar el nombre del usuario actual
  const [userName] = useState("Dr. María González")
  const [auxiliaries, setAuxiliaries] = useState<Auxiliary[]>([])
  const [homes, setHomes] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  // Hook de Next.js para navegación programática
  const router = useRouter()

  useEffect(() => {
    try {
      // Cargar hogares desde localStorage
      const storedHomes = localStorage.getItem("elderlycare-homes")
      if (storedHomes) {
        setHomes(JSON.parse(storedHomes))
      }

      // Cargar auxiliares desde localStorage o usar datos por defecto
      const storedAuxiliaries = localStorage.getItem("elderlycare-auxiliaries")
      if (storedAuxiliaries) {
        const parsed = JSON.parse(storedAuxiliaries)
        const validatedAuxiliaries = parsed.map((aux: any) => ({
          ...aux,
          completedTasks: aux.completedTasks || [],
          pendingTasks: aux.pendingTasks || [],
          patients: aux.patients || 0,
        }))
        setAuxiliaries(validatedAuxiliaries)
      } else {
        setAuxiliaries(defaultAuxiliaries)
        localStorage.setItem("elderlycare-auxiliaries", JSON.stringify(defaultAuxiliaries))
      }
    } catch (error) {
      console.error("[v0] Error loading data:", error)
      setAuxiliaries(defaultAuxiliaries)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const totalPatients = auxiliaries.reduce((sum, aux) => sum + (aux.patients || 0), 0)
  const totalCompletedTasks = auxiliaries.reduce((sum, aux) => sum + (aux.completedTasks?.length || 0), 0)
  const totalPendingTasks = auxiliaries.reduce((sum, aux) => sum + (aux.pendingTasks?.length || 0), 0)
  const totalTasks = totalCompletedTasks + totalPendingTasks
  const completionRate = totalTasks > 0 ? Math.round((totalCompletedTasks / totalTasks) * 100) : 0

  // Función para cerrar sesión y limpiar datos almacenados
  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("isLoggedIn")
    sessionStorage.clear()
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Encabezado principal con navegación y perfil de usuario */}
      <header className="border-b bg-card px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Sección izquierda - Menú hamburguesa para móviles */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            {/* Panel deslizante con menú de navegación */}
            <SheetContent side="left" className="w-80">
              <SheetHeader>
                <SheetTitle className="text-left">Menú Principal</SheetTitle>
              </SheetHeader>
              <nav className="mt-8 space-y-2">
                {menuItems.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <Button variant="ghost" className="w-full justify-start gap-3 h-12 text-base">
                      <item.icon className="h-5 w-5" />
                      {item.name}
                    </Button>
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Menú de navegación para escritorio (oculto en móviles) */}
          <nav className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <Button variant="ghost" className="gap-2">
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Button>
              </Link>
            ))}
          </nav>

          {/* Sección derecha - Perfil de usuario con dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2 h-auto p-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>MG</AvatarFallback>
                </Avatar>
                <span className="hidden md:inline font-medium">{userName}</span>
              </Button>
            </DropdownMenuTrigger>
            {/* Contenido del dropdown con estadísticas del usuario */}
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-4 space-y-4">
                {/* Información del usuario */}
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder.svg?height=48&width=48" />
                    <AvatarFallback>MG</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{userName}</p>
                    <p className="text-sm text-muted-foreground">Administrador</p>
                  </div>
                </div>

                {/* Estadísticas rápidas con barras de progreso */}
                <div className="space-y-3">
                  {/* Personal disponible */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Personal disponible</span>
                      <span className="font-medium">87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>

                  {/* Ocupación de hogares */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Ocupación</span>
                      <span className="font-medium">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>

                  {/* Notas completadas */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Notas completadas</span>
                      <span className="font-medium">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                </div>
              </div>

              <DropdownMenuSeparator />
              {/* Opción para cerrar sesión */}
              <DropdownMenuItem className="text-destructive" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar Sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Contenido principal del dashboard */}
      <main className="p-6 space-y-8">
        {/* Mensaje de bienvenida personalizado */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-balance">¡Bienvenido, {userName.split(" ")[1]}!</h1>
          <p className="text-muted-foreground">Gestiona eficientemente todos los aspectos del cuidado</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tarjeta del calendario con eventos próximos */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Próximos Eventos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="text-center">
                      <div className="text-sm font-bold">{event.date.split(" ")[0]}</div>
                      <div className="text-xs text-muted-foreground">{event.date.split(" ")[1]}</div>
                    </div>
                    <div>
                      <p className="font-medium text-sm">{event.name}</p>
                      <Badge variant="secondary" className="text-xs">
                        {event.type}
                      </Badge>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Tarjetas de acceso rápido a las principales secciones */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {quickAccess.map((item) => (
              <Link key={item.name} href={item.href}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <item.icon className="h-8 w-8 text-primary" />
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">{item.progress}%</div>
                        <div className="text-sm text-muted-foreground">Completado</div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                      <Progress value={item.progress} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5" />
              Auxiliares Activos - Estado de Tareas
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8 text-muted-foreground">Cargando auxiliares...</div>
            ) : auxiliaries.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">No hay auxiliares registrados</div>
            ) : (
              <div className="space-y-4">
                {auxiliaries.map((auxiliary) => (
                  <div
                    key={auxiliary.id}
                    className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-4 mb-4 md:mb-0">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={auxiliary.avatar || `/placeholder.svg?height=48&width=48`} />
                        <AvatarFallback>
                          {auxiliary.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">{auxiliary.name}</h4>
                        <p className="text-sm text-muted-foreground">{auxiliary.homeName}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {auxiliary.shift?.split(" ")[0] || "N/A"}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{auxiliary.patients || 0} pacientes</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:w-1/2">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-medium text-green-600">
                          <CheckCircle2 className="h-4 w-4" />
                          Completadas ({auxiliary.completedTasks?.length || 0})
                        </div>
                        <div className="space-y-1">
                          {(auxiliary.completedTasks || []).slice(0, 2).map((task, idx) => (
                            <p key={idx} className="text-xs text-muted-foreground line-clamp-1">
                              • {task}
                            </p>
                          ))}
                          {(!auxiliary.completedTasks || auxiliary.completedTasks.length === 0) && (
                            <p className="text-xs text-muted-foreground italic">Sin tareas completadas</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-medium text-orange-600">
                          <Clock className="h-4 w-4" />
                          Pendientes ({auxiliary.pendingTasks?.length || 0})
                        </div>
                        <div className="space-y-1">
                          {(auxiliary.pendingTasks || []).slice(0, 2).map((task, idx) => (
                            <p key={idx} className="text-xs text-muted-foreground line-clamp-1">
                              • {task}
                            </p>
                          ))}
                          {(!auxiliary.pendingTasks || auxiliary.pendingTasks.length === 0) && (
                            <p className="text-xs text-muted-foreground italic">Sin tareas pendientes</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Estadística de hogares activos */}
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{homes.length}</div>
              <div className="text-sm text-muted-foreground">Hogares Activos</div>
            </CardContent>
          </Card>
          {/* Estadística de pacientes */}
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{totalPatients}</div>
              <div className="text-sm text-muted-foreground">Pacientes</div>
            </CardContent>
          </Card>
          {/* Estadística de auxiliares */}
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{auxiliaries.length}</div>
              <div className="text-sm text-muted-foreground">Auxiliares</div>
            </CardContent>
          </Card>
          {/* Estadística de tareas completadas */}
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{completionRate}%</div>
              <div className="text-sm text-muted-foreground">Tareas Completadas</div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
