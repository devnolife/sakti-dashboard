// WhatsApp notification service for KKP workflow

interface WhatsAppMessage {
  number: string
  message: string
}

interface KkpNotificationData {
  applicationId: string
  studentName: string
  studentMajor: string
  companyName: string
  companyLocation: string
}

// WhatsApp API configuration based on the provided endpoint
const WHATSAPP_API_URL = "https://whatsapp.devnolife.site/send-message"

// WD1 phone number (in international format for WhatsApp API)
const WD1_PHONE_NUMBER = "+628114100444" // Indonesian format without + sign
// const WD1_PHONE_NUMBER = "6285930101400" // Indonesian format without + sign
export class WhatsAppService {
  /**
   * Send WhatsApp notification to WD1 for digital signature
   */
  static async sendWD1ApprovalNotification(data: KkpNotificationData): Promise<boolean> {
    try {
      const message = WhatsAppService.generateWD1ApprovalMessage(data)

      const payload: WhatsAppMessage = {
        number: WD1_PHONE_NUMBER,
        message
      }

      console.log("Sending WhatsApp to WD1:", payload)

      const response = await fetch(WHATSAPP_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        console.error(`WhatsApp API error: ${response.status} ${response.statusText}`)
        const errorText = await response.text()
        console.error("Error details:", errorText)
        return false // Don't throw error, just return false
      }

      const result = await response.text()
      console.log("WhatsApp notification sent successfully:", result)
      return true
    } catch (error) {
      console.error("Failed to send WhatsApp notification:", error)
      return false
    }
  }

  /**
   * Generate professional message for WD1 approval notification
   */
  private static generateWD1ApprovalMessage(data: KkpNotificationData): string {
    return `🔔 *NOTIFIKASI PERSETUJUAN KKP*

Assalamu'alaikum Wr. Wb.
Yth. Bapak/Ibu Wakil Dekan 1,

Terdapat pengajuan KKP baru yang memerlukan persetujuan dan tanda tangan digital Bapak/Ibu:

📋 *Detail Pengajuan:*
• ID Pengajuan: ${data.applicationId}
• Ketua Tim: ${data.studentName}
• Program Studi: ${data.studentMajor}
• Lokasi KKP: ${data.companyName}
• Kota: ${data.companyLocation}

✅ Status: Telah disetujui oleh Administrasi Prodi
🔐 Diperlukan: Tanda tangan digital Wakil Dekan 1

📱 *Silakan klik link berikut untuk melihat detail dan menandatangani dokumen:*
http://localhost:3000/verifikasi/${data.applicationId}

⏰ Mohon untuk segera ditindaklanjuti.

Terima kasih atas perhatian dan kerjasamanya.

Wassalamu'alaikum Wr. Wb.

---
*Sistem Informasi Terintegrasi Fakultas Teknik Unismuh Makassar*`
  }

  /**
   * Send notification to student about approval status
   */
  static async sendStudentNotification(
    studentPhone: string,
    studentName: string,
    status: "approved" | "rejected",
    applicationId: string,
    notes?: string
  ): Promise<boolean> {
    try {
      const message = WhatsAppService.generateStudentNotificationMessage(
        studentName,
        status,
        applicationId,
        notes
      )

      const payload: WhatsAppMessage = {
        number: studentPhone.startsWith("62") ? studentPhone : `62${studentPhone}`,
        message
      }

      console.log("Sending WhatsApp to student:", payload)

      const response = await fetch(WHATSAPP_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        console.error(`WhatsApp API error: ${response.status} ${response.statusText}`)
        const errorText = await response.text()
        console.error("Error details:", errorText)
        return false
      }

      const result = await response.text()
      console.log("Student notification sent successfully:", result)
      return true
    } catch (error) {
      console.error("Failed to send student notification:", error)
      return false
    }
  }

  /**
   * Generate student notification message (simplified)
   */
  private static generateStudentNotificationMessage(
    studentName: string,
    status: "approved" | "rejected",
    applicationId: string,
    notes?: string
  ): string {
    if (status === "approved") {
      return `PENGAJUAN KKP DISETUJUI

Selamat ${studentName}!

Pengajuan KKP Anda telah disetujui:

ID: ${applicationId}
Status: DISETUJUI
Tanggal: ${new Date().toLocaleDateString('id-ID')}

${notes ? `Catatan: ${notes}` : ''}

Dashboard: http://localhost:3000/dashboard/mahasiswa/kkp

Selamat menjalankan KKP!

-- Sistem Informasi Akademik`
    } else {
      return `PENGAJUAN KKP DITOLAK

Kepada ${studentName},

Pengajuan KKP Anda perlu diperbaiki:

ID: ${applicationId}
Status: DITOLAK
Tanggal: ${new Date().toLocaleDateString('id-ID')}

Alasan:
${notes || 'Silakan hubungi staff akademik.'}

Dashboard: http://localhost:3000/dashboard/mahasiswa/kkp

Tetap semangat!

-- Sistem Informasi Akademik`
    }
  }

  /**
   * Test WhatsApp connection with simple message
   */
  static async testConnection(): Promise<boolean> {
    try {
      const testPayload: WhatsAppMessage = {
        number: WD1_PHONE_NUMBER,
        message: "Test koneksi WhatsApp API - Sistem KKP"
      }

      const response = await fetch(WHATSAPP_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testPayload),
      })

      if (!response.ok) {
        console.error(`Test connection failed: ${response.status}`)
        const errorText = await response.text()
        console.error("Error details:", errorText)
        return false
      }

      console.log("WhatsApp connection test successful")
      return true
    } catch (error) {
      console.error("WhatsApp connection test failed:", error)
      return false
    }
  }
}

// Export utility functions for direct use
export const sendWD1Notification = WhatsAppService.sendWD1ApprovalNotification
export const sendStudentNotification = WhatsAppService.sendStudentNotification
export const testWhatsAppConnection = WhatsAppService.testConnection
