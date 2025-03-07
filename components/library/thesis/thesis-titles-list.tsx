"use client"

import { useState } from "react"
import type { ThesisTitle } from "./mock-thesis-data"
import { ThesisTitleCard } from "./thesis-title-card"
import { ThesisDetailsDialog } from "./thesis-details-dialog"

interface ThesisTitlesListProps {
  theses: ThesisTitle[]
}

export function ThesisTitlesList({ theses }: ThesisTitlesListProps) {
  const [selectedThesis, setSelectedThesis] = useState<ThesisTitle | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleThesisClick = (thesis: ThesisTitle) => {
    setSelectedThesis(thesis)
    setDialogOpen(true)
  }

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {theses.map((thesis) => (
          <ThesisTitleCard key={thesis.id} thesis={thesis} onClick={() => handleThesisClick(thesis)} />
        ))}
      </div>

      {selectedThesis && <ThesisDetailsDialog thesis={selectedThesis} open={dialogOpen} onOpenChange={setDialogOpen} />}
    </div>
  )
}

