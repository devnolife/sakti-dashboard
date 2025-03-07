"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, FileText, Users, BookOpen, AlertCircle, ChevronRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { motion, AnimatePresence } from "framer-motion"

// Sample data for active labs
const myLabs = [
  {
    id: "lab-1",
    title: "Computer Networks Laboratory",
    description: "Learn about network protocols, configurations, and troubleshooting techniques.",
    image: "/placeholder.svg?height=200&width=400",
    instructor: "Dr. Ahmad Dahlan",
    instructorImage: "/placeholder.svg?height=100&width=100",
    schedule: "Monday & Wednesday, 10:00 - 12:00",
    progress: 75,
    nextSession: "Monday, 10:00 AM",
    nextTopic: "Wireless Network Configuration",
    assignments: [
      { id: "a1", title: "Network Topology Design", dueDate: "Oct 15, 2023", status: "completed" },
      { id: "a2", title: "Router Configuration", dueDate: "Oct 22, 2023", status: "in-progress" },
      { id: "a3", title: "Network Troubleshooting", dueDate: "Oct 29, 2023", status: "upcoming" },
    ],
    materials: [
      { id: "m1", title: "Introduction to Networking", type: "pdf" },
      { id: "m2", title: "TCP/IP Protocol Suite", type: "pdf" },
      { id: "m3", title: "Network Configuration Demo", type: "video" },
    ],
    announcements: [
      {
        id: "an1",
        title: "Lab Session Rescheduled",
        date: "Oct 10, 2023",
        content: "The lab session on October 12 has been rescheduled to October 13 due to maintenance.",
      },
    ],
    location: "Building A, Room 101",
    color: "blue",
  },
  {
    id: "lab-2",
    title: "Database Systems Laboratory",
    description: "Practical implementation of database design, SQL queries, and database management.",
    image: "/placeholder.svg?height=200&width=400",
    instructor: "Prof. Siti Aminah",
    instructorImage: "/placeholder.svg?height=100&width=100",
    schedule: "Tuesday & Thursday, 13:00 - 15:00",
    progress: 40,
    nextSession: "Tuesday, 1:00 PM",
    nextTopic: "Advanced SQL Queries",
    assignments: [
      { id: "a1", title: "Database Schema Design", dueDate: "Oct 12, 2023", status: "completed" },
      { id: "a2", title: "SQL Query Optimization", dueDate: "Oct 19, 2023", status: "upcoming" },
    ],
    materials: [
      { id: "m1", title: "Database Fundamentals", type: "pdf" },
      { id: "m2", title: "SQL Basics", type: "pdf" },
      { id: "m3", title: "Database Design Principles", type: "video" },
    ],
    announcements: [],
    location: "Building B, Room 203",
    color: "green",
  },
]

export function MyLabsTab() {
  const [selectedLab, setSelectedLab] = useState<any>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const handleViewDetails = (lab: any) => {
    setSelectedLab(lab)
    setIsDetailsOpen(true)
  }

  // Helper function to get material icon
  const getMaterialIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-4 w-4" />
      case "video":
        return <Clock className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
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
        {myLabs.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6 md:grid-cols-2"
          >
            {myLabs.map((lab, index) => (
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
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl leading-tight">{lab.title}</CardTitle>
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
                      </div>
                      {lab.announcements.length > 0 && (
                        <Badge
                          variant="outline"
                          className="bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20 shadow-sm"
                        >
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Announcement
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2 flex-grow">
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Progress</span>
                          <span className="text-sm font-medium">{lab.progress}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-white/50 dark:bg-gray-800/50 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${lab.progress >= 75 ? "bg-green-500" : lab.progress >= 50 ? "bg-blue-500" : lab.progress >= 25 ? "bg-amber-500" : "bg-red-500"}`}
                            style={{ width: `${lab.progress}%` }}
                          />
                        </div>
                      </div>

                      <div className="rounded-md border border-white/20 dark:border-gray-800/50 p-3 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm shadow-sm">
                        <h4 className="text-sm font-medium mb-2">Next Session</h4>
                        <div className="space-y-2">
                          <div className="flex items-center text-sm">
                            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{lab.nextSession}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{lab.nextTopic}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2">Upcoming Assignments</h4>
                        <div className="space-y-2">
                          {lab.assignments
                            .filter((a) => a.status !== "completed")
                            .slice(0, 2)
                            .map((assignment) => (
                              <div
                                key={assignment.id}
                                className="flex items-center justify-between text-sm p-2 rounded-md bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm"
                              >
                                <div className="flex items-center">
                                  <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                                  <span>{assignment.title}</span>
                                </div>
                                <Badge
                                  variant={assignment.status === "in-progress" ? "default" : "outline"}
                                  className={
                                    assignment.status === "in-progress" ? "" : "bg-white/50 dark:bg-gray-900/50"
                                  }
                                >
                                  {assignment.status === "in-progress" ? "In Progress" : "Due " + assignment.dueDate}
                                </Badge>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-4">
                    <Button onClick={() => handleViewDetails(lab)} className="w-full group" variant="default">
                      <span className="mr-2">View Lab Details</span>
                      <ChevronRight
                        className={`h-4 w-4 transition-transform duration-300 ${hoveredCard === lab.id ? "translate-x-1" : ""}`}
                      />
                    </Button>
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
              <BookOpen className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No active laboratories</h3>
            <p className="text-muted-foreground max-w-md mb-6">
              You don't have any active laboratories. Browse available labs and register to get started.
            </p>
            <Button variant="outline" className="bg-white dark:bg-gray-900">
              Browse Available Labs
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

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
                {/* Progress section */}
                <div>
                  <h3 className="text-lg font-medium mb-2">Progress</h3>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Overall Completion</span>
                    <span className="text-sm font-medium">{selectedLab.progress}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full rounded-full ${selectedLab.progress >= 75 ? "bg-green-500" : selectedLab.progress >= 50 ? "bg-blue-500" : selectedLab.progress >= 25 ? "bg-amber-500" : "bg-red-500"}`}
                      style={{ width: `${selectedLab.progress}%` }}
                    />
                  </div>
                </div>

                <Separator className="bg-muted/50" />

                {/* Announcements section */}
                {selectedLab.announcements.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium mb-2">Announcements</h3>
                    <div className="space-y-3">
                      {selectedLab.announcements.map((announcement: any) => (
                        <Card key={announcement.id} className="bg-yellow-500/5 border-yellow-500/20 shadow-sm">
                          <CardHeader className="py-3">
                            <div className="flex justify-between items-center">
                              <CardTitle className="text-base flex items-center">
                                <AlertCircle className="h-4 w-4 mr-2 text-yellow-500" />
                                {announcement.title}
                              </CardTitle>
                              <span className="text-xs text-muted-foreground">{announcement.date}</span>
                            </div>
                          </CardHeader>
                          <CardContent className="py-0 pb-3">
                            <p className="text-sm">{announcement.content}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Schedule section */}
                <div>
                  <h3 className="text-lg font-medium mb-2">Schedule Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-white dark:bg-gray-900 shadow-sm border-muted/50">
                      <CardHeader className="py-3">
                        <CardTitle className="text-base">Next Session</CardTitle>
                      </CardHeader>
                      <CardContent className="py-0 pb-3">
                        <div className="space-y-2">
                          <div className="flex items-center text-sm">
                            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{selectedLab.nextSession}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{selectedLab.nextTopic}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-white dark:bg-gray-900 shadow-sm border-muted/50">
                      <CardHeader className="py-3">
                        <CardTitle className="text-base">Regular Schedule</CardTitle>
                      </CardHeader>
                      <CardContent className="py-0 pb-3">
                        <div className="space-y-2">
                          <div className="flex items-center text-sm">
                            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{selectedLab.schedule}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>Location: {selectedLab.location}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <Separator className="bg-muted/50" />

                {/* Materials section */}
                <div>
                  <h3 className="text-lg font-medium mb-2">Course Materials</h3>
                  <div className="grid gap-2">
                    {selectedLab.materials.map((material: any) => (
                      <div
                        key={material.id}
                        className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 transition-colors cursor-pointer bg-white dark:bg-gray-900 shadow-sm"
                      >
                        <div className="flex items-center">
                          {getMaterialIcon(material.type)}
                          <span className="ml-2">{material.title}</span>
                        </div>
                        <Badge variant="outline" className="bg-muted/50">
                          {material.type.toUpperCase()}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator className="bg-muted/50" />

                {/* Assignments section */}
                <div>
                  <h3 className="text-lg font-medium mb-2">Assignments</h3>
                  <div className="space-y-3">
                    {selectedLab.assignments.map((assignment: any) => (
                      <Card key={assignment.id} className="bg-white dark:bg-gray-900 shadow-sm border-muted/50">
                        <CardHeader className="py-3">
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-base">{assignment.title}</CardTitle>
                            <Badge
                              variant={
                                assignment.status === "completed"
                                  ? "success"
                                  : assignment.status === "in-progress"
                                    ? "default"
                                    : "outline"
                              }
                              className={
                                assignment.status !== "completed" && assignment.status !== "in-progress"
                                  ? "bg-white/50 dark:bg-gray-900/50"
                                  : ""
                              }
                            >
                              {assignment.status === "completed"
                                ? "Completed"
                                : assignment.status === "in-progress"
                                  ? "In Progress"
                                  : "Due " + assignment.dueDate}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="py-0 pb-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Due: {assignment.dueDate}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              disabled={assignment.status === "completed"}
                              className="bg-white dark:bg-gray-900"
                            >
                              {assignment.status === "completed" ? "View Submission" : "Submit Assignment"}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

