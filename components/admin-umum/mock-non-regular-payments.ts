import type { NonRegularPayment, PaymentCategory, PaymentMethod, PaymentStatus } from "@/types/non-regular-payment"
import { mockNonRegularStudents } from "./mock-non-regular-students"

const paymentCategories: PaymentCategory[] = ["tuition", "registration", "exam", "laboratory", "graduation", "other"]

const paymentMethods: PaymentMethod[] = [
  "bank_transfer",
  "credit_card",
  "debit_card",
  "cash",
  "e_wallet",
  "scholarship",
]

const paymentStatuses: PaymentStatus[] = ["paid", "pending", "failed", "refunded", "partial"]

function generateRandomDate(start: Date, end: Date): string {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
  return date.toISOString().split("T")[0]
}

function generateInvoiceNumber(): string {
  const prefix = "INV"
  const year = new Date().getFullYear().toString().substring(2)
  const month = (new Date().getMonth() + 1).toString().padStart(2, "0")
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0")
  return `${prefix}/${year}${month}/${random}`
}

function generateTransactionId(): string {
  return `TRX${Math.random().toString(36).substring(2, 10).toUpperCase()}`
}

export const mockNonRegularPayments: NonRegularPayment[] = []

// Generate multiple payments for each student
mockNonRegularStudents.forEach((student) => {
  // Number of payments per student (2-6)
  const paymentCount = Math.floor(Math.random() * 5) + 2

  for (let i = 0; i < paymentCount; i++) {
    const semester = Math.min(student.semester, Math.floor(Math.random() * 8) + 1)
    const academicYear = `${student.entryYear + Math.floor(semester / 2)}/${student.entryYear + Math.floor(semester / 2) + 1}`
    const category = paymentCategories[Math.floor(Math.random() * paymentCategories.length)]

    // Base amount by category
    let amount = 0
    switch (category) {
      case "tuition":
        amount = 5000000 + Math.floor(Math.random() * 2000000)
        break
      case "registration":
        amount = 1000000 + Math.floor(Math.random() * 500000)
        break
      case "exam":
        amount = 500000 + Math.floor(Math.random() * 300000)
        break
      case "laboratory":
        amount = 750000 + Math.floor(Math.random() * 250000)
        break
      case "graduation":
        amount = 2000000 + Math.floor(Math.random() * 1000000)
        break
      case "other":
        amount = 250000 + Math.floor(Math.random() * 750000)
        break
    }

    // Status distribution
    let status: PaymentStatus
    const rand = Math.random()
    if (rand < 0.6) {
      status = "paid"
    } else if (rand < 0.8) {
      status = "pending"
    } else if (rand < 0.9) {
      status = "partial"
    } else if (rand < 0.95) {
      status = "failed"
    } else {
      status = "refunded"
    }

    // Payment method (only if paid or partial)
    let paymentMethod: PaymentMethod | undefined
    if (status === "paid" || status === "partial" || status === "refunded") {
      paymentMethod = paymentMethods[Math.floor(Math.random() * paymentMethods.length)]
    }

    // Due date (past for older semesters, future for current semester)
    const currentYear = new Date().getFullYear()
    const dueDate = generateRandomDate(new Date(currentYear - 1, 0, 1), new Date(currentYear, 11, 31))

    // Payment date (only if paid, partial, or refunded)
    let paymentDate: string | undefined
    if (status === "paid" || status === "partial" || status === "refunded") {
      paymentDate = generateRandomDate(
        new Date(dueDate),
        new Date(new Date(dueDate).getTime() + 30 * 24 * 60 * 60 * 1000), // Due date + 30 days max
      )
    }

    // Transaction ID (only if paid, partial, or refunded)
    let transactionId: string | undefined
    if (status === "paid" || status === "partial" || status === "refunded") {
      transactionId = generateTransactionId()
    }

    // Receipt URL (only if paid or partial)
    let receiptUrl: string | undefined
    if (status === "paid" || status === "partial") {
      receiptUrl = `/receipts/${transactionId}.pdf`
    }

    // Description based on category
    let description = ""
    switch (category) {
      case "tuition":
        description = `Pembayaran SPP Semester ${semester} Tahun Akademik ${academicYear}`
        break
      case "registration":
        description = `Biaya Pendaftaran Program ${
          student.program === "extension"
            ? "Ekstensi"
            : student.program === "weekend"
              ? "Akhir Pekan"
              : student.program === "evening"
                ? "Kelas Malam"
                : student.program === "online"
                  ? "Daring"
                  : student.program === "executive"
                    ? "Eksekutif"
                    : "Internasional"
        }`
        break
      case "exam":
        description = `Biaya Ujian Semester ${semester} Tahun Akademik ${academicYear}`
        break
      case "laboratory":
        description = `Biaya Praktikum Semester ${semester} Tahun Akademik ${academicYear}`
        break
      case "graduation":
        description = `Biaya Wisuda Tahun Akademik ${academicYear}`
        break
      case "other":
        description = `Biaya Lainnya Semester ${semester} Tahun Akademik ${academicYear}`
        break
    }

    // Notes (only sometimes)
    let notes: string | undefined
    if (Math.random() < 0.3) {
      if (status === "partial") {
        notes = `Pembayaran sebagian, sisa pembayaran: Rp${(amount * 0.4).toLocaleString("id-ID")}`
      } else if (status === "failed") {
        notes = "Pembayaran gagal, silakan coba kembali"
      } else if (status === "refunded") {
        notes = "Dana telah dikembalikan ke rekening asal"
      } else if (paymentMethod === "scholarship") {
        notes = "Pembayaran melalui beasiswa"
      } else {
        notes = ["Pembayaran tepat waktu", "Terima kasih atas pembayarannya", "Pembayaran telah dikonfirmasi"][
          Math.floor(Math.random() * 3)
        ]
      }
    }

    const payment: NonRegularPayment = {
      id: `PAY${Math.random().toString(36).substring(2, 9)}`,
      studentId: student.id,
      invoiceNumber: generateInvoiceNumber(),
      amount,
      category,
      description,
      dueDate,
      paymentDate,
      paymentMethod,
      status,
      semester,
      academicYear,
      transactionId,
      receiptUrl,
      notes,
      createdAt: generateRandomDate(new Date(currentYear - 1, 0, 1), new Date()),
      updatedAt: generateRandomDate(new Date(currentYear - 1, 0, 1), new Date()),
      createdBy: "admin",
    }

    mockNonRegularPayments.push(payment)
  }
})

// Sort by due date (newest first)
mockNonRegularPayments.sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime())

export function getPaymentSummary() {
  const totalDue = mockNonRegularPayments.reduce((sum, payment) => sum + payment.amount, 0)
  const totalPaid = mockNonRegularPayments
    .filter((payment) => payment.status === "paid")
    .reduce((sum, payment) => sum + payment.amount, 0)
  const totalPartial = mockNonRegularPayments
    .filter((payment) => payment.status === "partial")
    .reduce((sum, payment) => sum + payment.amount * 0.6, 0) // Assuming 60% paid on average
  const totalOverdue = mockNonRegularPayments
    .filter((payment) => {
      const dueDate = new Date(payment.dueDate)
      const today = new Date()
      return dueDate < today && (payment.status === "pending" || payment.status === "partial")
    })
    .reduce((sum, payment) => {
      if (payment.status === "pending") {
        return sum + payment.amount
      } else {
        return sum + payment.amount * 0.4 // Assuming 40% remaining for partial payments
      }
    }, 0)
  const totalPending = mockNonRegularPayments
    .filter((payment) => payment.status === "pending")
    .reduce((sum, payment) => sum + payment.amount, 0)

  const paymentRate = ((totalPaid + totalPartial) / totalDue) * 100

  return {
    totalDue,
    totalPaid: totalPaid + totalPartial,
    totalOverdue,
    totalPending,
    paymentRate,
  }
}

