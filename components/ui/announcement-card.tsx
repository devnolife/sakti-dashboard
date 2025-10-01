import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface AnnouncementCardProps {
  title: string
  description: string
  date: string
  badge?: {
    label: string
    variant: "urgent" | "warning" | "info" | "success"
  }
  className?: string
  onClick?: () => void
}

const badgeStyles = {
  urgent: "bg-red-50 border-red-200 text-red-600",
  warning: "bg-amber-50 border-amber-200 text-amber-600",
  info: "bg-blue-50 border-blue-200 text-blue-600",
  success: "bg-green-50 border-green-200 text-green-600"
}

export function AnnouncementCard({
  title,
  description,
  date,
  badge,
  className,
  onClick
}: AnnouncementCardProps) {
  return (
    <div
      className={cn(
        "p-4 border rounded-xl bg-white hover:bg-gray-50 border-gray-200 transition-all duration-200 hover:shadow-md cursor-pointer group",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center gap-2 mb-2">
        {badge && (
          <Badge
            variant="outline"
            className={cn("text-xs font-semibold", badgeStyles[badge.variant])}
          >
            {badge.label}
          </Badge>
        )}
        <p className="text-xs text-gray-500">{date}</p>
      </div>
      <p className="font-semibold text-gray-900 mb-1">{title}</p>
      <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
    </div>
  )
}
