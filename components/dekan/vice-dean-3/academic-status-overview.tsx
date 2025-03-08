"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useRef } from "react"

interface AcademicStatusOverviewProps {
  departmentId: string
}

export function AcademicStatusOverview({ departmentId }: AcademicStatusOverviewProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)

  // Mock data for academic status overview
  const academicStatusData = {
    all: {
      labels: [
        "Semester 1",
        "Semester 2",
        "Semester 3",
        "Semester 4",
        "Semester 5",
        "Semester 6",
        "Semester 7",
        "Semester 8+",
      ],
      datasets: [
        {
          label: "Mahasiswa Aktif",
          data: [310, 295, 280, 265, 250, 235, 220, 195],
          backgroundColor: "rgba(59, 130, 246, 0.7)",
          borderColor: "rgba(59, 130, 246, 1)",
          borderWidth: 1,
        },
        {
          label: "Mahasiswa Cuti",
          data: [15, 12, 10, 8, 7, 5, 5, 3],
          backgroundColor: "rgba(245, 158, 11, 0.7)",
          borderColor: "rgba(245, 158, 11, 1)",
          borderWidth: 1,
        },
        {
          label: "Mahasiswa IPK < 2.5",
          data: [45, 40, 35, 30, 25, 20, 15, 10],
          backgroundColor: "rgba(239, 68, 68, 0.7)",
          borderColor: "rgba(239, 68, 68, 1)",
          borderWidth: 1,
        },
      ],
    },
    civil: {
      labels: [
        "Semester 1",
        "Semester 2",
        "Semester 3",
        "Semester 4",
        "Semester 5",
        "Semester 6",
        "Semester 7",
        "Semester 8+",
      ],
      datasets: [
        {
          label: "Mahasiswa Aktif",
          data: [65, 62, 58, 55, 52, 48, 45, 35],
          backgroundColor: "rgba(59, 130, 246, 0.7)",
          borderColor: "rgba(59, 130, 246, 1)",
          borderWidth: 1,
        },
        {
          label: "Mahasiswa Cuti",
          data: [3, 2, 2, 2, 2, 1, 2, 1],
          backgroundColor: "rgba(245, 158, 11, 0.7)",
          borderColor: "rgba(245, 158, 11, 1)",
          borderWidth: 1,
        },
        {
          label: "Mahasiswa IPK < 2.5",
          data: [10, 9, 8, 7, 6, 5, 4, 3],
          backgroundColor: "rgba(239, 68, 68, 0.7)",
          borderColor: "rgba(239, 68, 68, 1)",
          borderWidth: 1,
        },
      ],
    },
    electrical: {
      labels: [
        "Semester 1",
        "Semester 2",
        "Semester 3",
        "Semester 4",
        "Semester 5",
        "Semester 6",
        "Semester 7",
        "Semester 8+",
      ],
      datasets: [
        {
          label: "Mahasiswa Aktif",
          data: [55, 52, 50, 48, 45, 42, 40, 36],
          backgroundColor: "rgba(59, 130, 246, 0.7)",
          borderColor: "rgba(59, 130, 246, 1)",
          borderWidth: 1,
        },
        {
          label: "Mahasiswa Cuti",
          data: [3, 2, 2, 1, 1, 1, 1, 1],
          backgroundColor: "rgba(245, 158, 11, 0.7)",
          borderColor: "rgba(245, 158, 11, 1)",
          borderWidth: 1,
        },
        {
          label: "Mahasiswa IPK < 2.5",
          data: [8, 7, 7, 6, 5, 5, 4, 3],
          backgroundColor: "rgba(239, 68, 68, 0.7)",
          borderColor: "rgba(239, 68, 68, 1)",
          borderWidth: 1,
        },
      ],
    },
    architecture: {
      labels: [
        "Semester 1",
        "Semester 2",
        "Semester 3",
        "Semester 4",
        "Semester 5",
        "Semester 6",
        "Semester 7",
        "Semester 8+",
      ],
      datasets: [
        {
          label: "Mahasiswa Aktif",
          data: [50, 48, 45, 42, 40, 38, 35, 30],
          backgroundColor: "rgba(59, 130, 246, 0.7)",
          borderColor: "rgba(59, 130, 246, 1)",
          borderWidth: 1,
        },
        {
          label: "Mahasiswa Cuti",
          data: [2, 2, 1, 1, 1, 0, 1, 0],
          backgroundColor: "rgba(245, 158, 11, 0.7)",
          borderColor: "rgba(245, 158, 11, 1)",
          borderWidth: 1,
        },
        {
          label: "Mahasiswa IPK < 2.5",
          data: [7, 6, 6, 5, 4, 4, 3, 2],
          backgroundColor: "rgba(239, 68, 68, 0.7)",
          borderColor: "rgba(239, 68, 68, 1)",
          borderWidth: 1,
        },
      ],
    },
    informatics: {
      labels: [
        "Semester 1",
        "Semester 2",
        "Semester 3",
        "Semester 4",
        "Semester 5",
        "Semester 6",
        "Semester 7",
        "Semester 8+",
      ],
      datasets: [
        {
          label: "Mahasiswa Aktif",
          data: [80, 75, 72, 68, 65, 60, 55, 50],
          backgroundColor: "rgba(59, 130, 246, 0.7)",
          borderColor: "rgba(59, 130, 246, 1)",
          borderWidth: 1,
        },
        {
          label: "Mahasiswa Cuti",
          data: [4, 3, 3, 2, 2, 2, 2, 2],
          backgroundColor: "rgba(245, 158, 11, 0.7)",
          borderColor: "rgba(245, 158, 11, 1)",
          borderWidth: 1,
        },
        {
          label: "Mahasiswa IPK < 2.5",
          data: [12, 10, 9, 8, 7, 6, 5, 4],
          backgroundColor: "rgba(239, 68, 68, 0.7)",
          borderColor: "rgba(239, 68, 68, 1)",
          borderWidth: 1,
        },
      ],
    },
    urban: {
      labels: [
        "Semester 1",
        "Semester 2",
        "Semester 3",
        "Semester 4",
        "Semester 5",
        "Semester 6",
        "Semester 7",
        "Semester 8+",
      ],
      datasets: [
        {
          label: "Mahasiswa Aktif",
          data: [60, 58, 55, 52, 48, 45, 42, 40],
          backgroundColor: "rgba(59, 130, 246, 0.7)",
          borderColor: "rgba(59, 130, 246, 1)",
          borderWidth: 1,
        },
        {
          label: "Mahasiswa Cuti",
          data: [3, 2, 2, 2, 1, 1, 1, 0],
          backgroundColor: "rgba(245, 158, 11, 0.7)",
          borderColor: "rgba(245, 158, 11, 1)",
          borderWidth: 1,
        },
        {
          label: "Mahasiswa IPK < 2.5",
          data: [9, 8, 7, 6, 5, 4, 3, 2],
          backgroundColor: "rgba(239, 68, 68, 0.7)",
          borderColor: "rgba(239, 68, 68, 1)",
          borderWidth: 1,
        },
      ],
    },
  }

  useEffect(() => {
    if (!chartRef.current) return

    // Dynamically import Chart.js to avoid SSR issues
    const loadChart = async () => {
      const { Chart, registerables } = await import("chart.js")
      Chart.register(...registerables)

      const ctx = chartRef.current?.getContext("2d")
      if (!ctx) return

      // Destroy previous chart instance if it exists
      const chartInstance = Chart.getChart(chartRef.current)
      if (chartInstance) {
        chartInstance.destroy()
      }

      const data = academicStatusData[departmentId as keyof typeof academicStatusData] || academicStatusData.all

      new Chart(ctx, {
        type: "bar",
        data: {
          labels: data.labels,
          datasets: data.datasets,
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              stacked: false,
            },
            y: {
              stacked: false,
              beginAtZero: true,
            },
          },
        },
      })
    }

    loadChart()
  }, [departmentId])

  return (
    <Card className="border-none shadow-md bg-white dark:bg-gray-950 transition-all duration-200 hover:shadow-lg">
      <CardHeader className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 border-b">
        <CardTitle className="text-lg font-semibold text-primary-700 dark:text-primary-300">
          Status Akademik Mahasiswa
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="chart">
          <TabsList className="grid w-full grid-cols-2 bg-muted/30 p-1 rounded-xl mb-6">
            <TabsTrigger
              value="chart"
              className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-primary-700 data-[state=active]:shadow-sm transition-all"
            >
              Grafik
            </TabsTrigger>
            <TabsTrigger
              value="summary"
              className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-primary-700 data-[state=active]:shadow-sm transition-all"
            >
              Ringkasan
            </TabsTrigger>
          </TabsList>
          <TabsContent value="chart" className="mt-6">
            <div className="h-[350px] w-full p-2 bg-white dark:bg-gray-950 rounded-xl">
              <canvas ref={chartRef} />
            </div>
          </TabsContent>
          <TabsContent value="summary" className="mt-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:border-primary-100 dark:hover:border-primary-900 group">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-blue-50 dark:bg-blue-950 flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-900 transition-colors">
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
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Mahasiswa Aktif</div>
                </div>
                <div className="mt-3 text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {departmentId === "all"
                    ? "1550"
                    : departmentId === "civil"
                      ? "320"
                      : departmentId === "electrical"
                        ? "280"
                        : departmentId === "architecture"
                          ? "250"
                          : departmentId === "informatics"
                            ? "410"
                            : "290"}
                </div>
                <div className="mt-2 text-xs text-muted-foreground">Mahasiswa yang terdaftar dan aktif</div>
              </div>
              <div className="rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:border-primary-100 dark:hover:border-primary-900 group">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-amber-50 dark:bg-amber-950 flex items-center justify-center group-hover:bg-amber-100 dark:group-hover:bg-amber-900 transition-colors">
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
                      className="text-amber-500 dark:text-amber-400"
                    >
                      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                      <line x1="12" y1="9" x2="12" y2="13"></line>
                      <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                  </div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Mahasiswa Cuti</div>
                </div>
                <div className="mt-3 text-2xl font-bold text-amber-600 dark:text-amber-400">
                  {departmentId === "all"
                    ? "65"
                    : departmentId === "civil"
                      ? "15"
                      : departmentId === "electrical"
                        ? "12"
                        : departmentId === "architecture"
                          ? "8"
                          : departmentId === "informatics"
                            ? "20"
                            : "10"}
                </div>
                <div className="mt-2 text-xs text-muted-foreground">Mahasiswa yang sedang cuti akademik</div>
              </div>
              <div className="rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:border-primary-100 dark:hover:border-primary-900 group">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-red-50 dark:bg-red-950 flex items-center justify-center group-hover:bg-red-100 dark:group-hover:bg-red-900 transition-colors">
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
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Mahasiswa IPK {"<"} 2.5</div>
                </div>
                <div className="mt-3 text-2xl font-bold text-red-600 dark:text-red-400">
                  {departmentId === "all"
                    ? "220"
                    : departmentId === "civil"
                      ? "52"
                      : departmentId === "electrical"
                        ? "45"
                        : departmentId === "architecture"
                          ? "37"
                          : departmentId === "informatics"
                            ? "61"
                            : "44"}
                </div>
                <div className="mt-2 text-xs text-muted-foreground">Mahasiswa dengan IPK di bawah 2.5</div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

