"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Workflow,
  Plus,
  Play,
  Pause,
  Edit,
  Trash2,
  GitBranch,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Settings,
  Copy,
} from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface WorkflowItem {
  id: string
  name: string
  description: string
  trigger: string
  status: "active" | "inactive" | "draft"
  lastRun?: string
  successRate: number
  totalRuns: number
  createdAt: string
}

export default function WorkflowsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const workflows: WorkflowItem[] = [
    {
      id: "1",
      name: "Auto Approve KKP Application",
      description: "Automatically approve KKP applications that meet requirements",
      trigger: "On KKP Application Submit",
      status: "active",
      lastRun: "2024-01-20 14:30:00",
      successRate: 98.5,
      totalRuns: 245,
      createdAt: "2024-01-01",
    },
    {
      id: "2",
      name: "Send Payment Reminder",
      description: "Send payment reminder emails 3 days before due date",
      trigger: "Daily at 09:00",
      status: "active",
      lastRun: "2024-01-20 09:00:00",
      successRate: 100,
      totalRuns: 89,
      createdAt: "2024-01-05",
    },
    {
      id: "3",
      name: "Archive Old Documents",
      description: "Move documents older than 2 years to archive",
      trigger: "Monthly on 1st",
      status: "active",
      lastRun: "2024-01-01 00:00:00",
      successRate: 95.2,
      totalRuns: 12,
      createdAt: "2024-01-01",
    },
    {
      id: "4",
      name: "Student Grade Notification",
      description: "Notify students when grades are published",
      trigger: "On Grade Update",
      status: "inactive",
      lastRun: "2024-01-15 16:45:00",
      successRate: 92.8,
      totalRuns: 456,
      createdAt: "2023-12-01",
    },
    {
      id: "5",
      name: "Exam Schedule Generator",
      description: "Generate and publish exam schedules",
      trigger: "Manual",
      status: "draft",
      successRate: 0,
      totalRuns: 0,
      createdAt: "2024-01-18",
    },
  ]

  const workflowStats = {
    total: workflows.length,
    active: workflows.filter(w => w.status === "active").length,
    inactive: workflows.filter(w => w.status === "inactive").length,
    draft: workflows.filter(w => w.status === "draft").length,
    totalRuns: workflows.reduce((sum, w) => sum + w.totalRuns, 0),
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>
      case "draft":
        return <Badge variant="outline">Draft</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "inactive":
        return <XCircle className="h-4 w-4 text-gray-500" />
      case "draft":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6 mt-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Workflow className="h-8 w-8" />
            Workflow Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Otomasi proses bisnis dan workflow sistem
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Workflow
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Workflows</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{workflowStats.total}</div>
            <p className="text-xs text-muted-foreground mt-1">All workflows</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{workflowStats.active}</div>
            <p className="text-xs text-muted-foreground mt-1">Running workflows</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-gray-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Inactive</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{workflowStats.inactive}</div>
            <p className="text-xs text-muted-foreground mt-1">Paused workflows</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Draft</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{workflowStats.draft}</div>
            <p className="text-xs text-muted-foreground mt-1">In development</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Runs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{workflowStats.totalRuns}</div>
            <p className="text-xs text-muted-foreground mt-1">Executions</p>
          </CardContent>
        </Card>
      </div>

      {/* Workflows List */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Workflows</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>All Workflows</CardTitle>
                  <CardDescription>Manage your automation workflows</CardDescription>
                </div>
                <Input
                  placeholder="Search workflows..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-sm"
                />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Workflow Name</TableHead>
                    <TableHead>Trigger</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Run</TableHead>
                    <TableHead>Success Rate</TableHead>
                    <TableHead>Total Runs</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {workflows.map((workflow) => (
                    <TableRow key={workflow.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium flex items-center gap-2">
                            {getStatusIcon(workflow.status)}
                            {workflow.name}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {workflow.description}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-mono text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          {workflow.trigger}
                        </Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(workflow.status)}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {workflow.lastRun || "-"}
                      </TableCell>
                      <TableCell>
                        {workflow.totalRuns > 0 ? (
                          <div className="flex items-center gap-2">
                            <div className="flex-1">
                              <div className="text-sm font-medium">
                                {workflow.successRate}%
                              </div>
                            </div>
                          </div>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                      <TableCell className="font-mono">{workflow.totalRuns}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          {workflow.status === "active" ? (
                            <Button variant="ghost" size="icon" title="Pause">
                              <Pause className="h-4 w-4" />
                            </Button>
                          ) : (
                            <Button variant="ghost" size="icon" title="Activate">
                              <Play className="h-4 w-4" />
                            </Button>
                          )}
                          <Button variant="ghost" size="icon" title="Edit">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" title="Duplicate">
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" title="Delete">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {["active", "inactive", "draft"].map((status) => (
          <TabsContent key={status} value={status} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">{status} Workflows</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Workflow Name</TableHead>
                      <TableHead>Trigger</TableHead>
                      <TableHead>Last Run</TableHead>
                      <TableHead>Success Rate</TableHead>
                      <TableHead>Total Runs</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {workflows
                      .filter((w) => w.status === status)
                      .map((workflow) => (
                        <TableRow key={workflow.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{workflow.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {workflow.description}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="font-mono text-xs">
                              <Clock className="h-3 w-3 mr-1" />
                              {workflow.trigger}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground text-sm">
                            {workflow.lastRun || "-"}
                          </TableCell>
                          <TableCell>
                            {workflow.totalRuns > 0 ? `${workflow.successRate}%` : "-"}
                          </TableCell>
                          <TableCell className="font-mono">{workflow.totalRuns}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              {status === "active" ? (
                                <Button variant="ghost" size="icon">
                                  <Pause className="h-4 w-4" />
                                </Button>
                              ) : (
                                <Button variant="ghost" size="icon">
                                  <Play className="h-4 w-4" />
                                </Button>
                              )}
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Workflow Templates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="h-5 w-5" />
            Workflow Templates
          </CardTitle>
          <CardDescription>
            Start with pre-built workflow templates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                name: "Document Approval",
                description: "Multi-step document approval workflow",
                icon: "📄",
              },
              {
                name: "Student Onboarding",
                description: "Automate new student registration process",
                icon: "🎓",
              },
              {
                name: "Payment Processing",
                description: "Automated payment verification and receipt",
                icon: "💳",
              },
            ].map((template, index) => (
              <Card key={index} className="hover:border-primary transition-colors cursor-pointer">
                <CardContent className="pt-6">
                  <div className="text-4xl mb-3">{template.icon}</div>
                  <h4 className="font-semibold mb-2">{template.name}</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    {template.description}
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

