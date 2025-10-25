"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Database,
  HardDrive,
  RefreshCw,
  Download,
  Upload,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Activity,
  BarChart3,
  Table as TableIcon,
  FileText,
  Search,
  Play,
  FileCode,
  History,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"

interface TableInfo {
  name: string
  rows: number
  size: string
  lastUpdated: string
}

interface QueryHistory {
  id: string
  query: string
  executedAt: string
  duration: string
  status: "success" | "error"
}

export default function DatabasePage() {
  const [selectedTab, setSelectedTab] = useState("overview")
  const [sqlQuery, setSqlQuery] = useState("")
  const [queryResult, setQueryResult] = useState<any>(null)

  const dbStats = {
    totalSize: "2.4 GB",
    totalTables: 45,
    totalRows: 125834,
    connections: 12,
    uptime: "15 days 6 hours",
    lastBackup: "2024-01-20 14:30:00",
  }

  const tables: TableInfo[] = [
    {
      name: "users",
      rows: 1358,
      size: "456 KB",
      lastUpdated: "2024-01-20 10:30:00",
    },
    {
      name: "students",
      rows: 1245,
      size: "892 KB",
      lastUpdated: "2024-01-20 09:15:00",
    },
    {
      name: "courses",
      rows: 156,
      size: "124 KB",
      lastUpdated: "2024-01-19 16:20:00",
    },
    {
      name: "grades",
      rows: 8956,
      size: "1.2 MB",
      lastUpdated: "2024-01-20 11:45:00",
    },
    {
      name: "audit_logs",
      rows: 15234,
      size: "3.4 MB",
      lastUpdated: "2024-01-20 14:55:00",
    },
  ]

  const queryHistory: QueryHistory[] = [
    {
      id: "1",
      query: "SELECT COUNT(*) FROM users WHERE is_active = true",
      executedAt: "2024-01-20 14:30:00",
      duration: "45ms",
      status: "success",
    },
    {
      id: "2",
      query: "SELECT * FROM courses ORDER BY created_at DESC LIMIT 10",
      executedAt: "2024-01-20 13:15:00",
      duration: "32ms",
      status: "success",
    },
    {
      id: "3",
      query: "UPDATE students SET status = 'active' WHERE id = '123'",
      executedAt: "2024-01-20 12:00:00",
      duration: "28ms",
      status: "error",
    },
  ]

  const handleExecuteQuery = () => {
    // Implement query execution logic
    console.log("Executing query:", sqlQuery)
    setQueryResult({ message: "Query executed successfully" })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Database className="h-8 w-8" />
            Database Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Monitor dan kelola database sistem
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export DB
          </Button>
        </div>
      </div>

      {/* Database Health Status */}
      <Card className="border-l-4 border-l-green-500">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-green-500/10">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Database Status: Healthy</h3>
                <p className="text-sm text-muted-foreground">
                  Uptime: {dbStats.uptime} | Connections: {dbStats.connections}/100
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Last Backup</div>
              <div className="font-medium">{dbStats.lastBackup}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <HardDrive className="h-4 w-4" />
              Database Size
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dbStats.totalSize}</div>
            <Progress value={65} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">65% of allocated space</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TableIcon className="h-4 w-4" />
              Total Tables
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dbStats.totalTables}</div>
            <p className="text-xs text-muted-foreground mt-1">Database tables</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Total Records
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dbStats.totalRows.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Across all tables</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Active Connections
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dbStats.connections}</div>
            <p className="text-xs text-muted-foreground mt-1">Current connections</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tables">Tables</TabsTrigger>
          <TabsTrigger value="query">Query</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top 5 Largest Tables</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tables.slice(0, 5).map((table) => (
                    <div key={table.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TableIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="font-mono text-sm">{table.name}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">{table.size}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Query History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {queryHistory.slice(0, 5).map((query) => (
                    <div key={query.id} className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          {query.query.substring(0, 40)}...
                        </code>
                      </div>
                      <Badge variant={query.status === "success" ? "default" : "destructive"}>
                        {query.duration}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tables Tab */}
        <TabsContent value="tables" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Database Tables</CardTitle>
                  <CardDescription>Informasi lengkap semua tabel database</CardDescription>
                </div>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Cari tabel..." className="pl-9" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Table Name</TableHead>
                    <TableHead>Rows</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tables.map((table) => (
                    <TableRow key={table.name}>
                      <TableCell className="font-mono font-medium">{table.name}</TableCell>
                      <TableCell>{table.rows.toLocaleString()}</TableCell>
                      <TableCell>{table.size}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {table.lastUpdated}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <FileText className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Export
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

        {/* Query Tab */}
        <TabsContent value="query" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCode className="h-5 w-5" />
                SQL Query Editor
              </CardTitle>
              <CardDescription>
                Execute SQL queries with caution
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">SQL Query</label>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Use with caution
                    </Badge>
                  </div>
                </div>
                <Textarea
                  placeholder="SELECT * FROM users LIMIT 10;"
                  value={sqlQuery}
                  onChange={(e) => setSqlQuery(e.target.value)}
                  className="font-mono text-sm min-h-[200px]"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Read-only mode enabled for safety
                </div>
                <Button onClick={handleExecuteQuery}>
                  <Play className="h-4 w-4 mr-2" />
                  Execute Query
                </Button>
              </div>

              {queryResult && (
                <Card className="bg-muted">
                  <CardHeader>
                    <CardTitle className="text-sm">Query Result</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="text-xs">{JSON.stringify(queryResult, null, 2)}</pre>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                Query History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Query</TableHead>
                    <TableHead>Executed At</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {queryHistory.map((query) => (
                    <TableRow key={query.id}>
                      <TableCell className="font-mono text-xs max-w-md truncate">
                        {query.query}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {query.executedAt}
                      </TableCell>
                      <TableCell>{query.duration}</TableCell>
                      <TableCell>
                        <Badge
                          variant={query.status === "success" ? "default" : "destructive"}
                        >
                          {query.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Backup Tab */}
        <TabsContent value="backup" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Database Backup & Restore</CardTitle>
              <CardDescription>
                Manage database backups and restore points
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="border-2 border-dashed">
                  <CardContent className="pt-6">
                    <div className="text-center space-y-3">
                      <div className="mx-auto w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                        <Download className="h-6 w-6 text-blue-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Create Backup</h4>
                        <p className="text-sm text-muted-foreground">
                          Export complete database
                        </p>
                      </div>
                      <Button className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Backup Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-dashed">
                  <CardContent className="pt-6">
                    <div className="text-center space-y-3">
                      <div className="mx-auto w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center">
                        <Upload className="h-6 w-6 text-orange-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Restore Database</h4>
                        <p className="text-sm text-muted-foreground">
                          Import from backup file
                        </p>
                      </div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" className="w-full">
                            <Upload className="h-4 w-4 mr-2" />
                            Restore
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will overwrite current database. This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>Continue</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Backup History</h4>
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <Card key={i}>
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-blue-500/10">
                              <Database className="h-4 w-4 text-blue-500" />
                            </div>
                            <div>
                              <div className="font-medium">backup_2024_01_20.sql</div>
                              <div className="text-sm text-muted-foreground">
                                2024-01-20 14:30:00 • 245 MB
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Maintenance Tab */}
        <TabsContent value="maintenance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Database Maintenance</CardTitle>
              <CardDescription>
                Optimize and maintain database performance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <RefreshCw className="h-5 w-5 text-blue-500" />
                        <h4 className="font-semibold">Optimize Tables</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Optimize all tables to improve performance
                      </p>
                      <Button className="w-full">Run Optimization</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Trash2 className="h-5 w-5 text-orange-500" />
                        <h4 className="font-semibold">Clean Old Data</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Remove old logs and temporary data
                      </p>
                      <Button variant="outline" className="w-full">
                        Clean Data
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

