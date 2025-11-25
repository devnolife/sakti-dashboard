"use client"

import { useState, useCallback, useEffect } from "react"
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
import { TemplateVariable } from "@/types/template"

export interface TemplateVariableEditorCoreProps {
  html: string
  rawText: string
  initialVariables?: Record<string, TemplateVariable>
  onVariablesChange?: (variables: Record<string, TemplateVariable>) => void
  className?: string
}

export function TemplateVariableEditorCore({
  html,
  rawText,
  initialVariables = {},
  onVariablesChange,
  className = ""
}: TemplateVariableEditorCoreProps) {
  const [variables, setVariables] = useState<Record<string, TemplateVariable>>(initialVariables)
  const [selectedText, setSelectedText] = useState("")
  const [selectionRange, setSelectionRange] = useState<{ start: number; end: number } | null>(null)
  const [showVariableDialog, setShowVariableDialog] = useState(false)
  const [newVariable, setNewVariable] = useState({
    key: "",
    label: "",
    type: "text" as 'text' | 'number' | 'date'
  })

  // States for enhanced editing
  const [editMode, setEditMode] = useState<'select' | 'edit'>('select')
  const [editingVariable, setEditingVariable] = useState<string | null>(null)
  const [history, setHistory] = useState<Array<Record<string, TemplateVariable>>>([initialVariables])
  const [historyIndex, setHistoryIndex] = useState(0)

  // Sync with parent when variables change
  useEffect(() => {
    onVariablesChange?.(variables)
  }, [variables, onVariablesChange])

  // Undo/Redo handlers
  const addToHistory = useCallback((newVariables: Record<string, TemplateVariable>) => {
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1)
      newHistory.push(newVariables)
      return newHistory
    })
    setHistoryIndex(prev => prev + 1)
  }, [historyIndex])

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setVariables(history[historyIndex - 1])
      toast({ title: "Dibatalkan", description: "Perubahan terakhir dibatalkan" })
    }
  }

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      setVariables(history[historyIndex + 1])
      toast({ title: "Dikembalikan", description: "Perubahan dikembalikan" })
    }
  }

  const handleTextSelection = () => {
    if (editMode !== 'select') return

    const selection = window.getSelection()
    if (selection && selection.toString().trim()) {
      const selectedTextContent = selection.toString().trim()
      const selectionStart = rawText.indexOf(selectedTextContent)

      if (selectionStart !== -1) {
        setSelectedText(selectedTextContent)
        setSelectionRange({
          start: selectionStart,
          end: selectionStart + selectedTextContent.length
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
        title: "Error Validasi",
        description: "Harap isi semua field yang diperlukan",
        variant: "destructive"
      })
      return
    }

    if (!validateVariableKey(newVariable.key)) {
      toast({
        title: "Error Validasi",
        description: "Key variabel hanya boleh berisi huruf, angka, dan underscore",
        variant: "destructive"
      })
      return
    }

    if (variables[newVariable.key]) {
      toast({
        title: "Error Validasi",
        description: "Key variabel sudah ada",
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
      title: "Berhasil",
      description: "Variabel berhasil ditambahkan"
    })
  }

  const handleDeleteVariable = (key: string) => {
    const newVariables = { ...variables }
    delete newVariables[key]
    setVariables(newVariables)
    addToHistory(newVariables)

    toast({
      title: "Berhasil",
      description: "Variabel berhasil dihapus"
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
      title: "Berhasil",
      description: "Variabel berhasil diperbarui"
    })
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

    if (!html || Object.keys(variables).length === 0) {
      return `${baseStyles}<div class="document-preview mode-${editMode}">${html}</div>`;
    }

    let highlightedHtml = html;
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
    <div className={`flex flex-col h-full ${className}`}>
      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/50 mb-4">
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
              Pilih
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
            title="Batalkan (Ctrl+Z)"
          >
            <Undo2 className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleRedo}
            disabled={historyIndex === history.length - 1}
            title="Kembalikan (Ctrl+Y)"
          >
            <Redo2 className="w-4 h-4" />
          </Button>
          <Separator orientation="vertical" className="h-8" />
          <Badge variant="secondary" className="font-mono">
            {Object.keys(variables).length} variabel
          </Badge>
        </div>
      </div>

      <div className="flex flex-1 gap-4 overflow-hidden min-h-0">
        {/* Preview Panel */}
        <div className="flex flex-col flex-1 border rounded-lg min-w-0">
          <div className="flex items-center justify-between p-3 border-b bg-muted">
            <h3 className="font-semibold">Preview Template</h3>
            <Badge variant="outline" className="text-xs">
              {editMode === 'select' ? '🖐️ Mode Pilih' : '🖱️ Mode Edit'}
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
        <div className="flex flex-col border rounded-lg w-80 flex-shrink-0">
          <div className="p-3 border-b bg-muted">
            <h3 className="font-semibold">Variabel Terdefinisi</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              {Object.keys(variables).length} variabel telah didefinisikan
            </p>
          </div>
          <ScrollArea className="flex-1 p-3">
            <div className="space-y-3">
              {Object.keys(variables).length === 0 ? (
                <div className="py-8 text-sm text-center text-muted-foreground">
                  <p className="mb-2">Belum ada variabel.</p>
                  <p className="text-xs">Blok/seleksi teks di preview untuk menambahkan variabel.</p>
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
                          title="Edit variabel"
                        >
                          <Edit2 className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteVariable(key)}
                          title="Hapus variabel"
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
                          Tipe: {variable.type === 'text' ? 'Teks' : variable.type === 'number' ? 'Angka' : 'Tanggal'}
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

      {/* Add Variable Dialog */}
      <Dialog open={showVariableDialog} onOpenChange={setShowVariableDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Definisikan Variabel</DialogTitle>
            <DialogDescription>
              Buat variabel untuk teks yang dipilih: "{selectedText}"
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="var-key">Key Variabel *</Label>
              <Input
                id="var-key"
                placeholder="contoh: nama_mahasiswa"
                value={newVariable.key}
                onChange={(e) => setNewVariable({ ...newVariable, key: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">
                Hanya huruf, angka, dan underscore. Tanpa spasi.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="var-label">Label *</Label>
              <Input
                id="var-label"
                placeholder="contoh: Nama Mahasiswa"
                value={newVariable.label}
                onChange={(e) => setNewVariable({ ...newVariable, label: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="var-type">Tipe</Label>
              <Select
                value={newVariable.type}
                onValueChange={(value) => setNewVariable({ ...newVariable, type: value as 'text' | 'number' | 'date' })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Teks</SelectItem>
                  <SelectItem value="number">Angka</SelectItem>
                  <SelectItem value="date">Tanggal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowVariableDialog(false)}>
              Batal
            </Button>
            <Button onClick={handleAddVariable}>
              Tambah Variabel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
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
        title: "Error Validasi",
        description: "Label tidak boleh kosong",
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
          placeholder="Label variabel"
        />
      </div>
      <div className="space-y-2">
        <Label className="text-xs">Tipe</Label>
        <Select value={editedType} onValueChange={(value: 'text' | 'number' | 'date') => setEditedType(value)}>
          <SelectTrigger className="h-8 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="text">Teks</SelectItem>
            <SelectItem value="number">Angka</SelectItem>
            <SelectItem value="date">Tanggal</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-2">
        <Button size="sm" onClick={handleSave} className="flex-1 h-8">
          Simpan
        </Button>
        <Button size="sm" variant="outline" onClick={onCancel} className="flex-1 h-8">
          Batal
        </Button>
      </div>
    </div>
  )
}
