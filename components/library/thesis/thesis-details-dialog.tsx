"use client"

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
import type { ThesisTitle } from "./mock-thesis-data"

interface ThesisDetailsDialogProps {
  thesis: ThesisTitle
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ThesisDetailsDialog({ thesis, open, onOpenChange }: ThesisDetailsDialogProps) {
  // Format status text
  const formatStatus = (status: ThesisTitle["status"]) => {
    switch (status) {
      case "approved":
        return "Disetujui"
      case "pending":
        return "Menunggu"
      case "rejected":
        return "Ditolak"
      case "completed":
        return "Selesai"
      default:
        return status
    }
  }

  // Get status badge variant
  const getStatusVariant = (status: ThesisTitle["status"]): "default" | "destructive" | "outline" | "secondary" => {
    switch (status) {
      case "approved":
        return "default"
      case "pending":
        return "secondary"
      case "rejected":
        return "destructive"
      case "completed":
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{thesis.title}</DialogTitle>
          <DialogDescription>Detail judul skripsi</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-between">
            <Badge>{thesis.field}</Badge>
            <Badge variant={getStatusVariant(thesis.status)}>{formatStatus(thesis.status)}</Badge>
          </div>

          <div>
            <h4 className="mb-2 font-medium">Abstrak</h4>
            <p className="text-sm text-muted-foreground">{thesis.abstract}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="mb-1 font-medium">Mahasiswa</h4>
              <p className="text-sm">{thesis.student.name}</p>
              <p className="text-sm text-muted-foreground">{thesis.student.nim}</p>
              <p className="text-sm text-muted-foreground">{thesis.student.program}</p>
            </div>

            <div>
              <h4 className="mb-1 font-medium">Pembimbing</h4>
              <p className="text-sm">{thesis.supervisor.name}</p>
            </div>
          </div>

          <div>
            <h4 className="mb-1 font-medium">Kata Kunci</h4>
            <div className="flex flex-wrap gap-1">
              {thesis.keywords.map((keyword, index) => (
                <Badge key={index} variant="secondary">
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="mb-1 font-medium">Tahun</h4>
              <p className="text-sm">{thesis.year}</p>
            </div>

            <div>
              <h4 className="mb-1 font-medium">Tanggal Pengajuan</h4>
              <p className="text-sm">
                {new Date(thesis.submissionDate).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Tutup
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

