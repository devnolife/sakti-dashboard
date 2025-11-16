import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function NewCorrespondenceLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" disabled>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali
        </Button>
        <div>
          <Skeleton className="w-48 h-8 mb-2" />
          <Skeleton className="w-64 h-4" />
        </div>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader className="pb-4">
          <Skeleton className="w-56 h-6 mb-2" />
          <Skeleton className="w-96 h-4" />
        </CardHeader>
        <CardContent className="space-y-6">
          <Skeleton className="w-full h-12" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Skeleton className="w-full h-24" />
            <Skeleton className="w-full h-24" />
          </div>
          <Skeleton className="w-full h-32" />
          <Skeleton className="w-full h-12" />
        </CardContent>
      </Card>
    </div>
  )
}
