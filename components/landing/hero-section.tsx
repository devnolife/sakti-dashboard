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
      {/* Modern Gradient Background */}
      <div className="absolute inset-0 bg-white -z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-secondary/3 via-transparent to-tertiary/3 -z-10" />

      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-secondary/15 rounded-full blur-3xl animate-pulse -z-10" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000 -z-10" />

      <div className="pt-[88px] overflow-hidden px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="md:max-w-[700px] mb-12 mx-auto text-center relative">
          {/* Floating Badge */}
          <div className="inline-flex items-center px-4 py-2 mb-8 bg-cream/80 border border-primary/20 rounded-full text-sm font-medium text-primary animate-float">
            🎓 Sistem Informasi Terdepan
          </div>

          <h1 className="font-extrabold sm:text-[48px] text-4xl mb-6 leading-tight bg-gradient-to-r from-neutral-900 to-neutral-600 bg-clip-text text-transparent dark:from-white dark:to-gray-300">
            Sistem Informasi Terintegrasi
            <span className="block text-primary">
              Fakultas Teknik
            </span>
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl mx-auto">
            Platform digital terpadu untuk pengelolaan akademik, administrasi, dan layanan mahasiswa Fakultas Teknik Unismuh Makassar dengan teknologi terdepan.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-8 py-3 text-lg">
              <Link href="/login" className="flex items-center gap-2">
                🚀 Akses Dashboard
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 px-8 py-3 text-lg">
              <Link href="#features" className="flex items-center gap-2">
                📖 Pelajari Lebih Lanjut
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mt-12 text-center">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-primary">15+</span>
              <span className="text-sm text-neutral-600">Program Studi</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-primary">5000+</span>
              <span className="text-sm text-neutral-600">Mahasiswa</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-primary">200+</span>
              <span className="text-sm text-neutral-600">Dosen</span>
            </div>
          </div>
        </div>
      </div>
      <div
        className="relative text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        style={{ transform: typeof window !== 'undefined' && window.innerWidth > 1024 ? transform : 'none' }}
      >
        <Link href="/" target="_blank" className="block relative">
          <img
            src={dashboardImage}
            alt="dashboard-image"
            className="mx-auto max-w-full h-auto rounded-lg shadow-2xl"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={elementsImage}
              alt="dashboard-elements"
              className="max-w-full h-auto"
            />
          </div>
        </Link>
      </div>
    </section>
  )
}

export default HeroSection