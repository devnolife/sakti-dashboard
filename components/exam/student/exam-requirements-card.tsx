"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle, X, Upload, FileText, AlertCircle, Loader2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface ExamRequirement {
  id: string
  title: string
  description: string
  completed: boolean
  fileUrl?: string
  fileName?: string
  uploadedAt?: string
}

interface ExamRequirementsCardProps {
  examType: 'proposal' | 'result' | 'closing'
  title: string
  colorScheme: 'blue' | 'purple' | 'teal'
  requirements: ExamRequirement[]
  onRequirementUpdate: (requirementId: string, completed: boolean, fileData?: any) => void
}

export function ExamRequirementsCard({ 
  examType, 
  title, 
  colorScheme, 
  requirements,
  onRequirementUpdate 
}: ExamRequirementsCardProps) {
  const [selectedRequirement, setSelectedRequirement] = useState<ExamRequirement | null>(null)
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const colorClasses = {
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      button: 'bg-blue-600 hover:bg-blue-700',
      accent: 'text-blue-600'
    },
    purple: {
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      text: 'text-purple-800',
      button: 'bg-purple-600 hover:bg-purple-700',
      accent: 'text-purple-600'
    },
    teal: {
      bg: 'bg-teal-50',
      border: 'border-teal-200',
      text: 'text-teal-800',
      button: 'bg-teal-600 hover:bg-teal-700',
      accent: 'text-teal-600'
    }
  }

  const colors = colorClasses[colorScheme]
  const completedCount = requirements.filter(req => req.completed).length

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type (only PDF)
    if (file.type !== 'application/pdf') {
      toast({
        title: "Format File Tidak Valid",
        description: "Hanya file PDF yang diperbolehkan.",
        variant: "destructive"
      })
      return
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "Ukuran File Terlalu Besar",
        description: "Ukuran file maksimal 10MB.",
        variant: "destructive"
      })
      return
    }

    setSelectedFile(file)
  }

  const handleUpload = async () => {
    if (!selectedFile || !selectedRequirement) return

    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append('examType', examType)
      formData.append('requirementId', selectedRequirement.id)

      const response = await fetch('/api/exams/upload-requirement', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const result = await response.json()

      // Update requirement status
      onRequirementUpdate(selectedRequirement.id, true, {
        fileUrl: result.fileUrl,
        fileName: selectedFile.name,
        uploadedAt: new Date().toISOString()
      })

      toast({
        title: "Upload Berhasil",
        description: `File ${selectedFile.name} berhasil diunggah.`
      })

      // Reset dialog
      setIsUploadDialogOpen(false)
      setSelectedFile(null)
      setSelectedRequirement(null)

    } catch (error) {
      console.error('Upload error:', error)
      toast({
        title: "Upload Gagal",
        description: "Terjadi kesalahan saat mengunggah file. Silakan coba lagi.",
        variant: "destructive"
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleRequirementClick = (requirement: ExamRequirement) => {
    setSelectedRequirement(requirement)
    setIsUploadDialogOpen(true)
  }

  const handleRemoveFile = async (requirement: ExamRequirement) => {
    try {
      const response = await fetch('/api/exams/remove-requirement', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requirementId: requirement.id,
          examType: examType
        }),
      })

      if (!response.ok) {
        throw new Error('Remove failed')
      }

      onRequirementUpdate(requirement.id, false)

      toast({
        title: "File Dihapus",
        description: "File berhasil dihapus dari persyaratan."
      })

    } catch (error) {
      console.error('Remove error:', error)
      toast({
        title: "Gagal Menghapus",
        description: "Terjadi kesalahan saat menghapus file.",
        variant: "destructive"
      })
    }
  }

  return (
    <>
      <Card className={`${colors.border} overflow-hidden`}>
        <CardHeader className={`${colors.bg} pb-3 ${colors.border} border-b`}>
          <div className="flex items-center justify-between">
            <CardTitle className={`${colors.text} flex items-center gap-2`}>
              {title}
            </CardTitle>
            <div className={`text-sm font-medium ${colors.text} bg-white/80 px-3 py-1 rounded-full border ${colors.border}`}>
              {completedCount}/{requirements.length} Selesai
            </div>
          </div>
          <CardDescription className={colors.text}>
            Lengkapi semua persyaratan sebelum mengajukan ujian
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {requirements.map((requirement, index) => (
              <div
                key={requirement.id}
                className={`flex items-center justify-between p-4 hover:${colors.bg}/30 transition-colors`}
              >
                <div className="flex items-start gap-3 flex-1">
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
                    <h3 className={`font-medium ${colors.text}`}>
                      {index + 1}. {requirement.title}
                    </h3>
                    <p className={`text-sm ${colors.accent}`}>
                      {requirement.description}
                    </p>
                    {requirement.completed && requirement.fileName && (
                      <div className="flex items-center gap-2 mt-2">
                        <FileText className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-green-700">
                          {requirement.fileName}
                        </span>
                        <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                          ✅ Terunggah
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {requirement.completed ? (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRequirementClick(requirement)}
                        className="text-blue-600 border-blue-200 hover:bg-blue-50"
                      >
                        <Upload className="h-4 w-4 mr-1" />
                        Ganti File
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveFile(requirement)}
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => handleRequirementClick(requirement)}
                      className={colors.button}
                    >
                      <Upload className="h-4 w-4 mr-1" />
                      Upload File
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Upload File Persyaratan</DialogTitle>
            <DialogDescription>
              {selectedRequirement?.title}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-amber-800">Ketentuan Upload:</p>
                  <ul className="mt-1 text-amber-700 list-disc list-inside space-y-1">
                    <li>Format file: PDF saja</li>
                    <li>Ukuran maksimal: 10MB</li>
                    <li>File harus jelas dan dapat dibaca</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="file-upload">Pilih File PDF</Label>
              <Input
                id="file-upload"
                type="file"
                accept=".pdf"
                onChange={handleFileSelect}
                disabled={isUploading}
              />
            </div>

            {selectedFile && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-800">{selectedFile.name}</p>
                    <p className="text-sm text-blue-600">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setIsUploadDialogOpen(false)
                  setSelectedFile(null)
                  setSelectedRequirement(null)
                }}
                disabled={isUploading}
              >
                Batal
              </Button>
              <Button
                onClick={handleUpload}
                disabled={!selectedFile || isUploading}
                className={colors.button}
              >
                {isUploading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Mengunggah...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
