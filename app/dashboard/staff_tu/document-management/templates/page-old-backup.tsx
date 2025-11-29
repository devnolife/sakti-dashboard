"use client"

import React, { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Upload, FileText, Eye, Download, Plus, Search, Filter, Send, CheckCircle, AlertCircle, Edit3, X, MousePointer } from "lucide-react"
import { Input } from "@/components/ui/input"
import mammoth from "mammoth"
import { TemplateAnalyzer, type DetectedField } from "@/lib/template-analyzer"
import { DocxTemplaterIntegration, type CreateTemplateResponse, type TemplateVariable } from "@/lib/docxtemplater-integration"

interface DocumentTemplate {
  id: string
  name: string
  description: string
  type: string
  size: string
  uploadDate: string
  category: string
  file?: File
  content?: string
  htmlContent?: string
  detectedFields?: DetectedField[]
  templateMetadata?: {
    totalFields: number
    variableFields: number
    commonFields: number
    templateComplexity: number
    reusabilityScore: number
    suggestedFields: Array<{
      label: string
      type: string
      defaultValue: string
      suggestions?: string[]
    }>
  }
}

export default function DocumentManagementTemplatesPage() {
  const [templates, setTemplates] = useState<DocumentTemplate[]>([
    {
      id: "1",
      name: "Surat Keputusan Template.docx",
      description: "Template untuk surat keputusan resmi",
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      size: "45 KB",
      uploadDate: "2024-01-15",
      category: "Surat Resmi",
      content: `UNIVERSITAS TEKNOLOGI DIGITAL INDONESIA
FAKULTAS TEKNOLOGI INFORMASI

SURAT KEPUTUSAN
DEKAN FAKULTAS TEKNOLOGI INFORMASI
Nomor: 001/SK/FTI/2024

TENTANG
PEMBENTUKAN PANITIA KEGIATAN SEMINAR NASIONAL

DEKAN FAKULTAS TEKNOLOGI INFORMASI,

Menimbang:
a. bahwa dalam rangka meningkatkan kualitas pendidikan dan penelitian di bidang teknologi informasi perlu diadakan seminar nasional;
b. bahwa untuk kelancaran pelaksanaan seminar nasional tersebut perlu dibentuk panitia penyelenggara;

Mengingat:
1. Undang-Undang Nomor 12 Tahun 2012 tentang Pendidikan Tinggi;
2. Peraturan Pemerintah Nomor 4 Tahun 2014 tentang Penyelenggaraan Pendidikan Tinggi;
3. Statuta Universitas Teknologi Digital Indonesia;

MEMUTUSKAN:

Menetapkan:
PERTAMA : Membentuk Panitia Kegiatan Seminar Nasional dengan susunan sebagaimana tercantum dalam lampiran surat keputusan ini.

KEDUA : Panitia bertugas merencanakan, mengorganisir, dan melaksanakan kegiatan seminar nasional yang akan dilaksanakan pada tanggal 15 Maret 2024.

KETIGA : Surat keputusan ini berlaku sejak tanggal ditetapkan.

Ditetapkan di : Jakarta
Pada tanggal : 1 Februari 2024

DEKAN,

Dr. Ahmad Wijaya, S.Kom., M.T.
NIP. 198501012010011001`
    },
    {
      id: "2", 
      name: "Laporan Kegiatan Template.docx",
      description: "Template untuk laporan kegiatan sekolah",
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      size: "38 KB",
      uploadDate: "2024-01-10",
      category: "Laporan",
      content: `LAPORAN KEGIATAN
SEMINAR TEKNOLOGI INFORMASI TERKINI

I. PENDAHULUAN
Kegiatan Seminar Teknologi Informasi Terkini telah dilaksanakan pada tanggal 20 Januari 2024 di Aula Universitas Teknologi Digital Indonesia. Kegiatan ini bertujuan untuk memberikan wawasan terkini mengenai perkembangan teknologi informasi kepada mahasiswa dan dosen.

II. PELAKSANAAN KEGIATAN
A. Waktu dan Tempat
   - Hari/Tanggal: Sabtu, 20 Januari 2024
   - Waktu: 08.00 - 16.00 WIB
   - Tempat: Aula Utama UTDI

B. Peserta
   - Mahasiswa: 250 orang
   - Dosen: 25 orang
   - Tamu undangan: 15 orang
   - Total: 290 orang

C. Narasumber
   1. Dr. Budi Santoso (Pakar AI dari ITB)
   2. Prof. Sari Dewi (Ahli Cybersecurity dari UI)
   3. Ir. Tono Prakoso (Praktisi IoT)

III. HASIL KEGIATAN
Kegiatan berlangsung dengan lancar dan mendapat respon positif dari peserta. Materi yang disampaikan sangat bermanfaat dan sesuai dengan kebutuhan pengembangan ilmu pengetahuan di bidang teknologi informasi.

IV. KENDALA DAN SOLUSI
Beberapa kendala teknis pada sistem audio berhasil diatasi dengan baik oleh tim teknis.

V. KESIMPULAN DAN SARAN
Kegiatan seminar ini berhasil mencapai tujuan yang diharapkan. Disarankan untuk mengadakan kegiatan serupa secara berkala.

Jakarta, 25 Januari 2024
Ketua Panitia,

Drs. Andi Wijaya, M.Kom.
NIP. 198803152015041002`
    },
    {
      id: "3",
      name: "Surat Undangan Template.docx", 
      description: "Template untuk surat undangan acara",
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      size: "32 KB",
      uploadDate: "2024-01-08",
      category: "Surat Resmi",
      content: `UNIVERSITAS TEKNOLOGI DIGITAL INDONESIA
FAKULTAS TEKNOLOGI INFORMASI

SURAT UNDANGAN

Nomor : 025/UND/FTI/II/2024
Lampiran : -
Perihal : Undangan Rapat Koordinasi

Yth. Bapak/Ibu Dosen Fakultas Teknologi Informasi
di tempat

Dengan hormat,

Sehubungan dengan akan dilaksanakannya evaluasi kurikulum semester genap tahun akademik 2023/2024, maka dengan ini kami mengundang Bapak/Ibu untuk menghadiri:

Acara        : Rapat Koordinasi Evaluasi Kurikulum
Hari/Tanggal : Senin, 10 Februari 2024
Waktu        : 09.00 - 12.00 WIB
Tempat       : Ruang Rapat Fakultas Teknologi Informasi

Agenda rapat meliputi:
1. Pembukaan
2. Laporan evaluasi semester ganjil 2023/2024
3. Penyusunan rencana perbaikan kurikulum
4. Diskusi dan tanya jawab
5. Penutup

Mengingat pentingnya acara tersebut, diharapkan Bapak/Ibu dapat hadir tepat waktu. Atas perhatian dan kehadiran Bapak/Ibu, kami sampaikan terima kasih.

Jakarta, 5 Februari 2024

Dekan,

Dr. Ahmad Wijaya, S.Kom., M.T.
NIP. 198501012010011001`
    },
    {
      id: "4",
      name: "Lembar Penilaian KKP Plus.docx",
      description: "Template untuk lembar penilaian KKP Plus dengan format tabel",
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      size: "42 KB",
      uploadDate: "2024-01-20",
      category: "Formulir",
      content: `MAJELIS PENDIDIKAN TINGGI PIMPINAN PUSAT MUHAMMADIYAH
UNIVERSITAS MUHAMMADIYAH MAKASSAR
FAKULTAS TEKNIK

بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ

LEMBAR PENILAIAN KKP PLUS

Laporan KKP PLUS ini merupakan salah satu persyaratan dalam rangka penyelesaian studi pada Fakultas Teknik Universitas Muhammadiyah Makassar dalam Program Studi Informatika

Nama Instansi/Perusahaan     : SMA 4 Muhammadiyah Makassar
Lokasi Instansi              : Jalan Gagak Lorong 4 No 4
DPL                          : Dr. Abd. Rahman Bahtiar, S.Ag., M.Ag.
Nama Mahasiswa Peserta KKP   :

┌────┬──────────────────┬───────────┬────────────────────────────┬──────────────────────┬───────────────┐
│ No │ Nama Mahasiswa   │ Stambuk   │ Nilai Dosen Pembimbing     │ Nilai Pembimbing     │ Nilai Rata-   │
│    │                  │           │ Lapangan                   │ Lokasi               │ Rata          │
├────┼──────────────────┼───────────┼────────────────────────────┼──────────────────────┼───────────────┤
│ 1  │ AHMAD FAUZI      │105841102  │ A  B+  C+E                │ A  B+  C+E          │ A  B+  C+E   │
│    │ SAIFUDDIN        │ 21        │                            │                      │               │
└────┴──────────────────┴───────────┴────────────────────────────┴──────────────────────┴───────────────┘

Demikian Penilaian dibuat untuk dipergunakan sebagaimana mestinya.

                                                           Makassar, 10 Mei 2025
Menyetujui,

Dosen Pembimbing KKP Plus                                  Pembimbing Lokasi KKP Plus


Dr. Abd. Rahman Bahtiar, S.Ag., M.Ag.                     Adriyana Syam,S.Pd., M.Pd
NBM: 772 571                                               NBM:2303041315111208

                              Mengetahui,

Wakil Dekan I Fakultas Teknik                             Ketua Program Studi Informatika
Universitas Muhammadiyah Makassar                         Universitas Muhammadiyah Makassar


Ir. Muhammad Syafa'at S.Kuba, S.T., M.L.                  Muhyiddin A.M. Hayat, S.kom., M.T.
NBM: 975 288                                               NIDN: 09310879`,
      htmlContent: `<div style="text-align: center; font-family: Arial, sans-serif;">
        <h2>MAJELIS PENDIDIKAN TINGGI PIMPINAN PUSAT MUHAMMADIYAH<br/>
        UNIVERSITAS MUHAMMADIYAH MAKASSAR<br/>
        FAKULTAS TEKNIK</h2>
        <hr style="border: 1px solid black; margin: 10px 0;"/>
        <p style="text-align: center; font-style: italic;">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
        <h3><u>LEMBAR PENILAIAN KKP PLUS</u></h3>
      </div>
      
      <p style="text-align: justify; margin: 20px 0;">
        Laporan KKP PLUS ini merupakan salah satu persyaratan dalam rangka penyelesaian 
        studi pada Fakultas Teknik Universitas Muhammadiyah Makassar dalam Program Studi Informatika
      </p>
      
      <div style="margin: 20px 0;">
        <table style="width: 100%; border: none;">
          <tr><td style="width: 30%;">Nama Instansi/Perusahaan</td><td>: SMA 4 Muhammadiyah Makassar</td></tr>
          <tr><td>Lokasi Instansi</td><td>: Jalan Gagak Lorong 4 No 4</td></tr>
          <tr><td>DPL</td><td>: Dr. Abd. Rahman Bahtiar, S.Ag., M.Ag.</td></tr>
          <tr><td>Nama Mahasiswa Peserta KKP</td><td>:</td></tr>
        </table>
      </div>
      
      <table style="width: 100%; border-collapse: collapse; border: 1px solid black; margin: 20px 0;">
        <tr style="border: 1px solid black;">
          <th style="border: 1px solid black; padding: 8px; text-align: center;">No</th>
          <th style="border: 1px solid black; padding: 8px; text-align: center;">Nama Mahasiswa</th>
          <th style="border: 1px solid black; padding: 8px; text-align: center;">Stambuk</th>
          <th style="border: 1px solid black; padding: 8px; text-align: center;">Nilai Dosen Pembimbing Lapangan</th>
          <th style="border: 1px solid black; padding: 8px; text-align: center;">Nilai Pembimbing Lokasi</th>
          <th style="border: 1px solid black; padding: 8px; text-align: center;">Nilai Rata-Rata</th>
        </tr>
        <tr style="border: 1px solid black;">
          <td style="border: 1px solid black; padding: 8px; text-align: center;">1</td>
          <td style="border: 1px solid black; padding: 8px;">AHMAD FAUZI<br/>SAIFUDDIN</td>
          <td style="border: 1px solid black; padding: 8px; text-align: center;">10584110221</td>
          <td style="border: 1px solid black; padding: 8px; text-align: center;">A B+ C+E</td>
          <td style="border: 1px solid black; padding: 8px; text-align: center;">A B+ C+E</td>
          <td style="border: 1px solid black; padding: 8px; text-align: center;">A B+ C+E</td>
        </tr>
      </table>
      
      <p>Demikian Penilaian dibuat untuk dipergunakan sebagaimana mestinya.</p>
      
      <div style="text-align: right; margin: 30px 0;">
        <p>Makassar, 10 Mei 2025</p>
      </div>
      
      <p><em>Menyetujui,</em></p>
      
      <table style="width: 100%; margin: 30px 0;">
        <tr>
          <td style="width: 50%; text-align: left;">Dosen Pembimbing KKP Plus</td>
          <td style="width: 50%; text-align: left;">Pembimbing Lokasi KKP Plus</td>
        </tr>
        <tr style="height: 60px;"><td></td><td></td></tr>
        <tr>
          <td><u>Dr. Abd. Rahman Bahtiar, S.Ag., M.Ag.</u><br/>NBM: 772 571</td>
          <td><u>Adriyana Syam,S.Pd., M.Pd</u><br/>NBM:2303041315111208</td>
        </tr>
      </table>
      
      <div style="text-align: center; margin: 30px 0;">
        <p><em>Mengetahui,</em></p>
      </div>
      
      <table style="width: 100%; margin: 30px 0;">
        <tr>
          <td style="width: 50%; text-align: center;">Wakil Dekan I Fakultas Teknik<br/>Universitas Muhammadiyah Makassar</td>
          <td style="width: 50%; text-align: center;">Ketua Program Studi Informatika<br/>Universitas Muhammadiyah Makassar</td>
        </tr>
        <tr style="height: 60px;"><td></td><td></td></tr>
        <tr>
          <td style="text-align: center;"><u>Ir. Muhammad Syafa'at S.Kuba, S.T., M.L.</u><br/>NBM: 975 288</td>
          <td style="text-align: center;"><u>Muhyiddin A.M. Hayat, S.kom., M.T.</u><br/>NIDN: 09310879</td>
        </tr>
      </table>`
    }
  ])

  const [selectedTemplate, setSelectedTemplate] = useState<DocumentTemplate | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isUploading, setIsUploading] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isCreatingTemplate, setIsCreatingTemplate] = useState(false)
  const [templateCreationResult, setTemplateCreationResult] = useState<CreateTemplateResponse | null>(null)
  const [isManualMode, setIsManualMode] = useState(false)
  const [selectedText, setSelectedText] = useState("")
  const [newPlaceholderLabel, setNewPlaceholderLabel] = useState("")
  const [newPlaceholderType, setNewPlaceholderType] = useState<'content' | 'date' | 'number' | 'identity'>('content')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const categories = ["all", "Surat Resmi", "Laporan", "Formulir", "Template Umum", "Template Siap", "Lainnya"]

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const isDocx = file.name.endsWith('.docx')
    
    if (!isDocx) {
      alert('Hanya file DOCX yang diperbolehkan untuk saat ini')
      return
    }

    setIsUploading(true)

    try {
      const arrayBuffer = await file.arrayBuffer()
      
      // Ekstrak teks menggunakan mammoth
      const textResult = await mammoth.extractRawText({ arrayBuffer })
      const htmlResult = await mammoth.convertToHtml({ arrayBuffer })
      
      // Analisa template untuk deteksi field dinamis
      const detectedFields = TemplateAnalyzer.analyzeContent(textResult.value)
      const templateMetadata = TemplateAnalyzer.generateMetadata(textResult.value)
      
      const newTemplate: DocumentTemplate = {
        id: Date.now().toString(),
        name: file.name,
        description: `Template yang diupload pada ${new Date().toLocaleDateString('id-ID')} - ${templateMetadata.variableFields} field dinamis terdeteksi`,
        type: file.type,
        size: `${Math.round(file.size / 1024)} KB`,
        uploadDate: new Date().toISOString().split('T')[0],
        category: templateMetadata.reusabilityScore > 0.6 ? "Template Umum" : "Lainnya",
        file,
        content: textResult.value,
        htmlContent: htmlResult.value,
        detectedFields,
        templateMetadata
      }

      setTemplates(prev => [newTemplate, ...prev])
      setIsUploadOpen(false)
      
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch (error) {
      console.error('Error reading file:', error)
      alert('Gagal membaca file. Pastikan file tidak corrupt.')
    } finally {
      setIsUploading(false)
    }
  }

  const handlePreview = (template: DocumentTemplate) => {
    setIsProcessing(true)
    setSelectedTemplate(template)
    
    // Analyze template if not already analyzed
    if (template.content && !template.detectedFields) {
      setTimeout(() => {
        const detectedFields = TemplateAnalyzer.analyzeContent(template.content!)
        const templateMetadata = TemplateAnalyzer.generateMetadata(template.content!)
        
        // Update template with analysis results
        const updatedTemplate = {
          ...template,
          detectedFields,
          templateMetadata
        }
        
        setSelectedTemplate(updatedTemplate)
        setTemplates(prev => prev.map(t => t.id === template.id ? updatedTemplate : t))
        setIsProcessing(false)
        setIsPreviewOpen(true)
      }, 800)
    } else {
      setTimeout(() => {
        setIsProcessing(false)
        setIsPreviewOpen(true)
      }, 500)
    }
  }

  const handleDownload = (template: DocumentTemplate) => {
    if (template.file) {
      const url = URL.createObjectURL(template.file)
      const a = document.createElement('a')
      a.href = url
      a.download = template.name
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } else {
      // Create downloadable content for built-in templates
      const content = template.content || "Konten tidak tersedia"
      const blob = new Blob([content], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = template.name.replace('.docx', '.txt')
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }


  const handleCreateTemplate = async (template: DocumentTemplate) => {
    if (!template.file || !template.detectedFields) {
      alert('Template belum dianalisa atau file tidak tersedia')
      return
    }

    setIsCreatingTemplate(true)
    setTemplateCreationResult(null)

    try {
      // Prepare data untuk backend
      const templateData = DocxTemplaterIntegration.prepareTemplateData(template)
      
      if (!templateData) {
        throw new Error('Gagal menyiapkan data template')
      }

      // Validate template variables
      const validation = DocxTemplaterIntegration.validateTemplateVariables(templateData.detectedFields)
      if (!validation.isValid) {
        console.warn('Template validation warnings:', validation.errors)
      }

      // Send to backend
      const result = await DocxTemplaterIntegration.createTemplate(templateData)
      
      setTemplateCreationResult(result)
      
      if (result.success) {
        // Update template status
        const updatedTemplate = {
          ...template,
          description: `${template.description} - Template berhasil dibuat di backend`,
          category: "Template Siap"
        }
        
        setTemplates(prev => prev.map(t => t.id === template.id ? updatedTemplate : t))
      }
      
    } catch (error) {
      console.error('Error creating template:', error)
      setTemplateCreationResult({
        success: false,
        templateId: template.id,
        message: `Gagal membuat template: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variables: template.detectedFields.filter(f => f.isVariable).map(f => ({
          id: f.id,
          key: `{{${f.label.toLowerCase().replace(/\s+/g, '_')}}}`,
          label: f.label,
          type: 'text' as const,
          defaultValue: f.value,
          originalValue: f.value,
          isRequired: f.confidence > 0.8,
          position: { startIndex: f.startIndex, endIndex: f.endIndex },
          confidence: f.confidence
        }))
      })
    } finally {
      setIsCreatingTemplate(false)
    }
  }

  const handleTextSelection = () => {
    if (!isManualMode) return
    
    const selection = window.getSelection()
    if (selection && selection.toString().trim()) {
      setSelectedText(selection.toString().trim())
      setNewPlaceholderLabel("")
    }
  }

  const addManualPlaceholder = () => {
    if (!selectedTemplate || !selectedText || !newPlaceholderLabel) return
    
    const content = selectedTemplate.content || ""
    const startIndex = content.indexOf(selectedText)
    
    if (startIndex === -1) return
    
    const newField: DetectedField = {
      id: `manual_${Date.now()}`,
      type: newPlaceholderType,
      value: selectedText,
      label: newPlaceholderLabel,
      startIndex,
      endIndex: startIndex + selectedText.length,
      isVariable: true,
      confidence: 1.0, // Manual = 100% confidence
      suggestions: []
    }
    
    const updatedTemplate = {
      ...selectedTemplate,
      detectedFields: [...(selectedTemplate.detectedFields || []), newField]
    }
    
    setTemplates(prev => prev.map(t => t.id === selectedTemplate.id ? updatedTemplate : t))
    setSelectedTemplate(updatedTemplate)
    
    // Clear selection
    setSelectedText("")
    setNewPlaceholderLabel("")
    window.getSelection()?.removeAllRanges()
  }

  const removePlaceholder = (fieldId: string) => {
    if (!selectedTemplate) return
    
    const updatedTemplate = {
      ...selectedTemplate,
      detectedFields: selectedTemplate.detectedFields?.filter(f => f.id !== fieldId) || []
    }
    
    setTemplates(prev => prev.map(t => t.id === selectedTemplate.id ? updatedTemplate : t))
    setSelectedTemplate(updatedTemplate)
  }

  const highlightPlaceholders = (content: string, fields: DetectedField[]) => {
    if (!fields || fields.length === 0) return content

    // Sort fields by start index in descending order to avoid offset issues
    const sortedFields = [...fields]
      .filter(f => f.isVariable)
      .sort((a, b) => b.startIndex - a.startIndex)

    let highlightedContent = content
    
    sortedFields.forEach((field, index) => {
      const before = highlightedContent.substring(0, field.startIndex)
      const after = highlightedContent.substring(field.endIndex)
      const highlighted = `<span class="bg-yellow-200 border border-yellow-400 px-1 py-0.5 rounded text-yellow-800 font-medium cursor-pointer" 
        title="${field.label} (${Math.round(field.confidence * 100)}% confidence)" 
        data-field-id="${field.id}">
        ${field.value}
      </span>`
      
      highlightedContent = before + highlighted + after
    })
    
    return highlightedContent
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Template Dokumen</h2>
          <p className="text-muted-foreground mt-2">
            Kelola template dokumen dengan preview menggunakan Mammoth
          </p>
        </div>
        <Button onClick={() => setIsUploadOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Upload Template
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari template..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border rounded-md bg-background"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === "all" ? "Semua Kategori" : category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="h-8 w-8 text-blue-600" />
                  <div>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="secondary">
                        {template.category}
                      </Badge>
                      <Badge variant="outline" className="text-blue-600 border-blue-200">
                        DOCX
                      </Badge>
                      {template.templateMetadata && (
                        <Badge 
                          variant={template.templateMetadata.variableFields > 5 ? "destructive" : template.templateMetadata.variableFields > 2 ? "default" : "outline"}
                          className="text-xs"
                        >
                          {template.templateMetadata.variableFields > 5 ? 'Sangat Dinamis' : 
                           template.templateMetadata.variableFields > 2 ? 'Dinamis' : 'Statis'}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <CardDescription className="mt-2">
                {template.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Ukuran:</span>
                  <span>{template.size}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tanggal Upload:</span>
                  <span>{new Date(template.uploadDate).toLocaleDateString('id-ID')}</span>
                </div>
              </div>
              
              <div className="flex space-x-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePreview(template)}
                  className="flex-1 gap-2"
                  disabled={isProcessing}
                >
                  <Eye className="h-4 w-4" />
                  Preview
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownload(template)}
                  className="flex-1 gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Tidak ada template ditemukan</h3>
          <p className="text-muted-foreground">
            {searchQuery || selectedCategory !== "all" 
              ? "Coba ubah filter atau kata kunci pencarian"
              : "Mulai dengan mengupload template dokumen pertama Anda"
            }
          </p>
        </div>
      )}

      {/* Upload Dialog */}
      <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Template Dokumen</DialogTitle>
            <DialogDescription>
              Upload file DOCX untuk dijadikan template dokumen
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <div className="space-y-2">
                <p className="text-sm font-medium">
                  Pilih file DOCX atau drag & drop di sini
                </p>
                <p className="text-xs text-muted-foreground">
                  Maksimal 10MB, file .docx
                </p>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept=".docx"
                onChange={handleFileUpload}
                className="hidden"
              />
              
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
              >
                {isUploading ? "Mengupload..." : "Pilih File"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              <div>
                <DialogTitle>{selectedTemplate?.name}</DialogTitle>
                <DialogDescription>
                  Preview dokumen dengan Mammoth.js
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          
          <ScrollArea className="h-[600px] w-full border rounded-md">
            <div className="p-6 bg-white">
              {isProcessing ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4 animate-pulse" />
                  <p className="text-muted-foreground">Memproses dokumen dengan Mammoth...</p>
                </div>
              ) : selectedTemplate ? (
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <h3 className="font-semibold text-lg mb-2">Analisa Template Dinamis:</h3>
                    
                    {selectedTemplate.templateMetadata ? (
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-green-50 p-3 rounded-md">
                          <h4 className="font-medium text-green-800 mb-2">Template Statistics</h4>
                          <div className="text-sm text-green-700 space-y-1">
                            <p><strong>Total Fields:</strong> {selectedTemplate.templateMetadata.totalFields}</p>
                            <p><strong>Variable Fields:</strong> {selectedTemplate.templateMetadata.variableFields}</p>
                            <p><strong>Common Fields:</strong> {selectedTemplate.templateMetadata.commonFields}</p>
                          </div>
                        </div>
                        
                        <div className="bg-purple-50 p-3 rounded-md">
                          <h4 className="font-medium text-purple-800 mb-2">Template Scores</h4>
                          <div className="text-sm text-purple-700 space-y-1">
                            <p><strong>Complexity:</strong> {Math.round(selectedTemplate.templateMetadata.templateComplexity * 100)}%</p>
                            <p><strong>Reusability:</strong> {Math.round(selectedTemplate.templateMetadata.reusabilityScore * 100)}%</p>
                            <p><strong>Dynamic:</strong> {selectedTemplate.templateMetadata.variableFields > 5 ? 'High' : selectedTemplate.templateMetadata.variableFields > 2 ? 'Medium' : 'Low'}</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-blue-50 p-3 rounded-md mb-4">
                        <p className="text-sm text-blue-800">
                          <strong>File:</strong> {selectedTemplate.name}<br/>
                          <strong>Ukuran:</strong> {selectedTemplate.size}<br/>
                          <strong>Kategori:</strong> {selectedTemplate.category}<br/>
                          <strong>Konten Length:</strong> {selectedTemplate.content?.length || 0} karakter
                        </p>
                      </div>
                    )}

                    {selectedTemplate.detectedFields && selectedTemplate.detectedFields.length > 0 && (
                      <div className="bg-yellow-50 p-3 rounded-md">
                        <h4 className="font-medium text-yellow-800 mb-2">
                          Field Dinamis Terdeteksi ({selectedTemplate.detectedFields.filter(f => f.isVariable).length})
                        </h4>
                        <div className="max-h-40 overflow-y-auto">
                          {selectedTemplate.detectedFields
                            .filter(f => f.isVariable)
                            .slice(0, 10)
                            .map((field, index) => (
                            <div key={field.id} className="text-xs text-yellow-700 mb-1 p-1 bg-yellow-100 rounded">
                              <strong>{field.label}:</strong> <span className="font-mono">"{field.value}"</span>
                              <span className="ml-2 text-yellow-600">({Math.round(field.confidence * 100)}% confidence)</span>
                            </div>
                          ))}
                          {selectedTemplate.detectedFields.filter(f => f.isVariable).length > 10 && (
                            <p className="text-xs text-yellow-600 mt-1">
                              +{selectedTemplate.detectedFields.filter(f => f.isVariable).length - 10} field lainnya...
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Template Creation Section */}
                    {selectedTemplate.detectedFields && selectedTemplate.detectedFields.filter(f => f.isVariable).length > 0 && (
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-medium text-blue-900 mb-1">Ready untuk Template Backend</h4>
                            <p className="text-sm text-blue-700">
                              {selectedTemplate.detectedFields.filter(f => f.isVariable).length} field dinamis siap dikirim ke docxtemplater
                            </p>
                          </div>
                          <Button
                            onClick={() => handleCreateTemplate(selectedTemplate)}
                            disabled={isCreatingTemplate}
                            className="bg-blue-600 hover:bg-blue-700 gap-2"
                          >
                            {isCreatingTemplate ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Membuat...
                              </>
                            ) : (
                              <>
                                <Send className="h-4 w-4" />
                                Buat Template
                              </>
                            )}
                          </Button>
                        </div>

                        {/* Template Creation Result */}
                        {templateCreationResult && (
                          <div className={`mt-3 p-3 rounded-md ${
                            templateCreationResult.success 
                              ? 'bg-green-100 border border-green-300' 
                              : 'bg-red-100 border border-red-300'
                          }`}>
                            <div className="flex items-start gap-2">
                              {templateCreationResult.success ? (
                                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                              ) : (
                                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                              )}
                              <div>
                                <p className={`font-medium text-sm ${
                                  templateCreationResult.success ? 'text-green-800' : 'text-red-800'
                                }`}>
                                  {templateCreationResult.success ? 'Template Berhasil Dibuat!' : 'Gagal Membuat Template'}
                                </p>
                                <p className={`text-xs mt-1 ${
                                  templateCreationResult.success ? 'text-green-700' : 'text-red-700'
                                }`}>
                                  {templateCreationResult.message}
                                </p>
                                
                                {templateCreationResult.success && templateCreationResult.templateUrl && (
                                  <div className="mt-2">
                                    <a 
                                      href={templateCreationResult.templateUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-xs text-blue-600 hover:text-blue-800 underline"
                                    >
                                      Lihat Template di Backend →
                                    </a>
                                  </div>
                                )}

                                {templateCreationResult.variables && templateCreationResult.variables.length > 0 && (
                                  <div className="mt-2">
                                    <p className="text-xs font-medium mb-1">Variables yang dikirim:</p>
                                    <div className="flex flex-wrap gap-1">
                                      {templateCreationResult.variables.slice(0, 5).map((variable) => (
                                        <code key={variable.id} className="text-xs bg-white px-1 py-0.5 rounded border">
                                          {variable.key}
                                        </code>
                                      ))}
                                      {templateCreationResult.variables.length > 5 && (
                                        <span className="text-xs text-gray-600">
                                          +{templateCreationResult.variables.length - 5} lainnya...
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Placeholder Management Section */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold">Placeholder Fields:</h4>
                      <div className="flex gap-2">
                        <Button
                          variant={isManualMode ? "default" : "outline"}
                          size="sm"
                          onClick={() => {
                            setIsManualMode(!isManualMode)
                            setSelectedText("")
                            setNewPlaceholderLabel("")
                          }}
                          className="gap-2"
                        >
                          <Edit3 className="h-4 w-4" />
                          {isManualMode ? 'Mode Manual' : 'Tambah Manual'}
                        </Button>
                      </div>
                    </div>

                    {/* Detected Placeholder Fields */}
                    {selectedTemplate.detectedFields && selectedTemplate.detectedFields.filter(f => f.isVariable).length > 0 ? (
                      <div className="space-y-3">
                        {selectedTemplate.detectedFields
                          .filter(f => f.isVariable)
                          .map((field) => (
                          <div key={field.id} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg border">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant="outline" className="text-xs">
                                  {field.type}
                                </Badge>
                                <span className="font-medium text-sm">{field.label}</span>
                                <span className="text-xs text-green-600">
                                  {Math.round(field.confidence * 100)}% confidence
                                </span>
                              </div>
                              <div className="text-sm text-gray-600 mb-2">
                                <strong>Nilai:</strong> <code className="bg-white px-1 py-0.5 rounded border text-xs">{field.value}</code>
                              </div>
                              <div className="text-xs text-blue-600">
                                <strong>Backend Variable:</strong> <code>{`{{${field.label.toLowerCase().replace(/\s+/g, '_')}}}`}</code>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removePlaceholder(field.id)}
                              className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                        <MousePointer className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600 mb-1">Tidak ada placeholder terdeteksi</p>
                        <p className="text-xs text-gray-500">Gunakan mode manual untuk menambah placeholder</p>
                      </div>
                    )}

                    {/* Manual Selection Mode */}
                    {isManualMode && (
                      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <h5 className="font-medium text-blue-900 mb-3">Manual Placeholder Selection</h5>
                        
                        {selectedText ? (
                          <div className="space-y-3">
                            <div>
                              <label className="text-sm font-medium text-blue-800">Teks Terpilih:</label>
                              <p className="text-sm bg-white p-2 rounded border mt-1">"{selectedText}"</p>
                            </div>
                            
                            <div>
                              <label className="text-sm font-medium text-blue-800">Label Placeholder:</label>
                              <Input
                                placeholder="Contoh: Nama Mahasiswa"
                                value={newPlaceholderLabel}
                                onChange={(e) => setNewPlaceholderLabel(e.target.value)}
                                className="mt-1"
                              />
                            </div>
                            
                            <div>
                              <label className="text-sm font-medium text-blue-800">Tipe:</label>
                              <select
                                value={newPlaceholderType}
                                onChange={(e) => setNewPlaceholderType(e.target.value as 'content' | 'date' | 'number' | 'identity')}
                                className="w-full mt-1 px-3 py-2 border rounded-md bg-white text-sm"
                              >
                                <option value="content">Text/Content</option>
                                <option value="date">Tanggal</option>
                                <option value="number">Nomor</option>
                                <option value="identity">Nama/Identitas</option>
                              </select>
                            </div>
                            
                            <Button
                              onClick={addManualPlaceholder}
                              disabled={!newPlaceholderLabel}
                              className="w-full"
                              size="sm"
                            >
                              Tambah Placeholder
                            </Button>
                          </div>
                        ) : (
                          <p className="text-sm text-blue-700 bg-white p-3 rounded border">
                            Pilih teks di dokumen di bawah untuk membuat placeholder baru
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Document Preview with Highlighted Placeholders */}
                  <div>
                    <h4 className="font-semibold mb-3">Preview Dokumen {isManualMode ? '(Pilih teks untuk placeholder)' : '(dengan highlights)'}:</h4>
                    <div 
                      ref={contentRef}
                      className="prose max-w-none text-sm border rounded-md p-4 bg-white"
                      style={{
                        fontFamily: 'Times New Roman, serif',
                        lineHeight: '1.6',
                        fontSize: '14px',
                        cursor: isManualMode ? 'text' : 'default'
                      }}
                      onMouseUp={handleTextSelection}
                      dangerouslySetInnerHTML={{
                        __html: selectedTemplate.content ? 
                          highlightPlaceholders(
                            selectedTemplate.content.replace(/\n/g, '<br>'), 
                            selectedTemplate.detectedFields || []
                          ) : 
                          '<p class="text-gray-500 italic">Konten tidak tersedia</p>'
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Tidak ada dokumen yang dipilih</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  )
}