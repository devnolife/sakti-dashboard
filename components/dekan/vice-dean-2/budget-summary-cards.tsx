"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowUpRight, Building2, GraduationCap, BookOpen } from "lucide-react"

export function BudgetSummaryCards() {
  // Budget data for each department (in millions of Rupiah)
  const departmentBudgets = [
    {
      name: "Teknik Sipil - Irigasi",
      total: 2100,
      allocated: 1850,
      remaining: 250,
      percentUsed: 88,
      trend: "+5%",
      icon: Building2,
      color: "blue",
    },
    {
      name: "Teknik Elektro",
      total: 2500,
      allocated: 2100,
      remaining: 400,
      percentUsed: 84,
      trend: "+8%",
      icon: GraduationCap,
      color: "red",
    },
    {
      name: "Arsitektur",
      total: 1800,
      allocated: 1500,
      remaining: 300,
      percentUsed: 83,
      trend: "+3%",
      icon: Building2,
      color: "green",
    },
    {
      name: "Informatika",
      total: 3200,
      allocated: 2800,
      remaining: 400,
      percentUsed: 88,
      trend: "+12%",
      icon: BookOpen,
      color: "orange",
    },
    {
      name: "Perencanaan Wilayah & Kota",
      total: 1900,
      allocated: 1600,
      remaining: 300,
      percentUsed: 84,
      trend: "+4%",
      icon: Building2,
      color: "purple",
    },
  ]

  // Function to get color classes based on department color
  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue":
        return {
          card: "from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/40",
          icon: "bg-blue-100 text-blue-600 dark:bg-blue-800/50 dark:text-blue-400",
          text: "text-blue-600 dark:text-blue-400",
          textLight: "text-blue-600/80 dark:text-blue-400/80",
          progress: "bg-blue-600 dark:bg-blue-400",
        }
      case "red":
        return {
          card: "from-red-50 to-red-100 dark:from-red-950/40 dark:to-red-900/40",
          icon: "bg-red-100 text-red-600 dark:bg-red-800/50 dark:text-red-400",
          text: "text-red-600 dark:text-red-400",
          textLight: "text-red-600/80 dark:text-red-400/80",
          progress: "bg-red-600 dark:bg-red-400",
        }
      case "green":
        return {
          card: "from-green-50 to-green-100 dark:from-green-950/40 dark:to-green-900/40",
          icon: "bg-green-100 text-green-600 dark:bg-green-800/50 dark:text-green-400",
          text: "text-green-600 dark:text-green-400",
          textLight: "text-green-600/80 dark:text-green-400/80",
          progress: "bg-green-600 dark:bg-green-400",
        }
      case "orange":
        return {
          card: "from-orange-50 to-orange-100 dark:from-orange-950/40 dark:to-orange-900/40",
          icon: "bg-orange-100 text-orange-600 dark:bg-orange-800/50 dark:text-orange-400",
          text: "text-orange-600 dark:text-orange-400",
          textLight: "text-orange-600/80 dark:text-orange-400/80",
          progress: "bg-orange-600 dark:bg-orange-400",
        }
      case "purple":
        return {
          card: "from-purple-50 to-purple-100 dark:from-purple-950/40 dark:to-purple-900/40",
          icon: "bg-purple-100 text-purple-600 dark:bg-purple-800/50 dark:text-purple-400",
          text: "text-purple-600 dark:text-purple-400",
          textLight: "text-purple-600/80 dark:text-purple-400/80",
          progress: "bg-purple-600 dark:bg-purple-400",
        }
      default:
        return {
          card: "from-gray-50 to-gray-100 dark:from-gray-950/40 dark:to-gray-900/40",
          icon: "bg-gray-100 text-gray-600 dark:bg-gray-800/50 dark:text-gray-400",
          text: "text-gray-600 dark:text-gray-400",
          textLight: "text-gray-600/80 dark:text-gray-400/80",
          progress: "bg-gray-600 dark:bg-gray-400",
        }
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {departmentBudgets.map((dept) => {
        const colors = getColorClasses(dept.color)

        return (
          <Card
            key={dept.name}
            className={`overflow-hidden border-none bg-gradient-to-br ${colors.card} shadow-md transition-all hover:shadow-lg`}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`rounded-full p-2 ${colors.icon}`}>
                    <dept.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{dept.name}</CardTitle>
                    <CardDescription>Anggaran Departemen</CardDescription>
                  </div>
                </div>
                <div className={`flex items-center ${colors.textLight}`}>
                  <ArrowUpRight className="mr-1 h-4 w-4" />
                  <span>{dept.trend}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Anggaran</p>
                    <p className={`text-xl font-bold ${colors.text}`}>Rp {dept.total} Juta</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Sisa Anggaran</p>
                    <p className={`text-xl font-bold ${colors.text}`}>Rp {dept.remaining} Juta</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Penggunaan</span>
                    <span className={colors.text}>{dept.percentUsed}%</span>
                  </div>
                  <Progress value={dept.percentUsed} className="h-2" indicatorClassName={colors.progress} />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

