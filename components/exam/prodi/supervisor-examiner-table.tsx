"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, MoreHorizontal, UserPlus } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SupervisorExaminerDetailsDialog } from "./supervisor-examiner-details-dialog"
import { toast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { SupervisorExaminerData } from "./types"

interface SupervisorExaminerTableProps {
  data: SupervisorExaminerData[]
}

export function SupervisorExaminerTable({ data }: SupervisorExaminerTableProps) {
  const [selectedData, setSelectedData] = useState<SupervisorExaminerData | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const handleViewDetails = (item: SupervisorExaminerData) => {
    setSelectedData(item)
    setIsDetailsOpen(true)
  }

  const handleAssignSupervisor = (id: string) => {
    toast({
      title: "Halaman detail dibuka",
      description: "Silakan pilih dosen pembimbing dan penguji",
    })
    const item = data.find((d) => d.id === id)
    if (item) {
      handleViewDetails(item)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Belum Lengkap
          </Badge>
        )
      case "complete":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Lengkap
          </Badge>
        )
      case "partial":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Sebagian
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getExamTypeBadge = (type: string) => {
    switch (type) {
      case "proposal":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Proposal
          </Badge>
        )
      case "result":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            Hasil
          </Badge>
        )
      case "final":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Tutup
          </Badge>
        )
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mahasiswa</TableHead>
              <TableHead>Judul</TableHead>
              <TableHead>Tipe</TableHead>
              <TableHead>Pembimbing</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Tindakan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Tidak ada data.
                </TableCell>
              </TableRow>
            ) : (
              data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="font-medium">{item.studentName}</div>
                    <div className="text-sm text-muted-foreground">{item.studentId}</div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-md truncate" title={item.title}>
                      {item.title}
                    </div>
                  </TableCell>
                  <TableCell>{getExamTypeBadge(item.examType)}</TableCell>
                  <TableCell>
                    {item.supervisors && item.supervisors.length > 0 ? (
                      <div className="flex -space-x-2">
                        {item.supervisors.slice(0, 2).map((supervisor, index) => (
                          <Avatar key={index} className="border-2 border-background h-8 w-8">
                            <AvatarImage src={supervisor.avatarUrl} alt={supervisor.name} />
                            <AvatarFallback>
                              {supervisor.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        {item.supervisors.length > 2 && (
                          <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs">
                            +{item.supervisors.length - 2}
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="text-muted-foreground italic">Belum ada</span>
                    )}
                  </TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleAssignSupervisor(item.id)}
                      >
                        <UserPlus className="h-4 w-4" />
                        <span className="sr-only">Assign</span>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">More</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewDetails(item)}>
                            <FileText className="mr-2 h-4 w-4" />
                            Lihat Detail
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {selectedData && (
        <SupervisorExaminerDetailsDialog data={selectedData} open={isDetailsOpen} onOpenChange={setIsDetailsOpen} />
      )}
    </>
  )
}

