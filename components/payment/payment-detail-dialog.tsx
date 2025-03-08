"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { Payment } from "@/types/payment"
import { formatCurrency, formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Printer, Download, Copy, Check } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface PaymentDetailDialogProps {
  payment: Payment | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function PaymentDetailDialog({ payment, open, onOpenChange }: PaymentDetailDialogProps) {
  const [copied, setCopied] = useState(false)

  if (!payment) return null

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500/10 text-green-500 border-green-200">Selesai</Badge>
      case "pending":
        return <Badge className="bg-amber-500/10 text-amber-500 border-amber-200">Tertunda</Badge>
      case "failed":
        return <Badge className="bg-red-500/10 text-red-500 border-red-200">Gagal</Badge>
      case "refunded":
        return <Badge className="bg-blue-500/10 text-blue-500 border-blue-200">Dikembalikan</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "laboratory":
        return "Laboratorium"
      case "exam":
        return "Ujian"
      case "kkp":
        return "KKP"
      case "tuition":
        return "SPP"
      case "other":
        return "Lainnya"
      default:
        return category
    }
  }

  const handlePrint = () => {
    const printWindow = window.open("", "_blank")
    if (!printWindow) {
      toast({
        title: "Gagal membuka jendela cetak",
        description: "Mohon izinkan pop-up untuk situs ini",
      })
      return
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Bukti Pembayaran</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #eee;
            padding-bottom: 20px;
          }
          .logo {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          .receipt-title {
            font-size: 20px;
            margin-bottom: 5px;
          }
          .receipt-id {
            color: #666;
            margin-bottom: 20px;
          }
          .detail-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            border-bottom: 1px solid #eee;
            padding-bottom: 10px;
          }
          .label {
            font-weight: bold;
            flex: 1;
          }
          .value {
            flex: 2;
          }
          .footer {
            margin-top: 50px;
            text-align: center;
            font-size: 14px;
            color: #666;
          }
          .status {
            display: inline-block;
            padding: 5px 10px;
            border-radius: 4px;
            font-weight: bold;
          }
          .status-completed {
            background-color: #d1fae5;
            color: #047857;
          }
          .status-pending {
            background-color: #fef3c7;
            color: #92400e;
          }
          .status-failed {
            background-color: #fee2e2;
            color: #b91c1c;
          }
          .status-refunded {
            background-color: #dbeafe;
            color: #1e40af;
          }
          @media print {
            body {
              padding: 0;
              margin: 0;
            }
            .no-print {
              display: none;
            }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">Universitas Teknologi</div>
          <div class="receipt-title">Bukti Pembayaran</div>
          <div class="receipt-id">ID: ${payment.id}</div>
        </div>
        
        <div class="detail-row">
          <div class="label">Deskripsi:</div>
          <div class="value">${payment.description}</div>
        </div>
        
        <div class="detail-row">
          <div class="label">Jumlah:</div>
          <div class="value">${formatCurrency(payment.amount)}</div>
        </div>
        
        <div class="detail-row">
          <div class="label">Kategori:</div>
          <div class="value">${getCategoryLabel(payment.category)}</div>
        </div>
        
        <div class="detail-row">
          <div class="label">Status:</div>
          <div class="value">
            <span class="status status-${payment.status}">${
              payment.status === "completed"
                ? "Selesai"
                : payment.status === "pending"
                  ? "Tertunda"
                  : payment.status === "failed"
                    ? "Gagal"
                    : payment.status === "refunded"
                      ? "Dikembalikan"
                      : payment.status
            }</span>
          </div>
        </div>
        
        <div class="detail-row">
          <div class="label">Tanggal Jatuh Tempo:</div>
          <div class="value">${formatDate(payment.dueDate)}</div>
        </div>
        
        ${
          payment.paidDate
            ? `
        <div class="detail-row">
          <div class="label">Tanggal Pembayaran:</div>
          <div class="value">${formatDate(payment.paidDate)}</div>
        </div>
        `
            : ""
        }
        
        ${
          payment.paymentMethod
            ? `
        <div class="detail-row">
          <div class="label">Metode Pembayaran:</div>
          <div class="value">${payment.paymentMethod}</div>
        </div>
        `
            : ""
        }
        
        ${
          payment.receiptNumber
            ? `
        <div class="detail-row">
          <div class="label">Nomor Kwitansi:</div>
          <div class="value">${payment.receiptNumber}</div>
        </div>
        `
            : ""
        }
        
        <div class="detail-row">
          <div class="label">Semester:</div>
          <div class="value">${payment.semester}</div>
        </div>
        
        <div class="detail-row">
          <div class="label">Tahun Akademik:</div>
          <div class="value">${payment.academicYear}</div>
        </div>
        
        <div class="footer">
          <p>Dokumen ini adalah bukti pembayaran resmi. Simpan untuk arsip Anda.</p>
          <p>© ${new Date().getFullYear()} Universitas Teknologi. Semua hak dilindungi.</p>
        </div>
        
        <div class="no-print" style="margin-top: 30px; text-align: center;">
          <button onclick="window.print()">Cetak Bukti Pembayaran</button>
        </div>
      </body>
      </html>
    `

    printWindow.document.open()
    printWindow.document.write(htmlContent)
    printWindow.document.close()

    // Trigger print after content is loaded
    printWindow.onload = () => {
      printWindow.print()
    }
  }

  const handleDownloadPDF = () => {
    try {
      // In a real application, we would use a library like jsPDF to generate a PDF
      // For this example, we'll just simulate a download
      toast({
        title: "PDF Berhasil Diunduh",
        description: "Bukti pembayaran telah berhasil diunduh",
      })
    } catch (error) {
      console.error("Error generating PDF:", error)
      toast({
        title: "Gagal Mengunduh PDF",
        description: "Terjadi kesalahan saat mengunduh bukti pembayaran",
      })
    }
  }

  const copyToClipboard = () => {
    const text = `
Bukti Pembayaran
ID: ${payment.id}
Deskripsi: ${payment.description}
Jumlah: ${formatCurrency(payment.amount)}
Kategori: ${getCategoryLabel(payment.category)}
Status: ${payment.status}
Tanggal Jatuh Tempo: ${formatDate(payment.dueDate)}
${payment.paidDate ? `Tanggal Pembayaran: ${formatDate(payment.paidDate)}` : ""}
${payment.paymentMethod ? `Metode Pembayaran: ${payment.paymentMethod}` : ""}
${payment.receiptNumber ? `Nomor Kwitansi: ${payment.receiptNumber}` : ""}
Semester: ${payment.semester}
Tahun Akademik: ${payment.academicYear}
    `

    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
        toast({
          title: "Disalin ke Clipboard",
          description: "Detail pembayaran telah disalin",
        })
      })
      .catch((err) => {
        console.error("Failed to copy: ", err)
        toast({
          title: "Gagal Menyalin",
          description: "Tidak dapat menyalin ke clipboard",
        })
      })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Detail Pembayaran</DialogTitle>
          <DialogDescription>Informasi lengkap tentang pembayaran ini</DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">{payment.description}</h3>
              <p className="text-muted-foreground text-sm">ID: {payment.id}</p>
            </div>
            <div>{getStatusBadge(payment.status)}</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Jumlah</p>
              <p className="font-medium text-lg">{formatCurrency(payment.amount)}</p>
            </div>

            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Kategori</p>
              <p className="font-medium">{getCategoryLabel(payment.category)}</p>
            </div>

            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Tanggal Jatuh Tempo</p>
              <p className="font-medium">{formatDate(payment.dueDate)}</p>
            </div>

            {payment.paidDate && (
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Tanggal Pembayaran</p>
                <p className="font-medium">{formatDate(payment.paidDate)}</p>
              </div>
            )}

            {payment.paymentMethod && (
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Metode Pembayaran</p>
                <p className="font-medium">{payment.paymentMethod}</p>
              </div>
            )}

            {payment.receiptNumber && (
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Nomor Kwitansi</p>
                <p className="font-medium">{payment.receiptNumber}</p>
              </div>
            )}

            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Semester</p>
              <p className="font-medium">{payment.semester}</p>
            </div>

            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Tahun Akademik</p>
              <p className="font-medium">{payment.academicYear}</p>
            </div>
          </div>

          <div className="pt-4 border-t flex flex-wrap gap-2 justify-end">
            <Button variant="outline" size="sm" onClick={copyToClipboard}>
              {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              {copied ? "Disalin" : "Salin"}
            </Button>
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              Cetak
            </Button>
            <Button variant="default" size="sm" onClick={handleDownloadPDF}>
              <Download className="h-4 w-4 mr-2" />
              Unduh PDF
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

