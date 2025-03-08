"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Download, Printer } from "lucide-react"

interface PaymentDetailViewProps {
  studentId: string
  programId: string
  paymentType: string
  onBack: () => void
}

// Mock data for student details
const mockStudentDetails = {
  id: "1",
  name: "Ahmad Fauzi",
  nim: "1234567890",
  program: "civil",
  programName: "Teknik Sipil - Irigasi",
  avatar: "/placeholder.svg?height=80&width=80",
  email: "ahmad.fauzi@student.university.ac.id",
  phone: "+62 812-3456-7890",
  semester: 6,
  academicYear: "2023/2024",
  gpa: 3.75,
  advisor: "Dr. Bambang Suryanto",
  status: "Aktif",
}

// Mock data for payment history
const mockPaymentHistory = [
  {
    id: "pay-001",
    type: "laboratory",
    description: "Laboratorium Struktur",
    amount: "Rp 750,000",
    status: "completed",
    date: "15 Feb 2024",
    receiptNumber: "REC-2024-001",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "pay-002",
    type: "examination",
    description: "Ujian Tengah Semester",
    amount: "Rp 500,000",
    status: "completed",
    date: "10 Jan 2024",
    receiptNumber: "REC-2024-002",
    paymentMethod: "Virtual Account",
  },
  {
    id: "pay-003",
    type: "laboratory",
    description: "Laboratorium Hidrolika",
    amount: "Rp 850,000",
    status: "completed",
    date: "05 Dec 2023",
    receiptNumber: "REC-2023-003",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "pay-004",
    type: "examination",
    description: "Ujian Akhir Semester",
    amount: "Rp 500,000",
    status: "pending",
    date: "20 Mar 2024",
    receiptNumber: "-",
    paymentMethod: "-",
  },
]

export function PaymentDetailView({ studentId, programId, paymentType, onBack }: PaymentDetailViewProps) {
  // In a real app, you would fetch the student details and payment history based on the studentId
  const student = mockStudentDetails

  // Filter payment history based on paymentType
  const filteredPaymentHistory =
    paymentType === "all" ? mockPaymentHistory : mockPaymentHistory.filter((payment) => payment.type === paymentType)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-200">
            Selesai
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-200">
            Tertunda
          </Badge>
        )
      case "failed":
        return (
          <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-200">
            Gagal
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali
        </Button>
        <h3 className="text-2xl font-bold tracking-tight">Detail Pembayaran Mahasiswa</h3>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Profil Mahasiswa</CardTitle>
            <CardDescription>Informasi detail mahasiswa</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={student.avatar} alt={student.name} />
              <AvatarFallback>{student.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-bold">{student.name}</h3>
            <p className="text-muted-foreground">{student.nim}</p>
            <Badge className="mt-2">{student.status}</Badge>

            <div className="w-full mt-6 space-y-2">
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Program Studi</span>
                <span className="font-medium">{student.programName}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Semester</span>
                <span className="font-medium">{student.semester}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Tahun Akademik</span>
                <span className="font-medium">{student.academicYear}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">IPK</span>
                <span className="font-medium">{student.gpa}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Dosen PA</span>
                <span className="font-medium">{student.advisor}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <div className="flex items-center gap-2 w-full">
              <div className="w-5 flex-shrink-0">📧</div>
              <span className="text-sm truncate">{student.email}</span>
            </div>
            <div className="flex items-center gap-2 w-full">
              <div className="w-5 flex-shrink-0">📱</div>
              <span className="text-sm">{student.phone}</span>
            </div>
          </CardFooter>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Riwayat Pembayaran</CardTitle>
                <CardDescription>Riwayat pembayaran laboratorium dan ujian</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="hidden md:flex">
                  <Printer className="mr-2 h-4 w-4" />
                  Cetak
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Unduh
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">Semua</TabsTrigger>
                <TabsTrigger value="laboratory">Laboratorium</TabsTrigger>
                <TabsTrigger value="examination">Ujian</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <PaymentHistoryTable payments={mockPaymentHistory} getStatusBadge={getStatusBadge} />
              </TabsContent>

              <TabsContent value="laboratory">
                <PaymentHistoryTable
                  payments={mockPaymentHistory.filter((p) => p.type === "laboratory")}
                  getStatusBadge={getStatusBadge}
                />
              </TabsContent>

              <TabsContent value="examination">
                <PaymentHistoryTable
                  payments={mockPaymentHistory.filter((p) => p.type === "examination")}
                  getStatusBadge={getStatusBadge}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

interface PaymentHistoryTableProps {
  payments: typeof mockPaymentHistory
  getStatusBadge: (status: string) => React.ReactNode
}

function PaymentHistoryTable({ payments, getStatusBadge }: PaymentHistoryTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Deskripsi</TableHead>
            <TableHead>Jumlah</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Tanggal</TableHead>
            <TableHead>No. Kwitansi</TableHead>
            <TableHead>Metode</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                Tidak ada data pembayaran yang ditemukan.
              </TableCell>
            </TableRow>
          ) : (
            payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{payment.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {payment.type === "laboratory" ? "Laboratorium" : "Ujian"}
                    </p>
                  </div>
                </TableCell>
                <TableCell>{payment.amount}</TableCell>
                <TableCell>{getStatusBadge(payment.status)}</TableCell>
                <TableCell>{payment.date}</TableCell>
                <TableCell>{payment.receiptNumber}</TableCell>
                <TableCell>{payment.paymentMethod}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

