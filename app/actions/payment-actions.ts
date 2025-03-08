"use server"
import type { Payment, PaymentItem } from "@/types/payment"

// Mock data for payment history
const paymentHistory: Payment[] = [
  {
    id: "PAY-2023-001",
    amount: 750000,
    description: "Pembayaran Laboratorium Kimia",
    category: "laboratory",
    status: "completed",
    dueDate: "2023-09-15",
    paidDate: "2023-09-10",
    semester: "Ganjil",
    academicYear: "2023/2024",
    receiptNumber: "REC-2023-001",
    paymentMethod: "Virtual Account BNI",
  },
  {
    id: "PAY-2023-002",
    amount: 500000,
    description: "Pembayaran Ujian Tengah Semester",
    category: "exam",
    status: "completed",
    dueDate: "2023-10-20",
    paidDate: "2023-10-18",
    semester: "Ganjil",
    academicYear: "2023/2024",
    receiptNumber: "REC-2023-002",
    paymentMethod: "QRIS",
  },
  {
    id: "PAY-2023-003",
    amount: 1500000,
    description: "Pembayaran KKP",
    category: "kkp",
    status: "completed",
    dueDate: "2023-11-10",
    paidDate: "2023-11-05",
    semester: "Ganjil",
    academicYear: "2023/2024",
    receiptNumber: "REC-2023-003",
    paymentMethod: "Transfer Bank",
  },
  {
    id: "PAY-2023-004",
    amount: 5000000,
    description: "Pembayaran SPP Semester Ganjil",
    category: "tuition",
    status: "completed",
    dueDate: "2023-08-15",
    paidDate: "2023-08-10",
    semester: "Ganjil",
    academicYear: "2023/2024",
    receiptNumber: "REC-2023-004",
    paymentMethod: "Virtual Account BCA",
  },
  {
    id: "PAY-2023-005",
    amount: 500000,
    description: "Pembayaran Ujian Akhir Semester",
    category: "exam",
    status: "pending",
    dueDate: "2023-12-15",
    semester: "Ganjil",
    academicYear: "2023/2024",
  },
  {
    id: "PAY-2023-006",
    amount: 750000,
    description: "Pembayaran Laboratorium Fisika",
    category: "laboratory",
    status: "failed",
    dueDate: "2023-09-20",
    paidDate: "2023-09-20",
    semester: "Ganjil",
    academicYear: "2023/2024",
    paymentMethod: "Virtual Account BRI",
  },
  {
    id: "PAY-2023-007",
    amount: 250000,
    description: "Pembayaran Denda Keterlambatan",
    category: "other",
    status: "refunded",
    dueDate: "2023-10-05",
    paidDate: "2023-10-05",
    semester: "Ganjil",
    academicYear: "2023/2024",
    receiptNumber: "REC-2023-007",
    paymentMethod: "E-Wallet",
  },
  {
    id: "PAY-2024-001",
    amount: 5000000,
    description: "Pembayaran SPP Semester Genap",
    category: "tuition",
    status: "pending",
    dueDate: "2024-02-15",
    semester: "Genap",
    academicYear: "2023/2024",
  },
]

// Mock data for payment items
const paymentItems: PaymentItem[] = [
  {
    id: "ITEM-2024-001",
    name: "Laboratorium Biologi",
    description: "Biaya penggunaan laboratorium biologi untuk praktikum semester genap",
    amount: 750000,
    category: "laboratory",
    semester: "Genap",
    academicYear: "2023/2024",
    dueDate: "2024-03-15",
    isRequired: true,
    isRecurring: false,
  },
  {
    id: "ITEM-2024-002",
    name: "Ujian Tengah Semester",
    description: "Biaya pelaksanaan ujian tengah semester genap",
    amount: 500000,
    category: "exam",
    semester: "Genap",
    academicYear: "2023/2024",
    dueDate: "2024-04-10",
    isRequired: true,
    isRecurring: true,
  },
  {
    id: "ITEM-2024-003",
    name: "Ujian Akhir Semester",
    description: "Biaya pelaksanaan ujian akhir semester genap",
    amount: 500000,
    category: "exam",
    semester: "Genap",
    academicYear: "2023/2024",
    dueDate: "2024-06-15",
    isRequired: true,
    isRecurring: true,
  },
  {
    id: "ITEM-2024-004",
    name: "Laboratorium Komputer",
    description: "Biaya penggunaan laboratorium komputer untuk praktikum semester genap",
    amount: 850000,
    category: "laboratory",
    semester: "Genap",
    academicYear: "2023/2024",
    dueDate: "2024-03-20",
    isRequired: false,
    isRecurring: false,
  },
  {
    id: "ITEM-2024-005",
    name: "Kuliah Kerja Praktik (KKP)",
    description: "Biaya administrasi dan pembimbingan KKP",
    amount: 1500000,
    category: "kkp",
    semester: "Genap",
    academicYear: "2023/2024",
    dueDate: "2024-05-10",
    isRequired: false,
    isRecurring: false,
  },
]

// Get payment history
export async function getPaymentHistory(): Promise<Payment[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return paymentHistory
}

// Get upcoming payments
export async function getUpcomingPayments(): Promise<Payment[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return paymentHistory.filter((payment) => payment.status === "pending")
}

// Get recent payments
export async function getRecentPayments(): Promise<Payment[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return paymentHistory
    .filter((payment) => payment.status === "completed")
    .sort((a, b) => new Date(b.paidDate!).getTime() - new Date(a.paidDate!).getTime())
    .slice(0, 5)
}

// Get payment items
export async function getPaymentItems(): Promise<PaymentItem[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return paymentItems
}

// Get unpaid payment items
export async function getUnpaidPaymentItems(): Promise<PaymentItem[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Get all payment items
  const items = await getPaymentItems()

  // Get payment history
  const history = await getPaymentHistory()

  // Filter out items that have already been paid
  const paidItemIds = history
    .filter((payment) => payment.status === "completed")
    .map((payment) => {
      // Extract the item ID from the description
      const matchingItem = items.find((item) => item.name === payment.description)
      return matchingItem?.id
    })
    .filter(Boolean) as string[]

  // Return items that haven't been paid
  return items.filter((item) => !paidItemIds.includes(item.id))
}

// Submit payment
export async function makePayment(
  itemId: string,
  paymentMethod: string,
): Promise<{ success: boolean; message: string; payment?: Payment }> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Get the payment item
  const items = await getPaymentItems()
  const item = items.find((i) => i.id === itemId)

  if (!item) {
    return { success: false, message: "Item pembayaran tidak ditemukan." }
  }

  // Check if the item has already been paid
  const history = await getPaymentHistory()
  const alreadyPaid = history.some(
    (payment) =>
      payment.description === item.name &&
      payment.status === "completed" &&
      payment.academicYear === item.academicYear &&
      payment.semester === item.semester,
  )

  if (alreadyPaid) {
    return { success: false, message: `Pembayaran untuk ${item.name} sudah dilakukan sebelumnya.` }
  }

  // Create a new payment
  const newPayment: Payment = {
    id: `PAY-${Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")}`,
    amount: item.amount,
    description: item.name,
    category: item.category,
    status: "completed",
    dueDate: item.dueDate,
    paidDate: new Date().toISOString().split("T")[0],
    semester: item.semester,
    academicYear: item.academicYear,
    receiptNumber: `REC-${new Date().toISOString().split("T")[0].replace(/-/g, "")}-${Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")}`,
    paymentMethod,
  }

  // In a real application, we would save this to a database
  // For now, we'll just return the new payment

  return {
    success: true,
    message: `Pembayaran untuk ${item.name} berhasil dilakukan.`,
    payment: newPayment,
  }
}

// Get payment statistics
export async function getPaymentStatistics() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const totalPaid = paymentHistory
    .filter((payment) => payment.status === "completed")
    .reduce((sum, payment) => sum + payment.amount, 0)

  const totalPending = paymentHistory
    .filter((payment) => payment.status === "pending")
    .reduce((sum, payment) => sum + payment.amount, 0)

  const upcomingDue = paymentHistory
    .filter((payment) => {
      if (payment.status !== "pending") return false
      const dueDate = new Date(payment.dueDate)
      const now = new Date()
      const diffTime = dueDate.getTime() - now.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays <= 7 && diffDays >= 0
    })
    .reduce((sum, payment) => sum + payment.amount, 0)

  return {
    totalPaid,
    totalPending,
    upcomingDue,
  }
}

