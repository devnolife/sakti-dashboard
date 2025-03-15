import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-8 w-[300px]" />
        <Skeleton className="h-4 w-[250px] mt-2" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-[120px]" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-[80px]" />
              <Skeleton className="h-4 w-[160px] mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <Skeleton className="h-5 w-[200px]" />
              <Skeleton className="h-4 w-[300px] mt-2" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-9 w-[100px]" />
              <Skeleton className="h-9 w-[150px]" />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <Skeleton className="h-10 w-full md:w-[300px]" />
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-10 w-[180px]" />
              <Skeleton className="h-10 w-[180px]" />
              <Skeleton className="h-10 w-[180px]" />
              <Skeleton className="h-10 w-[40px]" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[400px] w-full rounded-md" />
          <div className="flex items-center justify-between mt-4">
            <Skeleton className="h-4 w-[200px]" />
            <div className="flex items-center space-x-2">
              <Skeleton className="h-8 w-[100px]" />
              <Skeleton className="h-8 w-[200px]" />
              <Skeleton className="h-8 w-[100px]" />
              <Skeleton className="h-8 w-[100px]" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

