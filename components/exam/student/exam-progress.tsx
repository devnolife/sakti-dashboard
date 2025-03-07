"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import type { ExamStatus } from "@/types/exam"
import { CheckCircle, Clock, AlertCircle, Calendar, XCircle } from "lucide-react"
import type { ReactNode } from "react"

interface ExamProgressProps {
  title: string
  icon?: ReactNode
  progress: number
  status?: ExamStatus
  steps?: string
  onClick?: () => void
  colorScheme?: "blue" | "purple" | "teal" | "amber"
}

export function ExamProgress({
  title,
  icon,
  progress,
  status,
  steps,
  onClick,
  colorScheme = "blue",
}: ExamProgressProps) {
  const getColorClasses = () => {
    switch (colorScheme) {
      case "blue":
        return {
          bg: "from-blue-50 to-blue-100",
          border: "border-blue-200",
          text: "text-blue-700",
          progress: "bg-blue-500",
        }
      case "purple":
        return {
          bg: "from-purple-50 to-purple-100",
          border: "border-purple-200",
          text: "text-purple-700",
          progress: "bg-purple-500",
        }
      case "teal":
        return {
          bg: "from-teal-50 to-teal-100",
          border: "border-teal-200",
          text: "text-teal-700",
          progress: "bg-teal-500",
        }
      case "amber":
        return {
          bg: "from-amber-50 to-amber-100",
          border: "border-amber-200",
          text: "text-amber-700",
          progress: "bg-amber-500",
        }
      default:
        return {
          bg: "from-blue-50 to-blue-100",
          border: "border-blue-200",
          text: "text-blue-700",
          progress: "bg-blue-500",
        }
    }
  }

  const colors = getColorClasses()

  const getStatusBadge = (status?: string) => {
    if (!status) return null

    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Pending
          </Badge>
        )
      case "scheduled":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            Scheduled
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            Completed
          </Badge>
        )
      case "passed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            Passed
          </Badge>
        )
      case "failed":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 flex items-center gap-1">
            <XCircle className="h-3 w-3" />
            Failed
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            Not Started
          </Badge>
        )
    }
  }

  return (
    <Card
      className={`bg-gradient-to-br ${colors.bg} ${colors.border} ${onClick ? "cursor-pointer hover:shadow-md transition-all" : ""}`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className={`font-medium ${colors.text} flex items-center gap-2`}>
            {icon}
            {title}
          </h3>
          {status && getStatusBadge(status)}
        </div>
        <Progress value={progress} className={`h-2 mb-2 ${colors.progress}`} />
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <span>{steps || `${progress}% complete`}</span>
        </div>
      </CardContent>
    </Card>
  )
}

