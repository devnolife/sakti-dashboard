"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Shield, Calendar, User, FileText, Hash, Clock } from "lucide-react"

interface VerificationData {
  documentNumber: string
  issueDate: string
  studentName: string
  studentNim: string
  status: string
  signedBy: string
  signedAt: string
  verificationCount: number
}

export default function VerificationPage() {
  const params = useParams()
  const [verificationResult, setVerificationResult] = useState<{
    success: boolean
    data?: VerificationData
    error?: string
  } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    verifyDocument()
  }, [])

  const verifyDocument = async () => {
    try {
      const response = await fetch(
        `/api/verify?data=${params.data}&signature=${params.signature}`
      )
      const result = await response.json()
      setVerificationResult(result)
    } catch (error) {
      setVerificationResult({
        success: false,
        error: 'Failed to verify document'
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Shield className="w-16 h-16 mx-auto mb-4 animate-pulse text-primary" />
          <p className="text-lg font-medium">Memverifikasi dokumen...</p>
          <p className="text-sm text-muted-foreground mt-2">Mohon tunggu sebentar</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-3xl py-12 px-4">
      <Card className="shadow-lg">
        <CardHeader className="border-b">
          <div className="flex items-center gap-3">
            {verificationResult?.success ? (
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            ) : (
              <div className="p-3 bg-red-100 rounded-full">
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
            )}
            <div>
              <CardTitle className="text-2xl">
                {verificationResult?.success
                  ? 'Dokumen Terverifikasi'
                  : 'Verifikasi Gagal'}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {verificationResult?.success
                  ? 'Dokumen ini sah dan memiliki tanda tangan digital yang valid'
                  : 'Dokumen tidak dapat diverifikasi'}
              </p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-6">
          {verificationResult?.success && verificationResult.data ? (
            <div className="space-y-6">
              <div className="p-4 border-l-4 border-green-500 bg-green-50 rounded-r-lg">
                <p className="text-sm font-medium text-green-800 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Dokumen ini telah ditandatangani secara digital dan telah diverifikasi sebagai asli
                </p>
              </div>

              <div className="grid gap-4">
                <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                  <FileText className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground">Nomor Surat</p>
                    <p className="font-mono text-lg font-semibold mt-1">
                      {verificationResult.data.documentNumber}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                  <User className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground">Mahasiswa</p>
                    <p className="text-lg font-semibold mt-1">
                      {verificationResult.data.studentName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      NIM: {verificationResult.data.studentNim}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                  <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground">Tanggal Terbit</p>
                    <p className="text-lg font-semibold mt-1">
                      {new Date(verificationResult.data.issueDate).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                  <Shield className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground">Ditandatangani Oleh</p>
                    <p className="text-lg font-semibold mt-1">
                      {verificationResult.data.signedBy}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(verificationResult.data.signedAt).toLocaleString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                  <Hash className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground">Status Dokumen</p>
                    <Badge variant="outline" className="mt-2">
                      {verificationResult.data.status}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                  <Clock className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground">Riwayat Verifikasi</p>
                    <p className="text-lg font-semibold mt-1">
                      Telah diverifikasi {verificationResult.data.verificationCount} kali
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-xs text-muted-foreground text-center">
                  Verifikasi dilakukan pada {new Date().toLocaleString('id-ID')}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 border-l-4 border-red-500 bg-red-50 rounded-r-lg">
                <p className="text-sm font-medium text-red-800 flex items-center gap-2">
                  <XCircle className="w-4 h-4" />
                  {verificationResult?.error || 'Dokumen tidak dapat diverifikasi'}
                </p>
              </div>

              <div className="p-6 bg-muted/50 rounded-lg text-center">
                <Shield className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="font-medium mb-2">Kemungkinan Penyebab:</p>
                <ul className="text-sm text-muted-foreground text-left max-w-md mx-auto space-y-1">
                  <li>• QR Code rusak atau tidak valid</li>
                  <li>• Dokumen telah dimodifikasi</li>
                  <li>• Tanda tangan digital tidak sesuai</li>
                  <li>• Link verifikasi sudah tidak berlaku</li>
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Powered by Digital Signature System
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          © 2025 Fakultas Teknik Universitas Muhammadiyah
        </p>
      </div>
    </div>
  )
}