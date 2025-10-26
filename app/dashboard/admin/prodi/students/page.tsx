"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Users,
  Search,
  Filter,
  Download,
  GraduationCap,
  TrendingUp,
  UserX,
  UserCheck,
} from "lucide-react"

export default function ProdiStudentsPage() {
  const [selectedProdi, setSelectedProdi] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Mock data
  const prodiList = [
    { id: "1", code: "S1TI", name: "S1 Teknik Informatika" },
    { id: "2", code: "S1SI", name: "S1 Sistem Informasi" },
    { id: "3", code: "S1TE", name: "S1 Teknik Elektro" },
  ]

  const students = [
    {
      id: "1",
      nim: "2021001",
      name: "Ahmad Fauzi",
      prodi: "S1 Teknik Informatika",
      semester: 6,
      gpa: 3.65,
      status: "active",
    },
    {
      id: "2",
      nim: "2021002",
      name: "Siti Nurhaliza",
      prodi: "S1 Sistem Informasi",
      semester: 6,
      gpa: 3.82,
      status: "active",
    },
    {
      id: "3",
      nim: "2021003",
      name: "Budi Santoso",
      prodi: "S1 Teknik Elektro",
      semester: 6,
      gpa: 3.45,
      status: "active",
    },
  ]

  const stats = {
    total: 1150,
    active: 1080,
    suspended: 45,
    graduated: 25,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="flex gap-2 items-center text-3xl font-bold">
            <Users className="w-8 h-8" />
            Mahasiswa per Program Studi
          </h1>
          <p className="mt-1 text-muted-foreground">
            Kelola dan monitor data mahasiswa berdasarkan program studi
          </p>
        </div>
        <Button>
          <Download className="mr-2 w-4 h-4" />
          Export Data
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Mahasiswa</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="mt-1 text-xs text-muted-foreground">Semua prodi</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Mahasiswa Aktif</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            <p className="mt-1 text-xs text-muted-foreground">
              {((stats.active / stats.total) * 100).toFixed(1)}% dari total
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Suspend/Cuti</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.suspended}</div>
            <p className="mt-1 text-xs text-muted-foreground">Perlu perhatian</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Lulus Semester Ini</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{stats.graduated}</div>
            <p className="mt-1 text-xs text-muted-foreground">Periode berjalan</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Data Mahasiswa</CardTitle>
              <CardDescription>Daftar mahasiswa per program studi</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters */}
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 w-4 h-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Cari berdasarkan nama atau NIM..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={selectedProdi} onValueChange={setSelectedProdi}>
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Pilih Program Studi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Program Studi</SelectItem>
                {prodiList.map((prodi) => (
                  <SelectItem key={prodi.id} value={prodi.id}>
                    {prodi.code} - {prodi.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="active">Aktif</SelectItem>
                <SelectItem value="suspended">Suspend/Cuti</SelectItem>
                <SelectItem value="graduated">Lulus</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>NIM</TableHead>
                  <TableHead>Nama Mahasiswa</TableHead>
                  <TableHead>Program Studi</TableHead>
                  <TableHead>Semester</TableHead>
                  <TableHead>IPK</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-mono font-medium">{student.nim}</TableCell>
                    <TableCell>
                      <div className="flex gap-2 items-center">
                        <div className="flex justify-center items-center w-8 h-8 rounded-full bg-primary/10">
                          <GraduationCap className="w-4 h-4 text-primary" />
                        </div>
                        <span className="font-medium">{student.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{student.prodi}</TableCell>
                    <TableCell>
                      <Badge variant="outline">Semester {student.semester}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold text-primary">{student.gpa.toFixed(2)}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={student.status === "active" ? "default" : "secondary"}>
                        {student.status === "active" ? "Aktif" : "Tidak Aktif"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        Detail
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center pt-2">
            <p className="text-sm text-muted-foreground">
              Menampilkan 1-10 dari {students.length} data
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

