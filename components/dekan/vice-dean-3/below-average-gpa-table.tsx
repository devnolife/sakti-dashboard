"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Download, FileText } from "lucide-react"

interface BelowAverageGpaTableProps {
  departmentId: string
}

interface Student {
  id: string
  name: string
  nim: string
  department: string
  semester: number
  gpa: number
  averageGpa: number
  difference: number
  status: "warning" | "danger" | "critical"
}

export function BelowAverageGpaTable({ departmentId }: BelowAverageGpaTableProps) {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data for students with below-average GPA
  const allStudents: Student[] = [
    {
      id: "1",
      name: "Ahmad Rizky",
      nim: "1901234567",
      department: "Teknik Sipil - Irigasi",
      semester: 4,
      gpa: 2.3,
      averageGpa: 3.1,
      difference: -0.8,
      status: "danger",
    },
    {
      id: "2",
      name: "Budi Santoso",
      nim: "1901234568",
      department: "Teknik Elektro",
      semester: 6,
      gpa: 2.5,
      averageGpa: 3.2,
      difference: -0.7,
      status: "danger",
    },
    {
      id: "3",
      name: "Cindy Paramita",
      nim: "1901234569",
      department: "Arsitektur",
      semester: 3,
      gpa: 2.7,
      averageGpa: 3.3,
      difference: -0.6,
      status: "warning",
    },
    {
      id: "4",
      name: "Deni Kurniawan",
      nim: "1901234570",
      department: "Informatika",
      semester: 5,
      gpa: 2.2,
      averageGpa: 3.4,
      difference: -1.2,
      status: "critical",
    },
    {
      id: "5",
      name: "Eka Putri",
      nim: "1901234571",
      department: "Perencanaan Wilayah dan Kota",
      semester: 2,
      gpa: 2.6,
      averageGpa: 3.2,
      difference: -0.6,
      status: "warning",
    },
    {
      id: "6",
      name: "Faisal Rahman",
      nim: "1901234572",
      department: "Teknik Sipil - Irigasi",
      semester: 7,
      gpa: 2.1,
      averageGpa: 3.1,
      difference: -1.0,
      status: "critical",
    },
    {
      id: "7",
      name: "Gita Nirmala",
      nim: "1901234573",
      department: "Teknik Elektro",
      semester: 4,
      gpa: 2.8,
      averageGpa: 3.2,
      difference: -0.4,
      status: "warning",
    },
    {
      id: "8",
      name: "Hadi Prasetyo",
      nim: "1901234574",
      department: "Arsitektur",
      semester: 6,
      gpa: 2.4,
      averageGpa: 3.3,
      difference: -0.9,
      status: "danger",
    },
    {
      id: "9",
      name: "Indah Permata",
      nim: "1901234575",
      department: "Informatika",
      semester: 3,
      gpa: 2.9,
      averageGpa: 3.4,
      difference: -0.5,
      status: "warning",
    },
    {
      id: "10",
      name: "Joko Widodo",
      nim: "1901234576",
      department: "Perencanaan Wilayah dan Kota",
      semester: 5,
      gpa: 2.0,
      averageGpa: 3.2,
      difference: -1.2,
      status: "critical",
    },
  ]

  // Filter students based on department and search query
  const filteredStudents = allStudents
    .filter(
      (student) =>
        departmentId === "all" ||
        (departmentId === "civil" && student.department === "Teknik Sipil - Irigasi") ||
        (departmentId === "electrical" && student.department === "Teknik Elektro") ||
        (departmentId === "architecture" && student.department === "Arsitektur") ||
        (departmentId === "informatics" && student.department === "Informatika") ||
        (departmentId === "urban" && student.department === "Perencanaan Wilayah dan Kota"),
    )
    .filter(
      (student) => student.name.toLowerCase().includes(searchQuery.toLowerCase()) || student.nim.includes(searchQuery),
    )

  const getStatusBadge = (status: Student["status"]) => {
    switch (status) {
      case "warning":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-400 dark:border-yellow-800 px-2 py-0.5 rounded-md font-medium"
          >
            Perhatian
          </Badge>
        )
      case "danger":
        return (
          <Badge
            variant="outline"
            className="bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-400 dark:border-orange-800 px-2 py-0.5 rounded-md font-medium"
          >
            Peringatan
          </Badge>
        )
      case "critical":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800 px-2 py-0.5 rounded-md font-medium"
          >
            Kritis
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <Card className="border-none shadow-md bg-white dark:bg-gray-950 transition-all duration-200">
      <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 border-b">
        <CardTitle className="text-lg font-semibold text-primary-700 dark:text-primary-300">
          Mahasiswa dengan IPK Di Bawah Rata-rata
        </CardTitle>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <Download className="mr-2 h-4 w-4 text-primary-500" />
            Ekspor Excel
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <FileText className="mr-2 h-4 w-4 text-primary-500" />
            Ekspor PDF
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-4 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari berdasarkan nama atau NIM..."
              className="pl-8 border-gray-200 dark:border-gray-800 focus-visible:ring-primary-400 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="rounded-md border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-900">
                  <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
                    Nama
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
                    NIM
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
                    Program Studi
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
                    Semester
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
                    IPK
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
                    Rata-rata Prodi
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
                    Selisih
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <tr
                      key={student.id}
                      className="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                    >
                      <td className="whitespace-nowrap px-4 py-3 text-sm font-medium">{student.name}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                        {student.nim}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                        {student.department}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                        {student.semester}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm font-medium">{student.gpa.toFixed(2)}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                        {student.averageGpa.toFixed(2)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-red-600 dark:text-red-400">
                        {student.difference.toFixed(2)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm">{getStatusBadge(student.status)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-sm text-muted-foreground">
                      Tidak ada data mahasiswa yang ditemukan
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

