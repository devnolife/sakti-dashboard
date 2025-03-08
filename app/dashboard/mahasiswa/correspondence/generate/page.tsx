"use client"

import { useState } from "react"
import { LetterTypeSelector } from "@/components/correspondence/letter-type-selector"
import { ActiveCollegeForm } from "@/components/correspondence/letter-forms/active-college-form"
import { LeaveForm } from "@/components/correspondence/letter-forms/leave-form"
import { PaymentInfo } from "@/components/correspondence/letter-forms/payment-info"
import { LetterPreview } from "@/components/correspondence/letter-preview"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Download, Printer } from "lucide-react"
import Link from "next/link"

// Letter type definition
export type LetterType = "active-college" | "leave" | "payment" | null

export default function GenerateLetterPage() {
  const [letterType, setLetterType] = useState<LetterType>(null)
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [showPreview, setShowPreview] = useState(false)

  // Handle form submission
  const handleFormSubmit = (data: Record<string, any>) => {
    setFormData(data)
    setShowPreview(true)
  }

  // Reset the form and go back to letter type selection
  const handleReset = () => {
    setLetterType(null)
    setFormData({})
    setShowPreview(false)
  }

  // Get the title based on letter type
  const getLetterTitle = () => {
    switch (letterType) {
      case "active-college":
        return "Surat Keterangan Aktif Kuliah"
      case "leave":
        return "Surat Izin Cuti"
      case "payment":
        return "Surat Perpanjangan Pembayaran"
      default:
        return "Buat Surat Baru"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header with gradient background */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-primary/90 to-secondary/90 p-8 shadow-lg">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))]" />
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Link href="/dashboard/mahasiswa/correspondence">
                <Button variant="ghost" size="icon" className="rounded-full bg-white/20 text-white hover:bg-white/30">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h2 className="text-3xl font-bold tracking-tight text-white">{getLetterTitle()}</h2>
            </div>
            <p className="mt-2 text-white/80">
              {!letterType
                ? "Pilih jenis surat yang ingin Anda buat"
                : !showPreview
                  ? "Isi formulir untuk membuat surat"
                  : "Pratinjau surat yang akan dicetak"}
            </p>
          </div>

          {showPreview && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="bg-white/90 text-primary hover:bg-white"
                onClick={() => window.print()}
              >
                <Printer className="mr-2 h-4 w-4" />
                Cetak
              </Button>
              <Button className="bg-white text-primary hover:bg-white/90">
                <Download className="mr-2 h-4 w-4" />
                Unduh PDF
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6">
        {!letterType && <LetterTypeSelector onSelect={setLetterType} />}

        {letterType && !showPreview && (
          <Card className="p-6 shadow-md">
            {letterType === "active-college" && <ActiveCollegeForm onSubmit={handleFormSubmit} />}

            {letterType === "leave" && <LeaveForm onSubmit={handleFormSubmit} />}

            {letterType === "payment" && <PaymentInfo onSubmit={handleFormSubmit} />}
          </Card>
        )}

        {showPreview && (
          <div className="space-y-4">
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setShowPreview(false)}>
                Kembali ke Form
              </Button>
              <Button variant="outline" onClick={handleReset}>
                Buat Surat Lain
              </Button>
            </div>

            <LetterPreview type={letterType} data={formData} />
          </div>
        )}
      </div>
    </div>
  )
}

