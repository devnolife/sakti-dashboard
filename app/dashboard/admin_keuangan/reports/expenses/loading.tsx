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

export default function ExpenseReportsLoading() {
  return (
    <motion.div
      className="space-y-6 bg-gradient-to-br from-white via-red-50/5 to-white rounded-lg p-1"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
      >
        <div>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-80" />
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Skeleton className="h-10 w-36" />
          <Skeleton className="h-10 w-36" />
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="grid gap-6 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="border-none shadow-sm bg-gradient-to-br from-white via-red-50/10 to-white">
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-40 mb-2" />
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
                <Skeleton className="h-6 w-48 mb-2" />
                <Skeleton className="h-4 w-64" />
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

              <div className="h-[400px] w-full bg-gradient-to-br from-white via-red-50/10 to-white rounded-xl p-4 shadow-sm flex items-center justify-center">
                <div className="w-full h-full relative">
                  <Skeleton className="absolute inset-0 rounded-lg opacity-20" />

                  {/* Chart bars skeleton */}
                  <div className="absolute inset-x-12 bottom-12 top-12 flex items-end justify-between">
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className="flex flex-col items-center gap-1 w-4">
                        <Skeleton className={`w-4 h-${20 + Math.floor(Math.random() * 80)}`} />
                        <Skeleton className={`w-4 h-${20 + Math.floor(Math.random() * 60)}`} />
                      </div>
                    ))}
                  </div>

                  {/* X-axis labels */}
                  <div className="absolute bottom-0 left-12 right-12 flex justify-between">
                    {[...Array(12)].map((_, i) => (
                      <Skeleton key={i} className="h-4 w-6" />
                    ))}
                  </div>

                  {/* Y-axis labels */}
                  <div className="absolute left-0 top-12 bottom-12 flex flex-col justify-between">
                    {[...Array(5)].map((_, i) => (
                      <Skeleton key={i} className="h-4 w-8" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

