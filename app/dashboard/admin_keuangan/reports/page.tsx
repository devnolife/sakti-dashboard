"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PaymentStatistics } from "@/components/admin_keuangan/payment-statistics"
import { FileText, Download, Filter, Calendar } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { motion } from "framer-motion"

export default function ReportsPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
  }

  return (
    <div className="space-y-6 bg-gradient-to-br from-white via-blue-50/10 to-white rounded-lg p-1">
      <motion.div
        className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
            Financial Reports
          </h2>
          <p className="text-muted-foreground">Generate, view, and export financial reports and statistics</p>
        </motion.div>
        <motion.div className="flex flex-col sm:flex-row gap-2" variants={itemVariants}>
          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
          <Button variant="outline" className="bg-gradient-to-r from-slate-50 to-blue-50 hover:bg-blue-100/50">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </motion.div>
      </motion.div>

      <motion.div variants={cardVariants} initial="hidden" animate="visible">
        <Card className="border-none shadow-sm bg-gradient-to-br from-white via-slate-50 to-white backdrop-blur-sm">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>Financial Reports</CardTitle>
                <CardDescription>View and analyze financial data</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-gradient-to-r from-slate-50 to-blue-50 hover:bg-blue-100/50"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Select Period
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-gradient-to-r from-slate-50 to-blue-50 hover:bg-blue-100/50"
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="statistics" className="space-y-4">
              <TabsList className="bg-gradient-to-r from-slate-100 to-blue-50">
                <TabsTrigger value="statistics">Statistics</TabsTrigger>
                <TabsTrigger value="income">Income</TabsTrigger>
                <TabsTrigger value="expenses">Expenses</TabsTrigger>
                <TabsTrigger value="students">Student Payments</TabsTrigger>
              </TabsList>

              <TabsContent value="statistics">
                {isLoading ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {Array(4)
                        .fill(0)
                        .map((_, i) => (
                          <Skeleton key={i} className="h-[180px] rounded-md" />
                        ))}
                    </div>
                    <Skeleton className="h-[300px] rounded-md" />
                  </div>
                ) : (
                  <PaymentStatistics />
                )}
              </TabsContent>

              <TabsContent value="income">
                {isLoading ? (
                  <Skeleton className="h-[400px] rounded-md" />
                ) : (
                  <div className="h-[400px] w-full flex items-center justify-center border border-dashed rounded-md bg-gradient-to-br from-white via-green-50/10 to-white">
                    <div className="text-center">
                      <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                      <h3 className="mt-4 text-lg font-medium">Income Reports</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Detailed reports of all income sources and transactions
                      </p>
                      <Button
                        className="mt-4"
                        variant="outline"
                        className="bg-gradient-to-r from-slate-50 to-green-50 hover:bg-green-100/50"
                      >
                        View Income Reports
                      </Button>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="expenses">
                {isLoading ? (
                  <Skeleton className="h-[400px] rounded-md" />
                ) : (
                  <div className="h-[400px] w-full flex items-center justify-center border border-dashed rounded-md bg-gradient-to-br from-white via-red-50/10 to-white">
                    <div className="text-center">
                      <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                      <h3 className="mt-4 text-lg font-medium">Expense Reports</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Detailed reports of all expenses and expenditures
                      </p>
                      <Button
                        className="mt-4"
                        variant="outline"
                        className="bg-gradient-to-r from-slate-50 to-red-50 hover:bg-red-100/50"
                      >
                        View Expense Reports
                      </Button>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="students">
                {isLoading ? (
                  <Skeleton className="h-[400px] rounded-md" />
                ) : (
                  <div className="h-[400px] w-full flex items-center justify-center border border-dashed rounded-md bg-gradient-to-br from-white via-purple-50/10 to-white">
                    <div className="text-center">
                      <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                      <h3 className="mt-4 text-lg font-medium">Student Payment Reports</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Detailed reports of student payments and outstanding balances
                      </p>
                      <Button
                        className="mt-4"
                        variant="outline"
                        className="bg-gradient-to-r from-slate-50 to-purple-50 hover:bg-purple-100/50"
                      >
                        View Student Reports
                      </Button>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

