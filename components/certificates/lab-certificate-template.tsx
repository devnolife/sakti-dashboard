"use client"

import { Montserrat, Poppins, Open_Sans } from "next/font/google"
import Image from "next/image"
import { Monitor, Lightbulb, Clock, Users, Calendar, CheckCircle, BarChart3, Activity, Printer } from "lucide-react"

const montserrat = Montserrat({
  weight: ['700', '800', '900'],
  subsets: ["latin"]
})

const poppins = Poppins({
  weight: ['300', '400', '600'],
  subsets: ["latin"]
})

const openSans = Open_Sans({
  weight: ['400', '500'],
  subsets: ["latin"]
})

interface LabCertificateData {
  name: string
  nim?: string
  program: string
  achievement: string
  date: string
  finalScore?: number
  meetingsAttended?: number
  attendanceScore?: number
  assignmentScore?: number
  technologies?: string[]
  certificateId?: string
  instructorName?: string
  organizationName?: string
}

interface LabCertificateTemplateProps {
  data: LabCertificateData
  template: string
  showBack?: boolean
  onPrint?: () => void
}

// Random color generator for badges
const getRandomBadgeColor = () => {
  const colors = [
    "bg-blue-100 text-blue-700 border-blue-200",
    "bg-green-100 text-green-700 border-green-200", 
    "bg-purple-100 text-purple-700 border-purple-200",
    "bg-pink-100 text-pink-700 border-pink-200",
    "bg-yellow-100 text-yellow-700 border-yellow-200",
    "bg-indigo-100 text-indigo-700 border-indigo-200",
    "bg-red-100 text-red-700 border-red-200",
    "bg-cyan-100 text-cyan-700 border-cyan-200"
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

// Clean Circular Progress Component  
interface CleanCircularProgressProps {
  percentage?: number
  size?: number
  strokeWidth?: number
}

const CleanCircularProgress = ({ percentage = 100, size = 110, strokeWidth = 8 }: CleanCircularProgressProps) => {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#0ea5e9" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-2xl font-black bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent ${montserrat.className}`}>
          231h
        </span>
        <span className={`text-xs text-gray-600 font-medium ${poppins.className}`}>
          Total
        </span>
      </div>
    </div>
  )
}

// Sparkline Component
interface SparklineProps {
  data: number[]
  color?: string
}

const Sparkline = ({ data, color = "#10b981" }: SparklineProps) => {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100
    const y = 100 - ((value - min) / range) * 100
    return `${x},${y}`
  }).join(' ')

  return (
    <div className="relative w-16 h-8">
      <svg width="100%" height="100%" viewBox="0 0 100 100" className="overflow-visible">
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-all duration-300"
        />
        {data.map((value, index) => {
          const x = (index / (data.length - 1)) * 100
          const y = 100 - ((value - min) / range) * 100
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="2"
              fill={color}
              className="animate-pulse"
              style={{ animationDelay: `${index * 0.1}s` }}
            />
          )
        })}
      </svg>
    </div>
  )
}

export default function LabCertificateTemplate({ data, template, showBack = false }: LabCertificateTemplateProps) {
  // Generate some mock analytics data
  const mockStats = {
    meetings: data.meetingsAttended || 10,
    totalScore: data.finalScore || 90,
    materials: 10,
    attendanceRate: data.attendanceScore || 95,
    assignmentCompletion: data.assignmentScore || 88,
    participationScore: 92
  }

  const mockCompetencies = [
    {
      name: "Keterampilan Pemrograman (KP)",
      value: 35,
      startColor: "#3b82f6",
      endColor: "#1d4ed8",
      level: "Expert"
    },
    {
      name: "Kemampuan Analisis dan Evaluasi (KAE)", 
      value: 30,
      startColor: "#06b6d4",
      endColor: "#0891b2",
      level: "Advanced"
    },
    {
      name: "Kreativitas dalam Pemecahan Masalah (KPM)",
      value: 25,
      startColor: "#10b981", 
      endColor: "#059669",
      level: "Advanced"
    },
    {
      name: "Keterampilan Komunikasi (KK)",
      value: 20,
      startColor: "#6b7280",
      endColor: "#4b5563",
      level: "Intermediate"
    }
  ]

  const mockGrades = {
    overall: "A",
    breakdown: [
      { subject: "Praktikum Backend", grade: "A+", score: 95 },
      { subject: "Database Design", grade: "A", score: 90 },
      { subject: "API Development", grade: "A-", score: 87 },
      { subject: "Server Management", grade: "B+", score: 85 }
    ]
  }

  const weeklyData = [45, 52, 38, 61, 47, 55, 43, 38, 52, 45]

  return (
    <div className="overflow-hidden bg-white rounded-lg shadow-2xl" style={{ width: '297mm', height: '210mm' }}>
      <div className="relative h-full p-8">
        {/* Single Decorative Border */}
        <div className="absolute border-4 border-black pointer-events-none inset-6 rounded-3xl"></div>

        {!showBack ? (
          // Certificate Front - A4 Landscape Layout
          <div className="relative z-10 flex flex-col justify-between h-full p-8">
            {/* Header with Badge */}
            <div className="flex flex-col items-center mt-4">
              <div className="relative mb-2">
                <div className="relative w-56 h-40">
                  <Image
                    src="/certificate-badge.png"
                    alt="Informatics Laboratory Badge"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-col justify-center flex-grow">
              {/* Title Section */}
              <div className="mb-2 text-center">
                <p className={`text-gray-600 text-sm font-light tracking-widest mb-1 ${poppins.className}`}>
                  PROFESSIONAL CERTIFICATION
                </p>
                <h1 className={`text-6xl font-black text-gray-900 mb-2 ${montserrat.className}`}>
                  {template === "backend_dev_1" ? "Backend Developer I" :
                   template === "frontend_dev_1" ? "Frontend Developer I" :
                   template === "fullstack_dev_1" ? "Full Stack Developer I" :
                   template === "data_science_1" ? "Data Science I" :
                   "Backend Developer I"}
                </h1>
              </div>

              {/* Recipient Section */}
              <div className="mb-2 text-center">
                <p className="mb-1 text-base text-gray-600">ISSUED TO</p>
                <h2 className={`text-5xl font-bold text-gray-900 mb-2 ${montserrat.className}`}>
                  {data.name}
                </h2>
              </div>

              {/* Description */}
              <div className="max-w-2xl mx-auto mb-2 text-center">
                <p className={`text-gray-700 text-lg leading-relaxed ${openSans.className}`}>
                  The bearer of this professional certificate has demonstrated a fundamental
                  level of {data.program} mastery and passed the core competencies for each
                  programming specialty in laboratory practices.
                </p>
              </div>
            </div>

            {/* Footer Section */}
            <div className="flex items-end justify-between mt-auto">
              {/* Signature */}
              <div className="flex flex-col items-start">
                <div className="mb-2">
                  <svg
                    width="100"
                    height="30"
                    viewBox="0 0 100 30"
                    className="text-gray-800"
                  >
                    <path
                      d="M10,22 Q18,8 25,18 Q32,12 40,22"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                    />
                    <path
                      d="M45,18 Q52,12 60,18 Q68,15 75,20"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </div>
                <p className={`text-xs text-gray-600 ${poppins.className}`}>
                  {data.instructorName || "Founders, Uxcel"}
                </p>
              </div>

              {/* Center Logo */}
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-10 h-10 mb-2 bg-gray-900 rounded-full">
                  <span className="text-sm font-bold text-white">ux</span>
                </div>
                <p className={`text-xs text-gray-600 font-medium ${poppins.className}`}>
                  {data.organizationName || "uxcel"}
                </p>
              </div>

              {/* Date and QR */}
              <div className="flex flex-col items-end">
                <div className="flex items-center justify-center w-12 h-12 mb-2 bg-gray-200">
                  <div className="w-10 h-10 bg-gray-800">
                    <div className="grid grid-cols-4 gap-px p-1">
                      {Array.from({ length: 16 }, (_, i) => (
                        <div
                          key={i}
                          className={`w-0.5 h-0.5 ${Math.random() > 0.5 ? "bg-white" : "bg-gray-800"}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className={`text-right text-xs text-gray-600 ${poppins.className}`}>
                  <p>Issued: {new Date(data.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  <p>ID: {data.certificateId || "123Z353467"}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Certificate Back - Enhanced A4 Layout with all features
          <div className="relative flex flex-col h-full overflow-hidden p-8">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-8 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, #6b7280 1px, transparent 0)`,
                backgroundSize: '20px 20px'
              }} />
            </div>

            {/* Header with Enhanced Info */}
            <div className="relative z-10 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className={`text-lg font-bold text-gray-900 ${montserrat.className}`}>
                      Sertifikat Laboratorium, {data.name}
                    </h1>
                    <span className="text-lg">🤝</span>
                  </div>
                  <p className={`text-gray-600 text-sm mb-2 ${openSans.className}`}>
                    {data.achievement}
                  </p>
                  <p className={`text-sm font-semibold text-gray-800 ${montserrat.className}`}>
                    {data.program}
                  </p>
                </div>

                {/* QR Code and Verification */}
                <div className="text-right">
                  <div className="flex items-center justify-center w-12 h-12 mb-2 bg-gray-800 rounded">
                    <div className="grid grid-cols-4 gap-px p-1">
                      {Array.from({ length: 16 }, (_, i) => (
                        <div key={i} className={`w-0.5 h-0.5 ${Math.random() > 0.5 ? "bg-white" : "bg-gray-800"}`} />
                      ))}
                    </div>
                  </div>
                  <div className={`text-xs text-gray-600 ${poppins.className}`}>
                    <p>Diterbitkan: {new Date(data.date).toLocaleDateString('id-ID')}</p>
                    <p>ID: {data.certificateId || "CERT-2024-001"}</p>
                  </div>
                </div>
              </div>

              {/* Technology Tags with Grade */}
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {(data.technologies || ["TypeScript", "NodeJS", "Docker", "PostgreSQL"]).map((tech, index) => (
                    <div key={index} className={`px-3 py-1 text-sm font-medium rounded-full border ${getRandomBadgeColor()} ${poppins.className} transition-all duration-200 hover:scale-105`}>
                      {tech}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm text-gray-600 ${poppins.className}`}>Nilai Keseluruhan:</span>
                  <div className="flex items-center justify-center w-6 h-6 text-sm font-bold text-white bg-green-500 rounded-full">
                    {mockGrades.overall}
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Stats Grid */}
            <div className="relative z-10 grid grid-cols-6 gap-4 mb-6">
              {[
                { icon: Monitor, label: "Pertemuan", value: mockStats.meetings, bgColor: "#3b82f6" },
                { icon: Lightbulb, label: "Nilai", value: mockStats.totalScore, bgColor: "#06b6d4", sparkline: true },
                { icon: Clock, label: "Materi", value: mockStats.materials, bgColor: "#f97316" },
                { icon: Calendar, label: "Kehadiran", value: `${mockStats.attendanceRate}%`, bgColor: "#22c55e" },
                { icon: CheckCircle, label: "Tugas", value: `${mockStats.assignmentCompletion}%`, bgColor: "#a855f7" },
                { icon: Users, label: "Partisipasi", value: `${mockStats.participationScore}%`, bgColor: "#ec4899" }
              ].map((stat, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center mb-1" style={{ backgroundColor: stat.bgColor }}>
                    <stat.icon className="w-3 h-3 text-white" />
                  </div>
                  <div className="text-center">
                    <p className={`text-xs font-bold text-gray-900 ${montserrat.className}`}>{stat.value}</p>
                    <p className={`text-xs text-gray-600 ${poppins.className}`}>{stat.label}</p>
                    {stat.sparkline && (
                      <Sparkline data={weeklyData.slice(0, 5)} color="#06b6d4" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="relative z-10 grid flex-grow grid-cols-12 gap-5">
              {/* Left Column - Competencies */}
              <div className="col-span-7">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="w-5 h-5 text-gray-700" />
                  <h3 className={`text-base font-black text-gray-800 ${montserrat.className}`}>
                    Penguasaan Kompetensi
                  </h3>
                </div>

                <div className="space-y-2">
                  {mockCompetencies.map((competency, index) => (
                    <div key={index} className="group relative hover:scale-[1.01] transition-all duration-300">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{
                            background: `linear-gradient(90deg, ${competency.startColor} 0%, ${competency.endColor} 100%)`
                          }} />
                          <span className={`text-xs font-medium text-gray-800 ${poppins.className}`}>
                            {competency.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            competency.level === 'Expert' ? 'bg-green-100 text-green-700' :
                            competency.level === 'Advanced' ? 'bg-blue-100 text-blue-700' :
                            competency.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-gray-100 text-gray-700'
                          } ${poppins.className}`}>
                            {competency.level}
                          </span>
                          <span className={`text-xs font-bold text-gray-900 ${montserrat.className}`}>
                            {competency.value}%
                          </span>
                        </div>
                      </div>
                      <div className="relative h-2 overflow-hidden bg-gray-200 rounded-full">
                        <div className="h-full transition-all duration-1000 ease-out rounded-full" style={{
                          background: `linear-gradient(90deg, ${competency.startColor} 0%, ${competency.endColor} 100%)`,
                          width: `${competency.value}%`
                        }} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Grade Breakdown */}
                <div className="mt-3">
                  <h4 className={`text-xs font-bold text-gray-800 mb-2 ${montserrat.className}`}>Grade Breakdown</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {mockGrades.breakdown.map((grade, index) => (
                      <div key={index} className="flex items-center justify-between p-2 rounded bg-gray-50">
                        <span className={`text-xs text-gray-700 ${poppins.className}`}>{grade.subject}</span>
                        <div className="flex items-center gap-2">
                          <div className={`w-6 h-6 ${
                            grade.grade === 'A+' ? 'bg-green-500' :
                            grade.grade === 'A' ? 'bg-green-400' :
                            grade.grade === 'A-' ? 'bg-lime-400' :
                            grade.grade === 'B+' ? 'bg-yellow-400' :
                            'bg-gray-400'
                          } rounded-full flex items-center justify-center text-white font-bold text-xs`}>
                            {grade.grade}
                          </div>
                          <span className="text-xs text-gray-600">{grade.score}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Center Column - Analytics */}
              <div className="col-span-3">
                <div className="flex items-center gap-2 mb-4">
                  <Activity className="w-5 h-5 text-emerald-600" />
                  <h3 className={`text-base font-black text-emerald-700 ${montserrat.className}`}>Analitik</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm text-gray-600 ${poppins.className}`}>Kecepatan Belajar</span>
                      <span className={`text-sm font-bold text-emerald-600 ${montserrat.className}`}>85%</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full">
                      <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600" style={{ width: '85%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm text-gray-600 ${poppins.className}`}>Problem Solving</span>
                      <span className={`text-sm font-bold text-blue-600 ${montserrat.className}`}>92%</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full">
                      <div className="h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-600" style={{ width: '92%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm text-gray-600 ${poppins.className}`}>Kolaborasi</span>
                      <span className={`text-sm font-bold text-purple-600 ${montserrat.className}`}>78%</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full">
                      <div className="h-full rounded-full bg-gradient-to-r from-purple-400 to-purple-600" style={{ width: '78%' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Time & Performance */}
              <div className="col-span-2">
                <div className="mb-4 text-center">
                  <h3 className={`text-sm font-black text-gray-800 mb-2 ${montserrat.className}`}>Waktu Belajar</h3>
                  <div className="flex justify-center">
                    <CleanCircularProgress percentage={100} size={80} />
                  </div>
                  <div className="mt-2 flex justify-center">
                    <Sparkline data={weeklyData} color="#10b981" />
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className={`text-sm font-bold text-gray-800 mb-2 ${montserrat.className}`}>Performa</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 rounded bg-green-50">
                      <span className={`text-sm text-green-700 ${poppins.className}`}>Overall</span>
                      <div className="flex items-center justify-center w-6 h-6 text-sm font-bold text-white bg-green-500 rounded-full">
                        {mockGrades.overall}
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-blue-50">
                      <span className={`text-sm text-blue-700 ${poppins.className}`}>Kehadiran</span>
                      <span className={`text-sm font-bold text-blue-600 ${montserrat.className}`}>{mockStats.attendanceRate}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer with Instructor Feedback */}
            <div className="relative z-10 p-4 mt-4 rounded bg-gray-50">
              <h4 className={`text-sm font-bold text-gray-800 mb-2 ${montserrat.className}`}>Umpan Balik Instruktur</h4>
              <p className={`text-sm text-gray-700 italic ${openSans.className}`}>
                Menunjukkan pemahaman yang sangat baik dalam pengembangan {data.program} dan kemampuan problem-solving yang excellent.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
