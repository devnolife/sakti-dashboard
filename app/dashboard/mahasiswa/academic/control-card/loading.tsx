import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function ControlCardLoading() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="w-64 h-8" />
        <Skeleton className="h-4 mt-2 w-96" />
      </div>

      <div className="flex items-center justify-between">
        <Skeleton className="w-64 h-6" />
        <div className="flex gap-2">
          <Skeleton className="w-24 h-9" />
          <Skeleton className="w-24 h-9" />
        </div>
      </div>

      <Card className="border shadow-md">
        <CardContent className="space-y-6">
          <Skeleton className="w-full h-24" />

          <div className="flex flex-col items-center justify-center space-y-2">
            <Skeleton className="w-64 h-6" />
            <Skeleton className="h-6 w-80" />
          </div>

          <div className="space-y-2">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="grid grid-cols-12 gap-2">
                  <Skeleton className="h-5 col-span-2" />
                  <Skeleton className="h-5 col-span-10" />
                </div>
              ))}
          </div>

          <Skeleton className="w-full h-64" />

          <Skeleton className="w-full h-40" />

          <div className="mt-6 space-y-1 text-right">
            <Skeleton className="w-40 h-4 ml-auto" />
            <Skeleton className="w-48 h-4 ml-auto" />
            <div className="h-16"></div>
            <Skeleton className="w-40 h-4 ml-auto" />
            <Skeleton className="w-32 h-4 ml-auto" />
          </div>

          <Skeleton className="w-full h-24" />
        </CardContent>
      </Card>
    </div>
  )
}

