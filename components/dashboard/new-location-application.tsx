"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building, FileText, Clock, CheckCircle2, XCircle, AlertCircle, Eye, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

// Application status type
type ApplicationStatus = "pending" | "approved" | "rejected" | "draft"

// Application interface
interface LocationApplication {
  id: string
  companyName: string
  industry: string
  city: string
  address: string
  positions: string[]
  description: string
  contact: {
    name: string
    position: string
    email: string
    phone: string
  }
  status: ApplicationStatus
  submittedDate: string
  reviewedDate?: string
  reviewedBy?: string
  notes?: string
}

export default function NewLocationApplication() {
  const [activeTab, setActiveTab] = useState("my-applications")
  const [selectedApplication, setSelectedApplication] = useState<LocationApplication | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showNewApplicationForm, setShowNewApplicationForm] = useState(false)

  // Sample data for applications
  const [applications, setApplications] = useState<LocationApplication[]>([
    {
      id: "app-001",
      companyName: "PT Inovasi Teknologi",
      industry: "Teknologi Informasi",
      city: "Surabaya",
      address: "Jl. Raya Darmo No. 45, Surabaya",
      positions: ["Web Developer", "Mobile Developer"],
      description:
        "PT Inovasi Teknologi adalah perusahaan startup yang fokus pada pengembangan aplikasi web dan mobile untuk berbagai industri.",
      contact: {
        name: "Rina Wijaya",
        position: "CTO",
        email: "rina.wijaya@inotek.co.id",
        phone: "031-5556789",
      },
      status: "pending",
      submittedDate: "10 September 2023",
    },
    {
      id: "app-002",
      companyName: "CV Desain Kreatif",
      industry: "Media & Komunikasi",
      city: "Yogyakarta",
      address: "Jl. Malioboro No. 123, Yogyakarta",
      positions: ["Graphic Designer", "UI/UX Designer"],
      description:
        "CV Desain Kreatif adalah studio desain yang menyediakan layanan desain grafis, branding, dan UI/UX untuk berbagai klien.",
      contact: {
        name: "Agus Santoso",
        position: "Creative Director",
        email: "agus.santoso@desainkreatif.com",
        phone: "0274-567890",
      },
      status: "approved",
      submittedDate: "5 Agustus 2023",
      reviewedDate: "15 Agustus 2023",
      reviewedBy: "Dr. Bambang Sutanto",
      notes: "Lokasi disetujui. Silakan lanjutkan dengan proses magang.",
    },
    {
      id: "app-003",
      companyName: "PT Logistik Cepat",
      industry: "Logistik & Transportasi",
      city: "Jakarta",
      address: "Jl. Raya Kelapa Gading No. 78, Jakarta Utara",
      positions: ["Supply Chain Analyst", "Logistics Coordinator"],
      description:
        "PT Logistik Cepat adalah perusahaan logistik yang menyediakan layanan pengiriman dan manajemen rantai pasok untuk berbagai industri.",
      contact: {
        name: "Hendra Gunawan",
        position: "Operations Manager",
        email: "hendra.gunawan@logistikcepat.com",
        phone: "021-4567890",
      },
      status: "rejected",
      submittedDate: "20 Juli 2023",
      reviewedDate: "1 Agustus 2023",
      reviewedBy: "Dr. Bambang Sutanto",
      notes: "Lokasi ditolak karena tidak sesuai dengan program studi. Silakan pilih lokasi lain yang lebih relevan.",
    },
    {
      id: "app-004",
      companyName: "Koperasi Sejahtera",
      industry: "Keuangan",
      city: "Bandung",
      address: "Jl. Asia Afrika No. 56, Bandung",
      positions: ["Financial Analyst", "Credit Officer"],
      description:
        "Koperasi Sejahtera adalah lembaga keuangan mikro yang menyediakan layanan simpan pinjam dan pemberdayaan ekonomi untuk masyarakat.",
      contact: {
        name: "Siti Aminah",
        position: "Manager",
        email: "siti.aminah@koperasisejahtera.co.id",
        phone: "022-3456789",
      },
      status: "draft",
      submittedDate: "-",
    },
  ])

  // Filter applications based on active tab
  const filteredApplications = applications.filter((app) => {
    if (activeTab === "my-applications") return true
    if (activeTab === "pending") return app.status === "pending"
    if (activeTab === "approved") return app.status === "approved"
    if (activeTab === "rejected") return app.status === "rejected"
    if (activeTab === "draft") return app.status === "draft"
    return true
  })

  // Handle application submission
  const handleSubmitApplication = () => {
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setShowNewApplicationForm(false)
      // Add new application to the list
      const newApplication: LocationApplication = {
        id: `app-00${applications.length + 1}`,
        companyName: "PT New Company",
        industry: "Teknologi Informasi",
        city: "Jakarta",
        address: "Jl. Example No. 123, Jakarta",
        positions: ["Software Developer", "Data Analyst"],
        description: "Deskripsi perusahaan baru yang diajukan.",
        contact: {
          name: "John Doe",
          position: "HR Manager",
          email: "john.doe@example.com",
          phone: "021-1234567",
        },
        status: "pending",
        submittedDate: new Date().toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
      }
      setApplications([...applications, newApplication])
    }, 1500)
  }

  // Get status badge
  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20">
            <Clock className="h-3.5 w-3.5 mr-1" />
            Menunggu Review
          </Badge>
        )
      case "approved":
        return (
          <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
            <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
            Disetujui
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20">
            <XCircle className="h-3.5 w-3.5 mr-1" />
            Ditolak
          </Badge>
        )
      case "draft":
        return (
          <Badge className="bg-muted hover:bg-muted/80">
            <FileText className="h-3.5 w-3.5 mr-1" />
            Draft
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Pengajuan Lokasi Baru
          </span>
        </h2>
        <p className="text-muted-foreground mt-2">Ajukan dan kelola pengajuan lokasi magang baru</p>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <Tabs defaultValue="my-applications" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-5 w-full md:w-auto">
            <TabsTrigger value="my-applications">Semua</TabsTrigger>
            <TabsTrigger value="pending">Menunggu</TabsTrigger>
            <TabsTrigger value="approved">Disetujui</TabsTrigger>
            <TabsTrigger value="rejected">Ditolak</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
          </TabsList>
        </Tabs>
        <Button onClick={() => setShowNewApplicationForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Ajukan Lokasi Baru
        </Button>
      </div>

      <Card className="overflow-hidden gradient-border">
        <CardHeader>
          <CardTitle>Daftar Pengajuan Lokasi</CardTitle>
          <CardDescription>Pantau status pengajuan lokasi magang baru Anda</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredApplications.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Nama Perusahaan</TableHead>
                    <TableHead>Industri</TableHead>
                    <TableHead>Kota</TableHead>
                    <TableHead>Tanggal Pengajuan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplications.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell className="font-medium">{app.companyName}</TableCell>
                      <TableCell>{app.industry}</TableCell>
                      <TableCell>{app.city}</TableCell>
                      <TableCell>{app.submittedDate}</TableCell>
                      <TableCell>{getStatusBadge(app.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => setSelectedApplication(app)}>
                          <Eye className="h-4 w-4 mr-1" />
                          Detail
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                <Building className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">Tidak ada pengajuan</h3>
              <p className="text-sm text-muted-foreground mt-1">Anda belum mengajukan lokasi magang baru</p>
              <Button className="mt-4" onClick={() => setShowNewApplicationForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Ajukan Lokasi Baru
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Application Detail Dialog */}
      {selectedApplication && (
        <Dialog open={!!selectedApplication} onOpenChange={(open) => !open && setSelectedApplication(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{selectedApplication.companyName}</DialogTitle>
              <DialogDescription>
                {selectedApplication.industry} • {selectedApplication.city}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  ID Pengajuan: <span className="font-medium">{selectedApplication.id}</span>
                </div>
                {getStatusBadge(selectedApplication.status)}
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Alamat</h4>
                <p className="text-sm text-muted-foreground">{selectedApplication.address}</p>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Deskripsi</h4>
                <p className="text-sm text-muted-foreground">{selectedApplication.description}</p>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Posisi Magang</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedApplication.positions.map((position, index) => (
                    <Badge key={index} variant="outline" className="bg-primary/10">
                      {position}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Kontak</h4>
                <div className="rounded-md bg-muted p-3">
                  <p className="text-sm font-medium">{selectedApplication.contact.name}</p>
                  <p className="text-xs text-muted-foreground">{selectedApplication.contact.position}</p>
                  <div className="mt-2 text-xs">
                    <p>Email: {selectedApplication.contact.email}</p>
                    <p>Telepon: {selectedApplication.contact.phone}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Informasi Pengajuan</h4>
                <div className="rounded-md bg-muted p-3 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">Tanggal Pengajuan:</span>
                    <span className="text-xs">{selectedApplication.submittedDate}</span>
                  </div>
                  {selectedApplication.reviewedDate && (
                    <div className="flex justify-between">
                      <span className="text-xs text-muted-foreground">Tanggal Review:</span>
                      <span className="text-xs">{selectedApplication.reviewedDate}</span>
                    </div>
                  )}
                  {selectedApplication.reviewedBy && (
                    <div className="flex justify-between">
                      <span className="text-xs text-muted-foreground">Direview oleh:</span>
                      <span className="text-xs">{selectedApplication.reviewedBy}</span>
                    </div>
                  )}
                </div>
              </div>

              {selectedApplication.notes && (
                <div
                  className={cn(
                    "p-3 rounded-md",
                    selectedApplication.status === "approved"
                      ? "bg-green-500/10"
                      : selectedApplication.status === "rejected"
                        ? "bg-red-500/10"
                        : "bg-amber-500/10",
                  )}
                >
                  <div className="flex items-start gap-2">
                    {selectedApplication.status === "approved" ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    ) : selectedApplication.status === "rejected" ? (
                      <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <h4 className="text-sm font-medium">
                        {selectedApplication.status === "approved"
                          ? "Catatan Persetujuan"
                          : selectedApplication.status === "rejected"
                            ? "Alasan Penolakan"
                            : "Catatan"}
                      </h4>
                      <p className="text-xs mt-1">{selectedApplication.notes}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              {selectedApplication.status === "draft" && <Button>Edit & Kirim Pengajuan</Button>}
              {selectedApplication.status === "rejected" && <Button>Ajukan Kembali</Button>}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* New Application Form Dialog */}
      <Dialog open={showNewApplicationForm} onOpenChange={setShowNewApplicationForm}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Ajukan Lokasi Magang Baru</DialogTitle>
            <DialogDescription>
              Isi formulir berikut untuk mengajukan lokasi magang baru yang belum terdaftar dalam sistem.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="company-name" className="text-sm font-medium">
                  Nama Perusahaan/Instansi
                </label>
                <Input id="company-name" placeholder="PT Example Indonesia" />
              </div>
              <div className="space-y-2">
                <label htmlFor="industry" className="text-sm font-medium">
                  Industri
                </label>
                <Select>
                  <SelectTrigger id="industry">
                    <SelectValue placeholder="Pilih industri" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tech">Teknologi Informasi</SelectItem>
                    <SelectItem value="finance">Perbankan & Keuangan</SelectItem>
                    <SelectItem value="health">Kesehatan</SelectItem>
                    <SelectItem value="education">Pendidikan</SelectItem>
                    <SelectItem value="government">Pemerintahan</SelectItem>
                    <SelectItem value="manufacture">Manufaktur</SelectItem>
                    <SelectItem value="media">Media & Komunikasi</SelectItem>
                    <SelectItem value="other">Lainnya</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="address" className="text-sm font-medium">
                Alamat Lengkap
              </label>
              <Input id="address" placeholder="Jl. Contoh No. 123, Jakarta" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="city" className="text-sm font-medium">
                  Kota
                </label>
                <Input id="city" placeholder="Jakarta" />
              </div>
              <div className="space-y-2">
                <label htmlFor="positions" className="text-sm font-medium">
                  Posisi Magang
                </label>
                <Input id="positions" placeholder="Software Developer, UI/UX Designer" />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Deskripsi Perusahaan
              </label>
              <textarea
                id="description"
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Deskripsi singkat tentang perusahaan/instansi"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="contact-name" className="text-sm font-medium">
                  Nama Kontak
                </label>
                <Input id="contact-name" placeholder="Nama lengkap kontak" />
              </div>
              <div className="space-y-2">
                <label htmlFor="contact-position" className="text-sm font-medium">
                  Jabatan
                </label>
                <Input id="contact-position" placeholder="HR Manager" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="contact-email" className="text-sm font-medium">
                  Email
                </label>
                <Input id="contact-email" type="email" placeholder="email@example.com" />
              </div>
              <div className="space-y-2">
                <label htmlFor="contact-phone" className="text-sm font-medium">
                  Nomor Telepon
                </label>
                <Input id="contact-phone" placeholder="021-1234567" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewApplicationForm(false)}>
              Batal
            </Button>
            <Button onClick={handleSubmitApplication} disabled={isSubmitting}>
              {isSubmitting ? "Mengirim..." : "Ajukan Lokasi"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

