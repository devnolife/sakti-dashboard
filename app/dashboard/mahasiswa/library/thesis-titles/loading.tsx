import { Skeleton } from "@/components/ui/skeleton"

export default function ThesisTitlesLoading() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <Skeleton className="h-8 w-[250px]" />
        <Skeleton className="h-4 w-[350px]" />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Skeleton className="h-[180px] w-full rounded-xl md:col-span-2" />
        <Skeleton className="h-[180px] w-full rounded-xl" />
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Skeleton className="h-10 w-full md:w-[250px]" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-[120px]" />
          <Skeleton className="h-10 w-[120px]" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="h-[200px] w-full rounded-xl" />
          ))}
      </div>
    </div>
  )
}

