"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
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
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  Tooltip,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  Eye,
  Filter,
  Search,
  Download,
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  Users,
  BookOpen,
  GraduationCap,
  Target
} from "lucide-react"
import { motion } from "framer-motion"

export default function AcademicMonitoring() {
  // Academic Performance Data
  const departmentPerformance = [
    { department: "Computer Science", gpa: 3.68, satisfaction: 92, completion: 96, students: 450 },
    { department: "Information Systems", gpa: 3.52, satisfaction: 89, completion: 94, students: 380 },
    { department: "Software Engineering", gpa: 3.71, satisfaction: 94, completion: 98, students: 320 },
    { department: "Data Science", gpa: 3.59, satisfaction: 91, completion: 95, students: 280 }
  ]

  // Course Quality Metrics
  const courseMetrics = [
    {
      course: "Database Systems",
      lecturer: "Dr. Ahmad Rizki",
      satisfaction: 4.5,
      completion: 98,
      difficulty: 3.8,
      relevance: 4.6,
      status: "Excellent"
    },
    {
      course: "Software Engineering",
      lecturer: "Prof. Sari Dewi",
      satisfaction: 4.2,
      completion: 95,
      difficulty: 4.1,
      relevance: 4.4,
      status: "Good"
    },
    {
      course: "Machine Learning",
      lecturer: "Dr. Budi Santoso",
      satisfaction: 3.9,
      completion: 88,
      difficulty: 4.5,
      relevance: 4.8,
      status: "Needs Review"
    },
    {
      course: "Web Development",
      lecturer: "Ms. Nina Kusuma",
      satisfaction: 4.7,
      completion: 99,
      difficulty: 3.2,
      relevance: 4.9,
      status: "Excellent"
    }
  ]

  // Learning Process Evaluation
  const learningProcessData = [
    { aspect: "Teaching Quality", score: 85 },
    { aspect: "Material Relevance", score: 92 },
    { aspect: "Assessment Methods", score: 78 },
    { aspect: "Learning Resources", score: 88 },
    { aspect: "Student Engagement", score: 82 },
    { aspect: "Technology Integration", score: 90 }
  ]

  // Trend Data
  const performanceTrends = [
    { month: "Jan", gpa: 3.45, satisfaction: 85, completion: 92 },
    { month: "Feb", gpa: 3.48, satisfaction: 87, completion: 94 },
    { month: "Mar", gpa: 3.52, satisfaction: 89, completion: 95 },
    { month: "Apr", gpa: 3.55, satisfaction: 88, completion: 96 },
    { month: "May", gpa: 3.58, satisfaction: 91, completion: 97 },
    { month: "Jun", gpa: 3.62, satisfaction: 92, completion: 96 }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Excellent": return "bg-green-100 text-green-800"
      case "Good": return "bg-blue-100 text-blue-800"
      case "Needs Review": return "bg-orange-100 text-orange-800"
      case "Poor": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Excellent": return <CheckCircle className="w-4 h-4 text-green-600" />
      case "Good": return <CheckCircle className="w-4 h-4 text-blue-600" />
      case "Needs Review": return <AlertTriangle className="w-4 h-4 text-orange-600" />
      case "Poor": return <AlertTriangle className="w-4 h-4 text-red-600" />
      default: return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Academic Monitoring</h1>
          <p className="text-gray-600">Monitor and evaluate academic performance across all programs</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search courses, lecturers..."
              className="pl-10 w-64"
            />
          </div>
          <Select defaultValue="semester">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="semester">This Semester</SelectItem>
              <SelectItem value="year">Academic Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: "Overall GPA", value: "3.62", change: "+0.08", icon: GraduationCap, color: "text-blue-600" },
          { title: "Student Satisfaction", value: "91.5%", change: "+2.1%", icon: Users, color: "text-green-600" },
          { title: "Course Completion", value: "96.2%", change: "+1.5%", icon: BookOpen, color: "text-purple-600" },
          { title: "Quality Index", value: "87.8", change: "+3.2", icon: Target, color: "text-orange-600" }
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-600">{stat.change}</span>
                    </div>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Learning Process Evaluation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-blue-600" />
                  Learning Process Evaluation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={learningProcessData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="aspect" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar
                      name="Score"
                      dataKey="score"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Performance Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  Department Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={departmentPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="department"
                      angle={-45}
                      textAnchor="end"
                      height={100}
                    />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="gpa" fill="#3b82f6" name="Average GPA" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Departments Tab */}
        <TabsContent value="departments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Department Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Department</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Avg GPA</TableHead>
                    <TableHead>Satisfaction</TableHead>
                    <TableHead>Completion Rate</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {departmentPerformance.map((dept, index) => (
                    <TableRow key={dept.department}>
                      <TableCell className="font-medium">{dept.department}</TableCell>
                      <TableCell>{dept.students}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {dept.gpa.toFixed(2)}
                          <Progress value={(dept.gpa / 4) * 100} className="w-16 h-2" />
                        </div>
                      </TableCell>
                      <TableCell>{dept.satisfaction}%</TableCell>
                      <TableCell>{dept.completion}%</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(dept.gpa >= 3.6 ? "Excellent" : dept.gpa >= 3.4 ? "Good" : "Needs Review")}>
                          {dept.gpa >= 3.6 ? "Excellent" : dept.gpa >= 3.4 ? "Good" : "Needs Review"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Courses Tab */}
        <TabsContent value="courses" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Quality Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Lecturer</TableHead>
                    <TableHead>Satisfaction</TableHead>
                    <TableHead>Completion</TableHead>
                    <TableHead>Difficulty</TableHead>
                    <TableHead>Relevance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courseMetrics.map((course, index) => (
                    <TableRow key={course.course}>
                      <TableCell className="font-medium">{course.course}</TableCell>
                      <TableCell>{course.lecturer}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {course.satisfaction.toFixed(1)}
                          <Progress value={(course.satisfaction / 5) * 100} className="w-16 h-2" />
                        </div>
                      </TableCell>
                      <TableCell>{course.completion}%</TableCell>
                      <TableCell>{course.difficulty.toFixed(1)}</TableCell>
                      <TableCell>{course.relevance.toFixed(1)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(course.status)}
                          <Badge className={getStatusColor(course.status)}>
                            {course.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <FileText className="w-4 h-4 mr-2" />
                          Review
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Trends Tab */}
        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Academic Performance Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={performanceTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="gpa" stroke="#3b82f6" strokeWidth={2} name="Average GPA" />
                  <Line type="monotone" dataKey="satisfaction" stroke="#10b981" strokeWidth={2} name="Satisfaction %" />
                  <Line type="monotone" dataKey="completion" stroke="#f59e0b" strokeWidth={2} name="Completion %" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
