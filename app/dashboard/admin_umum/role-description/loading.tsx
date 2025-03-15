import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function StaffUmumRoleDescriptionLoading() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-10 w-[350px]" />
        <Skeleton className="h-4 w-[450px] mt-2" />
      </div>

      <Card className="border-none shadow-md">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5">
          <Skeleton className="h-8 w-[300px] mb-2" />
          <Skeleton className="h-4 w-[400px]" />
        </CardHeader>
        <CardContent className="pt-6">
          <Skeleton className="h-10 w-[300px] mb-6" />

          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <Card>
                <CardHeader className="pb-2">
                  <Skeleton className="h-6 w-[200px]" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <Skeleton className="h-6 w-[200px]" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6">
              <Card>
                <CardHeader className="pb-2">
                  <Skeleton className="h-6 w-[250px]" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

