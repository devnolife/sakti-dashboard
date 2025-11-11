"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Send, FileText, Clock, AlertCircle, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"
import { getWorkflowHistory } from "@/app/actions/correspondence/workflow"

interface WorkflowTimelineProps {
  requestId: string
  className?: string
}

interface WorkflowEvent {
  id: string
  action: string
  actor_id: string
  actor_role: string
  notes: string | null
  created_at: Date
}

const ACTION_CONFIG = {
  submitted: {
    icon: FileText,
    label: "Diajukan",
    color: "text-blue-500",
    bgColor: "bg-blue-100",
  },
  reviewed: {
    icon: Clock,
    label: "Direview",
    color: "text-yellow-500",
    bgColor: "bg-yellow-100",
  },
  forwarded: {
    icon: Send,
    label: "Diteruskan",
    color: "text-purple-500",
    bgColor: "bg-purple-100",
  },
  approved: {
    icon: CheckCircle,
    label: "Disetujui",
    color: "text-green-500",
    bgColor: "bg-green-100",
  },
  rejected: {
    icon: XCircle,
    label: "Ditolak",
    color: "text-red-500",
    bgColor: "bg-red-100",
  },
  returned: {
    icon: RotateCcw,
    label: "Dikembalikan",
    color: "text-orange-500",
    bgColor: "bg-orange-100",
  },
  completed: {
    icon: CheckCircle,
    label: "Selesai",
    color: "text-green-600",
    bgColor: "bg-green-200",
  },
}

const ROLE_LABELS: Record<string, string> = {
  student: "Mahasiswa",
  admin_umum: "Admin Umum",
  staff_tu: "Staff TU",
  wd1: "Wakil Dekan 1",
  wd2: "Wakil Dekan 2",
  wd3: "Wakil Dekan 3",
  prodi: "Program Studi",
  dekan: "Dekan",
}

export function WorkflowTimeline({ requestId, className }: WorkflowTimelineProps) {
  const [history, setHistory] = useState<WorkflowEvent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchHistory()
  }, [requestId])

  async function fetchHistory() {
    try {
      setLoading(true)
      const data = await getWorkflowHistory(requestId)
      setHistory(data)
    } catch (error) {
      console.error('Error fetching workflow history:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="text-base">Riwayat Workflow</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-gray-200" />
                <div className="flex-1 space-y-2">
                  <div className="w-1/2 h-4 bg-gray-200 rounded" />
                  <div className="w-3/4 h-3 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (history.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="text-base">Riwayat Workflow</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="py-8 text-center text-muted-foreground">
            <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Belum ada riwayat workflow</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-base">Riwayat Workflow</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />

          {/* Timeline events */}
          <div className="space-y-6">
            {history.map((event, index) => {
              const config = ACTION_CONFIG[event.action as keyof typeof ACTION_CONFIG] || ACTION_CONFIG.reviewed
              const Icon = config.icon
              const isLast = index === history.length - 1

              return (
                <div key={event.id} className="relative pl-12">
                  {/* Icon */}
                  <div
                    className={cn(
                      "absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center",
                      config.bgColor,
                      isLast && "ring-4 ring-background"
                    )}
                  >
                    <Icon className={cn("w-4 h-4", config.color)} />
                  </div>

                  {/* Content */}
                  <div className="pb-6">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{config.label}</span>
                      <Badge variant="secondary" className="text-xs">
                        {ROLE_LABELS[event.actor_role] || event.actor_role}
                      </Badge>
                    </div>

                    <p className="text-xs text-muted-foreground mb-2">
                      {new Date(event.created_at).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>

                    {event.notes && (
                      <div className="mt-2 p-2 rounded-md bg-muted/50 text-sm">
                        <p className="text-xs text-muted-foreground mb-1">Catatan:</p>
                        <p className="text-sm">{event.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
