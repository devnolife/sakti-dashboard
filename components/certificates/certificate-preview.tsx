"use client"

import { useState, useEffect } from "react"
import CanvasCertificate from "./canvas-certificate"
import CertificateDownload from "./certificate-download"

interface CertificateData {
  recipientName: string
  courseName: string
  description: string
  issueDate: string
  certificateId?: string
  signatory?: string
  organization?: string
}

interface CertificatePreviewProps {
  template: "ux_design_foundations" | "product_designer_1" | "academic" | "modern"
  data: CertificateData
  width?: number
  height?: number
}

const CertificatePreview: React.FC<CertificatePreviewProps> = ({ 
  template, 
  data, 
  width = 800, 
  height = 600 
}) => {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)

  const handleCanvasReady = (canvasElement: HTMLCanvasElement) => {
    setCanvas(canvasElement)
  }

  // Use canvas-based rendering for ux_design_foundations and product_designer_1
  if (template === "ux_design_foundations" || template === "product_designer_1") {
    const certificateData = {
      recipientName: data.recipientName,
      courseName: data.courseName,
      achievement: data.courseName,
      description: data.description,
      issueDate: data.issueDate,
      certificateId: data.certificateId,
      signatory: data.signatory,
      organization: data.organization
    }

    return (
      <div className="space-y-4">
        <CanvasCertificate
          template={template}
          data={certificateData}
          width={width}
          height={height}
          onCanvasReady={handleCanvasReady}
        />
        <div className="flex justify-center">
          <CertificateDownload 
            canvas={canvas} 
            fileName={`certificate-${data.recipientName.toLowerCase().replace(/\s+/g, '-')}`}
            className="w-fit"
          />
        </div>
      </div>
    )
  }


  // Academic template (custom)
  if (template === "academic") {
    const scaleX = width / 800
    const scaleY = height / 600
    return (
      <div 
        className="relative bg-gradient-to-br from-blue-50 to-indigo-50 border-4 border-indigo-200 rounded-[15px] overflow-hidden font-inter"
        style={{ 
          width: `${width}px`, 
          height: `${height}px`,
          transform: `scale(${Math.min(scaleX, scaleY)})`,
          transformOrigin: 'top left'
        }}
      >
        {/* Academic Badge */}
        <div className="absolute" style={{ left: `${400 * scaleX}px`, top: `${70 * scaleY}px`, transform: 'translate(-50%, -50%)' }}>
          <div className="bg-indigo-600 rounded-full p-4 shadow-lg">
            <GraduationCap className="text-white" style={{ width: `${32 * scaleX}px`, height: `${32 * scaleY}px` }} />
          </div>
        </div>

        {/* University/Institution Header */}
        <div 
          className="absolute text-indigo-700 font-bold text-center"
          style={{ 
            left: `${400 * scaleX}px`, 
            top: `${120 * scaleY}px`, 
            transform: 'translate(-50%, 0)',
            fontSize: `${16 * Math.min(scaleX, scaleY)}px`,
            letterSpacing: '1px'
          }}
        >
          UNIVERSITAS TEKNOLOGI INDONESIA
        </div>

        {/* Certificate Title */}
        <div 
          className="absolute text-indigo-900 font-light text-center tracking-wider"
          style={{ 
            left: `${400 * scaleX}px`, 
            top: `${150 * scaleY}px`, 
            transform: 'translate(-50%, 0)',
            fontSize: `${14 * Math.min(scaleX, scaleY)}px`,
            letterSpacing: '3px'
          }}
        >
          SERTIFIKAT PRESTASI
        </div>

        {/* Course Name */}
        <div 
          className="absolute text-gray-800 font-bold text-center"
          style={{ 
            left: `${400 * scaleX}px`, 
            top: `${200 * scaleY}px`, 
            transform: 'translate(-50%, 0)',
            fontSize: `${36 * Math.min(scaleX, scaleY)}px`,
            lineHeight: '1.2'
          }}
        >
          {data.courseName}
        </div>

        {/* Issued To */}
        <div 
          className="absolute text-gray-600 text-center"
          style={{ 
            left: `${400 * scaleX}px`, 
            top: `${250 * scaleY}px`, 
            transform: 'translate(-50%, 0)',
            fontSize: `${14 * Math.min(scaleX, scaleY)}px`
          }}
        >
          Diberikan kepada
        </div>

        {/* Recipient Name */}
        <div 
          className="absolute text-gray-800 font-semibold text-center border-b-2 border-gray-300 pb-2"
          style={{ 
            left: `${400 * scaleX}px`, 
            top: `${280 * scaleY}px`, 
            transform: 'translate(-50%, 0)',
            fontSize: `${28 * Math.min(scaleX, scaleY)}px`,
            minWidth: `${300 * scaleX}px`
          }}
        >
          {data.recipientName}
        </div>

        {/* Description */}
        <div 
          className="absolute text-gray-700 text-center leading-relaxed"
          style={{ 
            left: `${400 * scaleX}px`, 
            top: `${340 * scaleY}px`, 
            transform: 'translate(-50%, 0)',
            fontSize: `${14 * Math.min(scaleX, scaleY)}px`,
            maxWidth: `${500 * scaleX}px`,
            lineHeight: '1.6'
          }}
        >
          {data.description}
        </div>

        {/* Date and Location */}
        <div 
          className="absolute text-gray-600"
          style={{ 
            left: `${150 * scaleX}px`, 
            top: `${450 * scaleY}px`,
            fontSize: `${12 * Math.min(scaleX, scaleY)}px`
          }}
        >
          Jakarta, {data.issueDate}
        </div>

        {/* Signature */}
        <div 
          className="absolute text-center"
          style={{ 
            left: `${400 * scaleX}px`, 
            top: `${470 * scaleY}px`,
            transform: 'translate(-50%, 0)'
          }}
        >
          <div 
            className="text-gray-800 font-dancing-script mb-2"
            style={{ fontSize: `${20 * Math.min(scaleX, scaleY)}px` }}
          >
            {data.signatory || "Dr. Rektor Universitas"}
          </div>
          <div 
            className="text-gray-600"
            style={{ fontSize: `${12 * Math.min(scaleX, scaleY)}px` }}
          >
            Rektor
          </div>
        </div>

        {/* University Seal */}
        <div 
          className="absolute"
          style={{ 
            left: `${650 * scaleX}px`, 
            top: `${470 * scaleY}px`, 
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div 
            className="bg-indigo-100 border-2 border-indigo-300 rounded-full flex items-center justify-center"
            style={{ 
              width: `${60 * scaleX}px`, 
              height: `${60 * scaleY}px`
            }}
          >
            <Star className="text-indigo-600" style={{ width: `${24 * scaleX}px`, height: `${24 * scaleY}px` }} />
          </div>
        </div>

        {/* Certificate ID */}
        <div 
          className="absolute text-gray-500 text-right"
          style={{ 
            right: `${50 * scaleX}px`, 
            bottom: `${30 * scaleY}px`,
            fontSize: `${10 * Math.min(scaleX, scaleY)}px`
          }}
        >
          Certificate ID: {data.certificateId || "CERT-2024-001"}
        </div>
      </div>
    )
  }

  // Modern template (default fallback)
  const scaleX = width / 800
  const scaleY = height / 600
  return (
    <div 
      className="relative bg-gradient-to-br from-violet-50 to-indigo-100 border-2 border-violet-200 rounded-[20px] overflow-hidden font-inter shadow-xl"
      style={{ 
        width: `${width}px`, 
        height: `${height}px`,
        transform: `scale(${Math.min(scaleX, scaleY)})`,
        transformOrigin: 'top left'
      }}
    >
      {/* Modern Badge */}
      <div className="absolute" style={{ left: `${400 * scaleX}px`, top: `${80 * scaleY}px`, transform: 'translate(-50%, -50%)' }}>
        <div className="bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full p-4 shadow-lg">
          <Award className="text-white" style={{ width: `${28 * scaleX}px`, height: `${28 * scaleY}px` }} />
        </div>
      </div>

      {/* Modern Header */}
      <div 
        className="absolute text-violet-700 font-semibold text-center"
        style={{ 
          left: `${400 * scaleX}px`, 
          top: `${140 * scaleY}px`, 
          transform: 'translate(-50%, 0)',
          fontSize: `${14 * Math.min(scaleX, scaleY)}px`,
          letterSpacing: '2px'
        }}
      >
        CERTIFICATE OF ACHIEVEMENT
      </div>

      {/* Course Name */}
      <div 
        className="absolute bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600 font-bold text-center"
        style={{ 
          left: `${400 * scaleX}px`, 
          top: `${190 * scaleY}px`, 
          transform: 'translate(-50%, 0)',
          fontSize: `${42 * Math.min(scaleX, scaleY)}px`,
          lineHeight: '1.1'
        }}
      >
        {data.courseName}
      </div>

      {/* Recipient Name */}
      <div 
        className="absolute text-gray-800 font-semibold text-center"
        style={{ 
          left: `${400 * scaleX}px`, 
          top: `${270 * scaleY}px`, 
          transform: 'translate(-50%, 0)',
          fontSize: `${30 * Math.min(scaleX, scaleY)}px`
        }}
      >
        {data.recipientName}
      </div>

      {/* Description */}
      <div 
        className="absolute text-gray-600 text-center leading-relaxed"
        style={{ 
          left: `${400 * scaleX}px`, 
          top: `${330 * scaleY}px`, 
          transform: 'translate(-50%, 0)',
          fontSize: `${14 * Math.min(scaleX, scaleY)}px`,
          maxWidth: `${480 * scaleX}px`,
          lineHeight: '1.5'
        }}
      >
        {data.description}
      </div>

      {/* Signature and Date */}
      <div className="absolute bottom-0 left-0 right-0 p-8 bg-white/50 backdrop-blur-sm">
        <div className="flex justify-between items-end">
          <div className="text-center">
            <div 
              className="border-b-2 border-gray-400 mb-2"
              style={{ width: `${120 * scaleX}px`, height: '1px' }}
            ></div>
            <div 
              className="text-gray-700 font-dancing-script"
              style={{ fontSize: `${16 * Math.min(scaleX, scaleY)}px` }}
            >
              {data.signatory || "Digital Signature"}
            </div>
          </div>
          <div 
            className="text-gray-600"
            style={{ fontSize: `${12 * Math.min(scaleX, scaleY)}px` }}
          >
            Issued: {data.issueDate}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CertificatePreview