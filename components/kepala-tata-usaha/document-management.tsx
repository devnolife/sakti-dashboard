"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from "recharts"
import {
  FileText,
  Upload,
  Download,
  Search,
  Filter,
  Plus,
  Edit,
  Eye,
  Trash2,
  Archive,
  Shield,
  Clock,
  CheckCircle,
  AlertTriangle,
  Folder,
  FolderOpen,
  FileCheck,
  Database,
  Share2,
  Lock
} from "lucide-react"
import { motion } from "framer-motion"

export default function DocumentManagement() {
  // Document Categories
  const documentCategories = [
    {
      category: "Arsip Mahasiswa",
      totalDocs: 12567,
      processed: 12245,
      pending: 322,
      confidential: 8234,
      growth: "+5.2%"
    },
    {
      category: "Dokumen Akademik",
      totalDocs: 8934,
      processed: 8651,
      pending: 283,
      confidential: 3456,
      growth: "+3.8%"
    },
    {
      category: "Arsip Administrasi",
      totalDocs: 6789,
      processed: 6543,
      pending: 246,
      confidential: 2134,
      growth: "+7.1%"
    },
    {
      category: "Dokumen Keuangan",
      totalDocs: 4523,
      processed: 4398,
      pending: 125,
      confidential: 4523,
      growth: "+2.4%"
    },
    {
      category: "Hukum & Kepatuhan",
      totalDocs: 2345,
      processed: 2289,
      pending: 56,
      confidential: 2345,
      growth: "+1.9%"
    }
  ]

  // Recent Documents
  const recentDocuments = [
    {
      id: 1,
      title: "Student Enrollment Report Q4 2024",
      category: "Student Records",
      type: "Report",
      size: "2.4 MB",
      lastModified: "2 hours ago",
      status: "Approved",
      confidentiality: "Public",
      owner: "Academic Affairs"
    },
    {
      id: 2,
      title: "Budget Allocation Document",
      category: "Financial Documents",
      type: "Spreadsheet",
      size: "1.8 MB",
      lastModified: "4 hours ago",
      status: "Pending Review",
      confidentiality: "Confidential",
      owner: "Finance"
    },
    {
      id: 3,
      title: "Staff Performance Evaluation",
      category: "Administrative Records",
      type: "Form",
      size: "956 KB",
      lastModified: "1 day ago",
      status: "In Review",
      confidentiality: "Internal",
      owner: "HR Management"
    },
    {
      id: 4,
      title: "Accreditation Documentation",
      category: "Legal & Compliance",
      type: "PDF",
      size: "5.2 MB",
      lastModified: "2 days ago",
      status: "Approved",
      confidentiality: "Confidential",
      owner: "Quality Assurance"
    }
  ]

  // Document Processing Timeline
  const processingData = [
    { month: "Jul", processed: 2456, pending: 345, archived: 1234 },
    { month: "Aug", processed: 2678, pending: 298, archived: 1456 },
    { month: "Sep", processed: 2892, pending: 267, archived: 1567 },
    { month: "Oct", processed: 3124, pending: 234, archived: 1678 },
    { month: "Nov", processed: 3356, pending: 201, archived: 1789 },
    { month: "Dec", processed: 3589, pending: 189, archived: 1890 }
  ]

  // Storage Analytics
  const storageData = [
    { type: "Student Records", size: 45.6, color: "#3b82f6" },
    { type: "Academic Docs", size: 32.4, color: "#10b981" },
    { type: "Admin Records", size: 28.9, color: "#f59e0b" },
    { type: "Financial", size: 18.7, color: "#8b5cf6" },
    { type: "Legal", size: 12.4, color: "#ef4444" }
  ]

  // Document Access Logs
  const accessLogs = [
    {
      user: "Sarah Johnson",
      document: "Student Transcript Database",
      action: "Viewed",
      timestamp: "10 minutes ago",
      ipAddress: "192.168.1.45"
    },
    {
      user: "Ahmad Rahman",
      document: "Budget Approval Form",
      action: "Downloaded",
      timestamp: "25 minutes ago",
      ipAddress: "192.168.1.67"
    },
    {
      user: "Linda Chen",
      document: "Staff Evaluation Report",
      action: "Modified",
      timestamp: "1 hour ago",
      ipAddress: "192.168.1.23"
    },
    {
      user: "Michael Brown",
      document: "Student Registration Data",
      action: "Uploaded",
      timestamp: "2 hours ago",
      ipAddress: "192.168.1.89"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved": return "bg-green-100 text-green-800"
      case "Pending Review": return "bg-orange-100 text-orange-800"
      case "In Review": return "bg-blue-100 text-blue-800"
      case "Rejected": return "bg-red-100 text-red-800"
      case "Draft": return "bg-gray-100 text-gray-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getConfidentialityColor = (level: string) => {
    switch (level) {
      case "Public": return "bg-green-100 text-green-800"
      case "Internal": return "bg-blue-100 text-blue-800"
      case "Confidential": return "bg-red-100 text-red-800"
      case "Restricted": return "bg-purple-100 text-purple-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getActionColor = (action: string) => {
    switch (action) {
      case "Viewed": return "text-blue-600"
      case "Downloaded": return "text-green-600"
      case "Modified": return "text-orange-600"
      case "Uploaded": return "text-purple-600"
      case "Deleted": return "text-red-600"
      default: return "text-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manajemen Dokumen & Arsip</h1>
          <p className="text-gray-600">Sistem kontrol dan arsip dokumen terpusat Fakultas Teknik</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Cari dokumen..."
              className="pl-10 w-64"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Upload className="w-4 h-4 mr-2" />
            Upload
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Ekspor
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: "Total Documents", value: "35,158", subtitle: "All categories", icon: FileText, color: "text-blue-600" },
          { title: "Processed Today", value: "1,247", subtitle: "Documents handled", icon: CheckCircle, color: "text-green-600" },
          { title: "Pending Review", value: "1,032", subtitle: "Awaiting approval", icon: Clock, color: "text-orange-600" },
          { title: "Storage Used", value: "138.2 GB", subtitle: "Total file size", icon: Database, color: "text-purple-600" }
        ].map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                    <p className="text-xs text-gray-500">{metric.subtitle}</p>
                  </div>
                  <metric.icon className={`w-8 h-8 ${metric.color}`} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Document Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Folder className="w-5 h-5 text-blue-600" />
                  Document Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {documentCategories.map((category, index) => (
                    <motion.div
                      key={category.category}
                      className="p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-800">{category.category}</h4>
                          <p className="text-sm text-gray-600">{category.totalDocs} total documents</p>
                        </div>
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          {category.growth}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Processed:</span>
                          <p className="font-medium">{category.processed}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Pending:</span>
                          <p className="font-medium">{category.pending}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Confidential:</span>
                          <p className="font-medium">{category.confidential}</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <Progress value={(category.processed / category.totalDocs) * 100} className="h-2" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Storage Analytics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-purple-600" />
                  Storage Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={storageData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ type, size }) => `${type}: ${size} GB`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="size"
                    >
                      {storageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Modified</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Confidentiality</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentDocuments.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{doc.title}</div>
                          <div className="text-sm text-gray-600">{doc.owner}</div>
                        </div>
                      </TableCell>
                      <TableCell>{doc.category}</TableCell>
                      <TableCell>{doc.type}</TableCell>
                      <TableCell>{doc.size}</TableCell>
                      <TableCell>{doc.lastModified}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(doc.status)}>
                          {doc.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getConfidentialityColor(doc.confidentiality)}>
                          {doc.confidentiality}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                              <DialogHeader>
                                <DialogTitle>Edit Document</DialogTitle>
                                <DialogDescription>
                                  Update document metadata and properties
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <label className="text-sm font-medium">Document Title</label>
                                  <Input defaultValue={doc.title} />
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Category</label>
                                  <Select defaultValue={doc.category}>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Student Records">Student Records</SelectItem>
                                      <SelectItem value="Academic Documents">Academic Documents</SelectItem>
                                      <SelectItem value="Administrative Records">Administrative Records</SelectItem>
                                      <SelectItem value="Financial Documents">Financial Documents</SelectItem>
                                      <SelectItem value="Legal & Compliance">Legal & Compliance</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Confidentiality Level</label>
                                  <Select defaultValue={doc.confidentiality}>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Public">Public</SelectItem>
                                      <SelectItem value="Internal">Internal</SelectItem>
                                      <SelectItem value="Confidential">Confidential</SelectItem>
                                      <SelectItem value="Restricted">Restricted</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Notes</label>
                                  <Textarea
                                    placeholder="Add notes about this document..."
                                    rows={3}
                                  />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button variant="outline">Cancel</Button>
                                <Button>Save Changes</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Processing Tab */}
        <TabsContent value="processing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-green-600" />
                Document Processing Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={processingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="processed" stroke="#10b981" strokeWidth={2} name="Processed" />
                  <Line type="monotone" dataKey="pending" stroke="#f59e0b" strokeWidth={2} name="Pending" />
                  <Line type="monotone" dataKey="archived" stroke="#3b82f6" strokeWidth={2} name="Archived" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-red-600" />
                Document Access Logs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Document</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>IP Address</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {accessLogs.map((log, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{log.user}</TableCell>
                      <TableCell>{log.document}</TableCell>
                      <TableCell>
                        <span className={`font-medium ${getActionColor(log.action)}`}>
                          {log.action}
                        </span>
                      </TableCell>
                      <TableCell>{log.timestamp}</TableCell>
                      <TableCell className="font-mono text-sm">{log.ipAddress}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Access Violations", value: "0", subtitle: "Security incidents", icon: AlertTriangle, color: "text-red-600" },
              { title: "Encrypted Files", value: "15,234", subtitle: "Protected documents", icon: Lock, color: "text-blue-600" },
              { title: "Backup Status", value: "100%", subtitle: "Files backed up", icon: Archive, color: "text-green-600" }
            ].map((metric, index) => (
              <motion.div
                key={metric.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6 text-center">
                    <metric.icon className={`w-12 h-12 mx-auto mb-4 ${metric.color}`} />
                    <h3 className="text-lg font-semibold mb-2">{metric.title}</h3>
                    <p className={`text-3xl font-bold mb-1 ${metric.color}`}>{metric.value}</p>
                    <p className="text-sm text-gray-600">{metric.subtitle}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-600" />
                Document Processing Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={documentCategories}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="category"
                    angle={-45}
                    textAnchor="end"
                    height={100}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="totalDocs" fill="#3b82f6" name="Total Documents" />
                  <Bar dataKey="processed" fill="#10b981" name="Processed" />
                  <Bar dataKey="pending" fill="#f59e0b" name="Pending" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
