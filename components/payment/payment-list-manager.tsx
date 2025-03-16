"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Plus,
  Filter,
  Download,
  Upload,
  MoreHorizontal,
  Edit,
  Trash,
  Eye,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Calendar,
  CreditCard,
  Bookmark,
  FileText,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  DollarSign,
  Loader2,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Skeleton } from "@/components/ui/skeleton"

// Add these imports at the top of the file, after the existing imports
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useRef } from "react"

// Add this function before the PaymentListManager component
const tableRowVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.05,
      duration: 0.3,
      ease: "easeOut",
    },
  }),
  exit: {
    opacity: 0,
    x: -10,
    transition: {
      duration: 0.2,
    },
  },
  updated: {
    backgroundColor: ["rgba(59, 130, 246, 0.1)", "rgba(59, 130, 246, 0)", "rgba(59, 130, 246, 0)"],
    transition: { duration: 1.5, times: [0, 0.5, 1] },
  },
}

// Add this function before the PaymentListManager component
const cardVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.1,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
}

// Add this function before the PaymentListManager component
const tabVariants = {
  hidden: { opacity: 0 },
  visible: (custom: number) => ({
    opacity: 1,
    transition: {
      delay: custom * 0.05,
      duration: 0.3,
    },
  }),
}

const mockPayments = [
  {
    id: "PAY001",
    studentId: "2023001",
    studentName: "Ahmad Fauzi",
    program: "Informatics",
    semester: "2023/2024-2",
    amount: 5000000,
    status: "paid",
    dueDate: "2023-02-15",
    paymentDate: "2023-02-10",
  },
  {
    id: "PAY002",
    studentId: "2023002",
    studentName: "Siti Nurhaliza",
    program: "Architecture",
    semester: "2023/2024-2",
    amount: 5500000,
    status: "partial",
    dueDate: "2023-02-15",
    paymentDate: "2023-02-12",
  },
  {
    id: "PAY003",
    studentId: "2023003",
    studentName: "Budi Santoso",
    program: "Electrical",
    semester: "2023/2024-2",
    amount: 4800000,
    status: "unpaid",
    dueDate: "2023-02-15",
    paymentDate: null,
  },
  {
    id: "PAY004",
    studentId: "2023004",
    studentName: "Dewi Kartika",
    program: "Urban Planning",
    semester: "2023/2024-2",
    amount: 5200000,
    status: "scholarship",
    dueDate: "2023-02-15",
    paymentDate: "2023-01-20",
  },
  {
    id: "PAY005",
    studentId: "2023005",
    studentName: "Rudi Hartono",
    program: "Watering",
    semester: "2023/2024-2",
    amount: 4500000,
    status: "overdue",
    dueDate: "2023-02-15",
    paymentDate: null,
  },
  {
    id: "PAY006",
    studentId: "2023006",
    studentName: "Rina Marlina",
    program: "Informatics",
    semester: "2023/2024-2",
    amount: 5000000,
    status: "paid",
    dueDate: "2023-02-15",
    paymentDate: "2023-02-05",
  },
  {
    id: "PAY007",
    studentId: "2023007",
    studentName: "Doni Kusuma",
    program: "Architecture",
    semester: "2023/2024-2",
    amount: 5500000,
    status: "partial",
    dueDate: "2023-02-15",
    paymentDate: "2023-02-14",
  },
  {
    id: "PAY008",
    studentId: "2023008",
    studentName: "Lia Permata",
    program: "Electrical",
    semester: "2023/2024-2",
    amount: 4800000,
    status: "unpaid",
    dueDate: "2023-02-15",
    paymentDate: null,
  },
  {
    id: "PAY009",
    studentId: "2023009",
    studentName: "Hadi Pranoto",
    program: "Urban Planning",
    semester: "2023/2024-2",
    amount: 5200000,
    status: "paid",
    dueDate: "2023-02-15",
    paymentDate: "2023-02-08",
  },
  {
    id: "PAY010",
    studentId: "2023010",
    studentName: "Maya Sari",
    program: "Watering",
    semester: "2023/2024-2",
    amount: 4500000,
    status: "overdue",
    dueDate: "2023-02-15",
    paymentDate: null,
  },
]

// Helper function to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount)
}

// Helper function to format date
const formatDate = (dateString: string | null) => {
  if (!dateString) return "-"
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}

// Helper function to get initials from name
const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
}

// Program colors for visual distinction
const programColors: Record<string, string> = {
  Informatics: "bg-emerald-50 text-emerald-700 border-emerald-100",
  Architecture: "bg-purple-50 text-purple-700 border-purple-100",
  Electrical: "bg-amber-50 text-amber-700 border-amber-100",
  "Urban Planning": "bg-blue-50 text-blue-700 border-blue-100",
  Watering: "bg-orange-50 text-orange-700 border-orange-100",
}

// Status colors and icons
const statusConfig: Record<string, { color: string; icon: React.ReactNode }> = {
  paid: {
    color: "bg-emerald-50 text-emerald-700 border-emerald-100",
    icon: <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />,
  },
  partial: {
    color: "bg-blue-50 text-blue-700 border-blue-100",
    icon: <Loader2 className="w-3.5 h-3.5 mr-1.5" />,
  },
  unpaid: {
    color: "bg-slate-50 text-slate-700 border-slate-100",
    icon: <Clock className="w-3.5 h-3.5 mr-1.5" />,
  },
  scholarship: {
    color: "bg-purple-50 text-purple-700 border-purple-100",
    icon: <Bookmark className="w-3.5 h-3.5 mr-1.5" />,
  },
  overdue: {
    color: "bg-rose-50 text-rose-700 border-rose-100",
    icon: <AlertCircle className="w-3.5 h-3.5 mr-1.5" />,
  },
}

export function PaymentListManager() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProgram, setSelectedProgram] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedSemester, setSelectedSemester] = useState("2023/2024-2")
  const [selectedPayments, setSelectedPayments] = useState<string[]>([])
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentPayment, setCurrentPayment] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("all")
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [isLoading, setIsLoading] = useState(true)

  // Inside the PaymentListManager component, add these new state variables after the existing state variables
  const [updatedPaymentId, setUpdatedPaymentId] = useState<string | null>(null)
  const prevPaymentsRef = useRef<typeof mockPayments>([])

  // Add this useEffect inside the PaymentListManager component, after the state variables
  useEffect(() => {
    // This would be used in a real app to detect changes to payments
    // For demo purposes, we'll simulate updates when editing a payment
    prevPaymentsRef.current = mockPayments

    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Filter payments based on search and filters
  const filteredPayments = mockPayments.filter((payment) => {
    const matchesSearch =
      payment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesProgram = selectedProgram === "all" || payment.program === selectedProgram
    const matchesStatus = selectedStatus === "all" || payment.status === selectedStatus
    const matchesSemester = payment.semester === selectedSemester
    const matchesTab = activeTab === "all" || payment.status === activeTab

    return matchesSearch && matchesProgram && matchesStatus && matchesSemester && matchesTab
  })

  // Sort payments
  const sortedPayments = [...filteredPayments].sort((a, b) => {
    if (!sortField) return 0

    const aValue = a[sortField as keyof typeof a]
    const bValue = b[sortField as keyof typeof b]

    if (aValue === bValue) return 0

    const direction = sortDirection === "asc" ? 1 : -1

    if (typeof aValue === "string" && typeof bValue === "string") {
      return aValue.localeCompare(bValue) * direction
    }

    if (aValue === null || bValue === null) return 0
    if (aValue < bValue) return -1 * direction
    return 1 * direction
  })

  // Handle sort
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Handle select all checkbox
  const handleSelectAll = () => {
    if (selectedPayments.length === filteredPayments.length) {
      setSelectedPayments([])
    } else {
      setSelectedPayments(filteredPayments.map((payment) => payment.id))
    }
  }

  // Handle individual checkbox selection
  const handleSelectPayment = (paymentId: string) => {
    if (selectedPayments.includes(paymentId)) {
      setSelectedPayments(selectedPayments.filter((id) => id !== paymentId))
    } else {
      setSelectedPayments([...selectedPayments, paymentId])
    }
  }

  // Update the handleEditPayment function to simulate an update animation
  const handleEditPayment = (payment: any) => {
    setCurrentPayment(payment)
    setIsEditDialogOpen(true)
  }

  // Add this function inside the PaymentListManager component, after handleEditPayment
  const simulatePaymentUpdate = () => {
    if (currentPayment) {
      setUpdatedPaymentId(currentPayment.id)
      setIsEditDialogOpen(false)

      // Reset the highlight after animation completes
      setTimeout(() => {
        setUpdatedPaymentId(null)
      }, 1500)
    }
  }

  // Get counts by status
  const statusCounts = mockPayments.reduce(
    (acc, payment) => {
      acc[payment.status] = (acc[payment.status] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  // Calculate total amount
  const totalAmount = mockPayments.reduce((sum, payment) => sum + payment.amount, 0)
  const paidAmount = mockPayments
    .filter((p) => p.status === "paid" || p.status === "partial" || p.status === "scholarship")
    .reduce((sum, payment) => sum + payment.amount, 0)
  const pendingAmount = totalAmount - paidAmount

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div variants={cardVariants} initial="hidden" animate="visible" custom={0}>
          <Card className="overflow-hidden border-none shadow-sm bg-gradient-to-br from-blue-50 to-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-blue-800">Total Payments</CardTitle>
              <div className="p-2 text-blue-600 bg-blue-100 rounded-full">
                <CreditCard className="w-4 h-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">{formatCurrency(totalAmount)}</div>
              <div className="flex items-center mt-1 text-xs">
                <div className="text-muted-foreground">Across {mockPayments.length} students</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={cardVariants} initial="hidden" animate="visible" custom={1}>
          <Card className="overflow-hidden border-none shadow-sm bg-gradient-to-br from-emerald-50 to-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-emerald-800">Paid Amount</CardTitle>
              <div className="p-2 rounded-full bg-emerald-100 text-emerald-600">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-900">{formatCurrency(paidAmount)}</div>
              <div className="flex items-center mt-1 text-xs">
                <div className="text-muted-foreground">{Math.round((paidAmount / totalAmount) * 100)}% of total</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={cardVariants} initial="hidden" animate="visible" custom={2}>
          <Card className="overflow-hidden border-none shadow-sm bg-gradient-to-br from-amber-50 to-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-amber-800">Pending Amount</CardTitle>
              <div className="p-2 rounded-full bg-amber-100 text-amber-600">
                <Clock className="w-4 h-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-900">{formatCurrency(pendingAmount)}</div>
              <div className="flex items-center mt-1 text-xs">
                <div className="text-muted-foreground">{Math.round((pendingAmount / totalAmount) * 100)}% of total</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={cardVariants} initial="hidden" animate="visible" custom={3}>
          <Card className="overflow-hidden border-none shadow-sm bg-gradient-to-br from-rose-50 to-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-rose-800">Overdue Payments</CardTitle>
              <div className="p-2 rounded-full bg-rose-100 text-rose-600">
                <AlertCircle className="w-4 h-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-rose-900">{statusCounts.overdue || 0}</div>
              <div className="flex items-center mt-1 text-xs">
                <div className="text-muted-foreground">Requires immediate attention</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle>Payment List</CardTitle>
                <CardDescription>Manage student payments across all study programs</CardDescription>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Payment
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="bg-white border-slate-200">
                      <Filter className="w-4 h-4 mr-2" />
                      Actions
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Batch Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem disabled={selectedPayments.length === 0}>
                      <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-500" />
                      Mark as Paid
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled={selectedPayments.length === 0}>
                      <XCircle className="w-4 h-4 mr-2 text-slate-500" />
                      Mark as Unpaid
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled={selectedPayments.length === 0}>
                      <AlertCircle className="w-4 h-4 mr-2 text-rose-500" />
                      Mark as Overdue
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Download className="w-4 h-4 mr-2" />
                      Export Data
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Upload className="w-4 h-4 mr-2" />
                      Import Data
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search by student name, ID, or payment ID..."
                    className="bg-white pl-9 border-slate-200"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <Select value={selectedProgram} onValueChange={setSelectedProgram}>
                    <SelectTrigger className="bg-white border-slate-200">
                      <SelectValue placeholder="Program" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Programs</SelectItem>
                      <SelectItem value="Informatics">Informatics</SelectItem>
                      <SelectItem value="Architecture">Architecture</SelectItem>
                      <SelectItem value="Electrical">Electrical</SelectItem>
                      <SelectItem value="Urban Planning">Urban Planning</SelectItem>
                      <SelectItem value="Watering">Watering</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="bg-white border-slate-200">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="partial">Partial</SelectItem>
                      <SelectItem value="unpaid">Unpaid</SelectItem>
                      <SelectItem value="scholarship">Scholarship</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                    <SelectTrigger className="bg-white border-slate-200">
                      <SelectValue placeholder="Semester" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2023/2024-2">2023/2024 - Semester 2</SelectItem>
                      <SelectItem value="2023/2024-1">2023/2024 - Semester 1</SelectItem>
                      <SelectItem value="2022/2023-2">2022/2023 - Semester 2</SelectItem>
                      <SelectItem value="2022/2023-1">2022/2023 - Semester 1</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="bg-slate-100 p-0.5 mb-4">
                  {["all", "paid", "partial", "unpaid", "scholarship", "overdue"].map((tab, index) => (
                    <motion.div key={tab} variants={tabVariants} initial="hidden" animate="visible" custom={index}>
                      <TabsTrigger
                        value={tab}
                        className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        <Badge
                          variant="outline"
                          className={`ml-2 ${tab === "all" ? "bg-white" : statusConfig[tab]?.color || "bg-white"}`}
                        >
                          {tab === "all" ? mockPayments.length : statusCounts[tab] || 0}
                        </Badge>
                      </TabsTrigger>
                    </motion.div>
                  ))}
                </TabsList>

                <TabsContent value={activeTab} className="mt-0">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${activeTab}-content`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {isLoading ? (
                        <>
                          <div className="mb-6 space-y-4">
                            <div className="flex flex-col gap-3 sm:flex-row">
                              <Skeleton className="flex-1 h-10" />
                              <Skeleton className="w-32 h-10" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Skeleton className="w-full h-12" />
                            {Array(5)
                              .fill(0)
                              .map((_, i) => (
                                <Skeleton key={i} className="w-full h-16" />
                              ))}
                          </div>
                        </>
                      ) : (
                        <div className="overflow-hidden bg-white border rounded-lg border-slate-200">
                          <Table>
                            <TableHeader className="bg-slate-50">
                              <TableRow className="hover:bg-slate-100/50">
                                <TableHead className="w-[50px]">
                                  <Checkbox
                                    checked={selectedPayments.length === filteredPayments.length && filteredPayments.length > 0}
                                    onCheckedChange={handleSelectAll}
                                    aria-label="Select all"
                                  />
                                </TableHead>
                                <TableHead className="w-[100px]">
                                  <Button
                                    variant="ghost"
                                    onClick={() => handleSort("id")}
                                    className="flex items-center p-0 font-medium"
                                  >
                                    Payment ID
                                    <ArrowUpDown className="w-4 h-4 ml-2 text-slate-400" />
                                  </Button>
                                </TableHead>
                                <TableHead>
                                  <Button
                                    variant="ghost"
                                    onClick={() => handleSort("studentName")}
                                    className="flex items-center p-0 font-medium"
                                  >
                                    Student
                                    <ArrowUpDown className="w-4 h-4 ml-2 text-slate-400" />
                                  </Button>
                                </TableHead>
                                <TableHead>
                                  <Button
                                    variant="ghost"
                                    onClick={() => handleSort("program")}
                                    className="flex items-center p-0 font-medium"
                                  >
                                    Program
                                    <ArrowUpDown className="w-4 h-4 ml-2 text-slate-400" />
                                  </Button>
                                </TableHead>
                                <TableHead>
                                  <Button
                                    variant="ghost"
                                    onClick={() => handleSort("amount")}
                                    className="flex items-center p-0 font-medium"
                                  >
                                    Amount
                                    <ArrowUpDown className="w-4 h-4 ml-2 text-slate-400" />
                                  </Button>
                                </TableHead>
                                <TableHead>
                                  <Button
                                    variant="ghost"
                                    onClick={() => handleSort("status")}
                                    className="flex items-center p-0 font-medium"
                                  >
                                    Status
                                    <ArrowUpDown className="w-4 h-4 ml-2 text-slate-400" />
                                  </Button>
                                </TableHead>
                                <TableHead>
                                  <Button
                                    variant="ghost"
                                    onClick={() => handleSort("dueDate")}
                                    className="flex items-center p-0 font-medium"
                                  >
                                    Due Date
                                    <ArrowUpDown className="w-4 h-4 ml-2 text-slate-400" />
                                  </Button>
                                </TableHead>
                                <TableHead>
                                  <Button
                                    variant="ghost"
                                    onClick={() => handleSort("paymentDate")}
                                    className="flex items-center p-0 font-medium"
                                  >
                                    Payment Date
                                    <ArrowUpDown className="w-4 h-4 ml-2 text-slate-400" />
                                  </Button>
                                </TableHead>
                                <TableHead className="w-[80px] text-right">Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {sortedPayments.length === 0 ? (
                                <TableRow>
                                  <TableCell colSpan={9} className="h-24 text-center">
                                    <div className="flex flex-col items-center justify-center text-slate-500">
                                      <FileText className="w-8 h-8 mb-2 text-slate-400" />
                                      <p>No payments found matching your filters.</p>
                                      <Button
                                        variant="link"
                                        onClick={() => {
                                          setSearchTerm("")
                                          setSelectedProgram("all")
                                          setSelectedStatus("all")
                                          setActiveTab("all")
                                        }}
                                      >
                                        Clear all filters
                                      </Button>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ) : (
                                <AnimatePresence>
                                  {sortedPayments.map((payment, index) => (
                                    <motion.tr
                                      key={payment.id}
                                      className={`group hover:bg-slate-50 ${updatedPaymentId === payment.id ? "bg-blue-50" : ""}`}
                                      variants={tableRowVariants}
                                      initial="hidden"
                                      animate={updatedPaymentId === payment.id ? "updated" : "visible"}
                                      exit="exit"
                                      custom={index}
                                      layoutId={payment.id}
                                    >
                                      <TableCell>
                                        <Checkbox
                                          checked={selectedPayments.includes(payment.id)}
                                          onCheckedChange={() => handleSelectPayment(payment.id)}
                                          aria-label={`Select payment ${payment.id}`}
                                        />
                                      </TableCell>
                                      <TableCell className="font-medium text-slate-900">{payment.id}</TableCell>
                                      <TableCell>
                                        <div className="flex items-center gap-2">
                                          <Avatar className="w-8 h-8 border border-slate-200">
                                            <AvatarFallback className="bg-slate-100 text-slate-700">
                                              {getInitials(payment.studentName)}
                                            </AvatarFallback>
                                          </Avatar>
                                          <div>
                                            <div className="font-medium text-slate-900">{payment.studentName}</div>
                                            <div className="text-xs text-slate-500">{payment.studentId}</div>
                                          </div>
                                        </div>
                                      </TableCell>
                                      <TableCell>
                                        <Badge variant="outline" className={`${programColors[payment.program]} font-normal`}>
                                          {payment.program}
                                        </Badge>
                                      </TableCell>
                                      <TableCell className="font-medium text-slate-900">
                                        {formatCurrency(payment.amount)}
                                      </TableCell>
                                      <TableCell>
                                        <Badge
                                          variant="outline"
                                          className={`${statusConfig[payment.status].color} font-normal flex items-center`}
                                        >
                                          {statusConfig[payment.status].icon}
                                          {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                                        </Badge>
                                      </TableCell>
                                      <TableCell>
                                        <div className="flex items-center text-slate-700">
                                          <Calendar className="h-3.5 w-3.5 mr-1.5 text-slate-400" />
                                          {formatDate(payment.dueDate)}
                                        </div>
                                      </TableCell>
                                      <TableCell>
                                        {payment.paymentDate ? (
                                          <div className="flex items-center text-slate-700">
                                            <DollarSign className="h-3.5 w-3.5 mr-1.5 text-slate-400" />
                                            {formatDate(payment.paymentDate)}
                                          </div>
                                        ) : (
                                          <span className="text-slate-400">-</span>
                                        )}
                                      </TableCell>
                                      <TableCell className="text-right">
                                        <TooltipProvider>
                                          <div className="flex justify-end gap-1 transition-opacity opacity-80 group-hover:opacity-100">
                                            <Tooltip>
                                              <TooltipTrigger asChild>
                                                <Button
                                                  variant="ghost"
                                                  size="icon"
                                                  className="w-8 h-8 rounded-full"
                                                  onClick={() => {
                                                    // View details action
                                                  }}
                                                >
                                                  <Eye className="w-4 h-4 text-slate-600" />
                                                  <span className="sr-only">View details</span>
                                                </Button>
                                              </TooltipTrigger>
                                              <TooltipContent>
                                                <p>View details</p>
                                              </TooltipContent>
                                            </Tooltip>

                                            <Tooltip>
                                              <TooltipTrigger asChild>
                                                <Button
                                                  variant="ghost"
                                                  size="icon"
                                                  className="w-8 h-8 rounded-full"
                                                  onClick={() => handleEditPayment(payment)}
                                                >
                                                  <Edit className="w-4 h-4 text-slate-600" />
                                                  <span className="sr-only">Edit payment</span>
                                                </Button>
                                              </TooltipTrigger>
                                              <TooltipContent>
                                                <p>Edit payment</p>
                                              </TooltipContent>
                                            </Tooltip>

                                            <DropdownMenu>
                                              <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full">
                                                  <MoreHorizontal className="w-4 h-4 text-slate-600" />
                                                  <span className="sr-only">More options</span>
                                                </Button>
                                              </DropdownMenuTrigger>
                                              <DropdownMenuContent align="end" className="w-[180px]">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem onClick={() => handleEditPayment(payment)}>
                                                  <Edit className="w-4 h-4 mr-2" />
                                                  Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                  <Eye className="w-4 h-4 mr-2" />
                                                  View Details
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="text-rose-600">
                                                  <Trash className="w-4 h-4 mr-2" />
                                                  Delete
                                                </DropdownMenuItem>
                                              </DropdownMenuContent>
                                            </DropdownMenu>
                                          </div>
                                        </TooltipProvider>
                                      </TableCell>
                                    </motion.tr>
                                  ))}
                                </AnimatePresence>
                              )}
                            </TableBody>
                          </Table>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between px-6 border-t bg-slate-50/50">
            <div className="text-sm text-slate-600">
              Showing {sortedPayments.length} of {mockPayments.length} payments
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled className="bg-white border-slate-200">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled className="bg-white border-slate-200">
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </motion.div>

      {/* Create Payment Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Payment</DialogTitle>
            <DialogDescription>Create a new payment record for a student</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="studentId">Student ID</Label>
                <Input id="studentId" placeholder="Enter student ID" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="studentName">Student Name</Label>
                <Input id="studentName" placeholder="Enter student name" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="program">Program</Label>
                <Select defaultValue="Informatics">
                  <SelectTrigger id="program">
                    <SelectValue placeholder="Select program" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Informatics">Informatics</SelectItem>
                    <SelectItem value="Architecture">Architecture</SelectItem>
                    <SelectItem value="Electrical">Electrical</SelectItem>
                    <SelectItem value="Urban Planning">Urban Planning</SelectItem>
                    <SelectItem value="Watering">Watering</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="semester">Semester</Label>
                <Select defaultValue="2023/2024-2">
                  <SelectTrigger id="semester">
                    <SelectValue placeholder="Select semester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2023/2024-2">2023/2024 - Semester 2</SelectItem>
                    <SelectItem value="2023/2024-1">2023/2024 - Semester 1</SelectItem>
                    <SelectItem value="2022/2023-2">2022/2023 - Semester 2</SelectItem>
                    <SelectItem value="2022/2023-1">2022/2023 - Semester 1</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (IDR)</Label>
                <Input id="amount" type="number" placeholder="Enter amount" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue="unpaid">
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="partial">Partial</SelectItem>
                    <SelectItem value="unpaid">Unpaid</SelectItem>
                    <SelectItem value="scholarship">Scholarship</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input id="dueDate" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="paymentDate">Payment Date</Label>
                <Input id="paymentDate" type="date" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Input id="notes" placeholder="Additional notes (optional)" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsCreateDialogOpen(false)} className="bg-blue-600 hover:bg-blue-700">
              Create Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Payment Dialog */}
      {currentPayment && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Payment</DialogTitle>
              <DialogDescription>Update payment details for {currentPayment.studentName}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-studentId">Student ID</Label>
                  <Input id="edit-studentId" value={currentPayment.studentId} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-studentName">Student Name</Label>
                  <Input id="edit-studentName" value={currentPayment.studentName} readOnly />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-program">Program</Label>
                  <Select defaultValue={currentPayment.program}>
                    <SelectTrigger id="edit-program">
                      <SelectValue placeholder="Select program" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Informatics">Informatics</SelectItem>
                      <SelectItem value="Architecture">Architecture</SelectItem>
                      <SelectItem value="Electrical">Electrical</SelectItem>
                      <SelectItem value="Urban Planning">Urban Planning</SelectItem>
                      <SelectItem value="Watering">Watering</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-semester">Semester</Label>
                  <Select defaultValue={currentPayment.semester}>
                    <SelectTrigger id="edit-semester">
                      <SelectValue placeholder="Select semester" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2023/2024-2">2023/2024 - Semester 2</SelectItem>
                      <SelectItem value="2023/2024-1">2023/2024 - Semester 1</SelectItem>
                      <SelectItem value="2022/2023-2">2022/2023 - Semester 2</SelectItem>
                      <SelectItem value="2022/2023-1">2022/2023 - Semester 1</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-amount">Amount (IDR)</Label>
                  <Input id="edit-amount" type="number" defaultValue={currentPayment.amount} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select defaultValue={currentPayment.status}>
                    <SelectTrigger id="edit-status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="partial">Partial</SelectItem>
                      <SelectItem value="unpaid">Unpaid</SelectItem>
                      <SelectItem value="scholarship">Scholarship</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-dueDate">Due Date</Label>
                  <Input id="edit-dueDate" type="date" defaultValue={currentPayment.dueDate} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-paymentDate">Payment Date</Label>
                  <Input id="edit-paymentDate" type="date" defaultValue={currentPayment.paymentDate || ""} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-notes">Notes</Label>
                <Input id="edit-notes" placeholder="Additional notes (optional)" />
              </div>
            </div>
            {/* Update the Edit Payment Dialog to use the simulatePaymentUpdate function */}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={simulatePaymentUpdate} className="bg-blue-600 hover:bg-blue-700">
                Update Payment
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

