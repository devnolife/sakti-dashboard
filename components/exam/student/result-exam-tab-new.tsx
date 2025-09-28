"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GraduationCap, CheckCircle, AlertCircle, Calendar, User, Lock, Loader2 } from "lucide-react"
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

interface ResultExamTabProps {
  examData: ExamData | null
  proposalStatus?: string
  onRefresh?: () => void
}



export function ResultExamTab({ examData, proposalStatus, onRefresh }: ResultExamTabProps) {
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
      const response = await fetch(`/api/student/exams/requirements?examType=result&studentId=${studentId}`)
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

  const allRequirementsCompleted = requirements.every(req => req.completed)
  const completedCount = requirements.filter(req => req.completed).length

  const canSubmit = allRequirementsCompleted && proposalStatus === 'passed' && (!examData || examData.status === "pending")
  const isProposalPassed = proposalStatus === 'passed' || proposalStatus === 'completed'

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-purple-600" />
          <span>Memuat data persyaratan...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Prerequisites Check */}
      {!isProposalPassed && (
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Lock className="h-8 w-8 text-amber-600 mt-1" />
              <div>
                <h3 className="text-lg font-medium text-amber-800 mb-2">
                  Ujian Proposal Harus Diselesaikan Terlebih Dahulu
                </h3>
                <p className="text-amber-700 mb-4">
                  Anda harus lulus ujian proposal sebelum dapat mengajukan ujian hasil.
                </p>
                <Badge variant="outline" className="text-amber-600 border-amber-300 bg-amber-100">
                  Status Proposal: {proposalStatus || 'Belum Diajukan'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Status Overview */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <GraduationCap className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-purple-800">Status Ujian</p>
                <p className="text-lg font-bold text-purple-900">
                  {!isProposalPassed ? 'Terkunci' :
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
        <Card className="border-purple-200">
          <CardHeader className="bg-purple-50 border-b border-purple-200">
            <CardTitle className="text-purple-800">Informasi Ujian Hasil</CardTitle>
            <CardDescription className="text-purple-700">
              Detail ujian hasil yang telah diajukan
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
                      <Calendar className="h-4 w-4 text-purple-600" />
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
      {isProposalPassed && (
        <RequirementsCard
          title="Persyaratan Ujian Hasil"
          examType="result"
          requirements={requirements}
          onFileUpload={handleFileUpload}
          onFileDelete={handleFileDelete}
        />
      )}

      {/* Submission Card */}
      <Card className="border-purple-200">
        <CardHeader className="bg-purple-50 border-b border-purple-200">
          <CardTitle className="text-purple-800">Pengajuan Ujian Hasil</CardTitle>
          <CardDescription className="text-purple-700">
            Ajukan ujian hasil setelah lulus ujian proposal dan semua persyaratan terpenuhi
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {!isProposalPassed ? (
            <div className="text-center py-8">
              <Lock className="h-12 w-12 text-amber-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Ujian Proposal Belum Selesai
              </h3>
              <p className="text-gray-600 mb-4">
                Selesaikan dan lulus ujian proposal terlebih dahulu sebelum dapat mengajukan ujian hasil.
              </p>
              <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">
                Status Proposal: {proposalStatus || 'Belum Diajukan'}
              </Badge>
            </div>
          ) : !allRequirementsCompleted ? (
            <div className="text-center py-8">
              <AlertCircle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Persyaratan Belum Lengkap
              </h3>
              <p className="text-gray-600 mb-4">
                Lengkapi semua persyaratan terlebih dahulu sebelum mengajukan ujian hasil.
              </p>
              <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">
                {requirements.length - completedCount} persyaratan tersisa
              </Badge>
            </div>
          ) : examData?.id ? (
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Ujian Hasil Telah Diajukan
              </h3>
              <p className="text-gray-600 mb-4">
                Pengajuan ujian hasil Anda sedang diproses. Silakan tunggu konfirmasi jadwal ujian.
              </p>
              <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                Status: {examData.status === 'scheduled' ? 'Terjadwal' : 'Menunggu Persetujuan'}
              </Badge>
            </div>
          ) : (
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Siap Mengajukan Ujian Hasil
              </h3>
              <p className="text-gray-600 mb-6">
                Semua persyaratan telah terpenuhi. Anda dapat mengajukan ujian hasil sekarang.
              </p>
              <Button 
                size="lg" 
                className="bg-purple-600 hover:bg-purple-700"
                onClick={() => window.location.href = '/dashboard/mahasiswa/exams/register'}
              >
                <GraduationCap className="h-5 w-5 mr-2" />
                Ajukan Ujian Hasil
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
