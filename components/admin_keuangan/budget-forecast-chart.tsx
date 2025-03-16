"use client"

import { useEffect, useRef } from "react"
import { LineChart } from "lucide-react"

export function BudgetForecastChart() {
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
    const years = ["2020", "2021", "2022", "2023", "2024", "2025", "2026"]
    const actualData = [9500, 10200, 11500, 12500, null, null, null] // in millions
    const forecastData = [null, null, null, 12500, 13750, 15125, 16638] // in millions

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

    // Draw actual line
    ctx.beginPath()
    let startX = 0
    let startY = 0
    for (let i = 0; i < years.length; i++) {
      if (actualData[i] !== null) {
        const x = 30 + (chartWidth / (years.length - 1)) * i
        const y = chartHeight + 30 - (actualData[i] / 17000) * chartHeight

        if (i === 0 || actualData[i - 1] === null) {
          ctx.moveTo(x, y)
          startX = x
          startY = y
        } else {
          ctx.lineTo(x, y)
        }
      }
    }
    ctx.strokeStyle = "rgba(139, 92, 246, 0.8)"
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw forecast line
    ctx.beginPath()
    let forecastStartX = 0
    let forecastStartY = 0
    for (let i = 0; i < years.length; i++) {
      if (forecastData[i] !== null) {
        const x = 30 + (chartWidth / (years.length - 1)) * i
        const y = chartHeight + 30 - (forecastData[i] / 17000) * chartHeight

        if (i === 0 || forecastData[i - 1] === null) {
          ctx.moveTo(x, y)
          forecastStartX = x
          forecastStartY = y
        } else {
          ctx.lineTo(x, y)
        }
      }
    }
    ctx.strokeStyle = "rgba(99, 102, 241, 0.8)"
    ctx.lineWidth = 2
    ctx.setLineDash([5, 3])
    ctx.stroke()
    ctx.setLineDash([])

    // Fill area under actual line
    ctx.beginPath()
    ctx.moveTo(startX, chartHeight + 30)
    for (let i = 0; i < years.length; i++) {
      if (actualData[i] !== null) {
        const x = 30 + (chartWidth / (years.length - 1)) * i
        const y = chartHeight + 30 - (actualData[i] / 17000) * chartHeight
        ctx.lineTo(x, y)
      }
    }
    ctx.lineTo(30 + (chartWidth / (years.length - 1)) * 3, chartHeight + 30)
    ctx.closePath()
    const actualGradient = ctx.createLinearGradient(0, 30, 0, chartHeight + 30)
    actualGradient.addColorStop(0, "rgba(139, 92, 246, 0.2)")
    actualGradient.addColorStop(1, "rgba(139, 92, 246, 0.05)")
    ctx.fillStyle = actualGradient
    ctx.fill()

    // Fill area under forecast line
    ctx.beginPath()
    ctx.moveTo(forecastStartX, chartHeight + 30)
    for (let i = 3; i < years.length; i++) {
      if (forecastData[i] !== null) {
        const x = 30 + (chartWidth / (years.length - 1)) * i
        const y = chartHeight + 30 - (forecastData[i] / 17000) * chartHeight
        ctx.lineTo(x, y)
      }
    }
    ctx.lineTo(chartWidth + 30, chartHeight + 30)
    ctx.closePath()
    const forecastGradient = ctx.createLinearGradient(0, 30, 0, chartHeight + 30)
    forecastGradient.addColorStop(0, "rgba(99, 102, 241, 0.2)")
    forecastGradient.addColorStop(1, "rgba(99, 102, 241, 0.05)")
    ctx.fillStyle = forecastGradient
    ctx.fill()

    // Draw year labels
    ctx.fillStyle = "#64748b"
    ctx.font = "10px sans-serif"
    ctx.textAlign = "center"
    years.forEach((year, i) => {
      const x = 30 + (chartWidth / (years.length - 1)) * i
      ctx.fillText(year, x, chartHeight + 45)

      // Add "Forecast" label
      if (year === "2024") {
        ctx.fillStyle = "rgba(99, 102, 241, 0.8)"
        ctx.font = "italic 10px sans-serif"
        ctx.fillText("Forecast →", x + 10, 50)
        ctx.fillStyle = "#64748b"
        ctx.font = "10px sans-serif"
      }
    })

    // Draw legend
    ctx.fillStyle = "rgba(139, 92, 246, 0.8)"
    ctx.fillRect(chartWidth - 100, 15, 10, 10)
    ctx.fillStyle = "rgba(99, 102, 241, 0.8)"
    ctx.fillRect(chartWidth - 40, 15, 10, 10)
    ctx.fillStyle = "#64748b"
    ctx.font = "10px sans-serif"
    ctx.textAlign = "left"
    ctx.fillText("Actual", chartWidth - 85, 23)
    ctx.fillText("Forecast", chartWidth - 25, 23)
  }, [])

  return (
    <div className="h-full w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-gray-700">Budget Forecast (2020-2026)</h3>
        <LineChart className="h-5 w-5 text-violet-500" />
      </div>
      <div className="h-[calc(100%-2rem)] w-full">
        <canvas ref={canvasRef} className="w-full h-full"></canvas>
      </div>
    </div>
  )
}

