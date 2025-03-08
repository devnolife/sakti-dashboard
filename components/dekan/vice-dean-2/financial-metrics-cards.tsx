"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight, Wallet, Building2, GraduationCap, Beaker } from "lucide-react"

export function FinancialMetricsCards() {
  // Financial metrics data
  const financialMetrics = [
    {
      title: "Total Pendapatan",
      value: "Rp 3,2 Miliar",
      change: "+8%",
      trend: "up",
      description: "Dibandingkan semester lalu",
      icon: Wallet,
    },
    {
      title: "Total Pengeluaran",
      value: "Rp 2,8 Miliar",
      change: "+5%",
      trend: "up",
      description: "Dibandingkan semester lalu",
      icon: Building2,
    },
    {
      title: "Biaya per Mahasiswa",
      value: "Rp 4,5 Juta",
      change: "-2%",
      trend: "down",
      description: "Dibandingkan semester lalu",
      icon: GraduationCap,
    },
    {
      title: "Pendapatan Lab",
      value: "Rp 875 Juta",
      change: "+12%",
      trend: "up",
      description: "Dibandingkan semester lalu",
      icon: Beaker,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {financialMetrics.map((metric, index) => (
        <Card key={index} className="border-none shadow-md">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{metric.title}</CardTitle>
              <div className="rounded-full bg-primary/10 p-2">
                <metric.icon className="h-4 w-4 text-primary" />
              </div>
            </div>
            <CardDescription>{metric.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <div className="mt-1 flex items-center text-sm">
              {metric.trend === "up" ? (
                <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
              ) : (
                <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
              )}
              <span className={metric.trend === "up" ? "text-green-500" : "text-red-500"}>{metric.change}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

