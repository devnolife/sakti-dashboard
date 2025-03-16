"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import type { ReactNode } from "react"

interface ScrollAnimationProps {
  children: ReactNode
  delay?: number
  threshold?: number
  className?: string
}

export function ScrollAnimation({ children, delay = 0, threshold = 0.1, className }: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: threshold })
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (isInView) {
      setHasAnimated(true)
    }
  }, [isInView])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView || hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

