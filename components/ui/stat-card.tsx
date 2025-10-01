import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  trend?: {
    value: string
    label: string
    type: "increase" | "decrease" | "neutral"
  }
  variant?: "red" | "blue" | "purple" | "green" | "orange" | "amber" | "cyan"
  className?: string
}

const variantStyles = {
  red: {
    header: "bg-gradient-to-r from-red-50 to-red-100/50",
    iconBg: "bg-red-500/10",
    iconColor: "text-red-600",
    trendBg: "bg-red-50 border-red-200 text-red-600"
  },
  blue: {
    header: "bg-gradient-to-r from-blue-50 to-blue-100/50",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-600",
    trendBg: "bg-blue-50 border-blue-200 text-blue-600"
  },
  purple: {
    header: "bg-gradient-to-r from-purple-50 to-purple-100/50",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-600",
    trendBg: "bg-purple-50 border-purple-200 text-purple-600"
  },
  green: {
    header: "bg-gradient-to-r from-green-50 to-green-100/50",
    iconBg: "bg-green-500/10",
    iconColor: "text-green-600",
    trendBg: "bg-green-50 border-green-200 text-green-600"
  },
  orange: {
    header: "bg-gradient-to-r from-orange-50 to-orange-100/50",
    iconBg: "bg-orange-500/10",
    iconColor: "text-orange-600",
    trendBg: "bg-orange-50 border-orange-200 text-orange-600"
  },
  amber: {
    header: "bg-gradient-to-r from-amber-50 to-amber-100/50",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-600",
    trendBg: "bg-amber-50 border-amber-200 text-amber-600"
  },
  cyan: {
    header: "bg-gradient-to-r from-cyan-50 to-cyan-100/50",
    iconBg: "bg-cyan-500/10",
    iconColor: "text-cyan-600",
    trendBg: "bg-cyan-50 border-cyan-200 text-cyan-600"
  }
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = "blue",
  className
}: StatCardProps) {
  const styles = variantStyles[variant]

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 border-none shadow-md hover:shadow-lg",
      className
    )}>
      <CardHeader className={cn(
        "flex flex-row items-center justify-between pb-2 space-y-0",
        styles.header
      )}>
        <CardTitle className="text-sm font-semibold text-gray-700">{title}</CardTitle>
        <div className={cn(
          "flex items-center justify-center rounded-xl h-10 w-10 shadow-sm",
          styles.iconBg
        )}>
          <Icon className={cn("w-5 h-5", styles.iconColor)} />
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="text-3xl font-bold text-gray-900">{value}</div>
        {subtitle && (
          <div className="mt-1 text-xs text-gray-600">{subtitle}</div>
        )}
        {trend && (
          <div className="flex items-center mt-3">
            <Badge
              variant="outline"
              className={cn("text-xs font-semibold", styles.trendBg)}
            >
              {trend.type === "increase" && "↑ "}
              {trend.type === "decrease" && "↓ "}
              {trend.value} {trend.label}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
