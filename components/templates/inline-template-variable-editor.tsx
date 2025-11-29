"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import { MousePointer2, Hand, Undo2, Redo2, Edit2, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { MockTemplate, TemplateVariable } from "@/types/template"

interface InlineTemplateVariableEditorProps {
  template: MockTemplate
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (variables: Record<string, TemplateVariable>) => void
}

export function InlineTemplateVariableEditor({
  template,
  open,
  onOpenChange,
  onSave
}: InlineTemplateVariableEditorProps) {
  const [variables, setVariables] = useState<Record<string, TemplateVariable>>(template.variableMapping)
  const [selectedText, setSelectedText] = useState("")
  const [selectionRange, setSelectionRange] = useState<{ start: number; end: number } | null>(null)
  const [showVariableDialog, setShowVariableDialog] = useState(false)
  const [newVariable, setNewVariable] = useState({
    key: "",
    label: "",
    type: "text" as 'text' | 'number' | 'date'
  })

  // New states for enhanced editing
  const [editMode, setEditMode] = useState<'select' | 'edit'>('select')
  const [editingVariable, setEditingVariable] = useState<string | null>(null)
  const [history, setHistory] = useState<Array<Record<string, TemplateVariable>>>([template.variableMapping])
  const [historyIndex, setHistoryIndex] = useState(0)

  // Undo/Redo handlers
  const addToHistory = (newVariables: Record<string, TemplateVariable>) => {
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(newVariables)
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setVariables(history[historyIndex - 1])
      toast({ title: "Undone", description: "Last action reverted" })
    }
  }

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      setVariables(history[historyIndex + 1])
      toast({ title: "Redone", description: "Action restored" })
    }
  }

  const handleTextSelection = () => {
    if (editMode !== 'select') return

    const selection = window.getSelection()
    if (selection && selection.toString().trim()) {
      const selectedText = selection.toString().trim()
      const selectionStart = template.rawText.indexOf(selectedText)

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

  const validateVariableKey = (key: string): boolean => {
    return /^[a-zA-Z0-9_]+$/.test(key)
  }

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
        description: "Variable key must contain only letters, numbers, and underscores",
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
      id: `var-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      key: newVariable.key,
      label: newVariable.label,
      type: newVariable.type,
      textContent: selectedText,
      startIndex: selectionRange.start,
      endIndex: selectionRange.end
    }

    const newVariables = { ...variables, [variable.key]: variable }
    setVariables(newVariables)
    addToHistory(newVariables)

    setShowVariableDialog(false)
    setNewVariable({ key: "", label: "", type: "text" })
    setSelectedText("")
    setSelectionRange(null)

    toast({
      title: "Success",
      description: "Variable added successfully"
    })
  }

  const handleDeleteVariable = (key: string) => {
    const newVariables = { ...variables }
    delete newVariables[key]
    setVariables(newVariables)
    addToHistory(newVariables)

    toast({
      title: "Success",
      description: "Variable deleted successfully"
    })
  }

  const handleEditVariable = (key: string, updates: Partial<TemplateVariable>) => {
    const newVariables = {
      ...variables,
      [key]: { ...variables[key], ...updates }
    }
    setVariables(newVariables)
    addToHistory(newVariables)
    setEditingVariable(null)

    toast({
      title: "Success",
      description: "Variable updated successfully"
    })
  }

  const handleSave = () => {
    onSave(variables)
    onOpenChange(false)
  }

  const getHighlightedHtml = () => {
    const baseStyles = `
      <style>
        .document-preview {
          font-family: 'Times New Roman', Times, serif;
          font-size: 14px;
          line-height: 1.6;
          color: #1a1a1a;
          max-width: 100%;
        }
        .document-preview h1 {
          font-size: 24px;
          line-height: 1.3;
          margin-top: 1rem;
          margin-bottom: 1.5rem;
        }
        .document-preview h2 {
          font-size: 20px;
          line-height: 1.3;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .document-preview h3 {
          font-size: 18px;
          line-height: 1.3;
          margin-top: 1.25rem;
          margin-bottom: 0.5rem;
        }
        .document-preview h4 {
          font-size: 16px;
          line-height: 1.3;
          margin-top: 1rem;
          margin-bottom: 0.25rem;
        }
        .document-preview p {
          margin-bottom: 0.75rem;
        }
        .document-preview table {
          border-collapse: collapse;
          width: 100%;
          margin: 1rem 0;
        }
        .document-preview table td,
        .document-preview table th {
          border: 1px solid #ddd;
          padding: 8px;
        }
        .document-preview blockquote {
          margin: 1rem 0;
          padding-left: 1rem;
          border-left: 4px solid #e5e7eb;
          color: #4b5563;
        }
        .document-preview img {
          max-width: 100%;
          height: auto;
          margin: 1rem 0;
        }
        .document-preview ul, .document-preview ol {
          margin-left: 2rem;
          margin-bottom: 0.75rem;
        }
        .document-preview strong {
          font-weight: 700;
        }
        .document-preview em {
          font-style: italic;
        }
        .variable-highlight {
          padding: 2px 6px;
          border-radius: 3px;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
          border: 2px solid transparent;
        }
        .variable-highlight:hover {
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        }
        .variable-highlight.mode-select {
          background-color: #fef08a;
          border-color: #facc15;
        }
        .variable-highlight.mode-edit {
          background-color: #bbf7d0;
          border-color: #22c55e;
        }
        .variable-highlight.editing {
          background-color: #ddd6fe;
          border-color: #8b5cf6;
          box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
        }
        .document-preview.mode-select {
          cursor: text;
        }
        .document-preview.mode-edit .variable-highlight {
          cursor: pointer;
        }
      </style>
    `;

    if (!template.html || Object.keys(variables).length === 0) {
      return `${baseStyles}<div class="document-preview mode-${editMode}">${template.html}</div>`;
    }

    let highlightedHtml = template.html;
    const sortedVars = Object.values(variables).sort((a, b) => b.startIndex - a.startIndex);

    sortedVars.forEach((variable) => {
      const isEditing = editingVariable === variable.key;
      const modeClass = editMode === 'select' ? 'mode-select' : 'mode-edit';
      const editingClass = isEditing ? 'editing' : '';

      const highlighted = `<mark class="variable-highlight ${modeClass} ${editingClass}" data-variable-id="${variable.id}" data-variable-key="${variable.key}" title="${variable.label} (${variable.key})">${variable.textContent}</mark>`;

      highlightedHtml = highlightedHtml.replace(
        new RegExp(variable.textContent.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
        highlighted
      );
    });

    return `${baseStyles}<div class="document-preview mode-${editMode}">${highlightedHtml}</div>`;
  }

  // Handle click on variable in edit mode
  const handleVariableClick = (e: React.MouseEvent) => {
    if (editMode !== 'edit') return;

    const target = e.target as HTMLElement;
    if (target.classList.contains('variable-highlight')) {
      const variableKey = target.getAttribute('data-variable-key');
      if (variableKey) {
        setEditingVariable(editingVariable === variableKey ? null : variableKey);
      }
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Template Variable Editor</DialogTitle>
            <DialogDescription>
              {editMode === 'select' ? 'Select text to define new variables' : 'Click on highlighted variables to edit them'}
            </DialogDescription>
          </DialogHeader>

          {/* Toolbar */}
          <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/50">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">Mode:</span>
              <div className="flex items-center gap-1 p-1 border rounded-lg bg-background">
                <Button
                  size="sm"
                  variant={editMode === 'select' ? 'default' : 'ghost'}
                  onClick={() => setEditMode('select')}
                  className="h-8"
                >
                  <Hand className="w-4 h-4 mr-1" />
                  Select
                </Button>
                <Button
                  size="sm"
                  variant={editMode === 'edit' ? 'default' : 'ghost'}
                  onClick={() => setEditMode('edit')}
                  className="h-8"
                >
                  <MousePointer2 className="w-4 h-4 mr-1" />
                  Edit
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handleUndo}
                disabled={historyIndex === 0}
                title="Undo (Ctrl+Z)"
              >
                <Undo2 className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleRedo}
                disabled={historyIndex === history.length - 1}
                title="Redo (Ctrl+Y)"
              >
                <Redo2 className="w-4 h-4" />
              </Button>
              <Separator orientation="vertical" className="h-8" />
              <Badge variant="secondary" className="font-mono">
                {Object.keys(variables).length} variables
              </Badge>
            </div>
          </div>

          <div className="flex flex-1 gap-4 overflow-hidden">
            {/* Preview Panel */}
            <div className="flex flex-col flex-1 border rounded-lg">
              <div className="flex items-center justify-between p-3 border-b bg-muted">
                <h3 className="font-semibold">Template Preview</h3>
                <Badge variant="outline" className="text-xs">
                  {editMode === 'select' ? '🖐️ Select Mode' : '🖱️ Edit Mode'}
                </Badge>
              </div>
              <ScrollArea className="flex-1 p-4">
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: getHighlightedHtml() }}
                  onMouseUp={handleTextSelection}
                  onClick={handleVariableClick}
                  style={{ userSelect: editMode === 'select' ? "text" : "none" }}
                />
              </ScrollArea>
            </div>

            {/* Variables Panel */}
            <div className="flex flex-col border rounded-lg w-80">
              <div className="p-3 border-b bg-muted">
                <h3 className="font-semibold">Defined Variables</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {Object.keys(variables).length} variable(s) defined
                </p>
              </div>
              <ScrollArea className="flex-1 p-3">
                <div className="space-y-3">
                  {Object.keys(variables).length === 0 ? (
                    <div className="py-8 text-sm text-center text-muted-foreground">
                      No variables defined yet. Select text to add variables.
                    </div>
                  ) : (
                    Object.entries(variables).map(([key, variable]) => (
                      <div
                        key={key}
                        className={`border rounded-lg p-3 space-y-2 hover:bg-muted/50 transition-colors ${editingVariable === key ? 'ring-2 ring-primary' : ''
                          }`}
                      >
                        <div className="flex items-start justify-between">
                          <Badge variant="secondary" className="font-mono text-xs">
                            {variable.key}
                          </Badge>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setEditingVariable(editingVariable === key ? null : key)}
                              title="Edit variable"
                            >
                              <Edit2 className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeleteVariable(key)}
                              title="Delete variable"
                            >
                              <Trash2 className="w-3 h-3 text-destructive" />
                            </Button>
                          </div>
                        </div>

                        {editingVariable === key ? (
                          <InlineVariableEditForm
                            variable={variable}
                            onSave={(updates) => handleEditVariable(key, updates)}
                            onCancel={() => setEditingVariable(null)}
                          />
                        ) : (
                          <div>
                            <p className="text-sm font-medium">{variable.label}</p>
                            <p className="mt-1 text-xs text-muted-foreground">
                              Type: {variable.type}
                            </p>
                            <p className="p-2 mt-1 text-xs rounded text-muted-foreground bg-muted">
                              "{variable.textContent}"
                            </p>
                          </div>
                        )}
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
            <Button onClick={handleSave} disabled={Object.keys(variables).length === 0}>
              Save Variables
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
    </>
  )
}

// Inline Variable Edit Form Component
function InlineVariableEditForm({
  variable,
  onSave,
  onCancel
}: {
  variable: TemplateVariable
  onSave: (updates: Partial<TemplateVariable>) => void
  onCancel: () => void
}) {
  const [editedLabel, setEditedLabel] = useState(variable.label)
  const [editedType, setEditedType] = useState(variable.type)

  const handleSave = () => {
    if (!editedLabel.trim()) {
      toast({
        title: "Validation Error",
        description: "Label cannot be empty",
        variant: "destructive"
      })
      return
    }

    onSave({
      label: editedLabel,
      type: editedType
    })
  }

  return (
    <div className="pt-2 space-y-3 border-t">
      <div className="space-y-2">
        <Label className="text-xs">Label</Label>
        <Input
          value={editedLabel}
          onChange={(e) => setEditedLabel(e.target.value)}
          className="h-8 text-sm"
          placeholder="Variable label"
        />
      </div>
      <div className="space-y-2">
        <Label className="text-xs">Type</Label>
        <Select value={editedType} onValueChange={(value: any) => setEditedType(value)}>
          <SelectTrigger className="h-8 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="text">Text</SelectItem>
            <SelectItem value="number">Number</SelectItem>
            <SelectItem value="date">Date</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-2">
        <Button size="sm" onClick={handleSave} className="flex-1 h-8">
          Save
        </Button>
        <Button size="sm" variant="outline" onClick={onCancel} className="flex-1 h-8">
          Cancel
        </Button>
      </div>
    </div>
  )
}
