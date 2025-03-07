"use client"

import type React from "react"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, FileText, Upload, AlertCircle, CheckCircle, PlusCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import { LETTER_TYPES, submitLetterRequest } from "@/app/actions/correspondence-actions"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Create a schema for the form
const formSchema = z.object({
  letterType: z.string().min(1, { message: "Pilih jenis surat" }),
  purpose: z.string().min(5, { message: "Tujuan harus diisi minimal 5 karakter" }),
  additionalInfo: z.record(z.any()),
  files: z.array(z.any()),
})

export function LetterRequestForm() {
  const [selectedLetterType, setSelectedLetterType] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null)
  const [files, setFiles] = useState<File[]>([])

  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      letterType: "",
      purpose: "",
      additionalInfo: {},
      files: [],
    },
  })

  // Handle letter type change
  const handleLetterTypeChange = (value: string) => {
    setSelectedLetterType(value)
    form.setValue("letterType", value)
    form.setValue("additionalInfo", {})
  }

  // Get the selected letter type info
  const selectedTypeInfo = selectedLetterType ? LETTER_TYPES[selectedLetterType] : null

  // Handle form submission
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    setSubmitResult(null)

    try {
      // In a real app, we would create a FormData object and append all the form data
      const formData = new FormData()
      formData.append("letterType", data.letterType)
      formData.append("purpose", data.purpose)

      // Add additional info fields
      if (data.additionalInfo) {
        Object.entries(data.additionalInfo).forEach(([key, value]) => {
          if (value instanceof Date) {
            formData.append(`additionalInfo[${key}]`, value.toISOString())
          } else {
            formData.append(`additionalInfo[${key}]`, value?.toString() || "")
          }
        })
      }

      // Append files to FormData
      data.files.forEach((file) => {
        formData.append("files[]", file)
      })

      // Submit the form
      const result = await submitLetterRequest(formData)

      setSubmitResult({
        success: result.success,
        message: result.message,
      })

      if (result.success) {
        // Reset the form on success
        form.reset()
        setSelectedLetterType("")
        setFiles([])
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitResult({
        success: false,
        message: "Terjadi kesalahan saat mengirim permohonan. Silakan coba lagi.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files as FileList)
    setFiles(files)
    form.setValue("files", files)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files)
    setFiles(files)
    form.setValue("files", files)
  }

  return (
    <Card className="border-none shadow-md overflow-hidden">
      <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-primary/10 p-2">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle>Permohonan Surat Baru</CardTitle>
            <CardDescription>Isi formulir berikut untuk mengajukan permohonan surat</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {submitResult && (
              <Alert variant={submitResult.success ? "default" : "destructive"}>
                {submitResult.success ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                <AlertTitle>{submitResult.success ? "Berhasil" : "Gagal"}</AlertTitle>
                <AlertDescription>{submitResult.message}</AlertDescription>
              </Alert>
            )}

            <FormField
              control={form.control}
              name="letterType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jenis Surat</FormLabel>
                  <Select onValueChange={(value) => handleLetterTypeChange(value)} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih jenis surat" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(LETTER_TYPES).map(([key, info]) => (
                        <SelectItem key={key} value={key}>
                          {info.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    {selectedTypeInfo?.description || "Pilih jenis surat yang ingin diajukan"}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectedTypeInfo && (
              <>
                <FormField
                  control={form.control}
                  name="purpose"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tujuan Permohonan</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Jelaskan tujuan permohonan surat ini" {...field} />
                      </FormControl>
                      <FormDescription>Jelaskan secara singkat tujuan permohonan surat ini</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {selectedTypeInfo.additionalFields && selectedTypeInfo.additionalFields.length > 0 && (
                  <>
                    <Separator />
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Informasi Tambahan</h3>

                      {selectedTypeInfo.additionalFields.map((field) => (
                        <FormField
                          key={field.name}
                          control={form.control}
                          name={`additionalInfo.${field.name}` as any}
                          render={({ field: formField }) => (
                            <FormItem>
                              <FormLabel>{field.label}</FormLabel>
                              <FormControl>
                                {field.type === "text" && <Input placeholder={field.label} {...formField} />}
                                {field.type === "textarea" && <Textarea placeholder={field.label} {...formField} />}
                                {field.type === "select" && (
                                  <Select onValueChange={formField.onChange} defaultValue={formField.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder={`Pilih ${field.label}`} />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {field.options?.map((option) => (
                                        <SelectItem key={option} value={option}>
                                          {option}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                )}
                                {field.type === "date" && (
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <FormControl>
                                        <Button
                                          variant={"outline"}
                                          className={cn(
                                            "w-full pl-3 text-left font-normal",
                                            !formField.value && "text-muted-foreground",
                                          )}
                                        >
                                          {formField.value ? (
                                            format(new Date(formField.value), "PPP", { locale: id })
                                          ) : (
                                            <span>Pilih tanggal</span>
                                          )}
                                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                      </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                      <Calendar
                                        mode="single"
                                        selected={formField.value ? new Date(formField.value) : undefined}
                                        onSelect={formField.onChange}
                                        initialFocus
                                      />
                                    </PopoverContent>
                                  </Popover>
                                )}
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </>
                )}

                {selectedTypeInfo.requiredDocuments && selectedTypeInfo.requiredDocuments.length > 0 && (
                  <>
                    <Separator />
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Dokumen yang Diperlukan</h3>
                      <div className="space-y-2">
                        {selectedTypeInfo.requiredDocuments.map((doc, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <FileText className="h-4 w-4 mt-0.5 text-muted-foreground" />
                            <div>
                              <p className="text-sm">{doc}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4">
                        <FormLabel>Unggah Dokumen</FormLabel>
                        <div
                          className="mt-2 flex justify-center rounded-lg border border-dashed border-primary/20 bg-primary/5 px-6 py-10 transition-colors hover:bg-primary/10"
                          onDragOver={handleDragOver}
                          onDrop={handleDrop}
                        >
                          <div className="text-center">
                            <Upload className="mx-auto h-12 w-12 text-primary/30" />
                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer rounded-md bg-transparent font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary/80"
                              >
                                <span>Unggah file</span>
                                <input
                                  id="file-upload"
                                  name="file-upload"
                                  type="file"
                                  className="sr-only"
                                  multiple
                                  onChange={handleFileChange}
                                />
                              </label>
                              <p className="pl-1">atau drag and drop</p>
                            </div>
                            <p className="text-xs leading-5 text-gray-600">PDF, JPG, PNG hingga 10MB</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className="rounded-md bg-muted p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertCircle className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-foreground">Informasi Pemrosesan</h3>
                      <div className="mt-2 text-sm text-muted-foreground">
                        <p>
                          Permohonan surat ini akan diproses oleh{" "}
                          {selectedTypeInfo.approvalRole === "prodi"
                            ? "Kepala Program Studi"
                            : selectedTypeInfo.approvalRole === "staff_tu"
                              ? "Staff Tata Usaha"
                              : selectedTypeInfo.approvalRole === "dekan"
                                ? "Dekan"
                                : "Admin"}
                          .
                        </p>
                        <p className="mt-1">Estimasi waktu pemrosesan: {selectedTypeInfo.estimatedDays} hari kerja.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting || !selectedLetterType} className="rounded-full px-6">
                {isSubmitting ? (
                  <>
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></span>
                    Mengirim...
                  </>
                ) : (
                  <>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Ajukan Permohonan
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

