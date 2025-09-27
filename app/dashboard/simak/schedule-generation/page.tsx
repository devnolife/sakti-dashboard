"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import {
  CalendarClock,
  Play,
  Pause,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Clock,
  Settings,
  BookOpen,
  GraduationCap,
  Sparkles,
  Zap,
  Target,
  TrendingUp,
  Download,
  Eye
} from "lucide-react"

interface ScheduleGenerationRequest {
  prodi: string
  semester: number
  academic_year: string
  semester_type: "ganjil" | "genap"
  include_pbo: boolean
  include_semester_7: boolean
  custom_courses: string[]
}

interface GenerationStatus {
  schedule_id: string
  status: "pending" | "in_progress" | "completed" | "failed"
  progress: number
  message: string
  estimated_completion: string
  created_at: string
}

export default function ScheduleGeneration() {
  const [formData, setFormData] = useState<ScheduleGenerationRequest>({
    prodi: "",
    semester: 3,
    academic_year: "2025-2026",
    semester_type: "ganjil",
    include_pbo: true,
    include_semester_7: false,
    custom_courses: []
  })

  const [generationHistory, setGenerationHistory] = useState<GenerationStatus[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentGeneration, setCurrentGeneration] = useState<GenerationStatus | null>(null)

  useEffect(() => {
    // Mock generation history
    const mockHistory: GenerationStatus[] = [
      {
        schedule_id: "sched-001",
        status: "completed",
        progress: 100,
        message: "Jadwal Informatika Semester 3 berhasil dibuat",
        estimated_completion: "0 menit",
        created_at: "2025-09-25T10:30:00Z"
      },
      {
        schedule_id: "sched-002",
        status: "completed",
        progress: 100,
        message: "Jadwal Sistem Informasi Semester 5 berhasil dibuat",
        estimated_completion: "0 menit",
        created_at: "2025-09-24T14:15:00Z"
      },
      {
        schedule_id: "sched-003",
        status: "failed",
        progress: 45,
        message: "Gagal: Konflik jadwal dosen tidak dapat diselesaikan",
        estimated_completion: "N/A",
        created_at: "2025-09-23T09:20:00Z"
      }
    ]
    setGenerationHistory(mockHistory)
  }, [])

  const handleGenerate = async () => {
    setIsGenerating(true)

    // Mock API call
    const newGeneration: GenerationStatus = {
      schedule_id: `sched-${Date.now()}`,
      status: "in_progress",
      progress: 0,
      message: "Memulai generasi jadwal...",
      estimated_completion: "5 menit",
      created_at: new Date().toISOString()
    }

    setCurrentGeneration(newGeneration)

    // Simulate progress
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 15
      if (progress >= 100) {
        progress = 100
        setCurrentGeneration({
          ...newGeneration,
          status: "completed",
          progress: 100,
          message: "Jadwal berhasil dibuat",
          estimated_completion: "0 menit"
        })
        setIsGenerating(false)
        clearInterval(interval)

        // Add to history
        setGenerationHistory(prev => [
          {
            ...newGeneration,
            status: "completed",
            progress: 100,
            message: "Jadwal berhasil dibuat",
            estimated_completion: "0 menit"
          },
          ...prev
        ])
        setCurrentGeneration(null)
      } else {
        setCurrentGeneration({
          ...newGeneration,
          progress,
          message: `Memproses jadwal... ${Math.round(progress)}%`,
          estimated_completion: `${Math.ceil((100 - progress) / 20)} menit`
        })
      }
    }, 800)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-green-500"
      case "in_progress": return "text-blue-500"
      case "pending": return "text-yellow-500"
      case "failed": return "text-red-500"
      default: return "text-gray-500"
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "completed": return "default"
      case "in_progress": return "secondary"
      case "pending": return "outline"
      case "failed": return "destructive"
      default: return "secondary"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="w-4 h-4" />
      case "in_progress": return <RefreshCw className="w-4 h-4 animate-spin" />
      case "pending": return <Clock className="w-4 h-4" />
      case "failed": return <AlertCircle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Pembuat Jadwal Otomatis
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Generate jadwal perkuliahan secara otomatis dengan AI
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="text-cyan-600 border-cyan-200">
            <Sparkles className="w-3 h-3 mr-1" />
            AI Powered
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Generation Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950 dark:to-blue-950">
            <CardHeader>
              <CardTitle className="flex items-center text-cyan-800 dark:text-cyan-200">
                <CalendarClock className="w-5 h-5 mr-2" />
                Konfigurasi Jadwal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="prodi">Program Studi</Label>
                  <Select value={formData.prodi} onValueChange={(value) => setFormData({ ...formData, prodi: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Program Studi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="informatika">Teknik Informatika</SelectItem>
                      <SelectItem value="sistem-informasi">Sistem Informasi</SelectItem>
                      <SelectItem value="teknik-elektro">Teknik Elektro</SelectItem>
                      <SelectItem value="teknik-mesin">Teknik Mesin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="semester">Semester Target</Label>
                  <Select
                    value={formData.semester.toString()}
                    onValueChange={(value) => setFormData({ ...formData, semester: parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Semester" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                        <SelectItem key={sem} value={sem.toString()}>
                          Semester {sem}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="academic_year">Tahun Akademik</Label>
                  <Input
                    id="academic_year"
                    value={formData.academic_year}
                    onChange={(e) => setFormData({ ...formData, academic_year: e.target.value })}
                    placeholder="2025-2026"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="semester_type">Tipe Semester</Label>
                  <Select
                    value={formData.semester_type}
                    onValueChange={(value: "ganjil" | "genap") => setFormData({ ...formData, semester_type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Tipe Semester" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ganjil">Semester Ganjil</SelectItem>
                      <SelectItem value="genap">Semester Genap</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border">
                  <div className="space-y-1">
                    <Label className="text-base font-medium">Include PBO Courses</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Sertakan mata kuliah Pemrograman Berorientasi Objek
                    </p>
                  </div>
                  <Switch
                    checked={formData.include_pbo}
                    onCheckedChange={(checked) => setFormData({ ...formData, include_pbo: checked })}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border">
                  <div className="space-y-1">
                    <Label className="text-base font-medium">Include Semester 7</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Sertakan mata kuliah semester 7 (KKP, Skripsi, dll)
                    </p>
                  </div>
                  <Switch
                    checked={formData.include_semester_7}
                    onCheckedChange={(checked) => setFormData({ ...formData, include_semester_7: checked })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="custom_courses">Custom Courses (Optional)</Label>
                <Textarea
                  id="custom_courses"
                  placeholder="Masukkan kode mata kuliah khusus yang ingin disertakan, pisahkan dengan koma"
                  className="min-h-20"
                />
              </div>

              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !formData.prodi}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Generate Jadwal
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Current Generation Status */}
          {currentGeneration && (
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-800 dark:text-blue-200">
                  <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                  Sedang Memproses
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{currentGeneration.message}</span>
                    <span>{Math.round(currentGeneration.progress)}%</span>
                  </div>
                  <Progress value={currentGeneration.progress} className="h-3" />
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Estimasi selesai: {currentGeneration.estimated_completion}</span>
                  <span>ID: {currentGeneration.schedule_id}</span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Quick Stats & Tips */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-gray-800 dark:text-gray-200">
                <Target className="w-5 h-5 mr-2 text-green-500" />
                Quick Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Success Rate</span>
                  <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    87%
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Avg. Time</span>
                  <Badge variant="secondary">
                    3.2 min
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Generated Today</span>
                  <Badge variant="outline">
                    12
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950">
            <CardHeader>
              <CardTitle className="flex items-center text-amber-800 dark:text-amber-200">
                <Zap className="w-5 h-5 mr-2 text-amber-500" />
                Pro Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm space-y-2">
                <div className="flex items-start space-x-2">
                  <div className="w-1 h-1 rounded-full bg-amber-500 mt-2 flex-shrink-0"></div>
                  <span className="text-amber-700 dark:text-amber-300">
                    Pastikan data dosen dan ruangan sudah lengkap sebelum generate
                  </span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1 h-1 rounded-full bg-amber-500 mt-2 flex-shrink-0"></div>
                  <span className="text-amber-700 dark:text-amber-300">
                    Review hasil jadwal untuk menghindari konflik
                  </span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1 h-1 rounded-full bg-amber-500 mt-2 flex-shrink-0"></div>
                  <span className="text-amber-700 dark:text-amber-300">
                    Gunakan custom courses untuk kebutuhan khusus
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Generation History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-gray-800 dark:text-gray-200">
            <Clock className="w-5 h-5 mr-2 text-gray-500" />
            Riwayat Generasi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {generationHistory.map((history) => (
              <div
                key={history.schedule_id}
                className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <Badge variant={getStatusBadgeVariant(history.status)} className={getStatusColor(history.status)}>
                      {getStatusIcon(history.status)}
                      <span className="ml-1 capitalize">{history.status}</span>
                    </Badge>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {history.message}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {formatDateTime(history.created_at)} • ID: {history.schedule_id}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {history.status === "completed" && (
                    <>
                      <Button variant="outline" size="sm" className="text-blue-600 hover:text-blue-700">
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="text-green-600 hover:text-green-700">
                        <Download className="w-3 h-3 mr-1" />
                        Download
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {generationHistory.length === 0 && (
            <div className="text-center py-8">
              <CalendarClock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                Belum ada riwayat generasi
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Generate jadwal pertama Anda untuk melihat riwayat di sini
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
