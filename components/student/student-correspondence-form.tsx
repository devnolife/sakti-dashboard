"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"
import { FileText, Clock, AlertCircle, CheckCircle2, X, Upload, Loader2 } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import type { DynamicField } from "@/types/correspondence"

interface LetterType {
  id: string
  title: string
  description: string
  approval_role: string
  estimated_days: number
  required_documents: string[]
  additional_fields?: DynamicField[]
}

export function StudentCorrespondenceForm() {
  const [letterTypes, setLetterTypes] = useState<LetterType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedType, setSelectedType] = useState<LetterType | null>(null)
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showDialog, setShowDialog] = useState(false)

  useEffect(() => {
    fetchLetterTypes()
  }, [])

  const fetchLetterTypes = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/correspondence/letter-types')
      const result = await response.json()

      if (result.success) {
        setLetterTypes(result.data)
      }
    } catch (error) {
      console.error('Error fetching letter types:', error)
      toast({
        title: "Error",
        description: "Gagal memuat jenis surat",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSelectType = (type: LetterType) => {
    setSelectedType(type)
    setFormData({})
    setShowDialog(true)
  }

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }))
  }

  const validateForm = (): boolean => {
    if (!selectedType?.additional_fields) return true

    for (const field of selectedType.additional_fields) {
      if (field.required && !formData[field.id]) {
        toast({
          title: "Validasi Gagal",
          description: `Field "${field.label}" wajib diisi`,
          variant: "destructive"
        })
        return false
      }

      // Validate based on field type
      if (formData[field.id]) {
        const value = formData[field.id]

        if (field.type === "number") {
          const numValue = parseFloat(value)
          if (field.validation?.min !== undefined && numValue < field.validation.min) {
            toast({
              title: "Validasi Gagal",
              description: `${field.label} harus minimal ${field.validation.min}`,
              variant: "destructive"
            })
            return false
          }
          if (field.validation?.max !== undefined && numValue > field.validation.max) {
            toast({
              title: "Validasi Gagal",
              description: `${field.label} harus maksimal ${field.validation.max}`,
              variant: "destructive"
            })
            return false
          }
        }

        if (field.type === "email") {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!emailRegex.test(value)) {
            toast({
              title: "Validasi Gagal",
              description: `${field.label} harus berupa email yang valid`,
              variant: "destructive"
            })
            return false
          }
        }

        if (field.type === "phone") {
          const phoneRegex = /^[0-9+\-\s()]+$/
          if (!phoneRegex.test(value)) {
            toast({
              title: "Validasi Gagal",
              description: `${field.label} harus berupa nomor telepon yang valid`,
              variant: "destructive"
            })
            return false
          }
        }
      }
    }

    return true
  }

  const handleSubmit = async () => {
    if (!selectedType) return

    if (!validateForm()) return

    try {
      setIsSubmitting(true)
      const response = await fetch('/api/student/correspondence-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          letter_type_id: selectedType.id,
          form_data: formData
        })
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Berhasil",
          description: result.message || "Pengajuan surat berhasil dibuat"
        })
        setShowDialog(false)
        setSelectedType(null)
        setFormData({})
      } else {
        toast({
          title: "Error",
          description: result.error || "Gagal membuat pengajuan",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error('Error submitting request:', error)
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat mengajukan surat",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderField = (field: DynamicField) => {
    const value = formData[field.id] || ""

    switch (field.type) {
      case "text":
      case "email":
      case "phone":
        return (
          <Input
            type={field.type}
            value={value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
          />
        )

      case "number":
        return (
          <Input
            type="number"
            value={value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            min={field.validation?.min}
            max={field.validation?.max}
            required={field.required}
          />
        )

      case "date":
        return (
          <Input
            type="date"
            value={value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            required={field.required}
          />
        )

      case "textarea":
        return (
          <Textarea
            value={value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            rows={4}
            required={field.required}
          />
        )

      case "select":
        return (
          <Select
            value={value}
            onValueChange={(val) => handleFieldChange(field.id, val)}
          >
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder || "Pilih..."} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )

      case "file":
        return (
          <div className="space-y-2">
            <Input
              type="file"
              onChange={async (e) => {
                const file = e.target.files?.[0]
                if (file) {
                  // Validate file type
                  if (field.validation?.fileTypes?.length) {
                    const fileExt = file.name.split('.').pop()?.toLowerCase()
                    if (!field.validation.fileTypes.includes(fileExt || "")) {
                      toast({
                        title: "File Tidak Valid",
                        description: `Hanya file ${field.validation.fileTypes.join(", ")} yang diizinkan`,
                        variant: "destructive"
                      })
                      e.target.value = ''
                      return
                    }
                  }

                  // Validate file size
                  if (field.validation?.maxFileSize) {
                    const maxSize = field.validation.maxFileSize * 1024 * 1024 // Convert MB to bytes
                    if (file.size > maxSize) {
                      toast({
                        title: "File Terlalu Besar",
                        description: `Ukuran file maksimal ${field.validation.maxFileSize} MB`,
                        variant: "destructive"
                      })
                      e.target.value = ''
                      return
                    }
                  }

                  // Convert file to base64 for JSON serialization
                  try {
                    const reader = new FileReader()
                    reader.onloadend = () => {
                      const base64String = reader.result as string
                      handleFieldChange(field.id, {
                        name: file.name,
                        type: file.type,
                        size: file.size,
                        data: base64String
                      })
                    }
                    reader.onerror = () => {
                      toast({
                        title: "Error",
                        description: "Gagal membaca file",
                        variant: "destructive"
                      })
                    }
                    reader.readAsDataURL(file)
                  } catch (error) {
                    toast({
                      title: "Error",
                      description: "Gagal memproses file",
                      variant: "destructive"
                    })
                  }
                }
              }}
              required={field.required}
            />
            {formData[field.id] && (
              <p className="text-xs text-green-600">
                ✓ {formData[field.id].name} ({(formData[field.id].size / 1024).toFixed(2)} KB)
              </p>
            )}
            {field.validation?.fileTypes && (
              <p className="text-xs text-muted-foreground">
                Format: {field.validation.fileTypes.join(", ")}
                {field.validation?.maxFileSize && ` • Maks: ${field.validation.maxFileSize} MB`}
              </p>
            )}
          </div>
        )

      default:
        return null
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Ajukan Surat</h2>
        <p className="text-muted-foreground">
          Pilih jenis surat yang ingin Anda ajukan
        </p>
      </div>

      {letterTypes.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="py-12 text-center">
            <AlertCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">Belum ada jenis surat tersedia</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {letterTypes.map((type) => (
            <Card key={type.id} className="cursor-pointer transition-shadow hover:shadow-md" onClick={() => handleSelectType(type)}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <FileText className="w-8 h-8 text-primary" />
                  <Badge variant="outline" className="ml-2">
                    <Clock className="w-3 h-3 mr-1" />
                    {type.estimated_days} hari
                  </Badge>
                </div>
                <CardTitle className="mt-4">{type.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {type.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {type.required_documents && type.required_documents.length > 0 && (
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Dokumen diperlukan:</p>
                    <div className="flex flex-wrap gap-1">
                      {type.required_documents.map((doc, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {doc}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedType?.title}</DialogTitle>
            <DialogDescription>
              {selectedType?.description}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {selectedType?.required_documents && selectedType.required_documents.length > 0 && (
              <div className="p-4 border rounded-lg bg-muted/50">
                <p className="mb-2 text-sm font-medium">Dokumen yang diperlukan:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedType.required_documents.map((doc, idx) => (
                    <Badge key={idx} variant="secondary">
                      {doc}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {selectedType?.additional_fields && selectedType.additional_fields.length > 0 && (
              <>
                <Separator />
                <div className="space-y-4">
                  <p className="text-sm font-medium">Informasi yang diperlukan:</p>
                  {selectedType.additional_fields.map((field) => (
                    <div key={field.id} className="space-y-2">
                      <Label>
                        {field.label}
                        {field.required && <span className="ml-1 text-red-500">*</span>}
                      </Label>
                      {renderField(field)}
                      {field.helpText && (
                        <p className="text-xs text-muted-foreground">{field.helpText}</p>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)} disabled={isSubmitting}>
              Batal
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Mengajukan...
                </>
              ) : (
                "Ajukan Surat"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
