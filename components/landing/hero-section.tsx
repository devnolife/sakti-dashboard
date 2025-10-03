'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Lightbulb, ArrowRight, CheckCircle2, Users, BookOpen, Timer } from 'lucide-react'

// NOTE: Disederhanakan agar konsisten dengan style Header (glass, gradient, rounded, subtle glow)

const floatingShapes = [
  'top-20 left-10 w-40 h-40 bg-white/5 blur-3xl',
  'bottom-28 right-10 w-60 h-60 bg-[#ffffff]/10 blur-3xl',
  'top-1/2 -left-10 w-72 h-72 bg-[#ffffff]/5 blur-3xl',
]

const stats = [
  { label: 'Mahasiswa Aktif', value: '5.2K+', icon: Users },
  { label: 'Dosen & Mentor', value: '180+', icon: Lightbulb },
  { label: 'Modul & Materi', value: '450+', icon: BookOpen },
]

const HeroSection: React.FC = () => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <section
      id="home"
      className="relative overflow-hidden pt-[100px] min-h-[90vh] flex items-center"
    >
      {/* Background Image with Overlay - Z-index paling belakang */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/landing/hero.png"
          alt="SINTEKMu Background"
          fill
          className="object-cover object-right scale-75 translate-x-[15%] opacity-40"
          priority
        />
        {/* Gradient from bottom to top - fade to white at bottom only */}
        <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-white via-white/60 to-transparent" />
      </div>

      {/* Floating shapes - subtle */}
      {floatingShapes.map((c, i) => (
        <div key={i} className={`absolute rounded-full animate-pulse ${c}`} style={{ animationDuration: '8s', opacity: 0.08 }} />
      ))}

      <div className="relative z-10 w-full px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Content - Main Text */}
          <div className="flex flex-col items-start space-y-8 animate-fade-in-up">
            {/* Brand Badge - Compact */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 border-2 shadow-lg rounded-full backdrop-blur-xl bg-white/90 border-purple-200/50">
              <Lightbulb className="w-3.5 h-3.5 text-purple-600" />
              <span className="text-[10px] font-bold tracking-wide text-gray-900">Sistem Informasi Fakultas Teknik</span>
            </div>

            {/* Main Title - Reduced Size */}
            <div className="space-y-3">
              <h1 className="font-black leading-[1.05] tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                <span className="relative inline-block">
                  <span className="relative z-10">
                    <span className="text-red-600">SINTEK</span><span className="text-blue-600">Mu</span>
                  </span>
                  <span className="absolute inset-x-0 h-6 bottom-2 rounded-xl bg-gradient-to-r from-red-500/20 via-blue-500/20 to-red-500/20 blur-xl" />
                </span>
              </h1>

              {/* Slogan */}
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 leading-tight">
                Sistem Informasi Terintegrasi<br />
                <span className="text-red-600">Fakultas Teknik </span>
                <span className="text-blue-600">Unismuh Makassar</span>
              </p>
            </div>

            <p className="max-w-[600px] text-base md:text-lg text-gray-700 leading-relaxed">
              Kelola perkuliahan, dokumen, pembayaran, magang, hingga sertifikasi dalam satu platform terpadu yang cepat dan aman.
            </p>

            {/* Actions - Smaller Buttons */}
            <div className="flex flex-col w-full gap-4 pt-2 sm:flex-row sm:items-center">
              <Button asChild className="px-8 text-base font-bold text-white transition-all bg-red-600 shadow-xl rounded-xl py-6 hover:bg-red-700 hover:shadow-red-500/50 hover:scale-105">
                <Link href="/dashboard" className="flex items-center gap-2">
                  <span>Masuk Dashboard</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="outline" asChild className="px-8 text-base font-semibold text-gray-800 transition-all bg-white/90 border-2 border-gray-300 py-6 rounded-xl hover:text-white hover:bg-gray-900 hover:border-gray-900 backdrop-blur-md shadow-lg">
                <Link href="#features">Jelajahi Fitur</Link>
              </Button>
            </div>

            {/* Small meta bar */}
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-gray-600 font-medium">
              <div className="flex items-center gap-1.5">
                <Timer className="w-4 h-4 text-orange-500" />
                <span>Implementasi Cepat</span>
              </div>
              <span className="w-px h-3 bg-gray-300" />
              <span>Teruji dalam operasional akademik harian</span>
            </div>
          </div>

          {/* Right Side - Empty for now (image in background) */}
          <div className="relative hidden lg:block">
            {/* Spacer untuk balance layout */}
          </div>
        </div>

        {/* Floating Stats Cards - Positioned in marked areas */}
        {/* Card 1 - Top area (near first student's head) */}
        <div className="absolute left-[35%] top-[20%] hidden xl:block z-20 animate-fade-in-scale" style={{ animationDelay: '0.2s' }}>
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
            <div className="relative px-5 py-4 rounded-xl backdrop-blur-xl bg-white/90 border-2 border-purple-200/50 shadow-xl shadow-purple-500/20 transition-all duration-300 hover:scale-105 hover:-translate-y-1">
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6 text-white" />
                  <div className="absolute inset-0 bg-white/20 rounded-lg blur-sm"></div>
                </div>
                <div>
                  <p className="text-2xl font-black leading-none text-gray-900">5.2K+</p>
                  <p className="mt-1 text-[9px] font-bold tracking-wider text-gray-600 uppercase">Mahasiswa Aktif</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 - Middle area (between students) */}
        <div className="absolute left-[45%] top-[50%] hidden xl:block z-20 animate-fade-in-scale" style={{ animationDelay: '0.4s' }}>
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
            <div className="relative px-5 py-4 rounded-xl backdrop-blur-xl bg-white/90 border-2 border-cyan-200/50 shadow-xl shadow-cyan-500/20 transition-all duration-300 hover:scale-105 hover:-translate-y-1">
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-600 shadow-lg group-hover:scale-110 transition-transform">
                  <Lightbulb className="w-6 h-6 text-white" />
                  <div className="absolute inset-0 bg-white/20 rounded-lg blur-sm"></div>
                </div>
                <div>
                  <p className="text-2xl font-black leading-none text-gray-900">180+</p>
                  <p className="mt-1 text-[9px] font-bold tracking-wider text-gray-600 uppercase">Dosen & Mentor</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Feature Badge - Top Right in image area */}
        <div className="absolute right-[12%] top-[30%] hidden xl:block z-20 animate-fade-in-scale" style={{ animationDelay: '0.6s' }}>
          <div className="group relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
            <div className="relative px-6 py-4 rounded-xl backdrop-blur-xl bg-white/90 border-2 border-orange-200/50 shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 shadow-lg">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xl font-black leading-none text-gray-900">450+</p>
                  <p className="mt-1 text-[9px] font-bold tracking-wider text-gray-600 uppercase">Modul & Materi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none bg-gradient-to-t from-white to-transparent" />
    </section>
  )
}

export default HeroSection
