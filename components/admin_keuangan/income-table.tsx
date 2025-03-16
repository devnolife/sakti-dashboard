"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Mock data
const incomeData = [
  {
    id: "INC-20230105-001",
    source: "Tuition Fees",
    department: "Informatics",
    amount: 125000000,
    date: "2023-01-05",
    semester: "2022/2023-1",
    status: "completed",
    reference: "TRX-78901234",
  },
  {
    id: "INC-20230110-002",
    source: "Registration Fees",
    department: "Architecture",
    amount: 35000000,
    date: "2023-01-10",
    semester: "2022/2023-1",
    status: "completed",
    reference: "TRX-12345678",
  },
  {
    id: "INC-20230115-003",
    source: "Laboratory Fees",
    department: "Electrical",
    amount: 28000000,
    date: "2023-01-15",
    semester: "2022/2023-1",
    status: "completed",
    reference: "TRX-56781234",
  },
  {
    id: "INC-20230120-004",
    source: "Dormitory Fees",
    department: "Urban Planning",
    amount: 15000000,
    date: "2023-01-20",
    semester: "2022/2023-1",
    status: "completed",
    reference: "TRX-20230120",
  },
  {
    id: "INC-20230125-005",
    source: "Other Income",
    department: "Watering",
    amount: 8500000,
    date: "2023-01-25",
    semester: "2022/2023-1",
    status: "completed",
    reference: "TRX-45678901",
  },
  {
    id: "INC-20230205-006",
    source: "Tuition Fees",
    department: "Informatics",
    amount: 130000000,
    date: "2023-02-05",
    semester: "2022/2023-2",
    status: "completed",
    reference: "TRX-87654321",
  },
  {
    id: "INC-20230210-007",
    source: "Registration Fees",
    department: "Architecture",
    amount: 38000000,
    date: "2023-02-10",
    semester: "2022/2023-2",
    status: "completed",
    reference: "TRX-12348765",
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
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}

export function IncomeTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Pagination
  const totalPages = Math.ceil(incomeData.length / itemsPerPage)
  const paginatedData = incomeData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="space-y-4">
      <div className="rounded-md border border-muted/50 overflow-hidden bg-background/50 backdrop-blur-sm">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow className="hover:bg-muted/20">
              <TableHead className="w-[120px]">Transaction ID</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Semester</TableHead>
              <TableHead>Reference</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item, index) => (
              <TableRow
                key={item.id}
                className={`group transition-colors ${
                  index % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                } hover:bg-green-50/30`}
              >
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border-green-100"
                  >
                    {item.source}
                  </Badge>
                </TableCell>
                <TableCell>{item.department}</TableCell>
                <TableCell>{formatDate(item.date)}</TableCell>
                <TableCell className="font-medium">{formatCurrency(item.amount)}</TableCell>
                <TableCell>{item.semester}</TableCell>
                <TableCell className="font-mono text-xs">{item.reference}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, incomeData.length)} of{" "}
          {incomeData.length} entries
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="h-8 w-8 p-0 bg-gradient-to-r from-slate-50 to-green-50 hover:bg-green-100/50"
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
                      ? "bg-gradient-to-r from-green-500 to-emerald-500"
                      : "bg-gradient-to-r from-slate-50 to-green-50 hover:bg-green-100/50"
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
            className="h-8 w-8 p-0 bg-gradient-to-r from-slate-50 to-green-50 hover:bg-green-100/50"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next page</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

