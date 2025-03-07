"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, CheckCircle, XCircle, FileText } from "lucide-react"
import { getStudentLetterRequests } from "@/app/actions/correspondence-actions"
import type { LetterRequest } from "@/types/correspondence"

export function CorrespondenceStats() {
  const [requests, setRequests] = useState<LetterRequest[]>([])
  const [loading, setLoading] = useState(true)

  // In a real app, we would get the student ID from the session
  const studentId = "std-001"

  useEffect(() => {
    async function fetchRequests() {
      try {
        const data = await getStudentLetterRequests(studentId)
        setRequests(data)
      } catch (error) {
        console.error("Error fetching letter requests:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRequests()
  }, [])

  const pendingRequests = requests.filter((req) => req.status === "submitted" || req.status === "in-review")
  const completedRequests = requests.filter((req) => req.status === "completed" || req.status === "approved")
  const rejectedRequests = requests.filter((req) => req.status === "rejected")
  const totalRequests = requests.length

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="border-none shadow-md">
            <CardContent className="p-6">
              <div className="flex justify-center">
                <div className="h-16 w-full animate-pulse rounded-md bg-muted"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card className="overflow-hidden border-none bg-gradient-to-br from-slate-50 to-slate-100 shadow-md transition-all hover:shadow-lg dark:from-slate-950/40 dark:to-slate-900/40">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-slate-100 p-3 dark:bg-slate-800/50">
              <FileText className="h-6 w-6 text-slate-600 dark:text-slate-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Permohonan</p>
              <h3 className="text-3xl font-bold text-slate-600 dark:text-slate-400">{totalRequests}</h3>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-none bg-gradient-to-br from-blue-50 to-blue-100 shadow-md transition-all hover:shadow-lg dark:from-blue-950/40 dark:to-blue-900/40">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-800/50">
              <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Dalam Proses</p>
              <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-400">{pendingRequests.length}</h3>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-none bg-gradient-to-br from-green-50 to-green-100 shadow-md transition-all hover:shadow-lg dark:from-green-950/40 dark:to-green-900/40">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-green-100 p-3 dark:bg-green-800/50">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Selesai</p>
              <h3 className="text-3xl font-bold text-green-600 dark:text-green-400">{completedRequests.length}</h3>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-none bg-gradient-to-br from-red-50 to-red-100 shadow-md transition-all hover:shadow-lg dark:from-red-950/40 dark:to-red-900/40">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-red-100 p-3 dark:bg-red-800/50">
              <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Ditolak</p>
              <h3 className="text-3xl font-bold text-red-600 dark:text-red-400">{rejectedRequests.length}</h3>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

