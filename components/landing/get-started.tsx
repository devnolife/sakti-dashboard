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
    <section className="relative py-16 overflow-hidden">
      {/* Ultra Modern Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-mint-50/20 to-lavender-50/30 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900" />
      <div className="absolute inset-0 bg-gradient-to-tl from-peach-50/20 via-transparent to-slate-50/40" />

      {/* Soft Animated Background Elements */}
      <div className="absolute top-6 left-6 w-64 h-64 bg-gradient-to-br from-lavender-100/30 to-secondary/15 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-6 right-6 w-56 h-56 bg-gradient-to-tr from-mint-100/25 to-secondary-alt/12 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-gradient-to-r from-peach-100/20 to-lavender-100/20 rounded-full blur-2xl animate-pulse delay-700" />

      <div className="relative flex flex-wrap items-center justify-center px-4 mx-auto lg:justify-between gap-y-6 gap-x-8 sm:px-6 lg:px-8 max-w-7xl">
        {/* Content Section */}
        <div className="flex flex-col items-start gap-y-6 py-8 z-[1] max-w-2xl">
          {/* Modern Floating Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-lavender-100/70 to-mint-100/70 backdrop-blur-xl border border-white/40 rounded-full text-xs font-bold bg-gradient-to-r from-secondary to-secondary-alt bg-clip-text text-transparent shadow-lg shadow-lavender-200/20 hover:shadow-xl hover:shadow-lavender-200/30 transition-all duration-500 animate-float hover:scale-105">
            🚀 Mulai Sekarang
          </div>

          <div className="flex flex-col gap-y-3">
            <h2 className="bg-gradient-to-r from-secondary to-secondary-alt bg-clip-text text-transparent font-extrabold text-2xl lg:text-3xl leading-tight">
              Siap Memulai
              <span className="block">Digitalisasi?</span>
            </h2>
            <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
              Bergabunglah dengan sistem informasi terintegrasi Fakultas Teknik dan rasakan kemudahan pengelolaan akademik yang modern dan efisien.
            </p>
          </div>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              size="lg"
              className="group bg-secondary hover:bg-secondary/90 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-110 px-8 py-4 text-lg font-semibold rounded-xl"
            >
              <Link href="/login" className="flex items-center gap-3">
                <span>🔐 Akses Sistem</span>
                <div className="flex items-center justify-center w-6 h-6 transition-transform duration-300 rounded-full bg-white/20 group-hover:translate-x-1">
                  →
                </div>
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="group border-2 border-secondary-alt/30 text-secondary-alt hover:border-secondary-alt/60 hover:bg-secondary-alt/10 transition-all duration-500 hover:scale-105 px-8 py-4 text-lg font-semibold rounded-xl backdrop-blur-sm"
            >
              <Link href="#contact-us" className="flex items-center gap-3 hover:text-primary">
                <span>💬 Hubungi Kami</span>
                <div className="flex items-center justify-center w-6 h-6 transition-transform duration-300 border border-current rounded-full group-hover:rotate-12">
                  ?
                </div>
              </Link>
            </Button>
          </div>

          {/* Enhanced Feature Highlights with #3674B5 */}
          <div className="flex flex-wrap gap-4 pt-3">
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
              <span>Terintegrasi</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <div className="w-2 h-2 bg-secondary-alt rounded-full animate-pulse delay-300" />
              <span>Aman & Terpercaya</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse delay-700" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>

        {/* Enhanced Image Section with #3674B5 */}
        <div className="flex py-8 lg:py-16 z-[1] group">
          <div className="relative">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/15 to-secondary/20 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-700" />

            <img
              src="/images/front-pages/landing-page/crm-dashboard.png"
              alt="dashboard-image"
              className="relative max-w-[600px] w-full rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-700 group-hover:scale-105 border-2 border-primary/10 group-hover:border-primary/20"
            />

            {/* Floating Elements */}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-secondary rounded-full shadow-md animate-bounce opacity-80" />
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-secondary-alt rounded-full shadow-md animate-bounce delay-500 opacity-80" />

            {/* Stats Overlay */}
            <div className="absolute p-3 transition-all duration-500 shadow-lg opacity-0 top-4 left-4 bg-accent/95 backdrop-blur-sm rounded-xl group-hover:opacity-100">
              <div className="text-xs text-neutral-600">Pengguna Aktif</div>
              <div className="text-lg font-bold text-secondary-alt">5000+</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GetStarted
