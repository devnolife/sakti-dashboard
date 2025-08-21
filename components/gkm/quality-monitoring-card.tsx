"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import { 
  ClipboardCheck, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  CheckCircle 
} from "lucide-react"

interface QualityMetric {
  id: string
  title: string
  value: number
  target: number
  status: "excellent" | "good" | "warning" | "critical"
  trend: "up" | "down" | "stable"
  lastUpdated: string
}

interface QualityMonitoringCardProps {
  metrics?: QualityMetric[]
  title: string
  icon?: any
}

// Default quality metrics for 5 engineering programs
const defaultMetrics: QualityMetric[] = [
  {
    id: "teknik-sipil",
    title: "Teknik Sipil (Pengairan)",
    value: 94,
    target: 95,
    status: "good",
    trend: "up",
    lastUpdated: "2024-01-15"
  },
  {
    id: "teknik-elektro", 
    title: "Teknik Elektro",
    value: 87,
    target: 90,
    status: "warning",
    trend: "stable",
    lastUpdated: "2024-01-14"
  },
  {
    id: "arsitektur",
    title: "Arsitektur", 
    value: 92,
    target: 93,
    status: "good",
    trend: "up",
    lastUpdated: "2024-01-16"
  },
  {
    id: "informatika",
    title: "Informatika",
    value: 85,
    target: 88,
    status: "warning",
    trend: "down",
    lastUpdated: "2024-01-13"
  },
  {
    id: "pwk",
    title: "Perencanaan Wilayah Kota",
    value: 88,
    target: 90,
    status: "good", 
    trend: "up",
    lastUpdated: "2024-01-17"
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "excellent": return "bg-green-100 text-green-800 border-green-300"
    case "good": return "bg-blue-100 text-blue-800 border-blue-300"
    case "warning": return "bg-yellow-100 text-yellow-800 border-yellow-300"
    case "critical": return "bg-red-100 text-red-800 border-red-300"
    default: return "bg-gray-100 text-gray-800 border-gray-300"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "excellent":
    case "good":
      return <CheckCircle className="w-4 h-4" />
    case "warning":
    case "critical":
      return <AlertTriangle className="w-4 h-4" />
    default:
      return <ClipboardCheck className="w-4 h-4" />
  }
}

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case "up": return <TrendingUp className="w-4 h-4 text-green-500" />
    case "down": return <TrendingDown className="w-4 h-4 text-red-500" />
    default: return <div className="w-4 h-4" />
  }
}

export default function QualityMonitoringCard({ 
  metrics = defaultMetrics, 
  title, 
  icon: Icon = ClipboardCheck 
}: QualityMonitoringCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-100">
              <Icon className="w-6 h-6 text-blue-600" />
            </div>
            <CardTitle className="text-lg font-semibold text-gray-800">
              {title}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              className="space-y-3 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-700">{metric.title}</h4>
                <div className="flex items-center gap-2">
                  {getTrendIcon(metric.trend)}
                  <Badge 
                    variant="outline" 
                    className={`${getStatusColor(metric.status)} flex items-center gap-1`}
                  >
                    {getStatusIcon(metric.status)}
                    {metric.status.charAt(0).toUpperCase() + metric.status.slice(1)}
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium">
                    {metric.value}% / {metric.target}%
                  </span>
                </div>
                <Progress 
                  value={(metric.value / metric.target) * 100} 
                  className="h-2"
                />
              </div>
              
              <div className="text-xs text-gray-500">
                Last updated: {metric.lastUpdated}
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  )
}