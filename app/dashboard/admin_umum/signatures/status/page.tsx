import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Activity,
  Search,
  Filter,
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
  Eye,
  RefreshCw
} from "lucide-react"

export default function SignatureStatusPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Signature Status</h1>
          <p className="text-muted-foreground">
            Track and monitor signature status for all documents
          </p>
        </div>
        <Button variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh Status
        </Button>
      </div>

      {/* Status Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completed
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">1,847</div>
            <p className="text-xs text-muted-foreground">
              All signatures complete
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">23</div>
            <p className="text-xs text-muted-foreground">
              Awaiting signatures
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              In Progress
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">8</div>
            <p className="text-xs text-muted-foreground">
              Partially signed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Failed
            </CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">3</div>
            <p className="text-xs text-muted-foreground">
              Signature errors
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter Documents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by document ID or student..."
                className="pl-8"
              />
            </div>

            <Select defaultValue="all-status">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-status">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>

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
          </div>
        </CardContent>
      </Card>

      {/* Document Status List */}
      <Card>
        <CardHeader>
          <CardTitle>Document Signature Status</CardTitle>
          <CardDescription>
            Detailed signature status for all documents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-muted">
                <tr>
                  <th className="px-6 py-3">Document ID</th>
                  <th className="px-6 py-3">Student</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Signatures</th>
                  <th className="px-6 py-3">Last Updated</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-muted/50">
                  <td className="px-6 py-4 font-mono text-xs">550e8400-e29b...</td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium">Ahmad Fauzi Rahman</p>
                      <p className="text-xs text-muted-foreground">11219001</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="outline">KKP</Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className="text-green-600">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Completed
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1">
                      <Badge variant="secondary" className="text-xs">Pembimbing ✓</Badge>
                      <Badge variant="secondary" className="text-xs">Dekan ✓</Badge>
                    </div>
                  </td>
                  <td className="px-6 py-4">2025-01-01 14:30</td>
                  <td className="px-6 py-4">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>

                <tr className="border-b hover:bg-muted/50">
                  <td className="px-6 py-4 font-mono text-xs">123e4567-e89b...</td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium">Sarah Putri</p>
                      <p className="text-xs text-muted-foreground">11219002</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="outline">Thesis</Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className="text-yellow-600">
                      <Clock className="mr-1 h-3 w-3" />
                      Pending
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1">
                      <Badge variant="secondary" className="text-xs">Pembimbing ✓</Badge>
                      <Badge variant="outline" className="text-xs">Dekan ⏳</Badge>
                    </div>
                  </td>
                  <td className="px-6 py-4">2025-01-01 09:15</td>
                  <td className="px-6 py-4">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>

                <tr className="border-b hover:bg-muted/50">
                  <td className="px-6 py-4 font-mono text-xs">789f0123-a456...</td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium">Budi Santoso</p>
                      <p className="text-xs text-muted-foreground">11219003</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="outline">Proposal</Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className="text-blue-600">
                      <Activity className="mr-1 h-3 w-3" />
                      In Progress
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1">
                      <Badge variant="outline" className="text-xs">Pembimbing ⏳</Badge>
                      <Badge variant="outline" className="text-xs">Dekan ⏳</Badge>
                    </div>
                  </td>
                  <td className="px-6 py-4">2024-12-31 16:45</td>
                  <td className="px-6 py-4">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>

                <tr className="border-b hover:bg-muted/50">
                  <td className="px-6 py-4 font-mono text-xs">abc12345-def6...</td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium">Dewi Sartika</p>
                      <p className="text-xs text-muted-foreground">11219004</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="outline">KKP</Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className="text-red-600">
                      <XCircle className="mr-1 h-3 w-3" />
                      Failed
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1">
                      <Badge variant="destructive" className="text-xs">Signature Error</Badge>
                    </div>
                  </td>
                  <td className="px-6 py-4">2024-12-30 14:20</td>
                  <td className="px-6 py-4">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Signature Process Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Signature Activities</CardTitle>
          <CardDescription>
            Timeline of recent signature status changes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">Document 550e8400-e29b... fully signed</p>
                <p className="text-xs text-muted-foreground">
                  Prof. Budi Rahman completed final signature for Ahmad Fauzi Rahman's KKP document
                </p>
                <p className="text-xs text-muted-foreground">2 minutes ago</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Activity className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">Signature initiated</p>
                <p className="text-xs text-muted-foreground">
                  Dr. Andi Setiawan signed Sarah Putri's thesis document, awaiting Dekan approval
                </p>
                <p className="text-xs text-muted-foreground">15 minutes ago</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">Signature reminder sent</p>
                <p className="text-xs text-muted-foreground">
                  Automated reminder sent to Dr. Sari Indah for pending signature on document 789f0123...
                </p>
                <p className="text-xs text-muted-foreground">1 hour ago</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">Signature failed</p>
                <p className="text-xs text-muted-foreground">
                  Document abc12345-def6... signature process failed due to invalid certificate
                </p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
