"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  Users,
  UserCheck,
  TrendingUp,
  TrendingDown,
  Calendar,
  Clock,
  Award,
  AlertTriangle,
  CheckCircle,
  Plus,
  Edit,
  Eye,
  Search,
  Filter,
  Download,
  BarChart3,
  Target,
  Star,
  Briefcase
} from "lucide-react"
import { motion } from "framer-motion"

export default function StaffManagement() {
  // Staff Overview Data
  const staffOverview = [
    {
      department: "Academic Affairs",
      totalStaff: 28,
      performance: 92,
      attendance: 96,
      satisfaction: 4.5,
      workload: 85
    },
    {
      department: "Student Services",
      totalStaff: 35,
      performance: 89,
      attendance: 94,
      satisfaction: 4.3,
      workload: 88
    },
    {
      department: "Finance",
      totalStaff: 18,
      performance: 96,
      attendance: 98,
      satisfaction: 4.6,
      workload: 82
    },
    {
      department: "HR Management",
      totalStaff: 22,
      performance: 87,
      attendance: 92,
      satisfaction: 4.2,
      workload: 90
    },
    {
      department: "Facilities",
      totalStaff: 31,
      performance: 91,
      attendance: 89,
      satisfaction: 4.4,
      workload: 87
    },
    {
      department: "IT Services",
      totalStaff: 15,
      performance: 94,
      attendance: 97,
      satisfaction: 4.5,
      workload: 79
    }
  ]

  // Individual Staff Members
  const staffMembers = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "Academic Coordinator",
      department: "Academic Affairs",
      avatar: "/placeholder-avatar.jpg",
      performance: 95,
      attendance: 98,
      workload: 85,
      lastEvaluation: "2024-01-15",
      status: "Excellent",
      nextReview: "2024-07-15"
    },
    {
      id: 2,
      name: "Ahmad Rahman",
      position: "Finance Manager",
      department: "Finance",
      avatar: "/placeholder-avatar.jpg",
      performance: 92,
      attendance: 96,
      workload: 88,
      lastEvaluation: "2024-01-10",
      status: "Good",
      nextReview: "2024-07-10"
    },
    {
      id: 3,
      name: "Linda Chen",
      position: "HR Specialist",
      department: "HR Management",
      avatar: "/placeholder-avatar.jpg",
      performance: 88,
      attendance: 94,
      workload: 92,
      lastEvaluation: "2024-01-20",
      status: "Good",
      nextReview: "2024-07-20"
    },
    {
      id: 4,
      name: "Michael Brown",
      position: "Student Services Lead",
      department: "Student Services",
      avatar: "/placeholder-avatar.jpg",
      performance: 90,
      attendance: 93,
      workload: 86,
      lastEvaluation: "2024-01-08",
      status: "Good",
      nextReview: "2024-07-08"
    }
  ]

  // Performance Trends
  const performanceTrends = [
    { month: "Jul", performance: 88, attendance: 92, satisfaction: 4.1 },
    { month: "Aug", performance: 89, attendance: 93, satisfaction: 4.2 },
    { month: "Sep", performance: 91, attendance: 94, satisfaction: 4.3 },
    { month: "Oct", performance: 92, attendance: 95, satisfaction: 4.4 },
    { month: "Nov", performance: 93, attendance: 96, satisfaction: 4.4 },
    { month: "Dec", performance: 94, attendance: 97, satisfaction: 4.5 }
  ]

  // Training Programs
  const trainingPrograms = [
    {
      program: "Digital Skills Enhancement",
      participants: 45,
      completion: 78,
      satisfaction: 4.3,
      duration: "4 weeks",
      status: "Ongoing"
    },
    {
      program: "Customer Service Excellence",
      participants: 32,
      completion: 95,
      satisfaction: 4.6,
      duration: "2 weeks",
      status: "Completed"
    },
    {
      program: "Administrative Efficiency",
      participants: 28,
      completion: 65,
      satisfaction: 4.2,
      duration: "3 weeks",
      status: "Ongoing"
    }
  ]

  // Workload Distribution
  const workloadData = [
    { category: "Light (60-70%)", count: 23, percentage: 15, color: "#10b981" },
    { category: "Optimal (70-85%)", count: 89, percentage: 57, color: "#3b82f6" },
    { category: "Heavy (85-95%)", count: 35, percentage: 22, color: "#f59e0b" },
    { category: "Overloaded (95%+)", count: 9, percentage: 6, color: "#ef4444" }
  ]

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 80) return "text-blue-600"
    if (score >= 70) return "text-orange-600"
    return "text-red-600"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Excellent": return "bg-green-100 text-green-800"
      case "Good": return "bg-blue-100 text-blue-800"
      case "Average": return "bg-yellow-100 text-yellow-800"
      case "Needs Improvement": return "bg-orange-100 text-orange-800"
      case "Poor": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Staff Management & Supervision</h1>
          <p className="text-gray-600">Comprehensive staff oversight and performance management</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search staff..."
              className="pl-10 w-64"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Staff
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: "Total Staff", value: "156", subtitle: "Active employees", icon: Users, color: "text-blue-600" },
          { title: "Avg Performance", value: "91.2%", subtitle: "Overall rating", icon: Target, color: "text-green-600" },
          { title: "Attendance Rate", value: "95.8%", subtitle: "This month", icon: Clock, color: "text-purple-600" },
          { title: "Staff Satisfaction", value: "4.4/5", subtitle: "Latest survey", icon: Star, color: "text-orange-600" }
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
          <TabsTrigger value="staff-list">Staff List</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Department Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  Department Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={staffOverview}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="department"
                      angle={-45}
                      textAnchor="end"
                      height={100}
                    />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="performance" fill="#3b82f6" name="Performance %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Workload Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-purple-600" />
                  Workload Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={workloadData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ category, percentage }) => `${category}: ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {workloadData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Department Overview Table */}
          <Card>
            <CardHeader>
              <CardTitle>Department Staff Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Department</TableHead>
                    <TableHead>Total Staff</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead>Satisfaction</TableHead>
                    <TableHead>Workload</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {staffOverview.map((dept, index) => (
                    <TableRow key={dept.department}>
                      <TableCell className="font-medium">{dept.department}</TableCell>
                      <TableCell>{dept.totalStaff}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className={`font-medium ${getPerformanceColor(dept.performance)}`}>
                            {dept.performance}%
                          </span>
                          <Progress value={dept.performance} className="w-16 h-2" />
                        </div>
                      </TableCell>
                      <TableCell>{dept.attendance}%</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          {dept.satisfaction}
                        </div>
                      </TableCell>
                      <TableCell>{dept.workload}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Staff List Tab */}
        <TabsContent value="staff-list" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Staff Directory</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Staff Member</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead>Workload</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {staffMembers.map((staff) => (
                    <TableRow key={staff.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={staff.avatar} />
                            <AvatarFallback>{staff.name.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{staff.name}</div>
                            <div className="text-sm text-gray-600">{staff.position}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{staff.department}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span className={`font-medium ${getPerformanceColor(staff.performance)}`}>
                            {staff.performance}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{staff.attendance}%</TableCell>
                      <TableCell>{staff.workload}%</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(staff.status)}>
                          {staff.status}
                        </Badge>
                      </TableCell>
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
                                <DialogTitle>{staff.name} - Performance Details</DialogTitle>
                                <DialogDescription>
                                  Comprehensive staff performance overview
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-4">
                                  <h4 className="font-semibold">Performance Metrics</h4>
                                  <div className="space-y-3">
                                    <div className="flex justify-between">
                                      <span>Performance:</span>
                                      <span className="font-medium">{staff.performance}%</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Attendance:</span>
                                      <span className="font-medium">{staff.attendance}%</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Workload:</span>
                                      <span className="font-medium">{staff.workload}%</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="space-y-4">
                                  <h4 className="font-semibold">Evaluation Details</h4>
                                  <div className="space-y-3">
                                    <div className="flex justify-between">
                                      <span>Last Evaluation:</span>
                                      <span className="font-medium">{staff.lastEvaluation}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Next Review:</span>
                                      <span className="font-medium">{staff.nextReview}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Status:</span>
                                      <Badge className={getStatusColor(staff.status)}>
                                        {staff.status}
                                      </Badge>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button variant="outline">Close</Button>
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

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Performance Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={performanceTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="performance" stroke="#3b82f6" strokeWidth={2} name="Performance %" />
                  <Line type="monotone" dataKey="attendance" stroke="#10b981" strokeWidth={2} name="Attendance %" />
                  <Line type="monotone" dataKey="satisfaction" stroke="#f59e0b" strokeWidth={2} name="Satisfaction" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Training Tab */}
        <TabsContent value="training" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-600" />
                Training Programs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {trainingPrograms.map((program, index) => (
                  <motion.div
                    key={program.program}
                    className="p-6 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-800">{program.program}</h4>
                        <p className="text-sm text-gray-600">Duration: {program.duration}</p>
                      </div>
                      <Badge className={program.status === "Completed" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}>
                        {program.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <span className="text-sm text-gray-500">Participants:</span>
                        <p className="font-medium">{program.participants}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Completion:</span>
                        <p className="font-medium">{program.completion}%</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Satisfaction:</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="font-medium">{program.satisfaction}</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Status:</span>
                        <p className="font-medium">{program.status}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Completion Progress</span>
                        <span>{program.completion}%</span>
                      </div>
                      <Progress value={program.completion} className="h-3" />
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
              { title: "High Performers", value: "89", subtitle: "Staff rating >90%", color: "text-green-600" },
              { title: "Training Needed", value: "12", subtitle: "Performance <80%", color: "text-orange-600" },
              { title: "Promotion Ready", value: "23", subtitle: "Eligible for advancement", color: "text-blue-600" }
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
