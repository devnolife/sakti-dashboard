"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Edit, Trash } from "lucide-react"

// Mock data
const budgetAllocationData = [
  {
    id: "BUD-001",
    department: "Informatics",
    category: "Salaries",
    amount: 1750000000,
    percentage: 14.0,
    previousYear: 1600000000,
    change: 9.4,
  },
  {
    id: "BUD-002",
    department: "Informatics",
    category: "Facilities",
    amount: 850000000,
    percentage: 6.8,
    previousYear: 800000000,
    change: 6.3,
  },
  {
    id: "BUD-003",
    department: "Architecture",
    category: "Salaries",
    amount: 1350000000,
    percentage: 10.8,
    previousYear: 1250000000,
    change: 8.0,
  },
  {
    id: "BUD-004",
    department: "Architecture",
    category: "Equipment",
    amount: 750000000,
    percentage: 6.0,
    previousYear: 700000000,
    change: 7.1,
  },
  {
    id: "BUD-005",
    department: "Electrical",
    category: "Salaries",
    amount: 1150000000,
    percentage: 9.2,
    previousYear: 1100000000,
    change: 4.5,
  },
  {
    id: "BUD-006",
    department: "Electrical",
    category: "Research",
    amount: 650000000,
    percentage: 5.2,
    previousYear: 600000000,
    change: 8.3,
  },
  {
    id: "BUD-007",
    department: "Urban Planning",
    category: "Salaries",
    amount: 1050000000,
    percentage: 8.4,
    previousYear: 1000000000,
    change: 5.0,
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

// Helper function to format percentage
const formatPercentage = (value: number) => {
  return `${value.toFixed(1)}%`
}

export function BudgetAllocationTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Pagination
  const totalPages = Math.ceil(budgetAllocationData.length / itemsPerPage)
  const paginatedData = budgetAllocationData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="space-y-4">
      <div className="rounded-md border border-muted/50 overflow-hidden bg-background/50 backdrop-blur-sm">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow className="hover:bg-muted/20">
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Percentage</TableHead>
              <TableHead>Previous Year</TableHead>
              <TableHead>Change</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item, index) => (
              <TableRow
                key={item.id}
                className={`group transition-colors ${
                  index % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                } hover:bg-cyan-50/30`}
              >
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="bg-gradient-to-r from-cyan-50 to-teal-50 text-cyan-700 border-cyan-100"
                  >
                    {item.department}
                  </Badge>
                </TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell className="font-medium">{formatCurrency(item.amount)}</TableCell>
                <TableCell>{formatPercentage(item.percentage)}</TableCell>
                <TableCell>{formatCurrency(item.previousYear)}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      item.change > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {item.change > 0 ? "+" : ""}
                    {formatPercentage(item.change)}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50"
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, budgetAllocationData.length)} of {budgetAllocationData.length} entries
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="h-8 w-8 p-0 bg-gradient-to-r from-slate-50 to-cyan-50 hover:bg-cyan-100/50"
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
                      ? "bg-gradient-to-r from-cyan-500 to-teal-500"
                      : "bg-gradient-to-r from-slate-50 to-cyan-50 hover:bg-cyan-100/50"
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
            className="h-8 w-8 p-0 bg-gradient-to-r from-slate-50 to-cyan-50 hover:bg-cyan-100/50"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next page</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

