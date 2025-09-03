"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { ArrowLeft, ArrowRight, Check, CreditCard, Info, Loader2, Wallet, Building } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Nama harus minimal 2 karakter.",
  }),
  nim: z.string().min(5, {
    message: "NIM harus minimal 5 karakter.",
  }),
  email: z.string().email({
    message: "Masukkan alamat email yang valid.",
  }),
  phone: z.string().min(10, {
    message: "Nomor telepon harus minimal 10 karakter.",
  }),
  semester: z.string().min(1, {
    message: "Pilih semester Anda saat ini.",
  }),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  notes: z.string().optional(),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "Anda harus menyetujui syarat dan ketentuan.",
  }),
})

export function AIKKomfrenRegistration() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState<string>("virtual_account")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      nim: "",
      email: "",
      phone: "",
      semester: "",
      preferredDate: "",
      preferredTime: "",
      notes: "",
      termsAccepted: false,
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log(values)
      setIsSubmitting(false)
      setIsRegistered(true)
      toast({
        title: "Pendaftaran Berhasil",
        description: "Pendaftaran Ujian AIK Komfren Anda telah berhasil diajukan.",
      })
    }, 2000)
  }

  const handlePayment = () => {
    setIsSubmitting(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/dashboard/mahasiswa/aik-komfren/schedule")
    }, 2000)
  }

  if (isRegistered) {
    return (
      <div className="space-y-8">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Pembayaran Ujian AIK Komfren
            </span>
          </h1>
          <p className="text-muted-foreground mt-2">Selesaikan pembayaran Anda untuk menyelesaikan pendaftaran</p>
        </div>

        <Alert className="bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-900/30 dark:text-green-300">
          <Check className="h-4 w-4" />
          <AlertTitle>Pendaftaran Terkirim</AlertTitle>
          <AlertDescription>
            Informasi pendaftaran Anda telah berhasil dikirim. Silakan selesaikan pembayaran untuk menyelesaikan
            pendaftaran Anda.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle>Detail Pembayaran</CardTitle>
            <CardDescription>Silakan pilih metode pembayaran dan selesaikan pembayaran</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-lg border p-4 bg-muted/50">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="font-medium">Biaya Ujian AIK Komfren</h3>
                  <p className="text-sm text-muted-foreground">Biaya konsumsi dan administrasi</p>
                </div>
                <div className="text-xl font-bold">Rp 50.000</div>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between items-center mt-4">
                <div className="font-medium">Total Pembayaran</div>
                <div className="text-xl font-bold text-primary">Rp 50.000</div>
              </div>
            </div>

            <div className="space-y-4">
              <Label>Pilih Metode Pembayaran</Label>
              <RadioGroup
                defaultValue="virtual_account"
                value={paymentMethod}
                onValueChange={setPaymentMethod}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <div>
                  <RadioGroupItem value="virtual_account" id="virtual_account" className="peer sr-only" />
                  <Label
                    htmlFor="virtual_account"
                    className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary transition-all hover:shadow-md"
                  >
                    <CreditCard className="mb-3 h-8 w-8" />
                    <span className="font-medium text-lg mb-1">Virtual Account</span>
                    <span className="text-sm text-center text-muted-foreground">
                      Transfer melalui ATM, mobile banking, atau internet banking
                    </span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="e_wallet" id="e_wallet" className="peer sr-only" />
                  <Label
                    htmlFor="e_wallet"
                    className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary transition-all hover:shadow-md"
                  >
                    <Wallet className="mb-3 h-8 w-8" />
                    <span className="font-medium text-lg mb-1">E-Wallet</span>
                    <span className="text-sm text-center text-muted-foreground">
                      Bayar dengan GoPay, OVO, DANA, LinkAja, atau ShopeePay
                    </span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="bank_teller" id="bank_teller" className="peer sr-only" />
                  <Label
                    htmlFor="bank_teller"
                    className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary transition-all hover:shadow-md"
                  >
                    <Building className="mb-3 h-8 w-8" />
                    <span className="font-medium text-lg mb-1">Teller Bank</span>
                    <span className="text-sm text-center text-muted-foreground">
                      Bayar langsung di cabang bank terdekat
                    </span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-800 text-sm">
              <div className="flex items-start gap-2">
                <Info className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Penting:</p>
                  <p>
                    Harap selesaikan pembayaran dalam waktu 24 jam. Pendaftaran Anda akan otomatis dibatalkan jika
                    pembayaran tidak diterima dalam jangka waktu tersebut.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setIsRegistered(false)}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Pendaftaran
            </Button>
            <Button onClick={handlePayment} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Memproses...
                </>
              ) : (
                <>
                  Bayar Sekarang <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Pendaftaran Ujian AIK Komfren
          </span>
        </h1>
        <p className="text-muted-foreground mt-2">Daftar untuk Ujian AIK Komfren Anda</p>
      </div>

      <div className="mb-8">
        <div className="relative">
          <div className="flex items-center justify-between">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 1 ? "bg-primary text-white" : "bg-gray-200 text-gray-500"}`}
            >
              1
            </div>
            <div className={`flex-1 h-1 mx-2 ${step >= 2 ? "bg-primary" : "bg-gray-200"}`}></div>
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 2 ? "bg-primary text-white" : "bg-gray-200 text-gray-500"}`}
            >
              2
            </div>
            <div className={`flex-1 h-1 mx-2 ${step >= 3 ? "bg-primary" : "bg-gray-200"}`}></div>
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 3 ? "bg-primary text-white" : "bg-gray-200 text-gray-500"}`}
            >
              3
            </div>
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <div className={`text-center w-20 ${step >= 1 ? "text-primary font-medium" : "text-gray-500"}`}>
              Info Pribadi
            </div>
            <div className={`text-center w-20 ${step >= 2 ? "text-primary font-medium" : "text-gray-500"}`}>
              Preferensi
            </div>
            <div className={`text-center w-20 ${step >= 3 ? "text-primary font-medium" : "text-gray-500"}`}>
              Konfirmasi
            </div>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {step === 1 ? "Informasi Pribadi" : step === 2 ? "Preferensi Ujian" : "Tinjau dan Konfirmasi Pendaftaran"}
          </CardTitle>
          <CardDescription>
            {step === 1
              ? "Silakan berikan detail pribadi Anda untuk pendaftaran"
              : step === 2
                ? "Pilih tanggal dan waktu ujian yang Anda inginkan"
                : "Tinjau informasi Anda sebelum mengirim"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {step === 1 && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama Lengkap</FormLabel>
                        <FormControl>
                          <Input placeholder="Masukkan nama lengkap Anda" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="nim"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nomor Induk Mahasiswa (NIM)</FormLabel>
                        <FormControl>
                          <Input placeholder="Masukkan NIM Anda" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Masukkan email Anda" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nomor Telepon</FormLabel>
                          <FormControl>
                            <Input placeholder="Masukkan nomor telepon Anda" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="semester"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Semester Saat Ini</FormLabel>
                        <FormControl>
                          <Input placeholder="Masukkan semester Anda saat ini" {...field} />
                        </FormControl>
                        <FormDescription>
                          Anda harus minimal berada di semester 4 untuk mendaftar Ujian AIK Komfren
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="preferredDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tanggal Ujian yang Diinginkan</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormDescription>
                          Pilih tanggal ujian yang Anda inginkan (tergantung ketersediaan)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="preferredTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Waktu yang Diinginkan</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih waktu" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="morning">Pagi (08:00 - 12:00)</SelectItem>
                            <SelectItem value="afternoon">Siang (13:00 - 16:00)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>Pilih waktu yang Anda inginkan (tergantung ketersediaan)</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Catatan Tambahan</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Informasi tambahan atau permintaan khusus" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div className="rounded-lg border p-4 space-y-4">
                    <div>
                      <h3 className="font-medium text-sm text-muted-foreground">Informasi Pribadi</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        <div>
                          <p className="text-sm font-medium">Nama Lengkap</p>
                          <p className="text-sm">{form.getValues("name") || "Tidak disediakan"}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Nomor Induk Mahasiswa (NIM)</p>
                          <p className="text-sm">{form.getValues("nim") || "Tidak disediakan"}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Email</p>
                          <p className="text-sm">{form.getValues("email") || "Tidak disediakan"}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Nomor Telepon</p>
                          <p className="text-sm">{form.getValues("phone") || "Tidak disediakan"}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Semester Saat Ini</p>
                          <p className="text-sm">{form.getValues("semester") || "Tidak disediakan"}</p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-medium text-sm text-muted-foreground">Preferensi Ujian</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        <div>
                          <p className="text-sm font-medium">Tanggal yang Diinginkan</p>
                          <p className="text-sm">
                            {form.getValues("preferredDate")
                              ? new Date(form.getValues("preferredDate") || "").toLocaleDateString()
                              : "Tidak ada preferensi"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Waktu yang Diinginkan</p>
                          <p className="text-sm">
                            {form.getValues("preferredTime") === "morning"
                              ? "Pagi (08:00 - 12:00)"
                              : form.getValues("preferredTime") === "afternoon"
                                ? "Siang (13:00 - 16:00)"
                                : "Tidak ada preferensi"}
                          </p>
                        </div>
                      </div>
                      {form.getValues("notes") && (
                        <div className="mt-2">
                          <p className="text-sm font-medium">Catatan Tambahan</p>
                          <p className="text-sm">{form.getValues("notes")}</p>
                        </div>
                      )}
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-medium text-sm text-muted-foreground">Informasi Pembayaran</h3>
                      <div className="mt-2">
                        <div className="flex justify-between items-center">
                          <p className="text-sm">Biaya Ujian AIK Komfren (Konsumsi & Administrasi)</p>
                          <p className="text-sm font-medium">Rp 50.000</p>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <p className="text-sm font-medium">Total</p>
                          <p className="text-sm font-bold">Rp 50.000</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-800 text-sm">
                    <div className="flex items-start gap-2">
                      <Info className="h-5 w-5 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Penting:</p>
                        <p>
                          Dengan mengirimkan pendaftaran ini, Anda setuju untuk melanjutkan dengan pembayaran sebesar Rp 50.000 untuk
                          biaya Ujian AIK Komfren. Setelah pendaftaran, Anda akan diarahkan ke halaman pembayaran.
                        </p>
                      </div>
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="termsAccepted"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Saya mengonfirmasi bahwa semua informasi yang diberikan benar dan saya menyetujui syarat dan
                            ketentuan
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between">
          {step > 1 ? (
            <Button variant="outline" onClick={() => setStep(step - 1)}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Kembali
            </Button>
          ) : (
            <Button variant="outline" asChild>
              <Link href="/dashboard/mahasiswa/aik-komfren">
                <ArrowLeft className="mr-2 h-4 w-4" /> Batal
              </Link>
            </Button>
          )}

          {step < 3 ? (
            <Button
              onClick={() => {
                if (step === 1) {
                  const { name, nim, email, phone, semester } = form.getValues()
                  if (!name || !nim || !email || !phone || !semester) {
                    form.trigger(["name", "nim", "email", "phone", "semester"])
                    return
                  }
                }
                setStep(step + 1)
              }}
            >
              Selanjutnya <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={form.handleSubmit(onSubmit)} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Mengirim...
                </>
              ) : (
                <>
                  Kirim Pendaftaran <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

// Add missing components
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

