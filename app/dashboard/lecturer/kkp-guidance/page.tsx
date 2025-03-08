import { KkpGuidanceList } from "@/components/lecturer/kkp-guidance-list"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function KkpGuidancePage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Bimbingan KKP</h1>
      <Card>
        <CardHeader>
          <CardTitle>Daftar Mahasiswa Bimbingan KKP</CardTitle>
          <CardDescription>Daftar mahasiswa yang sedang melaksanakan KKP di bawah bimbingan Anda</CardDescription>
        </CardHeader>
        <CardContent>
          <KkpGuidanceList />
        </CardContent>
      </Card>
    </div>
  )
}

