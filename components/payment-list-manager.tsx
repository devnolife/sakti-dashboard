"use client"

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
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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

export function PaymentListManager() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProgram, setSelectedProgram] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedSemester, setSelectedSemester] = useState("2023/2024-2")
  const [selectedPayments, setSelectedPayments] = useState<string[]>([])
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentPayment, setCurrentPayment] = useState<any>(null)

  // Filter payments based on search and filters
  const filteredPayments = mockPayments.filter((payment) => {
    const matchesSearch =
      payment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesProgram = selectedProgram === "all" || payment.program === selectedProgram
    const matchesStatus = selectedStatus === "all" || payment.status === selectedStatus
    const matchesSemester = payment.semester === selectedSemester

    return matchesSearch && matchesProgram && matchesStatus && matchesSemester
  })

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

  // Handle edit payment
  const handleEditPayment = (payment: any) => {
    setCurrentPayment(payment)
    setIsEditDialogOpen(true)
  }

  // Render status badge
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-500">Paid</Badge>
      case "partial":
        return <Badge className="bg-blue-500">Partial</Badge>
      case "unpaid":
        return <Badge variant="outline">Unpaid</Badge>
      case "scholarship":
        return <Badge className="bg-purple-500">Scholarship</Badge>
      case "overdue":
        return <Badge className="bg-red-500">Overdue</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Payment List</CardTitle>
              <CardDescription>Manage student payments across all study programs</CardDescription>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Payment
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Actions
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Batch Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem disabled={selectedPayments.length === 0}>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Mark as Paid
                  </DropdownMenuItem>
                  <DropdownMenuItem disabled={selectedPayments.length === 0}>
                    <XCircle className="w-4 h-4 mr-2" />
                    Mark as Unpaid
                  </DropdownMenuItem>
                  <DropdownMenuItem disabled={selectedPayments.length === 0}>
                    <AlertCircle className="w-4 h-4 mr-2" />
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
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by student name, ID, or payment ID..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Select value={selectedProgram} onValueChange={setSelectedProgram}>
                  <SelectTrigger>
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
                  <SelectTrigger>
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
                  <SelectTrigger>
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

            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">
                      <Checkbox
                        checked={selectedPayments.length === filteredPayments.length && filteredPayments.length > 0}
                        onCheckedChange={handleSelectAll}
                        aria-label="Select all"
                      />
                    </TableHead>
                    <TableHead className="w-[100px]">Payment ID</TableHead>
                    <TableHead className="w-[100px]">Student ID</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Program</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Payment Date</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={10} className="h-24 text-center">
                        No payments found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedPayments.includes(payment.id)}
                            onCheckedChange={() => handleSelectPayment(payment.id)}
                            aria-label={`Select payment ${payment.id}`}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{payment.id}</TableCell>
                        <TableCell>{payment.studentId}</TableCell>
                        <TableCell>{payment.studentName}</TableCell>
                        <TableCell>{payment.program}</TableCell>
                        <TableCell>{formatCurrency(payment.amount)}</TableCell>
                        <TableCell>{renderStatusBadge(payment.status)}</TableCell>
                        <TableCell>{formatDate(payment.dueDate)}</TableCell>
                        <TableCell>{formatDate(payment.paymentDate)}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="w-4 h-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEditPayment(payment)}>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash className="w-4 h-4 mr-2" />
                                Delete
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
            Showing {filteredPayments.length} of {mockPayments.length} payments
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
            <Button onClick={() => setIsCreateDialogOpen(false)}>Create Payment</Button>
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
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsEditDialogOpen(false)}>Update Payment</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

