"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { ThesisTitle } from "./mock-thesis-data"

interface ThesisTitleCardProps {
  thesis: ThesisTitle
  onClick: () => void
}

export function ThesisTitleCard({ thesis, onClick }: ThesisTitleCardProps) {
  // Get status badge color
  const getStatusColor = (status: ThesisTitle["status"]) => {
    switch (status) {
      case "approved":
        return "bg-green-500"
      case "pending":
        return "bg-yellow-500"
      case "rejected":
        return "bg-red-500"
      case "completed":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  // Format status text
  const formatStatus = (status: ThesisTitle["status"]) => {
    switch (status) {
      case "approved":
        return "Disetujui"
      case "pending":
        return "Menunggu"
      case "rejected":
        return "Ditolak"
      case "completed":
        return "Selesai"
      default:
        return status
    }
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md" onClick={onClick}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge variant="outline">{thesis.field}</Badge>
          <div className={`h-2 w-2 rounded-full ${getStatusColor(thesis.status)}`} />
        </div>
        <CardTitle className="line-clamp-2 cursor-pointer text-lg hover:text-primary">{thesis.title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="line-clamp-3 text-sm text-muted-foreground">{thesis.abstract}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-start space-y-2 pt-0">
        <div className="flex w-full items-center justify-between">
          <div className="text-sm font-medium">{thesis.student.name}</div>
          <div className="text-sm text-muted-foreground">{thesis.year}</div>
        </div>
        <div className="flex flex-wrap gap-1">
          {thesis.keywords.slice(0, 3).map((keyword, index) => (
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
      </CardFooter>
    </Card>
  )
}

