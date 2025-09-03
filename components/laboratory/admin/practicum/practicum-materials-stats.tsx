import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Archive, BarChart3, Package } from "lucide-react"

export default function PracticumMaterialsStats({ materials, requests }) {
  // Menghitung statistik
  const totalMaterials = materials.length
  const lowStockMaterials = materials.filter((m) => m.quantity <= m.threshold && m.quantity > 0).length
  const outOfStockMaterials = materials.filter((m) => m.quantity <= 0).length
  const pendingRequests = requests.filter((r) => r.status === "pending").length

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Bahan</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalMaterials}</div>
          <p className="text-xs text-muted-foreground">Untuk {new Set(materials.map((m) => m.course)).size} mata kuliah</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Stok Menipis</CardTitle>
          <AlertTriangle className="h-4 w-4 text-amber-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{lowStockMaterials}</div>
          <p className="text-xs text-muted-foreground">Perlu segera diisi ulang</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Stok Habis</CardTitle>
          <Archive className="h-4 w-4 text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{outOfStockMaterials}</div>
          <p className="text-xs text-muted-foreground">Memerlukan perhatian segera</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Permintaan Tertunda</CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{pendingRequests}</div>
          <p className="text-xs text-muted-foreground">Menunggu persetujuan</p>
        </CardContent>
      </Card>
    </div>
  )
}

