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
    <section id="courses" className="relative py-20 overflow-hidden bg-white">
      {/* Colorful background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-50/20 to-indigo-50/20" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle_at_70%_30%,rgba(139,92,246,0.08),transparent_65%)] blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[radial-gradient(circle_at_30%_70%,rgba(236,72,153,0.06),transparent_65%)] blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(6,182,212,0.04),transparent_70%)] blur-3xl" />
      </div>

      <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Section label */}
        <div className="flex flex-col items-center mb-14 text-center">
          <div className="relative inline-flex items-center gap-2 rounded-full bg-pink-600 px-6 py-2 text-white text-sm font-semibold backdrop-blur-sm shadow-lg shadow-pink-500/20">
            <span>Courses</span>
            <span className="absolute inset-0 border-2 rounded-full pointer-events-none border-white/20" />
          </div>
          <h2 className="mt-6 text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-gray-900 max-w-2xl">
            Discover <span className="text-pink-600">Courses</span> That Fit Your <span className="text-indigo-600">Passion</span>
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

        {/* Course cards grid with modern elevated design */}
        <div className="grid gap-7 md:grid-cols-2">
          {courses.map((c, idx) => {
            const darkCard = c.shape.includes('bg-primary ') && c.shape.includes(' text-white')
            const cardColors = [
              { border: 'border-purple-200', glow: 'hover:shadow-purple-500/30' },
              { border: 'border-teal-200', glow: 'hover:shadow-teal-500/30' },
              { border: 'border-orange-200', glow: 'hover:shadow-orange-500/30' },
              { border: 'border-indigo-200', glow: 'hover:shadow-indigo-500/30' }
            ]
            const cardColor = cardColors[idx % cardColors.length]

            return (
              <div
                key={c.id}
                className={`group relative h-[340px] rounded-[36px] p-10 overflow-hidden transition-all duration-500 ${darkCard ? 'bg-primary text-white border-2 border-primary' : `bg-white text-[#101012] border-2 ${cardColor.border}`} shadow-xl hover:shadow-2xl hover:-translate-y-2 ${darkCard ? 'hover:shadow-primary/30' : cardColor.glow} ${c.shape}`}
              >
                {/* Animated gradient line */}
                <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-purple-500 via-cyan-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Decorative background glow */}
                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="pointer-events-none absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_30%_20%,rgba(54,116,181,1),transparent_60%)]" />

                {/* Rotated label with enhanced 3D effect */}
                <div className="absolute -top-5 left-10 transition-all duration-500 group-hover:-translate-y-1 group-hover:rotate-3">
                  <div className={`relative -rotate-2 inline-flex items-center rounded-full px-8 py-3.5 shadow-2xl ${
                    idx === 0 ? 'bg-purple-600 shadow-purple-500/40' :
                    idx === 1 ? 'bg-teal-600 shadow-teal-500/40' :
                    idx === 2 ? 'bg-orange-600 shadow-orange-500/40' :
                    'bg-indigo-600 shadow-indigo-500/40'
                  } text-white transition-all duration-500 group-hover:scale-110`}>
                    <span className="font-black text-[18px] whitespace-nowrap">{c.label}</span>
                    <span className="absolute inset-0 border-2 rounded-full border-white/30" />
                  </div>
                </div>

                {/* Main content */}
                <div className="relative flex flex-col justify-between h-full mt-14">
                  <p className={`text-[24px] leading-snug font-medium ${darkCard ? 'text-white/95' : 'text-[#101012]/85'}`}>{c.description}</p>
                  <div>
                    <Button
                      variant="ghost"
                      className={`group/btn mt-6 inline-flex items-center gap-3 rounded-2xl border-[2.5px] px-9 py-4 text-[17px] font-bold shadow-lg transition-all duration-300 ${darkCard ? 'border-white text-white hover:bg-white hover:text-primary hover:scale-105' : 'border-primary text-primary hover:bg-primary hover:text-white hover:scale-105'}`}
                    >
                      <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-2" />
                      <span>Start Learning</span>
                    </Button>
                  </div>
                </div>

                {/* Enhanced corner decoration */}
                <div className="absolute w-48 -right-8 -bottom-8 h-32 opacity-10 rotate-12 transition-all duration-500 group-hover:opacity-20">
                  <div className="w-full h-full rounded-[40px] bg-gradient-to-r from-purple-500 via-cyan-500 to-orange-500" />
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
