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
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  Legend
} from "recharts"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Download,
  Upload,
  Calendar,
  FileText,
  Target,
  DollarSign,
  Users,
  Clock,
  CheckCircle,
  AlertTriangle,
  Eye,
  Filter,
  RefreshCw,
  PieChart as PieChartIcon,
  Activity,
  Zap
} from "lucide-react"
import { motion } from "framer-motion"

export default function ReportingAnalytics() {
  // Executive Summary Data
  const executiveSummary = [
    {
      metric: "Operational Efficiency",
      current: 94.2,
      target: 95.0,
      trend: "up",
      change: "+2.3%",
      status: "Good"
    },
    {
      metric: "Budget Utilization",
      current: 87.5,
      target: 90.0,
      trend: "up",
      change: "+1.8%",
      status: "On Track"
    },
    {
      metric: "Staff Productivity",
      current: 91.8,
      target: 92.0,
      trend: "stable",
      change: "+0.2%",
      status: "Good"
    },
    {
      metric: "Student Satisfaction",
      current: 4.4,
      target: 4.5,
      trend: "up",
      change: "+0.1",
      status: "Good"
    }
  ]

  // Department Performance Analytics
  const departmentAnalytics = [
    {
      department: "Academic Affairs",
      efficiency: 92.1,
      budget: 85.3,
      staffSatisfaction: 4.5,
      serviceQuality: 91.2,
      growth: "+5.2%"
    },
    {
      department: "Student Services",
      efficiency: 89.4,
      budget: 88.7,
      staffSatisfaction: 4.3,
      serviceQuality: 88.9,
      growth: "+3.8%"
    },
    {
      department: "Finance",
      efficiency: 96.2,
      budget: 82.1,
      staffSatisfaction: 4.6,
      serviceQuality: 94.5,
      growth: "+2.1%"
    },
    {
      department: "HR Management",
      efficiency: 87.8,
      budget: 91.3,
      staffSatisfaction: 4.2,
      serviceQuality: 86.7,
      growth: "+4.5%"
    },
    {
      department: "Facilities",
      efficiency: 91.5,
      budget: 89.8,
      staffSatisfaction: 4.4,
      serviceQuality: 90.3,
      growth: "+3.2%"
    },
    {
      department: "IT Services",
      efficiency: 94.7,
      budget: 76.5,
      staffSatisfaction: 4.5,
      serviceQuality: 93.8,
      growth: "+6.1%"
    }
  ]

  // Monthly Performance Trends
  const monthlyTrends = [
    { month: "Jul", efficiency: 88.5, budget: 82.1, satisfaction: 4.1, quality: 87.3 },
    { month: "Aug", efficiency: 89.2, budget: 83.5, satisfaction: 4.2, quality: 88.1 },
    { month: "Sep", efficiency: 90.8, budget: 85.2, satisfaction: 4.3, quality: 89.4 },
    { month: "Oct", efficiency: 92.1, budget: 86.8, satisfaction: 4.3, quality: 90.7 },
    { month: "Nov", efficiency: 93.4, budget: 87.5, satisfaction: 4.4, quality: 91.8 },
    { month: "Dec", efficiency: 94.2, budget: 87.5, satisfaction: 4.4, quality: 92.3 }
  ]

  // Key Performance Indicators
  const kpiData = [
    { category: "Efficiency", score: 94, target: 95, color: "#10b981" },
    { category: "Quality", score: 92, target: 95, color: "#3b82f6" },
    { category: "Satisfaction", score: 88, target: 90, color: "#f59e0b" },
    { category: "Innovation", score: 85, target: 88, color: "#8b5cf6" },
    { category: "Compliance", score: 96, target: 98, color: "#ef4444" }
  ]

  // Operational Metrics
  const operationalMetrics = [
    {
      process: "Document Processing",
      volume: 12567,
      avgTime: "2.3 days",
      accuracy: 98.5,
      automation: 75,
      satisfaction: 4.4
    },
    {
      process: "Student Registration",
      volume: 8934,
      avgTime: "1.8 days",
      accuracy: 99.2,
      automation: 85,
      satisfaction: 4.6
    },
    {
      process: "Budget Approval",
      volume: 456,
      avgTime: "5.2 days",
      accuracy: 97.8,
      automation: 45,
      satisfaction: 4.1
    },
    {
      process: "Staff Evaluation",
      volume: 156,
      avgTime: "7.5 days",
      accuracy: 96.3,
      automation: 30,
      satisfaction: 4.3
    }
  ]

  // Financial Analytics
  const financialData = [
    { quarter: "Q1", revenue: 2450000, expenses: 2120000, profit: 330000, margin: 13.5 },
    { quarter: "Q2", revenue: 2680000, expenses: 2280000, profit: 400000, margin: 14.9 },
    { quarter: "Q3", revenue: 2890000, expenses: 2410000, profit: 480000, margin: 16.6 },
    { quarter: "Q4", revenue: 3120000, expenses: 2580000, profit: 540000, margin: 17.3 }
  ]

  // Resource Utilization
  const resourceUtilization = [
    { resource: "Human Resources", allocated: 156, utilized: 148, efficiency: 94.9 },
    { resource: "IT Infrastructure", allocated: 100, utilized: 87, efficiency: 87.0 },
    { resource: "Physical Space", allocated: 75, utilized: 68, efficiency: 90.7 },
    { resource: "Equipment", allocated: 89, utilized: 82, efficiency: 92.1 },
    { resource: "Financial Budget", allocated: 100, utilized: 87.5, efficiency: 87.5 }
  ]

  // Stakeholder Feedback
  const stakeholderFeedback = [
    { stakeholder: "Students", satisfaction: 4.4, responses: 2847, trends: "up" },
    { stakeholder: "Faculty", satisfaction: 4.2, responses: 156, trends: "stable" },
    { stakeholder: "Staff", satisfaction: 4.3, responses: 156, trends: "up" },
    { stakeholder: "Parents", satisfaction: 4.1, responses: 1245, trends: "up" },
    { stakeholder: "Industry Partners", satisfaction: 4.5, responses: 89, trends: "up" }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Excellent": case "Good": return "bg-green-100 text-green-800"
      case "On Track": return "bg-blue-100 text-blue-800"
      case "At Risk": return "bg-orange-100 text-orange-800"
      case "Critical": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="w-4 h-4 text-green-500" />
      case "down": return <TrendingDown className="w-4 h-4 text-red-500" />
      default: return <div className="w-4 h-4 bg-gray-400 rounded-full" />
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reporting & Analytics</h1>
          <p className="text-gray-600">Comprehensive performance insights and strategic analytics</p>
        </div>
        <div className="flex items-center gap-3">
          <Select defaultValue="monthly">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
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
            Export Report
          </Button>
        </div>
      </div>

      {/* Executive Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            Executive Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {executiveSummary.map((item, index) => (
              <motion.div
                key={item.metric}
                className="space-y-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-gray-800">{item.metric}</h4>
                  <Badge className={getStatusColor(item.status)}>
                    {item.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-gray-900">
                    {item.metric === "Student Satisfaction" ? item.current : `${item.current}%`}
                  </span>
                  {getTrendIcon(item.trend)}
                  <span className="text-sm text-green-600">{item.change}</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Target: {item.metric === "Student Satisfaction" ? item.target : `${item.target}%`}</span>
                    <span>{((item.current / item.target) * 100).toFixed(1)}%</span>
                  </div>
                  <Progress value={(item.current / item.target) * 100} className="h-2" />
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Analytics Tabs */}
      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="operational">Operational</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="stakeholders">Stakeholders</TabsTrigger>
        </TabsList>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  Performance Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={monthlyTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="efficiency" stroke="#3b82f6" strokeWidth={2} name="Efficiency %" />
                    <Line type="monotone" dataKey="budget" stroke="#10b981" strokeWidth={2} name="Budget %" />
                    <Line type="monotone" dataKey="satisfaction" stroke="#f59e0b" strokeWidth={2} name="Satisfaction" />
                    <Line type="monotone" dataKey="quality" stroke="#8b5cf6" strokeWidth={2} name="Quality %" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* KPI Radar Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-green-600" />
                  Key Performance Indicators
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <RadarChart data={kpiData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="category" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar
                      name="Current"
                      dataKey="score"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                    <Radar
                      name="Target"
                      dataKey="target"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.1}
                      strokeWidth={2}
                      strokeDasharray="5 5"
                    />
                    <Tooltip />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Department Analytics Table */}
          <Card>
            <CardHeader>
              <CardTitle>Department Performance Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Department</TableHead>
                    <TableHead>Efficiency</TableHead>
                    <TableHead>Budget Utilization</TableHead>
                    <TableHead>Staff Satisfaction</TableHead>
                    <TableHead>Service Quality</TableHead>
                    <TableHead>Growth</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {departmentAnalytics.map((dept) => (
                    <TableRow key={dept.department}>
                      <TableCell className="font-medium">{dept.department}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {dept.efficiency}%
                          <Progress value={dept.efficiency} className="w-16 h-2" />
                        </div>
                      </TableCell>
                      <TableCell>{dept.budget}%</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span>{dept.staffSatisfaction}</span>
                          <span className="text-yellow-400">★</span>
                        </div>
                      </TableCell>
                      <TableCell>{dept.serviceQuality}%</TableCell>
                      <TableCell>
                        <span className="text-green-600 font-medium">{dept.growth}</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Financial Tab */}
        <TabsContent value="financial" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Financial Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  Financial Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={financialData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="quarter" />
                    <YAxis tickFormatter={(value) => formatCurrency(value)} />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Area type="monotone" dataKey="revenue" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} name="Revenue" />
                    <Area type="monotone" dataKey="expenses" stackId="2" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} name="Expenses" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Profit Margin Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  Profit Margin Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={financialData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="quarter" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="margin" stroke="#8b5cf6" strokeWidth={3} name="Margin %" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Financial Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Quarterly Financial Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Quarter</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Expenses</TableHead>
                    <TableHead>Profit</TableHead>
                    <TableHead>Margin</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {financialData.map((quarter) => (
                    <TableRow key={quarter.quarter}>
                      <TableCell className="font-medium">{quarter.quarter}</TableCell>
                      <TableCell>{formatCurrency(quarter.revenue)}</TableCell>
                      <TableCell>{formatCurrency(quarter.expenses)}</TableCell>
                      <TableCell className="text-green-600 font-medium">
                        {formatCurrency(quarter.profit)}
                      </TableCell>
                      <TableCell>{quarter.margin}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Operational Tab */}
        <TabsContent value="operational" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-orange-600" />
                Operational Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {operationalMetrics.map((metric, index) => (
                  <motion.div
                    key={metric.process}
                    className="p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-800">{metric.process}</h4>
                        <p className="text-sm text-gray-600">{metric.volume} processed this period</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-medium">{metric.satisfaction}</span>
                        <span className="text-yellow-400">★</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 mb-4">
                      <div>
                        <span className="text-sm text-gray-500">Avg Time:</span>
                        <p className="font-medium">{metric.avgTime}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Accuracy:</span>
                        <p className="font-medium">{metric.accuracy}%</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Automation:</span>
                        <p className="font-medium">{metric.automation}%</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Satisfaction:</span>
                        <p className="font-medium">{metric.satisfaction}/5.0</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Automation Level</span>
                        <span>{metric.automation}%</span>
                      </div>
                      <Progress value={metric.automation} className="h-2" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                Resource Utilization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {resourceUtilization.map((resource, index) => (
                  <motion.div
                    key={resource.resource}
                    className="space-y-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-gray-800">{resource.resource}</h4>
                      <span className="text-lg font-bold text-gray-900">{resource.efficiency}%</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Allocated:</span>
                        <p className="font-medium">{resource.allocated}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Utilized:</span>
                        <p className="font-medium">{resource.utilized}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Efficiency:</span>
                        <p className="font-medium">{resource.efficiency}%</p>
                      </div>
                    </div>
                    <Progress value={resource.efficiency} className="h-3" />
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Stakeholders Tab */}
        <TabsContent value="stakeholders" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Stakeholder Satisfaction
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {stakeholderFeedback.map((stakeholder, index) => (
                  <motion.div
                    key={stakeholder.stakeholder}
                    className="p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-800">{stakeholder.stakeholder}</h4>
                        <p className="text-sm text-gray-600">{stakeholder.responses} responses</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getTrendIcon(stakeholder.trends)}
                        <div className="flex items-center gap-1">
                          <span className="font-medium">{stakeholder.satisfaction}</span>
                          <span className="text-yellow-400">★</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Satisfaction Score</span>
                        <span>{stakeholder.satisfaction}/5.0</span>
                      </div>
                      <Progress value={(stakeholder.satisfaction / 5) * 100} className="h-3" />
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
