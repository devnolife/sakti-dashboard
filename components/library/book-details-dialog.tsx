"use client"

import Image from "next/image"
import type { Book } from "./mock-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { SimilarityIndicator } from "./similarity-indicator"

interface BookDetailsDialogProps {
  book: Book
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function BookDetailsDialog({ book, open, onOpenChange }: BookDetailsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{book.title}</DialogTitle>
          <DialogDescription>Detail buku dan informasi peminjaman</DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4 md:grid-cols-2">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md">
            <Image src={book.coverImage || "/placeholder.svg"} alt={book.title} fill className="object-cover" />
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-medium">Penulis</h4>
              <p className="text-sm">{book.author}</p>
            </div>

            <div>
              <h4 className="font-medium">Penerbit</h4>
              <p className="text-sm">
                {book.publisher}, {book.publishedYear}
              </p>
            </div>

            <div>
              <h4 className="font-medium">ISBN</h4>
              <p className="text-sm">{book.isbn}</p>
            </div>

            <div>
              <h4 className="font-medium">Kategori</h4>
              <p className="text-sm capitalize">{book.category.replace("-", " ")}</p>
            </div>

            <div>
              <h4 className="font-medium">Status</h4>
              <div className="mt-1">
                <Badge variant={book.isAvailable ? "default" : "destructive"}>
                  {book.isAvailable ? "Tersedia" : "Tidak Tersedia"}
                </Badge>
              </div>
            </div>

            <div>
              <h4 className="font-medium">Ketersediaan</h4>
              <p className="text-sm">
                {book.availableCopies} dari {book.totalCopies} salinan
              </p>
            </div>

            <div>
              <h4 className="font-medium">Lokasi</h4>
              <p className="text-sm">{book.location}</p>
            </div>

            {book.similarityPercentage && (
              <div>
                <h4 className="font-medium">Kesamaan</h4>
                <div className="mt-1">
                  <SimilarityIndicator percentage={book.similarityPercentage} />
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <h4 className="font-medium">Deskripsi</h4>
          <p className="mt-1 text-sm">{book.description}</p>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Tutup
          </Button>
          <Button disabled={!book.isAvailable}>{book.isAvailable ? "Pinjam Buku" : "Tidak Tersedia"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

