"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { mockStudentPayments } from "./mock-data-payment"
import { ArrowDown, ArrowUp, Ban, Clock } from "lucide-react"
import { CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"

// Animated counter component
function AnimatedCounter({
  value,
  formatter = (v: number) => Math.round(v).toString(),
  duration = 1.5,
  delay = 0,
}: {
  value: number
  formatter?: (v: number) => string
  duration?: number
  delay?: number
}) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    let startTime: number | null = null
    let animationFrame: number

    const updateValue = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      setDisplayValue(progress * value)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateValue)
      }
    }

    // Delay the start of the animation
    const timeoutId = setTimeout(() => {
      animationFrame = requestAnimationFrame(updateValue)
    }, delay * 1000)

    return () => {
      cancelAnimationFrame(animationFrame)
      clearTimeout(timeoutId)
    }
  }, [value, duration, delay])

  return <>{formatter(displayValue)}</>
}

export function PaymentStats() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

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

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        delay: 0.1 * i,
      },
    }),
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Pending Verifications Card */}
      <motion.div custom={1} variants={cardVariants} initial="hidden" animate="visible">
        <Card className="overflow-hidden border-none shadow-sm bg-gradient-to-br from-amber-50 via-amber-50 to-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-amber-800">Pending Verifications</CardTitle>
            <div className="p-2 rounded-full bg-amber-100 text-amber-600">
              <Clock className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <>
                <Skeleton className="w-1/4 h-8 mb-2" />
                <Skeleton className="w-3/4 h-4" />
              </>
            ) : (
              <>
                <div className="text-2xl font-bold text-amber-900">
                  <AnimatedCounter value={pendingPayments} />
                </div>
                <div className="flex items-center mt-1 text-xs">
                  <div className="text-muted-foreground">
                    <AnimatedCounter value={pendingAmount} formatter={(v) => formatCurrency(v)} delay={0.3} /> pending
                  </div>
                  <div
                    className={`ml-2 flex items-center ${pendingChange > 0 ? "text-amber-600" : "text-emerald-600"}`}
                  >
                    {pendingChange > 0 ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                    {Math.abs(pendingChange)}%
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Verified Payments Card */}
      <motion.div custom={2} variants={cardVariants} initial="hidden" animate="visible">
        <Card className="overflow-hidden border-none shadow-sm bg-gradient-to-br from-emerald-50 via-emerald-50 to-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-emerald-800">Verified Payments</CardTitle>
            <div className="p-2 rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <>
                <Skeleton className="w-1/4 h-8 mb-2" />
                <Skeleton className="w-3/4 h-4" />
              </>
            ) : (
              <>
                <div className="text-2xl font-bold text-emerald-900">
                  <AnimatedCounter value={verifiedPayments} />
                </div>
                <div className="flex items-center mt-1 text-xs">
                  <div className="text-muted-foreground">
                    {Math.round((verifiedPayments / totalPayments) * 100)}% of total
                  </div>
                  <div
                    className={`ml-2 flex items-center ${verifiedChange > 0 ? "text-emerald-600" : "text-rose-600"}`}
                  >
                    {verifiedChange > 0 ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                    {Math.abs(verifiedChange)}%
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Rejected Payments Card */}
      <motion.div custom={3} variants={cardVariants} initial="hidden" animate="visible">
        <Card className="overflow-hidden border-none shadow-sm bg-gradient-to-br from-rose-50 via-rose-50 to-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-rose-800">Rejected Payments</CardTitle>
            <div className="p-2 rounded-full bg-rose-100 text-rose-600">
              <Ban className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <>
                <Skeleton className="w-1/4 h-8 mb-2" />
                <Skeleton className="w-3/4 h-4" />
              </>
            ) : (
              <>
                <div className="text-2xl font-bold text-rose-900">
                  <AnimatedCounter value={rejectedPayments} />
                </div>
                <div className="flex items-center mt-1 text-xs">
                  <div className="text-muted-foreground">
                    {Math.round((rejectedPayments / totalPayments) * 100)}% of total
                  </div>
                  <div
                    className={`ml-2 flex items-center ${rejectedChange > 0 ? "text-rose-600" : "text-emerald-600"}`}
                  >
                    {rejectedChange > 0 ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                    {Math.abs(rejectedChange)}%
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Total Amount Card */}
      <motion.div custom={4} variants={cardVariants} initial="hidden" animate="visible">
        <Card className="overflow-hidden border-none shadow-sm bg-gradient-to-br from-blue-50 via-blue-50 to-white">
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
            {isLoading ? (
              <>
                <Skeleton className="w-1/2 h-8 mb-2" />
                <Skeleton className="w-1/3 h-4" />
              </>
            ) : (
              <>
                <div className="text-2xl font-bold text-blue-900">
                  <AnimatedCounter value={totalAmount} formatter={(v) => formatCurrency(v)} />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">Across {totalPayments} payments</p>
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

