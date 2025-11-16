"use client"

import { useState, useEffect } from "react"
import { AdvancedTemplateVariableEditor, TemplateData, TemplateVariable } from "./advanced-template-variable-editor"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { saveAs } from "file-saver"

interface TemplateVariableEditorWrapperProps {
  templateId: string
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave?: () => void
}

export function TemplateVariableEditorWrapper({
  templateId,
  open,
  onOpenChange,
  onSave
}: TemplateVariableEditorWrapperProps) {
  const [templateData, setTemplateData] = useState<TemplateData | null>(null)
  const [loading, setLoading] = useState(false)
  const [showDownloadDialog, setShowDownloadDialog] = useState(false)
  const [savedVariables, setSavedVariables] = useState<Record<string, TemplateVariable> | null>(null)

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
        const previewData: TemplateData = {
          id: templateId,
          name: data.data.detectedFields?.name || "Template",
          html: data.data.html,
          rawText: data.data.rawText,
          variableMapping: data.data.variableMapping || {}
        }
        setTemplateData(previewData)
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to load template preview",
          variant: "destructive"
        })
        onOpenChange(false)
      }
    } catch (error) {
      console.error("Error fetching template preview:", error)
      toast({
        title: "Error",
        description: "Failed to load template preview",
        variant: "destructive"
      })
      onOpenChange(false)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveVariables = async (variables: Record<string, TemplateVariable>) => {
    try {
      const response = await fetch(`/api/templates/${templateId}/variables`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ variables })
      })

      const data = await response.json()

      if (data.success) {
        setSavedVariables(variables)
        toast({
          title: "Success",
          description: "Variables saved successfully"
        })

        // Show download dialog if variables were saved
        if (Object.keys(variables).length > 0) {
          setShowDownloadDialog(true)
        } else {
          onOpenChange(false)
          if (onSave) onSave()
        }
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to save variables",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error("Error saving variables:", error)
      toast({
        title: "Error",
        description: "Failed to save variables",
        variant: "destructive"
      })
    }
  }

  const handleDownloadDOCX = async () => {
    try {
      const response = await fetch(`/api/templates/${templateId}/generate-docx`, {
        method: "POST"
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to generate DOCX")
      }

      // Get the blob from response
      const blob = await response.blob()

      // Extract filename from Content-Disposition header or use default
      const contentDisposition = response.headers.get("Content-Disposition")
      let filename = "template_with_variables.docx"
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="?([^"]+)"?/)
        if (filenameMatch) {
          filename = filenameMatch[1]
        }
      }

      // Download the file
      saveAs(blob, filename)

      toast({
        title: "Downloaded",
        description: "Template with variables downloaded successfully"
      })

      setShowDownloadDialog(false)
      onOpenChange(false)
      if (onSave) onSave()
    } catch (error) {
      console.error("Error downloading DOCX:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to download DOCX",
        variant: "destructive"
      })
    }
  }

  if (loading || !templateData) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <div className="flex items-center justify-center p-8">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <>
      <AdvancedTemplateVariableEditor
        template={templateData}
        open={open && !showDownloadDialog}
        onOpenChange={onOpenChange}
        onSave={handleSaveVariables}
      />

      {/* Download Confirmation Dialog */}
      <Dialog open={showDownloadDialog} onOpenChange={setShowDownloadDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Variables Saved Successfully!</DialogTitle>
            <DialogDescription>
              Would you like to download the template with variable placeholders?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              The template will be downloaded with variables replaced by placeholders like{" "}
              <code className="px-2 py-1 text-xs rounded bg-muted">
                {savedVariables && Object.keys(savedVariables).length > 0
                  ? `{{${Object.keys(savedVariables)[0]}}}`
                  : "{{variable_key}}"}
              </code>
            </p>
            {savedVariables && (
              <div className="mt-4 space-y-1">
                <p className="text-sm font-medium">Defined Variables:</p>
                <ul className="text-xs list-disc list-inside text-muted-foreground">
                  {Object.entries(savedVariables).slice(0, 5).map(([key, variable]) => (
                    <li key={key}>
                      <code className="px-1 rounded bg-muted">{"{{" + variable.key + "}}"}</code> - {variable.label}
                    </li>
                  ))}
                  {Object.keys(savedVariables).length > 5 && (
                    <li>...and {Object.keys(savedVariables).length - 5} more</li>
                  )}
                </ul>
              </div>
            )}
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setShowDownloadDialog(false)
                onOpenChange(false)
                if (onSave) onSave()
              }}
            >
              Skip Download
            </Button>
            <Button onClick={handleDownloadDOCX}>
              <Download className="w-4 h-4 mr-2" />
              Download DOCX
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
