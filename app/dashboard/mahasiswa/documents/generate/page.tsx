'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { useState } from "react"
import {
  FileText,
  Download,
  Eye,
  Send,
  Calendar,
  User,
  Building,
  CheckCircle,
  AlertCircle,
  Loader2,
  Wand2,
  FileCheck,
  Sparkles
} from "lucide-react"
import { DocumentGenerator, DocumentData, DocumentTemplate, DocumentField } from '@/lib/document-generator'
import { useI18n } from '@/lib/i18n'
import { useToast } from "@/components/ui/use-toast"

interface FormData {
  [key: string]: string | string[]
}

export default function DocumentGeneratePage() {
  const { t } = useI18n()
  const { toast } = useToast()
  const [selectedTemplate, setSelectedTemplate] = useState<DocumentTemplate | null>(null)
  const [formData, setFormData] = useState<FormData>({})
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedDocument, setGeneratedDocument] = useState<Blob | null>(null)
  
  const templates = DocumentGenerator.getDocumentTemplates()

  const handleTemplateSelect = (template: DocumentTemplate) => {
    setSelectedTemplate(template)
    setFormData({})
    setGeneratedDocument(null)
  }

  const handleFieldChange = (fieldId: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }))
  }

  const validateForm = (): boolean => {
    if (!selectedTemplate) return false
    
    for (const field of selectedTemplate.fields) {
      if (field.required && !formData[field.id]) {
        toast({
          title: "Form Tidak Lengkap",
          description: `Field "${field.name}" harus diisi`,
          variant: "destructive"
        })
        return false
      }
    }
    return true
  }

  const handleGenerate = async () => {
    if (!selectedTemplate || !validateForm()) return

    setIsGenerating(true)
    
    try {
      // Mock student data - in real app, this would come from authentication context
      const studentData = {
        name: "Ahmad Rahman",
        nim: "2021210001", 
        program: "Teknik Informatika",
        semester: 7,
        gpa: 3.67
      }

      // Prepare document data
      const documentData: DocumentData = {
        type: selectedTemplate.type as any,
        student: studentData,
        details: formData,
        date: new Date()
      }

      // Add recipient data if provided
      if (formData.recipientName) {
        documentData.recipient = {
          name: formData.recipientName as string,
          position: formData.recipientPosition as string || '',
          institution: formData.institution as string || '',
          address: formData.address as string || ''
        }
      }

      // Generate letter number
      documentData.letterNumber = DocumentGenerator.generateLetterNumber(selectedTemplate.type)

      // Generate document
      const blob = await DocumentGenerator.generateDocument(documentData)
      setGeneratedDocument(blob)

      toast({
        title: "Dokumen Berhasil Dibuat",
        description: "Dokumen telah berhasil digenerate dan siap diunduh",
        variant: "default"
      })

    } catch (error) {
      console.error('Document generation error:', error)
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat membuat dokumen",
        variant: "destructive"
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownload = () => {
    if (!generatedDocument || !selectedTemplate) return
    
    const filename = `${selectedTemplate.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`
    DocumentGenerator.downloadDocument(generatedDocument, filename)
    
    toast({
      title: "Dokumen Diunduh",
      description: `File ${filename} telah diunduh`,
      variant: "default"
    })
  }

  const renderField = (field: DocumentField) => {
    switch (field.type) {
      case 'textarea':
        return (
          <Textarea
            placeholder={field.placeholder}
            value={formData[field.id] as string || ''}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            rows={3}
          />
        )
      case 'select':
        return (
          <Select value={formData[field.id] as string || ''} onValueChange={(value) => handleFieldChange(field.id, value)}>
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder || `Pilih ${field.name}`} />
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
      case 'date':
        return (
          <Input
            type="date"
            value={formData[field.id] as string || ''}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
          />
        )
      default:
        return (
          <Input
            placeholder={field.placeholder}
            value={formData[field.id] as string || ''}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
          />
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 p-6 space-y-8">
      {/* Header */}
      <motion.div
        className="text-center space-y-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          {t('document.generate')}
        </h1>
        <p className="text-gray-600 text-lg">
          Generate dokumen otomatis dengan template yang sudah tersedia
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Template Selection */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-gray-800">
                    Pilih Template
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    Pilih jenis dokumen yang ingin dibuat
                  </p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-3">
                {templates.map((template, index) => (
                  <motion.div
                    key={template.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all duration-300 ${
                      selectedTemplate?.id === template.id 
                        ? 'border-purple-500 bg-purple-50' 
                        : 'border-gray-200 hover:shadow-md'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleTemplateSelect(template)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          selectedTemplate?.id === template.id 
                            ? 'bg-purple-200 text-purple-600' 
                            : 'bg-gray-200 text-gray-600'
                        }`}>
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">{template.name}</h4>
                          <p className="text-sm text-gray-600">{template.content}</p>
                        </div>
                      </div>
                      {selectedTemplate?.id === template.id && (
                        <CheckCircle className="w-5 h-5 text-purple-600" />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Document Preview */}
          {generatedDocument && (
            <Card className="border-0 shadow-xl bg-gradient-to-r from-green-50 to-emerald-50">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-green-500" />
                  Dokumen Siap
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-white rounded-lg border border-green-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <FileText className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">{selectedTemplate?.name}</h4>
                        <p className="text-sm text-gray-600">PDF • {Math.round(generatedDocument.size / 1024)} KB</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      onClick={handleDownload}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>

        {/* Form Fields */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-2"
        >
          {selectedTemplate ? (
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500">
                      <Wand2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-800">
                        Form {selectedTemplate.name}
                      </CardTitle>
                      <p className="text-sm text-gray-600 mt-1">
                        Lengkapi form untuk generate dokumen
                      </p>
                    </div>
                  </div>
                  
                  <Badge className="bg-blue-100 text-blue-800">
                    {selectedTemplate.fields.filter(f => f.required).length} field wajib
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Auto-filled student info */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-600" />
                    Informasi Mahasiswa (otomatis terisi)
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Nama:</span>
                      <span className="ml-2 font-medium">Ahmad Rahman</span>
                    </div>
                    <div>
                      <span className="text-gray-600">NIM:</span>
                      <span className="ml-2 font-medium">2021210001</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Program Studi:</span>
                      <span className="ml-2 font-medium">Teknik Informatika</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Semester:</span>
                      <span className="ml-2 font-medium">7</span>
                    </div>
                  </div>
                </div>

                {/* Dynamic form fields */}
                <div className="space-y-4">
                  {selectedTemplate.fields.map((field, index) => (
                    <motion.div
                      key={field.id}
                      className="space-y-2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Label htmlFor={field.id} className="flex items-center gap-2">
                        {field.name}
                        {field.required && (
                          <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50 text-xs">
                            Wajib
                          </Badge>
                        )}
                      </Label>
                      {renderField(field)}
                    </motion.div>
                  ))}
                </div>

                {/* Generate button */}
                <div className="pt-6 border-t">
                  <Button 
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    size="lg"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Generate Dokumen
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-0 shadow-xl">
              <CardContent className="flex flex-col items-center justify-center py-20">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <FileText className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Pilih Template Dokumen</h3>
                <p className="text-gray-600 text-center">
                  Pilih template dokumen dari sidebar untuk memulai proses generate
                </p>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>

      {/* Recent Documents */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-purple-500" />
              Dokumen Terbaru
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  name: "Surat Pengantar Survey",
                  date: "15 Nov 2024",
                  status: "approved",
                  size: "245 KB"
                },
                {
                  name: "Surat Pindah",
                  date: "10 Nov 2024", 
                  status: "pending",
                  size: "198 KB"
                },
                {
                  name: "Surat Pengantar KKP",
                  date: "5 Nov 2024",
                  status: "approved",
                  size: "312 KB"
                }
              ].map((doc, index) => (
                <motion.div
                  key={index}
                  className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <FileText className="w-5 h-5 text-purple-600" />
                    </div>
                    <Badge className={`${
                      doc.status === 'approved' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {doc.status === 'approved' ? 'Disetujui' : 'Pending'}
                    </Badge>
                  </div>
                  <h4 className="font-medium text-gray-800 mb-1">{doc.name}</h4>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{doc.date}</span>
                    <span>{doc.size}</span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}