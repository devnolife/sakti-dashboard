import { Skeleton } from "@/components/ui/skeleton"

export default function ExamSubmissionsLoading() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-10 w-[250px]" />
        <Skeleton className="h-4 w-[300px]" />
      </div>

      <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-lg" />
          ))}
      </div>
    </div>
  )
}

