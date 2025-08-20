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
  AreaChart,
  Area,
  Tooltip,
  Legend
} from "recharts"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  CreditCard,
  Wallet,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  Plus,
  Edit,
  Eye,
  Download,
  Upload,
  Calculator,
  Target,
  BarChart3,
  PieChart as PieChartIcon
} from "lucide-react"
import { motion } from "framer-motion"

export default function BudgetAdministration() {
  // Budget Overview Data
  const budgetOverview = [
    {
      department: "Academic Affairs",
      allocated: 850000,
      spent: 720000,
      remaining: 130000,
      utilization: 84.7,
      variance: -15000,
      status: "On Track"
    },
    {
      department: "Student Services",
      allocated: 650000,
      spent: 590000,
      remaining: 60000,
      utilization: 90.8,
      variance: +10000,
      status: "Good"
    },
    {
      department: "Finance",
      allocated: 450000,
      spent: 398000,
      remaining: 52000,
      utilization: 88.4,
      variance: -5000,
      status: "Good"
    },
    {
      department: "HR Management",
      allocated: 550000,
      spent: 520000,
      remaining: 30000,
      utilization: 94.5,
      variance: +15000,
      status: "At Risk"
    },
    {
      department: "Facilities",
      allocated: 1200000,
      spent: 980000,
      remaining: 220000,
      utilization: 81.7,
      variance: -45000,
      status: "Good"
    },
    {
      department: "IT Services",
      allocated: 750000,
      spent: 680000,
      remaining: 70000,
      utilization: 90.7,
      variance: +25000,
      status: "Good"
    }
  ]

  // Monthly Budget Trends
  const budgetTrends = [
    { month: "Jul", allocated: 4450000, spent: 3888000, forecast: 4200000 },
    { month: "Aug", allocated: 4450000, spent: 4020000, forecast: 4300000 },
    { month: "Sep", allocated: 4450000, spent: 4156000, forecast: 4400000 },
    { month: "Oct", allocated: 4450000, spent: 4287000, forecast: 4450000 },
    { month: "Nov", allocated: 4450000, spent: 4410000, forecast: 4500000 },
    { month: "Dec", allocated: 4450000, spent: 4388000, forecast: 4480000 }
  ]

  // Procurement Requests
  const procurementRequests = [
    {
      id: 1,
      item: "Computer Lab Equipment",
      department: "IT Services",
      amount: 125000,
      requestDate: "2024-01-20",
      status: "Pending Approval",
      priority: "High",
      vendor: "TechSupply Corp",
      category: "Equipment"
    },
    {
      id: 2,
      item: "Office Furniture Set",
      department: "Academic Affairs",
      amount: 45000,
      requestDate: "2024-01-18",
      status: "Approved",
      priority: "Medium",
      vendor: "FurniPro Ltd",
      category: "Furniture"
    },
    {
      id: 3,
      item: "HVAC System Maintenance",
      department: "Facilities",
      amount: 78000,
      requestDate: "2024-01-15",
      status: "In Review",
      priority: "High",
      vendor: "CoolAir Solutions",
      category: "Maintenance"
    },
    {
      id: 4,
      item: "Training Workshop Materials",
      department: "HR Management",
      amount: 12500,
      requestDate: "2024-01-22",
      status: "Approved",
      priority: "Low",
      vendor: "EduMaterials Inc",
      category: "Training"
    }
  ]

  // Expense Categories
  const expenseCategories = [
    { category: "Personnel", amount: 1856000, percentage: 42.3, color: "#3b82f6" },
    { category: "Operations", amount: 1023000, percentage: 23.3, color: "#10b981" },
    { category: "Equipment", amount: 687000, percentage: 15.6, color: "#f59e0b" },
    { category: "Maintenance", amount: 456000, percentage: 10.4, color: "#8b5cf6" },
    { category: "Training", amount: 234000, percentage: 5.3, color: "#ef4444" },
    { category: "Other", amount: 132000, percentage: 3.1, color: "#6b7280" }
  ]

  // Vendor Management
  const vendors = [
    {
      name: "TechSupply Corp",
      category: "IT Equipment",
      totalContracts: 15,
      totalValue: 2450000,
      performance: 4.5,
      paymentTerms: "Net 30",
      status: "Active"
    },
    {
      name: "FurniPro Ltd",
      category: "Furniture",
      totalContracts: 8,
      totalValue: 850000,
      performance: 4.2,
      paymentTerms: "Net 45",
      status: "Active"
    },
    {
      name: "CoolAir Solutions",
      category: "HVAC Services",
      totalContracts: 12,
      totalValue: 1200000,
      performance: 4.7,
      paymentTerms: "Net 30",
      status: "Active"
    },
    {
      name: "EduMaterials Inc",
      category: "Educational Supplies",
      totalContracts: 6,
      totalValue: 350000,
      performance: 4.1,
      paymentTerms: "Net 15",
      status: "Active"
    }
  ]

  // Budget Variance Analysis
  const varianceData = [
    { department: "Academic Affairs", budget: 850000, actual: 720000, variance: -130000 },
    { department: "Student Services", budget: 650000, actual: 590000, variance: -60000 },
    { department: "Finance", budget: 450000, actual: 398000, variance: -52000 },
    { department: "HR Management", budget: 550000, actual: 520000, variance: -30000 },
    { department: "Facilities", budget: 1200000, actual: 980000, variance: -220000 },
    { department: "IT Services", budget: 750000, actual: 680000, variance: -70000 }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "On Track": case "Good": case "Approved": case "Active": return "bg-green-100 text-green-800"
      case "At Risk": case "In Review": case "Pending Approval": return "bg-orange-100 text-orange-800"
      case "Over Budget": case "Rejected": case "Inactive": return "bg-red-100 text-red-800"
      case "Under Review": return "bg-blue-100 text-blue-800"
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const calculateTotalBudget = () => {
    return budgetOverview.reduce((sum, dept) => sum + dept.allocated, 0)
  }

  const calculateTotalSpent = () => {
    return budgetOverview.reduce((sum, dept) => sum + dept.spent, 0)
  }

  const calculateTotalRemaining = () => {
    return budgetOverview.reduce((sum, dept) => sum + dept.remaining, 0)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Budget & Resource Administration</h1>
          <p className="text-gray-600">Financial planning, procurement management, and resource allocation</p>
        </div>
        <div className="flex items-center gap-3">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Request
          </Button>
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import Budget
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: "Total Budget",
            value: formatCurrency(calculateTotalBudget()),
            subtitle: "Annual allocation",
            icon: Wallet,
            color: "text-blue-600",
            trend: "+5.2%"
          },
          {
            title: "Total Spent",
            value: formatCurrency(calculateTotalSpent()),
            subtitle: "Year to date",
            icon: CreditCard,
            color: "text-green-600",
            trend: "+12.1%"
          },
          {
            title: "Remaining",
            value: formatCurrency(calculateTotalRemaining()),
            subtitle: "Available budget",
            icon: DollarSign,
            color: "text-orange-600",
            trend: "-2.8%"
          },
          {
            title: "Utilization",
            value: `${((calculateTotalSpent() / calculateTotalBudget()) * 100).toFixed(1)}%`,
            subtitle: "Budget usage",
            icon: Target,
            color: "text-purple-600",
            trend: "+3.4%"
          }
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
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-600">{metric.trend}</span>
                    </div>
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
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="procurement">Procurement</TabsTrigger>
          <TabsTrigger value="vendors">Vendors</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Budget Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  Budget Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={budgetTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Area type="monotone" dataKey="allocated" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} name="Allocated" />
                    <Area type="monotone" dataKey="spent" stackId="2" stroke="#10b981" fill="#10b981" fillOpacity={0.6} name="Spent" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Expense Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChartIcon className="w-5 h-5 text-purple-600" />
                  Expense Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={expenseCategories}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ category, percentage }) => `${category}: ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="amount"
                    >
                      {expenseCategories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Departments Tab */}
        <TabsContent value="departments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Department Budget Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Department</TableHead>
                    <TableHead>Allocated</TableHead>
                    <TableHead>Spent</TableHead>
                    <TableHead>Remaining</TableHead>
                    <TableHead>Utilization</TableHead>
                    <TableHead>Variance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {budgetOverview.map((dept, index) => (
                    <TableRow key={dept.department}>
                      <TableCell className="font-medium">{dept.department}</TableCell>
                      <TableCell>{formatCurrency(dept.allocated)}</TableCell>
                      <TableCell>{formatCurrency(dept.spent)}</TableCell>
                      <TableCell>{formatCurrency(dept.remaining)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {dept.utilization.toFixed(1)}%
                          <Progress value={dept.utilization} className="w-16 h-2" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={dept.variance >= 0 ? "text-green-600" : "text-red-600"}>
                          {formatCurrency(dept.variance)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(dept.status)}>
                          {dept.status}
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

          {/* Budget Variance Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-green-600" />
                Budget vs Actual Spending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={varianceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="department"
                    angle={-45}
                    textAnchor="end"
                    height={100}
                  />
                  <YAxis tickFormatter={(value) => formatCurrency(value)} />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Legend />
                  <Bar dataKey="budget" fill="#3b82f6" name="Budget" />
                  <Bar dataKey="actual" fill="#10b981" name="Actual" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Procurement Tab */}
        <TabsContent value="procurement" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-orange-600" />
                Procurement Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Request Date</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {procurementRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{request.item}</div>
                          <div className="text-sm text-gray-600">{request.category}</div>
                        </div>
                      </TableCell>
                      <TableCell>{request.department}</TableCell>
                      <TableCell className="font-medium">{formatCurrency(request.amount)}</TableCell>
                      <TableCell>{request.requestDate}</TableCell>
                      <TableCell>{request.vendor}</TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(request.priority)}>
                          {request.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(request.status)}>
                          {request.status}
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
                                <DialogTitle>Procurement Request Details</DialogTitle>
                                <DialogDescription>
                                  Review and manage procurement request
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-4">
                                  <h4 className="font-semibold">Request Information</h4>
                                  <div className="space-y-3">
                                    <div className="flex justify-between">
                                      <span>Item:</span>
                                      <span className="font-medium">{request.item}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Amount:</span>
                                      <span className="font-medium">{formatCurrency(request.amount)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Department:</span>
                                      <span className="font-medium">{request.department}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Category:</span>
                                      <span className="font-medium">{request.category}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="space-y-4">
                                  <h4 className="font-semibold">Vendor & Status</h4>
                                  <div className="space-y-3">
                                    <div className="flex justify-between">
                                      <span>Vendor:</span>
                                      <span className="font-medium">{request.vendor}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Priority:</span>
                                      <Badge className={getPriorityColor(request.priority)}>
                                        {request.priority}
                                      </Badge>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Status:</span>
                                      <Badge className={getStatusColor(request.status)}>
                                        {request.status}
                                      </Badge>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Request Date:</span>
                                      <span className="font-medium">{request.requestDate}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-3">
                                <label className="text-sm font-medium">Approval Notes</label>
                                <Textarea
                                  placeholder="Add approval notes or comments..."
                                  rows={3}
                                />
                              </div>
                              <DialogFooter>
                                <Button variant="outline">Reject</Button>
                                <Button>Approve</Button>
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

        {/* Vendors Tab */}
        <TabsContent value="vendors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Vendor Management</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Contracts</TableHead>
                    <TableHead>Total Value</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Payment Terms</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vendors.map((vendor, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{vendor.name}</TableCell>
                      <TableCell>{vendor.category}</TableCell>
                      <TableCell>{vendor.totalContracts}</TableCell>
                      <TableCell>{formatCurrency(vendor.totalValue)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span className="font-medium">{vendor.performance}</span>
                          <span className="text-yellow-400">★</span>
                        </div>
                      </TableCell>
                      <TableCell>{vendor.paymentTerms}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(vendor.status)}>
                          {vendor.status}
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
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Cost Savings", value: formatCurrency(245000), subtitle: "Year to date", color: "text-green-600" },
              { title: "Pending Approvals", value: "12", subtitle: "Procurement requests", color: "text-orange-600" },
              { title: "Vendor Performance", value: "4.4/5", subtitle: "Average rating", color: "text-blue-600" }
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
