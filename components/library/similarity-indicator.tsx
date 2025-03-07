import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface SimilarityIndicatorProps {
  percentage: number
}

export function SimilarityIndicator({ percentage }: SimilarityIndicatorProps) {
  // Determine color based on percentage
  const getColor = () => {
    if (percentage >= 90) return "bg-green-500"
    if (percentage >= 70) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2">
            <div className="h-2 w-full rounded-full bg-gray-200">
              <div className={`h-2 rounded-full ${getColor()}`} style={{ width: `${percentage}%` }} />
            </div>
            <span className="text-xs font-medium">{percentage}%</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Persentase kesamaan dengan buku yang Anda cari</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

