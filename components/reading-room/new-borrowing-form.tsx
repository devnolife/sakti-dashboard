"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ArrowLeft, BookMarked, Search, User, Calendar } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export function NewBorrowingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookId, setBookId] = useState("")
  const [studentId, setStudentId] = useState("")
  const [bookFound, setBookFound] = useState(false)
  const [studentFound, setStudentFound] = useState(false)
  const [dueDate, setDueDate] = useState("")

  // Mock data for demonstration
  const bookData = {
    id: "BK001",
    title: "Algoritma dan Pemrograman",
    author: "Dr. Budi Raharjo",
    publisher: "Penerbit Informatika",
    publishedYear: 2019,
    isbn: "978-602-1  Budi Raharjo",
    publisher: "Penerbit Informatika",
    publishedYear: 2019,
    isbn: "978-602-1514-50-1",
    category: "computer-science",
    location: "Rak A-12",
    availableCopies: 3,
    totalCopies: 5,
    isAvailable: true,
    coverImage: "/placeholder.svg?height=400&width=300",
  }

  const studentData = {
    id: "2019102001",
    name: "Ahmad Fauzi",
    department: "Teknik Informatika",
    semester: 8,
    avatar: "/placeholder.svg?height=40&width=40",
    activeBorrowings: 1,
    maxAllowedBorrowings: 3,
  }

  const handleSearchBook = () => {
    if (bookId === "BK001") {
      setBookFound(true)
    } else {
      setBookFound(false)
    }
  }

  const handleSearchStudent = () => {
    if (studentId === "2019102001") {
      setStudentFound(true)
    } else {
      setStudentFound(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      // Show success message or redirect
    }, 1500)
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/reading_room_admin/borrowing/active">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Peminjaman Baru</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Informasi Buku</CardTitle>
              <CardDescription>Cari dan pilih buku yang akan dipinjam.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Masukkan ID Buku"
                    className="pl-8"
                    value={bookId}
                    onChange={(e) => setBookId(e.target.value)}
                  />
                </div>
                <Button type="button" onClick={handleSearchBook}>
                  Cari
                </Button>
              </div>

              {bookFound && (
                <div className="rounded-lg border p-4">
                  <div className="flex gap-4">
                    <div className="relative h-24 w-16 overflow-hidden rounded">
                      <Image
                        src={bookData.coverImage || "/placeholder.svg"}
                        alt={bookData.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{bookData.title}</h3>
                      <p className="text-sm text-muted-foreground">{bookData.author}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <Badge variant={bookData.isAvailable ? "default" : "destructive"}>
                          {bookData.isAvailable ? "Tersedia" : "Tidak Tersedia"}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {bookData.availableCopies}/{bookData.totalCopies} salinan
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Informasi Peminjam</CardTitle>
              <CardDescription>Cari dan pilih mahasiswa yang akan meminjam buku.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <User className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Masukkan NIM Mahasiswa"
                    className="pl-8"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                  />
                </div>
                <Button type="button" onClick={handleSearchStudent}>
                  Cari
                </Button>
              </div>

              {studentFound && (
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={studentData.avatar} alt={studentData.name} />
                      <AvatarFallback>{studentData.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold">{studentData.name}</h3>
                      <p className="text-sm text-muted-foreground">{studentData.id}</p>
                      <p className="text-sm text-muted-foreground">{studentData.department}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between rounded-md bg-muted p-2 text-sm">
                    <span>Peminjaman Aktif:</span>
                    <Badge variant="outline">
                      {studentData.activeBorrowings}/{studentData.maxAllowedBorrowings}
                    </Badge>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Detail Peminjaman</CardTitle>
              <CardDescription>Tentukan tanggal peminjaman dan pengembalian.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="borrowDate">Tanggal Peminjaman</Label>
                  <div className="relative">
                    <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="borrowDate"
                      type="date"
                      className="pl-8"
                      defaultValue={new Date().toISOString().split("T")[0]}
                      disabled
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Tanggal Pengembalian</Label>
                  <div className="relative">
                    <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="dueDate"
                      type="date"
                      className="pl-8"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Catatan (opsional)</Label>
                <textarea
                  id="notes"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Tambahkan catatan jika diperlukan..."
                  rows={3}
                ></textarea>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" asChild>
                <Link href="/dashboard/reading_room_admin/borrowing/active">Batal</Link>
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !bookFound || !studentFound || !dueDate}
                className="gap-2"
              >
                <BookMarked className="h-4 w-4" />
                <span>{isSubmitting ? "Memproses..." : "Proses Peminjaman"}</span>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  )
}

