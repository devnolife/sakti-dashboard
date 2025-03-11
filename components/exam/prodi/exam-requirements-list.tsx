"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, CheckCircle, XCircle } from "lucide-react"
import { EditRequirementDialog } from "./edit-requirement-dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import type { ExamRequirement } from "../student/mock-student-exam-data"

interface ExamRequirementsListProps {
  requirements: ExamRequirement[]
  examType: string
  onUpdate: (examType: string, requirementId: string, updatedRequirement: Partial<ExamRequirement>) => void
  onDelete: (examType: string, requirementId: string) => void
}

export function ExamRequirementsList({ requirements, examType, onUpdate, onDelete }: ExamRequirementsListProps) {
  const [editingRequirement, setEditingRequirement] = useState<ExamRequirement | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [deleteRequirementId, setDeleteRequirementId] = useState<string | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const handleEdit = (requirement: ExamRequirement) => {
    setEditingRequirement(requirement)
    setIsEditDialogOpen(true)
  }

  const handleUpdate = (updatedRequirement: Partial<ExamRequirement>) => {
    if (editingRequirement) {
      onUpdate(examType, editingRequirement.id, updatedRequirement)
    }
    setIsEditDialogOpen(false)
    setEditingRequirement(null)
  }

  const handleDeleteClick = (requirementId: string) => {
    setDeleteRequirementId(requirementId)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (deleteRequirementId) {
      onDelete(examType, deleteRequirementId)
    }
    setIsDeleteDialogOpen(false)
    setDeleteRequirementId(null)
  }

  if (requirements.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-muted-foreground">Tidak ada persyaratan yang ditemukan</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {requirements.map((requirement) => (
        <div
          key={requirement.id}
          className="flex items-start gap-4 p-4 transition-colors border rounded-xl hover:bg-muted/50"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 shrink-0">
            {requirement.completed ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <XCircle className="w-5 h-5 text-red-500" />
            )}
          </div>
          <div className="grid flex-1 gap-1">
            <p className="text-sm font-medium">{requirement.title}</p>
            <p className="text-xs text-muted-foreground">{requirement.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => handleEdit(requirement)}>
              <Edit className="w-4 h-4" />
              <span className="sr-only">Edit</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={() => handleDeleteClick(requirement.id)}>
              <Trash2 className="w-4 h-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        </div>
      ))}

      {editingRequirement && (
        <EditRequirementDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          requirement={editingRequirement}
          onUpdate={handleUpdate}
        />
      )}

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Persyaratan</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus persyaratan ini? Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

