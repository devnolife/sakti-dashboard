"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Download, CheckCircle2, Star, Award } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { motion, AnimatePresence } from "framer-motion"

// Sample data for completed labs
const completedLabs = [
  {
    id: "lab-3",
    title: "Laboratorium Pengembangan Web",
    description: "Membangun aplikasi web responsif menggunakan framework dan teknologi modern.",
    image: "/placeholder.svg?height=200&width=400",
    instructor: "Prof. Joko Widodo",
    instructorImage: "/placeholder.svg?height=100&width=100",
    schedule: "Senin & Rabu, 15:00 - 17:00",
    completionDate: "30 September 2023",
    grade: "A",
    score: 92,
    feedback:
      "Pekerjaan yang sangat baik pada proyek akhir. Aplikasi web Anda menunjukkan pemahaman yang kuat tentang React dan prinsip-prinsip desain responsif.",
    assignments: [
      { id: "a1", title: "Pengembangan Frontend", dueDate: "10 Sep 2023", status: "completed", score: 90 },
      { id: "a2", title: "Integrasi Backend", dueDate: "20 Sep 2023", status: "completed", score: 88 },
      { id: "a3", title: "Proyek Akhir", dueDate: "30 Sep 2023", status: "completed", score: 95 },
    ],
    certificate: true,
    semester: "Genap 2022/2023",
    color: "orange",
  },
  {
    id: "lab-7",
    title: "Laboratorium Grafika Komputer",
    description: "Mempelajari pemrograman grafika 2D dan 3D serta teknik visualisasi.",
    image: "/placeholder.svg?height=200&width=400",
    instructor: "Dr. Maya Indira",
    instructorImage: "/placeholder.svg?height=100&width=100",
    schedule: "Selasa & Kamis, 10:00 - 12:00",
    completionDate: "15 Juni 2023",
    grade: "B+",
    score: 85,
    feedback:
      "Pemahaman yang baik tentang konsep grafika. Proyek akhir Anda menunjukkan kreativitas, meskipun ada beberapa optimasi kinerja yang masih bisa diterapkan.",
    assignments: [
      { id: "a1", title: "Dasar Grafika 2D", dueDate: "5 Mei 2023", status: "completed", score: 82 },
      { id: "a2", title: "Pemodelan 3D", dueDate: "20 Mei 2023", status: "completed", score: 84 },
      { id: "a3", title: "Proyek Animasi", dueDate: "10 Juni 2023", status: "completed", score: 88 },
    ],
    certificate: true,
    semester: "Genap 2022/2023",
    color: "purple",
  },
  {
    id: "lab-8",
    title: "Laboratorium Sistem Operasi",
    description: "Implementasi praktis dari konsep dan prinsip sistem operasi.",
    image: "/placeholder.svg?height=200&width=400",
    instructor: "Prof. Bambang Sutejo",
    instructorImage: "/placeholder.svg?height=100&width=100",
    schedule: "Jumat, 13:00 - 16:00",
    completionDate: "20 Januari 2023",
    grade: "A-",
    score: 88,
    feedback:
      "Pemahaman yang kuat tentang konsep sistem operasi. Implementasi penjadwal proses Anda sangat baik.",
    assignments: [
      { id: "a1", title: "Manajemen Proses", dueDate: "10 Des 2022", status: "completed", score: 90 },
      { id: "a2", title: "Manajemen Memori", dueDate: "25 Des 2022", status: "completed", score: 85 },
      { id: "a3", title: "Implementasi Sistem File", dueDate: "15 Jan 2023", status: "completed", score: 88 },
    ],
    certificate: true,
    semester: "Ganjil 2022/2023",
    color: "teal",
  },
]

export function CompletedLabsTab() {
  const [selectedLab, setSelectedLab] = useState<any>(null)
  const [isCertificateOpen, setIsCertificateOpen] = useState(false)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const handleViewCertificate = (lab: any) => {
    setSelectedLab(lab)
    setIsCertificateOpen(true)
  }

  const handleViewDetails = (lab: any) => {
    setSelectedLab(lab)
    setIsDetailsOpen(true)
  }

  // Helper function to get star rating based on grade
  const getStarRating = (grade: string) => {
    switch (grade) {
      case "A":
        return 5
      case "A-":
        return 4.5
      case "B+":
        return 4
      case "B":
        return 3.5
      case "B-":
        return 3
      case "C+":
        return 2.5
      case "C":
        return 2
      default:
        return 0
    }
  }

  // Render star rating
  const renderStarRating = (grade: string) => {
    const rating = getStarRating(grade)
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
        ))}
        {hasHalfStar && <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />}
        {[...Array(5 - Math.ceil(rating))].map((_, i) => (
          <Star key={i + fullStars + (hasHalfStar ? 1 : 0)} className="w-4 h-4 text-muted-foreground" />
        ))}
      </div>
    )
  }

  // Helper function to get color gradient based on lab color
  const getColorGradient = (color: string) => {
    switch (color) {
      case "blue":
        return "from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30"
      case "green":
        return "from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30"
      case "purple":
        return "from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30"
      case "orange":
        return "from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30"
      case "red":
        return "from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/30"
      case "teal":
        return "from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/30"
      default:
        return "from-gray-50 to-slate-50 dark:from-gray-950/30 dark:to-slate-950/30"
    }
  }

  return (
    <div className="space-y-8">
      <AnimatePresence>
        {completedLabs.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6 md:grid-cols-2"
          >
            {completedLabs.map((lab, index) => (
              <motion.div
                key={lab.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card
                  className={`overflow-hidden border-none shadow-md bg-gradient-to-br ${getColorGradient(lab.color || "default")} h-full flex flex-col transition-all duration-300`}
                  onMouseEnter={() => setHoveredCard(lab.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl leading-tight">{lab.title}</CardTitle>
                      {lab.certificate && (
                        <Badge variant="success" className="flex items-center shadow-sm">
                          <Award className="w-3 h-3 mr-1" />
                          Tersertifikasi
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="mt-2">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-10 h-10 border-2 border-white shadow-sm dark:border-gray-800">
                          <AvatarImage src={lab.instructorImage} alt={lab.instructor} />
                          <AvatarFallback className="bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300">
                            {lab.instructor
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{lab.instructor}</span>
                          <span className="text-xs text-muted-foreground">Dosen Pembimbing</span>
                        </div>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow pb-2">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm">
                          <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                          <span>Selesai pada {lab.completionDate}</span>
                        </div>
                        <Badge variant="outline" className="shadow-sm bg-primary/10 text-primary border-primary/20">
                          Nilai: {lab.grade}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Performa</span>
                        {renderStarRating(lab.grade)}
                      </div>

                      <div>
                        <h4 className="mb-2 text-sm font-medium">Semester</h4>
                        <Badge
                          variant="outline"
                          className="border-none shadow-sm bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm"
                        >
                          {lab.semester}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between gap-2 pt-4">
                    <Button
                      variant="outline"
                      className="flex-1 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800"
                      onClick={() => handleViewDetails(lab)}
                    >
                      Lihat Detail
                    </Button>
                    {lab.certificate && (
                      <Button variant="default" className="flex-1 group" onClick={() => handleViewCertificate(lab)}>
                        <Download className="w-4 h-4 mr-2 transition-transform group-hover:-translate-y-1" />
                        Sertifikat
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center px-4 py-16 text-center border rounded-xl bg-muted/10"
          >
            <div className="flex items-center justify-center w-20 h-20 mb-4 rounded-full bg-muted/30">
              <CheckCircle2 className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="mb-2 text-lg font-medium">Tidak ada laboratorium yang selesai</h3>
            <p className="max-w-md mb-6 text-muted-foreground">
              Anda belum menyelesaikan laboratorium apa pun. Selesaikan laboratorium aktif Anda untuk melihatnya di sini.
            </p>
            <Button variant="outline" className="bg-white dark:bg-gray-900">
              Jelajahi Laboratorium Tersedia
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Certificate Dialog */}
      <Dialog open={isCertificateOpen} onOpenChange={setIsCertificateOpen}>
        <DialogContent className="max-w-3xl">
          {selectedLab && (
            <div className="space-y-6">
              <DialogHeader>
                <DialogTitle>Sertifikat Penyelesaian Laboratorium</DialogTitle>
                <DialogDescription>
                  Sertifikat ini memverifikasi bahwa Anda telah berhasil menyelesaikan program laboratorium.
                </DialogDescription>
              </DialogHeader>

              <div className="p-8 space-y-6 text-center border-8 border-double bg-gradient-to-r from-slate-50 to-white dark:from-slate-900 dark:to-gray-900">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=50&width=50')] opacity-5 pointer-events-none"></div>
                <div className="relative">
                  <div className="absolute w-20 h-20 rounded-full -top-6 -left-6 bg-primary/10 blur-2xl"></div>
                  <div className="absolute w-20 h-20 rounded-full -bottom-6 -right-6 bg-accent/10 blur-2xl"></div>

                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold">Sertifikat Penyelesaian</h2>
                    <p className="text-muted-foreground">Dengan ini menyatakan bahwa</p>
                    <p className="text-xl font-medium">John Doe</p>
                    <p className="text-muted-foreground">telah berhasil menyelesaikan</p>
                    <p className="text-xl font-bold">{selectedLab.title}</p>
                    <p className="text-muted-foreground">dengan nilai</p>
                    <p className="text-xl font-bold">
                      {selectedLab.grade} ({selectedLab.score}%)
                    </p>
                    <p className="text-muted-foreground">pada</p>
                    <p className="text-lg">{selectedLab.completionDate}</p>
                  </div>

                  <div className="pt-6 mt-6 border-t">
                    <div className="flex justify-center gap-12">
                      <div className="text-center">
                        <p className="font-medium">{selectedLab.instructor}</p>
                        <p className="text-sm text-muted-foreground">Instruktur Laboratorium</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium">Dr. Hasan Basri</p>
                        <p className="text-sm text-muted-foreground">Kepala Departemen</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="group">
                  <Download className="w-4 h-4 mr-2 transition-transform group-hover:-translate-y-1" />
                  Unduh Sertifikat
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedLab && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedLab.title}</DialogTitle>
                <DialogDescription>
                  <div className="flex items-center gap-2 mt-1">
                    <Avatar className="w-8 h-8 border-2 border-white shadow-sm dark:border-gray-800">
                      <AvatarImage src={selectedLab.instructorImage} alt={selectedLab.instructor} />
                      <AvatarFallback className="bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300">
                        {selectedLab.instructor
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span>{selectedLab.instructor}</span>
                  </div>
                </DialogDescription>
              </DialogHeader>

              <div className="mt-4 space-y-6">
                {/* Grade section */}
                <div>
                  <h3 className="mb-2 text-lg font-medium">Ringkasan Performa</h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <Card className="bg-white shadow-sm dark:bg-gray-900 border-muted/50">
                      <CardHeader className="py-3">
                        <CardTitle className="text-base">Nilai Akhir</CardTitle>
                      </CardHeader>
                      <CardContent className="py-0 pb-3">
                        <div className="flex items-center justify-between">
                          <span className="text-3xl font-bold">{selectedLab.grade}</span>
                          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                            {selectedLab.score}%
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-white shadow-sm dark:bg-gray-900 border-muted/50">
                      <CardHeader className="py-3">
                        <CardTitle className="text-base">Tanggal Penyelesaian</CardTitle>
                      </CardHeader>
                      <CardContent className="py-0 pb-3">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                          <span>{selectedLab.completionDate}</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-white shadow-sm dark:bg-gray-900 border-muted/50">
                      <CardHeader className="py-3">
                        <CardTitle className="text-base">Semester</CardTitle>
                      </CardHeader>
                      <CardContent className="py-0 pb-3">
                        <Badge variant="outline" className="bg-muted/50">
                          {selectedLab.semester}
                        </Badge>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <Separator className="bg-muted/50" />

                {/* Feedback section */}
                <div>
                  <h3 className="mb-2 text-lg font-medium">Umpan Balik Instruktur</h3>
                  <Card className="shadow-sm bg-muted/30 border-muted/50">
                    <CardContent className="p-4">
                      <p className="italic">{selectedLab.feedback}</p>
                    </CardContent>
                  </Card>
                </div>

                <Separator className="bg-muted/50" />

                {/* Assignments section */}
                <div>
                  <h3 className="mb-2 text-lg font-medium">Nilai Tugas</h3>
                  <div className="space-y-3">
                    {selectedLab.assignments.map((assignment: any) => (
                      <Card key={assignment.id} className="bg-white shadow-sm dark:bg-gray-900 border-muted/50">
                        <CardHeader className="py-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base">{assignment.title}</CardTitle>
                            <Badge variant="success" className="shadow-sm">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Selesai
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="py-0 pb-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Batas: {assignment.dueDate}</span>
                            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                              Nilai: {assignment.score}%
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {selectedLab.certificate && (
                  <>
                    <Separator className="bg-muted/50" />

                    <div className="flex justify-center">
                      <Button
                        onClick={() => {
                          setIsDetailsOpen(false)
                          setTimeout(() => {
                            setIsCertificateOpen(true)
                          }, 100)
                        }}
                        className="group"
                      >
                        <Award className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
                        Lihat Sertifikat
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

