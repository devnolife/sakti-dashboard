import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Search, Filter, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function CourseManagement() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Manajemen Mata Kuliah
          </span>
        </h2>
        <p className="text-muted-foreground mt-2">Lihat dan kelola informasi mata kuliah</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Cari mata kuliah..."
            className="w-full pl-8 rounded-full border-primary/20 focus-visible:ring-primary"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="outline" size="sm" className="rounded-full">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button size="sm" className="rounded-full">
            <Plus className="h-4 w-4 mr-2" />
            Tambah Mata Kuliah
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="overflow-hidden gradient-border card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {
                  [
                    "Pengantar Ilmu Komputer",
                    "Matematika Lanjutan",
                    "Fisika Modern",
                    "Sastra Dunia",
                    "Kimia Organik",
                    "Etika Bisnis",
                  ][i]
                }
              </CardTitle>
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <BookOpen className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground mb-2">
                {["CS101", "MATH301", "PHYS201", "LIT110", "CHEM240", "BUS350"][i]} •{" "}
                {["3 SKS", "4 SKS", "3 SKS", "3 SKS", "4 SKS", "3 SKS"][i]} •{" "}
                {["Ganjil 2023", "Genap 2024", "Ganjil 2023", "Genap 2024", "Ganjil 2023", "Genap 2024"][i]}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <div className="h-6 w-6 rounded-full bg-secondary/10 flex items-center justify-center">
                    <span className="text-xs font-medium text-secondary">
                      {["42", "35", "28", "50", "22", "31"][i]}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">mahasiswa</span>
                </div>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    [
                      "bg-green-500/10 text-green-500",
                      "bg-blue-500/10 text-blue-500",
                      "bg-amber-500/10 text-amber-500",
                    ][i % 3]
                  }`}
                >
                  {["Aktif", "Akan Datang", "Pendaftaran Dibuka"][i % 3]}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

