"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Download, FileText, Filter } from "lucide-react"

interface DepartmentData {
  id: string
  name: string
  totalStudents: number
  activeStudents: number
  onLeaveStudents: number
  graduatedStudents: number
  averageGpa: number
  belowAverageCount: number
  belowAveragePercentage: number
  academicWarningCount: number
  academicWarningPercentage: number
  byYear: {
    year: string
    count: number
    maleCount: number
    femaleCount: number
    averageGpa: number
  }[]
}

export function DepartmentStudentRecap() {
  // Mock data for department student recap
  const departmentsData: DepartmentData[] = [
    {
      id: "civil",
      name: "Teknik Sipil - Irigasi",
      totalStudents: 320,
      activeStudents: 320,
      onLeaveStudents: 15,
      graduatedStudents: 85,
      averageGpa: 3.1,
      belowAverageCount: 48,
      belowAveragePercentage: 15,
      academicWarningCount: 12,
      academicWarningPercentage: 3.75,
      byYear: [
        { year: "2023", count: 80, maleCount: 48, femaleCount: 32, averageGpa: 3.2 },
        { year: "2022", count: 75, maleCount: 45, femaleCount: 30, averageGpa: 3.1 },
        { year: "2021", count: 70, maleCount: 42, femaleCount: 28, averageGpa: 3.0 },
        { year: "2020", count: 65, maleCount: 39, femaleCount: 26, averageGpa: 3.1 },
        { year: "2019", count: 30, maleCount: 18, femaleCount: 12, averageGpa: 3.2 },
      ],
    },
    {
      id: "electrical",
      name: "Teknik Elektro",
      totalStudents: 280,
      activeStudents: 280,
      onLeaveStudents: 12,
      graduatedStudents: 70,
      averageGpa: 3.2,
      belowAverageCount: 42,
      belowAveragePercentage: 15,
      academicWarningCount: 10,
      academicWarningPercentage: 3.57,
      byYear: [
        { year: "2023", count: 70, maleCount: 49, femaleCount: 21, averageGpa: 3.3 },
        { year: "2022", count: 65, maleCount: 46, femaleCount: 19, averageGpa: 3.2 },
        { year: "2021", count: 60, maleCount: 42, femaleCount: 18, averageGpa: 3.1 },
        { year: "2020", count: 55, maleCount: 39, femaleCount: 16, averageGpa: 3.2 },
        { year: "2019", count: 30, maleCount: 21, femaleCount: 9, averageGpa: 3.3 },
      ],
    },
    {
      id: "architecture",
      name: "Arsitektur",
      totalStudents: 250,
      activeStudents: 250,
      onLeaveStudents: 8,
      graduatedStudents: 65,
      averageGpa: 3.3,
      belowAverageCount: 38,
      belowAveragePercentage: 15.2,
      academicWarningCount: 9,
      academicWarningPercentage: 3.6,
      byYear: [
        { year: "2023", count: 60, maleCount: 30, femaleCount: 30, averageGpa: 3.4 },
        { year: "2022", count: 55, maleCount: 28, femaleCount: 27, averageGpa: 3.3 },
        { year: "2021", count: 50, maleCount: 25, femaleCount: 25, averageGpa: 3.2 },
        { year: "2020", count: 45, maleCount: 23, femaleCount: 22, averageGpa: 3.3 },
        { year: "2019", count: 40, maleCount: 20, femaleCount: 20, averageGpa: 3.4 },
      ],
    },
    {
      id: "informatics",
      name: "Informatika",
      totalStudents: 410,
      activeStudents: 410,
      onLeaveStudents: 20,
      graduatedStudents: 95,
      averageGpa: 3.4,
      belowAverageCount: 62,
      belowAveragePercentage: 15.1,
      academicWarningCount: 15,
      academicWarningPercentage: 3.66,
      byYear: [
        { year: "2023", count: 100, maleCount: 70, femaleCount: 30, averageGpa: 3.5 },
        { year: "2022", count: 95, maleCount: 67, femaleCount: 28, averageGpa: 3.4 },
        { year: "2021", count: 90, maleCount: 63, femaleCount: 27, averageGpa: 3.3 },
        { year: "2020", count: 85, maleCount: 60, femaleCount: 25, averageGpa: 3.4 },
        { year: "2019", count: 40, maleCount: 28, femaleCount: 12, averageGpa: 3.5 },
      ],
    },
    {
      id: "urban",
      name: "Perencanaan Wilayah dan Kota",
      totalStudents: 290,
      activeStudents: 290,
      onLeaveStudents: 10,
      graduatedStudents: 75,
      averageGpa: 3.2,
      belowAverageCount: 44,
      belowAveragePercentage: 15.2,
      academicWarningCount: 11,
      academicWarningPercentage: 3.79,
      byYear: [
        { year: "2023", count: 70, maleCount: 35, femaleCount: 35, averageGpa: 3.3 },
        { year: "2022", count: 65, maleCount: 33, femaleCount: 32, averageGpa: 3.2 },
        { year: "2021", count: 60, maleCount: 30, femaleCount: 30, averageGpa: 3.1 },
        { year: "2020", count: 55, maleCount: 28, femaleCount: 27, averageGpa: 3.2 },
        { year: "2019", count: 40, maleCount: 20, femaleCount: 20, averageGpa: 3.3 },
      ],
    },
  ]

  return (
    <Card className="border-none shadow-md bg-white dark:bg-gray-950 transition-all duration-200">
      <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 border-b">
        <CardTitle className="text-lg font-semibold text-primary-700 dark:text-primary-300">
          Rekap Mahasiswa per Program Studi
        </CardTitle>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <Filter className="mr-2 h-4 w-4 text-primary-500" />
            Filter
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <Download className="mr-2 h-4 w-4 text-primary-500" />
            Ekspor Excel
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <FileText className="mr-2 h-4 w-4 text-primary-500" />
            Ekspor PDF
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="civil">
          <TabsList className="grid w-full grid-cols-5 bg-muted/30 p-1 rounded-xl mb-6">
            {departmentsData.map((dept) => (
              <TabsTrigger
                key={dept.id}
                value={dept.id}
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-primary-700 data-[state=active]:shadow-sm transition-all"
              >
                {dept.name.split(" ")[0]}
              </TabsTrigger>
            ))}
          </TabsList>

          {departmentsData.map((dept) => (
            <TabsContent key={dept.id} value={dept.id} className="mt-6">
              <div className="grid gap-6 md:grid-cols-4">
                <div className="rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:border-primary-100 dark:hover:border-primary-900">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-blue-50 dark:bg-blue-950 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-blue-500 dark:text-blue-400"
                      >
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                    </div>
                    <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Mahasiswa</div>
                  </div>
                  <div className="mt-3 text-2xl font-bold">{dept.totalStudents}</div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    Aktif: {dept.activeStudents} | Cuti: {dept.onLeaveStudents} | Lulus: {dept.graduatedStudents}
                  </div>
                </div>
                <div className="rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:border-primary-100 dark:hover:border-primary-900">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-green-50 dark:bg-green-950 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-500 dark:text-green-400"
                      >
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                      </svg>
                    </div>
                    <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Rata-rata IPK</div>
                  </div>
                  <div className="mt-3 text-2xl font-bold">{dept.averageGpa.toFixed(2)}</div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    Di bawah rata-rata: {dept.belowAverageCount} ({dept.belowAveragePercentage}%)
                  </div>
                </div>
                <div className="rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:border-primary-100 dark:hover:border-primary-900">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-red-50 dark:bg-red-950 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-red-500 dark:text-red-400"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                      </svg>
                    </div>
                    <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Peringatan Akademik</div>
                  </div>
                  <div className="mt-3 text-2xl font-bold">{dept.academicWarningCount}</div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    {dept.academicWarningPercentage}% dari total mahasiswa
                  </div>
                </div>
                <div className="rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:border-primary-100 dark:hover:border-primary-900">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-purple-50 dark:bg-purple-950 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-purple-500 dark:text-purple-400"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                        <line x1="9" y1="9" x2="9.01" y2="9"></line>
                        <line x1="15" y1="9" x2="15.01" y2="9"></line>
                      </svg>
                    </div>
                    <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Rasio Gender</div>
                  </div>
                  <div className="mt-3 text-2xl font-bold">
                    {Math.round(
                      (dept.byYear.reduce((acc, year) => acc + year.maleCount, 0) / dept.totalStudents) * 100,
                    )}
                    % :{" "}
                    {Math.round(
                      (dept.byYear.reduce((acc, year) => acc + year.femaleCount, 0) / dept.totalStudents) * 100,
                    )}
                    %
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">Laki-laki : Perempuan</div>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-900">
                        <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
                          Angkatan
                        </th>
                        <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
                          Jumlah
                        </th>
                        <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
                          Laki-laki
                        </th>
                        <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
                          Perempuan
                        </th>
                        <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
                          Rata-rata IPK
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {dept.byYear.map((year) => (
                        <tr
                          key={year.year}
                          className="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                        >
                          <td className="whitespace-nowrap px-4 py-3 text-sm font-medium">{year.year}</td>
                          <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                            {year.count}
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                            {year.maleCount}{" "}
                            <span className="text-xs text-gray-500">
                              ({Math.round((year.maleCount / year.count) * 100)}%)
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                            {year.femaleCount}{" "}
                            <span className="text-xs text-gray-500">
                              ({Math.round((year.femaleCount / year.count) * 100)}%)
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                            {year.averageGpa.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}

