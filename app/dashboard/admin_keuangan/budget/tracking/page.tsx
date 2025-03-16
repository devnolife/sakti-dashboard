import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BudgetTrackingChart } from "@/components/admin_keuangan/budget-tracking-chart"
import { BudgetTrackingTable } from "@/components/admin_keuangan/budget-tracking-table"
import { BudgetVarianceChart } from "@/components/admin_keuangan/budget-variance-chart"
import { Download, FileText, Filter, Calendar, ArrowUpDown, Printer, LineChart, AlertTriangle } from "lucide-react"

export const metadata: Metadata = {
  title: "Budget Tracking | Finance Admin Dashboard",
  description: "Track budget usage and variance across departments and categories",
}

export default function BudgetTrackingPage() {
  return (
    <div className="space-y-6 bg-gradient-to-br from-white via-blue-50/5 to-white rounded-lg p-1">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
            Budget Tracking
          </h2>
          <p className="text-muted-foreground">Track budget usage and variance across departments and categories</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
          <Button variant="outline" className="bg-gradient-to-r from-slate-50 to-blue-50 hover:bg-blue-100/50">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-none shadow-sm bg-gradient-to-br from-white via-blue-50/10 to-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Budget Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">68.4%</div>
            <div className="w-full h-3 bg-gray-100 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                style={{ width: "68.4%" }}
              ></div>
            </div>
            <p className="text-sm text-blue-600 mt-1 flex items-center">
              <span className="inline-block bg-blue-100 text-blue-800 rounded-full p-0.5 mr-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                  <path
                    fillRule="evenodd"
                    d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Rp 8,550,000,000 spent
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-gradient-to-br from-white via-blue-50/10 to-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Remaining Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">Rp 3,950,000,000</div>
            <div className="w-full h-3 bg-gray-100 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                style={{ width: "31.6%" }}
              ></div>
            </div>
            <p className="text-sm text-emerald-600 mt-1 flex items-center">
              <span className="inline-block bg-emerald-100 text-emerald-800 rounded-full p-0.5 mr-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                  <path
                    fillRule="evenodd"
                    d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              31.6% of total budget
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-gradient-to-br from-white via-blue-50/10 to-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Budget Variance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">+2.3%</div>
            <p className="text-sm text-amber-600 mt-1 flex items-center">
              <span className="inline-block bg-amber-100 text-amber-800 rounded-full p-0.5 mr-1">
                <AlertTriangle className="w-3 h-3" />
              </span>
              Rp 287,500,000 over budget
            </p>
            <p className="text-xs text-muted-foreground mt-1">In 3 departments</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm bg-gradient-to-br from-white via-slate-50 to-white backdrop-blur-sm">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Budget Tracking</CardTitle>
              <CardDescription>Track budget usage and variance across departments and categories</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="bg-gradient-to-r from-slate-50 to-blue-50 hover:bg-blue-100/50"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Time Period
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
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="bg-gradient-to-r from-slate-100 to-blue-50">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="by-department">By Department</TabsTrigger>
              <TabsTrigger value="variance">Variance Analysis</TabsTrigger>
              <TabsTrigger value="tracking-table">Tracking Table</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="h-[400px] w-full bg-gradient-to-br from-white via-blue-50/10 to-white rounded-xl p-4 shadow-sm">
                <BudgetTrackingChart />
              </div>
            </TabsContent>

            <TabsContent value="by-department" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="border-none shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Department Budget Usage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full bg-gradient-to-br from-white via-blue-50/10 to-white rounded-xl p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-medium text-gray-700">Budget Usage by Department</h3>
                        <LineChart className="h-5 w-5 text-blue-500" />
                      </div>
                      <div className="h-[calc(100%-2rem)] w-full flex items-center justify-center">
                        {/* Line chart visualization would go here */}
                        <div className="relative w-full h-[80%]">
                          <div className="absolute bottom-0 w-full h-[1px] bg-gray-200"></div>
                          <div className="absolute left-0 h-full w-[1px] bg-gray-200"></div>

                          {/* Line 1 */}
                          <svg className="absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path
                              d="M0,80 L10,75 L20,78 L30,65 L40,60 L50,55 L60,40 L70,35 L80,30 L90,25 L100,20"
                              fill="none"
                              stroke="#3b82f6"
                              strokeWidth="2"
                            />
                          </svg>

                          {/* Line 2 */}
                          <svg className="absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path
                              d="M0,85 L10,80 L20,82 L30,75 L40,70 L50,65 L60,60 L70,55 L80,50 L90,45 L100,40"
                              fill="none"
                              stroke="#0ea5e9"
                              strokeWidth="2"
                              strokeDasharray="4 2"
                            />
                          </svg>

                          {/* Gradient area under line 1 */}
                          <svg className="absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <defs>
                              <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                              </linearGradient>
                            </defs>
                            <path
                              d="M0,80 L10,75 L20,78 L30,65 L40,60 L50,55 L60,40 L70,35 L80,30 L90,25 L100,20 L100,100 L0,100 Z"
                              fill="url(#gradient1)"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Department Budget Variance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full bg-gradient-to-br from-white via-blue-50/10 to-white rounded-xl p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-medium text-gray-700">Budget Variance by Department</h3>
                        <AlertTriangle className="h-5 w-5 text-amber-500" />
                      </div>
                      <div className="h-[calc(100%-2rem)] w-full flex items-center justify-center">
                        {/* Bar  w-full flex items-center justify-center">
                        {/* Bar chart visualization would go here */}
                        <div className="relative w-full h-full flex items-end justify-around">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="relative w-[15%] h-[90%] bg-gray-100 rounded-t-md overflow-hidden">
                              <div className="absolute bottom-0 w-full h-[60%] bg-gradient-to-t from-blue-400 to-blue-300"></div>
                              <div className="absolute bottom-0 w-full h-[45%] bg-gradient-to-t from-indigo-500 to-indigo-400"></div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="variance" className="space-y-4">
              <div className="h-[400px] w-full bg-gradient-to-br from-white via-blue-50/10 to-white rounded-xl p-4 shadow-sm">
                <BudgetVarianceChart />
              </div>
            </TabsContent>

            <TabsContent value="tracking-table" className="space-y-4">
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
              <BudgetTrackingTable />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

