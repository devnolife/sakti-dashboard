"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "@/hooks/use-toast"

interface TemplatePreviewDialogProps {
  templateId: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TemplatePreviewDialog({ templateId, open, onOpenChange }: TemplatePreviewDialogProps) {
  const [html, setHtml] = useState<string>("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (open && templateId) {
      fetchTemplatePreview()
    }
  }, [open, templateId])

  const fetchTemplatePreview = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/templates/${templateId}/preview`)
      const data = await response.json()

      if (data.success) {
        setHtml(data.data.html)
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to load template",
          variant: "destructive"
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load template preview",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Template Preview</DialogTitle>
          <DialogDescription>
            Read-only preview of the template document
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[60vh] border rounded-lg p-4">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}