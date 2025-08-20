"use client"

import { useTheme } from "next-themes"
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
import { Bar, Pie, Line } from "react-chartjs-2"

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

// Exam applications data
const examData = {
  // Current semester data
  current: [215, 310, 185, 380, 158],

  // Monthly data for the last 6 months
  monthly: {
    labels: ["Juli", "Agustus", "September", "Oktober", "November", "Desember"],
    datasets: [
      {
        label: "Teknik Sipil - Irigasi",
        data: [35, 42, 38, 45, 50, 55],
        borderColor: "rgba(53, 162, 235, 1)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Teknik Elektro",
        data: [48, 52, 45, 60, 65, 70],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Arsitektur",
        data: [30, 35, 32, 38, 40, 45],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
      {
        label: "Informatika",
        data: [60, 65, 70, 75, 80, 85],
        borderColor: "rgba(255, 159, 64, 1)",
        backgroundColor: "rgba(255, 159, 64, 0.5)",
      },
      {
        label: "Perencanaan Wilayah & Kota",
        data: [25, 28, 30, 32, 35, 38],
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.5)",
      },
    ],
  },
}

interface ExamApplicationsChartProps {
  variant?: "bar" | "pie" | "line"
}

export function ExamApplicationsChart({ variant = "bar" }: ExamApplicationsChartProps) {
  const { theme } = useTheme()

  // Set chart colors based on theme
  const textColor = theme === "dark" ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)"
  const gridColor = theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"

  // Bar chart data
  const barData = {
    labels: departments,
    datasets: [
      {
        label: "Jumlah Pendaftar",
        data: examData.current,
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

  // Pie chart data
  const pieData = {
    labels: departments,
    datasets: [
      {
        data: examData.current,
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

  // Line chart data
  const lineData = {
    labels: examData.monthly.labels,
    datasets: examData.monthly.datasets,
  }

  // Chart options
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
    },
  }

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
            return `${label}: ${value} mahasiswa (${percentage}%)`
          },
        },
      },
    },
  }

  const lineOptions = {
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
    },
  }

  if (variant === "pie") {
    return <Pie data={pieData} options={pieOptions} />
  } else if (variant === "line") {
    return <Line data={lineData} options={lineOptions} />
  } else {
    return <Bar data={barData} options={barOptions} />
  }
}

