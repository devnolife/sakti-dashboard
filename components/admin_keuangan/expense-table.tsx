"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Mock data
const expenseData = [
  {
    id: "EXP-20230105-001",
    category: "Salaries",
    department: "Informatics",
    amount: 85000000,
    date: "2023-01-05",
    type: "Operational",
    reference: "TRX-78901234",
  },
  {
    id: "EXP-20230110-002",
    category: "Facilities",
    department: "Architecture",
    amount: 45000000,
    date: "2023-01-10",
    type: "Capital",
    reference: "TRX-12345678",
  },
  {
    id: "EXP-20230115-003",
    category: "Equipment",
    department: "Electrical",
    amount: 32000000,
    date: "2023-01-15",
    type: "Capital",
    reference: "TRX-56781234",
  },
  {
    id: "EXP-20230120-004",
    category: "Utilities",
    department: "Urban Planning",
    amount: 18000000,
    date: "2023-01-20",
    type: "Operational",
    reference: "TRX-20230120",
  },
  {
    id: "EXP-20230125-005",
    category: "Other",
    department: "Watering",
    amount: 12500000,
    date: "2023-01-25",
    type: "Operational",
    reference: "TRX-45678901",
  },
  {
    id: "EXP-20230205-006",
    category: "Salaries",
    department: "Informatics",
    amount: 87000000,
    date: "2023-02-05",
    type: "Operational",
    reference: "TRX-87654321",
  },
  {
    id: "EXP-20230210-007",
    category: "Equipment",
    department: "Architecture",
    amount: 28000000,
    date: "2023-02-10",
    type: "Capital",
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

export function ExpenseTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Pagination
  const totalPages = Math.ceil(expenseData.length / itemsPerPage)
  const paginatedData = expenseData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="space-y-4">
      <div className="rounded-md border border-muted/50 overflow-hidden bg-background/50 backdrop-blur-sm">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow className="hover:bg-muted/20">
              <TableHead className="w-[120px]">Transaction ID</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Reference</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item, index) => (
              <TableRow
                key={item.id}
                className={`group transition-colors ${
                  index % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                } hover:bg-red-50/30`}
              >
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="bg-gradient-to-r from-red-50 to-rose-50 text-red-700 border-red-100"
                  >
                    {item.category}
                  </Badge>
                </TableCell>
                <TableCell>{item.department}</TableCell>
                <TableCell>{formatDate(item.date)}</TableCell>
                <TableCell className="font-medium">{formatCurrency(item.amount)}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      item.type === "Operational"
                        ? "bg-gradient-to-r from-blue-50 to-sky-50 text-blue-700 border-blue-100"
                        : "bg-gradient-to-r from-purple-50 to-violet-50 text-purple-700 border-purple-100"
                    }
                  >
                    {item.type}
                  </Badge>
                </TableCell>
                <TableCell className="font-mono text-xs">{item.reference}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, expenseData.length)}{" "}
          of {expenseData.length} entries
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="h-8 w-8 p-0 bg-gradient-to-r from-slate-50 to-red-50 hover:bg-red-100/50"
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
                      ? "bg-gradient-to-r from-red-500 to-rose-500"
                      : "bg-gradient-to-r from-slate-50 to-red-50 hover:bg-red-100/50"
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
            className="h-8 w-8 p-0 bg-gradient-to-r from-slate-50 to-red-50 hover:bg-red-100/50"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next page</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

