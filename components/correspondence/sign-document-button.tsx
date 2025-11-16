"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { PenLine, Loader2, CheckCircle, QrCode } from "lucide-react"
import Image from "next/image"

interface SignDocumentButtonProps {
  documentId: number
  documentNumber?: string
  onSuccess?: () => void
}

export function SignDocumentButton({
  documentId,
  documentNumber,
  onSuccess,
}: SignDocumentButtonProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null)
  const { toast } = useToast()

  const handleSign = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/documents/${documentId}/sign`, {
        method: "POST",
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to sign document")
      }

      const data = await response.json()
      setQrCodeUrl(data.qrCodeUrl)

      toast({
        title: "Dokumen Berhasil Ditandatangani",
        description: "Tanda tangan digital dan QR code telah dibuat",
      })

      onSuccess?.()
    } catch (error: any) {
      toast({
        title: "Gagal Menandatangani Dokumen",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm">
          <PenLine className="mr-2 h-4 w-4" />
          Tanda Tangan Digital
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tanda Tangan Digital</DialogTitle>
          <DialogDescription>
            {qrCodeUrl
              ? "Dokumen telah berhasil ditandatangani secara digital"
              : documentNumber
                ? `Anda akan menandatangani dokumen ${documentNumber} secara digital`
                : "Anda akan menandatangani dokumen ini secara digital"}
          </DialogDescription>
        </DialogHeader>

        {qrCodeUrl ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <p className="text-sm font-medium text-green-800">
                Dokumen telah ditandatangani dengan sukses
              </p>
            </div>

            <div className="flex flex-col items-center gap-4 p-6 bg-muted rounded-lg">
              <div className="flex items-center gap-2">
                <QrCode className="h-5 w-5" />
                <p className="font-medium">QR Code Verifikasi</p>
              </div>
              <div className="relative w-64 h-64 border-4 border-white rounded-lg shadow-lg">
                <Image
                  src={qrCodeUrl}
                  alt="QR Code Verifikasi"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-xs text-muted-foreground text-center max-w-sm">
                Scan QR code ini untuk memverifikasi keaslian dokumen
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 border-l-4 border-primary bg-primary/5 rounded-r-lg">
              <p className="text-sm">
                Dengan menandatangani dokumen ini, Anda menyatakan bahwa:
              </p>
              <ul className="mt-2 text-sm space-y-1 list-disc list-inside">
                <li>Dokumen telah direview dan disetujui</li>
                <li>Informasi dalam dokumen adalah benar</li>
                <li>Tanda tangan digital memiliki kekuatan hukum yang sama</li>
              </ul>
            </div>
          </div>
        )}

        <DialogFooter>
          {qrCodeUrl ? (
            <Button onClick={() => setOpen(false)}>Tutup</Button>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={loading}
              >
                Batal
              </Button>
              <Button onClick={handleSign} disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Menandatangani...
                  </>
                ) : (
                  <>
                    <PenLine className="mr-2 h-4 w-4" />
                    Tanda Tangan
                  </>
                )}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
