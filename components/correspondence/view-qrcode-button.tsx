"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { QrCode, Download, ExternalLink } from "lucide-react"
import Image from "next/image"

interface ViewQRCodeButtonProps {
  qrCodeUrl: string
  documentNumber: string
  verificationUrl?: string
}

export function ViewQRCodeButton({
  qrCodeUrl,
  documentNumber,
  verificationUrl,
}: ViewQRCodeButtonProps) {
  const handleDownload = async () => {
    try {
      const response = await fetch(qrCodeUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `qrcode-${documentNumber}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Failed to download QR code:", error)
    }
  }

  const handleOpenVerification = () => {
    if (verificationUrl) {
      window.open(verificationUrl, "_blank")
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <QrCode className="mr-2 h-4 w-4" />
          Lihat QR Code
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>QR Code Verifikasi</DialogTitle>
          <DialogDescription>
            QR Code untuk dokumen {documentNumber}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4 p-6">
          <div className="relative w-64 h-64 border-4 border-white rounded-lg shadow-lg">
            <Image
              src={qrCodeUrl}
              alt={`QR Code ${documentNumber}`}
              fill
              className="object-contain"
            />
          </div>

          <p className="text-sm text-muted-foreground text-center max-w-sm">
            Scan QR code ini dengan smartphone untuk memverifikasi keaslian dokumen
          </p>

          <div className="flex gap-2 w-full">
            <Button
              variant="outline"
              onClick={handleDownload}
              className="flex-1"
            >
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            {verificationUrl && (
              <Button
                variant="outline"
                onClick={handleOpenVerification}
                className="flex-1"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Buka Link
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
