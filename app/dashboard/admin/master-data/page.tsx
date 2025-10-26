"use client"

import { useState, useEffect } from "react"
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
  const [editingItem, setEditingItem] = useState<DataItem | null>(null)
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    status: "active" as "active" | "inactive"
  })

  // Data from API
  const [programs, setPrograms] = useState<DataItem[]>([])
  const [faculties, setFaculties] = useState<DataItem[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch data from API
  useEffect(() => {
    fetchMasterData()
  }, [])

  const fetchMasterData = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('session-token')

      const response = await fetch('/api/admin/master-data', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch master data')
      }

      const data = await response.json()
      setPrograms(data.programs || [])
      setFaculties(data.faculties || [])
    } catch (error) {
      console.error('Error fetching master data:', error)
    } finally {
      setLoading(false)
    }
  }

  // Handler functions
  const handleAdd = () => {
    setEditingItem(null)
    setFormData({ code: "", name: "", status: "active" })
    setIsDialogOpen(true)
  }

  const handleEdit = (item: DataItem) => {
    setEditingItem(item)
    setFormData({ code: item.code, name: item.name, status: item.status })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      return
    }

    try {
      const token = localStorage.getItem('session-token')

      const response = await fetch(`/api/admin/master-data/prodi?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const error = await response.json()
        alert(error.error || 'Gagal menghapus data')
        return
      }

      // Refresh data
      await fetchMasterData()
      alert('Data berhasil dihapus')
    } catch (error) {
      console.error('Error deleting:', error)
      alert('Terjadi kesalahan saat menghapus data')
    }
  }

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('session-token')
      const method = editingItem ? 'PUT' : 'POST'

      const payload = {
        ...(editingItem && { id: editingItem.id }),
        code: formData.code,
        name: formData.name,
        fakultas: 'Fakultas Teknik', // TODO: Add fakultas selector
        jenjang: 'S1', // TODO: Add jenjang selector
        akreditasi: null,
      }

      const response = await fetch('/api/admin/master-data/prodi', {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const error = await response.json()
        alert(error.error || 'Gagal menyimpan data')
        return
      }

      // Refresh data
      await fetchMasterData()
      setIsDialogOpen(false)
      setFormData({ code: "", name: "", status: "active" })
      setEditingItem(null)
      alert(editingItem ? 'Data berhasil diperbarui' : 'Data berhasil ditambahkan')
    } catch (error) {
      console.error('Error saving:', error)
      alert('Terjadi kesalahan saat menyimpan data')
    }
  }

  // Stats - calculated from state
  const stats: MasterDataStats[] = [
    {
      icon: GraduationCap,
      title: "Program Studi",
      count: programs.filter(p => p.status === "active").length,
      description: `${programs.length} total, ${programs.filter(p => p.status === "active").length} aktif`,
      color: "blue",
    },
    {
      icon: Building2,
      title: "Fakultas",
      count: faculties.filter(f => f.status === "active").length,
      description: `${faculties.length} total, ${faculties.filter(f => f.status === "active").length} aktif`,
      color: "green",
    },
    {
      icon: BookOpen,
      title: "Mata Kuliah",
      count: 0,
      description: "Belum ada data",
      color: "purple",
    },
    {
      icon: MapPin,
      title: "Lokasi KKP",
      count: 0,
      description: "Belum ada data",
      color: "orange",
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
      <div className="flex justify-between items-center">
        <div className="flex flex-1 gap-2 items-center">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 w-4 h-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={`Cari ${type}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex gap-2 items-center">
          <Button variant="outline" size="sm">
            <Download className="mr-2 w-4 h-4" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="mr-2 w-4 h-4" />
            Import
          </Button>
          <Button size="sm" onClick={handleAdd}>
            <Plus className="mr-2 w-4 h-4" />
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
                  <div className="flex gap-2 justify-end items-center">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="flex gap-2 items-center text-3xl font-bold">
            <Database className="w-8 h-8" />
            Master Data Management
          </h1>
          <p className="mt-1 text-muted-foreground">
            Kelola data master sistem akademik
          </p>
        </div>
        <Button variant="outline">
          <Settings className="mr-2 w-4 h-4" />
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
                <div className="flex justify-between items-center">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <Icon className="w-4 h-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.count}</div>
                <p className="mt-1 text-xs text-muted-foreground">{stat.description}</p>
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
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="programs">Program Studi</TabsTrigger>
              <TabsTrigger value="faculties">Fakultas</TabsTrigger>
              <TabsTrigger value="courses">Mata Kuliah</TabsTrigger>
              <TabsTrigger value="locations">Lokasi KKP</TabsTrigger>
            </TabsList>

            <TabsContent value="programs" className="mt-4 space-y-4">
              {renderDataTable(programs, "Program Studi")}
            </TabsContent>

            <TabsContent value="faculties" className="mt-4 space-y-4">
              {renderDataTable(faculties, "Fakultas")}
            </TabsContent>

            <TabsContent value="courses" className="mt-4 space-y-4">
              <div className="py-8 text-center text-muted-foreground">
                <BookOpen className="mx-auto mb-2 w-12 h-12 opacity-50" />
                <p>Data mata kuliah akan ditampilkan di sini</p>
              </div>
            </TabsContent>

            <TabsContent value="locations" className="mt-4 space-y-4">
              <div className="py-8 text-center text-muted-foreground">
                <MapPin className="mx-auto mb-2 w-12 h-12 opacity-50" />
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
            <DialogTitle>
              {editingItem ? "Edit Data Master" : "Tambah Data Master"}
            </DialogTitle>
            <DialogDescription>
              {editingItem
                ? "Perbarui informasi data master"
                : "Tambahkan data master baru ke sistem"}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">Kode</Label>
              <Input
                id="code"
                placeholder="Masukkan kode (contoh: S1TI)"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Nama</Label>
              <Input
                id="name"
                placeholder="Masukkan nama lengkap"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: "active" | "inactive") => setFormData({ ...formData, status: value })}
              >
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
            <Button
              onClick={handleSave}
              disabled={!formData.code || !formData.name}
            >
              {editingItem ? "Perbarui" : "Simpan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

