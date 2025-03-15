"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash, MoreVertical, Plus, Search, BookOpen, Filter } from "lucide-react"
import { BookDetailsDialog } from "./book-details-dialog"

const books = [
  {
    id: "BK001",
    title: "Algoritma dan Pemrograman",
    author: "Dr. Budi Raharjo",
    publisher: "Penerbit Informatika",
    publishedYear: 2019,
    isbn: "978-602-1514-50-1",
    category: "computer-science",
    location: "Rak A-12",
    availableCopies: 3,
    totalCopies: 5,
    isAvailable: true,
    coverImage: "/placeholder.svg?height=400&width=300",
    description: "Buku ini membahas dasar-dasar algoritma dan pemrograman dengan bahasa C++.",
  },
  {
    id: "BK002",
    title: "Basis Data Lanjut",
    author: "Prof. Edi Winarko",
    publisher: "Penerbit Andi",
    publishedYear: 2020,
    isbn: "978-623-0116-22-3",
    category: "database",
    location: "Rak B-05",
    availableCopies: 0,
    totalCopies: 3,
    isAvailable: false,
    coverImage: "/placeholder.svg?height=400&width=300",
    description: "Buku ini membahas konsep dan implementasi basis data lanjut termasuk NoSQL dan Big Data.",
  },
  {
    id: "BK003",
    title: "Jaringan Komputer",
    author: "Ir. Hendra Wijaya",
    publisher: "Elex Media Komputindo",
    publishedYear: 2018,
    isbn: "978-602-0453-11-7",
    category: "networking",
    location: "Rak A-08",
    availableCopies: 2,
    totalCopies: 4,
    isAvailable: true,
    coverImage: "/placeholder.svg?height=400&width=300",
    description: "Buku ini membahas dasar-dasar jaringan komputer dan implementasinya.",
  },
  {
    id: "BK004",
    title: "Kecerdasan Buatan",
    author: "Dr. Suyanto",
    publisher: "Penerbit Informatika",
    publishedYear: 2021,
    isbn: "978-602-1514-85-3",
    category: "artificial-intelligence",
    location: "Rak C-02",
    availableCopies: 1,
    totalCopies: 3,
    isAvailable: true,
    coverImage: "/placeholder.svg?height=400&width=300",
    description: "Buku ini membahas konsep dan implementasi kecerdasan buatan dan machine learning.",
  },
  {
    id: "BK005",
    title: "Sistem Operasi",
    author: "Dr. Riri Fitri Sari",
    publisher: "Penerbit Salemba",
    publishedYear: 2017,
    isbn: "978-979-0691-23-5",
    category: "operating-system",
    location: "Rak B-10",
    availableCopies: 0,
    totalCopies: 2,
    isAvailable: false,
    coverImage: "/placeholder.svg?height=400&width=300",
    description: "Buku ini membahas konsep dan implementasi sistem operasi modern.",
  },
]

export function BookList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBook, setSelectedBook] = useState<(typeof books)[0] | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.isbn.includes(searchQuery),
  )

  const handleViewDetails = (book: (typeof books)[0]) => {
    setSelectedBook(book)
    setShowDetails(true)
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Daftar Buku</h1>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          <span>Tambah Buku</span>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Koleksi Buku</CardTitle>
          <CardDescription>Kelola semua buku yang tersedia di ruang baca.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari judul, penulis, atau ISBN..."
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
                <TableHead>Judul</TableHead>
                <TableHead>Penulis</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Lokasi</TableHead>
                <TableHead>Ketersediaan</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBooks.map((book) => (
                <TableRow key={book.id}>
                  <TableCell>
                    <div className="font-medium">{book.title}</div>
                    <div className="text-xs text-muted-foreground">ISBN: {book.isbn}</div>
                  </TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {book.category.replace("-", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>{book.location}</TableCell>
                  <TableCell>
                    <Badge variant={book.isAvailable ? "default" : "destructive"}>
                      {book.availableCopies}/{book.totalCopies}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleViewDetails(book)}>
                          <BookOpen className="mr-2 h-4 w-4" />
                          <span>Lihat Detail</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Pencil className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash className="mr-2 h-4 w-4" />
                          <span>Hapus</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedBook && <BookDetailsDialog book={selectedBook} open={showDetails} onOpenChange={setShowDetails} />}
    </div>
  )
}

