'use client'

import { CheckCircle, Users, Globe, Award, Lightbulb, BookOpen } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const AboutSection = () => {
  const features = [
    {
      icon: Users,
      title: "Professional Mentors",
      description: "Dosen berpengalaman dan ahli di bidangnya"
    },
    {
      icon: Globe,
      title: "Global Access",
      description: "Akses sistem dari mana saja dan kapan saja"
    },
    {
      icon: Lightbulb,
      title: "Interactive Learning",
      description: "Pembelajaran interaktif dengan teknologi modern"
    },
    {
      icon: Award,
      title: "Trusted by Thousands",
      description: "Dipercaya oleh ribuan mahasiswa dan dosen"
    }
  ]

  return (
    <section id="about" className="relative py-16 overflow-hidden bg-white">
      {/* Background Elements - colorful accents */}
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-gradient-to-br from-purple-500/6 to-transparent blur-3xl" />
      <div className="absolute bottom-0 right-0 w-56 h-56 rounded-full bg-gradient-to-tl from-cyan-500/6 to-transparent blur-3xl" />
      <div className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 w-80 h-80 bg-gradient-to-br from-orange-500/4 to-transparent blur-3xl" />

      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          {/* Left Content */}
          <div className="space-y-6">
            {/* Badge - Solid Purple */}
            <div className="inline-flex">
              <Badge className="relative overflow-hidden bg-purple-600 text-white px-4 py-1.5 text-sm rounded-full shadow-lg shadow-purple-500/20">
                <span className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_30%,#ffffff33,transparent_70%)]" />
                About Us
              </Badge>
            </div>

            {/* Rotating Label - Solid Orange */}
            <div className="flex justify-start">
              <div className="relative px-6 py-2 text-white transform bg-orange-500 rounded-full shadow-lg -rotate-3 shadow-orange-500/30">
                <span className="relative z-10 text-lg font-semibold tracking-wide drop-shadow">Education</span>
                <span className="absolute inset-0 rounded-full opacity-30 bg-[linear-gradient(120deg,rgba(255,255,255,0.4)_0%,transparent_60%)]" />
              </div>
            </div>

            {/* Main Content - Solid text color */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold leading-tight text-gray-900 md:text-3xl lg:text-4xl">
                Our Special Program For <span className="text-purple-600">Your Future</span>
              </h2>
              <p className="text-sm leading-relaxed text-gray-600 md:text-base">
                At <span className="font-bold"><span className="text-red-600">SINTEK</span><span className="text-blue-600">Mu</span></span>, we believe education should be accessible, engaging, and effective.
                Our platform combines expert-led courses, interactive tools, and global access
                to ensure every learner can succeed.
              </p>
            </div>

            {/* Features Grid with colorful icons - Modern card style */}
            <div className="grid grid-cols-2 gap-5 mt-8">
              {features.map((feature, index) => {
                const colors = [
                  { bg: 'bg-purple-500', shadow: 'shadow-purple-500/20', border: 'border-purple-200', glow: 'group-hover:shadow-purple-500/30' },
                  { bg: 'bg-cyan-500', shadow: 'shadow-cyan-500/20', border: 'border-cyan-200', glow: 'group-hover:shadow-cyan-500/30' },
                  { bg: 'bg-orange-500', shadow: 'shadow-orange-500/20', border: 'border-orange-200', glow: 'group-hover:shadow-orange-500/30' },
                  { bg: 'bg-teal-500', shadow: 'shadow-teal-500/20', border: 'border-teal-200', glow: 'group-hover:shadow-teal-500/30' }
                ]
                const color = colors[index % colors.length]
                return (
                  <div
                    key={index}
                    className={`group relative rounded-2xl p-5 overflow-hidden bg-white border-2 ${color.border} transition-all duration-500 hover:-translate-y-2 shadow-lg ${color.shadow} hover:shadow-xl ${color.glow}`}
                  >
                    <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-purple-500 via-cyan-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute w-20 h-20 transition-opacity duration-500 rounded-full opacity-0 -top-6 -right-6 bg-white/30 blur-xl group-hover:opacity-100" />

                    <div className="relative flex flex-col gap-3">
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${color.bg} text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                        <feature.icon className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <span className="block text-base font-bold tracking-tight text-gray-900">
                          {feature.title}
                        </span>
                        <p className="text-xs leading-relaxed text-gray-600">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Side - Modern Image Card */}
          <div className="relative">
            <div className="relative p-4 bg-white border-2 border-gray-200 shadow-2xl rounded-3xl">
              <div className="relative bg-gradient-to-br from-purple-50 via-white to-cyan-50 rounded-2xl h-[350px] w-full overflow-hidden border border-gray-100">
                {/* Animated background elements */}
                <div className="absolute w-32 h-32 rounded-full top-10 right-10 bg-purple-500/10 blur-2xl animate-pulse" />
                <div className="absolute w-40 h-40 rounded-full bottom-10 left-10 bg-cyan-500/10 blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />

                {/* Center content */}
                <div className="relative z-10 flex items-center justify-center h-full">
                  <div className="px-6 space-y-4 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white border-2 border-purple-200 shadow-xl rounded-2xl">
                      <CheckCircle className="w-10 h-10 text-purple-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">System Preview</h3>
                    <p className="max-w-xs text-sm leading-relaxed text-gray-600">
                      Experience seamless digital transformation with our integrated platform
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Stats with modern design */}
            <div className="absolute -top-6 -right-6 group">
              <div className="relative p-5 transition-all duration-300 bg-white border-2 border-purple-200 shadow-2xl rounded-2xl backdrop-blur shadow-purple-500/30 hover:scale-105 hover:-translate-y-1">
                <div className="absolute inset-0 transition-opacity opacity-0 bg-gradient-to-br from-purple-500/5 to-purple-500/10 rounded-2xl group-hover:opacity-100" />
                <div className="relative space-y-2 text-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 mb-2 bg-purple-100 rounded-xl">
                    <BookOpen className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="text-3xl font-black text-purple-600">15+</div>
                  <div className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">Program Studi</div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 group">
              <div className="relative p-5 transition-all duration-300 bg-white border-2 shadow-2xl rounded-2xl backdrop-blur border-cyan-200 shadow-cyan-500/30 hover:scale-105 hover:-translate-y-1">
                <div className="absolute inset-0 transition-opacity opacity-0 bg-gradient-to-br from-cyan-500/5 to-cyan-500/10 rounded-2xl group-hover:opacity-100" />
                <div className="relative space-y-2 text-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 mb-2 rounded-xl bg-cyan-100">
                    <Users className="w-5 h-5 text-cyan-600" />
                  </div>
                  <div className="text-3xl font-black text-cyan-600">5000+</div>
                  <div className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">Mahasiswa</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
