"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { AlertTriangle } from "lucide-react"
import type { BookCategory } from "@/types/book"

interface DeleteCategoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  category: BookCategory
  onDelete: (categoryId: string) => void
}

export function DeleteCategoryDialog({ open, onOpenChange, category, onDelete }: DeleteCategoryDialogProps) {
  const handleDelete = () => {
    onDelete(category.id)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Hapus Kategori
          </DialogTitle>
          <DialogDescription>Apakah Anda yakin ingin menghapus kategori &quot;{category.name}&quot;?</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {category.bookCount > 0 ? (
            <div className="text-sm text-destructive bg-destructive/10 p-4 rounded-md">
              <p className="font-semibold">Kategori ini tidak dapat dihapus!</p>
              <p className="mt-1">
                Kategori ini memiliki {category.bookCount} buku terkait. Anda harus memindahkan atau menghapus buku-buku
                tersebut terlebih dahulu.
              </p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Tindakan ini tidak dapat dibatalkan. Kategori akan dihapus secara permanen dari sistem.
            </p>
          )}
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Batal
          </Button>
          <Button type="button" variant="destructive" onClick={handleDelete} disabled={category.bookCount > 0}>
            Hapus Kategori
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

