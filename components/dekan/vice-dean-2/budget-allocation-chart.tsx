"use client"

import { useRef } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PieChart, BarChart3 } from "lucide-react"
import { useTheme } from "next-themes"

// Import Chart.js
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js"
import { Bar, Pie } from "react-chartjs-2"

// Register Chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement)

// Department data
const departments = [
  "Teknik Pengairan",
  "Teknik Elektro",
  "Arsitektur",
  "Informatika",
  "Perencanaan Wilayah Kota",
]

// Budget allocation data (in millions of Rupiah)
const budgetData = {
  // Department budgets
  departmentBudgets: [2100, 2500, 1800, 3200, 1900],

  // Category budgets
  categoryBudgets: {
    labels: ["Operasional", "Penelitian", "Pengembangan", "Beasiswa", "Fasilitas"],
    datasets: [
      {
        label: "Teknik Sipil - Irigasi",
        data: [800, 400, 300, 200, 400],
        backgroundColor: "rgba(53, 162, 235, 0.7)",
      },
      {
        label: "Teknik Elektro",
        data: [900, 600, 400, 250, 350],
        backgroundColor: "rgba(255, 99, 132, 0.7)",
      },
      {
        label: "Arsitektur",
        data: [700, 300, 250, 200, 350],
        backgroundColor: "rgba(75, 192, 192, 0.7)",
      },
      {
        label: "Informatika",
        data: [1200, 700, 500, 300, 500],
        backgroundColor: "rgba(255, 159, 64, 0.7)",
      },
      {
        label: "Perencanaan Wilayah & Kota",
        data: [750, 350, 300, 200, 300],
        backgroundColor: "rgba(153, 102, 255, 0.7)",
      },
    ],
  },
}

export function BudgetAllocationChart() {
  const { theme } = useTheme()
  const chartRef = useRef<Chart | null>(null)

  // Set chart colors based on theme
  const textColor = theme === "dark" ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)"
  const gridColor = theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"

  // Department budget data for pie chart
  const departmentPieData = {
    labels: departments,
    datasets: [
      {
        data: budgetData.departmentBudgets,
        backgroundColor: [
          "rgba(53, 162, 235, 0.7)",
          "rgba(255, 99, 132, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(255, 159, 64, 0.7)",
          "rgba(153, 102, 255, 0.7)",
        ],
        borderColor: [
          "rgba(53, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  }

  // Department budget data for bar chart
  const departmentBarData = {
    labels: departments,
    datasets: [
      {
        label: "Anggaran (dalam Juta Rupiah)",
        data: budgetData.departmentBudgets,
        backgroundColor: [
          "rgba(53, 162, 235, 0.7)",
          "rgba(255, 99, 132, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(255, 159, 64, 0.7)",
          "rgba(153, 102, 255, 0.7)",
        ],
        borderColor: [
          "rgba(53, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  }

  // Category budget data for stacked bar chart
  const categoryBarData = {
    labels: budgetData.categoryBudgets.labels,
    datasets: budgetData.categoryBudgets.datasets,
  }

  // Chart options
  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          color: textColor,
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.label || ""
            const value = context.raw || 0
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0)
            const percentage = ((value / total) * 100).toFixed(1)
            return `${label}: Rp ${value} Juta (${percentage}%)`
          },
        },
      },
    },
  }

  const barOptions = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          color: textColor,
        },
        grid: {
          color: gridColor,
        },
      },
      y: {
        ticks: {
          color: textColor,
        },
        grid: {
          color: gridColor,
        },
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.dataset.label || ""
            const value = context.raw || 0
            return `${label}: Rp ${value} Juta`
          },
        },
      },
    },
  }

  const stackedBarOptions = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          color: textColor,
        },
        grid: {
          color: gridColor,
        },
      },
      y: {
        stacked: true,
        ticks: {
          color: textColor,
        },
        grid: {
          color: gridColor,
        },
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.dataset.label || ""
            const value = context.raw || 0
            return `${label}: Rp ${value} Juta`
          },
        },
      },
    },
  }

  return (
    <Tabs defaultValue="pie" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="pie">
          <PieChart className="mr-2 h-4 w-4" />
          Diagram Lingkaran
        </TabsTrigger>
        <TabsTrigger value="bar">
          <BarChart3 className="mr-2 h-4 w-4" />
          Diagram Batang
        </TabsTrigger>
        <TabsTrigger value="category">
          <BarChart3 className="mr-2 h-4 w-4" />
          Per Kategori
        </TabsTrigger>
      </TabsList>

      <TabsContent value="pie" className="h-[350px] w-full">
        <Pie data={departmentPieData} options={pieOptions} />
      </TabsContent>

      <TabsContent value="bar" className="h-[350px] w-full">
        <Bar data={departmentBarData} options={barOptions} />
      </TabsContent>

      <TabsContent value="category" className="h-[350px] w-full">
        <Bar data={categoryBarData} options={stackedBarOptions} />
      </TabsContent>
    </Tabs>
  )
}

