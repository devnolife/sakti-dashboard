import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Shield, CheckCircle, XCircle, AlertTriangle, Search } from "lucide-react"

export default function VerifySignaturesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Verify Signatures</h1>
        <p className="text-muted-foreground">
          Verify the authenticity and integrity of digital signatures
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Signature Verification
          </CardTitle>
          <CardDescription>
            Enter document ID to verify its signature
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="document-verify">Document ID</Label>
              <Input
                id="document-verify"
                placeholder="Enter document UUID to verify"
                value="550e8400-e29b-41d4-a716-446655440001"
              />
            </div>
            <div className="flex items-end">
              <Button>
                <Search className="mr-2 h-4 w-4" />
                Verify
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Verification Result</CardTitle>
          <CardDescription>
            Signature verification details for document
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 p-4 border rounded-lg bg-green-50 border-green-200">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <div className="flex-1">
              <p className="font-medium text-green-800">Signature Valid</p>
              <p className="text-sm text-green-700">All signatures are authentic and document integrity is maintained</p>
            </div>
            <Badge variant="outline" className="text-green-600 border-green-600">Verified</Badge>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-medium">Document Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Document ID:</span>
                  <span className="font-mono">550e8400-e29b-41d4-a716-446655440001</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Document Type:</span>
                  <span>KKP Report</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Prodi:</span>
                  <span>Informatika</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Student:</span>
                  <span>Ahmad Fauzi Rahman (11219001)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created:</span>
                  <span>2025-01-01 10:30:00 UTC</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Signature Details</h4>
              <div className="space-y-3">
                <div className="border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Dr. Andi Setiawan</span>
                    <Badge variant="outline" className="text-green-600">Valid</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>Role: Dosen Pembimbing</p>
                    <p>Signed: 2025-01-01 11:15:00 UTC</p>
                    <p>Signature ID: sig-001-2025</p>
                  </div>
                </div>

                <div className="border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Prof. Budi Rahman</span>
                    <Badge variant="outline" className="text-green-600">Valid</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>Role: Dekan Fakultas</p>
                    <p>Signed: 2025-01-01 14:30:00 UTC</p>
                    <p>Signature ID: sig-002-2025</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Verification Activities</CardTitle>
          <CardDescription>
            Latest signature verification requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium">Document 550e8400-e29b...440001</p>
                  <p className="text-xs text-muted-foreground">Verified successfully - All signatures valid</p>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">2 mins ago</div>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="text-sm font-medium">Document 123e4567-e89b...cdef</p>
                  <p className="text-xs text-muted-foreground">Pending signature - Awaiting final approval</p>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">15 mins ago</div>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium">Document 789f0123-a456...7890</p>
                  <p className="text-xs text-muted-foreground">Verified successfully - All signatures valid</p>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">1 hour ago</div>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <XCircle className="h-5 w-5 text-red-600" />
                <div>
                  <p className="text-sm font-medium">Document abc12345-def6...9876</p>
                  <p className="text-xs text-muted-foreground">Verification failed - Invalid signature detected</p>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">2 hours ago</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Verified Today
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              +12% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Success Rate
            </CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.5%</div>
            <p className="text-xs text-muted-foreground">
              Verification accuracy
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Failed Verifications
            </CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Requires investigation
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
