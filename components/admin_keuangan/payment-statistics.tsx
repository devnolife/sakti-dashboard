"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, PieChart, LineChart, TrendingUp, Wallet, Users, Calendar, ArrowUpRight } from "lucide-react"

export function PaymentStatistics() {
  return (
    <div className="space-y-4">
      <Tabs defaultValue="by-program" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 h-12 rounded-xl bg-gradient-to-r from-slate-100 to-blue-50 p-1">
          <TabsTrigger
            value="by-program"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>By Program</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="by-status"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            <div className="flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              <span>By Status</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="by-semester"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>By Semester</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="trends" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span>Trends</span>
            </div>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="by-program" className="space-y-4">
          <Card className="border-none shadow-sm bg-gradient-to-br from-white via-slate-50 to-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-semibold text-gray-800">Payment Statistics by Study Program</CardTitle>
              <CardDescription className="text-gray-500">
                Breakdown of payments across the five study programs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="h-[300px] w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-50 rounded-xl p-4 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-medium text-gray-700">Payment Amount by Program</h3>
                    <BarChart3 className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="flex h-[calc(100%-2rem)] w-full items-center justify-center">
                    <div className="relative w-full h-full">
                      {/* Simulated bar chart */}
                      <div className="absolute bottom-0 left-[10%] w-[10%] h-[65%] bg-gradient-to-t from-blue-400 to-blue-300 rounded-t-md"></div>
                      <div className="absolute bottom-0 left-[30%] w-[10%] h-[85%] bg-gradient-to-t from-indigo-500 to-indigo-400 rounded-t-md"></div>
                      <div className="absolute bottom-0 left-[50%] w-[10%] h-[75%] bg-gradient-to-t from-purple-400 to-purple-300 rounded-t-md"></div>
                      <div className="absolute bottom-0 left-[70%] w-[10%] h-[95%] bg-gradient-to-t from-blue-600 to-blue-500 rounded-t-md"></div>
                      <div className="absolute bottom-0 left-[90%] w-[10%] h-[55%] bg-gradient-to-t from-indigo-300 to-indigo-200 rounded-t-md"></div>
                    </div>
                  </div>
                </div>

                <div className="h-[300px] w-full bg-gradient-to-br from-purple-50 via-violet-50 to-purple-50 rounded-xl p-4 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-medium text-gray-700">Student Distribution by Program</h3>
                    <PieChart className="h-5 w-5 text-purple-500" />
                  </div>
                  <div className="flex h-[calc(100%-2rem)] w-full items-center justify-center">
                    {/* Simulated pie chart */}
                    <div className="relative w-[200px] h-[200px] rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className="absolute w-full h-full bg-gradient-to-br from-blue-400 to-blue-300"
                        style={{ clipPath: "polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)" }}
                      ></div>
                      <div
                        className="absolute w-full h-full bg-gradient-to-br from-indigo-500 to-indigo-400"
                        style={{ clipPath: "polygon(50% 50%, 50% 0, 100% 0, 100% 50%)" }}
                      ></div>
                      <div
                        className="absolute w-full h-full bg-gradient-to-br from-purple-400 to-purple-300"
                        style={{ clipPath: "polygon(50% 50%, 0 50%, 0 0, 50% 0)" }}
                      ></div>
                      <div
                        className="absolute w-full h-full bg-gradient-to-br from-blue-600 to-blue-500"
                        style={{ clipPath: "polygon(50% 50%, 0 100%, 0 50%)" }}
                      ></div>
                      <div
                        className="absolute w-full h-full bg-gradient-to-br from-indigo-300 to-indigo-200"
                        style={{ clipPath: "polygon(50% 50%, 50% 100%, 100% 100%)" }}
                      ></div>
                      <div
                        className="absolute w-[60px] h-[60px] bg-white rounded-full"
                        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-5">
                {[
                  {
                    name: "Watering",
                    amount: "Rp 245.8M",
                    students: "458 students",
                    color: "bg-gradient-to-r from-blue-400 to-blue-300",
                  },
                  {
                    name: "Electrical",
                    amount: "Rp 312.4M",
                    students: "523 students",
                    color: "bg-gradient-to-r from-indigo-500 to-indigo-400",
                  },
                  {
                    name: "Architecture",
                    amount: "Rp 278.6M",
                    students: "412 students",
                    color: "bg-gradient-to-r from-purple-400 to-purple-300",
                  },
                  {
                    name: "Informatics",
                    amount: "Rp 356.2M",
                    students: "612 students",
                    color: "bg-gradient-to-r from-blue-600 to-blue-500",
                  },
                  {
                    name: "Urban Planning",
                    amount: "Rp 198.9M",
                    students: "340 students",
                    color: "bg-gradient-to-r from-indigo-300 to-indigo-200",
                  },
                ].map((program) => (
                  <Card key={program.name} className="border-none shadow-sm overflow-hidden">
                    <div className={`h-1 w-full ${program.color}`}></div>
                    <CardHeader className="pb-2 pt-4">
                      <CardTitle className="text-sm font-medium text-gray-700">{program.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-gray-800">{program.amount}</div>
                      <p className="text-xs text-gray-500 mt-1">{program.students}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="by-status" className="space-y-4">
          <Card className="border-none shadow-sm bg-gradient-to-br from-white via-slate-50 to-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-semibold text-gray-800">Payment Statistics by Status</CardTitle>
              <CardDescription className="text-gray-500">Breakdown of payments by their current status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="h-[300px] w-full bg-gradient-to-br from-green-50 via-teal-50 to-green-50 rounded-xl p-4 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-medium text-gray-700">Payment Status Distribution</h3>
                    <PieChart className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="flex h-[calc(100%-2rem)] w-full items-center justify-center">
                    {/* Simulated donut chart */}
                    <div className="relative w-[200px] h-[200px] rounded-full bg-gray-100">
                      <div
                        className="absolute w-full h-full bg-gradient-to-br from-green-400 to-green-300"
                        style={{ clipPath: "polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)" }}
                      ></div>
                      <div
                        className="absolute w-full h-full bg-gradient-to-br from-blue-400 to-blue-300"
                        style={{ clipPath: "polygon(50% 50%, 50% 0, 100% 0, 100% 50%)" }}
                      ></div>
                      <div
                        className="absolute w-full h-full bg-gradient-to-br from-gray-300 to-gray-200"
                        style={{ clipPath: "polygon(50% 50%, 0 50%, 0 0, 50% 0)" }}
                      ></div>
                      <div
                        className="absolute w-full h-full bg-gradient-to-br from-purple-400 to-purple-300"
                        style={{ clipPath: "polygon(50% 50%, 0 100%, 0 50%)" }}
                      ></div>
                      <div
                        className="absolute w-full h-full bg-gradient-to-br from-red-400 to-red-300"
                        style={{ clipPath: "polygon(50% 50%, 50% 100%, 0 100%)" }}
                      ></div>
                      <div
                        className="absolute w-[120px] h-[120px] bg-white rounded-full"
                        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="h-[300px] w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-50 rounded-xl p-4 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-medium text-gray-700">Status by Program</h3>
                    <BarChart3 className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="flex h-[calc(100%-2rem)] w-full items-center justify-center">
                    {/* Simulated stacked bar chart */}
                    <div className="relative w-full h-full flex items-end justify-around">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="relative w-[15%] h-[90%] bg-gray-100 rounded-t-md overflow-hidden">
                          <div className="absolute bottom-0 w-full h-[50%] bg-gradient-to-t from-green-400 to-green-300"></div>
                          <div className="absolute bottom-[50%] w-full h-[20%] bg-gradient-to-t from-blue-400 to-blue-300"></div>
                          <div className="absolute bottom-[70%] w-full h-[15%] bg-gradient-to-t from-gray-300 to-gray-200"></div>
                          <div className="absolute bottom-[85%] w-full h-[8%] bg-gradient-to-t from-purple-400 to-purple-300"></div>
                          <div className="absolute bottom-[93%] w-full h-[7%] bg-gradient-to-t from-red-400 to-red-300"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-5">
                {[
                  {
                    name: "Paid",
                    count: "1,245",
                    percent: "53.1% of total",
                    color: "bg-gradient-to-r from-green-400 to-green-300",
                    textColor: "text-green-600",
                    borderColor: "border-green-200",
                  },
                  {
                    name: "Partial",
                    count: "468",
                    percent: "20.0% of total",
                    color: "bg-gradient-to-r from-blue-400 to-blue-300",
                    textColor: "text-blue-600",
                    borderColor: "border-blue-200",
                  },
                  {
                    name: "Unpaid",
                    count: "342",
                    percent: "14.6% of total",
                    color: "bg-gradient-to-r from-gray-300 to-gray-200",
                    textColor: "text-gray-600",
                    borderColor: "border-gray-200",
                  },
                  {
                    name: "Scholarship",
                    count: "156",
                    percent: "6.7% of total",
                    color: "bg-gradient-to-r from-purple-400 to-purple-300",
                    textColor: "text-purple-600",
                    borderColor: "border-purple-200",
                  },
                  {
                    name: "Overdue",
                    count: "134",
                    percent: "5.7% of total",
                    color: "bg-gradient-to-r from-red-400 to-red-300",
                    textColor: "text-red-600",
                    borderColor: "border-red-200",
                  },
                ].map((status) => (
                  <Card key={status.name} className={`border-none shadow-sm overflow-hidden`}>
                    <div className={`h-1 w-full ${status.color}`}></div>
                    <CardHeader className="pb-2 pt-4">
                      <CardTitle className={`text-sm font-medium ${status.textColor}`}>{status.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-gray-800">{status.count}</div>
                      <p className="text-xs text-gray-500 mt-1">{status.percent}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="by-semester" className="space-y-4">
          <Card className="border-none shadow-sm bg-gradient-to-br from-white via-slate-50 to-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-semibold text-gray-800">Payment Statistics by Semester</CardTitle>
              <CardDescription className="text-gray-500">
                Comparison of payments across different semesters
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full bg-gradient-to-br from-indigo-50 via-purple-50 to-indigo-50 rounded-xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-sm font-medium text-gray-700">Payment Comparison by Semester</h3>
                  <BarChart3 className="h-5 w-5 text-indigo-500" />
                </div>
                <div className="flex h-[calc(100%-3rem)] w-full items-end justify-around">
                  {/* Simulated grouped bar chart */}
                  {[
                    { semester: "2022/2023 - 1", height1: "70%", height2: "60%" },
                    { semester: "2022/2023 - 2", height1: "75%", height2: "65%" },
                    { semester: "2023/2024 - 1", height1: "85%", height2: "75%" },
                    { semester: "2023/2024 - 2", height1: "90%", height2: "80%" },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-2 items-end justify-center w-[20%]">
                      <div
                        className="w-[45%] bg-gradient-to-t from-indigo-500 to-indigo-400 rounded-t-md"
                        style={{ height: item.height1 }}
                      ></div>
                      <div
                        className="w-[45%] bg-gradient-to-t from-purple-400 to-purple-300 rounded-t-md"
                        style={{ height: item.height2 }}
                      ></div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-around mt-4">
                  {["2022/2023 - 1", "2022/2023 - 2", "2023/2024 - 1", "2023/2024 - 2"].map((semester, i) => (
                    <div key={i} className="text-xs text-gray-500 text-center w-[20%]">
                      {semester}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-4">
                {[
                  { semester: "2023/2024 - 2", amount: "Rp 1.23B", students: "2,345 students", growth: "+4.2%" },
                  { semester: "2023/2024 - 1", amount: "Rp 1.18B", students: "2,290 students", growth: "+12.4%" },
                  { semester: "2022/2023 - 2", amount: "Rp 1.05B", students: "2,165 students", growth: "+7.1%" },
                  { semester: "2022/2023 - 1", amount: "Rp 980.5M", students: "2,120 students", growth: "+3.5%" },
                ].map((semester) => (
                  <Card key={semester.semester} className="border-none shadow-sm overflow-hidden">
                    <div className="h-1 w-full bg-gradient-to-r from-indigo-400 to-purple-400"></div>
                    <CardHeader className="pb-2 pt-4">
                      <CardTitle className="text-sm font-medium text-gray-700">{semester.semester}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-2xl font-bold text-gray-800">{semester.amount}</div>
                          <p className="text-xs text-gray-500 mt-1">{semester.students}</p>
                        </div>
                        <div className="flex items-center text-green-500 bg-gradient-to-r from-green-50 to-emerald-50 px-2 py-1 rounded-full text-xs font-medium">
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                          {semester.growth}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card className="border-none shadow-sm bg-gradient-to-br from-white via-slate-50 to-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-semibold text-gray-800">Payment Trends</CardTitle>
              <CardDescription className="text-gray-500">Payment trends over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full bg-gradient-to-br from-teal-50 via-blue-50 to-teal-50 rounded-xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-sm font-medium text-gray-700">Payment Trends Over Time</h3>
                  <LineChart className="h-5 w-5 text-teal-500" />
                </div>
                <div className="flex h-[calc(100%-3rem)] w-full items-center justify-center">
                  {/* Simulated line chart */}
                  <div className="relative w-full h-[80%]">
                    <div className="absolute bottom-0 w-full h-[1px] bg-gray-200"></div>
                    <div className="absolute left-0 h-full w-[1px] bg-gray-200"></div>

                    {/* Line 1 */}
                    <svg className="absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <path
                        d="M0,80 L10,75 L20,78 L30,65 L40,60 L50,55 L60,40 L70,35 L80,30 L90,25 L100,20"
                        fill="none"
                        stroke="#0d9488"
                        strokeWidth="2"
                      />
                    </svg>

                    {/* Line 2 */}
                    <svg className="absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <path
                        d="M0,85 L10,80 L20,82 L30,75 L40,70 L50,65 L60,60 L70,55 L80,50 L90,45 L100,40"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="2"
                        strokeDasharray="4 2"
                      />
                    </svg>

                    {/* Gradient area under line 1 */}
                    <svg className="absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#0d9488" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="#0d9488" stopOpacity="0" />
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

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <Card className="border-none shadow-sm overflow-hidden">
                  <div className="h-1 w-full bg-gradient-to-r from-teal-400 to-teal-300"></div>
                  <CardHeader className="pb-2 pt-4">
                    <CardTitle className="text-sm font-medium text-gray-700">Average Growth</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="text-2xl font-bold text-gray-800">+4.8%</div>
                      <div className="flex items-center text-green-500 bg-gradient-to-r from-green-50 to-emerald-50 px-2 py-1 rounded-full text-xs font-medium">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        Monthly
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Month-over-month growth</p>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm overflow-hidden">
                  <div className="h-1 w-full bg-gradient-to-r from-blue-400 to-blue-300"></div>
                  <CardHeader className="pb-2 pt-4">
                    <CardTitle className="text-sm font-medium text-gray-700">Peak Month</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="text-2xl font-bold text-gray-800">September</div>
                      <div className="flex items-center text-blue-500 bg-gradient-to-r from-blue-50 to-sky-50 px-2 py-1 rounded-full text-xs font-medium">
                        <Wallet className="h-3 w-3 mr-1" />
                        Rp 156.2M
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Highest payment volume</p>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm overflow-hidden">
                  <div className="h-1 w-full bg-gradient-to-r from-indigo-400 to-indigo-300"></div>
                  <CardHeader className="pb-2 pt-4">
                    <CardTitle className="text-sm font-medium text-gray-700">Year-over-Year</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="text-2xl font-bold text-gray-800">+12.3%</div>
                      <div className="flex items-center text-green-500 bg-gradient-to-r from-green-50 to-emerald-50 px-2 py-1 rounded-full text-xs font-medium">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        Annual
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Compared to previous year</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

