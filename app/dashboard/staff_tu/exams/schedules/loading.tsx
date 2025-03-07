import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <Skeleton className="h-10 w-[250px]" />
        <div className="grid gap-4 md:grid-cols-3">
          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-28 w-full" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-[150px]" />
          <Skeleton className="h-10 w-[100px]" />
        </div>

        <div className="rounded-md border">
          <Skeleton className="h-[400px] w-full" />
        </div>
      </div>
    </div>
  )
}

