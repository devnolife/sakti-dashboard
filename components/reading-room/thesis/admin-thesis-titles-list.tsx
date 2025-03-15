"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Archive, CheckCircle, Download, Eye, MoreHorizontal } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface ThesisTitlesListProps {
  theses: any[]
  onViewDetails: (thesis: any) => void
  onApprove: (thesis: any) => void
}

export function ThesisTitlesList({ theses, onViewDetails, onApprove }: ThesisTitlesListProps) {
  const [page, setPage] = useState(1)
  const itemsPerPage = 10
  const totalPages = Math.ceil(theses.length / itemsPerPage)
  const startIndex = (page - 1) * itemsPerPage
  const paginatedTheses = theses.slice(startIndex, startIndex + itemsPerPage)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Pending
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Rejected
          </Badge>
        )
      case "archived":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Archived
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const handleDownload = (thesis: any) => {
    toast({
      title: "Downloading Thesis Document",
      description: `Downloading "${thesis.title}" document.`,
    })
  }

  const handleArchive = (thesis: any) => {
    toast({
      title: "Thesis Archived",
      description: `The thesis "${thesis.title}" has been archived.`,
    })
  }

  return (
    <div className="space-y-4">
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40%]">Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Year</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedTheses.length > 0 ? (
              paginatedTheses.map((thesis) => (
                <TableRow key={thesis.id}>
                  <TableCell className="font-medium">{thesis.title}</TableCell>
                  <TableCell>{thesis.author.name}</TableCell>
                  <TableCell>{thesis.department}</TableCell>
                  <TableCell>{getStatusBadge(thesis.status)}</TableCell>
                  <TableCell>{thesis.year}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => onViewDetails(thesis)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        {thesis.status === "pending" && (
                          <DropdownMenuItem onClick={() => onApprove(thesis)}>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Review & Approve
                          </DropdownMenuItem>
                        )}
                        {thesis.documentUrl && (
                          <DropdownMenuItem onClick={() => handleDownload(thesis)}>
                            <Download className="mr-2 h-4 w-4" />
                            Download Document
                          </DropdownMenuItem>
                        )}
                        {thesis.status === "approved" && (
                          <DropdownMenuItem onClick={() => handleArchive(thesis)}>
                            <Archive className="mr-2 h-4 w-4" />
                            Archive
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No thesis titles found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, theses.length)} of {theses.length} entries
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => setPage(page - 1)} disabled={page === 1}>
              Previous
            </Button>
            <Button variant="outline" size="sm" onClick={() => setPage(page + 1)} disabled={page === totalPages}>
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

