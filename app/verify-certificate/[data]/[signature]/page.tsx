"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  CheckCircle,
  XCircle,
  Award,
  Calendar,
  User,
  GraduationCap,
  Shield,
  Eye,
  Loader2,
  FileText,
  Building2
} from "lucide-react"

interface VerificationResult {
  success: boolean
  data?: {
    verificationId: string
    certificateTitle: string
    participantName: string
    programName: string
    issueDate: string
    overallGrade: string
    prodiName: string
    signedBy: string | null
    signedAt: string | null
    verificationCount: number
    isValid: boolean
  }
  error?: string
}

export default function CertificateVerificationPage() {
  const params = useParams()
  const [result, setResult] = useState<VerificationResult | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const verifySignature = async () => {
      try {
        const { data, signature } = params
        const response = await fetch(
          `/api/certificates/verify?data=${data}&signature=${signature}`
        )
        const json = await response.json()
        setResult(json)
      } catch (error) {
        setResult({
          success: false,
          error: "Failed to verify certificate"
        })
      } finally {
        setLoading(false)
      }
    }

    verifySignature()
  }, [params])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardContent className="p-12 text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-blue-600 mb-4" />
            <p className="text-gray-600">Memverifikasi sertifikat...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const isValid = result?.success && result?.data?.isValid

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <div className="max-w-4xl mx-auto py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-green-600 rounded-full">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600 mb-2">
            Verifikasi Sertifikat Laboratorium
          </h1>
          <p className="text-gray-600">
            Sistem verifikasi digital menggunakan HMAC-SHA256
          </p>
        </div>

        {/* Verification Result */}
        <Card className={`border-2 ${isValid ? 'border-green-200 bg-green-50/50' : 'border-red-200 bg-red-50/50'}`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3">
                {isValid ? (
                  <>
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <span className="text-green-900">Sertifikat Valid</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-6 w-6 text-red-600" />
                    <span className="text-red-900">Sertifikat Tidak Valid</span>
                  </>
                )}
              </CardTitle>
              <Badge
                variant={isValid ? "default" : "destructive"}
                className="text-sm"
              >
                {isValid ? "✓ TERVERIFIKASI" : "✗ GAGAL"}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {isValid && result.data ? (
              <>
                {/* Main Info */}
                <div className="grid gap-4">
                  <div className="flex items-start gap-3 p-4 bg-white rounded-lg border">
                    <Award className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Judul Sertifikat</p>
                      <p className="font-semibold text-lg">{result.data.certificateTitle}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-white rounded-lg border">
                    <User className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Penerima</p>
                      <p className="font-semibold text-lg">{result.data.participantName}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-white rounded-lg border">
                    <GraduationCap className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Program</p>
                      <p className="font-semibold">{result.data.programName}</p>
                    </div>
                  </div>
                </div>

                {/* Additional Info Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white rounded-lg border">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <Building2 className="h-4 w-4" />
                      Program Studi
                    </div>
                    <p className="font-medium">{result.data.prodiName}</p>
                  </div>

                  <div className="p-4 bg-white rounded-lg border">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <Award className="h-4 w-4" />
                      Nilai Akhir
                    </div>
                    <p className="font-bold text-xl text-green-600">{result.data.overallGrade}</p>
                  </div>

                  <div className="p-4 bg-white rounded-lg border">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <Calendar className="h-4 w-4" />
                      Tanggal Terbit
                    </div>
                    <p className="font-medium">
                      {new Date(result.data.issueDate).toLocaleDateString('id-ID', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>

                  <div className="p-4 bg-white rounded-lg border">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <FileText className="h-4 w-4" />
                      ID Verifikasi
                    </div>
                    <p className="font-mono text-xs">{result.data.verificationId}</p>
                  </div>
                </div>

                {/* Signature Info */}
                {result.data.signedBy && result.data.signedAt && (
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-4 w-4 text-blue-600" />
                      <p className="text-sm font-medium text-blue-900">
                        Informasi Tanda Tangan Digital
                      </p>
                    </div>
                    <div className="space-y-1 text-sm">
                      <p className="text-gray-700">
                        <span className="font-medium">Ditandatangani oleh:</span> {result.data.signedBy}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Waktu:</span>{" "}
                        {new Date(result.data.signedAt).toLocaleString('id-ID')}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Jumlah Verifikasi:</span>{" "}
                        {result.data.verificationCount}x
                      </p>
                    </div>
                  </div>
                )}

                {/* Security Info */}
                <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-green-900 mb-1">
                        Sertifikat ini telah diverifikasi dan sah
                      </p>
                      <p className="text-sm text-gray-700">
                        Menggunakan algoritma HMAC-SHA256 untuk memastikan keaslian dan
                        integritas dokumen. Sertifikat ini diterbitkan oleh Laboratorium
                        Informatika dan tidak dapat dipalsukan.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="p-6 text-center">
                <XCircle className="h-16 w-16 text-red-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-red-900 mb-2">
                  Verifikasi Gagal
                </h3>
                <p className="text-gray-700 mb-4">
                  {result?.error || "Sertifikat tidak valid atau telah dimodifikasi"}
                </p>
                <div className="text-sm text-gray-600 bg-red-50 p-4 rounded-lg border border-red-200">
                  <p className="font-medium mb-2">Kemungkinan Penyebab:</p>
                  <ul className="list-disc list-inside space-y-1 text-left">
                    <li>QR Code telah dimodifikasi atau rusak</li>
                    <li>Sertifikat tidak terdaftar dalam sistem</li>
                    <li>Tanda tangan digital tidak cocok</li>
                  </ul>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Sistem Verifikasi Sertifikat Laboratorium Informatika
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Powered by HMAC-SHA256 Digital Signature
          </p>
        </div>
      </div>
    </div>
  )
}
