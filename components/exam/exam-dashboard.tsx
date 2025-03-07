"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExamStats } from "./exam-stats"
import { ExamTable } from "./exam-table"
import { ExamFilters } from "./exam-filters"
import { mockExams } from "./mock-data"
import type { Exam, ExamStatus, ExamType } from "@/types/exam"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ExamScheduleManager } from "./exam-schedule-manager"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation"

interface ExamDashboardProps {
  defaultTab?: "proposal" | "result" | "closed" | "schedule"
}

export default function ExamDashboard({ defaultTab = "proposal" }: ExamDashboardProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<ExamStatus | "all">("all")
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null)
  const [activeTab, setActiveTab] = useState(defaultTab)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Set the active tab when defaultTab changes
  useEffect(() => {
    setActiveTab(defaultTab)
  }, [defaultTab])

  // Filter exams based on search query and status
  const filterExams = (exams: Exam[]) => {
    return exams.filter((exam) => {
      const matchesSearch =
        searchQuery === "" ||
        exam.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.studentNIM.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.title.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus = statusFilter === "all" || exam.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }

  // Get exams by type
  const getExamsByType = (type: ExamType) => {
    return mockExams.filter((exam) => exam.type === type)
  }

  // Get closed exams (passed or failed)
  const getClosedExams = () => {
    return mockExams.filter((exam) => exam.status === "passed" || exam.status === "failed")
  }

  // Calculate stats
  const proposalExams = getExamsByType("proposal")
  const resultExams = getExamsByType("result")
  const closedExams = getClosedExams()

  const stats = [
    {
      title: "Total Exams",
      value: mockExams.length,
      description: "All registered exams",
    },
    {
      title: "Pending Review",
      value: mockExams.filter((exam) => exam.status === "pending").length,
      description: "Awaiting scheduling",
    },
    {
      title: "Scheduled",
      value: mockExams.filter((exam) => exam.status === "scheduled").length,
      description: "Ready for examination",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Exam Management</h1>
        <p className="text-muted-foreground">Manage student proposal and result examinations</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <ExamStats stats={stats} />
      </div>

      <Tabs defaultValue={defaultTab} value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger value="proposal">Proposal Exams ({proposalExams.length})</TabsTrigger>
          <TabsTrigger value="result">Result Exams ({resultExams.length})</TabsTrigger>
          <TabsTrigger value="closed">Closed Exams ({closedExams.length})</TabsTrigger>
          <TabsTrigger value="schedule">Exam Schedule Manager</TabsTrigger>
        </TabsList>

        {activeTab !== "schedule" && (
          <Card>
            <CardHeader className="pb-3 flex justify-between items-center">
              <div>
                <CardTitle>Examination List</CardTitle>
                <CardDescription>View and manage student examinations</CardDescription>
              </div>
              <Button onClick={() => setIsModalOpen(true)}>Add Exam</Button>
            </CardHeader>
            <CardContent>
              <ExamFilters
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
              />
              <TabsContent value="proposal">
                <ExamTable exams={filterExams(proposalExams)} onExamSelect={setSelectedExam} />
              </TabsContent>

              <TabsContent value="result">
                <ExamTable exams={filterExams(resultExams)} onExamSelect={setSelectedExam} />
              </TabsContent>

              <TabsContent value="closed">
                <ExamTable exams={filterExams(closedExams)} onExamSelect={setSelectedExam} />
              </TabsContent>
            </CardContent>
          </Card>
        )}

        <TabsContent value="schedule">
          <ExamScheduleManager />
        </TabsContent>
      </Tabs>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Exam</DialogTitle>
            <DialogDescription>Fill in the details to add a new exam.</DialogDescription>
          </DialogHeader>
          {/* Add form here */}
          <p>Form to add new exam will be here</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setIsModalOpen(false)
                router.refresh()
              }}
            >
              Add Exam
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

