"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Award,
  Sparkles,
  FileText,
  ClipboardList,
  Users,
  ArrowRight
} from "lucide-react"

export default function CertificatesOverviewPage() {
  const stats = [
    {
      title: "Total Sertifikat",
      value: "1,247",
      icon: Award,
    },
    {
      title: "Template", 
      value: "4",
      icon: FileText,
    },
    {
      title: "Bulan Ini",
      value: "156", 
      icon: Sparkles,
    }
  ]

  const quickActions = [
    {
      title: "Buat Sertifikat",
      description: "Generate sertifikat baru",
      icon: Sparkles,
      href: "/dashboard/laboratory_admin/certificates/generate"
    },
    {
      title: "Template",
      description: "Kelola template sertifikat",
      icon: FileText,
      href: "/dashboard/laboratory_admin/certificates/templates"
    },
    {
      title: "Preview",
      description: "Lihat contoh sertifikat",
      icon: Award,
      href: "/dashboard/laboratory_admin/certificates/preview"
    }
  ]

  const recentCertificates = [
    {
      id: 1,
      title: "UX Design Foundations Certificate",
      recipient: "Ahmad Fauzi",
      template: "UX Design Foundations (Template Utama)",
      date: "2024-01-15",
      status: "completed"
    },
    {
      id: 2,
      title: "Best Presenter Workshop AI",
      recipient: "Siti Nurhaliza",
      template: "UX Design Foundations (Template Utama)",
      date: "2024-01-14",
      status: "completed"
    },
    {
      id: 3,
      title: "Outstanding Student Achievement",
      recipient: "Budi Santoso",
      template: "UX Design Foundations (Template Utama)",
      date: "2024-01-13",
      status: "completed"
    }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Generator Sertifikat
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Kelola dan buat sertifikat digital
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon
          return (
            <Card key={index} className="border-0 bg-white dark:bg-gray-800">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <IconComponent className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
                    <p className="text-xl font-semibold">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-4">
        {quickActions.map((action, index) => {
          const IconComponent = action.icon
          return (
            <Link key={index} href={action.href}>
              <Card className="border hover:shadow-sm transition-shadow cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium mb-1">{action.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{action.description}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Recent Certificates */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Sertifikat Terbaru</CardTitle>
            <Link href="/dashboard/laboratory_admin/certificates/history" className="text-sm text-gray-600 hover:text-gray-900">
              Lihat semua
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentCertificates.map((cert) => (
              <div key={cert.id} className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium text-sm">{cert.title}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{cert.recipient} • {cert.date}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${
                  cert.template.includes("Template Utama")
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 border border-blue-200"
                    : "bg-gray-100 dark:bg-gray-700"
                }`}>
                  {cert.template}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}