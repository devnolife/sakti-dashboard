'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface HeroSectionProps {
  mode?: 'light' | 'dark'
}

const HeroSection: React.FC<HeroSectionProps> = ({ mode = 'light' }) => {
  const [transform, setTransform] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleMouseMove = (event: MouseEvent) => {
        const rotateX = (window.innerHeight - 2 * event.clientY) / 100
        const rotateY = (window.innerWidth - 2 * event.clientX) / 100

        setTransform(
          `perspective(1200px) rotateX(${rotateX < -40 ? -20 : rotateX}deg) rotateY(${rotateY}deg) scale3d(1,1,1)`
        )
      }

      window.addEventListener('mousemove', handleMouseMove)

      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [])

  const dashboardImage = mode === 'dark'
    ? '/images/front-pages/landing-page/hero-dashboard-dark.png'
    : '/images/front-pages/landing-page/hero-dashboard-light.png'

  const elementsImage = mode === 'dark'
    ? '/images/front-pages/landing-page/hero-elements-dark.png'
    : '/images/front-pages/landing-page/hero-elements-light.png'

  const heroSectionBg = mode === 'dark'
    ? '/images/front-pages/landing-page/hero-bg-dark.png'
    : '/images/front-pages/landing-page/hero-bg-light.png'

  return (
    <section id="home" className="overflow-hidden pt-[75px] -mt-[75px] relative min-h-screen flex items-center">
      {/* Ultra Modern Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-lavender-50/30 to-mint-50/20 -z-10" />
      <div className="absolute inset-0 bg-gradient-to-tr from-peach-50/20 via-transparent to-slate-50/40 -z-10" />

      {/* Soft Animated Background Elements */}
      <div className="absolute rounded-full top-20 left-10 w-80 h-80 bg-gradient-to-br from-lavender-200/20 to-secondary/10 blur-3xl animate-pulse -z-10" />
      <div className="absolute delay-1000 rounded-full bottom-20 right-10 w-96 h-96 bg-gradient-to-tr from-mint-100/30 to-secondary-alt/10 blur-3xl animate-pulse -z-10" />
      <div className="absolute w-64 h-64 delay-500 transform -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 bg-gradient-to-r from-peach-100/20 to-lavender-100/20 blur-2xl animate-pulse -z-10" />

      <div className="pt-[88px] overflow-hidden px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="md:max-w-[700px] mb-12 mx-auto text-center relative">
          {/* Modern Floating Badge */}
          <div className="inline-flex items-center px-6 py-3 mb-8 text-sm font-semibold text-transparent border rounded-full shadow-lg bg-gradient-to-r from-lavender-100/60 to-mint-100/60 backdrop-blur-sm border-white/30 from-secondary to-secondary-alt bg-clip-text animate-float shadow-lavender-200/20">
            🎓 Sistem Informasi Terdepan
          </div>

          <h1 className="font-extrabold sm:text-[48px] text-4xl mb-6 leading-tight bg-gradient-to-r from-neutral-900 to-neutral-600 bg-clip-text text-transparent dark:from-white dark:to-gray-300">
            Sistem Informasi Terintegrasi
            <span className="block text-transparent bg-gradient-to-r from-secondary to-secondary-alt bg-clip-text">
              Fakultas Teknik
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg leading-relaxed text-neutral-600 dark:text-neutral-300">
            Platform digital terpadu untuk pengelolaan akademik, administrasi, dan layanan mahasiswa Fakultas Teknik Unismuh Makassar dengan teknologi terdepan.
          </p>
          <div className="flex flex-col items-center justify-center gap-6 mt-10 sm:flex-row">
            <Button asChild size="lg" className="px-8 py-4 text-lg font-semibold transition-all duration-500 shadow-lg group bg-gradient-to-r from-secondary to-secondary-alt hover:from-secondary/90 hover:to-secondary-alt/90 shadow-secondary/20 hover:shadow-xl hover:shadow-secondary/30 hover:scale-105 rounded-xl backdrop-blur-sm">
              <Link href="/login" className="flex items-center gap-3">
                <span>🚀 Akses Dashboard</span>
                <div className="flex items-center justify-center w-6 h-6 transition-transform duration-300 rounded-full bg-white/20 group-hover:translate-x-1">
                  →
                </div>
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8 py-4 text-lg font-semibold transition-all duration-500 border-2 shadow-lg group border-secondary-alt/30 text-secondary-alt hover:border-secondary-alt/60 hover:bg-gradient-to-r hover:from-lavender-50/30 hover:to-mint-50/30 hover:scale-105 rounded-xl backdrop-blur-sm shadow-lavender-200/10">
              <Link href="#features" className="flex items-center gap-3">
                <span>📖 Pelajari Lebih Lanjut</span>
                <div className="flex items-center justify-center w-6 h-6 transition-transform duration-300 border border-current rounded-full group-hover:rotate-12">
                  ?
                </div>
              </Link>
            </Button>
          </div>

          {/* Enhanced Stats with #3674B5 */}
          <div className="flex items-center justify-center gap-8 mt-12 text-center">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-secondary">15+</span>
              <span className="text-sm text-neutral-600">Program Studi</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-secondary-alt">5000+</span>
              <span className="text-sm text-neutral-600">Mahasiswa</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-secondary">200+</span>
              <span className="text-sm text-neutral-600">Dosen</span>
            </div>
          </div>
        </div>
      </div>
      <div
        className="relative px-4 mx-auto text-center sm:px-6 lg:px-8 max-w-7xl"
        style={{ transform: typeof window !== 'undefined' && window.innerWidth > 1024 ? transform : 'none' }}
      >
        <Link href="/" target="_blank" className="relative block">
          <img
            src={dashboardImage}
            alt="dashboard-image"
            className="h-auto max-w-full mx-auto rounded-lg shadow-2xl"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={elementsImage}
              alt="dashboard-elements"
              className="h-auto max-w-full"
            />
          </div>
        </Link>
      </div>
    </section>
  )
}

export default HeroSection
