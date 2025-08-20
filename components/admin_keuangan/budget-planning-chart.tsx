"use client"

import { useEffect, useRef } from "react"
import { BarChart3 } from "lucide-react"

export function BudgetPlanningChart() {
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
    const departments = ["Informatika", "Arsitektur", "Teknik Elektro", "Perencanaan Wilayah Kota", "Teknik Pengairan"]
    const currentData = [3500, 2750, 2250, 2100, 1900] // in millions
    const plannedData = [3850, 3025, 2475, 2310, 2090] // in millions

    // Chart dimensions
    const chartWidth = canvas.width - 60
    const chartHeight = canvas.height - 60
    const barWidth = chartWidth / departments.length / 3
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
    departments.forEach((dept, i) => {
      const x = 30 + (chartWidth / departments.length) * i + spacing

      // Current year bar with gradient
      const currentHeight = (currentData[i] / 4000) * chartHeight
      const currentGradient = ctx.createLinearGradient(0, chartHeight + 30 - currentHeight, 0, chartHeight + 30)
      currentGradient.addColorStop(0, "rgba(139, 92, 246, 0.8)")
      currentGradient.addColorStop(1, "rgba(139, 92, 246, 0.3)")
      ctx.fillStyle = currentGradient
      ctx.fillRect(x, chartHeight + 30 - currentHeight, barWidth, currentHeight)

      // Planned year bar with gradient
      const plannedHeight = (plannedData[i] / 4000) * chartHeight
      const plannedGradient = ctx.createLinearGradient(0, chartHeight + 30 - plannedHeight, 0, chartHeight + 30)
      plannedGradient.addColorStop(0, "rgba(99, 102, 241, 0.8)")
      plannedGradient.addColorStop(1, "rgba(99, 102, 241, 0.3)")
      ctx.fillStyle = plannedGradient
      ctx.fillRect(x + barWidth + spacing, chartHeight + 30 - plannedHeight, barWidth, plannedHeight)

      // Department label
      ctx.fillStyle = "#64748b"
      ctx.font = "10px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(dept, x + barWidth / 2, chartHeight + 45)
    })

    // Draw legend
    ctx.fillStyle = "rgba(139, 92, 246, 0.8)"
    ctx.fillRect(chartWidth - 120, 15, 10, 10)
    ctx.fillStyle = "rgba(99, 102, 241, 0.8)"
    ctx.fillRect(chartWidth - 40, 15, 10, 10)
    ctx.fillStyle = "#64748b"
    ctx.font = "10px sans-serif"
    ctx.textAlign = "left"
    ctx.fillText("Current Budget", chartWidth - 105, 23)
    ctx.fillText("Planned Budget", chartWidth - 25, 23)
  }, [])

  return (
    <div className="h-full w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-gray-700">Budget Planning by Department</h3>
        <BarChart3 className="h-5 w-5 text-violet-500" />
      </div>
      <div className="h-[calc(100%-2rem)] w-full">
        <canvas ref={canvasRef} className="w-full h-full"></canvas>
      </div>
    </div>
  )
}

