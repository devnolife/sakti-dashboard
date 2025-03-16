"use client"

import { useEffect, useRef } from "react"
import { BarChart3 } from "lucide-react"

export function IncomeChart() {
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
    const tuitionData = [180, 190, 170, 165, 175, 195, 200, 210, 230, 215, 225, 240]
    const otherData = [30, 25, 35, 40, 30, 25, 35, 30, 40, 35, 30, 35]

    // Chart dimensions
    const chartWidth = canvas.width - 60
    const chartHeight = canvas.height - 60
    const barWidth = chartWidth / months.length / 3
    const spacing = barWidth / 2

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

    // Draw bars
    months.forEach((month, i) => {
      const x = 30 + (chartWidth / months.length) * i + spacing

      // Tuition bar with gradient
      const tuitionHeight = (tuitionData[i] / 250) * chartHeight
      const tuitionGradient = ctx.createLinearGradient(0, chartHeight + 30 - tuitionHeight, 0, chartHeight + 30)
      tuitionGradient.addColorStop(0, "rgba(34, 197, 94, 0.8)")
      tuitionGradient.addColorStop(1, "rgba(34, 197, 94, 0.3)")
      ctx.fillStyle = tuitionGradient
      ctx.fillRect(x, chartHeight + 30 - tuitionHeight, barWidth, tuitionHeight)

      // Other income bar with gradient
      const otherHeight = (otherData[i] / 250) * chartHeight
      const otherGradient = ctx.createLinearGradient(0, chartHeight + 30 - otherHeight, 0, chartHeight + 30)
      otherGradient.addColorStop(0, "rgba(99, 102, 241, 0.8)")
      otherGradient.addColorStop(1, "rgba(99, 102, 241, 0.3)")
      ctx.fillStyle = otherGradient
      ctx.fillRect(x + barWidth + spacing, chartHeight + 30 - otherHeight, barWidth, otherHeight)

      // Month label
      ctx.fillStyle = "#64748b"
      ctx.font = "10px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(month, x + barWidth / 2, chartHeight + 45)
    })

    // Draw legend
    ctx.fillStyle = "rgba(34, 197, 94, 0.8)"
    ctx.fillRect(chartWidth - 100, 15, 10, 10)
    ctx.fillStyle = "rgba(99, 102, 241, 0.8)"
    ctx.fillRect(chartWidth - 40, 15, 10, 10)
    ctx.fillStyle = "#64748b"
    ctx.font = "10px sans-serif"
    ctx.textAlign = "left"
    ctx.fillText("Tuition", chartWidth - 85, 23)
    ctx.fillText("Other", chartWidth - 25, 23)
  }, [])

  return (
    <div className="h-full w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-gray-700">Income Trends (2023)</h3>
        <BarChart3 className="h-5 w-5 text-green-500" />
      </div>
      <div className="h-[calc(100%-2rem)] w-full">
        <canvas ref={canvasRef} className="w-full h-full"></canvas>
      </div>
    </div>
  )
}

