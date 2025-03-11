"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, RefreshCw, Plus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { mockStudentExamData } from "../student/mock-student-exam-data"
import { ExamRequirementsList } from "./exam-requirements-list"
import { AddRequirementDialog } from "./add-requirement-dialog"
import { Badge } from "@/components/ui/badge"

export default function ExamRequirementsManagement() {
  const [activeTab, setActiveTab] = useState("proposal")
  const [searchQuery, setSearchQuery] = useState("")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [examData, setExamData] = useState(mockStudentExamData)

  // Clone the mock data for local state management
  useEffect(() => {
    setExamData({ ...mockStudentExamData })
  }, [])

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }

  const handleAddRequirement = (examType, requirement) => {
    setExamData((prevData) => {
      const newData = { ...prevData }
      const newId = `${examType}-req-${newData[`${examType}Exam`].requirements.length + 1}`

      newData[`${examType}Exam`].requirements.push({
        id: newId,
        title: requirement.title,
        description: requirement.description,
        completed: false,
      })

      return newData
    })
    setIsAddDialogOpen(false)
  }

  const handleUpdateRequirement = (examType, requirementId, updatedRequirement) => {
    setExamData((prevData) => {
      const newData = { ...prevData }
      const requirementIndex = newData[`${examType}Exam`].requirements.findIndex((req) => req.id === requirementId)

      if (requirementIndex !== -1) {
        newData[`${examType}Exam`].requirements[requirementIndex] = {
          ...newData[`${examType}Exam`].requirements[requirementIndex],
          ...updatedRequirement,
        }
      }

      return newData
    })
  }

  const handleDeleteRequirement = (examType, requirementId) => {
    setExamData((prevData) => {
      const newData = { ...prevData }
      newData[`${examType}Exam`].requirements = newData[`${examType}Exam`].requirements.filter(
        (req) => req.id !== requirementId,
      )
      return newData
    })
  }

  // Filter requirements based on search query
  const getFilteredRequirements = (examType) => {
    return examData[`${examType}Exam`].requirements.filter(
      (req) =>
        req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.description.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }

  return (
    <div className="container p-4 mx-auto space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Persyaratan Ujian</h1>
          <p className="text-muted-foreground">Kelola persyaratan untuk ujian proposal, hasil, dan sidang mahasiswa</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Card className="shadow-sm">
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex flex-col justify-between gap-4 mb-6 md:flex-row md:items-center">
              <TabsList className="mb-4 md:mb-0">
                <TabsTrigger value="proposal">
                  Ujian Proposal
                  <Badge variant="outline" className="ml-2">
                    {examData.proposalExam.requirements.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="result">
                  Ujian Hasil
                  <Badge variant="outline" className="ml-2">
                    {examData.resultExam.requirements.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="closing">
                  Ujian Tutup
                  <Badge variant="outline" className="ml-2">
                    {examData.closingExam.requirements.length}
                  </Badge>
                </TabsTrigger>
              </TabsList>

              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Cari persyaratan..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full sm:w-[250px] pl-9"
                  />
                </div>
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Persyaratan
                </Button>
              </div>
            </div>

            <TabsContent value="proposal" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Persyaratan Ujian Proposal</CardTitle>
                  <CardDescription>
                    Persyaratan yang harus dipenuhi mahasiswa sebelum mengikuti ujian proposal
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ExamRequirementsList
                    requirements={getFilteredRequirements("proposal")}
                    examType="proposal"
                    onUpdate={handleUpdateRequirement}
                    onDelete={handleDeleteRequirement}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="result" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Persyaratan Ujian Hasil</CardTitle>
                  <CardDescription>
                    Persyaratan yang harus dipenuhi mahasiswa sebelum mengikuti ujian hasil
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ExamRequirementsList
                    requirements={getFilteredRequirements("result")}
                    examType="result"
                    onUpdate={handleUpdateRequirement}
                    onDelete={handleDeleteRequirement}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="closing" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Persyaratan Ujian Sidang</CardTitle>
                  <CardDescription>
                    Persyaratan yang harus dipenuhi mahasiswa sebelum mengikuti ujian sidang
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ExamRequirementsList
                    requirements={getFilteredRequirements("closing")}
                    examType="closing"
                    onUpdate={handleUpdateRequirement}
                    onDelete={handleDeleteRequirement}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <AddRequirementDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        examType={activeTab}
        onAdd={handleAddRequirement}
      />
    </div>
  )
}

