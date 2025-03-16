import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StudentPaymentChart } from "@/components/admin_keuangan/student-payment-chart"
import { StudentPaymentTable } from "@/components/admin_keuangan/student-payment-table"
import { StudentPaymentStatusChart } from "@/components/admin_keuangan/student-payment-status-chart"
import { Download, FileText, Filter, Calendar, Printer, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export const metadata: Metadata = {
  title: "Student Payment Reports | Finance Admin Dashboard",
  description: "View and analyze student payment reports and statistics",
}

export default function StudentPaymentReportsPage() {
  return (
    <div className="space-y-6 bg-gradient-to-br from-white via-purple-50/5 to-white rounded-lg p-1">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-purple-800 bg-clip-text text-transparent">
            Student Payment Reports
          </h2>
          <p className="text-muted-foreground">View and analyze student payment data and outstanding balances</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
          <Button variant="outline" className="bg-gradient-to-r from-slate-50 to-purple-50 hover:bg-purple-100/50">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-none shadow-sm bg-gradient-to-br from-white via-purple-50/10 to-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">2,345</div>
            <p className="text-sm text-purple-600 mt-1 flex items-center">
              <span className="inline-block bg-purple-100 text-purple-800 rounded-full p-0.5 mr-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                  <path
                    fillRule="evenodd"
                    d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              +5.2% from previous year
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-gradient-to-br from-white via-purple-50/10 to-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Paid in Full</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">1,876</div>
            <p className="text-sm text-green-600 mt-1 flex items-center">
              <span className="inline-block bg-green-100 text-green-800 rounded-full p-0.5 mr-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                  <path
                    fillRule="evenodd"
                    d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              80.0% of total students
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-gradient-to-br from-white via-purple-50/10 to-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Outstanding Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">469</div>
            <p className="text-sm text-amber-600 mt-1 flex items-center">
              <span className="inline-block bg-amber-100 text-amber-800 rounded-full p-0.5 mr-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                  <path
                    fillRule="evenodd"
                    d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              20.0% of total students
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm bg-gradient-to-br from-white via-slate-50 to-white backdrop-blur-sm">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Student Payment Analysis</CardTitle>
              <CardDescription>View and analyze student payment data</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="bg-gradient-to-r from-slate-50 to-purple-50 hover:bg-purple-100/50"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Select Period
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-gradient-to-r from-slate-50 to-purple-50 hover:bg-purple-100/50"
              >
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="bg-gradient-to-r from-slate-100 to-purple-50">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="by-status">By Status</TabsTrigger>
              <TabsTrigger value="by-department">By Department</TabsTrigger>
              <TabsTrigger value="student-list">Student List</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="h-[400px] w-full bg-gradient-to-br from-white via-purple-50/10 to-white rounded-xl p-4 shadow-sm">
                <StudentPaymentChart />
              </div>
            </TabsContent>

            <TabsContent value="by-status" className="space-y-4">
              <div className="h-[400px] w-full bg-gradient-to-br from-white via-purple-50/10 to-white rounded-xl p-4 shadow-sm">
                <StudentPaymentStatusChart />
              </div>
            </TabsContent>

            <TabsContent value="by-department" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="border-none shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Department Payment Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full">
                      {/* Department chart would go here */}
                      <div className="h-full w-full bg-gradient-to-br from-white via-purple-50/10 to-white rounded-xl flex items-center justify-center">
                        <p className="text-muted-foreground">Department payment status chart</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Department Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full">
                      {/* Department comparison would go here */}
                      <div className="h-full w-full bg-gradient-to-br from-white via-purple-50/10 to-white rounded-xl flex items-center justify-center">
                        <p className="text-muted-foreground">Department comparison chart</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="student-list" className="space-y-4">
              <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by student name, ID, or department..."
                    className="pl-10 bg-background/50 border-muted transition-all focus-visible:bg-background"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <Printer className="h-3.5 w-3.5" />
                    <span>Print</span>
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <Download className="h-3.5 w-3.5" />
                    <span>Export</span>
                  </Button>
                </div>
              </div>
              <StudentPaymentTable />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

