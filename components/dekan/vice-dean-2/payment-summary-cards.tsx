"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpRight, CheckCircle2, Clock, CreditCard, Users } from "lucide-react"

interface PaymentSummaryCardsProps {
  programId: string
  paymentType: string
}

export function PaymentSummaryCards({ programId, paymentType }: PaymentSummaryCardsProps) {
  // In a real app, this data would come from an API call based on the programId and paymentType
  const summaryData = {
    totalStudents: 1248,
    totalPayments: "Rp 936,000,000",
    completedPayments: 1052,
    pendingPayments: 196,
    percentComplete: 84,
    percentIncrease: 12,
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="overflow-hidden border-none bg-gradient-to-br from-blue-50 to-blue-100 shadow-md transition-all hover:shadow-lg dark:from-blue-950/40 dark:to-blue-900/40">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-800/50">
              <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex items-center text-xs text-blue-600/80 dark:text-blue-400/80">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>+{summaryData.percentIncrease}%</span>
            </div>
          </div>
          <div className="mt-3">
            <p className="text-sm font-medium text-blue-600/80 dark:text-blue-400/80">Total Mahasiswa</p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{summaryData.totalStudents}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-none bg-gradient-to-br from-green-50 to-green-100 shadow-md transition-all hover:shadow-lg dark:from-green-950/40 dark:to-green-900/40">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="rounded-full bg-green-100 p-2 dark:bg-green-800/50">
              <CreditCard className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex items-center text-xs text-green-600/80 dark:text-green-400/80">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>+8%</span>
            </div>
          </div>
          <div className="mt-3">
            <p className="text-sm font-medium text-green-600/80 dark:text-green-400/80">Total Pembayaran</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{summaryData.totalPayments}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-none bg-gradient-to-br from-purple-50 to-purple-100 shadow-md transition-all hover:shadow-lg dark:from-purple-950/40 dark:to-purple-900/40">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-800/50">
              <CheckCircle2 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="flex items-center text-xs text-purple-600/80 dark:text-purple-400/80">
              <span>{summaryData.percentComplete}%</span>
            </div>
          </div>
          <div className="mt-3">
            <p className="text-sm font-medium text-purple-600/80 dark:text-purple-400/80">Pembayaran Selesai</p>
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{summaryData.completedPayments}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-none bg-gradient-to-br from-amber-50 to-amber-100 shadow-md transition-all hover:shadow-lg dark:from-amber-950/40 dark:to-amber-900/40">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="rounded-full bg-amber-100 p-2 dark:bg-amber-800/50">
              <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-sm font-medium text-amber-600/80 dark:text-amber-400/80">Pembayaran Tertunda</p>
            <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{summaryData.pendingPayments}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

