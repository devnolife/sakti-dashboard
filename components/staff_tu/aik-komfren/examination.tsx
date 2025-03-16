"use client"

import { useState } from "react"
import { UserPlus, Search, Calendar, Filter, UserCheck, ChevronDown, Plus } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { DatePicker } from "@/components/ui/date-picker"
import { toast } from "@/components/ui/use-toast"

// Mock data for students
const mockStudents = [
  {
    id: "1",
    name: "Ahmad Fauzi",
    nim: "12345678",
    faculty: "Teknik Informatika",
    registrationDate: "2023-05-15",
    paymentStatus: "paid",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Siti Nurhaliza",
    nim: "12345679",
    faculty: "Ekonomi",
    registrationDate: "2023-05-16",
    paymentStatus: "paid",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Budi Santoso",
    nim: "12345680",
    faculty: "Hukum",
    registrationDate: "2023-05-17",
    paymentStatus: "pending",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "Dewi Kartika",
    nim: "12345681",
    faculty: "Kedokteran",
    registrationDate: "2023-05-18",
    paymentStatus: "paid",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    name: "Eko Prasetyo",
    nim: "12345682",
    faculty: "Teknik Sipil",
    registrationDate: "2023-05-19",
    paymentStatus: "paid",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "6",
    name: "Fitri Handayani",
    nim: "12345683",
    faculty: "Psikologi",
    registrationDate: "2023-05-20",
    paymentStatus: "paid",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "7",
    name: "Gunawan Wibisono",
    nim: "12345684",
    faculty: "Teknik Elektro",
    registrationDate: "2023-05-21",
    paymentStatus: "pending",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "8",
    name: "Hani Susanti",
    nim: "12345685",
    faculty: "Sastra Inggris",
    registrationDate: "2023-05-22",
    paymentStatus: "paid",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "9",
    name: "Irfan Hakim",
    nim: "12345686",
    faculty: "Ilmu Komunikasi",
    registrationDate: "2023-05-23",
    paymentStatus: "paid",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "10",
    name: "Joko Widodo",
    nim: "12345687",
    faculty: "Ilmu Politik",
    registrationDate: "2023-05-24",
    paymentStatus: "paid",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
]

// Mock data for supervisors
const mockSupervisors = [
  {
    id: "1",
    name: "Dr. Abdul Rahman",
    faculty: "Teknik Informatika",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  { id: "2", name: "Dr. Siti Aisyah", faculty: "Ekonomi", avatarUrl: "/placeholder.svg?height=40&width=40" },
  { id: "3", name: "Prof. Bambang Sudjatmiko", faculty: "Hukum", avatarUrl: "/placeholder.svg?height=40&width=40" },
  { id: "4", name: "Dr. Dian Sastro", faculty: "Kedokteran", avatarUrl: "/placeholder.svg?height=40&width=40" },
  { id: "5", name: "Prof. Eko Patrio", faculty: "Teknik Sipil", avatarUrl: "/placeholder.svg?height=40&width=40" },
]

// Mock data for examination groups
const mockExamGroups = [
  {
    id: "1",
    name: "Group A",
    date: "2023-06-15",
    time: "09:00 - 12:00",
    location: "Ruang 101",
    supervisor: "Dr. Abdul Rahman",
    status: "scheduled",
    students: ["1", "2", "3"],
  },
  {
    id: "2",
    name: "Group B",
    date: "2023-06-16",
    time: "13:00 - 16:00",
    location: "Ruang 102",
    supervisor: "Dr. Siti Aisyah",
    status: "in-progress",
    students: ["4", "5"],
  },
  {
    id: "3",
    name: "Group C",
    date: "2023-06-17",
    time: "09:00 - 12:00",
    location: "Ruang 103",
    supervisor: "Prof. Bambang Sudjatmiko",
    status: "completed",
    students: ["6", "7", "8"],
  },
]

type Student = (typeof mockStudents)[0]
type Supervisor = (typeof mockSupervisors)[0]
type ExamGroup = (typeof mockExamGroups)[0]

export function AikKomfrenExamination() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterFaculty, setFilterFaculty] = useState<string | null>(null)
  const [filterPaymentStatus, setFilterPaymentStatus] = useState<string | null>(null)
  const [examGroups, setExamGroups] = useState<ExamGroup[]>(mockExamGroups)
  const [students, setStudents] = useState<Student[]>(mockStudents)
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])
  const [isCreateGroupDialogOpen, setIsCreateGroupDialogOpen] = useState(false)
  const [newGroupName, setNewGroupName] = useState("")
  const [newGroupDate, setNewGroupDate] = useState<Date | undefined>(undefined)
  const [newGroupTime, setNewGroupTime] = useState("")
  const [newGroupLocation, setNewGroupLocation] = useState("")
  const [newGroupSupervisor, setNewGroupSupervisor] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // Filter students based on search query and filters
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.nim.includes(searchQuery) ||
      student.faculty.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFaculty = !filterFaculty || student.faculty === filterFaculty
    const matchesPaymentStatus = !filterPaymentStatus || student.paymentStatus === filterPaymentStatus

    return matchesSearch && matchesFaculty && matchesPaymentStatus
  })

  // Get unique faculties for filter dropdown
  const faculties = Array.from(new Set(students.map((student) => student.faculty)))

  // Handle student selection
  const toggleStudentSelection = (studentId: string) => {
    if (selectedStudents.includes(studentId)) {
      setSelectedStudents(selectedStudents.filter((id) => id !== studentId))
    } else {
      setSelectedStudents([...selectedStudents, studentId])
    }
  }

  // Handle create group
  const handleCreateGroup = () => {
    if (
      !newGroupName ||
      !newGroupDate ||
      !newGroupTime ||
      !newGroupLocation ||
      !newGroupSupervisor ||
      selectedStudents.length === 0
    ) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields and select at least one student.",
        variant: "destructive",
      })
      return
    }

    const newGroup: ExamGroup = {
      id: (examGroups.length + 1).toString(),
      name: newGroupName,
      date: format(newGroupDate, "yyyy-MM-dd"),
      time: newGroupTime,
      location: newGroupLocation,
      supervisor: mockSupervisors.find((s) => s.id === newGroupSupervisor)?.name || "",
      status: "scheduled",
      students: [...selectedStudents],
    }

    setExamGroups([...examGroups, newGroup])
    setSelectedStudents([])
    setNewGroupName("")
    setNewGroupDate(undefined)
    setNewGroupTime("")
    setNewGroupLocation("")
    setNewGroupSupervisor("")
    setIsCreateGroupDialogOpen(false)

    toast({
      title: "Group Created",
      description: `Examination group "${newGroupName}" has been created successfully.`,
    })
  }

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Scheduled
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            In Progress
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Completed
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  // Get payment status badge
  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Paid
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Pending
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  // Filter exam groups based on active tab
  const filteredExamGroups = examGroups.filter((group) => {
    if (activeTab === "all") return true
    return group.status === activeTab
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">AIK Komfren Examination</h2>
          <p className="text-muted-foreground">
            Manage examination groups and assign supervisors for AIK Komfren exams.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={isCreateGroupDialogOpen} onOpenChange={setIsCreateGroupDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                <span>Create Exam Group</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create Examination Group</DialogTitle>
                <DialogDescription>
                  Create a new examination group and assign students and a supervisor.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="group-name" className="text-sm font-medium">
                      Group Name
                    </label>
                    <Input
                      id="group-name"
                      placeholder="Enter group name"
                      value={newGroupName}
                      onChange={(e) => setNewGroupName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="group-date" className="text-sm font-medium">
                      Examination Date
                    </label>
                    <DatePicker date={newGroupDate} setDate={setNewGroupDate} className="w-full" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="group-time" className="text-sm font-medium">
                      Time Slot
                    </label>
                    <Select onValueChange={setNewGroupTime}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time slot" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="08:00 - 10:00">08:00 - 10:00</SelectItem>
                        <SelectItem value="10:00 - 12:00">10:00 - 12:00</SelectItem>
                        <SelectItem value="13:00 - 15:00">13:00 - 15:00</SelectItem>
                        <SelectItem value="15:00 - 17:00">15:00 - 17:00</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="group-location" className="text-sm font-medium">
                      Location
                    </label>
                    <Input
                      id="group-location"
                      placeholder="Enter location"
                      value={newGroupLocation}
                      onChange={(e) => setNewGroupLocation(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="group-supervisor" className="text-sm font-medium">
                    Supervisor
                  </label>
                  <Select onValueChange={setNewGroupSupervisor}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select supervisor" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockSupervisors.map((supervisor) => (
                        <SelectItem key={supervisor.id} value={supervisor.id}>
                          {supervisor.name} ({supervisor.faculty})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Select Students</label>
                    <span className="text-xs text-muted-foreground">{selectedStudents.length} students selected</span>
                  </div>
                  <ScrollArea className="h-[200px] border rounded-md p-2">
                    <div className="space-y-2">
                      {students.map((student) => (
                        <div key={student.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`student-${student.id}`}
                            checked={selectedStudents.includes(student.id)}
                            onCheckedChange={() => toggleStudentSelection(student.id)}
                          />
                          <label
                            htmlFor={`student-${student.id}`}
                            className="flex items-center gap-2 text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={student.avatarUrl} alt={student.name} />
                              <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                              <span>{student.name}</span>
                              <span className="text-xs text-muted-foreground">
                                {student.nim} - {student.faculty}
                              </span>
                            </div>
                            {getPaymentStatusBadge(student.paymentStatus)}
                          </label>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateGroupDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateGroup}>Create Group</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle>Examination Groups</CardTitle>
            <CardDescription>Manage and monitor examination groups for AIK Komfren.</CardDescription>
            <Tabs defaultValue="all" className="mt-2" onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredExamGroups.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No examination groups found.</p>
                </div>
              ) : (
                filteredExamGroups.map((group) => (
                  <Card key={group.id} className="overflow-hidden">
                    <CardHeader className="pb-2 pt-4 px-4 flex flex-row items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{group.name}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>
                            {new Date(group.date).toLocaleDateString("id-ID", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                          <span>•</span>
                          <span>{group.time}</span>
                          <span>•</span>
                          <span>{group.location}</span>
                        </CardDescription>
                      </div>
                      {getStatusBadge(group.status)}
                    </CardHeader>
                    <CardContent className="px-4 pb-2 pt-0">
                      <div className="flex items-center gap-2 mb-2">
                        <UserCheck className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Supervisor:</span>
                        <span className="text-sm">{group.supervisor}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {group.students.map((studentId) => {
                          const student = students.find((s) => s.id === studentId)
                          if (!student) return null
                          return (
                            <div key={studentId} className="flex items-center gap-2 bg-muted p-1.5 rounded-md">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={student.avatarUrl} alt={student.name} />
                                <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span className="text-xs font-medium">{student.name}</span>
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                    <CardFooter className="px-4 py-2 flex justify-end border-t">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            Actions <ChevronDown className="ml-2 h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Group</DropdownMenuItem>
                          <DropdownMenuItem>Change Status</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Delete Group</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Registered Students</CardTitle>
            <CardDescription>Students registered for AIK Komfren examination.</CardDescription>
            <div className="flex items-center gap-2 mt-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search students..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuItem
                    onClick={() => {
                      setFilterFaculty(null)
                      setFilterPaymentStatus(null)
                    }}
                  >
                    Clear Filters
                  </DropdownMenuItem>
                  <DropdownMenuItem className="font-semibold">Faculty</DropdownMenuItem>
                  {faculties.map((faculty) => (
                    <DropdownMenuItem key={faculty} onClick={() => setFilterFaculty(faculty)}>
                      {faculty}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuItem className="font-semibold">Payment Status</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterPaymentStatus("paid")}>Paid</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterPaymentStatus("pending")}>Pending</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-2">
                {filteredStudents.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No students found.</p>
                  </div>
                ) : (
                  filteredStudents.map((student) => (
                    <div
                      key={student.id}
                      className={`flex items-center justify-between p-2 rounded-md hover:bg-muted ${
                        selectedStudents.includes(student.id) ? "bg-muted" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={selectedStudents.includes(student.id)}
                          onCheckedChange={() => toggleStudentSelection(student.id)}
                        />
                        <Avatar>
                          <AvatarImage src={student.avatarUrl} alt={student.name} />
                          <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{student.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {student.nim} - {student.faculty}
                          </p>
                        </div>
                      </div>
                      {getPaymentStatusBadge(student.paymentStatus)}
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="border-t pt-4 flex justify-between">
            <div className="text-sm text-muted-foreground">{selectedStudents.length} students selected</div>
            <Button size="sm" disabled={selectedStudents.length === 0} onClick={() => setIsCreateGroupDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Group
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

