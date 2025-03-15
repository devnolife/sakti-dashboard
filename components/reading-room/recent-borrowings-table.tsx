"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle, Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"

const recentBorrowings = [
  {
    id: "BRW001",
    studentName: "Ahmad Fauzi",
    studentId: "2019102001",
    bookTitle: "Algoritma dan Pemrograman",
    borrowDate: "2023-06-15",
    dueDate: "2023-06-29",
    status: "active",
  },
  {
    id: "BRW002",
    studentName: "Siti Nurhaliza",
    studentId: "2020103045",
    bookTitle: "Basis Data Lanjut",
    borrowDate: "2023-06-14",
    dueDate: "2023-06-28",
    status: "active",
  },
  {
    id: "BRW003",
    studentName: "Budi Santoso",
    studentId: "2021104078",
    bookTitle: "Jaringan Komputer",
    borrowDate: "2023-06-13",
    dueDate: "2023-06-27",
    status: "active",
  },
  {
    id: "BRW004",
    studentName: "Dewi Lestari",
    studentId: "2020105023",
    bookTitle: "Kecerdasan Buatan",
    borrowDate: "2023-06-12",
    dueDate: "2023-06-26",
    status: "active",
  },
  {
    id: "BRW005",
    studentName: "Eko Prasetyo",
    studentId: "2019106089",
    bookTitle: "Sistem Operasi",
    borrowDate: "2023-06-11",
    dueDate: "2023-06-25",
    status: "active",
  },
]

export function RecentBorrowingsTable() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredBorrowings = recentBorrowings.filter(
    (borrowing) =>
      borrowing.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      borrowing.bookTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      borrowing.studentId.includes(searchQuery),
  )

  const handleReturn = (id: string) => {
    toast({
      title: "Buku dikembalikan",
      description: `Peminjaman dengan ID ${id} telah ditandai sebagai dikembalikan`,
    })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <div>
            <CardTitle>Peminjaman Terbaru</CardTitle>
            <CardDescription>Daftar peminjaman buku terbaru dalam 7 hari terakhir.</CardDescription>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari peminjaman..."
                className="pl-8 w-full sm:w-[200px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Filter className="h-4 w-4" />
                  <span className="sr-only">Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Semua Peminjaman</DropdownMenuItem>
                <DropdownMenuItem>Hari Ini</DropdownMenuItem>
                <DropdownMenuItem>Minggu Ini</DropdownMenuItem>
                <DropdownMenuItem>Bulan Ini</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mahasiswa</TableHead>
                <TableHead className="hidden md:table-cell">Buku</TableHead>
                <TableHead className="hidden sm:table-cell">Tanggal Pinjam</TableHead>
                <TableHead>Jatuh Tempo</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBorrowings.length > 0 ? (
                filteredBorrowings.map((borrowing) => (
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
                    <TableCell className="hidden md:table-cell max-w-[200px] truncate" title={borrowing.bookTitle}>
                      {borrowing.bookTitle}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">{borrowing.borrowDate}</TableCell>
                    <TableCell>{borrowing.dueDate}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 gap-1"
                        onClick={() => handleReturn(borrowing.id)}
                      >
                        <CheckCircle className="h-4 w-4" />
                        <span className="hidden sm:inline">Kembalikan</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    Tidak ada data peminjaman yang sesuai dengan pencarian
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

