"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Plus,
  Search,
  Edit,
  Trash2,
  FlaskConical,
  Users,
  Calendar,
  TrendingUp,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface Laboratory {
  id: string
  code: string
  name: string
  description: string
  capacity: number
  credits: number
  semester: string
  department: string
  location: string
  instructor: string
  category: string
  status: "active" | "inactive"
  registrations: number
}

export default function LaboratoriesPage() {
  const [laboratories, setLaboratories] = useState<Laboratory[]>([
    {
      id: "1",
      code: "LAB-AI",
      name: "Laboratorium Artificial Intelligence",
      description: "Lab untuk praktikum AI dan Machine Learning",
      capacity: 30,
      credits: 1,
      semester: "Ganjil",
      department: "Teknik Informatika",
      location: "Gedung B Lantai 4",
      instructor: "Dr. Budi Santoso, M.Kom",
      category: "Programming",
      status: "active",
      registrations: 25,
    },
    {
      id: "2",
      code: "LAB-DB",
      name: "Laboratorium Database",
      description: "Lab untuk praktikum basis data",
      capacity: 25,
      credits: 1,
      semester: "Ganjil",
      department: "Teknik Informatika",
      location: "Gedung B Lantai 3",
      instructor: "Ahmad Fauzi, M.T",
      category: "Database",
      status: "active",
      registrations: 23,
    },
    {
      id: "3",
      code: "LAB-NET",
      name: "Laboratorium Networking",
      description: "Lab untuk praktikum jaringan komputer",
      capacity: 20,
      credits: 1,
      semester: "Genap",
      department: "Teknik Informatika",
      location: "Gedung C Lantai 2",
      instructor: "Dr. Rina Wijaya, M.Kom",
      category: "Networking",
      status: "active",
      registrations: 18,
    },
  ])
  const [searchTerm, setSearchTerm] = useState("")

  const filteredLaboratories = laboratories.filter(
    (lab) =>
      lab.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lab.code.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const stats = {
    total: laboratories.length,
    active: laboratories.filter((l) => l.status === "active").length,
    totalCapacity: laboratories.reduce((acc, l) => acc + l.capacity, 0),
    totalRegistrations: laboratories.reduce((acc, l) => acc + l.registrations, 0),
  }

  const handleDeleteLab = (id: string) => {
    setLaboratories(laboratories.filter((l) => l.id !== id))
    toast({
      title: "Berhasil",
      description: "Laboratorium berhasil dihapus",
    })
  }

  return (
    <div className="mt-20 space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Manajemen Laboratorium</h2>
          <p className="text-muted-foreground">
            Kelola laboratorium dan praktikum
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Tambah Laboratorium
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Laboratorium</CardTitle>
            <FlaskConical className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Semua lab</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Lab Aktif</CardTitle>
            <TrendingUp className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
            <p className="text-xs text-muted-foreground">Sedang berlangsung</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Kapasitas Total</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCapacity}</div>
            <p className="text-xs text-muted-foreground">Mahasiswa</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Pendaftar</CardTitle>
            <Calendar className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRegistrations}</div>
            <p className="text-xs text-muted-foreground">Mahasiswa terdaftar</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Laboratorium</CardTitle>
          <CardDescription>
            Kelola semua laboratorium praktikum
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
              <Input
                placeholder="Cari laboratorium..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kode</TableHead>
                  <TableHead>Nama Laboratorium</TableHead>
                  <TableHead>Instruktur</TableHead>
                  <TableHead>Lokasi</TableHead>
                  <TableHead>Kapasitas</TableHead>
                  <TableHead>Pendaftar</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLaboratories.map((lab) => (
                  <TableRow key={lab.id}>
                    <TableCell className="font-mono font-medium">
                      {lab.code}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{lab.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {lab.description}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{lab.instructor}</TableCell>
                    <TableCell className="text-sm">{lab.location}</TableCell>
                    <TableCell>{lab.capacity}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{lab.registrations}</span>
                        <span className="text-xs text-muted-foreground">
                          ({Math.round((lab.registrations / lab.capacity) * 100)}%)
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{lab.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={lab.status === "active" ? "default" : "secondary"}>
                        {lab.status === "active" ? "Aktif" : "Nonaktif"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteLab(lab.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
