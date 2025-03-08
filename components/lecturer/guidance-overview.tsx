import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileText } from "lucide-react"

export function GuidanceOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ringkasan Bimbingan</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="academic">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="academic">Akademik</TabsTrigger>
            <TabsTrigger value="exam">Ujian</TabsTrigger>
            <TabsTrigger value="kkp">KKP</TabsTrigger>
            <TabsTrigger value="kkp-plus">KKP Plus</TabsTrigger>
          </TabsList>

          <TabsContent value="academic">
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <StatCard label="Total Mahasiswa" value="15" />
                <StatCard label="Perlu Perhatian" value="3" variant="warning" />
                <StatCard label="Kartu Kontrol" value="7" variant="info" />
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Mahasiswa Prioritas</h3>
                <div className="space-y-2">
                  {priorityStudents.map((student) => (
                    <StudentRow key={student.id} student={student} />
                  ))}
                </div>
              </div>

              <Button variant="outline" className="w-full" asChild>
                <a href="/dashboard/lecturer/academic-guidance">
                  Lihat Semua <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="exam">
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <StatCard label="Total Mahasiswa" value="8" />
                <StatCard label="Menunggu Review" value="5" variant="warning" />
                <StatCard label="Jadwal Ujian" value="3" variant="info" />
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Dokumen Perlu Review</h3>
                <div className="space-y-2">
                  {examDocuments.map((doc) => (
                    <DocumentRow key={doc.id} document={doc} />
                  ))}
                </div>
              </div>

              <Button variant="outline" className="w-full" asChild>
                <a href="/dashboard/lecturer/exam-guidance">
                  Lihat Semua <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="kkp">
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <StatCard label="Total Kelompok" value="5" />
                <StatCard label="Perlu Bimbingan" value="2" variant="warning" />
                <StatCard label="Laporan Final" value="1" variant="info" />
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Kelompok KKP Aktif</h3>
                <div className="space-y-2">
                  {kkpGroups.map((group) => (
                    <KkpGroupRow key={group.id} group={group} />
                  ))}
                </div>
              </div>

              <Button variant="outline" className="w-full" asChild>
                <a href="/dashboard/lecturer/kkp-guidance">
                  Lihat Semua <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="kkp-plus">
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <StatCard label="Total Mahasiswa" value="3" />
                <StatCard label="Perlu Review" value="2" variant="warning" />
                <StatCard label="Selesai" value="0" variant="info" />
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Mahasiswa KKP Plus</h3>
                <div className="space-y-2">
                  {kkpPlusStudents.map((student) => (
                    <StudentRow key={student.id} student={student} />
                  ))}
                </div>
              </div>

              <Button variant="outline" className="w-full" asChild>
                <a href="/dashboard/lecturer/kkp-plus-guidance">
                  Lihat Semua <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

interface StatCardProps {
  label: string
  value: string
  variant?: "default" | "warning" | "info"
}

function StatCard({ label, value, variant = "default" }: StatCardProps) {
  const bgColor =
    variant === "warning"
      ? "bg-amber-50 dark:bg-amber-950"
      : variant === "info"
        ? "bg-blue-50 dark:bg-blue-950"
        : "bg-gray-50 dark:bg-gray-800"

  const textColor =
    variant === "warning"
      ? "text-amber-600 dark:text-amber-400"
      : variant === "info"
        ? "text-blue-600 dark:text-blue-400"
        : "text-gray-900 dark:text-gray-100"

  return (
    <div className={`p-3 rounded-lg ${bgColor}`}>
      <div className={`text-xl font-bold ${textColor}`}>{value}</div>
      <div className="text-xs text-muted-foreground mt-1">{label}</div>
    </div>
  )
}

interface Student {
  id: string
  name: string
  nim: string
  status: string
  lastActivity: string
}

function StudentRow({ student }: { student: Student }) {
  return (
    <div className="flex items-center justify-between p-2 rounded-md bg-muted/40">
      <div className="flex flex-col">
        <span className="text-sm font-medium">{student.name}</span>
        <span className="text-xs text-muted-foreground">{student.nim}</span>
      </div>
      <div className="flex items-center gap-2">
        <Badge
          variant={
            student.status === "Perlu Perhatian" ? "destructive" : student.status === "Aktif" ? "default" : "outline"
          }
        >
          {student.status}
        </Badge>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

interface Document {
  id: string
  title: string
  student: string
  type: string
  dueDate: string
}

function DocumentRow({ document }: { document: Document }) {
  return (
    <div className="flex items-center justify-between p-2 rounded-md bg-muted/40">
      <div className="flex flex-col">
        <span className="text-sm font-medium">{document.title}</span>
        <span className="text-xs text-muted-foreground">{document.student}</span>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="outline">{document.type}</Badge>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <FileText className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

interface KkpGroup {
  id: string
  name: string
  members: number
  location: string
  progress: number
}

function KkpGroupRow({ group }: { group: KkpGroup }) {
  return (
    <div className="flex items-center justify-between p-2 rounded-md bg-muted/40">
      <div className="flex flex-col">
        <span className="text-sm font-medium">{group.name}</span>
        <span className="text-xs text-muted-foreground">
          {group.members} anggota • {group.location}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div className="text-xs font-medium">{group.progress}%</div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

// Mock data
const priorityStudents: Student[] = [
  { id: "1", name: "Budi Santoso", nim: "12345678", status: "Perlu Perhatian", lastActivity: "3 hari lalu" },
  { id: "2", name: "Ani Wijaya", nim: "23456789", status: "Perlu Perhatian", lastActivity: "5 hari lalu" },
  { id: "3", name: "Dedi Cahyono", nim: "34567890", status: "Aktif", lastActivity: "1 hari lalu" },
]

const examDocuments: Document[] = [
  { id: "1", title: "Proposal Skripsi", student: "Budi Santoso", type: "Proposal", dueDate: "2 hari lagi" },
  { id: "2", title: "Revisi Bab 2", student: "Ani Wijaya", type: "Revisi", dueDate: "3 hari lagi" },
  { id: "3", title: "Draft Final", student: "Dedi Cahyono", type: "Final", dueDate: "5 hari lagi" },
]

const kkpGroups: KkpGroup[] = [
  { id: "1", name: "Kelompok A", members: 4, location: "PT. Teknologi Maju", progress: 75 },
  { id: "2", name: "Kelompok B", members: 3, location: "Dinas Kominfo", progress: 50 },
  { id: "3", name: "Kelompok C", members: 5, location: "Startup XYZ", progress: 30 },
]

const kkpPlusStudents: Student[] = [
  { id: "1", name: "Eko Prasetyo", nim: "45678901", status: "Aktif", lastActivity: "2 hari lalu" },
  { id: "2", name: "Fitri Handayani", nim: "56789012", status: "Perlu Perhatian", lastActivity: "4 hari lalu" },
  { id: "3", name: "Gita Purnama", nim: "67890123", status: "Aktif", lastActivity: "1 hari lalu" },
]

