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
  const getColorClasses = (color: Stat['color'], index: number) => {
    const colorMap = [
      { bg: 'from-purple-50 to-purple-50/50', border: 'border-purple-200', icon: 'bg-purple-100 text-purple-600', text: 'text-purple-600' },
      { bg: 'from-cyan-50 to-cyan-50/50', border: 'border-cyan-200', icon: 'bg-cyan-100 text-cyan-600', text: 'text-cyan-600' },
      { bg: 'from-orange-50 to-orange-50/50', border: 'border-orange-200', icon: 'bg-orange-100 text-orange-600', text: 'text-orange-600' },
      { bg: 'from-teal-50 to-teal-50/50', border: 'border-teal-200', icon: 'bg-teal-100 text-teal-600', text: 'text-teal-600' },
      { bg: 'from-pink-50 to-pink-50/50', border: 'border-pink-200', icon: 'bg-pink-100 text-pink-600', text: 'text-pink-600' },
      { bg: 'from-indigo-50 to-indigo-50/50', border: 'border-indigo-200', icon: 'bg-indigo-100 text-indigo-600', text: 'text-indigo-600' },
      { bg: 'from-green-50 to-emerald-50/50', border: 'border-green-200', icon: 'bg-green-100 text-green-600', text: 'text-green-600' },
      { bg: 'from-amber-50 to-amber-50/50', border: 'border-amber-200', icon: 'bg-amber-100 text-amber-600', text: 'text-amber-600' }
    ]
    return colorMap[index % colorMap.length]
  }

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-indigo-50/30 via-white to-teal-50/20">
      {/* Colorful Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[radial-gradient(circle_at_70%_30%,rgba(139,92,246,0.08),transparent_65%)] blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[radial-gradient(circle_at_30%_70%,rgba(20,184,166,0.08),transparent_65%)] blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(249,115,22,0.04),transparent_70%)] blur-3xl" />
      </div>

      <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center mb-6">
            <Badge className="bg-indigo-600 text-white px-5 py-2 text-sm rounded-full shadow-lg shadow-indigo-500/20">
              <TrendingUp className="w-3.5 h-3.5 mr-2" />
              Statistik Fakultas
            </Badge>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-5 text-gray-900">
            Prestasi dalam <span className="text-indigo-600">Angka</span>
          </h2>

          <p className="max-w-2xl mx-auto text-base md:text-lg text-gray-600 leading-relaxed">
            Data terbaru yang menunjukkan komitmen kami dalam memberikan pendidikan teknik berkualitas
            dan menghasilkan lulusan yang siap bersaing di era digital.
          </p>
        </div>

        {/* Stats Grid with modern animated cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const colors = getColorClasses(stat.color, index)
            return (
              <Card
                key={index}
                className={`group relative p-7 rounded-3xl bg-white border-2 ${colors.border} shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden`}
              >
                {/* Animated gradient line */}
                <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-purple-500 via-cyan-500 via-orange-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Background gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Floating glow effect */}
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/40 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Icon with enhanced 3D effect */}
                <div className="relative mb-5">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${colors.icon} shadow-xl transition-all duration-500 group-hover:scale-125 group-hover:rotate-12`}>
                    <stat.icon className="w-7 h-7" />
                  </div>
                  {/* Icon glow shadow */}
                  <div className={`absolute top-0 left-0 w-14 h-14 rounded-2xl ${colors.icon} blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />
                </div>

                {/* Stats with animation */}
                <div className="relative space-y-2 mb-4">
                  <div className="flex items-baseline gap-1">
                    <span className={`text-4xl font-black ${colors.text} transition-all duration-300 group-hover:scale-110`}>
                      {stat.value}
                    </span>
                    {stat.suffix && (
                      <span className={`text-2xl font-bold ${colors.text} opacity-80`}>
                        {stat.suffix}
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                    {stat.label}
                  </h3>
                </div>

                {/* Description */}
                <p className="relative text-xs text-gray-600 leading-relaxed">
                  {stat.description}
                </p>

                {/* Corner decoration */}
                <div className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Card>
            )
          })}
        </div>

        {/* Achievement Highlights with modern elevated cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          <div className="group text-center p-8 bg-white rounded-3xl shadow-xl border-2 border-amber-200 relative overflow-hidden hover:shadow-2xl hover:border-amber-400 hover:-translate-y-2 transition-all duration-500">
            <span className="absolute inset-x-0 top-0 h-1 bg-amber-500" />
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-amber-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500 text-white rounded-2xl mb-5 shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
                <Award className="w-8 h-8" />
              </div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-amber-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
            </div>

            <h3 className="font-black text-gray-900 mb-3 text-xl">Akreditasi Unggul</h3>
            <p className="text-sm text-gray-600 leading-relaxed">Terakreditasi BAN-PT dengan peringkat A dan B</p>
          </div>

          <div className="group text-center p-8 bg-white rounded-3xl shadow-xl border-2 border-teal-200 relative overflow-hidden hover:shadow-2xl hover:border-teal-400 hover:-translate-y-2 transition-all duration-500">
            <span className="absolute inset-x-0 top-0 h-1 bg-teal-600" />
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-teal-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-600 text-white rounded-2xl mb-5 shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
                <Globe className="w-8 h-8" />
              </div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-teal-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
            </div>

            <h3 className="font-black text-gray-900 mb-3 text-xl">Kerjasama Internasional</h3>
            <p className="text-sm text-gray-600 leading-relaxed">Bermitra dengan universitas luar negeri</p>
          </div>

          <div className="group text-center p-8 bg-white rounded-3xl shadow-xl border-2 border-purple-200 relative overflow-hidden hover:shadow-2xl hover:border-purple-400 hover:-translate-y-2 transition-all duration-500">
            <span className="absolute inset-x-0 top-0 h-1 bg-purple-600" />
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-purple-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 text-white rounded-2xl mb-5 shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
                <TrendingUp className="w-8 h-8" />
              </div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-purple-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
            </div>

            <h3 className="font-black text-gray-900 mb-3 text-xl">Inovasi Teknologi</h3>
            <p className="text-sm text-gray-600 leading-relaxed">Research & development di bidang teknologi terdepan</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StatsSection
