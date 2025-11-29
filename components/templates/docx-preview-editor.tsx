"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import { MousePointer2, Hand, Undo2, Redo2, Edit2, Trash2, FileText, Variable } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { TemplateVariable } from "@/types/template"
import { renderAsync } from "docx-preview"

export interface DocxPreviewEditorProps {
  file: File
  initialVariables?: Record<string, TemplateVariable>
  onVariablesChange?: (variables: Record<string, TemplateVariable>) => void
  className?: string
}

export function DocxPreviewEditor({
  file,
  initialVariables = {},
  onVariablesChange,
  className = ""
}: DocxPreviewEditorProps) {
  const [variables, setVariables] = useState<Record<string, TemplateVariable>>(initialVariables)
  const [selectedText, setSelectedText] = useState("")
  const [showVariableDialog, setShowVariableDialog] = useState(false)
  const [newVariable, setNewVariable] = useState({
    key: "",
    label: "",
    type: "text" as 'text' | 'number' | 'date'
  })

  // States for editing
  const [editMode, setEditMode] = useState<'select' | 'edit'>('select')
  const [editingVariable, setEditingVariable] = useState<string | null>(null)
  const [history, setHistory] = useState<Array<Record<string, TemplateVariable>>>([initialVariables])
  const [historyIndex, setHistoryIndex] = useState(0)

  const docxContainerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Sync with parent when variables change
  useEffect(() => {
    onVariablesChange?.(variables)
  }, [variables, onVariablesChange])

  // Render DOCX preview
  useEffect(() => {
    renderDocx()
  }, [file])

  const renderDocx = async () => {
    if (!docxContainerRef.current) return

    try {
      setIsLoading(true)
      const arrayBuffer = await file.arrayBuffer()

      // Clear previous content
      docxContainerRef.current.innerHTML = ''

      // Render DOCX with original formatting
      await renderAsync(arrayBuffer, docxContainerRef.current, undefined, {
        className: "docx-preview-content",
        inWrapper: true,
        ignoreWidth: false,
        ignoreHeight: false,
        ignoreFonts: false,
        breakPages: true,
        ignoreLastRenderedPageBreak: false,
        experimental: true,
        trimXmlDeclaration: true,
        useBase64URL: true,
        renderHeaders: true,
        renderFooters: true,
        renderFootnotes: true,
        renderEndnotes: true,
      })

      setIsLoading(false)
      toast({
        title: "Preview Siap!",
        description: "DOCX berhasil di-render dengan format asli"
      })
    } catch (error) {
      console.error("Error rendering DOCX:", error)
      toast({
        title: "Error Preview",
        description: "Gagal menampilkan preview DOCX",
        variant: "destructive"
      })
      setIsLoading(false)
    }
  }

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
    if (!selection || selection.isCollapsed) return

    const selectedTextContent = selection.toString().trim()
    if (!selectedTextContent) return

    // Get selection position info
    const range = selection.getRangeAt(0)
    const rect = range.getBoundingClientRect()

    setSelectedText(selectedTextContent)
    setShowVariableDialog(true)
  }

  const validateVariableKey = (key: string): boolean => {
    return /^[a-zA-Z0-9_]+$/.test(key)
  }

  const handleAddVariable = () => {
    if (!newVariable.key || !newVariable.label) {
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
      startIndex: 0, // Not used in DOCX mode
      endIndex: 0    // Not used in DOCX mode
    }

    const newVariables = { ...variables, [variable.key]: variable }
    setVariables(newVariables)
    addToHistory(newVariables)

    setShowVariableDialog(false)
    setNewVariable({ key: "", label: "", type: "text" })
    setSelectedText("")

    toast({
      title: "Berhasil",
      description: `Variabel "${variable.label}" berhasil ditambahkan`
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
        {/* DOCX Preview Panel */}
        <div className="flex flex-col flex-1 border rounded-lg min-w-0 bg-white">
          <div className="flex items-center justify-between p-3 border-b bg-muted">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <h3 className="font-semibold">Preview DOCX (Format Asli)</h3>
            </div>
            <Badge variant="outline" className="text-xs">
              {editMode === 'select' ? '🖐️ Blok teks untuk jadikan variabel' : '🖱️ Kelola variabel'}
            </Badge>
          </div>
          {editMode === 'select' && (
            <div className="px-4 py-2 text-sm bg-blue-50 dark:bg-blue-950 border-b text-blue-700 dark:text-blue-300">
              💡 <strong>Cara:</strong> Seleksi/blok teks dengan mouse di preview, dialog akan muncul
            </div>
          )}
          <ScrollArea className="flex-1 p-6">
            {isLoading && (
              <div className="flex items-center justify-center py-20">
                <div className="space-y-4 text-center">
                  <div className="w-12 h-12 mx-auto border-4 border-t-4 rounded-full animate-spin border-primary border-t-transparent"></div>
                  <p className="text-muted-foreground">Memuat preview DOCX...</p>
                </div>
              </div>
            )}
            <div
              ref={docxContainerRef}
              className="docx-preview-wrapper"
              onMouseUp={handleTextSelection}
              style={{
                userSelect: editMode === 'select' ? "text" : "none",
                minHeight: '400px'
              }}
            />
          </ScrollArea>
        </div>

        {/* Variables Panel */}
        <div className="flex flex-col border rounded-lg w-80 flex-shrink-0">
          <div className="p-3 border-b bg-muted">
            <div className="flex items-center gap-2 mb-1">
              <Variable className="w-4 h-4" />
              <h3 className="font-semibold">Variabel Terdefinisi</h3>
            </div>
            <p className="text-xs text-muted-foreground">
              {Object.keys(variables).length} variabel telah didefinisikan
            </p>
          </div>
          <ScrollArea className="flex-1 p-3">
            <div className="space-y-3">
              {Object.keys(variables).length === 0 ? (
                <div className="py-8 text-sm text-center text-muted-foreground">
                  <Variable className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p className="mb-2 font-medium">Belum ada variabel</p>
                  <p className="text-xs">Blok/seleksi teks di preview untuk menambahkan variabel</p>
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
                        <p className="p-2 mt-1 text-xs rounded text-muted-foreground bg-muted line-clamp-2">
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
              Buat variabel untuk teks yang dipilih: <strong>"{selectedText.substring(0, 50)}{selectedText.length > 50 ? '...' : ''}"</strong>
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

      <style jsx global>{`
        .docx-preview-wrapper {
          font-family: 'Times New Roman', Times, serif;
        }
        .docx-preview-wrapper ::selection {
          background-color: #3b82f6;
          color: white;
        }
        .docx-preview-wrapper ::-moz-selection {
          background-color: #3b82f6;
          color: white;
        }
        .docx-preview-content {
          background: white;
          padding: 40px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
          margin: 0 auto;
        }
      `}</style>
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
