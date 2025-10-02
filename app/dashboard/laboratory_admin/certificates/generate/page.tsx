"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import * as XLSX from "xlsx";
import {
  Printer,
  Eye,
  FileSpreadsheet,
  Download,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  AlertTriangle,
} from "lucide-react";
import Image from "next/image";
import { Montserrat, Poppins, Open_Sans } from "next/font/google";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "@/components/ui/alert";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";

// Fonts
const montserrat = Montserrat({ weight: ["700", "800", "900"], subsets: ["latin"] });
const poppins = Poppins({ weight: ["300", "400", "600"], subsets: ["latin"] });
const openSans = Open_Sans({ weight: ["400", "500"], subsets: ["latin"] });

// Helpers for auto-generated fields
function formatIssueDate(date: Date = new Date()) {
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function generateVerificationId(program?: string) {
  const now = new Date();
  const y = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const prog = (program || "GEN")
    .replace(/[^A-Za-z0-9 ]/g, " ")
    .trim()
    .split(/\s+/)
    .map((s) => s[0]?.toUpperCase() || "")
    .join("")
    .slice(0, 4) || "GEN";
  const rand = Math.random().toString(36).toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 4);
  return `CERT-${y}${mm}${dd}-${prog}-${rand}`;
}

// Fallback sample data
const defaultStudentData = {
  certificateTitle: "Nama Sertifikat",
  name: "Nama Peserta",
  program: "Nama Program",
  subtitle: "Subjudul Sertifikat",
  issueDate: "00 Bulan 0000",
  verificationId: "CERT-2024-NJS-001234",
  stats: {
    meetings: 0,
    totalScore: 0,
    materials: 0,
    attendanceRate: 0,
    assignmentCompletion: 0,
    participationScore: 0,
  },
  grades: {
    overall: "A",
    breakdown: [
      { subject: "Praktikum Backend", grade: "A+", score: 95 },
      { subject: "Database Design", grade: "A", score: 90 },
      { subject: "API Development", grade: "A-", score: 87 },
      { subject: "Server Management", grade: "B+", score: 85 },
    ],
  },
  learningTime: {
    hours: 231,
    minutes: 14,
    total: "231h 14m",
    weeklyData: [45, 52, 38, 61, 47, 55, 43, 38, 52, 45],
  },
  achievements: [],
  analytics: {
    learningVelocity: 85,
    collaborationScore: 78,
    problemSolvingEfficiency: 92,
    peakHours: "14:00 - 16:00",
    streakDays: 23,
    leaderboardPosition: 3,
    totalStudents: 45,
  },
  competencies: [
    {
      name: "Keterampilan Pemrograman (KP)",
      value: 35,
      startColor: "#3b82f6",
      endColor: "#1d4ed8",
      shadowColor: "rgba(59,130,246,0.4)",
      bgColor: "#3b82f6",
      level: "Expert",
    },
    {
      name: "Kemampuan Analisis dan Evaluasi (KAE)",
      value: 30,
      startColor: "#06b6d4",
      endColor: "#0891b2",
      shadowColor: "rgba(6,182,212,0.4)",
      bgColor: "#06b6d4",
      level: "Advanced",
    },
    {
      name: "Kreativitas dalam Pemecahan Masalah (KPM)",
      value: 25,
      startColor: "#10b981",
      endColor: "#059669",
      shadowColor: "rgba(16,185,129,0.4)",
      bgColor: "#10b981",
      level: "Advanced",
    },
    {
      name: "Keterampilan Komunikasi (KK)",
      value: 20,
      startColor: "#6b7280",
      endColor: "#4b5563",
      shadowColor: "rgba(107,114,128,0.4)",
      bgColor: "#6b7280",
      level: "Intermediate",
    },
    {
      name: "Etika dan Komunikasi Profesional",
      value: 15,
      startColor: "#ef4444",
      endColor: "#dc2626",
      shadowColor: "rgba(239,68,68,0.4)",
      bgColor: "#ef4444",
      level: "Intermediate",
    },
    {
      name: "Kerja Tim",
      value: 10,
      startColor: "#f97316",
      endColor: "#ea580c",
      shadowColor: "rgba(249,115,22,0.4)",
      bgColor: "#f97316",
      level: "Beginner",
    },
  ],
  technologies: ["Typescript", "NodeJS", "Docker", "PostgreSQL"],
  instructorFeedback:
    "Menunjukkan pemahaman yang sangat baik dalam pengembangan backend dan kemampuan problem-solving yang excellent.",
  futureRecommendations: [
    "Advanced Microservices",
    "Cloud Architecture",
    "DevOps Practices",
  ],
};

type StudentDataType = typeof defaultStudentData;

interface StudentRowRaw {
  [key: string]: any;
  certificateTitle?: string;
  name?: string;
  program?: string;
  subtitle?: string;
  issueDate?: string;
  verificationId?: string;
  meetings?: any;
  totalScore?: any;
  materials?: any;
  attendanceRate?: any;
  assignmentCompletion?: any;
  participationScore?: any;
  overallGrade?: string;
  gradesBreakdown?: string;
  competencies?: string;
  weeklyData?: string;
  technologies?: string;
  instructorFeedback?: string;
  futureRecommendations?: string;
}

function safeParseJSON<T>(value: any, fallback: T): T {
  if (typeof value !== "string") return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}
const toNumber = (v: any, fb = 0) => {
  if (v === undefined || v === null || v === "") return fb;
  const n = Number(v);
  return isNaN(n) ? fb : n;
};

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
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

function safeParseJSONWithWarning<T>(
  value: any,
  fallback: T,
  field: string,
  rowIdx: number,
  warnings: string[]
): T {
  if (typeof value !== "string" || value.trim() === "") return fallback;
  try {
    return JSON.parse(value);
  } catch {
    warnings.push(`Row ${rowIdx + 1}: kolom "${field}" bukan JSON valid.`);
    return fallback;
  }
}

function buildRowMapper(warningsRef: string[]) {
  return function mapRowToStudentWithWarn(
    row: StudentRowRaw,
    rowIdx: number
  ): StudentDataType {
    const gradesBreakdown = safeParseJSONWithWarning(
      row.gradesBreakdown,
      defaultStudentData.grades.breakdown,
      "gradesBreakdown",
      rowIdx,
      warningsRef
    );
    const competencies = safeParseJSONWithWarning(
      row.competencies,
      defaultStudentData.competencies,
      "competencies",
      rowIdx,
      warningsRef
    );
    const weeklyData = safeParseJSONWithWarning(
      row.weeklyData,
      defaultStudentData.learningTime.weeklyData,
      "weeklyData",
      rowIdx,
      warningsRef
    );
    const technologies =
      typeof row.technologies === "string"
        ? row.technologies
            .split(/[,;]/)
            .map((s) => s.trim())
            .filter(Boolean)
        : defaultStudentData.technologies;
    const futureRecommendations =
      typeof row.futureRecommendations === "string"
        ? row.futureRecommendations
            .split(/[,;]/)
            .map((s) => s.trim())
            .filter(Boolean)
        : defaultStudentData.futureRecommendations;

    return {
      ...defaultStudentData,
      certificateTitle:
        row.certificateTitle || row.program || defaultStudentData.certificateTitle,
      name: row.name || defaultStudentData.name,
      program: row.program || defaultStudentData.program,
      subtitle: row.subtitle || defaultStudentData.subtitle,
      // System generated (ignore values from Excel)
      issueDate: formatIssueDate(),
      verificationId: generateVerificationId(row.program || row.certificateTitle),
      stats: {
        meetings: toNumber(row.meetings, defaultStudentData.stats.meetings),
        totalScore: toNumber(row.totalScore, defaultStudentData.stats.totalScore),
        materials: toNumber(row.materials, defaultStudentData.stats.materials),
        attendanceRate: toNumber(
          row.attendanceRate,
          defaultStudentData.stats.attendanceRate
        ),
        assignmentCompletion: toNumber(
          row.assignmentCompletion,
          defaultStudentData.stats.assignmentCompletion
        ),
        participationScore: toNumber(
          row.participationScore,
          defaultStudentData.stats.participationScore
        ),
      },
      grades: {
        overall: row.overallGrade || defaultStudentData.grades.overall,
        breakdown: gradesBreakdown as any,
      },
      learningTime: {
        ...defaultStudentData.learningTime,
        weeklyData: Array.isArray(weeklyData)
          ? weeklyData
          : defaultStudentData.learningTime.weeklyData,
        total: `${defaultStudentData.learningTime.hours}h ${defaultStudentData.learningTime.minutes}m`,
      },
      competencies: competencies as any,
      technologies,
      instructorFeedback:
        row.instructorFeedback || defaultStudentData.instructorFeedback,
      futureRecommendations,
    } as StudentDataType;
  };
}

function GradeIndicator({
  grade,
  score,
}: {
  grade: string;
  score: number;
}) {
  const colors: Record<string, string> = {
    "A+": "bg-green-500",
    A: "bg-green-400",
    "A-": "bg-lime-400",
    "B+": "bg-yellow-400",
    B: "bg-yellow-300",
    "B-": "bg-orange-400",
    "C+": "bg-orange-300",
    C: "bg-red-400",
  };
  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-8 h-8 ${
          colors[grade] || "bg-gray-400"
        } rounded-full flex items-center justify-center text-white font-bold text-sm`}
      >
        {grade}
      </div>
      <span className="text-xs text-gray-600">{score}%</span>
    </div>
  );
}

function CertificateFront({
  studentData,
}: {
  studentData: StudentDataType;
}) {
  return (
    <div className="relative z-10 flex flex-col justify-between h-full p-8">
      <div className="flex flex-col items-center mt-4">
        <div className="relative mb-2">
          <div className="relative w-80 h-56">
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
      <div className="flex flex-col justify-center flex-grow">
        <div className="mb-2 text-center">
          <p
            className={`text-gray-600 text-sm font-light tracking-widest mb-1 ${poppins.className}`}
          >
            PROFESSIONAL CERTIFICATION
          </p>
          <h1
            className={`text-5xl font-black text-gray-900 mb-2 ${montserrat.className}`}
          >
            {studentData.certificateTitle || studentData.program}
          </h1>
        </div>
        <div className="mb-2 text-center">
          <p className="mb-1 text-base text-gray-600">ISSUED TO</p>
          <h2
            className={`text-4xl font-bold text-gray-900 mb-2 ${montserrat.className}`}
          >
            {studentData.name}
          </h2>
        </div>
        <div className="max-w-2xl mx-auto mb-2 text-center">
          <p
            className={`text-gray-700 text-base leading-relaxed ${openSans.className}`}
          >
            The bearer of this professional certificate has demonstrated a
            fundamental level of Backend Development mastery and passed the
            core competencies for each programming specialty in laboratory
            practices.
          </p>
        </div>
      </div>
      <div className="flex items-end justify-between mt-auto">
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
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center w-10 h-10 mb-2 bg-gray-900 rounded-full">
            <span className="text-sm font-bold text-white">ux</span>
          </div>
          <p className={`text-xs text-gray-600 font-medium ${poppins.className}`}>uxcel</p>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center justify-center w-12 h-12 mb-2 bg-gray-200">
            <div className="w-10 h-10 bg-gray-800">
              <div className="grid grid-cols-4 gap-px p-1">
                {Array.from({ length: 16 }, (_, i) => (
                  <div
                    key={i}
                    className={`w-0.5 h-0.5 ${
                      Math.random() > 0.5 ? "bg-white" : "bg-gray-800"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          <div
            className={`text-right text-xs text-gray-600 ${poppins.className}`}
          >
            <p>Issued: {studentData.issueDate}</p>
            <p>ID: {studentData.verificationId}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Sparkline({
  data,
  color = "#10b981",
}: {
  data: number[];
  color?: string;
}) {
  if (!Array.isArray(data) || !data.length) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - ((v - min) / range) * 100;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <div className="relative w-16 h-8">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        className="overflow-visible"
      >
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {data.map((v, i) => {
          const x = (i / (data.length - 1)) * 100;
          const y = 100 - ((v - min) / range) * 100;
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="2"
              fill={color}
              className="animate-pulse"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          );
        })}
      </svg>
    </div>
  );
}

function CertificateBack({
  studentData,
}: {
  studentData: StudentDataType;
}) {
  return (
    <div className="relative flex flex-col h-full overflow-hidden p-8">
      <div className="absolute inset-8 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #6b7280 1px, transparent 0)",
            backgroundSize: "20px 20px",
          }}
        />
      </div>
      <div className="relative z-10 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h1
                className={`text-lg font-bold text-gray-900 ${montserrat.className}`}
              >
                Sertifikat Laboratorium, {studentData.name}
              </h1>
            </div>
            <p
              className={`text-gray-600 text-sm mb-2 ${openSans.className}`}
            >
              {studentData.subtitle}
            </p>
            <p
              className={`text-sm font-semibold text-gray-800 ${montserrat.className}`}
            >
              {studentData.program}
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-center w-12 h-12 mb-2 bg-gray-800 rounded">
              <div className="grid grid-cols-4 gap-px p-1">
                {Array.from({ length: 16 }, (_, i) => (
                  <div
                    key={i}
                    className={`w-0.5 h-0.5 ${
                      Math.random() > 0.5 ? "bg-white" : "bg-gray-800"
                    }`}
                  />
                ))}
              </div>
            </div>
            <div
              className={`text-xs text-gray-600 ${poppins.className}`}
            >
              <p>Diterbitkan: {studentData.issueDate}</p>
              <p>ID: {studentData.verificationId}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            {studentData.technologies.map((tech, i) => (
              <div
                key={i}
                className={`px-3 py-1 text-sm font-medium rounded-full border ${getRandomBadgeColor()} ${poppins.className}`}
              >
                {tech}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-sm text-gray-600 ${poppins.className}`}>
              Nilai Keseluruhan:
            </span>
            <div className="flex items-center justify-center w-6 h-6 text-sm font-bold text-white bg-green-500 rounded-full">
              {studentData.grades.overall}
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-10 grid grid-cols-6 gap-4 mb-6">
        {[
          {
            label: "Pertemuan",
            value: studentData.stats.meetings,
            bgColor: "#3b82f6",
          },
          {
            label: "Nilai",
            value: studentData.stats.totalScore,
            bgColor: "#06b6d4",
            sparkline: true,
          },
          { label: "Materi", value: studentData.stats.materials, bgColor: "#f97316" },
          {
            label: "Kehadiran",
            value: `${studentData.stats.attendanceRate}%`,
            bgColor: "#22c55e",
          },
            {
            label: "Tugas",
            value: `${studentData.stats.assignmentCompletion}%`,
            bgColor: "#a855f7",
          },
          {
            label: "Partisipasi",
            value: `${studentData.stats.participationScore}%`,
            bgColor: "#ec4899",
          },
        ].map((s, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-center"
          >
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center mb-1"
              style={{ backgroundColor: s.bgColor }}
            >
              <span className="text-[10px] text-white font-semibold">
                {s.label[0]}
              </span>
            </div>
            <p
              className={`text-xs font-bold text-gray-900 ${montserrat.className}`}
            >
              {s.value}
            </p>
            <p
              className={`text-[10px] text-gray-600 ${poppins.className}`}
            >
              {s.label}
            </p>
            {/* {s.sparkline && (
              <Sparkline data={studentData.learningTime.weeklyData.slice(0, 5)} />
            )} */}
          </div>
        ))}
      </div>
      <div className="relative z-10 grid flex-grow grid-cols-12 gap-5">
        <div className="col-span-7">
          <div className="flex items-center gap-2 mb-4">
            <h3
              className={`text-base font-black text-gray-800 ${montserrat.className}`}
            >
              Penguasaan Kompetensi
            </h3>
          </div>
          <div className="space-y-2">
            {studentData.competencies.map((c: any, i: number) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${c.startColor} 0%, ${c.endColor} 100%)`,
                      }}
                    />
                    <span
                      className={`text-xs font-medium text-gray-800 ${poppins.className}`}
                    >
                      {c.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        c.level === "Expert"
                          ? "bg-green-100 text-green-700"
                          : c.level === "Advanced"
                          ? "bg-blue-100 text-blue-700"
                          : c.level === "Intermediate"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                      } ${poppins.className}`}
                    >
                      {c.level}
                    </span>
                    <span
                      className={`text-xs font-bold text-gray-900 ${montserrat.className}`}
                    >
                      {c.value}%
                    </span>
                  </div>
                </div>
                <div className="relative h-2 overflow-hidden bg-gray-200 rounded-full">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${c.value}%`,
                      background: `linear-gradient(90deg, ${c.startColor} 0%, ${c.endColor} 100%)`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3">
            <h4
              className={`text-xs font-bold text-gray-800 mb-2 ${montserrat.className}`}
            >
              Grade Breakdown
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {studentData.grades.breakdown.map((g: any, i: number) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2 rounded bg-gray-50"
                >
                  <span className={`text-xs text-gray-700 ${poppins.className}`}>
                    {g.subject}
                  </span>
                  <GradeIndicator grade={g.grade} score={g.score} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-3">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm text-gray-600 ${poppins.className}`}>
                Kecepatan Belajar
              </span>
              <span
                className={`text-sm font-bold text-emerald-600 ${montserrat.className}`}
              >
                {studentData.analytics.learningVelocity}%
              </span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600"
                style={{ width: `${studentData.analytics.learningVelocity}%` }}
              />
            </div>
          </div>
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm text-gray-600 ${poppins.className}`}>
                Problem Solving
              </span>
              <span
                className={`text-sm font-bold text-blue-600 ${montserrat.className}`}
              >
                {studentData.analytics.problemSolvingEfficiency}%
              </span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-600"
                style={{
                  width: `${studentData.analytics.problemSolvingEfficiency}%`,
                }}
              />
            </div>
          </div>
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm text-gray-600 ${poppins.className}`}>
                Kolaborasi
              </span>
              <span
                className={`text-sm font-bold text-purple-600 ${montserrat.className}`}
              >
                {studentData.analytics.collaborationScore}%
              </span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full">
              <div
                className="h-full rounded-full bg-gradient-to-r from-purple-400 to-purple-600"
                style={{
                  width: `${studentData.analytics.collaborationScore}%`,
                }}
              />
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <div className="mb-4 text-center">
            <h3
              className={`text-sm font-black text-gray-800 mb-2 ${montserrat.className}`}
            >
              Waktu Belajar
            </h3>
            <div className="flex flex-col items-center">
              <p
                className={`text-sm font-black bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent ${montserrat.className}`}
              >
                {studentData.learningTime.total}
              </p>
              <Sparkline data={studentData.learningTime.weeklyData} />
            </div>
          </div>
          <div className="mb-4">
            <h4
              className={`text-sm font-bold text-gray-800 mb-2 ${montserrat.className}`}
            >
              Ringkasan Performa
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 rounded bg-green-50">
                <span className={`text-sm text-green-700 ${poppins.className}`}>
                  Nilai
                </span>
                <div className="flex items-center justify-center w-6 h-6 text-sm font-bold text-white bg-green-500 rounded-full">
                  {studentData.grades.overall}
                </div>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-blue-50">
                <span className={`text-sm text-blue-700 ${poppins.className}`}>
                  Kehadiran
                </span>
                <span
                  className={`text-sm font-bold text-blue-600 ${montserrat.className}`}
                >
                  {studentData.stats.attendanceRate}%
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-purple-50">
                <span className={`text-sm text-purple-700 ${poppins.className}`}>
                  Tugas
                </span>
                <span
                  className={`text-sm font-bold text-purple-600 ${montserrat.className}`}
                >
                  {studentData.stats.assignmentCompletion}%
                </span>
              </div>
            </div>
          </div>
          <div>
            <h4
              className={`text-sm font-bold text-gray-800 mb-2 ${montserrat.className}`}
            >
              Rekomendasi
            </h4>
            <div className="space-y-2">
              {studentData.futureRecommendations.map((rec, i) => (
                <div
                  key={i}
                  className={`text-sm p-2 bg-blue-50 rounded text-blue-700 ${poppins.className}`}
                >
                  {rec}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-10 p-4 mt-4 rounded bg-gray-50">
        <h4
          className={`text-sm font-bold text-gray-800 mb-2 ${montserrat.className}`}
        >
          Umpan Balik Instruktur
        </h4>
        <p
          className={`text-sm text-gray-700 italic ${openSans.className}`}
        >
          {studentData.instructorFeedback}
        </p>
      </div>
    </div>
  );
}

export default function GenerateCertificatesPage() {
  const [records, setRecords] = useState<StudentDataType[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [error, setError] = useState<string | undefined>();
  const [uploading, setUploading] = useState(false);
  const [zoom, setZoom] = useState(0.5);
  const [autoFit, setAutoFit] = useState(true);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const previewContainerRef = useRef<HTMLDivElement | null>(null);
  const activeStudent = records[selectedIndex] || defaultStudentData;

  // Auto fit certificate preview to container width
  useEffect(() => {
    if (!autoFit) return;
    const el = previewContainerRef.current;
    if (!el) return;
    const CERT_WIDTH_PX = 1123; // approx 297mm in px at 96dpi
    const handle = () => {
      const available = el.clientWidth - 24; // padding / scrollbar allowance
      let s = available / CERT_WIDTH_PX;
      s = Math.min(1, Math.max(0.25, s));
      setZoom(parseFloat(s.toFixed(2)));
    };
    handle();
    const ro = new ResizeObserver(handle);
    ro.observe(el);
    return () => ro.disconnect();
  }, [autoFit]);

  const reset = () => {
    setRecords([]);
    setSelectedIndex(0);
    setShowBack(false);
    setWarnings([]);
    setError(undefined);
    setUploadedFileName(null);
  };

  const processExcelFile = (file: File) => {
     setUploading(true);
     setError(undefined);
     setWarnings([]);
     const localWarnings: string[] = [];
     const reader = new FileReader();
     reader.onload = (evt) => {
       try {
         const data = new Uint8Array(evt.target?.result as ArrayBuffer);
         const wb = XLSX.read(data, { type: "array" });
         const sheet = wb.Sheets[wb.SheetNames[0]];
         if (!sheet) {
           setError("Sheet pertama tidak ditemukan.");
           setUploading(false);
           return;
         }
         const json: StudentRowRaw[] = XLSX.utils.sheet_to_json(sheet, {
           defval: "",
         });
         if (!json.length) {
           setError("File kosong atau format tidak sesuai.");
           setUploading(false);
           return;
         }
         const mapper = buildRowMapper(localWarnings);
         const mapped = json.map((row, idx) => mapper(row, idx));
         setRecords(mapped);
         setSelectedIndex(0);
         setWarnings(localWarnings);
        setUploadedFileName(file.name);
       } catch (err: any) {
         setError("Gagal membaca file: " + (err?.message || "unknown"));
       } finally {
         setUploading(false);
       }
     };
     reader.onerror = () => {
       setError("Tidak dapat membaca file.");
       setUploading(false);
     };
     reader.readAsArrayBuffer(file);
   };

  const handleExcelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processExcelFile(file);
  };

  const handleDownloadTemplate = () => {
    // issueDate & verificationId dihasilkan otomatis oleh sistem (tidak perlu di Excel)
    const headers = [
      "certificateTitle",
      "name",
      "program",
      "subtitle",
      "meetings",
      "totalScore",
      "materials",
      "attendanceRate",
      "assignmentCompletion",
      "participationScore",
      "overallGrade",
      "gradesBreakdown",
      "competencies",
      "weeklyData",
      "technologies",
      "instructorFeedback",
      "futureRecommendations",
    ];
    const example = [
      {
        certificateTitle: "Backend Developer I",
        name: "Nama Mahasiswa",
        program: "Backend Developer Nest JS",
        subtitle: "Atas keberhasilan menyelesaikan Laboratorium",
        meetings: 10,
        totalScore: 90,
        materials: 10,
        attendanceRate: 95,
        assignmentCompletion: 88,
        participationScore: 92,
        overallGrade: "A",
        gradesBreakdown: JSON.stringify(defaultStudentData.grades.breakdown),
        competencies: JSON.stringify(defaultStudentData.competencies),
        weeklyData: JSON.stringify(defaultStudentData.learningTime.weeklyData),
        technologies: defaultStudentData.technologies.join(","),
        instructorFeedback: defaultStudentData.instructorFeedback,
        futureRecommendations: defaultStudentData.futureRecommendations.join(","),
      },
    ];
    const ws = XLSX.utils.json_to_sheet(example, { header: headers });
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Template");
    XLSX.writeFile(wb, "template-sertifikat-lab.xlsx");
  };

  const handlePrint = () => {
    const printContent = document.getElementById('print-area');
    if (!printContent) {
      console.error('Print area not found');
      return;
    }
    
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      console.error('Cannot open print window');
      return;
    }
    
    // Clone dan proses konten
    const clonedContent = printContent.cloneNode(true) as HTMLElement;
    clonedContent.style.display = 'block';
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Print Certificate</title>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Open+Sans:wght@400;500&family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
              color-adjust: exact;
            }
            
            @page {
              size: A4 landscape;
              margin: 0;
            }
            
            body {
              margin: 0;
              padding: 0;
              background: white;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            }
            
            .hidden { display: none !important; }
            .print\\:block { display: block !important; }
            
            .a4-landscape {
              width: 297mm;
              height: 210mm;
              position: relative;
              page-break-after: always;
              page-break-inside: avoid;
              background: white;
              overflow: hidden;
            }
            
            .a4-landscape:last-child {
              page-break-after: auto;
            }
            
            .certificate-content {
              width: 100%;
              height: 100%;
              padding: 10mm;
              display: flex;
              flex-direction: column;
              position: relative;
            }
            
            /* Layout utilities */
            .relative { position: relative; }
            .absolute { position: absolute; }
            .inset-6 { top: 24px; right: 24px; bottom: 24px; left: 24px; }
            .z-10 { z-index: 10; }
            .flex { display: flex; }
            .flex-col { flex-direction: column; }
            .items-center { align-items: center; }
            .items-start { align-items: flex-start; }
            .items-end { align-items: flex-end; }
            .justify-center { justify-content: center; }
            .justify-between { justify-content: space-between; }
            .flex-grow { flex-grow: 1; }
            .gap-2 { gap: 0.5rem; }
            .gap-4 { gap: 1rem; }
            .gap-5 { gap: 1.25rem; }
            .grid { display: grid; }
            .grid-cols-6 { grid-template-columns: repeat(6, minmax(0, 1fr)); }
            .grid-cols-12 { grid-template-columns: repeat(12, minmax(0, 1fr)); }
            .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
            .grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
            .col-span-7 { grid-column: span 7 / span 7; }
            .col-span-3 { grid-column: span 3 / span 3; }
            .col-span-2 { grid-column: span 2 / span 2; }
            .space-y-2 > * + * { margin-top: 0.5rem; }
            .mx-auto { margin-left: auto; margin-right: auto; }
            .mt-4 { margin-top: 1rem; }
            .mt-auto { margin-top: auto; }
            .mt-3 { margin-top: 0.75rem; }
            .mb-1 { margin-bottom: 0.25rem; }
            .mb-2 { margin-bottom: 0.5rem; }
            .mb-4 { margin-bottom: 1rem; }
            .mb-6 { margin-bottom: 1.5rem; }
            .p-1 { padding: 0.25rem; }
            .p-2 { padding: 0.5rem; }
            .p-4 { padding: 1rem; }
            .p-8 { padding: 2rem; }
            .px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
            .px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
            .py-0\\.5 { padding-top: 0.125rem; padding-bottom: 0.125rem; }
            .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
            .text-center { text-align: center; }
            .text-right { text-align: right; }
            .text-left { text-align: left; }
            .max-w-2xl { max-width: 42rem; }
            
            /* Border utilities */
            .border-4 { border-width: 4px; }
            .border { border-width: 1px; }
            .border-black { border-color: #000; }
            .rounded-3xl { border-radius: 1.5rem; }
            .rounded-lg { border-radius: 0.5rem; }
            .rounded-md { border-radius: 0.375rem; }
            .rounded-full { border-radius: 9999px; }
            .rounded { border-radius: 0.25rem; }
            .overflow-hidden { overflow: hidden; }
            .overflow-visible { overflow: visible; }
            .overflow-auto { overflow: auto; }
            .pointer-events-none { pointer-events: none; }
            
            /* Typography */
            .text-6xl { font-size: 3.75rem; line-height: 1; }
            .text-5xl { font-size: 3rem; line-height: 1; }
            .text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
            .text-2xl { font-size: 1.5rem; line-height: 2rem; }
            .text-lg { font-size: 1.125rem; line-height: 1.75rem; }
            .text-base { font-size: 1rem; line-height: 1.5rem; }
            .text-sm { font-size: 0.875rem; line-height: 1.25rem; }
            .text-xs { font-size: 0.75rem; line-height: 1rem; }
            .text-\\[10px\\] { font-size: 10px; }
            .text-\\[11px\\] { font-size: 11px; }
            .font-black { font-weight: 900; }
            .font-bold { font-weight: 700; }
            .font-semibold { font-weight: 600; }
            .font-medium { font-weight: 500; }
            .font-light { font-weight: 300; }
            .italic { font-style: italic; }
            .leading-relaxed { line-height: 1.625; }
            .tracking-widest { letter-spacing: 0.1em; }
            .whitespace-nowrap { white-space: nowrap; }
            
            /* Colors */
            .text-gray-900 { color: #111827; }
            .text-gray-800 { color: #1f2937; }
            .text-gray-700 { color: #374151; }
            .text-gray-600 { color: #4b5563; }
            .text-white { color: #ffffff; }
            .text-green-700 { color: #15803d; }
            .text-green-600 { color: #16a34a; }
            .text-blue-700 { color: #1d4ed8; }
            .text-blue-600 { color: #2563eb; }
            .text-purple-700 { color: #6b21a1; }
            .text-purple-600 { color: #9333ea; }
            .text-amber-500 { color: #f59e0b; }
            .text-emerald-600 { color: #059669; }
            .text-yellow-700 { color: #a16207; }
            .text-transparent { color: transparent; }
            
            .bg-white { background-color: #ffffff; }
            .bg-gray-900 { background-color: #111827; }
            .bg-gray-800 { background-color: #1f2937; }
            .bg-gray-200 { background-color: #e5e7eb; }
            .bg-gray-50 { background-color: #f9fafb; }
            .bg-green-500 { background-color: #10b981; }
            .bg-green-400 { background-color: #4ade80; }
            .bg-green-100 { background-color: #dcfce7; }
            .bg-green-50 { background-color: #f0fdf4; }
            .bg-blue-100 { background-color: #dbeafe; }
            .bg-blue-50 { background-color: #eff6ff; }
            .bg-yellow-400 { background-color: #facc15; }
            .bg-yellow-300 { background-color: #fde047; }
            .bg-yellow-100 { background-color: #fef3c7; }
            .bg-purple-50 { background-color: #faf5ff; }
            .bg-orange-400 { background-color: #fb923c; }
            .bg-orange-300 { background-color: #fdba74; }
            .bg-red-400 { background-color: #f87171; }
            .bg-lime-400 { background-color: #a3e635; }
            .bg-gray-100 { background-color: #f3f4f6; }
            .bg-gray-400 { background-color: #9ca3af; }
            
            /* Gradient utilities */
            .bg-gradient-to-r { background-image: linear-gradient(to right, var(--tw-gradient-stops)); }
            .from-emerald-400 { --tw-gradient-from: #34d399; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
            .to-emerald-600 { --tw-gradient-to: #059669; }
            .from-emerald-600 { --tw-gradient-from: #059669; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
            .to-blue-600 { --tw-gradient-to: #2563eb; }
            .from-blue-400 { --tw-gradient-from: #60a5fa; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
            .from-purple-400 { --tw-gradient-from: #c084fc; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
            .to-purple-600 { --tw-gradient-to: #9333ea; }
            .bg-clip-text { -webkit-background-clip: text; background-clip: text; }
            
            /* Specific styles */
            .opacity-5 { opacity: 0.05; }
            .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
            @keyframes pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: .5; }
            }
            
            /* Width/Height utilities */
            .w-80 { width: 20rem; }
            .h-56 { height: 14rem; }
            .w-56 { width: 14rem; }
            .h-40 { height: 10rem; }
            .w-10 { width: 2.5rem; }
            .h-10 { height: 2.5rem; }
            .w-12 { width: 3rem; }
            .h-12 { height: 3rem; }
            .w-8 { width: 2rem; }
            .h-8 { height: 2rem; }
            .w-6 { width: 1.5rem; }
            .h-6 { height: 1.5rem; }
            .w-16 { width: 4rem; }
            .h-3 { height: 0.75rem; }
            .h-2 { height: 0.5rem; }
            .w-2 { width: 0.5rem; }
            .w-0\\.5 { width: 0.125rem; }
            .h-0\\.5 { height: 0.125rem; }
            .h-full { height: 100%; }
            .w-full { width: 100%; }
            
            /* Typography - adjusted sizes */
            .text-6xl { font-size: 3.75rem; line-height: 1; }
            .text-5xl { font-size: 3rem; line-height: 1; }
            .text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
            .text-2xl { font-size: 1.5rem; line-height: 2rem; }
            .text-lg { font-size: 1.125rem; line-height: 1.75rem; }
            .text-base { font-size: 1rem; line-height: 1.5rem; }
            .text-sm { font-size: 0.875rem; line-height: 1.25rem; }
            .text-xs { font-size: 0.75rem; line-height: 1rem; }
          </style>
        </head>
        <body>
          ${clonedContent.innerHTML}
        </body>
      </html>
    `);
    
    printWindow.document.close();
    
    // Wait for fonts and content to load
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500);
    };
  };

  const nextRecord = () =>
    setSelectedIndex((i) => (i + 1) % (records.length || 1));
  const prevRecord = () =>
    setSelectedIndex((i) => (i - 1 + (records.length || 1)) % (records.length || 1));

  const decreaseZoom = () => setZoom((z) => Math.max(0.3, +(z - 0.05).toFixed(2)));
  const increaseZoom = () => setZoom((z) => Math.min(1, +(z + 0.05).toFixed(2)));
  const resetZoom = () => { setZoom(0.5); setAutoFit(true); };
  const triggerFileDialog = useCallback(
    () => fileInputRef.current?.click(),
    []
  );
  const disableAutoFit = () => { if (autoFit) setAutoFit(false); };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Generate Sertifikat Laboratorium
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Upload file Excel dan preview sertifikat (depan & belakang). Print
          akan otomatis mencetak dua halaman.
        </p>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="space-y-6 xl:col-span-1">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-base flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4" /> Upload Data Sertifikat
              </CardTitle>
              <CardDescription className="text-xs leading-relaxed">
                Tanggal terbit & ID sertifikat digenerate otomatis oleh sistem pada saat upload.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="file" className="font-medium">Upload File Excel</Label>
                <input
                  ref={fileInputRef}
                  id="file"
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleExcelUpload}
                  className="hidden"
                  disabled={uploading}
                />
                <div
                  className={`relative border-2 border-dashed rounded-md p-4 transition bg-muted/30 hover:bg-muted/50 text-center ${uploading ? 'opacity-70' : ''}`}
                  onDragOver={(e) => { e.preventDefault(); }}
                  onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f) processExcelFile(f); }}
                >
                  <p className="text-xs text-muted-foreground mb-2">
                    {uploadedFileName ? 'File terpilih:' : 'Drag & drop file di sini atau'}
                  </p>
                  <div className="flex flex-col items-center gap-2">
                    <Button type="button" variant="secondary" size="sm" onClick={triggerFileDialog} disabled={uploading}>
                      {uploadedFileName ? 'Ganti File' : 'Pilih File'}
                    </Button>
                    {uploadedFileName && (
                      <span className="text-xs font-medium break-all">{uploadedFileName}</span>
                    )}
                    <div className="flex flex-wrap gap-2 mt-1">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleDownloadTemplate}
                        disabled={uploading}
                      >
                        <Download className="w-3 h-3" />Template
                      </Button>
                      {uploadedFileName && (
                        <Button type="button" size="sm" variant="destructive" onClick={reset}>
                          Hapus
                        </Button>
                      )}
                    </div>
                  </div>
                  <p className="mt-3 text-[11px] text-muted-foreground leading-relaxed">
                    Format: .xlsx | Header wajib: name, program (optional lainnya). Kolom JSON: competencies, gradesBreakdown, weeklyData. issueDate & verificationId akan diisi otomatis.
                  </p>
                  {records.length > 0 && (
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      Total record: {records.length}
                    </p>
                  )}
                  {uploading && (
                    <p className="mt-2 text-[11px] text-blue-600 animate-pulse">Memproses file...</p>
                  )}
                </div>
              </div>
               <div className="flex gap-2 flex-wrap">
                 <Button
                   type="button"
                   size="sm"
                   variant="ghost"
                   onClick={prevRecord}
                   disabled={!records.length}
                 >
                   <ChevronLeft className="w-3 h-3" />Prev
                 </Button>
                 <Button
                   type="button"
                   size="sm"
                   variant="ghost"
                   onClick={nextRecord}
                   disabled={!records.length}
                 >
                   Next<ChevronRight className="w-3 h-3" />
                 </Button>
                 <Separator orientation="vertical" className="h-8" />
                 <Button
                   type="button"
                   size="sm"
                   variant={!showBack ? "default" : "outline"}
                   onClick={() => setShowBack(false)}
                 >
                   <Eye className="w-3 h-3" />Depan
                 </Button>
                 <Button
                   type="button"
                   size="sm"
                   variant={showBack ? "default" : "outline"}
                   onClick={() => setShowBack(true)}
                 >
                   Belakang
                 </Button>
                 <Separator orientation="vertical" className="h-8" />
                 <Button
                   type="button"
                   size="sm"
                   variant="outline"
                   onClick={() => { disableAutoFit(); decreaseZoom(); }}
                 >
                   <ZoomOut className="w-3 h-3" />
                 </Button>
                 <Button
                   type="button"
                   size="sm"
                   variant="outline"
                   onClick={() => { disableAutoFit(); increaseZoom(); }}
                 >
                   <ZoomIn className="w-3 h-3" />
                 </Button>
                <Button
                  type="button"
                  size="sm"
                  variant={autoFit ? 'default' : 'outline'}
                  onClick={() => setAutoFit((v) => !v)}
                >
                  Fit
                </Button>
                 <Button
                   type="button"
                   size="sm"
                   variant="ghost"
                   onClick={() => { setAutoFit(true); resetZoom(); }}
                 >
                   <RotateCcw className="w-3 h-3" />
                 </Button>
                 <Separator orientation="vertical" className="h-8" />
                 <Button
                   type="button"
                   size="sm"
                   onClick={handlePrint}
                   className="ml-auto"
                 >
                   <Printer className="w-3 h-3" />Print A4
                 </Button>
                 <Button
                   type="button"
                   size="sm"
                   variant="destructive"
                   onClick={reset}
                 >
                   Reset
                 </Button>
               </div>
              {records.length > 0 && (
                <p className="text-[11px] text-muted-foreground">
                  Record aktif: {selectedIndex + 1} / {records.length}
                </p>
              )}
              {error && (
                <Alert variant="destructive" className="text-xs">
                  <AlertTriangle className="w-4 h-4" />
                  <div>
                    <AlertTitle>Upload Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </div>
                </Alert>
              )}
              {!!warnings.length && (
                <Alert className="text-xs max-h-40 overflow-auto">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <div>
                    <AlertTitle>Warning</AlertTitle>
                    <AlertDescription>
                      <ul className="list-disc ml-4 space-y-1">
                        {warnings.map((w, i) => (
                          <li key={i}>{w}</li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </div>
                </Alert>
              )}
              {records.length > 0 && (
                <div className="border rounded-md">
                  <Table className="text-xs">
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="w-8">#</TableHead>
                        <TableHead>Nama</TableHead>
                        <TableHead>Program</TableHead>
                        <TableHead>Grade</TableHead>
                        <TableHead>Hadir</TableHead>
                        <TableHead>Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {records.map((r, i) => (
                        <TableRow
                          key={i}
                          data-state={i === selectedIndex ? "selected" : undefined}
                          className="cursor-pointer"
                          onClick={() => {
                            setSelectedIndex(i);
                            setShowBack(false);
                          }}
                        >
                          <TableCell>{i + 1}</TableCell>
                          <TableCell className="whitespace-nowrap">
                            {r.name}
                          </TableCell>
                          <TableCell className="whitespace-nowrap">
                            {r.program}
                          </TableCell>
                          <TableCell>{r.grades.overall}</TableCell>
                          <TableCell>{r.stats.attendanceRate}%</TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedIndex(i);
                                setShowBack(false);
                              }}
                            >
                              Pilih
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6 xl:col-span-2">
          <Card className="relative">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Preview Sertifikat</CardTitle>
              <CardDescription className="text-xs">
                Toggle depan / belakang untuk melihat kedua sisi. Saat print,
                keduanya dicetak terpisah otomatis.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div ref={previewContainerRef} className="w-full overflow-auto rounded-md border bg-background p-4 preview-scroll">
                <div className="mx-auto" style={{ width: "297mm" }}>
                  <div
                    className="a4-landscape relative origin-top mx-auto"
                    style={{ transform: `scale(${zoom})` }}
                  >
                    <div className="relative certificate-content">
                      <div className="absolute border-4 border-black pointer-events-none inset-6 rounded-3xl" />
                      {!showBack ? (
                        <CertificateFront studentData={activeStudent} />
                      ) : (
                        <CertificateBack studentData={activeStudent} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {records.length > 0 && (
                <p className="text-[11px] text-muted-foreground mt-3">
                  Preview menampilkan 1 halaman. Print menghasilkan dua halaman
                  (depan & belakang).
                </p>
              )}
            </CardContent>
          </Card>
          <div id="print-area" className="hidden print:block">
            <div className="overflow-hidden bg-white rounded-lg a4-landscape mb-4">
              <div className="relative certificate-content">
                <div className="absolute border-4 border-black pointer-events-none inset-6 rounded-3xl" />
                <CertificateFront studentData={activeStudent} />
              </div>
            </div>
            <div className="overflow-hidden bg-white rounded-lg a4-landscape">
              <div className="relative certificate-content">
                <div className="absolute border-4 border-black pointer-events-none inset-6 rounded-3xl" />
                <CertificateBack studentData={activeStudent} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .a4-landscape { width: 297mm; height: 210mm; max-width:297mm; max-height:210mm; position:relative; box-sizing:border-box; background:white; }
        .certificate-content { width:100%; height:100%; padding:10mm; box-sizing:border-box; display:flex; flex-direction:column; position:relative; }
        .preview-scroll { max-height: calc(100vh - 300px); }
        .preview-scroll::-webkit-scrollbar { height:8px; width:8px; }
        .preview-scroll::-webkit-scrollbar-thumb { background: #d1d5db; border-radius:4px; }
        .preview-scroll::-webkit-scrollbar-track { background: transparent; }
        @page { size: A4 landscape; margin:0; }
        /* Improved print rules: only print the two certificate pages */
        @media print {
          html, body { margin:0 !important; padding:0 !important; background:#fff !important; }
          /* First hide everything via visibility so ancestor boxes remain to host #print-area */
          body * { visibility: hidden !important; }
          /* Show only the certificate print area */
            #print-area, #print-area * { visibility: visible !important; }
          /* Remove any spacing influence */
          #print-area { position: relative !important; margin:0 !important; padding:0 !important; display:block !important; width:100% !important; }
          /* Force exact A4 landscape size per page */
          #print-area .a4-landscape { width:297mm !important; height:210mm !important; max-width:297mm !important; max-height:210mm !important; transform:none !important; page-break-after:always; page-break-inside:avoid; overflow:hidden !important; }
          #print-area .a4-landscape:last-child { page-break-after:auto; }
          #print-area .certificate-content { padding:10mm; box-shadow:none !important; }
          /* Remove scrollbars */
          ::-webkit-scrollbar { display:none !important; }
        }
      `}</style>
    </div>
  );
}