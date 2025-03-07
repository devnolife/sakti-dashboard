"use client"

import { useState } from "react"
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
  semester: z.string().min(1, { message: "Pilih semester" }),
  academicYear: z.string().min(1, { message: "Pilih tahun akademik" }),
  purpose: z.string().min(5, { message: "Tujuan harus diisi minimal 5 karakter" }),
  isParentCivilServant: z.enum(["yes", "no"]),
  parentInstitution: z.string().optional(),
  parentPosition: z.string().optional(),
  faculty: z.string().min(1, { message: "Pilih fakultas" }),
  major: z.string().min(1, { message: "Pilih jurusan" }),
  studentName: z.string().min(1, { message: "Nama mahasiswa harus diisi" }),
  studentId: z.string().min(1, { message: "NIM harus diisi" }),
})

interface ActiveCollegeFormProps {
  onSubmit: (data: any) => void
  isSubmitting?: boolean
  faculties?: { value: string; label: string }[]
  majors?: { value: string; label: string }[]
}

export function ActiveCollegeForm({ onSubmit, isSubmitting = false, faculties, majors }: ActiveCollegeFormProps) {
  const [isParentCivilServant, setIsParentCivilServant] = useState<"yes" | "no">("no")

  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      semester: "",
      academicYear: "",
      purpose: "",
      isParentCivilServant: "no",
      parentInstitution: "",
      parentPosition: "",
      faculty: "",
      major: "",
      studentName: "",
      studentId: "",
    },
  })

  // Handle form submission
  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    onSubmit({
      type: "active",
      ...data,
    })
  }

  // Handle parent civil servant change
  const handleParentCivilServantChange = (value: "yes" | "no") => {
    setIsParentCivilServant(value)
    form.setValue("isParentCivilServant", value)
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="faculty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fakultas</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih fakultas" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {faculties?.map((faculty) => (
                      <SelectItem key={faculty.value} value={faculty.value}>
                        {faculty.label}
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
            name="major"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jurusan</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih jurusan" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {majors?.map((major) => (
                      <SelectItem key={major.value} value={major.value}>
                        {major.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="studentName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Mahasiswa</FormLabel>
                <FormControl>
                  <Input placeholder="Nama Mahasiswa" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="studentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>NIM</FormLabel>
                <FormControl>
                  <Input placeholder="NIM" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="purpose"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tujuan Penggunaan Surat</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Contoh: Untuk keperluan beasiswa, pengajuan visa, dll."
                  {...field}
                  className="min-h-[100px]"
                />
              </FormControl>
              <FormDescription>
                Jelaskan secara singkat tujuan penggunaan surat keterangan aktif kuliah ini
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
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
                control={form.control}
                name="parentInstitution"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instansi</FormLabel>
                    <FormControl>
                      <Input placeholder="Nama instansi tempat bekerja" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="parentPosition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jabatan</FormLabel>
                    <FormControl>
                      <Input placeholder="Jabatan orang tua" {...field} />
                    </FormControl>
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
  )
}

