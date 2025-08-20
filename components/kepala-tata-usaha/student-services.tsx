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
  GraduationCap,
  Users,
  FileText,
  Award,
  Clock,
  CheckCircle,
  AlertTriangle,
  Search,
  Filter,
  Plus,
  Edit,
  Eye,
  Download,
  Upload,
  Star,
  MessageSquare,
  Calendar,
  UserCheck,
  ClipboardList,
  BookOpen,
  Phone,
  Mail
} from "lucide-react"
import { motion } from "framer-motion"

export default function StudentServices() {
  // Student Services Overview
  const serviceMetrics = [
    {
      service: "Registration",
      totalRequests: 2847,
      processed: 2698,
      pending: 149,
      avgProcessingTime: "2.3 days",
      satisfaction: 4.6
    },
    {
      service: "Transcripts",
      totalRequests: 1563,
      processed: 1489,
      pending: 74,
      avgProcessingTime: "1.8 days",
      satisfaction: 4.4
    },
    {
      service: "Certificates",
      totalRequests: 892,
      processed: 856,
      pending: 36,
      avgProcessingTime: "3.1 days",
      satisfaction: 4.5
    },
    {
      service: "Academic Records",
      totalRequests: 456,
      processed: 421,
      pending: 35,
      avgProcessingTime: "2.7 days",
      satisfaction: 4.3
    },
    {
      service: "Diploma Processing",
      totalRequests: 234,
      processed: 198,
      pending: 36,
      avgProcessingTime: "5.2 days",
      satisfaction: 4.2
    }
  ]

  // Student Registration Data
  const registrationData = [
    { semester: "2023-1", newStudents: 1245, returning: 8934, total: 10179 },
    { semester: "2023-2", newStudents: 1156, returning: 9012, total: 10168 },
    { semester: "2024-1", newStudents: 1389, returning: 9245, total: 10634 },
    { semester: "2024-2", newStudents: 1298, returning: 9456, total: 10754 }
  ]

  // Student Complaints & Feedback
  const complaints = [
    {
      id: 1,
      student: "Ahmad Rizki",
      studentId: "2021001234",
      type: "Service Quality",
      description: "Slow processing of transcript request",
      department: "Academic Records",
      priority: "Medium",
      status: "In Review",
      submittedDate: "2024-01-20",
      assignedTo: "Sarah Johnson"
    },
    {
      id: 2,
      student: "Sari Dewi",
      studentId: "2020005678",
      type: "Documentation",
      description: "Missing documents in graduation package",
      department: "Student Services",
      priority: "High",
      status: "Resolved",
      submittedDate: "2024-01-18",
      assignedTo: "Michael Brown"
    },
    {
      id: 3,
      student: "Budi Santoso",
      studentId: "2019009876",
      type: "System Issue",
      description: "Unable to access online registration portal",
      department: "IT Services",
      priority: "High",
      status: "In Progress",
      submittedDate: "2024-01-22",
      assignedTo: "Linda Chen"
    }
  ]

  // Graduation Ceremony Planning
  const graduationEvents = [
    {
      ceremony: "Bachelor's Degree Ceremony",
      date: "2024-03-15",
      graduates: 1245,
      venue: "Main Auditorium",
      status: "Planning",
      progress: 65,
      coordinator: "Dr. Ahmad Rahman"
    },
    {
      ceremony: "Master's Degree Ceremony",
      date: "2024-03-16",
      graduates: 234,
      venue: "Conference Hall",
      status: "Ready",
      progress: 95,
      coordinator: "Prof. Sari Dewi"
    },
    {
      ceremony: "Diploma Ceremony",
      date: "2024-03-14",
      graduates: 567,
      venue: "Multipurpose Hall",
      status: "Planning",
      progress: 45,
      coordinator: "Ms. Linda Chen"
    }
  ]

  // Service Performance Trends
  const performanceTrends = [
    { month: "Jul", satisfaction: 4.1, processing: 3.2, complaints: 45 },
    { month: "Aug", satisfaction: 4.2, processing: 3.0, complaints: 38 },
    { month: "Sep", satisfaction: 4.3, processing: 2.8, complaints: 32 },
    { month: "Oct", satisfaction: 4.4, processing: 2.6, complaints: 28 },
    { month: "Nov", satisfaction: 4.5, processing: 2.4, complaints: 25 },
    { month: "Dec", satisfaction: 4.6, processing: 2.3, complaints: 22 }
  ]

  // Service Request Categories
  const requestCategories = [
    { category: "Transcripts", count: 1563, percentage: 42.3, color: "#3b82f6" },
    { category: "Registration", count: 1298, percentage: 35.1, color: "#10b981" },
    { category: "Certificates", count: 456, percentage: 12.3, color: "#f59e0b" },
    { category: "Academic Records", count: 234, percentage: 6.3, color: "#8b5cf6" },
    { category: "Other", count: 149, percentage: 4.0, color: "#ef4444" }
  ]

  // Student Satisfaction Survey
  const satisfactionData = [
    { aspect: "Service Speed", score: 4.3 },
    { aspect: "Staff Helpfulness", score: 4.6 },
    { aspect: "Process Clarity", score: 4.1 },
    { aspect: "Online Systems", score: 3.9 },
    { aspect: "Document Quality", score: 4.5 },
    { aspect: "Overall Experience", score: 4.4 }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolved": case "Ready": case "Completed": return "bg-green-100 text-green-800"
      case "In Progress": case "Planning": case "Processing": return "bg-blue-100 text-blue-800"
      case "In Review": case "Pending": return "bg-orange-100 text-orange-800"
      case "Escalated": case "Overdue": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800"
      case "Medium": return "bg-yellow-100 text-yellow-800"
      case "Low": return "bg-green-100 text-green-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Student Services Coordination</h1>
          <p className="text-gray-600">Comprehensive student support and service management</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search students..."
              className="pl-10 w-64"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Request
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Service Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: "Total Students", value: "10,754", subtitle: "Active enrollment", icon: Users, color: "text-blue-600" },
          { title: "Service Requests", value: "5,992", subtitle: "This semester", icon: ClipboardList, color: "text-green-600" },
          { title: "Avg Processing", value: "2.6 days", subtitle: "Response time", icon: Clock, color: "text-orange-600" },
          { title: "Satisfaction", value: "4.4/5", subtitle: "Student rating", icon: Star, color: "text-purple-600" }
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
          <TabsTrigger value="requests">Service Requests</TabsTrigger>
          <TabsTrigger value="complaints">Complaints</TabsTrigger>
          <TabsTrigger value="graduation">Graduation</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Student Registration Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-blue-600" />
                  Student Registration Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={registrationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="semester" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="newStudents" fill="#3b82f6" name="New Students" />
                    <Bar dataKey="returning" fill="#10b981" name="Returning Students" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Service Request Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-green-600" />
                  Service Request Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={requestCategories}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ category, percentage }) => `${category}: ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {requestCategories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Service Metrics Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Service Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {serviceMetrics.map((service, index) => (
                  <motion.div
                    key={service.service}
                    className="p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-800">{service.service}</h4>
                        <p className="text-sm text-gray-600">{service.totalRequests} total requests</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-medium">{service.satisfaction}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 mb-4">
                      <div>
                        <span className="text-sm text-gray-500">Processed:</span>
                        <p className="font-medium">{service.processed}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Pending:</span>
                        <p className="font-medium">{service.pending}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Avg Processing:</span>
                        <p className="font-medium">{service.avgProcessingTime}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Satisfaction:</span>
                        <p className="font-medium">{service.satisfaction}/5.0</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Completion Rate</span>
                        <span>{((service.processed / service.totalRequests) * 100).toFixed(1)}%</span>
                      </div>
                      <Progress value={(service.processed / service.totalRequests) * 100} className="h-2" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Service Requests Tab */}
        <TabsContent value="requests" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Service Performance Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={performanceTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="satisfaction" stroke="#3b82f6" strokeWidth={2} name="Satisfaction Score" />
                  <Line type="monotone" dataKey="processing" stroke="#10b981" strokeWidth={2} name="Avg Processing (days)" />
                  <Line type="monotone" dataKey="complaints" stroke="#ef4444" strokeWidth={2} name="Monthly Complaints" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Student Satisfaction by Aspect</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {satisfactionData.map((aspect, index) => (
                  <div key={aspect.aspect} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">{aspect.aspect}</span>
                      <span className="text-sm font-bold text-gray-900">{aspect.score}/5.0</span>
                    </div>
                    <Progress value={(aspect.score / 5) * 100} className="h-3" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Complaints Tab */}
        <TabsContent value="complaints" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-orange-600" />
                Student Complaints & Feedback
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {complaints.map((complaint) => (
                    <TableRow key={complaint.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{complaint.student}</div>
                          <div className="text-sm text-gray-600">{complaint.studentId}</div>
                        </div>
                      </TableCell>
                      <TableCell>{complaint.type}</TableCell>
                      <TableCell className="max-w-xs truncate">{complaint.description}</TableCell>
                      <TableCell>{complaint.department}</TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(complaint.priority)}>
                          {complaint.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(complaint.status)}>
                          {complaint.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{complaint.assignedTo}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Complaint Details</DialogTitle>
                                <DialogDescription>
                                  Review and manage student complaint
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium">Student</label>
                                    <Input value={complaint.student} readOnly />
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Student ID</label>
                                    <Input value={complaint.studentId} readOnly />
                                  </div>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Description</label>
                                  <Textarea
                                    value={complaint.description}
                                    readOnly
                                    rows={3}
                                  />
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                  <div>
                                    <label className="text-sm font-medium">Priority</label>
                                    <Select defaultValue={complaint.priority}>
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="High">High</SelectItem>
                                        <SelectItem value="Medium">Medium</SelectItem>
                                        <SelectItem value="Low">Low</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Status</label>
                                    <Select defaultValue={complaint.status}>
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="In Review">In Review</SelectItem>
                                        <SelectItem value="In Progress">In Progress</SelectItem>
                                        <SelectItem value="Resolved">Resolved</SelectItem>
                                        <SelectItem value="Escalated">Escalated</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Assigned To</label>
                                    <Input value={complaint.assignedTo} />
                                  </div>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Resolution Notes</label>
                                  <Textarea
                                    placeholder="Add resolution notes..."
                                    rows={3}
                                  />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button variant="outline">Close</Button>
                                <Button>Update</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
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

        {/* Graduation Tab */}
        <TabsContent value="graduation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-600" />
                Graduation Ceremony Planning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {graduationEvents.map((event, index) => (
                  <motion.div
                    key={event.ceremony}
                    className="p-6 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-800">{event.ceremony}</h4>
                        <p className="text-sm text-gray-600">{event.graduates} graduates • {event.venue}</p>
                      </div>
                      <Badge className={getStatusColor(event.status)}>
                        {event.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <span className="text-sm text-gray-500">Date:</span>
                        <p className="font-medium">{event.date}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Graduates:</span>
                        <p className="font-medium">{event.graduates}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Venue:</span>
                        <p className="font-medium">{event.venue}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Coordinator:</span>
                        <p className="font-medium">{event.coordinator}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Preparation Progress</span>
                        <span>{event.progress}% Complete</span>
                      </div>
                      <Progress value={event.progress} className="h-3" />
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Calendar className="w-4 h-4 mr-2" />
                        Schedule
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Response Rate", value: "94.8%", subtitle: "Student inquiries", color: "text-green-600" },
              { title: "Resolution Time", value: "2.3 days", subtitle: "Average duration", color: "text-blue-600" },
              { title: "Student Retention", value: "96.2%", subtitle: "Satisfaction based", color: "text-purple-600" }
            ].map((metric, index) => (
              <motion.div
                key={metric.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6 text-center">
                    <h3 className="text-lg font-semibold mb-2">{metric.title}</h3>
                    <p className={`text-3xl font-bold mb-1 ${metric.color}`}>{metric.value}</p>
                    <p className="text-sm text-gray-600">{metric.subtitle}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
