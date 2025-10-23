"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Book,
  BookMarked,
  TrendingUp,
  Users,
  Calendar,
  Archive,
  FileText,
  BarChart3,
} from "lucide-react"
import Link from "next/link"

export default function BooksPage() {
  return (
    <div className="mt-20 space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Manajemen Perpustakaan</h2>
          <p className="text-muted-foreground">
            Kelola koleksi buku, peminjaman, dan arsip skripsi
          </p>
        </div>
        <Button>
          <Book className="w-4 h-4 mr-2" />
          Tambah Buku
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Buku</CardTitle>
            <Book className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,245</div>
            <p className="text-xs text-muted-foreground">Koleksi buku</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Sedang Dipinjam</CardTitle>
            <BookMarked className="w-4 h-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">187</div>
            <p className="text-xs text-muted-foreground">Buku dipinjam</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Peminjam Aktif</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">Mahasiswa</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Arsip Skripsi</CardTitle>
            <Archive className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">856</div>
            <p className="text-xs text-muted-foreground">Skripsi tersimpan</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/dashboard/admin/books/collection">
          <Card className="transition-all cursor-pointer hover:shadow-md">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Book className="w-5 h-5 text-blue-500" />
                <CardTitle>Koleksi Buku</CardTitle>
              </div>
              <CardDescription>Kelola koleksi buku perpustakaan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Tambah, edit, dan hapus buku dari koleksi
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/admin/book-borrowing">
          <Card className="transition-all cursor-pointer hover:shadow-md">
            <CardHeader>
              <div className="flex items-center gap-2">
                <BookMarked className="w-5 h-5 text-amber-500" />
                <CardTitle>Peminjaman</CardTitle>
              </div>
              <CardDescription>Manajemen peminjaman dan pengembalian</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Proses peminjaman, perpanjangan, dan pengembalian buku
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/admin/book-categories">
          <Card className="transition-all cursor-pointer hover:shadow-md">
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-green-500" />
                <CardTitle>Kategori Buku</CardTitle>
              </div>
              <CardDescription>Kelola kategori dan klasifikasi</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Atur kategori buku untuk memudahkan pencarian
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/admin/thesis-archive">
          <Card className="transition-all cursor-pointer hover:shadow-md">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Archive className="w-5 h-5 text-purple-500" />
                <CardTitle>Arsip Skripsi</CardTitle>
              </div>
              <CardDescription>Arsip digital skripsi mahasiswa</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Kelola arsip skripsi mahasiswa yang sudah lulus
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/admin/library/statistics">
          <Card className="transition-all cursor-pointer hover:shadow-md">
            <CardHeader>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-indigo-500" />
                <CardTitle>Statistik</CardTitle>
              </div>
              <CardDescription>Laporan dan statistik perpustakaan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Lihat laporan peminjaman, buku populer, dan tren
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/admin/library/settings">
          <Card className="transition-all cursor-pointer hover:shadow-md">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-orange-500" />
                <CardTitle>Pengaturan</CardTitle>
              </div>
              <CardDescription>Konfigurasi perpustakaan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Atur durasi peminjaman, denda, dan kebijakan
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
