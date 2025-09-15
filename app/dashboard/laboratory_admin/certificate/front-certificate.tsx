"use client";

import { Montserrat, Poppins, Open_Sans } from "next/font/google";
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

interface FrontCertificateProps {
  studentData: {
    name: string;
    program: string;
    issueDate: string;
    verificationId: string;
  };
}

export default function FrontCertificate({ studentData }: FrontCertificateProps) {
  return (
    <div className="relative z-10 flex flex-col justify-between h-full p-8">
      {/* Header with Badge */}
      <div className="flex flex-col items-center mt-4 mb-3">
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
      <div className="flex-grow flex flex-col justify-center">
        {/* Title Section */}
        <div className="text-center mb-2">
          <p className={`text-gray-600 text-sm font-light tracking-widest mb-1 ${poppins.className}`}>
            PROFESSIONAL CERTIFICATION
          </p>
          <h1 className={`text-6xl font-black text-gray-900 mb-2 ${montserrat.className}`}>
            Backend Developer I
          </h1>
        </div>

        {/* Recipient Section */}
        <div className="text-center mb-2">
          <p className="text-gray-600 text-base mb-1">ISSUED TO</p>
          <h2 className={`text-5xl font-bold text-gray-900 mb-2 ${montserrat.className}`}>
            {studentData.name}
          </h2>
        </div>

        {/* Description */}
        <div className="text-center mb-2 max-w-2xl mx-auto">
          <p className={`text-gray-700 text-lg leading-relaxed ${openSans.className}`}>
            The bearer of this professional certificate has demonstrated a fundamental
            level of Backend Development mastery and passed the core competencies for each
            programming specialty in laboratory practices.
          </p>
        </div>
      </div>

      {/* Footer Section */}
      <div className="flex justify-between items-end mt-auto">
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
          <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center mb-2">
            <span className="text-white font-bold text-sm">ux</span>
          </div>
          <p className={`text-xs text-gray-600 font-medium ${poppins.className}`}>uxcel</p>
        </div>

        {/* Date and QR */}
        <div className="flex flex-col items-end">
          <div className="w-12 h-12 bg-gray-200 mb-2 flex items-center justify-center">
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
          <div className={`text-right text-xs text-gray-600 ${poppins.className}`}>
            <p>Issued: {studentData.issueDate}</p>
            <p>ID: {studentData.verificationId}</p>
          </div>
        </div>
      </div>
    </div>
  );
}