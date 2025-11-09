"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { X, Plus, GripVertical, FileText, Hash, Calendar, Mail, Phone, List } from "lucide-react"
import type { DynamicField, FieldType } from "@/types/correspondence"

interface DynamicFieldsBuilderProps {
  fields: DynamicField[]
  onChange: (fields: DynamicField[]) => void
}

const fieldTypeIcons: Record<FieldType, any> = {
  text: FileText,
  number: Hash,
  date: Calendar,
  email: Mail,
  phone: Phone,
  textarea: FileText,
  file: FileText,
  select: List,
}

const fieldTypeLabels: Record<FieldType, string> = {
  text: "Teks",
  number: "Angka",
  date: "Tanggal",
  email: "Email",
  phone: "Telepon",
  textarea: "Teks Panjang",
  file: "File",
  select: "Pilihan",
}

export function DynamicFieldsBuilder({ fields, onChange }: DynamicFieldsBuilderProps) {
  const [expandedField, setExpandedField] = useState<string | null>(null)

  const addField = () => {
    const newField: DynamicField = {
      id: `field-${Date.now()}`,
      label: "",
      type: "text",
      required: false,
    }
    onChange([...fields, newField])
    setExpandedField(newField.id)
  }

  const removeField = (id: string) => {
    onChange(fields.filter(f => f.id !== id))
    if (expandedField === id) {
      setExpandedField(null)
    }
  }

  const updateField = (id: string, updates: Partial<DynamicField>) => {
    onChange(fields.map(f => f.id === id ? { ...f, ...updates } : f))
  }

  const moveField = (id: string, direction: "up" | "down") => {
    const index = fields.findIndex(f => f.id === id)
    if (index === -1) return
    if (direction === "up" && index === 0) return
    if (direction === "down" && index === fields.length - 1) return

    const newFields = [...fields]
    const targetIndex = direction === "up" ? index - 1 : index + 1
      ;[newFields[index], newFields[targetIndex]] = [newFields[targetIndex], newFields[index]]
    onChange(newFields)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <Label className="text-base font-semibold">Field Dinamis</Label>
          <p className="text-sm text-muted-foreground mt-1">
            Field yang akan diisi oleh mahasiswa saat mengajukan surat
          </p>
        </div>
        <Button type="button" onClick={addField} size="sm" variant="outline">
          <Plus className="w-4 h-4 mr-2" />
          Tambah Field
        </Button>
      </div>

      {fields.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="py-8 text-center text-muted-foreground">
            <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>Belum ada field dinamis</p>
            <p className="text-sm">Klik "Tambah Field" untuk menambahkan field</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {fields.map((field, index) => {
            const Icon = fieldTypeIcons[field.type]
            const isExpanded = expandedField === field.id

            return (
              <Card key={field.id} className={isExpanded ? "border-primary" : ""}>
                <CardHeader className="py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col gap-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-4 px-1"
                        onClick={() => moveField(field.id, "up")}
                        disabled={index === 0}
                      >
                        <GripVertical className="w-3 h-3" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-4 px-1"
                        onClick={() => moveField(field.id, "down")}
                        disabled={index === fields.length - 1}
                      >
                        <GripVertical className="w-3 h-3" />
                      </Button>
                    </div>

                    <Icon className="w-4 h-4 text-muted-foreground" />

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {field.label || "Field tanpa label"}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {fieldTypeLabels[field.type]}
                        </Badge>
                        {field.required && (
                          <Badge variant="destructive" className="text-xs">Wajib</Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setExpandedField(isExpanded ? null : field.id)}
                      >
                        {isExpanded ? "Tutup" : "Edit"}
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeField(field.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {isExpanded && (
                  <CardContent className="space-y-4 pt-0">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Label Field *</Label>
                        <Input
                          value={field.label}
                          onChange={(e) => updateField(field.id, { label: e.target.value })}
                          placeholder="Contoh: Nama Perusahaan"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Tipe Field *</Label>
                        <Select
                          value={field.type}
                          onValueChange={(value: FieldType) => updateField(field.id, { type: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="text">Teks</SelectItem>
                            <SelectItem value="number">Angka</SelectItem>
                            <SelectItem value="date">Tanggal</SelectItem>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="phone">Telepon</SelectItem>
                            <SelectItem value="textarea">Teks Panjang</SelectItem>
                            <SelectItem value="file">File</SelectItem>
                            <SelectItem value="select">Pilihan</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Placeholder (Opsional)</Label>
                      <Input
                        value={field.placeholder || ""}
                        onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
                        placeholder="Contoh: Masukkan nama perusahaan"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Teks Bantuan (Opsional)</Label>
                      <Input
                        value={field.helpText || ""}
                        onChange={(e) => updateField(field.id, { helpText: e.target.value })}
                        placeholder="Contoh: Nama lengkap perusahaan tempat magang"
                      />
                    </div>

                    {field.type === "select" && (
                      <div className="space-y-2">
                        <Label>Pilihan (pisahkan dengan koma)</Label>
                        <Textarea
                          value={field.options?.join(", ") || ""}
                          onChange={(e) => updateField(field.id, {
                            options: e.target.value.split(",").map(o => o.trim()).filter(Boolean)
                          })}
                          placeholder="Contoh: Jakarta, Bandung, Surabaya"
                          rows={3}
                        />
                      </div>
                    )}

                    {field.type === "file" && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Tipe File yang Diizinkan (pisahkan dengan koma)</Label>
                          <Input
                            value={field.validation?.fileTypes?.join(", ") || ""}
                            onChange={(e) => updateField(field.id, {
                              validation: {
                                ...field.validation,
                                fileTypes: e.target.value.split(",").map(t => t.trim()).filter(Boolean)
                              }
                            })}
                            placeholder="Contoh: pdf, jpg, png"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Ukuran Maksimal File (MB)</Label>
                          <Input
                            type="number"
                            value={field.validation?.maxFileSize || ""}
                            onChange={(e) => updateField(field.id, {
                              validation: {
                                ...field.validation,
                                maxFileSize: parseInt(e.target.value) || undefined
                              }
                            })}
                            placeholder="5"
                            min={1}
                            max={50}
                          />
                        </div>
                      </div>
                    )}

                    {(field.type === "number" || field.type === "text" || field.type === "textarea") && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Nilai Minimum (Opsional)</Label>
                          <Input
                            type="number"
                            value={field.validation?.min || ""}
                            onChange={(e) => updateField(field.id, {
                              validation: {
                                ...field.validation,
                                min: parseInt(e.target.value) || undefined
                              }
                            })}
                            placeholder="0"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Nilai Maksimum (Opsional)</Label>
                          <Input
                            type="number"
                            value={field.validation?.max || ""}
                            onChange={(e) => updateField(field.id, {
                              validation: {
                                ...field.validation,
                                max: parseInt(e.target.value) || undefined
                              }
                            })}
                            placeholder="100"
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`required-${field.id}`}
                        checked={field.required}
                        onCheckedChange={(checked) => updateField(field.id, { required: !!checked })}
                      />
                      <Label htmlFor={`required-${field.id}`} className="cursor-pointer">
                        Field ini wajib diisi
                      </Label>
                    </div>
                  </CardContent>
                )}
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
