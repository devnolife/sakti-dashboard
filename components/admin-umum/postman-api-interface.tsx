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
  CheckCircle
} from "lucide-react"

interface ApiEndpoint {
  id: string
  name: string
  method: string
  url: string
  description: string
  category: string
  status: "active" | "deprecated" | "beta"
}

interface ApiResponse {
  status: number
  statusText: string
  data: any
  headers: Record<string, string>
  time: number
}

export default function PostmanApiInterface() {
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>("")
  const [baseUrl, setBaseUrl] = useState("http://localhost:8080/api")
  const [requestBody, setRequestBody] = useState("")
  const [headers, setHeaders] = useState<Record<string, string>>({
    "Content-Type": "application/json"
  })
  const [response, setResponse] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(false)

  const endpoints: ApiEndpoint[] = [
    {
      id: "generate-doc",
      name: "Generate Signed Document",
      method: "POST",
      url: "/generate-document/{{type}}/{{prodi}}",
      description: "Generate document with digital signature for students",
      category: "Documents",
      status: "active"
    },
    {
      id: "verify-qr",
      name: "Verify via QR",
      method: "POST",
      url: "/verify-qr",
      description: "Verify document authenticity using QR code",
      category: "Documents",
      status: "active"
    },
    {
      id: "verify-id",
      name: "Verify by ID",
      method: "GET",
      url: "/verification/{{documentId}}",
      description: "Verify document by ID",
      category: "Documents",
      status: "active"
    },
    {
      id: "list-docs",
      name: "List Documents",
      method: "GET",
      url: "/documents",
      description: "List all signed documents with pagination",
      category: "Documents",
      status: "active"
    },
    {
      id: "download-doc",
      name: "Download Document",
      method: "GET",
      url: "/documents/{{documentId}}/download",
      description: "Download signed document file",
      category: "Documents",
      status: "active"
    },
    {
      id: "init-signers",
      name: "Initialize Signers",
      method: "POST",
      url: "/init-signers/{{prodi}}",
      description: "Initialize signers for program study",
      category: "Management",
      status: "active"
    },
    {
      id: "manage-signers",
      name: "Manage Signers",
      method: "GET",
      url: "/signers",
      description: "List and manage document signers",
      category: "Management",
      status: "active"
    },
    {
      id: "signature-configs",
      name: "Signature Configurations",
      method: "GET",
      url: "/signature-configs",
      description: "Manage signature configurations",
      category: "Management",
      status: "active"
    },
    {
      id: "document-configs",
      name: "Document Configurations",
      method: "GET",
      url: "/document-configs",
      description: "Manage document templates and configurations",
      category: "Management",
      status: "active"
    },
    {
      id: "stats",
      name: "Statistics",
      method: "GET",
      url: "/stats",
      description: "Get API usage and document statistics",
      category: "Analytics",
      status: "active"
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

  const handleSendRequest = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      const mockResponse: ApiResponse = {
        status: 200,
        statusText: "OK",
        data: {
          success: true,
          message: "Request completed successfully",
          data: {
            documentId: "DOC_123456789",
            generatedAt: new Date().toISOString(),
            signatureCount: 3
          }
        },
        headers: {
          "Content-Type": "application/json",
          "X-Response-Time": "125ms"
        },
        time: 125
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
        name: "Admin Umum API Collection",
        description: "API collection for Admin Umum role",
        version: "1.0.0"
      },
      endpoints: endpoints,
      baseUrl: baseUrl
    }

    const blob = new Blob([JSON.stringify(collection, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "admin-umum-api-collection.json"
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Postman API Interface
            </span>
          </h2>
          <p className="mt-2 text-muted-foreground">
            Modern API testing interface for Admin Umum role
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar - Endpoints */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="w-5 h-5" />
              API Endpoints
            </CardTitle>
            <CardDescription>Available endpoints for testing</CardDescription>
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
                  {["Documents", "Management", "Analytics"].map((category) => (
                    <div key={category}>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">{category}</h4>
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
                                <Badge className={`text-xs ${getStatusColor(endpoint.status)}`}>
                                  {endpoint.status}
                                </Badge>
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
              Request Builder
            </CardTitle>
            <CardDescription>Configure and send API requests</CardDescription>
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
                        </div>

                        {endpoint.method === "POST" && (
                          <div className="space-y-2">
                            <Label htmlFor="request-body">Request Body (JSON)</Label>
                            <Textarea
                              id="request-body"
                              value={requestBody}
                              onChange={(e) => setRequestBody(e.target.value)}
                              placeholder="Enter JSON request body..."
                              className="h-32 font-mono text-sm"
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
                              <>Processing...</>
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
                    <Server className="w-12 h-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">Select an Endpoint</h3>
                    <p className="text-muted-foreground">Choose an endpoint from the sidebar to start testing</p>
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
                        <Input value={key} placeholder="Header name" className="flex-1" />
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
                    <h3 className="text-lg font-medium">API Documentation</h3>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Authentication</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        This API uses EdDSA (Edwards-curve Digital Signature Algorithm) for document signing.
                        No authentication required for public endpoints.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Rate Limiting</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        API calls are limited to 100 requests per minute per IP address.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Common Parameters</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div><code className="bg-muted px-1 rounded">{{type}}</code> - Document type (e.g., "kkp", "thesis")</div>
                        <div><code className="bg-muted px-1 rounded">{{prodi}}</code> - Program study (e.g., "informatika")</div>
                        <div><code className="bg-muted px-1 rounded">{{documentId}}</code> - Unique document identifier</div>
                      </div>
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