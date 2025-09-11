"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import {
  Calendar,
  Clock,
  User,
  FileText,
  Eye,
  Edit,
  Search,
  Save,
  CheckCircle,
  AlertTriangle,
  Star,
  BookOpen,
  GraduationCap,
  Award,
  Clipboard,
} from "lucide-react"
import { format } from "date-fns"
import { id } from "date-fns/locale"

interface ExamGrading {
  id: string
  examType: "proposal" | "seminar" | "sidang"
  studentName: string
  studentNim: string
  title: string
  examDate: string
  examinerRole: "pembimbing" | "penguji_1" | "penguji_2" | "ketua_penguji"
  status: "pending" | "graded" | "submitted"
  grades: {
    presentation?: number
    content?: number
    methodology?: number
    analysis?: number
    conclusion?: number
    overall?: number
  }
  feedback?: string
  recommendations?: string
  decision?: "pass" | "conditional_pass" | "fail" | "revision_required"
}

// Mock data for exam grading
const mockExamGrading: ExamGrading[] = [
  {
    id: "1",
    examType: "proposal",
    studentName: "Ahmad Fauzi",
    studentNim: "20210001",
    title: "Sistem Manajemen Inventori Berbasis Web untuk UKM",
    examDate: "2024-01-15",
    examinerRole: "pembimbing",
    status: "pending",
    grades: {},
  },
  {
    id: "2",
    examType: "seminar",
    studentName: "Siti Nurhaliza",
    studentNim: "20210002",
    title: "Implementasi Machine Learning untuk Prediksi Penjualan",
    examDate: "2024-01-10",
    examinerRole: "penguji_1",
    status: "graded",
    grades: {
      presentation: 85,
      content: 80,
      methodology: 82,
      analysis: 78,
      conclusion: 80,
      overall: 81,
    },
    feedback: "Presentasi baik, metodologi cukup jelas. Perlu perbaikan di bagian analisis data.",
    recommendations: "Tingkatkan analisis mendalam pada hasil eksperimen.",
    decision: "conditional_pass",
  },
  {
    id: "3",
    examType: "sidang",
    studentName: "Budi Santoso",
    studentNim: "20190005",
    title: "Aplikasi Mobile Monitoring Kesehatan Lansia",
    examDate: "2024-01-08",
    examinerRole: "penguji_2",
    status: "submitted",
    grades: {
      presentation: 88,
      content: 85,
      methodology: 87,
      analysis: 84,
      conclusion: 86,
      overall: 86,
    },
    feedback: "Implementasi sangat baik, dokumentasi lengkap. Hasil testing komprehensif.",
    recommendations: "Siap untuk publikasi dengan minor revision.",
    decision: "pass",
  },
  {
    id: "4",
    examType: "proposal",
    studentName: "Diana Putri",
    studentNim: "20210003",
    title: "Sistem Informasi Manajemen Sekolah Berbasis Cloud",
    examDate: "2024-01-12",
    examinerRole: "ketua_penguji",
    status: "pending",
    grades: {},
  },
]

export default function ExamGradingPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState<"pending" | "graded" | "submitted">("pending")
  const [grading, setGrading] = useState<ExamGrading[]>(mockExamGrading)
  const [filteredGrading, setFilteredGrading] = useState<ExamGrading[]>(mockExamGrading)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGrading, setSelectedGrading] = useState<ExamGrading | null>(null)
  const [showGradingDialog, setShowGradingDialog] = useState(false)
  const [gradingForm, setGradingForm] = useState<Partial<ExamGrading>>({})

  // Filter grading based on active tab and search query
  useEffect(() => {
    let filtered = grading

    // Filter by status
    filtered = filtered.filter((item) => item.status === activeTab)

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (item) =>
          item.studentName.toLowerCase().includes(query) ||
          item.studentNim.toLowerCase().includes(query) ||
          item.title.toLowerCase().includes(query),
      )
    }

    setFilteredGrading(filtered)
  }, [activeTab, searchQuery, grading])

  const handleGrade = (item: ExamGrading) => {
    setSelectedGrading(item)
    setGradingForm({
      ...item,
      grades: item.grades || {},
    })
    setShowGradingDialog(true)
  }

  const handleSaveGrading = () => {
    if (!selectedGrading) return

    // Calculate overall grade if individual grades are provided
    const grades = gradingForm.grades || {}
    const gradeValues = Object.values(grades).filter(val => val !== undefined) as number[]
    
    if (gradeValues.length > 0) {
      const overall = Math.round(gradeValues.reduce((sum, grade) => sum + grade, 0) / gradeValues.length)
      grades.overall = overall
    }

    const updatedGrading = grading.map((item) =>
      item.id === selectedGrading.id
        ? {
            ...item,
            grades,
            feedback: gradingForm.feedback || "",
            recommendations: gradingForm.recommendations || "",
            decision: gradingForm.decision || "pass",
            status: "graded" as const,
          }
        : item,
    )

    setGrading(updatedGrading)
    setShowGradingDialog(false)
    toast({
      title: "Berhasil",
      description: "Penilaian ujian berhasil disimpan",
    })
  }

  const handleSubmitGrading = (id: string) => {
    const updatedGrading = grading.map((item) =>
      item.id === id ? { ...item, status: "submitted" as const } : item,
    )
    setGrading(updatedGrading)
    toast({
      title: "Berhasil",
      description: "Penilaian ujian berhasil disubmit",
    })
  }

  const getExamTypeBadge = (type: string) => {
    switch (type) {
      case "proposal":
        return <Badge className="bg-blue-500/10 text-blue-500">Proposal</Badge>
      case "seminar":
        return <Badge className="bg-purple-500/10 text-purple-500">Seminar</Badge>
      case "sidang":
        return <Badge className="bg-green-500/10 text-green-500">Sidang</Badge>
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-amber-500/10 text-amber-500">
            <Clock className="h-3 w-3 mr-1" />
            Belum Dinilai
          </Badge>
        )
      case "graded":
        return (
          <Badge className="bg-blue-500/10 text-blue-500">
            <Edit className="h-3 w-3 mr-1" />
            Sudah Dinilai
          </Badge>
        )
      case "submitted":
        return (
          <Badge className="bg-green-500/10 text-green-500">
            <CheckCircle className="h-3 w-3 mr-1" />
            Submitted
          </Badge>
        )
      default:
        return null
    }
  }

  const getDecisionBadge = (decision?: string) => {
    if (!decision) return null
    
    switch (decision) {
      case "pass":
        return <Badge className="bg-green-500/10 text-green-500">Lulus</Badge>
      case "conditional_pass":
        return <Badge className="bg-yellow-500/10 text-yellow-500">Lulus Bersyarat</Badge>
      case "fail":
        return <Badge className="bg-red-500/10 text-red-500">Tidak Lulus</Badge>
      case "revision_required":
        return <Badge className="bg-orange-500/10 text-orange-500">Perlu Revisi</Badge>
      default:
        return null
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "pembimbing":
        return <Badge variant="outline">Pembimbing</Badge>
      case "penguji_1":
        return <Badge variant="outline">Penguji 1</Badge>
      case "penguji_2":
        return <Badge variant="outline">Penguji 2</Badge>
      case "ketua_penguji":
        return <Badge variant="outline">Ketua Penguji</Badge>
      default:
        return null
    }
  }

  const getPendingCount = () => grading.filter((item) => item.status === "pending").length
  const getGradedCount = () => grading.filter((item) => item.status === "graded").length
  const getSubmittedCount = () => grading.filter((item) => item.status === "submitted").length

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Penilaian Ujian
          </span>
        </h2>
        <p className="text-muted-foreground mt-2">Kelola penilaian ujian mahasiswa sebagai penguji dan pembimbing</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Belum Dinilai</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getPendingCount()}</div>
            <p className="text-xs text-muted-foreground">ujian menunggu penilaian</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sudah Dinilai</CardTitle>
            <Edit className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getGradedCount()}</div>
            <p className="text-xs text-muted-foreground">ujian sudah dinilai</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Submitted</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getSubmittedCount()}</div>
            <p className="text-xs text-muted-foreground">penilaian final</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <Clipboard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{grading.length}</div>
            <p className="text-xs text-muted-foreground">semua ujian</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <Tabs
          defaultValue="pending"
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "pending" | "graded" | "submitted")}
          className="w-full"
        >
          <TabsList className="grid grid-cols-3 w-full md:w-auto">
            <TabsTrigger value="pending">Belum Dinilai</TabsTrigger>
            <TabsTrigger value="graded">Sudah Dinilai</TabsTrigger>
            <TabsTrigger value="submitted">Submitted</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Cari ujian untuk dinilai..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Grading List */}
      <Card className="overflow-hidden gradient-border">
        <CardHeader>
          <CardTitle>Penilaian Ujian</CardTitle>
          <CardDescription>Daftar ujian yang perlu dinilai atau sudah dinilai</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredGrading.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8">
                <FileText className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">Tidak ada ujian untuk dinilai</p>
              </div>
            ) : (
              filteredGrading.map((item) => (
                <div key={item.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        {getExamTypeBadge(item.examType)}
                        {getRoleBadge(item.examinerRole)}
                        {getStatusBadge(item.status)}
                        {getDecisionBadge(item.decision)}
                      </div>
                      
                      <div className="space-y-1">
                        <h3 className="font-semibold text-lg">{item.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span>{item.studentName} ({item.studentNim})</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {format(new Date(item.examDate), "dd MMM yyyy", { locale: id })}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {item.grades?.overall && (
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm font-medium">Nilai: {item.grades.overall}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {item.status === "pending" && (
                        <Button size="sm" onClick={() => handleGrade(item)}>
                          <Edit className="h-4 w-4 mr-1" />
                          Beri Nilai
                        </Button>
                      )}
                      {item.status === "graded" && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleGrade(item)}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleSubmitGrading(item.id)}
                          >
                            <Save className="h-4 w-4 mr-1" />
                            Submit
                          </Button>
                        </>
                      )}
                      {item.status === "submitted" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleGrade(item)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Lihat
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Grading Dialog */}
      {selectedGrading && (
        <Dialog open={showGradingDialog} onOpenChange={setShowGradingDialog}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Penilaian Ujian - {selectedGrading.studentName}
              </DialogTitle>
              <DialogDescription>
                {selectedGrading.examType.toUpperCase()} • {selectedGrading.title}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-6">
              {/* Student Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">Mahasiswa</p>
                  <p className="font-medium">{selectedGrading.studentName} ({selectedGrading.studentNim})</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tanggal Ujian</p>
                  <p className="font-medium">
                    {format(new Date(selectedGrading.examDate), "dd MMMM yyyy", { locale: id })}
                  </p>
                </div>
              </div>
              
              {/* Grading Form */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Komponen Penilaian</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="presentation">Presentasi</Label>
                    <Input
                      id="presentation"
                      type="number"
                      min="0"
                      max="100"
                      value={gradingForm.grades?.presentation || ""}
                      onChange={(e) =>
                        setGradingForm({
                          ...gradingForm,
                          grades: {
                            ...gradingForm.grades,
                            presentation: e.target.value ? parseInt(e.target.value) : undefined,
                          },
                        })
                      }
                      placeholder="0-100"
                      disabled={selectedGrading.status === "submitted"}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="content">Konten</Label>
                    <Input
                      id="content"
                      type="number"
                      min="0"
                      max="100"
                      value={gradingForm.grades?.content || ""}
                      onChange={(e) =>
                        setGradingForm({
                          ...gradingForm,
                          grades: {
                            ...gradingForm.grades,
                            content: e.target.value ? parseInt(e.target.value) : undefined,
                          },
                        })
                      }
                      placeholder="0-100"
                      disabled={selectedGrading.status === "submitted"}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="methodology">Metodologi</Label>
                    <Input
                      id="methodology"
                      type="number"
                      min="0"
                      max="100"
                      value={gradingForm.grades?.methodology || ""}
                      onChange={(e) =>
                        setGradingForm({
                          ...gradingForm,
                          grades: {
                            ...gradingForm.grades,
                            methodology: e.target.value ? parseInt(e.target.value) : undefined,
                          },
                        })
                      }
                      placeholder="0-100"
                      disabled={selectedGrading.status === "submitted"}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="analysis">Analisis</Label>
                    <Input
                      id="analysis"
                      type="number"
                      min="0"
                      max="100"
                      value={gradingForm.grades?.analysis || ""}
                      onChange={(e) =>
                        setGradingForm({
                          ...gradingForm,
                          grades: {
                            ...gradingForm.grades,
                            analysis: e.target.value ? parseInt(e.target.value) : undefined,
                          },
                        })
                      }
                      placeholder="0-100"
                      disabled={selectedGrading.status === "submitted"}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="conclusion">Kesimpulan</Label>
                    <Input
                      id="conclusion"
                      type="number"
                      min="0"
                      max="100"
                      value={gradingForm.grades?.conclusion || ""}
                      onChange={(e) =>
                        setGradingForm({
                          ...gradingForm,
                          grades: {
                            ...gradingForm.grades,
                            conclusion: e.target.value ? parseInt(e.target.value) : undefined,
                          },
                        })
                      }
                      placeholder="0-100"
                      disabled={selectedGrading.status === "submitted"}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="overall">Nilai Keseluruhan</Label>
                    <Input
                      id="overall"
                      type="number"
                      min="0"
                      max="100"
                      value={
                        gradingForm.grades?.overall ||
                        (gradingForm.grades &&
                        Object.values(gradingForm.grades).filter(v => v !== undefined).length > 0
                          ? Math.round(
                              Object.values(gradingForm.grades)
                                .filter(v => v !== undefined)
                                .reduce((sum, val) => sum + (val as number), 0) /
                                Object.values(gradingForm.grades).filter(v => v !== undefined).length
                            )
                          : "")
                      }
                      onChange={(e) =>
                        setGradingForm({
                          ...gradingForm,
                          grades: {
                            ...gradingForm.grades,
                            overall: e.target.value ? parseInt(e.target.value) : undefined,
                          },
                        })
                      }
                      placeholder="0-100"
                      disabled={selectedGrading.status === "submitted"}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="decision">Keputusan</Label>
                  <Select
                    value={gradingForm.decision || ""}
                    onValueChange={(value) =>
                      setGradingForm({ ...gradingForm, decision: value as any })
                    }
                    disabled={selectedGrading.status === "submitted"}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih keputusan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pass">Lulus</SelectItem>
                      <SelectItem value="conditional_pass">Lulus Bersyarat</SelectItem>
                      <SelectItem value="revision_required">Perlu Revisi</SelectItem>
                      <SelectItem value="fail">Tidak Lulus</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="feedback">Feedback</Label>
                  <Textarea
                    id="feedback"
                    value={gradingForm.feedback || ""}
                    onChange={(e) =>
                      setGradingForm({ ...gradingForm, feedback: e.target.value })
                    }
                    placeholder="Berikan feedback untuk mahasiswa..."
                    rows={3}
                    disabled={selectedGrading.status === "submitted"}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="recommendations">Rekomendasi</Label>
                  <Textarea
                    id="recommendations"
                    value={gradingForm.recommendations || ""}
                    onChange={(e) =>
                      setGradingForm({ ...gradingForm, recommendations: e.target.value })
                    }
                    placeholder="Berikan rekomendasi untuk perbaikan..."
                    rows={3}
                    disabled={selectedGrading.status === "submitted"}
                  />
                </div>
              </div>
            </div>
            
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setShowGradingDialog(false)}>
                {selectedGrading.status === "submitted" ? "Tutup" : "Batal"}
              </Button>
              {selectedGrading.status !== "submitted" && (
                <Button onClick={handleSaveGrading}>
                  <Save className="h-4 w-4 mr-2" />
                  Simpan Penilaian
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}