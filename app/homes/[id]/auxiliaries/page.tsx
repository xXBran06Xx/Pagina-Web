"use client" // Indica que este componente se ejecuta en el cliente (Next.js App Router).

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
// Iconos que se usan en el menú y en las tarjetas.
import { Menu, Home, Building2, Users, UserCheck, Shield, History, LogOut, Calendar, ChevronRight } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"

// Eventos próximos que se mostrarán en el calendario del dashboard.
const upcomingEvents = [
  { date: "20 Jul", name: "Independencia", type: "nacional" },
  { date: "7 Ago", name: "Batalla de Boyacá", type: "nacional" },
  { date: "29 Ago", name: "Día del Adulto Mayor", type: "especial" },
  { date: "15 Sep", name: "Revisión Médica General", type: "medico" },
]

// Accesos rápidos con progreso de cada módulo.
const quickAccess = [
  { name: "Hogares", icon: Building2, progress: 85, href: "/homes" },
  { name: "Auxiliares", icon: UserCheck, progress: 92, href: "/auxiliaries" },
  { name: "Pacientes", icon: Users, progress: 78, href: "/patients" },
  { name: "Administradores", icon: Shield, progress: 95, href: "/administrators" },
]

// Ítems del menú principal, con su icono y ruta.
const menuItems = [
  { name: "Inicio", icon: Home, href: "/dashboard" },
  { name: "Hogares", icon: Building2, href: "/homes" },
  { name: "Auxiliares", icon: UserCheck, href: "/auxiliaries" },
  { name: "Pacientes", icon: Users, href: "/patients" },
  { name: "Permisos", icon: Shield, href: "/permissions" },
  { name: "Historial", icon: History, href: "/history" },
]

export default function DashboardPage() {
  const [userName] = useState("Dr. María González") // Nombre del usuario logueado.
  const router = useRouter()

  // Cierra sesión eliminando datos del localStorage y sessionStorage.
  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("isLoggedIn")
    sessionStorage.clear()
    router.push("/login") // Redirige al login.
  }

  return (
    <div className="min-h-screen bg-background">
      {/* HEADER superior */}
      <header className="border-b bg-card px-4 py-3">
        <div className="flex items-center justify-between">
          
          {/* Menú hamburguesa para pantallas pequeñas (usa Sheet como panel lateral). */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
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

          {/* Menú visible en escritorio (horizontal). */}
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

          {/* Perfil de usuario con menú desplegable (DropdownMenu). */}
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

            {/* Contenido del menú desplegable (perfil + estadísticas rápidas). */}
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

                {/* Progreso de distintas métricas */}
                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Personal disponible</span>
                      <span className="font-medium">87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Ocupación</span>
                      <span className="font-medium">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Notas completadas</span>
                      <span className="font-medium">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                </div>
              </div>

              {/* Opción para cerrar sesión */}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar Sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* MAIN: Contenido principal del dashboard */}
      <main className="p-6 space-y-8">
        
        {/* Mensaje de bienvenida */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-balance">¡Bienvenido, {userName.split(" ")[1]}!</h1>
          <p className="text-muted-foreground">Gestiona eficientemente todos los aspectos del cuidado</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Tarjeta de calendario de próximos eventos */}
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

          {/* Tarjetas de acceso rápido a módulos */}
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

        {/* Tarjetas de estadísticas rápidas (totales) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">24</div>
              <div className="text-sm text-muted-foreground">Hogares Activos</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">156</div>
              <div className="text-sm text-muted-foreground">Pacientes</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">48</div>
              <div className="text-sm text-muted-foreground">Auxiliares</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">12</div>
              <div className="text-sm text-muted-foreground">Administradores</div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

