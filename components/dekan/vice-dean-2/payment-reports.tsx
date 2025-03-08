"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { StudentPaymentList } from "./student-payment-list"
import { PaymentSummaryCards } from "./payment-summary-cards"
import { PaymentDetailView } from "./payment-detail-view"
import { Download, FileSpreadsheet, Search, SlidersHorizontal } from "lucide-react"

// Study program options
const studyPrograms = [
  { id: "civil", name: "Teknik Sipil - Irigasi" },
  { id: "electrical", name: "Teknik Elektro" },
  { id: "architecture", name: "Arsitektur" },
  { id: "informatics", name: "Informatika" },
  { id: "urban", name: "Perencanaan Wilayah dan Kota" },
]

export function PaymentReports() {
  const [selectedProgram, setSelectedProgram] = useState<string>("all")
  const [paymentType, setPaymentType] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null)

  const handleProgramChange = (value: string) => {
    setSelectedProgram(value)
    setSelectedStudent(null)
  }

  const handleStudentSelect = (studentId: string) => {
    setSelectedStudent(studentId)
  }

  const handleBackToList = () => {
    setSelectedStudent(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold tracking-tight">Laporan Pembayaran</h3>
          <p className="text-muted-foreground">Laporan pembayaran laboratorium dan ujian per program studi</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="hidden md:flex">
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Export Excel
          </Button>
          <Button size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>

      <Tabs defaultValue="laboratory" className="space-y-4">
        <TabsList>
          <TabsTrigger value="laboratory">Laboratorium</TabsTrigger>
          <TabsTrigger value="examination">Ujian</TabsTrigger>
          <TabsTrigger value="all">Semua Pembayaran</TabsTrigger>
        </TabsList>

        <TabsContent value="laboratory" className="space-y-4">
          {renderContent("laboratory")}
        </TabsContent>

        <TabsContent value="examination" className="space-y-4">
          {renderContent("examination")}
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          {renderContent("all")}
        </TabsContent>
      </Tabs>
    </div>
  )

  function renderContent(type: string) {
    return (
      <>
        {!selectedStudent ? (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Filter Laporan</CardTitle>
                <CardDescription>Pilih program studi dan periode untuk melihat laporan pembayaran</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Program Studi</label>
                    <Select value={selectedProgram} onValueChange={handleProgramChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Program Studi" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Semua Program Studi</SelectItem>
                        {studyPrograms.map((program) => (
                          <SelectItem key={program.id} value={program.id}>
                            {program.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Periode</label>
                    <DatePickerWithRange />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Cari Mahasiswa</label>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Nama atau NIM..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <PaymentSummaryCards programId={selectedProgram} paymentType={type} />

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Daftar Pembayaran Mahasiswa</CardTitle>
                  <CardDescription>
                    {selectedProgram === "all"
                      ? "Semua program studi"
                      : `Program studi ${studyPrograms.find((p) => p.id === selectedProgram)?.name}`}
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </CardHeader>
              <CardContent>
                <StudentPaymentList
                  programId={selectedProgram}
                  paymentType={type}
                  searchQuery={searchQuery}
                  onSelectStudent={handleStudentSelect}
                />
              </CardContent>
            </Card>
          </>
        ) : (
          <PaymentDetailView
            studentId={selectedStudent}
            programId={selectedProgram}
            paymentType={type}
            onBack={handleBackToList}
          />
        )}
      </>
    )
  }
}

