"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface AddRequirementDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  examType: string
  onAdd: (examType: string, requirement: { title: string; description: string }) => void
}

export function AddRequirementDialog({ open, onOpenChange, examType, onAdd }: AddRequirementDialogProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [titleError, setTitleError] = useState("")
  const [descriptionError, setDescriptionError] = useState("")

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
      onAdd(examType, { title, description })
      setTitle("")
      setDescription("")
    }
  }

  const handleClose = () => {
    setTitle("")
    setDescription("")
    setTitleError("")
    setDescriptionError("")
    onOpenChange(false)
  }

  const examTypeLabels = {
    proposal: "Proposal",
    result: "Hasil",
    closing: "Sidang",
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Tambah Persyaratan Ujian {examTypeLabels[examType]}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="py-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Judul Persyaratan</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Masukkan judul persyaratan"
            />
            {titleError && <p className="text-sm text-destructive">{titleError}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Masukkan deskripsi persyaratan"
              rows={4}
            />
            {descriptionError && <p className="text-sm text-destructive">{descriptionError}</p>}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Batal
            </Button>
            <Button type="submit">Tambah</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

