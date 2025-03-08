import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, MapPin } from "lucide-react"

export function KkpGuidanceList() {
  const students = [
    {
      id: 1,
      name: "Lina Mariani",
      nim: "12345688",
      location: "PT. Teknologi Maju",
      status: "Sedang KKP",
      progress: "Minggu ke-3",
      avatar: "/placeholder.svg",
    },
    {
      id: 2,
      name: "Maman Suparman",
      nim: "12345689",
      location: "Dinas Komunikasi dan Informatika",
      status: "Sedang KKP",
      progress: "Minggu ke-5",
      avatar: "/placeholder.svg",
    },
    {
      id: 3,
      name: "Nina Herlina",
      nim: "12345690",
      location: "PT. Global Teknologi",
      status: "Selesai",
      progress: "Laporan Final",
      avatar: "/placeholder.svg",
    },
    {
      id: 4,
      name: "Opik Hidayat",
      nim: "12345691",
      location: "CV. Digital Kreatif",
      status: "Sedang KKP",
      progress: "Minggu ke-2",
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
              <TableHead>Lokasi KKP</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Progress</TableHead>
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
                <TableCell>{student.location}</TableCell>
                <TableCell>
                  <Badge variant={student.status === "Sedang KKP" ? "default" : "secondary"}>{student.status}</Badge>
                </TableCell>
                <TableCell>{student.progress}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <FileText className="h-4 w-4" />
                      <span className="sr-only">Lihat Laporan</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MapPin className="h-4 w-4" />
                      <span className="sr-only">Lihat Lokasi</span>
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

