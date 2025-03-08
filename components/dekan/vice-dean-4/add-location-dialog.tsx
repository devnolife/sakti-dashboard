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
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "@/components/ui/use-toast"

interface AddLocationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Nama lokasi harus minimal 2 karakter",
  }),
  address: z.string().min(5, {
    message: "Alamat harus minimal 5 karakter",
  }),
  city: z.string().min(2, {
    message: "Kota harus minimal 2 karakter",
  }),
  province: z.string().min(2, {
    message: "Provinsi harus minimal 2 karakter",
  }),
  contactPerson: z.string().min(2, {
    message: "Nama kontak harus minimal 2 karakter",
  }),
  contactPhone: z.string().min(5, {
    message: "Nomor telepon harus minimal 5 karakter",
  }),
  contactEmail: z.string().email({
    message: "Email harus valid",
  }),
  capacity: z.number().min(1, {
    message: "Kapasitas minimal 1 mahasiswa",
  }),
  isActive: z.boolean(),
  description: z.string().min(10, {
    message: "Deskripsi harus minimal 10 karakter",
  }),
})

export function AddLocationDialog({ open, onOpenChange }: AddLocationDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
      city: "",
      province: "",
      contactPerson: "",
      contactPhone: "",
      contactEmail: "",
      capacity: 5,
      isActive: true,
      description: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, you would save the location to the database
    console.log(values)

    toast({
      title: "Lokasi berhasil ditambahkan",
      description: `${values.name} telah ditambahkan sebagai lokasi baru.`,
    })

    form.reset()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-gradient-to-br from-white to-accent-50/30">
        <DialogHeader>
          <DialogTitle className="text-accent-foreground">Tambah Lokasi Baru</DialogTitle>
          <DialogDescription>Tambahkan lokasi baru untuk program KKP Plus</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-accent-foreground">Nama Lokasi</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="PT Teknologi Maju"
                        {...field}
                        className="border-accent-200 focus-visible:ring-accent-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="capacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-accent-foreground">Kapasitas</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="5"
                        {...field}
                        onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                        className="border-accent-200 focus-visible:ring-accent-200"
                      />
                    </FormControl>
                    <FormDescription>Jumlah maksimal mahasiswa</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Alamat</FormLabel>
                    <FormControl>
                      <Input placeholder="Jl. Teknologi No. 123" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kota</FormLabel>
                    <FormControl>
                      <Input placeholder="Jakarta" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="province"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Provinsi</FormLabel>
                    <FormControl>
                      <Input placeholder="DKI Jakarta" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactPerson"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Kontak</FormLabel>
                    <FormControl>
                      <Input placeholder="Budi Santoso" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telepon Kontak</FormLabel>
                    <FormControl>
                      <Input placeholder="08123456789" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactEmail"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Email Kontak</FormLabel>
                    <FormControl>
                      <Input placeholder="budi@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Deskripsi</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Deskripsi singkat tentang lokasi ini"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Status Aktif</FormLabel>
                      <FormDescription>Lokasi ini tersedia untuk program KKP Plus</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
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

