"use client"

import { useEffect, useRef, useState } from "react"

interface CertificateData {
  recipientName?: string
  courseName?: string
  achievement?: string
  description?: string
  issueDate?: string
  certificateId?: string
  signatory?: string
  organization?: string
}

interface CanvasCertificateProps {
  template: "ux_design_foundations" | "product_designer_1"
  data: CertificateData
  width?: number
  height?: number
  onCanvasReady?: (canvas: HTMLCanvasElement) => void
}

const CanvasCertificate: React.FC<CanvasCertificateProps> = ({
  template,
  data,
  width = 800,
  height = 600,
  onCanvasReady
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [fontsLoaded, setFontsLoaded] = useState(false)

  // Load Google Fonts
  useEffect(() => {
    const loadFonts = async () => {
      try {
        // Check if fonts are already loaded in the document
        const availableFonts = Array.from(document.fonts).map(font => font.family)
        
        if (!availableFonts.includes('Inter')) {
          try {
            const interFont = new FontFace('Inter', 'url(https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2)')
            await Promise.race([
              interFont.load(),
              new Promise((_, reject) => setTimeout(() => reject(new Error('Font loading timeout')), 5000))
            ])
            document.fonts.add(interFont)
          } catch (error) {
            console.warn('Failed to load Inter font, using system fallback')
          }
        }

        if (!availableFonts.includes('Dancing Script')) {
          try {
            const dancingFont = new FontFace('Dancing Script', 'url(https://fonts.gstatic.com/s/dancingscript/v25/If2cXTr6YS-zF4S-kcSWSVi_sxjsohD9F50Ruu7BASoHTeB9ptDqpw.woff2)')
            await Promise.race([
              dancingFont.load(),
              new Promise((_, reject) => setTimeout(() => reject(new Error('Font loading timeout')), 5000))
            ])
            document.fonts.add(dancingFont)
          } catch (error) {
            console.warn('Failed to load Dancing Script font, using system fallback')
          }
        }

        setFontsLoaded(true)
      } catch (error) {
        console.warn('Font loading failed, proceeding with system fonts:', error)
        setFontsLoaded(true)
      }
    }

    loadFonts()
  }, [])

  useEffect(() => {
    if (!fontsLoaded || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = width
    canvas.height = height

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    if (template === "ux_design_foundations") {
      drawUXDesignFoundations(ctx, data)
    } else if (template === "product_designer_1") {
      drawProductDesigner1(ctx, data)
    }

    if (onCanvasReady) {
      onCanvasReady(canvas)
    }
  }, [fontsLoaded, template, data, width, height, onCanvasReady])

  const drawUXDesignFoundations = (ctx: CanvasRenderingContext2D, data: CertificateData) => {
    // Canvas background and border
    ctx.fillStyle = "#f8f6ff"
    ctx.fillRect(0, 0, width, height)
    
    // Border
    ctx.strokeStyle = "#000000"
    ctx.lineWidth = 8
    ctx.beginPath()
    ctx.roundRect(4, 4, width - 8, height - 8, 20)
    ctx.stroke()

    // Badge - outer dotted ring
    ctx.strokeStyle = "#666666"
    ctx.setLineDash([5, 5])
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(400, 80, 45, 0, Math.PI * 2)
    ctx.stroke()
    ctx.setLineDash([])

    // Badge - inner white circle
    ctx.fillStyle = "#ffffff"
    ctx.beginPath()
    ctx.arc(400, 80, 35, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = "#666666"
    ctx.lineWidth = 1
    ctx.stroke()

    // Graduation cap icon (simplified)
    ctx.fillStyle = "#6366f1"
    ctx.fillRect(388, 68, 24, 4) // Cap base
    ctx.fillRect(394, 72, 12, 8) // Cap body
    ctx.fillRect(396, 80, 8, 4)  // Tassel

    // "COURSE CERTIFICATE" text
    ctx.fillStyle = "#666666"
    ctx.font = "500 12px Inter, system-ui, -apple-system, sans-serif"
    ctx.textAlign = "center"
    ctx.letterSpacing = "2px"
    ctx.fillText("COURSE CERTIFICATE", 400, 140)

    // Course name
    ctx.fillStyle = "#000000"
    ctx.font = "800 48px Inter, system-ui, -apple-system, sans-serif"
    ctx.textAlign = "center"
    const courseName = data.courseName || data.achievement || "UX Design Foundations"
    ctx.fillText(courseName, 400, 200)

    // Recipient name
    ctx.fillStyle = "#000000"
    ctx.font = "600 32px Inter, system-ui, -apple-system, sans-serif"
    ctx.textAlign = "center"
    const recipientName = data.recipientName || "Luke Wroblewski"
    ctx.fillText(recipientName, 400, 280)

    // Description
    ctx.fillStyle = "#666666"
    ctx.font = "400 14px Inter, system-ui, -apple-system, sans-serif"
    ctx.textAlign = "center"
    const description = data.description || "The bearer of this certificate has successfully completed the UX Design Foundations course, which focuses on fundamental design principles and methodologies."
    
    // Word wrap for description
    const words = description.split(' ')
    let line = ''
    const lines = []
    const maxWidth = 500

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' '
      const metrics = ctx.measureText(testLine)
      if (metrics.width > maxWidth && n > 0) {
        lines.push(line)
        line = words[n] + ' '
      } else {
        line = testLine
      }
    }
    lines.push(line)

    const lineHeight = 21
    const startY = 340 - ((lines.length - 1) * lineHeight) / 2
    
    lines.forEach((line, index) => {
      ctx.fillText(line.trim(), 400, startY + (index * lineHeight))
    })

    // Signature line
    ctx.strokeStyle = "#000000"
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(140, 450)
    ctx.lineTo(260, 450)
    ctx.stroke()

    // Signature text
    ctx.fillStyle = "#000000"
    ctx.font = "400 18px 'Dancing Script', cursive, serif"
    ctx.textAlign = "center"
    const signatory = data.signatory || "Founders, Uxcel"
    ctx.fillText(signatory, 200, 470)

    // Issue date
    ctx.fillStyle = "#666666"
    ctx.font = "400 12px Inter, system-ui, -apple-system, sans-serif"
    ctx.textAlign = "left"
    const issueDate = data.issueDate || "May 31, 2022"
    ctx.fillText(`Issued: ${issueDate}`, 600, 450)
  }

  const drawProductDesigner1 = (ctx: CanvasRenderingContext2D, data: CertificateData) => {
    // Canvas background and border
    ctx.fillStyle = "#f8f6ff"
    ctx.fillRect(0, 0, width, height)
    
    // Border
    ctx.strokeStyle = "#000000"
    ctx.lineWidth = 8
    ctx.beginPath()
    ctx.roundRect(4, 4, width - 8, height - 8, 20)
    ctx.stroke()

    // Hexagon badge (simplified as rounded rectangle)
    ctx.fillStyle = "#ffffff"
    ctx.strokeStyle = "#000000"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.roundRect(360, 50, 80, 60, 8)
    ctx.fill()
    ctx.stroke()

    // Inner badge
    ctx.fillStyle = "#6366f1"
    ctx.beginPath()
    ctx.roundRect(365, 65, 70, 15, 4)
    ctx.fill()

    ctx.fillStyle = "#ffffff"
    ctx.font = "600 8px Inter, system-ui, -apple-system, sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("PRODUCT DESIGNER I", 400, 75)

    // Ribbon
    ctx.fillStyle = "#6366f1"
    ctx.beginPath()
    ctx.roundRect(320, 115, 160, 12, 2)
    ctx.fill()

    ctx.fillStyle = "#ffffff"
    ctx.font = "500 8px Inter, system-ui, -apple-system, sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("PROFESSIONAL CERTIFICATION", 400, 123)

    // "PROFESSIONAL CERTIFICATION" text
    ctx.fillStyle = "#666666"
    ctx.font = "500 12px Inter, system-ui, -apple-system, sans-serif"
    ctx.textAlign = "center"
    ctx.letterSpacing = "2px"
    ctx.fillText("PROFESSIONAL CERTIFICATION", 400, 150)

    // Course/Position name
    ctx.fillStyle = "#000000"
    ctx.font = "800 48px Inter, system-ui, -apple-system, sans-serif"
    ctx.textAlign = "center"
    const courseName = data.courseName || data.achievement || "Product Designer I"
    ctx.fillText(courseName, 400, 200)

    // "ISSUED TO" text
    ctx.fillStyle = "#666666"
    ctx.font = "500 12px Inter, system-ui, -apple-system, sans-serif"
    ctx.textAlign = "center"
    ctx.letterSpacing = "1px"
    ctx.fillText("ISSUED TO", 400, 240)

    // Recipient name
    ctx.fillStyle = "#000000"
    ctx.font = "600 32px Inter, system-ui, -apple-system, sans-serif"
    ctx.textAlign = "center"
    const recipientName = data.recipientName || "Luke Wroblewski"
    ctx.fillText(recipientName, 400, 280)

    // Description
    ctx.fillStyle = "#666666"
    ctx.font = "400 14px Inter, system-ui, -apple-system, sans-serif"
    ctx.textAlign = "center"
    const description = data.description || "The bearer of this professional certificate has demonstrated a fundamental level of Product Design mastery and passed the core competencies for each design specialty."
    
    // Word wrap for description
    const words = description.split(' ')
    let line = ''
    const lines = []
    const maxWidth = 500

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' '
      const metrics = ctx.measureText(testLine)
      if (metrics.width > maxWidth && n > 0) {
        lines.push(line)
        line = words[n] + ' '
      } else {
        line = testLine
      }
    }
    lines.push(line)

    const lineHeight = 21
    const startY = 340 - ((lines.length - 1) * lineHeight) / 2
    
    lines.forEach((line, index) => {
      ctx.fillText(line.trim(), 400, startY + (index * lineHeight))
    })

    // Signature line
    ctx.strokeStyle = "#000000"
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(140, 450)
    ctx.lineTo(260, 450)
    ctx.stroke()

    // Signature text
    ctx.fillStyle = "#000000"
    ctx.font = "400 18px 'Dancing Script', cursive, serif"
    ctx.textAlign = "center"
    const signatory = data.signatory || "Founders, Uxcel"
    ctx.fillText(signatory, 200, 470)

    // Organization logo (simplified)
    ctx.fillStyle = "#000000"
    ctx.beginPath()
    ctx.arc(500, 430, 6, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = "#000000"
    ctx.font = "600 16px Inter, system-ui, -apple-system, sans-serif"
    ctx.textAlign = "left"
    const organization = data.organization || "uxcel"
    ctx.fillText(organization, 515, 435)

    // QR Code placeholder
    ctx.fillStyle = "#000000"
    ctx.fillRect(660, 430, 40, 40)
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(665, 435, 10, 10)
    ctx.fillRect(675, 435, 10, 10)
    ctx.fillRect(665, 445, 10, 10)
    ctx.fillRect(675, 445, 10, 10)
    ctx.fillRect(670, 455, 10, 10)

    // Issue date and ID
    ctx.fillStyle = "#666666"
    ctx.font = "400 10px Inter, system-ui, -apple-system, sans-serif"
    ctx.textAlign = "right"
    const issueDate = data.issueDate || "May 31, 2022"
    const certificateId = data.certificateId || "123235467"
    ctx.fillText(`Issued: ${issueDate} • ID: ${certificateId}`, 650, 480)
  }

  return (
    <div className="flex justify-center">
      <canvas
        ref={canvasRef}
        className="border border-gray-200 rounded-lg shadow-lg"
        style={{ 
          maxWidth: '100%', 
          height: 'auto',
          background: 'white'
        }}
      />
    </div>
  )
}

export default CanvasCertificate