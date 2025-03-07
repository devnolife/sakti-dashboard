"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import { cn } from "@/lib/utils"

// Create a schema for the form
const formSchema = z.object({
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
  supportingDocuments: z.array(z.any()), // Added supportingDocuments field
})

interface LeaveLetterFormProps {
  onSubmit: (data: any) => void
  isSubmitting?: boolean
}

export function LeaveLetterForm({ onSubmit, isSubmitting = false }: LeaveLetterFormProps) {
  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      leaveType: "",
      reason: "",
      semester: "",
      academicYear: "",
      supportingDocuments: [], // Added default value for supportingDocuments
    },
  })

  // Handle form submission
  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    onSubmit({
      type: "leave",
      ...data,
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="semester"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Semester</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="academicYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tahun Akademik</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="leaveType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jenis Cuti</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
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
            control={form.control}
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
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alasan Cuti</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Jelaskan alasan pengajuan cuti Anda secara detail"
                  {...field}
                  className="min-h-[120px]"
                />
              </FormControl>
              <FormDescription>
                Berikan penjelasan yang jelas dan detail mengenai alasan pengajuan cuti Anda
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="supportingDocuments"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dokumen Pendukung</FormLabel>
              <FormControl>
                <input type="file" multiple onChange={(e) => field.onChange(Array.from(e.target.files))} />
              </FormControl>
              <FormDescription>
                Unggah dokumen pendukung sesuai dengan jenis cuti yang diajukan (surat keterangan dokter, dll.)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

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

