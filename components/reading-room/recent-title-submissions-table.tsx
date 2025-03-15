"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Eye, Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"

const recentSubmissions = [
  {
    id: "SUB001",
    studentName: "Ahmad Fauzi",
    studentId: "2019102001",
    title: "Implementasi Deep Learning untuk Deteksi Objek pada Citra Digital",
    submissionDate: "2023-06-15",
    status: "pending",
    similarity: 12,
    abstract:
      "Penelitian ini mengusulkan pendekatan baru dalam deteksi objek menggunakan teknik deep learning. Dengan memanfaatkan arsitektur neural network yang dioptimalkan, sistem mampu mendeteksi dan mengklasifikasikan objek dalam citra digital dengan akurasi tinggi dan waktu pemrosesan yang efisien.",
  },
  {
    id: "SUB002",
    studentName: "Siti Nurhaliza",
    studentId: "2020103045",
    title: "Analisis Performa Framework JavaScript Modern dalam Pengembangan Aplikasi Web",
    submissionDate: "2023-06-14",
    status: "pending",
    similarity: 8,
    abstract:
      "Studi ini membandingkan performa dari berbagai framework JavaScript modern seperti React, Vue, dan Angular dalam pengembangan aplikasi web. Analisis mencakup kecepatan rendering, ukuran bundle, dan pengalaman pengembang untuk memberikan panduan dalam pemilihan teknologi yang tepat.",
  },
  {
    id: "SUB003",
    studentName: "Budi Santoso",
    studentId: "2021104078",
    title: "Pengembangan Sistem Informasi Manajemen Perpustakaan Berbasis Cloud",
    submissionDate: "2023-06-13",
    status: "pending",
    similarity: 15,
    abstract:
      "Penelitian ini membahas pengembangan sistem informasi manajemen perpustakaan berbasis cloud yang dapat meningkatkan efisiensi pengelolaan koleksi dan layanan perpustakaan. Sistem ini dirancang dengan arsitektur microservice dan mengimplementasikan teknologi containerization untuk skalabilitas.",
  },
  {
    id: "SUB004",
    studentName: "Dewi Lestari",
    studentId: "2020105023",
    title: "Optimasi Algoritma Pencarian untuk Big Data Analytics",
    submissionDate: "2023-06-12",
    status: "pending",
    similarity: 5,
    abstract:
      "Penelitian ini mengusulkan metode optimasi untuk algoritma pencarian yang digunakan dalam analisis big data. Dengan menggabungkan teknik indexing yang efisien dan paralelisasi, algoritma yang diusulkan menunjukkan peningkatan signifikan dalam kecepatan pencarian pada dataset berskala besar.",
  },
  {
    id: "SUB005",
    studentName: "Eko Prasetyo",
    studentId: "2019106089",
    title: "Implementasi Blockchain untuk Sistem Keamanan Data Akademik",
    submissionDate: "2023-06-11",
    status: "pending",
    similarity: 20,
    abstract:
      "Studi ini mengeksplorasi penerapan teknologi blockchain untuk mengamankan data akademik seperti transkrip nilai dan ijazah. Dengan memanfaatkan sifat immutability dan desentralisasi blockchain, sistem yang diusulkan dapat mencegah pemalsuan dokumen dan meningkatkan kepercayaan terhadap kredensial akademik.",
  },
]

export function RecentTitleSubmissionsTable() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSubmission, setSelectedSubmission] = useState<(typeof recentSubmissions)[0] | null>(null)

  const filteredSubmissions = recentSubmissions.filter(
    (submission) =>
      submission.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.studentId.includes(searchQuery),
  )

  const handleApprove = (id: string) => {
    toast({
      title: "Judul disetujui",
      description: `Pengajuan judul dengan ID ${id} telah disetujui`,
    })
  }

  const handleReject = (id: string) => {
    toast({
      title: "Judul ditolak",
      description: `Pengajuan judul dengan ID ${id} telah ditolak`,
    })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <div>
            <CardTitle>Pengajuan Judul Terbaru</CardTitle>
            <CardDescription>Daftar pengajuan judul skripsi yang memerlukan persetujuan.</CardDescription>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari pengajuan..."
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
                <DropdownMenuItem>Semua Pengajuan</DropdownMenuItem>
                <DropdownMenuItem>Kesamaan Rendah (&lt;10%)</DropdownMenuItem>
                <DropdownMenuItem>Kesamaan Sedang (10-20%)</DropdownMenuItem>
                <DropdownMenuItem>Kesamaan Tinggi (&gt;20%)</DropdownMenuItem>
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
                <TableHead>Judul</TableHead>
                <TableHead className="hidden sm:table-cell">Tanggal</TableHead>
                <TableHead>Kesamaan</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubmissions.length > 0 ? (
                filteredSubmissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={submission.studentName} />
                          <AvatarFallback>{submission.studentName.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-medium">{submission.studentName}</span>
                          <span className="text-xs text-muted-foreground">{submission.studentId}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-[300px] truncate" title={submission.title}>
                        {submission.title}
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">{submission.submissionDate}</TableCell>
                    <TableCell>
                      <Badge variant={submission.similarity > 15 ? "destructive" : "secondary"}>
                        {submission.similarity}%
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => setSelectedSubmission(submission)}
                            >
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">Lihat detail</span>
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                              <DialogTitle>Detail Pengajuan Judul</DialogTitle>
                              <DialogDescription>
                                Pengajuan dari {selectedSubmission?.studentName} ({selectedSubmission?.studentId})
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div>
                                <h4 className="text-sm font-medium">Judul</h4>
                                <p className="text-sm">{selectedSubmission?.title}</p>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium">Abstrak</h4>
                                <p className="text-sm">{selectedSubmission?.abstract}</p>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium">Tingkat Kesamaan</h4>
                                <Badge
                                  variant={
                                    selectedSubmission?.similarity && selectedSubmission.similarity > 15
                                      ? "destructive"
                                      : "secondary"
                                  }
                                >
                                  {selectedSubmission?.similarity}%
                                </Badge>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium">Tanggal Pengajuan</h4>
                                <p className="text-sm">{selectedSubmission?.submissionDate}</p>
                              </div>
                            </div>
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                className="gap-1 text-destructive"
                                onClick={() => selectedSubmission && handleReject(selectedSubmission.id)}
                              >
                                <XCircle className="h-4 w-4" />
                                <span>Tolak</span>
                              </Button>
                              <Button
                                className="gap-1"
                                onClick={() => selectedSubmission && handleApprove(selectedSubmission.id)}
                              >
                                <CheckCircle className="h-4 w-4" />
                                <span>Setujui</span>
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0 text-green-600"
                          onClick={() => handleApprove(submission.id)}
                        >
                          <CheckCircle className="h-4 w-4" />
                          <span className="sr-only">Setujui</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0 text-destructive"
                          onClick={() => handleReject(submission.id)}
                        >
                          <XCircle className="h-4 w-4" />
                          <span className="sr-only">Tolak</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    Tidak ada data pengajuan yang sesuai dengan pencarian
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

