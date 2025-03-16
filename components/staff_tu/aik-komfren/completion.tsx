"use client"

import { useState } from "react"
import { Search, Filter, Download, FileText, Calendar, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/components/ui/use-toast"

// Mock data for exam results
const mockExamResults = [
  {
    id: "1",
    studentName: "Ahmad Fauzi",
    studentNim: "12345678",
    faculty: "Teknik Informatika",
    examDate: "2023-06-15",
    examiner: "Dr. Abdul Rahman",
    score: 85,
    status: "passed",
    certificateNumber: "AIK-2023-001",
    feedback: "Good understanding of the material. Needs to improve on Quranic recitation.",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    studentName: "Siti Nurhaliza",
    studentNim: "12345679",
    faculty: "Ekonomi",
    examDate: "2023-06-15",
    examiner: "Dr. Abdul Rahman",
    score: 92,
    status: "passed",
    certificateNumber: "AIK-2023-002",
    feedback: "Excellent performance overall. Very good understanding of Islamic principles.",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    studentName: "Budi Santoso",
    studentNim: "12345680",
    faculty: "Hukum",
    examDate: "2023-06-15",
    examiner: "Dr. Abdul Rahman",
    score: 65,
    status: "failed",
    certificateNumber: "",
    feedback:
      "Needs significant improvement in understanding of Islamic principles and Quranic recitation. Recommended to attend additional classes.",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    studentName: "Dewi Kartika",
    studentNim: "12345681",
    faculty: "Kedokteran",
    examDate: "2023-06-16",
    examiner: "Dr. Siti Aisyah",
    score: 78,
    status: "passed",
    certificateNumber: "AIK-2023-003",
    feedback: "Good performance. Shows understanding of core concepts but needs to improve on application.",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    studentName: "Eko Prasetyo",
    studentNim: "12345682",
    faculty: "Teknik Sipil",
    examDate: "2023-06-16",
    examiner: "Dr. Siti Aisyah",
    score: 88,
    status: "passed",
    certificateNumber: "AIK-2023-004",
    feedback: "Very good understanding of Islamic principles and good Quranic recitation.",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "6",
    studentName: "Fitri Handayani",
    studentNim: "12345683",
    faculty: "Psikologi",
    examDate: "2023-06-17",
    examiner: "Prof. Bambang Sudjatmiko",
    score: 90,
    status: "passed",
    certificateNumber: "AIK-2023-005",
    feedback: "Excellent performance. Strong understanding of Islamic principles and very good Quranic recitation.",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "7",
    studentName: "Gunawan Wibisono",
    studentNim: "12345684",
    faculty: "Teknik Elektro",
    examDate: "2023-06-17",
    examiner: "Prof. Bambang Sudjatmiko",
    score: 60,
    status: "failed",
    certificateNumber: "",
    feedback: "Poor understanding of basic Islamic principles. Needs significant improvement in Quranic recitation.",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "8",
    studentName: "Hani Susanti",
    studentNim: "12345685",
    faculty: "Sastra Inggris",
    examDate: "2023-06-17",
    examiner: "Prof. Bambang Sudjatmiko",
    score: 82,
    status: "passed",
    certificateNumber: "AIK-2023-006",
    feedback: "Good performance overall. Shows good understanding of Islamic principles.",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
]

type ExamResult = (typeof mockExamResults)[0]

export function AikKomfrenCompletion() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterFaculty, setFilterFaculty] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<string | null>(null)
  const [filterExaminer, setFilterExaminer] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("all")
  const [selectedResult, setSelectedResult] = useState<ExamResult | null>(null)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)

  // Filter exam results based on search query and filters
  const filteredResults = mockExamResults.filter((result) => {
    const matchesSearch =
      result.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.studentNim.includes(searchQuery) ||
      result.faculty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.examiner.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFaculty = !filterFaculty || result.faculty === filterFaculty
    const matchesStatus = !filterStatus || result.status === filterStatus
    const matchesExaminer = !filterExaminer || result.examiner === filterExaminer

    if (activeTab === "all") {
      return matchesSearch && matchesFaculty && matchesStatus && matchesExaminer
    } else if (activeTab === "passed") {
      return matchesSearch && matchesFaculty && matchesExaminer && result.status === "passed"
    } else if (activeTab === "failed") {
      return matchesSearch && matchesFaculty && matchesExaminer && result.status === "failed"
    }

    return false
  })

  // Get unique faculties for filter dropdown
  const faculties = Array.from(new Set(mockExamResults.map((result) => result.faculty)))

  // Get unique examiners for filter dropdown
  const examiners = Array.from(new Set(mockExamResults.map((result) => result.examiner)))

  // Handle view details
  const handleViewDetails = (result: ExamResult) => {
    setSelectedResult(result)
    setIsDetailsDialogOpen(true)
  }

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "passed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Passed
          </Badge>
        )
      case "failed":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Failed
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  // Get score color
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 70) return "text-blue-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  // Get progress color
  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-green-600"
    if (score >= 70) return "bg-blue-600"
    if (score >= 60) return "bg-yellow-600"
    return "bg-red-600"
  }

  // Handle export results
  const handleExportResults = () => {
    toast({
      title: "Export Started",
      description: "Exam results are being exported to Excel format.",
    })
  }

  // Calculate statistics
  const totalExams = mockExamResults.length
  const passedExams = mockExamResults.filter((result) => result.status === "passed").length
  const failedExams = mockExamResults.filter((result) => result.status === "failed").length
  const passRate = (passedExams / totalExams) * 100
  const averageScore = mockExamResults.reduce((sum, result) => sum + result.score, 0) / totalExams

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">AIK Komfren Completion</h2>
          <p className="text-muted-foreground">View and manage AIK Komfren examination results.</p>
        </div>
        <Button className="flex items-center gap-2" onClick={handleExportResults}>
          <Download className="h-4 w-4" />
          <span>Export Results</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Exams</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalExams}</div>
            <p className="text-xs text-muted-foreground mt-1">All AIK Komfren exams</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pass Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{passRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              {passedExams} passed, {failedExams} failed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{averageScore.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground mt-1">Out of 100 points</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Certificates Issued</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{passedExams}</div>
            <p className="text-xs text-muted-foreground mt-1">For passed students</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Examination Results</CardTitle>
          <CardDescription>View and manage AIK Komfren examination results for all students.</CardDescription>
          <div className="flex flex-col md:flex-row gap-4 mt-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, NIM, faculty, or examiner..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span>Filter</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuItem
                    onClick={() => {
                      setFilterFaculty(null)
                      setFilterStatus(null)
                      setFilterExaminer(null)
                    }}
                  >
                    Clear All Filters
                  </DropdownMenuItem>
                  <DropdownMenuItem className="font-semibold">Faculty</DropdownMenuItem>
                  {faculties.map((faculty) => (
                    <DropdownMenuItem key={faculty} onClick={() => setFilterFaculty(faculty)}>
                      {faculty}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuItem className="font-semibold">Status</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("passed")}>Passed</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("failed")}>Failed</DropdownMenuItem>
                  <DropdownMenuItem className="font-semibold">Examiner</DropdownMenuItem>
                  {examiners.map((examiner) => (
                    <DropdownMenuItem key={examiner} onClick={() => setFilterExaminer(examiner)}>
                      {examiner}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline" onClick={handleExportResults}>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Tabs defaultValue="all" className="mt-4" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="all">All Results</TabsTrigger>
              <TabsTrigger value="passed">Passed</TabsTrigger>
              <TabsTrigger value="failed">Failed</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-12 gap-4 p-4 font-medium border-b bg-muted/50">
              <div className="col-span-4">Student</div>
              <div className="col-span-2">Exam Date</div>
              <div className="col-span-2">Examiner</div>
              <div className="col-span-1">Score</div>
              <div className="col-span-1">Status</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>
            <ScrollArea className="h-[500px]">
              {filteredResults.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No examination results found.</p>
                </div>
              ) : (
                filteredResults.map((result) => (
                  <div key={result.id} className="grid grid-cols-12 gap-4 p-4 border-b items-center">
                    <div className="col-span-4 flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={result.avatarUrl} alt={result.studentName} />
                        <AvatarFallback>{result.studentName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{result.studentName}</p>
                        <p className="text-xs text-muted-foreground">
                          {result.studentNim} - {result.faculty}
                        </p>
                      </div>
                    </div>
                    <div className="col-span-2 flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {new Date(result.examDate).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="col-span-2 flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{result.examiner}</span>
                    </div>
                    <div className="col-span-1">
                      <span className={`font-medium ${getScoreColor(result.score)}`}>{result.score}</span>
                    </div>
                    <div className="col-span-1">{getStatusBadge(result.status)}</div>
                    <div className="col-span-2 flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewDetails(result)}>
                        View Details
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </ScrollArea>
          </div>
        </CardContent>
      </Card>

      {/* Exam Result Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedResult && (
            <>
              <DialogHeader>
                <DialogTitle>Examination Result Details</DialogTitle>
                <DialogDescription>Detailed information about the AIK Komfren examination result.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={selectedResult.avatarUrl} alt={selectedResult.studentName} />
                    <AvatarFallback>{selectedResult.studentName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-medium">{selectedResult.studentName}</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedResult.studentNim} - {selectedResult.faculty}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      {getStatusBadge(selectedResult.status)}
                      {selectedResult.status === "passed" && (
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          Certificate: {selectedResult.certificateNumber}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Exam Date</p>
                    <p className="text-sm">
                      {new Date(selectedResult.examDate).toLocaleDateString("id-ID", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Examiner</p>
                    <p className="text-sm">{selectedResult.examiner}</p>
                  </div>
                </div>

                <div className="space-y-2 mt-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Score</p>
                    <p className={`text-lg font-bold ${getScoreColor(selectedResult.score)}`}>
                      {selectedResult.score}/100
                    </p>
                  </div>
                  <Progress
                    value={selectedResult.score}
                    max={100}
                    className="h-2"
                    indicatorClassName={getProgressColor(selectedResult.score)}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0</span>
                    <span>Passing Score: 70</span>
                    <span>100</span>
                  </div>
                </div>

                <div className="space-y-1 mt-2">
                  <p className="text-sm font-medium">Examiner Feedback</p>
                  <div className="p-3 rounded-md bg-muted">
                    <p className="text-sm">{selectedResult.feedback}</p>
                  </div>
                </div>
              </div>
              <DialogFooter>
                {selectedResult.status === "passed" && (
                  <Button className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>Print Certificate</span>
                  </Button>
                )}
                <Button variant="outline" onClick={() => setIsDetailsDialogOpen(false)}>
                  Close
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

