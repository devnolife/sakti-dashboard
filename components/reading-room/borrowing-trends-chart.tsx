"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface BorrowingTrend {
  month: string
  borrowings: number
  returns: number
}

interface BorrowingTrendsChartProps {
  data: BorrowingTrend[]
  showDetails?: boolean
}

export function BorrowingTrendsChart({ data, showDetails = false }: BorrowingTrendsChartProps) {
  return (
    <ResponsiveContainer width="100%" height={showDetails ? 400 : 300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="borrowings" name="Peminjaman" fill="#2563eb" />
        <Bar dataKey="returns" name="Pengembalian" fill="#16a34a" />
      </BarChart>
    </ResponsiveContainer>
  )
}

