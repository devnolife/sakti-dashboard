'use client'

import Link from 'next/link'
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
      className="relative overflow-hidden pt-[120px] min-h-[700px] flex items-center bg-gradient-to-br from-white via-purple-50/20 to-cyan-50/20"
    >
      {/* Colorful gradient overlays - blue, purple, cyan, orange */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(54,116,181,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.06),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(6,182,212,0.05),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #3674B510 0 1px, transparent 1px 6px)' }} />

      {/* Colorful floating shapes */}
      {floatingShapes.map((c, i) => (
        <div key={i} className={`absolute rounded-full animate-pulse ${c}`} style={{ animationDuration: '8s', opacity: 0.12 }} />
      ))}

      <div className="relative z-10 w-full px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid items-center gap-8 lg:grid-cols-12">
          {/* Text Content */}
          <div className="flex flex-col items-center space-y-6 text-center lg:items-start lg:text-left lg:col-span-7">
            {/* Brand Badge - Prominent */}
            <div className="inline-flex flex-col items-center gap-3 lg:items-start">
              <div className="inline-flex items-center gap-3 px-5 py-3 border-2 shadow-xl rounded-2xl backdrop-blur-xl bg-gradient-to-r from-purple-50 to-cyan-50 border-purple-200/50 shadow-purple-500/10">
                <Lightbulb className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-bold tracking-wide text-gray-900">Sistem Informasi Fakultas Teknik</span>
              </div>
            </div>

            {/* Main Title - SINTEKMu Prominent */}
            <div className="space-y-4">
              <h1 className="font-black leading-[1.1] tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl max-w-[820px]">
                <span className="relative inline-block">
                  <span className="relative z-10">
                    <span className="text-red-600">SINTEK</span><span className="text-blue-600">Mu</span>
                  </span>
                  <span className="absolute inset-x-0 h-6 bottom-2 rounded-xl bg-gradient-to-r from-red-500/20 via-blue-500/20 to-red-500/20 blur-xl" />
                </span>
              </h1>

              {/* Slogan - Clear and Professional */}
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-700 leading-relaxed max-w-[700px]">
                Sistem Informasi Terintegrasi<br />
                <span className="text-red-600">Fakultas Teknik </span>
                <span className="text-blue-600">Unismuh Makassar</span>
              </p>
            </div>

            <p className="max-w-[600px] text-base md:text-lg text-gray-600 leading-relaxed pt-2">
              Kelola perkuliahan, dokumen, pembayaran, magang, hingga sertifikasi dalam satu platform terpadu yang cepat dan aman.
            </p>

            {/* Feature bullets - Modern glass cards */}
            <div className="grid w-full gap-3 sm:grid-cols-2 max-w-[580px]">
              {[
                { text: 'Single Sign-On & Akses Terintegrasi', color: 'purple' },
                { text: 'Monitoring Akademik Real-time', color: 'cyan' },
                { text: 'Pengelolaan Dokumen Otomatis', color: 'orange' },
                { text: 'Notifikasi & Workflow Pintar', color: 'teal' }
              ].map((item, idx) => (
                <div key={item.text} className="relative group">
                  <div className={`flex items-center gap-3 p-3 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-${item.color}-300 transition-all duration-300 hover:shadow-lg hover:shadow-${item.color}-500/10 hover:-translate-y-1`}>
                    <span className={`flex items-center justify-center w-8 h-8 rounded-lg bg-${item.color}-100 text-${item.color}-600 group-hover:scale-110 transition-transform`}>
                      <CheckCircle2 className="w-4 h-4" />
                    </span>
                    <span className="text-sm font-semibold text-gray-800">{item.text}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions - Main button with soft red */}
            <div className="flex flex-col w-full gap-4 sm:flex-row sm:items-center">
              <Button asChild className="px-10 text-base font-bold text-white transition-all bg-red-500 shadow-lg rounded-2xl py-7 sm:text-lg hover:bg-red-600 hover:shadow-xl shadow-red-500/30 hover:scale-105">
                <Link href="/dashboard" className="flex items-center gap-2">
                  <span>Masuk Dashboard</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="outline" asChild className="px-10 text-base font-semibold text-gray-700 transition-all border-2 border-gray-300 py-7 rounded-2xl sm:text-lg hover:text-white hover:bg-gray-900 hover:border-gray-900 backdrop-blur-md">
                <Link href="#features">Jelajahi Fitur</Link>
              </Button>
            </div>

            {/* Small meta bar */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Timer className="w-4 h-4 text-orange-500" />
                <span>Implementasi Cepat</span>
              </div>
              <span className="hidden w-px h-4 bg-gray-300 sm:inline" />
              <span>Teruji dalam operasional akademik harian</span>
            </div>
          </div>

          {/* Visual / Mock dashboard placeholder */}
          <div className="relative lg:col-span-5">
            <div className="relative p-3 border border-gray-200 shadow-2xl rounded-3xl bg-gradient-to-br from-white via-blue-50/50 to-red-50/30 backdrop-blur-2xl shadow-primary/20">
              <div className="relative overflow-hidden rounded-[20px] bg-gradient-to-br from-white to-gray-50 aspect-[4/3] flex items-center justify-center border border-gray-100">
                {/* Animated rings with blue and red */}
                <div className="absolute w-[140%] h-[140%] rounded-full bg-gradient-to-tr from-primary/10 via-red-500/8 to-transparent animate-spin-slower" />
                <div className="absolute w-[120%] h-[120%] rounded-full border border-primary/20 animate-spin-slow [animation-direction:reverse]" />
                <div className="relative z-10 flex flex-col items-center px-8 text-center">
                  <p className="mb-4 text-xs tracking-[0.3em] text-gray-400 font-semibold">PREVIEW</p>
                  <h3 className="mb-4 text-3xl font-bold text-transparent bg-gradient-to-r from-primary via-blue-500 to-red-500 bg-clip-text">SINTEKMu</h3>
                  <p className="max-w-sm text-sm leading-relaxed text-gray-600">Integrasi sistem akademik untuk efisiensi pengelolaan fakultas dan peningkatan pengalaman belajar.</p>
                </div>
              </div>
            </div>

            {/* Floating stats cards - Modern floating design */}
            <div className="absolute left-[-12%] top-10 hidden lg:flex flex-col gap-4">
              {stats.map((s, i) => {
                const colors = [
                  { bg: 'bg-purple-500', shadow: 'shadow-purple-500/20' },
                  { bg: 'bg-cyan-500', shadow: 'shadow-cyan-500/20' },
                  { bg: 'bg-orange-500', shadow: 'shadow-orange-500/20' }
                ]
                const color = colors[i]
                return (
                  <div
                    key={s.label}
                    className={`group px-5 py-4 rounded-2xl backdrop-blur-xl bg-white border-2 border-gray-200 shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 ${color.shadow} ${i === 1 ? 'translate-x-8' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`relative flex items-center justify-center w-12 h-12 rounded-xl ${color.bg} group-hover:scale-110 transition-transform`}>
                        <s.icon className="w-6 h-6 text-white" />
                        <div className="absolute inset-0 bg-white/20 rounded-xl blur-sm"></div>
                      </div>
                      <div>
                        <p className="text-xl font-black leading-none text-gray-900">{s.value}</p>
                        <p className="mt-1.5 text-[10px] font-bold tracking-wider text-gray-500 uppercase">{s.label}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
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
