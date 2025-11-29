"use client"

import { useEffect, useRef } from "react"
import { renderAsync } from "docx-preview"
import { FileText, Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface DocxPreviewDialogProps {
  file: File | null
  triggerLabel?: string
  triggerVariant?: "default" | "outline" | "ghost" | "secondary"
}

export function DocxPreviewDialog({
  file,
  triggerLabel = "Preview Dokumen",
  triggerVariant = "outline",
}: DocxPreviewDialogProps) {
  const previewContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (file && previewContainerRef.current) {
      const container = previewContainerRef.current
      container.innerHTML = '<div class="flex items-center justify-center p-8"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>'

      renderAsync(file, container, undefined, {
        className: "docx-preview-content",
        inWrapper: true,
        ignoreWidth: false,
        ignoreHeight: false,
      }).catch((err) => {
        console.error("Preview error:", err)
        container.innerHTML = `
          <div class="flex flex-col items-center justify-center p-12 text-center">
            <div class="p-4 rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
              <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <p class="text-sm font-medium text-red-700 dark:text-red-400">Gagal memuat previewss</p>
            <p class="text-xs text-muted-foreground mt-1">File mungkin rusak atau format tidak didukung</p>
          </div>
        `
      })
    }
  }, [file])

  if (!file) {
    return (
      <Button variant={triggerVariant} disabled className="gap-2">
        <FileText className="w-4 h-4" />
        {triggerLabel}
      </Button>
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={triggerVariant} className="gap-2">
          <FileText className="w-4 h-4" />
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600">
              <FileText className="w-5 h-5 text-white" />
            </div>
            Preview Dokumen
          </DialogTitle>
          <DialogDescription>
            {file.name} ({(file.size / 1024).toFixed(2)} KB)
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[calc(90vh-8rem)] rounded-lg border-2 bg-white dark:bg-slate-900">
          <div
            ref={previewContainerRef}
            className="min-h-[600px] p-4"
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
