"use client"

import { FileText, Download } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface PdfPreviewDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  htmlContent: string
  templateName: string
  variableCount: number
}

export function PdfPreviewDialog({
  open,
  onOpenChange,
  htmlContent,
  templateName,
  variableCount,
}: PdfPreviewDialogProps) {

  const handleDownload = () => {
    // Download as HTML file
    const blob = new Blob([`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${templateName}</title>
        <style>
          body { font-family: 'Times New Roman', serif; padding: 40px; max-width: 800px; margin: 0 auto; line-height: 1.6; }
          p { margin-bottom: 12px; text-align: justify; }
          h1, h2, h3 { margin-top: 24px; margin-bottom: 12px; }
          table { border-collapse: collapse; width: 100%; margin: 16px 0; }
          td, th { border: 1px solid #ddd; padding: 8px; }
        </style>
      </head>
      <body>${htmlContent}</body>
      </html>
    `], { type: 'text/html' })

    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${templateName.replace('.docx', '')}.html`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600">
              <FileText className="w-5 h-5 text-white" />
            </div>
            Preview - {templateName}
          </DialogTitle>
          <DialogDescription className="flex items-center justify-between">
            <span>Template dengan {variableCount} variabel</span>
            <Button
              size="sm"
              variant="outline"
              onClick={handleDownload}
              className="gap-2"
            >
              <Download className="w-4 h-4" />
              Unduh HTML
            </Button>
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[calc(90vh-10rem)] rounded-lg border bg-white shadow-inner">
          <div className="p-8 min-h-full">
            {htmlContent ? (
              <div
                className="prose prose-sm max-w-none 
                  prose-headings:font-semibold 
                  prose-p:text-justify prose-p:leading-relaxed
                  prose-table:border-collapse
                  prose-td:border prose-td:border-gray-300 prose-td:p-2
                  prose-th:border prose-th:border-gray-300 prose-th:p-2 prose-th:bg-gray-50"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-64 gap-4">
                <FileText className="w-12 h-12 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Tidak ada konten</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
