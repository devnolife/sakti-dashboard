"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye } from "lucide-react"

interface StudentPaymentListProps {
  programId: string
  paymentType: string
  searchQuery: string
  onSelectStudent: (studentId: string) => void
}

// Mock data for student payments
const mockStudentPayments = [
  {
    id: "1",
    name: "Ahmad Fauzi",
    nim: "1234567890",
    program: "civil",
    avatar: "/placeholder.svg?height=40&width=40",
    paymentType: "laboratory",
    amount: "Rp 750,000",
    status: "completed",
    date: "15 Feb 2024",
  },
  {
    id: "2",
    name: "Budi Santoso",
    nim: "2345678901",
    program: "electrical",
    avatar: "/placeholder.svg?height=40&width=40",
    paymentType: "examination",
    amount: "Rp 500,000",
    status: "completed",
    date: "14 Feb 2024",
  },
  {
    id: "3",
    name: "Citra Dewi",
    nim: "3456789012",
    program: "architecture",
    avatar: "/placeholder.svg?height=40&width=40",
    paymentType: "laboratory",
    amount: "Rp 850,000",
    status: "pending",
    date: "13 Feb 2024",
  },
  {
    id: "4",
    name: "Dian Purnama",
    nim: "4567890123",
    program: "informatics",
    avatar: "/placeholder.svg?height=40&width=40",
    paymentType: "examination",
    amount: "Rp 500,000",
    status: "completed",
    date: "12 Feb 2024",
  },
  {
    id: "5",
    name: "Eko Prasetyo",
    nim: "5678901234",
    program: "urban",
    avatar: "/placeholder.svg?height=40&width=40",
    paymentType: "laboratory",
    amount: "Rp 750,000",
    status: "failed",
    date: "11 Feb 2024",
  },
  {
    id: "6",
    name: "Fitri Handayani",
    nim: "6789012345",
    program: "civil",
    avatar: "/placeholder.svg?height=40&width=40",
    paymentType: "examination",
    amount: "Rp 500,000",
    status: "pending",
    date: "10 Feb 2024",
  },
  {
    id: "7",
    name: "Gunawan Wibowo",
    nim: "7890123456",
    program: "electrical",
    avatar: "/placeholder.svg?height=40&width=40",
    paymentType: "laboratory",
    amount: "Rp 750,000",
    status: "completed",
    date: "09 Feb 2024",
  },
  {
    id: "8",
    name: "Hani Susanti",
    nim: "8901234567",
    program: "architecture",
    avatar: "/placeholder.svg?height=40&width=40",
    paymentType: "examination",
    amount: "Rp 500,000",
    status: "completed",
    date: "08 Feb 2024",
  },
  {
    id: "9",
    name: "Irfan Hakim",
    nim: "9012345678",
    program: "informatics",
    avatar: "/placeholder.svg?height=40&width=40",
    paymentType: "laboratory",
    amount: "Rp 850,000",
    status: "completed",
    date: "07 Feb 2024",
  },
  {
    id: "10",
    name: "Joko Widodo",
    nim: "0123456789",
    program: "urban",
    avatar: "/placeholder.svg?height=40&width=40",
    paymentType: "examination",
    amount: "Rp 500,000",
    status: "completed",
    date: "06 Feb 2024",
  },
]

export function StudentPaymentList({ programId, paymentType, searchQuery, onSelectStudent }: StudentPaymentListProps) {
  // Filter students based on programId, paymentType, and searchQuery
  const filteredStudents = mockStudentPayments.filter((student) => {
    const programMatch = programId === "all" || student.program === programId
    const paymentTypeMatch = paymentType === "all" || student.paymentType === paymentType
    const searchMatch =
      searchQuery === "" ||
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.nim.includes(searchQuery)

    return programMatch && paymentTypeMatch && searchMatch
  })

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
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Mahasiswa</TableHead>
            <TableHead>Jenis Pembayaran</TableHead>
            <TableHead>Jumlah</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Tanggal</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredStudents.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                Tidak ada data pembayaran yang ditemukan.
              </TableCell>
            </TableRow>
          ) : (
            filteredStudents.map((student) => (
              <TableRow key={student.id} className="group hover:bg-muted/50">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={student.avatar} alt={student.name} />
                      <AvatarFallback>{student.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-muted-foreground">{student.nim}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{student.paymentType === "laboratory" ? "Laboratorium" : "Ujian"}</TableCell>
                <TableCell>{student.amount}</TableCell>
                <TableCell>{getStatusBadge(student.status)}</TableCell>
                <TableCell>{student.date}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onSelectStudent(student.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Detail
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

