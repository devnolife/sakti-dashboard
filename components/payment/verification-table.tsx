"use client"

import { useState, useEffect } from "react"
import { ArrowDown, ArrowUp, ArrowUpDown, Check, Eye, MoreHorizontal, X } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"

import { mockStudentPayments, type StudentPayment } from "./mock-data-payment"

type SortField = keyof StudentPayment | null
type SortDirection = "asc" | "desc"

interface PaymentVerificationTableProps {
  filterStatus?: "pending" | "verified" | "rejected"
}

export function PaymentVerificationTable({ filterStatus }: PaymentVerificationTableProps) {
  const [payments, setPayments] = useState(mockStudentPayments)
  const [filteredPayments, setFilteredPayments] = useState(payments)
  const [sortField, setSortField] = useState<SortField>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
  const [selectedPayment, setSelectedPayment] = useState<StudentPayment | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isVerifyOpen, setIsVerifyOpen] = useState(false)
  const [isRejectOpen, setIsRejectOpen] = useState(false)
  const [rejectReason, setRejectReason] = useState("")

  useEffect(() => {
    if (filterStatus) {
      setFilteredPayments(payments.filter((payment) => payment.status === filterStatus))
    } else {
      setFilteredPayments(payments)
    }
  }, [payments, filterStatus])

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

  const handleVerify = () => {
    if (!selectedPayment) return

    setPayments((prev) =>
      prev.map((payment) => (payment.id === selectedPayment.id ? { ...payment, status: "verified" } : payment)),
    )

    setIsVerifyOpen(false)
    setSelectedPayment(null)
  }

  const handleReject = () => {
    if (!selectedPayment) return

    setPayments((prev) =>
      prev.map((payment) =>
        payment.id === selectedPayment.id ? { ...payment, status: "rejected", notes: rejectReason } : payment,
      ),
    )

    setIsRejectOpen(false)
    setRejectReason("")
    setSelectedPayment(null)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

  // Updated department colors with softer palette
  const updatedDepartmentColors: Record<string, string> = {
    Pengairan: "bg-blue-50 text-blue-700 border-blue-100",
    Elektro: "bg-amber-50 text-amber-700 border-amber-100",
    Arsitektur: "bg-purple-50 text-purple-700 border-purple-100",
    Informatika: "bg-emerald-50 text-emerald-700 border-emerald-100",
    PWK: "bg-orange-50 text-orange-700 border-orange-100",
  }

  // Updated status colors with softer palette
  const updatedStatusColors: Record<string, string> = {
    pending: "bg-amber-50 text-amber-700 border-amber-100",
    verified: "bg-emerald-50 text-emerald-700 border-emerald-100",
    rejected: "bg-rose-50 text-rose-700 border-rose-100",
  }

  return (
    <>
      <div className="overflow-hidden border rounded-md border-muted/50 bg-background/50 backdrop-blur-sm">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow className="hover:bg-muted/20">
              <TableHead className="w-[80px]">ID</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("name")}
                  className="flex items-center p-0 font-medium"
                >
                  Student
                  {getSortIcon("name")}
                </Button>
              </TableHead>
              <TableHead className="hidden md:table-cell">
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
                  onClick={() => handleSort("amount")}
                  className="flex items-center p-0 font-medium"
                >
                  Amount
                  {getSortIcon("amount")}
                </Button>
              </TableHead>
              <TableHead className="hidden md:table-cell">
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
                  onClick={() => handleSort("status")}
                  className="flex items-center p-0 font-medium"
                >
                  Status
                  {getSortIcon("status")}
                </Button>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedPayments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No payments found
                </TableCell>
              </TableRow>
            ) : (
              sortedPayments.map((payment) => (
                <TableRow key={payment.id} className="transition-colors group hover:bg-muted/30">
                  <TableCell className="font-medium">{payment.studentId}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8 border border-muted">
                        <AvatarFallback className="bg-primary/5 text-primary">
                          {getInitials(payment.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid gap-0.5">
                        <div className="font-medium">{payment.name}</div>
                        <div className="text-xs text-muted-foreground">{payment.paymentType}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="outline" className={`${updatedDepartmentColors[payment.department]} font-normal`}>
                      {payment.department}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatCurrency(payment.amount)}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {format(new Date(payment.date), "dd MMM yyyy")}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`${updatedStatusColors[payment.status]} font-normal`}>
                      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                    </Badge>
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
                                setSelectedPayment(payment)
                                setIsDetailsOpen(true)
                              }}
                            >
                              <Eye className="w-4 h-4" />
                              <span className="sr-only">View details</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View details</p>
                          </TooltipContent>
                        </Tooltip>

                        {payment.status === "pending" && (
                          <>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="w-8 h-8 rounded-full text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                                  onClick={() => {
                                    setSelectedPayment(payment)
                                    setIsVerifyOpen(true)
                                  }}
                                >
                                  <Check className="w-4 h-4" />
                                  <span className="sr-only">Verify payment</span>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Verify payment</p>
                              </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="w-8 h-8 rounded-full text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                                  onClick={() => {
                                    setSelectedPayment(payment)
                                    setIsRejectOpen(true)
                                  }}
                                >
                                  <X className="w-4 h-4" />
                                  <span className="sr-only">Reject payment</span>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Reject payment</p>
                              </TooltipContent>
                            </Tooltip>
                          </>
                        )}

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full">
                              <MoreHorizontal className="w-4 h-4" />
                              <span className="sr-only">More options</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-[180px]">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedPayment(payment)
                                setIsDetailsOpen(true)
                              }}
                            >
                              View details
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Contact student</DropdownMenuItem>
                            <DropdownMenuItem>Download receipt</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TooltipProvider>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Payment Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
          <DialogHeader className="px-6 pt-6 pb-2">
            <DialogTitle>Payment Details</DialogTitle>
            <DialogDescription>Complete information about this payment</DialogDescription>
          </DialogHeader>

          {selectedPayment && (
            <>
              <div className="px-6 py-4">
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-muted-foreground">Payment ID</Label>
                      <div className="font-medium">{selectedPayment.id}</div>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Student ID</Label>
                      <div className="font-medium">{selectedPayment.studentId}</div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-muted-foreground">Student Name</Label>
                    <div className="font-medium">{selectedPayment.name}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-muted-foreground">Department</Label>
                      <div>
                        <Badge
                          variant="outline"
                          className={`${updatedDepartmentColors[selectedPayment.department]} font-normal mt-1`}
                        >
                          {selectedPayment.department}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Semester</Label>
                      <div className="font-medium">{selectedPayment.semester}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-muted-foreground">Amount</Label>
                      <div className="font-medium">{formatCurrency(selectedPayment.amount)}</div>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Payment Type</Label>
                      <div className="font-medium">{selectedPayment.paymentType}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-muted-foreground">Date</Label>
                      <div className="font-medium">{format(new Date(selectedPayment.date), "dd MMMM yyyy")}</div>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Status</Label>
                      <div>
                        <Badge
                          variant="outline"
                          className={`${updatedStatusColors[selectedPayment.status]} font-normal mt-1`}
                        >
                          {selectedPayment.status.charAt(0).toUpperCase() + selectedPayment.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-muted-foreground">Email</Label>
                    <div className="font-medium">{selectedPayment.email}</div>
                  </div>

                  {selectedPayment.notes && (
                    <div>
                      <Label className="text-muted-foreground">Notes</Label>
                      <div className="font-medium">{selectedPayment.notes}</div>
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              <DialogFooter className="px-6 py-4">
                <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
                  Close
                </Button>
                {selectedPayment?.status === "pending" && (
                  <>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        setIsDetailsOpen(false)
                        setIsRejectOpen(true)
                      }}
                    >
                      Reject
                    </Button>
                    <Button
                      onClick={() => {
                        setIsDetailsOpen(false)
                        setIsVerifyOpen(true)
                      }}
                    >
                      Verify
                    </Button>
                  </>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Verify Payment Dialog */}
      <Dialog open={isVerifyOpen} onOpenChange={setIsVerifyOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Verify Payment</DialogTitle>
            <DialogDescription>Are you sure you want to verify this payment?</DialogDescription>
          </DialogHeader>

          {selectedPayment && (
            <div className="grid gap-4 py-4">
              <div>
                <Label className="text-muted-foreground">Student</Label>
                <div className="font-medium">{selectedPayment.name}</div>
              </div>
              <div>
                <Label className="text-muted-foreground">Payment ID</Label>
                <div className="font-medium">{selectedPayment.id}</div>
              </div>
              <div>
                <Label className="text-muted-foreground">Amount</Label>
                <div className="font-medium">{formatCurrency(selectedPayment.amount)}</div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsVerifyOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleVerify} className="bg-emerald-600 hover:bg-emerald-700">
              Confirm Verification
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Payment Dialog */}
      <Dialog open={isRejectOpen} onOpenChange={setIsRejectOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Reject Payment</DialogTitle>
            <DialogDescription>Please provide a reason for rejecting this payment.</DialogDescription>
          </DialogHeader>

          {selectedPayment && (
            <div className="grid gap-4 py-4">
              <div>
                <Label className="text-muted-foreground">Student</Label>
                <div className="font-medium">{selectedPayment.name}</div>
              </div>
              <div>
                <Label className="text-muted-foreground">Payment ID</Label>
                <div className="font-medium">{selectedPayment.id}</div>
              </div>
              <div>
                <Label className="text-muted-foreground">Amount</Label>
                <div className="font-medium">{formatCurrency(selectedPayment.amount)}</div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="reason">Reason for rejection</Label>
                <Textarea
                  id="reason"
                  placeholder="Enter the reason for rejection..."
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  className="resize-none"
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRejectOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleReject} disabled={!rejectReason.trim()}>
              Confirm Rejection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

