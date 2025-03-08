"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
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
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  Plus,
  FileText,
  Building,
  Calendar,
  AlertCircle,
  MapPin,
  Briefcase,
} from "lucide-react"

// Application interface
interface Application {
  id: string
  companyName: string
  industry: string
  city: string
  submissionDate?: string
  status: "pending" | "approved" | "rejected" | "draft"
  rejectionReason?: string
  details: {
    address: string
    positions: string[]
    contactName: string
    contactPosition: string
    contactEmail: string
    contactPhone: string
    description: string
  }
}

export default function ApplicationPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [applications, setApplications] = useState<Application[]>([
    {
      id: "APP-2023-001",
      companyName: "PT Inovasi Teknologi",
      industry: "Teknologi Informasi",
      city: "Surabaya",
      submissionDate: "10 September 2023",
      status: "pending",
      details: {
        address: "Jl. Teknologi No. 123, Surabaya",
        positions: ["Pengembang Perangkat Lunak", "Desainer UI/UX"],
        contactName: "Budi Santoso",
        contactPosition: "Manajer HR",
        contactEmail: "budi@inovasitech.com",
        contactPhone: "081234567890",
        description:
          "PT Inovasi Teknologi adalah perusahaan teknologi yang berfokus pada pengembangan aplikasi mobile dan web.",
      },
    },
    {
      id: "APP-2023-002",
      companyName: "CV Desain Kreatif",
      industry: "Media & Komunikasi",
      city: "Yogyakarta",
      submissionDate: "5 Agustus 2023",
      status: "approved",
      details: {
        address: "Jl. Malioboro No. 45, Yogyakarta",
        positions: ["Desainer Grafis", "Pembuat Konten"],
        contactName: "Siti Rahayu",
        contactPosition: "Direktur Kreatif",
        contactEmail: "siti@desainkreatif.com",
        contactPhone: "085678901234",
        description:
          "CV Desain Kreatif adalah studio desain yang mengerjakan proyek branding, desain grafis, dan konten digital.",
      },
    },
    {
      id: "APP-2023-003",
      companyName: "PT Logistik Cepat",
      industry: "Logistik & Transportasi",
      city: "Jakarta",
      submissionDate: "20 Juli 2023",
      status: "rejected",
      rejectionReason: "Posisi yang diajukan sudah terisi penuh.",
      details: {
        address: "Jl. Gatot Subroto No. 78, Jakarta Selatan",
        positions: ["Analis Rantai Pasok", "Koordinator Logistik"],
        contactName: "Hendra Wijaya",
        contactPosition: "Manajer Operasional",
        contactEmail: "hendra@logistikcepat.com",
        contactPhone: "087890123456",
        description:
          "PT Logistik Cepat adalah perusahaan logistik yang menyediakan layanan pengiriman barang dan manajemen rantai pasok.",
      },
    },
    {
      id: "APP-2023-004",
      companyName: "Koperasi Sejahtera",
      industry: "Keuangan",
      city: "Bandung",
      status: "draft",
      details: {
        address: "Jl. Asia Afrika No. 56, Bandung",
        positions: ["Analis Keuangan", "Asisten Akuntansi"],
        contactName: "Dewi Anggraini",
        contactPosition: "Manajer Keuangan",
        contactEmail: "dewi@koperasisejahtera.com",
        contactPhone: "089012345678",
        description:
          "Koperasi Sejahtera adalah lembaga keuangan mikro yang menyediakan layanan simpan pinjam dan pendampingan usaha kecil.",
      },
    },
  ])
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)
  const [showNewApplicationDialog, setShowNewApplicationDialog] = useState(false)
  const [newApplication, setNewApplication] = useState<Partial<Application>>({
    companyName: "",
    industry: "",
    city: "",
    status: "draft",
    details: {
      address: "",
      positions: [], // This is already correctly initialized
      contactName: "",
      contactPosition: "",
      contactEmail: "",
      contactPhone: "",
      description: "",
    },
  })

  // Helper function to update a specific field in the details object
  const updateDetailsField = (field: string, value: any) => {
    setNewApplication({
      ...newApplication,
      details: {
        address: newApplication.details?.address || "",
        positions: newApplication.details?.positions || [],
        contactName: newApplication.details?.contactName || "",
        contactPosition: newApplication.details?.contactPosition || "",
        contactEmail: newApplication.details?.contactEmail || "",
        contactPhone: newApplication.details?.contactPhone || "",
        description: newApplication.details?.description || "",
        [field]: value,
      },
    });
  };

  // Filter applications based on active tab
  const filteredApplications = applications.filter((app) => {
    if (activeTab === "all") return true
    return app.status === activeTab
  })

  // Handle creating a new application
  const handleCreateApplication = () => {
    const id = `APP-2023-${String(applications.length + 1).padStart(3, "0")}`
    const newApp: Application = {
      id,
      companyName: newApplication.companyName || "",
      industry: newApplication.industry || "",
      city: newApplication.city || "",
      status: "draft",
      details: {
        address: newApplication.details?.address || "",
        positions: newApplication.details?.positions || [],
        contactName: newApplication.details?.contactName || "",
        contactPosition: newApplication.details?.contactPosition || "",
        contactEmail: newApplication.details?.contactEmail || "",
        contactPhone: newApplication.details?.contactPhone || "",
        description: newApplication.details?.description || "",
      },
    }

    setApplications([...applications, newApp])
    setNewApplication({
      companyName: "",
      industry: "",
      city: "",
      status: "draft",
      details: {
        address: "",
        positions: [],
        contactName: "",
        contactPosition: "",
        contactEmail: "",
        contactPhone: "",
        description: "",
      },
    })
    setShowNewApplicationDialog(false)
  }

  // Handle submitting a draft application
  const handleSubmitApplication = (id: string) => {
    setApplications(
      applications.map((app) =>
        app.id === id
          ? {
              ...app,
              status: "pending",
              submissionDate: new Date().toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }),
            }
          : app,
      ),
    )
  }

  // Handle deleting an application
  const handleDeleteApplication = (id: string) => {
    setApplications(applications.filter((app) => app.id !== id))
    if (selectedApplication?.id === id) {
      setSelectedApplication(null)
    }
  }

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-amber-500/10 text-amber-500">
            <Clock className="h-3.5 w-3.5 mr-1" />
            Menunggu Tinjauan
          </Badge>
        )
      case "approved":
        return (
          <Badge className="text-green-500 bg-green-500/10">
            <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
            Disetujui
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="text-red-500 bg-red-500/10">
            <XCircle className="h-3.5 w-3.5 mr-1" />
            Ditolak
          </Badge>
        )
      case "draft":
        return (
          <Badge variant="outline">
            <Clock className="h-3.5 w-3.5 mr-1" />
            Draf
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
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            Aplikasi Magang
          </span>
        </h2>
        <p className="mt-2 text-muted-foreground">Kelola aplikasi lokasi magang Anda</p>
      </div>

      <div className="flex flex-col justify-between gap-4 md:flex-row">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 md:w-auto">
            <TabsTrigger value="all">Semua</TabsTrigger>
            <TabsTrigger value="pending">Menunggu</TabsTrigger>
            <TabsTrigger value="approved">Disetujui</TabsTrigger>
            <TabsTrigger value="rejected">Ditolak</TabsTrigger>
            <TabsTrigger value="draft">Draf</TabsTrigger>
          </TabsList>
        </Tabs>
        <Dialog open={showNewApplicationDialog} onOpenChange={setShowNewApplicationDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Aplikasi Baru
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Ajukan Aplikasi Lokasi Baru</DialogTitle>
              <DialogDescription>
                Isi formulir di bawah ini untuk mengajukan aplikasi lokasi magang baru
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="company-name" className="text-sm font-medium">
                    Nama Perusahaan/Institusi
                  </label>
                  <Input
                    id="company-name"
                    value={newApplication.companyName}
                    onChange={(e) => setNewApplication({ ...newApplication, companyName: e.target.value })}
                    placeholder="PT Contoh Indonesia"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="industry" className="text-sm font-medium">
                    Industri
                  </label>
                  <Select
                    value={newApplication.industry}
                    onValueChange={(value) => setNewApplication({ ...newApplication, industry: value })}
                  >
                    <SelectTrigger id="industry">
                      <SelectValue placeholder="Pilih industri" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Teknologi Informasi">Teknologi Informasi</SelectItem>
                      <SelectItem value="Perbankan & Keuangan">Perbankan & Keuangan</SelectItem>
                      <SelectItem value="Kesehatan">Kesehatan</SelectItem>
                      <SelectItem value="Pendidikan">Pendidikan</SelectItem>
                      <SelectItem value="Pemerintahan">Pemerintahan</SelectItem>
                      <SelectItem value="Media & Komunikasi">Media & Komunikasi</SelectItem>
                      <SelectItem value="Logistik & Transportasi">Logistik & Transportasi</SelectItem>  // Ensure we're preserving all fields with their current values or defaults
                      <SelectItem value="Lainnya">Lainnya</SelectItem>     address: e.target.value,
                    </SelectContent>positions || [],
                  </Select>      contactName: newApplication.details?.contactName || "",
                </div>    contactPosition: newApplication.details?.contactPosition || "",
              </div>etails?.contactEmail || "",
              <div className="space-y-2">plication.details?.contactPhone || "",
                <label htmlFor="address" className="text-sm font-medium"> || "",
                  Alamat Lengkap
                </label>
                <Input
                  id="address"="Jl. Contoh No. 123, Jakarta"
                  value={newApplication.details?.address}
                  onChange={(e) => updateDetailsField('address', e.target.value)}
                  placeholder="Jl. Contoh No. 123, Jakarta"ols-2 gap-4">
                /> className="space-y-2">
              </div>el htmlFor="city" className="text-sm font-medium">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="city" className="text-sm font-medium">
                    Kotaty"
                  </label>e={newApplication.city}
                  <Input=> setNewApplication({ ...newApplication, city: e.target.value })}
                    id="city"
                    value={newApplication.city}
                    onChange={(e) => setNewApplication({ ...newApplication, city: e.target.value })}
                    placeholder="Jakarta">
                  />positions" className="text-sm font-medium">
                </div> koma)
                <div className="space-y-2">
                  <label htmlFor="positions" className="text-sm font-medium">
                    Posisi Magang (dipisahkan dengan koma)
                  </label>ils?.positions?.join(", ")}
                  <Inputge={(e) =>
                    id="positions"tNewApplication({
                    value={newApplication.details?.positions?.join(", ")}   ...newApplication,
                    onChange={(e) => updateDetailsField('positions', e.target.value.split(",").map(p => p.trim()).filter(p => p))}
                    placeholder="Pengembang Perangkat Lunak, Desainer UI/UX"      address: newApplication.details?.address || "",
                  />    positions: e.target.value
                </div>        .split(",")
              </div>.trim())
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium"> newApplication.details?.contactName || "",
                  Deskripsi Perusahaan  contactPosition: newApplication.details?.contactPosition || "",
                </label> contactEmail: newApplication.details?.contactEmail || "",
                <Textareahone: newApplication.details?.contactPhone || "",
                  id="description"?.description || "",
                  value={newApplication.details?.description}
                  onChange={(e) => updateDetailsField('description', e.target.value)}
                  placeholder="Deskripsi singkat tentang perusahaan/institusi"
                  className="min-h-[80px]"
                />
              </div>iv>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="contact-name" className="text-sm font-medium">abel htmlFor="description" className="text-sm font-medium">
                    Nama Kontakskripsi Perusahaan
                  </label>
                  <Input
                    id="contact-name"
                    value={newApplication.details?.contactName}lication.details?.description}
                    onChange={(e) => updateDetailsField('contactName', e.target.value)}={(e) =>
                    placeholder="Nama lengkap orang yang dapat dihubungi"ewApplication({
                  />on,
                </div>
                <div className="space-y-2">Application.details?.address || "",
                  <label htmlFor="contact-position" className="text-sm font-medium">lication.details?.positions || [],
                    Posisiplication.details?.contactName || "",
                  </label>
                  <InputcontactEmail: newApplication.details?.contactEmail || "",
                    id="contact-position"   contactPhone: newApplication.details?.contactPhone || "",
                    value={newApplication.details?.contactPosition}
                    onChange={(e) => updateDetailsField('contactPosition', e.target.value)}  },
                    placeholder="Manajer HR"
                  />
                </div>
              </div>e="min-h-[80px]"
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="contact-email" className="text-sm font-medium">ols-2 gap-4">
                    Email
                  </label>ntact-name" className="text-sm font-medium">
                  <Input
                    id="contact-email"
                    type="email"
                    value={newApplication.details?.contactEmail}contact-name"
                    onChange={(e) => updateDetailsField('contactEmail', e.target.value)}alue={newApplication.details?.contactName}
                    placeholder="email@contoh.com"
                  />  setNewApplication({
                </div>  ...newApplication,
                <div className="space-y-2">    details: {
                  <label htmlFor="contact-phone" className="text-sm font-medium">ils?.address || "",
                    Nomor Teleponlication.details?.positions || [],
                  </label>
                  <Input contactPosition: newApplication.details?.contactPosition || "",
                    id="contact-phone"contactEmail: newApplication.details?.contactEmail || "",
                    value={newApplication.details?.contactPhone}  contactPhone: newApplication.details?.contactPhone || "",
                    onChange={(e) => updateDetailsField('contactPhone', e.target.value)} newApplication.details?.description || "",
                    placeholder="021-1234567"
                  />
                </div>
              </div>gkap orang yang dapat dihubungi"
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowNewApplicationDialog(false)}>ssName="space-y-2">
                Batalbel htmlFor="contact-position" className="text-sm font-medium">
              </Button>
              <Button variant="outline" onClick={handleCreateApplication}>label>
                Simpan sebagai Drafut
              </Button>
              <Button type="submit" onClick={handleCreateApplication}>
                Ajukan Aplikasi =>
              </Button>ewApplication({
            </DialogFooter>...newApplication,
          </DialogContent>
        </Dialog>ss || "",
      </div> newApplication.details?.positions || [],
wApplication.details?.contactName || "",
      <Card className="overflow-hidden gradient-border"> e.target.value,
        <CardHeader>
          <CardTitle>Daftar Aplikasi</CardTitle>  contactPhone: newApplication.details?.contactPhone || "",
          <CardDescription>Lacak status aplikasi lokasi magang Anda</CardDescription>     description: newApplication.details?.description || "",
        </CardHeader>
        <CardContent>  })
          <TabsContent value={activeTab} className="mt-0">
            <div className="border rounded-md">placeholder="Manajer HR"
              <Table>/>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Nama Perusahaan</TableHead>assName="grid grid-cols-2 gap-4">
                    <TableHead>Industri</TableHead>assName="space-y-2">
                    <TableHead>Kota</TableHead>edium">
                    <TableHead>Tanggal Pengajuan</TableHead>
                    <TableHead>Status</TableHead>el>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>-email"
                </TableHeader>e="email"
                <TableBody>newApplication.details?.contactEmail}
                  {filteredApplications.length === 0 ? (ge={(e) =>
                    <TableRow>     setNewApplication({
                      <TableCell colSpan={6} className="h-24 text-center">            ...newApplication,
                        <div className="flex flex-col items-center justify-center">                        details: {
                          <AlertCircle className="w-8 h-8 mb-2 text-muted-foreground" />s?.address || "",
                          <p className="text-muted-foreground">Tidak ada aplikasi ditemukan</p>      positions: newApplication.details?.positions || [],
                          <Buttonation.details?.contactName || "",
                            variant="outline" "",
                            size="sm"     contactEmail: e.target.value,
                            className="mt-4"     contactPhone: newApplication.details?.contactPhone || "",
                            onClick={() => setShowNewApplicationDialog(true)}ils?.description || "",
                          >
                            <Plus className="w-4 h-4 mr-2" /> })
                            Buat Aplikasi Baru
                          </Button>der="email@contoh.com"
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (text-sm font-medium">
                    filteredApplications.map((application) => (
                      <TableRow key={application.id}>
                        <TableCell className="font-medium">{application.companyName}</TableCell>
                        <TableCell>{application.industry}</TableCell>t-phone"
                        <TableCell>{application.city}</TableCell>newApplication.details?.contactPhone}
                        <TableCell>{application.submissionDate || "-"}</TableCell>
                        <TableCell>{getStatusBadge(application.status)}</TableCell>plication({
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm" onClick={() => setSelectedApplication(application)}>
                              <Eye className="w-4 h-4 mr-1" />
                              {application.status === "draft" ? "Edit" : "Detail"}Name: newApplication.details?.contactName || "",
                            </Button>wApplication.details?.contactPosition || "",
                            {application.status === "draft" && (l: newApplication.details?.contactEmail || "",
                              <Buttonrget.value,
                                variant="default" "",
                                size="sm"
                                onClick={() => handleSubmitApplication(application.id)}
                              >
                                Ajukan1-1234567"
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))> setShowNewApplicationDialog(false)}>
                  )}
                </TableBody>
              </Table>ication}>
            </div>
          </TabsContent>
        </CardContent>pplication}>
      </Card>

      {selectedApplication && (
        <Dialog open={!!selectedApplication} onOpenChange={(open) => !open && setSelectedApplication(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Building className="w-5 h-5 text-primary" />order">
                {selectedApplication.companyName}
              </DialogTitle>
              <DialogDescription>k status aplikasi lokasi magang Anda</CardDescription>
                {selectedApplication.industry} • {selectedApplication.city}
              </DialogDescription>
            </DialogHeader>activeTab} className="mt-0">
            <div className="space-y-4">er rounded-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-muted-foreground" />leRow>
                  <span className="text-sm font-medium">ID Aplikasi:</span><TableHead className="w-[250px]">Nama Perusahaan</TableHead>
                  <span className="text-sm">{selectedApplication.id}</span>ad>Industri</TableHead>
                </div>ableHead>Kota</TableHead>
                {getStatusBadge(selectedApplication.status)}  <TableHead>Tanggal Pengajuan</TableHead>
              </div>leHead>Status</TableHead>
ableHead className="text-right">Aksi</TableHead>
              {selectedApplication.submissionDate && (     </TableRow>
                <div className="flex items-center gap-2">                </TableHeader>
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Tanggal Pengajuan:</span>
                  <span className="text-sm">{selectedApplication.submissionDate}</span>
                </div>leCell colSpan={6} className="h-24 text-center">
              )}ter justify-center">
2 text-muted-foreground" />
              {selectedApplication.rejectionReason && (d-foreground">Tidak ada aplikasi ditemukan</p>
                <div className="p-3 text-sm text-red-500 rounded-md bg-red-500/10">utton
                  <div className="mb-1 font-medium">Alasan Penolakan:</div>nt="outline"
                  {selectedApplication.rejectionReason}
                </div>ame="mt-4"
              )} onClick={() => setShowNewApplicationDialog(true)}

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Detail Perusahaan</h4>
                <div className="space-y-1">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <span className="text-sm">{selectedApplication.details.address}</span>TableRow>
                  </div>
                  <div className="flex items-start gap-2">filteredApplications.map((application) => (
                    <Briefcase className="h-4 w-4 text-muted-foreground mt-0.5" />                      <TableRow key={application.id}>
                    <div className="text-sm">ium">{application.companyName}</TableCell>
                      <div className="font-medium">Posisi Tersedia:</div></TableCell>
                      <ul className="list-disc list-inside">
                        {selectedApplication.details.positions.map((position, index) => (>
                          <li key={index}>{position}</li>
                        ))}  <TableCell className="text-right">
                      </ul>          <div className="flex justify-end gap-2">
                    </div>                            <Button variant="ghost" size="sm" onClick={() => setSelectedApplication(application)}>
                  </div>r-1" />
                  <div className="flex items-start gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div className="text-sm">aft" && (
                      <div className="font-medium">Deskripsi:</div>        <Button
                      <p>{selectedApplication.details.description}</p>                variant="default"
                    </div>                                size="sm"
                  </div>() => handleSubmitApplication(application.id)}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Informasi Kontak</h4>
                <div className="grid grid-cols-2 gap-2"></TableCell>
                  <div className="text-sm">
                    <div className="font-medium">Nama:</div>
                    <p>{selectedApplication.details.contactName}</p>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium">Posisi:</div>
                    <p>{selectedApplication.details.contactPosition}</p>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium">Email:</div>
                    <p>{selectedApplication.details.contactEmail}</p>on && (
                  </div>{(open) => !open && setSelectedApplication(null)}>
                  <div className="text-sm">
                    <div className="font-medium">Telepon:</div>
                    <p>{selectedApplication.details.contactPhone}</p>
                  </div>
                </div>pplication.companyName}
              </div>tle>
            </div>escription>
            <DialogFooter>ectedApplication.industry} • {selectedApplication.city}
              {selectedApplication.status === "draft" ? (              </DialogDescription>
                <>
                  <Button
                    variant="destructive"between">
                    onClick={() => {center gap-2">
                      handleDeleteApplication(selectedApplication.id)reground" />
                      setSelectedApplication(null)</span>
                    }}className="text-sm">{selectedApplication.id}</span>
                  >
                    Hapus Draf
                  </Button>
                  <Button
                    onClick={() => {onDate && (
                      handleSubmitApplication(selectedApplication.id)
                      setSelectedApplication(null) />
                    }}className="text-sm font-medium">Tanggal Pengajuan:</span>
                  >>{selectedApplication.submissionDate}</span>
                    Ajukan Aplikasi
                  </Button>
                </>
              ) : (dApplication.rejectionReason && (
                <Button onClick={() => setSelectedApplication(null)}>Tutup</Button> className="p-3 text-sm text-red-500 rounded-md bg-red-500/10">
              )}<div className="mb-1 font-medium">Alasan Penolakan:</div>
            </DialogFooter>dApplication.rejectionReason}
          </DialogContent>
        </Dialog>
      )}
    </div>
  )sm font-medium">Detail Perusahaan</h4>
}
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Informasi Kontak</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-sm">
                    <div className="font-medium">Nama:</div>
                    <p>{selectedApplication.details.contactName}</p>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium">Posisi:</div>
                    <p>{selectedApplication.details.contactPosition}</p>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium">Email:</div>
                    <p>{selectedApplication.details.contactEmail}</p>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium">Telepon:</div>
                    <p>{selectedApplication.details.contactPhone}</p>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              {selectedApplication.status === "draft" ? (
                <>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      handleDeleteApplication(selectedApplication.id)
                      setSelectedApplication(null)
                    }}
                  >
                    Hapus Draf
                  </Button>
                  <Button
                    onClick={() => {
                      handleSubmitApplication(selectedApplication.id)
                      setSelectedApplication(null)
                    }}
                  >
                    Ajukan Aplikasi
                  </Button>
                </>
              ) : (
                <Button onClick={() => setSelectedApplication(null)}>Tutup</Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
