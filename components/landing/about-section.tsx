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
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-[#0451d3]/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-56 h-56 bg-gradient-to-tl from-[#0451d3]/8 to-transparent rounded-full blur-3xl" />

      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          {/* Left Content */}
          <div className="space-y-6">
            {/* Badge */}
            <div className="inline-flex">
              <Badge className="bg-[#0451d3] text-white px-4 py-1.5 text-sm rounded-full shadow-lg">
                About Us
              </Badge>
            </div>

            {/* Rotating Label */}
            <div className="flex justify-start">
              <div className="bg-[#0451d3] text-white px-6 py-2 rounded-full transform -rotate-3 shadow-lg">
                <span className="text-lg font-semibold">Education</span>
              </div>
            </div>

            {/* Main Content */}
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-medium text-[#0451d3] leading-tight">
                Our Special Program For Your Future
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
                  className="bg-[rgba(4,81,211,0.05)] border border-[rgba(4,81,211,0.1)] rounded-lg p-3 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <feature.icon className="w-4 h-4 text-[#0451d3]" />
                    <span className="text-[#0451d3] font-medium text-[17px]">
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
            <div className="absolute -top-4 -right-4 bg-white rounded-lg p-3 shadow-md border border-[#0451d3]/20">
              <div className="text-center">
                <div className="text-lg font-bold text-[#0451d3]">15+</div>
                <div className="text-xs text-gray-600">Program Studi</div>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-white rounded-lg p-3 shadow-md border border-[#0451d3]/20">
              <div className="text-center">
                <div className="text-lg font-bold text-[#0451d3]">5000+</div>
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
