import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CourseCardProps {
  title: string
  instructor: string
  credits: number
  grade?: string
  attendance?: string
  variant?: "red" | "blue" | "purple" | "green" | "orange" | "amber" | "cyan"
  className?: string
  onViewDetail?: () => void
}

const variantStyles = {
  red: "bg-red-500",
  blue: "bg-blue-500",
  purple: "bg-purple-500",
  green: "bg-green-500",
  orange: "bg-orange-500",
  amber: "bg-amber-500",
  cyan: "bg-cyan-500"
}

export function CourseCard({
  title,
  instructor,
  credits,
  grade,
  attendance,
  variant = "blue",
  className,
  onViewDetail
}: CourseCardProps) {
  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 border shadow-sm hover:shadow-md group",
      className
    )}>
      <div className={cn("h-2", variantStyles[variant])} />
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-bold text-gray-900 group-hover:text-red-600 transition-colors">
          {title}
        </CardTitle>
        <CardDescription className="text-sm">
          {credits} SKS • {instructor}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {(grade || attendance) && (
          <div className="grid gap-2">
            {grade && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Nilai:</span>
                <span className="font-semibold text-gray-900">{grade}</span>
              </div>
            )}
            {attendance && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Kehadiran:</span>
                <span className="font-semibold text-gray-900">{attendance}</span>
              </div>
            )}
          </div>
        )}
        {onViewDetail && (
          <Button
            variant="outline"
            size="sm"
            className="w-full hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
            onClick={onViewDetail}
          >
            Lihat Detail
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
