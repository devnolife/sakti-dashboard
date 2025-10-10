'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Lightbulb, ArrowRight, CheckCircle2, Users, BookOpen, Timer, GraduationCap, FileText, Calendar, Shield, Database, Cpu } from 'lucide-react'

// NOTE: Disederhanakan agar konsisten dengan style Header (glass, gradient, rounded, subtle glow)

const floatingIcons = [
  // Kanan atas-bawah
  { icon: GraduationCap, color: 'text-purple-500', position: 'top-[8%] right-[5%]', size: 'w-12 h-12', delay: '0s', opacity: 'opacity-40' },
  { icon: FileText, color: 'text-cyan-500', position: 'top-[25%] right-[18%]', size: 'w-10 h-10', delay: '1.2s', opacity: 'opacity-45' },
  { icon: Shield, color: 'text-teal-500', position: 'top-[45%] right-[8%]', size: 'w-11 h-11', delay: '1.7s', opacity: 'opacity-50' },
  { icon: Database, color: 'text-pink-500', position: 'top-[68%] right-[22%]', size: 'w-10 h-10', delay: '2.8s', opacity: 'opacity-40' },
  { icon: Cpu, color: 'text-indigo-500', position: 'top-[15%] right-[28%]', size: 'w-9 h-9', delay: '3.5s', opacity: 'opacity-35' },

  // Tengah-kiri (area foto mahasiswa)
  { icon: Calendar, color: 'text-orange-500', position: 'top-[10%] right-[45%]', size: 'w-10 h-10', delay: '0.8s', opacity: 'opacity-30' },
  { icon: BookOpen, color: 'text-amber-500', position: 'top-[38%] right-[52%]', size: 'w-11 h-11', delay: '2.2s', opacity: 'opacity-35' },
  { icon: Users, color: 'text-emerald-500', position: 'top-[60%] right-[48%]', size: 'w-9 h-9', delay: '1.5s', opacity: 'opacity-30' },
]


const HeroSection: React.FC = () => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <section
      id="home"
      className="relative overflow-hidden pt-[80px] md:pt-[100px] min-h-[90vh] flex items-center bg-white"
    >
      {/* Background Image - Full visibility */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/landing/hero.png"
          alt="SINTEKMu Background"
          fill
          className="object-cover object-right md:scale-75 md:translate-x-[15%] scale-100 translate-x-0"
          priority
        />
        <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-white via-white/60 to-transparent" />
      </div>

      {/* Floating Icon Pattern - More Visible */}
      <div className="absolute inset-0 z-[5] hidden xl:block pointer-events-none">
        {floatingIcons.map((item, index) => {
          const IconComponent = item.icon
          return (
            <div
              key={index}
              className={`absolute ${item.position} ${item.opacity} animate-float`}
              style={{ animationDelay: item.delay, animationDuration: '5s' }}
            >
              <div className="p-4 border shadow-xl bg-white/60 backdrop-blur-md rounded-3xl border-white/50">
                <IconComponent className={`${item.size} ${item.color} drop-shadow-lg`} />
              </div>
            </div>
          )
        })}

        {/* Logo Aplikasi - Center Right - Solid & Clear */}
        <div className="absolute top-[40%] right-[18%] animate-pulse">
          <div className="relative w-20 h-20 p-2 bg-white border-2 border-gray-100 shadow-2xl rounded-2xl">
            <Image
              src="/logo/logo.png"
              alt="SINTEKMu Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Content - Main Text */}
          <div className="flex flex-col items-start space-y-8 animate-fade-in-up">
            {/* Brand Badge - Compact */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 border-2 shadow-lg rounded-full backdrop-blur-xl bg-white/90 border-purple-200/50">
              <Lightbulb className="w-3.5 h-3.5 text-purple-600" />
              <span className="text-[10px] sm:text-xs font-bold tracking-wide text-gray-900">Sistem Informasi Fakultas Teknik</span>
            </div>

            {/* Main Title - Reduced Size */}
            <div className="space-y-3">
              <h1 className="font-black leading-[1.05] tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                <span className="relative inline-block">
                  <span className="relative z-10">
                    <span className="text-red-600">SINTEK</span><span className="text-blue-600">Mu</span>
                  </span>
                  <span className="absolute inset-x-0 h-6 bottom-2 rounded-xl bg-gradient-to-r from-red-500/20 via-blue-500/20 to-red-500/20 blur-xl" />
                </span>
              </h1>

              {/* Slogan */}
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-tight text-gray-800">
                Sistem Informasi Terintegrasi<br />
                <span className="text-red-600">Fakultas Teknik </span>
                <span className="text-blue-600">Unismuh Makassar</span>
              </p>
            </div>

            <p className="max-w-[600px] text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
              Kelola perkuliahan, dokumen, pembayaran, magang, hingga sertifikasi dalam satu platform terpadu yang cepat dan aman.
            </p>

            {/* Actions - Smaller Buttons */}
            <div className="flex flex-col w-full gap-4 pt-2 sm:flex-row sm:items-center">
              <Button asChild className="px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-bold text-white transition-all bg-red-600 shadow-xl rounded-xl hover:bg-red-700 hover:shadow-red-500/50 hover:scale-105">
                <Link href="/dashboard" className="flex items-center justify-center gap-2">
                  <span>Masuk Dashboard</span>
                  <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
                </Link>
              </Button>
              <Button variant="outline" asChild className="px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-semibold text-gray-800 transition-all border-2 border-gray-300 shadow-lg bg-white/90 rounded-xl hover:text-white hover:bg-gray-900 hover:border-gray-900 backdrop-blur-md">
                <Link href="#features">Jelajahi Fitur</Link>
              </Button>
            </div>

            {/* Small meta bar */}
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs sm:text-sm font-medium text-gray-600">
              <div className="flex items-center gap-1.5">
                <Timer className="w-4 h-4 text-orange-500" />
                <span>Implementasi Cepat</span>
              </div>
              <span className="hidden sm:inline w-px h-3 bg-gray-300" />
              <span className="hidden sm:inline">Teruji dalam operasional akademik harian</span>
            </div>
          </div>

          {/* Right Side - Empty for now (image in background) */}
          <div className="relative hidden lg:block">
            {/* Spacer untuk balance layout */}
          </div>
        </div>

      </div>

    </section>
  )
}

export default HeroSection
