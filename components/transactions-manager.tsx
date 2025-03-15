"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Eye,
  CheckCircle,
  Clock,
  AlertTriangle,
  Calendar,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Mock data for transactions
const mockTransactions = [
  {
    id: "TRX-001",
    studentId: "2023001",
    studentName: "Ahmad Fauzi",
    type: "Tuition Fee",
    amount: 5000000,
    status: "success",
    date: "2023-11-15",
    method: "Bank Transfer",
    reference: "BT12345678",
  },
  {
    id: "TRX-002",
    studentId: "2023002",
    studentName: "Siti Nurhaliza",
    type: "Laboratory Fee",
    amount: 750000,
    status: "success",
    date: "2023-11-14",
    method: "Online Payment",
    reference: "OP87654321",
  },
  {
    id: "TRX-003",
    studentId: "2023003",
    studentName: "Budi Santoso",
    type: "Partial Tuition",
    amount: 2500000,
    status: "pending",
    date: "2023-11-14",
    method: "Bank Transfer",
    reference: "BT23456789",
  },
  {
    id: "TRX-004",
    studentId: "2023004",
    studentName: "Dewi Kartika",
    type: "Registration Fee",
    amount: 500000,
    status: "success",
    date: "2023-11-13",
    method: "Online Payment",
    reference: "OP76543210",
  },
  {
    id: "TRX-005",
    studentId: "2023005",
    studentName: "Rudi Hartono",
    type: "Examination Fee",
    amount: 1200000,
    status: "failed",
    date: "2023-11-12",
    method: "Credit Card",
    reference: "CC98765432",
  },
  {
    id: "TRX-006",
    studentId: "2023006",
    studentName: "Rina Marlina",
    type: "Tuition Fee",
    amount: 5000000,
    status: "success",
    date: "2023-11-12",
    method: "Bank Transfer",
    reference: "BT34567890",
  },
  {
    id: "TRX-007",
    studentId: "2023007",
    studentName: "Doni Kusuma",
    type: "Laboratory Fee",
    amount: 750000,
    status: "success",
    date: "2023-11-11",
    method: "Online Payment",
    reference: "OP65432109",
  },
  {
    id: "TRX-008",
    studentId: "2023008",
    studentName: "Lia Permata",
    type: "Registration Fee",
    amount: 500000,
    status: "pending",
    date: "2023-11-11",
    method: "Bank Transfer",
    reference: "BT45678901",
  },
  {
    id: "TRX-009",
    studentId: "2023009",
    studentName: "Hadi Pranoto",
    type: "Tuition Fee",
    amount: 5000000,
    status: "success",
    date: "2023-11-10",
    method: "Online Payment",
    reference: "OP54321098",
  },
  {
    id: "TRX-010",
    studentId: "2023010",
    studentName: "Maya Sari",
    type: "Examination Fee",
    amount: 1200000,
    status: "failed",
    date: "2023-11-10",
    method: "Credit Card",
    reference: "CC87654321",
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
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}

export function TransactionsManager() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedMethod, setSelectedMethod] = useState("all")
  const [selectedTransactions, setSelectedTransactions] = useState<string[]>([])
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
  const [currentTransaction, setCurrentTransaction] = useState<any>(null)
  const [dateRange, setDateRange] = useState({ from: "", to: "" })

  // Filter transactions based on search and filters
  const filteredTransactions = mockTransactions.filter((transaction) => {
    const matchesSearch =
      transaction.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.type.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = selectedType === "all" || transaction.type === selectedType
    const matchesStatus = selectedStatus === "all" || transaction.status === selectedStatus
    const matchesMethod = selectedMethod === "all" || transaction.method === selectedMethod

    let matchesDateRange = true
    if (dateRange.from && dateRange.to) {
      const transactionDate = new Date(transaction.date)
      const fromDate = new Date(dateRange.from)
      const toDate = new Date(dateRange.to)
      matchesDateRange = transactionDate >= fromDate && transactionDate <= toDate
    }

    return matchesSearch && matchesType && matchesStatus && matchesMethod && matchesDateRange
  })

  // Handle select all checkbox
  const handleSelectAll = () => {
    if (selectedTransactions.length === filteredTransactions.length) {
      setSelectedTransactions([])
    } else {
      setSelectedTransactions(filteredTransactions.map((transaction) => transaction.id))
    }
  }

  // Handle individual checkbox selection
  const handleSelectTransaction = (transactionId: string) => {
    if (selectedTransactions.includes(transactionId)) {
      setSelectedTransactions(selectedTransactions.filter((id) => id !== transactionId))
    } else {
      setSelectedTransactions([...selectedTransactions, transactionId])
    }
  }

  // Handle view transaction details
  const handleViewTransaction = (transaction: any) => {
    setCurrentTransaction(transaction)
    setIsDetailsDialogOpen(true)
  }

  // Render status badge
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-500">Success</Badge>
      case "pending":
        return <Badge className="bg-amber-500">Pending</Badge>
      case "failed":
        return <Badge className="bg-red-500">Failed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Transaction List</CardTitle>
              <CardDescription>View and manage all financial transactions</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Date Range
              </Button>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Advanced Filters
              </Button>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by student name, ID, or transaction ID..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Tuition Fee">Tuition Fee</SelectItem>
                    <SelectItem value="Laboratory Fee">Laboratory Fee</SelectItem>
                    <SelectItem value="Registration Fee">Registration Fee</SelectItem>
                    <SelectItem value="Examination Fee">Examination Fee</SelectItem>
                    <SelectItem value="Partial Tuition">Partial Tuition</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedMethod} onValueChange={setSelectedMethod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Methods</SelectItem>
                    <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                    <SelectItem value="Online Payment">Online Payment</SelectItem>
                    <SelectItem value="Credit Card">Credit Card</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">
                      <Checkbox
                        checked={
                          selectedTransactions.length === filteredTransactions.length && filteredTransactions.length > 0
                        }
                        onCheckedChange={handleSelectAll}
                        aria-label="Select all"
                      />
                    </TableHead>
                    <TableHead className="w-[100px]">Transaction ID</TableHead>
                    <TableHead className="w-[100px]">Student ID</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={10} className="h-24 text-center">
                        No transactions found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedTransactions.includes(transaction.id)}
                            onCheckedChange={() => handleSelectTransaction(transaction.id)}
                            aria-label={`Select transaction ${transaction.id}`}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{transaction.id}</TableCell>
                        <TableCell>{transaction.studentId}</TableCell>
                        <TableCell>{transaction.studentName}</TableCell>
                        <TableCell>{transaction.type}</TableCell>
                        <TableCell>{formatCurrency(transaction.amount)}</TableCell>
                        <TableCell>{renderStatusBadge(transaction.status)}</TableCell>
                        <TableCell>{formatDate(transaction.date)}</TableCell>
                        <TableCell>{transaction.method}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewTransaction(transaction)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                Download Receipt
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {filteredTransactions.length} of {mockTransactions.length} transactions
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Transaction Details Dialog */}
      {currentTransaction && (
        <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Transaction Details</DialogTitle>
              <DialogDescription>Detailed information about transaction {currentTransaction.id}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Transaction ID</Label>
                  <p className="font-medium">{currentTransaction.id}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Status</Label>
                  <p>{renderStatusBadge(currentTransaction.status)}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Student ID</Label>
                  <p className="font-medium">{currentTransaction.studentId}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Student Name</Label>
                  <p className="font-medium">{currentTransaction.studentName}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Type</Label>
                  <p className="font-medium">{currentTransaction.type}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Amount</Label>
                  <p className="font-medium">{formatCurrency(currentTransaction.amount)}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Date</Label>
                  <p className="font-medium">{formatDate(currentTransaction.date)}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Method</Label>
                  <p className="font-medium">{currentTransaction.method}</p>
                </div>
              </div>
              <div>
                <Label className="text-muted-foreground">Reference</Label>
                <p className="font-medium">{currentTransaction.reference}</p>
              </div>
              <div className="pt-4">
                <div
                  className={`p-3 rounded-md ${
                    currentTransaction.status === "success"
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : currentTransaction.status === "pending"
                        ? "bg-amber-50 text-amber-700 border border-amber-200"
                        : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {currentTransaction.status === "success" ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : currentTransaction.status === "pending" ? (
                      <Clock className="h-4 w-4" />
                    ) : (
                      <AlertTriangle className="h-4 w-4" />
                    )}
                    <span className="font-medium">
                      {currentTransaction.status === "success"
                        ? "Transaction completed successfully"
                        : currentTransaction.status === "pending"
                          ? "Transaction is being processed"
                          : "Transaction failed to complete"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDetailsDialogOpen(false)}>
                Close
              </Button>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Download Receipt
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

