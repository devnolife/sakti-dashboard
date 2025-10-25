"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Link2,
  Plus,
  Settings,
  CheckCircle,
  XCircle,
  AlertCircle,
  Power,
  Key,
  Globe,
  Mail,
  MessageSquare,
  Cloud,
  DollarSign,
  FileText,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Integration {
  id: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  category: string
  status: "connected" | "disconnected" | "error"
  lastSync?: string
  config?: Record<string, any>
}

export default function IntegrationsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null)

  const integrations: Integration[] = [
    {
      id: "1",
      name: "Email Service (SMTP)",
      description: "Send emails via SMTP server",
      icon: Mail,
      category: "communication",
      status: "connected",
      lastSync: "2024-01-20 14:30:00",
    },
    {
      id: "2",
      name: "Payment Gateway (Midtrans)",
      description: "Process payments with Midtrans",
      icon: DollarSign,
      category: "payment",
      status: "connected",
      lastSync: "2024-01-20 12:15:00",
    },
    {
      id: "3",
      name: "WhatsApp Business API",
      description: "Send WhatsApp notifications",
      icon: MessageSquare,
      category: "communication",
      status: "disconnected",
    },
    {
      id: "4",
      name: "Google Drive",
      description: "Store and share files on Google Drive",
      icon: Cloud,
      category: "storage",
      status: "error",
      lastSync: "2024-01-20 10:00:00",
    },
    {
      id: "5",
      name: "SIMAK API",
      description: "Sync data with SIMAK system",
      icon: Globe,
      category: "academic",
      status: "connected",
      lastSync: "2024-01-20 15:00:00",
    },
    {
      id: "6",
      name: "Digital Signature",
      description: "Sign documents electronically",
      icon: FileText,
      category: "document",
      status: "disconnected",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "text-green-500"
      case "disconnected":
        return "text-gray-500"
      case "error":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return CheckCircle
      case "disconnected":
        return XCircle
      case "error":
        return AlertCircle
      default:
        return XCircle
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return <Badge className="bg-green-500">Connected</Badge>
      case "disconnected":
        return <Badge variant="secondary">Disconnected</Badge>
      case "error":
        return <Badge variant="destructive">Error</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const handleConfigureIntegration = (integration: Integration) => {
    setSelectedIntegration(integration)
    setIsDialogOpen(true)
  }

  const categorizedIntegrations = integrations.reduce((acc, integration) => {
    if (!acc[integration.category]) {
      acc[integration.category] = []
    }
    acc[integration.category].push(integration)
    return acc
  }, {} as Record<string, Integration[]>)

  const stats = {
    total: integrations.length,
    connected: integrations.filter(i => i.status === "connected").length,
    disconnected: integrations.filter(i => i.status === "disconnected").length,
    error: integrations.filter(i => i.status === "error").length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Link2 className="h-8 w-8" />
            Integration Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Kelola integrasi dengan layanan eksternal
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Integration
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Integrations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground mt-1">Available integrations</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Connected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.connected}</div>
            <p className="text-xs text-muted-foreground mt-1">Active integrations</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-gray-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Disconnected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.disconnected}</div>
            <p className="text-xs text-muted-foreground mt-1">Inactive integrations</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Errors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.error}</div>
            <p className="text-xs text-muted-foreground mt-1">Need attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Integrations List */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="storage">Storage</TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="document">Document</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {integrations.map((integration) => {
              const Icon = integration.icon
              const StatusIcon = getStatusIcon(integration.status)
              return (
                <Card key={integration.id} className="relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-[100px]" />
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      {getStatusBadge(integration.status)}
                    </div>
                    <CardTitle className="mt-4">{integration.name}</CardTitle>
                    <CardDescription>{integration.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {integration.lastSync && (
                      <div className="text-xs text-muted-foreground">
                        Last sync: {integration.lastSync}
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleConfigureIntegration(integration)}
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Configure
                      </Button>
                      <Button
                        variant={integration.status === "connected" ? "destructive" : "default"}
                        size="sm"
                        className="flex-1"
                      >
                        <Power className="h-4 w-4 mr-2" />
                        {integration.status === "connected" ? "Disconnect" : "Connect"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {Object.entries(categorizedIntegrations).map(([category, items]) => (
          <TabsContent key={category} value={category} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {items.map((integration) => {
                const Icon = integration.icon
                return (
                  <Card key={integration.id} className="relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-[100px]" />
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="p-3 rounded-lg bg-primary/10">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        {getStatusBadge(integration.status)}
                      </div>
                      <CardTitle className="mt-4">{integration.name}</CardTitle>
                      <CardDescription>{integration.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {integration.lastSync && (
                        <div className="text-xs text-muted-foreground">
                          Last sync: {integration.lastSync}
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleConfigureIntegration(integration)}
                        >
                          <Settings className="h-4 w-4 mr-2" />
                          Configure
                        </Button>
                        <Button
                          variant={integration.status === "connected" ? "destructive" : "default"}
                          size="sm"
                          className="flex-1"
                        >
                          <Power className="h-4 w-4 mr-2" />
                          {integration.status === "connected" ? "Disconnect" : "Connect"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Configuration Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Configure {selectedIntegration?.name}</DialogTitle>
            <DialogDescription>
              Setup integration credentials and settings
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Enable Integration</Label>
                <p className="text-sm text-muted-foreground">
                  Activate this integration
                </p>
              </div>
              <Switch defaultChecked={selectedIntegration?.status === "connected"} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="api-endpoint">API Endpoint</Label>
              <Input
                id="api-endpoint"
                placeholder="https://api.example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="api-key">API Key</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="api-key"
                  type="password"
                  placeholder="Enter API key"
                  className="flex-1"
                />
                <Button variant="outline" size="icon">
                  <Key className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="api-secret">API Secret</Label>
              <Input
                id="api-secret"
                type="password"
                placeholder="Enter API secret"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="webhook-url">Webhook URL (Optional)</Label>
              <Input
                id="webhook-url"
                placeholder="https://your-domain.com/webhook"
              />
              <p className="text-xs text-muted-foreground">
                URL for receiving callbacks from the service
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto Sync</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically sync data periodically
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsDialogOpen(false)}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Save Configuration
            </Button>
            <Button variant="outline">
              Test Connection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

