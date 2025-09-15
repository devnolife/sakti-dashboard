"use client";

import { useState } from "react";
import { Printer } from "lucide-react";
import FrontCertificate from "./front-certificate";
import BackCertificate from "./back-certificate";

// Sample student data - default certificate data
const defaultStudentData = {
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
  analytics: {
    learningVelocity: 85, // Percentage
    collaborationScore: 78,
    problemSolvingEfficiency: 92
  },
  competencies: [
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
    },
    {
      name: "Etika dan Komunikasi Profesional",
      value: 15,
      startColor: "#ef4444",
      endColor: "#dc2626",
      level: "Intermediate"
    },
    {
      name: "Kerja Tim",
      value: 10,
      startColor: "#f97316",
      endColor: "#ea580c",
      level: "Beginner"
    }
  ],
  technologies: ["Typescript", "NodeJS", "Docker", "PostgreSQL"],
  instructorFeedback: "Menunjukkan pemahaman yang sangat baik dalam pengembangan backend dan kemampuan problem-solving yang excellent.",
  futureRecommendations: ["Advanced Microservices", "Cloud Architecture", "DevOps Practices"]
};

interface CertificateProps {
  studentData?: typeof defaultStudentData;
}

export default function Certificate({ studentData = defaultStudentData }: CertificateProps) {
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* Control Buttons */}
      <div className="fixed top-4 right-4 z-10 flex gap-2 print:hidden">
        <button
          onClick={() => setShowBack(!showBack)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          {showBack ? 'Lihat Depan' : 'Lihat Belakang'}
        </button>

        <button
          onClick={handlePrint}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
        >
          <Printer className="w-4 h-4" />
          Print A4
        </button>
      </div>

      {/* A4 Landscape Certificate Container */}
      <div className="a4-landscape bg-white shadow-2xl rounded-lg overflow-hidden">
        <div className="certificate-content relative">
          {/* Single Decorative Border */}
          <div className="absolute border-4 border-black pointer-events-none inset-6 rounded-3xl"></div>

          {!showBack ? (
            <FrontCertificate studentData={studentData} />
          ) : (
            <BackCertificate studentData={studentData} />
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