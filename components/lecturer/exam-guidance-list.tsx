import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, Calendar } from "lucide-react"

export function ExamGuidanceList() {
  const students = [
    {
      id: 1,
      name: "Gita Nirmala",
      nim: "12345683",
      examType: "Proposal",
      status: "Menunggu Persetujuan",
      scheduledDate: "5 Juni 2023",
      avatar: "/placeholder.svg",
    },
    {
      id: 2,
      name: "Hadi Santoso",
      nim: "12345684",
      examType: "Hasil",
      status: "Terjadwal",
      scheduledDate: "10 Juni 2023",
      avatar: "/placeholder.svg",
    },
    {
      id: 3,
      name: "Indah Permata",
      nim: "12345685",
      examType: "Skripsi",
      status: "Selesai",
      scheduledDate: "15 Mei 2023",
      avatar: "/placeholder.svg",
    },
    {
      id: 4,
      name: "Joko Widodo",
      nim: "12345686",
      examType: "Proposal",
      status: "Terjadwal",
      scheduledDate: "8 Juni 2023",
      avatar: "/placeholder.svg",
    },
    {
      id: 5,
      name: "Kartika Dewi",
      nim: "12345687",
      examType: "Hasil",
      status: "Menunggu Persetujuan",
      scheduledDate: "-",
      avatar: "/placeholder.svg",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mahasiswa</TableHead>
              <TableHead>NIM</TableHead>
              <TableHead>Jenis Ujian</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tanggal Ujian</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
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
                <TableCell>{student.examType}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      student.status === "Menunggu Persetujuan"
                        ? "outline"
                        : student.status === "Terjadwal"
                          ? "default"
                          : "secondary"
                    }
                  >
                    {student.status}
                  </Badge>
                </TableCell>
                <TableCell>{student.scheduledDate}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <FileText className="h-4 w-4" />
                      <span className="sr-only">Lihat Dokumen</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Calendar className="h-4 w-4" />
                      <span className="sr-only">Jadwal</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

