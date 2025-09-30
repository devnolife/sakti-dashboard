"use client"

import React, { useState, useEffect } from "react"
import { useAuth } from "@/context/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import {
  CheckCircle2,
  AlertCircle,
  Clock,
  Upload,
  Trash2,
  Download,
  Eye,
  FileText,
  Info,
  RefreshCw,
} from "lucide-react"

// KKP Requirement interfaces
interface KkpRequirementFile {
  id: string
  studentId: string
  requirementType: string
  fileName: string
  originalFileName: string
  filePath: string
  fileSize: number
  mimeType: string
  status: string
  notes?: string
  uploadedAt: string
  verifiedAt?: string
  verifiedBy?: string
}

interface KkpRequirement {
  type: string
  name: string
  description: string
  uploaded: KkpRequirementFile | null
  isUploaded: boolean
}

export default function RequirementsPage() {
  const { user, isLoading: authLoading } = useAuth()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [kkpRequirements, setKkpRequirements] = useState<KkpRequirement[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [uploadingType, setUploadingType] = useState<string | null>(null)
  const { toast } = useToast()
  
  // Fetch KKP requirements
  const fetchKkpRequirements = async () => {
    if (!user?.id) return
    try {
      setIsLoading(true)
      const token = typeof window !== 'undefined' ? localStorage.getItem('session-token') : null
      const response = await fetch(`/api/kkp/requirements`, {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
      })
      const result = await response.json()
      if (result.success) {
        setKkpRequirements(result.data)
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch requirements",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error fetching requirements:", error)
      toast({
        title: "Error",
        description: "Failed to fetch requirements",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (authLoading) return
    if (!user?.id) {
      setIsLoading(false)
      return
    }
    fetchKkpRequirements()
  }, [authLoading, user?.id])

  // Upload file
  const handleFileUpload = async (requirementType: string, file: File) => {
    if (!file || !user?.id) return

    // Validasi file
    if (file.type !== "application/pdf") {
      toast({
        title: "Error",
        description: "Hanya file PDF yang diperbolehkan",
        variant: "destructive",
      })
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "Ukuran file maksimal 5MB",
        variant: "destructive",
      })
      return
    }

    try {
      setUploadingType(requirementType)
      const formData = new FormData()
      formData.append("file", file)
      formData.append("requirementType", requirementType)

      const token = typeof window !== 'undefined' ? localStorage.getItem('session-token') : null
      const response = await fetch('/api/kkp/requirements', {
        method: 'POST',
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: formData,
      })

      const result = await response.json()
      
      if (result.success) {
        toast({
          title: "Berhasil",
          description: "File berhasil diunggah",
        })
        await fetchKkpRequirements() // Refresh data
      } else {
        toast({
          title: "Error",
          description: result.error || "Gagal mengunggah file",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error uploading file:", error)
      toast({
        title: "Error",
        description: "Gagal mengunggah file",
        variant: "destructive",
      })
    } finally {
      setUploadingType(null)
    }
  }

  // Delete file
  const handleFileDelete = async (requirement: KkpRequirement) => {
    if (!requirement.uploaded) return

    try {
      const response = await fetch(`/api/kkp/requirements/${requirement.uploaded.id}`, {
        method: "DELETE",
      })

      const result = await response.json()
      
      if (result.success) {
        toast({
          title: "Berhasil",
          description: "File berhasil dihapus",
        })
        await fetchKkpRequirements() // Refresh data
      } else {
        toast({
          title: "Error",
          description: result.error || "Gagal menghapus file",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error deleting file:", error)
      toast({
        title: "Error",
        description: "Gagal menghapus file",
        variant: "destructive",
      })
    }
  }

  // Get progress
  const getProgress = () => {
    const uploadedCount = kkpRequirements.filter(req => req.isUploaded).length
    const totalCount = kkpRequirements.length
    return totalCount > 0 ? Math.round((uploadedCount / totalCount) * 100) : 0
  }

  // Get status badge for requirements
  const getStatusBadge = (requirement: KkpRequirement) => {
    if (!requirement.isUploaded) {
      return (
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-amber-500" />
          <span className="text-sm text-muted-foreground">Belum upload</span>
        </div>
      )
    }

    const status = requirement.uploaded?.status
    switch (status) {
      case "verified":
        return (
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span className="text-sm text-green-600">Terverifikasi</span>
          </div>
        )
      case "rejected":
        return (
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-red-500" />
            <span className="text-sm text-red-600">Ditolak</span>
          </div>
        )
      case "pending":
      default:
        return (
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-amber-500" />
            <span className="text-sm text-amber-600">Menunggu Review</span>
          </div>
        )
    }
  }

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  // Handle refresh
  const handleRefresh = async () => {
    setIsRefreshing(true)
    await fetchKkpRequirements()
    setIsRefreshing(false)
  }

  const progress = getProgress()
  const uploadedCount = kkpRequirements.filter(req => req.isUploaded).length
  const totalCount = kkpRequirements.length

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center space-x-2">
            <RefreshCw className="h-6 w-6 animate-spin" />
            <span>Memuat data persyaratan...</span>
          </div>
        </div>
      </div>
    )
  }

  if (!authLoading && !user?.id) {
    return (
      <div className="p-8 text-center space-y-4">
        <h2 className="text-xl font-semibold">Tidak terautentikasi</h2>
        <p className="text-sm text-muted-foreground">Silakan login kembali untuk mengakses persyaratan KKP.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-blue-900 mb-2">
              📄 Persyaratan Berkas KKP
            </h1>
            <p className="text-blue-700">
              Lengkapi semua persyaratan dengan mengunggah dokumen yang diperlukan (format PDF)
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={handleRefresh} 
            disabled={isRefreshing}
            className="bg-white hover:bg-blue-50"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="mt-6 bg-white rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progres Kelengkapan</span>
            <span className="text-sm font-bold text-blue-600">{uploadedCount}/{totalCount} Selesai</span>
          </div>
          <Progress value={progress} className="h-3 bg-gray-200" />
          <p className="text-xs text-gray-500 mt-1">{progress}%</p>
        </div>
      </div>

      {/* Requirements List */}
      <div className="space-y-4">
        {kkpRequirements.map((requirement) => (
          <Card key={requirement.type} className="transition-all hover:shadow-md">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    {requirement.isUploaded ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                    ) : (
                      <Clock className="h-5 w-5 text-amber-500 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{requirement.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{requirement.description}</p>
                    </div>
                    {getStatusBadge(requirement)}
                  </div>

                  {requirement.isUploaded && requirement.uploaded ? (
                    <div className="ml-8 bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm text-gray-900">
                            {requirement.uploaded.originalFileName}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatFileSize(requirement.uploaded.fileSize)} • 
                            Diupload {new Date(requirement.uploaded.uploadedAt).toLocaleDateString('id-ID')}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(requirement.uploaded!.filePath, '_blank')}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Lihat
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const link = document.createElement('a')
                              link.href = requirement.uploaded!.filePath
                              link.download = requirement.uploaded!.originalFileName
                              document.body.appendChild(link)
                              link.click()
                              document.body.removeChild(link)
                            }}
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleFileDelete(requirement)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Hapus
                          </Button>
                        </div>
                      </div>

                      {requirement.uploaded.notes && (
                        <Alert className="mt-3">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>
                            <strong>Catatan:</strong> {requirement.uploaded.notes}
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  ) : (
                    <div className="ml-8">
                      <Button
                        variant="default"
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => {
                          const input = document.createElement('input')
                          input.type = 'file'
                          input.accept = '.pdf'
                          input.onchange = (e) => {
                            const file = (e.target as HTMLInputElement).files?.[0]
                            if (file) {
                              handleFileUpload(requirement.type, file)
                            }
                          }
                          input.click()
                        }}
                        disabled={uploadingType === requirement.type}
                      >
                        {uploadingType === requirement.type ? (
                          <>
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            Mengupload...
                          </>
                        ) : (
                          <>
                            <Upload className="h-4 w-4 mr-2" />
                            Unggah File
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Info Card */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-2">Informasi Penting</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Semua berkas harus dalam format PDF</li>
                <li>• Ukuran maksimal file adalah 5MB per berkas</li>
                <li>• Pastikan dokumen terlihat jelas dan dapat dibaca</li>
                <li>• Berkas yang sudah diupload akan direview oleh admin</li>
                <li>• Anda dapat mengganti berkas jika diperlukan dengan menghapus dan upload ulang</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
