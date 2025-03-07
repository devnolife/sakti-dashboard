import { Skeleton } from "@/components/ui/skeleton"

export default function TitleSubmissionLoading() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <Skeleton className="h-8 w-[300px]" />
        <Skeleton className="h-4 w-[400px]" />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-4 md:col-span-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <div className="flex justify-end">
            <Skeleton className="h-10 w-[120px]" />
          </div>
        </div>
        <div className="space-y-4">
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-[400px] w-full rounded-xl" />
        </div>
      </div>
    </div>
  )
}

