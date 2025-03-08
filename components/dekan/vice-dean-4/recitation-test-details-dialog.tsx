"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockRecitationTests } from "./mock-recitation-data"
import { User, Calendar, Award, FileText, UserCheck } from "lucide-react"

interface RecitationTestDetailsDialogProps {
  testId: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function RecitationTestDetailsDialog({ testId, open, onOpenChange }: RecitationTestDetailsDialogProps) {
  const test = mockRecitationTests.find((t) => t.id === testId)

  if (!test) {
    return null
  }

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-gradient-to-b from-background to-background/80">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
            Detail Tes Hafalan
          </DialogTitle>
          <DialogDescription>Informasi lengkap tentang hasil tes hafalan mahasiswa</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="student-info" className="mt-4">
          <TabsList className="grid grid-cols-2 bg-muted/50 p-1">
            <TabsTrigger
              value="student-info"
              className="data-[state=active]:bg-white data-[state=active]:text-primary-700 data-[state=active]:shadow-sm transition-all"
            >
              Informasi Mahasiswa
            </TabsTrigger>
            <TabsTrigger
              value="evaluation"
              className="data-[state=active]:bg-white data-[state=active]:text-primary-700 data-[state=active]:shadow-sm transition-all"
            >
              Hasil Evaluasi
            </TabsTrigger>
          </TabsList>

          <TabsContent value="student-info" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border-primary-100 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-md font-medium flex items-center">
                    <User className="h-4 w-4 mr-2 text-primary-600" />
                    Informasi Mahasiswa
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-3">
                    <span className="text-sm text-muted-foreground">NIM</span>
                    <span className="text-sm font-medium col-span-2">{test.studentId}</span>
                  </div>
                  <div className="grid grid-cols-3">
                    <span className="text-sm text-muted-foreground">Nama</span>
                    <span className="text-sm font-medium col-span-2">{test.studentName}</span>
                  </div>
                  <div className="grid grid-cols-3">
                    <span className="text-sm text-muted-foreground">Jurusan</span>
                    <span className="text-sm font-medium col-span-2">{test.department}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary-100 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-md font-medium flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-primary-600" />
                    Informasi Tes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-3">
                    <span className="text-sm text-muted-foreground">ID Tes</span>
                    <span className="text-sm font-medium col-span-2">{test.id}</span>
                  </div>
                  <div className="grid grid-cols-3">
                    <span className="text-sm text-muted-foreground">Tanggal</span>
                    <span className="text-sm font-medium col-span-2">
                      {new Date(test.testDate).toLocaleDateString("id-ID")}
                    </span>
                  </div>
                  <div className="grid grid-cols-3">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <span className="text-sm font-medium col-span-2">
                      <Badge className="bg-green-100 text-green-800">Lulus</Badge>
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-primary-100 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-md font-medium flex items-center">
                  <UserCheck className="h-4 w-4 mr-2 text-primary-600" />
                  Informasi Penguji
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="grid grid-cols-5">
                  <span className="text-sm text-muted-foreground">ID Staff</span>
                  <span className="text-sm font-medium col-span-4">{test.staffId}</span>
                </div>
                <div className="grid grid-cols-5">
                  <span className="text-sm text-muted-foreground">Nama</span>
                  <span className="text-sm font-medium col-span-4">{test.staffName}</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="evaluation" className="space-y-4 mt-4">
            <Card className="border-primary-100 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-md font-medium flex items-center">
                  <Award className="h-4 w-4 mr-2 text-primary-600" />
                  Hasil Penilaian
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-primary-50 p-4 rounded-lg text-center">
                    <div className="text-sm text-muted-foreground mb-1">Nilai</div>
                    <div className="text-3xl font-bold text-primary-700">{test.score}</div>
                  </div>
                  <div className="bg-primary-50 p-4 rounded-lg text-center">
                    <div className="text-sm text-muted-foreground mb-1">Grade</div>
                    <div className="flex justify-center">
                      <Badge className={`text-xl px-3 py-1 ${getGradeColor(test.grade)}`}>{test.grade}</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary-100 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-md font-medium flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-primary-600" />
                  Detail Evaluasi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <p className="text-sm">{test.evaluationDetails}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

