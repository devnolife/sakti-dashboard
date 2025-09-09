"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
import { Plus, Edit, Trash2, BookOpen, Users, Calendar, Search, Filter, Download, Star, Lightbulb, TrendingUp, Target, CheckCircle2, Clock, AlertCircle } from "lucide-react"
// import { motion } from "framer-motion"

interface RekomendasiJudul {
  id: string
  judul: string
  deskripsi: string
  bidangKeilmuan: string
  metodologi: string
  tingkatKesulitan: "Mudah" | "Sedang" | "Sulit"
  estimasiWaktu: string
  prerequisites: string[]
  status: "Tersedia" | "Diambil" | "Selesai"
  createdAt: string
  diambilOleh?: string
}

const mockData: RekomendasiJudul[] = [
  {
    id: "1",
    judul: "Analisis Sentimen Media Sosial Menggunakan Machine Learning",
    deskripsi: "Penelitian untuk menganalisis sentiment positif/negatif dari data media sosial Twitter menggunakan algoritma machine learning seperti Naive Bayes atau SVM.",
    bidangKeilmuan: "Data Science",
    metodologi: "Eksperimental",
    tingkatKesulitan: "Sedang",
    estimasiWaktu: "4-6 bulan",
    prerequisites: ["Python", "Machine Learning", "Text Processing"],
    status: "Tersedia",
    createdAt: "2024-01-15"
  },
  {
    id: "2", 
    judul: "Sistem Informasi Manajemen Inventori Berbasis Web",
    deskripsi: "Pengembangan aplikasi web untuk mengelola inventori barang dengan fitur tracking, reporting, dan forecasting.",
    bidangKeilmuan: "Sistem Informasi",
    metodologi: "Prototype",
    tingkatKesulitan: "Mudah",
    estimasiWaktu: "3-4 bulan",
    prerequisites: ["PHP/Laravel", "MySQL", "Web Development"],
    status: "Diambil",
    createdAt: "2024-01-10",
    diambilOleh: "Ahmad Fauzi (2021001)"
  },
  {
    id: "3",
    judul: "Implementasi Blockchain untuk Supply Chain Management",
    deskripsi: "Penelitian implementasi teknologi blockchain untuk meningkatkan transparansi dan traceability dalam supply chain management.",
    bidangKeilmuan: "Blockchain",
    metodologi: "Eksperimental",
    tingkatKesulitan: "Sulit",
    estimasiWaktu: "6-8 bulan", 
    prerequisites: ["Blockchain", "Smart Contracts", "Node.js"],
    status: "Tersedia",
    createdAt: "2024-01-05"
  }
]

const bidangKeilmuanOptions = [
  "Data Science",
  "Sistem Informasi", 
  "Blockchain",
  "Mobile Development",
  "Web Development",
  "Artificial Intelligence",
  "Cybersecurity",
  "IoT",
  "Game Development"
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
}

const getStatsFromData = (data: RekomendasiJudul[]) => {
  const tersedia = data.filter(item => item.status === "Tersedia").length
  const diambil = data.filter(item => item.status === "Diambil").length
  const selesai = data.filter(item => item.status === "Selesai").length
  const total = data.length
  return { tersedia, diambil, selesai, total }
}

export default function RekomendasiJudul() {
  const [rekomendasiList, setRekomendasiList] = useState<RekomendasiJudul[]>(mockData)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<RekomendasiJudul | null>(null)
  const [formData, setFormData] = useState<Partial<RekomendasiJudul>>({})
  
  const stats = getStatsFromData(rekomendasiList)

  const filteredData = rekomendasiList.filter(item => {
    const matchesSearch = item.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.bidangKeilmuan.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "all" || item.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleAdd = () => {
    const newItem: RekomendasiJudul = {
      id: Date.now().toString(),
      judul: formData.judul || "",
      deskripsi: formData.deskripsi || "",
      bidangKeilmuan: formData.bidangKeilmuan || "",
      metodologi: formData.metodologi || "",
      tingkatKesulitan: (formData.tingkatKesulitan as "Mudah" | "Sedang" | "Sulit") || "Sedang",
      estimasiWaktu: formData.estimasiWaktu || "",
      prerequisites: formData.prerequisites || [],
      status: "Tersedia",
      createdAt: new Date().toISOString().split('T')[0]
    }
    
    setRekomendasiList([...rekomendasiList, newItem])
    setFormData({})
    setIsAddDialogOpen(false)
  }

  const handleEdit = (item: RekomendasiJudul) => {
    setEditingItem(item)
    setFormData(item)
  }

  const handleUpdate = () => {
    if (editingItem) {
      const updatedList = rekomendasiList.map(item =>
        item.id === editingItem.id ? { ...item, ...formData } : item
      )
      setRekomendasiList(updatedList)
      setEditingItem(null)
      setFormData({})
    }
  }

  const handleDelete = (id: string) => {
    setRekomendasiList(rekomendasiList.filter(item => item.id !== id))
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      "Tersedia": "default",
      "Diambil": "secondary", 
      "Selesai": "outline"
    }
    return <Badge variant={variants[status as keyof typeof variants] as any}>{status}</Badge>
  }

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      "Mudah": "text-green-600",
      "Sedang": "text-yellow-600",
      "Sulit": "text-red-600"
    }
    return colors[difficulty as keyof typeof colors] || "text-gray-600"
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Rekomendasi Judul Penelitian</h1>
            <p className="text-indigo-100 text-lg">Kelola dan sediakan rekomendasi judul penelitian yang menarik untuk mahasiswa</p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-2 text-sm text-indigo-100 mb-1">
                <Target className="h-4 w-4" />
                Success Rate
              </div>
              <div className="text-2xl font-bold">{stats.total > 0 ? Math.round((stats.selesai / stats.total) * 100) : 0}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Card className="border-0 shadow-sm bg-gradient-to-br from-indigo-50 to-purple-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="bg-indigo-500 p-2 rounded-lg">
                  <Lightbulb className="h-5 w-5 text-white" />
                </div>
                <Badge className="bg-indigo-100 text-indigo-700">Total</Badge>
              </div>
              <div className="text-2xl font-bold text-indigo-700 mb-1">{stats.total}</div>
              <div className="text-indigo-600 text-sm font-medium">Total Rekomendasi</div>
            </CardContent>
          </Card>
        </div>

        <div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Card className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-emerald-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="bg-green-500 p-2 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-white" />
                </div>
                <Badge className="bg-green-100 text-green-700">Tersedia</Badge>
              </div>
              <div className="text-2xl font-bold text-green-700 mb-1">{stats.tersedia}</div>
              <div className="text-green-600 text-sm font-medium">Dapat Diambil</div>
            </CardContent>
          </Card>
        </div>

        <div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-indigo-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="bg-blue-500 p-2 rounded-lg">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <Badge className="bg-blue-100 text-blue-700">Progress</Badge>
              </div>
              <div className="text-2xl font-bold text-blue-700 mb-1">{stats.diambil}</div>
              <div className="text-blue-600 text-sm font-medium">Sedang Dikerjakan</div>
            </CardContent>
          </Card>
        </div>

        <div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-50 to-violet-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="bg-purple-500 p-2 rounded-lg">
                  <Star className="h-5 w-5 text-white" />
                </div>
                <Badge className="bg-purple-100 text-purple-700">Selesai</Badge>
              </div>
              <div className="text-2xl font-bold text-purple-700 mb-1">{stats.selesai}</div>
              <div className="text-purple-600 text-sm font-medium">Diselesaikan</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Search and Actions */}
      <div variants={itemVariants} className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Cari judul atau bidang keilmuan..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua</SelectItem>
              <SelectItem value="Tersedia">Tersedia</SelectItem>
              <SelectItem value="Diambil">Diambil</SelectItem>
              <SelectItem value="Selesai">Selesai</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Tambah Rekomendasi
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Tambah Rekomendasi Judul</DialogTitle>
              <DialogDescription>
                Buat rekomendasi judul penelitian baru untuk mahasiswa
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="judul">Judul Penelitian</Label>
                <Input
                  id="judul"
                  value={formData.judul || ""}
                  onChange={(e) => setFormData({...formData, judul: e.target.value})}
                  placeholder="Masukkan judul penelitian"
                />
              </div>
              <div>
                <Label htmlFor="deskripsi">Deskripsi</Label>
                <Textarea
                  id="deskripsi"
                  value={formData.deskripsi || ""}
                  onChange={(e) => setFormData({...formData, deskripsi: e.target.value})}
                  placeholder="Jelaskan deskripsi penelitian"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bidangKeilmuan">Bidang Keilmuan</Label>
                  <Select value={formData.bidangKeilmuan} onValueChange={(value) => setFormData({...formData, bidangKeilmuan: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih bidang" />
                    </SelectTrigger>
                    <SelectContent>
                      {bidangKeilmuanOptions.map(bidang => (
                        <SelectItem key={bidang} value={bidang}>{bidang}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="metodologi">Metodologi</Label>
                  <Select value={formData.metodologi} onValueChange={(value) => setFormData({...formData, metodologi: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih metodologi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Eksperimental">Eksperimental</SelectItem>
                      <SelectItem value="Prototype">Prototype</SelectItem>
                      <SelectItem value="Studi Kasus">Studi Kasus</SelectItem>
                      <SelectItem value="Literature Review">Literature Review</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="tingkatKesulitan">Tingkat Kesulitan</Label>
                  <Select value={formData.tingkatKesulitan} onValueChange={(value) => setFormData({...formData, tingkatKesulitan: value as "Mudah" | "Sedang" | "Sulit"})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih tingkat" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mudah">Mudah</SelectItem>
                      <SelectItem value="Sedang">Sedang</SelectItem>
                      <SelectItem value="Sulit">Sulit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="estimasiWaktu">Estimasi Waktu</Label>
                  <Input
                    id="estimasiWaktu"
                    value={formData.estimasiWaktu || ""}
                    onChange={(e) => setFormData({...formData, estimasiWaktu: e.target.value})}
                    placeholder="e.g., 3-4 bulan"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="prerequisites">Prerequisites (pisahkan dengan koma)</Label>
                <Input
                  id="prerequisites"
                  value={formData.prerequisites?.join(", ") || ""}
                  onChange={(e) => setFormData({...formData, prerequisites: e.target.value.split(",").map(s => s.trim())})}
                  placeholder="e.g., Python, Machine Learning, Database"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Batal
              </Button>
              <Button onClick={handleAdd}>
                Tambah Rekomendasi
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari judul atau bidang..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Status</SelectItem>
            <SelectItem value="Tersedia">Tersedia</SelectItem>
            <SelectItem value="Diambil">Diambil</SelectItem>
            <SelectItem value="Selesai">Selesai</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Rekomendasi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rekomendasiList.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tersedia</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {rekomendasiList.filter(item => item.status === "Tersedia").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Diambil</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {rekomendasiList.filter(item => item.status === "Diambil").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Selesai</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {rekomendasiList.filter(item => item.status === "Selesai").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* List */}
      <div className="space-y-4">
        {filteredData.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-blue-600" />
                    <CardTitle className="text-lg">{item.judul}</CardTitle>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <Badge variant="outline">{item.bidangKeilmuan}</Badge>
                    <Badge variant="outline">{item.metodologi}</Badge>
                    <span className={getDifficultyColor(item.tingkatKesulitan)}>
                      {item.tingkatKesulitan}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {item.estimasiWaktu}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(item.status)}
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(item)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Rekomendasi</AlertDialogTitle>
                        <AlertDialogDescription>
                          Apakah Anda yakin ingin menghapus rekomendasi "{item.judul}"?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(item.id)}>
                          Hapus
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-3">{item.deskripsi}</CardDescription>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-sm font-medium min-w-fit">Prerequisites:</span>
                  <div className="flex flex-wrap gap-1">
                    {item.prerequisites.map((req, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {req}
                      </Badge>
                    ))}
                  </div>
                </div>
                {item.diambilOleh && (
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Diambil oleh: {item.diambilOleh}</span>
                  </div>
                )}
                <div className="text-xs text-muted-foreground">
                  Dibuat: {new Date(item.createdAt).toLocaleDateString('id-ID')}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editingItem} onOpenChange={() => setEditingItem(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Rekomendasi Judul</DialogTitle>
            <DialogDescription>
              Perbarui informasi rekomendasi judul penelitian
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-judul">Judul Penelitian</Label>
              <Input
                id="edit-judul"
                value={formData.judul || ""}
                onChange={(e) => setFormData({...formData, judul: e.target.value})}
                placeholder="Masukkan judul penelitian"
              />
            </div>
            <div>
              <Label htmlFor="edit-deskripsi">Deskripsi</Label>
              <Textarea
                id="edit-deskripsi"
                value={formData.deskripsi || ""}
                onChange={(e) => setFormData({...formData, deskripsi: e.target.value})}
                placeholder="Jelaskan deskripsi penelitian"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-bidangKeilmuan">Bidang Keilmuan</Label>
                <Select value={formData.bidangKeilmuan} onValueChange={(value) => setFormData({...formData, bidangKeilmuan: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih bidang" />
                  </SelectTrigger>
                  <SelectContent>
                    {bidangKeilmuanOptions.map(bidang => (
                      <SelectItem key={bidang} value={bidang}>{bidang}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-metodologi">Metodologi</Label>
                <Select value={formData.metodologi} onValueChange={(value) => setFormData({...formData, metodologi: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih metodologi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Eksperimental">Eksperimental</SelectItem>
                    <SelectItem value="Prototype">Prototype</SelectItem>
                    <SelectItem value="Studi Kasus">Studi Kasus</SelectItem>
                    <SelectItem value="Literature Review">Literature Review</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="edit-tingkatKesulitan">Tingkat Kesulitan</Label>
                <Select value={formData.tingkatKesulitan} onValueChange={(value) => setFormData({...formData, tingkatKesulitan: value as "Mudah" | "Sedang" | "Sulit"})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih tingkat" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mudah">Mudah</SelectItem>
                    <SelectItem value="Sedang">Sedang</SelectItem>
                    <SelectItem value="Sulit">Sulit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-estimasiWaktu">Estimasi Waktu</Label>
                <Input
                  id="edit-estimasiWaktu"
                  value={formData.estimasiWaktu || ""}
                  onChange={(e) => setFormData({...formData, estimasiWaktu: e.target.value})}
                  placeholder="e.g., 3-4 bulan"
                />
              </div>
              <div>
                <Label htmlFor="edit-status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value as "Tersedia" | "Diambil" | "Selesai"})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tersedia">Tersedia</SelectItem>
                    <SelectItem value="Diambil">Diambil</SelectItem>
                    <SelectItem value="Selesai">Selesai</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="edit-prerequisites">Prerequisites (pisahkan dengan koma)</Label>
              <Input
                id="edit-prerequisites"
                value={formData.prerequisites?.join(", ") || ""}
                onChange={(e) => setFormData({...formData, prerequisites: e.target.value.split(",").map(s => s.trim())})}
                placeholder="e.g., Python, Machine Learning, Database"
              />
            </div>
            {formData.status === "Diambil" && (
              <div>
                <Label htmlFor="edit-diambilOleh">Diambil Oleh</Label>
                <Input
                  id="edit-diambilOleh"
                  value={formData.diambilOleh || ""}
                  onChange={(e) => setFormData({...formData, diambilOleh: e.target.value})}
                  placeholder="Nama Mahasiswa (NIM)"
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingItem(null)}>
              Batal
            </Button>
            <Button onClick={handleUpdate}>
              Update Rekomendasi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}