"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import * as XLSX from "xlsx";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import JSZip from "jszip";
import {
  Printer,
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

// Helpers for auto-generated fields
function formatIssueDate(date: Date = new Date()) {
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function generateVerificationId(
  rowNumber: number,
  monthRoman?: string,
  yearHijri?: string,
  yearMasehi?: string
) {
  // Format: {no}/IF/20222/A.5-II/IX/44/2022
  // no = 3-digit row number (001, 002, etc.)
  const no = String(rowNumber).padStart(3, "0");
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
  program: "Nama Program",
  subtitle: "Atas keberhasilan menyelesaikan program pelatihan laboratorium",
  issueDate: "00 Bulan 0000",
  verificationId: "001/IF/20222/A.5-II/IX/44/2022",
  instructorName: "Muhyiddin A.M Hayat, S.Kom., M.T",
  organizationName: "Laboratorium Informatika",
  monthRoman: "IX",
  yearHijri: "44",
  yearMasehi: "2022",
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
  "Nama Program"?: string;
  "Judul Sertifikat"?: string;
  "Nama Instruktur"?: string;
  "Nama Organisasi"?: string;
  "Bulan (Romawi)"?: string;
  "Tahun Hijriah"?: string;
  "Tahun Masehi"?: string;
}

// Simplified row mapper - only process data needed for front page
function buildRowMapper(warningsRef: string[]) {
  return function mapRowToStudentWithWarn(
    row: any,
    rowIdx: number
  ): StudentDataType {
    // Map Indonesian columns to expected fields - HANYA DATA YANG DIBUTUHKAN
    const name = row["Nama Peserta"] || row.name || "";
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
    const monthRoman = row["Bulan (Romawi)"] || row.monthRoman || "";
    const yearHijri = row["Tahun Hijriah"] || row.yearHijri || "";
    const yearMasehi = row["Tahun Masehi"] || row.yearMasehi || "";

    // Validasi kolom wajib
    if (!name || name.trim() === "") {
      warningsRef.push(
        `Baris ${rowIdx + 2}: Nama Peserta kosong atau tidak valid`
      );
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
        `Baris ${rowIdx + 2}: Bulan (Romawi) kosong atau tidak valid`
      );
    }
    if (!yearHijri || yearHijri.trim() === "") {
      warningsRef.push(
        `Baris ${rowIdx + 2}: Tahun Hijriah kosong atau tidak valid`
      );
    }
    if (!yearMasehi || yearMasehi.trim() === "") {
      warningsRef.push(
        `Baris ${rowIdx + 2}: Tahun Masehi kosong atau tidak valid`
      );
    }

    // Generate subtitle using universal template
    const generatedSubtitle = `Telah berhasil menyelesaikan Laboratorium ${
      program || "Program"
    } yang mencakup teori, praktik, serta pengembangan kemampuan sesuai bidang keahlian.`;

    // Generate verification ID with row number (1-based index for display)
    const rowNumber = rowIdx + 1;

    return {
      ...defaultStudentData,
      certificateTitle: certificateTitle || defaultStudentData.certificateTitle,
      name: name || defaultStudentData.name,
      program: program || defaultStudentData.program,
      subtitle: generatedSubtitle,
      issueDate: formatIssueDate(),
      verificationId: generateVerificationId(
        rowNumber,
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
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [zoom, setZoom] = useState(0.5);
  const [autoFit, setAutoFit] = useState(true);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isGeneratingBatch, setIsGeneratingBatch] = useState(false);
  const [batchProgress, setBatchProgress] = useState({ current: 0, total: 0 });
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

  const reset = () => {
    setRecords([]);
    setSelectedIndex(0);
    setShowBack(false);
    setWarnings([]);
    setError(undefined);
    setUploadedFileName(null);
    setSaved(false);
  };

  const handleSaveToDatabase = async () => {
    if (!records.length) {
      alert("No certificates to save");
      return;
    }

    setSaving(true);
    setError(undefined);

    try {
      const response = await fetch("/api/certificates/bulk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ certificates: records }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save certificates");
      }

      setSaved(true);
      alert(`Successfully saved ${data.count} certificates to database!`);
    } catch (err: any) {
      setError("Failed to save: " + (err?.message || "unknown error"));
      alert("Error: " + (err?.message || "Failed to save certificates"));
    } finally {
      setSaving(false);
    }
  };

  const processExcelFile = async (file: File) => {
    setUploading(true);
    setError(undefined);
    setWarnings([]);
    const localWarnings: string[] = [];
    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const data = new Uint8Array(evt.target?.result as ArrayBuffer);
        const wb = XLSX.read(data, { type: "array" });
        const sheet = wb.Sheets[wb.SheetNames[0]];
        if (!sheet) {
          setError("Sheet pertama tidak ditemukan.");
          setUploading(false);
          return;
        }
        const json: StudentRowRaw[] = XLSX.utils.sheet_to_json(sheet, {
          defval: "",
        });
        if (!json.length) {
          setError("File kosong atau format tidak sesuai.");
          setUploading(false);
          return;
        }
        const mapper = buildRowMapper(localWarnings);
        const mapped = json.map((row, idx) => mapper(row, idx));
        setRecords(mapped);
        setSelectedIndex(0);
        setWarnings(localWarnings);
        setUploadedFileName(file.name);

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
  };

  const handleExcelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processExcelFile(file);
  };

  const handleDownloadTemplate = () => {
    // Template minimal - hanya data yang dibutuhkan untuk halaman depan sertifikat
    const templateData = [
      {
        "Nama Peserta": "Ahmad Rizki Pratama",
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
        "• Nomor urut (no) diambil dari urutan baris di Excel (001, 002, dst)":
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
      { "": "" },
      { "": "" },
      { "✅ CONTOH DATA YANG BENAR:": "" },
      { "": "" },
      { "Nama Peserta": "Ahmad Rizki Pratama" },
      { "Nama Program": "Backend Development dengan NestJS" },
      { "Judul Sertifikat": "Backend Developer Expert" },
      { "Bulan (Romawi)": "IX" },
      { "Tahun Hijriah": "1446" },
      { "Tahun Masehi": "2024" },
      { "Nama Instruktur": "Muhyiddin A.M Hayat, S.Kom., M.T" },
      { "Nama Organisasi": "Laboratorium Informatika" },
      { "": "" },
      { "↓ Nomor sertifikat yang akan digenerate:": "" },
      { "001/IF/20222/A.5-II/IX/1446/2024": "" },
      { "": "" },
      { "": "" },
      { "❌ HINDARI:": "" },
      { "": "" },
      { "• Mengosongkan kolom wajib": "" },
      { "• Menggunakan singkatan yang tidak jelas": "" },
      { "• Judul sertifikat terlalu panjang (lebih dari 50 karakter)": "" },
      { "• Typo atau kesalahan penulisan nama": "" },
      { "• Bulan Romawi dengan huruf kecil (ix) atau angka (9)": "" },
      { "• Tahun Hijriah atau Masehi kurang dari 4 digit": "" },
      { "": "" },
      { "": "" },
      { "📌 CATATAN PENTING:": "" },
      { "": "" },
      {
        "• Nomor urut di nomor sertifikat (001, 002, 003) akan otomatis sesuai urutan baris di Excel":
          "",
      },
      {
        "• Baris pertama di Excel akan mendapat nomor 001, baris kedua 002, dst":
          "",
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
  const handlePrint = async () => {
    // Get the certificate element from PREVIEW (not hidden print-area)
    // Because preview has already rendered QR codes
    const previewElement = document.querySelector(".certificate-content");
    if (!previewElement) {
      alert("Sertifikat tidak ditemukan. Silakan refresh halaman.");
      return;
    }

    // Get all canvas elements from the PREVIEW (already rendered with QR codes)
    const originalCanvases = previewElement.querySelectorAll("canvas");

    // Wait a bit to ensure QR codes are fully rendered
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Convert all canvas QR codes to data URLs from the preview
    const qrCodeDataUrls = new Map<string, string>();
    originalCanvases.forEach((canvas) => {
      try {
        const dataQr = canvas.getAttribute("data-qr");
        if (dataQr) {
          const dataUrl = canvas.toDataURL("image/png");
          qrCodeDataUrls.set(dataQr, dataUrl);
          console.log(`Captured QR code: ${dataQr}`, dataUrl.substring(0, 50));
        }
      } catch (e) {
        console.warn("Could not convert canvas to image:", e);
      }
    });

    // Clone the certificate content from preview
    const clonedContent = previewElement.cloneNode(true) as HTMLElement;

    // Replace all canvas elements in cloned content with images
    const clonedCanvases = clonedContent.querySelectorAll("canvas");
    clonedCanvases.forEach((canvas) => {
      const dataQr = canvas.getAttribute("data-qr");
      if (dataQr && qrCodeDataUrls.has(dataQr)) {
        const img = document.createElement("img");
        img.src = qrCodeDataUrls.get(dataQr)!;

        // Copy all attributes and styles
        img.setAttribute("data-qr", dataQr);
        img.className = canvas.className;

        // Copy dimensions from canvas
        const computedStyle = window.getComputedStyle(canvas);
        img.style.width = canvas.style.width || computedStyle.width;
        img.style.height = canvas.style.height || computedStyle.height;
        img.style.display = computedStyle.display;
        img.style.imageRendering = "crisp-edges";

        // Replace canvas with image
        canvas.parentNode?.replaceChild(img, canvas);
        console.log(`Replaced canvas ${dataQr} with image`);
      }
    });

    // Get all stylesheets from current document
    const styleSheets = Array.from(document.styleSheets);
    let allStyles = "";

    // Extract CSS rules from all stylesheets
    styleSheets.forEach((sheet) => {
      try {
        if (sheet.cssRules) {
          Array.from(sheet.cssRules).forEach((rule) => {
            allStyles += rule.cssText + "\n";
          });
        }
      } catch (e) {
        // Some stylesheets might have CORS issues, skip them
        console.warn("Could not access stylesheet:", e);
      }
    });

    // Get all style tags
    const styleTags = Array.from(document.querySelectorAll("style"));
    styleTags.forEach((tag) => {
      allStyles += tag.innerHTML + "\n";
    });

    // Create new window for printing
    const printWindow = window.open("", "_blank", "width=1123,height=794");
    if (!printWindow) {
      alert("Popup diblokir! Mohon izinkan popup untuk mencetak.");
      return;
    }

    // Get certificate ID for QR code generation
    const certificateId =
      activeStudent.verificationId || "001/IF/20222/A.5-II/IX/1446/2024";

    // Wrap cloned content in proper structure for print
    const printContent = `
      <div class="a4-landscape" style="width: 297mm; height: 210mm; position: relative; background: white; overflow: hidden;">
        ${clonedContent.innerHTML}
      </div>
    `;

    // Write clean HTML structure to new window with all existing styles
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Sertifikat Laboratorium - ${activeStudent.name}</title>
          
          <!-- Import Google Fonts used by the certificate -->
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,600&family=Inter:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
          
          <style>
            /* Copy all existing styles from main document */
            ${allStyles}
            
            /* Additional print-specific overrides */
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }

            /* Page setup for A4 landscape */
            @page {
              size: A4 landscape;
              margin: 0;
            }

            html, body {
              width: 297mm;
              height: 210mm;
              margin: 0 !important;
              padding: 0 !important;
              background: white;
              overflow: hidden;
            }

            /* Enable exact color printing - CRITICAL */
            *,
            *::before,
            *::after {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              color-adjust: exact !important;
            }

            /* Certificate container */
            .a4-landscape {
              width: 297mm !important;
              height: 210mm !important;
              position: relative;
              background: white;
              overflow: hidden;
              page-break-after: avoid;
              page-break-inside: avoid;
            }

            .certificate-content {
              width: 100% !important;
              height: 100% !important;
              position: relative;
            }

            /* Hide elements that shouldn't be printed */
            .no-print,
            button,
            input,
            select,
            textarea,
            nav,
            header:not(.certificate-header),
            footer:not(.certificate-footer) {
              display: none !important;
            }

            /* Ensure all backgrounds and colors print */
            .bg-gradient-to-br,
            .bg-gradient-to-r,
            .bg-gradient-to-t,
            .bg-gradient-to-b,
            .bg-gradient-to-l,
            [class*="bg-"],
            [class*="text-"],
            [class*="border-"],
            [style*="background"],
            [style*="color"] {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              color-adjust: exact !important;
            }

            /* Preserve specific opacity values for decorative elements */
            .opacity-15 {
              opacity: 0.15 !important;
            }

            .opacity-30 {
              opacity: 0.30 !important;
            }

            .opacity-3 {
              opacity: 0.03 !important;
            }

            .opacity-\[0\.03\],
            [class*="print:opacity-"] {
              opacity: 0.03 !important;
            }

            .opacity-\[0\.25\] {
              opacity: 0.25 !important;
            }

            /* Ensure images print correctly */
            img {
              max-width: 100%;
              height: auto;
              page-break-inside: avoid;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }

            /* SVG and canvas (for QR code) */
            svg, canvas {
              page-break-inside: avoid;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }

            /* Print-specific rules */
            @media print {
              html, body {
                width: 297mm !important;
                height: 210mm !important;
                margin: 0 !important;
                padding: 0 !important;
                overflow: hidden !important;
              }

              .a4-landscape {
                page-break-after: avoid !important;
                page-break-before: avoid !important;
                page-break-inside: avoid !important;
                width: 297mm !important;
                height: 210mm !important;
              }

              /* Force single page */
              body > * {
                page-break-after: avoid !important;
                page-break-before: avoid !important;
              }

              /* Ensure all colors print */
              * {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
                color-adjust: exact !important;
              }

              /* Preserve opacity for decorative elements in print */
              .opacity-15 {
                opacity: 0.15 !important;
              }

              .opacity-30 {
                opacity: 0.30 !important;
              }

              .opacity-3 {
                opacity: 0.03 !important;
              }

              .opacity-\[0\.03\],
              [class*="print:opacity-"] {
                opacity: 0.03 !important;
              }

              .opacity-\[0\.25\] {
                opacity: 0.25 !important;
              }
            }

            /* Screen preview in popup */
            @media screen {
              body {
                display: flex;
                align-items: center;
                justify-content: center;
                background: #f3f4f6;
                min-height: 100vh;
              }
              
              .a4-landscape {
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                margin: 20px;
              }
            }

            /* Remove any transforms that might affect layout */
            .print-reset {
              transform: none !important;
              transition: none !important;
            }

            /* QR Code images should maintain aspect ratio */
            img[data-qr] {
              image-rendering: crisp-edges;
              image-rendering: -webkit-optimize-contrast;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
          </style>
        </head>
        <body>
          <div class="print-reset">
            ${printContent}
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();

    // Wait for content and fonts to load, then trigger print
    printWindow.onload = () => {
      // Delay to ensure fonts and images are loaded
      setTimeout(() => {
        console.log("Print window loaded, triggering print...");

        // Setup event listener for after print
        printWindow.onafterprint = () => {
          console.log("Print dialog closed, closing window...");
          printWindow.close();
        };

        // Also handle window beforeunload for cancel case
        printWindow.onbeforeunload = () => {
          console.log("Window closing...");
        };

        printWindow.focus();
        printWindow.print();
      }, 1000); // Give time for fonts to load
    };
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
    tempContainer.style.width = "1123px"; // A4 landscape width in pixels at 96dpi
    tempContainer.style.height = "794px"; // A4 landscape height in pixels at 96dpi
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
        scale: 2,
        useCORS: true,
        logging: false,
        width: 1123,
        height: 794,
        backgroundColor: "#ffffff",
      });

      // Create PDF
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", 0, 0, 297, 210);

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

    try {
      // 🔥 STEP 1: SAVE TO DATABASE FIRST
      console.log("💾 Saving certificates to database...");

      try {
        const saveResponse = await fetch("/api/certificates/laboratory/bulk", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ certificates: records }),
        });

        const saveResult = await saveResponse.json();

        if (!saveResponse.ok) {
          // Show warning but allow user to continue
          const continueWithoutSave = window.confirm(
            `⚠️ Gagal menyimpan ke database:\n${saveResult.error}\n\n` +
              `Apakah Anda tetap ingin melanjutkan download ZIP?\n` +
              `(Data tidak akan tersimpan di database)`
          );

          if (!continueWithoutSave) {
            throw new Error("User cancelled: Database save failed");
          }

          console.warn("⚠️ Continuing without database save");
        } else {
          console.log(
            `✅ Successfully saved ${saveResult.count} certificates to database`
          );
          setSaved(true);

          // Optional: Show brief success message
          // User doesn't need to click OK, just shows for 2 seconds
          const successMsg = document.createElement("div");
          successMsg.textContent = `✅ ${saveResult.count} sertifikat disimpan ke database`;
          successMsg.style.cssText =
            "position:fixed;top:20px;right:20px;background:#10b981;color:white;padding:16px 24px;border-radius:8px;z-index:9999;font-weight:600;box-shadow:0 4px 6px rgba(0,0,0,0.1)";
          document.body.appendChild(successMsg);
          setTimeout(() => document.body.removeChild(successMsg), 3000);
        }
      } catch (saveError: any) {
        console.error("❌ Database save error:", saveError);

        // Ask if user wants to continue without saving
        const continueWithoutSave = window.confirm(
          `❌ Error menyimpan ke database:\n${saveError.message}\n\n` +
            `Apakah Anda tetap ingin melanjutkan download ZIP?\n` +
            `(Data tidak akan tersimpan di database)`
        );

        if (!continueWithoutSave) {
          throw new Error("User cancelled: Database save failed");
        }
      }

      // 🔥 STEP 2: GENERATE ZIP FILE
      console.log("📦 Generating ZIP file...");
      const zip = new JSZip();

      // Generate PDF for each student (front page only)
      for (let i = 0; i < records.length; i++) {
        const student = records[i];
        setBatchProgress({ current: i + 1, total: records.length });

        try {
          // Generate front page PDF
          const pdfBlob = await generateCertificatePDF(student, false);

          // Create safe filename: Name_Certificate-Number.pdf
          const safeName = student.name
            .replace(/[^a-zA-Z0-9\s]/g, "") // Remove special characters
            .replace(/\s+/g, "_") // Replace spaces with underscore
            .substring(0, 50); // Limit length

          const safeCertId = student.verificationId
            .replace(/\//g, "-") // Replace / with -
            .replace(/[^a-zA-Z0-9\-]/g, ""); // Remove other special chars

          const filename = `${safeName}_${safeCertId}.pdf`;

          // Add to ZIP
          zip.file(filename, pdfBlob);

          // 🔧 OPTIMIZATION: Force garbage collection hint every 10 items
          if ((i + 1) % 10 === 0) {
            await new Promise((resolve) => setTimeout(resolve, 100));
          }
        } catch (error) {
          console.error(
            `Error generating certificate for ${student.name}:`,
            error
          );

          // Ask user if they want to continue
          const continueOnError = window.confirm(
            `❌ Error saat generate sertifikat untuk:\n${student.name}\n\n` +
              `Sudah berhasil: ${i} dari ${records.length}\n\n` +
              `Lanjutkan dengan sertifikat berikutnya?`
          );

          if (!continueOnError) {
            throw new Error("User cancelled batch generation");
          }
        }
      }

      // Generate ZIP file
      const zipBlob = await zip.generateAsync({
        type: "blob",
        compression: "DEFLATE",
        compressionOptions: { level: 6 },
      });

      // Download ZIP
      const link = document.createElement("a");
      link.href = URL.createObjectURL(zipBlob);
      link.download = `Sertifikat_Laboratorium_${new Date().getTime()}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);

      alert(
        `✅ Berhasil mengunduh ${records.length} sertifikat dalam format ZIP!\n\n` +
          `File telah tersimpan di folder Downloads Anda.`
      );
    } catch (error) {
      console.error("Error generating batch PDFs:", error);

      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";

      alert(
        `❌ Terjadi kesalahan saat generate sertifikat.\n\n` +
          `Error: ${errorMessage}\n\n` +
          `Saran:\n` +
          `• Coba dengan batch lebih kecil (${MAX_RECOMMENDED} sertifikat)\n` +
          `• Tutup tab/aplikasi lain untuk free up memory\n` +
          `• Refresh halaman dan coba lagi\n` +
          `• Hubungi administrator jika masalah berlanjut`
      );
    } finally {
      setIsGeneratingBatch(false);
      setBatchProgress({ current: 0, total: 0 });
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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Generate Sertifikat Laboratorium
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Upload file Excel dan preview sertifikat (depan & belakang). Print
          akan otomatis mencetak dua halaman.
        </p>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="space-y-6 xl:col-span-1">
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
                    if (f) processExcelFile(f);
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
                {/* TEMPORARY: Flip buttons disabled - only front side available */}
                {/* 
                 <Button
                   type="button"
                   size="sm"
                   variant={!showBack ? "default" : "outline"}
                   onClick={() => setShowBack(false)}
                 >
                   <Eye className="w-3 h-3" />Depan
                 </Button>
                 <Button
                   type="button"
                   size="sm"
                   variant={showBack ? "default" : "outline"}
                   onClick={() => setShowBack(true)}
                 >
                   Belakang
                 </Button>
                 <Separator orientation="vertical" className="h-8" />
                 */}
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
                {/* <Button
                  type="button"
                  size="sm"
                  onClick={handlePrint}
                  className="ml-auto"
                  title="Print sertifikat dengan ukuran A4 Landscape"
                  disabled={!records.length || isGeneratingBatch}
                >
                  <Printer className="w-3 h-3" />
                  Print A4
                </Button> */}
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
                    ⏳ Sedang generate PDF...
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div
                      className="bg-amber-600 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${
                          (batchProgress.current / batchProgress.total) * 100
                        }%`,
                      }}
                    />
                  </div>
                  <p className="text-[10px] text-amber-700 dark:text-amber-300">
                    Progress: {batchProgress.current} / {batchProgress.total}{" "}
                    sertifikat
                  </p>
                  <p className="text-[10px] text-amber-600 dark:text-amber-400 mt-1">
                    Mohon tunggu, jangan tutup halaman ini...
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6 xl:col-span-2">
          <Card className="relative">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Preview Sertifikat</CardTitle>
              <CardDescription className="text-xs">
                Preview sertifikat laboratorium. Gunakan Print untuk mencetak.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                ref={previewContainerRef}
                className="w-full overflow-auto rounded-md border bg-background p-4 preview-scroll"
              >
                <div className="mx-auto" style={{ width: "297mm" }}>
                  <div
                    className="a4-landscape relative origin-top mx-auto"
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
                  Preview sertifikat. Gunakan tombol Print untuk mencetak dengan
                  ukuran A4 Landscape.
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
          width: 297mm;
          height: 210mm;
          max-width: 297mm;
          max-height: 210mm;
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
      `}</style>
    </div>
  );
}

export default GenerateCertificatesPage;
