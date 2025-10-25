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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Book,
  Users,
  Calendar,
  BookOpen,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface Course {
  id: string
  code: string
  name: string
  credits: number
  semester: number
  department: string
  lecturerName: string
  isActive: boolean
  description?: string
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: "1",
      code: "IF101",
      name: "Algoritma dan Pemrograman",
      credits: 3,
      semester: 1,
      department: "Teknik Informatika",
      lecturerName: "Dr. Budi Santoso, M.Kom",
      isActive: true,
      description: "Mata kuliah dasar algoritma dan pemrograman",
    },
    {
      id: "2",
      code: "IF201",
      name: "Struktur Data",
      credits: 3,
      semester: 2,
      department: "Teknik Informatika",
      lecturerName: "Dr. Rina Wijaya, M.Kom",
      isActive: true,
      description: "Mata kuliah struktur data dan algoritma lanjutan",
    },
    {
      id: "3",
      code: "IF301",
      name: "Basis Data",
      credits: 3,
      semester: 3,
      department: "Teknik Informatika",
      lecturerName: "Ahmad Fauzi, M.T",
      isActive: true,
      description: "Mata kuliah sistem basis data",
    },
  ])
  const [searchTerm, setSearchTerm] = useState("")
  const [showDialog, setShowDialog] = useState(false)
  const [editingCourse, setEditingCourse] = useState<Course | null>(null)
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    credits: 3,
    semester: 1,
    department: "",
    description: "",
    isActive: true,
  })

  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddCourse = () => {
    setEditingCourse(null)
    setFormData({
      code: "",
      name: "",
      credits: 3,
      semester: 1,
      department: "",
      description: "",
      isActive: true,
    })
    setShowDialog(true)
  }

  const handleEditCourse = (course: Course) => {
    setEditingCourse(course)
    setFormData({
      code: course.code,
      name: course.name,
      credits: course.credits,
      semester: course.semester,
      department: course.department,
      description: course.description || "",
      isActive: course.isActive,
    })
    setShowDialog(true)
  }

  const handleSubmit = () => {
    if (editingCourse) {
      setCourses(
        courses.map((c) =>
          c.id === editingCourse.id ? { ...c, ...formData } : c
        )
      )
      toast({
        title: "Berhasil",
        description: "Mata kuliah berhasil diperbarui",
      })
    } else {
      const newCourse: Course = {
        id: Date.now().toString(),
        ...formData,
        lecturerName: "Belum ditentukan",
      }
      setCourses([...courses, newCourse])
      toast({
        title: "Berhasil",
        description: "Mata kuliah berhasil ditambahkan",
      })
    }
    setShowDialog(false)
  }

  const handleDeleteCourse = (id: string) => {
    setCourses(courses.filter((c) => c.id !== id))
    toast({
      title: "Berhasil",
      description: "Mata kuliah berhasil dihapus",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Manajemen Mata Kuliah</h2>
          <p className="text-muted-foreground">
            Kelola data mata kuliah dan kurikulum
          </p>
        </div>
        <Button onClick={handleAddCourse}>
          <Plus className="w-4 h-4 mr-2" />
          Tambah Mata Kuliah
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Mata Kuliah</CardTitle>
            <Book className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courses.length}</div>
            <p className="text-xs text-muted-foreground">Semua program studi</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Mata Kuliah Aktif</CardTitle>
            <BookOpen className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {courses.filter((c) => c.isActive).length}
            </div>
            <p className="text-xs text-muted-foreground">Semester ini</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total SKS</CardTitle>
            <Calendar className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {courses.reduce((acc, c) => acc + c.credits, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Keseluruhan</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Dosen Pengampu</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(courses.map((c) => c.lecturerName)).size}
            </div>
            <p className="text-xs text-muted-foreground">Dosen aktif</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Mata Kuliah</CardTitle>
          <CardDescription>
            Kelola semua mata kuliah yang tersedia
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
              <Input
                placeholder="Cari mata kuliah..."
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
                  <TableHead>Nama Mata Kuliah</TableHead>
                  <TableHead>SKS</TableHead>
                  <TableHead>Semester</TableHead>
                  <TableHead>Program Studi</TableHead>
                  <TableHead>Dosen Pengampu</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCourses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell className="font-mono font-medium">
                      {course.code}
                    </TableCell>
                    <TableCell>{course.name}</TableCell>
                    <TableCell>{course.credits}</TableCell>
                    <TableCell>{course.semester}</TableCell>
                    <TableCell>{course.department}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {course.lecturerName}
                    </TableCell>
                    <TableCell>
                      <Badge variant={course.isActive ? "default" : "secondary"}>
                        {course.isActive ? "Aktif" : "Nonaktif"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditCourse(course)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteCourse(course.id)}
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

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editingCourse ? "Edit Mata Kuliah" : "Tambah Mata Kuliah"}
            </DialogTitle>
            <DialogDescription>
              Lengkapi informasi mata kuliah
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="code">Kode Mata Kuliah</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) =>
                  setFormData({ ...formData, code: e.target.value })
                }
                placeholder="IF101"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="name">Nama Mata Kuliah</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Algoritma dan Pemrograman"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="credits">SKS</Label>
                <Select
                  value={formData.credits.toString()}
                  onValueChange={(value) =>
                    setFormData({ ...formData, credits: parseInt(value) })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6].map((sks) => (
                      <SelectItem key={sks} value={sks.toString()}>
                        {sks} SKS
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="semester">Semester</Label>
                <Select
                  value={formData.semester.toString()}
                  onValueChange={(value) =>
                    setFormData({ ...formData, semester: parseInt(value) })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                      <SelectItem key={sem} value={sem.toString()}>
                        Semester {sem}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="department">Program Studi</Label>
              <Select
                value={formData.department}
                onValueChange={(value) =>
                  setFormData({ ...formData, department: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih program studi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Teknik Informatika">
                    Teknik Informatika
                  </SelectItem>
                  <SelectItem value="Sistem Informasi">
                    Sistem Informasi
                  </SelectItem>
                  <SelectItem value="Teknik Elektro">Teknik Elektro</SelectItem>
                  <SelectItem value="Teknik Sipil">Teknik Sipil</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Deskripsi mata kuliah..."
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Batal
            </Button>
            <Button onClick={handleSubmit}>
              {editingCourse ? "Perbarui" : "Tambah"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
