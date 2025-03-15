"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckCircle, Search, Filter, AlertCircle, Clock } from "lucide-react"
import { BorrowingDetailsDialog } from "./borrowing-details-dialog"

const activeBorrowings = [
  {
    id: "BRW001",
    studentName: "Ahmad Fauzi",
    studentId: "2019102001",
    bookTitle: "Algoritma dan Pemrograman",
    bookId: "BK001",
    borrowDate: "2023-06-15",
    dueDate: "2023-06-29",
    status: "active",
    department: "Teknik Informatika",
    bookCover: "/placeholder.svg?height=400&width=300",
    isOverdue: false,
    daysRemaining: 14,
  },
  {
    id: "BRW002",
    studentName: "Siti Nurhaliza",
    studentId: "2020103045",
    bookTitle: "Basis Data Lanjut",
    bookId: "BK002",
    borrowDate: "2023-06-14",
    dueDate: "2023-06-28",
    status: "active",
    department: "Sistem Informasi",
    bookCover: "/placeholder.svg?height=400&width=300",
    isOverdue: false,
    daysRemaining: 13,
  },
  {
    id: "BRW003",
    studentName: "Budi Santoso",
    studentId: "2021104078",
    bookTitle: "Jaringan Komputer",
    bookId: "BK003",
    borrowDate: "2023-06-13",
    dueDate: "2023-06-27",
    status: "active",
    department: "Teknik Informatika",
    bookCover: "/placeholder.svg?height=400&width=300",
    isOverdue: false,
    daysRemaining: 12,
  },
  {
    id: "BRW004",
    studentName: "Dewi Lestari",
    studentId: "2020105023",
    bookTitle: "Kecerdasan Buatan",
    bookId: "BK004",
    borrowDate: "2023-06-12",
    dueDate: "2023-06-26",
    status: "active",
    department: "Teknik Informatika",
    bookCover: "/placeholder.svg?height=400&width=300",
    isOverdue: false,
    daysRemaining: 11,
  },
  {
    id: "BRW005",
    studentName: "Eko Prasetyo",
    studentId: "2019106089",
    bookTitle: "Sistem Operasi",
    bookId: "BK005",
    borrowDate: "2023-06-11",
    dueDate: "2023-06-25",
    status: "active",
    department: "Teknik Informatika",
    bookCover: "/placeholder.svg?height=400&width=300",
    isOverdue: false,
    daysRemaining: 10,
  },
  {
    id: "BRW006",
    studentName: "Rini Susanti",
    studentId: "2019107056",
    bookTitle: "Rekayasa Perangkat Lunak",
    bookId: "BK006",
    borrowDate: "2023-05-20",
    dueDate: "2023-06-03",
    status: "overdue",
    department: "Teknik Informatika",
    bookCover: "/placeholder.svg?height=400&width=300",
    isOverdue: true,
    daysRemaining: -12,
  },
  {
    id: "BRW007",
    studentName: "Doni Pratama",
    studentId: "2020108034",
    bookTitle: "Pemrograman Web",
    bookId: "BK007",
    borrowDate: "2023-05-22",
    dueDate: "2023-06-05",
    status: "overdue",
    department: "Sistem Informasi",
    bookCover: "/placeholder.svg?height=400&width=300",
    isOverdue: true,
    daysRemaining: -10,
  },
]

export function ActiveBorrowingsList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBorrowing, setSelectedBorrowing] = useState<(typeof activeBorrowings)[0] | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  const filteredBorrowings = activeBorrowings.filter(
    (borrowing) =>
      borrowing.bookTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      borrowing.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      borrowing.studentId.includes(searchQuery) ||
      borrowing.bookId.includes(searchQuery),
  )

  const handleViewDetails = (borrowing: (typeof activeBorrowings)[0]) => {
    setSelectedBorrowing(borrowing)
    setShowDetails(true)
  }

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-3xl font-bold tracking-tight">Peminjaman Aktif</h1>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Peminjaman</CardTitle>
          <CardDescription>Kelola peminjaman buku yang sedang aktif.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari buku, mahasiswa, atau ID..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mahasiswa</TableHead>
                <TableHead>Buku</TableHead>
                <TableHead>Tanggal Pinjam</TableHead>
                <TableHead>Jatuh Tempo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBorrowings.map((borrowing) => (
                <TableRow key={borrowing.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={borrowing.studentName} />
                        <AvatarFallback>{borrowing.studentName.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium">{borrowing.studentName}</span>
                        <span className="text-xs text-muted-foreground">{borrowing.studentId}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{borrowing.bookTitle}</div>
                    <div className="text-xs text-muted-foreground">ID: {borrowing.bookId}</div>
                  </TableCell>
                  <TableCell>{borrowing.borrowDate}</TableCell>
                  <TableCell>{borrowing.dueDate}</TableCell>
                  <TableCell>
                    {borrowing.isOverdue ? (
                      <Badge variant="destructive" className="gap-1">
                        <AlertCircle className="h-3 w-3" />
                        <span>Terlambat {Math.abs(borrowing.daysRemaining)} hari</span>
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{borrowing.daysRemaining} hari lagi</span>
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="h-8" onClick={() => handleViewDetails(borrowing)}>
                        Detail
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 gap-1">
                        <CheckCircle className="h-4 w-4" />
                        <span>Kembalikan</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedBorrowing && (
        <BorrowingDetailsDialog borrowing={selectedBorrowing} open={showDetails} onOpenChange={setShowDetails} />
      )}
    </div>
  )
}

