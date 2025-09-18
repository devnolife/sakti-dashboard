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
    <section id="team" className="relative py-[100px] bg-white dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 overflow-hidden" ref={ref}>
      {/* Modern Background Elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-secondary/12 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/15 rounded-full blur-3xl animate-pulse delay-1500" />

      <div className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col gap-y-6 items-center justify-center">
          {/* Floating Badge */}
          <div className="inline-flex items-center px-6 py-3 bg-cream/90 backdrop-blur-xl border border-primary/20 rounded-full text-sm font-semibold text-primary shadow-lg hover:shadow-xl transition-all duration-300 animate-float">
            👥 Pimpinan Fakultas
          </div>

          <div className="flex flex-col items-center gap-y-4 justify-center flex-wrap">
            <div className="flex items-center gap-x-2">
              <h2 className="text-neutral-900 dark:text-white text-4xl lg:text-5xl text-center font-extrabold leading-tight">
                <span className="relative z-[1] bg-gradient-to-r from-neutral-900 to-neutral-600 bg-clip-text text-transparent dark:from-white dark:to-gray-300">
                  Dipimpin oleh
                  <img
                    src="/images/front-pages/landing-page/bg-shape.png"
                    alt="bg-shape"
                    className="absolute bottom-0 z-[1] h-[40%] w-[132%] -left-[19%] top-[17px]"
                  />
                </span>{' '}
                <span className="text-primary">
                  Akademisi Berpengalaman
                </span>
              </h2>
            </div>
            <p className="text-lg text-center text-neutral-600 dark:text-neutral-300 max-w-3xl leading-relaxed">
              Fakultas Teknik dipimpin oleh para akademisi dan praktisi yang berpengalaman di bidangnya dengan dedikasi tinggi.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-16">
          {team.map((member, index) => (
            <div key={index} className="flex flex-col group">
              <Card className="relative border-0 overflow-visible bg-accent/90 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-700 hover:scale-105 hover:-translate-y-4 rounded-3xl group-hover:bg-cream/95">
                {/* Animated Border Glow */}
                <div className="absolute inset-0 rounded-3xl bg-primary opacity-0 group-hover:opacity-30 transition-opacity duration-700 blur-sm" />

                <div className="relative flex flex-col items-center justify-center p-0">
                  {/* Modern Image Container */}
                  <div
                    className={`flex justify-center w-full mx-auto text-center h-[200px] relative overflow-visible rounded-t-3xl ${member.color} group-hover:bg-gradient-to-br group-hover:from-secondary/15 group-hover:to-cream/50 transition-all duration-700`}
                  >
                    {/* Floating Effects */}
                    <div className="absolute inset-0 bg-gradient-to-t from-accent/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-[260px] absolute -top-[60px] object-contain filter group-hover:brightness-110 transition-all duration-700 group-hover:scale-110"
                    />

                    {/* Sparkle Effects */}
                    <div className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-all duration-700" />
                    <div className="absolute top-8 right-8 w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 animate-ping delay-300 transition-all duration-700" />
                  </div>

                  {/* Content Section */}
                  <div className="flex flex-col gap-4 p-6 w-full relative z-10">
                    <div className="text-center space-y-2">
                      <h3 className="text-xl font-bold text-neutral-900 dark:text-white group-hover:text-primary transition-colors duration-500">
                        {member.name}
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-400 font-medium group-hover:text-primary transition-colors duration-500">
                        {member.position}
                      </p>
                    </div>

                    {/* Decorative Line */}
                    <div className="w-16 h-1 bg-primary rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:w-24" />
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