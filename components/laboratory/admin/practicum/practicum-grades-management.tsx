"use client"

import { useState } from "react"
import { Download, FileSpreadsheet, Filter, Plus, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import PracticumGradeStats from "./practicum-grade-stats"
import PracticumGradesTable from "./practicum-grades-table"
import PracticumGradesImportDialog from "./practicum-grades-import-dialog"
import PracticumGradeFilterDropdown from "./practicum-grade-filter-dropdown"
import PracticumBatchGradeUpdateDialog from "./practicum-batch-grade-update-dialog"

// Import mock data
import { mockPracticumCourses } from "./mock-practicum-data"
import { generateMockStudentGrades } from "./mock-practicum-grades"

export default function PracticumGradesManagement() {
  const [selectedCourseId, setSelectedCourseId] = useState<string>(mockPracticumCourses[0].id)
  const [openImportDialog, setOpenImportDialog] = useState(false)
  const [openBatchUpdateDialog, setOpenBatchUpdateDialog] = useState(false)

  // Generate mock student grades for the selected course
  const studentGrades = generateMockStudentGrades(selectedCourseId)

  // Function to handle export to CSV
  const handleExportCSV = () => {
    const headers =
      "Student ID,Student Name,Lab Section,Midterm Score,Final Score,Assignment Score,Lab Report Score,Attendance Score,Final Grade\n"

    const csvData = studentGrades
      .map(
        (grade) =>
          `${grade.studentId},${grade.studentName},${grade.labSection},${grade.scores.midterm},${grade.scores.final},${grade.scores.assignments},${grade.scores.labReports},${grade.scores.attendance},${grade.finalGrade}`,
      )
      .join("\n")

    const csvContent = headers + csvData
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `practicum_grades_${selectedCourseId}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Practicum Grades Management</h2>
          <p className="text-muted-foreground">Manage and analyze student grades for laboratory practicum courses</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setOpenImportDialog(true)}>
            <Upload className="mr-2 h-4 w-4" />
            Import Grades
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportCSV}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <Tabs defaultValue="grades" className="space-y-4">
        <TabsList>
          <TabsTrigger value="grades">Grades Overview</TabsTrigger>
          <TabsTrigger value="analytics">Grade Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="grades" className="space-y-4">
          <PracticumGradeStats grades={studentGrades} />

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              <PracticumGradeFilterDropdown
                courses={mockPracticumCourses}
                selectedCourseId={selectedCourseId}
                onSelectCourse={setSelectedCourseId}
              />
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                More Filters
              </Button>
            </div>
            <Button size="sm" onClick={() => setOpenBatchUpdateDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Batch Update Grades
            </Button>
          </div>

          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-xl">Student Grades</CardTitle>
              <CardDescription>
                View and manage grades for all students in the selected practicum course
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PracticumGradesTable grades={studentGrades} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Grade Distribution</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  <FileSpreadsheet className="mr-2 h-6 w-6" />
                  <span>Grade distribution chart will be displayed here</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  <FileSpreadsheet className="mr-2 h-6 w-6" />
                  <span>Performance trend chart will be displayed here</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Component Analysis</CardTitle>
              <CardDescription>Analysis of student performance across different grading components</CardDescription>
            </CardHeader>
            <CardContent className="h-64">
              <div className="flex h-full items-center justify-center text-muted-foreground">
                <FileSpreadsheet className="mr-2 h-6 w-6" />
                <span>Component analysis chart will be displayed here</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Import Grades Dialog */}
      <PracticumGradesImportDialog open={openImportDialog} onOpenChange={setOpenImportDialog} />

      {/* Batch Update Grades Dialog */}
      <PracticumBatchGradeUpdateDialog
        open={openBatchUpdateDialog}
        onOpenChange={setOpenBatchUpdateDialog}
        course={mockPracticumCourses.find((c) => c.id === selectedCourseId)}
      />
    </div>
  )
}

