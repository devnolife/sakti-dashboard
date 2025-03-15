"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

interface BookDetailsDialogProps {
  book: {
    id: string
    title: string
    author: string
    publisher: string
    publishedYear: number
    isbn: string
    category: string
    location: string
    availableCopies: number
    totalCopies: number
    isAvailable: boolean
    coverImage: string
    description: string
  }
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function BookDetailsDialog({ book, open, onOpenChange }: BookDetailsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detail Buku</DialogTitle>
          <DialogDescription>Informasi lengkap tentang buku.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4 md:grid-cols-2">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md">
            <Image src={book.coverImage || "/placeholder.svg"} alt={book.title} fill className="object-cover" />
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Judul</h3>
              <p>{book.title}</p>
            </div>

            <div>
              <h3 className="font-semibold">Penulis</h3>
              <p>{book.author}</p>
            </div>

            <div>
              <h3 className="font-semibold">Penerbit</h3>
              <p>
                {book.publisher}, {book.publishedYear}
              </p>
            </div>

            <div>
              <h3 className="font-semibold">ISBN</h3>
              <p>{book.isbn}</p>
            </div>

            <div>
              <h3 className="font-semibold">Kategori</h3>
              <p className="capitalize">{book.category.replace("-", " ")}</p>
            </div>

            <div>
              <h3 className="font-semibold">Status</h3>
              <div className="mt-1">
                <Badge variant={book.isAvailable ? "default" : "destructive"}>
                  {book.isAvailable ? "Tersedia" : "Tidak Tersedia"}
                </Badge>
              </div>
            </div>

            <div>
              <h3 className="font-semibold">Ketersediaan</h3>
              <p>
                {book.availableCopies} dari {book.totalCopies} salinan
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Lokasi</h3>
              <p>{book.location}</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold">Deskripsi</h3>
          <p className="mt-1 text-sm">{book.description}</p>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Tutup
          </Button>
          <Button disabled={!book.isAvailable}>{book.isAvailable ? "Pinjamkan Buku" : "Tidak Tersedia"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

