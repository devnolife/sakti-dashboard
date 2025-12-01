"use client"

import { useState, useEffect } from "react"
import { KkpRequirementsView } from "./_components/kkp-requirements-view"
import { KkpDashboardView } from "./_components/kkp-dashboard-view"
import { KkpCompletionView } from "./_components/kkp-completion-view"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

type KkpStatus = "no_application" | "pending" | "approved" | "in_progress" | "rejected" | "completed"

interface KkpStatusResponse {
  status: KkpStatus
  application?: any
  requirements?: any[]
  completionData?: any
  student?: {
    id: string
    nim: string
    name: string
  }
}

export default function StudentKkpPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [kkpData, setKkpData] = useState<KkpStatusResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchKkpStatus()
  }, [])

  const fetchKkpStatus = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch("/api/student/kkp/status")

      if (!response.ok) {
        throw new Error("Failed to fetch KKP status")
      }

      const data: KkpStatusResponse = await response.json()
      setKkpData(data)
    } catch (err) {
      console.error("Error fetching KKP status:", err)
      setError(err instanceof Error ? err.message : "Unknown error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center p-8">
            <Loader2 className="w-12 h-12 mb-4 text-primary animate-spin" />
            <h3 className="text-lg font-semibold mb-2">Memuat Data KKP</h3>
            <p className="text-sm text-muted-foreground text-center">
              Mohon tunggu sebentar...
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Error state
  if (error || !kkpData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="w-full max-w-md border-destructive">
          <CardContent className="flex flex-col items-center justify-center p-8">
            <div className="w-12 h-12 mb-4 rounded-full bg-destructive/10 flex items-center justify-center">
              <span className="text-2xl">⚠️</span>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-destructive">
              Terjadi Kesalahan
            </h3>
            <p className="text-sm text-muted-foreground text-center mb-4">
              {error || "Gagal memuat data KKP"}
            </p>
            <button
              onClick={fetchKkpStatus}
              className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90"
            >
              Coba Lagi
            </button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Render appropriate view based on KKP status
  switch (kkpData.status) {
    case "no_application":
      // Belum ada aplikasi KKP - tampilkan persyaratan
      return (
        <KkpRequirementsView
          requirements={kkpData.requirements || []}
          onUpload={(requirementId) => {
            // TODO: Implement upload handler
            console.log("Upload requirement:", requirementId)
          }}
        />
      )

    case "pending":
    case "approved":
    case "in_progress":
      // KKP sedang berlangsung - tampilkan dashboard
      return <KkpDashboardView applicationData={kkpData.application} />

    case "completed":
      // KKP sudah selesai - tampilkan halaman completion
      return (
        <KkpCompletionView
          data={{
            applicationId: kkpData.application?.id || "",
            applicationNumber: kkpData.application?.applicationNumber || "",
            title: kkpData.application?.title || "",
            company: {
              name: kkpData.application?.company?.name || "",
              address: kkpData.application?.company?.address || "",
              city: kkpData.application?.company?.city || "",
            },
            startDate: new Date(kkpData.application?.startDate || Date.now()),
            endDate: new Date(kkpData.application?.endDate || Date.now()),
            completionDate: new Date(kkpData.completionData?.completionDate || Date.now()),
            supervisor: kkpData.application?.supervisor,
            groupMembers: kkpData.application?.groupMembers || [],
            finalScore: kkpData.completionData?.finalScore,
            grade: kkpData.completionData?.grade,
            documents: kkpData.application?.documents || [],
          }}
        />
      )

    case "rejected":
      // KKP ditolak - tampilkan persyaratan dengan pesan
      return (
        <div className="space-y-6">
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-red-100 rounded-full">
                  <span className="text-2xl">❌</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-red-800 mb-2">
                    Pengajuan KKP Ditolak
                  </h3>
                  <p className="text-sm text-red-700 mb-3">
                    Pengajuan KKP Anda telah ditolak. Silakan perbaiki dokumen dan ajukan kembali.
                  </p>
                  {kkpData.application?.notes && (
                    <div className="p-3 bg-white border border-red-200 rounded-lg">
                      <p className="text-sm font-medium text-red-800 mb-1">
                        Alasan Penolakan:
                      </p>
                      <p className="text-sm text-red-700">
                        {kkpData.application.notes}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <KkpRequirementsView
            requirements={kkpData.requirements || []}
            onUpload={(requirementId) => {
              console.log("Upload requirement:", requirementId)
            }}
          />
        </div>
      )

    default:
      // Unknown status - show error
      return (
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card className="w-full max-w-md">
            <CardContent className="flex flex-col items-center justify-center p-8">
              <div className="w-12 h-12 mb-4 rounded-full bg-muted flex items-center justify-center">
                <span className="text-2xl">❓</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Status Tidak Dikenali
              </h3>
              <p className="text-sm text-muted-foreground text-center mb-4">
                Status KKP: {kkpData.status}
              </p>
              <button
                onClick={fetchKkpStatus}
                className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90"
              >
                Refresh
              </button>
            </CardContent>
          </Card>
        </div>
      )
  }
}
