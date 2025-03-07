import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-10 w-1/4" />
        <Skeleton className="h-4 w-2/3" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Skeleton className="h-32 rounded-lg" />
        <Skeleton className="h-32 rounded-lg" />
        <Skeleton className="h-32 rounded-lg" />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between">
          <Skeleton className="h-10 w-1/3" />
          <Skeleton className="h-10 w-1/4" />
        </div>
        <Skeleton className="h-[400px] rounded-lg" />
      </div>
    </div>
  )
}

