"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import type { ComponentProps } from "react"

type AnimatedBadgeProps = ComponentProps<typeof Badge> & {
  delay?: number
}

export function AnimatedBadge({ children, delay = 0, className, ...props }: AnimatedBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
        delay,
      }}
    >
      <Badge className={className} {...props}>
        {children}
      </Badge>
    </motion.div>
  )
}

