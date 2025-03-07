import { Skeleton } from "@/components/ui/skeleton"

export default function ExamRegistrationLoading() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-10 w-[250px]" />
        <Skeleton className="h-4 w-[300px]" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="h-[220px] rounded-xl" />
          ))}
      </div>

      <Skeleton className="h-[400px] rounded-xl" />
    </div>
  )
}

