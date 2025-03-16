"\"use client"

import { motion } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"

interface LoadingAnimationProps {
  type?: "card" | "table" | "chart" | "form"
  count?: number
  className?: string
}

export function LoadingPage({ type = "card", count = 3, className = "" }: LoadingAnimationProps) {
  // Animation variants
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

  if (type === "card") {
    return (
      <motion.div className={`grid gap-4 ${className}`} variants={containerVariants} initial="hidden" animate="show">
        {Array.from({ length: count }).map((_, i) => (
          <motion.div key={i} variants={itemVariants} className="rounded-lg border p-4 shadow-sm">
            <Skeleton className="h-6 w-1/3 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3" />
            <div className="flex justify-between mt-4">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </motion.div>
        ))}
      </motion.div>
    )
  }

  if (type === "table") {
    return (
      <motion.div
        className={`rounded-md border overflow-hidden ${className}`}
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={itemVariants} className="bg-muted/30 p-3">
          <div className="flex">
            <Skeleton className="h-6 w-[10%] mr-2" />
            <Skeleton className="h-6 w-[20%] mr-2" />
            <Skeleton className="h-6 w-[15%] mr-2" />
            <Skeleton className="h-6 w-[10%] mr-2" />
            <Skeleton className="h-6 w-[15%] mr-2" />
            <Skeleton className="h-6 w-[15%] mr-2" />
            <Skeleton className="h-6 w-[15%]" />
          </div>
        </motion.div>
        <motion.div variants={pulseVariants} initial="initial" animate="animate">
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className={`p-3 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}>
              <div className="flex items-center">
                <Skeleton className="h-6 w-[10%] mr-2" />
                <Skeleton className="h-6 w-[20%] mr-2" />
                <Skeleton className="h-6 w-[15%] mr-2" />
                <Skeleton className="h-6 w-[10%] mr-2" />
                <Skeleton className="h-6 w-[15%] mr-2" />
                <Skeleton className="h-6 w-[15%] mr-2" />
                <Skeleton className="h-6 w-[15%]" />
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    )
  }

  if (type === "chart") {
    return (
      <motion.div
        className={`h-[400px] w-full rounded-xl p-4 shadow-sm ${className}`}
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={itemVariants} className="w-full h-full relative">
          <Skeleton className="absolute inset-0 rounded-lg opacity-20" />

          {/* Chart bars skeleton */}
          <div className="absolute inset-x-12 bottom-12 top-12 flex items-end justify-between">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center gap-1 w-4"
                variants={pulseVariants}
                initial="initial"
                animate="animate"
              >
                <Skeleton className={`w-4 h-${20 + Math.floor(Math.random() * 80)}`} />
                <Skeleton className={`w-4 h-${20 + Math.floor(Math.random() * 60)}`} />
              </motion.div>
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
        </motion.div>
      </motion.div>
    )
  }

  if (type === "form") {
    return (
      <motion.div className={`space-y-4 ${className}`} variants={containerVariants} initial="hidden" animate="show">
        <motion.div variants={itemVariants}>
          <Skeleton className="h-5 w-32 mb-2" />
          <Skeleton className="h-10 w-full" />
        </motion.div>
        <motion.div variants={itemVariants}>
          <Skeleton className="h-5 w-32 mb-2" />
          <Skeleton className="h-10 w-full" />
        </motion.div>
        <motion.div variants={itemVariants}>
          <Skeleton className="h-5 w-32 mb-2" />
          <Skeleton className="h-24 w-full" />
        </motion.div>
        <motion.div variants={itemVariants} className="pt-4 flex justify-end">
          <Skeleton className="h-10 w-24" />
        </motion.div>
      </motion.div>
    )
  }

  return null
}

