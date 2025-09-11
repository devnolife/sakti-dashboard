"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  CheckCircle,
  XCircle,
  FileText,
  Users,
  Building,
  Calendar,
  Eye,
  Download,
  Signature,
  Shield,
  Clock,
  AlertTriangle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { kkpDataStore } from "@/lib/kkp-data-store"

interface KkpApplication {
  id: string
  title: string
  submissionDate: Date
  student: {
    id: string
    name: string
    nim: string
    major: string
    semester: number
    email: string
    phone: string
  }
  groupMembers: Array<{
    id: string
    name: string
    nim: string
    major: string
    semester: number
  }>
  company: {
    name: string
    address: string
    city: string
    contactPerson: string
    contactPhone: string
    industry: string
  }
  status: "pending_wd1" | "approved_wd1" | "rejected_wd1"
  description: string
  startDate: Date
  endDate: Date
  documents: Array<{
    name: string
    type: string
    url: string
  }>
  prodiApprovalDate?: Date
  prodiApprovalNotes?: string
  generatedDocument?: {
    filePath: string
    no_surat: string
    prodi: string
    message: string
    downloadUrl: string
  }
}

export default function VerifikasiPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  
  // Safe toast function with fallback
  const showToast = (options: { title: string; description: string; variant?: "default" | "destructive" }) => {
    try {
      if (toast && typeof toast === 'function') {
        toast(options)
      } else {
        console.log('Toast:', options.title, '-', options.description)
      }
    } catch (error) {
      console.log('Toast error:', options.title, '-', options.description)
    }
  }
  const [application, setApplication] = useState<KkpApplication | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [approvalDialogOpen, setApprovalDialogOpen] = useState(false)
  const [approvalAction, setApprovalAction] = useState<"approve" | "reject" | null>(null)
  const [approvalNotes, setApprovalNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [documentPreviewOpen, setDocumentPreviewOpen] = useState(false)
  const [previewDocument, setPreviewDocument] = useState<string | null>(null)

  const applicationId = params.id as string

  // Fetch application data
  useEffect(() => {
    const fetchApplication = async () => {
      try {
        // Simulate API call - in real app, this would fetch from backend
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Mock data for the specific application
        const mockApplication: KkpApplication = {
          id: applicationId,
          title: "Pengembangan Sistem Informasi Manajemen",
          submissionDate: new Date("2024-01-15"),
          student: {
            id: "std-001",
            name: "Ahmad Fauzi",
            nim: "1234567890",
            major: "Informatika",
            semester: 7,
            email: "ahmad.fauzi@example.com",
            phone: "081234567890",
          },
          groupMembers: [
            {
              id: "std-002",
              name: "Budi Santoso",
              nim: "1234567891",
              major: "Informatika",
              semester: 7,
            },
            {
              id: "std-003",
              name: "Citra Dewi",
              nim: "1234567892",
              major: "Informatika",
              semester: 7,
            },
          ],
          company: {
            name: "PT Teknologi Maju Indonesia",
            address: "Jl. Sudirman No. 123, Jakarta Selatan",
            city: "Jakarta",
            contactPerson: "John Doe",
            contactPhone: "021-1234567",
            industry: "Technology",
          },
          status: "pending_wd1",
          description: "Mengembangkan sistem informasi manajemen untuk meningkatkan efisiensi operasional perusahaan. Proyek ini melibatkan analisis kebutuhan sistem, perancangan database, implementasi aplikasi web, dan pengujian sistem.",
          startDate: new Date("2024-02-01"),
          endDate: new Date("2024-05-31"),
          documents: [
            {
              name: "KKP_Ahmad_Fauzi.pdf",
              type: "proposal",
              url: "/documents/proposal_kkp_ahmad_fauzi.pdf",
            },
            {
              name: "Surat_KKP.pdf",
              type: "application-letter",
              url: "/documents/surat_kkp.pdf",
            },
            {
              name: "Persetujuan_Prodi.pdf",
              type: "prodi-approval",
              url: "/documents/persetujuan_prodi.pdf",
            },
          ],
          prodiApprovalDate: new Date("2024-01-18"),
          prodiApprovalNotes: "Proposal sudah sesuai dengan standar KKP dan lokasi perusahaan telah diverifikasi.",
        }

        setApplication(mockApplication)
      } catch (error) {
        console.error("Error fetching application:", error)
        toast({
          title: "Error",
          description: "Gagal memuat data pengajuan KKP.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (applicationId) {
      fetchApplication()
    }
  }, [applicationId, toast])

  // Handle approval action
  const handleApprovalAction = (action: "approve" | "reject") => {
    setApprovalAction(action)
    setApprovalNotes("")
    setApprovalDialogOpen(true)
  }

  // Submit approval/rejection
  const submitApproval = async () => {
    if (!application || !approvalAction) return

    setIsSubmitting(true)

    try {
      // Simulate API call for digital signature and approval
      await new Promise(resolve => setTimeout(resolve, 2000))

      if (approvalAction === "approve") {
        // After approval, generate the official document
        try {
          // Prepare data for document generation
          const tableData = [
            {
              nama_mahasiswa: application.student.name,
              nim: application.student.nim
            },
            ...application.groupMembers.map(member => ({
              nama_mahasiswa: member.name,
              nim: member.nim
            }))
          ]

          const documentPayload = {
            kepada: "Tempat Tujuan KKP",
            tempat_tujuan: application.company.name,
            nama_prodi: application.student.major,
            nama_ttd: "Wakil Dekan 1 Bidang Akademik",
            tableData: tableData
          }

          console.log("Generating document with payload:", documentPayload)

          // Call document generation API
          const docResponse = await fetch("http://localhost:8080/api/generate-document/kkp/informatika", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(documentPayload),
          })

          if (docResponse.ok) {
            const docResult = await docResponse.json()
            console.log("Document generated successfully:", docResult)
            
            // Store document data in global store
            kkpDataStore.setGeneratedDocument(application.id, docResult.data)
            
            // Update application status with document info using new API response format
            const updatedApplication = {
              ...application,
              status: "approved_wd1" as const,
              generatedDocument: {
                filePath: docResult.data.filePath,
                no_surat: docResult.data.no_surat,
                prodi: docResult.data.prodi,
                message: docResult.data.message,
                downloadUrl: `http://localhost:8080${docResult.data.downloadUrl}` // Use relative path from API
              }
            }
            setApplication(updatedApplication)

            showToast({
              title: "Dokumen Berhasil Dibuat",
              description: `Dokumen KKP telah ditandatangani dan dibuat dengan nomor surat: ${docResult.data.no_surat}`,
            })
          } else {
            throw new Error("Failed to generate document")
          }
        } catch (docError) {
          console.error("Error generating document:", docError)
          
          // Still update status to approved but without document
          const updatedApplication = {
            ...application,
            status: "approved_wd1" as const
          }
          setApplication(updatedApplication)
          
          showToast({
            title: "Dokumen Ditandatangani",
            description: "Pengajuan KKP telah disetujui dan ditandatangani. Namun, gagal membuat dokumen otomatis.",
            variant: "destructive",
          })
        }
      } else {
        // Update application status for rejection
        const updatedApplication = {
          ...application,
          status: "rejected_wd1" as const
        }
        setApplication(updatedApplication)

        showToast({
          title: "Pengajuan Ditolak",
          description: "Pengajuan KKP telah ditolak dengan alasan yang diberikan.",
        })
      }

      setApprovalDialogOpen(false)
      setApprovalAction(null)
    } catch (error) {
      console.error("Error submitting approval:", error)
      showToast({
        title: "Error",
        description: "Terjadi kesalahan saat memproses persetujuan.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle document preview
  const handleDocumentPreview = (documentUrl: string) => {
    setPreviewDocument(documentUrl)
    setDocumentPreviewOpen(true)
  }

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending_wd1":
        return (
          <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-200">
            <Clock className="h-3.5 w-3.5 mr-1" />
            Menunggu Tanda Tangan WD1
          </Badge>
        )
      case "approved_wd1":
        return (
          <Badge variant="outline" className="text-green-500 border-green-200 bg-green-500/10">
            <CheckCircle className="h-3.5 w-3.5 mr-1" />
            Disetujui WD1
          </Badge>
        )
      case "rejected_wd1":
        return (
          <Badge variant="outline" className="text-red-500 border-red-200 bg-red-500/10">
            <XCircle className="h-3.5 w-3.5 mr-1" />
            Ditolak WD1
          </Badge>
        )
      default:
        return null
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 border-b-2 rounded-full animate-spin border-primary"></div>
          <p className="text-muted-foreground">Memuat data pengajuan...</p>
        </div>
      </div>
    )
  }

  if (!application) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-red-500" />
          <h2 className="mb-2 text-xl font-semibold">Pengajuan Tidak Ditemukan</h2>
          <p className="mb-4 text-muted-foreground">ID pengajuan yang Anda cari tidak valid atau telah dihapus.</p>
          <Button onClick={() => router.push("/")}>Kembali ke Beranda</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-primary">Verifikasi Dokumen KKP</h1>
          </div>
          <p className="text-muted-foreground">
            Sistem Tanda Tangan Digital - Wakil Dekan 1 Bidang Akademik
          </p>
          <div className="flex items-center justify-center gap-2">
            <Badge variant="outline" className="bg-white">
              ID: {application.id}
            </Badge>
            {getStatusBadge(application.status)}
          </div>
        </div>

        {/* Document Preview Card */}
        <Card className="border-2 shadow-lg border-primary/20">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Preview Dokumen Pengajuan KKP
            </CardTitle>
            <CardDescription>
              Tinjau semua detail pengajuan sebelum memberikan persetujuan
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {/* Document Details */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
                  <h3 className="flex items-center gap-2 mb-3 font-semibold text-blue-900">
                    <Users className="w-4 h-4" />
                    Informasi Mahasiswa
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-700">Ketua Tim:</span>
                      <span className="font-medium">{application.student.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">NIM:</span>
                      <span className="font-medium">{application.student.nim}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Program Studi:</span>
                      <span className="font-medium">{application.student.major}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Semester:</span>
                      <span className="font-medium">{application.student.semester}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Email:</span>
                      <span className="text-xs font-medium">{application.student.email}</span>
                    </div>
                  </div>
                </div>

                {application.groupMembers.length > 0 && (
                  <div className="p-4 border border-green-200 rounded-lg bg-green-50">
                    <h3 className="mb-3 font-semibold text-green-900">Anggota Tim ({application.groupMembers.length})</h3>
                    <div className="space-y-2">
                      {application.groupMembers.map((member, index) => (
                        <div key={member.id} className="text-sm">
                          <div className="flex justify-between">
                            <span className="text-green-700">Anggota {index + 1}:</span>
                            <span className="font-medium">{member.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-green-700">NIM:</span>
                            <span className="font-medium">{member.nim}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="p-4 border border-purple-200 rounded-lg bg-purple-50">
                  <h3 className="flex items-center gap-2 mb-3 font-semibold text-purple-900">
                    <Building className="w-4 h-4" />
                    Informasi Perusahaan
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-purple-700">Nama:</span>
                      <span className="font-medium">{application.company.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-700">Industri:</span>
                      <span className="font-medium">{application.company.industry}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-700">Kota:</span>
                      <span className="font-medium">{application.company.city}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-700">Kontak Person:</span>
                      <span className="font-medium">{application.company.contactPerson}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-700">Telepon:</span>
                      <span className="font-medium">{application.company.contactPhone}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg bg-amber-50 border-amber-200">
                  <h3 className="flex items-center gap-2 mb-3 font-semibold text-amber-900">
                    <Calendar className="w-4 h-4" />
                    Periode KKP
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-amber-700">Mulai:</span>
                      <span className="font-medium">{application.startDate.toLocaleDateString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-amber-700">Selesai:</span>
                      <span className="font-medium">{application.endDate.toLocaleDateString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-amber-700">Durasi:</span>
                      <span className="font-medium">
                        {Math.ceil((application.endDate.getTime() - application.startDate.getTime()) / (1000 * 60 * 60 * 24 * 30))} bulan
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Description */}
            <div className="p-4 border rounded-lg bg-gray-50">
              <h3 className="mb-3 font-semibold">Judul dan Deskripsi Proyek</h3>
              <h4 className="mb-2 text-lg font-medium">{application.title}</h4>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {application.description}
              </p>
            </div>

            {/* Prodi Approval Info */}
            {application.prodiApprovalDate && (
              <div className="p-4 border border-green-200 rounded-lg bg-green-50">
                <h3 className="mb-3 font-semibold text-green-900">Persetujuan Program Studi</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-green-700">Tanggal Persetujuan:</span>
                    <span className="font-medium">{application.prodiApprovalDate.toLocaleDateString('id-ID')}</span>
                  </div>
                  {application.prodiApprovalNotes && (
                    <div>
                      <span className="text-green-700">Catatan Prodi:</span>
                      <p className="p-2 mt-1 text-xs text-green-800 bg-green-100 rounded">
                        {application.prodiApprovalNotes}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Documents */}
            <div>
              <h3 className="mb-3 font-semibold">Dokumen Pendukung</h3>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {application.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white border rounded-lg shadow-sm">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-blue-500" />
                      <div>
                        <p className="text-sm font-medium">{doc.name}</p>
                        <p className="text-xs capitalize text-muted-foreground">
                          {doc.type.replace(/-/g, " ")}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDocumentPreview(doc.url)}
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        Lihat
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a href={doc.url} download>
                          <Download className="w-3 h-3" />
                        </a>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        {application.status === "pending_wd1" && (
          <Card className="border-2 border-dashed border-primary/30">
            <CardContent className="p-6">
              <div className="space-y-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Signature className="w-6 h-6 text-primary" />
                  <h3 className="text-lg font-semibold">Tanda Tangan Digital Diperlukan</h3>
                </div>
                <p className="text-muted-foreground">
                  Silakan tinjau semua dokumen di atas, kemudian pilih tindakan yang sesuai.
                </p>
                <div className="flex justify-center gap-4">
                  <Button
                    size="lg"
                    className="text-white bg-green-500 hover:bg-green-600"
                    onClick={() => handleApprovalAction("approve")}
                  >
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Setujui & Tanda Tangani
                  </Button>
                  <Button
                    size="lg"
                    variant="destructive"
                    onClick={() => handleApprovalAction("reject")}
                  >
                    <XCircle className="w-5 h-5 mr-2" />
                    Tolak Pengajuan
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Status Result */}
        {application.status !== "pending_wd1" && (
          <Card className={cn(
            "border-2",
            application.status === "approved_wd1" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
          )}>
            <CardContent className="p-6 text-center">
              <div className="space-y-4">
                {application.status === "approved_wd1" ? (
                  <>
                    <CheckCircle className="w-12 h-12 mx-auto text-green-500" />
                    <h3 className="text-xl font-semibold text-green-700">Dokumen Telah Ditandatangani</h3>
                    <p className="text-green-600">
                      Pengajuan KKP telah disetujui dan ditandatangani secara digital pada {new Date().toLocaleDateString('id-ID')}.
                    </p>
                    
                    {/* Generated Document Info */}
                    {application.generatedDocument && (
                      <div className="mt-6 p-4 bg-white border border-green-300 rounded-lg">
                        <h4 className="text-lg font-semibold text-green-800 mb-3">📄 Dokumen Resmi KKP</h4>
                        <div className="space-y-2 text-sm text-left">
                          <p><strong>Nomor Surat:</strong> {application.generatedDocument.no_surat}</p>
                          <p><strong>Program Studi:</strong> {application.generatedDocument.prodi}</p>
                          <p><strong>Status:</strong> {application.generatedDocument.message}</p>
                        </div>
                        <div className="mt-4 space-y-2">
                          <Button 
                            className="w-full text-white bg-green-600 hover:bg-green-700" 
                            onClick={() => window.open(application.generatedDocument?.downloadUrl, '_blank')}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Lihat Dokumen (.docx)
                          </Button>
                          <Button 
                            variant="outline" 
                            className="w-full border-green-300 text-green-700 hover:bg-green-100" 
                            asChild
                          >
                            <a 
                              href="/dashboard/mahasiswa/kkp" 
                              target="_blank"
                            >
                              🏠 Dashboard Mahasiswa
                            </a>
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <XCircle className="w-12 h-12 mx-auto text-red-500" />
                    <h3 className="text-xl font-semibold text-red-700">Pengajuan Ditolak</h3>
                    <p className="text-red-600">
                      Pengajuan KKP telah ditolak pada {new Date().toLocaleDateString('id-ID')}.
                    </p>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Approval Dialog */}
      <Dialog open={approvalDialogOpen} onOpenChange={setApprovalDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {approvalAction === "approve" ? (
                <>
                  <Signature className="w-5 h-5 text-green-500" />
                  Tanda Tangan Digital
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-red-500" />
                  Tolak Pengajuan
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              {approvalAction === "approve"
                ? "Konfirmasi untuk menandatangani dokumen secara digital."
                : "Berikan alasan penolakan untuk pengajuan ini."
              }
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {application && (
              <div className="p-3 text-sm rounded-lg bg-muted/50">
                <p><strong>Ketua:</strong> {application.student.name}</p>
                <p><strong>Program Studi:</strong> {application.student.major}</p>
                <p><strong>Perusahaan:</strong> {application.company.name}</p>
              </div>
            )}

            <div>
              <label className="text-sm font-medium">
                {approvalAction === "approve" ? "Catatan (Opsional)" : "Alasan Penolakan *"}
              </label>
              <Textarea
                value={approvalNotes}
                onChange={(e) => setApprovalNotes(e.target.value)}
                placeholder={
                  approvalAction === "approve"
                    ? "Tambahkan catatan khusus jika diperlukan..."
                    : "Jelaskan alasan penolakan..."
                }
                className="mt-1"
                required={approvalAction === "reject"}
              />
            </div>

            {approvalAction === "approve" && (
              <div className="p-3 text-sm border border-blue-200 rounded-lg bg-blue-50">
                <p className="text-blue-700">
                  <strong>Informasi:</strong> Dokumen akan ditandatangani menggunakan sertifikat digital yang valid
                  dan memiliki kekuatan hukum sesuai dengan UU No. 11 Tahun 2008 tentang ITE.
                </p>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setApprovalDialogOpen(false)}
              disabled={isSubmitting}
            >
              Batal
            </Button>
            <Button
              onClick={submitApproval}
              disabled={isSubmitting || (approvalAction === "reject" && !approvalNotes.trim())}
              className={approvalAction === "approve" ? "bg-green-500 hover:bg-green-600" : ""}
              variant={approvalAction === "reject" ? "destructive" : "default"}
            >
              {isSubmitting ? (
                "Memproses..."
              ) : (
                <>
                  {approvalAction === "approve" ? (
                    <>
                      <Signature className="w-4 h-4 mr-1" />
                      Tanda Tangani
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 mr-1" />
                      Tolak
                    </>
                  )}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Document Preview Dialog */}
      <Dialog open={documentPreviewOpen} onOpenChange={setDocumentPreviewOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Preview Dokumen</DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center rounded-lg h-96 bg-muted/50">
            <div className="text-center">
              <FileText className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
              <p className="text-muted-foreground">Preview dokumen akan ditampilkan di sini</p>
              <p className="mt-1 text-sm text-muted-foreground">
                URL: {previewDocument}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
