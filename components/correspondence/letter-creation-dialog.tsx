"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { FileCheck, ArrowLeft, Printer, Download, CheckCircle, X } from "lucide-react"
import { LetterPreview } from "./letter-preview"
import { useRouter } from "next/navigation"
import { CorrespondenceFormTabs } from "./correspondence-form-tabs"

interface LetterCreationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  letterType?: string | null
}

export function LetterCreationDialog({ open, onOpenChange, letterType = "active" }: LetterCreationDialogProps) {
  const router = useRouter()
  const [step, setStep] = useState<"form" | "preview">("form")
  const [formData, setFormData] = useState<any>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Reset state when dialog opens/closes
  useEffect(() => {
    if (open) {
      setStep("form")
      setFormData(null)
      setIsSuccess(false)
    }
  }, [open])

  const handleFormSubmit = (data: any) => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setFormData(data)
      setStep("preview")
      setIsSubmitting(false)
    }, 1000)
  }

  const handleGenerateLetter = () => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSuccess(true)
      setIsSubmitting(false)
    }, 1500)
  }

  const handleBackToForm = () => {
    setStep("form")
  }

  const handleClose = (open: boolean) => {
    onOpenChange(open)
    if (!open) {
      router.refresh()
    }
  }

  const handleCloseButtonClick = () => {
    handleClose(false)
  }

  const handleDownload = () => {
    // Implement download logic here
    console.log("Download letter")
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="w-4 h-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{step === "form" ? "Buat Surat" : "Pratinjau Surat"}</DialogTitle>
          <DialogDescription>
            {step === "form"
              ? "Pilih jenis surat dan isi informasi yang diperlukan"
              : "Periksa surat Anda sebelum mengunduh atau mencetak"}
          </DialogDescription>
        </DialogHeader>

        {step === "form" ? (
          <CorrespondenceFormTabs
            onSubmit={handleFormSubmit}
            isSubmitting={isSubmitting}
            defaultTab={letterType || "active"}
          />
        ) : (
          <div className="space-y-6">
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center py-8 space-y-4">
                <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-medium text-center">Surat Berhasil Dibuat!</h3>
                <p className="max-w-md text-center text-muted-foreground">
                  Surat Anda telah berhasil dibuat dan disimpan. Anda dapat mengunduh atau mencetak surat ini.
                </p>
                <div className="flex gap-3 mt-4">
                  <Button variant="outline" onClick={handleCloseButtonClick}>
                    Kembali ke Daftar
                  </Button>
                  <Button onClick={handleDownload}>
                    <Download className="w-4 h-4 mr-2" />
                    Unduh Surat
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <LetterPreview letterType={formData?.type || "active"} data={formData} />

                <div className="flex justify-between">
                  <Button variant="outline" onClick={handleBackToForm}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Kembali
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Printer className="w-4 h-4 mr-2" />
                      Cetak
                    </Button>
                    <Button onClick={handleGenerateLetter} disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 mr-2 border-2 rounded-full animate-spin border-primary border-t-transparent"></span>
                          Memproses...
                        </>
                      ) : (
                        <>
                          <FileCheck className="w-4 h-4 mr-2" />
                          Buat Surat
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

