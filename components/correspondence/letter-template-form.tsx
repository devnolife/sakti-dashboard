"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { LetterRequest } from "@/types/correspondence"

interface LetterTemplateFormProps {
  request: LetterRequest
  onSubmit: (content: string) => void
}

export function LetterTemplateForm({ request, onSubmit }: LetterTemplateFormProps) {
  const [templateType, setTemplateType] = useState<string>("standard")
  const [content, setContent] = useState<string>(generateTemplate(request, "standard"))

  const handleTemplateChange = (type: string) => {
    setTemplateType(type)
    setContent(generateTemplate(request, type))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(content)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Template Surat</h3>
          <Select value={templateType} onValueChange={handleTemplateChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Pilih Template" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="standard">Template Standar</SelectItem>
              <SelectItem value="formal">Template Formal</SelectItem>
              <SelectItem value="simple">Template Sederhana</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="edit" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="edit" className="space-y-4">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[400px] font-mono text-sm"
            />
          </TabsContent>
          <TabsContent value="preview" className="border rounded-md p-4 min-h-[400px] whitespace-pre-wrap">
            {content}
          </TabsContent>
        </Tabs>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline">
          Batal
        </Button>
        <Button type="submit">Buat Surat</Button>
      </div>
    </form>
  )
}

function generateTemplate(request: LetterRequest, type: string): string {
  const currentDate = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  const letterNumber = `${request.id.replace("letter-", "")}/UN.1/TU/${new Date().getFullYear()}`

  let letterTitle = ""
  switch (request.type) {
    case "active_student":
      letterTitle = "SURAT KETERANGAN AKTIF KULIAH"
      break
    case "leave_absence":
      letterTitle = "SURAT IZIN CUTI AKADEMIK"
      break
    case "loan_application":
      letterTitle = "SURAT KETERANGAN UNTUK PENGAJUAN PINJAMAN"
      break
    case "tuition_extension":
      letterTitle = "SURAT PERMOHONAN PERPANJANGAN PEMBAYARAN SPP"
      break
    case "internship_recommendation":
      letterTitle = "SURAT REKOMENDASI MAGANG"
      break
    case "scholarship_recommendation":
      letterTitle = "SURAT REKOMENDASI BEASISWA"
      break
    case "transcript_request":
      letterTitle = "SURAT KETERANGAN TRANSKRIP NILAI"
      break
    case "research_permission":
      letterTitle = "SURAT IZIN PENELITIAN"
      break
    case "graduation_confirmation":
      letterTitle = "SURAT KETERANGAN LULUS"
      break
    default:
      letterTitle = request.title.toUpperCase()
  }

  switch (type) {
    case "formal":
      return `KEMENTERIAN PENDIDIKAN, KEBUDAYAAN, RISET, DAN TEKNOLOGI
UNIVERSITAS NEGERI INDONESIA
Jalan Pendidikan No. 123, Kota Pendidikan, 12345
Telepon: (021) 123456
Laman: www.uni.ac.id

Nomor     : ${letterNumber}
Lampiran  : -
Hal       : ${letterTitle}

Yang bertanda tangan di bawah ini:

Nama      : ${request.approvedBy || "______________________"}
Jabatan   : Kepala Tata Usaha Fakultas
NIP       : 197001012000121001

dengan ini menerangkan bahwa:

Nama      : ${request.studentName}
NIM       : ${request.studentNIM}
Program Studi : ${request.studentMajor}
Fakultas  : ${getFacultyFromMajor(request.studentMajor)}

adalah benar mahasiswa aktif Universitas Negeri Indonesia yang terdaftar pada semester ${request.additionalInfo?.semester || "___"} tahun akademik ${getCurrentAcademicYear()}.

${getSpecificContent(request)}

Demikian surat keterangan ini dibuat untuk dipergunakan sebagaimana mestinya.

${currentDate}
Kepala Tata Usaha,


${request.approvedBy || "______________________"}
NIP. 197001012000121001`

    case "simple":
      return `SURAT KETERANGAN
Nomor: ${letterNumber}

Yang bertanda tangan di bawah ini, Kepala Tata Usaha Fakultas ${getFacultyFromMajor(request.studentMajor)} Universitas Negeri Indonesia, menerangkan bahwa:

Nama: ${request.studentName}
NIM: ${request.studentNIM}
Program Studi: ${request.studentMajor}

${getSimpleContent(request)}

Demikian surat keterangan ini dibuat untuk dipergunakan sebagaimana mestinya.

${currentDate}

${request.approvedBy || "______________________"}
Kepala Tata Usaha`

    default: // standard
      return `UNIVERSITAS NEGERI INDONESIA
FAKULTAS ${getFacultyFromMajor(request.studentMajor).toUpperCase()}
Jalan Pendidikan No. 123, Kota Pendidikan, 12345
Telepon: (021) 123456, Faksimile: (021) 123457
Laman: www.uni.ac.id, Surel: info@uni.ac.id

================================================================================

${letterTitle}
Nomor: ${letterNumber}

Yang bertanda tangan di bawah ini:

Nama    : ${request.approvedBy || "______________________"}
Jabatan : Kepala Tata Usaha Fakultas ${getFacultyFromMajor(request.studentMajor)}
NIP     : 197001012000121001

dengan ini menerangkan bahwa:

Nama         : ${request.studentName}
NIM          : ${request.studentNIM}
Program Studi: ${request.studentMajor}
Fakultas     : ${getFacultyFromMajor(request.studentMajor)}

${getStandardContent(request)}

Demikian surat keterangan ini dibuat dengan sebenarnya untuk dipergunakan sebagaimana mestinya.

${currentDate}
Kepala Tata Usaha,


${request.approvedBy || "______________________"}
NIP. 197001012000121001`
  }
}

function getSpecificContent(request: LetterRequest): string {
  switch (request.type) {
    case "active_student":
      return `Surat keterangan ini digunakan untuk keperluan ${request.purpose}.`

    case "leave_absence":
      return `Mahasiswa tersebut diberikan izin cuti akademik selama satu semester, terhitung mulai tanggal ${request.additionalInfo?.startDate || "___"} sampai dengan ${request.additionalInfo?.endDate || "___"} dengan alasan ${request.additionalInfo?.reason || "___"}.`

    case "loan_application":
      return `Mahasiswa tersebut bermaksud mengajukan pinjaman pendidikan di ${request.additionalInfo?.bankName || "___"} sebesar ${request.additionalInfo?.loanAmount || "___"} untuk keperluan ${request.additionalInfo?.loanPurpose || "___"}.`

    case "tuition_extension":
      return `Mahasiswa tersebut diberikan perpanjangan waktu pembayaran SPP dari tanggal ${request.additionalInfo?.currentDueDate || "___"} menjadi ${request.additionalInfo?.requestedDueDate || "___"} dengan alasan ${request.additionalInfo?.reason || "___"}.`

    case "internship_recommendation":
      return `Mahasiswa tersebut direkomendasikan untuk mengikuti program magang di ${request.additionalInfo?.companyName || "___"} yang beralamat di ${request.additionalInfo?.companyAddress || "___"} selama periode ${request.additionalInfo?.internshipPeriod || "___"}.`

    case "scholarship_recommendation":
      return `Mahasiswa tersebut direkomendasikan untuk mendapatkan ${request.additionalInfo?.scholarshipName || "___"} yang diselenggarakan oleh ${request.additionalInfo?.scholarshipProvider || "___"} berdasarkan prestasi akademik dan non-akademik yang dimiliki, yaitu ${request.additionalInfo?.achievements || "___"}.`

    case "transcript_request":
      return `Mahasiswa tersebut telah mengajukan permohonan transkrip nilai untuk keperluan ${request.additionalInfo?.purpose || "___"} sebanyak ${request.additionalInfo?.copies || "___"} salinan.`

    case "research_permission":
      return `Mahasiswa tersebut diberikan izin untuk melakukan penelitian dengan judul "${request.additionalInfo?.researchTitle || "___"}" di ${request.additionalInfo?.researchLocation || "___"} selama periode ${request.additionalInfo?.researchPeriod || "___"}.`

    case "graduation_confirmation":
      return `Mahasiswa tersebut telah dinyatakan LULUS dari Program Studi ${request.studentMajor} pada tanggal ${request.additionalInfo?.graduationDate || "___"} dengan Indeks Prestasi Kumulatif (IPK) ${request.additionalInfo?.gpa || "___"} dan judul skripsi/tugas akhir "${request.additionalInfo?.thesisTitle || "___"}".`

    default:
      return `Surat keterangan ini digunakan untuk keperluan ${request.purpose}.`
  }
}

function getStandardContent(request: LetterRequest): string {
  return getSpecificContent(request)
}

function getSimpleContent(request: LetterRequest): string {
  return getSpecificContent(request)
}

function getFacultyFromMajor(major: string): string {
  switch (major) {
    case "Teknik Informatika":
    case "Teknik Elektro":
    case "Teknik Mesin":
    case "Teknik Sipil":
    case "Teknik Telekomunikasi":
    case "Teknik Kimia":
      return "Teknik"

    case "Manajemen":
    case "Akuntansi":
    case "Ekonomi Pembangunan":
    case "Manajemen Bisnis":
      return "Ekonomi dan Bisnis"

    case "Kedokteran":
      return "Kedokteran"

    case "Hukum":
      return "Hukum"

    case "Psikologi":
      return "Psikologi"

    case "Ilmu Komunikasi":
    case "Hubungan Internasional":
    case "Sastra Inggris":
      return "Ilmu Sosial dan Ilmu Politik"

    case "Pendidikan Matematika":
    case "Fisika":
    case "Biologi":
      return "Keguruan dan Ilmu Pendidikan"

    default:
      return "Fakultas Terkait"
  }
}

function getCurrentAcademicYear(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1 // JavaScript months are 0-indexed

  // Academic year in Indonesia typically starts in September
  if (month >= 9) {
    return `${year}/${year + 1}`
  } else {
    return `${year - 1}/${year}`
  }
}

