"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, FileImage, FileText, Loader2 } from "lucide-react"
import jsPDF from 'jspdf'

interface CertificateDownloadProps {
  canvas: HTMLCanvasElement | null
  fileName?: string
  className?: string
}

const CertificateDownload: React.FC<CertificateDownloadProps> = ({
  canvas,
  fileName = "certificate",
  className = ""
}) => {
  const [isDownloading, setIsDownloading] = useState(false)

  const downloadAsPNG = async () => {
    if (!canvas) return

    setIsDownloading(true)
    try {
      // Create high-res canvas for better quality
      const highResCanvas = document.createElement('canvas')
      const highResCtx = highResCanvas.getContext('2d')
      if (!highResCtx) return

      // Scale up for better print quality (300 DPI equivalent)
      const scale = 3
      highResCanvas.width = canvas.width * scale
      highResCanvas.height = canvas.height * scale
      
      // Scale the context and draw the original canvas
      highResCtx.scale(scale, scale)
      highResCtx.drawImage(canvas, 0, 0)

      // Download
      const link = document.createElement('a')
      link.download = `${fileName}.png`
      link.href = highResCanvas.toDataURL('image/png')
      link.click()
    } catch (error) {
      console.error('Error downloading PNG:', error)
    } finally {
      setIsDownloading(false)
    }
  }

  const downloadAsPDF = async () => {
    if (!canvas) return

    setIsDownloading(true)
    try {
      // Create PDF in landscape A4
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      })

      // A4 landscape dimensions in mm
      const pdfWidth = 297
      const pdfHeight = 210

      // Calculate aspect ratios
      const canvasAspect = canvas.width / canvas.height
      const pdfAspect = pdfWidth / pdfHeight

      let drawWidth, drawHeight, x, y

      if (canvasAspect > pdfAspect) {
        // Canvas is wider than PDF
        drawWidth = pdfWidth
        drawHeight = pdfWidth / canvasAspect
        x = 0
        y = (pdfHeight - drawHeight) / 2
      } else {
        // Canvas is taller than PDF
        drawHeight = pdfHeight
        drawWidth = pdfHeight * canvasAspect
        x = (pdfWidth - drawWidth) / 2
        y = 0
      }

      // Convert canvas to image and add to PDF
      const imgData = canvas.toDataURL('image/png')
      pdf.addImage(imgData, 'PNG', x, y, drawWidth, drawHeight)

      // Download PDF
      pdf.save(`${fileName}.pdf`)
    } catch (error) {
      console.error('Error downloading PDF:', error)
    } finally {
      setIsDownloading(false)
    }
  }

  if (!canvas) {
    return (
      <div className={`flex gap-2 ${className}`}>
        <Button variant="outline" disabled>
          <FileImage className="mr-2 h-4 w-4" />
          Download PNG
        </Button>
        <Button variant="outline" disabled>
          <FileText className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
      </div>
    )
  }

  return (
    <div className={`flex gap-2 ${className}`}>
      <Button
        variant="outline"
        onClick={downloadAsPNG}
        disabled={isDownloading}
      >
        {isDownloading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <FileImage className="mr-2 h-4 w-4" />
        )}
        Download PNG
      </Button>
      <Button
        variant="outline" 
        onClick={downloadAsPDF}
        disabled={isDownloading}
      >
        {isDownloading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <FileText className="mr-2 h-4 w-4" />
        )}
        Download PDF
      </Button>
    </div>
  )
}

export default CertificateDownload