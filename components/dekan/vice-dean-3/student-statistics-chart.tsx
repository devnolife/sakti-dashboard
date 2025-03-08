"use client"

import { useEffect, useRef } from "react"

interface StudentStatisticsChartProps {
  departmentId: string
}

export function StudentStatisticsChart({ departmentId }: StudentStatisticsChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)

  // Mock data for student statistics
  const studentData = {
    all: {
      labels: ["Teknik Sipil", "Teknik Elektro", "Arsitektur", "Informatika", "PWK"],
      active: [320, 280, 250, 410, 290],
      onLeave: [15, 12, 8, 20, 10],
      graduated: [85, 70, 65, 95, 75],
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
      active: [45, 42, 40, 38, 36, 35, 50, 34],
      onLeave: [2, 3, 1, 2, 2, 1, 2, 2],
      graduated: [0, 0, 0, 0, 0, 0, 0, 85],
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
      active: [40, 38, 36, 35, 33, 32, 36, 30],
      onLeave: [2, 1, 2, 1, 2, 1, 1, 2],
      graduated: [0, 0, 0, 0, 0, 0, 0, 70],
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
      active: [35, 33, 32, 31, 30, 30, 32, 27],
      onLeave: [1, 2, 1, 1, 1, 0, 1, 1],
      graduated: [0, 0, 0, 0, 0, 0, 0, 65],
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
      active: [60, 58, 55, 52, 50, 48, 52, 35],
      onLeave: [3, 2, 3, 2, 3, 2, 3, 2],
      graduated: [0, 0, 0, 0, 0, 0, 0, 95],
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
      active: [42, 40, 38, 36, 35, 34, 38, 27],
      onLeave: [2, 1, 2, 1, 1, 1, 1, 1],
      graduated: [0, 0, 0, 0, 0, 0, 0, 75],
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

      const data = studentData[departmentId as keyof typeof studentData] || studentData.all

      new Chart(ctx, {
        type: "bar",
        data: {
          labels: data.labels,
          datasets: [
            {
              label: "Mahasiswa Aktif",
              data: data.active,
              backgroundColor: "rgba(59, 130, 246, 0.7)",
              borderColor: "rgba(59, 130, 246, 1)",
              borderWidth: 1,
            },
            {
              label: "Mahasiswa Cuti",
              data: data.onLeave,
              backgroundColor: "rgba(245, 158, 11, 0.7)",
              borderColor: "rgba(245, 158, 11, 1)",
              borderWidth: 1,
            },
            {
              label: "Mahasiswa Lulus",
              data: data.graduated,
              backgroundColor: "rgba(16, 185, 129, 0.7)",
              borderColor: "rgba(16, 185, 129, 1)",
              borderWidth: 1,
            },
          ],
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
    <div className="h-[350px] w-full p-2 bg-white dark:bg-gray-950 rounded-xl">
      <canvas ref={chartRef} />
    </div>
  )
}

