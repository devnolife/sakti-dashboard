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
import { CheckCircle, XCircle } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface ThesisApprovalDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  thesis: any
}

export function ThesisApprovalDialog({ open, onOpenChange, thesis }: ThesisApprovalDialogProps) {
  const [decision, setDecision] = useState<"approve" | "reject" | "">("")
  const [comments, setComments] = useState("")
  const [similarityThreshold, setSimilarityThreshold] = useState("20")

  const handleSubmit = () => {
    if (!decision) {
      toast({
        title: "Error",
        description: "Please select a decision (Approve or Reject).",
        variant: "destructive",
      })
      return
    }

    toast({
      title: decision === "approve" ? "Thesis Approved" : "Thesis Rejected",
      description: `The thesis "${thesis.title}" has been ${decision === "approve" ? "approved" : "rejected"}.`,
    })

    // Reset form
    setDecision("")
    setComments("")
    setSimilarityThreshold("20")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Review Thesis Submission</DialogTitle>
          <DialogDescription>Review and make a decision on the thesis title submission.</DialogDescription>
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
            <h3 className="font-medium">Similarity Score</h3>
            <p
              className={`font-medium ${
                thesis.similarityScore < 20
                  ? "text-green-600"
                  : thesis.similarityScore < 40
                    ? "text-yellow-600"
                    : "text-red-600"
              }`}
            >
              {thesis.similarityScore}%
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="similarity-threshold">Similarity Threshold</Label>
            <Select value={similarityThreshold} onValueChange={setSimilarityThreshold}>
              <SelectTrigger id="similarity-threshold">
                <SelectValue placeholder="Select threshold" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10% - Very Strict</SelectItem>
                <SelectItem value="20">20% - Strict</SelectItem>
                <SelectItem value="30">30% - Moderate</SelectItem>
                <SelectItem value="40">40% - Lenient</SelectItem>
                <SelectItem value="50">50% - Very Lenient</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Theses with similarity scores above this threshold will be flagged for review.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="decision">Decision</Label>
            <div className="flex gap-4">
              <Button
                type="button"
                variant={decision === "approve" ? "default" : "outline"}
                className={decision === "approve" ? "bg-green-600 hover:bg-green-700" : ""}
                onClick={() => setDecision("approve")}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Approve
              </Button>
              <Button
                type="button"
                variant={decision === "reject" ? "default" : "outline"}
                className={decision === "reject" ? "bg-red-600 hover:bg-red-700" : ""}
                onClick={() => setDecision("reject")}
              >
                <XCircle className="mr-2 h-4 w-4" />
                Reject
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="comments">Comments</Label>
            <Textarea
              id="comments"
              placeholder="Enter your comments or feedback about this thesis submission..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows={4}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Submit Decision</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

