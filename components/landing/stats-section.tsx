'use client'

import { useEffect, useRef, useState } from 'react'
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
  Star,
  UserCheck,
  Heart,
  Trophy,
  Zap
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
  },
  {
    icon: UserCheck,
    label: 'Mahasiswa Asing',
    value: '284',
    suffix: '',
    description: 'Mahasiswa internasional dari berbagai negara',
    color: 'primary'
  },
  {
    icon: Heart,
    label: 'HMJ Aktif',
    value: '12',
    suffix: '',
    description: 'Himpunan Mahasiswa Jurusan yang aktif berorganisasi',
    color: 'secondary'
  },
  {
    icon: Trophy,
    label: 'Prestasi Mahasiswa',
    value: '89',
    suffix: '+',
    description: 'Penghargaan tingkat nasional dan internasional',
    color: 'success'
  },
  {
    icon: Zap,
    label: 'Beasiswa',
    value: '1,247',
    suffix: '',
    description: 'Mahasiswa penerima berbagai jenis beasiswa',
    color: 'accent'
  }
]

// Number Counter Animation Component
const NumberCounter = ({ target, isVisible, duration = 2000 }: { target: number, isVisible: boolean, duration?: number }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isVisible) return

    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(target * easeOut))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [isVisible, target, duration])

  return <span>{count.toLocaleString()}</span>
}

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

  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="stats"
      ref={sectionRef}
      className="relative py-20 overflow-hidden bg-gradient-to-b from-indigo-50/30 via-white to-teal-50/20"
    >
      {/* Animated Colorful Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[radial-gradient(circle_at_70%_30%,rgba(139,92,246,0.08),transparent_65%)] blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[radial-gradient(circle_at_30%_70%,rgba(20,184,166,0.08),transparent_65%)] blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(249,115,22,0.04),transparent_70%)] blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

        {/* Floating Elements */}
        <div className="absolute w-2 h-2 rounded-full top-10 left-10 bg-indigo-300/30 animate-bounce" style={{ animationDelay: '0.5s' }} />
        <div className="absolute w-3 h-3 rounded-full top-32 right-20 bg-teal-300/30 animate-bounce" style={{ animationDelay: '1.5s' }} />
        <div className="absolute w-2 h-2 rounded-full bottom-20 left-32 bg-purple-300/30 animate-bounce" style={{ animationDelay: '2.5s' }} />
      </div>

      <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header Section with Staggered Animation */}
        <div className="text-center mb-14">
          <div
            className={`inline-flex items-center mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
          >
            <Badge className="px-5 py-2 text-sm text-white transition-all duration-300 bg-indigo-600 rounded-full shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:scale-105">
              <TrendingUp className="w-3.5 h-3.5 mr-2 animate-pulse" />
              Statistik Fakultas
            </Badge>
          </div>

          <h2
            className={`mb-5 text-3xl font-bold leading-tight text-gray-900 md:text-4xl lg:text-5xl transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
          >
            Prestasi dalam <span className="text-transparent text-indigo-600 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text animate-pulse">Angka</span>
          </h2>

          <p
            className={`max-w-2xl mx-auto text-base leading-relaxed text-gray-600 md:text-lg transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
          >
            Data terbaru yang menunjukkan komitmen kami dalam memberikan pendidikan teknik berkualitas
            dan menghasilkan lulusan yang siap bersaing di era digital.
          </p>
        </div>

        {/* Authentic Bento Grid Layout with Staggered Animations */}
        <div
          className={`grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-3 mb-8 auto-rows-[minmax(100px,auto)] transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
        >
          {/* Main Featured Card - Mahasiswa Aktif with Enhanced Animations */}
          <Card
            className={`relative col-span-4 row-span-2 p-4 overflow-hidden transition-all duration-500 border shadow-sm md:col-span-4 lg:col-span-4 bg-gradient-to-br from-purple-50 to-white border-purple-200/50 group rounded-2xl hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2 hover:scale-[1.02] hover:border-purple-300/60 ${isVisible ? 'opacity-100 translate-y-0 animate-[fadeInUp_0.6s_ease-out_0.8s_both]' : 'opacity-0 translate-y-8'
              }`}
          >
            <div className="relative flex flex-col h-full">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 transition-all duration-300 bg-purple-500/10 rounded-2xl group-hover:bg-purple-500/20 group-hover:scale-110 group-hover:rotate-3">
                  <Users className="w-6 h-6 text-purple-600 group-hover:animate-pulse" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-purple-600 transition-transform duration-300 md:text-4xl group-hover:scale-110">
                    <NumberCounter
                      target={parseInt(stats[0].value.replace(',', ''))}
                      isVisible={isVisible}
                    /><span className="text-lg md:text-2xl opacity-70">+</span>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="mb-2 text-sm font-bold text-gray-900 md:text-base">
                  {stats[0].label}
                </h3>
                <p className="text-xs leading-relaxed text-gray-600 md:text-sm">
                  {stats[0].description}
                </p>
              </div>
            </div>
          </Card>

          {/* Tall Card - Dosen & Staff with Enhanced Animation */}
          <Card
            className={`relative col-span-2 row-span-2 p-4 overflow-hidden transition-all duration-500 border shadow-sm md:col-span-2 lg:col-span-2 bg-gradient-to-br from-cyan-50 to-white border-cyan-200/50 group rounded-2xl hover:shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-2 hover:scale-[1.02] hover:border-cyan-300/60 ${isVisible ? 'opacity-100 translate-y-0 animate-[fadeInUp_0.6s_ease-out_1.0s_both]' : 'opacity-0 translate-y-8'
              }`}
          >
            <div className="relative flex flex-col justify-between h-full">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 transition-all duration-300 bg-cyan-500/10 rounded-xl group-hover:bg-cyan-500/20 group-hover:scale-110 group-hover:rotate-3">
                  <GraduationCap className="w-5 h-5 text-cyan-600 group-hover:animate-pulse" />
                </div>
              </div>
              <div className="flex flex-col justify-center flex-1 text-center">
                <div className="mb-1 text-3xl font-black transition-transform duration-300 text-cyan-600 group-hover:scale-110">
                  <NumberCounter
                    target={parseInt(stats[1].value)}
                    isVisible={isVisible}
                    duration={1800}
                  />
                </div>
                <h3 className="mb-2 text-xs font-bold text-gray-900 uppercase">
                  {stats[1].label}
                </h3>
                <p className="text-xs leading-relaxed text-gray-600">
                  {stats[1].description}
                </p>
              </div>
            </div>
          </Card>

          {/* Vertical Rectangle - Tingkat Kelulusan with Enhanced Animation */}
          <Card
            className={`relative col-span-2 row-span-2 p-4 overflow-hidden transition-all duration-500 border shadow-sm md:col-span-2 lg:col-span-2 bg-gradient-to-b from-green-50 to-white border-green-200/50 group rounded-2xl hover:shadow-2xl hover:shadow-green-500/20 hover:-translate-y-2 hover:scale-[1.02] hover:border-green-300/60 ${isVisible ? 'opacity-100 translate-y-0 animate-[fadeInUp_0.6s_ease-out_1.2s_both]' : 'opacity-0 translate-y-8'
              }`}
          >
            <div className="flex flex-col justify-center h-full text-center">
              <div className="p-3 mx-auto mb-4 transition-all duration-300 bg-green-500/10 rounded-2xl w-fit group-hover:bg-green-500/20 group-hover:scale-110 group-hover:rotate-3">
                <TrendingUp className="w-6 h-6 text-green-600 group-hover:animate-pulse" />
              </div>
              <div className="flex items-baseline justify-center gap-1 mb-3">
                <span className="text-3xl font-black text-green-600 transition-transform duration-300 md:text-4xl group-hover:scale-110">
                  <NumberCounter
                    target={parseInt(stats[6].value)}
                    isVisible={isVisible}
                    duration={2200}
                  />
                </span>
                <span className="text-xl font-bold text-green-600 md:text-2xl opacity-80 group-hover:animate-pulse">%</span>
              </div>
              <h3 className="mb-2 text-xs font-bold text-gray-900 uppercase md:text-sm">
                {stats[6].label}
              </h3>
              <p className="text-xs leading-relaxed text-gray-600">
                {stats[6].description}
              </p>
            </div>
          </Card>

          {/* Small Square - Program Studi with Staggered Animation */}
          <Card
            className={`relative col-span-2 row-span-1 p-3 overflow-hidden transition-all duration-500 border shadow-sm md:col-span-2 lg:col-span-2 bg-gradient-to-br from-orange-50 to-white border-orange-200/50 group rounded-2xl hover:shadow-xl hover:shadow-orange-500/20 hover:-translate-y-2 hover:scale-105 hover:border-orange-300/60 ${isVisible ? 'opacity-100 translate-y-0 animate-[fadeInUp_0.6s_ease-out_1.4s_both]' : 'opacity-0 translate-y-8'
              }`}
          >
            <div className="flex flex-col justify-center h-full text-center">
              <div className="p-2 mx-auto mb-2 transition-all duration-300 bg-orange-500/10 rounded-xl w-fit group-hover:bg-orange-500/20 group-hover:scale-125 group-hover:rotate-12">
                <BookOpen className="w-4 h-4 text-orange-600 group-hover:animate-pulse" />
              </div>
              <div className="mb-1 text-2xl font-black text-orange-600 transition-transform duration-300 group-hover:scale-110">
                <NumberCounter
                  target={parseInt(stats[2].value)}
                  isVisible={isVisible}
                  duration={1500}
                />
              </div>
              <h3 className="text-xs font-bold leading-tight text-gray-900 uppercase">
                {stats[2].label}
              </h3>
            </div>
          </Card>

          {/* Small Square - Laboratorium with Staggered Animation */}
          <Card
            className={`relative col-span-2 row-span-1 p-3 overflow-hidden transition-all duration-500 border shadow-sm md:col-span-2 lg:col-span-2 bg-gradient-to-br from-pink-50 to-white border-pink-200/50 group rounded-2xl hover:shadow-xl hover:shadow-pink-500/20 hover:-translate-y-2 hover:scale-105 hover:border-pink-300/60 ${isVisible ? 'opacity-100 translate-y-0 animate-[fadeInUp_0.6s_ease-out_1.6s_both]' : 'opacity-0 translate-y-8'
              }`}
          >
            <div className="flex flex-col justify-center h-full text-center">
              <div className="p-2 mx-auto mb-2 transition-all duration-300 bg-pink-500/10 rounded-xl w-fit group-hover:bg-pink-500/20 group-hover:scale-125 group-hover:rotate-12">
                <Building className="w-4 h-4 text-pink-600 group-hover:animate-pulse" />
              </div>
              <div className="mb-1 text-2xl font-black text-pink-600 transition-transform duration-300 group-hover:scale-110">
                <NumberCounter
                  target={parseInt(stats[4].value)}
                  isVisible={isVisible}
                  duration={1600}
                />
              </div>
              <h3 className="text-xs font-bold leading-tight text-gray-900 uppercase">
                {stats[4].label}
              </h3>
            </div>
          </Card>

          {/* Small Square - Mahasiswa Asing with Animation */}
          <Card
            className={`relative col-span-2 row-span-1 p-3 overflow-hidden transition-all duration-500 border shadow-sm md:col-span-2 lg:col-span-2 bg-gradient-to-br from-blue-50 to-white border-blue-200/50 group rounded-2xl hover:shadow-xl hover:shadow-blue-500/20 hover:-translate-y-2 hover:scale-105 hover:border-blue-300/60 hover:animate-wiggle ${isVisible ? 'opacity-100 translate-y-0 animate-[fadeInUp_0.6s_ease-out_1.8s_both]' : 'opacity-0 translate-y-8'
              }`}
          >
            <div className="flex flex-col justify-center h-full text-center">
              <div className="p-2 mx-auto mb-2 transition-all duration-300 bg-blue-500/10 rounded-xl w-fit group-hover:bg-blue-500/20 group-hover:scale-125 group-hover:rotate-12">
                <UserCheck className="w-4 h-4 text-blue-600 group-hover:animate-pulse" />
              </div>
              <div className="mb-1 text-2xl font-black text-blue-600 transition-transform duration-300 group-hover:scale-110">
                <NumberCounter
                  target={parseInt(stats[8].value)}
                  isVisible={isVisible}
                  duration={1700}
                />
              </div>
              <h3 className="text-xs font-bold leading-tight text-gray-900 uppercase">
                {stats[8].label}
              </h3>
            </div>
          </Card>

          {/* Small Square - HMJ Aktif with Animation */}
          <Card
            className={`relative col-span-2 row-span-1 p-3 overflow-hidden transition-all duration-500 border shadow-sm md:col-span-2 lg:col-span-2 bg-gradient-to-br from-rose-50 to-white border-rose-200/50 group rounded-2xl hover:shadow-xl hover:shadow-rose-500/20 hover:-translate-y-2 hover:scale-105 hover:border-rose-300/60 hover:animate-wiggle ${isVisible ? 'opacity-100 translate-y-0 animate-[fadeInUp_0.6s_ease-out_2.0s_both]' : 'opacity-0 translate-y-8'
              }`}
          >
            <div className="flex flex-col justify-center h-full text-center">
              <div className="p-2 mx-auto mb-2 transition-all duration-300 bg-rose-500/10 rounded-xl w-fit group-hover:bg-rose-500/20 group-hover:scale-125 group-hover:rotate-12">
                <Heart className="w-4 h-4 text-rose-600 group-hover:animate-pulse" />
              </div>
              <div className="mb-1 text-2xl font-black transition-transform duration-300 text-rose-600 group-hover:scale-110">
                <NumberCounter
                  target={parseInt(stats[9].value)}
                  isVisible={isVisible}
                  duration={1400}
                />
              </div>
              <h3 className="text-xs font-bold leading-tight text-gray-900 uppercase">
                {stats[9].label}
              </h3>
            </div>
          </Card>

          {/* Wide Horizontal Card - Lulusan with Animation */}
          <Card
            className={`relative col-span-4 row-span-1 p-4 overflow-hidden transition-all duration-500 border shadow-sm md:col-span-4 lg:col-span-6 bg-gradient-to-r from-teal-50 to-white border-teal-200/50 group rounded-2xl hover:shadow-2xl hover:shadow-teal-500/20 hover:-translate-y-2 hover:scale-[1.02] hover:border-teal-300/60 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700 ${isVisible ? 'opacity-100 translate-y-0 animate-[fadeInUp_0.6s_ease-out_2.2s_both]' : 'opacity-0 translate-y-8'
              }`}
          >
            <div className="relative z-10 flex items-center h-full gap-4">
              <div className="flex-shrink-0 p-3 transition-all duration-300 bg-teal-500/10 rounded-2xl group-hover:bg-teal-500/20 group-hover:scale-110 group-hover:rotate-3">
                <Award className="w-6 h-6 text-teal-600 group-hover:animate-pulse" />
              </div>
              <div className="flex-1">
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-2xl font-black text-teal-600 transition-transform duration-300 md:text-3xl group-hover:scale-110">
                    <NumberCounter
                      target={parseInt(stats[3].value.replace(',', ''))}
                      isVisible={isVisible}
                      duration={2500}
                    />
                  </span>
                  <span className="text-lg font-bold text-teal-600 opacity-80 group-hover:animate-pulse">+</span>
                </div>
                <h3 className="mb-1 text-xs font-bold text-gray-900 uppercase md:text-sm">
                  {stats[3].label}
                </h3>
                <p className="hidden text-xs leading-relaxed text-gray-600 md:block">
                  {stats[3].description}
                </p>
              </div>
            </div>
          </Card>

          {/* Small Square - Tingkat Kepuasan with Star Animation */}
          <Card
            className={`relative col-span-2 row-span-1 p-3 overflow-hidden transition-all duration-500 border shadow-sm md:col-span-2 lg:col-span-2 bg-gradient-to-br from-amber-50 to-white border-amber-200/50 group rounded-2xl hover:shadow-xl hover:shadow-amber-500/20 hover:-translate-y-2 hover:scale-105 hover:border-amber-300/60 ${isVisible ? 'opacity-100 translate-y-0 animate-[fadeInUp_0.6s_ease-out_2.4s_both]' : 'opacity-0 translate-y-8'
              }`}
          >
            <div className="flex flex-col justify-center h-full text-center">
              <div className="p-2 mx-auto mb-2 transition-all duration-300 bg-amber-500/10 rounded-xl w-fit group-hover:bg-amber-500/20 group-hover:scale-125 group-hover:rotate-12">
                <Star className="w-4 h-4 text-amber-600 group-hover:animate-spin group-hover:duration-1000" />
              </div>
              <div className="flex items-baseline justify-center gap-1 mb-1">
                <span className="text-2xl font-black transition-transform duration-300 text-amber-600 group-hover:scale-110">
                  {stats[7].value}
                </span>
                <span className="text-sm font-bold text-amber-600 opacity-80 group-hover:animate-pulse">/5</span>
              </div>
              <h3 className="text-xs font-bold leading-tight text-gray-900 uppercase">
                {stats[7].label}
              </h3>
            </div>
          </Card>

          {/* Medium Rectangle - Kemitraan Industri with Animation */}
          <Card
            className={`relative col-span-4 row-span-1 p-4 overflow-hidden transition-all duration-500 border shadow-sm md:col-span-4 lg:col-span-4 bg-gradient-to-br from-indigo-50 to-white border-indigo-200/50 group rounded-2xl hover:shadow-2xl hover:shadow-indigo-500/20 hover:-translate-y-2 hover:scale-[1.02] hover:border-indigo-300/60 ${isVisible ? 'opacity-100 translate-y-0 animate-[fadeInUp_0.6s_ease-out_2.6s_both]' : 'opacity-0 translate-y-8'
              }`}
          >
            <div className="flex flex-col justify-between h-full">
              <div className="flex items-start justify-between mb-3">
                <div className="p-3 transition-all duration-300 bg-indigo-500/10 rounded-2xl group-hover:bg-indigo-500/20 group-hover:scale-110 group-hover:rotate-3">
                  <Globe className="w-6 h-6 text-indigo-600 group-hover:animate-spin group-hover:duration-1000" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-indigo-600 transition-transform duration-300 md:text-3xl group-hover:scale-110">
                    <NumberCounter
                      target={parseInt(stats[5].value)}
                      isVisible={isVisible}
                      duration={2100}
                    /><span className="text-lg opacity-70 group-hover:animate-pulse">+</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-xs font-bold text-gray-900 uppercase md:text-sm">
                  {stats[5].label}
                </h3>
                <p className="text-xs leading-relaxed text-gray-600">
                  {stats[5].description}
                </p>
              </div>
            </div>
          </Card>

          {/* Medium Rectangle - Prestasi Mahasiswa with Trophy Animation */}
          <Card
            className={`relative col-span-4 row-span-1 p-4 overflow-hidden transition-all duration-500 border shadow-sm md:col-span-4 lg:col-span-4 bg-gradient-to-br from-emerald-50 to-white border-emerald-200/50 group rounded-2xl hover:shadow-2xl hover:shadow-emerald-500/20 hover:-translate-y-2 hover:scale-[1.02] hover:border-emerald-300/60 ${isVisible ? 'opacity-100 translate-y-0 animate-[fadeInUp_0.6s_ease-out_2.8s_both]' : 'opacity-0 translate-y-8'
              }`}
          >
            <div className="flex items-center h-full gap-3">
              <div className="flex-shrink-0 p-3 text-white transition-all duration-300 bg-emerald-500 rounded-xl group-hover:bg-emerald-600 group-hover:scale-110 group-hover:rotate-12 group-hover:animate-bounce">
                <Trophy className="w-5 h-5 group-hover:animate-pulse" />
              </div>
              <div className="flex-1">
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-xl font-black transition-transform duration-300 text-emerald-600 md:text-2xl group-hover:scale-110">
                    <NumberCounter
                      target={parseInt(stats[10].value)}
                      isVisible={isVisible}
                      duration={1900}
                    />
                  </span>
                  <span className="text-sm font-bold text-emerald-600 opacity-80 group-hover:animate-pulse">+</span>
                </div>
                <h3 className="mb-1 text-xs font-bold text-gray-900 uppercase md:text-sm">
                  {stats[10].label}
                </h3>
                <p className="text-xs leading-relaxed text-gray-600">
                  {stats[10].description}
                </p>
              </div>
            </div>
          </Card>

          {/* Compact Achievement Card - Akreditasi Unggul with Shine Effect */}
          <Card
            className={`relative col-span-4 row-span-1 p-4 overflow-hidden transition-all duration-500 border shadow-sm md:col-span-4 lg:col-span-4 bg-gradient-to-br from-amber-50 to-white border-amber-200/50 group rounded-2xl hover:shadow-2xl hover:shadow-amber-500/20 hover:-translate-y-2 hover:scale-[1.02] hover:border-amber-300/60 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-amber-200/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-1000 ${isVisible ? 'opacity-100 translate-y-0 animate-[fadeInUp_0.6s_ease-out_3.0s_both]' : 'opacity-0 translate-y-8'
              }`}
          >
            <div className="relative z-10 flex items-center h-full gap-3">
              <div className="flex-shrink-0 p-3 text-white transition-all duration-300 bg-amber-500 rounded-xl group-hover:bg-amber-600 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg">
                <Award className="w-5 h-5 group-hover:animate-pulse" />
              </div>
              <div className="flex-1">
                <h3 className="mb-1 text-sm font-bold text-gray-900 transition-colors duration-300 md:text-base group-hover:text-amber-800">
                  Akreditasi Unggul
                </h3>
                <p className="text-xs text-gray-600 transition-colors duration-300 group-hover:text-amber-700">
                  BAN-PT A & B
                </p>
              </div>
            </div>
          </Card>

          {/* Medium Rectangle - Beasiswa with Lightning Effect */}
          <Card
            className={`relative col-span-4 row-span-1 p-4 overflow-hidden transition-all duration-500 border shadow-sm md:col-span-4 lg:col-span-4 bg-gradient-to-br from-violet-50 to-white border-violet-200/50 group rounded-2xl hover:shadow-2xl hover:shadow-violet-500/20 hover:-translate-y-2 hover:scale-[1.02] hover:border-violet-300/60 ${isVisible ? 'opacity-100 translate-y-0 animate-[fadeInUp_0.6s_ease-out_3.2s_both]' : 'opacity-0 translate-y-8'
              }`}
          >
            <div className="flex items-center h-full gap-3">
              <div className="flex-shrink-0 p-3 text-white transition-all duration-300 bg-violet-500 rounded-xl group-hover:bg-violet-600 group-hover:scale-110 group-hover:rotate-12">
                <Zap className="w-5 h-5 group-hover:animate-ping" />
              </div>
              <div className="flex-1">
                <div className="mb-1 text-xl font-black transition-transform duration-300 text-violet-600 md:text-2xl group-hover:scale-110">
                  <NumberCounter
                    target={parseInt(stats[11].value.replace(',', ''))}
                    isVisible={isVisible}
                    duration={2300}
                  />
                </div>
                <h3 className="mb-1 text-xs font-bold text-gray-900 uppercase md:text-sm">
                  {stats[11].label}
                </h3>
                <p className="text-xs leading-relaxed text-gray-600">
                  {stats[11].description}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default StatsSection
