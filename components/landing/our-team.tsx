'use client'

import { useEffect, useRef } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'

interface TeamMember {
  name: string
  position: string
  image: string
  color: string
}

const team: TeamMember[] = [
  {
    name: 'Prof. Dr. Ir. Ahmad Rahman, M.T.',
    position: 'Dekan Fakultas Teknik',
    image: '/images/team/dekan.jpg',
    color: 'bg-primary/10'
  },
  {
    name: 'Dr. Eng. Siti Maryam, S.T., M.T.',
    position: 'Wakil Dekan I (Akademik)',
    image: '/images/team/wadek1.jpg',
    color: 'bg-secondary/10'
  },
  {
    name: 'Dr. Muhammad Fadil, S.T., M.T.',
    position: 'Wakil Dekan II (Keuangan)',
    image: '/images/team/wadek2.jpg',
    color: 'bg-warm/50'
  },
  {
    name: 'Dr. Andi Nurul, S.T., M.T.',
    position: 'Wakil Dekan III (Kemahasiswaan)',
    image: '/images/team/wadek3.jpg',
    color: 'bg-accent/50'
  }
]

const OurTeam: React.FC = () => {
  const skipIntersection = useRef(true)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (skipIntersection.current) {
          skipIntersection.current = false
          return
        }
        // Handle intersection if needed
      },
      { threshold: 0.35 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return (
    <section id="team" className="relative py-[100px] bg-gradient-to-tl from-white via-peach-50/20 to-lavender-50/30 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 overflow-hidden" ref={ref}>
      {/* Ultra Modern Background Elements */}
      <div className="absolute rounded-full top-20 left-20 w-72 h-72 bg-gradient-to-br from-peach-100/30 to-secondary/12 blur-3xl animate-pulse" />
      <div className="absolute rounded-full bottom-20 right-20 w-96 h-96 bg-gradient-to-tr from-lavender-100/25 to-secondary-alt/15 blur-3xl animate-pulse delay-1500" />

      <div className="relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col items-center justify-center gap-y-6">
          {/* Modern Floating Badge */}
          <div className="inline-flex items-center px-6 py-3 text-sm font-bold text-transparent transition-all duration-500 border rounded-full shadow-lg bg-gradient-to-r from-peach-100/70 to-lavender-100/70 backdrop-blur-xl border-white/40 from-secondary to-secondary-alt bg-clip-text shadow-peach-200/20 hover:shadow-xl hover:shadow-peach-200/30 animate-float hover:scale-105">
            👥 Pimpinan Fakultas
          </div>

          <div className="flex flex-col flex-wrap items-center justify-center gap-y-4">
            <div className="flex items-center gap-x-2">
              <h2 className="text-4xl font-extrabold leading-tight text-center text-neutral-900 dark:text-white lg:text-5xl">
                <span className="relative z-[1] bg-gradient-to-r from-neutral-900 to-neutral-600 bg-clip-text text-transparent dark:from-white dark:to-gray-300">
                  Dipimpin oleh
                  <img
                    src="/images/front-pages/landing-page/bg-shape.png"
                    alt="bg-shape"
                    className="absolute bottom-0 z-[1] h-[40%] w-[132%] -left-[19%] top-[17px]"
                  />
                </span>{' '}
                <span className="text-transparent bg-gradient-to-r from-secondary to-secondary-alt bg-clip-text">
                  Akademisi Berpengalaman
                </span>
              </h2>
            </div>
            <p className="max-w-3xl text-lg leading-relaxed text-center text-neutral-600 dark:text-neutral-300">
              Fakultas Teknik dipimpin oleh para akademisi dan praktisi yang berpengalaman di bidangnya dengan dedikasi tinggi.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 pt-16 md:grid-cols-2 lg:grid-cols-4">
          {team.map((member, index) => (
            <div key={index} className="flex flex-col group">
              <Card className="relative overflow-visible transition-all duration-700 border-0 shadow-lg bg-accent/90 backdrop-blur-xl hover:shadow-2xl hover:scale-105 hover:-translate-y-4 rounded-3xl group-hover:bg-cream/95">
                {/* Animated Border Glow */}
                <div className="absolute inset-0 transition-opacity duration-700 opacity-0 rounded-3xl bg-primary group-hover:opacity-30 blur-sm" />

                <div className="relative flex flex-col items-center justify-center p-0">
                  {/* Modern Image Container */}
                  <div
                    className={`flex justify-center w-full mx-auto text-center h-[200px] relative overflow-visible rounded-t-3xl ${member.color} group-hover:bg-gradient-to-br group-hover:from-secondary/15 group-hover:to-cream/50 transition-all duration-700`}
                  >
                    {/* Floating Effects */}
                    <div className="absolute inset-0 transition-opacity duration-700 opacity-0 bg-gradient-to-t from-accent/70 to-transparent group-hover:opacity-100" />

                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-[260px] absolute -top-[60px] object-contain filter group-hover:brightness-110 transition-all duration-700 group-hover:scale-110"
                    />

                    {/* Sparkle Effects */}
                    <div className="absolute w-2 h-2 transition-all duration-700 rounded-full opacity-0 top-4 right-4 bg-primary group-hover:opacity-100 animate-ping" />
                    <div className="absolute w-1 h-1 transition-all duration-700 delay-300 rounded-full opacity-0 top-8 right-8 bg-primary group-hover:opacity-100 animate-ping" />
                  </div>

                  {/* Content Section */}
                  <div className="relative z-10 flex flex-col w-full gap-4 p-6">
                    <div className="space-y-2 text-center">
                      <h3 className="text-xl font-bold transition-colors duration-500 text-neutral-900 dark:text-white group-hover:text-primary">
                        {member.name}
                      </h3>
                      <p className="font-medium transition-colors duration-500 text-neutral-600 dark:text-neutral-400 group-hover:text-primary">
                        {member.position}
                      </p>
                    </div>

                    {/* Decorative Line */}
                    <div className="w-16 h-1 mx-auto transition-all duration-700 rounded-full opacity-0 bg-primary group-hover:opacity-100 group-hover:w-24" />
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OurTeam
