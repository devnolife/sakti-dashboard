"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Edit, Save } from "lucide-react"
import { Input } from "@/components/ui/input"

// Mock data
const budgetPlanningData = [
  {
    id: "PLN-001",
    department: "Informatics",
    category: "Salaries",
    currentBudget: 1750000000,
    plannedBudget: 1925000000,
    change: 10.0,
    editable: true,
  },
  {
    id: "PLN-002",
    department: "Informatics",
    category: "Facilities",
    currentBudget: 850000000,
    plannedBudget: 935000000,
    change: 10.0,
    editable: true,
  },
  {
    id: "PLN-003",
    department: "Architecture",
    category: "Salaries",
    currentBudget: 1350000000,
    plannedBudget: 1485000000,
    change: 10.0,
    editable: true,
  },
  {
    id: "PLN-004",
    department: "Architecture",
    category: "Equipment",
    currentBudget: 750000000,
    plannedBudget: 825000000,
    change: 10.0,
    editable: true,
  },
  {
    id: "PLN-005",
    department: "Electrical",
    category: "Salaries",
    currentBudget: 1150000000,
    plannedBudget: 1265000000,
    change: 10.0,
    editable: true,
  },
  {
    id: "PLN-006",
    department: "Electrical",
    category: "Research",
    currentBudget: 650000000,
    plannedBudget: 715000000,
    change: 10.0,
    editable: true,
  },
  {
    id: "PLN-007",
    department: "Urban Planning",
    category: "Salaries",
    currentBudget: 1050000000,
    plannedBudget: 1155000000,
    change: 10.0,
    editable: true,
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

export function BudgetPlanningTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const [data, setData] = useState(budgetPlanningData)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState<number>(0)

  const itemsPerPage = 5

  // Pagination
  const totalPages = Math.ceil(data.length / itemsPerPage)
  const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleEdit = (id: string, currentValue: number) => {
    setEditingId(id)
    setEditValue(currentValue)
  }

  const handleSave = (id: string) => {
    setData(
      data.map((item) => {
        if (item.id === id) {
          const change = ((editValue - item.currentBudget) / item.currentBudget) * 100
          return {
            ...item,
            plannedBudget: editValue,
            change,
          }
        }
        return item
      }),
    )
    setEditingId(null)
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border border-muted/50 overflow-hidden bg-background/50 backdrop-blur-sm">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow className="hover:bg-muted/20">
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Current Budget</TableHead>
              <TableHead>Planned Budget</TableHead>
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
                } hover:bg-violet-50/30`}
              >
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="bg-gradient-to-r from-violet-50 to-indigo-50 text-violet-700 border-violet-100"
                  >
                    {item.department}
                  </Badge>
                </TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{formatCurrency(item.currentBudget)}</TableCell>
                <TableCell>
                  {editingId === item.id ? (
                    <Input
                      type="number"
                      value={editValue}
                      onChange={(e) => setEditValue(Number(e.target.value))}
                      className="w-40 h-8"
                    />
                  ) : (
                    formatCurrency(item.plannedBudget)
                  )}
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      item.change > 0
                        ? "bg-green-100 text-green-800"
                        : item.change < 0
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {item.change > 0 ? "+" : ""}
                    {formatPercentage(item.change)}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {editingId === item.id ? (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                        onClick={() => handleSave(item.id)}
                      >
                        <Save className="h-4 w-4" />
                        <span className="sr-only">Save</span>
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-violet-600 hover:text-violet-700 hover:bg-violet-50"
                        onClick={() => handleEdit(item.id, item.plannedBudget)}
                        disabled={!item.editable}
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                    )}
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
          Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, data.length)} of{" "}
          {data.length} entries
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="h-8 w-8 p-0 bg-gradient-to-r from-slate-50 to-violet-50 hover:bg-violet-100/50"
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
                      ? "bg-gradient-to-r from-violet-500 to-indigo-500"
                      : "bg-gradient-to-r from-slate-50 to-violet-50 hover:bg-violet-100/50"
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
            className="h-8 w-8 p-0 bg-gradient-to-r from-slate-50 to-violet-50 hover:bg-violet-100/50"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next page</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

