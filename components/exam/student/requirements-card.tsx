"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Upload, FileText, AlertCircle, X, Download } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface Requirement {
  id: string
  title: string
  description?: string
  completed: boolean
  fileUrl?: string
  fileName?: string
  uploadedAt?: string
}

interface RequirementsCardProps {
  title: string
  examType: 'proposal' | 'result' | 'closing'
  requirements: Requirement[]
  onFileUpload: (requirementId: string, file: File) => Promise<void>
  onFileDelete: (requirementId: string) => Promise<void>
  className?: string
}

export function RequirementsCard({ 
  title, 
  examType, 
  requirements, 
  onFileUpload, 
  onFileDelete,
  className = ""
}: RequirementsCardProps) {
  const [uploadingId, setUploadingId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({})

  const completedCount = requirements.filter(req => req.completed).length
  const totalCount = requirements.length
  const progressPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  useEffect(() => {
    console.log(`📊 ${title} Progress:`, {
      completedCount,
      totalCount,
      progressPercentage,
      requirements: requirements.map(req => ({
        id: req.id,
        title: req.title,
        completed: req.completed,
        hasFile: !!req.fileName
      }))
    })
  }, [requirements, title, completedCount, totalCount, progressPercentage])

  const getColorScheme = (examType: string) => {
    switch (examType) {
      case 'proposal':
        return {
          bg: 'from-blue-50 to-blue-100',
          border: 'border-blue-200',
          text: 'text-blue-800',
          accent: 'text-blue-700',
          button: 'bg-blue-600 hover:bg-blue-700'
        }
      case 'result':
        return {
          bg: 'from-purple-50 to-purple-100',
          border: 'border-purple-200',
          text: 'text-purple-800',
          accent: 'text-purple-700',
          button: 'bg-purple-600 hover:bg-purple-700'
        }
      case 'closing':
        return {
          bg: 'from-teal-50 to-teal-100',
          border: 'border-teal-200',
          text: 'text-teal-800',
          accent: 'text-teal-700',
          button: 'bg-teal-600 hover:bg-teal-700'
        }
      default:
        return {
          bg: 'from-gray-50 to-gray-100',
          border: 'border-gray-200',
          text: 'text-gray-800',
          accent: 'text-gray-700',
          button: 'bg-gray-600 hover:bg-gray-700'
        }
    }
  }

  const colors = getColorScheme(examType)

  const handleFileSelect = async (requirementId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type (only PDF)
    if (file.type !== 'application/pdf') {
      toast({
        title: "Format File Tidak Didukung",
        description: "Hanya file PDF yang diperbolehkan.",
        variant: "destructive"
      })
      return
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File Terlalu Besar",
        description: "Ukuran file maksimal 10MB.",
        variant: "destructive"
      })
      return
    }

    try {
      setUploadingId(requirementId)
      console.log(`🔄 Uploading file for requirement: ${requirementId}`)
      
      await onFileUpload(requirementId, file)
      
      console.log(`✅ File uploaded successfully for requirement: ${requirementId}`)
      
      toast({
        title: "File Berhasil Diunggah",
        description: "Dokumen Anda telah tersimpan dan akan diverifikasi.",
      })
      
      // Reset file input
      if (fileInputRefs.current[requirementId]) {
        fileInputRefs.current[requirementId]!.value = ''
      }
    } catch (error) {
      console.error(`❌ Upload failed for requirement ${requirementId}:`, error)
      toast({
        title: "Gagal Mengunggah File",
        description: error instanceof Error ? error.message : "Terjadi kesalahan saat mengunggah file.",
        variant: "destructive"
      })
    } finally {
      setUploadingId(null)
    }
  }

  const handleFileDelete = async (requirementId: string) => {
    try {
      setDeletingId(requirementId)
      await onFileDelete(requirementId)
      
      toast({
        title: "File Berhasil Dihapus",
        description: "Dokumen telah dihapus dari sistem.",
      })
    } catch (error) {
      toast({
        title: "Gagal Menghapus File",
        description: error instanceof Error ? error.message : "Terjadi kesalahan saat menghapus file.",
        variant: "destructive"
      })
    } finally {
      setDeletingId(null)
    }
  }

  const handleDownload = (fileUrl: string, fileName: string) => {
    const link = document.createElement('a')
    link.href = fileUrl
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Card className={`${className} ${colors.border} border-2 overflow-hidden`}>
      <CardHeader className={`bg-gradient-to-r ${colors.bg} pb-4 ${colors.border} border-b`}>
        <div className="flex items-center justify-between">
          <CardTitle className={`${colors.text} flex items-center gap-2`}>
            <FileText className="h-5 w-5" />
            {title}
          </CardTitle>
          <div className={`text-sm font-medium ${colors.accent} bg-white/80 px-3 py-1 rounded-full border ${colors.border}`}>
            {completedCount}/{totalCount} Selesai
          </div>
        </div>
        <CardDescription className={colors.accent}>
          Lengkapi semua persyaratan dengan mengunggah dokumen yang diperlukan (format PDF)
        </CardDescription>
        <div className="mt-2">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className={colors.accent}>Progres Kelengkapan</span>
            <span className={`font-medium ${colors.text}`}>{progressPercentage}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {requirements.map((requirement) => (
            <div
              key={requirement.id}
              className={`flex items-start gap-4 p-4 hover:${colors.bg.split(' ')[0].replace('from-', 'bg-').replace('-50', '-50/30')} transition-colors`}
            >
              <div className="mt-0.5">
                {requirement.completed ? (
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                    <AlertCircle className="h-5 w-5 text-amber-600" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h3 className={`font-medium ${colors.text}`}>{requirement.title}</h3>
                {requirement.description && (
                  <p className={`text-sm ${colors.accent} mt-1`}>{requirement.description}</p>
                )}
                {requirement.completed && requirement.fileName && (
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      <FileText className="w-3 h-3 mr-1" />
                      {requirement.fileName}
                    </Badge>
                    {requirement.uploadedAt && (
                      <span className="text-xs text-muted-foreground">
                        Diunggah: {new Date(requirement.uploadedAt).toLocaleDateString('id-ID')}
                      </span>
                    )}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2">
                {requirement.completed ? (
                  <div className="flex gap-2">
                    {requirement.fileUrl && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDownload(requirement.fileUrl!, requirement.fileName!)}
                        className="h-8"
                      >
                        <Download className="w-3 h-3 mr-1" />
                        Unduh
                      </Button>
                    )}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 text-red-600 border-red-200 hover:bg-red-50"
                        >
                          <X className="w-3 h-3 mr-1" />
                          Hapus
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Konfirmasi Hapus File</DialogTitle>
                          <DialogDescription>
                            Apakah Anda yakin ingin menghapus file "{requirement.fileName}"? 
                            Tindakan ini tidak dapat dibatalkan.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex justify-end gap-2 mt-4">
                          <Button variant="outline" size="sm">
                            Batal
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleFileDelete(requirement.id)}
                            disabled={deletingId === requirement.id}
                          >
                            {deletingId === requirement.id ? "Menghapus..." : "Hapus File"}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                ) : (
                  <>
                    <input
                      ref={(el) => { fileInputRefs.current[requirement.id] = el }}
                      type="file"
                      accept=".pdf"
                      onChange={(e) => handleFileSelect(requirement.id, e)}
                      className="hidden"
                    />
                    <Button
                      size="sm"
                      onClick={() => fileInputRefs.current[requirement.id]?.click()}
                      disabled={uploadingId === requirement.id}
                      className={`h-8 ${colors.button}`}
                    >
                      {uploadingId === requirement.id ? (
                        <>
                          <div className="w-3 h-3 mr-1 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Mengunggah...
                        </>
                      ) : (
                        <>
                          <Upload className="w-3 h-3 mr-1" />
                          Unggah File
                        </>
                      )}
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
