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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  Legend
} from "recharts"
import {
  Users,
  Award,
  BookOpen,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  Star,
  Clock,
  CheckCircle,
  AlertTriangle,
  Plus,
  Filter,
  Download,
  Search,
  Eye,
  Edit,
  Target,
  BarChart3,
  FileText,
  Zap
} from "lucide-react"
import { motion } from "framer-motion"

export default function FacultyPerformanceOversight() {
  // Faculty Performance Data
  const facultyMembers = [
    {
      id: 1,
      name: "Dr. Ahmad Rizki",
      position: "Senior Lecturer",
      department: "Computer Science",
      avatar: "/placeholder-avatar.jpg",
      teachingScore: 4.7,
      researchScore: 4.2,
      serviceScore: 4.5,
      studentSatisfaction: 4.6,
      coursesThisSemester: 3,
      publications: 8,
      h_index: 12,
      status: "Excellent",
      lastEvaluation: "2024-01-15"
    },
    {
      id: 2,
      name: "Prof. Sari Dewi",
      position: "Professor",
      department: "Software Engineering",
      avatar: "/placeholder-avatar.jpg",
      teachingScore: 4.8,
      researchScore: 4.9,
      serviceScore: 4.6,
      studentSatisfaction: 4.7,
      coursesThisSemester: 2,
      publications: 15,
      h_index: 18,
      status: "Outstanding",
      lastEvaluation: "2024-01-10"
    },
    {
      id: 3,
      name: "Dr. Budi Santoso",
      position: "Associate Professor",
      department: "Data Science",
      avatar: "/placeholder-avatar.jpg",
      teachingScore: 4.1,
      researchScore: 4.4,
      serviceScore: 3.9,
      studentSatisfaction: 4.0,
      coursesThisSemester: 4,
      publications: 6,
      h_index: 9,
      status: "Good",
      lastEvaluation: "2024-01-20"
    },
    {
      id: 4,
      name: "Ms. Nina Kusuma",
      position: "Lecturer",
      department: "Information Systems",
      avatar: "/placeholder-avatar.jpg",
      teachingScore: 4.9,
      researchScore: 3.8,
      serviceScore: 4.2,
      studentSatisfaction: 4.8,
      coursesThisSemester: 5,
      publications: 3,
      h_index: 5,
      status: "Excellent",
      lastEvaluation: "2024-01-12"
    }
  ]

  // Tri Dharma Performance Data
  const triDharmaData = [
    { category: "Teaching", target: 85, achieved: 88, trend: "up" },
    { category: "Research", target: 75, achieved: 72, trend: "down" },
    { category: "Community Service", target: 70, achieved: 78, trend: "up" }
  ]

  // Student Satisfaction Trends
  const satisfactionTrends = [
    { semester: "2023-1", satisfaction: 4.2, responses: 1240 },
    { semester: "2023-2", satisfaction: 4.3, responses: 1180 },
    { semester: "2024-1", satisfaction: 4.5, responses: 1320 },
    { semester: "2024-2", satisfaction: 4.6, responses: 1350 }
  ]

  // Performance Distribution
  const performanceDistribution = [
    { range: "4.5-5.0", count: 12, percentage: 35 },
    { range: "4.0-4.4", count: 15, percentage: 44 },
    { range: "3.5-3.9", count: 6, percentage: 18 },
    { range: "3.0-3.4", count: 1, percentage: 3 }
  ]

  // Faculty Development Programs
  const developmentPrograms = [
    {
      program: "Digital Teaching Methods",
      participants: 28,
      completion: 85,
      effectiveness: 4.4,
      status: "Ongoing"
    },
    {
      program: "Research Methodology",
      participants: 15,
      completion: 92,
      effectiveness: 4.6,
      status: "Completed"
    },
    {
      program: "Assessment Techniques",
      participants: 22,
      completion: 78,
      effectiveness: 4.2,
      status: "Ongoing"
    }
  ]

  const getPerformanceColor = (score: number) => {
    if (score >= 4.5) return "text-green-600"
    if (score >= 4.0) return "text-blue-600"
    if (score >= 3.5) return "text-orange-600"
    return "text-red-600"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Outstanding": return "bg-purple-100 text-purple-800"
      case "Excellent": return "bg-green-100 text-green-800"
      case "Good": return "bg-blue-100 text-blue-800"
      case "Needs Improvement": return "bg-orange-100 text-orange-800"
      case "Poor": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Outstanding": return <Award className="w-4 h-4 text-purple-600" />
      case "Excellent": return <CheckCircle className="w-4 h-4 text-green-600" />
      case "Good": return <CheckCircle className="w-4 h-4 text-blue-600" />
      case "Needs Improvement": return <AlertTriangle className="w-4 h-4 text-orange-600" />
      case "Poor": return <AlertTriangle className="w-4 h-4 text-red-600" />
      default: return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const overallStats = {
    totalFaculty: facultyMembers.length,
    avgTeachingScore: (facultyMembers.reduce((sum, f) => sum + f.teachingScore, 0) / facultyMembers.length).toFixed(1),
    avgResearchScore: (facultyMembers.reduce((sum, f) => sum + f.researchScore, 0) / facultyMembers.length).toFixed(1),
    avgSatisfaction: (facultyMembers.reduce((sum, f) => sum + f.studentSatisfaction, 0) / facultyMembers.length).toFixed(1)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Faculty Performance Oversight</h1>
          <p className="text-gray-600">Monitor and evaluate faculty performance across tri dharma perguruan tinggi</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search faculty..."
              className="pl-10 w-64"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Evaluation
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: "Total Faculty",
            value: overallStats.totalFaculty.toString(),
            subtitle: "Active members",
            icon: Users,
            color: "text-blue-600",
            bgColor: "bg-blue-50"
          },
          {
            title: "Avg Teaching Score",
            value: overallStats.avgTeachingScore,
            subtitle: "Out of 5.0",
            icon: BookOpen,
            color: "text-green-600",
            bgColor: "bg-green-50"
          },
          {
            title: "Avg Research Score",
            value: overallStats.avgResearchScore,
            subtitle: "Out of 5.0",
            icon: Target,
            color: "text-purple-600",
            bgColor: "bg-purple-50"
          },
          {
            title: "Student Satisfaction",
            value: overallStats.avgSatisfaction,
            subtitle: "Out of 5.0",
            icon: Star,
            color: "text-orange-600",
            bgColor: "bg-orange-50"
          }
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className={`${stat.bgColor} border-0`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-gray-500">{stat.subtitle}</p>
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
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="faculty">Faculty List</TabsTrigger>
          <TabsTrigger value="tri-dharma">Tri Dharma</TabsTrigger>
          <TabsTrigger value="satisfaction">Satisfaction</TabsTrigger>
          <TabsTrigger value="development">Development</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  Performance Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={performanceDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3b82f6" name="Faculty Count" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Tri Dharma Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-600" />
                  Tri Dharma Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {triDharmaData.map((item, index) => (
                    <motion.div
                      key={item.category}
                      className="space-y-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-gray-800">{item.category}</h4>
                          {item.trend === "up" ? (
                            <TrendingUp className="w-4 h-4 text-green-500" />
                          ) : item.trend === "down" ? (
                            <TrendingDown className="w-4 h-4 text-red-500" />
                          ) : null}
                        </div>
                        <span className="text-sm font-medium text-gray-600">
                          {item.achieved}% / {item.target}%
                        </span>
                      </div>
                      <Progress value={(item.achieved / item.target) * 100} className="h-3" />
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Faculty List Tab */}
        <TabsContent value="faculty" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Faculty Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Faculty Member</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Teaching</TableHead>
                    <TableHead>Research</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Student Rating</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {facultyMembers.map((faculty) => (
                    <TableRow key={faculty.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={faculty.avatar} />
                            <AvatarFallback>{faculty.name.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{faculty.name}</div>
                            <div className="text-sm text-gray-600">{faculty.position}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{faculty.department}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span className={`font-medium ${getPerformanceColor(faculty.teachingScore)}`}>
                            {faculty.teachingScore}
                          </span>
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span className={`font-medium ${getPerformanceColor(faculty.researchScore)}`}>
                            {faculty.researchScore}
                          </span>
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span className={`font-medium ${getPerformanceColor(faculty.serviceScore)}`}>
                            {faculty.serviceScore}
                          </span>
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span className={`font-medium ${getPerformanceColor(faculty.studentSatisfaction)}`}>
                            {faculty.studentSatisfaction}
                          </span>
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(faculty.status)}
                          <Badge className={getStatusColor(faculty.status)}>
                            {faculty.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl">
                              <DialogHeader>
                                <DialogTitle>{faculty.name} - Performance Details</DialogTitle>
                                <DialogDescription>
                                  Comprehensive performance overview for {faculty.position}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-4">
                                  <h4 className="font-semibold">Performance Metrics</h4>
                                  <div className="space-y-3">
                                    <div className="flex justify-between">
                                      <span>Teaching Score:</span>
                                      <span className="font-medium">{faculty.teachingScore}/5.0</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Research Score:</span>
                                      <span className="font-medium">{faculty.researchScore}/5.0</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Service Score:</span>
                                      <span className="font-medium">{faculty.serviceScore}/5.0</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Student Satisfaction:</span>
                                      <span className="font-medium">{faculty.studentSatisfaction}/5.0</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="space-y-4">
                                  <h4 className="font-semibold">Research Output</h4>
                                  <div className="space-y-3">
                                    <div className="flex justify-between">
                                      <span>Publications:</span>
                                      <span className="font-medium">{faculty.publications}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>H-Index:</span>
                                      <span className="font-medium">{faculty.h_index}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Courses This Semester:</span>
                                      <span className="font-medium">{faculty.coursesThisSemester}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Last Evaluation:</span>
                                      <span className="font-medium">{faculty.lastEvaluation}</span>
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

        {/* Tri Dharma Tab */}
        <TabsContent value="tri-dharma" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {triDharmaData.map((dharma, index) => (
              <Card key={dharma.category}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {dharma.category === "Teaching" && <BookOpen className="w-5 h-5 text-blue-600" />}
                    {dharma.category === "Research" && <Target className="w-5 h-5 text-purple-600" />}
                    {dharma.category === "Community Service" && <Users className="w-5 h-5 text-green-600" />}
                    {dharma.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Achievement</span>
                      <span className="text-2xl font-bold text-gray-900">{dharma.achieved}%</span>
                    </div>
                    <Progress value={(dharma.achieved / dharma.target) * 100} className="h-3" />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Target: {dharma.target}%</span>
                      <div className="flex items-center gap-1">
                        {dharma.trend === "up" ? (
                          <TrendingUp className="w-4 h-4 text-green-500" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-500" />
                        )}
                        <span className={dharma.trend === "up" ? "text-green-600" : "text-red-600"}>
                          {dharma.trend === "up" ? "Improving" : "Declining"}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Student Satisfaction Tab */}
        <TabsContent value="satisfaction" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-orange-600" />
                Student Satisfaction Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={satisfactionTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="semester" />
                  <YAxis domain={[3.5, 5]} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="satisfaction"
                    stroke="#f59e0b"
                    strokeWidth={3}
                    name="Average Satisfaction"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Faculty Development Tab */}
        <TabsContent value="development" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-purple-600" />
                Faculty Development Programs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Program</TableHead>
                    <TableHead>Participants</TableHead>
                    <TableHead>Completion Rate</TableHead>
                    <TableHead>Effectiveness</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {developmentPrograms.map((program, index) => (
                    <TableRow key={program.program}>
                      <TableCell className="font-medium">{program.program}</TableCell>
                      <TableCell>{program.participants}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {program.completion}%
                          <Progress value={program.completion} className="w-16 h-2" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span className={`font-medium ${getPerformanceColor(program.effectiveness)}`}>
                            {program.effectiveness}
                          </span>
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={program.status === "Completed" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}>
                          {program.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <FileText className="w-4 h-4" />
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
      </Tabs>
    </div>
  )
}
