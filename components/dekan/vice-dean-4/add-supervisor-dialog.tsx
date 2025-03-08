"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "@/components/ui/use-toast"

interface AddSupervisorDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Nama pembimbing harus minimal 2 karakter",
  }),
  nip: z.string().min(5, {
    message: "NIP harus minimal 5 karakter",
  }),
  department: z.string({
    required_error: "Pilih jurusan",
  }),
  specialization: z.string().min(2, {
    message: "Spesialisasi harus minimal 2 karakter",
  }),
  email: z.string().email({
    message: "Email harus valid",
  }),
  phone: z.string().min(5, {
    message: "Nomor telepon harus minimal 5 karakter",
  }),
  maxLoad: z.number().min(1, {
    message: "Beban maksimal minimal 1 tim",
  }),
})

export function AddSupervisorDialog({ open, onOpenChange }: AddSupervisorDialogProps) {
  const departments = [
    "Teknik Informatika",
    "Sistem Informasi",
    "Teknik Komputer",
    "Teknik Elektro",
    "Manajemen Informatika",
  ]

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      nip: "",
      department: "",
      specialization: "",
      email: "",
      phone: "",
      maxLoad: 5,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, you would save the supervisor to the database
    console.log(values)

    toast({
      title: "Pembimbing berhasil ditambahkan",
      description: `${values.name} telah ditambahkan sebagai pembimbing baru.`,
    })

    form.reset()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-gradient-to-br from-white to-primary-50/30">
        <DialogHeader>
          <DialogTitle className="text-primary-700">Tambah Pembimbing Baru</DialogTitle>
          <DialogDescription>Tambahkan pembimbing baru untuk program KKP Plus</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary-700">Nama Lengkap</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Dr. Budi Santoso, M.Kom"
                        {...field}
                        className="border-primary-200 focus-visible:ring-primary-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nip"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary-700">NIP</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="198501012010121001"
                        {...field}
                        className="border-primary-200 focus-visible:ring-primary-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="department"
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
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>
                            {dept}
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
                name="specialization"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Spesialisasi</FormLabel>
                    <FormControl>
                      <Input placeholder="Pengembangan Perangkat Lunak" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="budi@example.com" {...field} />
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
                    <FormLabel>Telepon</FormLabel>
                    <FormControl>
                      <Input placeholder="08123456789" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="maxLoad"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Beban Maksimal</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="5"
                        {...field}
                        onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>Jumlah maksimal tim yang dapat dibimbing</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Batal
              </Button>
              <Button type="submit">Simpan</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

