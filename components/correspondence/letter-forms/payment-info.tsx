"use client"

import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, CreditCard, Info } from "lucide-react"

interface PaymentInfoProps {
  onSubmit: (data: Record<string, any>) => void
}

export function PaymentInfo({ onSubmit }: PaymentInfoProps) {
  // In a real app, this data would come from an API
  const paymentData = {
    studentName: "Ahmad Fauzi",
    studentNIM: "1901234567",
    studentMajor: "Teknik Informatika",
    faculty: "Teknik",
    semester: "5",
    academicYear: "2023/2024",
    paymentType: "SPP Semester Ganjil",
    originalDueDate: "2023-08-31",
    amount: "Rp 5.000.000",
    extendedDueDate: "2023-09-30",
    reason: "Menunggu pencairan dana beasiswa yang akan cair pada pertengahan September 2023",
  }

  const handleSubmit = () => {
    onSubmit({
      ...paymentData,
      letterDate: new Date().toISOString(),
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Surat Perpanjangan Pembayaran</h2>
        <p className="text-muted-foreground">Informasi perpanjangan pembayaran SPP Anda</p>
      </div>

      <Separator />

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Informasi</AlertTitle>
        <AlertDescription>
          Surat perpanjangan pembayaran akan dibuat berdasarkan data berikut. Anda tidak perlu mengisi form tambahan.
        </AlertDescription>
      </Alert>

      <div className="space-y-6 rounded-lg border p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Nama Mahasiswa</h3>
            <p className="text-base">{paymentData.studentName}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground">NIM</h3>
            <p className="text-base">{paymentData.studentNIM}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Program Studi</h3>
            <p className="text-base">{paymentData.studentMajor}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Fakultas</h3>
            <p className="text-base">{paymentData.faculty}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Semester</h3>
            <p className="text-base">{paymentData.semester}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Tahun Akademik</h3>
            <p className="text-base">{paymentData.academicYear}</p>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-medium">Informasi Pembayaran</h3>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Jenis Pembayaran</h3>
              <p className="text-base">{paymentData.paymentType}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Jumlah</h3>
              <p className="text-base font-medium">{paymentData.amount}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Tenggat Awal</h3>
              <p className="text-base">
                {new Date(paymentData.originalDueDate).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Tenggat Perpanjangan</h3>
              <p className="text-base font-medium text-primary">
                {new Date(paymentData.extendedDueDate).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">Alasan Perpanjangan</h3>
          <p className="text-base">{paymentData.reason}</p>
        </div>
      </div>

      <Alert variant="warning">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Perhatian</AlertTitle>
        <AlertDescription>
          Pastikan informasi di atas sudah benar. Surat perpanjangan pembayaran hanya dapat diajukan satu kali per
          semester.
        </AlertDescription>
      </Alert>

      <div className="flex justify-end">
        <Button onClick={handleSubmit}>Buat Surat</Button>
      </div>
    </div>
  )
}

