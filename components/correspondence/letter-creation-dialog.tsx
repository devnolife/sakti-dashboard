"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { CheckCircle, AlertCircle } from "lucide-react"
import { CorrespondenceFormTabs } from "./correspondence-form-tabs"
import { submitLetterRequest } from "@/app/actions/correspondence-actions"
import { toast } from "@/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface LetterCreationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  letterType?: string | null
  existingRequests?: any[]
}

export function LetterCreationDialog({ open, onOpenChange, letterType = "active", existingRequests = [] }: LetterCreationDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Hitung jumlah pending requests
  const pendingRequests = existingRequests.filter(
    (req) => req.status === 'submitted' || req.status === 'in-review'
  )

  // Reset state when dialog opens/closes
  useEffect(() => {
    if (open) {
      setIsSuccess(false)
    }
  }, [open])

  const handleFormSubmit = async (data: any) => {
    // Validasi data sebelum submit
    if (!data || Object.keys(data).length === 0) {
      toast({
        title: "Validasi Gagal",
        description: "Mohon isi semua field yang diperlukan",
        variant: "destructive"
      })
      return
    }

    // Validasi: Cek apakah ada surat dengan jenis yang sama yang masih dalam proses
    const letterTypeTitle = data.title || 'Surat Keterangan Aktif Kuliah'

    // Filter pending requests untuk jenis surat yang sama
    const pendingRequestsForType = existingRequests.filter(
      (req) =>
        req.title === letterTypeTitle &&
        (req.status === 'submitted' || req.status === 'in-review')
    )

    if (pendingRequestsForType.length > 0) {
      const statusText = pendingRequestsForType[0].status === 'submitted' ? 'Diajukan' : 'Diproses'
      toast({
        title: "Permohonan Ditolak",
        description: `Anda sudah memiliki permohonan "${letterTypeTitle}" dengan status "${statusText}". Mohon tunggu hingga permohonan sebelumnya selesai atau dibatalkan.`,
        variant: "destructive"
      })
      return
    }

    // Validasi berdasarkan tipe surat
    if (data.type === 'active') {
      if (!data.semester || !data.academicYear || !data.purpose) {
        toast({
          title: "Validasi Gagal",
          description: "Mohon lengkapi semester, tahun akademik, dan tujuan surat",
          variant: "destructive"
        })
        return
      }
    } else if (data.type === 'leave') {
      if (!data.leaveType || !data.startDate || !data.endDate || !data.reason) {
        toast({
          title: "Validasi Gagal",
          description: "Mohon lengkapi semua field untuk surat cuti",
          variant: "destructive"
        })
        return
      }
    } else if (data.type === 'payment') {
      if (!data.paymentType || !data.paymentDate || !data.amount) {
        toast({
          title: "Validasi Gagal",
          description: "Mohon lengkapi semua field untuk surat pembayaran",
          variant: "destructive"
        })
        return
      }
    } else if (data.type === 'custom') {
      if (!data.letterTitle || !data.recipient || !data.letterContent) {
        toast({
          title: "Validasi Gagal",
          description: "Mohon lengkapi judul, penerima, dan isi surat",
          variant: "destructive"
        })
        return
      }
    }

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

        {pendingRequests.length > 0 && (
          <Alert variant="default" className="bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-800">
            <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <AlertTitle className="text-amber-800 dark:text-amber-300">Perhatian</AlertTitle>
            <AlertDescription className="text-amber-700 dark:text-amber-400">
              Anda memiliki <strong>{pendingRequests.length} permohonan</strong> yang sedang diproses.
              Anda tidak dapat mengajukan surat dengan jenis yang sama hingga permohonan sebelumnya selesai.
            </AlertDescription>
          </Alert>
        )}

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

