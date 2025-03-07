import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function ControlCardLoading() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96 mt-2" />
      </div>

      <div className="flex justify-between items-center">
        <Skeleton className="h-6 w-64" />
        <div className="flex gap-2">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-24" />
        </div>
      </div>

      <Card className="border shadow-md">
        <CardContent className="p-6 space-y-6">
          <Skeleton className="h-24 w-full" />

          <div className="flex flex-col items-center justify-center space-y-2">
            <Skeleton className="h-6 w-64" />
            <Skeleton className="h-6 w-80" />
          </div>

          <div className="space-y-2">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="grid grid-cols-12 gap-2">
                  <Skeleton className="col-span-2 h-5" />
                  <Skeleton className="col-span-10 h-5" />
                </div>
              ))}
          </div>

          <Skeleton className="h-64 w-full" />

          <Skeleton className="h-40 w-full" />

          <div className="text-right space-y-1 mt-6">
            <Skeleton className="h-4 w-40 ml-auto" />
            <Skeleton className="h-4 w-48 ml-auto" />
            <div className="h-16"></div>
            <Skeleton className="h-4 w-40 ml-auto" />
            <Skeleton className="h-4 w-32 ml-auto" />
          </div>

          <Skeleton className="h-24 w-full" />
        </CardContent>
      </Card>
    </div>
  )
}

