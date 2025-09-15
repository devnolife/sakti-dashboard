"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Server,
  Send,
  Copy,
  Download,
  Upload,
  FileText,
  Settings,
  Database,
  Code,
  Eye,
  Edit,
  Trash2,
  Plus,
  Play,
  History,
  BookOpen,
  AlertCircle,
  CheckCircle,
  Users,
  GraduationCap,
  Clock,
  Shield
} from "lucide-react"

interface ApiEndpoint {
  id: string
  name: string
  method: string
  url: string
  description: string
  category: string
  status: "active" | "deprecated" | "beta"
  accessLevel: "read" | "write" | "admin"
}

interface ApiResponse {
  status: number
  statusText: string
  data: any
  headers: Record<string, string>
  time: number
}

export default function StaffTuPostmanInterface() {
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>("")
  const [baseUrl, setBaseUrl] = useState("http://localhost:8080/api")
  const [requestBody, setRequestBody] = useState("")
  const [headers, setHeaders] = useState<Record<string, string>>({
    "Content-Type": "application/json",
    "Authorization": "Bearer {{staff_tu_token}}"
  })
  const [response, setResponse] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(false)

  const endpoints: ApiEndpoint[] = [
    {
      id: "generate-student-doc",
      name: "Generate Student Document",
      method: "POST",
      url: "/generate-document/{{type}}/{{prodi}}",
      description: "Generate official documents for students (certificates, transcripts)",
      category: "Student Services",
      status: "active",
      accessLevel: "write"
    },
    {
      id: "verify-student-doc",
      name: "Verify Student Document",
      method: "POST",
      url: "/verify-qr",
      description: "Verify authenticity of student documents via QR code",
      category: "Student Services",
      status: "active",
      accessLevel: "read"
    },
    {
      id: "list-student-docs",
      name: "List Student Documents",
      method: "GET",
      url: "/documents",
      description: "View all student documents with filtering by prodi and type",
      category: "Student Services",
      status: "active",
      accessLevel: "read"
    },
    {
      id: "download-student-doc",
      name: "Download Student Document",
      method: "GET",
      url: "/documents/{{documentId}}/download",
      description: "Download official student documents",
      category: "Student Services",
      status: "active",
      accessLevel: "read"
    },
    {
      id: "manage-academic-staff",
      name: "Manage Academic Staff",
      method: "GET",
      url: "/signers",
      description: "View and manage academic staff who can sign documents",
      category: "Academic Management",
      status: "active",
      accessLevel: "read"
    },
    {
      id: "create-academic-staff",
      name: "Add Academic Staff",
      method: "POST",
      url: "/signers",
      description: "Add new academic staff member as document signer",
      category: "Academic Management",
      status: "active",
      accessLevel: "write"
    },
    {
      id: "update-academic-staff",
      name: "Update Academic Staff",
      method: "PUT",
      url: "/signers/{{signerId}}",
      description: "Update academic staff information and signing permissions",
      category: "Academic Management",
      status: "active",
      accessLevel: "write"
    },
    {
      id: "manage-doc-templates",
      name: "Manage Document Templates",
      method: "GET",
      url: "/document-configs",
      description: "View and manage document templates for different programs",
      category: "Template Management",
      status: "active",
      accessLevel: "read"
    },
    {
      id: "create-doc-template",
      name: "Create Document Template",
      method: "POST",
      url: "/document-configs",
      description: "Create new document template for specific program and type",
      category: "Template Management",
      status: "active",
      accessLevel: "write"
    },
    {
      id: "update-doc-template",
      name: "Update Document Template",
      method: "PUT",
      url: "/document-configs/{{docConfigId}}",
      description: "Update existing document template configuration",
      category: "Template Management",
      status: "active",
      accessLevel: "write"
    },
    {
      id: "manage-signature-rules",
      name: "Manage Signature Rules",
      method: "GET",
      url: "/signature-configs",
      description: "View signature requirements for different document types",
      category: "Administrative",
      status: "active",
      accessLevel: "read"
    },
    {
      id: "academic-stats",
      name: "Academic Statistics",
      method: "GET",
      url: "/stats",
      description: "View statistics on document generation and academic processes",
      category: "Reports",
      status: "active",
      accessLevel: "read"
    },
    {
      id: "prodi-stats",
      name: "Program Study Statistics",
      method: "GET",
      url: "/stats/prodi/{{prodi}}",
      description: "Detailed statistics for specific program study",
      category: "Reports",
      status: "beta",
      accessLevel: "read"
    }
  ]

  const getMethodColor = (method: string) => {
    switch (method.toUpperCase()) {
      case "GET": return "bg-green-500/10 text-green-600 border-green-500/20"
      case "POST": return "bg-blue-500/10 text-blue-600 border-blue-500/20"
      case "PUT": return "bg-orange-500/10 text-orange-600 border-orange-500/20"
      case "DELETE": return "bg-red-500/10 text-red-600 border-red-500/20"
      default: return "bg-gray-500/10 text-gray-600 border-gray-500/20"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500/10 text-green-600"
      case "deprecated": return "bg-red-500/10 text-red-600"
      case "beta": return "bg-yellow-500/10 text-yellow-600"
      default: return "bg-gray-500/10 text-gray-600"
    }
  }

  const getAccessLevelIcon = (level: string) => {
    switch (level) {
      case "read": return <Eye className="w-3 h-3" />
      case "write": return <Edit className="w-3 h-3" />
      case "admin": return <Shield className="w-3 h-3" />
      default: return null
    }
  }

  const handleSendRequest = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1200))

      const endpoint = endpoints.find(e => e.id === selectedEndpoint)
      const mockResponse: ApiResponse = {
        status: 200,
        statusText: "OK",
        data: {
          success: true,
          message: "Request completed successfully",
          data: endpoint?.category === "Student Services" ? {
            documentId: "STU_DOC_" + Date.now(),
            studentName: "John Doe",
            studentId: "2021123456",
            documentType: "transcript",
            prodi: "informatika",
            generatedAt: new Date().toISOString(),
            signatureStatus: "signed",
            signers: ["Dr. Jane Smith", "Prof. Bob Johnson"],
            downloadUrl: "/documents/STU_DOC_" + Date.now() + "/download"
          } : endpoint?.category === "Academic Management" ? {
            staffId: "STAFF_" + Date.now(),
            name: "Dr. Academic Staff",
            nip: "198512345678901234",
            role: "dosen_pembimbing",
            department: "Fakultas Teknik",
            prodi: "informatika",
            permissions: ["sign_documents", "manage_students"],
            isActive: true
          } : {
            totalDocuments: 1245,
            documentsThisMonth: 87,
            activeStaff: 24,
            templateCount: 12,
            averageProcessingTime: "2.5 hours"
          }
        },
        headers: {
          "Content-Type": "application/json",
          "X-Response-Time": "156ms",
          "X-Request-ID": "req_" + Date.now()
        },
        time: 156
      }

      setResponse(mockResponse)
    } catch (error) {
      console.error("Request failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const exportCollection = () => {
    const collection = {
      info: {
        name: "Staff TU API Collection",
        description: "API collection for Staff Tata Usaha role - Academic Administration",
        version: "1.0.0"
      },
      endpoints: endpoints,
      baseUrl: baseUrl,
      authentication: {
        type: "Bearer Token",
        description: "Staff TU role requires authentication for most operations"
      }
    }

    const blob = new Blob([JSON.stringify(collection, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "staff-tu-api-collection.json"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Staff TU API Interface
            </span>
          </h2>
          <p className="mt-2 text-muted-foreground">
            Academic administration API testing interface for Staff Tata Usaha
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportCollection}>
            <Download className="w-4 h-4 mr-2" />
            Export Collection
          </Button>
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import Collection
          </Button>
        </div>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Staff TU interface provides access to academic administration endpoints. Some operations require elevated permissions.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar - Endpoints */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5" />
              Academic API Endpoints
            </CardTitle>
            <CardDescription>Available endpoints for academic administration</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="base-url">Base URL</Label>
                <Input
                  id="base-url"
                  value={baseUrl}
                  onChange={(e) => setBaseUrl(e.target.value)}
                  placeholder="http://localhost:8080/api"
                />
              </div>

              <Separator />

              <ScrollArea className="h-[500px]">
                <div className="space-y-2">
                  {["Student Services", "Academic Management", "Template Management", "Administrative", "Reports"].map((category) => (
                    <div key={category}>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                        {category === "Student Services" && <Users className="w-4 h-4" />}
                        {category === "Academic Management" && <GraduationCap className="w-4 h-4" />}
                        {category === "Template Management" && <FileText className="w-4 h-4" />}
                        {category === "Administrative" && <Settings className="w-4 h-4" />}
                        {category === "Reports" && <Database className="w-4 h-4" />}
                        {category}
                      </h4>
                      <div className="space-y-1 mb-4">
                        {endpoints
                          .filter((endpoint) => endpoint.category === category)
                          .map((endpoint) => (
                            <div
                              key={endpoint.id}
                              className={`p-3 rounded-lg border cursor-pointer transition-colors hover:bg-muted/50 ${
                                selectedEndpoint === endpoint.id ? "bg-muted border-primary" : ""
                              }`}
                              onClick={() => setSelectedEndpoint(endpoint.id)}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <Badge className={`text-xs ${getMethodColor(endpoint.method)}`}>
                                  {endpoint.method}
                                </Badge>
                                <div className="flex gap-1">
                                  <Badge className={`text-xs ${getStatusColor(endpoint.status)}`}>
                                    {endpoint.status}
                                  </Badge>
                                  <Badge variant="secondary" className="text-xs flex items-center gap-1">
                                    {getAccessLevelIcon(endpoint.accessLevel)}
                                    {endpoint.accessLevel}
                                  </Badge>
                                </div>
                              </div>
                              <div className="text-sm font-medium">{endpoint.name}</div>
                              <div className="text-xs text-muted-foreground mt-1">
                                {endpoint.url}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </CardContent>
        </Card>

        {/* Main Content - Request & Response */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="w-5 h-5" />
              Academic API Request Builder
            </CardTitle>
            <CardDescription>Configure and test academic administration endpoints</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="request" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="request">Request</TabsTrigger>
                <TabsTrigger value="response">Response</TabsTrigger>
                <TabsTrigger value="headers">Headers</TabsTrigger>
                <TabsTrigger value="docs">Documentation</TabsTrigger>
              </TabsList>

              <TabsContent value="request" className="space-y-4">
                {selectedEndpoint ? (
                  (() => {
                    const endpoint = endpoints.find(e => e.id === selectedEndpoint)
                    return endpoint ? (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                          <Badge className={getMethodColor(endpoint.method)}>
                            {endpoint.method}
                          </Badge>
                          <Input
                            value={`${baseUrl}${endpoint.url}`}
                            readOnly
                            className="flex-1"
                          />
                          <Button onClick={() => copyToClipboard(`${baseUrl}${endpoint.url}`)}>
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="space-y-2">
                          <Label>Description</Label>
                          <p className="text-sm text-muted-foreground">{endpoint.description}</p>
                          <div className="flex gap-2">
                            <Badge variant="outline" className="text-xs">
                              Access: {endpoint.accessLevel}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              Category: {endpoint.category}
                            </Badge>
                          </div>
                        </div>

                        {(endpoint.method === "POST" || endpoint.method === "PUT") && (
                          <div className="space-y-2">
                            <Label htmlFor="request-body">Request Body (JSON)</Label>
                            <Textarea
                              id="request-body"
                              value={requestBody || (endpoint.category === "Student Services"
                                ? JSON.stringify({
                                    nama_mahasiswa: "John Doe",
                                    nim: "2021123456",
                                    judul: "Document Title",
                                    _metadata: {
                                      template_path: "templates/{{prodi}}/{{type}}.docx"
                                    }
                                  }, null, 2)
                                : endpoint.category === "Academic Management"
                                ? JSON.stringify({
                                    name: "Dr. New Academic Staff",
                                    nip: "198512345678901234",
                                    role: "dosen_pembimbing",
                                    department: "Fakultas Teknik",
                                    prodi: "informatika"
                                  }, null, 2)
                                : JSON.stringify({
                                    type: "transcript",
                                    prodi: "informatika",
                                    template_path: "templates/informatika/transcript.docx",
                                    description: "Academic transcript template"
                                  }, null, 2)
                              )}
                              onChange={(e) => setRequestBody(e.target.value)}
                              placeholder="Enter JSON request body..."
                              className="h-40 font-mono text-sm"
                            />
                          </div>
                        )}

                        <div className="flex gap-2">
                          <Button
                            onClick={handleSendRequest}
                            disabled={loading}
                            className="flex-1"
                          >
                            {loading ? (
                              <>
                                <Clock className="w-4 h-4 mr-2 animate-spin" />
                                Processing...
                              </>
                            ) : (
                              <>
                                <Send className="w-4 h-4 mr-2" />
                                Send Request
                              </>
                            )}
                          </Button>
                          <Button variant="outline">
                            <Play className="w-4 h-4 mr-2" />
                            Test
                          </Button>
                          <Button variant="outline">
                            <History className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ) : null
                  })()
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <GraduationCap className="w-12 h-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">Select an Academic Endpoint</h3>
                    <p className="text-muted-foreground">Choose an endpoint from the sidebar to start testing academic APIs</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="response" className="space-y-4">
                {response ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge className={
                          response.status >= 200 && response.status < 300
                            ? "bg-green-500/10 text-green-600"
                            : "bg-red-500/10 text-red-600"
                        }>
                          {response.status} {response.statusText}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {response.time}ms
                        </span>
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      </div>
                      <Button variant="outline" size="sm" onClick={() => copyToClipboard(JSON.stringify(response.data, null, 2))}>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Response
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <Label>Response Body</Label>
                      <Textarea
                        value={JSON.stringify(response.data, null, 2)}
                        readOnly
                        className="h-64 font-mono text-sm"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <Eye className="w-12 h-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No Response Yet</h3>
                    <p className="text-muted-foreground">Send a request to see the response here</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="headers" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Request Headers</Label>
                    <Button size="sm" variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Header
                    </Button>
                  </div>

                  <div className="space-y-2">
                    {Object.entries(headers).map(([key, value]) => (
                      <div key={key} className="flex items-center gap-2">
                        <Input value={key} placeholder="Header name" className="flex-1" readOnly />
                        <Input value={value} placeholder="Header value" className="flex-1" />
                        <Button size="sm" variant="outline">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  {response && (
                    <>
                      <Separator />
                      <div>
                        <Label>Response Headers</Label>
                        <div className="mt-2 space-y-1">
                          {Object.entries(response.headers).map(([key, value]) => (
                            <div key={key} className="flex justify-between text-sm">
                              <span className="font-medium">{key}:</span>
                              <span className="text-muted-foreground">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="docs" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    <h3 className="text-lg font-medium">Staff TU API Documentation</h3>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Authentication for Staff TU</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2">
                        Staff TU role requires bearer token authentication for write operations.
                      </p>
                      <div className="bg-muted p-2 rounded text-sm font-mono">
                        Authorization: Bearer {"{{staff_tu_token}}"}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Access Levels</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4" />
                          <span><strong>Read:</strong> View documents, statistics, and configurations</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Edit className="w-4 h-4" />
                          <span><strong>Write:</strong> Create/update documents, staff, and templates</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4" />
                          <span><strong>Admin:</strong> Full system administration (limited access)</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Common Academic Parameters</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div><code className="bg-muted px-1 rounded">{{type}}</code> - Document type (transcript, certificate, diploma)</div>
                        <div><code className="bg-muted px-1 rounded">{{prodi}}</code> - Program study (informatika, sipil, elektro)</div>
                        <div><code className="bg-muted px-1 rounded">{{documentId}}</code> - Unique student document identifier</div>
                        <div><code className="bg-muted px-1 rounded">{{signerId}}</code> - Academic staff member ID</div>
                        <div><code className="bg-muted px-1 rounded">{{docConfigId}}</code> - Document template configuration ID</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Rate Limiting & Quotas</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Staff TU endpoints have higher rate limits: 200 requests per minute for read operations,
                        50 requests per minute for write operations.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}