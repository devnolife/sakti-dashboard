import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-72 mt-2" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-9" />
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-9 w-9" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 space-y-6">
          <Skeleton className="h-[300px] w-full" />
          <Skeleton className="h-[400px] w-full" />
          <Skeleton className="h-[350px] w-full" />
        </div>

        <div className="md:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <Skeleton className="h-10 w-40" />
            <Skeleton className="h-9 w-36" />
          </div>
          <Skeleton className="h-[600px] w-full" />
        </div>
      </div>
    </div>
  )
}

