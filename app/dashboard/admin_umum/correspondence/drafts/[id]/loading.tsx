import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function CorrespondenceDraftDetailLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" disabled>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>
          <div>
            <Skeleton className="w-64 h-8 mb-2" />
            <Skeleton className="w-48 h-4" />
          </div>
        </div>
        <div className="flex gap-2">
          <Skeleton className="w-40 h-10" />
          <Skeleton className="w-32 h-10" />
          <Skeleton className="w-24 h-10" />
        </div>
      </div>

      <Skeleton className="w-full h-12" />

      <Card className="border-none shadow-sm">
        <CardHeader>
          <Skeleton className="w-48 h-6 mb-2" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
          </div>
          <Skeleton className="w-full h-32" />
        </CardContent>
      </Card>
    </div>
  )
}
