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
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Tooltip,
  Legend
} from "recharts"
import {
  Users,
  Building,
  MessageSquare,
  Calendar,
  Mail,
  Phone,
  CheckCircle,
  Clock,
  AlertTriangle,
  Plus,
  Edit,
  Eye,
  Send,
  FileText,
  Star,
  TrendingUp,
  UserCheck,
  Globe,
  Award,
  Target,
  Handshake
} from "lucide-react"
import { motion } from "framer-motion"

export default function StakeholderCoordination() {
  // Stakeholder Groups
  const stakeholderGroups = [
    {
      group: "Faculty Leadership",
      contacts: 12,
      engagement: 95,
      lastMeeting: "2024-01-20",
      nextMeeting: "2024-02-15",
      satisfaction: 4.6,
      priority: "High"
    },
    {
      group: "Department Heads",
      contacts: 8,
      engagement: 88,
      lastMeeting: "2024-01-18",
      nextMeeting: "2024-02-10",
      satisfaction: 4.3,
      priority: "High"
    },
    {
      group: "Student Representatives",
      contacts: 15,
      engagement: 82,
      lastMeeting: "2024-01-22",
      nextMeeting: "2024-02-05",
      satisfaction: 4.1,
      priority: "Medium"
    },
    {
      group: "Industry Partners",
      contacts: 25,
      engagement: 76,
      lastMeeting: "2024-01-15",
      nextMeeting: "2024-02-20",
      satisfaction: 4.4,
      priority: "High"
    },
    {
      group: "External Auditors",
      contacts: 6,
      engagement: 92,
      lastMeeting: "2024-01-10",
      nextMeeting: "2024-03-15",
      satisfaction: 4.5,
      priority: "Medium"
    },
    {
      group: "Alumni Network",
      contacts: 35,
      engagement: 68,
      lastMeeting: "2024-01-25",
      nextMeeting: "2024-03-01",
      satisfaction: 4.2,
      priority: "Medium"
    }
  ]

  // Communication Activities
  const communicationActivities = [
    {
      activity: "Quality Policy Review Meeting",
      stakeholder: "Faculty Leadership",
      date: "2024-02-15",
      type: "Meeting",
      status: "Scheduled",
      participants: 12,
      agenda: "Annual quality policy review and updates"
    },
    {
      activity: "Student Feedback Session",
      stakeholder: "Student Representatives",
      date: "2024-02-05",
      type: "Focus Group",
      status: "Scheduled",
      participants: 15,
      agenda: "Academic quality feedback and suggestions"
    },
    {
      activity: "Industry Advisory Board",
      stakeholder: "Industry Partners",
      date: "2024-02-20",
      type: "Board Meeting",
      status: "Scheduled",
      participants: 8,
      agenda: "Curriculum relevance and industry alignment"
    },
    {
      activity: "Accreditation Preparation",
      stakeholder: "External Auditors",
      date: "2024-03-15",
      type: "Audit",
      status: "Planning",
      participants: 6,
      agenda: "Pre-audit preparation and documentation review"
    }
  ]

  // Feedback and Surveys
  const feedbackSurveys = [
    {
      survey: "Faculty Satisfaction Survey",
      target: "Faculty",
      responses: 45,
      totalInvited: 52,
      avgRating: 4.3,
      completionDate: "2024-01-30",
      status: "Completed"
    },
    {
      survey: "Student Quality Assessment",
      target: "Students",
      responses: 1250,
      totalInvited: 1400,
      avgRating: 4.1,
      completionDate: "2024-02-15",
      status: "In Progress"
    },
    {
      survey: "Industry Partnership Evaluation",
      target: "Industry Partners",
      responses: 18,
      totalInvited: 25,
      avgRating: 4.4,
      completionDate: "2024-02-28",
      status: "In Progress"
    },
    {
      survey: "Alumni Career Impact Study",
      target: "Alumni",
      responses: 156,
      totalInvited: 200,
      avgRating: 4.2,
      completionDate: "2024-03-10",
      status: "Planning"
    }
  ]

  // Collaboration Projects
  const collaborationProjects = [
    {
      project: "Curriculum Review Committee",
      partners: ["Faculty", "Industry Partners", "Students"],
      progress: 75,
      startDate: "2023-10-01",
      endDate: "2024-03-31",
      status: "On Track",
      impact: "High"
    },
    {
      project: "Quality Standards Development",
      partners: ["Faculty Leadership", "External Auditors"],
      progress: 60,
      startDate: "2023-11-15",
      endDate: "2024-05-15",
      status: "On Track",
      impact: "High"
    },
    {
      project: "Student Experience Enhancement",
      partners: ["Students", "Faculty", "Alumni"],
      progress: 45,
      startDate: "2024-01-01",
      endDate: "2024-08-31",
      status: "Planning",
      impact: "Medium"
    }
  ]

  // Engagement Metrics
  const engagementData = [
    { month: "Aug", faculty: 92, students: 78, industry: 72, alumni: 65 },
    { month: "Sep", faculty: 94, students: 80, industry: 74, alumni: 67 },
    { month: "Oct", faculty: 93, students: 82, industry: 76, alumni: 68 },
    { month: "Nov", faculty: 95, students: 84, industry: 78, alumni: 70 },
    { month: "Dec", faculty: 96, students: 85, industry: 79, alumni: 72 },
    { month: "Jan", faculty: 95, students: 87, industry: 81, alumni: 74 }
  ]

  // Satisfaction Distribution
  const satisfactionData = [
    { category: "Very Satisfied", count: 45, percentage: 52, color: "#10b981" },
    { category: "Satisfied", count: 32, percentage: 37, color: "#3b82f6" },
    { category: "Neutral", count: 7, percentage: 8, color: "#f59e0b" },
    { category: "Dissatisfied", count: 3, percentage: 3, color: "#ef4444" }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800"
      case "On Track": case "Scheduled": return "bg-blue-100 text-blue-800"
      case "In Progress": return "bg-orange-100 text-orange-800"
      case "Planning": return "bg-gray-100 text-gray-800"
      case "Delayed": return "bg-red-100 text-red-800"
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
          <h1 className="text-3xl font-bold text-gray-900">Stakeholder Coordination</h1>
          <p className="text-gray-600">Facilitate communication and collaboration with all stakeholders</p>
        </div>
        <div className="flex items-center gap-3">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Meeting
          </Button>
          <Button variant="outline">
            <Send className="w-4 h-4 mr-2" />
            Send Survey
          </Button>
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: "Active Stakeholders",
            value: "101",
            subtitle: "Across 6 groups",
            icon: Users,
            color: "text-blue-600",
            bgColor: "bg-blue-50"
          },
          {
            title: "Avg Engagement",
            value: "84%",
            subtitle: "Last quarter",
            icon: TrendingUp,
            color: "text-green-600",
            bgColor: "bg-green-50"
          },
          {
            title: "Satisfaction Score",
            value: "4.3",
            subtitle: "Out of 5.0",
            icon: Star,
            color: "text-orange-600",
            bgColor: "bg-orange-50"
          },
          {
            title: "Active Projects",
            value: "3",
            subtitle: "Collaborative initiatives",
            icon: Handshake,
            color: "text-purple-600",
            bgColor: "bg-purple-50"
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
      <Tabs defaultValue="stakeholders" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="stakeholders">Stakeholders</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Stakeholder Groups Tab */}
        <TabsContent value="stakeholders" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                Stakeholder Groups Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Group</TableHead>
                    <TableHead>Contacts</TableHead>
                    <TableHead>Engagement</TableHead>
                    <TableHead>Satisfaction</TableHead>
                    <TableHead>Last Meeting</TableHead>
                    <TableHead>Next Meeting</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stakeholderGroups.map((group, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{group.group}</TableCell>
                      <TableCell>{group.contacts}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {group.engagement}%
                          <Progress value={group.engagement} className="w-16 h-2" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          {group.satisfaction}
                        </div>
                      </TableCell>
                      <TableCell>{group.lastMeeting}</TableCell>
                      <TableCell>{group.nextMeeting}</TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(group.priority)}>
                          {group.priority}
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
                                <DialogTitle>{group.group} Details</DialogTitle>
                                <DialogDescription>
                                  Detailed information and contact management
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium">Total Contacts</label>
                                    <Input value={group.contacts} readOnly />
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Engagement Rate</label>
                                    <Input value={`${group.engagement}%`} readOnly />
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium">Last Meeting</label>
                                    <Input value={group.lastMeeting} readOnly />
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Next Meeting</label>
                                    <Input value={group.nextMeeting} />
                                  </div>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Communication Notes</label>
                                  <Textarea
                                    placeholder="Enter communication notes..."
                                    rows={4}
                                  />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button variant="outline">Close</Button>
                                <Button>Save Changes</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <Button variant="outline" size="sm">
                            <MessageSquare className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Calendar className="w-4 h-4" />
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

        {/* Communication Activities Tab */}
        <TabsContent value="communication" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-purple-600" />
                Communication Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {communicationActivities.map((activity, index) => (
                  <motion.div
                    key={index}
                    className="p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-800">{activity.activity}</h4>
                        <p className="text-sm text-gray-600">{activity.stakeholder}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{activity.type}</Badge>
                        <Badge className={getStatusColor(activity.status)}>
                          {activity.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div>
                        <span className="text-sm text-gray-500">Date:</span>
                        <p className="font-medium">{activity.date}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Participants:</span>
                        <p className="font-medium">{activity.participants}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Status:</span>
                        <p className="font-medium">{activity.status}</p>
                      </div>
                    </div>
                    <div className="mb-3">
                      <span className="text-sm text-gray-500">Agenda:</span>
                      <p className="text-sm">{activity.agenda}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Send className="w-4 h-4 mr-2" />
                        Send Invite
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Feedback & Surveys Tab */}
        <TabsContent value="feedback" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-orange-600" />
                Feedback & Surveys
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Survey</TableHead>
                    <TableHead>Target</TableHead>
                    <TableHead>Response Rate</TableHead>
                    <TableHead>Avg Rating</TableHead>
                    <TableHead>Completion</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {feedbackSurveys.map((survey, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{survey.survey}</TableCell>
                      <TableCell>{survey.target}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {Math.round((survey.responses / survey.totalInvited) * 100)}%
                          <Progress value={(survey.responses / survey.totalInvited) * 100} className="w-16 h-2" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          {survey.avgRating}
                        </div>
                      </TableCell>
                      <TableCell>{survey.completionDate}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(survey.status)}>
                          {survey.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Send className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Satisfaction Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-green-600" />
                Overall Satisfaction Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={satisfactionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ category, percentage }) => `${category}: ${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {satisfactionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Collaboration Projects Tab */}
        <TabsContent value="collaboration" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Handshake className="w-5 h-5 text-purple-600" />
                Collaborative Projects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {collaborationProjects.map((project, index) => (
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
                        <p className="text-sm text-gray-600">
                          Partners: {project.partners.join(", ")}
                        </p>
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <span className="text-sm text-gray-500">Start Date:</span>
                        <p className="font-medium">{project.startDate}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">End Date:</span>
                        <p className="font-medium">{project.endDate}</p>
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

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Stakeholder Engagement Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[60, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="faculty" stroke="#3b82f6" strokeWidth={2} name="Faculty" />
                  <Line type="monotone" dataKey="students" stroke="#10b981" strokeWidth={2} name="Students" />
                  <Line type="monotone" dataKey="industry" stroke="#f59e0b" strokeWidth={2} name="Industry" />
                  <Line type="monotone" dataKey="alumni" stroke="#8b5cf6" strokeWidth={2} name="Alumni" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
