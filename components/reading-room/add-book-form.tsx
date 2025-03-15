"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { ArrowLeft, BookPlus, Upload } from "lucide-react"
import Link from "next/link"

const categories = [
  { value: "computer-science", label: "Ilmu Komputer" },
  { value: "database", label: "Basis Data" },
  { value: "networking", label: "Jaringan" },
  { value: "artificial-intelligence", label: "Kecerdasan Buatan" },
  { value: "operating-system", label: "Sistem Operasi" },
  { value: "programming", label: "Pemrograman" },
  { value: "web-development", label: "Pengembangan Web" },
  { value: "mobile-development", label: "Pengembangan Mobile" },
  { value: "data-science", label: "Data Science" },
  { value: "cybersecurity", label: "Keamanan Cyber" },
]

export function AddBookForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

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
          <Link href="/dashboard/reading_room_admin/books/list">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Tambah Buku Baru</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Informasi Buku</CardTitle>
              <CardDescription>Masukkan informasi dasar tentang buku.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Judul Buku</Label>
                <Input id="title" placeholder="Masukkan judul buku" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="author">Penulis</Label>
                <Input id="author" placeholder="Masukkan nama penulis" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="publisher">Penerbit</Label>
                <Input id="publisher" placeholder="Masukkan nama penerbit" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="publishedYear">Tahun Terbit</Label>
                  <Input
                    id="publishedYear"
                    type="number"
                    placeholder="Tahun"
                    min="1900"
                    max={new Date().getFullYear()}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="isbn">ISBN</Label>
                  <Input id="isbn" placeholder="Masukkan ISBN" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Kategori</Label>
                <Select required>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea id="description" placeholder="Masukkan deskripsi buku" rows={4} />
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Detail Tambahan</CardTitle>
              <CardDescription>Masukkan informasi tambahan dan ketersediaan buku.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="location">Lokasi Buku</Label>
                <Input id="location" placeholder="Contoh: Rak A-12" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="totalCopies">Jumlah Total</Label>
                  <Input id="totalCopies" type="number" placeholder="Jumlah salinan" min="1" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="availableCopies">Jumlah Tersedia</Label>
                  <Input id="availableCopies" type="number" placeholder="Jumlah tersedia" min="0" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Sampul Buku</Label>
                <div className="mt-2 flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-6">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <div className="text-center">
                      <p className="text-sm font-medium">Klik untuk unggah atau seret dan lepas</p>
                      <p className="text-xs text-muted-foreground">PNG, JPG atau JPEG (maks. 2MB)</p>
                    </div>
                    <Input id="coverImage" type="file" accept="image/png, image/jpeg, image/jpg" className="hidden" />
                    <Button variant="outline" type="button" size="sm">
                      Pilih File
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" asChild>
                <Link href="/dashboard/reading_room_admin/books/list">Batal</Link>
              </Button>
              <Button type="submit" disabled={isSubmitting} className="gap-2">
                <BookPlus className="h-4 w-4" />
                <span>{isSubmitting ? "Menyimpan..." : "Simpan Buku"}</span>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  )
}

