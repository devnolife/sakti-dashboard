"use client"

import { useEffect, useRef } from "react"
import { BarChart3 } from "lucide-react"

export function ExpenseChart() {
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
    const operationalData = [120, 130, 125, 135, 140, 130, 145, 150, 155, 145, 160, 165]
    const capitalData = [40, 20, 35, 30, 45, 60, 50, 40, 55, 65, 45, 50]

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

      // Operational bar with gradient
      const operationalHeight = (operationalData[i] / 200) * chartHeight
      const operationalGradient = ctx.createLinearGradient(0, chartHeight + 30 - operationalHeight, 0, chartHeight + 30)
      operationalGradient.addColorStop(0, "rgba(239, 68, 68, 0.8)")
      operationalGradient.addColorStop(1, "rgba(239, 68, 68, 0.3)")
      ctx.fillStyle = operationalGradient
      ctx.fillRect(x, chartHeight + 30 - operationalHeight, barWidth, operationalHeight)

      // Capital bar with gradient
      const capitalHeight = (capitalData[i] / 200) * chartHeight
      const capitalGradient = ctx.createLinearGradient(0, chartHeight + 30 - capitalHeight, 0, chartHeight + 30)
      capitalGradient.addColorStop(0, "rgba(99, 102, 241, 0.8)")
      capitalGradient.addColorStop(1, "rgba(99, 102, 241, 0.3)")
      ctx.fillStyle = capitalGradient
      ctx.fillRect(x + barWidth + spacing, chartHeight + 30 - capitalHeight, barWidth, capitalHeight)

      // Month label
      ctx.fillStyle = "#64748b"
      ctx.font = "10px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(month, x + barWidth / 2, chartHeight + 45)
    })

    // Draw legend
    ctx.fillStyle = "rgba(239, 68, 68, 0.8)"
    ctx.fillRect(chartWidth - 120, 15, 10, 10)
    ctx.fillStyle = "rgba(99, 102, 241, 0.8)"
    ctx.fillRect(chartWidth - 40, 15, 10, 10)
    ctx.fillStyle = "#64748b"
    ctx.font = "10px sans-serif"
    ctx.textAlign = "left"
    ctx.fillText("Operational", chartWidth - 105, 23)
    ctx.fillText("Capital", chartWidth - 25, 23)
  }, [])

  return (
    <div className="h-full w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-gray-700">Expense Trends (2023)</h3>
        <BarChart3 className="h-5 w-5 text-red-500" />
      </div>
      <div className="h-[calc(100%-2rem)] w-full">
        <canvas ref={canvasRef} className="w-full h-full"></canvas>
      </div>
    </div>
  )
}

