"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getPaymentHistory } from "@/app/actions/payment-actions"
import type { Payment } from "@/types/payment"
import { Search } from "lucide-react"
import PaymentDetailDialog from "./payment-detail-dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"

export default function PaymentHistory() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [filteredPayments, setFilteredPayments] = useState<Payment[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null)
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const history = await getPaymentHistory()
        setPayments(history)
        setFilteredPayments(history)
      } catch (error) {
        console.error("Error fetching payment history:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    let filtered = payments

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter((payment) => payment.description.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter((payment) => payment.category === categoryFilter)
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((payment) => payment.status === statusFilter)
    }

    setFilteredPayments(filtered)
  }, [searchQuery, categoryFilter, statusFilter, payments])

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

  return (
    <>
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle>Riwayat Pembayaran</CardTitle>
          <CardDescription>Lihat dan filter riwayat pembayaran Anda</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari pembayaran..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kategori</SelectItem>
                <SelectItem value="laboratory">Laboratorium</SelectItem>
                <SelectItem value="exam">Ujian</SelectItem>
                <SelectItem value="kkp">KKP</SelectItem>
                <SelectItem value="tuition">SPP</SelectItem>
                <SelectItem value="other">Lainnya</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="completed">Selesai</SelectItem>
                <SelectItem value="pending">Tertunda</SelectItem>
                <SelectItem value="failed">Gagal</SelectItem>
                <SelectItem value="refunded">Dikembalikan</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredPayments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <p className="text-muted-foreground">Belum ada riwayat pembayaran.</p>
            </div>
          ) : (
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
                  {filteredPayments.map((payment) => (
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
          )}
        </CardContent>
      </Card>

      <PaymentDetailDialog payment={selectedPayment} open={detailDialogOpen} onOpenChange={setDetailDialogOpen} />
    </>
  )
}

