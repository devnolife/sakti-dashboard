"use client"

import { useState } from "react"
import Image from "next/image"
import type { Book } from "./mock-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { BookOpen } from "lucide-react"
import { BookDetailsDialog } from "./book-details-dialog"
import { SimilarityIndicator } from "./similarity-indicator"

interface BookCardProps {
  book: Book
}

export function BookCard({ book }: BookCardProps) {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <>
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <div className="relative aspect-[3/4] w-full overflow-hidden">
          <Image
            src={book.coverImage || "/placeholder.svg"}
            alt={book.title}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
          <div className="absolute right-2 top-2">
            <Badge variant={book.isAvailable ? "default" : "destructive"}>
              {book.isAvailable ? "Tersedia" : "Tidak Tersedia"}
            </Badge>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="line-clamp-2 font-semibold">{book.title}</h3>
          <p className="line-clamp-1 text-sm text-muted-foreground">{book.author}</p>
          {book.similarityPercentage && (
            <div className="mt-2">
              <SimilarityIndicator percentage={book.similarityPercentage} />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between p-4 pt-0">
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            disabled={!book.isAvailable}
            onClick={() => setShowDetails(true)}
          >
            <BookOpen className="mr-2 h-4 w-4" />
            {book.isAvailable ? "Pinjam" : "Detail"}
          </Button>
        </CardFooter>
      </Card>

      <BookDetailsDialog book={book} open={showDetails} onOpenChange={setShowDetails} />
    </>
  )
}

