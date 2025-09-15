"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Server,
  Database,
  Code,
  FileText,
  Download,
  Copy,
  Eye,
  PlayCircle,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Zap,
  Globe,
  Shield
} from "lucide-react"

interface ApiStat {
  label: string
  value: string | number
  change?: string
  icon: React.ElementType
  color: string
}

interface ApiEndpointSummary {
  id: string
  name: string
  method: string
  path: string
  category: string
  description: string
  lastTested?: string
  status: "active" | "deprecated" | "beta"
}

export default function ApiOverviewDashboard() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const stats: ApiStat[] = [
    {
      label: "Total Endpoints",
      value: 13,
      change: "+2",
      icon: Server,
      color: "text-blue-600"
    },
    {
      label: "Active APIs",
      value: 11,
      change: "+1",
      icon: CheckCircle,
      color: "text-green-600"
    },
    {
      label: "Response Time",
      value: "145ms",
      change: "-12ms",
      icon: Zap,
      color: "text-yellow-600"
    },
    {
      label: "Success Rate",
      value: "99.2%",
      change: "+0.1%",
      icon: TrendingUp,
      color: "text-emerald-600"
    }
  ]

  const endpoints: ApiEndpointSummary[] = [
    {
      id: "generate-doc",
      name: "Generate Signed Document",
      method: "POST",
      path: "/generate-document/{type}/{prodi}",
      category: "Documents",
      description: "Generate document with digital signature",
      lastTested: "2 hours ago",
      status: "active"
    },
    {
      id: "verify-qr",
      name: "Verify via QR",
      method: "POST",
      path: "/verify-qr",
      category: "Documents",
      description: "Verify document authenticity using QR code",
      lastTested: "30 minutes ago",
      status: "active"
    },
    {
      id: "list-docs",
      name: "List Documents",
      method: "GET",
      path: "/documents",
      category: "Documents",
      description: "List all signed documents with pagination",
      lastTested: "1 hour ago",
      status: "active"
    },
    {
      id: "manage-signers",
      name: "Manage Signers",
      method: "GET",
      path: "/signers",
      category: "Management",
      description: "List and manage document signers",
      lastTested: "45 minutes ago",
      status: "active"
    },
    {
      id: "signature-configs",
      name: "Signature Configurations",
      method: "GET",
      path: "/signature-configs",
      category: "Management",
      description: "Manage signature configurations",
      lastTested: "3 hours ago",
      status: "active"
    },
    {
      id: "document-configs",
      name: "Document Configurations",
      method: "GET",
      path: "/document-configs",
      category: "Management",
      description: "Manage document templates",
      lastTested: "2 hours ago",
      status: "active"
    },
    {
      id: "stats",
      name: "Statistics",
      method: "GET",
      path: "/stats",
      category: "Analytics",
      description: "Get API usage and document statistics",
      lastTested: "15 minutes ago",
      status: "active"
    }
  ]

  const categories = ["all", "Documents", "Management", "Analytics", "Student Services", "Administrative"]

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

  const filteredEndpoints = selectedCategory === "all"
    ? endpoints
    : endpoints.filter(endpoint => endpoint.category === selectedCategory)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              API Management Dashboard
            </span>
          </h2>
          <p className="mt-2 text-muted-foreground">
            Overview and management of all API endpoints for document management system
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Collection
          </Button>
          <Button>
            <PlayCircle className="w-4 h-4 mr-2" />
            Run All Tests
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="gradient-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold">{stat.value}</p>
                    {stat.change && (
                      <Badge variant="secondary" className="text-xs">
                        {stat.change}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className={`p-2 rounded-full ${stat.color} bg-current/10`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - API Categories */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              API Categories
            </CardTitle>
            <CardDescription>Browse endpoints by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedCategory(category)}
                >
                  <span className="capitalize">
                    {category === "all" ? "All Endpoints" : category}
                  </span>
                  <Badge variant="secondary" className="ml-auto">
                    {category === "all"
                      ? endpoints.length
                      : endpoints.filter(e => e.category === category).length
                    }
                  </Badge>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Right Panel - Endpoint List */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="w-5 h-5" />
              API Endpoints
              <Badge variant="outline">{filteredEndpoints.length} endpoints</Badge>
            </CardTitle>
            <CardDescription>
              {selectedCategory === "all"
                ? "All available API endpoints"
                : `${selectedCategory} endpoints`
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px]">
              <div className="space-y-4">
                {filteredEndpoints.map((endpoint) => (
                  <div
                    key={endpoint.id}
                    className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge className={getMethodColor(endpoint.method)}>
                          {endpoint.method}
                        </Badge>
                        <Badge className={getStatusColor(endpoint.status)}>
                          {endpoint.status}
                        </Badge>
                      </div>
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <PlayCircle className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <h4 className="font-medium text-sm mb-1">{endpoint.name}</h4>
                    <p className="text-xs text-muted-foreground mb-2">{endpoint.description}</p>

                    <div className="flex items-center justify-between text-xs">
                      <code className="bg-muted px-2 py-1 rounded font-mono">
                        {endpoint.path}
                      </code>
                      {endpoint.lastTested && (
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>Tested {endpoint.lastTested}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section - Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Quick Actions
          </CardTitle>
          <CardDescription>Common API management tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-dashed">
              <CardContent className="p-6 text-center">
                <Globe className="w-8 h-8 mx-auto mb-3 text-blue-500" />
                <h3 className="font-medium mb-2">Test All Endpoints</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Run comprehensive tests on all API endpoints
                </p>
                <Button size="sm" className="w-full">
                  Run Tests
                </Button>
              </CardContent>
            </Card>

            <Card className="border-dashed">
              <CardContent className="p-6 text-center">
                <FileText className="w-8 h-8 mx-auto mb-3 text-green-500" />
                <h3 className="font-medium mb-2">Generate Documentation</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Auto-generate API documentation
                </p>
                <Button size="sm" variant="outline" className="w-full">
                  Generate Docs
                </Button>
              </CardContent>
            </Card>

            <Card className="border-dashed">
              <CardContent className="p-6 text-center">
                <Shield className="w-8 h-8 mx-auto mb-3 text-purple-500" />
                <h3 className="font-medium mb-2">Security Scan</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Run security analysis on all endpoints
                </p>
                <Button size="sm" variant="outline" className="w-full">
                  Run Scan
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}