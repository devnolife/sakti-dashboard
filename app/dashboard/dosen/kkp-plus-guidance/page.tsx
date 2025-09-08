import { KkpPlusGuidanceList } from "@/components/lecturer/kkp-plus-guidance-list"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function KkpPlusGuidancePage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Bimbingan KKP Plus</h1>
      <Card>
        <CardHeader>
          <CardTitle>Daftar Mahasiswa Bimbingan KKP Plus</CardTitle>
          <CardDescription>Daftar mahasiswa yang mengikuti program KKP Plus di bawah bimbingan Anda</CardDescription>
        </CardHeader>
        <CardContent>
          <KkpPlusGuidanceList />
        </CardContent>
      </Card>
    </div>
  )
}

