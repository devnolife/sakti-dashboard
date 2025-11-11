"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CheckCircle, XCircle, RotateCcw, Clock } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { useToast } from "@/hooks/use-toast"
import { getAssignedRequests } from "@/app/actions/correspondence/workflow"
import { approveLetterRequest, rejectRequest, returnLetterForRevision } from "@/app/actions/correspondence/letter-requests"

export function WD1CorrespondenceDashboard() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [requests, setRequests] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null)
  const [showApproveDialog, setShowApproveDialog] = useState(false)
  const [showRejectDialog, setShowRejectDialog] = useState(false)
  const [showReturnDialog, setShowReturnDialog] = useState(false)
  const [approvalNotes, setApprovalNotes] = useState("")
  const [rejectReason, setRejectReason] = useState("")
  const [returnNotes, setReturnNotes] = useState("")
  const [actionLoading, setActionLoading] = useState(false)

  useEffect(() => {
    if (!user?.id) return
    fetchRequests()
  }, [user?.id])

  async function fetchRequests() {
    if (!user?.id) return

    try {
      setLoading(true)
      const data = await getAssignedRequests(user.id)
      // Filter only requests in WD1 approval stage
      const wd1Requests = data.filter((req: any) => req.workflow_stage === 'wd1_approval')
      setRequests(wd1Requests)
    } catch (error) {
      console.error('Error fetching requests:', error)
      toast({
        title: "Error",
        description: "Gagal mengambil data permohonan",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  async function handleApprove() {
    if (!selectedRequest || !user?.id) return

    setActionLoading(true)
    try {
      await approveLetterRequest(selectedRequest.id, user.id, approvalNotes)

      toast({
        title: "Berhasil",
        description: "Permohonan telah disetujui"
      })

      setShowApproveDialog(false)
      setApprovalNotes("")
      setSelectedRequest(null)
      fetchRequests()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Gagal menyetujui permohonan",
        variant: "destructive"
      })
    } finally {
      setActionLoading(false)
    }
  }

  async function handleReject() {
    if (!selectedRequest || !user?.id) return

    if (!rejectReason.trim()) {
      toast({
        title: "Error",
        description: "Alasan penolakan harus diisi",
        variant: "destructive"
      })
      return
    }

    setActionLoading(true)
    try {
      await rejectRequest(selectedRequest.id, user.id, rejectReason)

      toast({
        title: "Berhasil",
        description: "Permohonan telah ditolak"
      })

      setShowRejectDialog(false)
      setRejectReason("")
      setSelectedRequest(null)
      fetchRequests()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Gagal menolak permohonan",
        variant: "destructive"
      })
    } finally {
      setActionLoading(false)
    }
  }

  async function handleReturn() {
    if (!selectedRequest || !user?.id) return

    if (!returnNotes.trim()) {
      toast({
        title: "Error",
        description: "Catatan revisi harus diisi",
        variant: "destructive"
      })
      return
    }

    setActionLoading(true)
    try {
      await returnLetterForRevision(selectedRequest.id, user.id, returnNotes)

      toast({
        title: "Berhasil",
        description: "Permohonan dikembalikan untuk revisi"
      })

      setShowReturnDialog(false)
      setReturnNotes("")
      setSelectedRequest(null)
      fetchRequests()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Gagal mengembalikan permohonan",
        variant: "destructive"
      })
    } finally {
      setActionLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="space-y-3 animate-pulse">
                <div className="w-1/3 h-4 bg-gray-200 rounded"></div>
                <div className="w-2/3 h-6 bg-gray-200 rounded"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (requests.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <Clock className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <h3 className="mb-2 text-lg font-semibold">Tidak Ada Permohonan</h3>
          <p className="text-sm text-muted-foreground">
            Belum ada permohonan surat yang menunggu persetujuan Anda
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <div className="grid gap-4">
        {requests.map((request) => (
          <Card key={request.id} className="transition-shadow hover:shadow-md">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{request.title}</CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline">{request.type}</Badge>
                    <Badge variant="secondary">{request.workflow_stage}</Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Student Info */}
                <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
                  <div>
                    <p className="text-muted-foreground">Mahasiswa</p>
                    <p className="font-medium">{request.students?.users?.name}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">NIM</p>
                    <p className="font-medium">{request.students?.nim}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Prodi</p>
                    <p className="font-medium">{request.students?.prodi?.nama}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Tanggal</p>
                    <p className="font-medium">
                      {new Date(request.request_date).toLocaleDateString('id-ID')}
                    </p>
                  </div>
                </div>

                {/* Purpose */}
                <div>
                  <p className="mb-1 text-sm text-muted-foreground">Keperluan:</p>
                  <p className="text-sm">{request.purpose}</p>
                </div>

                {/* Forwarding Info */}
                {request.forwarded_by && (
                  <div className="p-3 border rounded-lg bg-muted/50">
                    <p className="mb-1 text-xs font-medium text-muted-foreground">
                      Diteruskan oleh Admin Umum
                    </p>
                    <p className="text-sm">
                      {new Date(request.forwarded_at).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    onClick={() => {
                      setSelectedRequest(request)
                      setShowApproveDialog(true)
                    }}
                    className="flex-1"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Setujui
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSelectedRequest(request)
                      setShowReturnDialog(true)
                    }}
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Revisi
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => {
                      setSelectedRequest(request)
                      setShowRejectDialog(true)
                    }}
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Tolak
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Approve Dialog */}
      <Dialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Setujui Permohonan</DialogTitle>
            <DialogDescription>
              Permohonan akan disetujui dan surat akan digenerate
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="mb-2 text-sm font-medium">Catatan (Opsional)</label>
              <Textarea
                value={approvalNotes}
                onChange={(e) => setApprovalNotes(e.target.value)}
                placeholder="Tambahkan catatan jika diperlukan..."
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowApproveDialog(false)}>
              Batal
            </Button>
            <Button onClick={handleApprove} disabled={actionLoading}>
              {actionLoading ? "Memproses..." : "Setujui"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Return Dialog */}
      <Dialog open={showReturnDialog} onOpenChange={setShowReturnDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Kembalikan untuk Revisi</DialogTitle>
            <DialogDescription>
              Permohonan akan dikembalikan ke Admin Umum untuk diperbaiki
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="mb-2 text-sm font-medium">Catatan Revisi *</label>
              <Textarea
                value={returnNotes}
                onChange={(e) => setReturnNotes(e.target.value)}
                placeholder="Jelaskan apa yang perlu direvisi..."
                rows={4}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReturnDialog(false)}>
              Batal
            </Button>
            <Button onClick={handleReturn} disabled={actionLoading}>
              {actionLoading ? "Memproses..." : "Kembalikan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tolak Permohonan</DialogTitle>
            <DialogDescription>
              Berikan alasan penolakan untuk permohonan ini
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="mb-2 text-sm font-medium">Alasan Penolakan *</label>
              <Textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Jelaskan alasan penolakan..."
                rows={4}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
              Batal
            </Button>
            <Button variant="destructive" onClick={handleReject} disabled={actionLoading}>
              {actionLoading ? "Memproses..." : "Tolak Permohonan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
