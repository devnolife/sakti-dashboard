"use client"

import { useState } from "react"
import type { Payment } from "@/types/payment"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"
import PaymentDetailDialog from "./payment-detail-dialog"

interface RecentPaymentsTableProps {
  payments: Payment[]
}

export default function RecentPaymentsTable({ payments }: RecentPaymentsTableProps) {
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null)
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-200">
            Selesai
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-200">
            Tertunda
          </Badge>
        )
      case "failed":
        return (
          <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-200">
            Gagal
          </Badge>
        )
      case "refunded":
        return (
          <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-200">
            Dikembalikan
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "laboratory":
        return (
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            Laboratorium
          </Badge>
        )
      case "exam":
        return (
          <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/20">
            Ujian
          </Badge>
        )
      case "kkp":
        return (
          <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-200">
            KKP
          </Badge>
        )
      case "tuition":
        return (
          <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-200">
            SPP
          </Badge>
        )
      case "other":
        return <Badge variant="outline">Lainnya</Badge>
      default:
        return <Badge variant="outline">{category}</Badge>
    }
  }

  const handleViewDetails = (payment: Payment) => {
    setSelectedPayment(payment)
    setDetailDialogOpen(true)
  }

  if (payments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <p className="text-muted-foreground">Belum ada riwayat pembayaran.</p>
      </div>
    )
  }

  return (
    <>
      <div className="rounded-lg border overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Deskripsi</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Jumlah</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id} className="bg-white dark:bg-gray-800/50">
                <TableCell className="font-medium">{payment.description}</TableCell>
                <TableCell>{getCategoryBadge(payment.category)}</TableCell>
                <TableCell>{formatCurrency(payment.amount)}</TableCell>
                <TableCell>{payment.paidDate || payment.dueDate}</TableCell>
                <TableCell>{getStatusBadge(payment.status)}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => handleViewDetails(payment)}>
                    Detail
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <PaymentDetailDialog payment={selectedPayment} open={detailDialogOpen} onOpenChange={setDetailDialogOpen} />
    </>
  )
}

