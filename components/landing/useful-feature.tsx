'use client'

import { useEffect, useRef } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { GraduationCap, Users, FileCheck, CreditCard, Calendar, Shield } from 'lucide-react'

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: <GraduationCap className="w-12 h-12 text-primary" />,
    title: 'Manajemen Akademik',
    description: 'Kelola data mahasiswa, nilai, jadwal kuliah, dan seluruh proses akademik dalam satu platform.'
  },
  {
    icon: <Users className="w-12 h-12 text-primary" />,
    title: 'Multi-Role Dashboard',
    description: 'Dashboard khusus untuk mahasiswa, dosen, admin, dekan, dan seluruh stakeholder fakultas.'
  },
  {
    icon: <FileCheck className="w-12 h-12 text-primary" />,
    title: 'Surat & Dokumen',
    description: 'Sistem pembuatan surat otomatis dan pengelolaan dokumen akademik yang terintegrasi.'
  },
  {
    icon: <CreditCard className="w-12 h-12 text-primary" />,
    title: 'Pembayaran Digital',
    description: 'Kelola pembayaran SPP, praktikum, dan administrasi akademik lainnya secara digital.'
  },
  {
    icon: <Calendar className="w-12 h-12 text-primary" />,
    title: 'Jadwal Terintegrasi',
    description: 'Sistem penjadwalan kuliah, ujian, praktikum, dan kegiatan akademik lainnya.'
  },
  {
    icon: <Shield className="w-12 h-12 text-primary" />,
    title: 'Keamanan Data',
    description: 'Sistem keamanan berlapis dengan kontrol akses yang ketat untuk melindungi data akademik.'
  }
]

const UsefulFeature: React.FC = () => {
  const skipIntersection = useRef(true)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (skipIntersection.current) {
          skipIntersection.current = false
          return
        }
        // Handle intersection if needed
      },
      { threshold: 0.35 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return (
    <section id="features" ref={ref} className="relative py-[100px] bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/30 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 overflow-hidden">
      {/* Enhanced Background Elements with #3674B5 */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-gradient-to-br from-primary/15 to-secondary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-tl from-primary/20 to-secondary/15 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/8 via-transparent to-primary/12 rounded-full blur-3xl" />
      <div className="absolute top-20 left-1/3 w-40 h-40 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl animate-pulse delay-500" />

      <div className="relative flex flex-col gap-16 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col gap-y-6 items-center justify-center">
          {/* Enhanced Floating Badge with #3674B5 */}
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary/12 to-primary/8 backdrop-blur-xl border-2 border-primary/25 rounded-full text-sm font-semibold shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 animate-float">
            <span className="w-2 h-2 bg-primary rounded-full mr-3 animate-pulse"></span>
            <span className="text-primary">⚡ Fitur Unggulan</span>
          </div>

          <div className="flex flex-col items-center gap-y-4 justify-center flex-wrap">
            <div className="flex items-center gap-x-2">
              <h2 className="text-neutral-900 dark:text-white text-4xl lg:text-5xl text-center font-extrabold leading-tight">
                <span className="relative z-[1] bg-gradient-to-r from-neutral-900 to-neutral-600 bg-clip-text text-transparent dark:from-white dark:to-gray-300">
                  Semua yang Anda butuhkan
                  <img
                    src="/images/front-pages/landing-page/bg-shape.png"
                    alt="bg-shape"
                    className="absolute bottom-0 z-[1] h-[40%] w-[125%] sm:w-[132%] -left-[13%] sm:-left-[19%] top-[17px]"
                  />
                </span>{' '}
                <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 bg-clip-text text-transparent">
                  untuk mengelola fakultas
                </span>
              </h2>
            </div>
            <p className="text-lg text-center text-neutral-600 dark:text-neutral-300 max-w-3xl leading-relaxed">
              Platform komprehensif yang mengintegrasikan seluruh aspek pengelolaan akademik fakultas teknik dengan teknologi terdepan.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((item, index) => (
              <Card
                key={index}
                className="group bg-white/80 backdrop-blur-xl shadow-lg hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:scale-105 hover:-translate-y-3 rounded-2xl overflow-hidden border-2 border-transparent hover:border-primary/20"
              >
                <CardContent className="flex flex-col gap-4 justify-center items-center p-8 relative">
                  {/* Enhanced Gradient Background on Hover with #3674B5 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Enhanced Icon Container with #3674B5 */}
                  <div className="relative bg-gradient-to-br from-primary/10 to-primary/15 p-4 rounded-2xl border-2 border-primary/20 group-hover:border-primary/40 group-hover:shadow-xl group-hover:shadow-primary/20 group-hover:scale-110 transition-all duration-500 group-hover:rotate-3">
                    {item.icon}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  <h3 className="relative text-xl font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>

                  <p className="relative text-center text-neutral-600 dark:text-neutral-300 leading-relaxed group-hover:text-neutral-700 transition-colors duration-300">
                    {item.description}
                  </p>

                  {/* Enhanced Animated Border Effect with #3674B5 */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-sm" />
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/20 via-transparent to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default UsefulFeature
