"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { TemplateVariable, VariableMapping } from "@/types/template"
import { Save, Trash2, Edit2, Plus, Undo2, Redo2 } from "lucide-react"

interface TemplateVariableEditorProps {
  templateId: string
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave?: () => void
}

export function TemplateVariableEditor({ templateId, open, onOpenChange, onSave }: TemplateVariableEditorProps) {
  const [html, setHtml] = useState<string>("")
  const [rawText, setRawText] = useState<string>("")
  const [variables, setVariables] = useState<VariableMapping>({})
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [selectedText, setSelectedText] = useState<string>("")
  const [selectionRange, setSelectionRange] = useState<{ start: number; end: number } | null>(null)
  const [showVariableDialog, setShowVariableDialog] = useState(false)
  const [newVariable, setNewVariable] = useState<Partial<TemplateVariable>>({
    key: "",
    label: "",
    type: "text"
  })
  const [history, setHistory] = useState<VariableMapping[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const contentRef = useRef<HTMLDivElement>(null)

  // Fetch template preview
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
        setRawText(data.data.rawText)
        if (data.data.variableMapping) {
          setVariables(data.data.variableMapping)
          setHistory([data.data.variableMapping])
          setHistoryIndex(0)
        }
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

  // Handle text selection
  const handleTextSelection = () => {
    const selection = window.getSelection()
    if (selection && selection.toString().trim()) {
      const selectedText = selection.toString().trim()
      const selectionStart = rawText.indexOf(selectedText)
      
      if (selectionStart !== -1) {
        setSelectedText(selectedText)
        setSelectionRange({
          start: selectionStart,
          end: selectionStart + selectedText.length
        })
        setShowVariableDialog(true)
      }
    }
  }

  // Validate variable key (alphanumeric + underscore only, no spaces)
  const validateVariableKey = (key: string): boolean => {
    return /^[a-zA-Z0-9_]+$/.test(key)
  }
  // Add variable to mapping
  const handleAddVariable = () => {
    if (!newVariable.key || !newVariable.label || !selectionRange) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive"
      })
      return
    }

    if (!validateVariableKey(newVariable.key)) {
      toast({
        title: "Validation Error",
        description: "Variable key must contain only letters, numbers, and underscores (no spaces)",
        variant: "destructive"
      })
      return
    }

    if (variables[newVariable.key]) {
      toast({
        title: "Validation Error",
        description: "Variable key already exists",
        variant: "destructive"
      })
      return
    }

    const variable: TemplateVariable = {
      key: newVariable.key,
      label: newVariable.label,
      type: newVariable.type as 'text' | 'number' | 'date',
      textContent: selectedText,
      startIndex: selectionRange.start,
      endIndex: selectionRange.end
    }

    const newVariables = { ...variables, [variable.key]: variable }
    setVariables(newVariables)
    
    // Add to history
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(newVariables)
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)

    // Reset form
    setShowVariableDialog(false)
    setNewVariable({ key: "", label: "", type: "text" })
    setSelectedText("")
    setSelectionRange(null)

    toast({
      title: "Success",
      description: "Variable added successfully"
    })
  }

  // Delete variable
  const handleDeleteVariable = (key: string) => {
    const newVariables = { ...variables }
    delete newVariables[key]
    setVariables(newVariables)

    // Add to history
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(newVariables)
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)

    toast({
      title: "Success",
      description: "Variable deleted successfully"
    })
  }

  // Undo
  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setVariables(history[historyIndex - 1])
    }
  }

  // Redo
  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      setVariables(history[historyIndex + 1])
    }
  }

  // Save variables
  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await fetch(`/api/templates/${templateId}/variables`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ variables })
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Success",
          description: "Variables saved successfully"
        })
        onSave?.()
        onOpenChange(false)
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to save variables",
          variant: "destructive"
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save variables",
        variant: "destructive"
      })
    } finally {
      setSaving(false)
    }
  }

  // Highlight defined variables in HTML
  const getHighlightedHtml = () => {
    if (!html || Object.keys(variables).length === 0) return html

    let highlightedHtml = html
    const sortedVars = Object.values(variables).sort((a, b) => b.startIndex - a.startIndex)

    sortedVars.forEach((variable) => {
      const highlighted = `<mark class="variable-highlight" data-key="${variable.key}" style="background-color: #fef08a; padding: 2px 4px; border-radius: 2px; cursor: pointer;" title="${variable.label}">${variable.textContent}</mark>`
      
      highlightedHtml = highlightedHtml.replace(
        new RegExp(variable.textContent.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
        highlighted
      )
    })

    return highlightedHtml
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Template Variable Editor</DialogTitle>
          <DialogDescription>
            Select text in the preview to define variables. Variables will be used for document generation.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-hidden flex gap-4">
          {/* Preview Panel */}
          <div className="flex-1 flex flex-col border rounded-lg">
            <div className="bg-muted p-3 border-b flex items-center justify-between">
              <h3 className="font-semibold">Template Preview</h3>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleUndo}
                  disabled={historyIndex <= 0}
                >
                  <Undo2 className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleRedo}
                  disabled={historyIndex >= history.length - 1}
                >
                  <Redo2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <ScrollArea className="flex-1 p-4">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : (
                <div
                  ref={contentRef}
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: getHighlightedHtml() }}
                  onMouseUp={handleTextSelection}
                  style={{ userSelect: "text" }}
                />
              )}
            </ScrollArea>
          </div>

          {/* Variables Panel */}
          <div className="w-80 border rounded-lg flex flex-col">
            <div className="bg-muted p-3 border-b">
              <h3 className="font-semibold">Defined Variables</h3>
              <p className="text-xs text-muted-foreground mt-1">
                {Object.keys(variables).length} variable(s) defined
              </p>
            </div>
            <ScrollArea className="flex-1 p-3">
              <div className="space-y-3">
                {Object.keys(variables).length === 0 ? (
                  <div className="text-center text-muted-foreground text-sm py-8">
                    No variables defined yet. Select text to add variables.
                  </div>
                ) : (
                  Object.entries(variables).map(([key, variable]) => (
                    <div
                      key={key}
                      className="border rounded-lg p-3 space-y-2 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <Badge variant="secondary" className="font-mono text-xs">
                          {variable.key}
                        </Badge>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteVariable(key)}
                        >
                          <Trash2 className="w-3 h-3 text-destructive" />
                        </Button>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{variable.label}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Type: {variable.type}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1 bg-muted p-2 rounded">
                          "{variable.textContent}"
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving || Object.keys(variables).length === 0}>
            {saving ? "Saving..." : "Save Variables"}
          </Button>
        </DialogFooter>

        {/* Add Variable Dialog */}
        <Dialog open={showVariableDialog} onOpenChange={setShowVariableDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Define Variable</DialogTitle>
              <DialogDescription>
                Create a variable for the selected text: "{selectedText}"
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="var-key">Variable Key *</Label>
                <Input
                  id="var-key"
                  placeholder="e.g., nama_mahasiswa"
                  value={newVariable.key}
                  onChange={(e) => setNewVariable({ ...newVariable, key: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">
                  Only letters, numbers, and underscores. No spaces.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="var-label">Label *</Label>
                <Input
                  id="var-label"
                  placeholder="e.g., Nama Mahasiswa"
                  value={newVariable.label}
                  onChange={(e) => setNewVariable({ ...newVariable, label: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="var-type">Type</Label>
                <Select
                  value={newVariable.type}
                  onValueChange={(value) => setNewVariable({ ...newVariable, type: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="number">Number</SelectItem>
                    <SelectItem value="date">Date</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowVariableDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddVariable}>
                Add Variable
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DialogContent>
    </Dialog>
  )
}