"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RotateCcw } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface ThesisRestoreDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  thesis: any
}

export function ThesisRestoreDialog({ open, onOpenChange, thesis }: ThesisRestoreDialogProps) {
  const [status, setStatus] = useState<"approved" | "pending">("approved")
  const [notes, setNotes] = useState("")

  const handleRestore = () => {
    toast({
      title: "Thesis Restored",
      description: `The thesis "${thesis.title}" has been restored with ${status} status.`,
    })

    // Reset form
    setStatus("approved")
    setNotes("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Restore Archived Thesis</DialogTitle>
          <DialogDescription>Restore this thesis from the archive to the active collection.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <h3 className="font-medium">Thesis Title</h3>
            <p>{thesis.title}</p>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Author</h3>
            <p>
              {thesis.author.name} ({thesis.author.nim})
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Department</h3>
            <p>{thesis.department}</p>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Year</h3>
            <p>{thesis.year}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Restore Status</Label>
            <Select value={status} onValueChange={(value: "approved" | "pending") => setStatus(value)}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending Review</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Choose whether to restore this thesis as approved or pending review.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Restoration Notes</Label>
            <Textarea
              id="notes"
              placeholder="Enter any notes about restoring this thesis..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleRestore}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Restore Thesis
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

