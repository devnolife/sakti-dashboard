"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Database,
  Building2,
  GraduationCap,
  BookOpen,
  MapPin,
  Users,
  Settings,
  Plus,
  Edit,
  Trash2,
  Download,
  Upload,
  Search,
  Filter,
} from "lucide-react"
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface MasterDataStats {
  icon: React.ComponentType<{ className?: string }>
  title: string
  count: number
  description: string
  color: string
}

interface DataItem {
  id: string
  code: string
  name: string
  status: "active" | "inactive"
  created_at: string
  updated_at: string
}

export default function MasterDataPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedTab, setSelectedTab] = useState("programs")

  const stats: MasterDataStats[] = [
    {
      icon: GraduationCap,
      title: "Program Studi",
      count: 8,
      description: "Program studi aktif",
      color: "blue",
    },
    {
      icon: Building2,
      title: "Fakultas",
      count: 3,
      description: "Fakultas terdaftar",
      color: "green",
    },
    {
      icon: BookOpen,
      title: "Mata Kuliah",
      count: 156,
      description: "Mata kuliah tersedia",
      color: "purple",
    },
    {
      icon: MapPin,
      title: "Lokasi KKP",
      count: 45,
      description: "Lokasi mitra",
      color: "orange",
    },
  ]

  // Mock data - replace with actual data from API
  const programs: DataItem[] = [
    {
      id: "1",
      code: "S1TI",
      name: "S1 Teknik Informatika",
      status: "active",
      created_at: "2024-01-01",
      updated_at: "2024-01-01",
    },
    {
      id: "2",
      code: "S1SI",
      name: "S1 Sistem Informasi",
      status: "active",
      created_at: "2024-01-01",
      updated_at: "2024-01-01",
    },
    {
      id: "3",
      code: "S1TE",
      name: "S1 Teknik Elektro",
      status: "active",
      created_at: "2024-01-01",
      updated_at: "2024-01-01",
    },
  ]

  const faculties: DataItem[] = [
    {
      id: "1",
      code: "FT",
      name: "Fakultas Teknik",
      status: "active",
      created_at: "2024-01-01",
      updated_at: "2024-01-01",
    },
    {
      id: "2",
      code: "FE",
      name: "Fakultas Ekonomi",
      status: "active",
      created_at: "2024-01-01",
      updated_at: "2024-01-01",
    },
  ]

  const getColorClass = (color: string) => {
    const colors: Record<string, string> = {
      blue: "bg-blue-500/10 text-blue-500 border-blue-200",
      green: "bg-green-500/10 text-green-500 border-green-200",
      purple: "bg-purple-500/10 text-purple-500 border-purple-200",
      orange: "bg-orange-500/10 text-orange-500 border-orange-200",
    }
    return colors[color] || colors.blue
  }

  const renderDataTable = (data: DataItem[], type: string) => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={`Cari ${type}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button size="sm" onClick={() => setIsDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Tambah {type}
          </Button>
        </div>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Kode</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Dibuat</TableHead>
              <TableHead>Diperbarui</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-mono font-medium">{item.code}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <Badge variant={item.status === "active" ? "default" : "secondary"}>
                    {item.status === "active" ? "Aktif" : "Tidak Aktif"}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(item.created_at).toLocaleDateString("id-ID")}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(item.updated_at).toLocaleDateString("id-ID")}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )

  return (
    <div className="container mx-auto p-6 space-y-6 mt-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Database className="h-8 w-8" />
            Master Data Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Kelola data master sistem akademik
          </p>
        </div>
        <Button variant="outline">
          <Settings className="h-4 w-4 mr-2" />
          Pengaturan
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className={`border-l-4 ${getColorClass(stat.color)}`}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <Icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.count}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Master Data Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Data Master</CardTitle>
          <CardDescription>
            Kelola data referensi yang digunakan di seluruh sistem
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="programs">Program Studi</TabsTrigger>
              <TabsTrigger value="faculties">Fakultas</TabsTrigger>
              <TabsTrigger value="courses">Mata Kuliah</TabsTrigger>
              <TabsTrigger value="locations">Lokasi KKP</TabsTrigger>
            </TabsList>

            <TabsContent value="programs" className="space-y-4 mt-4">
              {renderDataTable(programs, "Program Studi")}
            </TabsContent>

            <TabsContent value="faculties" className="space-y-4 mt-4">
              {renderDataTable(faculties, "Fakultas")}
            </TabsContent>

            <TabsContent value="courses" className="space-y-4 mt-4">
              <div className="text-center py-8 text-muted-foreground">
                <BookOpen className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Data mata kuliah akan ditampilkan di sini</p>
              </div>
            </TabsContent>

            <TabsContent value="locations" className="space-y-4 mt-4">
              <div className="text-center py-8 text-muted-foreground">
                <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Data lokasi KKP akan ditampilkan di sini</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Data Master</DialogTitle>
            <DialogDescription>
              Tambahkan data master baru ke sistem
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="code">Kode</Label>
              <Input id="code" placeholder="Masukkan kode" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Nama</Label>
              <Input id="name" placeholder="Masukkan nama" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Aktif</SelectItem>
                  <SelectItem value="inactive">Tidak Aktif</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={() => setIsDialogOpen(false)}>Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

