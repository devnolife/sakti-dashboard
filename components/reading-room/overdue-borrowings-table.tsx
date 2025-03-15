"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle, Bell, Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"

const overdueBorrowings = [
  {
    id: "BRW006",
    studentName: "Rini Susanti",
    studentId: "2019107056",
    bookTitle: "Rekayasa Perangkat Lunak",
    borrowDate: "2023-05-20",
    dueDate: "2023-06-03",
    daysOverdue: 12,
  },
  {
    id: "BRW007",
    studentName: "Doni Pratama",
    studentId: "2020108034",
    bookTitle: "Pemrograman Web",
    borrowDate: "2023-05-22",
    dueDate: "2023-06-05",
    daysOverdue: 10,
  },
  {
    id: "BRW008",
    studentName: "Lia Anggraini",
    studentId: "2021109012",
    bookTitle: "Struktur Data",
    borrowDate: "2023-05-25",
    dueDate: "2023-06-08",
    daysOverdue: 7,
  },
  {
    id: "BRW009",
    studentName: "Hadi Nugroho",
    studentId: "2020110045",
    bookTitle: "Interaksi Manusia dan Komputer",
    borrowDate: "2023-05-28",
    dueDate: "2023-06-11",
    daysOverdue: 4,
  },
  {
    id: "BRW010",
    studentName: "Maya Sari",
    studentId: "2019111078",
    bookTitle: "Keamanan Jaringan",
    borrowDate: "2023-05-30",
    dueDate: "2023-06-13",
    daysOverdue: 2,
  },
]

export function OverdueBorrowingsTable() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredBorrowings = overdueBorrowings.filter(
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

  const handleRemind = (id: string, studentName: string) => {
    toast({
      title: "Pengingat terkirim",
      description: `Pengingat telah dikirim ke ${studentName}`,
    })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <div>
            <CardTitle>Peminjaman Terlambat</CardTitle>
            <CardDescription>Daftar peminjaman buku yang melewati batas waktu pengembalian.</CardDescription>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari keterlambatan..."
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
                <DropdownMenuItem>Semua Keterlambatan</DropdownMenuItem>
                <DropdownMenuItem>1-7 Hari</DropdownMenuItem>
                <DropdownMenuItem>8-14 Hari</DropdownMenuItem>
                <DropdownMenuItem>&gt; 14 Hari</DropdownMenuItem>
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
                <TableHead className="hidden sm:table-cell">Jatuh Tempo</TableHead>
                <TableHead>Keterlambatan</TableHead>
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
                    <TableCell className="hidden sm:table-cell">{borrowing.dueDate}</TableCell>
                    <TableCell>
                      <Badge variant="destructive" className="gap-1">
                        <AlertCircle className="h-3 w-3" />
                        <span>{borrowing.daysOverdue} hari</span>
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 gap-1"
                          onClick={() => handleRemind(borrowing.id, borrowing.studentName)}
                        >
                          <Bell className="h-4 w-4" />
                          <span className="hidden sm:inline">Ingatkan</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 gap-1"
                          onClick={() => handleReturn(borrowing.id)}
                        >
                          <CheckCircle className="h-4 w-4" />
                          <span className="hidden sm:inline">Kembalikan</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    Tidak ada data keterlambatan yang sesuai dengan pencarian
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

