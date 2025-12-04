"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import * as XLSX from "xlsx";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import JSZip from "jszip";
import {
  FileSpreadsheet,
  Download,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Package,
} from "lucide-react";
import LabCertificateTemplate from "@/components/certificates/lab-certificate-template";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

// Helpers for auto-generated fields
function formatIssueDate(date: Date = new Date()) {
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function generateVerificationId(
  certificateNumber: number,
  monthRoman?: string,
  yearHijri?: string,
  yearMasehi?: string
) {
  // Format: {no}/IF/20222/A.5-II/IX/44/2022
  // no = 3-digit certificate number (001, 002, etc.)
  // certificateNumber is now GLOBAL incremental number from database
  const no = String(certificateNumber).padStart(3, "0");
  const month = monthRoman || "I";

  // Use only last 2 digits of Hijriah year
  const fullHijri = yearHijri || "1446";
  const hijri = fullHijri.slice(-2); // Get last 2 digits (e.g., "1446" -> "46")

  const masehi = yearMasehi || new Date().getFullYear().toString();

  return `${no}/IF/20222/A.5-II/${month}/${hijri}/${masehi}`;
}

// Simplified data structure - only what's needed for certificate front page
const defaultStudentData = {
  certificateTitle: "Nama Sertifikat",
  name: "Nama Peserta",
  nim: "105841100125",
  program: "Nama Program",
  subtitle: "Atas keberhasilan menyelesaikan program pelatihan laboratorium",
  issueDate: "00 Bulan 0000",
  issueDateRaw: new Date(),
  verificationId: "001/IF/20222/A.5-II/IX/44/2022",
  instructorName: "Muhyiddin A.M Hayat, S.Kom., M.T",
  organizationName: "Laboratorium Informatika",
  monthRoman: "IX",
  yearHijri: "44",
  yearMasehi: "2022",
  _isUpdate: false, // Flag to indicate if this is an update (for UI indication)
  _currentName: undefined as string | undefined, // Current name in database (if update)
};

type StudentDataType = typeof defaultStudentData;

// Simplified interface - only fields used in certificate template
interface LabCertificateData {
  name: string;
  program: string;
  achievement: string;
  date: string;
  certificateId?: string;
  instructorName?: string;
  organizationName?: string;
}

/**
 * Map StudentDataType to LabCertificateData
 */
function mapStudentDataToLabCertificate(
  student: StudentDataType
): LabCertificateData {
  return {
    name: student.name,
    program: student.program,
    achievement: student.certificateTitle,
    date: student.issueDate,
    certificateId: student.verificationId,
    instructorName:
      student.instructorName || "Muhyiddin A.M Hayat, S.Kom., M.T",
    organizationName: student.organizationName || "Laboratorium Informatika",
  };
}

// Simplified row interface - only fields we read from Excel
interface StudentRowRaw {
  [key: string]: any;
  "Nama Peserta"?: string;
  NIM?: string;
  "Nama Program"?: string;
  "Judul Sertifikat"?: string;
  "Nama Instruktur"?: string;
  "Nama Organisasi"?: string;
  "Bulan (Romawi)"?: string;
  "Tahun Hijriah"?: string;
  "Tahun Masehi"?: string;
}

// Simplified row mapper - only process data needed for front page
function buildRowMapper(warningsRef: string[], startingNumber: number) {
  return function mapRowToStudentWithWarn(
    row: any,
    rowIdx: number
  ): StudentDataType {
    // Map Indonesian columns to expected fields - HANYA DATA YANG DIBUTUHKAN
    const name = row["Nama Peserta"] || row.name || "";

    // NIM handling - should already be processed from Excel cell reading
    // This is just validation and cleanup
    let nim = row["NIM"] || row.nim || "";

    // Convert to string and clean
    if (typeof nim === "number") {
      // Convert number to string (avoid scientific notation)
      nim = nim.toFixed(0);
    } else if (typeof nim === "string") {
      nim = nim.trim();

      // Handle scientific notation in string
      if (nim.toLowerCase().includes("e")) {
        nim = parseFloat(nim).toFixed(0);
        warningsRef.push(
          `Baris ${rowIdx + 2}: NIM dalam format scientific notation. ` +
            `Format kolom NIM sebagai TEXT di Excel untuk hasil terbaik!`
        );
      }
    } else {
      nim = String(nim).trim();
    }

    // Validation: Warn if NIM has too many trailing zeros (precision loss indicator)
    if (nim.length >= 12 && /0{4,}$/.test(nim)) {
      warningsRef.push(
        `⚠️ Baris ${rowIdx + 2}: NIM "${nim}" berakhir dengan 4+ angka nol. ` +
          `Kemungkinan precision loss dari format Number. ` +
          `Solusi: Format kolom NIM sebagai TEXT di Excel, lalu input ulang!`
      );
    }

    const program = row["Nama Program"] || row.program || "";
    const certificateTitle =
      row["Judul Sertifikat"] || row.certificateTitle || "";
    const instructorName =
      row["Nama Instruktur"] ||
      row.instructorName ||
      "Muhyiddin A.M Hayat, S.Kom., M.T";
    const organizationName =
      row["Nama Organisasi"] ||
      row.organizationName ||
      "Laboratorium Informatika";

    // New fields for certificate number format
    const monthRoman = String(
      row["Bulan (Romawi)"] || row.monthRoman || ""
    ).trim();
    const yearHijri = String(
      row["Tahun Hijriah"] || row.yearHijri || ""
    ).trim();
    const yearMasehi = String(
      row["Tahun Masehi"] || row.yearMasehi || ""
    ).trim();

    // Validasi kolom wajib
    if (!name || name.trim() === "") {
      warningsRef.push(
        `Baris ${rowIdx + 2}: Nama Peserta kosong atau tidak valid`
      );
    }
    if (!nim || nim.trim() === "") {
      warningsRef.push(`Baris ${rowIdx + 2}: NIM kosong atau tidak valid`);
    }
    if (!program || program.trim() === "") {
      warningsRef.push(
        `Baris ${rowIdx + 2}: Nama Program kosong atau tidak valid`
      );
    }
    if (!certificateTitle || certificateTitle.trim() === "") {
      warningsRef.push(
        `Baris ${rowIdx + 2}: Judul Sertifikat kosong atau tidak valid`
      );
    }
    if (!monthRoman || monthRoman.trim() === "") {
      warningsRef.push(
        `Baris ${
          rowIdx + 2
        }: Bulan (Romawi) kosong atau tidak valid. Gunakan I, II, III, IV, V, VI, VII, VIII, IX, X, XI, atau XII`
      );
    }
    if (!yearHijri || yearHijri.trim() === "") {
      warningsRef.push(
        `Baris ${
          rowIdx + 2
        }: Tahun Hijriah kosong atau tidak valid. Contoh: 1446`
      );
    }
    if (!yearMasehi || yearMasehi.trim() === "") {
      warningsRef.push(
        `Baris ${
          rowIdx + 2
        }: Tahun Masehi kosong atau tidak valid. Contoh: 2024`
      );
    }

    // Debug log untuk setiap row
    console.log(`Row ${rowIdx + 1}:`, {
      name,
      nim,
      program,
      certificateTitle,
      monthRoman,
      yearHijri,
      yearMasehi,
    });

    // Generate subtitle using universal template
    const generatedSubtitle = `Telah berhasil menyelesaikan Laboratorium ${
      program || "Program"
    } yang mencakup teori, praktik, serta pengembangan kemampuan sesuai bidang keahlian.`;

    // GLOBAL INCREMENTAL NUMBER: startingNumber + rowIdx
    // This ensures continuous numbering across all uploads
    const certificateNumber = startingNumber + rowIdx;

    // Generate issue date - store both formatted string and raw Date object
    const issueDateRaw = new Date();

    return {
      ...defaultStudentData,
      certificateTitle: certificateTitle || defaultStudentData.certificateTitle,
      name: name || defaultStudentData.name,
      nim: nim || defaultStudentData.nim,
      program: program || defaultStudentData.program,
      subtitle: generatedSubtitle,
      issueDate: formatIssueDate(issueDateRaw), // For display
      issueDateRaw: issueDateRaw, // For database
      verificationId: generateVerificationId(
        certificateNumber,
        monthRoman,
        yearHijri,
        yearMasehi
      ),
      instructorName: instructorName,
      organizationName: organizationName,
      monthRoman: monthRoman || defaultStudentData.monthRoman,
      yearHijri: yearHijri || defaultStudentData.yearHijri,
      yearMasehi: yearMasehi || defaultStudentData.yearMasehi,
    } as StudentDataType;
  };
}

function GenerateCertificatesPage() {
  const [records, setRecords] = useState<StudentDataType[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [error, setError] = useState<string | undefined>();
  const [uploading, setUploading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [zoom, setZoom] = useState(0.5);
  const [autoFit, setAutoFit] = useState(true);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isGeneratingBatch, setIsGeneratingBatch] = useState(false);
  const [batchProgress, setBatchProgress] = useState({ current: 0, total: 0 });
  const [batchPhase, setBatchPhase] = useState<string>(""); // Track current phase
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const previewContainerRef = useRef<HTMLDivElement | null>(null);
  const activeStudent = records[selectedIndex] || defaultStudentData;

  // Auto fit certificate preview to container width
  useEffect(() => {
    if (!autoFit) return;
    const el = previewContainerRef.current;
    if (!el) return;
    const CERT_WIDTH_PX = 1123; // approx 297mm in px at 96dpi
    const handle = () => {
      const available = el.clientWidth - 24; // padding / scrollbar allowance
      let s = available / CERT_WIDTH_PX;
      s = Math.min(1, Math.max(0.25, s));
      setZoom(parseFloat(s.toFixed(2)));
    };
    handle();
    const ro = new ResizeObserver(handle);
    ro.observe(el);
    return () => ro.disconnect();
  }, [autoFit]);

  // Force re-render when activeStudent changes
  useEffect(() => {
    // This ensures the preview updates when switching between records
    if (autoFit && previewContainerRef.current) {
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        const el = previewContainerRef.current;
        if (el) {
          const event = new Event("resize");
          window.dispatchEvent(event);
        }
      }, 100);
    }
  }, [activeStudent, autoFit]);

  const reset = () => {
    setRecords([]);
    setSelectedIndex(0);
    setShowBack(false);
    setWarnings([]);
    setError(undefined);
    setUploadedFileName(null);
    setSaved(false);
    setZoom(0.5);
    setAutoFit(true);

    // Reset file input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const processExcelFile = async (file: File) => {
    setUploading(true);
    setError(undefined);
    setWarnings([]);
    setSaved(false); // Reset saved status
    setSelectedIndex(0); // Reset to first record
    const localWarnings: string[] = [];

    try {
      // STEP 1: Fetch next certificate number from database (GLOBAL INCREMENT)
      console.log("🔢 Fetching next certificate number from database...");
      const response = await fetch("/api/certificates/laboratory/next-number");

      if (!response.ok) {
        throw new Error("Failed to fetch next certificate number");
      }

      const { nextNumber, highestNumber, totalCertificates } =
        await response.json();
      console.log(`📊 Database Status:`, {
        highestNumber,
        nextNumber,
        totalCertificates,
      });

      // Show info toast
      toast({
        title: "🔢 Nomor Sertifikat",
        description: `Nomor tertinggi: ${String(highestNumber).padStart(
          3,
          "0"
        )} | Nomor berikutnya: ${String(nextNumber).padStart(3, "0")}`,
        duration: 3000,
        variant: "default",
      });

      // STEP 2: Process Excel file
      const reader = new FileReader();
      reader.onload = async (evt) => {
        try {
          const data = new Uint8Array(evt.target?.result as ArrayBuffer);
          const wb = XLSX.read(data, {
            type: "array",
            cellDates: true,
            cellText: true, // Enable cell text reading
            cellNF: true, // Read number format
          });
          const sheet = wb.Sheets[wb.SheetNames[0]];
          if (!sheet) {
            setError("Sheet pertama tidak ditemukan.");
            setUploading(false);
            return;
          }

          // Read with raw: true first to get original data
          const json: StudentRowRaw[] = XLSX.utils.sheet_to_json(sheet, {
            defval: "",
            raw: false, // Use formatted values (this reads the 'w' property)
          });

          console.log("📊 Raw Excel Data:", json); // Debug log

          if (!json.length) {
            setError("File kosong atau format tidak sesuai.");
            setUploading(false);
            return;
          }

          // ADVANCED FIX: Extract NIM directly from cell's formatted text (w property)
          // This preserves the full digit display even if Excel stored it as number
          const range = XLSX.utils.decode_range(sheet["!ref"] || "A1");

          // Find NIM column index (column B or any column with "NIM" header)
          const headers = XLSX.utils.sheet_to_json(sheet, {
            header: 1,
          })[0] as string[];
          const nimColumnIndex = headers.findIndex((h) =>
            String(h).toLowerCase().includes("nim")
          );

          if (nimColumnIndex >= 0) {
            // Process each data row and extract NIM from cell's formatted text
            for (let rowIdx = 0; rowIdx < json.length; rowIdx++) {
              const cellAddress = XLSX.utils.encode_cell({
                r: rowIdx + 1, // +1 because row 0 is header
                c: nimColumnIndex,
              });
              const cell = sheet[cellAddress];

              if (cell) {
                // Priority: formatted text (w) > string value (t='s') > number (t='n')
                if (cell.w && String(cell.w).trim()) {
                  // 'w' contains the displayed/formatted text - this is what user sees
                  json[rowIdx]["NIM"] = String(cell.w).trim();
                } else if (cell.t === "s" && cell.v) {
                  // Cell type is string
                  json[rowIdx]["NIM"] = String(cell.v).trim();
                } else if (cell.v !== undefined) {
                  // Fallback: convert value to string
                  const nimValue =
                    typeof cell.v === "number"
                      ? cell.v.toFixed(0)
                      : String(cell.v);
                  json[rowIdx]["NIM"] = nimValue.trim();

                  // Warn if it's a large number (precision loss risk)
                  if (
                    typeof cell.v === "number" &&
                    cell.v > Number.MAX_SAFE_INTEGER
                  ) {
                    localWarnings.push(
                      `Baris ${
                        rowIdx + 2
                      }: NIM sebagai Number terlalu besar (precision loss). ` +
                        `Untuk hasil akurat, format kolom NIM sebagai TEXT di Excel.`
                    );
                  }
                }
              }
            }
          }

          // STEP 3: Map data with GLOBAL incremental numbering
          const mapper = buildRowMapper(localWarnings, nextNumber);
          const mapped = json.map((row, idx) => mapper(row, idx));

          console.log("✅ Mapped Data:", mapped); // Debug log
          console.log(
            `🔢 Certificate numbers: ${nextNumber} - ${
              nextNumber + mapped.length - 1
            }`
          );

          // STEP 4: Check which certificates already exist in database
          // This ensures preview shows correct certificate numbers (existing vs new)
          try {
            console.log("🔍 Checking existing certificates in database...");
            const checkResponse = await fetch(
              "/api/certificates/laboratory/check-existing",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  certificates: mapped.map((cert) => ({
                    nim: cert.nim,
                    program: cert.program,
                    certificateTitle: cert.certificateTitle,
                  })),
                }),
              }
            );

            if (checkResponse.ok) {
              const checkResult = await checkResponse.json();
              console.log(
                `📊 Check result: ${checkResult.existing} existing, ${checkResult.new} new`
              );

              // Update mapped data with existing verification_id if found
              let currentNextNumber = nextNumber;
              const updatedMapped = mapped.map((cert, idx) => {
                const existingInfo = checkResult.results[idx];
                if (existingInfo && existingInfo.exists) {
                  // Use existing verification_id
                  console.log(
                    `♻️ Will UPDATE: ${existingInfo.verification_id} (${cert.name})`
                  );
                  return {
                    ...cert,
                    verificationId: existingInfo.verification_id,
                    _isUpdate: true, // Flag for UI indication
                    _currentName: existingInfo.current_name,
                  };
                } else {
                  // Generate new verification_id
                  const certNumber = currentNextNumber++;
                  const no = String(certNumber).padStart(3, "0");
                  const monthRoman = cert.monthRoman || "I";
                  const fullHijri = cert.yearHijri || "1446";
                  const hijri = fullHijri.slice(-2);
                  const masehi =
                    cert.yearMasehi || new Date().getFullYear().toString();
                  const newVerificationId = `${no}/IF/20222/A.5-II/${monthRoman}/${hijri}/${masehi}`;

                  console.log(
                    `✨ Will CREATE NEW: ${newVerificationId} (${cert.name})`
                  );
                  return {
                    ...cert,
                    verificationId: newVerificationId,
                    _isUpdate: false,
                  };
                }
              });

              setRecords(updatedMapped);
              setSelectedIndex(0);
              setWarnings(localWarnings);
              setUploadedFileName(file.name);

              // Show success toast with update/create breakdown
              const updateCount = checkResult.existing;
              const createCount = checkResult.new;
              const toastParts = [];
              if (createCount > 0) {
                toastParts.push(`${createCount} baru`);
              }
              if (updateCount > 0) {
                toastParts.push(`${updateCount} update`);
              }

              toast({
                title: "✅ File Excel Berhasil Diupload",
                description: `${
                  mapped.length
                } data sertifikat siap untuk di-generate. ${toastParts.join(
                  " | "
                )}`,
                duration: 5000,
                variant: "default",
              });

              // Show update info if any
              if (updateCount > 0) {
                const updatedIds = checkResult.results
                  .filter((r: any) => r.exists)
                  .map((r: any) => r.verification_id)
                  .slice(0, 3)
                  .join(", ");
                const moreText =
                  updateCount > 3 ? ` dan ${updateCount - 3} lainnya` : "";

                toast({
                  title: "♻️ Preview: Sertifikat akan di-UPDATE",
                  description: `${updateCount} sertifikat sudah ada di database dan akan di-update (nomor tetap): ${updatedIds}${moreText}`,
                  duration: 6000,
                  variant: "default",
                });
              }
            } else {
              // Fallback: use sequential numbering if check fails
              console.warn(
                "Failed to check existing certificates, using sequential numbering"
              );
              setRecords(mapped);
              setSelectedIndex(0);
              setWarnings(localWarnings);
              setUploadedFileName(file.name);

              toast({
                title: "⚠️ Preview Mode",
                description: `${mapped.length} data sertifikat (nomor preview, akan disesuaikan saat upload)`,
                duration: 5000,
                variant: "default",
              });
            }
          } catch (checkError) {
            console.error("Error checking existing certificates:", checkError);
            // Fallback: use sequential numbering
            setRecords(mapped);
            setSelectedIndex(0);
            setWarnings(localWarnings);
            setUploadedFileName(file.name);

            toast({
              title: "⚠️ Preview Mode",
              description: `${mapped.length} data sertifikat (nomor preview, akan disesuaikan saat upload)`,
              duration: 5000,
              variant: "default",
            });
          }

          // ✅ Data loaded successfully - ready for preview and download
          console.log(`✅ Loaded ${mapped.length} certificates from Excel`);
        } catch (err: any) {
          setError("Gagal membaca file: " + (err?.message || "unknown"));
        } finally {
          setUploading(false);
        }
      };
      reader.onerror = () => {
        setError("Tidak dapat membaca file.");
        setUploading(false);
      };
      reader.readAsArrayBuffer(file);
    } catch (err: any) {
      console.error("Error fetching next certificate number:", err);
      setError(
        "Gagal mengambil nomor sertifikat dari database: " +
          (err?.message || "unknown")
      );
      setUploading(false);
    }
  };

  const handleExcelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Process the file
    processExcelFile(file);

    // Reset input value to allow selecting the same file again
    e.target.value = "";
  };

  const handleDownloadTemplate = () => {
    // Template minimal - hanya data yang dibutuhkan untuk halaman depan sertifikat
    const templateData = [
      {
        "Nama Peserta": "Ahmad Rizki Pratama",
        NIM: "105841100125",
        "Nama Program": "Backend Development dengan NestJS",
        "Judul Sertifikat": "Backend Developer Expert",
        "Bulan (Romawi)": "IX",
        "Tahun Hijriah": "1446",
        "Tahun Masehi": "2024",
        "Nama Instruktur": "Muhyiddin A.M Hayat, S.Kom., M.T",
        "Nama Organisasi": "Laboratorium Informatika",
      },
      {
        "Nama Peserta": "Siti Nurhaliza",
        NIM: "105841100225",
        "Nama Program": "Frontend Development dengan React",
        "Judul Sertifikat": "Frontend Developer Professional",
        "Bulan (Romawi)": "IX",
        "Tahun Hijriah": "1446",
        "Tahun Masehi": "2024",
        "Nama Instruktur": "Muhyiddin A.M Hayat, S.Kom., M.T",
        "Nama Organisasi": "Laboratorium Informatika",
      },
      {
        "Nama Peserta": "Muhammad Fauzi",
        NIM: "105841100325",
        "Nama Program": "Full Stack Development",
        "Judul Sertifikat": "Full Stack Developer",
        "Bulan (Romawi)": "IX",
        "Tahun Hijriah": "1446",
        "Tahun Masehi": "2024",
        "Nama Instruktur": "Muhyiddin A.M Hayat, S.Kom., M.T",
        "Nama Organisasi": "Laboratorium Informatika",
      },
    ];

    const ws = XLSX.utils.json_to_sheet(templateData);

    // Set column widths for better readability
    const colWidths = [
      { wch: 30 }, // Nama Peserta
      { wch: 15 }, // NIM
      { wch: 40 }, // Nama Program
      { wch: 35 }, // Judul Sertifikat
      { wch: 15 }, // Bulan (Romawi)
      { wch: 15 }, // Tahun Hijriah
      { wch: 15 }, // Tahun Masehi
      { wch: 35 }, // Nama Instruktur
      { wch: 25 }, // Nama Organisasi
    ];
    ws["!cols"] = colWidths;

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data Sertifikat");

    // Add instruction sheet
    const instructionData = [
      { "PETUNJUK PENGISIAN TEMPLATE SERTIFIKAT LABORATORIUM": "" },
      { "": "" },
      { "": "" },
      { "📋 INFO PENTING:": "" },
      { "": "" },
      {
        "• Template ini hanya untuk generate HALAMAN DEPAN sertifikat": "",
      },
      {
        "• Nomor sertifikat akan otomatis mengikuti format: {no}/IF/20222/A.5-II/{bulan}/{tahun_hijri}/{tahun_masehi}":
          "",
      },
      {
        "• 🔢 PENTING: Nomor urut (no) OTOMATIS dari database (GLOBAL INCREMENT)":
          "",
      },
      {
        "• Sistem akan otomatis mengambil nomor tertinggi dari database, lalu lanjutkan penomoran":
          "",
      },
      {
        "• Contoh: Jika nomor terakhir 054, maka file baru dimulai dari 055":
          "",
      },
      {
        "• Nomor TIDAK akan reset ke 001 meskipun upload file Excel berbeda":
          "",
      },
      { "• Tanggal terbit akan otomatis menggunakan tanggal saat upload": "" },
      {
        "• Subtitle sertifikat akan otomatis digenerate berdasarkan nama program":
          "",
      },
      { "": "" },
      { "": "" },
      { "📝 KOLOM YANG WAJIB DIISI:": "" },
      { "": "" },
      { Kolom: "Keterangan", Contoh: "" },
      {
        "─────────────────": "─────────────────────────────────",
        "───────────────────────────": "",
      },
      {
        "Nama Peserta": "Nama lengkap peserta (WAJIB)",
        "Ahmad Rizki Pratama": "",
      },
      {
        NIM: "Nomor Induk Mahasiswa (WAJIB)",
        "105841100125": "",
      },
      {
        "": "🚨 SANGAT PENTING: Kolom NIM HARUS format TEXT!",
        "": "",
      },
      {
        "": "✅ CARA TERBAIK:",
        "": "",
      },
      {
        "": "1. SEBELUM input data, format kolom B (NIM) sebagai TEXT",
        "": "",
      },
      {
        "": "   → Klik kolom B → Klik kanan → Format Cells → Text → OK",
        "": "",
      },
      {
        "": "2. Lalu input NIM seperti biasa: 105841100125",
        "": "",
      },
      {
        "": "",
        "": "",
      },
      {
        "": "💡 ALTERNATIF: Tambahkan tanda ' di depan NIM",
        "": "",
      },
      {
        "": "   → Ketik: '105841100125 (perhatikan tanda apostrof)",
        "": "",
      },
      {
        "": "",
        "": "",
      },
      {
        "": "⚠️ JANGAN gunakan format Number!",
        "": "",
      },
      {
        "": "   Format Number akan menyebabkan digit terakhir hilang:",
        "": "",
      },
      {
        "": "   • 105841104721 → 105841100000 ❌ (6 digit terakhir jadi 0)",
        "": "",
      },
      {
        "": "   • 105841100125 → 105841100000 ❌ (precision loss)",
        "": "",
      },
      {
        "Nama Program": "Nama program/pelatihan laboratorium (WAJIB)",
        "Backend Development dengan NestJS": "",
      },
      {
        "Judul Sertifikat": "Judul yang ditampilkan di sertifikat (WAJIB)",
        "Backend Developer Expert": "",
      },
      {
        "Bulan (Romawi)": "Bulan dalam angka Romawi (WAJIB)",
        "IX (untuk September)": "",
      },
      {
        "Tahun Hijriah": "Tahun Hijriah 4 digit (WAJIB)",
        "1446": "",
      },
      {
        "Tahun Masehi": "Tahun Masehi 4 digit (WAJIB)",
        "2024": "",
      },
      { "": "" },
      { "": "" },
      { "📅 REFERENSI BULAN ROMAWI:": "" },
      { "": "" },
      { "I = Januari": "VII = Juli" },
      { "II = Februari": "VIII = Agustus" },
      { "III = Maret": "IX = September" },
      { "IV = April": "X = Oktober" },
      { "V = Mei": "XI = November" },
      { "VI = Juni": "XII = Desember" },
      { "": "" },
      { "": "" },
      { "📝 KOLOM OPSIONAL (Ada nilai default):": "" },
      { "": "" },
      { Kolom: "Keterangan", Default: "" },
      {
        "─────────────────": "─────────────────────────────────",
        "───────────────────────────": "",
      },
      {
        "Nama Instruktur": "Nama pemberi sertifikat (opsional)",
        "Muhyiddin A.M Hayat, S.Kom., M.T": "",
      },
      {
        "Nama Organisasi": "Nama unit/organisasi pemberi (opsional)",
        "Laboratorium Informatika": "",
      },
      { "": "" },
      { "": "" },
      { "💡 TIPS PENGISIAN:": "" },
      { "": "" },
      { "1. Pastikan semua nama ditulis dengan lengkap dan benar": "" },
      { "2. Gunakan huruf kapital di awal setiap kata untuk nama": "" },
      {
        "3. Nama program bisa menyertakan teknologi/tools yang dipelajari": "",
      },
      {
        "4. Judul sertifikat sebaiknya singkat dan jelas (max 50 karakter)": "",
      },
      {
        "5. Jika kolom opsional kosong, sistem akan gunakan nilai default": "",
      },
      {
        "6. Bulan Romawi harus menggunakan huruf besar (I, II, III, dst)": "",
      },
      {
        "7. Tahun Hijriah dan Masehi harus 4 digit angka": "",
      },
      {
        "8. ⚠️ WAJIB: Format kolom NIM sebagai TEXT sebelum input data": "",
      },
      { "": "" },
      { "": "" },
      { "✅ CONTOH DATA YANG BENAR:": "" },
      { "": "" },
      { "Nama Peserta": "Ahmad Rizki Pratama" },
      {
        NIM: "'105841100125 (dengan tanda ' di depan atau format sebagai TEXT)",
      },
      { "Nama Program": "Backend Development dengan NestJS" },
      { "Judul Sertifikat": "Backend Developer Expert" },
      { "Bulan (Romawi)": "IX" },
      { "Tahun Hijriah": "1446" },
      { "Tahun Masehi": "2024" },
      { "Nama Instruktur": "Muhyiddin A.M Hayat, S.Kom., M.T" },
      { "Nama Organisasi": "Laboratorium Informatika" },
      { "": "" },
      { "↓ Contoh nomor sertifikat yang akan digenerate:": "" },
      { "055/IF/20222/A.5-II/IX/46/2024": "" },
      {
        "(Nomor aktual akan disesuaikan dengan database - GLOBAL INCREMENT)":
          "",
      },
      { "": "" },
      { "": "" },
      { "🔢 SISTEM PENOMORAN GLOBAL:": "" },
      { "": "" },
      {
        "• Nomor sertifikat (3 digit pertama) bersifat GLOBAL dan INCREMENTAL":
          "",
      },
      { "• Sistem otomatis ambil nomor tertinggi dari database": "" },
      { "• Nomor TIDAK reset meskipun upload file Excel berbeda": "" },
      { "• Contoh: Database terakhir 054 → File baru dimulai dari 055": "" },
      { "• Nomor berlaku untuk SEMUA laboratorium (tidak per-lab)": "" },
      { "": "" },
      { "Skenario:": "" },
      { "• Upload pertama (database kosong): 001 - 010": "" },
      { "• Upload kedua (setelah 010): 011 - 025": "" },
      { "• Upload ketiga (setelah 025): 026 - 050": "" },
      { "• Dan seterusnya... TIDAK PERNAH RESET!": "" },
      { "": "" },
      { "": "" },
      { "❌ HINDARI:": "" },
      { "": "" },
      { "• Mengosongkan kolom wajib (Nama Peserta, NIM, dll)": "" },
      { "• Format NIM sebagai Number (akan kehilangan 6 digit terakhir!)": "" },
      { "• Menggunakan singkatan yang tidak jelas": "" },
      { "• Judul sertifikat terlalu panjang (lebih dari 50 karakter)": "" },
      { "• Typo atau kesalahan penulisan nama": "" },
      { "• Bulan Romawi dengan huruf kecil (ix) atau angka (9)": "" },
      { "• Tahun Hijriah atau Masehi kurang dari 4 digit": "" },
      { "": "" },
      { "": "" },
      { "🚨 MASALAH UMUM: NIM BERAKHIR 000000": "" },
      { "": "" },
      {
        "Jika NIM Anda berakhir dengan banyak angka 0, ini terjadi karena:": "",
      },
      { "": "" },
      { "❌ SALAH: Format sebagai Number dengan Decimal Places = 0": "" },
      {
        "   Contoh hasil: 105841104721 → 105841100000 (6 digit terakhir hilang!)":
          "",
      },
      { "": "" },
      { "✅ BENAR: Format sebagai TEXT": "" },
      { "   1. Klik kanan kolom NIM": "" },
      { "   2. Pilih Format Cells": "" },
      { "   3. Pilih kategori TEXT (bukan Number!)": "" },
      { "   4. Klik OK": "" },
      { "   5. Input ulang NIM atau tekan F2 + Enter untuk refresh": "" },
      { "": "" },
      { "💡 Atau gunakan tanda ' di depan: '105841104721": "" },
      { "": "" },
      { "": "" },
      { "📌 CATATAN PENTING:": "" },
      { "": "" },
      {
        "• 🚨 Kolom NIM HARUS diformat sebagai TEXT, bukan Number!": "",
      },
      {
        "• Jika format sebagai Number, 6 digit terakhir akan hilang (jadi 000000)":
          "",
      },
      {
        "• 🔢 Nomor urut di nomor sertifikat (001, 002, 003) OTOMATIS dari database (GLOBAL INCREMENT)":
          "",
      },
      {
        "• Nomor TIDAK mengikuti urutan baris Excel - melanjutkan dari database terakhir":
          "",
      },
      {
        "• Contoh: Jika database terakhir 054, maka 10 sertifikat baru = 055 sampai 064":
          "",
      },
      {
        "• Baris pertama di Excel akan mendapat nomor 001, baris kedua 002, dst":
          "",
      },
      {
        "• ⚠️ UPDATE: Nomor sertifikat TIDAK lagi berdasarkan urutan baris Excel":
          "",
      },
      {
        "• Sistem menggunakan GLOBAL INCREMENT dari database untuk mencegah duplikasi":
          "",
      },
      {
        "• Setelah upload, sistem akan memberi warning jika NIM bermasalah": "",
      },
      {
        "Setelah upload, Anda bisa preview sertifikat sebelum print/download.":
          "",
      },
      { "Pastikan semua data sudah benar sebelum mencetak sertifikat.": "" },
    ];

    const wsInstruction = XLSX.utils.json_to_sheet(instructionData);
    wsInstruction["!cols"] = [{ wch: 50 }, { wch: 60 }, { wch: 40 }];
    XLSX.utils.book_append_sheet(wb, wsInstruction, "Petunjuk Pengisian");

    XLSX.writeFile(wb, "template-sertifikat-laboratorium.xlsx");
  };

  // Generate PDF for a single certificate
  const generateCertificatePDF = async (
    studentData: StudentDataType,
    showBackPage: boolean = false
  ): Promise<Blob> => {
    // Create a temporary container for rendering
    const tempContainer = document.createElement("div");
    tempContainer.style.position = "fixed";
    tempContainer.style.left = "-9999px";
    tempContainer.style.top = "0";
    tempContainer.style.width = "1123px";
    tempContainer.style.height = "794px";
    document.body.appendChild(tempContainer);

    try {
      // Dynamically import React and ReactDOM for rendering
      const React = (await import("react")).default;
      const ReactDOM = (await import("react-dom/client")).default;

      // Create root and render certificate
      const root = ReactDOM.createRoot(tempContainer);

      // Wait for component to render
      await new Promise<void>((resolve) => {
        root.render(
          React.createElement(LabCertificateTemplate, {
            data: mapStudentDataToLabCertificate(studentData),
            template: "modern",
            showBack: showBackPage,
            renderMode: "batch", // Use 'batch' mode for ZIP generation
          })
        );
        // Give time for QR codes to generate
        setTimeout(resolve, 2000);
      });

      // Capture the rendered content
      const canvas = await html2canvas(tempContainer, {
        scale: 1.5, // Reduced from 2 to 1.5 for smaller file size (still high quality)
        useCORS: true,
        logging: false,
        width: 1123,
        height: 794,
        backgroundColor: "#ffffff",
      });

      // Create PDF with compression
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
        compress: true, // Enable PDF compression
      });

      // Convert to JPEG for better compression (instead of PNG)
      const imgData = canvas.toDataURL("image/jpeg", 0.85); // 85% quality JPEG
      pdf.addImage(imgData, "JPEG", 0, 0, 297, 210, undefined, "FAST"); // Use FAST compression

      // Cleanup
      root.unmount();
      document.body.removeChild(tempContainer);

      // Return PDF as blob
      return pdf.output("blob");
    } catch (error) {
      // Cleanup on error
      document.body.removeChild(tempContainer);
      throw error;
    }
  };

  // Convert PDF Blob to base64 for upload
  const pdfBlobToBase64 = async (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  // Download all certificates as ZIP
  const handleDownloadAllAsZip = async () => {
    if (records.length === 0) {
      alert("Tidak ada data sertifikat untuk diunduh.");
      return;
    }

    // ⚠️ SAFEGUARD: Check batch size
    const MAX_RECOMMENDED = 50;
    const MAX_ABSOLUTE = 100;

    if (records.length > MAX_ABSOLUTE) {
      const proceed = window.confirm(
        `⚠️ PERINGATAN KRITIS!\n\n` +
          `Anda mencoba generate ${records.length} sertifikat sekaligus.\n\n` +
          `Ini dapat menyebabkan:\n` +
          `• Browser crash/hang\n` +
          `• Out of memory error\n` +
          `• Proses gagal di tengah jalan\n\n` +
          `REKOMENDASI: Split menjadi batch maksimal ${MAX_ABSOLUTE} sertifikat.\n\n` +
          `Apakah Anda yakin ingin melanjutkan?\n` +
          `(Estimasi waktu: ${Math.ceil((records.length * 2.5) / 60)} menit)`
      );

      if (!proceed) return;
    } else if (records.length > MAX_RECOMMENDED) {
      const proceed = window.confirm(
        `⚠️ Perhatian!\n\n` +
          `Anda akan generate ${records.length} sertifikat.\n` +
          `Estimasi waktu: ${Math.ceil(
            (records.length * 2.5) / 60
          )} menit.\n\n` +
          `Tips:\n` +
          `• Jangan tutup tab ini\n` +
          `• Jangan buka aplikasi berat lain\n` +
          `• Pastikan laptop/PC dalam kondisi charging\n\n` +
          `Lanjutkan?`
      );

      if (!proceed) return;
    }

    setIsGeneratingBatch(true);
    setBatchProgress({ current: 0, total: records.length });
    setBatchPhase("Generating PDFs");

    try {
      // STEP 1: GENERATE PDFs (Store as Blobs for ZIP)
      console.log("Generating PDFs for all certificates...");
      const pdfBlobs: Array<{ blob: Blob; record: StudentDataType }> = [];

      for (let i = 0; i < records.length; i++) {
        const cert = records[i];
        setBatchProgress({ current: i + 1, total: records.length });

        try {
          // Generate PDF - keep as blob (no base64 conversion yet)
          const pdfBlob = await generateCertificatePDF(cert, false);
          pdfBlobs.push({ blob: pdfBlob, record: cert });

          // Brief pause every 10 items to prevent memory overload
          if ((i + 1) % 10 === 0) {
            await new Promise((resolve) => setTimeout(resolve, 50));
          }
        } catch (error) {
          console.error(`Error generating PDF for ${cert.name}:`, error);
        }
      }

      // STEP 2: CREATE ZIP FILE IMMEDIATELY
      console.log("Creating ZIP file...");
      setBatchPhase("Creating ZIP");
      setBatchProgress({ current: 0, total: pdfBlobs.length });

      const zip = new JSZip();

      // Add PDFs directly to ZIP (no base64 conversion needed)
      for (let i = 0; i < pdfBlobs.length; i++) {
        const { blob, record } = pdfBlobs[i];
        setBatchProgress({ current: i + 1, total: pdfBlobs.length });

        try {
          const safeName = record.name
            .replace(/[^a-zA-Z0-9\s]/g, "")
            .replace(/\s+/g, "_")
            .substring(0, 50);

          const safeCertId = record.verificationId
            .replace(/\//g, "-")
            .replace(/[^a-zA-Z0-9\-]/g, "");

          const filename = `${safeName}_${safeCertId}.pdf`;
          zip.file(filename, blob);
        } catch (error) {
          console.error(
            `Error adding certificate to ZIP for ${record.name}:`,
            error
          );
        }
      }

      // Generate ZIP blob
      console.log("Compressing ZIP...");
      setBatchPhase("Compressing ZIP");
      const zipBlob = await zip.generateAsync({
        type: "blob",
        compression: "DEFLATE",
        compressionOptions: { level: 6 },
      });

      // STEP 3: DOWNLOAD ZIP IMMEDIATELY
      console.log("Downloading ZIP...");
      setBatchPhase("Downloading ZIP");
      const link = document.createElement("a");
      link.href = URL.createObjectURL(zipBlob);
      link.download = `Sertifikat_Laboratorium_${new Date().getTime()}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);

      // Show success toast
      toast({
        title: "📦 ZIP Downloaded!",
        description: `${pdfBlobs.length} sertifikat telah diunduh. Sedang menyimpan ke database...`,
        duration: 3000,
        variant: "default",
      });

      // STEP 4: UPLOAD TO DATABASE IN BACKGROUND (non-blocking)
      console.log("Uploading to database & MinIO in background...");
      setBatchPhase("Uploading to Database");
      setBatchProgress({ current: 0, total: pdfBlobs.length });

      // Convert blobs to base64 for upload (do this AFTER ZIP download)
      const certificatesWithPdf: Array<any> = [];
      for (let i = 0; i < pdfBlobs.length; i++) {
        const { blob, record } = pdfBlobs[i];
        setBatchProgress({ current: i + 1, total: pdfBlobs.length });

        try {
          const pdfBase64 = await pdfBlobToBase64(blob);
          certificatesWithPdf.push({
            ...record,
            issueDate: record.issueDateRaw
              ? record.issueDateRaw.toISOString()
              : new Date().toISOString(),
            pdfBase64: pdfBase64,
          });

          if ((i + 1) % 10 === 0) {
            await new Promise((resolve) => setTimeout(resolve, 50));
          }
        } catch (error) {
          console.error(
            `Error converting PDF to base64 for ${record.name}:`,
            error
          );
          certificatesWithPdf.push({
            ...record,
            issueDate: record.issueDateRaw
              ? record.issueDateRaw.toISOString()
              : new Date().toISOString(),
            pdfBase64: null,
          });
        }
      }

      // Upload to database & MinIO
      try {
        const saveResponse = await fetch("/api/certificates/laboratory/bulk", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            certificates: certificatesWithPdf,
          }),
        });

        const saveResult = await saveResponse.json();

        if (!saveResponse.ok) {
          console.warn("Database save failed:", saveResult.error);
          toast({
            title: "⚠️ Upload Gagal",
            description: `ZIP sudah terdownload, tapi gagal simpan ke database: ${saveResult.error}`,
            duration: 5000,
            variant: "destructive",
          });
        } else {
          console.log(
            `Successfully saved ${
              saveResult.created + saveResult.updated
            } certificates to database`
          );
          setSaved(true);

          // Enhanced toast with create/update breakdown
          const toastMessage = [];
          if (saveResult.created > 0) {
            toastMessage.push(`${saveResult.created} baru dibuat`);
          }
          if (saveResult.updated > 0) {
            toastMessage.push(
              `${saveResult.updated} diupdate (nama/data diperbaiki, nomor tetap)`
            );
          }
          if (saveResult.skipped > 0) {
            toastMessage.push(
              `${saveResult.skipped} diskip (tidak ada perubahan)`
            );
          }

          toast({
            title: "✅ Selesai!",
            description: toastMessage.join(" | "),
            duration: 6000,
            variant: "default",
          });

          // Show update details if any certificates were updated
          if (saveResult.updated > 0) {
            console.log(
              "📝 Updated certificates (typo fix):",
              saveResult.updatedIds
            );
            toast({
              title: "📝 Update Info",
              description: `${saveResult.updated} sertifikat diupdate (fix nama/data). Identifier: NIM + Program + Judul. Nomor sertifikat & QR code TIDAK berubah!`,
              duration: 5000,
              variant: "default",
            });
          }

          // Show skip info if any
          if (saveResult.skipped > 0) {
            console.log(
              "⏭️ Skipped certificates (no changes):",
              saveResult.skippedIds
            );
            toast({
              title: "⏭️ Info: Data Sama",
              description: `${saveResult.skipped} sertifikat diskip karena data tidak ada perubahan (efisiensi database).`,
              duration: 4000,
              variant: "default",
            });
          }

          if (saveResult.failed > 0) {
            console.warn(
              `Failed: ${saveResult.failed}`,
              saveResult.failedCerts
            );
            toast({
              title: "⚠️ Beberapa Gagal Upload",
              description: `${saveResult.failed} sertifikat gagal diupload ke database/MinIO`,
              duration: 5000,
              variant: "destructive",
            });
          }
        }
      } catch (saveError: any) {
        console.error("Database save error:", saveError);
        toast({
          title: "⚠️ Upload Gagal",
          description: `ZIP sudah terdownload, tapi gagal simpan ke database: ${saveError.message}`,
          duration: 5000,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error generating batch PDFs:", error);

      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";

      toast({
        title: "❌ Gagal Generate Sertifikat",
        description: `${errorMessage}. Coba dengan batch lebih kecil atau hubungi administrator.`,
        duration: 5000,
        variant: "destructive",
      });
    } finally {
      setIsGeneratingBatch(false);
      setBatchProgress({ current: 0, total: 0 });
      setBatchPhase("");
    }
  };

  const nextRecord = () =>
    setSelectedIndex((i) => (i + 1) % (records.length || 1));
  const prevRecord = () =>
    setSelectedIndex(
      (i) => (i - 1 + (records.length || 1)) % (records.length || 1)
    );

  const decreaseZoom = () =>
    setZoom((z) => Math.max(0.3, +(z - 0.05).toFixed(2)));
  const increaseZoom = () =>
    setZoom((z) => Math.min(1, +(z + 0.05).toFixed(2)));
  const resetZoom = () => {
    setZoom(0.5);
    setAutoFit(true);
  };
  const triggerFileDialog = useCallback(
    () => fileInputRef.current?.click(),
    []
  );
  const disableAutoFit = () => {
    setAutoFit(false);
  };

  return (
    <div className="space-y-6 w-full overflow-x-hidden">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Generate Sertifikat Laboratorium
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Upload file Excel dan preview sertifikat (depan & belakang). Print
          akan otomatis mencetak dua halaman.
        </p>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 w-full">
        <div className="space-y-6 xl:col-span-1 w-full min-w-0">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-base flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4" /> Upload Data Sertifikat
              </CardTitle>
              <CardDescription className="text-xs leading-relaxed">
                Tanggal terbit & ID sertifikat digenerate otomatis oleh sistem
                pada saat upload.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="file" className="font-medium">
                  Upload File Excel
                </Label>
                <input
                  ref={fileInputRef}
                  id="file"
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleExcelUpload}
                  className="hidden"
                  disabled={uploading}
                />
                <div
                  className={`relative border-2 border-dashed rounded-md p-4 transition bg-muted/30 hover:bg-muted/50 text-center ${
                    uploading ? "opacity-70" : ""
                  }`}
                  onDragOver={(e) => {
                    e.preventDefault();
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    const f = e.dataTransfer.files?.[0];
                    if (f) {
                      processExcelFile(f);
                      // Reset file input to allow re-selecting
                      if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                      }
                    }
                  }}
                >
                  <p className="text-xs text-muted-foreground mb-2">
                    {uploadedFileName
                      ? "File terpilih:"
                      : "Drag & drop file di sini atau"}
                  </p>
                  <div className="flex flex-col items-center gap-2">
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={triggerFileDialog}
                      disabled={uploading}
                    >
                      {uploadedFileName ? "Ganti File" : "Pilih File"}
                    </Button>
                    {uploadedFileName && (
                      <span className="text-xs font-medium break-all">
                        {uploadedFileName}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3 justify-center">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleDownloadTemplate}
                      disabled={uploading}
                    >
                      <Download className="w-3 h-3 mr-1" />
                      Template
                    </Button>
                    {uploadedFileName && (
                      <Button
                        type="button"
                        size="sm"
                        variant="destructive"
                        onClick={reset}
                      >
                        Hapus
                      </Button>
                    )}
                  </div>
                  <p className="mt-3 text-[11px] text-muted-foreground leading-relaxed">
                    Format: .xlsx | Header wajib: Nama Peserta, Nama Program,
                    Judul Sertifikat, Bulan (Romawi), Tahun Hijriah, Tahun
                    Masehi. Nomor sertifikat format: {"{"}no{"}"}
                    /IF/20222/A.5-II/{"{"}bulan{"}"}/{"{"}hijri
                    {"}"}/{"{"}masehi{"}"} (no = urutan baris Excel dalam 3
                    digit)
                  </p>
                  {records.length > 0 && (
                    <div className="mt-2 space-y-1">
                      <p className="text-[11px] text-muted-foreground">
                        Total record: {records.length}
                      </p>
                      {(() => {
                        const updateCount = records.filter(
                          (r) => r._isUpdate
                        ).length;
                        const newCount = records.length - updateCount;
                        return (
                          <>
                            {newCount > 0 && (
                              <p className="text-[11px] text-green-600">
                                ✨ {newCount} sertifikat baru akan dibuat
                              </p>
                            )}
                            {updateCount > 0 && (
                              <p className="text-[11px] text-blue-600">
                                ♻️ {updateCount} sertifikat akan di-update
                                (nomor tetap)
                              </p>
                            )}
                          </>
                        );
                      })()}
                      {saved && (
                        <p className="text-[11px] text-green-600 font-medium">
                          ✓ Data tersimpan di database
                        </p>
                      )}
                    </div>
                  )}
                  {uploading && (
                    <p className="mt-2 text-[11px] text-blue-600 animate-pulse">
                      Memproses file...
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={prevRecord}
                  disabled={!records.length}
                >
                  <ChevronLeft className="w-3 h-3" />
                  Prev
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={nextRecord}
                  disabled={!records.length}
                >
                  Next
                  <ChevronRight className="w-3 h-3" />
                </Button>
                <Separator orientation="vertical" className="h-8" />
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    disableAutoFit();
                    decreaseZoom();
                  }}
                >
                  <ZoomOut className="w-3 h-3" />
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    disableAutoFit();
                    increaseZoom();
                  }}
                >
                  <ZoomIn className="w-3 h-3" />
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant={autoFit ? "default" : "outline"}
                  onClick={() => setAutoFit((v) => !v)}
                >
                  Fit
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setAutoFit(true);
                    resetZoom();
                  }}
                >
                  <RotateCcw className="w-3 h-3" />
                </Button>
                <Separator orientation="vertical" className="h-8" />
                <Button
                  type="button"
                  size="sm"
                  variant="secondary"
                  onClick={handleDownloadAllAsZip}
                  disabled={!records.length || isGeneratingBatch}
                  title="Download semua sertifikat sebagai file ZIP"
                >
                  {isGeneratingBatch ? (
                    <>
                      <span className="animate-spin mr-1">⏳</span>
                      {batchProgress.current}/{batchProgress.total}
                    </>
                  ) : (
                    <>
                      <Package className="w-3 h-3" />
                      Download ZIP
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  onClick={reset}
                  disabled={isGeneratingBatch}
                >
                  Reset
                </Button>
              </div>

              {/* Warning Messages */}
              {warnings.length > 0 && (
                <div className="rounded-md bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
                  <p className="text-xs font-medium text-amber-900 dark:text-amber-100 mb-2 flex items-center gap-1">
                    <span>⚠️</span>
                    <span>
                      Peringatan ({warnings.length} masalah ditemukan)
                    </span>
                  </p>
                  <ul className="text-[10px] text-amber-700 dark:text-amber-300 space-y-0.5 ml-4 list-disc max-h-32 overflow-y-auto">
                    {warnings.map((warning, idx) => (
                      <li key={idx}>{warning}</li>
                    ))}
                  </ul>
                  <p className="text-[10px] text-amber-600 dark:text-amber-400 mt-2 italic">
                    Perbaiki data di Excel dan upload ulang untuk hasil terbaik.
                  </p>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="rounded-md bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-3">
                  <p className="text-xs font-medium text-red-900 dark:text-red-100 mb-1 flex items-center gap-1">
                    <span>❌</span>
                    <span>Error</span>
                  </p>
                  <p className="text-[10px] text-red-700 dark:text-red-300">
                    {error}
                  </p>
                </div>
              )}

              {/* Print Instructions - Always visible */}
              <div className="rounded-md bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                <p className="text-xs font-medium text-blue-900 dark:text-blue-100 mb-1">
                  📄 Pengaturan Print
                </p>
                <ul className="text-[10px] text-blue-700 dark:text-blue-300 space-y-0.5 ml-4 list-disc">
                  <li>Ukuran kertas: A4 Landscape</li>
                  <li>Margin: None (0mm)</li>
                  <li>Background graphics: ON</li>
                  <li>Scale: 100%</li>
                </ul>
              </div>

              {/* Batch Download Info */}
              {records.length > 1 && (
                <div
                  className={`rounded-md border p-3 ${
                    records.length > 100
                      ? "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800"
                      : records.length > 50
                      ? "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800"
                      : "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800"
                  }`}
                >
                  <p
                    className={`text-xs font-medium mb-1 ${
                      records.length > 100
                        ? "text-red-900 dark:text-red-100"
                        : records.length > 50
                        ? "text-amber-900 dark:text-amber-100"
                        : "text-green-900 dark:text-green-100"
                    }`}
                  >
                    {records.length > 100
                      ? "⚠️ PERINGATAN: Batch Terlalu Besar!"
                      : records.length > 50
                      ? "⚠️ Perhatian: Batch Besar"
                      : "📦 Download Massal"}
                  </p>
                  <ul
                    className={`text-[10px] space-y-0.5 ml-4 list-disc ${
                      records.length > 100
                        ? "text-red-700 dark:text-red-300"
                        : records.length > 50
                        ? "text-amber-700 dark:text-amber-300"
                        : "text-green-700 dark:text-green-300"
                    }`}
                  >
                    {records.length > 100 ? (
                      <>
                        <li>
                          <strong>
                            ❌ TIDAK DIREKOMENDASIKAN ({records.length}{" "}
                            sertifikat)
                          </strong>
                        </li>
                        <li>Risiko TINGGI: Browser crash/hang</li>
                        <li>
                          Estimasi waktu: ~
                          {Math.ceil((records.length * 2.5) / 60)} menit
                        </li>
                        <li>
                          <strong>
                            SARAN: Split menjadi maksimal 50-100 sertifikat per
                            batch
                          </strong>
                        </li>
                      </>
                    ) : records.length > 50 ? (
                      <>
                        <li>Batch besar: {records.length} sertifikat</li>
                        <li>
                          Estimasi waktu: ~
                          {Math.ceil((records.length * 2.5) / 60)} menit
                        </li>
                        <li>Pastikan tidak tutup tab selama proses</li>
                        <li>
                          Rekomendasi: Split menjadi batch lebih kecil jika
                          memungkinkan
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          Klik "Download ZIP" untuk unduh semua sertifikat
                        </li>
                        <li>
                          File: nama_nomor-sertifikat.pdf ({records.length}{" "}
                          file)
                        </li>
                        <li>
                          Estimasi waktu: ~{Math.ceil(records.length * 2.5)}{" "}
                          detik
                        </li>
                        <li>Hasil dalam 1 file ZIP siap cetak</li>
                      </>
                    )}
                  </ul>
                </div>
              )}

              {/* Batch Progress Indicator */}
              {isGeneratingBatch && (
                <div className="rounded-md bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
                  <p className="text-xs font-medium text-amber-900 dark:text-amber-100 mb-2">
                    ⏳ {batchPhase || "Sedang generate PDF..."}
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div
                      className="bg-amber-600 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${
                          batchProgress.total > 0
                            ? (batchProgress.current / batchProgress.total) *
                              100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                  <p className="text-[10px] text-amber-700 dark:text-amber-300">
                    Progress: {batchProgress.current} / {batchProgress.total}{" "}
                    {batchPhase === "Uploading to Database"
                      ? "uploaded"
                      : "sertifikat"}
                  </p>
                  <p className="text-[10px] text-amber-600 dark:text-amber-400 mt-1">
                    {batchPhase === "Uploading to Database"
                      ? "ZIP sudah terdownload. Sedang upload ke database..."
                      : "Mohon tunggu, jangan tutup halaman ini..."}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6 xl:col-span-2 w-full min-w-0">
          <Card className="relative w-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center justify-between">
                <span>Preview Sertifikat</span>
                {records.length > 0 && activeStudent._isUpdate && (
                  <span className="text-xs font-normal px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded-md flex items-center gap-1">
                    ♻️ UPDATE
                    {activeStudent._currentName &&
                      activeStudent._currentName !== activeStudent.name && (
                        <span className="text-[10px] opacity-75">
                          (dari: {activeStudent._currentName})
                        </span>
                      )}
                  </span>
                )}
                {records.length > 0 && !activeStudent._isUpdate && (
                  <span className="text-xs font-normal px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 rounded-md">
                    ✨ NEW
                  </span>
                )}
              </CardTitle>
              <CardDescription className="text-xs">
                Preview sertifikat laboratorium. Gunakan Print untuk mencetak.
                {records.length > 0 && activeStudent._isUpdate && (
                  <span className="block mt-1 text-blue-600 dark:text-blue-400">
                    Nomor sertifikat & QR code akan tetap sama (UPDATE existing
                    data).
                  </span>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className="overflow-hidden w-full">
              <div
                ref={previewContainerRef}
                className="w-full overflow-x-auto overflow-y-auto rounded-md border bg-background p-2 preview-scroll"
              >
                <div className="inline-flex justify-center items-start min-w-full">
                  <div
                    className="a4-landscape relative origin-top-left flex-shrink-0"
                    style={{ transform: `scale(${zoom})` }}
                  >
                    <div className="relative certificate-content">
                      <LabCertificateTemplate
                        data={mapStudentDataToLabCertificate(activeStudent)}
                        template="lab_certificate"
                        showBack={false}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {records.length > 0 && (
                <p className="text-[11px] text-muted-foreground mt-3">
                  Preview sertifikat {selectedIndex + 1} dari {records.length}.
                  Gunakan tombol Print untuk mencetak dengan ukuran A4
                  Landscape.
                </p>
              )}
            </CardContent>
          </Card>
          {/* Hidden element for print - will be cloned to new window */}
          <div id="print-area" className="hidden">
            <div className="overflow-hidden bg-white rounded-lg a4-landscape">
              <div className="relative certificate-content">
                <LabCertificateTemplate
                  data={mapStudentDataToLabCertificate(activeStudent)}
                  template="lab_certificate"
                  showBack={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        /* Certificate preview styles */
        .a4-landscape {
          width: 1123px; /* A4 landscape width in pixels at 96dpi */
          height: 794px; /* A4 landscape height in pixels at 96dpi */
          position: relative;
          box-sizing: border-box;
          background: white;
        }

        .certificate-content {
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .preview-scroll {
          max-height: calc(100vh - 300px);
          width: 100%;
          max-width: 100%;
        }

        .preview-scroll::-webkit-scrollbar {
          height: 8px;
          width: 8px;
        }

        .preview-scroll::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 4px;
        }

        .preview-scroll::-webkit-scrollbar-track {
          background: transparent;
        }

        /* Prevent horizontal page overflow */
        body {
          overflow-x: hidden;
        }
      `}</style>
    </div>
  );
}

export default GenerateCertificatesPage;
