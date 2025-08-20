"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { DatePickerWithRange } from "@/components/ui/date-range-picker"
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
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  Tooltip,
  Legend
} from "recharts"
import {
  Database,
  TrendingUp,
  TrendingDown,
  GraduationCap,
  Clock,
  Users,
  BookOpen,
  Target,
  BarChart3,
  PieChart as PieChartIcon,
  Download,
  Filter,
  Calendar,
  RefreshCw,
  Eye,
  AlertTriangle,
  CheckCircle,
  FileText,
  Settings
} from "lucide-react"
import { motion } from "framer-motion"

export default function AcademicDataManagement() {
  // Academic Performance Metrics
  const gpaData = [
    { semester: "2022-1", overall: 3.42, cs: 3.48, is: 3.38, se: 3.52, ds: 3.35 },
    { semester: "2022-2", overall: 3.45, cs: 3.51, is: 3.41, se: 3.55, ds: 3.38 },
    { semester: "2023-1", overall: 3.48, cs: 3.54, is: 3.44, se: 3.58, ds: 3.41 },
    { semester: "2023-2", overall: 3.52, cs: 3.58, is: 3.47, se: 3.62, ds: 3.45 },
    { semester: "2024-1", overall: 3.56, cs: 3.62, is: 3.51, se: 3.65, ds: 3.49 },
    { semester: "2024-2", overall: 3.59, cs: 3.65, is: 3.54, se: 3.68, ds: 3.52 }
  ]

  // Graduation Rate Data
  const graduationData = [
    { year: "2020", onTime: 78, delayed: 15, dropout: 7 },
    { year: "2021", onTime: 82, delayed: 13, dropout: 5 },
    { year: "2022", onTime: 85, delayed: 11, dropout: 4 },
    { year: "2023", onTime: 88, delayed: 9, dropout: 3 },
    { year: "2024", onTime: 91, delayed: 7, dropout: 2 }
  ]

  // Study Duration Analysis
  const studyDurationData = [
    { duration: "4 years", count: 450, percentage: 65 },
    { duration: "4.5 years", count: 150, percentage: 22 },
    { duration: "5 years", count: 70, percentage: 10 },
    { duration: "5+ years", count: 20, percentage: 3 }
  ]

  // Department Performance Comparison
  const departmentComparison = [
    {
      department: "Computer Science",
      students: 850,
      avgGPA: 3.65,
      graduationRate: 92,
      employmentRate: 95,
      avgStudyDuration: 4.2,
      trend: "up"
    },
    {
      department: "Software Engineering",
      students: 720,
      avgGPA: 3.68,
      graduationRate: 94,
      employmentRate: 97,
      avgStudyDuration: 4.1,
      trend: "up"
    },
    {
      department: "Information Systems",
      students: 680,
      avgGPA: 3.54,
      graduationRate: 89,
      employmentRate: 92,
      avgStudyDuration: 4.3,
      trend: "stable"
    },
    {
      department: "Data Science",
      students: 520,
      avgGPA: 3.52,
      graduationRate: 87,
      employmentRate: 94,
      avgStudyDuration: 4.4,
      trend: "up"
    }
  ]

  // Student Demographics
  const demographicsData = [
    { category: "Male", count: 1680, percentage: 60, color: "#3b82f6" },
    { category: "Female", count: 1120, percentage: 40, color: "#ec4899" }
  ]

  const ageDistribution = [
    { ageGroup: "18-20", count: 1250, percentage: 45 },
    { ageGroup: "21-23", count: 980, percentage: 35 },
    { ageGroup: "24-26", count: 420, percentage: 15 },
    { ageGroup: "27+", count: 150, percentage: 5 }
  ]

  // Academic Achievement Levels
  const achievementLevels = [
    { level: "Excellent (3.5+)", count: 1680, percentage: 60, color: "#10b981" },
    { level: "Good (3.0-3.49)", count: 840, percentage: 30, color: "#3b82f6" },
    { level: "Satisfactory (2.5-2.99)", count: 210, percentage: 7.5, color: "#f59e0b" },
    { level: "Needs Improvement (<2.5)", count: 70, percentage: 2.5, color: "#ef4444" }
  ]

  // Research Output Metrics
  const researchMetrics = [
    { metric: "Student Publications", value: 245, change: "+18%", trend: "up" },
    { metric: "Conference Presentations", value: 156, change: "+12%", trend: "up" },
    { metric: "Research Projects", value: 89, change: "+25%", trend: "up" },
    { metric: "Industry Collaborations", value: 34, change: "+8%", trend: "up" }
  ]

  // Quality Indicators Summary
  const qualityIndicators = [
    { indicator: "Student Retention Rate", current: 94.2, target: 95, status: "good" },
    { indicator: "Course Completion Rate", current: 96.8, target: 97, status: "good" },
    { indicator: "Employment Rate", current: 94.5, target: 95, status: "excellent" },
    { indicator: "Industry Satisfaction", current: 4.3, target: 4.5, status: "good" },
    { indicator: "Alumni Feedback", current: 4.4, target: 4.5, status: "good" }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent": return "text-green-600 bg-green-100"
      case "good": return "text-blue-600 bg-blue-100"
      case "warning": return "text-orange-600 bg-orange-100"
      case "critical": return "text-red-600 bg-red-100"
      default: return "text-gray-600 bg-gray-100"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="w-4 h-4 text-green-500" />
      case "down": return <TrendingDown className="w-4 h-4 text-red-500" />
      default: return <div className="w-4 h-4 bg-gray-400 rounded-full" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Academic Data Management</h1>
          <p className="text-gray-600">Comprehensive academic analytics and performance tracking</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Date Range
          </Button>
          <Select defaultValue="all">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="cs">Computer Science</SelectItem>
              <SelectItem value="se">Software Engineering</SelectItem>
              <SelectItem value="is">Information Systems</SelectItem>
              <SelectItem value="ds">Data Science</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {[
          {
            title: "Total Students",
            value: "2,800",
            change: "+5.2%",
            icon: Users,
            color: "text-blue-600",
            bgColor: "bg-blue-50"
          },
          {
            title: "Overall GPA",
            value: "3.59",
            change: "+0.03",
            icon: GraduationCap,
            color: "text-green-600",
            bgColor: "bg-green-50"
          },
          {
            title: "Graduation Rate",
            value: "91%",
            change: "+3%",
            icon: CheckCircle,
            color: "text-purple-600",
            bgColor: "bg-purple-50"
          },
          {
            title: "Avg Study Duration",
            value: "4.25y",
            change: "-0.1y",
            icon: Clock,
            color: "text-orange-600",
            bgColor: "bg-orange-50"
          },
          {
            title: "Employment Rate",
            value: "94.5%",
            change: "+2.1%",
            icon: Target,
            color: "text-red-600",
            bgColor: "bg-red-50"
          }
        ].map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className={`${metric.bgColor} border-0`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-600">{metric.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3 text-green-500" />
                      <span className="text-xs text-green-600">{metric.change}</span>
                    </div>
                  </div>
                  <metric.icon className={`w-6 h-6 ${metric.color}`} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Analytics Tabs */}
      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="graduation">Graduation</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="research">Research</TabsTrigger>
          <TabsTrigger value="quality">Quality</TabsTrigger>
        </TabsList>

        {/* Academic Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* GPA Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  GPA Trends by Department
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={gpaData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="semester" />
                    <YAxis domain={[3.2, 3.8]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="overall" stroke="#374151" strokeWidth={2} name="Overall" />
                    <Line type="monotone" dataKey="cs" stroke="#3b82f6" strokeWidth={2} name="Computer Science" />
                    <Line type="monotone" dataKey="se" stroke="#10b981" strokeWidth={2} name="Software Engineering" />
                    <Line type="monotone" dataKey="is" stroke="#f59e0b" strokeWidth={2} name="Information Systems" />
                    <Line type="monotone" dataKey="ds" stroke="#8b5cf6" strokeWidth={2} name="Data Science" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Department Comparison */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-600" />
                  Department Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Department</TableHead>
                        <TableHead>Students</TableHead>
                        <TableHead>Avg GPA</TableHead>
                        <TableHead>Grad Rate</TableHead>
                        <TableHead>Trend</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {departmentComparison.map((dept) => (
                        <TableRow key={dept.department}>
                          <TableCell className="font-medium">{dept.department}</TableCell>
                          <TableCell>{dept.students}</TableCell>
                          <TableCell>{dept.avgGPA}</TableCell>
                          <TableCell>{dept.graduationRate}%</TableCell>
                          <TableCell>{getTrendIcon(dept.trend)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Graduation Analysis Tab */}
        <TabsContent value="graduation" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Graduation Rate Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-purple-600" />
                  Graduation Rate Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={graduationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="onTime" stackId="1" stroke="#10b981" fill="#10b981" name="On Time" />
                    <Area type="monotone" dataKey="delayed" stackId="1" stroke="#f59e0b" fill="#f59e0b" name="Delayed" />
                    <Area type="monotone" dataKey="dropout" stackId="1" stroke="#ef4444" fill="#ef4444" name="Dropout" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Study Duration Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange-600" />
                  Study Duration Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={studyDurationData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ duration, percentage }) => `${duration}: ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {studyDurationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`hsl(${index * 90}, 70%, 50%)`} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Demographics Tab */}
        <TabsContent value="demographics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Gender Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  Gender Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={demographicsData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                      label={({ category, percentage }) => `${category}: ${percentage}%`}
                    >
                      {demographicsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Age Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Age Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={ageDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="ageGroup" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Achievement Levels */}
            <Card>
              <CardHeader>
                <CardTitle>Academic Achievement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {achievementLevels.map((level, index) => (
                    <div key={level.level} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{level.level}</span>
                        <span className="text-sm">{level.percentage}%</span>
                      </div>
                      <Progress value={level.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Research Metrics Tab */}
        <TabsContent value="research" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {researchMetrics.map((metric, index) => (
              <motion.div
                key={metric.metric}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-600">{metric.metric}</p>
                      <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
                      <div className="flex items-center gap-1">
                        {getTrendIcon(metric.trend)}
                        <span className="text-sm text-green-600">{metric.change}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Quality Indicators Tab */}
        <TabsContent value="quality" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Quality Indicators Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {qualityIndicators.map((indicator, index) => (
                  <motion.div
                    key={indicator.indicator}
                    className="space-y-3 p-4 rounded-lg border"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-gray-800">{indicator.indicator}</h4>
                      <Badge className={getStatusColor(indicator.status)}>
                        {indicator.status}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Current: {indicator.current}{indicator.indicator.includes('Rate') ? '%' : ''}</span>
                        <span>Target: {indicator.target}{indicator.indicator.includes('Rate') ? '%' : ''}</span>
                      </div>
                      <Progress
                        value={(indicator.current / indicator.target) * 100}
                        className="h-3"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
