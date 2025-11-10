"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { CheckCircle } from "lucide-react"
import { CorrespondenceFormTabs } from "./correspondence-form-tabs"
import { submitLetterRequest } from "@/app/actions/correspondence-actions"
import { toast } from "@/hooks/use-toast"

interface LetterCreationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  letterType?: string | null
}

export function LetterCreationDialog({ open, onOpenChange, letterType = "active" }: LetterCreationDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Reset state when dialog opens/closes
  useEffect(() => {
    if (open) {
      setIsSuccess(false)
    }
  }, [open])

  const handleFormSubmit = async (data: any) => {
    setIsSubmitting(true)

    try {
      console.log('Submitting letter request:', data)

      const result = await submitLetterRequest(
        data.type || 'active_student',
        data.title || 'Surat Keterangan Aktif Kuliah',
        data.purpose || 'Keperluan administrasi',
        data.purpose || 'Permohonan surat keterangan aktif kuliah',
        data  // Additional info contains all form data
      )

      if (result.success) {
        setIsSuccess(true)
        toast({
          title: "Berhasil!",
          description: result.message,
        })

        // Close dialog after delay
        setTimeout(() => {
          onOpenChange(false)
          setIsSuccess(false)
          // Refresh page to show new request in list
          window.location.reload()
        }, 2000)
      } else {
        toast({
          title: "Gagal",
          description: result.message,
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error('Error submitting letter request:', error)
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat mengajukan permohonan",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Ajukan Surat</DialogTitle>
          <DialogDescription>
            Pilih jenis surat dan isi informasi yang diperlukan
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-medium text-center">Pengajuan Berhasil!</h3>
            <p className="max-w-md text-center text-muted-foreground">
              Pengajuan surat Anda telah berhasil dikirim dan sedang diproses.
            </p>
          </div>
        ) : (
          <CorrespondenceFormTabs
            onSubmit={handleFormSubmit}
            isSubmitting={isSubmitting}
            defaultTab={letterType || "active"}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

