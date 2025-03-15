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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlertCircle, CheckCircle, Clock } from "lucide-react"

interface BorrowingDetailsDialogProps {
  borrowing: {
    id: string
    studentName: string
    studentId: string
    bookTitle: string
    bookId: string
    borrowDate: string
    dueDate: string
    status: string
    department: string
    bookCover: string
    isOverdue: boolean
    daysRemaining: number
  }
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function BorrowingDetailsDialog({ borrowing, open, onOpenChange }: BorrowingDetailsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detail Peminjaman</DialogTitle>
          <DialogDescription>Informasi lengkap tentang peminjaman buku.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4 md:grid-cols-2">
          <div className="space-y-4">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md">
              <Image
                src={borrowing.bookCover || "/placeholder.svg"}
                alt={borrowing.bookTitle}
                fill
                className="object-cover"
              />
            </div>

            <div>
              <h3 className="font-semibold">Status Peminjaman</h3>
              {borrowing.isOverdue ? (
                <div className="mt-2 rounded-md bg-destructive/10 p-3 text-destructive">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Terlambat {Math.abs(borrowing.daysRemaining)} hari</p>
                      <p className="text-sm">Buku seharusnya dikembalikan pada {borrowing.dueDate}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-2 rounded-md bg-muted p-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Tersisa {borrowing.daysRemaining} hari</p>
                      <p className="text-sm text-muted-foreground">Buku harus dikembalikan pada {borrowing.dueDate}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold">Informasi Buku</h3>
              <div className="mt-2 space-y-2">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Judul</p>
                  <p>{borrowing.bookTitle}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">ID Buku</p>
                  <p>{borrowing.bookId}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Informasi Peminjam</h3>
              <div className="mt-2 flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={borrowing.studentName} />
                  <AvatarFallback>{borrowing.studentName.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{borrowing.studentName}</p>
                  <p className="text-sm text-muted-foreground">{borrowing.studentId}</p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Jurusan</p>
                  <p>{borrowing.department}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Detail Peminjaman</h3>
              <div className="mt-2 space-y-2">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">ID Peminjaman</p>
                  <p>{borrowing.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Tanggal Peminjaman</p>
                  <p>{borrowing.borrowDate}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Tanggal Jatuh Tempo</p>
                  <p>{borrowing.dueDate}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Tutup
          </Button>
          <Button className="gap-2">
            <CheckCircle className="h-4 w-4" />
            <span>Proses Pengembalian</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

