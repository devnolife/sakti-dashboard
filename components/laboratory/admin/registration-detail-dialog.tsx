"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
  User,
  Calendar,
  CreditCard,
  Clock,
  CheckCheck,
} from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface RegistrationDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  registration: LabRegistration | null
}

export interface LabRegistration {
  id: string
  studentName: string
  studentId: string
  studentMajor: string
  studentSemester: number
  labName: string
  courseName: string
  schedule: string
  scheduleDate: string
  applicationDate: string
  status: "pending" | "approved" | "rejected"
  paymentStatus: "pending" | "verified" | "unverified"
  paymentAmount: number
  paymentDate?: string
  paymentMethod?: string
  paymentProofUrl?: string
  paymentVerifiedBy?: string
  paymentVerifiedAt?: string
  rejectionReason?: string
}

export function RegistrationDetailDialog({ open, onOpenChange, registration }: RegistrationDetailDialogProps) {
  const [rejectionReason, setRejectionReason] = useState("")
  const [isVerifyingPayment, setIsVerifyingPayment] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  if (!registration) return null

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">Disetujui</Badge>
      case "rejected":
        return <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20">Ditolak</Badge>
      case "pending":
      default:
        return <Badge className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20">Menunggu Persetujuan</Badge>
    }
  }

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">Terverifikasi</Badge>
      case "unverified":
        return <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20">Tidak Terverifikasi</Badge>
      case "pending":
      default:
        return <Badge className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20">Menunggu Verifikasi</Badge>
    }
  }

  const handleApprove = () => {
    setIsProcessing(true)
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Pendaftaran disetujui",
        description: `Pendaftaran ${registration.studentName} untuk ${registration.labName} telah disetujui.`,
      })
      setIsProcessing(false)
      onOpenChange(false)
    }, 1000)
  }

  const handleReject = () => {
    if (!rejectionReason.trim()) {
      toast({
        title: "Alasan penolakan diperlukan",
        description: "Harap berikan alasan penolakan pendaftaran ini.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Pendaftaran ditolak",
        description: `Pendaftaran ${registration.studentName} untuk ${registration.labName} telah ditolak.`,
      })
      setIsProcessing(false)
      onOpenChange(false)
    }, 1000)
  }

  const handleVerifyPayment = () => {
    setIsVerifyingPayment(true)
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Pembayaran terverifikasi",
        description: `Pembayaran untuk ${registration.studentName} telah berhasil diverifikasi.`,
      })
      setIsVerifyingPayment(false)
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detail Pendaftaran Laboratorium</DialogTitle>
          <DialogDescription>Informasi lengkap pendaftaran laboratorium dan verifikasi pembayaran</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Informasi Pendaftaran</TabsTrigger>
            <TabsTrigger value="payment">Informasi Pembayaran</TabsTrigger>
            <TabsTrigger value="action">Tindakan</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4 mt-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{registration.labName}</h3>
                <p className="text-sm text-muted-foreground">{registration.courseName}</p>
              </div>
              {getStatusBadge(registration.status)}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    Informasi Mahasiswa
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-3 gap-1">
                    <div className="text-sm font-medium">Nama</div>
                    <div className="text-sm col-span-2">{registration.studentName}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <div className="text-sm font-medium">NIM</div>
                    <div className="text-sm col-span-2">{registration.studentId}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <div className="text-sm font-medium">Program Studi</div>
                    <div className="text-sm col-span-2">{registration.studentMajor}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <div className="text-sm font-medium">Semester</div>
                    <div className="text-sm col-span-2">{registration.studentSemester}</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Informasi Jadwal
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-3 gap-1">
                    <div className="text-sm font-medium">Jadwal</div>
                    <div className="text-sm col-span-2">{registration.schedule}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <div className="text-sm font-medium">Tanggal</div>
                    <div className="text-sm col-span-2">{registration.scheduleDate}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <div className="text-sm font-medium">Tanggal Pengajuan</div>
                    <div className="text-sm col-span-2">{registration.applicationDate}</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {registration.status === "rejected" && registration.rejectionReason && (
              <Card className="border-red-200 bg-red-50 dark:bg-red-950/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center text-red-600 dark:text-red-400">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Alasan Penolakan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-red-600 dark:text-red-400">{registration.rejectionReason}</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="payment" className="space-y-4 mt-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">Informasi Pembayaran</h3>
                <p className="text-sm text-muted-foreground">Detail dan bukti pembayaran</p>
              </div>
              {getPaymentStatusBadge(registration.paymentStatus)}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Detail Pembayaran
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-3 gap-1">
                    <div className="text-sm font-medium">Jumlah</div>
                    <div className="text-sm col-span-2 font-semibold">{formatCurrency(registration.paymentAmount)}</div>
                  </div>
                  {registration.paymentDate && (
                    <div className="grid grid-cols-3 gap-1">
                      <div className="text-sm font-medium">Tanggal Pembayaran</div>
                      <div className="text-sm col-span-2">{registration.paymentDate}</div>
                    </div>
                  )}
                  {registration.paymentMethod && (
                    <div className="grid grid-cols-3 gap-1">
                      <div className="text-sm font-medium">Metode Pembayaran</div>
                      <div className="text-sm col-span-2">{registration.paymentMethod}</div>
                    </div>
                  )}
                  <div className="grid grid-cols-3 gap-1">
                    <div className="text-sm font-medium">Status</div>
                    <div className="text-sm col-span-2">{getPaymentStatusBadge(registration.paymentStatus)}</div>
                  </div>
                  {registration.paymentStatus === "verified" && (
                    <>
                      <div className="grid grid-cols-3 gap-1">
                        <div className="text-sm font-medium">Diverifikasi Oleh</div>
                        <div className="text-sm col-span-2">{registration.paymentVerifiedBy}</div>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <div className="text-sm font-medium">Tanggal Verifikasi</div>
                        <div className="text-sm col-span-2">{registration.paymentVerifiedAt}</div>
                      </div>
                    </>
                  )}
                </CardContent>
                {registration.paymentStatus === "pending" && (
                  <CardFooter>
                    <Button onClick={handleVerifyPayment} disabled={isVerifyingPayment} className="w-full">
                      {isVerifyingPayment ? (
                        <>
                          <Clock className="mr-2 h-4 w-4 animate-spin" />
                          Memverifikasi...
                        </>
                      ) : (
                        <>
                          <CheckCheck className="mr-2 h-4 w-4" />
                          Verifikasi Pembayaran
                        </>
                      )}
                    </Button>
                  </CardFooter>
                )}
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    Bukti Pembayaran
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {registration.paymentProofUrl ? (
                    <div className="space-y-2">
                      <div className="border rounded-md overflow-hidden">
                        <img
                          src={registration.paymentProofUrl || "/placeholder.svg"}
                          alt="Bukti Pembayaran"
                          className="w-full h-auto object-contain"
                        />
                      </div>
                      <div className="flex justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(registration.paymentProofUrl, "_blank")}
                        >
                          Lihat Gambar Penuh
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-40 border rounded-md border-dashed">
                      <FileText className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Bukti pembayaran belum diunggah</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="action" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Tindakan</CardTitle>
                <CardDescription>Setujui atau tolak pendaftaran laboratorium ini</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {registration.status === "pending" ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="rejection-reason">Alasan Penolakan (jika ditolak)</Label>
                      <Textarea
                        id="rejection-reason"
                        placeholder="Masukkan alasan penolakan pendaftaran ini..."
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">
                        Alasan penolakan akan ditampilkan kepada mahasiswa
                      </p>
                    </div>

                    <div className="flex flex-col space-y-2">
                      <Button
                        onClick={handleApprove}
                        disabled={isProcessing || registration.paymentStatus !== "verified"}
                        className="w-full"
                      >
                        {isProcessing ? (
                          <>
                            <Clock className="mr-2 h-4 w-4 animate-spin" />
                            Memproses...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Setujui Pendaftaran
                          </>
                        )}
                      </Button>

                      <Button variant="destructive" onClick={handleReject} disabled={isProcessing} className="w-full">
                        {isProcessing ? (
                          <>
                            <Clock className="mr-2 h-4 w-4 animate-spin" />
                            Memproses...
                          </>
                        ) : (
                          <>
                            <XCircle className="mr-2 h-4 w-4" />
                            Tolak Pendaftaran
                          </>
                        )}
                      </Button>
                    </div>

                    {registration.paymentStatus !== "verified" && (
                      <div className="rounded-md bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-950/50 dark:text-amber-400">
                        <div className="flex items-center">
                          <AlertCircle className="h-4 w-4 mr-2" />
                          <p>Pembayaran harus diverifikasi sebelum pendaftaran dapat disetujui.</p>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="rounded-md bg-muted p-4">
                    <div className="flex items-center">
                      <p className="text-sm">
                        Pendaftaran ini sudah {registration.status === "approved" ? "disetujui" : "ditolak"}.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Tutup
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

