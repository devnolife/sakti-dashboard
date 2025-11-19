"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle } from "lucide-react"
import { CorrespondenceFormTabs } from "@/components/correspondence/correspondence-form-tabs"
import { submitLetterRequestWithFiles } from "@/app/actions/correspondence-actions"
import { getStudentLetterRequests } from "@/app/actions/correspondence-actions"
import { toast } from "@/hooks/use-toast"
import Link from "next/link"

export default function NewCorrespondencePage() {
  const router = useRouter()
  const { user, isLoading: authLoading } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [existingRequests, setExistingRequests] = useState<any[]>([])
  const [isLoadingRequests, setIsLoadingRequests] = useState(true)

  // Fetch existing requests untuk validasi
  useEffect(() => {
    async function fetchRequests() {
      if (!user?.id) return

      try {
        // Fetch student profile using authenticated user id
        const token = typeof window !== 'undefined' ? localStorage.getItem('session-token') : null
        const response = await fetch('/api/student/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {})
          },
          body: JSON.stringify({ userId: user.id })
        })

        if (response.ok) {
          const student = await response.json()
          const data = await getStudentLetterRequests(student.id)
          setExistingRequests(data)
        }
      } catch (error) {
        console.error("Error fetching requests:", error)
      } finally {
        setIsLoadingRequests(false)
      }
    }

    if (!authLoading && user?.id) {
      fetchRequests()
    } else if (!authLoading) {
      setIsLoadingRequests(false)
    }
  }, [authLoading, user?.id])

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
      console.log('📤 Submitting letter request with files:', data, 'Files count:', files?.length || 0)

      // Create FormData untuk submit dengan files
      const formData = new FormData()

      // Add letter type and purpose
      formData.append('letterType', data.type || 'active_student')
      formData.append('purpose', data.purpose || 'Keperluan administrasi')

      // Add all additional info as nested fields
      Object.keys(data).forEach(key => {
        if (key !== 'type' && key !== 'purpose' && data[key] !== undefined && data[key] !== null) {
          formData.append(`additionalInfo[${key}]`, String(data[key]))
        }
      })

      // Add files if any
      if (files && files.length > 0) {
        files.forEach(file => {
          formData.append('files[]', file)
        })
        console.log(`📎 Added ${files.length} files to FormData`)
      }

      const result = await submitLetterRequestWithFiles(formData)

      if (result.success) {
        setIsSuccess(true)
        toast({
          title: "Berhasil!",
          description: result.message,
        })

        // Redirect to correspondence page after delay
        setTimeout(() => {
          router.push('/dashboard/mahasiswa/correspondence')
        }, 2000)
      } else {
        toast({
          title: "Gagal",
          description: result.message,
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error('❌ Error submitting letter request:', error)
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat mengajukan permohonan",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoadingRequests || authLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/mahasiswa/correspondence">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali
            </Button>
          </Link>
        </div>
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Memuat...</CardTitle>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/mahasiswa/correspondence">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Ajukan Surat Baru</h1>
          <p className="text-sm text-muted-foreground">Pilih jenis surat dan isi informasi yang diperlukan</p>
        </div>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl">Form Permohonan Surat</CardTitle>
          <CardDescription>
            Lengkapi formulir di bawah ini sesuai dengan jenis surat yang Anda butuhkan
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full dark:bg-green-950">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-medium text-center">Pengajuan Berhasil!</h3>
              <p className="max-w-md text-center text-muted-foreground">
                Pengajuan surat Anda telah berhasil dikirim dan sedang diproses. Anda akan dialihkan ke halaman daftar surat...
              </p>
            </div>
          ) : (
            <CorrespondenceFormTabs
              onSubmit={handleFormSubmit}
              isSubmitting={isSubmitting}
              defaultTab="active"
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
