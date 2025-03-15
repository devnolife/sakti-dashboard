"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const data = [
  {
    name: "Algoritma dan Pemrograman",
    total: 32,
  },
  {
    name: "Basis Data Lanjut",
    total: 28,
  },
  {
    name: "Jaringan Komputer",
    total: 25,
  },
  {
    name: "Kecerdasan Buatan",
    total: 22,
  },
  {
    name: "Sistem Operasi",
    total: 20,
  },
  {
    name: "Rekayasa Perangkat Lunak",
    total: 18,
  },
  {
    name: "Pemrograman Web",
    total: 15,
  },
]

const timeRanges = [
  { value: "7d", label: "7 Hari Terakhir" },
  { value: "30d", label: "30 Hari Terakhir" },
  { value: "90d", label: "90 Hari Terakhir" },
  { value: "1y", label: "1 Tahun Terakhir" },
]

export function PopularBooksChart() {
  const [timeRange, setTimeRange] = useState("30d")

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle>Buku Terpopuler</CardTitle>
          <CardDescription>Buku dengan jumlah peminjaman tertinggi dalam periode tertentu.</CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Pilih periode" />
          </SelectTrigger>
          <SelectContent>
            {timeRanges.map((range) => (
              <SelectItem key={range.value} value={range.value}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => {
                if (value.length > 20) {
                  return value.substring(0, 20) + "..."
                }
                return value
              }}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip
              formatter={(value) => [`${value} peminjaman`, "Total"]}
              labelFormatter={(label) => `Buku: ${label}`}
            />
            <Legend />
            <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

