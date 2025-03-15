"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  PlusCircle,
  Search,
  FileText,
  Edit,
  Trash2,
  MoreVertical,
  Eye,
  Clock,
  FileUp,
  Download,
  Copy,
} from "lucide-react"
import { mockDrafts, mockTemplates, draftStats } from "./mock-correspondence-drafts"
import type { CorrespondenceDraft, DraftStatus } from "@/types/correspondence-draft"

export function CorrespondenceDraftsManagement() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [selectedDraft, setSelectedDraft] = useState<CorrespondenceDraft | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isNewDraftDialogOpen, setIsNewDraftDialogOpen] = useState(false)
  const [newDraftContent, setNewDraftContent] = useState("")
  const [newDraftTitle, setNewDraftTitle] = useState("")
  const [newDraftType, setNewDraftType] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState("")

  const filteredDrafts = mockDrafts.filter((draft) => {
    const matchesSearch =
      draft.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      draft.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      draft.content.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || draft.status === statusFilter
    const matchesType = typeFilter === "all" || draft.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const handleViewDraft = (draft: CorrespondenceDraft) => {
    setSelectedDraft(draft)
    setIsViewDialogOpen(true)
  }

  const handleEditDraft = (draft: CorrespondenceDraft) => {
    setSelectedDraft(draft)
    setNewDraftContent(draft.content)
    setNewDraftTitle(draft.title)
    setNewDraftType(draft.type)
    setIsEditDialogOpen(true)
  }

  const handleDeleteDraft = (draft: CorrespondenceDraft) => {
    setSelectedDraft(draft)
    setIsDeleteDialogOpen(true)
  }

  const handleCreateNewDraft = () => {
    setNewDraftTitle("")
    setNewDraftType("")
    setNewDraftContent("")
    setSelectedTemplate("")
    setIsNewDraftDialogOpen(true)
  }

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId)
    const template = mockTemplates.find((t) => t.id === templateId)
    if (template) {
      setNewDraftContent(template.content)
      setNewDraftType(template.category)
    }
  }

  const getStatusBadge = (status: DraftStatus) => {
    switch (status) {
      case "draft":
        return (
          <Badge variant="outline" className="bg-slate-100">
            Draft
          </Badge>
        )
      case "review":
        return (
          <Badge variant="outline" className="text-blue-800 bg-blue-100">
            In Review
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="text-green-800 bg-green-100">
            Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="text-red-800 bg-red-100">
            Rejected
          </Badge>
        )
      case "finalized":
        return (
          <Badge variant="outline" className="text-purple-800 bg-purple-100">
            Finalized
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Correspondence Drafts</h1>
        <Button onClick={handleCreateNewDraft}>
          <PlusCircle className="w-4 h-4 mr-2" />
          New Draft
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Drafts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{draftStats.total}</div>
            <p className="text-xs text-muted-foreground">All correspondence drafts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">In Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{draftStats.review}</div>
            <p className="text-xs text-muted-foreground">Drafts waiting for review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{draftStats.approved}</div>
            <p className="text-xs text-muted-foreground">Approved drafts ready for finalization</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Finalized</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{draftStats.finalized}</div>
            <p className="text-xs text-muted-foreground">Finalized and ready for use</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manage Correspondence Drafts</CardTitle>
          <CardDescription>Create, edit, and manage draft letters and documents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search drafts..."
                    className="pl-8 md:w-[300px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="review">In Review</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="finalized">Finalized</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Surat Keterangan">Surat Keterangan</SelectItem>
                    <SelectItem value="Undangan">Undangan</SelectItem>
                    <SelectItem value="Surat Permohonan">Surat Permohonan</SelectItem>
                    <SelectItem value="Pengumuman">Pengumuman</SelectItem>
                    <SelectItem value="Surat Pengantar">Surat Pengantar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Created By</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDrafts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No drafts found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredDrafts.map((draft) => (
                      <TableRow key={draft.id}>
                        <TableCell className="font-medium">{draft.title}</TableCell>
                        <TableCell>{draft.type}</TableCell>
                        <TableCell>{getStatusBadge(draft.status)}</TableCell>
                        <TableCell>{formatDate(draft.updatedAt)}</TableCell>
                        <TableCell>{draft.createdBy}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="w-8 h-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => handleViewDraft(draft)}>
                                <Eye className="w-4 h-4 mr-2" />
                                View
                              </DropdownMenuItem>
                              {draft.status !== "finalized" && (
                                <DropdownMenuItem onClick={() => handleEditDraft(draft)}>
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator />
                              {draft.status === "approved" && (
                                <DropdownMenuItem>
                                  <FileUp className="w-4 h-4 mr-2" />
                                  Finalize
                                </DropdownMenuItem>
                              )}
                              {draft.status === "draft" && (
                                <DropdownMenuItem>
                                  <Clock className="w-4 h-4 mr-2" />
                                  Submit for Review
                                </DropdownMenuItem>
                              )}
                              {draft.status === "finalized" && (
                                <DropdownMenuItem>
                                  <Download className="w-4 h-4 mr-2" />
                                  Download
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem>
                                <Copy className="w-4 h-4 mr-2" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleDeleteDraft(draft)} className="text-red-600">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* View Draft Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedDraft?.title}</DialogTitle>
            <DialogDescription>
              {selectedDraft?.type} - {getStatusBadge(selectedDraft?.status as DraftStatus)}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-muted-foreground">
              <div>Created by: {selectedDraft?.createdBy}</div>
              <div>Last updated: {selectedDraft && formatDate(selectedDraft.updatedAt)}</div>
            </div>
            <div className="p-4 border rounded-md">
              <div dangerouslySetInnerHTML={{ __html: selectedDraft?.content || "" }} />
            </div>
            {selectedDraft?.comments && (
              <div className="p-4 rounded-md bg-amber-50">
                <h4 className="font-medium">Comments:</h4>
                <p>{selectedDraft.comments}</p>
              </div>
            )}
            {selectedDraft?.attachments && selectedDraft.attachments.length > 0 && (
              <div>
                <h4 className="mb-2 font-medium">Attachments:</h4>
                <ul className="space-y-2">
                  {selectedDraft.attachments.map((attachment) => (
                    <li key={attachment.id} className="flex items-center">
                      <FileText className="w-4 h-4 mr-2" />
                      <span>{attachment.name}</span>
                      <span className="ml-2 text-xs text-muted-foreground">
                        ({Math.round(attachment.size / 1024)} KB)
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <DialogFooter>
            {selectedDraft?.status !== "finalized" && (
              <Button
                variant="outline"
                onClick={() => {
                  setIsViewDialogOpen(false)
                  handleEditDraft(selectedDraft as CorrespondenceDraft)
                }}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            )}
            <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Draft Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Edit Draft</DialogTitle>
            <DialogDescription>Make changes to your draft document</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={newDraftTitle} onChange={(e) => setNewDraftTitle(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select value={newDraftType} onValueChange={setNewDraftType}>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Surat Keterangan">Surat Keterangan</SelectItem>
                    <SelectItem value="Undangan">Undangan</SelectItem>
                    <SelectItem value="Surat Permohonan">Surat Permohonan</SelectItem>
                    <SelectItem value="Pengumuman">Pengumuman</SelectItem>
                    <SelectItem value="Surat Pengantar">Surat Pengantar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={newDraftContent}
                onChange={(e) => setNewDraftContent(e.target.value)}
                className="min-h-[300px] font-mono"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsEditDialogOpen(false)}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Draft Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Draft</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this draft? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(false)}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Draft Dialog */}
      <Dialog open={isNewDraftDialogOpen} onOpenChange={setIsNewDraftDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Create New Draft</DialogTitle>
            <DialogDescription>Create a new correspondence draft from scratch or using a template</DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="template" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="template">Use Template</TabsTrigger>
              <TabsTrigger value="scratch">Start from Scratch</TabsTrigger>
            </TabsList>
            <TabsContent value="template" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="template">Select Template</Label>
                <Select value={selectedTemplate} onValueChange={handleTemplateChange}>
                  <SelectTrigger id="template">
                    <SelectValue placeholder="Choose a template" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockTemplates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {selectedTemplate && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="new-title">Title</Label>
                      <Input
                        id="new-title"
                        value={newDraftTitle}
                        onChange={(e) => setNewDraftTitle(e.target.value)}
                        placeholder="Enter draft title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-type">Type</Label>
                      <Input id="new-type" value={newDraftType} readOnly />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-content">Content</Label>
                    <Textarea
                      id="new-content"
                      value={newDraftContent}
                      onChange={(e) => setNewDraftContent(e.target.value)}
                      className="min-h-[300px] font-mono"
                    />
                  </div>
                </>
              )}
            </TabsContent>
            <TabsContent value="scratch" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="scratch-title">Title</Label>
                  <Input
                    id="scratch-title"
                    value={newDraftTitle}
                    onChange={(e) => setNewDraftTitle(e.target.value)}
                    placeholder="Enter draft title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="scratch-type">Type</Label>
                  <Select value={newDraftType} onValueChange={setNewDraftType}>
                    <SelectTrigger id="scratch-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Surat Keterangan">Surat Keterangan</SelectItem>
                      <SelectItem value="Undangan">Undangan</SelectItem>
                      <SelectItem value="Surat Permohonan">Surat Permohonan</SelectItem>
                      <SelectItem value="Pengumuman">Pengumuman</SelectItem>
                      <SelectItem value="Surat Pengantar">Surat Pengantar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="scratch-content">Content</Label>
                <Textarea
                  id="scratch-content"
                  value={newDraftContent}
                  onChange={(e) => setNewDraftContent(e.target.value)}
                  className="min-h-[300px] font-mono"
                  placeholder="Enter your draft content here..."
                />
              </div>
            </TabsContent>
          </Tabs>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewDraftDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsNewDraftDialogOpen(false)}>Create Draft</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

