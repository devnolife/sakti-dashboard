"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Upload } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { id } from "date-fns/locale"

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
  supportingDocument: z.any().optional(),
  returnPlan: z.string().min(5, { message: "Rencana kembali harus diisi minimal 5 karakter" }),
})

interface LeaveFormProps {
  onSubmit: (data: Record<string, any>) => void
}

export function LeaveForm({ onSubmit }: LeaveFormProps) {
  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      leaveType: "",
      reason: "",
      returnPlan: "",
    },
  })

  // Handle form submission
  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    // Add student data (in a real app, this would come from the user's profile)
    const studentData = {
      name: "Ahmad Fauzi",
      nim: "1901234567",
      major: "Teknik Informatika",
      faculty: "Teknik",
      semester: "5",
    }

    onSubmit({
      ...data,
      ...studentData,
      letterDate: new Date().toISOString(),
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Surat Izin Cuti</h2>
        <p className="text-muted-foreground">Isi informasi berikut untuk membuat surat izin cuti</p>
      </div>

      <Separator />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
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
                    <SelectItem value="internship">Cuti Magang</SelectItem>
                    <SelectItem value="exchange">Cuti Pertukaran Pelajar</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Pilih jenis cuti yang sesuai dengan kebutuhan Anda</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-6 md:grid-cols-2">
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
                  <Textarea placeholder="Jelaskan alasan Anda mengajukan cuti" className="min-h-[120px]" {...field} />
                </FormControl>
                <FormDescription>Jelaskan secara detail alasan Anda mengajukan cuti</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="returnPlan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rencana Setelah Cuti</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Jelaskan rencana Anda setelah menyelesaikan masa cuti"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Jelaskan rencana Anda setelah menyelesaikan masa cuti</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="supportingDocument"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dokumen Pendukung</FormLabel>
                <FormControl>
                  <div className="flex justify-center rounded-lg border border-dashed border-primary/20 bg-primary/5 px-6 py-10 transition-colors hover:bg-primary/10">
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
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              if (file) {
                                field.onChange(file)
                              }
                            }}
                          />
                        </label>
                        <p className="pl-1">atau drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">PDF, JPG, PNG hingga 10MB</p>
                    </div>
                  </div>
                </FormControl>
                <FormDescription>
                  Unggah dokumen pendukung seperti surat keterangan dokter (untuk cuti sakit) atau dokumen lain yang
                  relevan
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button type="submit">Buat Surat</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

