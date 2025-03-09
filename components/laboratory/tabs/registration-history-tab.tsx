"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, Receipt, CreditCard, AlertCircle, ChevronDown } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "@/components/ui/use-toast"

const registrationHistory = [
  {
    id: "reg-1",
    labTitle: "Computer Networks Laboratory",
    registrationDate: "August 15, 2023",
    status: "active",
    paymentAmount: 150000,
    paymentMethod: "Credit Card",
    transactionId: "TRX-123456",
    paymentStatus: "paid",
    paymentDate: "August 15, 2023",
    semester: "Odd 2023/2024",
    receiptUrl: "#",
    color: "blue",
  },
  {
    id: "reg-2",
    labTitle: "Database Systems Laboratory",
    registrationDate: "August 16, 2023",
    status: "active",
    paymentAmount: 150000,
    paymentMethod: "Bank Transfer",
    transactionId: "TRX-123457",
    paymentStatus: "paid",
    paymentDate: "August 16, 2023",
    semester: "Odd 2023/2024",
    receiptUrl: "#",
    color: "green",
  },
  {
    id: "reg-3",
    labTitle: "Web Development Laboratory",
    registrationDate: "May 10, 2023",
    status: "completed",
    paymentAmount: 150000,
    paymentMethod: "E-Wallet",
    transactionId: "TRX-112233",
    completionDate: "September 30, 2023",
    paymentStatus: "paid",
    paymentDate: "May 10, 2023",
    semester: "Even 2022/2023",
    receiptUrl: "#",
    color: "orange",
  },
  {
    id: "reg-4",
    labTitle: "Mobile App Development Laboratory",
    registrationDate: "April 5, 2023",
    status: "cancelled",
    paymentAmount: 150000,
    paymentMethod: "Credit Card",
    transactionId: "TRX-998877",
    cancellationDate: "April 8, 2023",
    refundStatus: "Refunded",
    refundDate: "April 10, 2023",
    refundAmount: 150000,
    paymentStatus: "refunded",
    paymentDate: "April 5, 2023",
    semester: "Even 2022/2023",
    receiptUrl: "#",
    cancellationReason: "Schedule conflict",
    color: "red",
  },
  {
    id: "reg-5",
    labTitle: "Artificial Intelligence Laboratory",
    registrationDate: "August 20, 2023",
    status: "pending",
    paymentAmount: 175000,
    paymentMethod: "Pending",
    paymentStatus: "pending",
    semester: "Odd 2023/2024",
    paymentDueDate: "August 27, 2023",
    color: "purple",
  },
]

export function RegistrationHistoryTab() {
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value)
  }

  // Get status badge variant
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "completed":
        return "success"
      case "cancelled":
        return "destructive"
      case "pending":
        return "warning"
      default:
        return "outline"
    }
  }

  // Get payment status badge variant
  const getPaymentStatusVariant = (status: string) => {
    switch (status) {
      case "paid":
        return "success"
      case "pending":
        return "warning"
      case "refunded":
        return "destructive"
      default:
        return "outline"
    }
  }

  // Helper function to get color gradient based on lab color
  const getColorGradient = (color: string) => {
    switch (color) {
      case "blue":
        return "from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30"
      case "green":
        return "from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30"
      case "purple":
        return "from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30"
      case "orange":
        return "from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30"
      case "red":
        return "from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/30"
      case "teal":
        return "from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/30"
      default:
        return "from-gray-50 to-slate-50 dark:from-gray-950/30 dark:to-slate-950/30"
    }
  }

  // Direct toggle function for each item
  const handleToggle = (id: string) => {
    setExpandedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <div className="space-y-8">
      <Card className="overflow-hidden border-none shadow-sm bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-gray-900/80">
        <CardHeader>
          <CardTitle>Registration History</CardTitle>
          <CardDescription>View your laboratory registration history and payment details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <AnimatePresence>
              {registrationHistory.map((registration, index) => (
                <motion.div
                  key={registration.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <div
                    className={`overflow-hidden border rounded-lg shadow-sm bg-gradient-to-br ${getColorGradient(registration.color || "default")} mb-4`}
                  >
                    <div className="flex items-center justify-between p-4">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{registration.labTitle}</h3>
                          <Badge variant={getStatusVariant(registration.status)} className="shadow-sm">
                            {registration.status.charAt(0).toUpperCase() + registration.status.slice(1)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Registered on {registration.registrationDate}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getPaymentStatusVariant(registration.paymentStatus)} className="shadow-sm">
                          {registration.paymentStatus.charAt(0).toUpperCase() + registration.paymentStatus.slice(1)}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-8 h-8 p-0"
                          onClick={() => handleToggle(registration.id)}
                          aria-expanded={expandedItems.includes(registration.id)}
                          aria-controls={`content-${registration.id}`}
                        >
                          <ChevronDown
                            className={`h-4 w-4 transition-transform duration-200 ${expandedItems.includes(registration.id) ? "rotate-180" : ""}`}
                          />
                          <span className="sr-only">Toggle details</span>
                        </Button>
                      </div>
                    </div>

                    {expandedItems.includes(registration.id) && (
                      <>
                        <Separator className="bg-white/20 dark:bg-gray-800/50" />
                        <div id={`content-${registration.id}`} className="p-4 space-y-4">
                          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                              <h4 className="mb-2 text-sm font-medium">Payment Details</h4>
                              <div className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Amount:</span>
                                  <span className="font-medium">{formatCurrency(registration.paymentAmount)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Method:</span>
                                  <span>{registration.paymentMethod}</span>
                                </div>
                                {registration.transactionId && (
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Transaction ID:</span>
                                    <span className="font-mono text-xs">{registration.transactionId}</span>
                                  </div>
                                )}
                                {registration.paymentDate && (
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Payment Date:</span>
                                    <span>{registration.paymentDate}</span>
                                  </div>
                                )}
                                {registration.paymentDueDate && (
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Payment Due Date:</span>
                                    <span className="text-yellow-600 dark:text-yellow-400">
                                      {registration.paymentDueDate}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div>
                              <h4 className="mb-2 text-sm font-medium">Status Information</h4>
                              <div className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Semester:</span>
                                  <span>{registration.semester}</span>
                                </div>

                                {registration.status === "active" && (
                                  <div className="flex items-center text-green-600 dark:text-green-400">
                                    <CheckCircle2 className="w-4 h-4 mr-1" />
                                    <span>Currently active</span>
                                  </div>
                                )}

                                {registration.status === "completed" && (
                                  <div className="flex items-center text-green-600 dark:text-green-400">
                                    <CheckCircle2 className="w-4 h-4 mr-1" />
                                    <span>Completed on {registration.completionDate}</span>
                                  </div>
                                )}

                                {registration.status === "cancelled" && (
                                  <>
                                    <div className="flex items-center text-red-600 dark:text-red-400">
                                      <XCircle className="w-4 h-4 mr-1" />
                                      <span>Cancelled on {registration.cancellationDate}</span>
                                    </div>
                                    {registration.cancellationReason && (
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Reason:</span>
                                        <span>{registration.cancellationReason}</span>
                                      </div>
                                    )}
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Refund Status:</span>
                                      <span>{registration.refundStatus}</span>
                                    </div>
                                    {registration.refundDate && (
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Refund Date:</span>
                                        <span>{registration.refundDate}</span>
                                      </div>
                                    )}
                                    {registration.refundAmount && (
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Refund Amount:</span>
                                        <span>{formatCurrency(registration.refundAmount)}</span>
                                      </div>
                                    )}
                                  </>
                                )}

                                {registration.status === "pending" && (
                                  <div className="flex items-center text-yellow-600 dark:text-yellow-400">
                                    <AlertCircle className="w-4 h-4 mr-1" />
                                    <span>Pending payment</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-end gap-2">
                            {registration.status === "pending" && (
                              <Button
                                className="group"
                                onClick={() => {
                                  toast({
                                    title: "Payment initiated",
                                    description: `Payment process started for ${registration.labTitle}`,
                                  })
                                }}
                              >
                                <CreditCard className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
                                Complete Payment
                              </Button>
                            )}

                            {registration.receiptUrl && registration.paymentStatus === "paid" && (
                              <Button
                                variant="outline"
                                className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800"
                                onClick={() => {
                                  toast({
                                    title: "Receipt opened",
                                    description: "Opening receipt in a new window",
                                  })
                                }}
                              >
                                <Receipt className="w-4 h-4 mr-2" />
                                View Receipt
                              </Button>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

