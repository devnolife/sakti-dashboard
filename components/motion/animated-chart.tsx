"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface AnimatedChartProps {
  children: ReactNode
  delay?: number
  className?: string
}

export function AnimatedChart({ children, delay = 0, className }: AnimatedChartProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        ease: [0.34, 1.56, 0.64, 1], // Custom spring-like ease
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}

