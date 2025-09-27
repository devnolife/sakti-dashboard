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
      {/* Enhanced Background with #3674B5 */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white to-indigo-50/20 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/8" />

      {/* Enhanced Animated Background Elements with #3674B5 */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-br from-primary/15 to-secondary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-tl from-primary/20 to-secondary/12 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 right-1/4 w-60 h-60 bg-gradient-to-br from-primary/8 to-transparent rounded-full blur-2xl animate-pulse delay-700" />

      <div className="relative flex items-center flex-wrap justify-center lg:justify-between gap-y-8 gap-x-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Content Section */}
        <div className="flex flex-col items-start gap-y-10 py-12 z-[1] max-w-2xl">
          {/* Enhanced Floating Badge with #3674B5 */}
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary/12 to-primary/8 backdrop-blur-xl border-2 border-primary/25 rounded-full text-sm font-semibold shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 animate-float">
            <span className="w-2 h-2 bg-primary rounded-full mr-3 animate-pulse"></span>
            <span className="text-primary">🚀 Mulai Sekarang</span>
          </div>

          <div className="flex flex-col gap-y-4">
            <h2 className="font-extrabold text-4xl lg:text-5xl leading-tight">
              <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 bg-clip-text text-transparent">
                Siap Memulai
              </span>
              <span className="block bg-gradient-to-r from-primary/90 via-primary to-primary/90 bg-clip-text text-transparent">
                Digitalisasi?
              </span>
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
              Bergabunglah dengan sistem informasi terintegrasi Fakultas Teknik dan rasakan kemudahan pengelolaan akademik yang modern dan efisien.
            </p>
          </div>

          {/* Enhanced CTA Buttons with #3674B5 */}
          <div className="flex flex-col sm:flex-row gap-6">
            <Button
              asChild
              size="lg"
              className="group bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-xl hover:shadow-2xl hover:shadow-primary/30 transition-all duration-500 hover:scale-110 px-8 py-4 text-lg font-semibold rounded-xl border-0"
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
              className="group border-2 border-primary/30 hover:border-primary/60 hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5 transition-all duration-500 hover:scale-105 px-8 py-4 text-lg font-semibold rounded-xl backdrop-blur-sm"
            >
              <Link href="#contact-us" className="flex items-center gap-3 hover:text-primary">
                <span>💬 Hubungi Kami</span>
                <div className="w-6 h-6 border border-current rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                  ?
                </div>
              </Link>
            </Button>
          </div>

          {/* Enhanced Feature Highlights with #3674B5 */}
          <div className="flex flex-wrap gap-6 pt-4">
            <div className="flex items-center gap-2 text-sm group cursor-pointer">
              <div className="w-3 h-3 bg-gradient-to-br from-primary to-primary/80 rounded-full animate-pulse shadow-lg shadow-primary/30" />
              <span className="text-neutral-600 group-hover:text-primary transition-colors duration-300">Terintegrasi</span>
            </div>
            <div className="flex items-center gap-2 text-sm group cursor-pointer">
              <div className="w-3 h-3 bg-gradient-to-br from-primary to-primary/80 rounded-full animate-pulse delay-300 shadow-lg shadow-primary/30" />
              <span className="text-neutral-600 group-hover:text-primary transition-colors duration-300">Aman & Terpercaya</span>
            </div>
            <div className="flex items-center gap-2 text-sm group cursor-pointer">
              <div className="w-3 h-3 bg-gradient-to-br from-primary to-primary/80 rounded-full animate-pulse delay-700 shadow-lg shadow-primary/30" />
              <span className="text-neutral-600 group-hover:text-primary transition-colors duration-300">24/7 Support</span>
            </div>
          </div>
        </div>

        {/* Enhanced Image Section with #3674B5 */}
        <div className="flex py-8 lg:py-16 z-[1] group">
          <div className="relative">
            {/* Enhanced Glow Effect with #3674B5 */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-700" />
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/15 via-transparent to-primary/15 rounded-3xl blur-3xl opacity-30 group-hover:opacity-60 transition-opacity duration-700" />

            <img
              src="/images/front-pages/landing-page/crm-dashboard.png"
              alt="dashboard-image"
              className="relative max-w-[600px] w-full rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-700 group-hover:scale-105 border-2 border-primary/10 group-hover:border-primary/20"
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
