import { Skeleton } from "@/components/ui/skeleton"

export default function AIKKomfrenCompletionLoading() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col">
        <Skeleton className="h-10 w-[300px]" />
        <Skeleton className="h-4 w-[400px] mt-2" />
      </div>

      <Skeleton className="h-[200px] rounded-xl" />
      <Skeleton className="h-[500px] rounded-xl" />
    </div>
  )
}

