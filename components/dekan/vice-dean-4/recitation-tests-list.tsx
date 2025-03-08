"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import { mockRecitationTests } from "./mock-recitation-data"
import { RecitationTestDetailsDialog } from "./recitation-test-details-dialog"

interface RecitationTestsListProps {
  searchQuery: string
  selectedDepartment: string | null
}

export function RecitationTestsList({ searchQuery, selectedDepartment }: RecitationTestsListProps) {
  const [selectedTest, setSelectedTest] = useState<string | null>(null)

  // Filter tests based on search query and selected department
  const filteredTests = mockRecitationTests.filter((test) => {
    const matchesSearch =
      test.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.staffName.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesDepartment = !selectedDepartment || test.department === selectedDepartment

    return matchesSearch && matchesDepartment
  })

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A":
        return "bg-green-100 text-green-800"
      case "B":
        return "bg-blue-100 text-blue-800"
      case "C":
        return "bg-yellow-100 text-yellow-800"
      case "D":
        return "bg-orange-100 text-orange-800"
      case "E":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="shadow-md border-primary-100">
      <CardContent className="p-0">
        <div className="rounded-md border">
          <Table>
            <TableHeader className="bg-primary-50">
              <TableRow>
                <TableHead className="w-[100px]">NIM</TableHead>
                <TableHead>Nama Mahasiswa</TableHead>
                <TableHead>Jurusan</TableHead>
                <TableHead>Tanggal Tes</TableHead>
                <TableHead>Nilai</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Staff Penguji</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTests.length > 0 ? (
                filteredTests.map((test) => (
                  <TableRow key={test.id} className="hover:bg-primary-50/50 transition-colors">
                    <TableCell className="font-medium">{test.studentId}</TableCell>
                    <TableCell>{test.studentName}</TableCell>
                    <TableCell>{test.department}</TableCell>
                    <TableCell>{new Date(test.testDate).toLocaleDateString("id-ID")}</TableCell>
                    <TableCell>{test.score}</TableCell>
                    <TableCell>
                      <Badge className={`${getGradeColor(test.grade)}`}>{test.grade}</Badge>
                    </TableCell>
                    <TableCell>{test.staffName}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedTest(test.id)}
                        className="hover:bg-primary-100 hover:text-primary-700"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Detail
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                    Tidak ada data yang sesuai dengan kriteria pencarian
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {selectedTest && (
        <RecitationTestDetailsDialog
          testId={selectedTest}
          open={!!selectedTest}
          onOpenChange={(open) => !open && setSelectedTest(null)}
        />
      )}
    </Card>
  )
}

