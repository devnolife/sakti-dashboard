"use client"

import { useEffect, useRef } from "react"
import { PieChart } from "lucide-react"

export function StudentPaymentStatusChart() {
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
    const data = [
      { label: "Paid in Full", value: 80, color: "rgba(147, 51, 234, 0.8)" },
      { label: "Partial Payment", value: 12, color: "rgba(99, 102, 241, 0.8)" },
      { label: "Unpaid", value: 5, color: "rgba(249, 115, 22, 0.8)" },
      { label: "Scholarship", value: 3, color: "rgba(34, 197, 94, 0.8)" },
    ]

    // Calculate total
    const total = data.reduce((sum, item) => sum + item.value, 0)

    // Draw pie chart
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) - 60

    let startAngle = 0
    data.forEach((item) => {
      const sliceAngle = (item.value / total) * 2 * Math.PI

      // Draw slice
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle)
      ctx.closePath()

      // Create gradient
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius)
      gradient.addColorStop(0, item.color.replace("0.8", "0.4"))
      gradient.addColorStop(1, item.color)

      ctx.fillStyle = gradient
      ctx.fill()

      // Draw label line and text
      const midAngle = startAngle + sliceAngle / 2
      const labelRadius = radius * 1.2
      const labelX = centerX + Math.cos(midAngle) * labelRadius
      const labelY = centerY + Math.sin(midAngle) * labelRadius

      // Line
      ctx.beginPath()
      ctx.moveTo(centerX + Math.cos(midAngle) * radius, centerY + Math.sin(midAngle) * radius)
      ctx.lineTo(labelX, labelY)
      ctx.strokeStyle = "rgba(100, 116, 139, 0.5)"
      ctx.lineWidth = 1
      ctx.stroke()

      // Text
      ctx.fillStyle = "#334155"
      ctx.font = "12px sans-serif"
      ctx.textAlign = labelX > centerX ? "left" : "right"
      ctx.textBaseline = "middle"
      ctx.fillText(`${item.label} (${item.value}%)`, labelX + (labelX > centerX ? 5 : -5), labelY)

      startAngle += sliceAngle
    })

    // Draw center circle
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius * 0.5, 0, 2 * Math.PI)
    ctx.fillStyle = "white"
    ctx.fill()
    ctx.strokeStyle = "rgba(226, 232, 240, 0.8)"
    ctx.lineWidth = 1
    ctx.stroke()

    // Draw center text
    ctx.fillStyle = "#334155"
    ctx.font = "bold 16px sans-serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText("Payment", centerX, centerY - 10)
    ctx.fillText("Status", centerX, centerY + 10)
  }, [])

  return (
    <div className="h-full w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-gray-700">Student Payment Status</h3>
        <PieChart className="h-5 w-5 text-purple-500" />
      </div>
      <div className="h-[calc(100%-2rem)] w-full">
        <canvas ref={canvasRef} className="w-full h-full"></canvas>
      </div>
    </div>
  )
}

