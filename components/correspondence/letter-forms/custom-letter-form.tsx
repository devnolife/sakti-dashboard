"use client"

import type React from "react"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Upload } from "lucide-react"

// Create a schema for the form
const formSchema = z.object({
  letterTitle: z.string().min(5, { message: "Judul surat harus diisi minimal 5 karakter" }),
  recipient: z.string().min(3, { message: "Penerima surat harus diisi minimal 3 karakter" }),
  recipientAddress: z.string().min(5, { message: "Alamat penerima harus diisi minimal 5 karakter" }),
  letterPurpose: z.string().min(10, { message: "Tujuan surat harus diisi minimal 10 karakter" }),
  letterContent: z.string().min(20, { message: "Isi surat harus diisi minimal 20 karakter" }),
  letterType: z.string().min(1, { message: "Pilih jenis surat" }),
  attachment: z.any().optional(),
})

interface CustomLetterFormProps {
  onSubmit: (data: any) => void
  isSubmitting?: boolean
}

export function CustomLetterForm({ onSubmit, isSubmitting = false }: CustomLetterFormProps) {
  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      letterTitle: "",
      recipient: "",
      recipientAddress: "",
      letterPurpose: "",
      letterContent: "",
      letterType: "",
      attachment: null,
    },
  })

  // Handle form submission
  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    onSubmit({
      type: "custom",
      ...data,
    })
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    form.setValue("attachment", file)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="letterType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jenis Surat</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="letterTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Judul Surat</FormLabel>
              <FormControl>
                <Input placeholder="Contoh: Permohonan Magang di PT XYZ" {...field} />
              </FormControl>
              <FormDescription>Berikan judul yang jelas dan singkat untuk surat Anda</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="recipient"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Penerima Surat</FormLabel>
                <FormControl>
                  <Input placeholder="Nama/Jabatan penerima surat" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="recipientAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alamat Penerima</FormLabel>
                <FormControl>
                  <Input placeholder="Alamat lengkap penerima surat" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="letterPurpose"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tujuan Surat</FormLabel>
              <FormControl>
                <Textarea placeholder="Jelaskan tujuan pembuatan surat ini" {...field} className="min-h-[80px]" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="letterContent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Isi Surat</FormLabel>
              <FormControl>
                <Textarea placeholder="Tuliskan isi surat secara lengkap" {...field} className="min-h-[150px]" />
              </FormControl>
              <FormDescription>Tuliskan isi surat secara detail dan jelas</FormDescription>
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
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-transparent font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary/80"
                >
                  <span>Unggah file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    onChange={handleFileChange}
                    className="sr-only"
                  />
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
  )
}

