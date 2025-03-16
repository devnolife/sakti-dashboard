"use client"

import { useState, useEffect } from "react"
import { PaymentListManager } from "@/components/payment/payment-list-manager"
import { Skeleton } from "@/components/ui/skeleton"
import { motion, AnimatePresence } from "framer-motion"

export default function PaymentManagementPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Payment Management</h2>
            <p className="text-muted-foreground">
              View, create, and update payment records for students across all study programs
            </p>
          </div>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key="payment-manager"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {isLoading ? (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {Array(4).fill(0).map((_, i) => (
                  <Skeleton key={i} className="w-full h-32" />
                ))}
              </div>
              <Skeleton className="h-[600px] w-full" />
            </div>
          ) : (
            <PaymentListManager />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

