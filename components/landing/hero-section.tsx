'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useId } from 'react'
import { ArrowRight, Play, Users2, BookOpen, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface HeroSectionProps {
  mode?: 'light' | 'dark'
}

// Reasonable assumptions about design:
// 1. Two-column layout (text left, illustration right) on xl screens, stacked on mobile.
// 2. Large headline with highlighted / accent span.
// 3. Subheading / supporting text.
// 4. Email capture input + CTA button.
// 5. Quick stats (students, courses, certificates) and trusted logos.
// 6. Decorative gradient blobs + subtle grid lines.
// 7. Hero mock / illustration with floating cards and a video play badge.
// Adjust easily by editing tokens below without touching structure.

const tokens = {
  bgFrom: '#0451d3',
  bgTo: '#0451d3',
  accent: '#A1E3F9',
  accentText: '#0451d3'
}

const statItems = [
  { icon: Users2, value: '2.9M+', label: 'Learners' },
  { icon: BookOpen, value: '1.2K+', label: 'Courses' },
  { icon: Award, value: '98%', label: 'Success Rate' }
]

const trustedLogos: { src: string; alt: string; width?: number; height?: number }[] = [
  { src: '/03050357d21989fd3dcf3dafe1217f613aaa9a79.svg', alt: 'Partner 1' },
  { src: '/1d463e3abb0c1e12295ad082b53d3dcc7f8e1ee0.svg', alt: 'Partner 2' },
  { src: '/2b1bc5bf4c0703b770d6af2e39d571f10d8770ed.svg', alt: 'Partner 3' },
  { src: '/39a01736b4c967e78f94062d93fc014b3b3e6507.svg', alt: 'Partner 4' }
]

const HeroSection: React.FC<HeroSectionProps> = ({ mode = 'light' }) => {
  const emailId = useId()
  const isDark = mode === 'dark'

  return (
    <section
      id="home"
      className="relative overflow-hidden isolate pt-32 sm:pt-40 pb-24 sm:pb-40 bg-gradient-to-br"
      style={{ backgroundImage: `linear-gradient(135deg, ${tokens.bgFrom} 0%, ${tokens.bgTo} 100%)` }}
    >
      {/* Background grid pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,white,transparent_75%)]"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[380px] h-[380px] rounded-full bg-white/10 blur-2xl" />
        <div className="absolute bottom-0 left-1/3 w-[260px] h-[260px] rounded-full bg-[#A1E3F9]/20 blur-2xl" />
      </div>

      <div className="container relative z-10">
        <div className="grid items-center gap-y-16 gap-x-12 xl:grid-cols-2">
          {/* LEFT CONTENT */}
          <div className="text-center xl:text-left max-w-2xl mx-auto xl:mx-0">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 ring-1 ring-white/20 backdrop-blur-sm mb-6">
              <span className="text-xs font-medium tracking-wide text-white/80">FLEXIBLE LEARNING PLATFORM</span>
            </div>
            <h1 className="font-light leading-[1.1] text-4xl sm:text-5xl md:text-[64px] md:leading-[1.05] text-white">
              Empower Your Future with <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">Quality Education</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-white/80 max-w-xl mx-auto xl:mx-0">
              Belajar kapan saja dan di mana saja bersama mentor terbaik & pengalaman interaktif yang dirancang untuk membantu Anda berkembang lebih cepat.
            </p>

            {/* Email Capture */}
            <form
              className="mt-10 flex w-full flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-center xl:justify-start"
              onSubmit={(e) => {
                e.preventDefault()
                const data = new FormData(e.currentTarget)
                const email = data.get('email') as string
                if (!email) return
                // TODO: hook into real subscription / registration flow
                // Placeholder: navigate to dashboard
                window.location.href = '/dashboard'
              }}
            >
              <div className="relative flex-1 min-w-[240px] group">
                <label htmlFor={emailId} className="sr-only">
                  Email address
                </label>
                <input
                  id={emailId}
                  name="email"
                  type="email"
                  required
                  placeholder="Your email address..."
                  className="peer w-full rounded-full bg-white/10/50 text-white placeholder-white/50 px-8 py-5 text-base sm:text-lg outline-none ring-2 ring-white/25 focus:ring-white/60 transition"
                />
                <span className="pointer-events-none absolute inset-0 rounded-full bg-white/5 backdrop-blur-[2px] ring-1 ring-white/10 peer-focus:ring-white/30" />
              </div>
              <Button
                type="submit"
                className="relative inline-flex items-center gap-2 rounded-full px-8 sm:px-10 py-5 text-lg font-semibold bg-white text-[#0451d3] hover:bg-white/90 shadow-lg shadow-black/10 transition group"
              >
                Get Started
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </form>

            {/* Stats */}
            <div className="mt-12 flex flex-col sm:flex-row gap-8 sm:gap-12 justify-center xl:justify-start">
              {statItems.map((s) => (
                <div key={s.label} className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-white/10 ring-1 ring-white/15 backdrop-blur-sm text-white">
                    <s.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-white leading-none mb-1">{s.value}</p>
                    <p className="text-white/60 text-sm tracking-wide">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Trusted logos */}
            <div className="mt-14">
              <p className="text-white/60 text-xs tracking-wider uppercase mb-5">Trusted by leading institutions</p>
              <div className="flex flex-wrap items-center justify-center xl:justify-start gap-x-8 gap-y-6 opacity-80">
                {trustedLogos.map((logo) => (
                  <Image
                    key={logo.src}
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.width || 120}
                    height={logo.height || 40}
                    className="h-8 w-auto object-contain grayscale contrast-125 brightness-110 opacity-80 hover:opacity-100 transition"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT ILLUSTRATION */}
          <div className="relative w-full max-w-[640px] mx-auto">
            {/* Main mock / placeholder image -> Replace with Figma exported asset */}
            <div className="relative aspect-[4/3] rounded-[32px] bg-gradient-to-br from-white/10 to-white/5 ring-1 ring-white/15 overflow-hidden shadow-2xl shadow-black/30 backdrop-blur-[2px]">
              <Image
                src="/2fd43049def0c3ea78eee2eea1f76881f53e874d.png"
                alt="Platform preview"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 640px"
                className="object-cover object-center opacity-90 mix-blend-luminosity"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0451d3]/40 via-transparent to-transparent" />
            </div>

            {/* Floating video play badge */}
            <button
              type="button"
              aria-label="Play intro video"
              className="group absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-4 rounded-2xl bg-white text-[#0451d3] shadow-xl shadow-black/20 hover:shadow-2xl hover:scale-105 transition"
            >
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#0451d3] text-white shadow-inner">
                <Play className="w-5 h-5 group-hover:scale-110 transition" />
              </span>
              <span className="text-left">
                <span className="block font-semibold leading-tight">Lihat Video</span>
                <span className="block text-sm text-[#0451d3]/70">2 menit intro</span>
              </span>
            </button>

            {/* Floating mini cards */}
            <div className="absolute -top-6 -left-4 sm:-left-10 w-40 sm:w-48 rounded-2xl bg-white/15 backdrop-blur-md ring-1 ring-white/30 p-4 flex flex-col gap-2 shadow-lg animate-float">
              <p className="text-[11px] font-medium tracking-wide text-white/70">Progress</p>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] text-white/80">
                  <span>UI Design</span>
                  <span>80%</span>
                </div>
                <div className="h-1 rounded-full bg-white/20">
                  <div className="h-1 rounded-full bg-[#A1E3F9] w-4/5" />
                </div>
                <div className="flex items-center justify-between text-[11px] text-white/80">
                  <span>Marketing</span>
                  <span>42%</span>
                </div>
                <div className="h-1 rounded-full bg-white/20">
                  <div className="h-1 rounded-full bg-[#A1E3F9] w-2/5" />
                </div>
              </div>
            </div>
            <div className="absolute top-12 -right-4 sm:-right-10 w-44 sm:w-52 rounded-2xl bg-white/15 backdrop-blur-md ring-1 ring-white/30 p-4 flex flex-col gap-3 shadow-lg animate-float [animation-delay:1s]">
              <p className="text-[11px] font-medium tracking-wide text-white/70">Mentor Rating</p>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <span
                      key={i}
                      className="w-7 h-7 rounded-full ring-2 ring-white/30 bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-md" />
                  ))}
                </div>
                <span className="text-[11px] text-white/80">4.9/5</span>
              </div>
              <div className="flex flex-col gap-1">
                {[60, 50, 40].map((v, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full bg-white/20">
                      <div className="h-1.5 rounded-full bg-[#A1E3F9]" style={{ width: `${v}%` }} />
                    </div>
                    <span className="text-[10px] text-white/60 w-6 text-right">{v}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom subtle divider shape */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0451d3] to-transparent" />
    </section>
  )
}

export default HeroSection
