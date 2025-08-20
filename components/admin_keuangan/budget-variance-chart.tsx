"use client"

import { useEffect, useRef } from "react"
import { BarChart3 } from "lucide-react"

export function BudgetVarianceChart() {
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
    const varianceData = [3.5, -2.1, 4.8, -1.5, 2.3] // Positive means over budget, negative means under budget

    // Chart dimensions
    const chartWidth = canvas.width - 60
    const chartHeight = canvas.height - 60
    const barWidth = chartWidth / departments.length / 2

    // Draw chart background
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)"
    ctx.fillRect(30, 30, chartWidth, chartHeight)

    // Draw axes
    ctx.strokeStyle = "#e2e8f0"
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(30, chartHeight / 2 + 30) // Center line (0%)
    ctx.lineTo(chartWidth + 30, chartHeight / 2 + 30)
    ctx.stroke()

    // Draw grid lines
    ctx.strokeStyle = "#e2e8f0"
    ctx.lineWidth = 0.5
    for (let i = -2; i <= 2; i++) {
      if (i === 0) continue // Skip center line (already drawn)
      const y = chartHeight / 2 + 30 - (i * chartHeight) / 10
      ctx.beginPath()
      ctx.moveTo(30, y)
      ctx.lineTo(chartWidth + 30, y)
      ctx.stroke()

      // Draw percentage labels
      ctx.fillStyle = "#64748b"
      ctx.font = "10px sans-serif"
      ctx.textAlign = "right"
      ctx.fillText(`${i * 2.5}%`, 25, y + 3)
    }

    // Draw bars
    departments.forEach((dept, i) => {
      const x = 30 + (chartWidth / departments.length) * i + barWidth / 2
      const variance = varianceData[i]
      const barHeight = (Math.abs(variance) * chartHeight) / 25 // Scale to fit chart

      // Create gradient based on variance (over/under budget)
      const gradient = ctx.createLinearGradient(
        0,
        variance > 0 ? chartHeight / 2 + 30 - barHeight : chartHeight / 2 + 30,
        0,
        variance > 0 ? chartHeight / 2 + 30 : chartHeight / 2 + 30 + barHeight,
      )

      if (variance > 0) {
        // Over budget (red gradient)
        gradient.addColorStop(0, "rgba(239, 68, 68, 0.8)")
        gradient.addColorStop(1, "rgba(239, 68, 68, 0.3)")
      } else {
        // Under budget (green gradient)
        gradient.addColorStop(0, "rgba(34, 197, 94, 0.3)")
        gradient.addColorStop(1, "rgba(34, 197, 94, 0.8)")
      }

      ctx.fillStyle = gradient

      if (variance > 0) {
        // Draw bar upward from center line
        ctx.fillRect(x, chartHeight / 2 + 30 - barHeight, barWidth, barHeight)
      } else {
        // Draw bar downward from center line
        ctx.fillRect(x, chartHeight / 2 + 30, barWidth, barHeight)
      }

      // Department label
      ctx.fillStyle = "#64748b"
      ctx.font = "10px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(dept, x + barWidth / 2, chartHeight + 45)

      // Variance percentage
      ctx.fillStyle = variance > 0 ? "rgba(239, 68, 68, 0.8)" : "rgba(34, 197, 94, 0.8)"
      ctx.font = "bold 10px sans-serif"
      ctx.textAlign = "center"
      const textY = variance > 0 ? chartHeight / 2 + 30 - barHeight - 5 : chartHeight / 2 + 30 + barHeight + 12
      ctx.fillText(`${variance > 0 ? "+" : ""}${variance.toFixed(1)}%`, x + barWidth / 2, textY)
    })

    // Draw legend
    ctx.fillStyle = "rgba(239, 68, 68, 0.8)"
    ctx.fillRect(chartWidth - 100, 15, 10, 10)
    ctx.fillStyle = "rgba(34, 197, 94, 0.8)"
    ctx.fillRect(chartWidth - 40, 15, 10, 10)
    ctx.fillStyle = "#64748b"
    ctx.font = "10px sans-serif"
    ctx.textAlign = "left"
    ctx.fillText("Over Budget", chartWidth - 85, 23)
    ctx.fillText("Under Budget", chartWidth - 25, 23)
  }, [])

  return (
    <div className="h-full w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-gray-700">Budget Variance by Department</h3>
        <BarChart3 className="h-5 w-5 text-blue-500" />
      </div>
      <div className="h-[calc(100%-2rem)] w-full">
        <canvas ref={canvasRef} className="w-full h-full"></canvas>
      </div>
    </div>
  )
}

