import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PaymentStatistics } from "@/components/admin_keuangan/payment-statistics"
import { FileText, Download, Filter, Calendar } from "lucide-react"

export const metadata: Metadata = {
  title: "Financial Reports | Finance Admin Dashboard",
  description: "Generate and view financial reports and statistics",
}

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Financial Reports</h2>
          <p className="text-muted-foreground">Generate, view, and export financial reports and statistics</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Financial Reports</CardTitle>
              <CardDescription>View and analyze financial data</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Calendar className="mr-2 h-4 w-4" />
                Select Period
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="statistics" className="space-y-4">
            <TabsList>
              <TabsTrigger value="statistics">Statistics</TabsTrigger>
              <TabsTrigger value="income">Income</TabsTrigger>
              <TabsTrigger value="expenses">Expenses</TabsTrigger>
              <TabsTrigger value="students">Student Payments</TabsTrigger>
            </TabsList>

            <TabsContent value="statistics">
              <PaymentStatistics />
            </TabsContent>

            <TabsContent value="income">
              <div className="h-[400px] w-full flex items-center justify-center border border-dashed rounded-md">
                <div className="text-center">
                  <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">Income Reports</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Detailed reports of all income sources and transactionseports of all income sources and transactions
                  </p>
                  <Button className="mt-4" variant="outline">
                    View Income Reports
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="expenses">
              <div className="h-[400px] w-full flex items-center justify-center border border-dashed rounded-md">
                <div className="text-center">
                  <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">Expense Reports</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Detailed reports of all expenses and expenditures
                  </p>
                  <Button className="mt-4" variant="outline">
                    View Expense Reports
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="students">
              <div className="h-[400px] w-full flex items-center justify-center border border-dashed rounded-md">
                <div className="text-center">
                  <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">Student Payment Reports</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Detailed reports of student payments and outstanding balances
                  </p>
                  <Button className="mt-4" variant="outline">
                    View Student Reports
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

