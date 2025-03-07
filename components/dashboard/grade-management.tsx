import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Filter, Download, BookOpen, BarChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function GradeManagement() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Manajemen Nilai
          </span>
        </h2>
        <p className="text-muted-foreground mt-2">Lihat dan kelola nilai mahasiswa</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Cari mata kuliah atau mahasiswa..."
            className="w-full pl-8 rounded-full border-primary/20 focus-visible:ring-primary"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="outline" size="sm" className="rounded-full">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            <Download className="h-4 w-4 mr-2" />
            Ekspor
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="overflow-hidden gradient-border card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <span>Nilai Terbaru</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { course: "Pengantar Ilmu Komputer", code: "CS101", grade: "A", score: 92 },
                { course: "Kalkulus I", code: "MATH101", grade: "B+", score: 87 },
                { course: "Fisika Dasar", code: "PHYS101", grade: "A-", score: 90 },
                { course: "Bahasa Inggris Akademik", code: "ENG101", grade: "A", score: 95 },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-lg border border-primary/10 hover:bg-muted/30"
                >
                  <div>
                    <p className="font-medium text-sm">{item.course}</p>
                    <p className="text-xs text-muted-foreground">{item.code}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="font-medium text-sm">{item.score}%</p>
                      <p className="text-xs text-muted-foreground">Nilai</p>
                    </div>
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center font-bold ${
                        item.grade.startsWith("A")
                          ? "bg-green-500/10 text-green-500"
                          : item.grade.startsWith("B")
                            ? "bg-blue-500/10 text-blue-500"
                            : item.grade.startsWith("C")
                              ? "bg-amber-500/10 text-amber-500"
                              : "bg-red-500/10 text-red-500"
                      }`}
                    >
                      {item.grade}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden gradient-border card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5 text-secondary" />
              <span>Ringkasan Nilai</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">IPK Semester Ini</span>
                <span className="font-bold text-lg">3,8</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                  style={{ width: "85%" }}
                ></div>
              </div>
              <div className="grid grid-cols-4 gap-2 pt-4">
                {[
                  { label: "A", count: 5, color: "bg-green-500/10 text-green-500" },
                  { label: "B", count: 2, color: "bg-blue-500/10 text-blue-500" },
                  { label: "C", count: 1, color: "bg-amber-500/10 text-amber-500" },
                  { label: "D/F", count: 0, color: "bg-red-500/10 text-red-500" },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center p-2 rounded-lg border border-primary/10">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold ${item.color}`}>
                      {item.label}
                    </div>
                    <span className="text-xs mt-1">{item.count}</span>
                  </div>
                ))}
              </div>
              <div className="pt-2">
                <p className="text-xs text-muted-foreground">Total SKS Semester Ini: 24</p>
                <p className="text-xs text-muted-foreground">Total SKS Kumulatif: 72</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

