"use client"

import { useEffect, useState } from "react"
import { motion, useSpring, useTransform } from "framer-motion"

interface AnimatedCounterProps {
  value: number
  duration?: number
  delay?: number
  formatter?: (value: number) => string
  className?: string
}

export function AnimatedCounter({
  value,
  duration = 1.5,
  delay = 0,
  formatter = (v) => v.toFixed(0),
  className,
}: AnimatedCounterProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const springValue = useSpring(0, {
    duration: duration * 1000,
    delay: delay * 1000,
    stiffness: 100,
    damping: 30,
  })

  const displayValue = useTransform(springValue, (latest) => formatter(latest))

  useEffect(() => {
    springValue.set(value)
  }, [springValue, value])

  if (!isClient) {
    return <span className={className}>{formatter(0)}</span>
  }

  return <motion.span className={className}>{displayValue}</motion.span>
}

