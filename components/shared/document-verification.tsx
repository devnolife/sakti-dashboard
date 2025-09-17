"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  QrCode,
  Search,
  Shield,
  CheckCircle,
  AlertTriangle,
  XCircle,
  FileText,
  Download,
  Copy,
  Eye,
  Calendar,
  User,
  Building,
  Fingerprint,
  Clock,
  Hash,
  Camera,
  Upload
} from "lucide-react"

interface VerificationResult {
  isValid: boolean
  documentId: string
  documentType: string
  studentName: string
  nim: string
  prodi: string
  issueDate: string
  expiryDate?: string
  verificationDate: string
  digitalSignatures: DigitalSignature[]
  qrCodeData?: string
  status: "valid" | "invalid" | "expired" | "tampered"
}

interface DigitalSignature {
  signerName: string
  signerRole: string
  signatureDate: string
  isValid: boolean
  algorithm: string
}

export default function DocumentVerification() {
  const [verificationMethod, setVerificationMethod] = useState<"qr" | "id" | "upload">("qr")
  const [qrData, setQrData] = useState("")
  const [documentId, setDocumentId] = useState("")
  const [verifying, setVerifying] = useState(false)
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null)

  const handleVerifyByQR = async () => {
    setVerifying(true)

    // Simulate API call to verify QR
    await new Promise(resolve => setTimeout(resolve, 2000))

    const mockResult: VerificationResult = {
      isValid: true,
      documentId: "DOC_2024_001234",
      documentType: "Transkrip Nilai Resmi",
      studentName: "Ahmad Fauzi Rahman",
      nim: "2021123456",
      prodi: "Informatika",
      issueDate: "2024-01-15",
      verificationDate: new Date().toISOString(),
      digitalSignatures: [
        {
          signerName: "Dr. Jane Smith",
          signerRole: "Ketua Program Studi",
          signatureDate: "2024-01-15T10:30:00Z",
          isValid: true,
          algorithm: "EdDSA"
        },
        {
          signerName: "Prof. Bob Johnson",
          signerRole: "Dekan",
          signatureDate: "2024-01-15T14:45:00Z",
          isValid: true,
          algorithm: "EdDSA"
        }
      ],
      qrCodeData: qrData,
      status: "valid"
    }

    setVerificationResult(mockResult)
    setVerifying(false)
  }

  const handleVerifyById = async () => {
    setVerifying(true)

    // Simulate API call to verify by ID
    await new Promise(resolve => setTimeout(resolve, 1500))

    const mockResult: VerificationResult = {
      isValid: false,
      documentId: documentId,
      documentType: "Unknown",
      studentName: "",
      nim: "",
      prodi: "",
      issueDate: "",
      verificationDate: new Date().toISOString(),
      digitalSignatures: [],
      status: "invalid"
    }

    setVerificationResult(mockResult)
    setVerifying(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "valid": return <CheckCircle className="w-6 h-6 text-green-500" />
      case "invalid": return <XCircle className="w-6 h-6 text-red-500" />
      case "expired": return <Clock className="w-6 h-6 text-yellow-500" />
      case "tampered": return <AlertTriangle className="w-6 h-6 text-orange-500" />
      default: return <FileText className="w-6 h-6 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "valid": return "bg-green-500/10 text-green-600 border-green-500/20"
      case "invalid": return "bg-red-500/10 text-red-600 border-red-500/20"
      case "expired": return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
      case "tampered": return "bg-orange-500/10 text-orange-600 border-orange-500/20"
      default: return "bg-gray-500/10 text-gray-600 border-gray-500/20"
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">
              Document Verification
            </span>
          </h2>
          <p className="mt-2 text-muted-foreground">
            Verify the authenticity of official documents using QR codes or document IDs
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Camera className="w-4 h-4 mr-2" />
            Scan QR Code
          </Button>
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Upload Document
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Verification Input */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Verify Document
            </CardTitle>
            <CardDescription>Choose verification method and enter document information</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={verificationMethod} onValueChange={(value) => setVerificationMethod(value as any)} className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="qr">QR Code</TabsTrigger>
                <TabsTrigger value="id">Document ID</TabsTrigger>
                <TabsTrigger value="upload">Upload File</TabsTrigger>
              </TabsList>

              <TabsContent value="qr" className="space-y-4">
                <div className="space-y-4">
                  <Alert>
                    <QrCode className="h-4 w-4" />
                    <AlertDescription>
                      Scan or paste the QR code data from the official document
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-2">
                    <Label htmlFor="qr-data">QR Code Data</Label>
                    <Textarea
                      id="qr-data"
                      value={qrData}
                      onChange={(e) => setQrData(e.target.value)}
                      placeholder="Paste QR code data here or use the camera scanner"
                      className="min-h-[120px] font-mono text-sm"
                    />
                  </div>

                  <Button
                    onClick={handleVerifyByQR}
                    disabled={verifying || !qrData.trim()}
                    className="w-full"
                  >
                    {verifying ? (
                      <>
                        <Clock className="w-4 h-4 mr-2 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <QrCode className="w-4 h-4 mr-2" />
                        Verify QR Code
                      </>
                    )}
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="id" className="space-y-4">
                <div className="space-y-4">
                  <Alert>
                    <Hash className="h-4 w-4" />
                    <AlertDescription>
                      Enter the unique document ID to verify authenticity
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-2">
                    <Label htmlFor="doc-id">Document ID</Label>
                    <Input
                      id="doc-id"
                      value={documentId}
                      onChange={(e) => setDocumentId(e.target.value)}
                      placeholder="e.g., DOC_2024_001234"
                      className="font-mono"
                    />
                  </div>

                  <Button
                    onClick={handleVerifyById}
                    disabled={verifying || !documentId.trim()}
                    className="w-full"
                  >
                    {verifying ? (
                      <>
                        <Clock className="w-4 h-4 mr-2 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <Search className="w-4 h-4 mr-2" />
                        Verify Document ID
                      </>
                    )}
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="upload" className="space-y-4">
                <div className="space-y-4">
                  <Alert>
                    <Upload className="h-4 w-4" />
                    <AlertDescription>
                      Upload the PDF document to verify its digital signatures
                    </AlertDescription>
                  </Alert>

                  <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Upload Document</h3>
                    <p className="text-muted-foreground mb-4">
                      Drag and drop your PDF file here, or click to browse
                    </p>
                    <Button variant="outline">
                      <Upload className="w-4 h-4 mr-2" />
                      Choose File
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Verification Result */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Fingerprint className="w-5 h-5" />
              Verification Result
            </CardTitle>
            <CardDescription>Document authenticity and signature verification</CardDescription>
          </CardHeader>
          <CardContent>
            {verificationResult ? (
              <div className="space-y-6">
                {/* Status Header */}
                <div className="flex items-center gap-3 p-4 border rounded-lg">
                  {getStatusIcon(verificationResult.status)}
                  <div className="flex-1">
                    <h3 className="font-medium text-lg">
                      {verificationResult.status === "valid" ? "Document Valid" : "Verification Failed"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Verified on {new Date(verificationResult.verificationDate).toLocaleString()}
                    </p>
                  </div>
                  <Badge className={getStatusColor(verificationResult.status)}>
                    {verificationResult.status.toUpperCase()}
                  </Badge>
                </div>

                {verificationResult.isValid && (
                  <>
                    {/* Document Information */}
                    <div className="space-y-4">
                      <h4 className="font-medium flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Document Information
                      </h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Document ID:</span>
                          <p className="font-mono">{verificationResult.documentId}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Document Type:</span>
                          <p>{verificationResult.documentType}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Student Name:</span>
                          <p>{verificationResult.studentName}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">NIM:</span>
                          <p>{verificationResult.nim}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Program Study:</span>
                          <p>{verificationResult.prodi}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Issue Date:</span>
                          <p>{new Date(verificationResult.issueDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Digital Signatures */}
                    <div className="space-y-4">
                      <h4 className="font-medium flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        Digital Signatures ({verificationResult.digitalSignatures.length})
                      </h4>
                      <div className="space-y-3">
                        {verificationResult.digitalSignatures.map((signature, index) => (
                          <div key={index} className="p-3 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-muted-foreground" />
                                <span className="font-medium">{signature.signerName}</span>
                              </div>
                              {signature.isValid ? (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              ) : (
                                <XCircle className="w-4 h-4 text-red-500" />
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground space-y-1">
                              <p>Role: {signature.signerRole}</p>
                              <p>Signed: {new Date(signature.signatureDate).toLocaleString()}</p>
                              <p>Algorithm: {signature.algorithm}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        <Download className="w-4 h-4 mr-2" />
                        Download Report
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => copyToClipboard(verificationResult.documentId)}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy ID
                      </Button>
                      <Button variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        View Document
                      </Button>
                    </div>
                  </>
                )}

                {!verificationResult.isValid && (
                  <div className="text-center py-8">
                    <XCircle className="w-16 h-16 mx-auto text-red-500 mb-4" />
                    <h3 className="text-lg font-medium mb-2">Document Not Found</h3>
                    <p className="text-muted-foreground mb-4">
                      The document ID or QR code you provided could not be verified.
                      Please check the information and try again.
                    </p>
                    <Button variant="outline" onClick={() => setVerificationResult(null)}>
                      Try Again
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <QrCode className="w-16 h-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Ready to Verify</h3>
                <p className="text-muted-foreground">
                  Enter document information to start verification
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Verification Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="w-5 h-5" />
            Verification Statistics
          </CardTitle>
          <CardDescription>Recent verification activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">1,247</div>
              <div className="text-sm text-muted-foreground">Valid Documents</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-red-600">23</div>
              <div className="text-sm text-muted-foreground">Invalid Attempts</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">156</div>
              <div className="text-sm text-muted-foreground">Today's Verifications</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-purple-600">99.2%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}