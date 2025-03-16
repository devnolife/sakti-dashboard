"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { format, parseISO, isAfter, isBefore, isEqual } from "date-fns"
import {
  Search,
  Download,
  FileText,
  Calendar,
  ChevronLeft,
  ChevronRight,
  X,
  SlidersHorizontal,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  CreditCard,
  Clock,
  CheckCircle2,
  FileBarChart2,
} from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { DateRange } from "react-day-picker"

// Mock payment history data
const paymentHistoryData = [
  {
    id: "TRX-20230105-001",
    studentId: "2023001",
    studentName: "Ahmad Fauzi",
    department: "Informatics",
    amount: 5000000,
    method: "Bank Transfer",
    date: "2023-01-05",
    semester: "2022/2023-1",
    status: "completed",
    reference: "BNI-78901234",
  },
  {
    id: "TRX-20230110-002",
    studentId: "2023002",
    studentName: "Siti Nurhaliza",
    department: "Architecture",
    amount: 5500000,
    method: "Virtual Account",
    date: "2023-01-10",
    semester: "2022/2023-1",
    status: "completed",
    reference: "BCA-12345678",
  },
  {
    id: "TRX-20230115-003",
    studentId: "2023003",
    studentName: "Budi Santoso",
    department: "Electrical",
    amount: 4800000,
    method: "Bank Transfer",
    date: "2023-01-15",
    semester: "2022/2023-1",
    status: "completed",
    reference: "BRI-56781234",
  },
  {
    id: "TRX-20230120-004",
    studentId: "2023004",
    studentName: "Dewi Kartika",
    department: "Urban Planning",
    amount: 5200000,
    method: "Scholarship",
    date: "2023-01-20",
    semester: "2022/2023-1",
    status: "completed",
    reference: "SCH-20230120",
  },
  {
    id: "TRX-20230125-005",
    studentId: "2023005",
    studentName: "Rudi Hartono",
    department: "Watering",
    amount: 4500000,
    method: "Bank Transfer",
    date: "2023-01-25",
    semester: "2022/2023-1",
    status: "completed",
    reference: "BNI-45678901",
  },
  {
    id: "TRX-20230205-006",
    studentId: "2023006",
    studentName: "Rina Marlina",
    department: "Informatics",
    amount: 5000000,
    method: "Virtual Account",
    date: "2023-02-05",
    semester: "2022/2023-2",
    status: "completed",
    reference: "BCA-87654321",
  },
  {
    id: "TRX-20230210-007",
    studentId: "2023007",
    studentName: "Doni Kusuma",
    department: "Architecture",
    amount: 5500000,
    method: "Bank Transfer",
    date: "2023-02-10",
    semester: "2022/2023-2",
    status: "completed",
    reference: "BRI-12348765",
  },
  {
    id: "TRX-20230215-008",
    studentId: "2023008",
    studentName: "Lia Permata",
    department: "Electrical",
    amount: 4800000,
    method: "Bank Transfer",
    date: "2023-02-15",
    semester: "2022/2023-2",
    status: "refunded",
    reference: "BNI-23456789",
  },
  {
    id: "TRX-20230220-009",
    studentId: "2023009",
    studentName: "Hadi Pranoto",
    department: "Urban Planning",
    amount: 5200000,
    method: "Virtual Account",
    date: "2023-02-20",
    semester: "2022/2023-2",
    status: "completed",
    reference: "BCA-34567890",
  },
  {
    id: "TRX-20230225-010",
    studentId: "2023010",
    studentName: "Maya Sari",
    department: "Watering",
    amount: 4500000,
    method: "Bank Transfer",
    date: "2023-02-25",
    semester: "2022/2023-2",
    status: "failed",
    reference: "BRI-45678901",
  },
  {
    id: "TRX-20230705-011",
    studentId: "2023001",
    studentName: "Ahmad Fauzi",
    department: "Informatics",
    amount: 5000000,
    method: "Bank Transfer",
    date: "2023-07-05",
    semester: "2023/2024-1",
    status: "completed",
    reference: "BNI-56789012",
  },
  {
    id: "TRX-20230710-012",
    studentId: "2023002",
    studentName: "Siti Nurhaliza",
    department: "Architecture",
    amount: 5500000,
    method: "Virtual Account",
    date: "2023-07-10",
    semester: "2023/2024-1",
    status: "completed",
    reference: "BCA-67890123",
  },
  {
    id: "TRX-20230715-013",
    studentId: "2023003",
    studentName: "Budi Santoso",
    department: "Electrical",
    amount: 4800000,
    method: "Bank Transfer",
    date: "2023-07-15",
    semester: "2023/2024-1",
    status: "pending",
    reference: "BRI-78901234",
  },
  {
    id: "TRX-20230720-014",
    studentId: "2023004",
    studentName: "Dewi Kartika",
    department: "Urban Planning",
    amount: 5200000,
    method: "Scholarship",
    date: "2023-07-20",
    semester: "2023/2024-1",
    status: "completed",
    reference: "SCH-20230720",
  },
  {
    id: "TRX-20230725-015",
    studentId: "2023005",
    studentName: "Rudi Hartono",
    department: "Watering",
    amount: 4500000,
    method: "Bank Transfer",
    date: "2023-07-25",
    semester: "2023/2024-1",
    status: "completed",
    reference: "BNI-89012345",
  },
]

// Department colors for visual distinction - updated with softer palette
const departmentColors: Record<string, string> = {
  Informatics: "bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 border-emerald-100",
  Architecture: "bg-gradient-to-r from-purple-50 to-fuchsia-50 text-purple-700 border-purple-100",
  Electrical: "bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-700 border-amber-100",
  "Urban Planning": "bg-gradient-to-r from-blue-50 to-sky-50 text-blue-700 border-blue-100",
  Watering: "bg-gradient-to-r from-orange-50 to-amber-50 text-orange-700 border-orange-100",
}

// Status colors and configurations
const statusConfig: Record<string, { color: string; icon: React.ReactNode }> = {
  completed: {
    color: "bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 border-emerald-100",
    icon: <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />,
  },
  pending: {
    color: "bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-700 border-amber-100",
    icon: <Clock className="w-3.5 h-3.5 mr-1.5" />,
  },
  failed: {
    color: "bg-gradient-to-r from-rose-50 to-red-50 text-rose-700 border-rose-100",
    icon: <X className="w-3.5 h-3.5 mr-1.5" />,
  },
  refunded: {
    color: "bg-gradient-to-r from-blue-50 to-sky-50 text-blue-700 border-blue-100",
    icon: <CreditCard className="w-3.5 h-3.5 mr-1.5" />,
  },
}

// Helper function to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return format(date, "dd MMM yyyy")
}

// Helper function to get initials from name
const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
}

type SortField = keyof (typeof paymentHistoryData)[0] | null
type SortDirection = "asc" | "desc"

export function PaymentHistoryManager() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState<string | undefined>()
  const [selectedMethod, setSelectedMethod] = useState<string | undefined>()
  const [selectedSemester, setSelectedSemester] = useState<string | undefined>()
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>()
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: undefined,
    to: undefined,
  })
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [sortField, setSortField] = useState<SortField>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
  const [activeTab, setActiveTab] = useState("all")
  const itemsPerPage = 10

  // Calculate summary statistics
  const totalAmount = paymentHistoryData.reduce((sum, payment) => sum + payment.amount, 0)
  const completedAmount = paymentHistoryData
    .filter((p) => p.status === "completed")
    .reduce((sum, payment) => sum + payment.amount, 0)
  const pendingAmount = paymentHistoryData
    .filter((p) => p.status === "pending")
    .reduce((sum, payment) => sum + payment.amount, 0)

  const statusCounts = paymentHistoryData.reduce(
    (acc, payment) => {
      acc[payment.status] = (acc[payment.status] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  // Handle filter changes
  const handleFilterChange = (type: string, value: string | undefined) => {
    if (!value) {
      setActiveFilters((prev) => prev.filter((filter) => !filter.startsWith(type)))
      return
    }

    const filterString = `${type}:${value}`
    setActiveFilters((prev) => {
      const withoutType = prev.filter((filter) => !filter.startsWith(type))
      return [...withoutType, filterString]
    })
  }

  const handleDepartmentChange = (value: string) => {
    setSelectedDepartment(value)
    handleFilterChange("Department", value)
  }

  const handleMethodChange = (value: string) => {
    setSelectedMethod(value)
    handleFilterChange("Method", value)
  }

  const handleSemesterChange = (value: string) => {
    setSelectedSemester(value)
    handleFilterChange("Semester", value)
  }

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value)
    handleFilterChange("Status", value)
  }

  const handleDateRangeChange = (range: { from: Date | undefined; to: Date | undefined }) => {
    setDateRange(range)
    if (range.from && range.to) {
      const fromStr = format(range.from, "yyyy-MM-dd")
      const toStr = format(range.to, "yyyy-MM-dd")
      handleFilterChange("Date", `${fromStr} to ${toStr}`)
    } else {
      handleFilterChange("Date", undefined)
    }
  }

  const removeFilter = (filter: string) => {
    const [type] = filter.split(":")

    if (type === "Department") setSelectedDepartment(undefined)
    if (type === "Method") setSelectedMethod(undefined)
    if (type === "Semester") setSelectedSemester(undefined)
    if (type === "Status") setSelectedStatus(undefined)
    if (type === "Date") setDateRange({ from: undefined, to: undefined })

    setActiveFilters((prev) => prev.filter((f) => f !== filter))
  }

  const clearAllFilters = () => {
    setSelectedDepartment(undefined)
    setSelectedMethod(undefined)
    setSelectedSemester(undefined)
    setSelectedStatus(undefined)
    setDateRange({ from: undefined, to: undefined })
    setActiveFilters([])
    setSearchTerm("")
    setCurrentPage(1)
  }

  // Filter payments based on search and filters
  const filteredPayments = paymentHistoryData.filter((payment) => {
    const matchesSearch =
      payment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.reference.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDepartment = !selectedDepartment || payment.department === selectedDepartment
    const matchesMethod = !selectedMethod || payment.method === selectedMethod
    const matchesSemester = !selectedSemester || payment.semester === selectedSemester
    const matchesStatus = !selectedStatus || payment.status === selectedStatus
    const matchesTab = activeTab === "all" || payment.status === activeTab

    let matchesDateRange = true
    if (dateRange.from && dateRange.to) {
      const paymentDate = parseISO(payment.date)
      matchesDateRange =
        (isAfter(paymentDate, dateRange.from) || isEqual(paymentDate, dateRange.from)) &&
        (isBefore(paymentDate, dateRange.to) || isEqual(paymentDate, dateRange.to))
    }

    return (
      matchesSearch &&
      matchesDepartment &&
      matchesMethod &&
      matchesSemester &&
      matchesStatus &&
      matchesDateRange &&
      matchesTab
    )
  })

  // Handle sort
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown className="w-4 h-4 ml-2" />
    return sortDirection === "asc" ? <ArrowUp className="w-4 h-4 ml-2" /> : <ArrowDown className="w-4 h-4 ml-2" />
  }

  // Sort payments
  const sortedPayments = [...filteredPayments].sort((a, b) => {
    if (!sortField) return 0

    const aValue = a[sortField]
    const bValue = b[sortField]

    if (aValue === bValue) return 0

    const direction = sortDirection === "asc" ? 1 : -1

    if (typeof aValue === "string" && typeof bValue === "string") {
      return aValue.localeCompare(bValue) * direction
    }

    if (aValue < bValue) return -1 * direction
    return 1 * direction
  })

  // Pagination
  const totalPages = Math.ceil(sortedPayments.length / itemsPerPage)
  const paginatedPayments = sortedPayments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Reset current page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedDepartment, selectedMethod, selectedSemester, selectedStatus, dateRange, activeTab])

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="overflow-hidden border-none shadow-sm bg-gradient-to-br from-blue-50 via-indigo-50 to-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-blue-800">Total Transactions</CardTitle>
            <div className="p-2 text-blue-600 bg-blue-100 rounded-full">
              <FileBarChart2 className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{paymentHistoryData.length}</div>
            <div className="flex items-center mt-1 text-xs">
              <div className="text-muted-foreground">Across all time periods</div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none shadow-sm bg-gradient-to-br from-emerald-50 via-green-50 to-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-emerald-800">Total Amount</CardTitle>
            <div className="p-2 rounded-full bg-emerald-100 text-emerald-600">
              <CreditCard className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-900">{formatCurrency(totalAmount)}</div>
            <div className="flex items-center mt-1 text-xs">
              <div className="text-muted-foreground">Processed payments</div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none shadow-sm bg-gradient-to-br from-amber-50 via-yellow-50 to-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-amber-800">Completed Payments</CardTitle>
            <div className="p-2 rounded-full bg-amber-100 text-amber-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-900">{statusCounts.completed || 0}</div>
            <div className="flex items-center mt-1 text-xs">
              <div className="text-muted-foreground">{formatCurrency(completedAmount)}</div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none shadow-sm bg-gradient-to-br from-purple-50 via-violet-50 to-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-purple-800">Pending Payments</CardTitle>
            <div className="p-2 text-purple-600 bg-purple-100 rounded-full">
              <Clock className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">{statusCounts.pending || 0}</div>
            <div className="flex items-center mt-1 text-xs">
              <div className="text-muted-foreground">{formatCurrency(pendingAmount)}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card className="border-none shadow-sm bg-gradient-to-br from-white via-slate-50 to-white backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>View and analyze historical payment records</CardDescription>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </Button>
              <Button variant="outline" className="gap-2">
                <FileText className="w-4 h-4" />
                <span>Generate Report</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search and Filters */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by student name, ID, or reference..."
                  className="pl-10 transition-all bg-background/50 border-muted focus-visible:bg-background"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="gap-2 bg-background/50 border-muted hover:bg-background">
                      <SlidersHorizontal className="w-4 h-4" />
                      <span>Filters</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">Filters</h4>
                        <p className="text-sm text-muted-foreground">Filter payment history by various criteria</p>
                      </div>
                      <Separator />
                      <div className="grid gap-3">
                        <div className="grid gap-1.5">
                          <Label htmlFor="department">Department</Label>
                          <Select value={selectedDepartment} onValueChange={handleDepartmentChange}>
                            <SelectTrigger id="department" className="bg-background">
                              <SelectValue placeholder="Select department" />
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
                        <div className="grid gap-1.5">
                          <Label htmlFor="method">Payment Method</Label>
                          <Select value={selectedMethod} onValueChange={handleMethodChange}>
                            <SelectTrigger id="method" className="bg-background">
                              <SelectValue placeholder="Select method" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                              <SelectItem value="Virtual Account">Virtual Account</SelectItem>
                              <SelectItem value="Scholarship">Scholarship</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-1.5">
                          <Label htmlFor="semester">Semester</Label>
                          <Select value={selectedSemester} onValueChange={handleSemesterChange}>
                            <SelectTrigger id="semester" className="bg-background">
                              <SelectValue placeholder="Select semester" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="2023/2024-1">2023/2024 - Semester 1</SelectItem>
                              <SelectItem value="2022/2023-2">2022/2023 - Semester 2</SelectItem>
                              <SelectItem value="2022/2023-1">2022/2023 - Semester 1</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-1.5">
                          <Label htmlFor="status">Status</Label>
                          <Select value={selectedStatus} onValueChange={handleStatusChange}>
                            <SelectTrigger id="status" className="bg-background">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="completed">Completed</SelectItem>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="failed">Failed</SelectItem>
                              <SelectItem value="refunded">Refunded</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-1.5">
                          <Label>Date Range</Label>
                          <Card className="border-none shadow-none">
                            <CardContent className="p-0">
                              <CalendarComponent
                                mode="range"
                                selected={dateRange}
                                onSelect={(range) => handleDateRangeChange({
                                  from: range?.from,
                                  to: range?.to
                                })}
                                numberOfMonths={1}
                                className="border-none shadow-none"
                                />
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
                {activeFilters.length > 0 && (
                  <Button variant="ghost" onClick={clearAllFilters} size="sm" className="text-muted-foreground">
                    Clear all
                  </Button>
                )}
              </div>
            </div>

            {activeFilters.length > 0 && (
              <div className="flex flex-wrap gap-2 duration-300 animate-in fade-in">
                {activeFilters.map((filter) => {
                  const [type, value] = filter.split(":")
                  return (
                    <Badge
                      key={filter}
                      variant="secondary"
                      className="gap-1 px-3 py-1 bg-gradient-to-r from-slate-50 to-blue-50/50"
                    >
                      <span className="font-medium text-muted-foreground">{type}:</span> {value}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-4 h-4 p-0 ml-1"
                        onClick={() => removeFilter(filter)}
                      >
                        <X className="w-3 h-3" />
                        <span className="sr-only">Remove {type} filter</span>
                      </Button>
                    </Badge>
                  )
                })}
              </div>
            )}

            {/* Tabs */}
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-4 bg-gradient-to-r from-slate-100 to-blue-50">
                <TabsTrigger value="all">
                  All
                  <Badge variant="outline" className="ml-2 bg-background">
                    {paymentHistoryData.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="completed">
                  Completed
                  <Badge variant="outline" className="ml-2 bg-emerald-50 text-emerald-700 border-emerald-100">
                    {statusCounts.completed || 0}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="pending">
                  Pending
                  <Badge variant="outline" className="ml-2 bg-amber-50 text-amber-700 border-amber-100">
                    {statusCounts.pending || 0}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="failed">
                  Failed
                  <Badge variant="outline" className="ml-2 bg-rose-50 text-rose-700 border-rose-100">
                    {statusCounts.failed || 0}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="refunded">
                  Refunded
                  <Badge variant="outline" className="ml-2 text-blue-700 border-blue-100 bg-blue-50">
                    {statusCounts.refunded || 0}
                  </Badge>
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-0">
                {/* Payment History Table */}
                <div className="overflow-hidden border rounded-md border-muted/50 bg-background/50 backdrop-blur-sm">
                  <Table>
                    <TableHeader className="bg-muted/30">
                      <TableRow className="hover:bg-muted/20">
                        <TableHead className="w-[120px]">
                          <Button
                            variant="ghost"
                            onClick={() => handleSort("id")}
                            className="flex items-center p-0 font-medium"
                          >
                            Transaction ID
                            {getSortIcon("id")}
                          </Button>
                        </TableHead>
                        <TableHead>
                          <Button
                            variant="ghost"
                            onClick={() => handleSort("studentName")}
                            className="flex items-center p-0 font-medium"
                          >
                            Student
                            {getSortIcon("studentName")}
                          </Button>
                        </TableHead>
                        <TableHead>
                          <Button
                            variant="ghost"
                            onClick={() => handleSort("department")}
                            className="flex items-center p-0 font-medium"
                          >
                            Department
                            {getSortIcon("department")}
                          </Button>
                        </TableHead>
                        <TableHead>
                          <Button
                            variant="ghost"
                            onClick={() => handleSort("date")}
                            className="flex items-center p-0 font-medium"
                          >
                            Date
                            {getSortIcon("date")}
                          </Button>
                        </TableHead>
                        <TableHead>
                          <Button
                            variant="ghost"
                            onClick={() => handleSort("amount")}
                            className="flex items-center p-0 font-medium"
                          >
                            Amount
                            {getSortIcon("amount")}
                          </Button>
                        </TableHead>
                        <TableHead>
                          <Button
                            variant="ghost"
                            onClick={() => handleSort("method")}
                            className="flex items-center p-0 font-medium"
                          >
                            Method
                            {getSortIcon("method")}
                          </Button>
                        </TableHead>
                        <TableHead>Reference</TableHead>
                        <TableHead>
                          <Button
                            variant="ghost"
                            onClick={() => handleSort("status")}
                            className="flex items-center p-0 font-medium"
                          >
                            Status
                            {getSortIcon("status")}
                          </Button>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedPayments.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={8} className="h-24 text-center">
                            <div className="flex flex-col items-center justify-center text-muted-foreground">
                              <FileText className="w-8 h-8 mb-2" />
                              <p>No payment records found matching your criteria.</p>
                              <Button variant="link" onClick={clearAllFilters} className="mt-2">
                                Clear all filters
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : (
                        paginatedPayments.map((payment, index) => (
                          <TableRow
                            key={payment.id}
                            className={`group transition-colors ${index % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                              } hover:bg-blue-50/30`}
                          >
                            <TableCell className="font-medium">{payment.id}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Avatar className="w-8 h-8 border border-muted bg-gradient-to-br from-slate-100 to-blue-50">
                                  <AvatarFallback className="bg-primary/5 text-primary">
                                    {getInitials(payment.studentName)}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="grid gap-0.5">
                                  <div className="font-medium">{payment.studentName}</div>
                                  <div className="text-xs text-muted-foreground">{payment.studentId}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={`${departmentColors[payment.department]} font-normal`}
                              >
                                {payment.department}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Calendar className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                                {formatDate(payment.date)}
                              </div>
                            </TableCell>
                            <TableCell className="font-medium">{formatCurrency(payment.amount)}</TableCell>
                            <TableCell>{payment.method}</TableCell>
                            <TableCell className="font-mono text-xs">{payment.reference}</TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={`${statusConfig[payment.status].color} font-normal flex items-center`}
                              >
                                {statusConfig[payment.status].icon}
                                {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>

            {/* Pagination */}
            {paginatedPayments.length > 0 && (
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="text-sm text-muted-foreground">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                  {Math.min(currentPage * itemsPerPage, filteredPayments.length)} of {filteredPayments.length} records
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="w-8 h-8 p-0 bg-gradient-to-r from-slate-50 to-blue-50 hover:bg-blue-100/50"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="sr-only">Previous page</span>
                  </Button>
                  <div className="flex items-center">
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      const page = i + 1
                      return (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => handlePageChange(page)}
                          className={`h-8 w-8 p-0 ${currentPage === page
                              ? "bg-gradient-to-r from-blue-500 to-indigo-500"
                              : "bg-gradient-to-r from-slate-50 to-blue-50 hover:bg-blue-100/50"
                            }`}
                        >
                          {page}
                        </Button>
                      )
                    })}
                    {totalPages > 5 && <span className="mx-1">...</span>}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="w-8 h-8 p-0 bg-gradient-to-r from-slate-50 to-blue-50 hover:bg-blue-100/50"
                  >
                    <ChevronRight className="w-4 h-4" />
                    <span className="sr-only">Next page</span>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

