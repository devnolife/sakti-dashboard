'use client'

import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import {
  Users,
  GraduationCap,
  BookOpen,
  Award,
  TrendingUp,
  Building,
  Globe,
  Star
} from 'lucide-react'

interface Stat {
  icon: React.ElementType
  label: string
  value: string
  suffix?: string
  description: string
  color: 'primary' | 'secondary' | 'accent' | 'success'
}

const stats: Stat[] = [
  {
    icon: Users,
    label: 'Mahasiswa Aktif',
    value: '5,247',
    suffix: '+',
    description: 'Mahasiswa terdaftar dari berbagai program studi',
    color: 'primary'
  },
  {
    icon: GraduationCap,
    label: 'Dosen & Staff',
    value: '186',
    suffix: '',
    description: 'Tenaga pengajar dan staff administrasi berpengalaman',
    color: 'secondary'
  },
  {
    icon: BookOpen,
    label: 'Program Studi',
    value: '15',
    suffix: '',
    description: 'Program studi terakreditasi dari D3 hingga S2',
    color: 'accent'
  },
  {
    icon: Award,
    label: 'Lulusan',
    value: '12,500',
    suffix: '+',
    description: 'Alumni yang telah tersebar di berbagai industri',
    color: 'success'
  },
  {
    icon: Building,
    label: 'Laboratorium',
    value: '28',
    suffix: '',
    description: 'Laboratorium modern dengan peralatan terkini',
    color: 'primary'
  },
  {
    icon: Globe,
    label: 'Kemitraan Industri',
    value: '150',
    suffix: '+',
    description: 'Perusahaan mitra untuk magang dan kerja sama',
    color: 'secondary'
  },
  {
    icon: TrendingUp,
    label: 'Tingkat Kelulusan',
    value: '94',
    suffix: '%',
    description: 'Mahasiswa lulus tepat waktu dengan IPK > 3.0',
    color: 'success'
  },
  {
    icon: Star,
    label: 'Tingkat Kepuasan',
    value: '4.8',
    suffix: '/5',
    description: 'Rating kepuasan mahasiswa terhadap layanan',
    color: 'accent'
  }
]

const StatsSection = () => {
  const getColorClasses = (color: Stat['color']) => {
    switch (color) {
      case 'primary':
        return {
          bg: 'from-primary/10 to-primary/5',
          border: 'border-primary/20',
          icon: 'bg-primary/15 text-primary',
          text: 'text-primary'
        }
      case 'secondary':
        return {
          bg: 'from-secondary/10 to-secondary/5',
          border: 'border-secondary/20',
          icon: 'bg-secondary/15 text-secondary',
          text: 'text-secondary'
        }
      case 'accent':
        return {
          bg: 'from-accent/15 to-accent/5',
          border: 'border-accent/30',
          icon: 'bg-accent/20 text-accent-foreground',
          text: 'text-accent-foreground'
        }
      case 'success':
        return {
          bg: 'from-green-50 to-emerald-50',
          border: 'border-green-200',
          icon: 'bg-green-100 text-green-600',
          text: 'text-green-600'
        }
    }
  }

  return (
    <section className="relative py-16 overflow-hidden bg-gradient-to-b from-white via-gray-50 to-primary/5">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-brand/5 to-secondary/10" />
        <div className="absolute -top-10 -right-10 w-72 h-72 rounded-full bg-[radial-gradient(circle_at_70%_30%,rgba(4,81,211,0.18),transparent_65%)] blur-2xl" />
        <div className="absolute bottom-0 -left-8 w-64 h-64 rounded-full bg-[radial-gradient(circle_at_30%_70%,rgba(54,116,181,0.18),transparent_60%)] blur-2xl" />
      </div>

      <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center mb-4">
            <Badge className="bg-primary text-white px-4 py-1.5 text-sm rounded-full shadow-lg">
              <TrendingUp className="w-3 h-3 mr-2" />
              Statistik Fakultas
            </Badge>
          </div>

          <h2 className="text-2xl md:text-3xl font-medium leading-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary via-brand to-primary/80">
            Prestasi dalam Angka
          </h2>

          <p className="max-w-2xl mx-auto text-sm md:text-base text-gray-600 leading-relaxed">
            Data terbaru yang menunjukkan komitmen kami dalam memberikan pendidikan teknik berkualitas
            dan menghasilkan lulusan yang siap bersaing di era digital.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const colors = getColorClasses(stat.color)
            return (
              <Card
                key={index}
                className={`group relative p-6 rounded-2xl bg-gradient-to-br ${colors.bg} border ${colors.border} hover:shadow-lg transition-all duration-500 hover:-translate-y-1 overflow-hidden`}
              >
                <span className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-brand via-primary to-brand opacity-0 group-hover:opacity-100 transition-opacity" />
                {/* Background decoration */}
                <div className="absolute -top-6 -right-6 w-16 h-16 rounded-full bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg mb-4 ${colors.icon} transition-all duration-300 group-hover:scale-110`}>
                  <stat.icon className="w-5 h-5" />
                </div>

                {/* Stats */}
                <div className="space-y-1 mb-3">
                  <div className="flex items-baseline gap-1">
                    <span className={`text-2xl font-bold ${colors.text}`}>
                      {stat.value}
                    </span>
                    {stat.suffix && (
                      <span className={`text-lg font-medium ${colors.text} opacity-80`}>
                        {stat.suffix}
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-semibold text-gray-700">
                    {stat.label}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-xs text-gray-600 leading-relaxed">
                  {stat.description}
                </p>
              </Card>
            )
          })}
        </div>

        {/* Achievement Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
            <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-brand via-primary to-brand" />
            <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mb-4">
              <Award className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Akreditasi Unggul</h3>
            <p className="text-sm text-gray-600">Terakreditasi BAN-PT dengan peringkat A dan B</p>
          </div>

          <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
            <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-primary via-brand to-primary" />
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
              <Globe className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Kerjasama Internasional</h3>
            <p className="text-sm text-gray-600">Bermitra dengan universitas luar negeri</p>
          </div>

          <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
            <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-brand via-primary to-brand" />
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Inovasi Teknologi</h3>
            <p className="text-sm text-gray-600">Research & development di bidang teknologi terdepan</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StatsSection
