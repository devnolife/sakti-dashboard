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
    title: "Web Development Laboratory",
    description: "Build responsive web applications using modern frameworks and technologies.",
    image: "/placeholder.svg?height=200&width=400",
    instructor: "Prof. Joko Widodo",
    instructorImage: "/placeholder.svg?height=100&width=100",
    schedule: "Monday & Wednesday, 15:00 - 17:00",
    completionDate: "September 30, 2023",
    grade: "A",
    score: 92,
    feedback:
      "Excellent work on the final project. Your web application demonstrated a strong understanding of React and responsive design principles.",
    assignments: [
      { id: "a1", title: "Frontend Development", dueDate: "Sep 10, 2023", status: "completed", score: 90 },
      { id: "a2", title: "Backend Integration", dueDate: "Sep 20, 2023", status: "completed", score: 88 },
      { id: "a3", title: "Final Project", dueDate: "Sep 30, 2023", status: "completed", score: 95 },
    ],
    certificate: true,
    semester: "Even 2022/2023",
    color: "orange",
  },
  {
    id: "lab-7",
    title: "Computer Graphics Laboratory",
    description: "Learn 2D and 3D graphics programming and visualization techniques.",
    image: "/placeholder.svg?height=200&width=400",
    instructor: "Dr. Maya Indira",
    instructorImage: "/placeholder.svg?height=100&width=100",
    schedule: "Tuesday & Thursday, 10:00 - 12:00",
    completionDate: "June 15, 2023",
    grade: "B+",
    score: 85,
    feedback:
      "Good understanding of graphics concepts. Your final project showed creativity, though there were some performance optimizations that could have been implemented.",
    assignments: [
      { id: "a1", title: "2D Graphics Basics", dueDate: "May 5, 2023", status: "completed", score: 82 },
      { id: "a2", title: "3D Modeling", dueDate: "May 20, 2023", status: "completed", score: 84 },
      { id: "a3", title: "Animation Project", dueDate: "June 10, 2023", status: "completed", score: 88 },
    ],
    certificate: true,
    semester: "Even 2022/2023",
    color: "purple",
  },
  {
    id: "lab-8",
    title: "Operating Systems Laboratory",
    description: "Practical implementation of operating system concepts and principles.",
    image: "/placeholder.svg?height=200&width=400",
    instructor: "Prof. Bambang Sutejo",
    instructorImage: "/placeholder.svg?height=100&width=100",
    schedule: "Friday, 13:00 - 16:00",
    completionDate: "January 20, 2023",
    grade: "A-",
    score: 88,
    feedback:
      "Strong understanding of operating system concepts. Your implementation of the process scheduler was particularly well done.",
    assignments: [
      { id: "a1", title: "Process Management", dueDate: "Dec 10, 2022", status: "completed", score: 90 },
      { id: "a2", title: "Memory Management", dueDate: "Dec 25, 2022", status: "completed", score: 85 },
      { id: "a3", title: "File System Implementation", dueDate: "Jan 15, 2023", status: "completed", score: 88 },
    ],
    certificate: true,
    semester: "Odd 2022/2023",
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
          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />}
        {[...Array(5 - Math.ceil(rating))].map((_, i) => (
          <Star key={i + fullStars + (hasHalfStar ? 1 : 0)} className="h-4 w-4 text-muted-foreground" />
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
                          <Award className="h-3 w-3 mr-1" />
                          Certified
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="mt-2">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-10 w-10 border-2 border-white dark:border-gray-800 shadow-sm">
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
                          <span className="text-xs text-muted-foreground">Supervising Lecturer</span>
                        </div>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2 flex-grow">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>Completed on {lab.completionDate}</span>
                        </div>
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 shadow-sm">
                          Grade: {lab.grade}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Performance</span>
                        {renderStarRating(lab.grade)}
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2">Semester</h4>
                        <Badge
                          variant="outline"
                          className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-none shadow-sm"
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
                      View Details
                    </Button>
                    {lab.certificate && (
                      <Button variant="default" className="flex-1 group" onClick={() => handleViewCertificate(lab)}>
                        <Download className="h-4 w-4 mr-2 transition-transform group-hover:-translate-y-1" />
                        Certificate
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
            className="text-center py-16 px-4 border rounded-xl bg-muted/10 flex flex-col items-center"
          >
            <div className="w-20 h-20 rounded-full bg-muted/30 flex items-center justify-center mb-4">
              <CheckCircle2 className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No completed laboratories</h3>
            <p className="text-muted-foreground max-w-md mb-6">
              You haven't completed any laboratories yet. Complete your active labs to see them here.
            </p>
            <Button variant="outline" className="bg-white dark:bg-gray-900">
              Browse Available Labs
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
                <DialogTitle>Laboratory Completion Certificate</DialogTitle>
                <DialogDescription>
                  This certificate verifies that you have successfully completed the laboratory course.
                </DialogDescription>
              </DialogHeader>

              <div className="border-8 border-double p-8 text-center space-y-6 bg-gradient-to-r from-slate-50 to-white dark:from-slate-900 dark:to-gray-900">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=50&width=50')] opacity-5 pointer-events-none"></div>
                <div className="relative">
                  <div className="absolute -top-6 -left-6 w-20 h-20 rounded-full bg-primary/10 blur-2xl"></div>
                  <div className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full bg-accent/10 blur-2xl"></div>

                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold">Certificate of Completion</h2>
                    <p className="text-muted-foreground">This is to certify that</p>
                    <p className="text-xl font-medium">John Doe</p>
                    <p className="text-muted-foreground">has successfully completed</p>
                    <p className="text-xl font-bold">{selectedLab.title}</p>
                    <p className="text-muted-foreground">with a grade of</p>
                    <p className="text-xl font-bold">
                      {selectedLab.grade} ({selectedLab.score}%)
                    </p>
                    <p className="text-muted-foreground">on</p>
                    <p className="text-lg">{selectedLab.completionDate}</p>
                  </div>

                  <div className="pt-6 border-t mt-6">
                    <div className="flex justify-center gap-12">
                      <div className="text-center">
                        <p className="font-medium">{selectedLab.instructor}</p>
                        <p className="text-sm text-muted-foreground">Laboratory Instructor</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium">Dr. Hasan Basri</p>
                        <p className="text-sm text-muted-foreground">Department Head</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="group">
                  <Download className="h-4 w-4 mr-2 transition-transform group-hover:-translate-y-1" />
                  Download Certificate
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
                    <Avatar className="h-8 w-8 border-2 border-white dark:border-gray-800 shadow-sm">
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

              <div className="space-y-6 mt-4">
                {/* Grade section */}
                <div>
                  <h3 className="text-lg font-medium mb-2">Performance Summary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-white dark:bg-gray-900 shadow-sm border-muted/50">
                      <CardHeader className="py-3">
                        <CardTitle className="text-base">Final Grade</CardTitle>
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

                    <Card className="bg-white dark:bg-gray-900 shadow-sm border-muted/50">
                      <CardHeader className="py-3">
                        <CardTitle className="text-base">Completion Date</CardTitle>
                      </CardHeader>
                      <CardContent className="py-0 pb-3">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{selectedLab.completionDate}</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-white dark:bg-gray-900 shadow-sm border-muted/50">
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
                  <h3 className="text-lg font-medium mb-2">Instructor Feedback</h3>
                  <Card className="bg-muted/30 border-muted/50 shadow-sm">
                    <CardContent className="p-4">
                      <p className="italic">{selectedLab.feedback}</p>
                    </CardContent>
                  </Card>
                </div>

                <Separator className="bg-muted/50" />

                {/* Assignments section */}
                <div>
                  <h3 className="text-lg font-medium mb-2">Assignment Scores</h3>
                  <div className="space-y-3">
                    {selectedLab.assignments.map((assignment: any) => (
                      <Card key={assignment.id} className="bg-white dark:bg-gray-900 shadow-sm border-muted/50">
                        <CardHeader className="py-3">
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-base">{assignment.title}</CardTitle>
                            <Badge variant="success" className="shadow-sm">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Completed
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="py-0 pb-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Due: {assignment.dueDate}</span>
                            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                              Score: {assignment.score}%
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
                        <Award className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
                        View Certificate
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

