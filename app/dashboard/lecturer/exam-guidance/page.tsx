import { ExamGuidanceList } from "@/components/lecturer/exam-guidance-list"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ExamGuidancePage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Bimbingan Ujian</h1>
      <Card>
        <CardHeader>
          <CardTitle>Daftar Mahasiswa Bimbingan Ujian</CardTitle>
          <CardDescription>Daftar mahasiswa yang sedang dalam proses bimbingan ujian</CardDescription>
        </CardHeader>
        <CardContent>
          <ExamGuidanceList />
        </CardContent>
      </Card>
    </div>
  )
}

