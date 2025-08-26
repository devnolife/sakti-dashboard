"use client"
import QualityMonitoringCard from "@/components/gkm/quality-monitoring-card"
import AccreditationStatus from "@/components/gkm/accreditation-status"
import { motion } from "framer-motion"
import { 
  GraduationCap, 
  Users, 
  BookOpen, 
  Building,
  Target
} from "lucide-react"
export default function QualityMonitoringPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 space-y-8">
      {/* Header */}
      <motion.div
        className="text-center space-y-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Monitoring Mutu Program Studi
        </h1>
        <p className="text-gray-600 text-lg">
          Monitoring dan Evaluasi Mutu 5 Program Studi Fakultas Teknik
        </p>
      </motion.div>
      {/* Quality Monitoring Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <QualityMonitoringCard
          title="Mutu Akademik Program Studi"
          icon={GraduationCap}
        />
        
        <QualityMonitoringCard
          title="Kinerja Dosen per Program Studi"
          icon={Users}
          metrics={[
            {
              id: "teknik-sipil-dosen",
              title: "Teknik Sipil (Pengairan) - Dosen",
              value: 91,
              target: 95,
              status: "good",
              trend: "up",
              lastUpdated: "2024-01-15"
            },
            {
              id: "teknik-elektro-dosen",
              title: "Teknik Elektro - Dosen", 
              value: 88,
              target: 90,
              status: "warning",
              trend: "stable",
              lastUpdated: "2024-01-14"
            },
            {
              id: "arsitektur-dosen",
              title: "Arsitektur - Dosen",
              value: 93,
              target: 95,
              status: "good",
              trend: "up",
              lastUpdated: "2024-01-16"
            },
            {
              id: "informatika-dosen",
              title: "Informatika - Dosen",
              value: 86,
              target: 88,
              status: "warning",
              trend: "down",
              lastUpdated: "2024-01-13"
            },
            {
              id: "pwk-dosen",
              title: "PWK - Dosen",
              value: 89,
              target: 92,
              status: "good",
              trend: "up", 
              lastUpdated: "2024-01-17"
            }
          ]}
        />
        
        <QualityMonitoringCard
          title="Fasilitas & Laboratorium"
          icon={Building}
          metrics={[
            {
              id: "teknik-sipil-lab",
              title: "Lab Hidrolika & Struktur",
              value: 90,
              target: 93,
              status: "good",
              trend: "up",
              lastUpdated: "2024-01-15"
            },
            {
              id: "teknik-elektro-lab",
              title: "Lab Elektronika & Kontrol",
              value: 85,
              target: 88,
              status: "warning",
              trend: "stable",
              lastUpdated: "2024-01-14"
            },
            {
              id: "arsitektur-studio",
              title: "Studio Desain & Maket",
              value: 94,
              target: 95,
              status: "excellent",
              trend: "up",
              lastUpdated: "2024-01-16"
            },
            {
              id: "informatika-lab",
              title: "Lab Komputer & Jaringan",
              value: 87,
              target: 90,
              status: "good",
              trend: "up",
              lastUpdated: "2024-01-13"
            },
            {
              id: "pwk-lab",
              title: "Lab GIS & Perencanaan",
              value: 88,
              target: 90,
              status: "good",
              trend: "stable",
              lastUpdated: "2024-01-17"
            }
          ]}
        />
        
        <QualityMonitoringCard
          title="Relevansi Kurikulum"
          icon={BookOpen}
          metrics={[
            {
              id: "teknik-sipil-kurikulum",
              title: "Teknik Sipil - Kurikulum 2022",
              value: 92,
              target: 95,
              status: "good",
              trend: "up",
              lastUpdated: "2024-01-15"
            },
            {
              id: "teknik-elektro-kurikulum",
              title: "Teknik Elektro - Kurikulum 2023",
              value: 89,
              target: 92,
              status: "good",
              trend: "up",
              lastUpdated: "2024-01-14"
            },
            {
              id: "arsitektur-kurikulum",
              title: "Arsitektur - Kurikulum 2022",
              value: 94,
              target: 96,
              status: "good",
              trend: "stable",
              lastUpdated: "2024-01-16"
            },
            {
              id: "informatika-kurikulum",
              title: "Informatika - Kurikulum 2023",
              value: 87,
              target: 90,
              status: "warning",
              trend: "down",
              lastUpdated: "2024-01-13"
            },
            {
              id: "pwk-kurikulum",
              title: "PWK - Kurikulum 2022",
              value: 90,
              target: 93,
              status: "good",
              trend: "up",
              lastUpdated: "2024-01-17"
            }
          ]}
        />
      </div>
      {/* Accreditation Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <AccreditationStatus />
      </motion.div>
    </div>
  )
}