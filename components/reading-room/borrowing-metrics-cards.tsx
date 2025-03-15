import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Clock, Users, AlertTriangle } from "lucide-react"

interface BorrowingMetrics {
  totalBorrowings: number
  activeBorrowings: number
  uniqueUsers: number
  overdueBorrowings: number
  averageDuration: number
  returnRate: number
}

interface BorrowingMetricsCardsProps {
  data: BorrowingMetrics
}

export function BorrowingMetricsCards({ data }: BorrowingMetricsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Peminjaman</CardTitle>
          <BookOpen className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.totalBorrowings}</div>
          <p className="text-xs text-muted-foreground">{data.activeBorrowings} peminjaman aktif</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pemustaka Aktif</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.uniqueUsers}</div>
          <p className="text-xs text-muted-foreground">Mahasiswa yang meminjam buku</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Rata-rata Durasi</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.averageDuration} hari</div>
          <p className="text-xs text-muted-foreground">Durasi rata-rata peminjaman</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Keterlambatan</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.overdueBorrowings}</div>
          <p className="text-xs text-muted-foreground">Tingkat pengembalian tepat waktu: {data.returnRate}%</p>
        </CardContent>
      </Card>
    </div>
  )
}

