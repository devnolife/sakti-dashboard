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
    <section id="features" ref={ref} className="relative py-[100px] bg-white dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 overflow-hidden">
      {/* Modern Background Elements */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-secondary/12 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-secondary/15 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-tertiary/3 via-transparent to-secondary/3 rounded-full blur-3xl" />

      <div className="relative flex flex-col gap-16 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col gap-y-6 items-center justify-center">
          {/* Floating Badge with Animation */}
          <div className="inline-flex items-center px-6 py-3 bg-cream/90 backdrop-blur-xl border border-primary/20 rounded-full text-sm font-semibold text-primary shadow-lg hover:shadow-xl transition-all duration-300 animate-float">
            ⚡ Fitur Unggulan
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
                <span className="text-primary">
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
                className="group border-0 bg-white/70 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 rounded-2xl overflow-hidden"
              >
                <CardContent className="flex flex-col gap-4 justify-center items-center p-8 relative">
                  {/* Gradient Background on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary/8 via-cream/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Icon Container */}
                  <div className="relative bg-gradient-to-br from-cream/50 to-accent p-4 rounded-2xl border border-primary/20 group-hover:shadow-xl group-hover:scale-110 transition-all duration-500 group-hover:rotate-3">
                    {item.icon}
                  </div>

                  <h3 className="relative text-xl font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>

                  <p className="relative text-center text-neutral-600 dark:text-neutral-300 leading-relaxed group-hover:text-neutral-700 transition-colors duration-300">
                    {item.description}
                  </p>

                  {/* Animated Border Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-primary opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm" />
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