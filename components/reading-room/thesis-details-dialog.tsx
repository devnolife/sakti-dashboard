"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Download, ExternalLink } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface ThesisDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  thesis: any
}

export function ThesisDetailsDialog({ open, onOpenChange, thesis }: ThesisDetailsDialogProps) {
  const handleDownload = () => {
    toast({
      title: "Downloading Thesis Document",
      description: `Downloading "${thesis.title}" document.`,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Thesis Details</DialogTitle>
          <DialogDescription>Detailed information about the thesis document</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <h3 className="text-sm text-muted-foreground">Title</h3>
            <p className="text-lg font-medium">{thesis.title}</p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={thesis.author.avatarUrl} alt={thesis.author.name} />
                <AvatarFallback>{thesis.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{thesis.author.name}</p>
                <p className="text-sm text-muted-foreground">{thesis.author.nim}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">{thesis.department}</Badge>
              <Badge variant="outline">{thesis.year}</Badge>
              {thesis.status && (
                <Badge
                  variant="outline"
                  className={
                    thesis.status === "approved"
                      ? "bg-green-50 text-green-700 border-green-200"
                      : thesis.status === "pending"
                        ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                        : thesis.status === "rejected"
                          ? "bg-red-50 text-red-700 border-red-200"
                          : "bg-blue-50 text-blue-700 border-blue-200"
                  }
                >
                  {thesis.status.charAt(0).toUpperCase() + thesis.status.slice(1)}
                </Badge>
              )}
              {thesis.digitalCopy && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  Digital Copy
                </Badge>
              )}
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Abstract</h3>
            <p className="text-sm">{thesis.abstract}</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Keywords</h3>
            <div className="flex flex-wrap gap-2">
              {thesis.keywords.map((keyword: string, index: number) => (
                <Badge key={index} variant="secondary">
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>

          {thesis.supervisor && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Supervisor</h3>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={thesis.supervisor.avatarUrl} alt={thesis.supervisor.name} />
                  <AvatarFallback>{thesis.supervisor.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{thesis.supervisor.name}</p>
                  <p className="text-sm text-muted-foreground">{thesis.supervisor.department}</p>
                </div>
              </div>
            </div>
          )}

          {thesis.similarityScore !== undefined && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Similarity Score</h3>
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
          )}

          {thesis.reviewHistory && thesis.reviewHistory.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Review History</h3>
              <div className="space-y-2">
                {thesis.reviewHistory.map((review: any, index: number) => (
                  <div key={index} className="border rounded-md p-3">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium">
                        {review.reviewer} - {review.action}
                      </p>
                      <p className="text-sm text-muted-foreground">{review.date}</p>
                    </div>
                    {review.comments && <p className="text-sm mt-1">{review.comments}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {thesis.archiveInfo && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Archive Information</h3>
              <div className="border rounded-md p-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Archive Date</p>
                    <p className="text-sm">{thesis.archiveInfo.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Archive Location</p>
                    <p className="text-sm">{thesis.archiveInfo.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Physical Copy ID</p>
                    <p className="text-sm">{thesis.archiveInfo.physicalId || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Digital Copy ID</p>
                    <p className="text-sm">{thesis.archiveInfo.digitalId || "N/A"}</p>
                  </div>
                </div>
                {thesis.archiveInfo.notes && (
                  <div className="mt-2">
                    <p className="text-sm text-muted-foreground">Notes</p>
                    <p className="text-sm">{thesis.archiveInfo.notes}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          {thesis.digitalCopy && (
            <Button variant="outline" onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          )}
          {thesis.externalLink && (
            <Button variant="outline" asChild>
              <a href={thesis.externalLink} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                View External
              </a>
            </Button>
          )}
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

