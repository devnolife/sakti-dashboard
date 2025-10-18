"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Shield, CheckCircle, XCircle, AlertTriangle, Clock } from "lucide-react"
import { Label } from "@/components/ui/label"

export default function ApprovalOverride() {
  const [selectedModule, setSelectedModule] = useState("all")
  const [actionReason, setActionReason] = useState("")

  // Mock pending approvals from all modules
  const pendingApprovals = [
    {
      id: "1",
      module: "KKP",
      item: "KKP Application - Implementasi IoT",
      requester: "John Doe (12345678)",
      currentStatus: "pending",
      currentApprover: "Prodi",
      submittedAt: "2024-01-15"
    },
    {
      id: "2",
      module: "Exam",
      item: "Proposal Exam - Sistem Deteksi Wajah",
      requester: "Jane Smith (87654321)",
      currentStatus: "pending",
      currentApprover: "Staff TU",
      submittedAt: "2024-01-14"
    },
    {
      id: "3",
      module: "Letter",
      item: "Surat Keterangan Aktif Kuliah",
      requester: "Bob Wilson (11223344)",
      currentStatus: "in_review",
      currentApprover: "Dekan",
      submittedAt: "2024-01-13"
    },
    {
      id: "4",
      module: "Payment",
      item: "Payment Verification - Biaya Ujian",
      requester: "Alice Brown (55667788)",
      currentStatus: "pending",
      currentApprover: "Admin Keuangan",
      submittedAt: "2024-01-12"
    }
  ]

  const handleApprove = (id: string) => {
    if (!actionReason.trim()) {
      alert("Please provide a reason for override")
      return
    }
    console.log("Approving:", id, "Reason:", actionReason)
    // API call here
  }

  const handleReject = (id: string) => {
    if (!actionReason.trim()) {
      alert("Please provide a reason for override")
      return
    }
    console.log("Rejecting:", id, "Reason:", actionReason)
    // API call here
  }

  const filteredApprovals = selectedModule === "all"
    ? pendingApprovals
    : pendingApprovals.filter(a => a.module.toLowerCase() === selectedModule.toLowerCase())

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Shield className="h-6 w-6 text-orange-500" />
          <h2 className="text-3xl font-bold tracking-tight">Approval Override</h2>
        </div>
        <p className="text-muted-foreground">
          Emergency approval controls - Use with caution
        </p>
        <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-amber-900 dark:text-amber-100">
                Warning: Admin Override Powers
              </p>
              <p className="text-amber-700 dark:text-amber-300 mt-1">
                This feature allows you to bypass normal approval workflows. All override actions are logged
                and audited. Use only in emergency situations or when normal workflow cannot proceed.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingApprovals.length}</div>
            <p className="text-xs text-muted-foreground">Across all modules</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">KKP Approvals</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {pendingApprovals.filter(a => a.module === "KKP").length}
            </div>
            <p className="text-xs text-muted-foreground">Pending</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Exam Approvals</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {pendingApprovals.filter(a => a.module === "Exam").length}
            </div>
            <p className="text-xs text-muted-foreground">Pending</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Other Approvals</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {pendingApprovals.filter(a => !["KKP", "Exam"].includes(a.module)).length}
            </div>
            <p className="text-xs text-muted-foreground">Letters & Payments</p>
          </CardContent>
        </Card>
      </div>

      {/* Pending Approvals List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Pending Approvals</CardTitle>
              <CardDescription>
                Items waiting for approval across all modules
              </CardDescription>
            </div>
            <Select value={selectedModule} onValueChange={setSelectedModule}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by module" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Modules</SelectItem>
                <SelectItem value="kkp">KKP</SelectItem>
                <SelectItem value="exam">Exams</SelectItem>
                <SelectItem value="letter">Letters</SelectItem>
                <SelectItem value="payment">Payments</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Module</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead>Requester</TableHead>
                  <TableHead>Current Approver</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApprovals.map((approval) => (
                  <TableRow key={approval.id}>
                    <TableCell>
                      <Badge>{approval.module}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">{approval.item}</TableCell>
                    <TableCell className="text-sm">{approval.requester}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{approval.currentApprover}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(approval.submittedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline" className="gap-1">
                              <CheckCircle className="h-3 w-3" />
                              Approve
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Admin Override - Approve</DialogTitle>
                              <DialogDescription>
                                You are about to override the normal approval workflow and approve this request.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label>Item Details</Label>
                                <div className="p-3 bg-muted rounded-md text-sm">
                                  <p className="font-medium">{approval.item}</p>
                                  <p className="text-muted-foreground mt-1">
                                    Requested by: {approval.requester}
                                  </p>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="reason">Reason for Override *</Label>
                                <Textarea
                                  id="reason"
                                  placeholder="Provide a detailed reason for this override action..."
                                  value={actionReason}
                                  onChange={(e) => setActionReason(e.target.value)}
                                  className="min-h-[100px]"
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setActionReason("")}>
                                Cancel
                              </Button>
                              <Button
                                onClick={() => handleApprove(approval.id)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Confirm Approve
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline" className="gap-1 text-red-600">
                              <XCircle className="h-3 w-3" />
                              Reject
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Admin Override - Reject</DialogTitle>
                              <DialogDescription>
                                You are about to override the normal approval workflow and reject this request.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label>Item Details</Label>
                                <div className="p-3 bg-muted rounded-md text-sm">
                                  <p className="font-medium">{approval.item}</p>
                                  <p className="text-muted-foreground mt-1">
                                    Requested by: {approval.requester}
                                  </p>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="reject-reason">Reason for Rejection *</Label>
                                <Textarea
                                  id="reject-reason"
                                  placeholder="Provide a detailed reason for rejection..."
                                  value={actionReason}
                                  onChange={(e) => setActionReason(e.target.value)}
                                  className="min-h-[100px]"
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setActionReason("")}>
                                Cancel
                              </Button>
                              <Button
                                onClick={() => handleReject(approval.id)}
                                variant="destructive"
                              >
                                <XCircle className="h-4 w-4 mr-2" />
                                Confirm Reject
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
