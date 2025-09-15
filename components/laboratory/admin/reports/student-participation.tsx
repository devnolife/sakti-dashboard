"use client"

import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Download, ChevronDown, Users, Calendar, BarChart3 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for student participation
const mockParticipationData = [
  {
    id: 1,
    labName: "Computer Networks Lab",
    totalStudents: 120,
    attendanceRate: 92,
    completionRate: 88,
    avgScore: 85,
    participationTrend: [
      { month: "Jan", attendance: 90 },
      { month: "Feb", attendance: 92 },
      { month: "Mar", attendance: 88 },
      { month: "Apr", attendance: 94 },
      { month: "May", attendance: 96 },
    ],
  },
  {
    id: 2,
    labName: "Database Systems Lab",
    totalStudents: 95,
    attendanceRate: 88,
    completionRate: 82,
    avgScore: 78,
    participationTrend: [
      { month: "Jan", attendance: 85 },
      { month: "Feb", attendance: 87 },
      { month: "Mar", attendance: 90 },
      { month: "Apr", attendance: 88 },
      { month: "May", attendance: 90 },
    ],
  },
  {
    id: 3,
    labName: "Operating Systems Lab",
    totalStudents: 110,
    attendanceRate: 85,
    completionRate: 80,
    avgScore: 76,
    participationTrend: [
      { month: "Jan", attendance: 82 },
      { month: "Feb", attendance: 84 },
      { month: "Mar", attendance: 86 },
      { month: "Apr", attendance: 85 },
      { month: "May", attendance: 88 },
    ],
  },
  {
    id: 4,
    labName: "Software Engineering Lab",
    totalStudents: 85,
    attendanceRate: 94,
    completionRate: 90,
    avgScore: 88,
    participationTrend: [
      { month: "Jan", attendance: 92 },
      { month: "Feb", attendance: 94 },
      { month: "Mar", attendance: 93 },
      { month: "Apr", attendance: 95 },
      { month: "May", attendance: 96 },
    ],
  },
  {
    id: 5,
    labName: "Data Structures Lab",
    totalStudents: 130,
    attendanceRate: 90,
    completionRate: 85,
    avgScore: 82,
    participationTrend: [
      { month: "Jan", attendance: 88 },
      { month: "Feb", attendance: 90 },
      { month: "Mar", attendance: 89 },
      { month: "Apr", attendance: 91 },
      { month: "May", attendance: 92 },
    ],
  },
]

// Mock data for detailed student participation
const mockDetailedStudentData = [
  {
    id: 1,
    name: "Ahmad Fauzi",
    nim: "1234567890",
    lab: "Computer Networks Lab",
    attendance: 95,
    completionRate: 92,
    score: 88,
    status: "Excellent",
  },
  {
    id: 2,
    name: "Siti Nurhaliza",
    nim: "2345678901",
    lab: "Computer Networks Lab",
    attendance: 90,
    completionRate: 85,
    score: 82,
    status: "Good",
  },
  {
    id: 3,
    name: "Budi Santoso",
    nim: "3456789012",
    lab: "Database Systems Lab",
    attendance: 85,
    completionRate: 80,
    score: 75,
    status: "Average",
  },
  {
    id: 4,
    name: "Dewi Kartika",
    nim: "4567890123",
    lab: "Database Systems Lab",
    attendance: 92,
    completionRate: 88,
    score: 85,
    status: "Good",
  },
  {
    id: 5,
    name: "Eko Prasetyo",
    nim: "5678901234",
    lab: "Operating Systems Lab",
    attendance: 78,
    completionRate: 75,
    score: 70,
    status: "Below Average",
  },
  {
    id: 6,
    name: "Fitri Handayani",
    nim: "6789012345",
    lab: "Operating Systems Lab",
    attendance: 88,
    completionRate: 82,
    score: 78,
    status: "Average",
  },
  {
    id: 7,
    name: "Gunawan Wibisono",
    nim: "7890123456",
    lab: "Software Engineering Lab",
    attendance: 96,
    completionRate: 94,
    score: 90,
    status: "Excellent",
  },
  {
    id: 8,
    name: "Hani Susanti",
    nim: "8901234567",
    lab: "Software Engineering Lab",
    attendance: 93,
    completionRate: 90,
    score: 86,
    status: "Good",
  },
  {
    id: 9,
    name: "Irfan Hakim",
    nim: "9012345678",
    lab: "Data Structures Lab",
    attendance: 91,
    completionRate: 87,
    score: 84,
    status: "Good",
  },
  {
    id: 10,
    name: "Joko Widodo",
    nim: "0123456789",
    lab: "Data Structures Lab",
    attendance: 89,
    completionRate: 84,
    score: 80,
    status: "Average",
  },
]

// Function to get status color
const getStatusColor = (status: string) => {
  switch (status) {
    case "Excellent":
      return "bg-green-100 text-green-800 hover:bg-green-200"
    case "Good":
      return "bg-blue-100 text-blue-800 hover:bg-blue-200"
    case "Average":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
    case "Below Average":
      return "bg-red-100 text-red-800 hover:bg-red-200"
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-200"
  }
}

// Function to get bar color based on attendance rate
const getBarColor = (attendance: number) => {
  if (attendance >= 90) return "#10b981" // green
  if (attendance >= 80) return "#3b82f6" // blue
  if (attendance >= 70) return "#f59e0b" // yellow
  return "#ef4444" // red
}

export function StudentParticipation() {
  const [selectedLab, setSelectedLab] = useState<string>("all")
  const [selectedPeriod, setSelectedPeriod] = useState<string>("semester")
  const [selectedView, setSelectedView] = useState<"chart" | "table">("chart")

  // Filter data based on selected lab
  const filteredLabData =
    selectedLab === "all" ? mockParticipationData : mockParticipationData.filter((lab) => lab.labName === selectedLab)

  // Filter student data based on selected lab
  const filteredStudentData =
    selectedLab === "all"
      ? mockDetailedStudentData
      : mockDetailedStudentData.filter((student) => student.lab === selectedLab)

  // Prepare data for comparison chart
  const comparisonData = mockParticipationData.map((lab) => ({
    name: lab.labName,
    attendance: lab.attendanceRate,
    completion: lab.completionRate,
    score: lab.avgScore,
  }))

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Student Participation Analysis
          </h2>
          <p className="text-gray-600 text-lg">Analyze student participation metrics across different laboratories</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Select value={selectedLab} onValueChange={setSelectedLab}>
            <SelectTrigger className="w-[200px] h-11 bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow rounded-xl">
              <SelectValue placeholder="Select Lab" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-gray-200 shadow-xl">
              <SelectItem value="all" className="rounded-lg">All Labs</SelectItem>
              {mockParticipationData.map((lab) => (
                <SelectItem key={lab.id} value={lab.labName} className="rounded-lg">
                  {lab.labName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[200px] h-11 bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow rounded-xl">
              <SelectValue placeholder="Select Period" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-gray-200 shadow-xl">
              <SelectItem value="semester" className="rounded-lg">Current Semester</SelectItem>
              <SelectItem value="year" className="rounded-lg">Academic Year</SelectItem>
              <SelectItem value="month" className="rounded-lg">Last Month</SelectItem>
            </SelectContent>
          </Select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 h-11 px-6 bg-white border-gray-200 shadow-sm hover:shadow-md transition-all hover:bg-gray-50 rounded-xl">
                <Download className="h-4 w-4" />
                Export
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="rounded-xl border-gray-200 shadow-xl">
              <DropdownMenuItem className="rounded-lg">Export as PDF</DropdownMenuItem>
              <DropdownMenuItem className="rounded-lg">Export as Excel</DropdownMenuItem>
              <DropdownMenuItem className="rounded-lg">Export as CSV</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Participation Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -translate-y-16 translate-x-16"></div>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-sm font-semibold text-blue-900">Total Students</CardTitle>
            <div className="p-2 bg-blue-500 rounded-xl">
              <Users className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900 mb-1">
              {filteredLabData.reduce((sum, lab) => sum + lab.totalStudents, 0)}
            </div>
            <p className="text-sm text-blue-700">Across {filteredLabData.length} laboratories</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl bg-gradient-to-br from-green-50 to-green-100">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full -translate-y-16 translate-x-16"></div>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-sm font-semibold text-green-900">Avg. Attendance Rate</CardTitle>
            <div className="p-2 bg-green-500 rounded-xl">
              <Calendar className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-900 mb-1">
              {Math.round(filteredLabData.reduce((sum, lab) => sum + lab.attendanceRate, 0) / filteredLabData.length)}%
            </div>
            <p className="text-sm text-green-700">
              {selectedPeriod === "semester"
                ? "Current Semester"
                : selectedPeriod === "year"
                  ? "Academic Year"
                  : "Last Month"}
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full -translate-y-16 translate-x-16"></div>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-sm font-semibold text-purple-900">Avg. Completion Rate</CardTitle>
            <div className="p-2 bg-purple-500 rounded-xl">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-900 mb-1">
              {Math.round(filteredLabData.reduce((sum, lab) => sum + lab.completionRate, 0) / filteredLabData.length)}%
            </div>
            <p className="text-sm text-purple-700">Task completion across labs</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full -translate-y-16 translate-x-16"></div>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-sm font-semibold text-orange-900">Avg. Score</CardTitle>
            <div className="p-2 bg-orange-500 rounded-xl">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-900 mb-1">
              {Math.round(filteredLabData.reduce((sum, lab) => sum + lab.avgScore, 0) / filteredLabData.length)}
            </div>
            <p className="text-sm text-orange-700">Average performance score</p>
          </CardContent>
        </Card>
      </div>

      {/* View Toggle */}
      <div className="flex justify-end">
        <div className="inline-flex rounded-2xl bg-gray-100 p-1 shadow-inner">
          <Button
            variant={selectedView === "chart" ? "default" : "ghost"}
            className={`rounded-xl px-6 transition-all duration-200 ${
              selectedView === "chart"
                ? "bg-white shadow-md text-gray-900"
                : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
            }`}
            onClick={() => setSelectedView("chart")}
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Chart View
          </Button>
          <Button
            variant={selectedView === "table" ? "default" : "ghost"}
            className={`rounded-xl px-6 transition-all duration-200 ${
              selectedView === "table"
                ? "bg-white shadow-md text-gray-900"
                : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
            }`}
            onClick={() => setSelectedView("table")}
          >
            <Users className="h-4 w-4 mr-2" />
            Table View
          </Button>
        </div>
      </div>

      {/* Participation Chart */}
      {selectedView === "chart" && (
        <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 border-b border-gray-100">
            <CardTitle className="text-xl font-bold text-gray-900">Participation Metrics Comparison</CardTitle>
            <CardDescription className="text-gray-600">
              Comparing attendance, completion rates, and average scores across laboratories
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="h-[400px]">
              <ChartContainer
                config={{
                  attendance: {
                    label: "Attendance Rate",
                    color: "hsl(var(--chart-1))",
                  },
                  completion: {
                    label: "Completion Rate",
                    color: "hsl(var(--chart-2))",
                  },
                  score: {
                    label: "Average Score",
                    color: "hsl(var(--chart-3))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis
                      dataKey="name"
                      angle={-45}
                      textAnchor="end"
                      height={70}
                      tick={{ fontSize: 12, fill: '#64748b' }}
                    />
                    <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar
                      dataKey="attendance"
                      name="Attendance Rate"
                      fill="var(--color-attendance)"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="completion"
                      name="Completion Rate"
                      fill="var(--color-completion)"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="score"
                      name="Average Score"
                      fill="var(--color-score)"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Participation Table */}
      {selectedView === "table" && (
        <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 border-b border-gray-100">
            <CardTitle className="text-xl font-bold text-gray-900">Detailed Student Participation</CardTitle>
            <CardDescription className="text-gray-600">
              Individual student participation metrics for {selectedLab === "all" ? "all laboratories" : selectedLab}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50/50">
                    <TableHead className="font-semibold text-gray-900">Name</TableHead>
                    <TableHead className="font-semibold text-gray-900">NIM</TableHead>
                    <TableHead className="font-semibold text-gray-900">Laboratory</TableHead>
                    <TableHead className="text-right font-semibold text-gray-900">Attendance</TableHead>
                    <TableHead className="text-right font-semibold text-gray-900">Completion</TableHead>
                    <TableHead className="text-right font-semibold text-gray-900">Score</TableHead>
                    <TableHead className="text-center font-semibold text-gray-900">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudentData.map((student) => (
                    <TableRow key={student.id} className="hover:bg-gray-50/50 transition-colors">
                      <TableCell className="font-medium text-gray-900">{student.name}</TableCell>
                      <TableCell className="text-gray-600">{student.nim}</TableCell>
                      <TableCell className="text-gray-600">{student.lab}</TableCell>
                      <TableCell className="text-right font-semibold">{student.attendance}%</TableCell>
                      <TableCell className="text-right font-semibold">{student.completionRate}%</TableCell>
                      <TableCell className="text-right font-semibold">{student.score}</TableCell>
                      <TableCell className="text-center">
                        <Badge className={`${getStatusColor(student.status)} border-0 font-medium`}>
                          {student.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Participation Trends */}
      <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 border-b border-gray-100">
          <CardTitle className="text-xl font-bold text-gray-900">Participation Trends</CardTitle>
          <CardDescription className="text-gray-600">
            Monthly attendance trends for {selectedLab === "all" ? "selected laboratories" : selectedLab}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={
                  selectedLab === "all"
                    ? mockParticipationData[0].participationTrend
                    : mockParticipationData.find((lab) => lab.labName === selectedLab)?.participationTrend || []
                }
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  axisLine={{ stroke: '#e2e8f0' }}
                />
                <YAxis
                  domain={[70, 100]}
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  axisLine={{ stroke: '#e2e8f0' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                  }}
                />
                <Legend />
                <Bar dataKey="attendance" name="Attendance Rate" radius={[8, 8, 0, 0]}>
                  {(selectedLab === "all"
                    ? mockParticipationData[0].participationTrend
                    : mockParticipationData.find((lab) => lab.labName === selectedLab)?.participationTrend || []
                  ).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getBarColor(entry.attendance)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

