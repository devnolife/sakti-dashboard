"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CreditCard, Calendar, CheckCircle, FileCheck } from "lucide-react"
import { useState } from "react"

interface PaymentLetterInfoProps {
  onSubmit: (data: any) => void
  isSubmitting?: boolean
  paymentData: any
  onChange?: (data: any) => void
}

export function PaymentLetterInfo({ onSubmit, isSubmitting = false, paymentData, onChange }: PaymentLetterInfoProps) {
  const [formData, setFormData] = useState({
    type: "payment",
    ...paymentData,
  })

  const handleSubmit = () => {
    onSubmit(formData)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
    onChange && onChange({ ...formData, [name]: value })
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border p-4 bg-muted/30">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <h3 className="text-sm font-medium">Informasi Pembayaran Tersedia</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Sistem telah menemukan data pembayaran Anda untuk semester ini. Surat keterangan pembayaran akan dibuat
          berdasarkan data berikut:
        </p>

        <Card>
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b">
                <h4 className="font-medium">Detail Mahasiswa</h4>
                <span className="text-sm text-muted-foreground">{paymentData.academicYear}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">NIM</p>
                  <p className="font-medium">{paymentData.studentId}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Nama</p>
                  <p className="font-medium">{paymentData.studentName}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Semester</p>
                  <p className="font-medium">{paymentData.semester}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Tahun Akademik</p>
                  <p className="font-medium">{paymentData.academicYear}</p>
                </div>
              </div>

              <div className="pt-2 pb-2 border-t border-b">
                <h4 className="font-medium mb-2">Rincian Pembayaran</h4>
                <div className="space-y-3">
                  {paymentData.paymentDetails.map((item: any, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                        <span>{item.description}</span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="font-medium">{item.amount}</span>
                        <div className="flex items-center gap-1 text-xs">
                          <span className="text-green-500 font-medium">{item.status}</span>
                          <span className="text-muted-foreground">•</span>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            <span className="text-muted-foreground">{item.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <h4 className="font-medium">Total Pembayaran</h4>
                <span className="font-bold text-lg">{paymentData.totalPaid}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Button onClick={handleSubmit} className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></span>
            Memproses...
          </>
        ) : (
          <>
            <FileCheck className="mr-2 h-4 w-4" />
            Buat Surat Keterangan Pembayaran
          </>
        )}
      </Button>
    </div>
  )
}

