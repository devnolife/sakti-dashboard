"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Mock data
const studentPaymentData = [
  {
    id: "2023001",
    name: "Ahmad Fauzi",
    department: "Informatics",
    semester: 3,
    totalAmount: 5000000,
    paidAmount: 5000000,
    status: "paid",
    lastPayment: "2023-01-05",
  },
  {
    id: "2023002",
    name: "Siti Nurhaliza",
    department: "Architecture",
    semester: 3,
    totalAmount: 5500000,
    paidAmount: 5500000,
    status: "paid",
    lastPayment: "2023-01-10",
  },
  {
    id: "2023003",
    name: "Budi Santoso",
    department: "Electrical",
    semester: 3,
    totalAmount: 4800000,
    paidAmount: 2400000,
    status: "partial",
    lastPayment: "2023-01-15",
  },
  {
    id: "2023004",
    name: "Dewi Kartika",
    department: "Urban Planning",
    semester: 3,
    totalAmount: 5200000,
    paidAmount: 5200000,
    status: "scholarship",
    lastPayment: "2023-01-20",
  },
  {
    id: "2023005",
    name: "Rudi Hartono",
    department: "Watering",
    semester: 3,
    totalAmount: 4500000,
    paidAmount: 0,
    status: "unpaid",
    lastPayment: null,
  },
  {
    id: "2023006",
    name: "Rina Marlina",
    department: "Informatics",
    semester: 3,
    totalAmount: 5000000,
    paidAmount: 5000000,
    status: "paid",
    lastPayment: "2023-02-05",
  },
  {
    id: "2023007",
    name: "Doni Kusuma",
    department: "Architecture",
    semester: 3,
    totalAmount: 5500000,
    paidAmount: 2750000,
    status: "partial",
    lastPayment: "2023-02-10",
  },
]

// Helper function to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Helper function to format date
const formatDate = (dateString: string | null) => {
  if (!dateString) return "-"
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}

// Helper function to get initials from name
const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
}

// Status colors and configurations
const statusConfig: Record<string, { color: string }> = {
  paid: {
    color: "bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border-green-100",
  },
  partial: {
    color: "bg-gradient-to-r from-blue-50 to-sky-50 text-blue-700 border-blue-100",
  },
  unpaid: {
    color: "bg-gradient-to-r from-red-50 to-rose-50 text-red-700 border-red-100",
  },
  scholarship: {
    color: "bg-gradient-to-r from-purple-50 to-violet-50 text-purple-700 border-purple-100",
  },
}

export function StudentPaymentTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Pagination
  const totalPages = Math.ceil(studentPaymentData.length / itemsPerPage)
  const paginatedData = studentPaymentData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="space-y-4">
      <div className="rounded-md border border-muted/50 overflow-hidden bg-background/50 backdrop-blur-sm">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow className="hover:bg-muted/20">
              <TableHead className="w-[100px]">Student ID</TableHead>
              <TableHead>Student</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Semester</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead>Paid Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Payment</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((student, index) => (
              <TableRow
                key={student.id}
                className={`group transition-colors ${
                  index % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                } hover:bg-purple-50/30`}
              >
                <TableCell className="font-medium">{student.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8 border border-muted bg-gradient-to-br from-slate-100 to-purple-50">
                      <AvatarFallback className="bg-primary/5 text-primary">{getInitials(student.name)}</AvatarFallback>
                    </Avatar>
                    <div className="font-medium">{student.name}</div>
                  </div>
                </TableCell>
                <TableCell>{student.department}</TableCell>
                <TableCell>{student.semester}</TableCell>
                <TableCell>{formatCurrency(student.totalAmount)}</TableCell>
                <TableCell>{formatCurrency(student.paidAmount)}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={statusConfig[student.status].color}>
                    {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>{formatDate(student.lastPayment)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, studentPaymentData.length)} of {studentPaymentData.length} entries
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="h-8 w-8 p-0 bg-gradient-to-r from-slate-50 to-purple-50 hover:bg-purple-100/50"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous page</span>
          </Button>
          <div className="flex items-center">
            {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => {
              const page = i + 1
              return (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className={`h-8 w-8 p-0 ${
                    currentPage === page
                      ? "bg-gradient-to-r from-purple-500 to-indigo-500"
                      : "bg-gradient-to-r from-slate-50 to-purple-50 hover:bg-purple-100/50"
                  }`}
                >
                  {page}
                </Button>
              )
            })}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="h-8 w-8 p-0 bg-gradient-to-r from-slate-50 to-purple-50 hover:bg-purple-100/50"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next page</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

