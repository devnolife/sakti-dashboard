

import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function ExamRequirementsLoading() {
  return (
    <div className="container p-4 mx-auto space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <Skeleton className="w-64 h-8 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="w-24 h-9" />
          <Skeleton className="w-24 h-9" />
        </div>
      </div>

      <Card>
        <CardHeader>
          <Skeleton className="w-48 h-6 mb-2" />
          <Skeleton className="h-4 w-72" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="w-full h-10" />
          {Array(5)
            .fill(null)
            .map((_, i) => (
              <div key={i} className="flex items-start gap-4 p-4 border rounded-xl">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="grid w-full gap-1">
                  <Skeleton className="w-48 h-5" />
                  <Skeleton className="w-full h-4" />
                </div>
              </div>
            ))}
        </CardContent>
      </Card>
    </div>
  )
}

