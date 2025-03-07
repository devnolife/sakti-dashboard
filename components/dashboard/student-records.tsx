import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Filter, Download, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function StudentRecords() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Data Mahasiswa
          </span>
        </h2>
        <p className="text-muted-foreground mt-2">Akses dan kelola informasi mahasiswa</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Cari mahasiswa..."
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

      <Card className="overflow-hidden gradient-border">
        <CardHeader>
          <CardTitle>Direktori Mahasiswa</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Nama
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    NIM
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">
                    Jurusan
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">
                    Angkatan
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { name: "Alex Johnson", id: "M10045", major: "Ilmu Komputer", year: "Tahun ke-3", status: "Aktif" },
                  { name: "Jamie Smith", id: "M10078", major: "Biologi", year: "Tahun ke-2", status: "Aktif" },
                  { name: "Taylor Williams", id: "M10092", major: "Bisnis", year: "Tahun ke-4", status: "Aktif" },
                  { name: "Jordan Brown", id: "M10103", major: "Psikologi", year: "Tahun ke-1", status: "Percobaan" },
                  { name: "Casey Davis", id: "M10118", major: "Teknik", year: "Tahun ke-3", status: "Aktif" },
                ].map((student, i) => (
                  <tr key={i} className="hover:bg-muted/30">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <div className="text-sm font-medium">{student.name}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">{student.id}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm hidden md:table-cell">{student.major}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm hidden md:table-cell">{student.year}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          student.status === "Aktif"
                            ? "bg-green-500/10 text-green-500"
                            : "bg-amber-500/10 text-amber-500"
                        }`}
                      >
                        {student.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

