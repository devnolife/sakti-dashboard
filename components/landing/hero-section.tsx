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
      className="relative overflow-hidden pt-[120px] min-h-[600px] flex items-center bg-gradient-to-br from-primary via-brand/60 to-primary-800"
    >
      {/* Background gradient & noise overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(4,81,211,0.25),transparent_65%)] mix-blend-overlay opacity-40" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #ffffff10 0 2px, transparent 2px 6px)' }} />

      {/* Floating blurred shapes */}
      {floatingShapes.map((c, i) => (
        <div key={i} className={`absolute rounded-full animate-pulse-slow ${c}`} />
      ))}

      <div className="relative z-10 w-full px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid items-center gap-8 lg:grid-cols-12">
          {/* Text Content */}
          <div className="flex flex-col items-center space-y-6 text-center lg:items-start lg:text-left lg:col-span-7">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full backdrop-blur-md bg-white/10 border border-white/30 shadow-lg shadow-[#ffffff13]">
              <Lightbulb className="w-3 h-3 text-yellow-300" />
              <span className="text-xs font-medium tracking-wide text-white">Sistem Informasi Fakultas Teknik</span>
            </div>

            <h1 className="font-bold leading-[1.05] tracking-tight text-white text-2xl sm:text-3xl md:text-4xl max-w-[820px]">
              <span className="font-light">Transformasi Digital untuk </span>
              <span className="relative inline-block">
                <span className="relative z-10 text-transparent bg-gradient-to-r from-white to-white/80 bg-clip-text">Akademik Modern</span>
                <span className="absolute inset-x-0 h-3 bottom-2 rounded-xl bg-white/10 blur-sm" />
              </span>
            </h1>

            <p className="max-w-[560px] text-sm md:text-base text-white/80 leading-relaxed">
              Kelola perkuliahan, dokumen, pembayaran, magang, hingga sertifikasi dalam satu platform terpadu yang cepat dan aman.
            </p>

            {/* Feature bullets */}
            <ul className="grid w-full gap-4 sm:grid-cols-2 max-w-[520px] text-left">
              {[
                'Single Sign-On & Akses Terintegrasi',
                'Monitoring Akademik Real-time',
                'Pengelolaan Dokumen Otomatis',
                'Notifikasi & Workflow Pintar'
              ].map(item => (
                <li key={item} className="flex items-start gap-3 group">
                  <span className="flex items-center justify-center w-6 h-6 mt-1 text-white border rounded-lg bg-white/15 border-white/30">
                    <CheckCircle2 className="w-4 h-4" />
                  </span>
                  <span className="text-sm font-medium transition-colors duration-300 text-white/80 group-hover:text-white">{item}</span>
                </li>
              ))}
            </ul>

            {/* Actions */}
            <div className="flex flex-col w-full gap-3 sm:flex-row sm:items-center">
              <Button asChild className="rounded-xl px-8 py-6 text-base sm:text-lg font-semibold bg-white text-primary hover:bg-white/90 hover:shadow-xl shadow-lg shadow-white/20 transition-all">
                <Link href="/dashboard" className="flex items-center gap-2">
                  <span>Masuk Dashboard</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="outline" asChild className="px-8 py-6 text-base font-semibold text-white border-2 rounded-xl sm:text-lg border-white/40 hover:text-white hover:bg-white/10 hover:border-white/70 backdrop-blur-md">
                <Link href="#features">Jelajahi Fitur</Link>
              </Button>
            </div>

            {/* Small meta bar */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-white/70">
              <div className="flex items-center gap-2">
                <Timer className="w-4 h-4" />
                <span>Implementasi Cepat</span>
              </div>
              <span className="hidden w-px h-4 bg-white/30 sm:inline" />
              <span>Teruji dalam operasional akademik harian</span>
            </div>
          </div>

          {/* Visual / Mock dashboard placeholder */}
          <div className="relative lg:col-span-5">
            <div className="relative p-2 rounded-3xl bg-gradient-to-br from-white/20 via-white/10 to-transparent backdrop-blur-xl border border-white/30 shadow-2xl shadow-[#102a5a]/40">
              <div className="relative overflow-hidden rounded-[22px] bg-neutral-900/70 aspect-[4/3] flex items-center justify-center">
                {/* Animated rings */}
                <div className="absolute w-[140%] h-[140%] rounded-full bg-gradient-to-tr from-[#ffffff18] via-[#0451d3]/20 to-transparent animate-spin-slower" />
                <div className="absolute w-[120%] h-[120%] rounded-full border border-white/10 animate-spin-slow [animation-direction:reverse]" />
                <div className="relative z-10 flex flex-col items-center px-8 text-center">
                  <p className="mb-4 text-sm tracking-widest text-white/50">PREVIEW</p>
                  <h3 className="mb-3 text-2xl font-semibold text-white">S I N T E K M u</h3>
                  <p className="max-w-xs text-sm leading-relaxed text-white/60">Integrasi sistem akademik untuk efisiensi pengelolaan fakultas dan peningkatan pengalaman belajar.</p>
                </div>
              </div>
            </div>

            {/* Floating stats cards */}
            <div className="absolute left-[-12%] top-10 hidden md:flex flex-col gap-4">
              {stats.map((s, i) => (
                <div key={s.label} className={`px-5 py-4 rounded-2xl backdrop-blur-lg bg-white/15 border border-white/30 shadow-lg shadow-white/10 hover:shadow-white/20 transition-all ${i === 1 ? 'translate-x-6' : ''}`}>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-10 h-10 text-white rounded-xl bg-white/20">
                      <s.icon className="w-5 h-5" />
                    </span>
                    <div>
                      <p className="text-lg font-semibold leading-none text-white">{s.value}</p>
                      <p className="mt-1 text-xs font-medium tracking-wide text-white/70">{s.label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#012244] to-transparent pointer-events-none" />
    </section>
  )
}

export default HeroSection
