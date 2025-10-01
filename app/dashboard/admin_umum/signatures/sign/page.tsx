import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { FileSignature, Upload, Eye, Download } from "lucide-react"

export default function SignDocumentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Sign Documents</h1>
        <p className="text-muted-foreground">
          Sign documents digitally with secure authentication
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileSignature className="h-5 w-5" />
              New Document Signature
            </CardTitle>
            <CardDescription>
              Upload and sign a new document
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="document-id">Document ID</Label>
              <Input
                id="document-id"
                placeholder="Enter document UUID"
                value="550e8400-e29b-41d4-a716-446655440001"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="signer">Select Signer</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Choose signer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="signer-001">Dr. Andi Setiawan - Dosen Pembimbing</SelectItem>
                  <SelectItem value="signer-002">Prof. Budi Rahman - Dekan</SelectItem>
                  <SelectItem value="signer-003">Dr. Sari Indah - Koordinator</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="signature-note">Signature Note (Optional)</Label>
              <Textarea
                id="signature-note"
                placeholder="Add a note for this signature..."
                rows={3}
              />
            </div>

            <div className="flex gap-2">
              <Button className="flex-1">
                <FileSignature className="mr-2 h-4 w-4" />
                Sign Document
              </Button>
              <Button variant="outline">
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Documents Awaiting Signature</CardTitle>
            <CardDescription>
              Documents that need your digital signature
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="space-y-1">
                  <p className="text-sm font-medium">KKP Report - Ahmad Fauzi Rahman</p>
                  <p className="text-xs text-muted-foreground">Type: Kerja Praktik | Prodi: Informatika</p>
                  <p className="text-xs text-muted-foreground">Created: 2025-01-01 10:30:00</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-yellow-600">Pending</Badge>
                  <Button size="sm" variant="outline">
                    <FileSignature className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Thesis Proposal - Sarah Putri</p>
                  <p className="text-xs text-muted-foreground">Type: Proposal Skripsi | Prodi: Elektro</p>
                  <p className="text-xs text-muted-foreground">Created: 2025-01-01 09:15:00</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-yellow-600">Pending</Badge>
                  <Button size="sm" variant="outline">
                    <FileSignature className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Final Report - Budi Santoso</p>
                  <p className="text-xs text-muted-foreground">Type: Laporan Akhir | Prodi: Arsitektur</p>
                  <p className="text-xs text-muted-foreground">Created: 2024-12-31 16:45:00</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-green-600">Signed</Badge>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Signature History</CardTitle>
          <CardDescription>
            Recent signature activities and their status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-muted">
                <tr>
                  <th className="px-6 py-3">Document ID</th>
                  <th className="px-6 py-3">Document Type</th>
                  <th className="px-6 py-3">Student</th>
                  <th className="px-6 py-3">Signer</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-6 py-4 font-mono text-xs">550e8400...440001</td>
                  <td className="px-6 py-4">KKP</td>
                  <td className="px-6 py-4">Ahmad Fauzi Rahman</td>
                  <td className="px-6 py-4">Dr. Andi Setiawan</td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className="text-green-600">Signed</Badge>
                  </td>
                  <td className="px-6 py-4">2025-01-01 10:30</td>
                  <td className="px-6 py-4">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-6 py-4 font-mono text-xs">123e4567...89ab</td>
                  <td className="px-6 py-4">Thesis</td>
                  <td className="px-6 py-4">Sarah Putri</td>
                  <td className="px-6 py-4">Prof. Budi Rahman</td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className="text-yellow-600">Pending</Badge>
                  </td>
                  <td className="px-6 py-4">2025-01-01 09:15</td>
                  <td className="px-6 py-4">
                    <Button size="sm" variant="outline">
                      <FileSignature className="h-4 w-4" />
                    </Button>
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
