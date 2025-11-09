"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MessageCircle, ClipboardList } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AdvisorControlCard } from "./advisor-control-card"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ControlCardEntry {
  id: number
  date: string
  uraian: string
  keterangan: string
  paraf: "Sudah" | "Belum"
}

interface Student {
  id: string
  name: string
  nim: string
  semester: number
  status: string
  lastMeeting: string
  avatar?: string
  controlCardEntries?: ControlCardEntry[]
}

interface AcademicGuidanceListProps {
  filter?: "active" | "completed" | "all"
}

export function AcademicGuidanceList({ filter = "all" }: AcademicGuidanceListProps) {
  const [students, setStudents] = useState<Student[]>([
    {
      id: "1",
      name: "Budi Santoso",
      nim: "12345678",
      semester: 6,
      status: "Aktif",
      lastMeeting: "10 Mei 2023",
      avatar: "/placeholder.svg?height=40&width=40",
      controlCardEntries: [
        {
          id: 1,
          date: "10 September 2023",
          uraian: "Konsultasi KRS Semester Ganjil",
          keterangan: "Pengambilan 21 SKS",
          paraf: "Sudah",
        },
        {
          id: 2,
          date: "25 September 2023",
          uraian: "Konsultasi Topik Tugas Akhir",
          keterangan: "Pembahasan ide awal",
          paraf: "Sudah",
        },
      ],
    },
    {
      id: "2",
      name: "Ani Wijaya",
      nim: "12345679",
      semester: 4,
      status: "Aktif",
      lastMeeting: "15 Mei 2023",
      avatar: "/placeholder.svg?height=40&width=40",
      controlCardEntries: [
        {
          id: 1,
          date: "12 September 2023",
          uraian: "Konsultasi KRS Semester Ganjil",
          keterangan: "Pengambilan 18 SKS",
          paraf: "Sudah",
        },
      ],
    },
    {
      id: "3",
      name: "Dedi Cahyono",
      nim: "12345680",
      semester: 8,
      status: "Cuti",
      lastMeeting: "5 April 2023",
      avatar: "/placeholder.svg?height=40&width=40",
      controlCardEntries: [],
    },
    {
      id: "4",
      name: "Eka Putri",
      nim: "12345681",
      semester: 2,
      status: "Aktif",
      lastMeeting: "20 Mei 2023",
      avatar: "/placeholder.svg?height=40&width=40",
      controlCardEntries: [
        {
          id: 1,
          date: "5 September 2023",
          uraian: "Konsultasi KRS Semester Ganjil",
          keterangan: "Pengambilan 20 SKS",
          paraf: "Sudah",
        },
        {
          id: 2,
          date: "20 September 2023",
          uraian: "Konsultasi Mata Kuliah",
          keterangan: "Pembahasan materi kuliah",
          paraf: "Sudah",
        },
        {
          id: 3,
          date: "10 Oktober 2023",
          uraian: "Konsultasi Progres Studi",
          keterangan: "Evaluasi nilai UTS",
          paraf: "Sudah",
        },
      ],
    },
    {
      id: "5",
      name: "Fandi Ahmad",
      nim: "12345682",
      semester: 6,
      status: "Aktif",
      lastMeeting: "12 Mei 2023",
      avatar: "/placeholder.svg?height=40&width=40",
      controlCardEntries: [
        {
          id: 1,
          date: "8 September 2023",
          uraian: "Konsultasi KRS Semester Ganjil",
          keterangan: "Pengambilan 21 SKS",
          paraf: "Sudah",
        },
      ],
    },
  ])

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [openDialog, setOpenDialog] = useState(false)

  const handleSaveControlCard = (studentId: string, entries: ControlCardEntry[]) => {
    setStudents(
      students.map((student) =>
        student.id === studentId
          ? {
            ...student,
            controlCardEntries: entries,
            lastMeeting: new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" }),
          }
          : student,
      ),
    )

    toast({
      title: "Kartu kontrol disimpan",
      description: "Perubahan pada kartu kontrol telah disimpan",
    })

    setOpenDialog(false)
  }

  const openControlCard = (student: Student) => {
    setSelectedStudent(student)
    setOpenDialog(true)
  }

  // Filter students based on filter prop
  const filteredStudents = students.filter((student) => {
    if (filter === "active") return student.status === "Aktif"
    if (filter === "completed") return student.status !== "Aktif"
    return true // "all"
  })

  const getTitle = () => {
    if (filter === "active") return "Mahasiswa Aktif"
    if (filter === "completed") return "Mahasiswa Tidak Aktif"
    return "Daftar Mahasiswa Bimbingan"
  }

  const getDescription = () => {
    if (filter === "active") return "Daftar mahasiswa aktif yang berada di bawah bimbingan akademik Anda"
    if (filter === "completed") return "Daftar mahasiswa tidak aktif atau cuti yang berada di bawah bimbingan akademik Anda"
    return "Daftar lengkap mahasiswa yang berada di bawah bimbingan akademik Anda"
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>{getTitle()}</CardTitle>
          <CardDescription>{getDescription()}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mahasiswa</TableHead>
                  <TableHead>NIM</TableHead>
                  <TableHead>Semester</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Pertemuan Terakhir</TableHead>
                  <TableHead>Kartu Kontrol</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={student.avatar} alt={student.name} />
                          <AvatarFallback>{student.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>{student.name}</div>
                      </div>
                    </TableCell>
                    <TableCell>{student.nim}</TableCell>
                    <TableCell>{student.semester}</TableCell>
                    <TableCell>
                      <Badge variant={student.status === "Aktif" ? "default" : "secondary"}>{student.status}</Badge>
                    </TableCell>
                    <TableCell>{student.lastMeeting}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          student.controlCardEntries && student.controlCardEntries.length > 0
                            ? "success"
                            : "outline"
                        }
                      >
                        {student.controlCardEntries && student.controlCardEntries.length > 0
                          ? `${student.controlCardEntries.length} entri`
                          : "Belum ada"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => openControlCard(student)}>
                          <ClipboardList className="h-4 w-4 mr-2" />
                          Kartu Kontrol
                        </Button>
                        <Button variant="ghost" size="icon">
                          <MessageCircle className="h-4 w-4" />
                          <span className="sr-only">Kirim Pesan</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Kartu Kontrol Mahasiswa</DialogTitle>
            <DialogDescription>Isi dan kelola kartu kontrol untuk mahasiswa bimbingan Anda</DialogDescription>
          </DialogHeader>
          {selectedStudent && (
            <AdvisorControlCard
              student={{
                id: selectedStudent.id,
                nama: selectedStudent.name,
                nim: selectedStudent.nim,
                penasehat_akademik: "Dr. Budi Santoso, M.Kom",
                tahun_akademik: "2023/2024",
                avatar: selectedStudent.avatar,
              }}
              initialEntries={selectedStudent.controlCardEntries || []}
              onSave={handleSaveControlCard}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

