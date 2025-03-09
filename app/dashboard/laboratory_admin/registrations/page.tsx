"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Search, XCircle, Filter, CreditCard, Eye } from "lucide-react"
import {
  RegistrationDetailDialog,
  type LabRegistration,
} from "@/components/laboratory/admin/registration-detail-dialog"

export default function LabRegistrationsPage() {
  const [selectedRegistration, setSelectedRegistration] = useState<LabRegistration | null>(null)
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterPayment, setFilterPayment] = useState<string>("all")

  // Sample data for lab registrations
  const registrations: LabRegistration[] = [
    {
      id: "reg-001",
      studentName: "Budi Santoso",
      studentId: "12345678",
      studentMajor: "Informatika",
      studentSemester: 4,
      labName: "Lab Database",
      courseName: "Praktikum Basis Data",
      schedule: "Senin, 08:00 - 10:00",
      scheduleDate: "20 Maret 2023",
      applicationDate: "18 Maret 2023",
      status: "pending",
      paymentStatus: "verified",
      paymentAmount: 150000,
      paymentDate: "18 Maret 2023",
      paymentMethod: "Bank Transfer",
      paymentProofUrl: "/placeholder.svg?height=400&width=300",
      paymentVerifiedBy: "Admin Laboratorium",
      paymentVerifiedAt: "19 Maret 2023",
    },
    {
      id: "reg-002",
      studentName: "Siti Rahma",
      studentId: "23456789",
      studentMajor: "Informatika",
      studentSemester: 4,
      labName: "Lab Networking",
      courseName: "Praktikum Jaringan Komputer",
      schedule: "Selasa, 09:00 - 11:00",
      scheduleDate: "21 Maret 2023",
      applicationDate: "18 Maret 2023",
      status: "pending",
      paymentStatus: "pending",
      paymentAmount: 150000,
      paymentDate: "18 Maret 2023",
      paymentMethod: "Bank Transfer",
      paymentProofUrl: "/placeholder.svg?height=400&width=300",
    },
    {
      id: "reg-003",
      studentName: "Ahmad Fauzi",
      studentId: "34567890",
      studentMajor: "Sistem Informasi",
      studentSemester: 6,
      labName: "Lab Programming",
      courseName: "Praktikum Pemrograman Web",
      schedule: "Rabu, 10:00 - 12:00",
      scheduleDate: "22 Maret 2023",
      applicationDate: "17 Maret 2023",
      status: "approved",
      paymentStatus: "verified",
      paymentAmount: 150000,
      paymentDate: "17 Maret 2023",
      paymentMethod: "E-Wallet",
      paymentProofUrl: "/placeholder.svg?height=400&width=300",
      paymentVerifiedBy: "Admin Laboratorium",
      paymentVerifiedAt: "17 Maret 2023",
    },
    {
      id: "reg-004",
      studentName: "Dewi Anggraini",
      studentId: "45678901",
      studentMajor: "Sistem Informasi",
      studentSemester: 4,
      labName: "Lab Multimedia",
      courseName: "Praktikum Desain Grafis",
      schedule: "Kamis, 13:00 - 15:00",
      scheduleDate: "23 Maret 2023",
      applicationDate: "16 Maret 2023",
      status: "rejected",
      paymentStatus: "verified",
      paymentAmount: 150000,
      paymentDate: "16 Maret 2023",
      paymentMethod: "Bank Transfer",
      paymentProofUrl: "/placeholder.svg?height=400&width=300",
      paymentVerifiedBy: "Admin Laboratorium",
      paymentVerifiedAt: "16 Maret 2023",
      rejectionReason: "Jadwal bentrok dengan kelas lain",
    },
    {
      id: "reg-005",
      studentName: "Rudi Hartono",
      studentId: "56789012",
      studentMajor: "Informatika",
      studentSemester: 2,
      labName: "Lab IoT",
      courseName: "Praktikum Internet of Things",
      schedule: "Jumat, 08:00 - 10:00",
      scheduleDate: "24 Maret 2023",
      applicationDate: "15 Maret 2023",
      status: "pending",
      paymentStatus: "unverified",
      paymentAmount: 175000,
      paymentProofUrl: "/placeholder.svg?height=400&width=300",
    },
  ]

  const handleOpenDetail = (registration: LabRegistration) => {
    setSelectedRegistration(registration)
    setDetailDialogOpen(true)
  }

  const filteredRegistrations = registrations.filter((reg) => {
    if (filterStatus !== "all" && reg.status !== filterStatus) return false
    if (filterPayment !== "all" && reg.paymentStatus !== filterPayment) return false
    return true
  })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500">
            Pendaftaran Laboratorium
          </span>
        </h2>
        <p className="text-muted-foreground mt-2">Kelola pendaftaran praktikum dan penggunaan laboratorium.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Pendaftaran</CardTitle>
          <CardDescription>Pendaftaran praktikum dan penggunaan laboratorium</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari berdasarkan nama atau NIM..."
                className="w-full pl-8 rounded-full border-primary/20 focus-visible:ring-primary"
              />
            </div>
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              <div className="flex items-center gap-1 bg-muted/50 rounded-full p-1 pr-3">
                <Filter className="h-4 w-4 ml-2 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Status:</span>
                <div className="flex gap-1">
                  <Button
                    variant={filterStatus === "all" ? "default" : "outline"}
                    size="sm"
                    className="rounded-full text-xs h-7"
                    onClick={() => setFilterStatus("all")}
                  >
                    Semua
                  </Button>
                  <Button
                    variant={filterStatus === "pending" ? "default" : "outline"}
                    size="sm"
                    className="rounded-full text-xs h-7"
                    onClick={() => setFilterStatus("pending")}
                  >
                    Menunggu
                  </Button>
                  <Button
                    variant={filterStatus === "approved" ? "default" : "outline"}
                    size="sm"
                    className="rounded-full text-xs h-7"
                    onClick={() => setFilterStatus("approved")}
                  >
                    Disetujui
                  </Button>
                  <Button
                    variant={filterStatus === "rejected" ? "default" : "outline"}
                    size="sm"
                    className="rounded-full text-xs h-7"
                    onClick={() => setFilterStatus("rejected")}
                  >
                    Ditolak
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-1 bg-muted/50 rounded-full p-1 pr-3">
                <CreditCard className="h-4 w-4 ml-2 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Pembayaran:</span>
                <div className="flex gap-1">
                  <Button
                    variant={filterPayment === "all" ? "default" : "outline"}
                    size="sm"
                    className="rounded-full text-xs h-7"
                    onClick={() => setFilterPayment("all")}
                  >
                    Semua
                  </Button>
                  <Button
                    variant={filterPayment === "pending" ? "default" : "outline"}
                    size="sm"
                    className="rounded-full text-xs h-7"
                    onClick={() => setFilterPayment("pending")}
                  >
                    Menunggu
                  </Button>
                  <Button
                    variant={filterPayment === "verified" ? "default" : "outline"}
                    size="sm"
                    className="rounded-full text-xs h-7"
                    onClick={() => setFilterPayment("verified")}
                  >
                    Terverifikasi
                  </Button>
                  <Button
                    variant={filterPayment === "unverified" ? "default" : "outline"}
                    size="sm"
                    className="rounded-full text-xs h-7"
                    onClick={() => setFilterPayment("unverified")}
                  >
                    Tidak Terverifikasi
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mahasiswa</TableHead>
                  <TableHead>Laboratorium</TableHead>
                  <TableHead>Jadwal</TableHead>
                  <TableHead>Tanggal Pengajuan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Pembayaran</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRegistrations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      Tidak ada data pendaftaran yang sesuai dengan filter
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRegistrations.map((registration) => (
                    <TableRow key={registration.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{registration.studentName}</p>
                          <p className="text-xs text-muted-foreground">NIM: {registration.studentId}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{registration.labName}</p>
                          <p className="text-xs text-muted-foreground">{registration.courseName}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{registration.schedule}</p>
                          <p className="text-xs text-muted-foreground">{registration.scheduleDate}</p>
                        </div>
                      </TableCell>
                      <TableCell>{registration.applicationDate}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            registration.status === "approved"
                              ? "bg-green-500/10 text-green-500 hover:bg-green-500/20"
                              : registration.status === "rejected"
                                ? "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                                : "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
                          }
                        >
                          {registration.status === "approved"
                            ? "Disetujui"
                            : registration.status === "rejected"
                              ? "Ditolak"
                              : "Menunggu Persetujuan"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            registration.paymentStatus === "verified"
                              ? "bg-green-500/10 text-green-500 hover:bg-green-500/20"
                              : registration.paymentStatus === "unverified"
                                ? "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                                : "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
                          }
                        >
                          {registration.paymentStatus === "verified"
                            ? "Terverifikasi"
                            : registration.paymentStatus === "unverified"
                              ? "Tidak Terverifikasi"
                              : "Menunggu Verifikasi"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleOpenDetail(registration)}>
                            <Eye className="h-4 w-4 mr-1" />
                            Detail
                          </Button>
                          {registration.status === "pending" && (
                            <>
                              <Button variant="outline" size="sm" disabled={registration.paymentStatus !== "verified"}>
                                <XCircle className="h-4 w-4 mr-1" />
                                Tolak
                              </Button>
                              <Button size="sm" disabled={registration.paymentStatus !== "verified"}>
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Setujui
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Menampilkan {filteredRegistrations.length} dari {registrations.length} pendaftaran
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Sebelumnya
              </Button>
              <Button variant="outline" size="sm" className="w-8 p-0">
                1
              </Button>
              <Button variant="outline" size="sm">
                Selanjutnya
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <RegistrationDetailDialog
        open={detailDialogOpen}
        onOpenChange={setDetailDialogOpen}
        registration={selectedRegistration}
      />
    </div>
  )
}

