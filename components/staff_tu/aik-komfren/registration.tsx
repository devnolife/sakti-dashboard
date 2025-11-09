"use client"

import { useState } from "react"
import { Search, Filter, Download, CheckCircle, AlertCircle, Calendar, CreditCard, Mail, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "@/components/ui/use-toast"

// Mock data for registered students
const mockRegisteredStudents = [
  {
    id: "1",
    name: "Ahmad Fauzi",
    nim: "12345678",
    faculty: "Teknik Informatika",
    registrationDate: "2023-05-15",
    paymentStatus: "paid",
    paymentDate: "2023-05-16",
    paymentMethod: "Bank Transfer",
    paymentAmount: 50000,
    email: "ahmad.fauzi@example.com",
    phone: "081234567890",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Siti Nurhaliza",
    nim: "12345679",
    faculty: "Ekonomi",
    registrationDate: "2023-05-16",
    paymentStatus: "paid",
    paymentDate: "2023-05-17",
    paymentMethod: "Virtual Account",
    paymentAmount: 50000,
    email: "siti.nurhaliza@example.com",
    phone: "081234567891",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Budi Santoso",
    nim: "12345680",
    faculty: "Hukum",
    registrationDate: "2023-05-17",
    paymentStatus: "pending",
    paymentDate: "",
    paymentMethod: "",
    paymentAmount: 50000,
    email: "budi.santoso@example.com",
    phone: "081234567892",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "Dewi Kartika",
    nim: "12345681",
    faculty: "Kedokteran",
    registrationDate: "2023-05-18",
    paymentStatus: "paid",
    paymentDate: "2023-05-19",
    paymentMethod: "E-Wallet",
    paymentAmount: 50000,
    email: "dewi.kartika@example.com",
    phone: "081234567893",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    name: "Eko Prasetyo",
    nim: "12345682",
    faculty: "Teknik Sipil",
    registrationDate: "2023-05-19",
    paymentStatus: "paid",
    paymentDate: "2023-05-20",
    paymentMethod: "Bank Transfer",
    paymentAmount: 50000,
    email: "eko.prasetyo@example.com",
    phone: "081234567894",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "6",
    name: "Fitri Handayani",
    nim: "12345683",
    faculty: "Psikologi",
    registrationDate: "2023-05-20",
    paymentStatus: "paid",
    paymentDate: "2023-05-21",
    paymentMethod: "Virtual Account",
    paymentAmount: 50000,
    email: "fitri.handayani@example.com",
    phone: "081234567895",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "7",
    name: "Gunawan Wibisono",
    nim: "12345684",
    faculty: "Teknik Elektro",
    registrationDate: "2023-05-21",
    paymentStatus: "pending",
    paymentDate: "",
    paymentMethod: "",
    paymentAmount: 50000,
    email: "gunawan.wibisono@example.com",
    phone: "081234567896",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "8",
    name: "Hani Susanti",
    nim: "12345685",
    faculty: "Sastra Inggris",
    registrationDate: "2023-05-22",
    paymentStatus: "paid",
    paymentDate: "2023-05-23",
    paymentMethod: "E-Wallet",
    paymentAmount: 50000,
    email: "hani.susanti@example.com",
    phone: "081234567897",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "9",
    name: "Irfan Hakim",
    nim: "12345686",
    faculty: "Ilmu Komunikasi",
    registrationDate: "2023-05-23",
    paymentStatus: "paid",
    paymentDate: "2023-05-24",
    paymentMethod: "Bank Transfer",
    paymentAmount: 50000,
    email: "irfan.hakim@example.com",
    phone: "081234567898",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "10",
    name: "Joko Widodo",
    nim: "12345687",
    faculty: "Ilmu Politik",
    registrationDate: "2023-05-24",
    paymentStatus: "paid",
    paymentDate: "2023-05-25",
    paymentMethod: "Virtual Account",
    paymentAmount: 50000,
    email: "joko.widodo@example.com",
    phone: "081234567899",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
]

type RegisteredStudent = (typeof mockRegisteredStudents)[0]

export function AikKomfrenRegistration() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterFaculty, setFilterFaculty] = useState<string | null>(null)
  const [filterPaymentStatus, setFilterPaymentStatus] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("all")
  const [selectedStudent, setSelectedStudent] = useState<RegisteredStudent | null>(null)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)

  // Filter students based on search query and filters
  const filteredStudents = mockRegisteredStudents.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.nim.includes(searchQuery) ||
      student.faculty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.phone.includes(searchQuery)

    const matchesFaculty = !filterFaculty || student.faculty === filterFaculty
    const matchesPaymentStatus = !filterPaymentStatus || student.paymentStatus === filterPaymentStatus

    if (activeTab === "all") {
      return matchesSearch && matchesFaculty && matchesPaymentStatus
    } else if (activeTab === "paid") {
      return matchesSearch && matchesFaculty && student.paymentStatus === "paid"
    } else if (activeTab === "pending") {
      return matchesSearch && matchesFaculty && student.paymentStatus === "pending"
    }

    return false
  })

  // Get unique faculties for filter dropdown
  const faculties = Array.from(new Set(mockRegisteredStudents.map((student) => student.faculty)))

  // Handle view details
  const handleViewDetails = (student: RegisteredStudent) => {
    setSelectedStudent(student)
    setIsDetailsDialogOpen(true)
  }

  // Get payment status badge
  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50">
            Lunas
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="text-yellow-700 border-yellow-200 bg-yellow-50">
            Menunggu
          </Badge>
        )
      default:
        return <Badge variant="outline">Tidak Diketahui</Badge>
    }
  }

  // Handle export registrations
  const handleExportRegistrations = () => {
    toast({
      title: "Ekspor Dimulai",
      description: "Data pendaftaran sedang diekspor ke format Excel.",
    })
  }

  // Handle verify payment
  const handleVerifyPayment = (studentId: string) => {
    toast({
      title: "Pembayaran Terverifikasi",
      description: "Pembayaran mahasiswa telah berhasil diverifikasi.",
    })
  }

  // Calculate statistics
  const totalRegistrations = mockRegisteredStudents.length
  const paidRegistrations = mockRegisteredStudents.filter((student) => student.paymentStatus === "paid").length
  const pendingRegistrations = mockRegisteredStudents.filter((student) => student.paymentStatus === "pending").length
  const paymentRate = (paidRegistrations / totalRegistrations) * 100
  const totalRevenue = mockRegisteredStudents
    .filter((student) => student.paymentStatus === "paid")
    .reduce((sum, student) => sum + student.paymentAmount, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Pendaftaran AIK Komfren</h2>
          <p className="text-muted-foreground">Lihat dan kelola pendaftaran mahasiswa untuk ujian AIK Komfren.</p>
        </div>
        <Button className="flex items-center gap-2" onClick={handleExportRegistrations}>
          <Download className="w-4 h-4" />
          <span>Ekspor Pendaftaran</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Pendaftar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRegistrations}</div>
            <p className="mt-1 text-xs text-muted-foreground">Semua mahasiswa terdaftar</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tingkat Pembayaran</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{paymentRate.toFixed(1)}%</div>
            <p className="mt-1 text-xs text-muted-foreground">
              {paidRegistrations} lunas, {pendingRegistrations} menunggu
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Pendapatan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">Rp {totalRevenue.toLocaleString("id-ID")}</div>
            <p className="mt-1 text-xs text-muted-foreground">Dari pendaftaran yang lunas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pembayaran Menunggu</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{pendingRegistrations}</div>
            <p className="mt-1 text-xs text-muted-foreground">Menunggu verifikasi pembayaran</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Mahasiswa Terdaftar</CardTitle>
          <CardDescription>Lihat dan kelola mahasiswa yang terdaftar untuk ujian AIK Komfren.</CardDescription>
          <div className="flex flex-col gap-4 mt-2 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari berdasarkan nama, NIM, fakultas, email, atau telepon..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    <span>Filter</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuItem
                    onClick={() => {
                      setFilterFaculty(null)
                      setFilterPaymentStatus(null)
                    }}
                  >
                    Hapus Semua Filter
                  </DropdownMenuItem>
                  <DropdownMenuItem className="font-semibold">Fakultas</DropdownMenuItem>
                  {faculties.map((faculty) => (
                    <DropdownMenuItem key={faculty} onClick={() => setFilterFaculty(faculty)}>
                      {faculty}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuItem className="font-semibold">Status Pembayaran</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterPaymentStatus("paid")}>Lunas</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterPaymentStatus("pending")}>Menunggu</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline" onClick={handleExportRegistrations}>
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <Tabs defaultValue="all" className="mt-4" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">Semua Pendaftaran</TabsTrigger>
              <TabsTrigger value="paid">Lunas</TabsTrigger>
              <TabsTrigger value="pending">Menunggu</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <div className="grid grid-cols-12 gap-4 p-4 font-medium border-b bg-muted/50">
              <div className="col-span-4">Mahasiswa</div>
              <div className="col-span-2">Tanggal Daftar</div>
              <div className="col-span-2">Fakultas</div>
              <div className="col-span-2">Status Pembayaran</div>
              <div className="col-span-2 text-right">Aksi</div>
            </div>
            <ScrollArea className="h-[500px]">
              {filteredStudents.length === 0 ? (
                <div className="py-8 text-center">
                  <p className="text-muted-foreground">Tidak ada mahasiswa terdaftar ditemukan.</p>
                </div>
              ) : (
                filteredStudents.map((student) => (
                  <div key={student.id} className="grid items-center grid-cols-12 gap-4 p-4 border-b">
                    <div className="flex items-center col-span-4 gap-3">
                      <Avatar>
                        <AvatarImage src={student.avatarUrl} alt={student.name} />
                        <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-xs text-muted-foreground">{student.nim}</p>
                      </div>
                    </div>
                    <div className="flex items-center col-span-2 gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">
                        {new Date(student.registrationDate).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-sm">{student.faculty}</span>
                    </div>
                    <div className="col-span-2">{getPaymentStatusBadge(student.paymentStatus)}</div>
                    <div className="flex justify-end col-span-2 gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewDetails(student)}>
                        Lihat Detail
                      </Button>
                      {student.paymentStatus === "pending" && (
                        <Button size="sm" onClick={() => handleVerifyPayment(student.id)}>
                          Verifikasi Pembayaran
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </ScrollArea>
          </div>
        </CardContent>
      </Card>

      {/* Student Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedStudent && (
            <>
              <DialogHeader>
                <DialogTitle>Detail Pendaftaran Mahasiswa</DialogTitle>
                <DialogDescription>
                  Informasi lengkap tentang pendaftaran AIK Komfren mahasiswa.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={selectedStudent.avatarUrl} alt={selectedStudent.name} />
                    <AvatarFallback>{selectedStudent.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-medium">{selectedStudent.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedStudent.nim} - {selectedStudent.faculty}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      {getPaymentStatusBadge(selectedStudent.paymentStatus)}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Tanggal Pendaftaran</p>
                    <p className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      {new Date(selectedStudent.registrationDate).toLocaleDateString("id-ID", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Fakultas</p>
                    <p className="text-sm">{selectedStudent.faculty}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Email</p>
                    <p className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      {selectedStudent.email}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Telepon</p>
                    <p className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      {selectedStudent.phone}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="mb-2 text-sm font-medium">Informasi Pembayaran</h4>
                  <div className="p-4 border rounded-md bg-muted/50">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Status Pembayaran</p>
                        <p className="flex items-center gap-2 text-sm">
                          {selectedStudent.paymentStatus === "paid" ? (
                            <>
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span className="font-medium text-green-600">Lunas</span>
                            </>
                          ) : (
                            <>
                              <AlertCircle className="w-4 h-4 text-yellow-600" />
                              <span className="font-medium text-yellow-600">Menunggu</span>
                            </>
                          )}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Jumlah</p>
                        <p className="flex items-center gap-2 text-sm">
                          <CreditCard className="w-4 h-4 text-muted-foreground" />
                          Rp {selectedStudent.paymentAmount.toLocaleString("id-ID")}
                        </p>
                      </div>
                    </div>

                    {selectedStudent.paymentStatus === "paid" && (
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Tanggal Pembayaran</p>
                          <p className="text-sm">
                            {new Date(selectedStudent.paymentDate).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Metode Pembayaran</p>
                          <p className="text-sm">{selectedStudent.paymentMethod}</p>
                        </div>
                      </div>
                    )}

                    {selectedStudent.paymentStatus === "pending" && (
                      <div className="mt-4">
                        <Button
                          className="w-full"
                          onClick={() => {
                            handleVerifyPayment(selectedStudent.id)
                            setIsDetailsDialogOpen(false)
                          }}
                        >
                          Verifikasi Pembayaran
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDetailsDialogOpen(false)}>
                  Tutup
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

