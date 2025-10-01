import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Plus, Edit, Settings } from "lucide-react"

export default function DocumentTypesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Document Types</h1>
          <p className="text-muted-foreground">
            Manage available document types and their configurations
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Document Type
        </Button>
      </div>

      {/* Document Types Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                KKP
              </div>
              <Badge variant="outline" className="text-green-600">Active</Badge>
            </CardTitle>
            <CardDescription>Kerja Praktik</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm"><strong>Available for:</strong></p>
              <div className="flex flex-wrap gap-1">
                <Badge variant="secondary">Informatika</Badge>
                <Badge variant="secondary">Elektro</Badge>
                <Badge variant="secondary">Arsitektur</Badge>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm"><strong>Generated:</strong> 432 documents</p>
              <p className="text-sm"><strong>Success Rate:</strong> 99.1%</p>
            </div>

            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button size="sm" variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Config
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Thesis
              </div>
              <Badge variant="outline" className="text-green-600">Active</Badge>
            </CardTitle>
            <CardDescription>Skripsi / Tugas Akhir</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm"><strong>Available for:</strong></p>
              <div className="flex flex-wrap gap-1">
                <Badge variant="secondary">Informatika</Badge>
                <Badge variant="secondary">Elektro</Badge>
                <Badge variant="secondary">Arsitektur</Badge>
                <Badge variant="secondary">Teknik Mesin</Badge>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm"><strong>Generated:</strong> 298 documents</p>
              <p className="text-sm"><strong>Success Rate:</strong> 98.7%</p>
            </div>

            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button size="sm" variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Config
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Proposal
              </div>
              <Badge variant="outline" className="text-green-600">Active</Badge>
            </CardTitle>
            <CardDescription>Proposal Penelitian</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm"><strong>Available for:</strong></p>
              <div className="flex flex-wrap gap-1">
                <Badge variant="secondary">Informatika</Badge>
                <Badge variant="secondary">Elektro</Badge>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm"><strong>Generated:</strong> 267 documents</p>
              <p className="text-sm"><strong>Success Rate:</strong> 97.8%</p>
            </div>

            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button size="sm" variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Config
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Final Report
              </div>
              <Badge variant="outline" className="text-green-600">Active</Badge>
            </CardTitle>
            <CardDescription>Laporan Akhir</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm"><strong>Available for:</strong></p>
              <div className="flex flex-wrap gap-1">
                <Badge variant="secondary">All Programs</Badge>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm"><strong>Generated:</strong> 187 documents</p>
              <p className="text-sm"><strong>Success Rate:</strong> 99.5%</p>
            </div>

            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button size="sm" variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Config
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Certificate
              </div>
              <Badge variant="outline" className="text-yellow-600">Draft</Badge>
            </CardTitle>
            <CardDescription>Sertifikat</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm"><strong>Available for:</strong></p>
              <div className="flex flex-wrap gap-1">
                <Badge variant="secondary">All Programs</Badge>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm"><strong>Generated:</strong> 0 documents</p>
              <p className="text-sm"><strong>Status:</strong> In Development</p>
            </div>

            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button size="sm" variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Config
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-dashed">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2 text-muted-foreground">
              <Plus className="h-5 w-5" />
              Add New Type
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <Button variant="ghost" className="h-24">
              Create new document type
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Document Type Statistics</CardTitle>
          <CardDescription>
            Performance and usage statistics for each document type
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-muted">
                <tr>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Total Generated</th>
                  <th className="px-6 py-3">Success Rate</th>
                  <th className="px-6 py-3">Avg Generation Time</th>
                  <th className="px-6 py-3">Most Popular Prodi</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-muted/50">
                  <td className="px-6 py-4 font-medium">KKP</td>
                  <td className="px-6 py-4">432</td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className="text-green-600">99.1%</Badge>
                  </td>
                  <td className="px-6 py-4">2.3s</td>
                  <td className="px-6 py-4">Informatika</td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className="text-green-600">Active</Badge>
                  </td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="px-6 py-4 font-medium">Thesis</td>
                  <td className="px-6 py-4">298</td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className="text-green-600">98.7%</Badge>
                  </td>
                  <td className="px-6 py-4">3.1s</td>
                  <td className="px-6 py-4">Elektro</td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className="text-green-600">Active</Badge>
                  </td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="px-6 py-4 font-medium">Proposal</td>
                  <td className="px-6 py-4">267</td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className="text-green-600">97.8%</Badge>
                  </td>
                  <td className="px-6 py-4">2.8s</td>
                  <td className="px-6 py-4">Informatika</td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className="text-green-600">Active</Badge>
                  </td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="px-6 py-4 font-medium">Final Report</td>
                  <td className="px-6 py-4">187</td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className="text-green-600">99.5%</Badge>
                  </td>
                  <td className="px-6 py-4">2.1s</td>
                  <td className="px-6 py-4">Arsitektur</td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className="text-green-600">Active</Badge>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
