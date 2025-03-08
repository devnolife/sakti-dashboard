"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Check, Search, X } from "lucide-react"
import { formatDate } from "@/lib/utils"

export default function PracticumMaterialRequests({ requests, materials, onApprove, onReject }) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredRequests = requests.filter(
    (request) =>
      request.requesterName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      getMaterialName(request.materialId).toLowerCase().includes(searchQuery.toLowerCase()),
  )

  function getMaterialName(materialId) {
    const material = materials.find((m) => m.id === materialId)
    return material ? material.name : "Unknown Material"
  }

  function getStatusBadge(status) {
    switch (status) {
      case "pending":
        return <Badge variant="outline">Pending</Badge>
      case "approved":
        return <Badge variant="success">Approved</Badge>
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search requests..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Requester</TableHead>
              <TableHead>Material</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Request Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No requests found.
                </TableCell>
              </TableRow>
            ) : (
              filteredRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">{request.requesterName}</TableCell>
                  <TableCell>{getMaterialName(request.materialId)}</TableCell>
                  <TableCell>{request.course}</TableCell>
                  <TableCell>{request.quantity}</TableCell>
                  <TableCell>{formatDate(request.requestDate)}</TableCell>
                  <TableCell>{getStatusBadge(request.status)}</TableCell>
                  <TableCell>
                    {request.status === "pending" ? (
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => onApprove(request.id)}
                        >
                          <Check className="h-4 w-4 text-green-500" />
                          <span className="sr-only">Approve</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => onReject(request.id)}
                        >
                          <X className="h-4 w-4 text-destructive" />
                          <span className="sr-only">Reject</span>
                        </Button>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        {request.status === "approved" ? "Approved" : "Rejected"}
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

