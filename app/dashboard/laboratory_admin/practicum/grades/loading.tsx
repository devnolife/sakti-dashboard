import { Skeleton } from "@/components/ui/skeleton"

export default function PracticumGradesLoading() {
  return (
    <div className="p-6 space-y-6">
      <Skeleton className="h-10 w-[250px]" />
      <div className="grid gap-6 md:grid-cols-4">
        <Skeleton className="h-28 rounded-lg" />
        <Skeleton className="h-28 rounded-lg" />
        <Skeleton className="h-28 rounded-lg" />
        <Skeleton className="h-28 rounded-lg" />
      </div>
      <div className="flex items-center gap-2 mb-4">
        <Skeleton className="h-10 w-[150px]" />
        <Skeleton className="h-10 w-[100px]" />
        <Skeleton className="h-10 w-[120px] ml-auto" />
      </div>
      <Skeleton className="h-[400px] rounded-lg" />
    </div>
  )
}

