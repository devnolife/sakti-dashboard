"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { FileText, CalendarIcon, CreditCard, FileCheck, Upload } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import useFormField from "@/hooks/use-form-field"
import { FormFieldError } from "@/components/ui/form-field-error"

// Define schemas for each form type
const activeLetterSchema = z.object({
  semester: z.string().min(1, { message: "Pilih semester" }),
  academicYear: z.string().min(1, { message: "Pilih tahun akademik" }),
  purpose: z.string().min(5, { message: "Tujuan harus diisi minimal 5 karakter" }),
  isParentCivilServant: z.enum(["yes", "no"]),
  parentInstitution: z.string().optional(),
  parentPosition: z.string().optional(),
})

const leaveLetterSchema = z.object({
  leaveType: z.string().min(1, { message: "Pilih jenis cuti" }),
  startDate: z.date({
    required_error: "Tanggal mulai cuti harus diisi",
  }),
  endDate: z.date({
    required_error: "Tanggal selesai cuti harus diisi",
  }),
  reason: z.string().min(10, { message: "Alasan cuti harus diisi minimal 10 karakter" }),
  semester: z.string().min(1, { message: "Pilih semester" }),
  academicYear: z.string().min(1, { message: "Pilih tahun akademik" }),
})

const paymentLetterSchema = z.object({
  paymentType: z.string().min(1, { message: "Pilih jenis pembayaran" }),
  paymentDate: z.date({
    required_error: "Tanggal pembayaran harus diisi",
  }),
  amount: z.string().min(1, { message: "Jumlah pembayaran harus diisi" }),
  semester: z.string().min(1, { message: "Pilih semester" }),
  academicYear: z.string().min(1, { message: "Pilih tahun akademik" }),
  purpose: z.string().min(5, { message: "Tujuan harus diisi minimal 5 karakter" }),
})

const customLetterSchema = z.object({
  letterTitle: z.string().min(5, { message: "Judul surat harus diisi minimal 5 karakter" }),
  recipient: z.string().min(3, { message: "Penerima surat harus diisi minimal 3 karakter" }),
  recipientAddress: z.string().min(5, { message: "Alamat penerima harus diisi minimal 5 karakter" }),
  letterPurpose: z.string().min(10, { message: "Tujuan surat harus diisi minimal 10 karakter" }),
  letterContent: z.string().min(20, { message: "Isi surat harus diisi minimal 20 karakter" }),
  letterType: z.string().min(1, { message: "Pilih jenis surat" }),
})

// Define props type (void element - no children)
type CorrespondenceFormTabsProps = {
  onSubmit: (data: any) => void
  isSubmitting?: boolean
  defaultTab?: string
}

export function CorrespondenceFormTabs({
  onSubmit,
  isSubmitting = false,
  defaultTab = "active",
}: CorrespondenceFormTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab)
  const [isParentCivilServant, setIsParentCivilServant] = useState<"yes" | "no">("no")

  // Initialize forms for each tab
  const activeForm = useForm<z.infer<typeof activeLetterSchema>>({
    resolver: zodResolver(activeLetterSchema),
    defaultValues: {
      semester: "",
      academicYear: "",
      purpose: "",
      isParentCivilServant: "no",
      parentInstitution: "",
      parentPosition: "",
    },
  })

  const leaveForm = useForm<z.infer<typeof leaveLetterSchema>>({
    resolver: zodResolver(leaveLetterSchema),
    defaultValues: {
      leaveType: "",
      reason: "",
      semester: "",
      academicYear: "",
    },
  })

  const paymentForm = useForm<z.infer<typeof paymentLetterSchema>>({
    resolver: zodResolver(paymentLetterSchema),
    defaultValues: {
      paymentType: "",
      amount: "",
      semester: "",
      academicYear: "",
      purpose: "",
    },
  })

  const customForm = useForm<z.infer<typeof customLetterSchema>>({
    resolver: zodResolver(customLetterSchema),
    defaultValues: {
      letterTitle: "",
      recipient: "",
      recipientAddress: "",
      letterPurpose: "",
      letterContent: "",
      letterType: "",
    },
  })

  // Handle form submissions
  const handleActiveSubmit = (data: z.infer<typeof activeLetterSchema>) => {
    onSubmit({
      type: "active",
      ...data,
    })
  }

  const handleLeaveSubmit = (data: z.infer<typeof leaveLetterSchema>) => {
    onSubmit({
      type: "leave",
      ...data,
    })
  }

  const handlePaymentSubmit = (data: z.infer<typeof paymentLetterSchema>) => {
    onSubmit({
      type: "payment",
      ...data,
    })
  }

  const handleCustomSubmit = (data: z.infer<typeof customLetterSchema>) => {
    onSubmit({
      type: "custom",
      ...data,
    })
  }

  // Handle parent civil servant change
  const handleParentCivilServantChange = (value: "yes" | "no") => {
    setIsParentCivilServant(value)
    activeForm.setValue("isParentCivilServant", value)
  }

  // useFormField instances must be declared outside of render functions
  const semesterFieldActive = useFormField<string>({
    initialValue: "",
    validate: (value) => (!value ? "Semester harus dipilih" : undefined),
  })
  const academicYearFieldActive = useFormField<string>({
    initialValue: "",
    validate: (value) => (!value ? "Tahun akademik harus dipilih" : undefined),
  })
  const purposeFieldActive = useFormField<string>({
    initialValue: "",
    validate: (value) => (!value ? "Tujuan harus diisi" : value.length < 5 ? "Tujuan minimal 5 karakter" : undefined),
  })
  const institutionFieldActive = useFormField<string>({
    initialValue: "",
    validate: (value) => (!value && isParentCivilServant === "yes" ? "Instansi harus diisi" : undefined),
  })
  const positionFieldActive = useFormField<string>({
    initialValue: "",
    validate: (value) => (!value && isParentCivilServant === "yes" ? "Jabatan harus diisi" : undefined),
  })

  const semesterFieldLeave = useFormField<string>({
    initialValue: "",
    validate: (value) => (!value ? "Semester harus dipilih" : undefined),
  })
  const academicYearFieldLeave = useFormField<string>({
    initialValue: "",
    validate: (value) => (!value ? "Tahun akademik harus dipilih" : undefined),
  })
  const leaveTypeFieldLeave = useFormField<string>({
    initialValue: "",
    validate: (value) => (!value ? "Jenis cuti harus dipilih" : undefined),
  })
  const reasonFieldLeave = useFormField<string>({
    initialValue: "",
    validate: (value) =>
      !value ? "Alasan cuti harus diisi" : value.length < 10 ? "Alasan cuti minimal 10 karakter" : undefined,
  })

  const semesterFieldPayment = useFormField<string>({
    initialValue: "",
    validate: (value) => (!value ? "Semester harus dipilih" : undefined),
  })
  const academicYearFieldPayment = useFormField<string>({
    initialValue: "",
    validate: (value) => (!value ? "Tahun akademik harus dipilih" : undefined),
  })
  const paymentTypeFieldPayment = useFormField<string>({
    initialValue: "",
    validate: (value) => (!value ? "Jenis pembayaran harus dipilih" : undefined),
  })
  const amountFieldPayment = useFormField<string>({
    initialValue: "",
    validate: (value) => (!value ? "Jumlah pembayaran harus diisi" : undefined),
  })
  const purposeFieldPayment = useFormField<string>({
    initialValue: "",
    validate: (value) => (!value ? "Tujuan harus diisi" : value.length < 5 ? "Tujuan minimal 5 karakter" : undefined),
  })

  const letterTypeFieldCustom = useFormField<string>({
    initialValue: "",
    validate: (value) => (!value ? "Jenis surat harus dipilih" : undefined),
  })
  const titleFieldCustom = useFormField<string>({
    initialValue: "",
    validate: (value) =>
      !value ? "Judul surat harus diisi" : value.length < 5 ? "Judul surat minimal 5 karakter" : undefined,
  })
  const recipientFieldCustom = useFormField<string>({
    initialValue: "",
    validate: (value) =>
      !value ? "Penerima surat harus diisi" : value.length < 3 ? "Penerima surat minimal 3 karakter" : undefined,
  })
  const addressFieldCustom = useFormField<string>({
    initialValue: "",
    validate: (value) =>
      !value ? "Alamat penerima harus diisi" : value.length < 5 ? "Alamat penerima minimal 5 karakter" : undefined,
  })
  const purposeFieldCustom = useFormField<string>({
    initialValue: "",
    validate: (value) =>
      !value ? "Tujuan surat harus diisi" : value.length < 10 ? "Tujuan surat minimal 10 karakter" : undefined,
  })
  const contentFieldCustom = useFormField<string>({
    initialValue: "",
    validate: (value) =>
      !value ? "Isi surat harus diisi" : value.length < 20 ? "Isi surat minimal 20 karakter" : undefined,
  })

  return (
    <Tabs defaultValue={defaultTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-4 mb-6">
        <TabsTrigger value="active" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          <span className="hidden sm:inline">Surat Aktif</span>
        </TabsTrigger>
        <TabsTrigger value="leave" className="flex items-center gap-2">
          <CalendarIcon className="h-4 w-4" />
          <span className="hidden sm:inline">Surat Cuti</span>
        </TabsTrigger>
        <TabsTrigger value="payment" className="flex items-center gap-2">
          <CreditCard className="h-4 w-4" />
          <span className="hidden sm:inline">Surat Pembayaran</span>
        </TabsTrigger>
        <TabsTrigger value="custom" className="flex items-center gap-2">
          <FileCheck className="h-4 w-4" />
          <span className="hidden sm:inline">Surat Lainnya</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="active" className="mt-0">
        <Form {...activeForm}>
          <form onSubmit={activeForm.handleSubmit(handleActiveSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={activeForm.control}
                name="semester"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Semester</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value)
                        semesterFieldActive.handleChange({ target: { value } } as any)
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih semester" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((semester) => (
                          <SelectItem key={semester} value={semester.toString()}>
                            Semester {semester}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {semesterFieldActive.isInvalid && <FormFieldError message={semesterFieldActive.error} />}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={activeForm.control}
                name="academicYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tahun Akademik</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value)
                        academicYearFieldActive.handleChange({ target: { value } } as any)
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih tahun akademik" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {["2023/2024", "2024/2025", "2025/2026"].map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {academicYearFieldActive.isInvalid && <FormFieldError message={academicYearFieldActive.error} />}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={activeForm.control}
              name="purpose"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tujuan Penggunaan Surat</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Contoh: Untuk keperluan beasiswa, pengajuan visa, dll."
                      {...field}
                      className="min-h-[100px]"
                      onChange={(e) => {
                        field.onChange(e)
                        purposeFieldActive.handleChange(e)
                      }}
                      onBlur={(e) => {
                        field.onBlur()
                        purposeFieldActive.handleBlur(e)
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Jelaskan secara singkat tujuan penggunaan surat keterangan aktif kuliah ini
                  </FormDescription>
                  {purposeFieldActive.isInvalid && <FormFieldError message={purposeFieldActive.error} />}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={activeForm.control}
              name="isParentCivilServant"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Apakah orang tua Anda seorang PNS/ASN?</FormLabel>
                  <div className="flex items-center space-x-4">
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="parent-yes"
                          value="yes"
                          checked={field.value === "yes"}
                          onChange={() => {
                            field.onChange("yes")
                            handleParentCivilServantChange("yes")
                          }}
                          className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                        />
                        <label htmlFor="parent-yes" className="text-sm font-normal">
                          Ya
                        </label>
                      </div>
                    </FormControl>
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="parent-no"
                          value="no"
                          checked={field.value === "no"}
                          onChange={() => {
                            field.onChange("no")
                            handleParentCivilServantChange("no")
                          }}
                          className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                        />
                        <label htmlFor="parent-no" className="text-sm font-normal">
                          Tidak
                        </label>
                      </div>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {isParentCivilServant === "yes" && (
              <div className="space-y-6 rounded-lg border p-4 bg-muted/30">
                <h3 className="text-sm font-medium">Informasi PNS/ASN Orang Tua</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={activeForm.control}
                    name="parentInstitution"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Instansi</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Nama instansi tempat bekerja"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e)
                              institutionFieldActive.handleChange(e)
                            }}
                            onBlur={(e) => {
                              field.onBlur()
                              institutionFieldActive.handleBlur(e)
                            }}
                          />
                        </FormControl>
                        {institutionFieldActive.isInvalid && <FormFieldError message={institutionFieldActive.error} />}
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={activeForm.control}
                    name="parentPosition"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Jabatan</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Jabatan orang tua"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e)
                              positionFieldActive.handleChange(e)
                            }}
                            onBlur={(e) => {
                              field.onBlur()
                              positionFieldActive.handleBlur(e)
                            }}
                          />
                        </FormControl>
                        {positionFieldActive.isInvalid && <FormFieldError message={positionFieldActive.error} />}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <FormLabel>Unggah SK PNS/ASN</FormLabel>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-primary/20 bg-primary/5 px-6 py-8 transition-colors hover:bg-primary/10">
                    <div className="text-center">
                      <Upload className="mx-auto h-10 w-10 text-primary/30" />
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-transparent font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary/80"
                        >
                          <span>Unggah file</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">atau drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">PDF, JPG, PNG hingga 5MB</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></span>
                  Memproses...
                </>
              ) : (
                "Lanjutkan"
              )}
            </Button>
          </form>
        </Form>
      </TabsContent>

      <TabsContent value="leave" className="mt-0">
        <Form {...leaveForm}>
          <form onSubmit={leaveForm.handleSubmit(handleLeaveSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={leaveForm.control}
                name="semester"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Semester</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value)
                        semesterFieldLeave.handleChange({ target: { value } } as any)
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih semester" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((semester) => (
                          <SelectItem key={semester} value={semester.toString()}>
                            Semester {semester}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {semesterFieldLeave.isInvalid && <FormFieldError message={semesterFieldLeave.error} />}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={leaveForm.control}
                name="academicYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tahun Akademik</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value)
                        academicYearFieldLeave.handleChange({ target: { value } } as any)
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih tahun akademik" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {["2023/2024", "2024/2025", "2025/2026"].map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {academicYearFieldLeave.isInvalid && <FormFieldError message={academicYearFieldLeave.error} />}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={leaveForm.control}
              name="leaveType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jenis Cuti</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value)
                      leaveTypeFieldLeave.handleChange({ target: { value } } as any)
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih jenis cuti" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="academic">Cuti Akademik</SelectItem>
                      <SelectItem value="medical">Cuti Sakit</SelectItem>
                      <SelectItem value="personal">Cuti Pribadi</SelectItem>
                      <SelectItem value="maternity">Cuti Melahirkan</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Jenis cuti akan menentukan persyaratan dokumen yang diperlukan</FormDescription>
                  {leaveTypeFieldLeave.isInvalid && <FormFieldError message={leaveTypeFieldLeave.error} />}
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={leaveForm.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Tanggal Mulai Cuti</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                          >
                            {field.value ? format(field.value, "PPP", { locale: id }) : <span>Pilih tanggal</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={leaveForm.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Tanggal Selesai Cuti</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                          >
                            {field.value ? format(field.value, "PPP", { locale: id }) : <span>Pilih tanggal</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={leaveForm.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alasan Cuti</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Jelaskan alasan pengajuan cuti Anda secara detail"
                      {...field}
                      className="min-h-[120px]"
                      onChange={(e) => {
                        field.onChange(e)
                        reasonFieldLeave.handleChange(e)
                      }}
                      onBlur={(e) => {
                        field.onBlur()
                        reasonFieldLeave.handleBlur(e)
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Berikan penjelasan yang jelas dan detail mengenai alasan pengajuan cuti Anda
                  </FormDescription>
                  {reasonFieldLeave.isInvalid && <FormFieldError message={reasonFieldLeave.error} />}
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormLabel>Dokumen Pendukung</FormLabel>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-primary/20 bg-primary/5 px-6 py-8 transition-colors hover:bg-primary/10">
                <div className="text-center">
                  <Upload className="mx-auto h-10 w-10 text-primary/30" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="leave-file-upload"
                      className="relative cursor-pointer rounded-md bg-transparent font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary/80"
                    >
                      <span>Unggah file</span>
                      <input id="leave-file-upload" name="leave-file-upload" type="file" className="sr-only" multiple />
                    </label>
                    <p className="pl-1">atau drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PDF, JPG, PNG hingga 5MB</p>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></span>
                  Memproses...
                </>
              ) : (
                "Lanjutkan"
              )}
            </Button>
          </form>
        </Form>
      </TabsContent>

      <TabsContent value="payment" className="mt-0">
        <Form {...paymentForm}>
          <form onSubmit={paymentForm.handleSubmit(handlePaymentSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={paymentForm.control}
                name="semester"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Semester</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value)
                        semesterFieldPayment.handleChange({ target: { value } } as any)
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih semester" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((semester) => (
                          <SelectItem key={semester} value={semester.toString()}>
                            Semester {semester}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {semesterFieldPayment.isInvalid && <FormFieldError message={semesterFieldPayment.error} />}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={paymentForm.control}
                name="academicYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tahun Akademik</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value)
                        academicYearFieldPayment.handleChange({ target: { value } } as any)
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih tahun akademik" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {["2023/2024", "2024/2025", "2025/2026"].map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {academicYearFieldPayment.isInvalid && <FormFieldError message={academicYearFieldPayment.error} />}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={paymentForm.control}
              name="paymentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jenis Pembayaran</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value)
                      paymentTypeFieldPayment.handleChange({ target: { value } } as any)
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih jenis pembayaran" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="tuition">SPP</SelectItem>
                      <SelectItem value="registration">Registrasi</SelectItem>
                      <SelectItem value="lab">Praktikum</SelectItem>
                      <SelectItem value="other">Lainnya</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Pilih jenis pembayaran yang telah Anda lakukan</FormDescription>
                  {paymentTypeFieldPayment.isInvalid && <FormFieldError message={paymentTypeFieldPayment.error} />}
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={paymentForm.control}
                name="paymentDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Tanggal Pembayaran</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                          >
                            {field.value ? format(field.value, "PPP", { locale: id }) : <span>Pilih tanggal</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={paymentForm.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jumlah Pembayaran</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Contoh: 5.000.000"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e)
                          amountFieldPayment.handleChange(e)
                        }}
                        onBlur={(e) => {
                          field.onBlur()
                          amountFieldPayment.handleBlur(e)
                        }}
                      />
                    </FormControl>
                    {amountFieldPayment.isInvalid && <FormFieldError message={amountFieldPayment.error} />}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={paymentForm.control}
              name="purpose"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tujuan Penggunaan Surat</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Contoh: Untuk keperluan beasiswa, laporan keuangan, dll."
                      {...field}
                      className="min-h-[100px]"
                      onChange={(e) => {
                        field.onChange(e)
                        purposeFieldPayment.handleChange(e)
                      }}
                      onBlur={(e) => {
                        field.onBlur()
                        purposeFieldPayment.handleBlur(e)
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Jelaskan secara singkat tujuan penggunaan surat keterangan pembayaran ini
                  </FormDescription>
                  {purposeFieldPayment.isInvalid && <FormFieldError message={purposeFieldPayment.error} />}
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormLabel>Bukti Pembayaran</FormLabel>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-primary/20 bg-primary/5 px-6 py-8 transition-colors hover:bg-primary/10">
                <div className="text-center">
                  <Upload className="mx-auto h-10 w-10 text-primary/30" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="payment-file-upload"
                      className="relative cursor-pointer rounded-md bg-transparent font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary/80"
                    >
                      <span>Unggah file</span>
                      <input id="payment-file-upload" name="payment-file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">atau drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PDF, JPG, PNG hingga 5MB</p>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></span>
                  Memproses...
                </>
              ) : (
                "Lanjutkan"
              )}
            </Button>
          </form>
        </Form>
      </TabsContent>

      <TabsContent value="custom" className="mt-0">
        <Form {...customForm}>
          <form onSubmit={customForm.handleSubmit(handleCustomSubmit)} className="space-y-6">
            <FormField
              control={customForm.control}
              name="letterType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jenis Surat</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value)
                      letterTypeFieldCustom.handleChange({ target: { value } } as any)
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih jenis surat" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="recommendation">Surat Rekomendasi</SelectItem>
                      <SelectItem value="introduction">Surat Pengantar</SelectItem>
                      <SelectItem value="request">Surat Permohonan</SelectItem>
                      <SelectItem value="statement">Surat Keterangan</SelectItem>
                      <SelectItem value="other">Lainnya</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Pilih jenis surat yang ingin Anda buat</FormDescription>
                  {letterTypeFieldCustom.isInvalid && <FormFieldError message={letterTypeFieldCustom.error} />}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={customForm.control}
              name="letterTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Judul Surat</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Contoh: Permohonan Magang di PT XYZ"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e)
                        titleFieldCustom.handleChange(e)
                      }}
                      onBlur={(e) => {
                        field.onBlur()
                        titleFieldCustom.handleBlur(e)
                      }}
                    />
                  </FormControl>
                  <FormDescription>Berikan judul yang jelas dan singkat untuk surat Anda</FormDescription>
                  {titleFieldCustom.isInvalid && <FormFieldError message={titleFieldCustom.error} />}
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={customForm.control}
                name="recipient"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Penerima Surat</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nama/Jabatan penerima surat"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e)
                          recipientFieldCustom.handleChange(e)
                        }}
                        onBlur={(e) => {
                          field.onBlur()
                          recipientFieldCustom.handleBlur(e)
                        }}
                      />
                    </FormControl>
                    {recipientFieldCustom.isInvalid && <FormFieldError message={recipientFieldCustom.error} />}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={customForm.control}
                name="recipientAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alamat Penerima</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Alamat lengkap penerima surat"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e)
                          addressFieldCustom.handleChange(e)
                        }}
                        onBlur={(e) => {
                          field.onBlur()
                          addressFieldCustom.handleBlur(e)
                        }}
                      />
                    </FormControl>
                    {addressFieldCustom.isInvalid && <FormFieldError message={addressFieldCustom.error} />}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={customForm.control}
              name="letterPurpose"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tujuan Surat</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Jelaskan tujuan pembuatan surat ini"
                      {...field}
                      className="min-h-[80px]"
                      onChange={(e) => {
                        field.onChange(e)
                        purposeFieldCustom.handleChange(e)
                      }}
                      onBlur={(e) => {
                        field.onBlur()
                        purposeFieldCustom.handleBlur(e)
                      }}
                    />
                  </FormControl>
                  {purposeFieldCustom.isInvalid && <FormFieldError message={purposeFieldCustom.error} />}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={customForm.control}
              name="letterContent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Isi Surat</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tuliskan isi surat secara lengkap"
                      {...field}
                      className="min-h-[150px]"
                      onChange={(e) => {
                        field.onChange(e)
                        contentFieldCustom.handleChange(e)
                      }}
                      onBlur={(e) => {
                        field.onBlur()
                        contentFieldCustom.handleBlur(e)
                      }}
                    />
                  </FormControl>
                  <FormDescription>Tuliskan isi surat secara detail dan jelas</FormDescription>
                  {contentFieldCustom.isInvalid && <FormFieldError message={contentFieldCustom.error} />}
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormLabel>Dokumen Pendukung (Opsional)</FormLabel>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-primary/20 bg-primary/5 px-6 py-8 transition-colors hover:bg-primary/10">
                <div className="text-center">
                  <Upload className="mx-auto h-10 w-10 text-primary/30" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="custom-file-upload"
                      className="relative cursor-pointer rounded-md bg-transparent font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary/80"
                    >
                      <span>Unggah file</span>
                      <input id="custom-file-upload" name="custom-file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">atau drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PDF, JPG, PNG hingga 5MB</p>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></span>
                  Memproses...
                </>
              ) : (
                "Lanjutkan"
              )}
            </Button>
          </form>
        </Form>
      </TabsContent>
    </Tabs>
  )
}

