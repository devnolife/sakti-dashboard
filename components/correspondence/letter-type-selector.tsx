"use client"

import type React from "react"

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Calendar, CreditCard } from "lucide-react"
import type { LetterType } from "@/app/dashboard/mahasiswa/correspondence/generate/page"

interface LetterTypeOption {
  id: LetterType
  title: string
  description: string
  icon: React.ReactNode
  color: string
}

interface LetterTypeSelectorProps {
  onSelect: (type: LetterType) => void
}

export function LetterTypeSelector({ onSelect }: LetterTypeSelectorProps) {
  const letterTypes: LetterTypeOption[] = [
    {
      id: "active-college",
      title: "Surat Keterangan Aktif Kuliah",
      description: "Surat yang menyatakan bahwa Anda adalah mahasiswa aktif di universitas",
      icon: <FileText className="h-10 w-10" />,
      color: "from-blue-500/20 to-blue-600/20 border-blue-500/30",
    },
    {
      id: "leave",
      title: "Surat Izin Cuti",
      description: "Surat permohonan untuk mengambil cuti dari perkuliahan",
      icon: <Calendar className="h-10 w-10" />,
      color: "from-amber-500/20 to-amber-600/20 border-amber-500/30",
    },
    {
      id: "payment",
      title: "Surat Perpanjangan Pembayaran",
      description: "Surat permohonan untuk memperpanjang tenggat waktu pembayaran",
      icon: <CreditCard className="h-10 w-10" />,
      color: "from-emerald-500/20 to-emerald-600/20 border-emerald-500/30",
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {letterTypes.map((type) => (
        <Card
          key={type.id}
          className={`overflow-hidden border transition-all hover:shadow-md cursor-pointer hover:border-primary/50 hover:-translate-y-1`}
          onClick={() => onSelect(type.id)}
        >
          <div className={`h-2 bg-gradient-to-r ${type.color}`} />
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {type.title}
              <div className={`p-2 rounded-full bg-gradient-to-r ${type.color}`}>{type.icon}</div>
            </CardTitle>
            <CardDescription>{type.description}</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button className="w-full">Pilih</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

