"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

interface LetterTypeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  letterType?: any | null
  onSubmit: (data: any) => void
}

export default function LetterTypeDialog({
  open,
  onOpenChange,
  letterType,
  onSubmit
}: LetterTypeDialogProps) {
  const [formData, setFormData] = useState({
    title: letterType?.title || "",
    description: letterType?.description || "",
    approvalRole: letterType?.approvalRole || "staff_tu",
    estimatedDays: letterType?.estimatedDays || 3,
    requiredDocuments: letterType?.requiredDocuments?.join(", ") || "",
    template: letterType?.template || "",
    isActive: letterType?.isActive ?? true
  })

  const isEditMode = !!letterType

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Convert requiredDocuments string to array
    const data = {
      ...formData,
      requiredDocuments: formData.requiredDocuments
        .split(",")
        .map(doc => doc.trim())
        .filter(doc => doc.length > 0)
    }

    onSubmit(data)
    onOpenChange(false)
  }

  const approvalRoles = [
    { value: "staff_tu", label: "Staff TU" },
    { value: "prodi", label: "Prodi" },
    { value: "dekan", label: "Dekan" },
    { value: "none", label: "No Approval Required" },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Letter Type" : "Add New Letter Type"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Update letter type configuration"
              : "Add a new type of letter that students can request"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Letter Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Surat Keterangan Aktif Kuliah"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Certificate stating that the student is actively enrolled..."
                rows={3}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="approvalRole">Approval Required *</Label>
                <Select
                  value={formData.approvalRole}
                  onValueChange={(value) => setFormData({ ...formData, approvalRole: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select approver" />
                  </SelectTrigger>
                  <SelectContent>
                    {approvalRoles.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="estimatedDays">Processing Days *</Label>
                <Input
                  id="estimatedDays"
                  type="number"
                  min="1"
                  max="30"
                  value={formData.estimatedDays}
                  onChange={(e) => setFormData({ ...formData, estimatedDays: parseInt(e.target.value) })}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Estimated processing time
                </p>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="requiredDocuments">Required Documents</Label>
              <Input
                id="requiredDocuments"
                value={formData.requiredDocuments}
                onChange={(e) => setFormData({ ...formData, requiredDocuments: e.target.value })}
                placeholder="KTM, Transkrip Nilai, KRS"
              />
              <p className="text-xs text-muted-foreground">
                Comma-separated list of required documents
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="template">Letter Template (Optional)</Label>
              <Textarea
                id="template"
                value={formData.template}
                onChange={(e) => setFormData({ ...formData, template: e.target.value })}
                placeholder="Template will be managed separately..."
                rows={4}
                className="font-mono text-xs"
              />
              <p className="text-xs text-muted-foreground">
                Letter template with placeholders
              </p>
            </div>

            <div className="flex items-center justify-between space-x-2 rounded-lg border p-3">
              <div className="space-y-0.5">
                <Label htmlFor="active">Active Status</Label>
                <p className="text-sm text-muted-foreground">
                  {formData.isActive ? "Available for requests" : "Not available"}
                </p>
              </div>
              <Switch
                id="active"
                checked={formData.isActive}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isActive: checked })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {isEditMode ? "Update Letter Type" : "Create Letter Type"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
