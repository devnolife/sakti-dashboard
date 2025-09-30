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
  const getColorClasses = (color: Feature['color']) => {
    switch (color) {
      case 'primary':
        return {
          iconBg: 'bg-primary/10',
          iconColor: 'text-primary',
          cardHover: 'hover:border-primary/20 hover:shadow-primary/10'
        }
      case 'secondary':
        return {
          iconBg: 'bg-secondary/10',
          iconColor: 'text-secondary',
          cardHover: 'hover:border-secondary/20 hover:shadow-secondary/10'
        }
      case 'accent':
        return {
          iconBg: 'bg-accent/20',
          iconColor: 'text-accent-foreground',
          cardHover: 'hover:border-accent/30 hover:shadow-accent/10'
        }
    }
  }

  return (
    <section id="features" className="relative py-16 overflow-hidden bg-gradient-to-br from-white via-primary/5 to-brand/10">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/10 via-brand/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-brand/10 via-secondary/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[420px] bg-[radial-gradient(circle_at_30%_40%,rgba(4,81,211,0.15),transparent_60%)] blur-3xl" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.15]" style={{ backgroundImage: 'linear-gradient(120deg,rgba(255,255,255,0.6)_0%,transparent_35%,transparent_65%,rgba(255,255,255,0.4)_100%)' }} />

      <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center mb-4">
            <Badge className="bg-primary text-white px-4 py-1.5 text-sm rounded-full shadow-lg">
              <Globe className="w-3 h-3 mr-2" />
              Fitur Unggulan
            </Badge>
          </div>

          <h2 className="text-2xl md:text-3xl font-medium leading-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary via-brand to-primary/80">
            Solusi Digital Terpadu untuk Fakultas Teknik
          </h2>

          <p className="max-w-3xl mx-auto text-sm md:text-base text-gray-600 leading-relaxed">
            Platform komprehensif yang mengintegrasikan seluruh aspek pengelolaan akademik fakultas teknik
            dengan teknologi modern dan user experience yang intuitif.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const colors = getColorClasses(feature.color)
            return (
              <Card
                key={index}
                className={`group relative p-6 border border-gray-100 rounded-2xl bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 ${colors.cardHover}`}
              >
                {/* Brand gradient border accent */}
                <span className="pointer-events-none absolute inset-x-0 top-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-brand via-primary to-brand rounded-t-2xl" />
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${colors.iconBg} transition-all duration-300 group-hover:scale-110`}>
                  <feature.icon className={`w-6 h-6 ${colors.iconColor}`} />
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Hover Effect Background */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </Card>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-primary/10 via-brand/10 to-primary/10 text-primary">
            <Shield className="w-4 h-4" />
            <span>Trusted by 5000+ Students & 180+ Faculty Members</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
