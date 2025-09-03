'use client'

import { useRef } from 'react'
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
    <section id='features' ref={ref} className='bg-gradient-to-br from-violet-50 via-pink-50 to-cyan-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 py-24 relative overflow-hidden'>
      {/* Enhanced Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-violet-400 via-purple-500 to-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Simplified Floating Elements - Only 6 instead of 20 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-20"
            style={{
              left: `${20 + i * 15}%`,
              top: `${20 + i * 10}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className='container mx-auto px-4 relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className='text-center mb-16'
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-6 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 text-white border-0 px-6 py-3 text-sm font-semibold shadow-lg hover:shadow-purple-500/25 transition-all duration-300 animate-pulse">
              ✨ Fitur Unggulan Gen Z
            </Badge>
          </motion.div>
          
          <motion.h2 
            className='text-4xl lg:text-6xl font-black mb-6 leading-tight'
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <span className='bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-x'>
              Semua yang Gen Z Butuhkan
            </span>
            <br />
            <span className="text-slate-800 dark:text-slate-100 text-3xl lg:text-5xl font-bold">
              untuk Mengelola Fakultas 🔥
            </span>
          </motion.h2>
          
          <motion.p 
            className='text-xl lg:text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed font-medium'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            Platform <span className="font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">super lit</span> yang menyediakan solusi lengkap untuk manajemen akademik modern 
            dengan teknologi <span className="font-bold text-purple-600">next-level</span> dan UX yang absolutely <span className="font-bold text-pink-600">fire</span> 🚀💯
          </motion.p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto'>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-white/80 dark:bg-slate-800/80 border border-purple-200/30 hover:border-purple-500/50 hover:shadow-xl transition-all duration-300 group cursor-pointer hover:scale-105 hover:-translate-y-1 rounded-2xl overflow-hidden">
                <CardContent className="p-8 h-full">
                  <div className="flex flex-col items-center text-center space-y-6 h-full">
                    <div className={`${feature.color} group-hover:scale-110 transition-transform duration-300 p-4 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30`}>
                      {feature.icon}
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="text-xl lg:text-2xl font-bold text-slate-800 dark:text-slate-100 mb-3 group-hover:text-purple-600 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors duration-300">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Statistics Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-24 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 rounded-3xl blur-3xl"></div>
          <div className="relative bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 border-2 border-white/20">
            <div className="text-center mb-8">
              <motion.h3 
                className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Platform Stats That Hit Different 📊
              </motion.h3>
              <p className="text-slate-600 dark:text-slate-300">Numbers that speak volumes about our impact</p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { label: "Role Pengguna", value: "14+", icon: "👥", color: "from-purple-500 to-violet-600" },
                { label: "Fitur Utama", value: "50+", icon: "⚡", color: "from-pink-500 to-rose-600" },
                { label: "Modul Sistem", value: "8", icon: "🧩", color: "from-cyan-500 to-blue-600" },
                { label: "Uptime", value: "99.9%", icon: "🚀", color: "from-green-500 to-emerald-600" }
              ].map((stat, index) => (
                <motion.div 
                  key={index} 
                  className="text-center group cursor-pointer"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, y: -5 }}
                >
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center text-2xl group-hover:shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300`}>
                    {stat.icon}
                  </div>
                  <div className={`text-4xl lg:text-5xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300`}>
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold text-slate-600 dark:text-slate-400 group-hover:text-purple-600 transition-colors duration-300">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default UsefulFeature