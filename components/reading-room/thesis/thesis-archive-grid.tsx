"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Download, Eye, RotateCcw } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface ThesisArchiveGridProps {
  theses: any[]
  onViewDetails: (thesis: any) => void
  onRestore: (thesis: any) => void
}

export function ThesisArchiveGrid({ theses, onViewDetails, onRestore }: ThesisArchiveGridProps) {
  const [page, setPage] = useState(1)
  const itemsPerPage = 9
  const totalPages = Math.ceil(theses.length / itemsPerPage)
  const startIndex = (page - 1) * itemsPerPage
  const paginatedTheses = theses.slice(startIndex, startIndex + itemsPerPage)

  const handleDownload = (thesis: any) => {
    toast({
      title: "Downloading Thesis Document",
      description: `Downloading "${thesis.title}" document.`,
    })
  }

  if (theses.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No archived theses found</h3>
        <p className="text-muted-foreground mt-2">Try adjusting your search or filter criteria</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginatedTheses.map((thesis) => (
          <Card key={thesis.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  {thesis.year}
                </Badge>
                {thesis.digitalCopy && (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Digital Copy
                  </Badge>
                )}
              </div>
              <CardTitle className="line-clamp-2 text-base mt-2">{thesis.title}</CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center gap-2 mb-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={thesis.author.avatarUrl} alt={thesis.author.name} />
                  <AvatarFallback>{thesis.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-sm">{thesis.author.name}</span>
              </div>
              <div className="flex flex-wrap gap-1 mb-2">
                {thesis.keywords.slice(0, 3).map((keyword: string, index: number) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {keyword}
                  </Badge>
                ))}
                {thesis.keywords.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{thesis.keywords.length - 3}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">{thesis.abstract}</p>
            </CardContent>
            <CardFooter className="flex justify-between pt-2">
              <Button variant="ghost" size="sm" onClick={() => onViewDetails(thesis)}>
                <Eye className="h-4 w-4 mr-1" /> Details
              </Button>
              <div className="flex gap-1">
                {thesis.digitalCopy && (
                  <Button variant="ghost" size="sm" onClick={() => handleDownload(thesis)}>
                    <Download className="h-4 w-4" />
                    <span className="sr-only">Download</span>
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={() => onRestore(thesis)}>
                  <RotateCcw className="h-4 w-4" />
                  <span className="sr-only">Restore</span>
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, theses.length)} of {theses.length} entries
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => setPage(page - 1)} disabled={page === 1}>
              Previous
            </Button>
            <Button variant="outline" size="sm" onClick={() => setPage(page + 1)} disabled={page === totalPages}>
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

