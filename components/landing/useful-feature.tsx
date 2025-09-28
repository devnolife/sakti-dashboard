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
    icon: <GraduationCap className="w-12 h-12 text-secondary" />,
    title: 'Manajemen Akademik',
    description: 'Kelola data mahasiswa, nilai, jadwal kuliah, dan seluruh proses akademik dalam satu platform.'
  },
  {
    icon: <Users className="w-12 h-12 text-secondary-alt" />,
    title: 'Multi-Role Dashboard',
    description: 'Dashboard khusus untuk mahasiswa, dosen, admin, dekan, dan seluruh stakeholder fakultas.'
  },
  {
    icon: <FileCheck className="w-12 h-12 text-secondary" />,
    title: 'Surat & Dokumen',
    description: 'Sistem pembuatan surat otomatis dan pengelolaan dokumen akademik yang terintegrasi.'
  },
  {
    icon: <CreditCard className="w-12 h-12 text-secondary-alt" />,
    title: 'Pembayaran Digital',
    description: 'Kelola pembayaran SPP, praktikum, dan administrasi akademik lainnya secara digital.'
  },
  {
    icon: <Calendar className="w-12 h-12 text-secondary" />,
    title: 'Jadwal Terintegrasi',
    description: 'Sistem penjadwalan kuliah, ujian, praktikum, dan kegiatan akademik lainnya.'
  },
  {
    icon: <Shield className="w-12 h-12 text-secondary-alt" />,
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
    <section id="features" ref={ref} className="relative py-16 bg-gradient-to-br from-white via-mint-50/20 to-lavender-50/30 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 overflow-hidden">
      {/* Ultra Modern Background Elements */}
      <div className="absolute rounded-full top-6 right-6 w-64 h-64 bg-gradient-to-br from-lavender-100/30 to-secondary/12 blur-3xl animate-pulse" />
      <div className="absolute delay-1000 rounded-full bottom-6 left-6 w-56 h-56 bg-gradient-to-tr from-mint-100/25 to-secondary-alt/15 blur-3xl animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-peach-50/20 via-transparent to-slate-50/30 rounded-full blur-3xl" />

      <div className="relative flex flex-col gap-8 px-4 py-8 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col items-center justify-center gap-y-4">
          {/* Modern Floating Badge */}
          <div className="inline-flex items-center px-4 py-2 text-xs font-bold text-transparent transition-all duration-500 border rounded-full shadow-lg bg-gradient-to-r from-lavender-100/70 to-mint-100/70 backdrop-blur-xl border-white/40 from-secondary to-secondary-alt bg-clip-text shadow-lavender-200/20 hover:shadow-xl hover:shadow-lavender-200/30 animate-float hover:scale-105">
            ⚡ Fitur Unggulan
          </div>

          <div className="flex flex-col flex-wrap items-center justify-center gap-y-3">
            <div className="flex items-center gap-x-2">
              <h2 className="text-4xl font-extrabold leading-tight text-center text-neutral-900 dark:text-white lg:text-5xl">
                <span className="relative z-[1] bg-gradient-to-r from-neutral-900 to-neutral-600 bg-clip-text text-transparent dark:from-white dark:to-gray-300">
                  Semua yang Anda butuhkan
                  <img
                    src="/images/front-pages/landing-page/bg-shape.png"
                    alt="bg-shape"
                    className="absolute bottom-0 z-[1] h-[40%] w-[125%] sm:w-[132%] -left-[13%] sm:-left-[19%] top-[17px]"
                  />
                </span>{' '}
                <span className="text-transparent bg-gradient-to-r from-secondary to-secondary-alt bg-clip-text">
                  untuk mengelola fakultas
                </span>
              </h2>
            </div>
            <p className="max-w-3xl text-sm leading-relaxed text-center text-neutral-600 dark:text-neutral-300">
              Platform komprehensif yang mengintegrasikan seluruh aspek pengelolaan akademik fakultas teknik dengan teknologi terdepan.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((item, index) => (
              <Card
                key={index}
                className="overflow-hidden transition-all duration-500 border-0 shadow-lg group bg-white/70 backdrop-blur-xl hover:shadow-2xl hover:scale-105 hover:-translate-y-2 rounded-2xl"
              >
                <CardContent className="relative flex flex-col items-center justify-center gap-4 p-8">
                  {/* Modern Gradient Background on Hover */}
                  <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-br from-lavender-50/30 via-mint-50/20 to-peach-50/25 group-hover:opacity-100" />

                  {/* Modern Icon Container */}
                  <div className="relative p-4 transition-all duration-500 border bg-gradient-to-br from-lavender-100/60 to-mint-100/50 rounded-2xl border-white/30 group-hover:shadow-xl group-hover:shadow-lavender-200/20 group-hover:scale-110 group-hover:rotate-3 backdrop-blur-sm">
                    {item.icon}
                  </div>

                  <h3 className="relative mb-2 text-xl font-bold transition-all duration-300 text-neutral-900 dark:text-white group-hover:bg-gradient-to-r group-hover:from-secondary group-hover:to-secondary-alt group-hover:bg-clip-text group-hover:text-transparent">
                    {item.title}
                  </h3>

                  <p className="relative leading-relaxed text-center transition-colors duration-300 text-neutral-600 dark:text-neutral-300 group-hover:text-neutral-700">
                    {item.description}
                  </p>

                  {/* Animated Border Effect */}
                  <div className="absolute inset-0 transition-opacity duration-500 opacity-0 rounded-2xl bg-primary group-hover:opacity-20 blur-sm" />
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
