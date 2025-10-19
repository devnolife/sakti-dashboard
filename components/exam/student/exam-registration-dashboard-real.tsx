"use client"

import { useState, useEffect } from "react"
import { Calendar, Clock, FileCheck, GraduationCap, Users, Loader2, Plus } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"

interface AvailableExam {
  id: string
  title: string
  description: string
  icon: string
  color: string
  requirements: string[]
  available: boolean
  reason?: string
}

interface Supervisor {
  id: string
  name: string
  nip: string
  department: string
}

interface RegistrationData {
  availableExams: AvailableExam[]
  supervisors: Supervisor[]
}

export function ExamRegistrationDashboard() {
  const [selectedExam, setSelectedExam] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [selectedSupervisor, setSelectedSupervisor] = useState<string>("")
  const [examTitle, setExamTitle] = useState<string>("")
  const [examAbstract, setExamAbstract] = useState<string>("")
  const [notes, setNotes] = useState<string>("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)
  const [registrationData, setRegistrationData] = useState<RegistrationData | null>(null)

  useEffect(() => {
    fetchRegistrationData()
  }, [])

  const fetchRegistrationData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/student/exams/register')
      const result = await response.json()
      
      if (result.success) {
        setRegistrationData(result.data)
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch registration data",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error('Error fetching registration data:', error)
      toast({
        title: "Error",
        description: "Failed to connect to server",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = (examId: string) => {
    const exam = registrationData?.availableExams.find(e => e.id === examId)
    if (!exam?.available) {
      toast({
        title: "Tidak Tersedia",
        description: exam?.reason || "Ujian tidak tersedia saat ini",
        variant: "destructive"
      })
      return
    }

    setSelectedExam(examId)
    setIsDialogOpen(true)
  }

  const handleSubmit = async () => {
    if (!selectedExam || !examTitle.trim()) {
      toast({
        title: "Error",
        description: "Silakan lengkapi semua field yang diperlukan",
        variant: "destructive"
      })
      return
    }

    setIsSubmitting(true)

    try {
      const examType = selectedExam.replace('-exam', '') // proposal-exam -> proposal
      
      const response = await fetch('/api/student/exams/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          examType,
          title: examTitle,
          abstract: examAbstract,
          preferredDate: selectedDate,
          preferredTime: selectedTime,
          supervisorId: selectedSupervisor,
          notes
        })
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Berhasil",
          description: "Permohonan ujian berhasil diajukan"
        })

        // Reset form
        setSelectedDate("")
        setSelectedTime("")
        setSelectedSupervisor("")
        setExamTitle("")
        setExamAbstract("")
        setNotes("")
        setIsDialogOpen(false)
        
        // Refresh data
        fetchRegistrationData()
      } else {
        toast({
          title: "Error",
          description: result.error || "Gagal mengajukan permohonan ujian",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error('Error submitting exam registration:', error)
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat mengirim data",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: any } = {
      'FileCheck': FileCheck,
      'GraduationCap': GraduationCap,
      'Users': Users
    }
    const IconComponent = icons[iconName] || FileCheck
    return <IconComponent className="w-6 h-6" />
  }

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: string } = {
      'bg-blue-500': 'from-blue-500 to-blue-600',
      'bg-purple-500': 'from-purple-500 to-purple-600',
      'bg-teal-500': 'from-teal-500 to-teal-600'
    }
    return colorMap[color] || 'from-blue-500 to-blue-600'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading registration data...</span>
        </div>
      </div>
    )
  }

  if (!registrationData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-muted-foreground">No registration data available</p>
          <Button onClick={fetchRegistrationData} className="mt-4">
            Retry
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Pendaftaran Ujian</h1>
        <p className="text-muted-foreground">Ajukan permohonan ujian akademik sesuai tahapan yang tersedia</p>
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        {registrationData.availableExams.map((exam) => (
          <Card 
            key={exam.id} 
            className={`relative overflow-hidden ${
              exam.available 
                ? 'cursor-pointer transition-transform hover:scale-105 hover:shadow-lg' 
                : 'opacity-60'
            }`}
            onClick={() => exam.available && handleRegister(exam.id)}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${getColorClasses(exam.color)} opacity-5`} />
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-gradient-to-br ${getColorClasses(exam.color)} text-white`}>
                  {getIcon(exam.icon)}
                </div>
                <div>
                  <CardTitle className="text-lg">{exam.title}</CardTitle>
                  <CardDescription className="text-sm">{exam.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-sm mb-2">Persyaratan:</h4>
                  <ul className="space-y-1">
                    {exam.requirements.map((req, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {!exam.available && exam.reason && (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-sm text-amber-700">{exam.reason}</p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                disabled={!exam.available}
                onClick={(e) => {
                  e.stopPropagation()
                  handleRegister(exam.id)
                }}
              >
                {exam.available ? (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Daftar Ujian
                  </>
                ) : (
                  'Tidak Tersedia'
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Registration Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Pendaftaran Ujian</DialogTitle>
            <DialogDescription>
              Lengkapi informasi berikut untuk mengajukan permohonan ujian
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="examTitle">Judul Penelitian *</Label>
              <Input
                id="examTitle"
                placeholder="Masukkan judul penelitian Anda"
                value={examTitle}
                onChange={(e) => setExamTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="examAbstract">Abstrak Penelitian</Label>
              <Textarea
                id="examAbstract"
                placeholder="Masukkan abstrak singkat penelitian Anda"
                value={examAbstract}
                onChange={(e) => setExamAbstract(e.target.value)}
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="preferredDate">Tanggal Preferensi</Label>
                <Input
                  id="preferredDate"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="preferredTime">Waktu Preferensi</Label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih waktu" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="08:00">08:00 - 10:00</SelectItem>
                    <SelectItem value="10:00">10:00 - 12:00</SelectItem>
                    <SelectItem value="13:00">13:00 - 15:00</SelectItem>
                    <SelectItem value="15:00">15:00 - 17:00</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="supervisor">Pembimbing Utama</Label>
              <Select value={selectedSupervisor} onValueChange={setSelectedSupervisor}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih pembimbing utama" />
                </SelectTrigger>
                <SelectContent>
                  {registrationData.supervisors.map((supervisor) => (
                    <SelectItem key={supervisor.id} value={supervisor.id}>
                      {supervisor.name} - {supervisor.department}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Catatan Tambahan</Label>
              <Textarea
                id="notes"
                placeholder="Tambahkan catatan atau permintaan khusus"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Mengirim...
                </>
              ) : (
                'Ajukan Permohonan'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
