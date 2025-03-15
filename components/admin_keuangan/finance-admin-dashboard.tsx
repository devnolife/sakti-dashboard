"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { BarChart3, DollarSign, Users, FileText, ArrowUpRight, Download, Upload, PieChart } from "lucide-react"
import { PaymentStatistics } from "./payment-statistics"

export function FinanceAdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-4">
      <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Total Payments</CardTitle>
                <DollarSign className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Rp 1,234,567,890</div>
                <p className="text-xs text-muted-foreground">+20.1% from last semester</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Active Students</CardTitle>
                <Users className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,345</div>
                <p className="text-xs text-muted-foreground">+180 from last semester</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Payment Rate</CardTitle>
                <BarChart3 className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78.5%</div>
                <p className="text-xs text-muted-foreground">+5.2% from last semester</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
                <FileText className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">342</div>
                <p className="text-xs text-muted-foreground">-12% from last semester</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Payment Overview</CardTitle>
                <CardDescription>Payment status across all study programs</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px] w-full">
                  {/* Placeholder for chart */}
                  <div className="flex items-center justify-center w-full h-full border border-dashed rounded-md">
                    <div className="flex flex-col items-center gap-1 text-center">
                      <BarChart3 className="w-8 h-8 text-muted-foreground" />
                      <div className="text-sm font-medium">Payment Status by Program</div>
                      <div className="text-xs text-muted-foreground">Showing data for current semester</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Program Statistics</CardTitle>
                <CardDescription>Payment distribution by study program</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  {/* Placeholder for chart */}
                  <div className="flex items-center justify-center w-full h-full border border-dashed rounded-md">
                    <div className="flex flex-col items-center gap-1 text-center">
                      <PieChart className="w-8 h-8 text-muted-foreground" />
                      <div className="text-sm font-medium">Program Distribution</div>
                      <div className="text-xs text-muted-foreground">
                        Watering, Electrical, Architecture, Informatics, Urban Planning
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks for payment management</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-2">
                <Button asChild className="justify-between w-full">
                  <Link href="/dashboard/admin_keuangan/payments">
                    Manage Payments
                    <ArrowUpRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="justify-between w-full">
                  <Link href="/dashboard/admin_keuangan/payments/create">
                    Add New Payment
                    <ArrowUpRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button variant="outline" className="justify-between w-full">
                  Export Data
                  <Download className="w-4 h-4 ml-2" />
                </Button>
                <Button variant="outline" className="justify-between w-full">
                  Import Data
                  <Upload className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Latest payment activities in the system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="p-2 rounded-full bg-primary/10">
                        <DollarSign className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          Payment{" "}
                          {i === 1
                            ? "created"
                            : i === 2
                              ? "updated"
                              : i === 3
                                ? "processed"
                                : i === 4
                                  ? "verified"
                                  : "exported"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {i === 1
                            ? "New payment record created for student ID 2023001"
                            : i === 2
                              ? "Payment status updated for student ID 2023002"
                              : i === 3
                                ? "Payment processed for student ID 2023003"
                                : i === 4
                                  ? "Payment verified for student ID 2023004"
                                  : "Payment data exported to Excel"}
                        </p>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {i === 1
                          ? "2 mins ago"
                          : i === 2
                            ? "15 mins ago"
                            : i === 3
                              ? "1 hour ago"
                              : i === 4
                                ? "3 hours ago"
                                : "5 hours ago"}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Activities
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="statistics" className="space-y-4">
          <PaymentStatistics />
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Reports</CardTitle>
              <CardDescription>Generate and download financial reports</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  "Payment Summary",
                  "Outstanding Payments",
                  "Program Analysis",
                  "Semester Comparison",
                  "Payment Trends",
                  "Student Financial Status",
                ].map((report) => (
                  <Card key={report}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{report}</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-xs text-muted-foreground">
                        {report === "Payment Summary"
                          ? "Overview of all payments in the current period"
                          : report === "Outstanding Payments"
                            ? "List of all pending and overdue payments"
                            : report === "Program Analysis"
                              ? "Payment analysis by study program"
                              : report === "Semester Comparison"
                                ? "Compare payments across semesters"
                                : report === "Payment Trends"
                                  ? "Payment trends over time"
                                  : "Detailed financial status for each student"}
                      </p>
                    </CardContent>
                    <CardFooter className="pt-2">
                      <Button variant="outline" size="sm" className="w-full">
                        Generate Report
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

