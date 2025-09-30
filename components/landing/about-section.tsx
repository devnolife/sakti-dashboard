'use client'

import { CheckCircle, Users, Globe, Award, Lightbulb } from 'lucide-react'
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
    <section id="about" className="relative py-12 overflow-hidden bg-white">
      {/* Background Elements */}
      {/* Soft dual-tone background accents (primary + brand) */}
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-gradient-to-br from-primary/5 via-brand/5 to-transparent blur-3xl" />
      <div className="absolute bottom-0 right-0 w-56 h-56 rounded-full bg-gradient-to-tl from-brand/10 via-primary/5 to-transparent blur-3xl" />

      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          {/* Left Content */}
          <div className="space-y-6">
            {/* Badge */}
            <div className="inline-flex">
              <Badge className="relative overflow-hidden bg-gradient-to-r from-primary to-brand text-white px-4 py-1.5 text-sm rounded-full shadow-lg">
                <span className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_30%,#ffffff33,transparent_70%)]" />
                About Us
              </Badge>
            </div>

            {/* Rotating Label */}
            <div className="flex justify-start">
              <div className="relative px-6 py-2 text-white transform rounded-full shadow-lg bg-gradient-to-r from-brand to-primary -rotate-3 shadow-primary/30">
                <span className="relative z-10 text-lg font-semibold tracking-wide drop-shadow">Education</span>
                <span className="absolute inset-0 rounded-full opacity-30 bg-[linear-gradient(120deg,rgba(255,255,255,0.4)_0%,transparent_60%)]" />
              </div>
            </div>

            {/* Main Content */}
            <div className="space-y-4">
              <h2 className="text-2xl font-medium leading-tight md:text-3xl">
                <span className="text-transparent bg-gradient-to-r from-primary to-brand bg-clip-text">
                  Our Special Program For Your Future
                </span>
              </h2>
              <p className="text-sm md:text-base text-[rgba(16,16,18,0.4)] leading-relaxed">
                At SINTEKMu, we believe education should be accessible, engaging, and effective.
                Our platform combines expert-led courses, interactive tools, and global access
                to ensure every learner can succeed.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group relative rounded-lg p-3 overflow-hidden bg-gradient-to-br from-primary/5 via-white to-brand/5 border border-primary/10 hover:border-brand/30 transition-all duration-300 hover:shadow-[0_6px_18px_-4px_rgba(54,116,181,0.25)]"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.35),transparent_60%)]" />
                  <div className="relative flex items-center gap-2 mb-1">
                    <div className="inline-flex items-center justify-center w-6 h-6 transition-colors rounded-md bg-gradient-to-br from-primary/15 to-brand/20 text-primary group-hover:from-brand/20 group-hover:to-primary/25">
                      <feature.icon className="w-4 h-4" />
                    </div>
                    <span className="bg-gradient-to-r from-primary to-brand bg-clip-text text-transparent font-medium text-[15px] md:text-[16px] tracking-wide">
                      {feature.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Image Placeholder */}
          <div className="relative">
            <div className="bg-[#d9d9d9] rounded-xl h-[300px] w-full shadow-lg">
              {/* Placeholder for dashboard/system image */}
              <div className="flex items-center justify-center h-full text-sm text-gray-500">
                Dashboard Preview
              </div>
            </div>

            {/* Floating Stats */}
            <div className="absolute p-3 border rounded-lg shadow-md -top-4 -right-4 bg-white/90 backdrop-blur border-primary/20 shadow-primary/20">
              <div className="text-center">
                <div className="text-lg font-bold text-transparent bg-gradient-to-r from-primary to-brand bg-clip-text">15+</div>
                <div className="text-xs text-gray-600">Program Studi</div>
              </div>
            </div>

            <div className="absolute p-3 border rounded-lg shadow-md -bottom-4 -left-4 bg-white/90 backdrop-blur border-primary/20 shadow-primary/20">
              <div className="text-center">
                <div className="text-lg font-bold text-transparent bg-gradient-to-r from-brand to-primary bg-clip-text">5000+</div>
                <div className="text-xs text-gray-600">Mahasiswa</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
