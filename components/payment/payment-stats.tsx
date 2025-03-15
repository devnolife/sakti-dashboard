"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockStudentPayments } from "./mock-data-payment"
import { ArrowDown, ArrowUp, Ban, CheckCircle, Clock } from "lucide-react"

export function PaymentStats() {
  // Calculate statistics from mock data
  const totalPayments = mockStudentPayments.length
  const pendingPayments = mockStudentPayments.filter((p) => p.status === "pending").length
  const verifiedPayments = mockStudentPayments.filter((p) => p.status === "verified").length
  const rejectedPayments = mockStudentPayments.filter((p) => p.status === "rejected").length

  const totalAmount = mockStudentPayments.reduce((sum, payment) => sum + payment.amount, 0)
  const pendingAmount = mockStudentPayments
    .filter((p) => p.status === "pending")
    .reduce((sum, payment) => sum + payment.amount, 0)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Calculate percentage change (mock data for demonstration)
  const pendingChange = 12.5
  const verifiedChange = 8.3
  const rejectedChange = -4.2

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="overflow-hidden border-none shadow-sm bg-gradient-to-br from-amber-50 to-white">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-amber-800">Pending Verifications</CardTitle>
          <div className="p-2 rounded-full bg-amber-100 text-amber-600">
            <Clock className="w-4 h-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-amber-900">{pendingPayments}</div>
          <div className="flex items-center mt-1 text-xs">
            <div className="text-muted-foreground">{formatCurrency(pendingAmount)} pending</div>
            <div className={`ml-2 flex items-center ${pendingChange > 0 ? "text-amber-600" : "text-emerald-600"}`}>
              {pendingChange > 0 ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
              {Math.abs(pendingChange)}%
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-none shadow-sm bg-gradient-to-br from-emerald-50 to-white">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-emerald-800">Verified Payments</CardTitle>
          <div className="p-2 rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircle className="w-4 h-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-emerald-900">{verifiedPayments}</div>
          <div className="flex items-center mt-1 text-xs">
            <div className="text-muted-foreground">
              {Math.round((verifiedPayments / totalPayments) * 100)}% of total
            </div>
            <div className={`ml-2 flex items-center ${verifiedChange > 0 ? "text-emerald-600" : "text-rose-600"}`}>
              {verifiedChange > 0 ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
              {Math.abs(verifiedChange)}%
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-none shadow-sm bg-gradient-to-br from-rose-50 to-white">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-rose-800">Rejected Payments</CardTitle>
          <div className="p-2 rounded-full bg-rose-100 text-rose-600">
            <Ban className="w-4 h-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-rose-900">{rejectedPayments}</div>
          <div className="flex items-center mt-1 text-xs">
            <div className="text-muted-foreground">
              {Math.round((rejectedPayments / totalPayments) * 100)}% of total
            </div>
            <div className={`ml-2 flex items-center ${rejectedChange > 0 ? "text-rose-600" : "text-emerald-600"}`}>
              {rejectedChange > 0 ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
              {Math.abs(rejectedChange)}%
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-none shadow-sm bg-gradient-to-br from-blue-50 to-white">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-blue-800">Total Amount</CardTitle>
          <div className="p-2 text-blue-600 bg-blue-100 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-900">{formatCurrency(totalAmount)}</div>
          <p className="mt-1 text-xs text-muted-foreground">Across {totalPayments} payments</p>
        </CardContent>
      </Card>
    </div>
  )
}

