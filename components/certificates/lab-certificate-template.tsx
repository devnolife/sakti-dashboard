"use client";

import {
  Playfair_Display,
  Inter,
  Cormorant_Garamond,
  Space_Grotesk,
} from "next/font/google";
import Image from "next/image";
import {
  Monitor,
  Lightbulb,
  Clock,
  Users,
  Calendar,
  CheckCircle,
  BarChart3,
  Activity,
  Printer,
  Award,
  Sparkles,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { encryptCertificateData } from "@/lib/certificate-crypto";

// Elegant serif for headings
const playfair = Playfair_Display({
  weight: ["400", "600", "700", "900"],
  subsets: ["latin"],
  style: ["normal", "italic"],
});

// Modern sans-serif for body
const inter = Inter({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

// Elegant serif for names
const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
  style: ["normal", "italic"],
});

// Modern geometric for accents
const spaceGrotesk = Space_Grotesk({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

interface LabCertificateData {
  name: string;
  nim?: string;
  program: string;
  achievement: string;
  date: string;
  finalScore?: number;
  meetingsAttended?: number;
  attendanceScore?: number;
  assignmentScore?: number;
  technologies?: string[];
  certificateId?: string;
  instructorName?: string;
  organizationName?: string;
}

interface LabCertificateTemplateProps {
  data: LabCertificateData;
  template: string;
  showBack?: boolean;
  onPrint?: () => void;
  renderMode?: "preview" | "batch"; // 'preview' for print/view, 'batch' for ZIP generation
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
    "bg-cyan-100 text-cyan-700 border-cyan-200",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

// Clean Circular Progress Component
interface CleanCircularProgressProps {
  percentage?: number;
  size?: number;
  strokeWidth?: number;
}

const CleanCircularProgress = ({
  percentage = 100,
  size = 110,
  strokeWidth = 8,
}: CleanCircularProgressProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
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
          <linearGradient
            id="progressGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#0ea5e9" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className={`text-2xl font-black bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent ${playfair.className}`}
        >
          231h
        </span>
        <span
          className={`text-xs text-gray-600 font-medium ${inter.className}`}
        >
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

  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - ((value - min) / range) * 100;
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

export default function LabCertificateTemplate({
  data,
  template,
  showBack = false,
  renderMode = "preview", // Default to 'preview' for backward compatibility
}: LabCertificateTemplateProps) {
  const signatureQRRef = useRef<HTMLCanvasElement>(null);
  const verificationQRRef = useRef<HTMLCanvasElement>(null);
  const [qrLoaded, setQrLoaded] = useState(false);

  // Generate QR codes
  useEffect(() => {
    const generateQRCodes = async () => {
      try {
        // Encrypt certificate data (name, organization, certificate ID)
        const encryptedData = encryptCertificateData(
          data.name,
          data.organizationName || "Laboratorium Informatika",
          data.certificateId || "UNKNOWN"
        );

        // QR Code for digital signature verification
        const signatureVerificationURL = `https://sintekmu.ac.id/verify/signature/${encryptedData}`;

        // QR Code for certificate verification (existing one in footer)
        const certificateVerificationURL = `https://sintekmu.ac.id/verify/${encryptedData}`;

        if (signatureQRRef.current) {
          await QRCode.toCanvas(
            signatureQRRef.current,
            signatureVerificationURL,
            {
              width: 80,
              margin: 1,
              color: {
                dark: "#1f2937",
                light: "#ffffff",
              },
            }
          );
        }

        if (verificationQRRef.current) {
          await QRCode.toCanvas(
            verificationQRRef.current,
            certificateVerificationURL,
            {
              width: 48,
              margin: 0,
              color: {
                dark: "#1f2937",
                light: "#ffffff",
              },
            }
          );
        }

        setQrLoaded(true);
      } catch (error) {
        console.error("Error generating QR codes:", error);
      }
    };

    generateQRCodes();
  }, [data.certificateId, data.name, data.organizationName]);

  // Generate some mock analytics data
  const mockStats = {
    meetings: data.meetingsAttended || 10,
    totalScore: data.finalScore || 90,
    materials: 10,
    attendanceRate: data.attendanceScore || 95,
    assignmentCompletion: data.assignmentScore || 88,
    participationScore: 92,
  };

  const mockCompetencies = [
    {
      name: "Keterampilan Pemrograman (KP)",
      value: 35,
      startColor: "#3b82f6",
      endColor: "#1d4ed8",
      level: "Expert",
    },
    {
      name: "Kemampuan Analisis dan Evaluasi (KAE)",
      value: 30,
      startColor: "#06b6d4",
      endColor: "#0891b2",
      level: "Advanced",
    },
    {
      name: "Kreativitas dalam Pemecahan Masalah (KPM)",
      value: 25,
      startColor: "#10b981",
      endColor: "#059669",
      level: "Advanced",
    },
    {
      name: "Keterampilan Komunikasi (KK)",
      value: 20,
      startColor: "#6b7280",
      endColor: "#4b5563",
      level: "Intermediate",
    },
  ];

  const mockGrades = {
    overall: "A",
    breakdown: [
      { subject: "Praktikum Backend", grade: "A+", score: 95 },
      { subject: "Database Design", grade: "A", score: 90 },
      { subject: "API Development", grade: "A-", score: 87 },
      { subject: "Server Management", grade: "B+", score: 85 },
    ],
  };

  const weeklyData = [45, 52, 38, 61, 47, 55, 43, 38, 52, 45];

  return (
    <>
      <style jsx global>{`
        @media print {
          @page {
            size: A4 landscape;
            margin: 0;
          }

          body {
            margin: 0;
            padding: 0;
            background: white !important;
          }

          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }

          .certificate-container {
            width: 297mm !important;
            height: 210mm !important;
            margin: 0 !important;
            padding: 0 !important;
            aspect-ratio: auto !important;
            page-break-after: always;
            page-break-inside: avoid;
            overflow: visible !important;
          }

          /* Hide all shadows in print */
          .shadow-2xl,
          .shadow-xl,
          .shadow-lg {
            box-shadow: none !important;
          }

          /* Ensure borders print properly */
          .border-4 {
            border-width: 4px !important;
            border-color: #000 !important;
          }

          .border-2 {
            border-width: 2px !important;
          }

          /* Ensure backgrounds and gradients print */
          .bg-gradient-to-br,
          .bg-gradient-to-r,
          .bg-gray-900,
          .bg-gray-800,
          .bg-gray-200,
          .bg-gray-100,
          .bg-gray-50,
          .bg-green-500,
          .bg-green-400,
          .bg-blue-100,
          .bg-blue-50,
          .bg-green-100,
          .bg-purple-100,
          .bg-pink-100,
          .bg-yellow-100,
          .bg-indigo-100,
          .bg-red-100,
          .bg-cyan-100,
          .bg-lime-400,
          .bg-yellow-400,
          .bg-white,
          [class*="bg-"] {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          /* Ensure text colors print */
          [class*="text-"] {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          /* SVG elements - ensure they print */
          svg,
          svg * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            vector-effect: non-scaling-stroke;
          }

          /* Circle progress bars */
          circle {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          /* Linear gradients */
          linearGradient,
          stop {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          /* QR Code and similar elements */
          .bg-gray-800 > div,
          [class*="grid-cols"] {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          /* Badge colors */
          .rounded-full {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          /* Progress bars */
          [style*="background"] {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          /* Images - ensure they print at full quality */
          img {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            max-width: 100% !important;
            height: auto !important;
            page-break-inside: avoid;
            image-rendering: -webkit-optimize-contrast;
            image-rendering: crisp-edges;
          }

          /* Canvas elements (QR codes) - ensure they print */
          canvas {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            image-rendering: -webkit-optimize-contrast;
            image-rendering: crisp-edges;
            page-break-inside: avoid;
          }

          /* Remove any interactive elements in print */
          button,
          .cursor-pointer {
            display: none !important;
          }

          /* Ensure proper font rendering */
          * {
            font-smoothing: antialiased;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
          }

          /* Font weights - ensure they render properly */
          .font-black {
            font-weight: 900 !important;
          }

          .font-bold {
            font-weight: 700 !important;
          }

          .font-semibold {
            font-weight: 600 !important;
          }

          .font-medium {
            font-weight: 500 !important;
          }

          /* Page breaks */
          .page-break {
            page-break-after: always;
            page-break-inside: avoid;
          }

          /* Keep all rounded corners for professional look */
          .rounded,
          .rounded-sm,
          .rounded-md,
          .rounded-lg,
          .rounded-xl,
          .rounded-2xl,
          .rounded-3xl,
          .rounded-full {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            /* Keep original border radius */
          }

          /* Ensure border radius is preserved on main container */
          .certificate-container {
            border-radius: 0.5rem !important;
          }

          /* Main decorative border keeps its radius */
          .border-4.rounded-3xl {
            border-radius: 1.5rem !important;
          }

          /* Opacity - ensure visible in print */
          [class*="opacity-"] {
            opacity: 1 !important;
          }

          /* Transitions and animations - disable for print */
          *,
          *::before,
          *::after {
            animation: none !important;
            transition: none !important;
          }

          /* Sparkline and charts */
          polyline,
          path {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          /* Ensure spacing is preserved */
          .space-y-1 > * + *,
          .space-y-2 > * + *,
          .space-y-3 > * + *,
          .space-y-4 > * + * {
            margin-top: inherit !important;
          }

          /* Grid layouts */
          .grid {
            display: grid !important;
          }

          /* Flex layouts */
          .flex {
            display: flex !important;
          }
        }
      `}</style>

      <div
        className="bg-white rounded-lg shadow-2xl certificate-container w-full"
        style={{ aspectRatio: "297/210" }}
      >
        <div className="relative w-full h-full p-6">
          {/* Single Decorative Border - Keeps radius for professional look */}
          <div className="absolute border-4 border-black pointer-events-none inset-6 rounded-3xl"></div>

          {!showBack ? (
            // Certificate Front - A4 Landscape Layout
            <div className="relative z-10 flex flex-col justify-between h-full p-8">
              {/* Programming Logo & Code Watermark Background */}
              <div className="absolute inset-6 z-0 overflow-hidden pointer-events-none rounded-3xl print:opacity-[0.03]">
                <div className="relative w-full h-full">
                  {/* React Logo - Kiri Atas */}
                  <div className="absolute -top-8 -left-8 -rotate-12 opacity-15">
                    <svg
                      className="w-16 h-16 text-blue-400"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89 0 1-.84 1.85-1.87 1.85S10.13 13 10.13 12c0-1.05.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 0 1-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9c-.6 0-1.17 0-1.71.03-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03.6 0 1.17 0 1.71-.03.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68s-1.83 2.93-4.37 3.68c.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.38 1.95-1.46-.84-1.62-3.05-1-5.63-2.54-.75-4.37-1.99-4.37-3.68s1.83-2.93 4.37-3.68c-.62-2.58-.46-4.79 1-5.63 1.47-.84 3.46.12 5.38 1.95 1.92-1.83 3.91-2.79 5.37-1.95M17.08 12c.34.75.64 1.5.89 2.26 2.1-.63 3.28-1.53 3.28-2.26s-1.18-1.63-3.28-2.26c-.25.76-.55 1.51-.89 2.26M6.92 12c-.34-.75-.64-1.5-.89-2.26-2.1.63-3.28 1.53-3.28 2.26s1.18 1.63 3.28 2.26c.25-.76.55-1.51.89-2.26m9 2.26l-.3.51c.31-.05.61-.1.88-.16-.07-.28-.18-.57-.29-.86l-.29.51m-2.89 4.04c1.59 1.5 2.97 2.08 3.59 1.7.64-.35.83-1.82.32-3.96-.77.16-1.58.28-2.4.36-.48.67-.99 1.31-1.51 1.9M8.08 9.74l.3-.51c-.31.05-.61.1-.88.16.07.28.18.57.29.86l.29-.51m2.89-4.04C9.38 4.2 8 3.62 7.37 4c-.63.35-.82 1.82-.31 3.96a22.7 22.7 0 0 1 2.4-.36c.48-.67.99-1.31 1.51-1.9z" />
                    </svg>
                  </div>

                  {/* Code Snippet 1 - Dekat React Logo */}
                  <pre className="absolute font-mono text-sm leading-relaxed text-blue-500 top-12 left-24 -rotate-6 whitespace-pre opacity-30">
                    {`const App = () => {\n  return <div>Hello</div>\n}`}
                  </pre>

                  {/* TypeScript Logo - Kanan Atas */}
                  <div className="absolute -top-6 -right-10 rotate-15 opacity-15">
                    <svg
                      className="w-14 h-14 text-blue-600"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M3 3h18v18H3V3zm16.525 13.707c-.131-.821-.666-1.511-2.252-2.155-.552-.259-1.165-.438-1.349-.854-.068-.248-.078-.382-.034-.529.113-.484.687-.629 1.137-.495.293.09.563.315.732.676.775-.507.775-.507 1.316-.844-.203-.314-.304-.451-.439-.586-.473-.528-1.103-.798-2.126-.775l-.528.067c-.507.124-.991.395-1.283.754-.855.968-.612 2.656.427 3.354 1.023.765 2.521.933 2.712 1.653.18.878-.652 1.159-1.475 1.058-.607-.136-.945-.439-1.316-1.002l-1.372.788c.157.359.337.517.607.832 1.305 1.316 4.568 1.249 5.153-.754.021-.067.18-.528.056-1.237l.034.049zm-6.737-5.434h-1.686c0 1.453-.007 2.898-.007 4.354 0 .924.047 1.772-.104 2.033-.247.517-.886.451-1.175.359-.297-.146-.448-.349-.623-.641-.047-.078-.082-.146-.095-.146l-1.368.844c.229.473.563.879.994 1.137.641.383 1.502.507 2.404.305.588-.17 1.095-.519 1.358-1.059.384-.697.302-1.553.299-2.509.008-1.541 0-3.083 0-4.635l.003-.042z" />
                    </svg>
                  </div>

                  {/* Code Snippet 2 - Dekat TypeScript */}
                  <pre className="absolute font-mono text-sm leading-relaxed text-purple-500 top-16 right-24 rotate-12 whitespace-pre opacity-30">
                    {`interface User {\n  name: string;\n  id: number;\n}`}
                  </pre>

                  {/* Node.js Logo - Kiri Bawah */}
                  <div className="absolute -bottom-8 left-16 rotate-8 opacity-15">
                    <svg
                      className="w-14 h-14 text-green-500"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 1.85c-.27 0-.55.07-.78.2l-7.44 4.3c-.48.28-.78.8-.78 1.36v8.58c0 .56.3 1.08.78 1.36l1.95 1.12c.95.46 1.27.47 1.71.47 1.4 0 2.21-.85 2.21-2.33V8.44c0-.12-.1-.22-.22-.22H8.5c-.13 0-.23.1-.23.22v8.47c0 .66-.68 1.31-1.77.76L4.45 16.5a.26.26 0 0 1-.11-.21V7.71c0-.09.04-.17.11-.21l7.44-4.29c.06-.04.16-.04.22 0l7.44 4.29c.07.04.11.12.11.21v8.58c0 .08-.04.16-.11.21l-7.44 4.29c-.06.04-.16.04-.22 0L10.2 20.1c-.07-.03-.14-.03-.2-.01-.63.35-1.09.53-1.95.53-.68 0-1.42-.2-2.14-.55l-1.9-1.09C3.38 18.55 3 17.84 3 17.09V8.5c0-.75.38-1.46 1.01-1.89l7.44-4.3c.23-.13.51-.2.78-.2h-.01z" />
                    </svg>
                  </div>

                  {/* Code Snippet 3 - Dekat Node */}
                  <pre className="absolute font-mono text-sm leading-relaxed text-emerald-500 bottom-16 left-32 -rotate-8 whitespace-pre opacity-30">
                    {`app.listen(3000, () => {\n  console.log('Server running')\n})`}
                  </pre>

                  {/* Docker Logo - Kanan Bawah */}
                  <div className="absolute -bottom-10 -right-8 -rotate-10 opacity-15">
                    <svg
                      className="w-16 h-16 text-blue-500"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.186.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338 0-.676.03-1.01.09-.458-1.052-1.237-1.96-2.353-2.735.172-.314.283-.572.283-.945 0-.531-.183-1.002-.574-1.41-.392-.408-.86-.612-1.403-.612-.219 0-.672.065-1.237.195l-.195.065c-.314.108-.509.183-.509.218-.286.176-.56.369-.82.579l-.139.12c-.394.335-.673.694-.821 1.073-.195.514-.102 1.353.25 2.262-1.187.723-2.12 1.607-2.764 2.633-.736.131-2.077.392-3.367 1.06-.546.283-.772.634-.755.927a1.04 1.04 0 00.314.697c.227.227.541.351.888.351a2.87 2.87 0 001.116-.246c.792-.356 1.482-.859 2.056-1.492.582-.632 1.002-1.375 1.253-2.214l.176-.57.065.227c.09.314.186.608.295.883.175.445.375.855.595 1.225.308.553.664 1.02 1.057 1.385.264.246.573.447.913.594.32.14.668.211 1.021.211.39 0 .778-.09 1.14-.267.452-.211.854-.522 1.188-.913.32-.374.588-.796.788-1.251.176-.381.297-.771.362-1.165.08-.472.12-.943.12-1.405 0-.174-.006-.348-.02-.522l.065-.392c.195-.86.42-1.445.672-1.747a1.08 1.08 0 01.794-.405c.56 0 .965.248 1.254.732.162.262.24.544.24.841a2.55 2.55 0 01-.176.945l-.065.176c-.162.453-.318.885-.465 1.295-.147.41-.278.8-.393 1.17-.103.33-.154.637-.154.92 0 .53.173.995.516 1.391.338.391.789.586 1.34.586.534 0 .996-.186 1.379-.556.374-.364.666-.834.862-1.396.121-.352.178-.714.178-1.078 0-.611-.147-1.144-.437-1.58-.304-.453-.72-.8-1.229-1.026z" />
                    </svg>
                  </div>
                </div>
              </div>
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
                {/* Certificate Number - Right below badge */}
                <p
                  className={`font-mono text-xs font-semibold text-gray-500 tracking-wider ${spaceGrotesk.className}`}
                >
                  {data.certificateId || "001/LAB/2024"}
                </p>
              </div>

              {/* Main Content */}
              <div className="flex flex-col justify-center flex-grow">
                {/* Title Section */}
                <div
                  className={`text-center ${
                    renderMode === "batch" ? "mb-4" : "mb-1"
                  }`}
                >
                  <p
                    className={`text-gray-600 text-sm font-light tracking-widest mb-1 ${inter.className}`}
                  >
                    PROFESSIONAL CERTIFICATION
                  </p>
                  <h1
                    className={`text-6xl font-black text-gray-900 mb-2 ${playfair.className}`}
                  >
                    {template === "backend_dev_1"
                      ? "Backend Developer I"
                      : template === "frontend_dev_1"
                      ? "Frontend Developer I"
                      : template === "fullstack_dev_1"
                      ? "Full Stack Developer I"
                      : template === "data_science_1"
                      ? "Data Science I"
                      : "Backend Developer I"}
                  </h1>
                </div>

                {/* Recipient Section */}
                <div
                  className={`mb-2 text-center ${
                    renderMode === "batch" ? "mt-3" : "mt-1"
                  }`}
                >
                  <p
                    className={`text-base text-gray-600 ${
                      renderMode === "batch" ? "mb-2" : "mb-1"
                    }`}
                  >
                    ISSUED TO
                  </p>
                  <h2
                    className={`text-5xl font-bold text-gray-900 mb-2 ${playfair.className}`}
                  >
                    {data.name}
                  </h2>
                </div>

                {/* Description */}
                <div className="max-w-2xl mx-auto mb-2 text-center">
                  <p
                    className={`text-gray-700 text-lg leading-relaxed ${inter.className}`}
                  >
                    The bearer of this professional certificate has demonstrated
                    a fundamental level of {data.program} mastery and passed the
                    core competencies for each programming specialty in
                    laboratory practices.
                  </p>
                </div>
              </div>

              {/* Footer Section */}
              <div className="flex items-end justify-between mt-auto">
                {/* Left - QR Code above Instructor Name */}
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center p-1 mb-2 bg-white border-2 border-gray-300 rounded">
                    <canvas
                      ref={signatureQRRef}
                      data-qr="signature"
                      style={{ width: "60px", height: "60px" }}
                    />
                  </div>
                  <span
                    className={`text-[9px] text-gray-500 mb-1 ${inter.className}`}
                  >
                    Digital Signature
                  </span>
                  <p
                    className={`text-xs text-gray-800 font-semibold ${inter.className}`}
                  >
                    {data.instructorName || "Muhyiddin A.M Hayat, S.Kom., M.T"}
                  </p>
                  <p className={`text-[10px] text-gray-600 ${inter.className}`}>
                    Kepala Laboratorium Informatika
                  </p>
                </div>

                {/* Right - Laboratory */}
                <div className="flex flex-col items-end">
                  <p
                    className={`text-sm text-gray-700 font-semibold ${inter.className}`}
                  >
                    {data.organizationName || "Laboratorium Informatika"}
                  </p>
                  <p className={`text-xs text-gray-500 ${inter.className}`}>
                    Universitas Muhammadiyah Makassar
                  </p>
                </div>
              </div>
            </div>
          ) : (
            // Certificate Back - Enhanced A4 Layout with all features
            <div className="relative flex flex-col h-full p-8 overflow-hidden">
              {/* Colorful Code Watermark Background */}
              <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full opacity-[0.25]">
                  {/* Multiple code snippets with different colors and rotations */}
                  <pre className="absolute font-mono text-sm leading-relaxed text-blue-500 top-10 left-10 rotate-12 whitespace-pre">
                    {`const express = require('express');\nconst app = express();\napp.listen(3000);`}
                  </pre>
                  <pre className="absolute font-mono text-sm leading-relaxed text-green-500 top-32 right-20 -rotate-6 whitespace-pre">
                    {`function fibonacci(n) {\n  if (n <= 1) return n;\n  return fib(n-1) + fib(n-2);\n}`}
                  </pre>
                  <pre className="absolute font-mono text-sm leading-relaxed text-purple-500 rotate-3 bottom-32 left-16 whitespace-pre">
                    {`SELECT * FROM users\nWHERE active = true\nORDER BY created_at DESC;`}
                  </pre>
                  <pre className="absolute font-mono text-sm leading-relaxed text-pink-500 top-48 left-1/3 -rotate-12 whitespace-pre">
                    {`import React from 'react';\nexport default function App() {\n  return <h1>Hello World</h1>;\n}`}
                  </pre>
                  <pre className="absolute font-mono text-sm leading-relaxed text-orange-500 bottom-20 right-32 rotate-6 whitespace-pre">
                    {`class Student:\n  def __init__(self, name):\n    self.name = name\n  def study(self):\n    return True`}
                  </pre>
                  <pre className="absolute font-mono text-sm leading-relaxed text-cyan-500 top-24 right-1/4 rotate-15 whitespace-pre">
                    {`async function getData() {\n  const res = await fetch('/api');\n  return res.json();\n}`}
                  </pre>
                  <pre className="absolute font-mono text-sm leading-relaxed text-amber-500 -rotate-3 bottom-48 left-1/4 whitespace-pre">
                    {`for (let i = 0; i < 10; i++) {\n  console.log(i);\n}`}
                  </pre>
                  <pre className="absolute font-mono text-sm leading-relaxed text-red-500 top-64 right-16 rotate-9 whitespace-pre">
                    {`<!DOCTYPE html>\n<html>\n<body>\n  <h1>Web Dev</h1>\n</body>\n</html>`}
                  </pre>
                  <pre className="absolute font-mono text-sm leading-relaxed text-indigo-500 bottom-16 left-48 -rotate-9 whitespace-pre">
                    {`def quicksort(arr):\n  if len(arr) <= 1:\n    return arr\n  pivot = arr[0]`}
                  </pre>
                  <pre className="absolute font-mono text-sm leading-relaxed text-teal-500 rotate-12 top-72 left-64 whitespace-pre">
                    {`interface User {\n  id: number;\n  name: string;\n  email: string;\n}`}
                  </pre>
                  <pre className="absolute font-mono text-sm leading-relaxed text-lime-600 bottom-64 right-48 -rotate-6 whitespace-pre">
                    {`const api = axios.create({\n  baseURL: '/api/v1',\n  timeout: 5000\n});`}
                  </pre>
                  <pre className="absolute font-mono text-sm leading-relaxed text-fuchsia-500 top-96 right-64 rotate-3 whitespace-pre">
                    {`@app.route('/login')\ndef login():\n  return render_template('login.html')`}
                  </pre>
                  <pre className="absolute font-mono text-sm leading-relaxed text-emerald-500 top-20 left-1/2 -rotate-15 whitespace-pre">
                    {`git commit -m "feat: add feature"\ngit push origin main`}
                  </pre>
                  <pre className="absolute font-mono text-sm leading-relaxed text-violet-500 bottom-40 right-1/3 rotate-6 whitespace-pre">
                    {`const [state, setState] = \n  useState(null);`}
                  </pre>
                  <pre className="absolute font-mono text-sm leading-relaxed text-rose-500 top-52 left-20 rotate-9 whitespace-pre">
                    {`UPDATE products SET\nprice = price * 1.1\nWHERE category = 'tech';`}
                  </pre>
                  <pre className="absolute font-mono text-sm leading-relaxed text-sky-500 bottom-28 left-1/3 -rotate-12 whitespace-pre">
                    {`npm install express\nnpm run dev\nnpm test`}
                  </pre>
                  <pre className="absolute font-mono text-sm leading-relaxed text-amber-600 top-40 right-40 rotate-15 whitespace-pre">
                    {`class Controller {\n  public function index()\n  {\n    return view('home');\n  }\n}`}
                  </pre>
                </div>
              </div>

              {/* Subtle Background Pattern */}
              <div className="absolute inset-8 z-0 opacity-3">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, #6b7280 1px, transparent 0)`,
                    backgroundSize: "20px 20px",
                  }}
                />
              </div>

              {/* Header with Enhanced Info */}
              <div className="relative z-10 mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h1
                        className={`text-lg font-bold text-gray-900 ${playfair.className}`}
                      >
                        Sertifikat Laboratorium, {data.name}
                      </h1>
                      <span className="text-lg">🤝</span>
                    </div>
                    <p
                      className={`text-gray-600 text-sm mb-2 ${inter.className}`}
                    >
                      {data.achievement}
                    </p>
                    <p
                      className={`text-sm font-semibold text-gray-800 ${playfair.className}`}
                    >
                      {data.program}
                    </p>
                  </div>

                  {/* QR Code and Verification */}
                  <div className="text-right">
                    <div className="flex items-center justify-center p-1 mb-2 bg-white border-2 border-gray-300 rounded">
                      <canvas
                        ref={verificationQRRef}
                        data-qr="verification"
                        style={{ width: "48px", height: "48px" }}
                      />
                    </div>
                    <div className={`text-xs text-gray-600 ${inter.className}`}>
                      <p className="text-[10px] text-gray-500 mb-1">
                        Scan untuk verifikasi
                      </p>
                      <p>
                        Diterbitkan:{" "}
                        {new Date(data.date).toLocaleDateString("id-ID")}
                      </p>
                      <p className="font-mono">
                        ID: {data.certificateId || "CERT-2024-001"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Technology Tags with Grade */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {(
                      data.technologies || [
                        "TypeScript",
                        "NodeJS",
                        "Docker",
                        "PostgreSQL",
                      ]
                    ).map((tech, index) => (
                      <div
                        key={index}
                        className={`px-3 py-1 text-sm font-medium rounded-full border ${getRandomBadgeColor()} ${
                          inter.className
                        } transition-all duration-200 hover:scale-105`}
                      >
                        {tech}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm text-gray-600 ${inter.className}`}
                    >
                      Nilai Keseluruhan:
                    </span>
                    <div className="flex items-center justify-center w-6 h-6 text-sm font-bold text-white bg-green-500 rounded-full">
                      {mockGrades.overall}
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Stats Grid */}
              <div className="relative z-10 grid grid-cols-6 gap-4 mb-6">
                {[
                  {
                    icon: Monitor,
                    label: "Pertemuan",
                    value: mockStats.meetings,
                    bgColor: "#3b82f6",
                  },
                  {
                    icon: Lightbulb,
                    label: "Nilai",
                    value: mockStats.totalScore,
                    bgColor: "#06b6d4",
                    sparkline: true,
                  },
                  {
                    icon: Clock,
                    label: "Materi",
                    value: mockStats.materials,
                    bgColor: "#f97316",
                  },
                  {
                    icon: Calendar,
                    label: "Kehadiran",
                    value: `${mockStats.attendanceRate}%`,
                    bgColor: "#22c55e",
                  },
                  {
                    icon: CheckCircle,
                    label: "Tugas",
                    value: `${mockStats.assignmentCompletion}%`,
                    bgColor: "#a855f7",
                  },
                  {
                    icon: Users,
                    label: "Partisipasi",
                    value: `${mockStats.participationScore}%`,
                    bgColor: "#ec4899",
                  },
                ].map((stat, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className="flex items-center justify-center w-6 h-6 mb-1 rounded-lg"
                      style={{ backgroundColor: stat.bgColor }}
                    >
                      <stat.icon className="w-3 h-3 text-white" />
                    </div>
                    <div className="text-center">
                      <p
                        className={`text-xs font-bold text-gray-900 ${playfair.className}`}
                      >
                        {stat.value}
                      </p>
                      <p className={`text-xs text-gray-600 ${inter.className}`}>
                        {stat.label}
                      </p>
                      {stat.sparkline && (
                        <Sparkline
                          data={weeklyData.slice(0, 5)}
                          color="#06b6d4"
                        />
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
                    <h3
                      className={`text-base font-black text-gray-800 ${playfair.className}`}
                    >
                      Penguasaan Kompetensi
                    </h3>
                  </div>

                  <div className="space-y-2">
                    {mockCompetencies.map((competency, index) => (
                      <div
                        key={index}
                        className="group relative hover:scale-[1.01] transition-all duration-300"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-2 h-2 rounded-full"
                              style={{
                                background: `linear-gradient(90deg, ${competency.startColor} 0%, ${competency.endColor} 100%)`,
                              }}
                            />
                            <span
                              className={`text-xs font-medium text-gray-800 ${inter.className}`}
                            >
                              {competency.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full ${
                                competency.level === "Expert"
                                  ? "bg-green-100 text-green-700"
                                  : competency.level === "Advanced"
                                  ? "bg-blue-100 text-blue-700"
                                  : competency.level === "Intermediate"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-gray-100 text-gray-700"
                              } ${inter.className}`}
                            >
                              {competency.level}
                            </span>
                            <span
                              className={`text-xs font-bold text-gray-900 ${playfair.className}`}
                            >
                              {competency.value}%
                            </span>
                          </div>
                        </div>
                        <div className="relative h-2 overflow-hidden bg-gray-200 rounded-full">
                          <div
                            className="h-full transition-all duration-1000 ease-out rounded-full"
                            style={{
                              background: `linear-gradient(90deg, ${competency.startColor} 0%, ${competency.endColor} 100%)`,
                              width: `${competency.value}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Grade Breakdown */}
                  <div className="mt-3">
                    <h4
                      className={`text-xs font-bold text-gray-800 mb-2 ${playfair.className}`}
                    >
                      Grade Breakdown
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {mockGrades.breakdown.map((grade, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 rounded bg-gray-50"
                        >
                          <span
                            className={`text-xs text-gray-700 ${inter.className}`}
                          >
                            {grade.subject}
                          </span>
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-6 h-6 ${
                                grade.grade === "A+"
                                  ? "bg-green-500"
                                  : grade.grade === "A"
                                  ? "bg-green-400"
                                  : grade.grade === "A-"
                                  ? "bg-lime-400"
                                  : grade.grade === "B+"
                                  ? "bg-yellow-400"
                                  : "bg-gray-400"
                              } rounded-full flex items-center justify-center text-white font-bold text-xs`}
                            >
                              {grade.grade}
                            </div>
                            <span className="text-xs text-gray-600">
                              {grade.score}%
                            </span>
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
                    <h3
                      className={`text-base font-black text-emerald-700 ${playfair.className}`}
                    >
                      Analitik
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`text-sm text-gray-600 ${inter.className}`}
                        >
                          Kecepatan Belajar
                        </span>
                        <span
                          className={`text-sm font-bold text-emerald-600 ${playfair.className}`}
                        >
                          85%
                        </span>
                      </div>
                      <div className="h-3 bg-gray-200 rounded-full">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600"
                          style={{ width: "85%" }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`text-sm text-gray-600 ${inter.className}`}
                        >
                          Problem Solving
                        </span>
                        <span
                          className={`text-sm font-bold text-blue-600 ${playfair.className}`}
                        >
                          92%
                        </span>
                      </div>
                      <div className="h-3 bg-gray-200 rounded-full">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-600"
                          style={{ width: "92%" }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`text-sm text-gray-600 ${inter.className}`}
                        >
                          Kolaborasi
                        </span>
                        <span
                          className={`text-sm font-bold text-purple-600 ${playfair.className}`}
                        >
                          78%
                        </span>
                      </div>
                      <div className="h-3 bg-gray-200 rounded-full">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-purple-400 to-purple-600"
                          style={{ width: "78%" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Time & Performance */}
                <div className="col-span-2">
                  <div className="mb-4 text-center">
                    <h3
                      className={`text-sm font-black text-gray-800 mb-2 ${playfair.className}`}
                    >
                      Waktu Belajar
                    </h3>
                    <div className="flex justify-center">
                      <CleanCircularProgress percentage={100} size={80} />
                    </div>
                    <div className="flex justify-center mt-2">
                      <Sparkline data={weeklyData} color="#10b981" />
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4
                      className={`text-sm font-bold text-gray-800 mb-2 ${playfair.className}`}
                    >
                      Performa
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 rounded bg-green-50">
                        <span
                          className={`text-sm text-green-700 ${inter.className}`}
                        >
                          Overall
                        </span>
                        <div className="flex items-center justify-center w-6 h-6 text-sm font-bold text-white bg-green-500 rounded-full">
                          {mockGrades.overall}
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded bg-blue-50">
                        <span
                          className={`text-sm text-blue-700 ${inter.className}`}
                        >
                          Kehadiran
                        </span>
                        <span
                          className={`text-sm font-bold text-blue-600 ${playfair.className}`}
                        >
                          {mockStats.attendanceRate}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer with Instructor Feedback */}
              <div className="relative z-10 p-4 mt-4 rounded bg-gray-50">
                <h4
                  className={`text-sm font-bold text-gray-800 mb-2 ${playfair.className}`}
                >
                  Umpan Balik Instruktur
                </h4>
                <p
                  className={`text-sm text-gray-700 italic ${inter.className}`}
                >
                  Menunjukkan pemahaman yang sangat baik dalam pengembangan{" "}
                  {data.program} dan kemampuan problem-solving yang excellent.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
