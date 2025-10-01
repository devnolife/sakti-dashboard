'use client'

import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import {
  GraduationCap,
  Users,
  FileCheck,
  CreditCard,
  Calendar,
  Shield,
  BookOpen,
  ClipboardList,
  Database,
  Globe
} from 'lucide-react'

interface Feature {
  icon: React.ElementType
  title: string
  description: string
  color: 'primary' | 'secondary' | 'accent'
}

const features: Feature[] = [
  {
    icon: GraduationCap,
    title: 'Manajemen Akademik',
    description: 'Kelola data mahasiswa, nilai, jadwal kuliah, dan seluruh proses akademik dalam satu platform terintegrasi.',
    color: 'primary'
  },
  {
    icon: Users,
    title: 'Multi-Role Dashboard',
    description: 'Dashboard khusus untuk mahasiswa, dosen, admin, dekan, dan seluruh stakeholder fakultas dengan akses sesuai peran.',
    color: 'secondary'
  },
  {
    icon: FileCheck,
    title: 'Surat & Dokumen Digital',
    description: 'Sistem pembuatan surat otomatis dan pengelolaan dokumen akademik yang terintegrasi dan paperless.',
    color: 'accent'
  },
  {
    icon: CreditCard,
    title: 'Pembayaran Digital',
    description: 'Kelola pembayaran SPP, praktikum, dan administrasi akademik lainnya secara digital dan real-time.',
    color: 'primary'
  },
  {
    icon: Calendar,
    title: 'Penjadwalan Cerdas',
    description: 'Sistem penjadwalan kuliah, ujian, praktikum, dan kegiatan akademik dengan deteksi konflik otomatis.',
    color: 'secondary'
  },
  {
    icon: Shield,
    title: 'Keamanan Berlapis',
    description: 'Sistem keamanan tingkat enterprise dengan kontrol akses ketat untuk melindungi data akademik.',
    color: 'accent'
  },
  {
    icon: BookOpen,
    title: 'E-Learning Terintegrasi',
    description: 'Platform pembelajaran online dengan materi interaktif, quiz, dan tracking progress mahasiswa.',
    color: 'primary'
  },
  {
    icon: ClipboardList,
    title: 'Monitoring & Evaluasi',
    description: 'Dashboard analitik untuk monitoring performa akademik dan evaluasi kinerja secara real-time.',
    color: 'secondary'
  },
  {
    icon: Database,
    title: 'Data Analytics',
    description: 'Analisis mendalam data akademik dengan visualisasi interaktif untuk pengambilan keputusan strategis.',
    color: 'accent'
  }
]

const FeaturesSection = () => {
  const getColorClasses = (color: Feature['color'], index: number) => {
    const colorMap = [
      { iconBg: 'bg-purple-50', iconColor: 'text-purple-600', cardHover: 'hover:border-purple-300 hover:shadow-purple-500/15' },
      { iconBg: 'bg-cyan-50', iconColor: 'text-cyan-600', cardHover: 'hover:border-cyan-300 hover:shadow-cyan-500/15' },
      { iconBg: 'bg-orange-50', iconColor: 'text-orange-600', cardHover: 'hover:border-orange-300 hover:shadow-orange-500/15' },
      { iconBg: 'bg-teal-50', iconColor: 'text-teal-600', cardHover: 'hover:border-teal-300 hover:shadow-teal-500/15' },
      { iconBg: 'bg-pink-50', iconColor: 'text-pink-600', cardHover: 'hover:border-pink-300 hover:shadow-pink-500/15' },
      { iconBg: 'bg-indigo-50', iconColor: 'text-indigo-600', cardHover: 'hover:border-indigo-300 hover:shadow-indigo-500/15' },
      { iconBg: 'bg-primary/10', iconColor: 'text-primary', cardHover: 'hover:border-primary/30 hover:shadow-primary/15' },
      { iconBg: 'bg-red-50', iconColor: 'text-red-500', cardHover: 'hover:border-red-300 hover:shadow-red-500/15' },
      { iconBg: 'bg-green-50', iconColor: 'text-green-600', cardHover: 'hover:border-green-300 hover:shadow-green-500/15' }
    ]
    return colorMap[index % colorMap.length]
  }

  return (
    <section id="features" className="relative py-20 overflow-hidden bg-gradient-to-br from-purple-50/30 via-white to-cyan-50/30">
      {/* Background Elements - colorful gradient overlays */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-500/8 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-cyan-500/8 to-transparent rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-1/3 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(249,115,22,0.06),transparent_70%)] blur-3xl" />
      <div className="absolute bottom-1/3 left-1/4 w-[450px] h-[450px] bg-[radial-gradient(circle,rgba(20,184,166,0.05),transparent_70%)] blur-3xl" />

      <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center mb-6">
            <Badge className="bg-cyan-600 text-white px-5 py-2 text-sm rounded-full shadow-lg shadow-cyan-500/20">
              <Globe className="w-3.5 h-3.5 mr-2" />
              Fitur Unggulan
            </Badge>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-5 text-gray-900">
            Solusi Digital <span className="text-cyan-600">Terpadu</span> untuk Fakultas Teknik
          </h2>

          <p className="max-w-3xl mx-auto text-base md:text-lg text-gray-600 leading-relaxed">
            Platform komprehensif yang mengintegrasikan seluruh aspek pengelolaan akademik fakultas teknik
            dengan teknologi modern dan user experience yang intuitif.
          </p>
        </div>

        {/* Features Grid with modern 3D cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {features.map((feature, index) => {
            const colors = getColorClasses(feature.color, index)
            return (
              <Card
                key={index}
                className={`group relative p-7 border-2 border-gray-200 rounded-3xl bg-white shadow-lg transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl ${colors.cardHover} overflow-hidden`}
              >
                {/* Animated gradient border on top */}
                <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-purple-500 via-cyan-500 via-orange-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Background glow effect */}
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-purple-500/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Icon with 3D effect */}
                <div className="relative mb-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${colors.iconBg} transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-lg`}>
                    <feature.icon className={`w-8 h-8 ${colors.iconColor}`} />
                  </div>
                  {/* Icon shadow */}
                  <div className={`absolute top-0 left-0 w-16 h-16 rounded-2xl ${colors.iconBg} blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />
                </div>

                {/* Content */}
                <div className="relative space-y-3">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Corner decoration */}
                <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Card>
            )
          })}
        </div>

        {/* CTA Section - Solid background */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold bg-purple-50 text-purple-700 border-2 border-purple-200">
            <Shield className="w-5 h-5 text-purple-600" />
            <span>Trusted by 5000+ Students & 180+ Faculty Members</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
