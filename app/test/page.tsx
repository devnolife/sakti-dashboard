"use client";

import { Montserrat, Poppins, Open_Sans } from "next/font/google";
import { useState } from "react";
import { Monitor, Lightbulb, Clock, Users, Calendar, CheckCircle, BarChart3, Activity, Printer } from "lucide-react";
import Image from "next/image";

const montserrat = Montserrat({
  weight: ['700', '800', '900'],
  subsets: ["latin"]
});

const poppins = Poppins({
  weight: ['300', '400', '600'],
  subsets: ["latin"]
});

const openSans = Open_Sans({
  weight: ['400', '500'],
  subsets: ["latin"]
});

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
    "bg-cyan-100 text-cyan-700 border-cyan-200",
    "bg-orange-100 text-orange-700 border-orange-200",
    "bg-emerald-100 text-emerald-700 border-emerald-200",
    "bg-violet-100 text-violet-700 border-violet-200",
    "bg-rose-100 text-rose-700 border-rose-200",
    "bg-amber-100 text-amber-700 border-amber-200",
    "bg-lime-100 text-lime-700 border-lime-200",
    "bg-teal-100 text-teal-700 border-teal-200"
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

// Sample student data - this would come from props/API
const studentData = {
  name: "Dhia Daifullah",
  program: "Backend Developer Nest JS",
  subtitle: "Atas keberhasilan menyelesaikan Laboratorium",
  issueDate: "31 Mei 2024",
  verificationId: "CERT-2024-NJS-001234",
  stats: {
    meetings: 10,
    totalScore: 90,
    materials: 10,
    attendanceRate: 95,
    assignmentCompletion: 88,
    participationScore: 92
  },
  grades: {
    overall: "A",
    breakdown: [
      { subject: "Praktikum Backend", grade: "A+", score: 95 },
      { subject: "Database Design", grade: "A", score: 90 },
      { subject: "API Development", grade: "A-", score: 87 },
      { subject: "Server Management", grade: "B+", score: 85 }
    ]
  },
  learningTime: {
    hours: 231,
    minutes: 14,
    total: "231h 14m",
    weeklyData: [45, 52, 38, 61, 47, 55, 43, 38, 52, 45] // Hours per week
  },
  achievements: [
    { name: "Perfect Attendance", icon: "Calendar", unlocked: true, date: "Week 3" },
    { name: "Top Performer", icon: "Trophy", unlocked: true, date: "Week 5" },
    { name: "Quick Learner", icon: "Zap", unlocked: true, date: "Week 2" },
    { name: "Team Player", icon: "Users", unlocked: false, date: null },
    { name: "Problem Solver", icon: "Target", unlocked: true, date: "Week 7" }
  ],
  analytics: {
    learningVelocity: 85, // Percentage
    collaborationScore: 78,
    problemSolvingEfficiency: 92,
    peakHours: "14:00 - 16:00",
    streakDays: 23,
    leaderboardPosition: 3,
    totalStudents: 45
  },
  competencies: [
    {
      name: "Keterampilan Pemrograman (KP)",
      value: 35,
      startColor: "#3b82f6",
      endColor: "#1d4ed8",
      shadowColor: "rgba(59, 130, 246, 0.4)",
      bgColor: "#3b82f6",
      level: "Expert"
    },
    {
      name: "Kemampuan Analisis dan Evaluasi (KAE)",
      value: 30,
      startColor: "#06b6d4",
      endColor: "#0891b2",
      shadowColor: "rgba(6, 182, 212, 0.4)",
      bgColor: "#06b6d4",
      level: "Advanced"
    },
    {
      name: "Kreativitas dalam Pemecahan Masalah (KPM)",
      value: 25,
      startColor: "#10b981",
      endColor: "#059669",
      shadowColor: "rgba(16, 185, 129, 0.4)",
      bgColor: "#10b981",
      level: "Advanced"
    },
    {
      name: "Keterampilan Komunikasi (KK)",
      value: 20,
      startColor: "#6b7280",
      endColor: "#4b5563",
      shadowColor: "rgba(107, 114, 128, 0.4)",
      bgColor: "#6b7280",
      level: "Intermediate"
    },
    {
      name: "Etika dan Komunikasi Profesional",
      value: 15,
      startColor: "#ef4444",
      endColor: "#dc2626",
      shadowColor: "rgba(239, 68, 68, 0.4)",
      bgColor: "#ef4444",
      level: "Intermediate"
    },
    {
      name: "Kerja Tim",
      value: 10,
      startColor: "#f97316",
      endColor: "#ea580c",
      shadowColor: "rgba(249, 115, 22, 0.4)",
      bgColor: "#f97316",
      level: "Beginner"
    }
  ],
  technologies: ["Typescript", "NodeJS", "Docker", "PostgreSQL"],
  instructorFeedback: "Menunjukkan pemahaman yang sangat baik dalam pengembangan backend dan kemampuan problem-solving yang excellent.",
  futureRecommendations: ["Advanced Microservices", "Cloud Architecture", "DevOps Practices"]
};

// Clean Circular Progress Component
interface CleanCircularProgressProps {
  percentage?: number;
  size?: number;
  strokeWidth?: number;
}

const CleanCircularProgress = ({ percentage = 100, size = 110, strokeWidth = 8 }: CleanCircularProgressProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Main SVG */}
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Progress Circle */}
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

        {/* Gradient Definition */}
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#0ea5e9" />
          </linearGradient>
        </defs>
      </svg>

      {/* Center Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-2xl font-black bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent ${montserrat.className}`}>
          231h
        </span>
        <span className={`text-xs text-gray-600 font-medium ${poppins.className}`}>
          Total
        </span>
      </div>
    </div>
  );
};

// Sparkline Component
interface SparklineProps {
  data: number[];
  color?: string;
}

const Sparkline = ({ data, color = "#10b981" }: SparklineProps) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((value - min) / range) * 100;
    return `${x},${y}`;
  }).join(' ');

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
          const x = (index / (data.length - 1)) * 100;
          const y = 100 - ((value - min) / range) * 100;
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
          );
        })}
      </svg>
    </div>
  );
};


// Grade Component
interface GradeIndicatorProps {
  grade: string;
  score: number;
}

const GradeIndicator = ({ grade, score }: GradeIndicatorProps) => {
  const getGradeColor = (grade: string) => {
    const colors: Record<string, string> = {
      'A+': 'bg-green-500',
      'A': 'bg-green-400',
      'A-': 'bg-lime-400',
      'B+': 'bg-yellow-400',
      'B': 'bg-yellow-300',
      'B-': 'bg-orange-400',
      'C+': 'bg-orange-300',
      'C': 'bg-red-400'
    };
    return colors[grade] || 'bg-gray-400';
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`w-8 h-8 ${getGradeColor(grade)} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
        {grade}
      </div>
      <span className="text-xs text-gray-600">{score}%</span>
    </div>
  );
};



export default function CertificatePage() {
  const [showBack, setShowBack] = useState(false);

  const handlePrint = () => {
    // Set up print styles for A4 landscape
    const printStyles = `
      <style>
        @page {
          size: A4 landscape;
          margin: 8mm;
        }

        @media print {
          body {
            -webkit-print-color-adjust: exact;
            color-adjust: exact;
            print-color-adjust: exact;
          }

          .print\\:hidden {
            display: none !important;
          }

          .a4-landscape {
            width: 297mm;
            height: 210mm;
            box-shadow: none !important;
            margin: 0;
            transform: none !important;
          }

          .certificate-content {
            padding: 8mm;
          }
        }
      </style>
    `;

    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      const certificateElement = document.querySelector('.a4-landscape');

      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Certificate - ${studentData.name}</title>
            <script src="https://cdn.tailwindcss.com"></script>
            ${printStyles}
          </head>
          <body>
            ${certificateElement?.outerHTML || ''}
          </body>
        </html>
      `);

      printWindow.document.close();

      // Wait for content to load then print
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
        }, 100);
      };
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
      {/* Control Buttons */}
      <div className="fixed z-10 flex gap-2 top-4 right-4 print:hidden">
        <button
          onClick={() => setShowBack(!showBack)}
          className="flex items-center gap-2 px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          {showBack ? 'Lihat Depan' : 'Lihat Belakang'}
        </button>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700"
        >
          <Printer className="w-4 h-4" />
          Print A4
        </button>
      </div>

      {/* A4 Landscape Certificate Container */}
      <div className="overflow-hidden bg-white rounded-lg shadow-2xl a4-landscape">
        <div className="relative certificate-content">
          {/* Single Decorative Border */}
          <div className="absolute border-4 border-black pointer-events-none inset-6 rounded-3xl"></div>

          {!showBack ? (
            // Certificate Front - A4 Landscape Layout
            <div className="relative z-10 flex flex-col justify-between h-full p-8">
              {/* Header with Badge */}
              <div className="flex flex-col items-center mt-4 ">
                <div className="relative mb-2">
                  {/* Import the certificate badge image */}
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
                    Backend Developer I
                  </h1>
                </div>

                {/* Recipient Section */}
                <div className="mb-2 text-center">
                  <p className="mb-1 text-base text-gray-600">ISSUED TO</p>
                  <h2 className={`text-5xl font-bold text-gray-900 mb-2 ${montserrat.className}`}>
                    Dhia Daifullah
                  </h2>
                </div>

                {/* Description */}
                <div className="max-w-2xl mx-auto mb-2 text-center">
                  <p className={`text-gray-700 text-lg leading-relaxed ${openSans.className}`}>
                    The bearer of this professional certificate has demonstrated a fundamental
                    level of Backend Development mastery and passed the core competencies for each
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
                  <p className={`text-xs text-gray-600 ${poppins.className}`}>Founders, Uxcel</p>
                </div>

                {/* Center Logo */}
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center w-10 h-10 mb-2 bg-gray-900 rounded-full">
                    <span className="text-sm font-bold text-white">ux</span>
                  </div>
                  <p className={`text-xs text-gray-600 font-medium ${poppins.className}`}>uxcel</p>
                </div>

                {/* Date and QR */}
                <div className="flex flex-col items-end">
                  <div className="flex items-center justify-center w-12 h-12 mb-2 bg-gray-200">
                    <div className="w-10 h-10 bg-gray-800">
                      <div className="grid grid-cols-4 gap-px p-1">
                        {Array.from({ length: 16 }, (_, i) => (
                          <div
                            key={i}
                            className={`w-0.5 h-0.5 ${Math.random() > 0.5 ? "bg-white" : "bg-gray-800"
                              }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className={`text-right text-xs text-gray-600 ${poppins.className}`}>
                    <p>Issued: May 31, 2022</p>
                    <p>ID: 123Z353467</p>
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
                        Sertifikat Laboratorium, {studentData.name}
                      </h1>
                      <span className="text-lg">🤝</span>
                    </div>
                    <p className={`text-gray-600 text-sm mb-2 ${openSans.className}`}>
                      {studentData.subtitle}
                    </p>
                    <p className={`text-sm font-semibold text-gray-800 ${montserrat.className}`}>
                      {studentData.program}
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
                      <p>Diterbitkan: {studentData.issueDate}</p>
                      <p>ID: {studentData.verificationId}</p>
                    </div>
                  </div>
                </div>

                {/* Technology Tags with Grade */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {studentData.technologies.map((tech, index) => (
                      <div key={index} className={`px-3 py-1 text-sm font-medium rounded-full border ${getRandomBadgeColor()} ${poppins.className} transition-all duration-200 hover:scale-105`}>
                        {tech}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm text-gray-600 ${poppins.className}`}>Nilai Keseluruhan:</span>
                    <div className="flex items-center justify-center w-6 h-6 text-sm font-bold text-white bg-green-500 rounded-full">
                      {studentData.grades.overall}
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Stats Grid */}
              <div className="relative z-10 grid grid-cols-6 gap-4 mb-6">
                {[
                  { icon: Monitor, label: "Pertemuan", value: studentData.stats.meetings, bgColor: "#3b82f6" },
                  { icon: Lightbulb, label: "Nilai", value: studentData.stats.totalScore, bgColor: "#06b6d4", sparkline: true },
                  { icon: Clock, label: "Materi", value: studentData.stats.materials, bgColor: "#f97316" },
                  { icon: Calendar, label: "Kehadiran", value: `${studentData.stats.attendanceRate}%`, bgColor: "#22c55e" },
                  { icon: CheckCircle, label: "Tugas", value: `${studentData.stats.assignmentCompletion}%`, bgColor: "#a855f7" },
                  { icon: Users, label: "Partisipasi", value: `${studentData.stats.participationScore}%`, bgColor: "#ec4899" }
                ].map((stat, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded-lg flex items-center justify-center mb-1" style={{ backgroundColor: stat.bgColor }}>
                      <stat.icon className="w-3 h-3 text-white" />
                    </div>
                    <div className="text-center">
                      <p className={`text-xs font-bold text-gray-900 ${montserrat.className}`}>{stat.value}</p>
                      <p className={`text-xs text-gray-600 ${poppins.className}`}>{stat.label}</p>
                      {stat.sparkline && (
                        <Sparkline data={studentData.learningTime.weeklyData.slice(0, 5)} color="#06b6d4" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Main Content Grid */}
              <div className="relative z-10 grid flex-grow grid-cols-12 gap-5">
                {/* Left Column - Competencies with Skill Levels */}
                <div className="col-span-7">
                  <div className="flex items-center gap-2 mb-4">
                    <BarChart3 className="w-5 h-5 text-gray-700" />
                    <h3 className={`text-base font-black text-gray-800 ${montserrat.className}`}>
                      Penguasaan Kompetensi
                    </h3>
                  </div>

                  <div className="space-y-2">
                    {studentData.competencies.map((competency, index) => (
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
                            <span className={`text-xs px-2 py-0.5 rounded-full ${competency.level === 'Expert' ? 'bg-green-100 text-green-700' :
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
                      {studentData.grades.breakdown.map((grade, index) => (
                        <div key={index} className="flex items-center justify-between p-2 rounded bg-gray-50">
                          <span className={`text-xs text-gray-700 ${poppins.className}`}>{grade.subject}</span>
                          <GradeIndicator grade={grade.grade} score={grade.score} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Center Column - Analytics */}
                <div className="col-span-3">
                  <div className="flex items-center gap-2 mb-4">
                    <Activity className="w-5 h-5 text-emerald-600" />
                    <h3 className={`text-base font-black text-emerald-700 ${montserrat.className}`}>Analitik Pembelajaran</h3>
                  </div>

                  {/* Learning Velocity */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm text-gray-600 ${poppins.className}`}>Kecepatan Belajar</span>
                      <span className={`text-sm font-bold text-emerald-600 ${montserrat.className}`}>{studentData.analytics.learningVelocity}%</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full">
                      <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600" style={{ width: `${studentData.analytics.learningVelocity}%` }} />
                    </div>
                  </div>

                  {/* Problem Solving Efficiency */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm text-gray-600 ${poppins.className}`}>Pemecahan Masalah</span>
                      <span className={`text-sm font-bold text-blue-600 ${montserrat.className}`}>{studentData.analytics.problemSolvingEfficiency}%</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full">
                      <div className="h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-600" style={{ width: `${studentData.analytics.problemSolvingEfficiency}%` }} />
                    </div>
                  </div>

                  {/* Collaboration Score */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm text-gray-600 ${poppins.className}`}>Kolaborasi</span>
                      <span className={`text-sm font-bold text-purple-600 ${montserrat.className}`}>{studentData.analytics.collaborationScore}%</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full">
                      <div className="h-full rounded-full bg-gradient-to-r from-purple-400 to-purple-600" style={{ width: `${studentData.analytics.collaborationScore}%` }} />
                    </div>
                  </div>

                </div>

                {/* Right Column - Time & Performance Summary */}
                <div className="col-span-2">
                  {/* Time Tracking */}
                  <div className="mb-4 text-center">
                    <h3 className={`text-sm font-black text-gray-800 mb-2 ${montserrat.className}`}>Waktu Belajar</h3>
                    <div className="flex justify-center">
                      <CleanCircularProgress percentage={100} size={80} />
                    </div>
                    <div className="mt-2 flex flex-col items-center">
                      <p className={`text-sm font-black bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent ${montserrat.className}`}>
                        {studentData.learningTime.total}
                      </p>
                      <div className="flex justify-center">
                        <Sparkline data={studentData.learningTime.weeklyData} color="#10b981" />
                      </div>
                    </div>
                  </div>

                  {/* Performance Summary */}
                  <div className="mb-4">
                    <h4 className={`text-sm font-bold text-gray-800 mb-2 ${montserrat.className}`}>Ringkasan Performa</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 rounded bg-green-50">
                        <span className={`text-sm text-green-700 ${poppins.className}`}>Nilai Keseluruhan</span>
                        <div className="flex items-center justify-center w-6 h-6 text-sm font-bold text-white bg-green-500 rounded-full">
                          {studentData.grades.overall}
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded bg-blue-50">
                        <span className={`text-sm text-blue-700 ${poppins.className}`}>Kehadiran</span>
                        <span className={`text-sm font-bold text-blue-600 ${montserrat.className}`}>{studentData.stats.attendanceRate}%</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded bg-purple-50">
                        <span className={`text-sm text-purple-700 ${poppins.className}`}>Kelengkapan Lab</span>
                        <span className={`text-sm font-bold text-purple-600 ${montserrat.className}`}>{studentData.stats.assignmentCompletion}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div>
                    <h4 className={`text-sm font-bold text-gray-800 mb-2 ${montserrat.className}`}>Rekomendasi Lanjutan</h4>
                    <div className="space-y-2">
                      {studentData.futureRecommendations.map((rec, index) => (
                        <div key={index} className={`text-sm p-2 bg-blue-50 rounded text-blue-700 ${poppins.className}`}>
                          {rec === 'Advanced Microservices' ? 'Microservices Lanjutan' :
                           rec === 'Cloud Architecture' ? 'Arsitektur Cloud' :
                           rec === 'DevOps Practices' ? 'Praktik DevOps' : rec}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer with Instructor Feedback */}
              <div className="relative z-10 p-4 mt-4 rounded bg-gray-50">
                <h4 className={`text-sm font-bold text-gray-800 mb-2 ${montserrat.className}`}>Umpan Balik Instruktur</h4>
                <p className={`text-sm text-gray-700 italic ${openSans.className}`}>{studentData.instructorFeedback}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* A4 Print Styles */}
      <style jsx global>{`
        .a4-landscape {
          width: 297mm;
          height: 210mm;
          max-width: 297mm;
          max-height: 210mm;
          margin: 0 auto;
          position: relative;
          box-sizing: border-box;
        }

        .certificate-content {
          width: 100%;
          height: 100%;
          padding: 10mm;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        @media print {
          body {
            margin: 0;
            padding: 0;
            background: white !important;
          }

          .a4-landscape {
            width: 297mm;
            height: 210mm;
            box-shadow: none !important;
            margin: 0;
            page-break-after: always;
          }

          .certificate-content {
            padding: 8mm;
          }

          .print\\:hidden {
            display: none !important;
          }
        }

        @media screen {
          .a4-landscape {
            transform: scale(0.8);
            transform-origin: center;
          }
        }

        @media screen and (max-width: 1400px) {
          .a4-landscape {
            transform: scale(0.6);
          }
        }

        @media screen and (max-width: 1000px) {
          .a4-landscape {
            transform: scale(0.5);
          }
        }

        @keyframes flowEffect {
          0% { transform: translateX(-100%) skewX(-12deg); }
          50% { transform: translateX(0%) skewX(-12deg); }
          100% { transform: translateX(100%) skewX(-12deg); }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
