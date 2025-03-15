"use client"

import { useState } from "react"
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
import { AlertCircle, CheckCircle, Clock, AlertTriangle } from "lucide-react"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

interface ProcessReturnDialogProps {
  returnData: {
    id: string
    studentName: string
    studentId: string
    bookTitle: string
    bookId: string
    borrowDate: string
    dueDate: string
    isOverdue: boolean
    daysOverdue: number
    bookCover?: string
  }
  open: boolean
  onOpenChange: (open: boolean) => void
  onProcessed: (returnData: any, condition: string) => void
}

export function ProcessReturnDialog({ returnData, open, onOpenChange, onProcessed }: ProcessReturnDialogProps) {
  const [bookCondition, setBookCondition] = useState("Baik")
  const [notes, setNotes] = useState("")
  const [applyFine, setApplyFine] = useState(returnData.isOverdue)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = () => {
    setIsProcessing(true)
    // Simulate API call
    setTimeout(() => {
      onProcessed(returnData, bookCondition)
      setIsProcessing(false)
      // Reset form
      setBookCondition("Baik")
      setNotes("")
      setApplyFine(false)
    }, 1000)
  }

  const calculateFine = () => {
    if (!returnData.isOverdue || !applyFine) return 0
    // Assume fine is Rp 2,000 per day
    return returnData.daysOverdue * 2000
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Proses Pengembalian Buku</DialogTitle>
          <DialogDescription>Periksa kondisi buku dan proses pengembalian.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4 md:grid-cols-2">
          <div className="space-y-4">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md">
              <Image
                src={returnData.bookCover || "/placeholder.svg?height=400&width=300"}
                alt={returnData.bookTitle}
                fill
                className="object-cover"
              />
            </div>

            <div>
              <h3 className="font-semibold">Status Peminjaman</h3>
              {returnData.isOverdue ? (
                <div className="mt-2 rounded-md bg-destructive/10 p-3 text-destructive">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Terlambat {Math.abs(returnData.daysOverdue)} hari</p>
                      <p className="text-sm">Buku seharusnya dikembalikan pada {returnData.dueDate}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-2 rounded-md bg-muted p-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Pengembalian tepat waktu</p>
                      <p className="text-sm text-muted-foreground">
                        Buku dikembalikan sebelum tanggal jatuh tempo {returnData.dueDate}
                      </p>
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
                  <p>{returnData.bookTitle}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">ID Buku</p>
                  <p>{returnData.bookId}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Informasi Peminjam</h3>
              <div className="mt-2 flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={returnData.studentName} />
                  <AvatarFallback>{returnData.studentName.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{returnData.studentName}</p>
                  <p className="text-sm text-muted-foreground">{returnData.studentId}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Kondisi Buku</h3>
              <RadioGroup value={bookCondition} onValueChange={setBookCondition} className="mt-2 space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Baik" id="condition-good" />
                  <Label htmlFor="condition-good">Baik (tidak ada kerusakan)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Rusak Ringan" id="condition-minor" />
                  <Label htmlFor="condition-minor">Rusak Ringan (lecet, lipatan)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Rusak Berat" id="condition-major" />
                  <Label htmlFor="condition-major">Rusak Berat (sobek, basah, halaman hilang)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Hilang" id="condition-lost" />
                  <Label htmlFor="condition-lost">Hilang (tidak dikembalikan)</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="return-notes">Catatan</Label>
              <Textarea
                id="return-notes"
                placeholder="Tambahkan catatan tentang kondisi buku atau informasi lainnya..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="mt-1"
              />
            </div>

            {returnData.isOverdue && (
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="apply-fine"
                    checked={applyFine}
                    onCheckedChange={(checked) => setApplyFine(checked as boolean)}
                  />
                  <Label htmlFor="apply-fine" className="font-medium">
                    Terapkan denda keterlambatan
                  </Label>
                </div>

                {applyFine && (
                  <div className="rounded-md bg-amber-50 p-3 text-amber-800">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 mt-0.5" />
                      <div>
                        <p className="font-medium">Denda keterlambatan: Rp {calculateFine().toLocaleString("id-ID")}</p>
                        <p className="text-sm">{returnData.daysOverdue} hari × Rp 2.000 per hari</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Batal
          </Button>
          <Button className="gap-2" onClick={handleSubmit} disabled={isProcessing}>
            <CheckCircle className="h-4 w-4" />
            <span>{isProcessing ? "Memproses..." : "Proses Pengembalian"}</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

