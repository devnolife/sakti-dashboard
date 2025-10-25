"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Database,
  Download,
  Upload,
  Trash2,
  Calendar,
  HardDrive,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  Settings,
  Play,
  History,
  Shield,
} from "lucide-react"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

interface BackupItem {
  id: string
  name: string
  size: string
  type: "full" | "incremental"
  status: "completed" | "failed" | "in_progress"
  createdAt: string
  createdBy: string
}

export default function BackupPage() {
  const [isBackingUp, setIsBackingUp] = useState(false)

  const backups: BackupItem[] = [
    {
      id: "1",
      name: "backup_full_2024_01_20.sql",
      size: "2.4 GB",
      type: "full",
      status: "completed",
      createdAt: "2024-01-20 14:30:00",
      createdBy: "admin",
    },
    {
      id: "2",
      name: "backup_incremental_2024_01_19.sql",
      size: "156 MB",
      type: "incremental",
      status: "completed",
      createdAt: "2024-01-19 14:30:00",
      createdBy: "system",
    },
    {
      id: "3",
      name: "backup_full_2024_01_18.sql",
      size: "2.3 GB",
      type: "full",
      status: "completed",
      createdAt: "2024-01-18 14:30:00",
      createdBy: "admin",
    },
    {
      id: "4",
      name: "backup_incremental_2024_01_17.sql",
      size: "98 MB",
      type: "incremental",
      status: "failed",
      createdAt: "2024-01-17 14:30:00",
      createdBy: "system",
    },
  ]

  const backupStats = {
    total: backups.length,
    totalSize: "5.1 GB",
    lastBackup: "2024-01-20 14:30:00",
    successRate: 95.5,
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>
      case "failed":
        return <Badge variant="destructive">Failed</Badge>
      case "in_progress":
        return <Badge className="bg-blue-500">In Progress</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "full":
        return <Badge variant="default">Full</Badge>
      case "incremental":
        return <Badge variant="outline">Incremental</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const handleCreateBackup = () => {
    setIsBackingUp(true)
    // Simulate backup process
    setTimeout(() => {
      setIsBackingUp(false)
    }, 3000)
  }

  return (
    <div className="container mx-auto p-6 space-y-6 mt-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Database className="h-8 w-8" />
            Backup & Restore
          </h1>
          <p className="text-muted-foreground mt-1">
            Kelola backup dan restore database sistem
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Configure
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button disabled={isBackingUp}>
                <Download className="h-4 w-4 mr-2" />
                {isBackingUp ? "Creating Backup..." : "Create Backup"}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Create New Backup</AlertDialogTitle>
                <AlertDialogDescription>
                  This will create a full backup of the entire database. This process may take several minutes.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleCreateBackup}>
                  Create Backup
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Backup in Progress Banner */}
      {isBackingUp && (
        <Card className="border-l-4 border-l-blue-500 bg-blue-50 dark:bg-blue-950/20">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-blue-500/10">
                    <RefreshCw className="h-5 w-5 text-blue-500 animate-spin" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Backup in Progress</h3>
                    <p className="text-sm text-muted-foreground">
                      Creating full database backup...
                    </p>
                  </div>
                </div>
                <span className="text-2xl font-bold">45%</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Backups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{backupStats.total}</div>
            <p className="text-xs text-muted-foreground mt-1">Available backups</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Size</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{backupStats.totalSize}</div>
            <p className="text-xs text-muted-foreground mt-1">Backup storage used</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Last Backup</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm font-bold">{backupStats.lastBackup}</div>
            <p className="text-xs text-muted-foreground mt-1">Most recent backup</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{backupStats.successRate}%</div>
            <p className="text-xs text-muted-foreground mt-1">Backup success rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="backups" className="space-y-4">
        <TabsList>
          <TabsTrigger value="backups">Backup History</TabsTrigger>
          <TabsTrigger value="restore">Restore</TabsTrigger>
          <TabsTrigger value="schedule">Auto Backup</TabsTrigger>
        </TabsList>

        {/* Backups Tab */}
        <TabsContent value="backups" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Backup History</CardTitle>
              <CardDescription>
                Riwayat backup database sistem
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Backup Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Created By</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {backups.map((backup) => (
                    <TableRow key={backup.id}>
                      <TableCell className="font-mono text-sm">
                        <div className="flex items-center gap-2">
                          <Database className="h-4 w-4 text-muted-foreground" />
                          {backup.name}
                        </div>
                      </TableCell>
                      <TableCell>{getTypeBadge(backup.type)}</TableCell>
                      <TableCell className="font-medium">{backup.size}</TableCell>
                      <TableCell>{getStatusBadge(backup.status)}</TableCell>
                      <TableCell className="text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3" />
                          {backup.createdAt}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{backup.createdBy}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4 mr-1 text-destructive" />
                                Delete
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Backup?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete the backup file.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction className="bg-destructive">
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Restore Tab */}
        <TabsContent value="restore" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Restore Database
              </CardTitle>
              <CardDescription>
                Restore database dari backup yang tersedia
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed rounded-lg p-8">
                <div className="text-center space-y-4">
                  <div className="mx-auto w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center">
                    <Shield className="h-8 w-8 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Restore from Backup</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Pilih backup file untuk restore database. Proses ini akan mengganti data yang ada.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <Select>
                      <SelectTrigger className="max-w-md mx-auto">
                        <SelectValue placeholder="Select backup file..." />
                      </SelectTrigger>
                      <SelectContent>
                        {backups
                          .filter(b => b.status === "completed")
                          .map((backup) => (
                            <SelectItem key={backup.id} value={backup.id}>
                              {backup.name} - {backup.createdAt}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="lg">
                          <Upload className="h-4 w-4 mr-2" />
                          Start Restore
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will restore the database to the selected backup point.
                            All current data will be replaced. This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction className="bg-orange-500">
                            Continue Restore
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>

              <Card className="bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200">
                <CardContent className="pt-6">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0">
                      <Shield className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-semibold text-yellow-900 dark:text-yellow-100">
                        Important Warning
                      </h4>
                      <p className="text-sm text-yellow-800 dark:text-yellow-200">
                        Before restoring, ensure you have created a backup of the current database state.
                        The restore process will overwrite all existing data.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Auto Backup Schedule Tab */}
        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Automatic Backup Schedule
              </CardTitle>
              <CardDescription>
                Konfigurasi jadwal backup otomatis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Auto Backup</Label>
                  <p className="text-sm text-muted-foreground">
                    Aktifkan backup otomatis sesuai jadwal
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="space-y-2">
                <Label>Backup Frequency</Label>
                <Select defaultValue="daily">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Every Hour</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Backup Time</Label>
                <Select defaultValue="02:00">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="00:00">00:00 (Midnight)</SelectItem>
                    <SelectItem value="02:00">02:00 AM</SelectItem>
                    <SelectItem value="04:00">04:00 AM</SelectItem>
                    <SelectItem value="06:00">06:00 AM</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Backup Type</Label>
                <Select defaultValue="full">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full">Full Backup</SelectItem>
                    <SelectItem value="incremental">Incremental Backup</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Retention Period (days)</Label>
                <Select defaultValue="30">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 days</SelectItem>
                    <SelectItem value="14">14 days</SelectItem>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="60">60 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Backup lama akan otomatis dihapus setelah periode ini
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Kirim email notifikasi setelah backup selesai
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <Button className="w-full">
                <CheckCircle className="h-4 w-4 mr-2" />
                Save Schedule Configuration
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

