"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { XCircle } from "lucide-react"

interface DocumentRejectionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  documentName: string
  onReject: (reason: string) => void
}

export function DocumentRejectionDialog({ open, onOpenChange, documentName, onReject }: DocumentRejectionDialogProps) {
  const [reason, setReason] = useState("")

  const handleSubmit = () => {
    onReject(reason)
    setReason("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <XCircle className="w-5 h-5" />
            Tolak Dokumen
          </DialogTitle>
          <DialogDescription>Berikan alasan penolakan untuk dokumen "{documentName}"</DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reason">Alasan Penolakan</Label>
            <Textarea
              id="reason"
              placeholder="Masukkan alasan penolakan dokumen"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Batal
          </Button>
          <Button variant="destructive" onClick={handleSubmit} disabled={!reason.trim()}>
            Tolak Dokumen
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

