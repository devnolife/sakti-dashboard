"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CheckCircle,
  Wallet,
  CreditCardIcon,
  CalendarRange,
  FileText,
  Plus,
  DollarSign,
  AlertCircle,
  ChevronRight,
  ReceiptIcon,
  HistoryIcon,
  TrendingUp,
  Calendar,
  CircleDollarSign,
} from "lucide-react"
import { getPaymentHistory, getUnpaidPaymentItems } from "@/app/actions/payment-actions"
import type { Payment, PaymentItem } from "@/types/payment"
import { formatCurrency } from "@/lib/utils"
import RecentPaymentsTable from "./recent-payments-table"
import UpcomingPaymentsTable from "./upcoming-payments-table"
import PaymentHistoryDialog from "./payment-history-dialog"
import NewPaymentDialog from "./new-payment-dialog"

export default function PaymentDashboard() {
  const [paymentHistory, setPaymentHistory] = useState<Payment[]>([])
  const [unpaidItems, setUnpaidItems] = useState<PaymentItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [historyDialogOpen, setHistoryDialogOpen] = useState(false)
  const [newPaymentDialogOpen, setNewPaymentDialogOpen] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      setIsLoading(true)
      const [history, unpaid] = await Promise.all([getPaymentHistory(), getUnpaidPaymentItems()])
      setPaymentHistory(history)
      setUnpaidItems(unpaid)
    } catch (error) {
      console.error("Error fetching payment data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Calculate payment statistics
  const totalPaid = paymentHistory
    .filter((payment) => payment.status === "completed")
    .reduce((sum, payment) => sum + payment.amount, 0)

  const totalPending = paymentHistory
    .filter((payment) => payment.status === "pending")
    .reduce((sum, payment) => sum + payment.amount, 0)

  const totalUpcoming = unpaidItems.reduce((sum, item) => sum + item.amount, 0)

  const completedPayments = paymentHistory.filter((payment) => payment.status === "completed").length
  const pendingPayments = paymentHistory.filter((payment) => payment.status === "pending").length
  const upcomingPayments = unpaidItems.length

  // Get payment categories distribution
  const categoryDistribution = paymentHistory.reduce((acc: Record<string, number>, payment) => {
    if (!acc[payment.category]) {
      acc[payment.category] = 0
    }
    acc[payment.category]++
    return acc
  }, {})

  // Get the nearest due date from unpaid items
  const nearestDueDate =
    unpaidItems.length > 0
      ? unpaidItems.reduce((nearest, item) => {
          return new Date(item.dueDate) < new Date(nearest) ? item.dueDate : nearest
        }, unpaidItems[0].dueDate)
      : null

  // Get most recent payment
  const mostRecentPayment =
    paymentHistory.length > 0
      ? paymentHistory.sort((a, b) => {
          return new Date(b.paidDate || b.dueDate).getTime() - new Date(a.paidDate || a.dueDate).getTime()
        })[0]
      : null

  // Get upcoming payments sorted by due date
  const sortedUpcomingPayments = [...unpaidItems].sort((a, b) => {
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  })

  // Get recent payments
  const recentPayments = paymentHistory
    .sort((a, b) => {
      return new Date(b.paidDate || b.dueDate).getTime() - new Date(a.paidDate || a.dueDate).getTime()
    })
    .slice(0, 5)

  const handlePaymentComplete = () => {
    fetchData()
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="transition-shadow border-l-4 shadow-sm border-l-primary hover:shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="mb-1 text-sm font-medium text-muted-foreground">Total Dibayar</p>
                <h3 className="text-2xl font-bold text-primary">{formatCurrency(totalPaid)}</h3>
                <p className="mt-1 text-xs text-muted-foreground">Semester Ini</p>
              </div>
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                <CheckCircle className="w-5 h-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-shadow border-l-4 shadow-sm border-l-amber-500 hover:shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="mb-1 text-sm font-medium text-muted-foreground">Belum Dibayar</p>
                <h3 className="text-2xl font-bold text-amber-500">{formatCurrency(totalPending + totalUpcoming)}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{pendingPayments + upcomingPayments} Pembayaran</p>
              </div>
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-500/10">
                <AlertCircle className="w-5 h-5 text-amber-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-shadow border-l-4 shadow-sm border-l-green-500 hover:shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="mb-1 text-sm font-medium text-muted-foreground">Pembayaran Selesai</p>
                <h3 className="text-2xl font-bold text-green-500">
                  {completedPayments} / {completedPayments + pendingPayments + upcomingPayments}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {Math.round((completedPayments / (completedPayments + pendingPayments + upcomingPayments)) * 100)}%
                  Selesai
                </p>
              </div>
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500/10">
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-shadow border-l-4 shadow-sm border-l-blue-500 hover:shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="mb-1 text-sm font-medium text-muted-foreground">Jatuh Tempo Terdekat</p>
                <h3 className="text-2xl font-bold text-blue-500">
                  {nearestDueDate
                    ? new Date(nearestDueDate).toLocaleDateString("id-ID", { day: "numeric", month: "short" })
                    : "-"}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {nearestDueDate
                    ? (() => {
                        const dueDate = new Date(nearestDueDate)
                        const today = new Date()
                        const diffTime = dueDate.getTime() - today.getTime()
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
                        return diffDays < 0 ? "Terlambat" : diffDays === 0 ? "Hari Ini" : `${diffDays} Hari Lagi`
                      })()
                    : "Tidak Ada"}
                </p>
              </div>
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/10">
                <Calendar className="w-5 h-5 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column - Payment Tabs */}
        <div className="space-y-6 lg:col-span-2">
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Pembayaran</CardTitle>
                <Button onClick={() => setNewPaymentDialogOpen(true)} size="sm" className="h-8">
                  <Plus className="w-4 h-4 mr-1" />
                  Bayar Sekarang
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="upcoming" className="w-full">
                <div className="px-6 border-b">
                  <TabsList className="justify-start w-full h-12 p-0 bg-transparent">
                    <TabsTrigger
                      value="upcoming"
                      className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12"
                    >
                      Akan Datang ({upcomingPayments})
                    </TabsTrigger>
                    <TabsTrigger
                      value="recent"
                      className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12"
                    >
                      Terbaru ({recentPayments.length})
                    </TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="upcoming" className="p-6 pt-4 m-0">
                  <UpcomingPaymentsTable payments={sortedUpcomingPayments as unknown as Payment[]} />
                </TabsContent>
                <TabsContent value="recent" className="p-6 pt-4 m-0">
                  <RecentPaymentsTable payments={recentPayments} />
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="px-6 py-4 border-t">
              <Button variant="ghost" size="sm" className="ml-auto" onClick={() => setHistoryDialogOpen(true)}>
                Lihat Semua Riwayat
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </CardFooter>
          </Card>

          {/* Payment Progress */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Progress Pembayaran Semester</CardTitle>
              <CardDescription>Ringkasan pembayaran semester ini</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress Keseluruhan</span>
                    <span className="font-medium">
                      {Math.round((completedPayments / (completedPayments + pendingPayments + upcomingPayments)) * 100)}
                      %
                    </span>
                  </div>
                  <Progress
                    value={Math.round(
                      (completedPayments / (completedPayments + pendingPayments + upcomingPayments)) * 100,
                    )}
                    className="h-2"
                  />
                </div>

                {/* Category Distribution */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Distribusi Kategori</h4>
                  {Object.entries(categoryDistribution).length > 0 ? (
                    <div className="space-y-3">
                      {Object.entries(categoryDistribution).map(([category, count]) => {
                        const percentage = Math.round((count / paymentHistory.length) * 100)
                        let color = ""
                        let icon = null

                        switch (category) {
                          case "laboratory":
                            color = "bg-primary"
                            icon = <Flask className="w-4 h-4 text-primary" />
                            break
                          case "exam":
                            color = "bg-secondary"
                            icon = <FileText className="w-4 h-4 text-secondary" />
                            break
                          case "kkp":
                            color = "bg-amber-500"
                            icon = <Briefcase className="w-4 h-4 text-amber-500" />
                            break
                          case "tuition":
                            color = "bg-blue-500"
                            icon = <CreditCardIcon className="w-4 h-4 text-blue-500" />
                            break
                          default:
                            color = "bg-gray-500"
                            icon = <DollarSign className="w-4 h-4 text-gray-500" />
                        }

                        return (
                          <div key={category} className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center">
                                {icon}
                                <span className="ml-2 capitalize">
                                  {category === "laboratory"
                                    ? "Laboratorium"
                                    : category === "exam"
                                      ? "Ujian"
                                      : category === "kkp"
                                        ? "KKP"
                                        : category === "tuition"
                                          ? "SPP"
                                          : category}
                                </span>
                              </div>
                              <span className="font-medium">{percentage}%</span>
                            </div>
                            <div className="w-full h-2 overflow-hidden rounded-full bg-muted">
                              <div className={`h-full ${color}`} style={{ width: `${percentage}%` }}></div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-4 text-center">
                      <p className="text-sm text-muted-foreground">Belum ada data pembayaran</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Quick Actions and Info */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Aksi Cepat</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="flex flex-col items-center justify-center h-auto gap-2 px-2 py-4 hover:bg-primary/5 hover:text-primary hover:border-primary/30"
                  onClick={() => setNewPaymentDialogOpen(true)}
                >
                  <CircleDollarSign className="w-6 h-6 text-primary" />
                  <span className="text-xs font-medium">Bayar Baru</span>
                </Button>

                <Button
                  variant="outline"
                  className="flex flex-col items-center justify-center h-auto gap-2 px-2 py-4 hover:bg-secondary/5 hover:text-secondary hover:border-secondary/30"
                  onClick={() => setHistoryDialogOpen(true)}
                >
                  <HistoryIcon className="w-6 h-6 text-secondary" />
                  <span className="text-xs font-medium">Riwayat</span>
                </Button>

                <Button
                  variant="outline"
                  className="flex flex-col items-center justify-center h-auto gap-2 px-2 py-4 hover:bg-green-500/5 hover:text-green-500 hover:border-green-500/30"
                >
                  <Flask className="w-6 h-6 text-green-500" />
                  <span className="text-xs font-medium">Laboratorium</span>
                </Button>

                <Button
                  variant="outline"
                  className="flex flex-col items-center justify-center h-auto gap-2 px-2 py-4 hover:bg-blue-500/5 hover:text-blue-500 hover:border-blue-500/30"
                >
                  <CalendarRange className="w-6 h-6 text-blue-500" />
                  <span className="text-xs font-medium">Ujian</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Metode Pembayaran</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 transition-colors border rounded-md cursor-pointer bg-card hover:bg-accent/5">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                    <CreditCardIcon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Virtual Account</p>
                    <p className="text-xs text-muted-foreground">Transfer melalui ATM, Mobile Banking</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 transition-colors border rounded-md cursor-pointer bg-card hover:bg-accent/5">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500/10">
                    <Wallet className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="font-medium">E-Wallet</p>
                    <p className="text-xs text-muted-foreground">GoPay, OVO, DANA, LinkAja</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 transition-colors border rounded-md cursor-pointer bg-card hover:bg-accent/5">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/10">
                    <ReceiptIcon className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="font-medium">Minimarket</p>
                    <p className="text-xs text-muted-foreground">Alfamart, Indomaret</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="px-6 py-4 border-t">
              <Button variant="ghost" size="sm" className="w-full" onClick={() => setNewPaymentDialogOpen(true)}>
                Lihat Semua Metode
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </CardFooter>
          </Card>

          {/* Recent Activity */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Aktivitas Terbaru</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              {mostRecentPayment ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 border rounded-md bg-card">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500/10">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium">{mostRecentPayment.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(mostRecentPayment.paidDate || mostRecentPayment.dueDate).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <Badge className="ml-auto">{formatCurrency(mostRecentPayment.amount)}</Badge>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <p className="text-sm text-muted-foreground">Belum ada aktivitas</p>
                </div>
              )}
            </CardContent>
            <CardFooter className="px-6 py-4 border-t">
              <Button variant="ghost" size="sm" className="w-full" onClick={() => setHistoryDialogOpen(true)}>
                Lihat Semua Aktivitas
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Dialogs */}
      <PaymentHistoryDialog open={historyDialogOpen} onOpenChange={setHistoryDialogOpen} />
      <NewPaymentDialog
        open={newPaymentDialogOpen}
        onOpenChange={setNewPaymentDialogOpen}
        onPaymentComplete={handlePaymentComplete}
      />
    </div>
  )
}

// Using a separate component to avoid name collision
function Flask(props: React.ComponentProps<typeof CreditCardIcon>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9 3h6v3H9z" />
      <path d="M10 9h4" />
      <path d="M10 3v3" />
      <path d="M14 3v3" />
      <path d="M4 13.4V20a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6.6a8 8 0 0 0-4.5-7.2v-.2h-7v.2A8 8 0 0 0 4 13.4z" />
    </svg>
  )
}

function Briefcase(props: React.ComponentProps<typeof CreditCardIcon>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  )
}

