"use client"

import { motion } from "framer-motion"
import { Table } from "@/components/ui/table"
import type { ComponentProps } from "react"

type AnimatedTableProps = ComponentProps<typeof Table>

export function AnimatedTable({ children, ...props }: AnimatedTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Table {...props}>{children}</Table>
    </motion.div>
  )
}

export function AnimatedTableRow({ children, index = 0, ...props }: any) {
  return (
    <motion.tr
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.2,
        ease: "easeOut",
        delay: 0.1 + index * 0.05,
      }}
      {...props}
    >
      {children}
    </motion.tr>
  )
}

