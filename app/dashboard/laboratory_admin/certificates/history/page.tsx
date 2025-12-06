"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ClipboardList,
  Search,
  Download,
  Eye,
  Calendar,
  Users,
  FileText,
  TrendingUp,
  BarChart3,
  Award,
  User,
  GraduationCap,
  Loader2,
  Lock,
  Copy,
  QrCode,
  Shield,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Certificate {
  id: string;
  verification_id: string;
  certificate_title: string;
  participant_name: string;
  program_name: string;
  subtitle: string;
  issue_date: string;
  meetings: number;
  total_score: number;
  materials: number;
  attendance_rate: number;
  assignment_completion: number;
  participation_score: number;
  overall_grade: string;
  learning_hours: number;
  weekly_data: number[];
  learning_velocity: number;
  collaboration_score: number;
  problem_solving_efficiency: number;
  competencies: any;
  technologies: string[];
  qr_code_url: string | null;
  pdf_url: string | null;
  pdf_password: string | null;
  signature: string | null;
  qr_signature_url: string | null;
  signed_at: string | null;
  signed_by: string | null;
  verification_count: number;
  prodi_id: string;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  prodi: {
    kode: string;
    nama: string;
  };
}

export default function CertificateHistoryPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const [sortBy, setSortBy] = useState<"date" | "verification_id">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        search: searchQuery,
        sortBy: sortBy,
        sortOrder: sortOrder,
      });

      const response = await fetch(`/api/certificates?${params}`);
      const result = await response.json();

      if (result.success) {
        setCertificates(result.data);
        setTotalPages(result.pagination.totalPages);
        setTotal(result.pagination.total);
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to fetch certificates",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch certificates",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, [page, searchQuery, sortBy, sortOrder]);

  const copyPassword = (password: string) => {
    navigator.clipboard.writeText(password);
    toast({
      title: "Copied!",
      description: "Password berhasil disalin ke clipboard",
    });
  };

  const handleDownloadPDF = (cert: Certificate) => {
    if (!cert.pdf_url) {
      toast({
        title: "Error",
        description: "PDF tidak tersedia untuk sertifikat ini",
        variant: "destructive",
      });
      return;
    }

    // Show password info before downloading
    if (cert.pdf_password) {
      const message = `Password PDF: ${cert.pdf_password}\n\nPassword telah disalin ke clipboard. Klik OK untuk download PDF.`;
      copyPassword(cert.pdf_password);
      if (confirm(message)) {
        window.open(cert.pdf_url, "_blank");
      }
    } else {
      window.open(cert.pdf_url, "_blank");
    }
  };

  const filteredHistory = certificates.filter((cert) => {
    // Period filtering
    let matchesPeriod = true;
    if (selectedPeriod !== "all") {
      const certDate = new Date(cert.created_at);
      const now = new Date();
      const daysDiff = Math.floor(
        (now.getTime() - certDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      switch (selectedPeriod) {
        case "7days":
          matchesPeriod = daysDiff <= 7;
          break;
        case "30days":
          matchesPeriod = daysDiff <= 30;
          break;
        case "90days":
          matchesPeriod = daysDiff <= 90;
          break;
      }
    }

    return matchesPeriod;
  });

  // Toggle sort order for the same sortBy
  const handleSortChange = (newSortBy: "date" | "verification_id") => {
    if (sortBy === newSortBy) {
      // Toggle order if clicking the same sort option
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // Set new sort by with default desc order
      setSortBy(newSortBy);
      setSortOrder("desc");
    }
  };

  const stats = {
    total: total,
    thisMonth: certificates.filter((cert) => {
      const certDate = new Date(cert.created_at);
      const now = new Date();
      return (
        certDate.getMonth() === now.getMonth() &&
        certDate.getFullYear() === now.getFullYear()
      );
    }).length,
    totalCerts: certificates.length,
    uniqueParticipants: new Set(
      certificates.map((cert) => cert.participant_name)
    ).size,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-lg"></div>
        <div className="relative p-6">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
              <ClipboardList className="h-6 w-6 text-white" />
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">
              Riwayat Sertifikat
            </span>
          </h1>
          <p className="text-muted-foreground mt-2">
            Lihat dan kelola semua sertifikat yang telah dibuat
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Award className="h-4 w-4 text-green-500" />
              Total Sertifikat
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? "-" : stats.total}
            </div>
            <p className="text-xs text-muted-foreground">Semua sertifikat</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-500" />
              Bulan Ini
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? "-" : stats.thisMonth}
            </div>
            <p className="text-xs text-muted-foreground">Sertifikat baru</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <FileText className="h-4 w-4 text-purple-500" />
              Halaman Ini
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? "-" : stats.totalCerts}
            </div>
            <p className="text-xs text-muted-foreground">
              Sertifikat ditampilkan
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-orange-500" />
              Partisipan Unik
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? "-" : stats.uniqueParticipants}
            </div>
            <p className="text-xs text-muted-foreground">Partisipan berbeda</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="list" className="w-full">
        <TabsList>
          <TabsTrigger value="list" className="flex items-center gap-2">
            <ClipboardList className="h-4 w-4" />
            Daftar Sertifikat
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analisis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
                <div>
                  <CardTitle>Riwayat Sertifikat</CardTitle>
                  <p className="text-muted-foreground">
                    Semua sertifikat yang telah dibuat dan diterbitkan
                  </p>
                </div>
                <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                  <Download className="mr-2 h-4 w-4" />
                  Export Laporan
                </Button>
              </div>

              {/* Filters */}
              <div className="flex flex-col lg:flex-row gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Cari berdasarkan nama, program, atau ID verifikasi..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select
                  value={selectedPeriod}
                  onValueChange={setSelectedPeriod}
                >
                  <SelectTrigger className="w-full lg:w-[180px]">
                    <SelectValue placeholder="Periode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Periode</SelectItem>
                    <SelectItem value="7days">7 Hari Terakhir</SelectItem>
                    <SelectItem value="30days">30 Hari Terakhir</SelectItem>
                    <SelectItem value="90days">90 Hari Terakhir</SelectItem>
                  </SelectContent>
                </Select>

                {/* Sort Buttons */}
                <div className="flex gap-2">
                  <Button
                    variant={sortBy === "date" ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleSortChange("date")}
                    className="flex items-center gap-2"
                  >
                    <Calendar className="h-4 w-4" />
                    Tanggal
                    {sortBy === "date" &&
                      (sortOrder === "asc" ? (
                        <ArrowUp className="h-3 w-3" />
                      ) : (
                        <ArrowDown className="h-3 w-3" />
                      ))}
                  </Button>

                  <Button
                    variant={
                      sortBy === "verification_id" ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => handleSortChange("verification_id")}
                    className="flex items-center gap-2"
                  >
                    <FileText className="h-4 w-4" />
                    No. Sertifikat
                    {sortBy === "verification_id" &&
                      (sortOrder === "asc" ? (
                        <ArrowUp className="h-3 w-3" />
                      ) : (
                        <ArrowDown className="h-3 w-3" />
                      ))}
                  </Button>
                </div>

                {(searchQuery || selectedPeriod !== "all") && (
                  <Badge variant="secondary">
                    {filteredHistory.length} sertifikat
                  </Badge>
                )}
              </div>
            </CardHeader>

            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    {filteredHistory.map((cert) => (
                      <Card
                        key={cert.id}
                        className="hover:shadow-md transition-all duration-200"
                      >
                        <CardContent className="p-4">
                          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                            <div className="flex items-start gap-4 flex-1">
                              <Avatar className="h-12 w-12 bg-gradient-to-br from-green-400 to-emerald-400">
                                <AvatarFallback className="text-white font-semibold">
                                  {cert.participant_name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                    .slice(0, 2)}
                                </AvatarFallback>
                              </Avatar>

                              <div className="flex-1">
                                <div className="flex items-start justify-between mb-2">
                                  <div>
                                    <h3 className="font-semibold text-lg">
                                      {cert.certificate_title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                      {cert.subtitle}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                                      {cert.overall_grade}
                                    </Badge>
                                    {cert.signature && (
                                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 flex items-center gap-1">
                                        <Shield className="h-3 w-3" />
                                        Signed
                                      </Badge>
                                    )}
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm mt-3">
                                  <div className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                      <div className="font-medium">
                                        {cert.participant_name}
                                      </div>
                                      <div className="text-muted-foreground">
                                        Peserta
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                      <div className="font-medium">
                                        {cert.program_name}
                                      </div>
                                      <div className="text-muted-foreground">
                                        Program
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <Award className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                      <div className="font-medium">
                                        {cert.total_score} poin
                                      </div>
                                      <div className="text-muted-foreground">
                                        Total Skor
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                      <div className="font-medium">
                                        {new Date(
                                          cert.issue_date
                                        ).toLocaleDateString("id-ID", {
                                          day: "2-digit",
                                          month: "short",
                                          year: "numeric",
                                        })}
                                      </div>
                                      <div className="text-muted-foreground">
                                        Tanggal terbit
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center justify-between mt-3 pt-3 border-t">
                                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                      <FileText className="h-3 w-3" />
                                      ID: {cert.verification_id}
                                    </span>
                                    <span>Prodi: {cert.prodi.nama}</span>
                                    {cert.pdf_password && (
                                      <button
                                        onClick={() =>
                                          copyPassword(cert.pdf_password!)
                                        }
                                        className="flex items-center gap-1 hover:text-primary transition-colors"
                                        title="Copy PDF Password"
                                      >
                                        <Lock className="h-3 w-3" />
                                        Password:{" "}
                                        {cert.pdf_password.substring(0, 4)}***
                                        <Copy className="h-3 w-3 ml-1" />
                                      </button>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    {cert.qr_signature_url && (
                                      <Button
                                        variant="default"
                                        size="sm"
                                        className="bg-blue-600 hover:bg-blue-700"
                                        onClick={() =>
                                          window.open(
                                            cert.qr_signature_url!,
                                            "_blank"
                                          )
                                        }
                                        title="Download QR Code Signature"
                                      >
                                        <QrCode className="h-4 w-4 mr-1" />
                                        QR
                                      </Button>
                                    )}
                                    {cert.pdf_url && (
                                      <Button
                                        variant="default"
                                        size="sm"
                                        className="bg-green-600 hover:bg-green-700"
                                        onClick={() => handleDownloadPDF(cert)}
                                      >
                                        <Download className="h-4 w-4 mr-1" />
                                        PDF
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    {filteredHistory.length === 0 && !loading && (
                      <div className="text-center py-12">
                        <ClipboardList className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">
                          Tidak ada sertifikat ditemukan
                        </h3>
                        <p className="text-muted-foreground">
                          {searchQuery
                            ? "Coba ubah kata kunci pencarian"
                            : "Belum ada sertifikat yang dibuat"}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-between mt-6 pt-4 border-t">
                      <div className="text-sm text-muted-foreground">
                        Halaman {page} dari {totalPages}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setPage((p) => Math.max(1, p - 1))}
                          disabled={page === 1}
                        >
                          Sebelumnya
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setPage((p) => Math.min(totalPages, p + 1))
                          }
                          disabled={page === totalPages}
                        >
                          Selanjutnya
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid gap-6">
            {/* Grade Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Distribusi Nilai Sertifikat</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {["A", "B", "C", "D", "E"].map((grade) => {
                    const count = certificates.filter(
                      (cert) => cert.overall_grade === grade
                    ).length;
                    const percentage =
                      certificates.length > 0
                        ? Math.round((count / certificates.length) * 100)
                        : 0;

                    return (
                      <div
                        key={grade}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-3 h-3 rounded-full bg-gradient-to-r ${
                              grade === "A"
                                ? "from-green-400 to-green-600"
                                : grade === "B"
                                ? "from-blue-400 to-blue-600"
                                : grade === "C"
                                ? "from-yellow-400 to-yellow-600"
                                : grade === "D"
                                ? "from-orange-400 to-orange-600"
                                : "from-red-400 to-red-600"
                            }`}
                          ></div>
                          <span className="font-medium">Grade {grade}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-24 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full bg-gradient-to-r ${
                                grade === "A"
                                  ? "from-green-400 to-green-600"
                                  : grade === "B"
                                  ? "from-blue-400 to-blue-600"
                                  : grade === "C"
                                  ? "from-yellow-400 to-yellow-600"
                                  : grade === "D"
                                  ? "from-orange-400 to-orange-600"
                                  : "from-red-400 to-red-600"
                              }`}
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-muted-foreground w-16 text-right">
                            {count} ({percentage}%)
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Average Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Rata-rata Metrik</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {certificates.length > 0
                        ? Math.round(
                            certificates.reduce(
                              (sum, c) => sum + c.attendance_rate,
                              0
                            ) / certificates.length
                          )
                        : 0}
                      %
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Kehadiran
                    </div>
                  </div>
                  <div className="text-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {certificates.length > 0
                        ? Math.round(
                            certificates.reduce(
                              (sum, c) => sum + c.assignment_completion,
                              0
                            ) / certificates.length
                          )
                        : 0}
                      %
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Tugas
                    </div>
                  </div>
                  <div className="text-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {certificates.length > 0
                        ? Math.round(
                            certificates.reduce(
                              (sum, c) => sum + c.collaboration_score,
                              0
                            ) / certificates.length
                          )
                        : 0}
                      %
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Kolaborasi
                    </div>
                  </div>
                  <div className="text-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">
                      {certificates.length > 0
                        ? Math.round(
                            certificates.reduce(
                              (sum, c) => sum + c.learning_velocity,
                              0
                            ) / certificates.length
                          )
                        : 0}
                      %
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Kecepatan Belajar
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
