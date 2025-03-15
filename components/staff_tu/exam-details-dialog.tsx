"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Calendar, MapPin, UserPlus, Edit, Save, Trash2, Plus, FileX } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CommitteeMemberDialog } from "./committee-member-dialog"
import { toast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DocumentViewer } from "@/components/exam/document-viewer"

import type { Exam, CommitteeMember, Advisor } from "@/types/exam"

interface ExamDetailsDialogProps {
  exam: Exam
  open: boolean
  onOpenChange: (open: boolean) => void
  onExamUpdate: (exam: Exam) => void
}

export function ExamDetailsDialog({ exam, open, onOpenChange, onExamUpdate }: ExamDetailsDialogProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedExam, setEditedExam] = useState<Exam>({ ...exam })
  const [showCommitteeDialog, setShowCommitteeDialog] = useState(false)
  const [activeTab, setActiveTab] = useState("details")
  const [showAdvisorDialog, setShowAdvisorDialog] = useState(false)
  const [advisorType, setAdvisorType] = useState<"advisor1" | "advisor2">("advisor1")

  const handleInputChange = (field: string, value: string) => {
    setEditedExam((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleStatusChange = (status: string) => {
    setEditedExam((prev) => ({
      ...prev,
      status,
    }))
  }

  const handleTypeChange = (type: string) => {
    setEditedExam((prev) => ({
      ...prev,
      type,
    }))
  }

  const handleSaveChanges = () => {
    onExamUpdate(editedExam)
    setIsEditing(false)
    toast({
      title: "Perubahan disimpan",
      description: "Detail ujian telah berhasil diperbarui.",
    })
  }

  const handleAddCommitteeMember = (member: CommitteeMember) => {
    const updatedCommittee = [...editedExam.committee, member]
    setEditedExam((prev) => ({
      ...prev,
      committee: updatedCommittee,
    }))
    setShowCommitteeDialog(false)
    toast({
      title: "Anggota komite ditambahkan",
      description: `${member.name} telah ditambahkan sebagai ${member.role}.`,
    })
  }

  const handleRemoveCommitteeMember = (memberId: string) => {
    const updatedCommittee = editedExam.committee.filter((member) => member.id !== memberId)
    setEditedExam((prev) => ({
      ...prev,
      committee: updatedCommittee,
    }))
    toast({
      title: "Anggota komite dihapus",
      description: "Anggota komite telah berhasil dihapus.",
    })
  }

  const handleAddAdvisor = (advisor: Advisor) => {
    setEditedExam((prev) => ({
      ...prev,
      [advisorType]: advisor,
    }))
    setShowAdvisorDialog(false)
    toast({
      title: "Pembimbing ditambahkan",
      description: `${advisor.name} telah ditambahkan sebagai ${advisorType === "advisor1" ? "Pembimbing 1" : "Pembimbing 2"}.`,
    })
  }

  const handleRemoveAdvisor = (type: "advisor1" | "advisor2") => {
    setEditedExam((prev) => ({
      ...prev,
      [type]: undefined,
    }))
    toast({
      title: "Pembimbing dihapus",
      description: `${type === "advisor1" ? "Pembimbing 1" : "Pembimbing 2"} telah berhasil dihapus.`,
    })
  }

  const formatExamDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return format(date, "dd MMMM yyyy, HH:mm")
    } catch (error) {
      console.error("Error formatting date:", error)
      return dateString
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "applicant":
        return (
          <Badge
            variant="outline"
            className="text-yellow-700 border-yellow-200 bg-yellow-50 dark:bg-yellow-950/30 dark:text-yellow-400 dark:border-yellow-800"
          >
            Pendaftar
          </Badge>
        )
      case "pending":
        return (
          <Badge
            variant="outline"
            className="text-blue-700 border-blue-200 bg-blue-50 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800"
          >
            Menunggu
          </Badge>
        )
      case "scheduled":
        return (
          <Badge
            variant="outline"
            className="text-indigo-700 border-indigo-200 bg-indigo-50 dark:bg-indigo-950/30 dark:text-indigo-400 dark:border-indigo-800"
          >
            Terjadwal
          </Badge>
        )
      case "completed":
        return (
          <Badge
            variant="outline"
            className="text-green-700 border-green-200 bg-green-50 dark:bg-green-950/30 dark:text-green-400 dark:border-green-800"
          >
            Selesai
          </Badge>
        )
      case "passed":
        return (
          <Badge
            variant="outline"
            className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800"
          >
            Lulus
          </Badge>
        )
      case "failed":
        return (
          <Badge
            variant="outline"
            className="text-orange-700 border-orange-200 bg-orange-50 dark:bg-orange-950/30 dark:text-orange-400 dark:border-orange-800"
          >
            Tidak Lulus
          </Badge>
        )
      case "cancelled":
        return (
          <Badge
            variant="outline"
            className="text-red-700 border-red-200 bg-red-50 dark:bg-red-950/30 dark:text-red-400 dark:border-red-800"
          >
            Dibatalkan
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
          <Badge
            variant="outline"
            className="text-blue-700 border-blue-200 bg-blue-50 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800"
          >
            Ujian Proposal
          </Badge>
        )
      case "result":
        return (
          <Badge
            variant="outline"
            className="text-purple-700 border-purple-200 bg-purple-50 dark:bg-purple-950/30 dark:text-purple-400 dark:border-purple-800"
          >
            Ujian Hasil
          </Badge>
        )
      case "final":
        return (
          <Badge
            variant="outline"
            className="text-green-700 border-green-200 bg-green-50 dark:bg-green-950/30 dark:text-green-400 dark:border-green-800"
          >
            Ujian Tutup
          </Badge>
        )
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              Detail Ujian
              <span className="inline-block">{getStatusBadge(exam.status)}</span>
              <span className="inline-block">{getExamTypeBadge(exam.type)}</span>
            </DialogTitle>
            <DialogDescription>Informasi lengkap mengenai ujian mahasiswa</DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-4">
              <TabsTrigger value="details">Detail Ujian</TabsTrigger>
              <TabsTrigger value="advisors">Pembimbing</TabsTrigger>
              <TabsTrigger value="committee">Dosen Penguji</TabsTrigger>
              <TabsTrigger value="documents">Dokumen</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
              {/* Student and Exam Info */}
              <div className="p-4 border rounded-lg bg-muted/30 border-border">
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="studentName">Nama Mahasiswa</Label>
                        <Input
                          id="studentName"
                          value={editedExam.studentName}
                          onChange={(e) => handleInputChange("studentName", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="studentId">NIM</Label>
                        <Input
                          id="studentId"
                          value={editedExam.studentId}
                          onChange={(e) => handleInputChange("studentId", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="title">Judul Ujian</Label>
                      <Input
                        id="title"
                        value={editedExam.title}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="type">Tipe Ujian</Label>
                        <Select value={editedExam.type} onValueChange={handleTypeChange}>
                          <SelectTrigger id="type">
                            <SelectValue placeholder="Pilih tipe ujian" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="proposal">Ujian Proposal</SelectItem>
                            <SelectItem value="result">Ujian Hasil</SelectItem>
                            <SelectItem value="final">Ujian Tutup</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select value={editedExam.status} onValueChange={handleStatusChange}>
                          <SelectTrigger id="status">
                            <SelectValue placeholder="Pilih status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="applicant">Pendaftar</SelectItem>
                            <SelectItem value="pending">Menunggu</SelectItem>
                            <SelectItem value="scheduled">Terjadwal</SelectItem>
                            <SelectItem value="completed">Selesai</SelectItem>
                            <SelectItem value="passed">Lulus</SelectItem>
                            <SelectItem value="failed">Tidak Lulus</SelectItem>
                            <SelectItem value="cancelled">Dibatalkan</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="date">Tanggal dan Waktu</Label>
                        <Input
                          id="date"
                          type="datetime-local"
                          value={editedExam.date ? new Date(editedExam.date).toISOString().slice(0, 16) : ""}
                          onChange={(e) => handleInputChange("date", new Date(e.target.value).toISOString())}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Lokasi</Label>
                        <Input
                          id="location"
                          value={editedExam.location}
                          onChange={(e) => handleInputChange("location", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
                      <div>
                        <h3 className="text-lg font-semibold">{exam.studentName}</h3>
                        <p className="text-muted-foreground">{exam.studentId}</p>
                      </div>
                      <Button variant="outline" size="sm" className="self-start" onClick={() => setIsEditing(true)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                    <h2 className="text-xl font-bold">{exam.title}</h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {exam.date && exam.location ? (
                        <>
                          <div className="flex items-center">
                            <Calendar className="w-5 h-5 mr-2 text-muted-foreground" />
                            <span>{formatExamDate(exam.date)}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-5 h-5 mr-2 text-muted-foreground" />
                            <span>{exam.location}</span>
                          </div>
                        </>
                      ) : (
                        <div className="col-span-2">
                          <p className="italic text-muted-foreground">Belum dijadwalkan</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="advisors" className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
              {/* Advisors Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold">Pembimbing</h3>
                  {isEditing && (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setAdvisorType("advisor1")
                          setShowAdvisorDialog(true)
                        }}
                        className="gap-1"
                        disabled={!!editedExam.advisor1}
                      >
                        <Plus className="w-4 h-4" />
                        Pembimbing 1
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setAdvisorType("advisor2")
                          setShowAdvisorDialog(true)
                        }}
                        className="gap-1"
                        disabled={!!editedExam.advisor2}
                      >
                        <Plus className="w-4 h-4" />
                        Pembimbing 2
                      </Button>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {/* Advisor 1 */}
                  <div className="p-4 border rounded-lg border-border">
                    <h4 className="mb-3 text-sm font-medium text-muted-foreground">Pembimbing 1</h4>
                    {editedExam.advisor1 ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-12 h-12 border-2 border-primary/10">
                            <AvatarImage src={editedExam.advisor1.avatarUrl} alt={editedExam.advisor1.name} />
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {editedExam.advisor1.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{editedExam.advisor1.name}</p>
                            <p className="text-sm text-muted-foreground">{editedExam.advisor1.department}</p>
                          </div>
                        </div>
                        {isEditing && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                            onClick={() => handleRemoveAdvisor("advisor1")}
                          >
                            <Trash2 className="w-4 h-4" />
                            <span className="sr-only">Hapus</span>
                          </Button>
                        )}
                      </div>
                    ) : (
                      <div className="italic text-muted-foreground">Belum ada pembimbing 1</div>
                    )}
                  </div>

                  {/* Advisor 2 */}
                  <div className="p-4 border rounded-lg border-border">
                    <h4 className="mb-3 text-sm font-medium text-muted-foreground">Pembimbing 2</h4>
                    {editedExam.advisor2 ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-12 h-12 border-2 border-primary/10">
                            <AvatarImage src={editedExam.advisor2.avatarUrl} alt={editedExam.advisor2.name} />
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {editedExam.advisor2.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{editedExam.advisor2.name}</p>
                            <p className="text-sm text-muted-foreground">{editedExam.advisor2.department}</p>
                          </div>
                        </div>
                        {isEditing && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                            onClick={() => handleRemoveAdvisor("advisor2")}
                          >
                            <Trash2 className="w-4 h-4" />
                            <span className="sr-only">Hapus</span>
                          </Button>
                        )}
                      </div>
                    ) : (
                      <div className="italic text-muted-foreground">Belum ada pembimbing 2</div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="committee" className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
              {/* Committee Members Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold">Dosen Penguji</h3>
                  {isEditing && (
                    <Button variant="outline" size="sm" onClick={() => setShowCommitteeDialog(true)} className="gap-1">
                      <UserPlus className="w-4 h-4" />
                      Tambah Anggota
                    </Button>
                  )}
                </div>

                {editedExam.committee && editedExam.committee.length > 0 ? (
                  <div className="space-y-3">
                    {editedExam.committee.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center justify-between p-3 border rounded-lg border-border bg-card"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10 border border-border">
                            <AvatarImage src={member.avatarUrl} alt={member.name} />
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="text-xs font-normal">
                                {member.role}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{member.department}</span>
                            </div>
                          </div>
                        </div>
                        {isEditing && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                            onClick={() => handleRemoveCommitteeMember(member.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                            <span className="sr-only">Hapus</span>
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="italic text-muted-foreground">Belum ada dosen penguji</div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="documents" className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
              {/* Documents Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold">Dokumen Mahasiswa</h3>
                  {isEditing && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        toast({
                          title: "Fitur dalam pengembangan",
                          description: "Fitur upload dokumen akan segera tersedia.",
                        })
                      }
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Tambah Dokumen
                    </Button>
                  )}
                </div>

                {editedExam.documents && editedExam.documents.length > 0 ? (
                  <DocumentViewer documents={editedExam.documents} />
                ) : (
                  <div className="p-8 text-center border border-dashed rounded-lg">
                    <FileX className="w-12 h-12 mx-auto text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">Tidak ada dokumen</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Mahasiswa belum mengunggah dokumen apapun.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="flex items-center justify-between sm:justify-between">
            {isEditing ? (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditedExam({ ...exam })
                    setIsEditing(false)
                  }}
                >
                  Batal
                </Button>
                <Button onClick={handleSaveChanges}>
                  <Save className="w-4 h-4 mr-2" />
                  Simpan Perubahan
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  Tutup
                </Button>
                <Button onClick={() => setIsEditing(true)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </div>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <CommitteeMemberDialog
        open={showCommitteeDialog}
        onOpenChange={setShowCommitteeDialog}
        onAddMember={handleAddCommitteeMember}
        existingMembers={editedExam.committee || []}
        title="Tambah Dosen Penguji"
        description="Pilih dosen untuk ditambahkan sebagai penguji pada ujian ini"
      />

      {/* We would need to create an AdvisorDialog component similar to CommitteeMemberDialog */}
      {/* For now, we'll simulate it by reusing the CommitteeMemberDialog */}
      <CommitteeMemberDialog
        open={showAdvisorDialog}
        onOpenChange={setShowAdvisorDialog}
        onAddMember={(member) => {
          const advisor: Advisor = {
            id: member.id,
            name: member.name,
            department: member.department,
            avatarUrl: member.avatarUrl,
          }
          handleAddAdvisor(advisor)
        }}
        existingMembers={[
          ...(editedExam.advisor1
            ? [
              {
                id: editedExam.advisor1.id,
                name: editedExam.advisor1.name,
                department: editedExam.advisor1.department,
                avatarUrl: editedExam.advisor1.avatarUrl,
                role: "Pembimbing 1",
              },
            ]
            : []),
          ...(editedExam.advisor2
            ? [
              {
                id: editedExam.advisor2.id,
                name: editedExam.advisor2.name,
                department: editedExam.advisor2.department,
                avatarUrl: editedExam.advisor2.avatarUrl,
                role: "Pembimbing 2",
              },
            ]
            : []),
        ]}
        title={`Pilih ${advisorType === "advisor1" ? "Pembimbing 1" : "Pembimbing 2"}`}
        description={`Pilih dosen untuk ditugaskan sebagai ${advisorType === "advisor1" ? "Pembimbing 1" : "Pembimbing 2"} pada ujian ini`}
      />
    </>
  )
}

