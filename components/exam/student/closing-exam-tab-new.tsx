"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Award, CheckCircle, AlertCircle, Calendar, User, Lock, Loader2 } from "lucide-react"
import { RequirementsCard } from "./requirements-card"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { getCurrentStudentId } from "@/lib/mock-config"

interface ExamRequirement {
  id: string
  title: string
  description: string
  completed: boolean
  fileUrl?: string
  fileName?: string
  uploadedAt?: string
}

interface ExamData {
  id?: string
  title?: string
  status?: string 
  submissionDate?: string
  scheduledDate?: string
  location?: string
  advisor1?: { name: string }
  advisor2?: { name: string }
  committees?: Array<{ name: string; role: string }>
}

interface ClosingExamTabProps {
  examData: ExamData | null
  resultStatus?: string
  onRefresh?: () => void
}



export function ClosingExamTab({ examData, resultStatus, onRefresh }: ClosingExamTabProps) {
  const [requirements, setRequirements] = useState<ExamRequirement[]>([])
  const [loading, setLoading] = useState(true)

  // Mock student ID - in real app, get from auth context
  const studentId = getCurrentStudentId()

  useEffect(() => {
    fetchRequirements()
  }, [])

  const fetchRequirements = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/student/exams/requirements?examType=closing&studentId=${studentId}`)
      const result = await response.json()
      
      if (result.success) {
        setRequirements(result.data)
      } else {
        toast({
          title: "Error",
          description: "Gagal memuat data persyaratan",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error('Error fetching requirements:', error)
      toast({
        title: "Error",
        description: "Gagal terhubung ke server",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (requirementId: string, file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('requirementId', requirementId)
    formData.append('studentId', studentId)

    const response = await fetch('/api/student/exams/requirements/upload', {
      method: 'POST',
      body: formData
    })

    const result = await response.json()
    
    if (!result.success) {
      throw new Error(result.error)
    }

    // Refresh requirements data
    await fetchRequirements()
    if (onRefresh) onRefresh()
  }

  const handleFileDelete = async (requirementId: string) => {
    const response = await fetch(`/api/student/exams/requirements/upload?requirementId=${requirementId}&studentId=${studentId}`, {
      method: 'DELETE'
    })

    const result = await response.json()
    
    if (!result.success) {
      throw new Error(result.error)
    }

    // Refresh requirements data
    await fetchRequirements()
    if (onRefresh) onRefresh()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-teal-600" />
          <span>Memuat data persyaratan...</span>
        </div>
      </div>
    )
  }



  const allRequirementsCompleted = requirements.every(req => req.completed)
  const completedCount = requirements.filter(req => req.completed).length

  const canSubmit = allRequirementsCompleted && resultStatus === 'passed' && (!examData || examData.status === "pending")
  const isResultPassed = resultStatus === 'passed' || resultStatus === 'completed'

  return (
    <div className="space-y-6">
      {/* Prerequisites Check */}
      {!isResultPassed && (
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Lock className="h-8 w-8 text-amber-600 mt-1" />
              <div>
                <h3 className="text-lg font-medium text-amber-800 mb-2">
                  Ujian Hasil Harus Diselesaikan Terlebih Dahulu
                </h3>
                <p className="text-amber-700 mb-4">
                  Anda harus lulus ujian hasil sebelum dapat mengajukan ujian tertutup.
                </p>
                <Badge variant="outline" className="text-amber-600 border-amber-300 bg-amber-100">
                  Status Ujian Hasil: {resultStatus || 'Belum Diajukan'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Status Overview */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="border-teal-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Award className="h-8 w-8 text-teal-600" />
              <div>
                <p className="text-sm font-medium text-teal-800">Status Ujian</p>
                <p className="text-lg font-bold text-teal-900">
                  {!isResultPassed ? 'Terkunci' :
                   examData?.status === 'scheduled' ? 'Terjadwal' :
                   examData?.status === 'completed' ? 'Selesai' :
                   examData?.status === 'pending' ? 'Menunggu' : 'Belum Diajukan'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm font-medium text-green-800">Persyaratan</p>
                <p className="text-lg font-bold text-green-900">
                  {completedCount}/{requirements.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-8 w-8 text-amber-600" />
              <div>
                <p className="text-sm font-medium text-amber-800">Kelengkapan</p>
                <p className="text-lg font-bold text-amber-900">
                  {Math.round((completedCount / requirements.length) * 100)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Exam Info Card (if exam exists) */}
      {examData && examData.id && (
        <Card className="border-teal-200">
          <CardHeader className="bg-teal-50 border-b border-teal-200">
            <CardTitle className="text-teal-800">Informasi Ujian Tertutup</CardTitle>
            <CardDescription className="text-teal-700">
              Detail ujian tertutup yang telah diajukan
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Judul Penelitian</p>
                  <p className="text-sm text-gray-900">{examData?.title || 'Belum ditentukan'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Tanggal Pengajuan</p>
                  <p className="text-sm text-gray-900">
                    {examData?.submissionDate 
                      ? new Date(examData.submissionDate).toLocaleDateString('id-ID')
                      : 'Belum diajukan'
                    }
                  </p>
                </div>
                {examData?.scheduledDate && (
                  <div>
                    <p className="text-sm font-medium text-gray-600">Jadwal Ujian</p>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-teal-600" />
                      <p className="text-sm text-gray-900">
                        {new Date(examData.scheduledDate).toLocaleDateString('id-ID', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div className="space-y-4">
                {examData?.advisor1 && (
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pembimbing 1</p>
                    <p className="text-sm text-gray-900">{examData.advisor1.name}</p>
                  </div>
                )}
                {examData?.advisor2 && (
                  <div>  
                    <p className="text-sm font-medium text-gray-600">Pembimbing 2</p>
                    <p className="text-sm text-gray-900">{examData.advisor2.name}</p>
                  </div>
                )}
                {examData?.location && (
                  <div>
                    <p className="text-sm font-medium text-gray-600">Lokasi</p>
                    <p className="text-sm text-gray-900">{examData.location}</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Requirements Card */}
      {isResultPassed && (
        <RequirementsCard
          title="Persyaratan Ujian Tertutup"
          examType="closing"
          requirements={requirements}
          onFileUpload={handleFileUpload}
          onFileDelete={handleFileDelete}
        />
      )}

      {/* Submission Card */}
      <Card className="border-teal-200">
        <CardHeader className="bg-teal-50 border-b border-teal-200">
          <CardTitle className="text-teal-800">Pengajuan Ujian Tertutup</CardTitle>
          <CardDescription className="text-teal-700">
            Ajukan ujian tertutup setelah lulus ujian hasil dan semua persyaratan terpenuhi
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {!isResultPassed ? (
            <div className="text-center py-8">
              <Lock className="h-12 w-12 text-amber-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Ujian Hasil Belum Selesai
              </h3>
              <p className="text-gray-600 mb-4">
                Selesaikan dan lulus ujian hasil terlebih dahulu sebelum dapat mengajukan ujian tertutup.
              </p>
              <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">
                Status Ujian Hasil: {resultStatus || 'Belum Diajukan'}
              </Badge>
            </div>
          ) : !allRequirementsCompleted ? (
            <div className="text-center py-8">
              <AlertCircle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Persyaratan Belum Lengkap
              </h3>
              <p className="text-gray-600 mb-4">
                Lengkapi semua persyaratan terlebih dahulu sebelum mengajukan ujian tertutup.
              </p>
              <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">
                {requirements.length - completedCount} persyaratan tersisa
              </Badge>
            </div>
          ) : examData?.id ? (
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Ujian Tertutup Telah Diajukan
              </h3>
              <p className="text-gray-600 mb-4">
                Pengajuan ujian tertutup Anda sedang diproses. Silakan tunggu konfirmasi jadwal ujian.
              </p>
              <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                Status: {examData.status === 'scheduled' ? 'Terjadwal' : 'Menunggu Persetujuan'}
              </Badge>
            </div>
          ) : (
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Siap Mengajukan Ujian Tertutup
              </h3>
              <p className="text-gray-600 mb-6">
                Semua persyaratan telah terpenuhi. Anda dapat mengajukan ujian tertutup sekarang.
              </p>
              <Button 
                size="lg" 
                className="bg-teal-600 hover:bg-teal-700"
                onClick={() => window.location.href = '/dashboard/mahasiswa/exams/register'}
              >
                <Award className="h-5 w-5 mr-2" />
                Ajukan Ujian Tertutup
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
