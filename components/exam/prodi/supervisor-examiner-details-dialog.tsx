"use client"

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { FileText, Users, UserPlus, Save, Trash2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AssignLecturerDialog } from "./assign-lecturer-dialog"
import type { SupervisorExaminerData, Lecturer } from "./types"

interface SupervisorExaminerDetailsDialogProps {
  data: SupervisorExaminerData
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SupervisorExaminerDetailsDialog({ data, open, onOpenChange }: SupervisorExaminerDetailsDialogProps) {
  const [activeTab, setActiveTab] = useState("details")
  const [supervisors, setSupervisors] = useState(data.supervisors || [])
  const [examiners, setExaminers] = useState(data.examiners || [])
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false)
  const [assignmentType, setAssignmentType] = useState<"supervisor" | "examiner">("supervisor")

  const handleSaveAssignments = () => {
    toast({
      title: "Penugasan disimpan",
      description: "Penugasan dosen pembimbing dan penguji telah berhasil disimpan",
    })
    // In a real app, you would update the assignments in the database
    onOpenChange(false)
  }

  const handleOpenAssignDialog = (type: "supervisor" | "examiner") => {
    setAssignmentType(type)
    setIsAssignDialogOpen(true)
  }

  const handleAssignLecturer = (lecturer: Lecturer) => {
    if (assignmentType === "supervisor") {
      // Check if we already have this lecturer as a supervisor
      if (!supervisors.some((s) => s.id === lecturer.id)) {
        setSupervisors([...supervisors, { ...lecturer, role: "Pembimbing" }])
      }
    } else {
      // Check if we already have this lecturer as an examiner
      if (!examiners.some((e) => e.id === lecturer.id)) {
        setExaminers([...examiners, { ...lecturer, role: "Penguji" }])
      }
    }
    setIsAssignDialogOpen(false)
  }

  const handleRemoveSupervisor = (id: string) => {
    setSupervisors(supervisors.filter((s) => s.id !== id))
  }

  const handleRemoveExaminer = (id: string) => {
    setExaminers(examiners.filter((e) => e.id !== id))
  }

  const handleUpdateRole = (id: string, role: string, type: "supervisor" | "examiner") => {
    if (type === "supervisor") {
      setSupervisors(
        supervisors.map((s) => {
          if (s.id === id) {
            return { ...s, role }
          }
          return s
        }),
      )
    } else {
      setExaminers(
        examiners.map((e) => {
          if (e.id === id) {
            return { ...e, role }
          }
          return e
        }),
      )
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
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              Penugasan Dosen {getExamTypeBadge(data.examType)}
            </DialogTitle>
            <DialogDescription>Kelola dosen pembimbing dan penguji untuk ujian ini</DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details" className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                Detail
              </TabsTrigger>
              <TabsTrigger value="supervisors" className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                Pembimbing
              </TabsTrigger>
              <TabsTrigger value="examiners" className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                Penguji
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details">
              <Card>
                <CardHeader>
                  <CardTitle>{data.title}</CardTitle>
                  <CardDescription>Detail ujian</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Nama Mahasiswa</Label>
                      <div className="font-medium">{data.studentName}</div>
                    </div>
                    <div>
                      <Label>NIM</Label>
                      <div className="font-medium">{data.studentId}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Program Studi</Label>
                      <div className="font-medium">{data.program}</div>
                    </div>
                    <div>
                      <Label>Tipe Ujian</Label>
                      <div className="font-medium flex items-center gap-2">{getExamTypeBadge(data.examType)}</div>
                    </div>
                  </div>

                  <div>
                    <Label>Status Penugasan</Label>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center justify-between p-2 border rounded-md">
                        <div>Dosen Pembimbing</div>
                        <Badge
                          variant="outline"
                          className={
                            supervisors.length > 0
                              ? "bg-green-50 text-green-700 border-green-200"
                              : "bg-yellow-50 text-yellow-700 border-yellow-200"
                          }
                        >
                          {supervisors.length > 0 ? "Ditugaskan" : "Belum Ditugaskan"}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 border rounded-md">
                        <div>Dosen Penguji</div>
                        <Badge
                          variant="outline"
                          className={
                            examiners.length > 0
                              ? "bg-green-50 text-green-700 border-green-200"
                              : "bg-yellow-50 text-yellow-700 border-yellow-200"
                          }
                        >
                          {examiners.length > 0 ? "Ditugaskan" : "Belum Ditugaskan"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="supervisors">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Dosen Pembimbing</CardTitle>
                      <CardDescription>Kelola dosen pembimbing untuk ujian ini</CardDescription>
                    </div>
                    <Button onClick={() => handleOpenAssignDialog("supervisor")}>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Tambah Pembimbing
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {supervisors.length > 0 ? (
                      supervisors.map((supervisor, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={supervisor.avatarUrl} alt={supervisor.name} />
                              <AvatarFallback>
                                {supervisor.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{supervisor.name}</div>
                              <div className="text-sm text-muted-foreground">{supervisor.department}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Select
                              value={supervisor.role}
                              onValueChange={(value) => handleUpdateRole(supervisor.id, value, "supervisor")}
                            >
                              <SelectTrigger className="w-[140px]">
                                <SelectValue placeholder="Pilih peran" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Pembimbing Utama">Pembimbing Utama</SelectItem>
                                <SelectItem value="Pembimbing Pendamping">Pembimbing Pendamping</SelectItem>
                                <SelectItem value="Pembimbing">Pembimbing</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-500"
                              onClick={() => handleRemoveSupervisor(supervisor.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Hapus</span>
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        Belum ada dosen pembimbing yang ditugaskan
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="examiners">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Dosen Penguji</CardTitle>
                      <CardDescription>Kelola dosen penguji untuk ujian ini</CardDescription>
                    </div>
                    <Button onClick={() => handleOpenAssignDialog("examiner")}>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Tambah Penguji
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {examiners.length > 0 ? (
                      examiners.map((examiner, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={examiner.avatarUrl} alt={examiner.name} />
                              <AvatarFallback>
                                {examiner.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{examiner.name}</div>
                              <div className="text-sm text-muted-foreground">{examiner.department}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Select
                              value={examiner.role}
                              onValueChange={(value) => handleUpdateRole(examiner.id, value, "examiner")}
                            >
                              <SelectTrigger className="w-[140px]">
                                <SelectValue placeholder="Pilih peran" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Ketua Penguji">Ketua Penguji</SelectItem>
                                <SelectItem value="Sekretaris">Sekretaris</SelectItem>
                                <SelectItem value="Penguji">Penguji</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-500"
                              onClick={() => handleRemoveExaminer(examiner.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Hapus</span>
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        Belum ada dosen penguji yang ditugaskan
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Batal
            </Button>
            <Button onClick={handleSaveAssignments}>
              <Save className="mr-2 h-4 w-4" />
              Simpan Penugasan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AssignLecturerDialog
        open={isAssignDialogOpen}
        onOpenChange={setIsAssignDialogOpen}
        onAssign={handleAssignLecturer}
        type={assignmentType}
        existingLecturers={assignmentType === "supervisor" ? supervisors : examiners}
      />
    </>
  )
}

