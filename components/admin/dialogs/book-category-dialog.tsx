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
import { Switch } from "@/components/ui/switch"

interface BookCategoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  category?: any | null
  onSubmit: (data: any) => void
}

export default function BookCategoryDialog({
  open,
  onOpenChange,
  category,
  onSubmit
}: BookCategoryDialogProps) {
  const [formData, setFormData] = useState({
    code: category?.code || "",
    name: category?.name || "",
    description: category?.description || "",
    isActive: category?.isActive ?? true
  })

  const isEditMode = !!category

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Book Category" : "Add New Book Category"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Update book category information"
              : "Add a new category for library books"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="code">Category Code *</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                placeholder="CS"
                required
                maxLength={10}
                disabled={isEditMode}
                className="font-mono"
              />
              <p className="text-xs text-muted-foreground">
                Short code (e.g., CS, EE, ME) - Cannot be changed after creation
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="name">Category Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Computer Science"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Books related to computer science and programming..."
                rows={3}
              />
            </div>

            <div className="flex items-center justify-between space-x-2 rounded-lg border p-3">
              <div className="space-y-0.5">
                <Label htmlFor="active">Active Status</Label>
                <p className="text-sm text-muted-foreground">
                  {formData.isActive ? "Category is active" : "Category is hidden"}
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
              {isEditMode ? "Update Category" : "Create Category"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
