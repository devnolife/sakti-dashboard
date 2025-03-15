import { Skeleton } from "@/components/ui/skeleton"

export default function BookCategoriesLoading() {
  return (
    <div className="container mx-auto py-6">
      <Skeleton className="h-8 w-64 mb-6" />
      <div className="grid gap-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-10 w-32" />
        </div>
        <Skeleton className="h-[400px] w-full rounded-md" />
      </div>
    </div>
  )
}

