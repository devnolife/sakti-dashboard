"use client"

import { useState, useEffect } from "react"
import { PaymentVerificationTable } from "@/components/payment/verification-table"
import { PaymentFilters } from "@/components/payment/payment-filters"
import { PaymentStats } from "@/components/payment/payment-stats"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { motion, AnimatePresence } from "framer-motion"

export default function PaymentVerificationPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {

    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col gap-6">
      <PaymentStats />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <Card className="p-6 border-none shadow-sm bg-white/50 backdrop-blur-sm">
          <Tabs defaultValue="all" className="mb-6">
            <TabsList className="bg-muted/50">
              <TabsTrigger value="all">All Payments</TabsTrigger>
              <TabsTrigger value="pending" className="text-amber-600">
                Pending
              </TabsTrigger>
              <TabsTrigger value="verified" className="text-emerald-600">
                Verified
              </TabsTrigger>
              <TabsTrigger value="rejected" className="text-rose-600">
                Rejected
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key="all-content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {isLoading ? (
                    <>
                      <div className="mb-6 space-y-4">
                        <div className="flex flex-col gap-3 sm:flex-row">
                          <Skeleton className="flex-1 h-10" />
                          <Skeleton className="w-32 h-10" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Skeleton className="w-full h-12" />
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <Skeleton key={i} className="w-full h-16" />
                          ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <PaymentFilters />
                      <PaymentVerificationTable />
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </TabsContent>
            <TabsContent value="pending" className="mt-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key="pending-content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {isLoading ? (
                    <>
                      <div className="mb-6 space-y-4">
                        <div className="flex flex-col gap-3 sm:flex-row">
                          <Skeleton className="flex-1 h-10" />
                          <Skeleton className="w-32 h-10" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Skeleton className="w-full h-12" />
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <Skeleton key={i} className="w-full h-16" />
                          ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <PaymentFilters />
                      <PaymentVerificationTable filterStatus="pending" />
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </TabsContent>
            <TabsContent value="verified" className="mt-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key="verified-content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {isLoading ? (
                    <>
                      <div className="mb-6 space-y-4">
                        <div className="flex flex-col gap-3 sm:flex-row">
                          <Skeleton className="flex-1 h-10" />
                          <Skeleton className="w-32 h-10" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Skeleton className="w-full h-12" />
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <Skeleton key={i} className="w-full h-16" />
                          ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <PaymentFilters />
                      <PaymentVerificationTable filterStatus="verified" />
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </TabsContent>
            <TabsContent value="rejected" className="mt-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key="rejected-content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {isLoading ? (
                    <>
                      <div className="mb-6 space-y-4">
                        <div className="flex flex-col gap-3 sm:flex-row">
                          <Skeleton className="flex-1 h-10" />
                          <Skeleton className="w-32 h-10" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Skeleton className="w-full h-12" />
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <Skeleton key={i} className="w-full h-16" />
                          ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <PaymentFilters />
                      <PaymentVerificationTable filterStatus="rejected" />
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </TabsContent>
          </Tabs>
        </Card>
      </motion.div>
    </div>
  )
}

