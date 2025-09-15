"use client";

import { Montserrat, Poppins, Open_Sans } from "next/font/google";
import { Monitor, Lightbulb, Clock, Users, Calendar, CheckCircle, BarChart3, Activity } from "lucide-react";

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

interface BackCertificateProps {
  studentData: {
    name: string;
    program: string;
    subtitle: string;
    issueDate: string;
    verificationId: string;
    stats: {
      meetings: number;
      totalScore: number;
      materials: number;
      attendanceRate: number;
      assignmentCompletion: number;
      participationScore: number;
    };
    grades: {
      overall: string;
      breakdown: Array<{
        subject: string;
        grade: string;
        score: number;
      }>;
    };
    learningTime: {
      hours: number;
      minutes: number;
      total: string;
      weeklyData: number[];
    };
    analytics: {
      learningVelocity: number;
      collaborationScore: number;
      problemSolvingEfficiency: number;
    };
    competencies: Array<{
      name: string;
      value: number;
      startColor: string;
      endColor: string;
      level: string;
    }>;
    technologies: string[];
    instructorFeedback: string;
    futureRecommendations: string[];
  };
}

export default function BackCertificate({ studentData }: BackCertificateProps) {
  return (
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

          <div className="space-y-3">
            {studentData.competencies.map((competency, index) => (
              <div key={index} className="group relative hover:scale-[1.01] transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{
                      background: `linear-gradient(90deg, ${competency.startColor} 0%, ${competency.endColor} 100%)`
                    }} />
                    <span className={`text-sm font-medium text-gray-800 ${poppins.className}`}>
                      {competency.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-3 py-1 rounded-full ${
                      competency.level === 'Expert' ? 'bg-green-100 text-green-700' :
                      competency.level === 'Advanced' ? 'bg-blue-100 text-blue-700' :
                      competency.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    } ${poppins.className}`}>
                      {competency.level === 'Expert' ? 'Ahli' :
                       competency.level === 'Advanced' ? 'Mahir' :
                       competency.level === 'Intermediate' ? 'Menengah' : 'Pemula'}
                    </span>
                    <span className={`text-sm font-bold text-gray-900 ${montserrat.className}`}>
                      {competency.value}%
                    </span>
                  </div>
                </div>
                <div className="relative h-3 overflow-hidden bg-gray-200 rounded-full">
                  <div className="h-full transition-all duration-1000 ease-out rounded-full" style={{
                    background: `linear-gradient(90deg, ${competency.startColor} 0%, ${competency.endColor} 100%)`,
                    width: `${competency.value}%`
                  }} />
                </div>
              </div>
            ))}
          </div>

          {/* Grade Breakdown */}
          <div className="mt-6">
            <h4 className={`text-sm font-bold text-gray-800 mb-3 ${montserrat.className}`}>Rincian Nilai</h4>
            <div className="grid grid-cols-2 gap-3">
              {studentData.grades.breakdown.map((grade, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded bg-gray-50">
                  <span className={`text-sm text-gray-700 ${poppins.className}`}>
                    {grade.subject === 'Praktikum Backend' ? 'Praktikum Backend' :
                     grade.subject === 'Database Design' ? 'Desain Database' :
                     grade.subject === 'API Development' ? 'Pengembangan API' :
                     grade.subject === 'Server Management' ? 'Manajemen Server' : grade.subject}
                  </span>
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
  );
}