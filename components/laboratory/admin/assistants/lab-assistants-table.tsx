"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { EditLabAssistantDialog } from "./edit-lab-assistant-dialog"
import { LabAssistantDetailsDialog } from "./lab-assistant-details-dialog"
import { MoreHorizontal, Edit, Eye, Trash, AlertCircle } from "lucide-react"
import type { LabAssistant } from "./types"

interface LabAssistantsTableProps {
  assistants: LabAssistant[]
}

export function LabAssistantsTable({ assistants }: LabAssistantsTableProps) {
  const [selectedAssistant, setSelectedAssistant] = useState<LabAssistant | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)

  const handleEdit = (assistant: LabAssistant) => {
    setSelectedAssistant(assistant)
    setIsEditDialogOpen(true)
  }

  const handleViewDetails = (assistant: LabAssistant) => {
    setSelectedAssistant(assistant)
    setIsDetailsDialogOpen(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="success">Active</Badge>
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>
      case "probation":
        return <Badge variant="warning">Probation</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Assistant</TableHead>
              <TableHead>Student ID</TableHead>
              <TableHead>Laboratory</TableHead>
              <TableHead>Experience</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assistants.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No assistants found.
                </TableCell>
              </TableRow>
            ) : (
              assistants.map((assistant) => (
                <TableRow key={assistant.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={assistant.avatar} alt={assistant.name} />
                        <AvatarFallback>{assistant.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{assistant.name}</div>
                        <div className="text-sm text-muted-foreground">{assistant.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{assistant.studentId}</TableCell>
                  <TableCell>{assistant.lab}</TableCell>
                  <TableCell>{assistant.experience} semester(s)</TableCell>
                  <TableCell>{getStatusBadge(assistant.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewDetails(assistant)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(assistant)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash className="mr-2 h-4 w-4" />
                          Remove
                        </DropdownMenuItem>
                        {assistant.status !== "active" && (
                          <DropdownMenuItem>
                            <AlertCircle className="mr-2 h-4 w-4" />
                            Set as Active
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {selectedAssistant && (
        <>
          <EditLabAssistantDialog
            assistant={selectedAssistant}
            open={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
          />
          <LabAssistantDetailsDialog
            assistant={selectedAssistant}
            open={isDetailsDialogOpen}
            onOpenChange={setIsDetailsDialogOpen}
          />
        </>
      )}
    </div>
  )
}

