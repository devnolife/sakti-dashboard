"use client"

import { useState } from "react"
import type { SimilarityResult } from "./title-submission-dashboard"
import { SimilarityIndicator } from "../similarity-indicator"
import { ThesisDetailsDialog } from "./thesis-details-dialog"
import { Badge } from "@/components/ui/badge"

interface RelatedThesisListProps {
  similarTheses: SimilarityResult["similarTheses"]
  selectedThesisId: string | null
  onThesisSelect: (id: string | null) => void
}

export function RelatedThesisList({ similarTheses, selectedThesisId, onThesisSelect }: RelatedThesisListProps) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedThesis, setSelectedThesis] = useState<(typeof similarTheses)[0]["thesis"] | null>(null)

  const handleThesisClick = (thesis: (typeof similarTheses)[0]["thesis"]) => {
    setSelectedThesis(thesis)
    setDialogOpen(true)
  }

  return (
    <div className="space-y-2">
      {similarTheses.map(({ thesis, similarityScore }) => (
        <div
          key={thesis.id}
          className={`cursor-pointer rounded-lg border p-3 transition-all hover:bg-accent ${
            selectedThesisId === thesis.id ? "border-primary bg-accent" : ""
          }`}
          onClick={() => onThesisSelect(thesis.id === selectedThesisId ? null : thesis.id)}
        >
          <div className="mb-2 flex items-center justify-between">
            <Badge variant="outline">{thesis.field}</Badge>
            <div className="text-xs text-muted-foreground">{thesis.year}</div>
          </div>
          <h4
            className="mb-1 line-clamp-2 text-sm font-medium hover:underline"
            onClick={(e) => {
              e.stopPropagation()
              handleThesisClick(thesis)
            }}
          >
            {thesis.title}
          </h4>
          <div className="mt-2">
            <SimilarityIndicator percentage={similarityScore} />
          </div>
        </div>
      ))}

      {selectedThesis && <ThesisDetailsDialog thesis={selectedThesis} open={dialogOpen} onOpenChange={setDialogOpen} />}
    </div>
  )
}

