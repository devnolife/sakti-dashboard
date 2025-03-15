"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface DurationData {
  range: string
  count: number
}

interface BorrowingDurationChartProps {
  data: DurationData[]
}

export function BorrowingDurationChart({ data }: BorrowingDurationChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="range" />
        <YAxis />
        <Tooltip formatter={(value) => [`${value} peminjaman`, "Jumlah"]} />
        <Bar dataKey="count" name="Jumlah Peminjaman" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  )
}

