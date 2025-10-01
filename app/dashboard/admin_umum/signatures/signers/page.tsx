import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Users, UserPlus, Search, Edit, Trash2, Shield } from "lucide-react"

export default function SignersManagementPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Manage Signers</h1>
        <p className="text-muted-foreground">
          Manage authorized signers and their permissions
        </p>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search signers..."
              className="pl-8 w-64"
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add New Signer
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Registered Signers
          </CardTitle>
          <CardDescription>
            Manage digital signature authorities and their roles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-muted">
                <tr>
                  <th className="px-6 py-3">Signer ID</th>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Role</th>
                  <th className="px-6 py-3">Prodi</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Last Activity</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-muted/50">
                  <td className="px-6 py-4 font-mono text-xs">signer-001</td>
                  <td className="px-6 py-4 font-medium">Dr. Andi Setiawan</td>
                  <td className="px-6 py-4">Dosen Pembimbing</td>
                  <td className="px-6 py-4">Informatika</td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className="text-green-600">Active</Badge>
                  </td>
                  <td className="px-6 py-4">2025-01-01 11:15</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Shield className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="px-6 py-4 font-mono text-xs">signer-002</td>
                  <td className="px-6 py-4 font-medium">Prof. Budi Rahman</td>
                  <td className="px-6 py-4">Dekan Fakultas</td>
                  <td className="px-6 py-4">All Prodi</td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className="text-green-600">Active</Badge>
                  </td>
                  <td className="px-6 py-4">2025-01-01 14:30</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Shield className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="px-6 py-4 font-mono text-xs">signer-003</td>
                  <td className="px-6 py-4 font-medium">Dr. Sari Indah</td>
                  <td className="px-6 py-4">Koordinator KKP</td>
                  <td className="px-6 py-4">Informatika</td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className="text-green-600">Active</Badge>
                  </td>
                  <td className="px-6 py-4">2024-12-30 16:45</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Shield className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="px-6 py-4 font-mono text-xs">signer-004</td>
                  <td className="px-6 py-4 font-medium">Dr. Ahmad Fauzi</td>
                  <td className="px-6 py-4">Dosen Pembimbing</td>
                  <td className="px-6 py-4">Elektro</td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className="text-yellow-600">Inactive</Badge>
                  </td>
                  <td className="px-6 py-4">2024-12-25 10:20</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Add New Signer</CardTitle>
          <CardDescription>
            Register a new authorized digital signer
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="signer-name">Full Name</Label>
              <Input
                id="signer-name"
                placeholder="Enter signer's full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="signer-role">Role</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dosen_pembimbing">Dosen Pembimbing</SelectItem>
                  <SelectItem value="koordinator">Koordinator</SelectItem>
                  <SelectItem value="dekan">Dekan Fakultas</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="signer-prodi">Program Studi</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select prodi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="informatika">Informatika</SelectItem>
                  <SelectItem value="elektro">Elektro</SelectItem>
                  <SelectItem value="arsitektur">Arsitektur</SelectItem>
                  <SelectItem value="all">All Prodi</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="signer-status">Status</Label>
              <Select defaultValue="active">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Create Signer
            </Button>
            <Button variant="outline">Cancel</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Signers
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">52</div>
            <p className="text-xs text-muted-foreground">
              Registered signers
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Signers
            </CardTitle>
            <Badge className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-muted-foreground">
              Currently active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Signatures Today
            </CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">
              Documents signed today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Approvals
            </CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              New signer requests
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
