"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Download, FileSpreadsheet } from "lucide-react"
import { Progress } from "@/components/ui/progress"

// Department financial data (in millions of Rupiah)
const departmentFinancialData = [
  {
    id: "dept-001",
    name: "Teknik Sipil - Irigasi",
    budget: 2100,
    spent: 1850,
    remaining: 250,
    percentUsed: 88,
    categories: {
      operational: 800,
      research: 400,
      development: 300,
      scholarships: 200,
      facilities: 400,
    },
    status: "normal",
  },
  {
    id: "dept-002",
    name: "Teknik Elektro",
    budget: 2500,
    spent: 2100,
    remaining: 400,
    percentUsed: 84,
    categories: {
      operational: 900,
      research: 600,
      development: 400,
      scholarships: 250,
      facilities: 350,
    },
    status: "normal",
  },
  {
    id: "dept-003",
    name: "Arsitektur",
    budget: 1800,
    spent: 1500,
    remaining: 300,
    percentUsed: 83,
    categories: {
      operational: 700,
      research: 300,
      development: 250,
      scholarships: 200,
      facilities: 350,
    },
    status: "normal",
  },
  {
    id: "dept-004",
    name: "Informatika",
    budget: 3200,
    spent: 2800,
    remaining: 400,
    percentUsed: 88,
    categories: {
      operational: 1200,
      research: 700,
      development: 500,
      scholarships: 300,
      facilities: 500,
    },
    status: "normal",
  },
  {
    id: "dept-005",
    name: "Perencanaan Wilayah & Kota",
    budget: 1900,
    spent: 1600,
    remaining: 300,
    percentUsed: 84,
    categories: {
      operational: 750,
      research: 350,
      development: 300,
      scholarships: 200,
      facilities: 300,
    },
    status: "normal",
  },
]

export function DepartmentFinancialTable() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredData = departmentFinancialData.filter((dept) =>
    dept.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusBadge = (status: string, percentUsed: number) => {
    if (percentUsed > 95) {
      return (
        <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-200">
          Kritis
        </Badge>
      )
    } else if (percentUsed > 85) {
      return (
        <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-200">
          Perhatian
        </Badge>
      )
    } else {
      return (
        <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-200">
          Normal
        </Badge>
      )
    }
  }

  const getProgressColor = (percentUsed: number) => {
    if (percentUsed > 95) {
      return "bg-red-600"
    } else if (percentUsed > 85) {
      return "bg-amber-500"
    } else {
      return "bg-green-600"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Cari departemen..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="hidden md:flex">
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Export Excel
          </Button>
          <Button variant="outline" size="sm" className="hidden md:flex">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Departemen</TableHead>
              <TableHead className="text-right">Total Anggaran</TableHead>
              <TableHead className="text-right">Terpakai</TableHead>
              <TableHead className="text-right">Sisa</TableHead>
              <TableHead className="text-center">Penggunaan</TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((dept) => (
              <TableRow key={dept.id}>
                <TableCell className="font-medium">{dept.name}</TableCell>
                <TableCell className="text-right">Rp {dept.budget.toLocaleString()} Juta</TableCell>
                <TableCell className="text-right">Rp {dept.spent.toLocaleString()} Juta</TableCell>
                <TableCell className="text-right">Rp {dept.remaining.toLocaleString()} Juta</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress
                      value={dept.percentUsed}
                      className="h-2"
                      indicatorClassName={getProgressColor(dept.percentUsed)}
                    />
                    <span className="text-xs font-medium">{dept.percentUsed}%</span>
                  </div>
                </TableCell>
                <TableCell className="text-center">{getStatusBadge(dept.status, dept.percentUsed)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

