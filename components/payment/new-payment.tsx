"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import {
  CreditCard,
  Wallet,
  Building,
  AlertCircle,
  CheckCircle,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Beaker,
  GraduationCap,
  FileText,
  ArrowLeft,
} from "lucide-react"
import { getUnpaidPaymentItems, makePayment } from "@/app/actions/payment-actions"
import type { PaymentItem } from "@/types/payment"
import { formatCurrency } from "@/lib/utils"
import { toast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"

// Define payment categories
const PAYMENT_CATEGORIES = {
  LABORATORY: "laboratory",
  KKP: "kkp",
  EXAM: "exam",
  TUITION: "tuition",
  OTHER: "other",
}

export default function NewPayment() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [paymentItems, setPaymentItems] = useState<PaymentItem[]>([])
  const [selectedItemId, setSelectedItemId] = useState<string>("")
  const [selectedItem, setSelectedItem] = useState<PaymentItem | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<string>("virtual_account")
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const items = await getUnpaidPaymentItems()
        setPaymentItems(items)

        // Check if there's an item ID in the URL
        const itemId = searchParams.get("item")
        if (itemId) {
          setSelectedItemId(itemId)
          const item = items.find((i) => i.id === itemId)
          if (item) {
            setSelectedItem(item)
            setSelectedCategory(item.category)
          }
        }
      } catch (error) {
        console.error("Error fetching payment items:", error)
        setError("Gagal memuat data pembayaran. Silakan coba lagi nanti.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [searchParams])

  useEffect(() => {
    if (selectedItemId) {
      const item = paymentItems.find((i) => i.id === selectedItemId)
      setSelectedItem(item || null)
    } else {
      setSelectedItem(null)
    }
  }, [selectedItemId, paymentItems])

  const handlePaymentSubmit = async () => {
    if (!selectedItem) {
      setError("Silakan pilih item pembayaran terlebih dahulu.")
      return
    }

    setIsSubmitting(true)
    setError(null)
    setSuccess(null)

    try {
      const result = await makePayment(selectedItemId, paymentMethod)

      if (result.success) {
        setSuccess(result.message)
        toast({
          title: "Pembayaran Berhasil",
          description: result.message,
        })

        // Reset form
        setSelectedItemId("")
        setSelectedItem(null)
        setCurrentStep(1)
        setSelectedCategory(null)

        // Refresh payment items
        const items = await getUnpaidPaymentItems()
        setPaymentItems(items)
      } else {
        setError(result.message)
        toast({
          title: "Pembayaran Gagal",
          description: result.message,
        })
      }
    } catch (error) {
      console.error("Error submitting payment:", error)
      setError("Terjadi kesalahan saat memproses pembayaran. Silakan coba lagi nanti.")
      toast({
        title: "Pembayaran Gagal",
        description: "Terjadi kesalahan saat memproses pembayaran. Silakan coba lagi nanti.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => {
    if (currentStep === 1 && !selectedItem) {
      setError("Silakan pilih item pembayaran terlebih dahulu.")
      return
    }
    setError(null)
    setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep === 1 && selectedCategory) {
      // If we're in step 1 with a category selected, go back to category selection
      setSelectedCategory(null)
      setSelectedItemId("")
      return
    }
    setCurrentStep(currentStep - 1)
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case PAYMENT_CATEGORIES.LABORATORY:
        return (
          <div className="p-2 rounded-full bg-purple-100 text-purple-600">
            <Beaker className="h-5 w-5" />
          </div>
        )
      case PAYMENT_CATEGORIES.EXAM:
        return (
          <div className="p-2 rounded-full bg-blue-100 text-blue-600">
            <FileText className="h-5 w-5" />
          </div>
        )
      case PAYMENT_CATEGORIES.KKP:
        return (
          <div className="p-2 rounded-full bg-green-100 text-green-600">
            <GraduationCap className="h-5 w-5" />
          </div>
        )
      case PAYMENT_CATEGORIES.TUITION:
        return (
          <div className="p-2 rounded-full bg-amber-100 text-amber-600">
            <CreditCard className="h-5 w-5" />
          </div>
        )
      default:
        return (
          <div className="p-2 rounded-full bg-gray-100 text-gray-600">
            <Clock className="h-5 w-5" />
          </div>
        )
    }
  }

  const getCategoryLargeIcon = (category: string) => {
    switch (category) {
      case PAYMENT_CATEGORIES.LABORATORY:
        return <Beaker className="h-12 w-12 text-purple-600" />
      case PAYMENT_CATEGORIES.EXAM:
        return <FileText className="h-12 w-12 text-blue-600" />
      case PAYMENT_CATEGORIES.KKP:
        return <GraduationCap className="h-12 w-12 text-green-600" />
      case PAYMENT_CATEGORIES.TUITION:
        return <CreditCard className="h-12 w-12 text-amber-600" />
      default:
        return <Clock className="h-12 w-12 text-gray-600" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case PAYMENT_CATEGORIES.LABORATORY:
        return "bg-purple-500/10 text-purple-700 border-purple-200"
      case PAYMENT_CATEGORIES.EXAM:
        return "bg-blue-500/10 text-blue-700 border-blue-200"
      case PAYMENT_CATEGORIES.KKP:
        return "bg-green-500/10 text-green-700 border-green-200"
      case PAYMENT_CATEGORIES.TUITION:
        return "bg-amber-500/10 text-amber-700 border-amber-200"
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-200"
    }
  }

  const getCategoryBgColor = (category: string) => {
    switch (category) {
      case PAYMENT_CATEGORIES.LABORATORY:
        return "bg-purple-50 border-purple-200 hover:bg-purple-100"
      case PAYMENT_CATEGORIES.EXAM:
        return "bg-blue-50 border-blue-200 hover:bg-blue-100"
      case PAYMENT_CATEGORIES.KKP:
        return "bg-green-50 border-green-200 hover:bg-green-100"
      case PAYMENT_CATEGORIES.TUITION:
        return "bg-amber-50 border-amber-200 hover:bg-amber-100"
      default:
        return "bg-gray-50 border-gray-200 hover:bg-gray-100"
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case PAYMENT_CATEGORIES.LABORATORY:
        return "Laboratorium"
      case PAYMENT_CATEGORIES.EXAM:
        return "Ujian"
      case PAYMENT_CATEGORIES.KKP:
        return "Kuliah Kerja Profesi"
      case PAYMENT_CATEGORIES.TUITION:
        return "SPP"
      case PAYMENT_CATEGORIES.OTHER:
        return "Lainnya"
      default:
        return category
    }
  }

  const getCategoryDescription = (category: string) => {
    switch (category) {
      case PAYMENT_CATEGORIES.LABORATORY:
        return "Pembayaran untuk praktikum dan penggunaan fasilitas laboratorium"
      case PAYMENT_CATEGORIES.EXAM:
        return "Pembayaran untuk ujian proposal, hasil, dan sidang akhir"
      case PAYMENT_CATEGORIES.KKP:
        return "Pembayaran untuk kegiatan Kuliah Kerja Profesi dan magang"
      case PAYMENT_CATEGORIES.TUITION:
        return "Pembayaran SPP dan biaya kuliah semester"
      case PAYMENT_CATEGORIES.OTHER:
        return "Pembayaran lainnya seperti denda dan administrasi"
      default:
        return ""
    }
  }

  // Get available categories from payment items
  const getAvailableCategories = () => {
    const categories = new Set<string>()
    paymentItems.forEach((item) => categories.add(item.category))
    return Array.from(categories)
  }

  // Filter payment items by category
  const getFilteredPaymentItems = () => {
    if (!selectedCategory) return []
    return paymentItems.filter((item) => item.category === selectedCategory)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {error && (
        <Alert variant="destructive" className="mb-6 bg-red-50 border-red-200">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mb-6 bg-green-50 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <AlertTitle className="text-green-500">Sukses</AlertTitle>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <div className="mb-8">
        <div className="relative">
          <div className="flex items-center justify-between">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep >= 1 ? "bg-primary text-white" : "bg-gray-200 text-gray-500"}`}
            >
              1
            </div>
            <div className={`flex-1 h-1 mx-2 ${currentStep >= 2 ? "bg-primary" : "bg-gray-200"}`}></div>
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep >= 2 ? "bg-primary text-white" : "bg-gray-200 text-gray-500"}`}
            >
              2
            </div>
            <div className={`flex-1 h-1 mx-2 ${currentStep >= 3 ? "bg-primary" : "bg-gray-200"}`}></div>
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep >= 3 ? "bg-primary text-white" : "bg-gray-200 text-gray-500"}`}
            >
              3
            </div>
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <div className={`text-center w-20 ${currentStep >= 1 ? "text-primary font-medium" : "text-gray-500"}`}>
              Pilih Item
            </div>
            <div className={`text-center w-20 ${currentStep >= 2 ? "text-primary font-medium" : "text-gray-500"}`}>
              Metode Bayar
            </div>
            <div className={`text-center w-20 ${currentStep >= 3 ? "text-primary font-medium" : "text-gray-500"}`}>
              Konfirmasi
            </div>
          </div>
        </div>
      </div>

      {currentStep === 1 && (
        <div className="space-y-6 animate-in fade-in-50 duration-300">
          {!selectedCategory ? (
            <>
              <h2 className="text-xl font-semibold">Pilih Kategori Pembayaran</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {getAvailableCategories().map((category) => (
                  <div
                    key={category}
                    className={`p-6 rounded-xl border-2 transition-all cursor-pointer hover:shadow-md text-center ${getCategoryBgColor(category)}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="mb-2">{getCategoryLargeIcon(category)}</div>
                      <h3 className="font-semibold text-lg">{getCategoryLabel(category)}</h3>
                      <p className="text-sm text-gray-600">{getCategoryDescription(category)}</p>

                      <Badge className="mt-2" variant="outline">
                        {paymentItems.filter((item) => item.category === category).length} item tersedia
                      </Badge>
                    </div>
                  </div>
                ))}

                {getAvailableCategories().length === 0 && (
                  <div className="col-span-3 p-8 rounded-xl border border-dashed border-gray-300 bg-gray-50 text-center">
                    <p className="text-gray-500">Tidak ada kategori pembayaran yang tersedia saat ini.</p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  <Button variant="ghost" size="sm" className="mr-2 -ml-2" onClick={() => setSelectedCategory(null)}>
                    <ArrowLeft className="h-4 w-4 mr-1" />
                  </Button>
                  Pembayaran {getCategoryLabel(selectedCategory)}
                </h2>
                <Badge className={getCategoryColor(selectedCategory)}>{getCategoryLabel(selectedCategory)}</Badge>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {getFilteredPaymentItems().map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer hover:shadow-md ${selectedItemId === item.id ? "border-primary bg-primary/5" : "border-gray-200 hover:border-gray-300"}`}
                    onClick={() => setSelectedItemId(item.id)}
                  >
                    <div className="flex items-start gap-3">
                      {getCategoryIcon(item.category)}
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium">{item.name}</h3>
                          <div className="font-semibold text-lg">{formatCurrency(item.amount)}</div>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                        <div className="flex justify-between items-center mt-3">
                          <div className="text-sm text-gray-500">
                            Semester: {item.semester} {item.academicYear}
                          </div>
                          <div className="text-sm text-gray-500">
                            Jatuh tempo: {new Date(item.dueDate).toLocaleDateString("id-ID")}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {getFilteredPaymentItems().length === 0 && (
                  <div className="p-8 rounded-xl border border-dashed border-gray-300 bg-gray-50 text-center">
                    <p className="text-gray-500">Tidak ada item pembayaran yang tersedia untuk kategori ini.</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}

      {currentStep === 2 && (
        <div className="space-y-6 animate-in fade-in-50 duration-300">
          <h2 className="text-xl font-semibold">Pilih Metode Pembayaran</h2>

          <RadioGroup
            value={paymentMethod}
            onValueChange={setPaymentMethod}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <div>
              <RadioGroupItem value="virtual_account" id="virtual_account" className="peer sr-only" />
              <Label
                htmlFor="virtual_account"
                className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-6 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary transition-all hover:shadow-md"
              >
                <CreditCard className="mb-3 h-8 w-8" />
                <span className="font-medium text-lg mb-1">Virtual Account</span>
                <span className="text-sm text-center text-gray-500">
                  Transfer melalui ATM, mobile banking, atau internet banking
                </span>
              </Label>
            </div>
            <div>
              <RadioGroupItem value="e_wallet" id="e_wallet" className="peer sr-only" />
              <Label
                htmlFor="e_wallet"
                className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-6 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary transition-all hover:shadow-md"
              >
                <Wallet className="mb-3 h-8 w-8" />
                <span className="font-medium text-lg mb-1">E-Wallet</span>
                <span className="text-sm text-center text-gray-500">
                  Bayar dengan GoPay, OVO, DANA, LinkAja, atau ShopeePay
                </span>
              </Label>
            </div>
            <div>
              <RadioGroupItem value="bank_teller" id="bank_teller" className="peer sr-only" />
              <Label
                htmlFor="bank_teller"
                className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-6 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary transition-all hover:shadow-md"
              >
                <Building className="mb-3 h-8 w-8" />
                <span className="font-medium text-lg mb-1">Teller Bank</span>
                <span className="text-sm text-center text-gray-500">Bayar langsung di kantor cabang bank terdekat</span>
              </Label>
            </div>
          </RadioGroup>
        </div>
      )}

      {currentStep === 3 && selectedItem && (
        <div className="space-y-6 animate-in fade-in-50 duration-300">
          <h2 className="text-xl font-semibold">Konfirmasi Pembayaran</h2>

          <Card className="overflow-hidden">
            <div className="bg-primary/10 p-4 border-b">
              <h3 className="font-medium text-lg">Ringkasan Pembayaran</h3>
            </div>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-dashed">
                  <div className="flex items-center gap-3">
                    {getCategoryIcon(selectedItem.category)}
                    <div>
                      <h4 className="font-medium">{selectedItem.name}</h4>
                      <Badge className={getCategoryColor(selectedItem.category)}>
                        {getCategoryLabel(selectedItem.category)}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-xl">{formatCurrency(selectedItem.amount)}</div>
                    <div className="text-sm text-gray-500">
                      Jatuh tempo: {new Date(selectedItem.dueDate).toLocaleDateString("id-ID")}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center pb-4">
                  <div className="text-gray-600">Metode Pembayaran</div>
                  <div className="flex items-center gap-2">
                    {paymentMethod === "virtual_account" && <CreditCard className="h-4 w-4" />}
                    {paymentMethod === "e_wallet" && <Wallet className="h-4 w-4" />}
                    {paymentMethod === "bank_teller" && <Building className="h-4 w-4" />}
                    <span>
                      {paymentMethod === "virtual_account" && "Virtual Account"}
                      {paymentMethod === "e_wallet" && "E-Wallet"}
                      {paymentMethod === "bank_teller" && "Teller Bank"}
                    </span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between items-center pt-2">
                  <div className="font-medium">Total Pembayaran</div>
                  <div className="font-bold text-xl text-primary">{formatCurrency(selectedItem.amount)}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-800 text-sm">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Penting:</p>
                <p>
                  Pastikan semua informasi pembayaran sudah benar sebelum melanjutkan. Pembayaran yang telah diproses
                  tidak dapat dibatalkan.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between mt-8">
        {currentStep > 1 || selectedCategory ? (
          <Button variant="outline" onClick={prevStep} className="flex items-center gap-1">
            <ChevronLeft className="h-4 w-4" />
            Kembali
          </Button>
        ) : (
          <Button variant="outline" onClick={() => router.back()} className="flex items-center gap-1">
            <ChevronLeft className="h-4 w-4" />
            Kembali ke Dashboard
          </Button>
        )}

        {currentStep < 3 ? (
          <Button onClick={nextStep} disabled={currentStep === 1 && !selectedItem} className="flex items-center gap-1">
            Lanjutkan
            <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={handlePaymentSubmit}
            disabled={!selectedItem || isSubmitting}
            className="flex items-center gap-1"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Memproses...
              </>
            ) : (
              <>
                Bayar Sekarang
                <ChevronRight className="h-4 w-4" />
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  )
}

