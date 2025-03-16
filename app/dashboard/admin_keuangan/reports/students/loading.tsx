"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

// Animation variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

// Pulse animation for skeletons
const pulseVariants = {
  initial: { opacity: 0.6 },
  animate: {
    opacity: 1,
    transition: {
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse",
      duration: 1.5,
    },
  },
}

export default function StudentPaymentReportsLoading() {
  return (
    <motion.div
      className="space-y-6 bg-gradient-to-br from-white via-purple-50/5 to-white rounded-lg p-1"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
      >
        <div>
          <Skeleton className="h-8 w-72 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Skeleton className="h-10 w-36" />
          <Skeleton className="h-10 w-36" />
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="grid gap-6 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="border-none shadow-sm bg-gradient-to-br from-white via-purple-50/10 to-white">
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-24 mb-2" />
              <Skeleton className="h-4 w-48" />
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="border-none shadow-sm bg-gradient-to-br from-white via-slate-50 to-white backdrop-blur-sm">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <Skeleton className="h-6 w-64 mb-2" />
                <Skeleton className="h-4 w-72" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-9 w-32" />
                <Skeleton className="h-9 w-24" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Skeleton className="h-10 w-96 rounded-md" />

              <motion.div className="space-y-4" variants={pulseVariants} initial="initial" animate="animate">
                {/* Table skeleton */}
                <div className="rounded-md border border-muted/50 overflow-hidden bg-background/50 backdrop-blur-sm">
                  <div className="bg-muted/30 p-3">
                    <div className="flex">
                      <Skeleton className="h-6 w-[10%] mr-2" />
                      <Skeleton className="h-6 w-[20%] mr-2" />
                      <Skeleton className="h-6 w-[15%] mr-2" />
                      <Skeleton className="h-6 w-[10%] mr-2" />
                      <Skeleton className="h-6 w-[15%] mr-2" />
                      <Skeleton className="h-6 w-[15%] mr-2" />
                      <Skeleton className="h-6 w-[15%]" />
                    </div>
                  </div>
                  <div>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className={`p-3 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}>
                        <div className="flex items-center">
                          <Skeleton className="h-6 w-[10%] mr-2" />
                          <div className="w-[20%] mr-2 flex items-center">
                            <Skeleton className="h-8 w-8 rounded-full mr-2" />
                            <Skeleton className="h-6 flex-1" />
                          </div>
                          <Skeleton className="h-6 w-[15%] mr-2" />
                          <Skeleton className="h-6 w-[10%] mr-2" />
                          <Skeleton className="h-6 w-[15%] mr-2" />
                          <Skeleton className="h-6 w-[15%] mr-2" />
                          <Skeleton className="h-6 w-[15%]" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pagination skeleton */}
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-48" />
                  <div className="flex items-center space-x-2">
                    <Skeleton className="h-8 w-8 rounded-md" />
                    <div className="flex items-center">
                      <Skeleton className="h-8 w-8 rounded-md mx-1" />
                      <Skeleton className="h-8 w-8 rounded-md mx-1" />
                      <Skeleton className="h-8 w-8 rounded-md mx-1" />
                    </div>
                    <Skeleton className="h-8 w-8 rounded-md" />
                  </div>
                </div>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

