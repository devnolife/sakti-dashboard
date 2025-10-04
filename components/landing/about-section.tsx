'use client'

import Image from 'next/image'
import { CheckCircle, Users, GraduationCap, Shield, BarChart3, FileText, Calendar, CreditCard, ClipboardCheck } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const AboutSection = () => {
  const stakeholders = [
    {
      icon: GraduationCap,
      title: "Untuk Mahasiswa",
      description: "Akses nilai, jadwal, pembayaran, dan pengajuan surat secara digital",
      benefits: [
        "Cek nilai & transkrip real-time",
        "Lihat jadwal kuliah & ujian",
        "Pembayaran SPP online",
        "Pengajuan surat otomatis"
      ]
    },
    {
      icon: Users,
      title: "Untuk Dosen",
      description: "Kelola perkuliahan, nilai, dan monitoring mahasiswa dengan mudah",
      benefits: [
        "Input nilai mahasiswa",
        "Kelola jadwal mengajar",
        "Monitoring kehadiran",
        "Laporan akademik otomatis"
      ]
    },
    {
      icon: Shield,
      title: "Untuk Admin",
      description: "Dashboard terpusat untuk mengelola seluruh administrasi fakultas",
      benefits: [
        "Manajemen data terpusat",
        "Laporan otomatis & real-time",
        "Kontrol akses pengguna",
        "Arsip dokumen digital"
      ]
    },
    {
      icon: BarChart3,
      title: "Untuk Dekan",
      description: "Analytics dan data untuk pengambilan keputusan strategis",
      benefits: [
        "Dashboard analytics lengkap",
        "Monitoring performa fakultas",
        "Data untuk akreditasi",
        "Laporan eksekutif otomatis"
      ]
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
                Manfaat Aplikasi
              </Badge>
            </div>

            {/* Rotating Label - Solid Orange */}
            <div className="flex justify-start">
              <div className="relative px-6 py-2 text-white transform bg-orange-500 rounded-full shadow-lg -rotate-3 shadow-orange-500/30">
                <span className="relative z-10 text-lg font-semibold tracking-wide drop-shadow">SINTEKMu</span>
                <span className="absolute inset-0 rounded-full opacity-30 bg-[linear-gradient(120deg,rgba(255,255,255,0.4)_0%,transparent_60%)]" />
              </div>
            </div>

            {/* Main Content - Solid text color */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold leading-tight text-gray-900 md:text-3xl lg:text-4xl">
                Solusi Digital untuk <span className="text-purple-600">Setiap Pengguna</span>
              </h2>
              <p className="text-sm leading-relaxed text-gray-600 md:text-base">
                <span className="font-bold"><span className="text-red-600">SINTEK</span><span className="text-blue-600">Mu</span></span> dirancang untuk memenuhi kebutuhan seluruh stakeholder fakultas.
                Dari mahasiswa hingga dekan, setiap pengguna mendapatkan fitur yang sesuai dengan perannya
                untuk meningkatkan efisiensi dan produktivitas.
              </p>
            </div>

            {/* Stakeholder Cards - Grid 2 columns */}
            <div className="grid grid-cols-1 gap-5 mt-8 sm:grid-cols-2">
              {stakeholders.map((stakeholder, index) => {
                const colors = [
                  { bg: 'bg-purple-500', shadow: 'shadow-purple-500/20', border: 'border-purple-200', glow: 'group-hover:shadow-purple-500/30', iconBg: 'bg-purple-50', iconColor: 'text-purple-600' },
                  { bg: 'bg-cyan-500', shadow: 'shadow-cyan-500/20', border: 'border-cyan-200', glow: 'group-hover:shadow-cyan-500/30', iconBg: 'bg-cyan-50', iconColor: 'text-cyan-600' },
                  { bg: 'bg-orange-500', shadow: 'shadow-orange-500/20', border: 'border-orange-200', glow: 'group-hover:shadow-orange-500/30', iconBg: 'bg-orange-50', iconColor: 'text-orange-600' },
                  { bg: 'bg-teal-500', shadow: 'shadow-teal-500/20', border: 'border-teal-200', glow: 'group-hover:shadow-teal-500/30', iconBg: 'bg-teal-50', iconColor: 'text-teal-600' }
                ]
                const color = colors[index % colors.length]
                return (
                  <div
                    key={index}
                    className={`group relative rounded-2xl p-6 overflow-hidden bg-white border-2 ${color.border} transition-all duration-500 hover:-translate-y-2 shadow-lg ${color.shadow} hover:shadow-xl ${color.glow}`}
                  >
                    <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-purple-500 via-cyan-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute w-32 h-32 transition-opacity duration-500 rounded-full opacity-0 -top-10 -right-10 bg-white/30 blur-2xl group-hover:opacity-100" />

                    <div className="relative space-y-4">
                      {/* Icon and Title */}
                      <div className="flex items-start gap-4">
                        <div className={`flex-shrink-0 inline-flex items-center justify-center w-14 h-14 rounded-xl ${color.iconBg} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                          <stakeholder.icon className={`w-7 h-7 ${color.iconColor}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="mb-1 text-lg font-bold tracking-tight text-gray-900">
                            {stakeholder.title}
                          </h3>
                          <p className="text-xs leading-relaxed text-gray-600">
                            {stakeholder.description}
                          </p>
                        </div>
                      </div>

                      {/* Benefits List */}
                      <ul className="space-y-2">
                        {stakeholder.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                            <CheckCircle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${color.iconColor}`} />
                            <span className="leading-relaxed">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Side - Real Dashboard Preview */}
          <div className="relative">
            <div className="relative p-4 bg-white border-2 border-gray-200 shadow-2xl rounded-3xl">
              <div className="relative bg-gradient-to-br from-purple-50 via-white to-cyan-50 rounded-2xl overflow-hidden border border-gray-100 group">
                {/* Dashboard Screenshot */}
                <div className="relative h-[500px] w-full">
                  <Image
                    src="/landing/dashboard.png"
                    alt="SINTEKMu Dashboard"
                    fill
                    className="object-cover rounded-xl transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Overlay gradient on hover for better text visibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Overlay text on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="px-6 py-4 text-center bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border-2 border-purple-200">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Dashboard Terintegrasi</h3>
                      <p className="text-sm text-gray-600">
                        Interface yang intuitif dan mudah digunakan
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Badge - All-in-One Platform */}
            <div className="absolute -top-6 -right-6 group">
              <div className="relative px-6 py-4 transition-all duration-300 bg-white border-2 border-purple-200 shadow-2xl rounded-2xl backdrop-blur shadow-purple-500/30 hover:scale-105 hover:-translate-y-1">
                <div className="absolute inset-0 transition-opacity opacity-0 bg-gradient-to-br from-purple-500/5 to-purple-500/10 rounded-2xl group-hover:opacity-100" />
                <div className="relative space-y-1 text-center">
                  <div className="text-2xl font-black text-purple-600">All-in-One</div>
                  <div className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">Platform Terpadu</div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 group">
              <div className="relative px-6 py-4 transition-all duration-300 bg-white border-2 shadow-2xl rounded-2xl backdrop-blur border-cyan-200 shadow-cyan-500/30 hover:scale-105 hover:-translate-y-1">
                <div className="absolute inset-0 transition-opacity opacity-0 bg-gradient-to-br from-cyan-500/5 to-cyan-500/10 rounded-2xl group-hover:opacity-100" />
                <div className="relative space-y-1 text-center">
                  <div className="text-2xl font-black text-cyan-600">24/7</div>
                  <div className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">Akses Kapan Saja</div>
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
