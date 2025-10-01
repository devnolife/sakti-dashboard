import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { FileText, Search, Eye, Download, Filter, Plus } from "lucide-react"

export default function DocumentListPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Document List</h1>
          <p className="text-muted-foreground">
            View and manage all generated documents
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Generate New Document
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                className="pl-8"
              />
            </div>

            <Select defaultValue="all-types">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-types">All Types</SelectItem>
                <SelectItem value="kkp">KKP</SelectItem>
                <SelectItem value="thesis">Thesis</SelectItem>
                <SelectItem value="proposal">Proposal</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all-prodi">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-prodi">All Prodi</SelectItem>
                <SelectItem value="informatika">Informatika</SelectItem>
                <SelectItem value="elektro">Elektro</SelectItem>
                <SelectItem value="arsitektur">Arsitektur</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all-status">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-status">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="signed">Signed</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Document List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Generated Documents
          </CardTitle>
          <CardDescription>
            List of all documents in the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-muted">
                <tr>
                  <th className="px-6 py-3">Document ID</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Student</th>
                  <th className="px-6 py-3">Prodi</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Created</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-muted/50">
                  <td className="px-6 py-4 font-mono text-xs">550e8400-e29b-41d4-a716-446655440001</td>
                  <td className="px-6 py-4">
                    <Badge variant="outline">KKP</Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium">Ahmad Fauzi Rahman</p>
                      <p className="text-xs text-muted-foreground">11219001</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">Informatika</td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className="text-green-600">Signed</Badge>
                  </td>
                  <td className="px-6 py-4">2025-01-01 10:30</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>

                <tr className="border-b hover:bg-muted/50">
                  <td className="px-6 py-4 font-mono text-xs">123e4567-e89b-12d3-a456-426614174000</td>
                  <td className="px-6 py-4">
                    <Badge variant="outline">Thesis</Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium">Sarah Putri</p>
                      <p className="text-xs text-muted-foreground">11219002</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">Elektro</td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className="text-yellow-600">Pending</Badge>
                  </td>
                  <td className="px-6 py-4">2025-01-01 09:15</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" disabled>
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>

                <tr className="border-b hover:bg-muted/50">
                  <td className="px-6 py-4 font-mono text-xs">789f0123-a456-7890-bcde-f0123456789a</td>
                  <td className="px-6 py-4">
                    <Badge variant="outline">Proposal</Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium">Budi Santoso</p>
                      <p className="text-xs text-muted-foreground">11219003</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">Arsitektur</td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className="text-green-600">Signed</Badge>
                  </td>
                  <td className="px-6 py-4">2024-12-31 16:45</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>

                <tr className="border-b hover:bg-muted/50">
                  <td className="px-6 py-4 font-mono text-xs">abc12345-def6-7890-1234-56789abcdef0</td>
                  <td className="px-6 py-4">
                    <Badge variant="outline">KKP</Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium">Dewi Sartika</p>
                      <p className="text-xs text-muted-foreground">11219004</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">Informatika</td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className="text-red-600">Rejected</Badge>
                  </td>
                  <td className="px-6 py-4">2024-12-30 14:20</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" disabled>
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Documents
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">
              All time generated
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Signatures
            </CardTitle>
            <Badge className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">
              Awaiting signature
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completed Today
            </CardTitle>
            <Badge className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              Documents completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Success Rate
            </CardTitle>
            <Badge className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.5%</div>
            <p className="text-xs text-muted-foreground">
              Generation success
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
