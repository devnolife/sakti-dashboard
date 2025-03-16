"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, AlertTriangle } from "lucide-react"

// Mock data
const budgetTrackingData = [
  {
    id: "TRK-001",
    department: "Informatics",
    category: "Salaries",
    allocated: 1750000000,
    spent: 1200000000,
    remaining: 550000000,
    percentage: 68.6,
    status: "on-track",
  },
  {
    id: "TRK-002",
    department: "Informatics",
    category: "Facilities",
    allocated: 850000000,
    spent: 650000000,
    remaining: 200000000,
    percentage: 76.5,
    status: "on-track",
  },
  {
    id: "TRK-003",
    department: "Architecture",
    category: "Salaries",
    allocated: 1350000000,
    spent: 950000000,
    remaining: 400000000,
    percentage: 70.4,
    status: "on-track",
  },
  {
    id: "TRK-004",
    department: "Architecture",
    category: "Equipment",
    allocated: 750000000,
    spent: 780000000,
    remaining: -30000000,
    percentage: 104.0,
    status: "over-budget",
  },
  {
    id: "TRK-005",
    department: "Electrical",
    category: "Salaries",
    allocated: 1150000000,
    spent: 800000000,
    remaining: 350000000,
    percentage: 69.6,
    status: "on-track",
  },
  {
    id: "TRK-006",
    department: "Electrical",
    category: "Research",
    allocated: 650000000,
    spent: 680000000,
    remaining: -30000000,
    percentage: 104.6,
    status: "over-budget",
  },
  {
    id: "TRK-007",
    department: "Urban Planning",
    category: "Salaries",
    allocated: 1050000000,
    spent: 700000000,
    remaining: 350000000,
    percentage: 66.7,
    status: "on-track",
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

export function BudgetTrackingTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Pagination
  const totalPages = Math.ceil(budgetTrackingData.length / itemsPerPage)
  const paginatedData = budgetTrackingData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="space-y-4">
      <div className="rounded-md border border-muted/50 overflow-hidden bg-background/50 backdrop-blur-sm">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow className="hover:bg-muted/20">
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Allocated</TableHead>
              <TableHead>Spent</TableHead>
              <TableHead>Remaining</TableHead>
              <TableHead>Usage</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item, index) => (
              <TableRow
                key={item.id}
                className={`group transition-colors ${
                  index % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                } hover:bg-blue-50/30`}
              >
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-blue-100"
                  >
                    {item.department}
                  </Badge>
                </TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{formatCurrency(item.allocated)}</TableCell>
                <TableCell>{formatCurrency(item.spent)}</TableCell>
                <TableCell className={item.remaining < 0 ? "text-red-600 font-medium" : ""}>
                  {formatCurrency(item.remaining)}
                </TableCell>
                <TableCell>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        item.percentage > 100
                          ? "bg-gradient-to-r from-red-500 to-rose-500"
                          : item.percentage > 90
                            ? "bg-gradient-to-r from-amber-500 to-orange-500"
                            : "bg-gradient-to-r from-blue-500 to-indigo-500"
                      }`}
                      style={{ width: `${Math.min(item.percentage, 100)}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">{formatPercentage(item.percentage)}</span>
                </TableCell>
                <TableCell>
                  {item.status === "over-budget" ? (
                    <Badge
                      variant="outline"
                      className="bg-gradient-to-r from-red-50 to-rose-50 text-red-700 border-red-100 flex items-center gap-1"
                    >
                      <AlertTriangle className="h-3 w-3" />
                      Over Budget
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border-green-100"
                    >
                      On Track
                    </Badge>
                  )}
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
          {Math.min(currentPage * itemsPerPage, budgetTrackingData.length)} of {budgetTrackingData.length} entries
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="h-8 w-8 p-0 bg-gradient-to-r from-slate-50 to-blue-50 hover:bg-blue-100/50"
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
                      ? "bg-gradient-to-r from-blue-500 to-indigo-500"
                      : "bg-gradient-to-r from-slate-50 to-blue-50 hover:bg-blue-100/50"
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
            className="h-8 w-8 p-0 bg-gradient-to-r from-slate-50 to-blue-50 hover:bg-blue-100/50"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next page</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

