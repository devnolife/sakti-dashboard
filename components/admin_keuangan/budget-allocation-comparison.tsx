"use client"

import { useEffect, useRef } from "react"
import { BarChart3 } from "lucide-react"

export function BudgetAllocationComparison() {
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
    const categories = ["Salaries", "Facilities", "Equipment", "Research", "Operations"]
    const currentData = [45, 20, 15, 12, 8]
    const previousData = [42, 22, 14, 10, 12]

    // Chart dimensions
    const chartWidth = canvas.width - 60
    const chartHeight = canvas.height - 60
    const barWidth = chartWidth / categories.length / 3
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
    categories.forEach((category, i) => {
      const x = 30 + (chartWidth / categories.length) * i + spacing

      // Current year bar with gradient
      const currentHeight = (currentData[i] / 50) * chartHeight
      const currentGradient = ctx.createLinearGradient(0, chartHeight + 30 - currentHeight, 0, chartHeight + 30)
      currentGradient.addColorStop(0, "rgba(6, 182, 212, 0.8)")
      currentGradient.addColorStop(1, "rgba(6, 182, 212, 0.3)")
      ctx.fillStyle = currentGradient
      ctx.fillRect(x, chartHeight + 30 - currentHeight, barWidth, currentHeight)

      // Previous year bar with gradient
      const previousHeight = (previousData[i] / 50) * chartHeight
      const previousGradient = ctx.createLinearGradient(0, chartHeight + 30 - previousHeight, 0, chartHeight + 30)
      previousGradient.addColorStop(0, "rgba(20, 184, 166, 0.8)")
      previousGradient.addColorStop(1, "rgba(20, 184, 166, 0.3)")
      ctx.fillStyle = previousGradient
      ctx.fillRect(x + barWidth + spacing, chartHeight + 30 - previousHeight, barWidth, previousHeight)

      // Category label
      ctx.fillStyle = "#64748b"
      ctx.font = "10px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(category, x + barWidth / 2, chartHeight + 45)
    })

    // Draw legend
    ctx.fillStyle = "rgba(6, 182, 212, 0.8)"
    ctx.fillRect(chartWidth - 120, 15, 10, 10)
    ctx.fillStyle = "rgba(20, 184, 166, 0.8)"
    ctx.fillRect(chartWidth - 40, 15, 10, 10)
    ctx.fillStyle = "#64748b"
    ctx.font = "10px sans-serif"
    ctx.textAlign = "left"
    ctx.fillText("Current Year", chartWidth - 105, 23)
    ctx.fillText("Previous Year", chartWidth - 25, 23)
  }, [])

  return (
    <div className="h-full w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-gray-700">Budget Allocation by Category</h3>
        <BarChart3 className="h-5 w-5 text-cyan-500" />
      </div>
      <div className="h-[calc(100%-2rem)] w-full">
        <canvas ref={canvasRef} className="w-full h-full"></canvas>
      </div>
    </div>
  )
}

