'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface GetStartedProps {
  mode?: 'light' | 'dark'
}

const GetStarted: React.FC<GetStartedProps> = ({ mode = 'light' }) => {
  const getStartedImage = mode === 'dark'
    ? '/images/front-pages/landing-page/get-started-bg-dark.png'
    : '/images/front-pages/landing-page/get-started-bg-light.png'

  return (
    <section className="relative py-[100px] overflow-hidden">
      {/* Modern Gradient Background */}
      <div className="absolute inset-0 bg-white dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900" />
      <div className="absolute inset-0 bg-gradient-to-r from-tertiary/3 via-transparent to-secondary/3" />

      {/* Animated Background Elements */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-secondary/15 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-secondary/12 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative flex items-center flex-wrap justify-center lg:justify-between gap-y-8 gap-x-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Content Section */}
        <div className="flex flex-col items-start gap-y-10 py-12 z-[1] max-w-2xl">
          {/* Floating Badge */}
          <div className="inline-flex items-center px-6 py-3 bg-cream/90 backdrop-blur-xl border border-primary/20 rounded-full text-sm font-semibold text-primary shadow-lg hover:shadow-xl transition-all duration-300 animate-float">
            🚀 Mulai Sekarang
          </div>

          <div className="flex flex-col gap-y-4">
            <h2 className="text-primary font-extrabold text-4xl lg:text-5xl leading-tight">
              Siap Memulai
              <span className="block">Digitalisasi?</span>
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
              Bergabunglah dengan sistem informasi terintegrasi Fakultas Teknik dan rasakan kemudahan pengelolaan akademik yang modern dan efisien.
            </p>
          </div>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6">
            <Button
              asChild
              size="lg"
              className="group bg-primary hover:bg-primary/90 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-110 px-8 py-4 text-lg font-semibold rounded-xl"
            >
              <Link href="/login" className="flex items-center gap-3">
                <span>🔐 Akses Sistem</span>
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform duration-300">
                  →
                </div>
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="group border-2 border-primary/30 hover:border-primary/60 hover:bg-primary/10 transition-all duration-500 hover:scale-105 px-8 py-4 text-lg font-semibold rounded-xl backdrop-blur-sm"
            >
              <Link href="#contact-us" className="flex items-center gap-3">
                <span>💬 Hubungi Kami</span>
                <div className="w-6 h-6 border border-current rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                  ?
                </div>
              </Link>
            </Button>
          </div>

          {/* Feature Highlights */}
          <div className="flex flex-wrap gap-6 pt-4">
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span>Terintegrasi</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-300" />
              <span>Aman & Terpercaya</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-700" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>

        {/* Enhanced Image Section */}
        <div className="flex py-8 lg:py-16 z-[1] group">
          <div className="relative">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/15 to-secondary/20 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-700" />

            <img
              src="/images/front-pages/landing-page/crm-dashboard.png"
              alt="dashboard-image"
              className="relative max-w-[600px] w-full rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-700 group-hover:scale-105 border border-white/20"
            />

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full shadow-lg animate-bounce opacity-80" />
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-primary rounded-full shadow-lg animate-bounce delay-500 opacity-80" />

            {/* Stats Overlay */}
            <div className="absolute top-4 left-4 bg-accent/95 backdrop-blur-sm rounded-xl p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-500">
              <div className="text-xs text-neutral-600">Pengguna Aktif</div>
              <div className="text-lg font-bold text-primary">5000+</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GetStarted