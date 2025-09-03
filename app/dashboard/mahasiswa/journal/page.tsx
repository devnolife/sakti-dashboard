"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import {
  BookOpen,
  Plus,
  Calendar,
  Clock,
  Edit,
  Trash2,
  Search,
  Filter,
  Download,
  Eye,
  Tag,
  Star
} from "lucide-react"

interface JournalEntry {
  id: string
  title: string
  content: string
  date: string
  category: string
  mood: "happy" | "neutral" | "sad" | "excited" | "stressed"
  tags: string[]
  isPrivate: boolean
}

const mockJournalEntries: JournalEntry[] = [
  {
    id: "1",
    title: "Hari Pertama Semester Baru",
    content: "Hari ini adalah hari pertama semester 5. Perasaan campur aduk antara senang dan nervous karena mata kuliah yang semakin challenging...",
    date: "2024-01-15",
    category: "Akademik",
    mood: "excited",
    tags: ["semester-baru", "mata-kuliah", "target"],
    isPrivate: false
  },
  {
    id: "2", 
    title: "Presentasi Proposal Skripsi",
    content: "Alhamdulillah presentasi proposal skripsi berjalan lancar. Dosen pembimbing memberikan beberapa masukan yang konstruktif...",
    date: "2024-01-10",
    category: "Skripsi",
    mood: "happy",
    tags: ["skripsi", "proposal", "presentasi"],
    isPrivate: false
  },
  {
    id: "3",
    title: "Refleksi Tengah Semester",
    content: "Sudah pertengahan semester dan sepertinya ada beberapa mata kuliah yang perlu effort lebih. Terutama Algoritma dan Struktur Data...",
    date: "2024-01-08",
    category: "Refleksi",
    mood: "stressed",
    tags: ["evaluasi", "algoritma", "belajar"],
    isPrivate: true
  }
]

const getMoodColor = (mood: string) => {
  switch (mood) {
    case "happy": return "bg-green-100 text-green-800"
    case "excited": return "bg-blue-100 text-blue-800"
    case "stressed": return "bg-red-100 text-red-800"
    case "sad": return "bg-gray-100 text-gray-800"
    default: return "bg-yellow-100 text-yellow-800"
  }
}

const getMoodEmoji = (mood: string) => {
  switch (mood) {
    case "happy": return "😊"
    case "excited": return "🤩"
    case "stressed": return "😰"
    case "sad": return "😢"
    default: return "😐"
  }
}

export default function StudentJournalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-orange-50 p-6 space-y-8">
      {/* Header */}
      <motion.div
        className="text-center space-y-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
          Jurnal Mahasiswa
        </h1>
        <p className="text-gray-600 text-lg">
          Catat perjalanan akademik dan pengalaman belajar Anda
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Tulis Jurnal */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2"
        >
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold text-gray-800">
                      Tulis Jurnal Baru
                    </CardTitle>
                    <p className="text-sm text-gray-600 mt-1">
                      Bagikan pengalaman belajar hari ini
                    </p>
                  </div>
                </div>
                <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Simpan Jurnal
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Judul Jurnal</Label>
                  <Input 
                    id="title" 
                    placeholder="Masukkan judul jurnal..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Kategori</Label>
                  <select 
                    id="category"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="">Pilih kategori</option>
                    <option value="Akademik">Akademik</option>
                    <option value="Skripsi">Skripsi</option>
                    <option value="KKP">KKP</option>
                    <option value="Organisasi">Organisasi</option>
                    <option value="Refleksi">Refleksi</option>
                    <option value="Pencapaian">Pencapaian</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="mood">Perasaan Hari Ini</Label>
                  <select 
                    id="mood"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="">Pilih perasaan</option>
                    <option value="happy">😊 Senang</option>
                    <option value="excited">🤩 Antusias</option>
                    <option value="neutral">😐 Biasa</option>
                    <option value="stressed">😰 Stress</option>
                    <option value="sad">😢 Sedih</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <Input 
                    id="tags" 
                    placeholder="pisahkan dengan koma (contoh: belajar, ujian)"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Isi Jurnal</Label>
                <Textarea 
                  id="content"
                  placeholder="Ceritakan pengalaman belajar, pencapaian, atau hal menarik hari ini..."
                  rows={8}
                  className="resize-none"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input type="checkbox" id="private" className="rounded" />
                <Label htmlFor="private" className="text-sm">
                  Jurnal pribadi (hanya saya yang bisa melihat)
                </Label>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Sidebar Statistics */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {/* Statistik Jurnal */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500" />
                Statistik Jurnal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Jurnal</span>
                  <span className="font-bold text-2xl text-amber-600">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Bulan Ini</span>
                  <span className="font-bold text-lg text-green-600">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Streak Menulis</span>
                  <span className="font-bold text-lg text-blue-600">5 hari</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mood Tracker */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-800">
                Mood Tracker (7 hari)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {["😊", "🤩", "😐", "😊", "😰", "😊", "🤩"].map((emoji, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl mb-1">{emoji}</div>
                    <div className="text-xs text-gray-500">
                      {new Date(Date.now() - (6 - index) * 24 * 60 * 60 * 1000).getDate()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Goals */}
          <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-800">
                Target Bulan Ini
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Menulis Jurnal</span>
                    <span>8/15</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '53%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>IPK Target</span>
                    <span>3.4/3.5</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '97%'}}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Jurnal Entries */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="border-0 shadow-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-amber-500" />
                Jurnal Terbaru
              </CardTitle>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Cari jurnal..."
                    className="pl-10 w-64"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              {mockJournalEntries.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-800">{entry.title}</h3>
                        {entry.isPrivate && (
                          <Badge variant="outline" className="text-xs">
                            Pribadi
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {entry.content}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <span className="text-2xl">{getMoodEmoji(entry.mood)}</span>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Badge variant="outline" className={getMoodColor(entry.mood)}>
                        {entry.category}
                      </Badge>
                      <div className="flex items-center gap-1">
                        {entry.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="secondary" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      {new Date(entry.date).toLocaleDateString('id-ID')}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}