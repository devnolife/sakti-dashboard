import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Server,
  Database,
  Globe,
  Zap,
  CheckCircle,
  AlertTriangle,
  XCircle,
  RefreshCw,
  Activity,
  HardDrive,
  Cpu,
  MemoryStick
} from "lucide-react"

export default function SystemHealthPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Health</h1>
          <p className="text-muted-foreground">
            Real-time monitoring of system components and services
          </p>
        </div>
        <Button variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh Status
        </Button>
      </div>

      {/* Overall System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-green-600" />
            System Status: All Services Operational
          </CardTitle>
          <CardDescription>
            Last updated: January 1, 2025 at 2:30 PM UTC
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium">API Gateway</p>
                <p className="text-xs text-muted-foreground">Operational</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium">Database</p>
                <p className="text-xs text-muted-foreground">Connected</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium">Document Service</p>
                <p className="text-xs text-muted-foreground">Available</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium">Signature Service</p>
                <p className="text-xs text-muted-foreground">Active</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Service Health Details */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5" />
              API Services
            </CardTitle>
            <CardDescription>
              Status of all API endpoints and services
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <div>
                    <p className="text-sm font-medium">Document Generation API</p>
                    <p className="text-xs text-muted-foreground">POST /api/v1/documents/generate</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="text-green-600">Healthy</Badge>
                  <p className="text-xs text-muted-foreground mt-1">120ms avg</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <div>
                    <p className="text-sm font-medium">Document List API</p>
                    <p className="text-xs text-muted-foreground">GET /api/v1/documents</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="text-green-600">Healthy</Badge>
                  <p className="text-xs text-muted-foreground mt-1">89ms avg</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <div>
                    <p className="text-sm font-medium">Signature API</p>
                    <p className="text-xs text-muted-foreground">POST /api/v1/signatures/sign</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="text-green-600">Healthy</Badge>
                  <p className="text-xs text-muted-foreground mt-1">156ms avg</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <div>
                    <p className="text-sm font-medium">Admin Statistics API</p>
                    <p className="text-xs text-muted-foreground">GET /api/v1/admin/statistics</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="text-yellow-600">Slow</Badge>
                  <p className="text-xs text-muted-foreground mt-1">2.3s avg</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Database Health
            </CardTitle>
            <CardDescription>
              Database connection and performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Connection Pool</span>
                  <span className="font-medium">85% used</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-yellow-600 h-2 rounded-full w-[85%]"></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Query Performance</span>
                  <span className="font-medium text-green-600">Good</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full w-[78%]"></div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Active Connections</span>
                <span className="font-medium">42/50</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Average Query Time</span>
                <span className="font-medium">23ms</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Slow Queries (&gt;1s)</span>
                <span className="font-medium">2</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Database Size</span>
                <span className="font-medium">1.2 GB</span>
              </div>
            </div>

            <div className="pt-3 border-t">
              <Badge variant="outline" className="text-green-600">
                <CheckCircle className="mr-1 h-3 w-3" />
                All systems operational
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Resources */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            System Resources
          </CardTitle>
          <CardDescription>
            Current system resource utilization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Cpu className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">CPU Usage</span>
              </div>
              <div className="text-2xl font-bold">23%</div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full w-[23%]"></div>
              </div>
              <p className="text-xs text-muted-foreground">Normal load</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <MemoryStick className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Memory</span>
              </div>
              <div className="text-2xl font-bold">67%</div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full w-[67%]"></div>
              </div>
              <p className="text-xs text-muted-foreground">4.2 GB / 8 GB</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <HardDrive className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Disk Usage</span>
              </div>
              <div className="text-2xl font-bold">45%</div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-yellow-600 h-2 rounded-full w-[45%]"></div>
              </div>
              <p className="text-xs text-muted-foreground">225 GB / 500 GB</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Network I/O</span>
              </div>
              <div className="text-2xl font-bold">12%</div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full w-[12%]"></div>
              </div>
              <p className="text-xs text-muted-foreground">Low traffic</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Health Check History */}
      <Card>
        <CardHeader>
          <CardTitle>Health Check History</CardTitle>
          <CardDescription>
            Recent health check results and incidents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">All systems operational</p>
                <p className="text-xs text-muted-foreground">Completed full health check - all services responding normally</p>
              </div>
              <span className="text-xs text-muted-foreground">2 minutes ago</span>
            </div>

            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">Database connection restored</p>
                <p className="text-xs text-muted-foreground">Connection pool optimization completed successfully</p>
              </div>
              <span className="text-xs text-muted-foreground">1 hour ago</span>
            </div>

            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">High CPU usage detected</p>
                <p className="text-xs text-muted-foreground">CPU usage peaked at 89% during bulk document generation - auto-resolved</p>
              </div>
              <span className="text-xs text-muted-foreground">3 hours ago</span>
            </div>

            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">Scheduled maintenance completed</p>
                <p className="text-xs text-muted-foreground">Database indexing and cleanup operations finished successfully</p>
              </div>
              <span className="text-xs text-muted-foreground">6 hours ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
