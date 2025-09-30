'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

const CoursesSection = () => {
  // Figma categories (reordered & renamed to match design): Business & Management, Programming & IT, Design & Creativity, Languages & Culture
  const courses = [
    {
      id: 1,
      label: 'Business & Management',
      description: 'Master leadership and strategy for real-world success',
      accent: 'bg-primary',
      shape: 'rounded-bl-[50px] bg-primary/5'
    },
    {
      id: 2,
      label: 'Programming & IT',
      description: 'Learn coding, software development, and data science.',
      accent: 'bg-primary',
      shape: 'bg-primary text-white rounded-bl-[20px]'
    },
    {
      id: 3,
      label: 'Design & Creativity',
      description: 'Boost your creative skills in design, UI/UX, and multimedia.',
      accent: 'bg-primary',
      shape: 'bg-primary/5 rounded-tr-[50px]'
    },
    {
      id: 4,
      label: 'Languages & Culture',
      description: 'Expand your opportunities by learning global languages.',
      accent: 'bg-primary',
      shape: 'bg-primary/5 rounded-tr-[20px]'
    }
  ]

  return (
    <section id="courses" className="relative py-12 overflow-hidden bg-gradient-to-b from-white via-brand/5 to-primary/10">
      {/* Radial background fade */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle_at_70%_30%,rgba(4,81,211,0.12),transparent_65%)] blur-3xl" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1440px] h-[500px]" style={{ backgroundImage: "radial-gradient(circle at center, rgba(54,116,181,0.08) 0%, rgba(255,255,255,0) 70%)" }} />
      </div>

      <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Section label */}
        <div className="flex flex-col items-center mb-12 text-center">
          <div className="relative inline-flex items-center gap-2 rounded-full bg-primary px-6 py-1.5 text-white text-sm font-medium backdrop-blur-sm shadow-[-6px_-5px_10px_0px_rgba(255,255,255,0.33),0_4px_4px_0_rgba(12,12,12,0.07)]">
            <span>Courses</span>
            <span className="absolute inset-0 border-2 rounded-full pointer-events-none border-white/20" />
          </div>
          <h2 className="mt-6 text-2xl md:text-3xl font-medium leading-tight text-primary max-w-2xl">
            Discover Courses That Fit Your Passion
          </h2>
        </div>

        {/* Image rows (static placeholders) */}
        <div className="relative mb-12 space-y-6">
          {/* Row 1: left to right (visual) actual animation scrolls left */}
          <div className="-ml-6 overflow-hidden marquee-hover-pause md:ml-0">
            <div className="flex w-[200%] gap-7 animate-marquee-rtl" style={{ ['--marquee-duration' as any]: '45s' }}>
              {[...Array(2)].map((_, loop) => (
                <div key={loop} className="flex w-1/2 gap-7">
                  {[1, 2, 3, 4].map(i => (
                    <div key={`${loop}-${i}`} className="flex-shrink-0 w-[280px] md:w-[364px] h-[160px] md:h-[186px] rounded-[20px] bg-[#d9d9d9] shadow-sm" />
                  ))}
                </div>
              ))}
            </div>
          </div>
          {/* Row 2: right to left (visual) animation opposite */}
          <div className="-ml-24 overflow-hidden marquee-hover-pause md:ml-0">
            <div className="flex w-[200%] gap-7 animate-marquee-ltr" style={{ ['--marquee-duration' as any]: '50s' }}>
              {[...Array(2)].map((_, loop) => (
                <div key={loop} className="flex justify-end w-1/2 gap-7 md:justify-center">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={`${loop}-${i}`} className="flex-shrink-0 w-[240px] md:w-[364px] h-[150px] md:h-[186px] rounded-[20px] bg-[#d9d9d9] shadow-sm" />
                  ))}
                </div>
              ))}
            </div>
          </div>
          {/* Vertical soft white fade mimic */}
          <div className="absolute inset-x-0 -translate-y-1/2 pointer-events-none top-1/2 h-72 bg-gradient-to-b from-white/70 via-white/30 to-transparent" />
        </div>

        {/* Course cards grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {courses.map((c, idx) => {
            const darkCard = c.shape.includes('bg-primary ') && c.shape.includes(' text-white')
            return (
              <div
                key={c.id}
                className={`group relative h-[322px] rounded-[32px] p-[36px] overflow-hidden transition-shadow duration-500 ${darkCard ? 'bg-primary text-white' : 'bg-white text-[#101012]'} shadow-[0_10px_28px_-10px_rgba(54,116,181,0.15)] hover:shadow-[0_20px_40px_-10px_rgba(54,116,181,0.25)] border ${darkCard ? 'border-primary' : 'border-white/60'} ${c.shape}`}
              >
                {/* Decorative subtle pattern */}
                <div className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_30%_20%,rgba(54,116,181,1),transparent_60%)]" />

                {/* Rotated label */}
                <div className="absolute -top-4 left-10">
                  <div className="relative -rotate-2 inline-flex items-center rounded-full bg-primary px-7 py-3 text-white shadow-lg">
                    <span className="font-semibold text-[18px] whitespace-nowrap">{c.label}</span>
                    <span className="absolute inset-0 border-2 rounded-full border-white/25" />
                  </div>
                </div>

                {/* Main content */}
                <div className="relative flex flex-col justify-between h-full mt-12">
                  <p className={`text-[23px] leading-snug font-light ${darkCard ? 'text-white/90' : 'text-[#101012]/80'}`}>{c.description}</p>
                  <div>
                    <Button
                      variant="ghost"
                      className={`group/btn mt-6 inline-flex items-center gap-3 rounded-full border-[2.5px] px-8 py-3 text-[18px] font-semibold transition-all duration-300 ${darkCard ? 'border-white text-white hover:bg-white/10' : 'border-primary text-primary hover:bg-primary hover:text-white'}`}
                    >
                      <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      <span>Start Learning</span>
                    </Button>
                  </div>
                </div>

                {/* Corner accent */}
                <div className="absolute w-40 -right-6 -bottom-6 h-28 opacity-15 rotate-12">
                  <div className="w-full h-full rounded-3xl bg-gradient-to-r from-primary to-primary/40" />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default CoursesSection
