"use client"

import { useEffect, useRef } from "react"

interface GpaDistributionChartProps {
  departmentId: string
}

export function GpaDistributionChart({ departmentId }: GpaDistributionChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)

  // Mock data for GPA distribution
  const gpaData = {
    all: {
      labels: ["< 2.0", "2.0 - 2.5", "2.5 - 3.0", "3.0 - 3.5", "3.5 - 4.0"],
      datasets: [
        {
          label: "Teknik Sipil",
          data: [15, 35, 95, 120, 55],
          backgroundColor: "rgba(59, 130, 246, 0.7)",
        },
        {
          label: "Teknik Elektro",
          data: [12, 30, 85, 105, 48],
          backgroundColor: "rgba(245, 158, 11, 0.7)",
        },
        {
          label: "Arsitektur",
          data: [10, 28, 75, 95, 42],
          backgroundColor: "rgba(16, 185, 129, 0.7)",
        },
        {
          label: "Informatika",
          data: [18, 42, 110, 150, 90],
          backgroundColor: "rgba(236, 72, 153, 0.7)",
        },
        {
          label: "PWK",
          data: [14, 32, 85, 110, 49],
          backgroundColor: "rgba(124, 58, 237, 0.7)",
        },
      ],
    },
    civil: {
      labels: ["< 2.0", "2.0 - 2.5", "2.5 - 3.0", "3.0 - 3.5", "3.5 - 4.0"],
      datasets: [
        {
          label: "Teknik Sipil",
          data: [15, 35, 95, 120, 55],
          backgroundColor: "rgba(59, 130, 246, 0.7)",
        },
      ],
    },
    electrical: {
      labels: ["< 2.0", "2.0 - 2.5", "2.5 - 3.0", "3.0 - 3.5", "3.5 - 4.0"],
      datasets: [
        {
          label: "Teknik Elektro",
          data: [12, 30, 85, 105, 48],
          backgroundColor: "rgba(245, 158, 11, 0.7)",
        },
      ],
    },
    architecture: {
      labels: ["< 2.0", "2.0 - 2.5", "2.5 - 3.0", "3.0 - 3.5", "3.5 - 4.0"],
      datasets: [
        {
          label: "Arsitektur",
          data: [10, 28, 75, 95, 42],
          backgroundColor: "rgba(16, 185, 129, 0.7)",
        },
      ],
    },
    informatics: {
      labels: ["< 2.0", "2.0 - 2.5", "2.5 - 3.0", "3.0 - 3.5", "3.5 - 4.0"],
      datasets: [
        {
          label: "Informatika",
          data: [18, 42, 110, 150, 90],
          backgroundColor: "rgba(236, 72, 153, 0.7)",
        },
      ],
    },
    urban: {
      labels: ["< 2.0", "2.0 - 2.5", "2.5 - 3.0", "3.0 - 3.5", "3.5 - 4.0"],
      datasets: [
        {
          label: "PWK",
          data: [14, 32, 85, 110, 49],
          backgroundColor: "rgba(124, 58, 237, 0.7)",
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

      const data = gpaData[departmentId as keyof typeof gpaData] || gpaData.all

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
              stacked: departmentId !== "all",
            },
            y: {
              stacked: departmentId !== "all",
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

