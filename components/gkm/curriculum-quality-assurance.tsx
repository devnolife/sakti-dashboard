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
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from "recharts"
import {
  BookOpen,
  Target,
  Zap,
  CheckCircle,
  AlertTriangle,
  Clock,
  Plus,
  Edit,
  Eye,
  Download,
  FileText,
  Bookmark,
  Award,
  Globe,
  Building,
  Users,
  TrendingUp
} from "lucide-react"
import { motion } from "framer-motion"

export default function CurriculumQualityAssurance() {
  // Curriculum Compliance Data
  const curriculumCompliance = [
    {
      program: "Computer Science",
      courses: 42,
      compliant: 38,
      underReview: 3,
      nonCompliant: 1,
      lastUpdate: "2024-01-15",
      accreditation: "A",
      industryAlignment: 92
    },
    {
      program: "Information Systems",
      courses: 38,
      compliant: 35,
      underReview: 2,
      nonCompliant: 1,
      lastUpdate: "2024-01-10",
      accreditation: "A",
      industryAlignment: 89
    },
    {
      program: "Software Engineering",
      courses: 40,
      compliant: 39,
      underReview: 1,
      nonCompliant: 0,
      lastUpdate: "2024-01-20",
      accreditation: "A",
      industryAlignment: 95
    },
    {
      program: "Data Science",
      courses: 36,
      compliant: 32,
      underReview: 3,
      nonCompliant: 1,
      lastUpdate: "2024-01-08",
      accreditation: "B+",
      industryAlignment: 88
    }
  ]

  // Learning Outcomes Assessment
  const learningOutcomes = [
    {
      outcome: "Technical Proficiency",
      target: 90,
      achieved: 87,
      trend: "up",
      courses: 24
    },
    {
      outcome: "Problem Solving",
      target: 85,
      achieved: 91,
      trend: "up",
      courses: 18
    },
    {
      outcome: "Communication Skills",
      target: 80,
      achieved: 78,
      trend: "down",
      courses: 12
    },
    {
      outcome: "Teamwork",
      target: 85,
      achieved: 89,
      trend: "up",
      courses: 15
    },
    {
      outcome: "Critical Thinking",
      target: 88,
      achieved: 85,
      trend: "stable",
      courses: 20
    }
  ]

  // Industry Relevance Data
  const industryRelevance = [
    { category: "Current Technologies", score: 92, color: "#10b981" },
    { category: "Industry Standards", score: 88, color: "#3b82f6" },
    { category: "Practical Applications", score: 85, color: "#f59e0b" },
    { category: "Market Demands", score: 89, color: "#8b5cf6" },
    { category: "Future Trends", score: 82, color: "#ef4444" }
  ]

  // Curriculum Review Schedule
  const reviewSchedule = [
    {
      program: "Computer Science",
      nextReview: "2024-02-15",
      type: "Annual Review",
      status: "Scheduled",
      priority: "Medium"
    },
    {
      program: "Software Engineering",
      nextReview: "2024-01-30",
      type: "Curriculum Update",
      status: "In Progress",
      priority: "High"
    },
    {
      program: "Data Science",
      nextReview: "2024-03-01",
      type: "Industry Alignment",
      status: "Pending",
      priority: "High"
    },
    {
      program: "Information Systems",
      nextReview: "2024-02-20",
      type: "Accreditation Prep",
      status: "Scheduled",
      priority: "Medium"
    }
  ]

  const getCompliancePercentage = (program: any) => {
    return Math.round((program.compliant / program.courses) * 100)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Scheduled": return "bg-blue-100 text-blue-800"
      case "In Progress": return "bg-orange-100 text-orange-800"
      case "Pending": return "bg-gray-100 text-gray-800"
      case "Completed": return "bg-green-100 text-green-800"
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

  const getAccreditationColor = (grade: string) => {
    switch (grade) {
      case "A": return "bg-green-100 text-green-800"
      case "B+": return "bg-blue-100 text-blue-800"
      case "B": return "bg-yellow-100 text-yellow-800"
      case "C": return "bg-orange-100 text-orange-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Curriculum Quality Assurance</h1>
          <p className="text-gray-600">Monitor and ensure curriculum compliance with academic standards</p>
        </div>
        <div className="flex items-center gap-3">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Review
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: "Overall Compliance",
            value: "92.3%",
            change: "+2.1%",
            icon: CheckCircle,
            color: "text-green-600",
            bgColor: "bg-green-50"
          },
          {
            title: "Programs Reviewed",
            value: "4/4",
            change: "100%",
            icon: BookOpen,
            color: "text-blue-600",
            bgColor: "bg-blue-50"
          },
          {
            title: "Industry Alignment",
            value: "91.0%",
            change: "+1.5%",
            icon: Building,
            color: "text-purple-600",
            bgColor: "bg-purple-50"
          },
          {
            title: "Learning Outcomes",
            value: "86.0%",
            change: "+0.8%",
            icon: Target,
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
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="outcomes">Learning Outcomes</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Industry Relevance Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5 text-purple-600" />
                  Industry Relevance Assessment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={industryRelevance}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ category, score }) => `${category}: ${score}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="score"
                    >
                      {industryRelevance.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Curriculum Compliance Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Curriculum Compliance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={curriculumCompliance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="program"
                      angle={-45}
                      textAnchor="end"
                      height={100}
                    />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="compliant" fill="#10b981" name="Compliant" />
                    <Bar dataKey="underReview" fill="#f59e0b" name="Under Review" />
                    <Bar dataKey="nonCompliant" fill="#ef4444" name="Non-Compliant" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Compliance Tab */}
        <TabsContent value="compliance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Program Compliance Status</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Program</TableHead>
                    <TableHead>Total Courses</TableHead>
                    <TableHead>Compliance Rate</TableHead>
                    <TableHead>Accreditation</TableHead>
                    <TableHead>Industry Alignment</TableHead>
                    <TableHead>Last Update</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {curriculumCompliance.map((program, index) => (
                    <TableRow key={program.program}>
                      <TableCell className="font-medium">{program.program}</TableCell>
                      <TableCell>{program.courses}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getCompliancePercentage(program)}%
                          <Progress value={getCompliancePercentage(program)} className="w-20 h-2" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getAccreditationColor(program.accreditation)}>
                          {program.accreditation}
                        </Badge>
                      </TableCell>
                      <TableCell>{program.industryAlignment}%</TableCell>
                      <TableCell>{program.lastUpdate}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Update Curriculum Compliance</DialogTitle>
                                <DialogDescription>
                                  Review and update curriculum compliance for {program.program}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <label className="text-sm font-medium">Compliance Notes</label>
                                  <Textarea placeholder="Enter compliance review notes..." />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium">Status</label>
                                    <Select defaultValue="compliant">
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="compliant">Compliant</SelectItem>
                                        <SelectItem value="review">Under Review</SelectItem>
                                        <SelectItem value="non-compliant">Non-Compliant</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Industry Alignment %</label>
                                    <Input type="number" defaultValue={program.industryAlignment} />
                                  </div>
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

        {/* Learning Outcomes Tab */}
        <TabsContent value="outcomes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-orange-600" />
                Learning Outcomes Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {learningOutcomes.map((outcome, index) => (
                  <motion.div
                    key={outcome.outcome}
                    className="space-y-3 p-4 rounded-lg border"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-800">{outcome.outcome}</h4>
                        <p className="text-sm text-gray-600">{outcome.courses} courses assessed</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {outcome.trend === "up" && <TrendingUp className="w-4 h-4 text-green-500" />}
                        {outcome.trend === "down" && <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />}
                        {outcome.trend === "stable" && <div className="w-4 h-4 bg-gray-400 rounded-full" />}
                        <span className="text-sm font-medium">
                          {outcome.achieved}% / {outcome.target}%
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{outcome.achieved}% achieved</span>
                      </div>
                      <Progress value={(outcome.achieved / outcome.target) * 100} className="h-3" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value="reviews" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                Curriculum Review Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Program</TableHead>
                    <TableHead>Review Type</TableHead>
                    <TableHead>Next Review</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reviewSchedule.map((review, index) => (
                    <TableRow key={review.program}>
                      <TableCell className="font-medium">{review.program}</TableCell>
                      <TableCell>{review.type}</TableCell>
                      <TableCell>{review.nextReview}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(review.status)}>
                          {review.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(review.priority)}>
                          {review.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <FileText className="w-4 h-4 mr-2" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
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
