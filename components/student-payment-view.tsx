"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Download, CreditCard, HelpCircle, AlertCircle, FileText } from "lucide-react"

// Mock data for student payments
const mockStudentPayments = [
  {
    id: "PAY001",
    description: "Tuition Fee - Semester 2023/2024-2",
    amount: 5000000,
    status: "paid",
    dueDate: "2023-02-15",
    paymentDate: "2023-02-10",
  },
  {
    id: "PAY002",
    description: "Laboratory Fee - Semester 2023/2024-2",
    amount: 750000,
    status: "paid",
    dueDate: "2023-02-15",
    paymentDate: "2023-02-10",
  },
  {
    id: "PAY003",
    description: "Library Fee - Semester 2023/2024-2",
    amount: 250000,
    status: "paid",
    dueDate: "2023-02-15",
    paymentDate: "2023-02-10",
  },
  {
    id: "PAY004",
    description: "Student Activity Fee - Semester 2023/2024-2",
    amount: 500000,
    status: "unpaid",
    dueDate: "2023-03-15",
    paymentDate: null,
  },
  {
    id: "PAY005",
    description: "Development Fee - Annual 2023/2024",
    amount: 1500000,
    status: "partial",
    dueDate: "2023-04-15",
    paymentDate: "2023-02-20",
    paidAmount: 750000,
  },
]

// Mock data for payment history
const mockPaymentHistory = [
  {
    id: "TRX001",
    description: "Tuition Fee - Semester 2023/2024-1",
    amount: 5000000,
    status: "paid",
    paymentDate: "2022-08-10",
    method: "Bank Transfer",
    reference: "BT12345678",
  },
  {
    id: "TRX002",
    description: "Laboratory Fee - Semester 2023/2024-1",
    amount: 750000,
    status: "paid",
    paymentDate: "2022-08-10",
    method: "Bank Transfer",
    reference: "BT12345678",
  },
  {
    id: "TRX003",
    description: "Library Fee - Semester 2023/2024-1",
    amount: 250000,
    status: "paid",
    paymentDate: "2022-08-10",
    method: "Bank Transfer",
    reference: "BT12345678",
  },
  {
    id: "TRX004",
    description: "Student Activity Fee - Semester 2023/2024-1",
    amount: 500000,
    status: "paid",
    paymentDate: "2022-08-15",
    method: "Online Payment",
    reference: "OP87654321",
  },
  {
    id: "TRX005",
    description: "Development Fee - Annual 2022/2023",
    amount: 1500000,
    status: "paid",
    paymentDate: "2022-09-05",
    method: "Online Payment",
    reference: "OP98765432",
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

// Calculate total and paid amounts
const totalAmount = mockStudentPayments.reduce((sum, payment) => sum + payment.amount, 0)
const paidAmount = mockStudentPayments.reduce((sum, payment) => {
  if (payment.status === "paid") {
    return sum + payment.amount
  } else if (payment.status === "partial" && payment.paidAmount) {
    return sum + payment.paidAmount
  }
  return sum
}, 0)
const paymentPercentage = Math.round((paidAmount / totalAmount) * 100)

export function StudentPaymentView() {
  const [activeTab, setActiveTab] = useState("current")
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false)
  const [isHelpDialogOpen, setIsHelpDialogOpen] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState<any>(null)

  // Handle payment button click
  const handlePaymentClick = (payment: any) => {
    setSelectedPayment(payment)
    setIsPaymentDialogOpen(true)
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
        <CardHeader>
          <CardTitle>Payment Summary</CardTitle>
          <CardDescription>Your current payment status for Semester 2023/2024-2</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(totalAmount)}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Paid Amount</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(paidAmount)}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Remaining</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(totalAmount - paidAmount)}</div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Payment Progress</span>
              <span>{paymentPercentage}%</span>
            </div>
            <Progress value={paymentPercentage} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="current" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="current">Current Payments</TabsTrigger>
          <TabsTrigger value="history">Payment History</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Current Payment Items</CardTitle>
              <CardDescription>Payment items for the current semester</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Payment ID</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Payment Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockStudentPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.id}</TableCell>
                      <TableCell>{payment.description}</TableCell>
                      <TableCell>{formatCurrency(payment.amount)}</TableCell>
                      <TableCell>{renderStatusBadge(payment.status)}</TableCell>
                      <TableCell>{formatDate(payment.dueDate)}</TableCell>
                      <TableCell>{formatDate(payment.paymentDate)}</TableCell>
                      <TableCell className="text-right">
                        {payment.status === "unpaid" || payment.status === "partial" ? (
                          <Button size="sm" onClick={() => handlePaymentClick(payment)}>
                            Pay Now
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            Receipt
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setIsHelpDialogOpen(true)}>
                <HelpCircle className="mr-2 h-4 w-4" />
                Need Help?
              </Button>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Download Invoice
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>Record of your past payments</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Transaction ID</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment Date</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Reference</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockPaymentHistory.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.id}</TableCell>
                      <TableCell>{payment.description}</TableCell>
                      <TableCell>{formatCurrency(payment.amount)}</TableCell>
                      <TableCell>{renderStatusBadge(payment.status)}</TableCell>
                      <TableCell>{formatDate(payment.paymentDate)}</TableCell>
                      <TableCell>{payment.method}</TableCell>
                      <TableCell>{payment.reference}</TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="outline">
                          <Download className="mr-2 h-4 w-4" />
                          Receipt
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Payment Dialog */}
      {selectedPayment && (
        <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Make Payment</DialogTitle>
              <DialogDescription>Complete your payment for {selectedPayment.description}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="rounded-lg bg-muted p-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Payment ID:</span>
                    <span className="text-sm font-medium">{selectedPayment.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Description:</span>
                    <span className="text-sm font-medium">{selectedPayment.description}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Amount:</span>
                    <span className="text-sm font-medium">
                      {formatCurrency(
                        selectedPayment.status === "partial"
                          ? selectedPayment.amount - (selectedPayment.paidAmount || 0)
                          : selectedPayment.amount,
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Due Date:</span>
                    <span className="text-sm font-medium">{formatDate(selectedPayment.dueDate)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Select Payment Method</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="justify-start">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Credit Card
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <FileText className="mr-2 h-4 w-4" />
                    Bank Transfer
                  </Button>
                </div>
              </div>

              <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-yellow-800">Payment Notice</p>
                    <p className="text-xs text-yellow-700">
                      Please complete your payment before the due date to avoid late payment penalties.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsPaymentDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsPaymentDialogOpen(false)}>Proceed to Payment</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Help Dialog */}
      <Dialog open={isHelpDialogOpen} onOpenChange={setIsHelpDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Payment Help</DialogTitle>
            <DialogDescription>Get assistance with your payments</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Payment Methods</h4>
              <p className="text-sm text-muted-foreground">
                We accept payments through credit card, bank transfer, and online payment platforms.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Payment Deadlines</h4>
              <p className="text-sm text-muted-foreground">
                All payments must be completed by the due date indicated. Late payments may incur additional fees.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Contact Finance Office</h4>
              <p className="text-sm text-muted-foreground">
                For any payment-related inquiries, please contact the finance office:
              </p>
              <p className="text-sm">
                Email: finance@university.edu
                <br />
                Phone: (123) 456-7890
                <br />
                Office Hours: Monday-Friday, 8:00 AM - 4:00 PM
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsHelpDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

