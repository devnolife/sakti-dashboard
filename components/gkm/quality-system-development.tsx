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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
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
  Legend
} from "recharts"
import {
  Settings,
  Shield,
  FileCheck,
  Target,
  Zap,
  CheckCircle,
  AlertTriangle,
  Clock,
  Plus,
  Edit,
  Eye,
  Download,
  Upload,
  RefreshCw,
  BookOpen,
  Award,
  TrendingUp,
  Users,
  Building,
  Clipboard
} from "lucide-react"
import { motion } from "framer-motion"

export default function QualitySystemDevelopment() {
  // Quality Standards Data
  const qualityStandards = [
    {
      id: 1,
      standard: "ISO 9001:2015",
      category: "Quality Management",
      compliance: 94,
      lastAudit: "2024-01-15",
      nextReview: "2024-07-15",
      status: "Compliant",
      priority: "Medium"
    },
    {
      id: 2,
      standard: "ABET Criteria",
      category: "Engineering Accreditation",
      compliance: 97,
      lastAudit: "2023-11-20",
      nextReview: "2024-11-20",
      status: "Excellent",
      priority: "High"
    },
    {
      id: 3,
      standard: "BAN-PT Standards",
      category: "National Accreditation",
      compliance: 92,
      lastAudit: "2024-01-10",
      nextReview: "2025-01-10",
      status: "Good",
      priority: "High"
    },
    {
      id: 4,
      standard: "ASIIN Criteria",
      category: "International Recognition",
      compliance: 89,
      lastAudit: "2023-12-05",
      nextReview: "2024-06-05",
      status: "Needs Improvement",
      priority: "High"
    }
  ]

  // Quality Procedures
  const qualityProcedures = [
    {
      procedure: "Academic Review Process",
      version: "v2.1",
      owner: "Academic Affairs",
      lastUpdate: "2024-01-20",
      status: "Active",
      compliance: 95
    },
    {
      procedure: "Faculty Evaluation",
      version: "v1.8",
      owner: "HR Department",
      lastUpdate: "2024-01-15",
      status: "Active",
      compliance: 92
    },
    {
      procedure: "Curriculum Development",
      version: "v3.0",
      owner: "Curriculum Committee",
      lastUpdate: "2024-01-25",
      status: "Under Review",
      compliance: 88
    },
    {
      procedure: "Student Assessment",
      version: "v2.3",
      owner: "Academic Standards",
      lastUpdate: "2024-01-12",
      status: "Active",
      compliance: 96
    }
  ]

  // Continuous Improvement Projects
  const improvementProjects = [
    {
      project: "Digital Learning Platform Enhancement",
      phase: "Implementation",
      progress: 75,
      startDate: "2023-10-01",
      expectedCompletion: "2024-03-31",
      budget: "$50,000",
      impact: "High",
      status: "On Track"
    },
    {
      project: "Faculty Development Program",
      phase: "Planning",
      progress: 25,
      startDate: "2024-01-15",
      expectedCompletion: "2024-12-31",
      budget: "$35,000",
      impact: "Medium",
      status: "Planning"
    },
    {
      project: "Industry Partnership Framework",
      phase: "Execution",
      progress: 60,
      startDate: "2023-09-01",
      expectedCompletion: "2024-06-30",
      budget: "$25,000",
      impact: "High",
      status: "On Track"
    }
  ]

  // Accreditation Preparation
  const accreditationPrep = [
    {
      accreditor: "BAN-PT",
      nextVisit: "2025-03-15",
      preparation: 78,
      documentsReady: 156,
      totalDocuments: 200,
      status: "In Progress",
      coordinator: "Dr. Ahmad Rizki"
    },
    {
      accreditor: "ABET",
      nextVisit: "2024-10-20",
      preparation: 85,
      documentsReady: 142,
      totalDocuments: 167,
      status: "On Track",
      coordinator: "Prof. Sari Dewi"
    }
  ]

  // Quality Metrics Trends
  const qualityTrends = [
    { month: "Jan", overall: 89, process: 87, outcome: 91, satisfaction: 88 },
    { month: "Feb", overall: 91, process: 89, outcome: 93, satisfaction: 90 },
    { month: "Mar", overall: 92, process: 90, outcome: 94, satisfaction: 91 },
    { month: "Apr", overall: 94, process: 92, outcome: 96, satisfaction: 93 },
    { month: "May", overall: 93, process: 91, outcome: 95, satisfaction: 92 },
    { month: "Jun", overall: 95, process: 93, outcome: 97, satisfaction: 94 }
  ]

  // Best Practices
  const bestPractices = [
    {
      practice: "Peer Review System",
      implementation: "Faculty Development",
      effectiveness: 92,
      adoptionRate: 85,
      impact: "High"
    },
    {
      practice: "Continuous Assessment",
      implementation: "Student Evaluation",
      effectiveness: 88,
      adoptionRate: 90,
      impact: "Medium"
    },
    {
      practice: "Industry Mentorship",
      implementation: "Career Development",
      effectiveness: 94,
      adoptionRate: 70,
      impact: "High"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Excellent": return "bg-green-100 text-green-800"
      case "Compliant": case "Good": case "Active": case "On Track": return "bg-blue-100 text-blue-800"
      case "Needs Improvement": case "Under Review": case "In Progress": return "bg-orange-100 text-orange-800"
      case "Non-Compliant": case "Overdue": case "Planning": return "bg-red-100 text-red-800"
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

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High": return "bg-purple-100 text-purple-800"
      case "Medium": return "bg-blue-100 text-blue-800"
      case "Low": return "bg-gray-100 text-gray-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quality System Development</h1>
          <p className="text-gray-600">Design, implement, and maintain quality assurance procedures</p>
        </div>
        <div className="flex items-center gap-3">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Standard
          </Button>
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import SOPs
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: "Quality Standards",
            value: "4",
            subtitle: "Active standards",
            icon: Shield,
            color: "text-blue-600",
            bgColor: "bg-blue-50"
          },
          {
            title: "Compliance Rate",
            value: "93%",
            subtitle: "Overall compliance",
            icon: CheckCircle,
            color: "text-green-600",
            bgColor: "bg-green-50"
          },
          {
            title: "Active SOPs",
            value: "28",
            subtitle: "Procedures implemented",
            icon: FileCheck,
            color: "text-purple-600",
            bgColor: "bg-purple-50"
          },
          {
            title: "Improvement Projects",
            value: "3",
            subtitle: "Ongoing initiatives",
            icon: TrendingUp,
            color: "text-orange-600",
            bgColor: "bg-orange-50"
          }
        ].map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className={`${metric.bgColor} border-0`}>
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
      <Tabs defaultValue="standards" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="standards">Standards</TabsTrigger>
          <TabsTrigger value="procedures">Procedures</TabsTrigger>
          <TabsTrigger value="improvement">Improvement</TabsTrigger>
          <TabsTrigger value="accreditation">Accreditation</TabsTrigger>
          <TabsTrigger value="best-practices">Best Practices</TabsTrigger>
        </TabsList>

        {/* Quality Standards Tab */}
        <TabsContent value="standards" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                Quality Standards Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Standard</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Compliance</TableHead>
                    <TableHead>Last Audit</TableHead>
                    <TableHead>Next Review</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {qualityStandards.map((standard) => (
                    <TableRow key={standard.id}>
                      <TableCell className="font-medium">{standard.standard}</TableCell>
                      <TableCell>{standard.category}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {standard.compliance}%
                          <Progress value={standard.compliance} className="w-16 h-2" />
                        </div>
                      </TableCell>
                      <TableCell>{standard.lastAudit}</TableCell>
                      <TableCell>{standard.nextReview}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(standard.status)}>
                          {standard.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(standard.priority)}>
                          {standard.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
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

          {/* Quality Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Quality Metrics Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={qualityTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[80, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="overall" stroke="#374151" strokeWidth={2} name="Overall Quality" />
                  <Line type="monotone" dataKey="process" stroke="#3b82f6" strokeWidth={2} name="Process Quality" />
                  <Line type="monotone" dataKey="outcome" stroke="#10b981" strokeWidth={2} name="Outcome Quality" />
                  <Line type="monotone" dataKey="satisfaction" stroke="#f59e0b" strokeWidth={2} name="Satisfaction" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Quality Procedures Tab */}
        <TabsContent value="procedures" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-purple-600" />
                Standard Operating Procedures
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Procedure</TableHead>
                    <TableHead>Version</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Last Update</TableHead>
                    <TableHead>Compliance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {qualityProcedures.map((procedure, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{procedure.procedure}</TableCell>
                      <TableCell>{procedure.version}</TableCell>
                      <TableCell>{procedure.owner}</TableCell>
                      <TableCell>{procedure.lastUpdate}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {procedure.compliance}%
                          <Progress value={procedure.compliance} className="w-16 h-2" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(procedure.status)}>
                          {procedure.status}
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
                                <DialogTitle>{procedure.procedure}</DialogTitle>
                                <DialogDescription>
                                  Standard Operating Procedure Details
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium">Version</label>
                                    <Input value={procedure.version} readOnly />
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Owner</label>
                                    <Input value={procedure.owner} readOnly />
                                  </div>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Procedure Description</label>
                                  <Textarea
                                    placeholder="Enter procedure description..."
                                    rows={6}
                                  />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium">Compliance Rate</label>
                                    <Input value={`${procedure.compliance}%`} readOnly />
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Status</label>
                                    <Select defaultValue={procedure.status.toLowerCase().replace(' ', '-')}>
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="under-review">Under Review</SelectItem>
                                        <SelectItem value="inactive">Inactive</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button variant="outline">Close</Button>
                                <Button>Save Changes</Button>
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

        {/* Continuous Improvement Tab */}
        <TabsContent value="improvement" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-orange-600" />
                Continuous Improvement Projects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {improvementProjects.map((project, index) => (
                  <motion.div
                    key={project.project}
                    className="p-6 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-800">{project.project}</h4>
                        <p className="text-sm text-gray-600">Phase: {project.phase}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(project.status)}>
                          {project.status}
                        </Badge>
                        <Badge className={getImpactColor(project.impact)}>
                          {project.impact} Impact
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <span className="text-sm text-gray-500">Start Date:</span>
                        <p className="font-medium">{project.startDate}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Completion:</span>
                        <p className="font-medium">{project.expectedCompletion}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Budget:</span>
                        <p className="font-medium">{project.budget}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Progress:</span>
                        <p className="font-medium">{project.progress}%</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Project Progress</span>
                        <span>{project.progress}% Complete</span>
                      </div>
                      <Progress value={project.progress} className="h-3" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Accreditation Preparation Tab */}
        <TabsContent value="accreditation" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {accreditationPrep.map((prep, index) => (
              <Card key={prep.accreditor}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-purple-600" />
                    {prep.accreditor} Accreditation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Next Visit:</span>
                        <p className="font-medium">{prep.nextVisit}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Coordinator:</span>
                        <p className="font-medium">{prep.coordinator}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Overall Preparation</span>
                        <span>{prep.preparation}%</span>
                      </div>
                      <Progress value={prep.preparation} className="h-3" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Documents Ready</span>
                        <span>{prep.documentsReady}/{prep.totalDocuments}</span>
                      </div>
                      <Progress value={(prep.documentsReady / prep.totalDocuments) * 100} className="h-3" />
                    </div>
                    <Badge className={getStatusColor(prep.status)}>
                      {prep.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Best Practices Tab */}
        <TabsContent value="best-practices" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-green-600" />
                Best Practices Repository
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {bestPractices.map((practice, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>
                      <div className="flex items-center justify-between w-full mr-4">
                        <span className="font-medium">{practice.practice}</span>
                        <div className="flex items-center gap-2">
                          <Badge className={getImpactColor(practice.impact)}>
                            {practice.impact}
                          </Badge>
                          <span className="text-sm text-gray-500">{practice.effectiveness}% effective</span>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-4">
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <span className="text-sm text-gray-500">Implementation Area:</span>
                            <p className="font-medium">{practice.implementation}</p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">Effectiveness:</span>
                            <p className="font-medium">{practice.effectiveness}%</p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">Adoption Rate:</span>
                            <p className="font-medium">{practice.adoptionRate}%</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <span className="text-sm text-gray-500">Adoption Progress:</span>
                          <Progress value={practice.adoptionRate} className="h-2" />
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <BookOpen className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                          <Button variant="outline" size="sm">
                            <Users className="w-4 h-4 mr-2" />
                            Share Practice
                          </Button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
