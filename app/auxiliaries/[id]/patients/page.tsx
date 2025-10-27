"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Search, Building2, Users, Phone, Mail, Calendar } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

// Mock data - in real app this would come from API
const auxiliaryData = {
  1: {
    name: "Ana María Rodríguez",
    cc: "1234567890",
    phone: "+57 300 123-4567",
    email: "ana.rodriguez@cuidado.com",
    home: "Hogar 1",
    homeId: 1,
  },
  2: {
    name: "Carlos Eduardo Pérez",
    cc: "0987654321",
    phone: "+57 301 234-5678",
    email: "carlos.perez@cuidado.com",
    home: "Hogar 1",
    homeId: 1,
  },
}

const patients = [
  {
    id: 1,
    cc: "12345678",
    name: "María Elena Vargas",
    fullName: "María Elena Vargas Rodríguez",
    age: 78,
    room: "101A",
    status: "estable",
    lastVisit: "2024-01-15",
    condition: "Diabetes, Hipertensión",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    cc: "87654321",
    name: "José Antonio López",
    fullName: "José Antonio López Martínez",
    age: 82,
    room: "102B",
    status: "observación",
    lastVisit: "2024-01-14",
    condition: "Artritis, Demencia leve",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    cc: "11223344",
    name: "Carmen Rosa Díaz",
    fullName: "Carmen Rosa Díaz González",
    age: 75,
    room: "103A",
    status: "estable",
    lastVisit: "2024-01-16",
    condition: "Osteoporosis",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    cc: "44332211",
    name: "Roberto Silva",
    fullName: "Roberto Silva Hernández",
    age: 80,
    room: "104B",
    status: "crítico",
    lastVisit: "2024-01-16",
    condition: "Insuficiencia cardíaca",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    cc: "55667788",
    name: "Esperanza Morales",
    fullName: "Esperanza Morales Castro",
    age: 77,
    room: "105A",
    status: "estable",
    lastVisit: "2024-01-13",
    condition: "Alzheimer inicial",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 6,
    cc: "99887766",
    name: "Fernando Torres",
    fullName: "Fernando Torres Jiménez",
    age: 84,
    room: "106B",
    status: "estable",
    lastVisit: "2024-01-15",
    condition: "Parkinson",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 7,
    cc: "33445566",
    name: "Lucía Ramírez",
    fullName: "Lucía Ramírez Vega",
    age: 79,
    room: "107A",
    status: "observación",
    lastVisit: "2024-01-14",
    condition: "Depresión, Diabetes",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 8,
    cc: "77889900",
    name: "Miguel Ángel Ruiz",
    fullName: "Miguel Ángel Ruiz Peña",
    age: 81,
    room: "108B",
    status: "estable",
    lastVisit: "2024-01-16",
    condition: "Hipertensión",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function AuxiliaryPatientsPage() {
  const params = useParams()
  const auxiliaryId = params.id as string
  const auxiliary = auxiliaryData[auxiliaryId as keyof typeof auxiliaryData] || {
    name: "Auxiliar Desconocido",
    cc: "",
    phone: "",
    email: "",
    home: "",
    homeId: 1,
  }

  const [searchCC, setSearchCC] = useState("")
  const [searchName, setSearchName] = useState("")
  const [filteredPatients, setFilteredPatients] = useState(patients)

  const handleSearch = () => {
    const filtered = patients.filter((patient) => {
      const matchesCC = searchCC === "" || patient.cc.includes(searchCC)
      const matchesName = searchName === "" || patient.name.toLowerCase().includes(searchName.toLowerCase())
      return matchesCC && matchesName
    })
    setFilteredPatients(filtered)
  }

  const clearSearch = () => {
    setSearchCC("")
    setSearchName("")
    setFilteredPatients(patients)
  }

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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card px-6 py-4">
        <div className="flex items-center gap-4">
          <Link href={`/homes/${auxiliary.homeId}/auxiliaries`}>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/placeholder.svg?height=48&width=48" />
              <AvatarFallback>
                {auxiliary.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{auxiliary.name}</h1>
              <p className="text-muted-foreground">CC: {auxiliary.cc}</p>
            </div>
          </div>
        </div>

        {/* Auxiliary Details */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{auxiliary.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>{auxiliary.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <span>{auxiliary.home}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Home Card */}
        <Card className="mb-6 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-primary/20">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{auxiliary.home}</h3>
                <p className="text-sm text-muted-foreground">Hogar asignado al auxiliar</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Lista de Pacientes Activos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="space-y-2">
                <label htmlFor="search-cc" className="text-sm font-medium">
                  CC Paciente
                </label>
                <Input
                  id="search-cc"
                  placeholder="Buscar por cédula..."
                  value={searchCC}
                  onChange={(e) => setSearchCC(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="search-name" className="text-sm font-medium">
                  Nombre Paciente
                </label>
                <Input
                  id="search-name"
                  placeholder="Buscar por nombre..."
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium opacity-0">Acciones</label>
                <div className="flex gap-2">
                  <Button onClick={handleSearch} className="flex-1">
                    <Search className="h-4 w-4 mr-2" />
                    Buscar
                  </Button>
                  <Button variant="outline" onClick={clearSearch}>
                    Limpiar
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Patients Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Pacientes Encontrados ({filteredPatients.length})</CardTitle>
              <Badge variant="secondary">
                {filteredPatients.length} de {patients.length} pacientes
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Paciente</TableHead>
                    <TableHead>CC</TableHead>
                    <TableHead>Habitación</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Última Visita</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.map((patient) => (
                    <TableRow key={patient.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={patient.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {patient.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{patient.name}</div>
                            <div className="text-sm text-muted-foreground">{patient.age} años</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono">{patient.cc}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{patient.room}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(patient.status)}>{patient.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {patient.lastVisit}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Link href={`/patients/${patient.id}`}>
                          <Button size="sm" variant="outline">
                            Ver Detalles
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredPatients.length === 0 && (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No se encontraron pacientes</h3>
                <p className="text-muted-foreground">
                  Intenta ajustar los criterios de búsqueda para encontrar pacientes.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{patients.length}</div>
              <div className="text-sm text-muted-foreground">Total Pacientes</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {patients.filter((p) => p.status === "estable").length}
              </div>
              <div className="text-sm text-muted-foreground">Estables</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {patients.filter((p) => p.status === "observación").length}
              </div>
              <div className="text-sm text-muted-foreground">En Observación</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">
                {patients.filter((p) => p.status === "crítico").length}
              </div>
              <div className="text-sm text-muted-foreground">Críticos</div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
