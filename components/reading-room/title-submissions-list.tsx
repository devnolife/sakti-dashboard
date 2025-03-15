"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckCircle, XCircle, Eye, Search, Filter } from "lucide-react"
import { TitleSubmissionDetailsDialog } from "./title-submission-details-dialog"

const submissions = [
  {
    id: "SUB001",
    studentName: "Ahmad Fauzi",
    studentId: "2019102001",
    title: "Implementasi Deep Learning untuk Deteksi Objek pada Citra Digital",
    abstract:
      "Penelitian ini bertujuan untuk mengimplementasikan teknik deep learning, khususnya Convolutional Neural Networks (CNN), untuk mendeteksi objek pada citra digital. Metode yang diusulkan menggunakan arsitektur YOLO (You Only Look Once) yang dimodifikasi untuk meningkatkan akurasi dan kecepatan deteksi.",
    submissionDate: "2023-06-15",
    status: "pending",
    similarity: 12,
    department: "Teknik Informatika",
    supervisor: "Dr. Budi Santoso",
    keywords: ["deep learning", "object detection", "computer vision", "CNN", "YOLO"],
  },
  {
    id: "SUB002",
    studentName: "Siti Nurhaliza",
    studentId: "2020103045",
    title: "Analisis Performa Framework JavaScript Modern dalam Pengembangan Aplikasi Web",
    abstract:
      "Penelitian ini membandingkan performa dari berbagai framework JavaScript modern seperti React, Vue, dan Angular dalam pengembangan aplikasi web. Analisis dilakukan berdasarkan waktu loading, penggunaan memori, dan pengalaman pengguna pada berbagai perangkat dan browser.",
    submissionDate: "2023-06-14",
    status: "pending",
    similarity: 8,
    department: "Sistem Informasi",
    supervisor: "Dr. Rina Wijaya",
    keywords: ["javascript", "framework", "web development", "performance analysis", "react", "vue", "angular"],
  },
  {
    id: "SUB003",
    studentName: "Budi Santoso",
    studentId: "2021104078",
    title: "Pengembangan Sistem Informasi Manajemen Perpustakaan Berbasis Cloud",
    abstract:
      "Penelitian ini mengembangkan sistem informasi manajemen perpustakaan berbasis cloud yang dapat diakses dari berbagai perangkat. Sistem ini mengintegrasikan fitur peminjaman, pengembalian, katalog digital, dan analitik penggunaan perpustakaan.",
    submissionDate: "2023-06-13",
    status: "pending",
    similarity: 15,
    department: "Sistem Informasi",
    supervisor: "Prof. Hadi Wijaya",
    keywords: ["cloud computing", "library management", "information system", "digital catalog", "analytics"],
  },
  {
    id: "SUB004",
    studentName: "Dewi Lestari",
    studentId: "2020105023",
    title: "Optimasi Algoritma Pencarian untuk Big Data Analytics",
    abstract:
      "Penelitian ini mengusulkan metode optimasi algoritma pencarian untuk analisis big data. Fokus utama adalah meningkatkan efisiensi algoritma MapReduce dan implementasinya pada framework Hadoop untuk pemrosesan data berskala besar.",
    submissionDate: "2023-06-12",
    status: "pending",
    similarity: 5,
    department: "Teknik Informatika",
    supervisor: "Dr. Eko Prasetyo",
    keywords: ["big data", "search algorithm", "optimization", "mapreduce", "hadoop"],
  },
  {
    id: "SUB005",
    studentName: "Eko Prasetyo",
    studentId: "2019106089",
    title: "Implementasi Blockchain untuk Sistem Keamanan Data Akademik",
    abstract:
      "Penelitian ini mengimplementasikan teknologi blockchain untuk mengamankan data akademik seperti transkrip nilai dan ijazah. Sistem yang diusulkan menggunakan smart contract untuk verifikasi otomatis dan mencegah pemalsuan dokumen akademik.",
    submissionDate: "2023-06-11",
    status: "pending",
    similarity: 20,
    department: "Teknik Informatika",
    supervisor: "Prof. Dian Kusuma",
    keywords: ["blockchain", "academic data", "security", "smart contract", "verification"],
  },
  {
    id: "SUB006",
    studentName: "Rini Susanti",
    studentId: "2019107056",
    title: "Analisis Sentimen pada Media Sosial Menggunakan Natural Language Processing",
    abstract:
      "Penelitian ini menganalisis sentimen pengguna media sosial terhadap isu-isu tertentu menggunakan teknik Natural Language Processing (NLP). Model yang dikembangkan dapat mengklasifikasikan sentimen positif, negatif, dan netral dengan akurasi tinggi.",
    submissionDate: "2023-06-10",
    status: "pending",
    similarity: 18,
    department: "Sistem Informasi",
    supervisor: "Dr. Maya Indira",
    keywords: [
      "sentiment analysis",
      "natural language processing",
      "social media",
      "classification",
      "machine learning",
    ],
  },
  {
    id: "SUB007",
    studentName: "Doni Pratama",
    studentId: "2020108034",
    title: "Pengembangan Aplikasi Mobile untuk Monitoring Kesehatan Berbasis IoT",
    abstract:
      "Penelitian ini mengembangkan aplikasi mobile yang terintegrasi dengan perangkat IoT untuk monitoring kesehatan. Aplikasi ini dapat memantau detak jantung, tekanan darah, dan parameter kesehatan lainnya secara real-time.",
    submissionDate: "2023-06-09",
    status: "pending",
    similarity: 10,
    department: "Teknik Informatika",
    supervisor: "Dr. Irfan Hakim",
    keywords: ["mobile application", "health monitoring", "IoT", "real-time", "healthcare"],
  },
  {
    id: "SUB008",
    studentName: "Lia Anggraini",
    studentId: "2021109012",
    title: "Implementasi Machine Learning untuk Prediksi Kelulusan Mahasiswa",
    abstract:
      "Penelitian ini mengimplementasikan algoritma machine learning untuk memprediksi kelulusan mahasiswa berdasarkan data akademik dan non-akademik. Model yang dikembangkan dapat membantu institusi pendidikan dalam mengidentifikasi mahasiswa yang berisiko tidak lulus tepat waktu.",
    submissionDate: "2023-06-08",
    status: "pending",
    similarity: 12,
    department: "Sistem Informasi",
    supervisor: "Prof. Agus Santoso",
    keywords: ["machine learning", "prediction", "student graduation", "academic data", "early warning system"],
  },
]

export function TitleSubmissionsList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSubmission, setSelectedSubmission] = useState<(typeof submissions)[0] | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  const filteredSubmissions = submissions.filter(
    (submission) =>
      submission.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.studentId.includes(searchQuery),
  )

  const handleViewDetails = (submission: (typeof submissions)[0]) => {
    setSelectedSubmission(submission)
    setShowDetails(true)
  }

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-3xl font-bold tracking-tight">Pengajuan Judul Skripsi</h1>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Pengajuan</CardTitle>
          <CardDescription>Kelola dan tinjau pengajuan judul skripsi dari mahasiswa.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari judul, nama, atau NIM..."
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
                <TableHead>Judul</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Kesamaan</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubmissions.map((submission) => (
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
                  <TableCell>{submission.submissionDate}</TableCell>
                  <TableCell>
                    <Badge variant={submission.similarity > 15 ? "destructive" : "secondary"}>
                      {submission.similarity}%
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleViewDetails(submission)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-green-600">
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-destructive">
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedSubmission && (
        <TitleSubmissionDetailsDialog
          submission={selectedSubmission}
          open={showDetails}
          onOpenChange={setShowDetails}
        />
      )}
    </div>
  )
}

