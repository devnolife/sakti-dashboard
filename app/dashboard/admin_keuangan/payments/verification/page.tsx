import { PaymentVerificationTable } from "@/components/payment/verification-table"
import { PaymentFilters } from "@/components/payment/payment-filters"
import { PaymentStats } from "@/components/payment/payment-stats"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PaymentVerificationPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Halaman Verifikasi Mahasiswa</h2>
          <p className="text-muted-foreground">
            Verifikasi pembayaran mahasiswa, cek status pembayaran, dan riwayat pembayaran
          </p>
        </div>
      </div>
      <PaymentStats />
      <Card className="p-6 border shadow-sm bg-white/50 backdrop-blur-sm">
        <Tabs defaultValue="all" className="mb-6">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="all">All Payments</TabsTrigger>
            <TabsTrigger value="pending" className="text-amber-600">
              Pending
            </TabsTrigger>
            <TabsTrigger value="verified" className="text-emerald-600">
              Verified
            </TabsTrigger>
            <TabsTrigger value="rejected" className="text-rose-600">
              Rejected
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <PaymentFilters />
            <PaymentVerificationTable />
          </TabsContent>
          <TabsContent value="pending" className="mt-4">
            <PaymentFilters />
            <PaymentVerificationTable filterStatus="pending" />
          </TabsContent>
          <TabsContent value="verified" className="mt-4">
            <PaymentFilters />
            <PaymentVerificationTable filterStatus="verified" />
          </TabsContent>
          <TabsContent value="rejected" className="mt-4">
            <PaymentFilters />
            <PaymentVerificationTable filterStatus="rejected" />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}

