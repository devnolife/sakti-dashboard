"use client"

import { useEffect, useRef } from "react"
import { BarChart3 } from "lucide-react"

export function StudentPaymentChart() {
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
    const departments = ["Teknik Pengairan", "Teknik Elektro", "Arsitektur", "Informatika", "Perencanaan Wilayah Kota"]
    const paidData = [380, 450, 350, 520, 290]
    const outstandingData = [78, 73, 62, 92, 48]

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

      // Paid bar with gradient
      const paidHeight = (paidData[i] / 600) * chartHeight
      const paidGradient = ctx.createLinearGradient(0, chartHeight + 30 - paidHeight, 0, chartHeight + 30)
      paidGradient.addColorStop(0, "rgba(147, 51, 234, 0.8)")
      paidGradient.addColorStop(1, "rgba(147, 51, 234, 0.3)")
      ctx.fillStyle = paidGradient
      ctx.fillRect(x, chartHeight + 30 - paidHeight, barWidth, paidHeight)

      // Outstanding bar with gradient
      const outstandingHeight = (outstandingData[i] / 600) * chartHeight
      const outstandingGradient = ctx.createLinearGradient(0, chartHeight + 30 - outstandingHeight, 0, chartHeight + 30)
      outstandingGradient.addColorStop(0, "rgba(99, 102, 241, 0.8)")
      outstandingGradient.addColorStop(1, "rgba(99, 102, 241, 0.3)")
      ctx.fillStyle = outstandingGradient
      ctx.fillRect(x + barWidth + spacing, chartHeight + 30 - outstandingHeight, barWidth, outstandingHeight)

      // Department label
      ctx.fillStyle = "#64748b"
      ctx.font = "10px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(dept, x + barWidth / 2, chartHeight + 45)
    })

    // Draw legend
    ctx.fillStyle = "rgba(147, 51, 234, 0.8)"
    ctx.fillRect(chartWidth - 100, 15, 10, 10)
    ctx.fillStyle = "rgba(99, 102, 241, 0.8)"
    ctx.fillRect(chartWidth - 40, 15, 10, 10)
    ctx.fillStyle = "#64748b"
    ctx.font = "10px sans-serif"
    ctx.textAlign = "left"
    ctx.fillText("Paid", chartWidth - 85, 23)
    ctx.fillText("Outstanding", chartWidth - 25, 23)
  }, [])

  return (
    <div className="h-full w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-gray-700">Student Payments by Department</h3>
        <BarChart3 className="h-5 w-5 text-purple-500" />
      </div>
      <div className="h-[calc(100%-2rem)] w-full">
        <canvas ref={canvasRef} className="w-full h-full"></canvas>
      </div>
    </div>
  )
}

