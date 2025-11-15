"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { FileText, CalendarIcon, CreditCard, FileCheck, Upload, Loader2, AlertCircle, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import useFormField from "@/hooks/use-form-field"
import { FormFieldError } from "@/components/ui/form-field-error"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import type { DynamicField, LetterType as LetterTypeImport } from "@/types/correspondence"
import { useAuth } from "@/context/auth-context"

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
  startDate: z.date(),
  endDate: z.date(),
  reason: z.string().min(10, { message: "Alasan cuti harus diisi minimal 10 karakter" }),
  semester: z.string().min(1, { message: "Pilih semester" }),
  academicYear: z.string().min(1, { message: "Pilih tahun akademik" }),
})

const paymentLetterSchema = z.object({
  paymentType: z.string().min(1, { message: "Pilih jenis pembayaran" }),
  paymentDate: z.date(),
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
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState(defaultTab)
  const [isParentCivilServant, setIsParentCivilServant] = useState<"yes" | "no">("no")
  const [customLetterTypes, setCustomLetterTypes] = useState<LetterTypeImport[]>([])
  const [isLoadingTypes, setIsLoadingTypes] = useState(false)
  const [selectedDynamicType, setSelectedDynamicType] = useState<LetterTypeImport | null>(null)
  const [dynamicFormData, setDynamicFormData] = useState<Record<string, any>>({})
  const [userProdiId, setUserProdiId] = useState<string | undefined>(undefined)
  const [uploadedFileActive, setUploadedFileActive] = useState<any>(null)
  const [uploadedFileLeave, setUploadedFileLeave] = useState<any>(null)
  const [uploadedFilePayment, setUploadedFilePayment] = useState<any>(null)

  // Fetch user's prodi_id
  useEffect(() => {
    async function fetchUserProdi() {
      if (!user?.id) return

      try {
        const response = await fetch('/api/users/profile')
        if (response.ok) {
          const userData = await response.json()
          setUserProdiId(userData.students?.prodi_id)
        }
      } catch (error) {
        console.error('Error fetching user prodi:', error)
      }
    }

    fetchUserProdi()
  }, [user?.id])

  // Fetch custom letter types from server action when custom tab is active
  useEffect(() => {
    const fetchLetterTypes = async () => {
      try {
        setIsLoadingTypes(true)
        // Import getLetterTypes from server action
        const { getLetterTypes } = await import('@/app/actions/correspondence-actions')
        const types = await getLetterTypes(userProdiId)
        setCustomLetterTypes(types)
      } catch (error) {
        console.error('Error fetching letter types:', error)
        toast({
          title: "Error",
          description: "Gagal memuat jenis surat",
          variant: "destructive"
        })
      } finally {
        setIsLoadingTypes(false)
      }
    }

    if (activeTab === "custom" && customLetterTypes.length === 0) {
      fetchLetterTypes()
    }
  }, [activeTab, customLetterTypes.length, userProdiId])

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
    console.log("Active form submitted:", data)
    const submitData: any = {
      type: "active",
      title: "Surat Keterangan Aktif Kuliah",
      ...data,
    }
    if (uploadedFileActive) {
      submitData.skDocument = uploadedFileActive
    }
    onSubmit(submitData)
  }

  const handleLeaveSubmit = (data: z.infer<typeof leaveLetterSchema>) => {
    console.log("Leave form submitted:", data)
    const submitData: any = {
      type: "leave",
      title: "Surat Permohonan Cuti",
      ...data,
    }
    if (uploadedFileLeave) {
      submitData.supportingDocument = uploadedFileLeave
    }
    onSubmit(submitData)
  }

  const handlePaymentSubmit = (data: z.infer<typeof paymentLetterSchema>) => {
    console.log("Payment form submitted:", data)
    const submitData: any = {
      type: "payment",
      title: "Surat Keterangan Pembayaran",
      ...data,
    }
    if (uploadedFilePayment) {
      submitData.paymentProof = uploadedFilePayment
    }
    onSubmit(submitData)
  }

  const handleCustomSubmit = (data: z.infer<typeof customLetterSchema>) => {
    onSubmit({
      type: "custom",
      ...data,
    })
  }

  // Handle dynamic letter type submission
  const handleDynamicSubmit = () => {
    if (!selectedDynamicType) {
      toast({
        title: "Error",
        description: "Pilih jenis surat terlebih dahulu",
        variant: "destructive"
      })
      return
    }

    if (!validateDynamicForm()) return

    onSubmit({
      type: "dynamic",
      letter_type_id: selectedDynamicType.id,
      title: selectedDynamicType.title,
      form_data: dynamicFormData,
    })
  }

  // Handle parent civil servant change
  const handleParentCivilServantChange = (value: "yes" | "no") => {
    setIsParentCivilServant(value)
    activeForm.setValue("isParentCivilServant", value)
  }

  // Dynamic form handlers
  const handleDynamicFieldChange = (fieldId: string, value: any) => {
    setDynamicFormData(prev => ({
      ...prev,
      [fieldId]: value
    }))
  }

  const validateDynamicForm = (): boolean => {
    if (!selectedDynamicType?.additionalFields) return true

    for (const field of selectedDynamicType.additionalFields) {
      const fieldAny = field as any
      const fieldId = fieldAny.id || fieldAny.name

      if (field.required && !dynamicFormData[fieldId]) {
        toast({
          title: "Validasi Gagal",
          description: `Field "${field.label}" wajib diisi`,
          variant: "destructive"
        })
        return false
      }

      if (dynamicFormData[fieldId]) {
        const value = dynamicFormData[fieldId]

        if (field.type === "number") {
          const numValue = parseFloat(value)
          if (fieldAny.validation?.min !== undefined && numValue < fieldAny.validation.min) {
            toast({
              title: "Validasi Gagal",
              description: `${field.label} harus minimal ${fieldAny.validation.min}`,
              variant: "destructive"
            })
            return false
          }
          if (fieldAny.validation?.max !== undefined && numValue > fieldAny.validation.max) {
            toast({
              title: "Validasi Gagal",
              description: `${field.label} harus maksimal ${fieldAny.validation.max}`,
              variant: "destructive"
            })
            return false
          }
        }

        if (fieldAny.type === "email") {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!emailRegex.test(value)) {
            toast({
              title: "Validasi Gagal",
              description: `${field.label} harus berupa email yang valid`,
              variant: "destructive"
            })
            return false
          }
        }

        if (fieldAny.type === "phone") {
          const phoneRegex = /^[0-9+\-\s()]+$/
          if (!phoneRegex.test(value)) {
            toast({
              title: "Validasi Gagal",
              description: `${field.label} harus berupa nomor telepon yang valid`,
              variant: "destructive"
            })
            return false
          }
        }
      }
    }

    return true
  }

  const renderDynamicField = (field: DynamicField) => {
    const value = dynamicFormData[field.id] || ""

    switch (field.type) {
      case "text":
      case "email":
      case "phone":
        return (
          <Input
            type={field.type}
            value={value}
            onChange={(e) => handleDynamicFieldChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
          />
        )

      case "number":
        return (
          <Input
            type="number"
            value={value}
            onChange={(e) => handleDynamicFieldChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            min={field.validation?.min}
            max={field.validation?.max}
            required={field.required}
          />
        )

      case "date":
        return (
          <Input
            type="date"
            value={value}
            onChange={(e) => handleDynamicFieldChange(field.id, e.target.value)}
            required={field.required}
          />
        )

      case "textarea":
        return (
          <Textarea
            value={value}
            onChange={(e) => handleDynamicFieldChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            rows={4}
            required={field.required}
          />
        )

      case "select":
        return (
          <Select
            value={value}
            onValueChange={(val) => handleDynamicFieldChange(field.id, val)}
          >
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder || "Pilih..."} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )

      case "file":
        return (
          <div className="space-y-2">
            <Input
              type="file"
              onChange={async (e) => {
                const file = e.target.files?.[0]
                if (file) {
                  if (field.validation?.fileTypes?.length) {
                    const fileExt = file.name.split('.').pop()?.toLowerCase()
                    if (!field.validation.fileTypes.includes(fileExt || "")) {
                      toast({
                        title: "File Tidak Valid",
                        description: `Hanya file ${field.validation.fileTypes.join(", ")} yang diizinkan`,
                        variant: "destructive"
                      })
                      e.target.value = ''
                      return
                    }
                  }

                  if (field.validation?.maxFileSize) {
                    const maxSize = field.validation.maxFileSize * 1024 * 1024
                    if (file.size > maxSize) {
                      toast({
                        title: "File Terlalu Besar",
                        description: `Ukuran file maksimal ${field.validation.maxFileSize} MB`,
                        variant: "destructive"
                      })
                      e.target.value = ''
                      return
                    }
                  }

                  // Convert file to base64 for JSON serialization
                  try {
                    const reader = new FileReader()
                    reader.onloadend = () => {
                      const base64String = reader.result as string
                      handleDynamicFieldChange(field.id, {
                        name: file.name,
                        type: file.type,
                        size: file.size,
                        data: base64String
                      })
                    }
                    reader.onerror = () => {
                      toast({
                        title: "Error",
                        description: "Gagal membaca file",
                        variant: "destructive"
                      })
                    }
                    reader.readAsDataURL(file)
                  } catch (error) {
                    toast({
                      title: "Error",
                      description: "Gagal memproses file",
                      variant: "destructive"
                    })
                  }
                }
              }}
              required={field.required}
            />
            {dynamicFormData[field.id] && (
              <p className="text-xs text-green-600">
                ✓ {dynamicFormData[field.id].name} ({(dynamicFormData[field.id].size / 1024).toFixed(2)} KB)
              </p>
            )}
            {field.validation?.fileTypes && (
              <p className="text-xs text-muted-foreground">
                Format: {field.validation.fileTypes.join(", ")}
                {field.validation?.maxFileSize && ` • Maks: ${field.validation.maxFileSize} MB`}
              </p>
            )}
          </div>
        )

      default:
        return null
    }
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
          <FileText className="w-4 h-4" />
          <span className="hidden sm:inline">Surat Aktif</span>
        </TabsTrigger>
        <TabsTrigger value="leave" className="flex items-center gap-2">
          <CalendarIcon className="w-4 h-4" />
          <span className="hidden sm:inline">Surat Cuti</span>
        </TabsTrigger>
        <TabsTrigger value="payment" className="flex items-center gap-2">
          <CreditCard className="w-4 h-4" />
          <span className="hidden sm:inline">Surat Pembayaran</span>
        </TabsTrigger>
        <TabsTrigger value="custom" className="flex items-center gap-2">
          <FileCheck className="w-4 h-4" />
          <span className="hidden sm:inline">Surat Lainnya</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="active" className="mt-0">
        <Form {...activeForm}>
          <form
            onSubmit={activeForm.handleSubmit(
              handleActiveSubmit,
              (errors) => {
                console.log("Form validation errors:", errors)
                const firstError = Object.values(errors)[0]
                if (firstError) {
                  toast({
                    title: "Validasi Gagal",
                    description: firstError.message || "Mohon lengkapi semua field yang diperlukan",
                    variant: "destructive"
                  })
                }
              }
            )}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                          className="w-4 h-4 border-gray-300 text-primary focus:ring-primary"
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
                          className="w-4 h-4 border-gray-300 text-primary focus:ring-primary"
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
              <div className="p-4 space-y-6 border rounded-lg bg-muted/30">
                <h3 className="text-sm font-medium">Informasi PNS/ASN Orang Tua</h3>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                  <div className="flex justify-center px-6 py-8 mt-2 transition-colors border border-dashed rounded-lg border-primary/20 bg-primary/5 hover:bg-primary/10">
                    <div className="w-full text-center">
                      <Upload className="w-10 h-10 mx-auto text-primary/30" />
                      <div className="flex justify-center mt-4 text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative font-semibold bg-transparent rounded-md cursor-pointer text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary/80"
                        >
                          <span>Unggah file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={async (e) => {
                              const file = e.target.files?.[0]
                              if (file) {
                                const maxSize = 5 * 1024 * 1024
                                if (file.size > maxSize) {
                                  toast({
                                    title: "File Terlalu Besar",
                                    description: "Ukuran file maksimal 5 MB",
                                    variant: "destructive"
                                  })
                                  e.target.value = ''
                                  return
                                }

                                try {
                                  const reader = new FileReader()
                                  reader.onloadend = () => {
                                    const base64String = reader.result as string
                                    setUploadedFileActive({
                                      name: file.name,
                                      type: file.type,
                                      size: file.size,
                                      data: base64String
                                    })
                                  }
                                  reader.onerror = () => {
                                    toast({
                                      title: "Error",
                                      description: "Gagal membaca file",
                                      variant: "destructive"
                                    })
                                  }
                                  reader.readAsDataURL(file)
                                } catch (error) {
                                  toast({
                                    title: "Error",
                                    description: "Gagal memproses file",
                                    variant: "destructive"
                                  })
                                }
                              }
                            }}
                          />
                        </label>
                        <p className="pl-1">atau drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">PDF, JPG, PNG hingga 5MB</p>
                      {uploadedFileActive && (
                        <div className="mt-4 space-y-3">
                          <p className="text-xs font-medium text-green-600">
                            ✓ {uploadedFileActive.name} ({(uploadedFileActive.size / 1024).toFixed(2)} KB)
                          </p>
                          {uploadedFileActive.type?.includes('image') && (
                            <div className="mt-2">
                              <img
                                src={uploadedFileActive.data}
                                alt={uploadedFileActive.name}
                                className="max-w-full mx-auto border rounded max-h-32"
                              />
                            </div>
                          )}
                          {uploadedFileActive.type === 'application/pdf' && (
                            <div className="mt-2">
                              <p className="mb-2 text-xs font-medium">Preview PDF:</p>
                              <embed
                                src={uploadedFileActive.data}
                                type="application/pdf"
                                className="w-full border rounded"
                                style={{ height: '400px' }}
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 mr-2 border-2 rounded-full animate-spin border-primary border-t-transparent"></span>
                  Mengirim...
                </>
              ) : (
                "Ajukan Surat"
              )}
            </Button>
          </form>
        </Form>
      </TabsContent>

      <TabsContent value="leave" className="mt-0">
        <Form {...leaveForm}>
          <form
            onSubmit={leaveForm.handleSubmit(
              handleLeaveSubmit,
              (errors) => {
                console.log("Form validation errors:", errors)
                const firstError = Object.values(errors)[0]
                if (firstError) {
                  toast({
                    title: "Validasi Gagal",
                    description: firstError.message || "Mohon lengkapi semua field yang diperlukan",
                    variant: "destructive"
                  })
                }
              }
            )}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                            <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
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
                            <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
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
              <div className="flex justify-center px-6 py-8 mt-2 transition-colors border border-dashed rounded-lg border-primary/20 bg-primary/5 hover:bg-primary/10">
                <div className="w-full text-center">
                  <Upload className="w-10 h-10 mx-auto text-primary/30" />
                  <div className="flex justify-center mt-4 text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="leave-file-upload"
                      className="relative font-semibold bg-transparent rounded-md cursor-pointer text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary/80"
                    >
                      <span>Unggah file</span>
                      <input
                        id="leave-file-upload"
                        name="leave-file-upload"
                        type="file"
                        className="sr-only"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={async (e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            const maxSize = 5 * 1024 * 1024
                            if (file.size > maxSize) {
                              toast({
                                title: "File Terlalu Besar",
                                description: "Ukuran file maksimal 5 MB",
                                variant: "destructive"
                              })
                              e.target.value = ''
                              return
                            }

                            try {
                              const reader = new FileReader()
                              reader.onloadend = () => {
                                const base64String = reader.result as string
                                setUploadedFileLeave({
                                  name: file.name,
                                  type: file.type,
                                  size: file.size,
                                  data: base64String
                                })
                              }
                              reader.onerror = () => {
                                toast({
                                title: "Error",
                                  description: "Gagal membaca file",
                                  variant: "destructive"
                                })
                              }
                              reader.readAsDataURL(file)
                            } catch (error) {
                              toast({
                                title: "Error",
                                description: "Gagal memproses file",
                                variant: "destructive"
                              })
                            }
                          }
                        }}
                      />
                    </label>
                    <p className="pl-1">atau drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PDF, JPG, PNG hingga 5MB</p>
                  {uploadedFileLeave && (
                    <div className="mt-4 space-y-3">
                      <p className="text-xs font-medium text-green-600">
                        ✓ {uploadedFileLeave.name} ({(uploadedFileLeave.size / 1024).toFixed(2)} KB)
                      </p>
                      {uploadedFileLeave.type?.includes('image') && (
                        <div className="mt-2">
                          <img
                            src={uploadedFileLeave.data}
                            alt={uploadedFileLeave.name}
                            className="max-w-full mx-auto border rounded max-h-32"
                          />
                        </div>
                      )}
                      {uploadedFileLeave.type === 'application/pdf' && (
                        <div className="mt-2">
                          <p className="mb-2 text-xs font-medium">Preview PDF:</p>
                          <embed
                            src={uploadedFileLeave.data}
                            type="application/pdf"
                            className="w-full border rounded"
                            style={{ height: '400px' }}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 mr-2 border-2 rounded-full animate-spin border-primary border-t-transparent"></span>
                  Mengirim...
                </>
              ) : (
                "Ajukan Surat"
              )}
            </Button>
          </form>
        </Form>
      </TabsContent>

      <TabsContent value="payment" className="mt-0">
        <Form {...paymentForm}>
          <form
            onSubmit={paymentForm.handleSubmit(
              handlePaymentSubmit,
              (errors) => {
                console.log("Form validation errors:", errors)
                const firstError = Object.values(errors)[0]
                if (firstError) {
                  toast({
                    title: "Validasi Gagal",
                    description: firstError.message || "Mohon lengkapi semua field yang diperlukan",
                    variant: "destructive"
                  })
                }
              }
            )}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                            <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
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
              <div className="flex justify-center px-6 py-8 mt-2 transition-colors border border-dashed rounded-lg border-primary/20 bg-primary/5 hover:bg-primary/10">
                <div className="w-full text-center">
                  <Upload className="w-10 h-10 mx-auto text-primary/30" />
                  <div className="flex justify-center mt-4 text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="payment-file-upload"
                      className="relative font-semibold bg-transparent rounded-md cursor-pointer text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary/80"
                    >
                      <span>Unggah file</span>
                      <input
                        id="payment-file-upload"
                        name="payment-file-upload"
                        type="file"
                        className="sr-only"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={async (e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            const maxSize = 5 * 1024 * 1024
                            if (file.size > maxSize) {
                              toast({
                                title: "File Terlalu Besar",
                                description: "Ukuran file maksimal 5 MB",
                                variant: "destructive"
                              })
                              e.target.value = ''
                              return
                            }

                            try {
                              const reader = new FileReader()
                              reader.onloadend = () => {
                                const base64String = reader.result as string
                                setUploadedFilePayment({
                                  name: file.name,
                                  type: file.type,
                                  size: file.size,
                                  data: base64String
                                })
                              }
                              reader.onerror = () => {
                                toast({
                                  title: "Error",
                                  description: "Gagal membaca file",
                                  variant: "destructive"
                                })
                              }
                              reader.readAsDataURL(file)
                            } catch (error) {
                              toast({
                                title: "Error",
                                description: "Gagal memproses file",
                                variant: "destructive"
                              })
                            }
                          }
                        }}
                      />
                    </label>
                    <p className="pl-1">atau drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PDF, JPG, PNG hingga 5MB</p>
                  {uploadedFilePayment && (
                    <div className="mt-4 space-y-3">
                      <p className="text-xs font-medium text-green-600">
                        ✓ {uploadedFilePayment.name} ({(uploadedFilePayment.size / 1024).toFixed(2)} KB)
                      </p>
                      {uploadedFilePayment.type?.includes('image') && (
                        <div className="mt-2">
                          <img
                            src={uploadedFilePayment.data}
                            alt={uploadedFilePayment.name}
                            className="max-w-full mx-auto border rounded max-h-32"
                          />
                        </div>
                      )}
                      {uploadedFilePayment.type === 'application/pdf' && (
                        <div className="mt-2">
                          <p className="mb-2 text-xs font-medium">Preview PDF:</p>
                          <embed
                            src={uploadedFilePayment.data}
                            type="application/pdf"
                            className="w-full border rounded"
                            style={{ height: '400px' }}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 mr-2 border-2 rounded-full animate-spin border-primary border-t-transparent"></span>
                  Mengirim...
                </>
              ) : (
                "Ajukan Surat"
              )}
            </Button>
          </form>
        </Form>
      </TabsContent>

      <TabsContent value="custom" className="mt-0">
        {isLoadingTypes ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : selectedDynamicType ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">{selectedDynamicType.title}</h3>
                <p className="text-sm text-muted-foreground">{selectedDynamicType.description}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => {
                setSelectedDynamicType(null)
                setDynamicFormData({})
              }}>
                Kembali
              </Button>
            </div>

            {selectedDynamicType.requiredDocuments && selectedDynamicType.requiredDocuments.length > 0 && (
              <div className="p-4 border rounded-lg bg-muted/50">
                <p className="mb-2 text-sm font-medium">Dokumen yang diperlukan:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedDynamicType.requiredDocuments.map((doc: string, idx: number) => (
                    <Badge key={idx} variant="secondary">
                      {doc}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {selectedDynamicType.additionalFields && selectedDynamicType.additionalFields.length > 0 && (
              <div className="space-y-4">
                {selectedDynamicType.additionalFields.map((field: any) => (
                  <div key={field.id} className="space-y-2">
                    <Label>
                      {field.label}
                      {field.required && <span className="ml-1 text-red-500">*</span>}
                    </Label>
                    {renderDynamicField(field)}
                    {field.helpText && (
                      <p className="text-xs text-muted-foreground">{field.helpText}</p>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-end">
              <Button onClick={handleDynamicSubmit} disabled={isSubmitting} className="w-full">
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Mengirim...
                  </>
                ) : (
                  "Ajukan Surat"
                )}
              </Button>
            </div>
          </div>
        ) : customLetterTypes.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="py-12 text-center">
              <AlertCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Belum ada jenis surat lainnya tersedia</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Hubungi admin untuk menambahkan jenis surat baru
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Pilih jenis surat yang ingin Anda ajukan:</p>
            <div className="grid gap-4 md:grid-cols-2">
              {customLetterTypes.map((type) => (
                <Card
                  key={type.id}
                  className="transition-shadow cursor-pointer hover:shadow-md"
                  onClick={() => setSelectedDynamicType(type)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <FileText className="w-8 h-8 text-primary" />
                      <Badge variant="outline" className="ml-2">
                        <Clock className="w-3 h-3 mr-1" />
                        {type.estimatedDays} hari
                      </Badge>
                    </div>
                    <CardTitle className="mt-4">{type.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {type.description}
                    </CardDescription>
                  </CardHeader>
                  {type.requiredDocuments && type.requiredDocuments.length > 0 && (
                    <CardContent>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Dokumen diperlukan:</p>
                        <div className="flex flex-wrap gap-1">
                          {type.requiredDocuments.slice(0, 3).map((doc: string, idx: number) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {doc}
                            </Badge>
                          ))}
                          {type.requiredDocuments.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{type.requiredDocuments.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </div>
        )}
      </TabsContent>
    </Tabs>
  )
}

