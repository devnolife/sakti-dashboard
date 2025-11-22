"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CorrespondenceFormTabs } from "@/components/correspondence/correspondence-form-tabs"
import { submitLetterRequest } from "@/app/actions/correspondence-actions"
import { toast } from "@/hooks/use-toast"

export default function NewLetterPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleFormSubmit = async (data: any, files?: File[]) => {
    // Validasi data sebelum submit
    if (!data || Object.keys(data).length === 0) {
      toast({
        title: "Validasi Gagal",
        description: "Mohon isi semua field yang diperlukan",
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

        // Redirect to correspondence page after delay
        setTimeout(() => {
          router.push('/dashboard/staff_tu/correspondence')
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
    <div className="pt-4 space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-transparent bg-gradient-to-r from-primary to-primary/70 bg-clip-text">
            Buat Surat Baru
          </h2>
          <p className="text-muted-foreground">Pilih jenis surat dan isi informasi yang diperlukan</p>
        </div>
      </div>

      {isSuccess ? (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-medium text-center">Pengajuan Berhasil!</h3>
          <p className="max-w-md text-center text-muted-foreground">
            Pengajuan surat Anda telah berhasil dikirim dan sedang diproses. Anda akan segera dialihkan ke halaman daftar surat.
          </p>
        </div>
      ) : (
        <CorrespondenceFormTabs
          onSubmit={handleFormSubmit}
          isSubmitting={isSubmitting}
          defaultTab="active"
        />
      )}
    </div>
  )
}
