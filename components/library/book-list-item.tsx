"use client"

import { useState } from "react"
import Image from "next/image"
import type { Book } from "./mock-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen } from "lucide-react"
import { BookDetailsDialog } from "./book-details-dialog"
import { SimilarityIndicator } from "./similarity-indicator"

interface BookListItemProps {
  book: Book
}

export function BookListItem({ book }: BookListItemProps) {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <>
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <CardContent className="flex flex-col p-4 sm:flex-row sm:items-center sm:gap-4">
          <div className="relative mb-4 aspect-[3/4] h-40 w-28 overflow-hidden rounded sm:mb-0">
            <Image src={book.coverImage || "/placeholder.svg"} alt={book.title} fill className="object-cover" />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold">{book.title}</h3>
                <p className="text-sm text-muted-foreground">{book.author}</p>
              </div>
              <Badge variant={book.isAvailable ? "default" : "destructive"}>
                {book.isAvailable ? "Tersedia" : "Tidak Tersedia"}
              </Badge>
            </div>

            <div className="mt-2">
              <p className="text-sm">
                <span className="font-medium">Penerbit:</span> {book.publisher}, {book.publishedYear}
              </p>
              <p className="text-sm">
                <span className="font-medium">Lokasi:</span> {book.location}
              </p>
              {book.similarityPercentage && (
                <div className="mt-2">
                  <SimilarityIndicator percentage={book.similarityPercentage} />
                </div>
              )}
            </div>

            <div className="mt-4 flex justify-end">
              <Button variant="outline" size="sm" disabled={!book.isAvailable} onClick={() => setShowDetails(true)}>
                <BookOpen className="mr-2 h-4 w-4" />
                {book.isAvailable ? "Pinjam" : "Detail"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <BookDetailsDialog book={book} open={showDetails} onOpenChange={setShowDetails} />
    </>
  )
}

