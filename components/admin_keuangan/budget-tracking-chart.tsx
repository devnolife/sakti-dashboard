"use client"

import { useEffect, useRef } from "react"
import { LineChart } from "lucide-react"

export function BudgetTrackingChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Mock data
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const plannedData = [8, 16, 25, 33, 42, 50, 58, 67, 75, 83, 92, 100]
    const actualData = [7, 15, 24, 34, 44, 53, 62, 70, 78, 85, 93, 102]

    // Chart dimensions
    const chartWidth = canvas.width - 60
    const chartHeight = canvas.height - 60

    // Draw chart background
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)"
    ctx.fillRect(30, 30, chartWidth, chartHeight)

    // Draw axes
    ctx.strokeStyle = "#e2e8f0"
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(30, 30)
    ctx.lineTo(30, chartHeight + 30)
    ctx.lineTo(chartWidth + 30, chartHeight + 30)
    ctx.stroke()

    // Draw grid lines
    ctx.strokeStyle = "#e2e8f0"
    ctx.lineWidth = 0.5
    for (let i = 0; i < 5; i++) {
      const y = 30 + (chartHeight / 5) * i
      ctx.beginPath()
      ctx.moveTo(30, y)
      ctx.lineTo(chartWidth + 30, y)
      ctx.stroke()
    }

    // Draw planned line
    ctx.beginPath()
    ctx.moveTo(30, chartHeight + 30 - (plannedData[0] / 100) * chartHeight)
    for (let i = 1; i < months.length; i++) {
      const x = 30 + (chartWidth / (months.length - 1)) * i
      const y = chartHeight + 30 - (plannedData[i] / 100) * chartHeight
      ctx.lineTo(x, y)
    }
    ctx.strokeStyle = "rgba(59, 130, 246, 0.8)"
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw actual line
    ctx.beginPath()
    ctx.moveTo(30, chartHeight + 30 - (actualData[0] / 100) * chartHeight)
    for (let i = 1; i < months.length; i++) {
      const x = 30 + (chartWidth / (months.length - 1)) * i
      const y = chartHeight + 30 - (actualData[i] / 100) * chartHeight
      ctx.lineTo(x, y)
    }
    ctx.strokeStyle = "rgba(14, 165, 233, 0.8)"
    ctx.lineWidth = 2
    ctx.stroke()

    // Fill area between lines
    ctx.beginPath()
    ctx.moveTo(30, chartHeight + 30 - (plannedData[0] / 100) * chartHeight)
    for (let i = 1; i < months.length; i++) {
      const x = 30 + (chartWidth / (months.length - 1)) * i
      const y = chartHeight + 30 - (plannedData[i] / 100) * chartHeight
      ctx.lineTo(x, y)
    }
    for (let i = months.length - 1; i >= 0; i--) {
      const x = 30 + (chartWidth / (months.length - 1)) * i
      const y = chartHeight + 30 - (actualData[i] / 100) * chartHeight
      ctx.lineTo(x, y)
    }
    ctx.closePath()
    const gradient = ctx.createLinearGradient(0, 30, 0, chartHeight + 30)
    gradient.addColorStop(0, "rgba(59, 130, 246, 0.1)")
    gradient.addColorStop(1, "rgba(14, 165, 233, 0.1)")
    ctx.fillStyle = gradient
    ctx.fill()

    // Draw month labels
    ctx.fillStyle = "#64748b"
    ctx.font = "10px sans-serif"
    ctx.textAlign = "center"
    months.forEach((month, i) => {
      const x = 30 + (chartWidth / (months.length - 1)) * i
      ctx.fillText(month, x, chartHeight + 45)
    })

    // Draw legend
    ctx.fillStyle = "rgba(59, 130, 246, 0.8)"
    ctx.fillRect(chartWidth - 100, 15, 10, 10)
    ctx.fillStyle = "rgba(14, 165, 233, 0.8)"
    ctx.fillRect(chartWidth - 40, 15, 10, 10)
    ctx.fillStyle = "#64748b"
    ctx.font = "10px sans-serif"
    ctx.textAlign = "left"
    ctx.fillText("Planned", chartWidth - 85, 23)
    ctx.fillText("Actual", chartWidth - 25, 23)
  }, [])

  return (
    <div className="h-full w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-gray-700">Budget Tracking (2023)</h3>
        <LineChart className="h-5 w-5 text-blue-500" />
      </div>
      <div className="h-[calc(100%-2rem)] w-full">
        <canvas ref={canvasRef} className="w-full h-full"></canvas>
      </div>
    </div>
  )
}

