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
      {/* Enhanced Gradient Background with #3674B5 */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50/50 to-slate-50 -z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/8 via-secondary/5 to-primary/12 -z-10" />
      <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-primary/3 to-transparent -z-10" />

      {/* Enhanced Animated Background Elements with #3674B5 */}
      <div className="absolute rounded-full top-20 left-10 w-72 h-72 bg-gradient-to-br from-primary/20 to-secondary/15 blur-3xl animate-pulse -z-10" />
      <div className="absolute delay-1000 rounded-full bottom-20 right-10 w-96 h-96 bg-gradient-to-tl from-primary/15 to-secondary/10 blur-3xl animate-pulse -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-primary/5 via-transparent to-primary/8 rounded-full blur-3xl -z-10" />

      <div className="pt-[88px] overflow-hidden px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="md:max-w-[700px] mb-12 mx-auto text-center relative">
          {/* Enhanced Floating Badge with #3674B5 */}
          <div className="inline-flex items-center px-4 py-2 mb-8 text-sm font-medium border-2 rounded-full shadow-lg bg-gradient-to-r from-primary/10 to-primary/5 border-primary/30 text-primary animate-float backdrop-blur-sm">
            <span className="w-2 h-2 mr-2 rounded-full bg-primary animate-pulse"></span>
            🎓 Sistem Informasi Terdepan
          </div>

          <h1 className="font-extrabold sm:text-[48px] text-4xl mb-6 leading-tight">
            <span className="text-transparent bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-600 bg-clip-text dark:from-white dark:to-gray-300">
              Sistem Informasi Terintegrasi
            </span>
            <span className="block text-transparent bg-gradient-to-r from-primary via-primary/90 to-primary/80 bg-clip-text">
              Fakultas Teknik 
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg leading-relaxed text-neutral-600 dark:text-neutral-300">
            Platform digital terpadu untuk pengelolaan akademik, administrasi, dan layanan mahasiswa Fakultas Teknik Unismuh Makassar dengan teknologi terdepan.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 mt-10 sm:flex-row">
            <Button asChild size="lg" className="px-8 py-3 text-lg transition-all duration-500 border-0 shadow-xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary hover:shadow-2xl hover:scale-110">
              <Link href="/login" className="flex items-center gap-2">
                🚀 Akses Dashboard
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8 py-3 text-lg transition-all duration-500 border-2 border-primary/30 hover:border-primary/60 hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5 hover:scale-105 backdrop-blur-sm">
              <Link href="#features" className="flex items-center gap-2 hover:text-primary">
                📖 Pelajari Lebih Lanjut
              </Link>
            </Button>
          </div>

          {/* Enhanced Stats with #3674B5 */}
          <div className="flex items-center justify-center gap-8 mt-12 text-center">
            <div className="flex flex-col cursor-pointer group">
              <span className="text-2xl font-bold text-transparent transition-transform duration-300 bg-gradient-to-r from-primary to-primary/80 bg-clip-text group-hover:scale-110">15+</span>
              <span className="text-sm transition-colors duration-300 text-neutral-600 group-hover:text-primary/70">Program Studi</span>
            </div>
            <div className="flex flex-col cursor-pointer group">
              <span className="text-2xl font-bold text-transparent transition-transform duration-300 bg-gradient-to-r from-primary to-primary/80 bg-clip-text group-hover:scale-110">5000+</span>
              <span className="text-sm transition-colors duration-300 text-neutral-600 group-hover:text-primary/70">Mahasiswa</span>
            </div>
            <div className="flex flex-col cursor-pointer group">
              <span className="text-2xl font-bold text-transparent transition-transform duration-300 bg-gradient-to-r from-primary to-primary/80 bg-clip-text group-hover:scale-110">200+</span>
              <span className="text-sm transition-colors duration-300 text-neutral-600 group-hover:text-primary/70">Dosen</span>
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
