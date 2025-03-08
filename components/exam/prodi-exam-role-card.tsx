"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ClipboardCheck, FileCheck, UserCheck, Users } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

interface ResponsibilityItem {
  id: string
  title: string
  description: string
  icon: React.ReactNode
}

interface ProdiExamRoleCardProps {
  className?: string
}

export function ProdiExamRoleCard({ className }: ProdiExamRoleCardProps) {
  const responsibilities: ResponsibilityItem[] = [
    {
      id: "approve-applications",
      title: "Persetujuan Aplikasi Ujian",
      description: "Meninjau dan menyetujui aplikasi ujian proposal, hasil, dan sidang mahasiswa",
      icon: <FileCheck className="h-5 w-5 text-blue-600" />,
    },
    {
      id: "assign-committee",
      title: "Penunjukan Komite Penguji",
      description: "Menentukan dan menugaskan dosen sebagai anggota komite penguji",
      icon: <Users className="h-5 w-5 text-indigo-600" />,
    },
    {
      id: "quality-assurance",
      title: "Penjaminan Kualitas",
      description: "Memastikan standar akademik terpenuhi dalam proses ujian",
      icon: <CheckCircle className="h-5 w-5 text-green-600" />,
    },
    {
      id: "final-approval",
      title: "Persetujuan Akhir",
      description: "Memberikan persetujuan akhir untuk hasil ujian dan kelulusan",
      icon: <ClipboardCheck className="h-5 w-5 text-purple-600" />,
    },
    {
      id: "supervision",
      title: "Pengawasan Proses",
      description: "Mengawasi keseluruhan proses ujian untuk memastikan kepatuhan terhadap peraturan",
      icon: <UserCheck className="h-5 w-5 text-amber-600" />,
    },
  ]

  return (
    <Card className={cn("border-l-4 border-l-blue-600 shadow-md", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-blue-800">Kepala Program Studi</CardTitle>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Peran Akademik
          </Badge>
        </div>
        <CardDescription>Peran dan tanggung jawab Kepala Program Studi dalam proses ujian akademik</CardDescription>
      </CardHeader>
      <Separator className="mb-2" />
      <CardContent>
        <div className="space-y-4">
          {responsibilities.map((item) => (
            <div key={item.id} className="flex items-start gap-3 group">
              <div className="mt-0.5 bg-blue-50 p-2 rounded-md group-hover:bg-blue-100 transition-colors">
                {item.icon}
              </div>
              <div>
                <h4 className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors">{item.title}</h4>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

