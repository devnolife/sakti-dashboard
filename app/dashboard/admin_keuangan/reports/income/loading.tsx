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

export default function IncomeReportsLoading() {
  return (
    <motion.div
      className="space-y-6 bg-gradient-to-br from-white via-green-50/5 to-white rounded-lg p-1"
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
          <Card key={i} className="border-none shadow-sm bg-gradient-to-br from-white via-green-50/10 to-white">
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

              <div className="h-[400px] w-full bg-gradient-to-br from-white via-green-50/10 to-white rounded-xl p-4 shadow-sm flex items-center justify-center">
                <div className="w-full h-full relative">
                  <Skeleton className="absolute inset-0 rounded-lg opacity-20" />
                  <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                      <Skeleton key={i} className="h-4 w-6" />
                    ))}
                  </div>
                  <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between py-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Skeleton key={i} className="h-4 w-10" />
                    ))}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Skeleton className="h-40 w-40 rounded-full opacity-20" />
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

