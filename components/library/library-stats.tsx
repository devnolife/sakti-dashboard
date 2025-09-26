import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Clock, RotateCcw, BookMarked } from "lucide-react"

interface LibraryStatsProps {
  stats: {
    totalBooks: number
    availableBooks: number
    borrowedBooks: number
    recentReturns: number
  }
}

export function LibraryStats({ stats }: LibraryStatsProps) {
  const availabilityPercentage = stats.totalBooks > 0 
    ? Math.round((stats.availableBooks / stats.totalBooks) * 100) 
    : 0

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Buku</CardTitle>
          <BookOpen className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalBooks.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Koleksi perpustakaan</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Buku Tersedia</CardTitle>
          <BookMarked className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.availableBooks.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">{availabilityPercentage}% dari total koleksi</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Buku Saya</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.borrowedBooks}</div>
          <p className="text-xs text-muted-foreground">Sedang dipinjam</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pengembalian Terbaru</CardTitle>
          <RotateCcw className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.recentReturns}</div>
          <p className="text-xs text-muted-foreground">Dikembalikan dalam 7 hari terakhir</p>
        </CardContent>
      </Card>
    </div>
  )
}

