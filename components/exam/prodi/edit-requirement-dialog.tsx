"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import type { ExamRequirement } from "../student/mock-student-exam-data"

interface EditRequirementDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  requirement: ExamRequirement
  onUpdate: (updatedRequirement: Partial<ExamRequirement>) => void
}

export function EditRequirementDialog({ open, onOpenChange, requirement, onUpdate }: EditRequirementDialogProps) {
  const [title, setTitle] = useState(requirement.title)
  const [description, setDescription] = useState(requirement.description)
  const [completed, setCompleted] = useState(requirement.completed)
  const [titleError, setTitleError] = useState("")
  const [descriptionError, setDescriptionError] = useState("")

  useEffect(() => {
    if (open) {
      setTitle(requirement.title)
      setDescription(requirement.description)
      setCompleted(requirement.completed)
      setTitleError("")
      setDescriptionError("")
    }
  }, [open, requirement])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate inputs
    let isValid = true

    if (!title.trim()) {
      setTitleError("Judul persyaratan wajib diisi")
      isValid = false
    } else {
      setTitleError("")
    }

    if (!description.trim()) {
      setDescriptionError("Deskripsi persyaratan wajib diisi")
      isValid = false
    } else {
      setDescriptionError("")
    }

    if (isValid) {
      onUpdate({
        title,
        description,
        completed,
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Persyaratan</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="py-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-title">Judul Persyaratan</Label>
            <Input
              id="edit-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Masukkan judul persyaratan"
            />
            {titleError && <p className="text-sm text-destructive">{titleError}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-description">Deskripsi</Label>
            <Textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Masukkan deskripsi persyaratan"
              rows={4}
            />
            {descriptionError && <p className="text-sm text-destructive">{descriptionError}</p>}
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="edit-completed"
              checked={completed}
              onCheckedChange={(checked) => setCompleted(checked as boolean)}
            />
            <Label htmlFor="edit-completed">Tandai sebagai persyaratan wajib</Label>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Batal
            </Button>
            <Button type="submit">Simpan Perubahan</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

