"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import type { ComponentProps } from "react"

type AnimatedCardProps = ComponentProps<typeof Card> & {
  delay?: number
  direction?: "up" | "down" | "left" | "right"
}

export function AnimatedCard({ children, delay = 0, direction = "up", className, ...props }: AnimatedCardProps) {
  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: 20 }
      case "down":
        return { y: -20 }
      case "left":
        return { x: 20 }
      case "right":
        return { x: -20 }
      default:
        return { y: 20 }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...getInitialPosition() }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{
        duration: 0.4,
        ease: "easeOut",
        delay: delay,
      }}
    >
      <Card className={className} {...props}>
        {children}
      </Card>
    </motion.div>
  )
}

