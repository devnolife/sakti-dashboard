"use client"

import { useState } from "react"
import { Search, Filter, Download, CheckCircle, AlertCircle, Calendar, CreditCard, Mail, Phone } from "lucide-react"

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
import { toast } from "@/components/ui/use-toast"

// Mock data for registered students
const mockRegisteredStudents = [
  {
    id: "1",
    name: "Ahmad Fauzi",
    nim: "12345678",
    faculty: "Teknik Informatika",
    registrationDate: "2023-05-15",
    paymentStatus: "paid",
    paymentDate: "2023-05-16",
    paymentMethod: "Bank Transfer",
    paymentAmount: 50000,
    email: "ahmad.fauzi@example.com",
    phone: "081234567890",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Siti Nurhaliza",
    nim: "12345679",
    faculty: "Ekonomi",
    registrationDate: "2023-05-16",
    paymentStatus: "paid",
    paymentDate: "2023-05-17",
    paymentMethod: "Virtual Account",
    paymentAmount: 50000,
    email: "siti.nurhaliza@example.com",
    phone: "081234567891",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Budi Santoso",
    nim: "12345680",
    faculty: "Hukum",
    registrationDate: "2023-05-17",
    paymentStatus: "pending",
    paymentDate: "",
    paymentMethod: "",
    paymentAmount: 50000,
    email: "budi.santoso@example.com",
    phone: "081234567892",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "Dewi Kartika",
    nim: "12345681",
    faculty: "Kedokteran",
    registrationDate: "2023-05-18",
    paymentStatus: "paid",
    paymentDate: "2023-05-19",
    paymentMethod: "E-Wallet",
    paymentAmount: 50000,
    email: "dewi.kartika@example.com",
    phone: "081234567893",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    name: "Eko Prasetyo",
    nim: "12345682",
    faculty: "Teknik Sipil",
    registrationDate: "2023-05-19",
    paymentStatus: "paid",
    paymentDate: "2023-05-20",
    paymentMethod: "Bank Transfer",
    paymentAmount: 50000,
    email: "eko.prasetyo@example.com",
    phone: "081234567894",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "6",
    name: "Fitri Handayani",
    nim: "12345683",
    faculty: "Psikologi",
    registrationDate: "2023-05-20",
    paymentStatus: "paid",
    paymentDate: "2023-05-21",
    paymentMethod: "Virtual Account",
    paymentAmount: 50000,
    email: "fitri.handayani@example.com",
    phone: "081234567895",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "7",
    name: "Gunawan Wibisono",
    nim: "12345684",
    faculty: "Teknik Elektro",
    registrationDate: "2023-05-21",
    paymentStatus: "pending",
    paymentDate: "",
    paymentMethod: "",
    paymentAmount: 50000,
    email: "gunawan.wibisono@example.com",
    phone: "081234567896",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "8",
    name: "Hani Susanti",
    nim: "12345685",
    faculty: "Sastra Inggris",
    registrationDate: "2023-05-22",
    paymentStatus: "paid",
    paymentDate: "2023-05-23",
    paymentMethod: "E-Wallet",
    paymentAmount: 50000,
    email: "hani.susanti@example.com",
    phone: "081234567897",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "9",
    name: "Irfan Hakim",
    nim: "12345686",
    faculty: "Ilmu Komunikasi",
    registrationDate: "2023-05-23",
    paymentStatus: "paid",
    paymentDate: "2023-05-24",
    paymentMethod: "Bank Transfer",
    paymentAmount: 50000,
    email: "irfan.hakim@example.com",
    phone: "081234567898",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "10",
    name: "Joko Widodo",
    nim: "12345687",
    faculty: "Ilmu Politik",
    registrationDate: "2023-05-24",
    paymentStatus: "paid",
    paymentDate: "2023-05-25",
    paymentMethod: "Virtual Account",
    paymentAmount: 50000,
    email: "joko.widodo@example.com",
    phone: "081234567899",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
]

type RegisteredStudent = (typeof mockRegisteredStudents)[0]

export function AikKomfrenRegistration() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterFaculty, setFilterFaculty] = useState<string | null>(null)
  const [filterPaymentStatus, setFilterPaymentStatus] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("all")
  const [selectedStudent, setSelectedStudent] = useState<RegisteredStudent | null>(null)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)

  // Filter students based on search query and filters
  const filteredStudents = mockRegisteredStudents.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.nim.includes(searchQuery) ||
      student.faculty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.phone.includes(searchQuery)

    const matchesFaculty = !filterFaculty || student.faculty === filterFaculty
    const matchesPaymentStatus = !filterPaymentStatus || student.paymentStatus === filterPaymentStatus

    if (activeTab === "all") {
      return matchesSearch && matchesFaculty && matchesPaymentStatus
    } else if (activeTab === "paid") {
      return matchesSearch && matchesFaculty && student.paymentStatus === "paid"
    } else if (activeTab === "pending") {
      return matchesSearch && matchesFaculty && student.paymentStatus === "pending"
    }

    return false
  })

  // Get unique faculties for filter dropdown
  const faculties = Array.from(new Set(mockRegisteredStudents.map((student) => student.faculty)))

  // Handle view details
  const handleViewDetails = (student: RegisteredStudent) => {
    setSelectedStudent(student)
    setIsDetailsDialogOpen(true)
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

  // Handle export registrations
  const handleExportRegistrations = () => {
    toast({
      title: "Export Started",
      description: "Registration data is being exported to Excel format.",
    })
  }

  // Handle verify payment
  const handleVerifyPayment = (studentId: string) => {
    toast({
      title: "Payment Verified",
      description: "The student's payment has been verified successfully.",
    })
  }

  // Calculate statistics
  const totalRegistrations = mockRegisteredStudents.length
  const paidRegistrations = mockRegisteredStudents.filter((student) => student.paymentStatus === "paid").length
  const pendingRegistrations = mockRegisteredStudents.filter((student) => student.paymentStatus === "pending").length
  const paymentRate = (paidRegistrations / totalRegistrations) * 100
  const totalRevenue = mockRegisteredStudents
    .filter((student) => student.paymentStatus === "paid")
    .reduce((sum, student) => sum + student.paymentAmount, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">AIK Komfren Registration</h2>
          <p className="text-muted-foreground">View and manage student registrations for AIK Komfren examination.</p>
        </div>
        <Button className="flex items-center gap-2" onClick={handleExportRegistrations}>
          <Download className="h-4 w-4" />
          <span>Export Registrations</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRegistrations}</div>
            <p className="text-xs text-muted-foreground mt-1">All registered students</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Payment Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{paymentRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              {paidRegistrations} paid, {pendingRegistrations} pending
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">Rp {totalRevenue.toLocaleString("id-ID")}</div>
            <p className="text-xs text-muted-foreground mt-1">From paid registrations</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{pendingRegistrations}</div>
            <p className="text-xs text-muted-foreground mt-1">Awaiting payment verification</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Registered Students</CardTitle>
          <CardDescription>View and manage students registered for AIK Komfren examination.</CardDescription>
          <div className="flex flex-col md:flex-row gap-4 mt-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, NIM, faculty, email, or phone..."
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
                      setFilterPaymentStatus(null)
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
                  <DropdownMenuItem className="font-semibold">Payment Status</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterPaymentStatus("paid")}>Paid</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterPaymentStatus("pending")}>Pending</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline" onClick={handleExportRegistrations}>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Tabs defaultValue="all" className="mt-4" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="all">All Registrations</TabsTrigger>
              <TabsTrigger value="paid">Paid</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-12 gap-4 p-4 font-medium border-b bg-muted/50">
              <div className="col-span-4">Student</div>
              <div className="col-span-2">Registration Date</div>
              <div className="col-span-2">Faculty</div>
              <div className="col-span-2">Payment Status</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>
            <ScrollArea className="h-[500px]">
              {filteredStudents.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No registered students found.</p>
                </div>
              ) : (
                filteredStudents.map((student) => (
                  <div key={student.id} className="grid grid-cols-12 gap-4 p-4 border-b items-center">
                    <div className="col-span-4 flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={student.avatarUrl} alt={student.name} />
                        <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-xs text-muted-foreground">{student.nim}</p>
                      </div>
                    </div>
                    <div className="col-span-2 flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {new Date(student.registrationDate).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-sm">{student.faculty}</span>
                    </div>
                    <div className="col-span-2">{getPaymentStatusBadge(student.paymentStatus)}</div>
                    <div className="col-span-2 flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewDetails(student)}>
                        View Details
                      </Button>
                      {student.paymentStatus === "pending" && (
                        <Button size="sm" onClick={() => handleVerifyPayment(student.id)}>
                          Verify Payment
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </ScrollArea>
          </div>
        </CardContent>
      </Card>

      {/* Student Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedStudent && (
            <>
              <DialogHeader>
                <DialogTitle>Student Registration Details</DialogTitle>
                <DialogDescription>
                  Detailed information about the student's AIK Komfren registration.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={selectedStudent.avatarUrl} alt={selectedStudent.name} />
                    <AvatarFallback>{selectedStudent.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-medium">{selectedStudent.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedStudent.nim} - {selectedStudent.faculty}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      {getPaymentStatusBadge(selectedStudent.paymentStatus)}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Registration Date</p>
                    <p className="text-sm flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {new Date(selectedStudent.registrationDate).toLocaleDateString("id-ID", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Faculty</p>
                    <p className="text-sm">{selectedStudent.faculty}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      {selectedStudent.email}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      {selectedStudent.phone}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Payment Information</h4>
                  <div className="rounded-md border p-4 bg-muted/50">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Payment Status</p>
                        <p className="text-sm flex items-center gap-2">
                          {selectedStudent.paymentStatus === "paid" ? (
                            <>
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <span className="text-green-600 font-medium">Paid</span>
                            </>
                          ) : (
                            <>
                              <AlertCircle className="h-4 w-4 text-yellow-600" />
                              <span className="text-yellow-600 font-medium">Pending</span>
                            </>
                          )}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Amount</p>
                        <p className="text-sm flex items-center gap-2">
                          <CreditCard className="h-4 w-4 text-muted-foreground" />
                          Rp {selectedStudent.paymentAmount.toLocaleString("id-ID")}
                        </p>
                      </div>
                    </div>

                    {selectedStudent.paymentStatus === "paid" && (
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Payment Date</p>
                          <p className="text-sm">
                            {new Date(selectedStudent.paymentDate).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Payment Method</p>
                          <p className="text-sm">{selectedStudent.paymentMethod}</p>
                        </div>
                      </div>
                    )}

                    {selectedStudent.paymentStatus === "pending" && (
                      <div className="mt-4">
                        <Button
                          className="w-full"
                          onClick={() => {
                            handleVerifyPayment(selectedStudent.id)
                            setIsDetailsDialogOpen(false)
                          }}
                        >
                          Verify Payment
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <DialogFooter>
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

