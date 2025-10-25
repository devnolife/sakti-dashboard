"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Activity,
  Server,
  Database,
  HardDrive,
  Cpu,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Clock,
  Zap,
  Globe,
  Users,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface SystemMetric {
  name: string
  value: number
  unit: string
  status: "good" | "warning" | "critical"
  icon: React.ComponentType<{ className?: string }>
}

export default function SystemHealthPage() {
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setLastUpdate(new Date())
      setIsRefreshing(false)
    }, 1000)
  }

  const serverMetrics: SystemMetric[] = [
    {
      name: "CPU Usage",
      value: 45,
      unit: "%",
      status: "good",
      icon: Cpu,
    },
    {
      name: "Memory Usage",
      value: 68,
      unit: "%",
      status: "warning",
      icon: Server,
    },
    {
      name: "Disk Usage",
      value: 42,
      unit: "%",
      status: "good",
      icon: HardDrive,
    },
    {
      name: "Database Load",
      value: 35,
      unit: "%",
      status: "good",
      icon: Database,
    },
  ]

  const performanceMetrics = {
    uptime: "15 days 6 hours",
    avgResponseTime: "120ms",
    requestsPerMinute: 245,
    activeUsers: 87,
    errorRate: 0.02,
    successRate: 99.98,
  }

  const services = [
    { name: "Web Server", status: "online", uptime: "99.9%", responseTime: "45ms" },
    { name: "Database", status: "online", uptime: "99.8%", responseTime: "12ms" },
    { name: "API Gateway", status: "online", uptime: "99.9%", responseTime: "38ms" },
    { name: "Cache Server", status: "online", uptime: "100%", responseTime: "2ms" },
    { name: "Email Service", status: "online", uptime: "99.7%", responseTime: "156ms" },
    { name: "File Storage", status: "warning", uptime: "98.5%", responseTime: "245ms" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "text-green-500"
      case "warning":
        return "text-yellow-500"
      case "critical":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  const getProgressColor = (value: number) => {
    if (value < 60) return "bg-green-500"
    if (value < 80) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getServiceBadge = (status: string) => {
    switch (status) {
      case "online":
        return <Badge className="bg-green-500">Online</Badge>
      case "warning":
        return <Badge className="bg-yellow-500">Warning</Badge>
      case "offline":
        return <Badge variant="destructive">Offline</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6 mt-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Activity className="h-8 w-8" />
            System Health & Performance
          </h1>
          <p className="text-muted-foreground mt-1">
            Monitor kesehatan dan performa sistem secara real-time
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Last Update</div>
            <div className="text-sm font-medium">
              {lastUpdate.toLocaleTimeString()}
            </div>
          </div>
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* System Status Banner */}
      <Card className="border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-transparent dark:from-green-950/20">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-green-500/10">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">System Status: Operational</h3>
                <p className="text-sm text-muted-foreground">
                  All systems running normally • Uptime: {performanceMetrics.uptime}
                </p>
              </div>
            </div>
            <div className="text-right space-y-1">
              <div className="text-2xl font-bold text-green-500">
                {performanceMetrics.successRate}%
              </div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Server Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {serverMetrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
                  <Icon className={`h-4 w-4 ${getStatusColor(metric.status)}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <div className="text-2xl font-bold">{metric.value}</div>
                    <div className="text-muted-foreground">{metric.unit}</div>
                  </div>
                  <Progress value={metric.value} className="h-2" />
                  <div className="flex items-center justify-between text-xs">
                    <span className={getStatusColor(metric.status)}>
                      {metric.status === "good" ? "Normal" :
                        metric.status === "warning" ? "Warning" : "Critical"}
                    </span>
                    <span className="text-muted-foreground">100{metric.unit} max</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Performance Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Avg Response Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceMetrics.avgResponseTime}</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <TrendingDown className="h-3 w-3 text-green-500" />
              15% faster than yesterday
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Requests/Minute
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceMetrics.requestsPerMinute}</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-blue-500" />
              8% increase from last hour
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4" />
              Active Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceMetrics.activeUsers}</div>
            <p className="text-xs text-muted-foreground mt-1">Currently online</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Error Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceMetrics.errorRate}%</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <TrendingDown className="h-3 w-3 text-green-500" />
              Below threshold
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Services Status */}
      <Card>
        <CardHeader>
          <CardTitle>Services Status</CardTitle>
          <CardDescription>
            Status dan performa setiap service
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Server className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{service.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Uptime: {service.uptime} • Response: {service.responseTime}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {getServiceBadge(service.status)}
                  {service.status === "online" ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Monitoring */}
      <Tabs defaultValue="cpu" className="space-y-4">
        <TabsList>
          <TabsTrigger value="cpu">CPU</TabsTrigger>
          <TabsTrigger value="memory">Memory</TabsTrigger>
          <TabsTrigger value="disk">Disk</TabsTrigger>
          <TabsTrigger value="network">Network</TabsTrigger>
        </TabsList>

        <TabsContent value="cpu" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>CPU Usage Over Time</CardTitle>
              <CardDescription>Last 24 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground">CPU usage chart will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="memory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Memory Usage Over Time</CardTitle>
              <CardDescription>Last 24 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground">Memory usage chart will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="disk" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Disk I/O Over Time</CardTitle>
              <CardDescription>Last 24 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground">Disk I/O chart will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="network" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Network Traffic Over Time</CardTitle>
              <CardDescription>Last 24 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground">Network traffic chart will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Alerts & Warnings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Recent Alerts
          </CardTitle>
          <CardDescription>
            Peringatan dan notifikasi sistem
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 border-l-4 border-l-yellow-500 bg-yellow-50 dark:bg-yellow-950/20 rounded">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div className="flex-1">
                <div className="font-medium">High Memory Usage</div>
                <div className="text-sm text-muted-foreground">
                  Memory usage reached 68%. Consider scaling up if this persists.
                </div>
                <div className="text-xs text-muted-foreground mt-1">2 hours ago</div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 border-l-4 border-l-green-500 bg-green-50 dark:bg-green-950/20 rounded">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div className="flex-1">
                <div className="font-medium">System Update Completed</div>
                <div className="text-sm text-muted-foreground">
                  System successfully updated to version 2.1.0
                </div>
                <div className="text-xs text-muted-foreground mt-1">5 hours ago</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

