"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, CheckCircle, AlertCircle, Calendar, User, Loader2 } from "lucide-react"
import { RequirementsCard } from "./requirements-card"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"

interface ExamRequirement {
  id: string
  title: string
  description?: string
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

interface ProposalExamTabProps {
  examData: ExamData | null
  onRefresh?: () => void
}

export function ProposalExamTab({ examData, onRefresh }: ProposalExamTabProps) {
  const [requirements, setRequirements] = useState<ExamRequirement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRequirements()
  }, [])

  const fetchRequirements = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/student/exams/requirements?examType=proposal`)
      const result = await response.json()
      
      if (result.success) {
        console.log('📋 Requirements data received:', result.data)
        setRequirements(result.data)
      } else {
        console.error('❌ Failed to fetch requirements:', result.error)
        toast({
          title: "Error",
          description: result.error || "Gagal memuat data persyaratan",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error('❌ Error fetching requirements:', error)
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
    console.log(`🔄 Uploading file for requirement: ${requirementId}`)
    
    const formData = new FormData()
    formData.append('file', file)
    formData.append('requirementId', requirementId)

    const response = await fetch('/api/student/exams/requirements/upload', {
      method: 'POST',
      body: formData
    })

    const result = await response.json()
    
    if (!result.success) {
      console.error('❌ Upload failed:', result.error)
      throw new Error(result.error)
    }

    console.log('✅ Upload successful:', result.data)

    // Refresh requirements data
    await fetchRequirements()
    if (onRefresh) onRefresh()
  }

  const handleFileDelete = async (requirementId: string) => {
    console.log(`🗑️ Deleting file for requirement: ${requirementId}`)
    
    const response = await fetch(`/api/student/exams/requirements/upload?requirementId=${requirementId}`, {
      method: 'DELETE'
    })

    const result = await response.json()
    
    if (!result.success) {
      console.error('❌ Delete failed:', result.error)
      throw new Error(result.error)
    }

    console.log('✅ Delete successful')

    // Refresh requirements data
    await fetchRequirements()
    if (onRefresh) onRefresh()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
          <span>Memuat data persyaratan...</span>
        </div>
      </div>
    )
  }

  const allRequirementsCompleted = requirements.every(req => req.completed)
  const completedCount = requirements.filter(req => req.completed).length

  const canSubmit = allRequirementsCompleted && (!examData || examData.status === "pending")

  return (
    <div className="space-y-6">
      {/* Status Overview */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-blue-800">Status Ujian</p>
                <p className="text-lg font-bold text-blue-900">
                  {examData?.status === 'scheduled' ? 'Terjadwal' :
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
                  {requirements.length > 0 ? Math.round((completedCount / requirements.length) * 100) : 0}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Exam Info Card (if exam exists) */}
      {examData && examData.id && (
        <Card className="border-blue-200">
          <CardHeader className="bg-blue-50 border-b border-blue-200">
            <CardTitle className="text-blue-800">Informasi Ujian Proposal</CardTitle>
            <CardDescription className="text-blue-700">
              Detail ujian proposal yang telah diajukan
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
                      <Calendar className="h-4 w-4 text-blue-600" />
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
      <RequirementsCard
        title="Persyaratan Ujian Proposal"
        examType="proposal"
        requirements={requirements}
        onFileUpload={handleFileUpload}
        onFileDelete={handleFileDelete}
      />

      {/* Submission Card */}
      <Card className="border-blue-200">
        <CardHeader className="bg-blue-50 border-b border-blue-200">
          <CardTitle className="text-blue-800">Pengajuan Ujian Proposal</CardTitle>
          <CardDescription className="text-blue-700">
            Ajukan ujian proposal setelah semua persyaratan terpenuhi
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {!allRequirementsCompleted ? (
            <div className="text-center py-8">
              <AlertCircle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Persyaratan Belum Lengkap
              </h3>
              <p className="text-gray-600 mb-4">
                Lengkapi semua persyaratan terlebih dahulu sebelum mengajukan ujian proposal.
              </p>
              <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">
                {requirements.length - completedCount} persyaratan tersisa
              </Badge>
            </div>
          ) : examData?.id ? (
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Ujian Proposal Telah Diajukan
              </h3>
              <p className="text-gray-600 mb-4">
                Pengajuan ujian proposal Anda sedang diproses. Silakan tunggu konfirmasi jadwal ujian.
              </p>
              <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                Status: {examData.status === 'scheduled' ? 'Terjadwal' : 'Menunggu Persetujuan'}
              </Badge>
            </div>
          ) : (
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Siap Mengajukan Ujian Proposal
              </h3>
              <p className="text-gray-600 mb-6">
                Semua persyaratan telah terpenuhi. Anda dapat mengajukan ujian proposal sekarang.
              </p>
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => window.location.href = '/dashboard/mahasiswa/exams/register'}
              >
                <BookOpen className="h-5 w-5 mr-2" />
                Ajukan Ujian Proposal
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
