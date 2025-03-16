import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BudgetAllocationChart } from "@/components/admin_keuangan/budget-allocation-chart"
import { BudgetAllocationTable } from "@/components/admin_keuangan/budget-allocation-table"
import { BudgetAllocationComparison } from "@/components/admin_keuangan/budget-allocation-comparison"
import { Download, FileText, Filter, Calendar, ArrowUpDown, Printer, PieChart, BarChart3 } from "lucide-react"

export const metadata: Metadata = {
  title: "Budget Allocation | Finance Admin Dashboard",
  description: "View and manage budget allocation across departments and categories",
}

export default function BudgetAllocationPage() {
  return (
    <div className="space-y-6 bg-gradient-to-br from-white via-cyan-50/5 to-white rounded-lg p-1">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-cyan-800 bg-clip-text text-transparent">
            Budget Allocation
          </h2>
          <p className="text-muted-foreground">View and manage budget allocation across departments and categories</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button className="bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700">
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
          <Button variant="outline" className="bg-gradient-to-r from-slate-50 to-cyan-50 hover:bg-cyan-100/50">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-none shadow-sm bg-gradient-to-br from-white via-cyan-50/10 to-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">Rp 12,500,000,000</div>
            <p className="text-sm text-cyan-600 mt-1 flex items-center">
              <span className="inline-block bg-cyan-100 text-cyan-800 rounded-full p-0.5 mr-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                  <path
                    fillRule="evenodd"
                    d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              +8.5% from previous year
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-gradient-to-br from-white via-cyan-50/10 to-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Allocated Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">Rp 10,875,000,000</div>
            <p className="text-sm text-cyan-600 mt-1 flex items-center">
              <span className="inline-block bg-cyan-100 text-cyan-800 rounded-full p-0.5 mr-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                  <path
                    fillRule="evenodd"
                    d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              87.0% of total budget
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-gradient-to-br from-white via-cyan-50/10 to-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Remaining Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">Rp 1,625,000,000</div>
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
              13.0% of total budget
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm bg-gradient-to-br from-white via-slate-50 to-white backdrop-blur-sm">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Budget Allocation</CardTitle>
              <CardDescription>View and manage budget allocation across departments and categories</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="bg-gradient-to-r from-slate-50 to-cyan-50 hover:bg-cyan-100/50"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Fiscal Year
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-gradient-to-r from-slate-50 to-cyan-50 hover:bg-cyan-100/50"
              >
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="bg-gradient-to-r from-slate-100 to-cyan-50">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="by-department">By Department</TabsTrigger>
              <TabsTrigger value="by-category">By Category</TabsTrigger>
              <TabsTrigger value="allocation-table">Allocation Table</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="h-[400px] w-full bg-gradient-to-br from-white via-cyan-50/10 to-white rounded-xl p-4 shadow-sm">
                <BudgetAllocationChart />
              </div>
            </TabsContent>

            <TabsContent value="by-department" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="border-none shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Department Budget Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full bg-gradient-to-br from-white via-cyan-50/10 to-white rounded-xl p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-medium text-gray-700">Budget by Department</h3>
                        <PieChart className="h-5 w-5 text-cyan-500" />
                      </div>
                      <div className="h-[calc(100%-2rem)] w-full flex items-center justify-center">
                        {/* Pie chart visualization would go here */}
                        <div className="relative w-[200px] h-[200px] rounded-full bg-gray-100 overflow-hidden">
                          <div
                            className="absolute w-full h-full bg-gradient-to-br from-cyan-400 to-cyan-300"
                            style={{ clipPath: "polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)" }}
                          ></div>
                          <div
                            className="absolute w-full h-full bg-gradient-to-br from-teal-500 to-teal-400"
                            style={{ clipPath: "polygon(50% 50%, 50% 0, 100% 0, 100% 50%)" }}
                          ></div>
                          <div
                            className="absolute w-full h-full bg-gradient-to-br from-blue-400 to-blue-300"
                            style={{ clipPath: "polygon(50% 50%, 0 50%, 0 0, 50% 0)" }}
                          ></div>
                          <div
                            className="absolute w-full h-full bg-gradient-to-br from-indigo-400 to-indigo-300"
                            style={{ clipPath: "polygon(50% 50%, 0 100%, 0 50%)" }}
                          ></div>
                          <div
                            className="absolute w-full h-full bg-gradient-to-br from-emerald-400 to-emerald-300"
                            style={{ clipPath: "polygon(50% 50%, 50% 100%, 100% 100%)" }}
                          ></div>
                          <div
                            className="absolute w-[60px] h-[60px] bg-white rounded-full"
                            style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Department Budget Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full bg-gradient-to-br from-white via-cyan-50/10 to-white rounded-xl p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-medium text-gray-700">Budget vs Actual by Department</h3>
                        <BarChart3 className="h-5 w-5 text-cyan-500" />
                      </div>
                      <div className="h-[calc(100%-2rem)] w-full flex items-center justify-center">
                        {/* Bar chart visualization would go here */}
                        <div className="relative w-full h-full flex items-end justify-around">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="relative w-[15%] h-[90%] bg-gray-100 rounded-t-md overflow-hidden">
                              <div className="absolute bottom-0 w-full h-[60%] bg-gradient-to-t from-cyan-400 to-cyan-300"></div>
                              <div className="absolute bottom-0 w-full h-[45%] bg-gradient-to-t from-teal-500 to-teal-400"></div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="by-category" className="space-y-4">
              <div className="h-[400px] w-full bg-gradient-to-br from-white via-cyan-50/10 to-white rounded-xl p-4 shadow-sm">
                <BudgetAllocationComparison />
              </div>
            </TabsContent>

            <TabsContent value="allocation-table" className="space-y-4">
              <div className="flex justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <ArrowUpDown className="h-3.5 w-3.5" />
                    <span>Sort</span>
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <Filter className="h-3.5 w-3.5" />
                    <span>Filter</span>
                  </Button>
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
              <BudgetAllocationTable />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

