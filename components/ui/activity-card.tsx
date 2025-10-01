import { Badge } from "@/components/ui/badge"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface ActivityCardProps {
  title: string
  subtitle: string
  icon: LucideIcon
  badge?: {
    label: string
    variant: "urgent" | "warning" | "info" | "success"
  }
  variant?: "red" | "blue" | "purple" | "green" | "orange" | "amber" | "cyan"
  className?: string
  onClick?: () => void
}

const variantStyles = {
  red: {
    iconBg: "bg-red-500/10",
    iconColor: "text-red-600"
  },
  blue: {
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-600"
  },
  purple: {
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-600"
  },
  green: {
    iconBg: "bg-green-500/10",
    iconColor: "text-green-600"
  },
  orange: {
    iconBg: "bg-orange-500/10",
    iconColor: "text-orange-600"
  },
  amber: {
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-600"
  },
  cyan: {
    iconBg: "bg-cyan-500/10",
    iconColor: "text-cyan-600"
  }
}

const badgeStyles = {
  urgent: "bg-red-50 border-red-200 text-red-600",
  warning: "bg-amber-50 border-amber-200 text-amber-600",
  info: "bg-blue-50 border-blue-200 text-blue-600",
  success: "bg-green-50 border-green-200 text-green-600"
}

export function ActivityCard({
  title,
  subtitle,
  icon: Icon,
  badge,
  variant = "blue",
  className,
  onClick
}: ActivityCardProps) {
  const styles = variantStyles[variant]

  return (
    <div
      className={cn(
        "flex items-center gap-4 p-4 border rounded-xl bg-white hover:bg-gray-50 border-gray-200 transition-all duration-200 hover:shadow-md cursor-pointer group",
        className
      )}
      onClick={onClick}
    >
      <div className={cn(
        "flex items-center justify-center w-12 h-12 rounded-xl shadow-sm transition-transform duration-200 group-hover:scale-110",
        styles.iconBg
      )}>
        <Icon className={cn("w-6 h-6", styles.iconColor)} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-900 truncate">{title}</p>
        <p className="text-sm text-gray-600 truncate">{subtitle}</p>
      </div>
      {badge && (
        <Badge
          variant="outline"
          className={cn("text-xs font-semibold whitespace-nowrap", badgeStyles[badge.variant])}
        >
          {badge.label}
        </Badge>
      )}
    </div>
  )
}
