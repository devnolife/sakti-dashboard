import type { ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface PaymentStatusCardProps {
  title: string
  value: string
  description: string
  icon: ReactNode
  color: "green" | "amber" | "red" | "blue" | "primary" | "secondary" | "mint"
}

export default function PaymentStatusCard({ title, value, description, icon, color }: PaymentStatusCardProps) {
  const getColorClasses = () => {
    switch (color) {
      case "green":
        return "from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20"
      case "amber":
        return "from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20"
      case "red":
        return "from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20"
      case "blue":
        return "from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20"
      case "primary":
        return "from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20"
      case "secondary":
        return "from-secondary-50 to-secondary-100 dark:from-secondary-900/20 dark:to-secondary-800/20"
      case "mint":
        return "from-mint-50 to-mint-100 dark:from-mint-900/20 dark:to-mint-800/20"
      default:
        return "from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20"
    }
  }

  return (
    <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300">
      <div
        className={`flex flex-row items-center justify-between space-y-0 pb-2 p-6 bg-gradient-to-r ${getColorClasses()}`}
      >
        <h3 className="text-sm font-medium">{title}</h3>
        <div className="h-9 w-9 rounded-full bg-white/80 dark:bg-gray-800/50 flex items-center justify-center">
          {icon}
        </div>
      </div>
      <CardContent className="p-6 pt-4">
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  )
}

