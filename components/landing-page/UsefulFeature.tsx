'use client'

import { useEffect, useRef } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { 
  GraduationCap, 
  BookOpen, 
  CreditCard, 
  FileText, 
  Users, 
  BarChart3,
  Calendar,
  Settings,
  Shield,
  Zap,
  Globe,
  Award
} from 'lucide-react'

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
  color: string
}

const features: Feature[] = [
  {
    icon: <GraduationCap className="w-8 h-8" />,
    title: 'Manajemen Mahasiswa',
    description: 'Sistem terintegrasi untuk mengelola data akademik mahasiswa, nilai, dan progress studi.',
    color: 'text-primary'
  },
  {
    icon: <BookOpen className="w-8 h-8" />,
    title: 'KKP & Ujian',
    description: 'Platform lengkap untuk Kerja Kuliah Praktek, ujian proposal, dan tugas akhir.',
    color: 'text-secondary'
  },
  {
    icon: <CreditCard className="w-8 h-8" />,
    title: 'Sistem Pembayaran',
    description: 'Kelola pembayaran SPP, lab fee, dan biaya akademik lainnya dengan mudah.',
    color: 'text-green-500'
  },
  {
    icon: <FileText className="w-8 h-8" />,
    title: 'Korespondensi Digital',
    description: 'Sistem surat menyurat digital untuk berbagai keperluan administrasi akademik.',
    color: 'text-purple-500'
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: 'Multi-Role Access',
    description: 'Dukungan untuk 14+ role berbeda: mahasiswa, dosen, admin, dekan, dan lainnya.',
    color: 'text-orange-500'
  },
  {
    icon: <BarChart3 className="w-8 h-8" />,
    title: 'Analytics & Reports',
    description: 'Dashboard analitik dan laporan komprehensif untuk monitoring akademik.',
    color: 'text-blue-500'
  },
  {
    icon: <Calendar className="w-8 h-8" />,
    title: 'Jadwal Terintegrasi',
    description: 'Manajemen jadwal kuliah, praktikum, ujian, dan kegiatan akademik lainnya.',
    color: 'text-indigo-500'
  },
  {
    icon: <Settings className="w-8 h-8" />,
    title: 'Konfigurasi Fleksibel',
    description: 'Sistem dapat dikonfigurasi sesuai kebutuhan spesifik fakultas dan program studi.',
    color: 'text-gray-500'
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: 'Keamanan Data',
    description: 'Sistem keamanan berlapis untuk melindungi data akademik dan pribadi.',
    color: 'text-red-500'
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: 'Performance Tinggi',
    description: 'Dibangun dengan teknologi modern untuk performa optimal dan responsif.',
    color: 'text-yellow-500'
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: 'Akses 24/7',
    description: 'Platform berbasis web yang dapat diakses kapan saja dari perangkat apapun.',
    color: 'text-teal-500'
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: 'Quality Assurance',
    description: 'Sistem Gugus Kendali Mutu (GKM) untuk monitoring dan evaluasi kualitas pendidikan.',
    color: 'text-pink-500'
  }
]

const UsefulFeature = () => {
  const ref = useRef<HTMLElement>(null)

  return (
    <section id='features' ref={ref} className='bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-slate-900 dark:via-indigo-900 dark:to-slate-900 py-20 relative overflow-hidden'>
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-r from-indigo-400 to-cyan-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
      </div>

      <div className='container mx-auto px-4 relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className='text-center mb-16'
        >
          <Badge className="mb-6 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white border-0 px-4 py-2">
            ✨ Fitur Unggulan
          </Badge>
          
          <h2 className='text-4xl lg:text-5xl font-bold mb-6'>
            <span className='bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent'>
              Semua yang Anda Butuhkan
            </span>
            <br />
            <span className="text-slate-800 dark:text-slate-100 text-3xl lg:text-4xl">
              untuk Mengelola Fakultas
            </span>
          </h2>
          
          <p className='text-xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed'>
            Platform terintegrasi yang menyediakan solusi lengkap untuk manajemen akademik modern 
            dengan teknologi terdepan dan pengalaman pengguna yang luar biasa
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 group">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className={`${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Statistics Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { label: "Role Pengguna", value: "14+" },
            { label: "Fitur Utama", value: "50+" },
            { label: "Modul Sistem", value: "8" },
            { label: "Uptime", value: "99.9%" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default UsefulFeature