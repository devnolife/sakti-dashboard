"use client";

import React, { useState } from "react";
import Header2 from "@/components/landing/header-2";

export default function LandingHeaderDemo() {
  const [selectedHeader, setSelectedHeader] = useState<"header2">("header2");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Selection Controls */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] bg-white shadow-lg rounded-full px-6 py-3 flex gap-4 border border-gray-200">
        <button
          onClick={() => setSelectedHeader("header2")}
          className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${selectedHeader === "header2"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
        >
          Header 2 - EduLearn
        </button>
      </div>

      {/* Header Display */}
      <div className="pt-20">
        {selectedHeader === "header2" && <Header2 />}
      </div>

      {/* Info Panel */}
      <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 max-w-sm border border-gray-200">
        <h3 className="font-bold text-lg mb-2 text-gray-800">
          {selectedHeader === "header2" ? "Header 2 - EduLearn" : "Header"}
        </h3>
        <div className="text-sm text-gray-600 space-y-1">
          <p>
            <span className="font-semibold">Style:</span> Modern Education Landing
          </p>
          <p>
            <span className="font-semibold">Features:</span> Glassmorphism, Gradient Background
          </p>
          <p>
            <span className="font-semibold">Colors:</span> Blue (#0451D3), White
          </p>
          <p>
            <span className="font-semibold">Effects:</span> Backdrop blur, Shadows
          </p>
        </div>
      </div>

      {/* Component Info */}
      <div className="fixed bottom-4 left-4 bg-white shadow-lg rounded-lg p-4 max-w-xs border border-gray-200">
        <h3 className="font-bold text-sm mb-2 text-gray-800">📁 File Location</h3>
        <code className="text-xs bg-gray-100 p-2 rounded block text-gray-700 break-all">
          components/landing/header-2.tsx
        </code>
        <p className="text-xs text-gray-500 mt-2">
          Component sudah siap digunakan dengan Next.js Image optimization
        </p>
      </div>
    </div>
  );
}
