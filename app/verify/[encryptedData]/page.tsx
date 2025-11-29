"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle2,
  XCircle,
  Loader2,
  Award,
  Calendar,
  User,
  Building,
  FileText,
  Shield,
  Eye,
  ArrowLeft,
} from "lucide-react";

interface CertificateData {
  verificationId: string;
  certificateTitle: string;
  participantName: string;
  programName: string;
  subtitle?: string;
  issueDate: string;

  // Performance & Analytics (Optional)
  meetings?: number;
  totalScore?: number;
  materials?: number;
  attendanceRate?: number;
  assignmentCompletion?: number;
  participationScore?: number;
  overallGrade?: string;
  learningHours?: number;
  weeklyData?: number[];
  learningVelocity?: number;
  collaborationScore?: number;
  problemSolvingEfficiency?: number;
  competencies?: any;
  technologies?: string[];

  // Signature & Verification
  signedAt?: string;
  signedBy?: string;
  verificationCount: number;
  createdAt: string;
  prodi: string;
}

export default function VerifyCertificatePage() {
  const params = useParams();
  const router = useRouter();
  const encryptedData = params.encryptedData as string;

  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState<boolean | null>(null);
  const [certificate, setCertificate] = useState<CertificateData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!encryptedData) {
      setError("Data verifikasi tidak ditemukan");
      setLoading(false);
      return;
    }

    verifyCertificate();
  }, [encryptedData]);

  const verifyCertificate = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/certificates/laboratory/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ encryptedData }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Gagal memverifikasi sertifikat");
      }

      setValid(data.valid);
      setCertificate(data.certificate);
    } catch (err: any) {
      console.error("Verification error:", err);
      setError(err.message || "Gagal memverifikasi sertifikat");
      setValid(false);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center space-y-4">
              <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
              <p className="text-lg font-medium text-gray-700">
                Memverifikasi sertifikat...
              </p>
              <p className="text-sm text-gray-500">Mohon tunggu sebentar</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali
        </Button>

        {valid && certificate ? (
          <Card className="border-2 border-green-200 shadow-xl bg-slate-900">
            <CardHeader className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 border-b-2 border-green-700">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-green-500/20 rounded-full">
                    <CheckCircle2 className="h-8 w-8 text-green-400" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-green-100">
                      ✅ Sertifikat Valid
                    </CardTitle>
                    <CardDescription className="text-green-300">
                      Sertifikat ini terdaftar dan terverifikasi
                    </CardDescription>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className="bg-green-500/20 text-green-300 border-green-500"
                >
                  <Shield className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="pt-6 space-y-6">
              {/* Certificate Details */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Award className="h-5 w-5 text-blue-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-300">
                      Judul Sertifikat
                    </p>
                    <p className="text-lg font-semibold text-white">
                      {certificate.certificateTitle}
                    </p>
                    {certificate.subtitle && (
                      <p className="text-sm text-gray-400 mt-1">
                        {certificate.subtitle}
                      </p>
                    )}
                  </div>
                </div>

                <Separator className="bg-gray-700" />

                <div className="flex items-start space-x-3">
                  <User className="h-5 w-5 text-blue-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-300">
                      Nama Peserta
                    </p>
                    <p className="text-lg font-semibold text-white">
                      {certificate.participantName}
                    </p>
                  </div>
                </div>

                <Separator className="bg-gray-700" />

                <div className="flex items-start space-x-3">
                  <FileText className="h-5 w-5 text-blue-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-300">
                      Nama Program
                    </p>
                    <p className="text-lg font-semibold text-white">
                      {certificate.programName}
                    </p>
                  </div>
                </div>

                <Separator className="bg-gray-700" />

                <div className="flex items-start space-x-3">
                  <Building className="h-5 w-5 text-blue-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-300">
                      Program Studi
                    </p>
                    <p className="text-base text-white">{certificate.prodi}</p>
                  </div>
                </div>

                <Separator className="bg-gray-700" />

                <div className="flex items-start space-x-3">
                  <Calendar className="h-5 w-5 text-blue-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-300">
                      Tanggal Terbit
                    </p>
                    <p className="text-base text-white">
                      {formatDate(certificate.issueDate)}
                    </p>
                  </div>
                </div>

                {/* Performance Metrics - Only show if data exists */}
                {(certificate.meetings ||
                  certificate.totalScore ||
                  certificate.overallGrade) && (
                  <>
                    <Separator className="bg-gray-700" />
                    <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4 space-y-3">
                      <p className="text-sm font-medium text-blue-200 flex items-center">
                        <Award className="h-4 w-4 mr-2" />
                        Performa & Pencapaian
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {certificate.meetings && (
                          <div className="bg-slate-800/50 rounded p-3">
                            <p className="text-xs text-gray-400">Pertemuan</p>
                            <p className="text-lg font-semibold text-white">
                              {certificate.meetings}x
                            </p>
                          </div>
                        )}
                        {certificate.totalScore && (
                          <div className="bg-slate-800/50 rounded p-3">
                            <p className="text-xs text-gray-400">Total Skor</p>
                            <p className="text-lg font-semibold text-white">
                              {certificate.totalScore}
                            </p>
                          </div>
                        )}
                        {certificate.overallGrade && (
                          <div className="bg-slate-800/50 rounded p-3">
                            <p className="text-xs text-gray-400">Grade</p>
                            <p className="text-lg font-semibold text-white">
                              {certificate.overallGrade}
                            </p>
                          </div>
                        )}
                        {certificate.attendanceRate !== undefined && (
                          <div className="bg-slate-800/50 rounded p-3">
                            <p className="text-xs text-gray-400">Kehadiran</p>
                            <p className="text-lg font-semibold text-white">
                              {certificate.attendanceRate}%
                            </p>
                          </div>
                        )}
                        {certificate.assignmentCompletion !== undefined && (
                          <div className="bg-slate-800/50 rounded p-3">
                            <p className="text-xs text-gray-400">Tugas</p>
                            <p className="text-lg font-semibold text-white">
                              {certificate.assignmentCompletion}%
                            </p>
                          </div>
                        )}
                        {certificate.learningHours && (
                          <div className="bg-slate-800/50 rounded p-3">
                            <p className="text-xs text-gray-400">Jam Belajar</p>
                            <p className="text-lg font-semibold text-white">
                              {certificate.learningHours}h
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {/* Technologies - Only show if data exists */}
                {certificate.technologies &&
                  certificate.technologies.length > 0 && (
                    <>
                      <Separator className="bg-gray-700" />
                      <div className="flex items-start space-x-3">
                        <FileText className="h-5 w-5 text-blue-400 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-300 mb-2">
                            Teknologi yang Dipelajari
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {certificate.technologies.map((tech, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="bg-blue-900/50 text-blue-200 border-blue-700"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                <Separator className="bg-gray-700" />

                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-blue-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-300">
                      Nomor Verifikasi
                    </p>
                    <p className="text-base font-mono text-white">
                      {certificate.verificationId}
                    </p>
                  </div>
                </div>

                {/* Signature Info - Only show if signed */}
                {certificate.signedBy && certificate.signedAt && (
                  <>
                    <Separator className="bg-gray-700" />
                    <div className="flex items-start space-x-3">
                      <Shield className="h-5 w-5 text-blue-400 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-300">
                          Tanda Tangan Digital
                        </p>
                        <p className="text-base text-white">
                          {certificate.signedBy}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          Ditandatangani: {formatDate(certificate.signedAt)}
                        </p>
                      </div>
                    </div>
                  </>
                )}

                <Separator className="bg-gray-700" />

                <div className="flex items-start space-x-3">
                  <Eye className="h-5 w-5 text-blue-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-300">
                      Statistik Verifikasi
                    </p>
                    <p className="text-base text-white">
                      Telah diverifikasi:{" "}
                      <span className="font-semibold">
                        {certificate.verificationCount}
                      </span>{" "}
                      kali
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Sertifikat dibuat: {formatDate(certificate.createdAt)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <Shield className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-blue-200">
                      Informasi Verifikasi
                    </p>
                    <p className="text-xs text-blue-300 mt-1">
                      Sertifikat ini telah terverifikasi dan terdaftar dalam
                      sistem database Laboratorium Informatika. Data yang
                      ditampilkan dijamin autentik dan akurat.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-2 border-red-200 shadow-xl bg-slate-900">
            <CardHeader className="bg-gradient-to-r from-red-900/50 to-rose-900/50 border-b-2 border-red-700">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-red-500/20 rounded-full">
                  <XCircle className="h-8 w-8 text-red-400" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-red-100">
                    ❌ Sertifikat Tidak Valid
                  </CardTitle>
                  <CardDescription className="text-red-300">
                    Sertifikat tidak ditemukan atau data tidak valid
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-6">
              <div className="bg-red-900/30 border border-red-700 rounded-lg p-4">
                <p className="text-sm text-red-200 font-medium mb-2">Alasan:</p>
                <p className="text-sm text-red-300">
                  {error || "Sertifikat tidak ditemukan dalam database"}
                </p>
              </div>

              <div className="mt-6 space-y-2">
                <p className="text-sm font-medium text-white">
                  Kemungkinan penyebab:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
                  <li>QR Code rusak atau tidak dapat dibaca</li>
                  <li>Sertifikat belum terdaftar dalam sistem</li>
                  <li>Data QR Code tidak valid atau telah dimodifikasi</li>
                  <li>Link verifikasi sudah kadaluarsa atau salah</li>
                </ul>
              </div>

              <div className="mt-6">
                <Button
                  onClick={() => verifyCertificate()}
                  className="w-full"
                  variant="outline"
                >
                  <Loader2 className="h-4 w-4 mr-2" />
                  Coba Verifikasi Lagi
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-300">
            Sistem Verifikasi Sertifikat Digital
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Laboratorium Informatika - STIE Pembangunan Tanjungpinang
          </p>
        </div>
      </div>
    </div>
  );
}
