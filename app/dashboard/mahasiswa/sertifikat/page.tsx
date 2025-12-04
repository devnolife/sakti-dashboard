"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Award,
  Calendar,
  Download,
  FileText,
  Trophy,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Certificate {
  id: string;
  verification_id: string;
  certificate_title: string;
  participant_name: string;
  participant_nim: string;
  program_name: string;
  subtitle: string | null;
  issue_date: string;
  pdf_url: string | null;
  prodi: {
    nama: string;
  };
  created_at: string;
}

interface ApiResponse {
  success: boolean;
  certificates: Certificate[];
  studentInfo: {
    nim: string;
    name: string;
  };
}

export default function StudentCertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [studentInfo, setStudentInfo] = useState<{
    nim: string;
    name: string;
  } | null>(null);
  const [downloadingIds, setDownloadingIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/certificates/laboratory/student");

      if (!response.ok) {
        throw new Error("Failed to fetch certificates");
      }

      const data: ApiResponse = await response.json();

      if (data.success) {
        setCertificates(data.certificates);
        setStudentInfo(data.studentInfo);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err: any) {
      console.error("Error fetching certificates:", err);
      setError(err.message || "Terjadi kesalahan saat memuat sertifikat");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (certificate: Certificate) => {
    if (!certificate.pdf_url) {
      alert("PDF sertifikat tidak tersedia");
      return;
    }

    setDownloadingIds((prev) => new Set(prev).add(certificate.id));

    try {
      // Fetch the PDF from MinIO proxy
      const response = await fetch(certificate.pdf_url);

      if (!response.ok) {
        throw new Error("Failed to download certificate");
      }

      const blob = await response.blob();

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      // Generate filename
      const safeName = certificate.participant_name
        .replace(/[^a-zA-Z0-9\s]/g, "")
        .replace(/\s+/g, "_");
      const safeCertId = certificate.verification_id.replace(/\//g, "-");
      link.download = `Sertifikat_${safeCertId}_${safeName}.pdf`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      console.error("Error downloading certificate:", err);
      alert("Gagal mengunduh sertifikat. Silakan coba lagi.");
    } finally {
      setDownloadingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(certificate.id);
        return newSet;
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 mx-auto animate-spin text-primary" />
          <p className="text-muted-foreground">Memuat sertifikat...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-8">
        <div className="relative p-8 overflow-hidden dark:from-primary-950/40 dark:to-accent-950/40 dark:border-primary-900/50">
          <div className="absolute inset-0 bg-grid-primary/10 [mask-image:linear-gradient(0deg,white,transparent)]" />
          <div className="relative">
            <h2 className="text-3xl font-bold tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400">
                Sertifikat Laboratorium
              </span>
            </h2>
            <p className="max-w-2xl mt-2 text-muted-foreground">
              Koleksi sertifikat pelatihan laboratorium yang telah kamu
              selesaikan
            </p>
          </div>
        </div>

        <Alert variant="destructive">
          <AlertCircle className="w-4 h-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="relative p-8 overflow-hidden dark:from-primary-950/40 dark:to-accent-950/40 dark:border-primary-900/50">
        <div className="absolute inset-0 bg-grid-primary/10 [mask-image:linear-gradient(0deg,white,transparent)]" />
        <div className="relative">
          <h2 className="text-3xl font-bold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400">
              Sertifikat Laboratorium
            </span>
          </h2>
          <p className="max-w-2xl mt-2 text-muted-foreground">
            Koleksi sertifikat pelatihan laboratorium yang telah kamu
            selesaikan. Unduh dan simpan sertifikatmu untuk keperluan akademik
            atau profesional.
          </p>
          {studentInfo && (
            <div className="flex items-center gap-4 mt-4">
              <Badge variant="outline" className="text-sm">
                <FileText className="w-3 h-3 mr-1" />
                NIM: {studentInfo.nim}
              </Badge>
              <Badge variant="outline" className="text-sm">
                <Award className="w-3 h-3 mr-1" />
                {certificates.length} Sertifikat
              </Badge>
            </div>
          )}
        </div>
      </div>

      {/* Certificates List */}
      {certificates.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="p-4 mb-4 rounded-full bg-muted">
              <Trophy className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Belum Ada Sertifikat</h3>
            <p className="max-w-md mb-6 text-muted-foreground">
              Kamu belum memiliki sertifikat laboratorium. Ikuti pelatihan
              laboratorium untuk mendapatkan sertifikat.
            </p>
            <Button variant="outline" asChild>
              <a href="/dashboard/mahasiswa/laboratory">
                <FileText className="w-4 h-4 mr-2" />
                Lihat Laboratorium Tersedia
              </a>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {certificates.map((certificate) => (
            <Card
              key={certificate.id}
              className="overflow-hidden transition-all duration-300 hover:shadow-lg group"
            >
              <CardHeader className="pb-4 space-y-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg leading-tight break-words">
                      {certificate.certificate_title}
                    </CardTitle>
                  </div>
                  <Badge
                    variant="secondary"
                    className="shrink-0 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  >
                    <Trophy className="w-3 h-3 mr-1" />
                    Selesai
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Certificate Details */}
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Award className="w-4 h-4 mt-0.5 shrink-0 text-muted-foreground" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-muted-foreground">
                        Program
                      </p>
                      <p className="text-sm break-words">
                        {certificate.program_name}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Calendar className="w-4 h-4 mt-0.5 shrink-0 text-muted-foreground" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-muted-foreground">
                        Tanggal Terbit
                      </p>
                      <p className="text-sm">
                        {format(
                          new Date(certificate.issue_date),
                          "dd MMMM yyyy",
                          {
                            locale: id,
                          }
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <FileText className="w-4 h-4 mt-0.5 shrink-0 text-muted-foreground" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-muted-foreground">
                        Nomor Sertifikat
                      </p>
                      <p className="text-xs break-all font-mono bg-muted px-2 py-1 rounded">
                        {certificate.verification_id}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Download Button */}
                <div className="pt-4 border-t">
                  {certificate.pdf_url ? (
                    <Button
                      onClick={() => handleDownload(certificate)}
                      disabled={downloadingIds.has(certificate.id)}
                      className="w-full"
                      variant="default"
                    >
                      {downloadingIds.has(certificate.id) ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Mengunduh...
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4 mr-2" />
                          Unduh Sertifikat
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button disabled className="w-full" variant="secondary">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      PDF Tidak Tersedia
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
