import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  CalendarDays,
  GraduationCap,
  BookOpen,
  Clock,
  Bell,
  FileText,
  Calendar,
  BarChart4,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"
import MahasiswaDashboard from "@/components/dashboards/mahasiswa-dashboard"

export default function MahasiswaPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Student Dashboard
          </span>
        </h1>
        <p className="text-muted-foreground mt-2">Welcome back, Andi. Here's your academic overview.</p>
      </div>

      <MahasiswaDashboard />

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-background border h-11">
          <TabsTrigger value="overview" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            <BarChart4 className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="courses" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            <BookOpen className="h-4 w-4 mr-2" />
            Courses
          </TabsTrigger>
          <TabsTrigger value="schedule" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-primary/5 to-primary/10">
                <CardTitle className="text-sm font-medium">Current GPA</CardTitle>
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <GraduationCap className="h-4 w-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold">3.75</div>
                <div className="flex items-center mt-1">
                  <Badge variant="success" className="text-xs font-normal">
                    +0.15 from last semester
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-secondary/5 to-secondary/10">
                <CardTitle className="text-sm font-medium">Current Credits</CardTitle>
                <div className="h-8 w-8 rounded-full bg-secondary/20 flex items-center justify-center">
                  <BookOpen className="h-4 w-4 text-secondary" />
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold">21</div>
                <p className="text-xs text-muted-foreground mt-1">6 active courses</p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-green-500/5 to-green-500/10">
                <CardTitle className="text-sm font-medium">Attendance</CardTitle>
                <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Clock className="h-4 w-4 text-green-500" />
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold">92%</div>
                <div className="flex items-center mt-1">
                  <Badge
                    variant="outline"
                    className="text-xs font-normal bg-green-500/10 text-green-600 border-green-200"
                  >
                    3 absences
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-amber-500/5 to-amber-500/10">
                <CardTitle className="text-sm font-medium">Upcoming Tasks</CardTitle>
                <div className="h-8 w-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <CalendarDays className="h-4 w-4 text-amber-500" />
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold">5</div>
                <div className="flex items-center mt-1">
                  <Badge
                    variant="outline"
                    className="text-xs font-normal bg-amber-500/10 text-amber-600 border-amber-200"
                  >
                    2 due this week
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 border-none shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>Academic Activities</CardTitle>
                  <Button variant="ghost" size="sm" className="text-primary h-8">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 border border-border/50">
                    <div className="h-10 w-10 rounded-full bg-red-500/10 flex items-center justify-center">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Midterm Exams</p>
                      <p className="text-sm text-muted-foreground">October 15, 2023</p>
                    </div>
                    <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-200">
                      Urgent
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 border border-border/50">
                    <div className="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-amber-500" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Algorithm Assignment</p>
                      <p className="text-sm text-muted-foreground">October 10, 2023</p>
                    </div>
                    <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-200">
                      Due Soon
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 border border-border/50">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Bell className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Group Presentation</p>
                      <p className="text-sm text-muted-foreground">October 12, 2023</p>
                    </div>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      Upcoming
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 border border-border/50">
                    <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-secondary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Database Practicum</p>
                      <p className="text-sm text-muted-foreground">October 14, 2023</p>
                    </div>
                    <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/20">
                      Upcoming
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-3 border-none shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>Announcements</CardTitle>
                  <Button variant="ghost" size="sm" className="text-primary h-8">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-200">
                        Important
                      </Badge>
                      <p className="text-xs text-muted-foreground">Oct 5, 2023</p>
                    </div>
                    <p className="font-medium">National Holiday</p>
                    <p className="text-sm text-muted-foreground mt-1">October 17, 2023 - All classes canceled</p>
                  </div>

                  <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        Event
                      </Badge>
                      <p className="text-xs text-muted-foreground">Oct 3, 2023</p>
                    </div>
                    <p className="font-medium">Career Seminar</p>
                    <p className="text-sm text-muted-foreground mt-1">October 20, 2023 - Main Auditorium</p>
                  </div>

                  <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-200">
                        Registration
                      </Badge>
                      <p className="text-xs text-muted-foreground">Oct 1, 2023</p>
                    </div>
                    <p className="font-medium">KKP Registration Open</p>
                    <p className="text-sm text-muted-foreground mt-1">November 1, 2023 - Apply early</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="courses" className="space-y-6">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Current Semester Courses</CardTitle>
              <CardDescription>Courses you're enrolled in this semester</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    title: "Algorithms & Data Structures",
                    instructor: "Dr. Budi Santoso",
                    credits: 3,
                    grade: "A-",
                    attendance: "13/14",
                    color: "primary",
                  },
                  {
                    title: "Advanced Database",
                    instructor: "Dr. Siti Aminah",
                    credits: 3,
                    grade: "B+",
                    attendance: "12/14",
                    color: "secondary",
                  },
                  {
                    title: "Web Programming",
                    instructor: "Prof. Joko Widodo",
                    credits: 3,
                    grade: "A",
                    attendance: "14/14",
                    color: "green-500",
                  },
                  {
                    title: "Computer Networks",
                    instructor: "Dr. Ahmad Dahlan",
                    credits: 3,
                    grade: "B",
                    attendance: "12/14",
                    color: "amber-500",
                  },
                  {
                    title: "Software Engineering",
                    instructor: "Dr. Maya Putri",
                    credits: 3,
                    grade: "A-",
                    attendance: "13/14",
                    color: "purple-500",
                  },
                  {
                    title: "Mobile Application Development",
                    instructor: "Prof. Hadi Wijaya",
                    credits: 3,
                    grade: "B+",
                    attendance: "12/14",
                    color: "blue-500",
                  },
                ].map((course, index) => (
                  <Card key={index} className="overflow-hidden border shadow-sm hover:shadow-md transition-all">
                    <div className={`h-2 bg-${course.color}`} />
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{course.title}</CardTitle>
                      <CardDescription>
                        {course.credits} Credits - {course.instructor}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Grade:</span>
                        <span className="font-medium">{course.grade}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Attendance:</span>
                        <span className="font-medium">{course.attendance}</span>
                      </div>
                      <div className="mt-2">
                        <Button variant="outline" size="sm" className="w-full">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Course Progress</CardTitle>
              <CardDescription>Your progress in current courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Algorithms & Data Structures", progress: 75, color: "primary" },
                  { name: "Advanced Database", progress: 60, color: "secondary" },
                  { name: "Web Programming", progress: 90, color: "green-500" },
                  { name: "Computer Networks", progress: 65, color: "amber-500" },
                  { name: "Software Engineering", progress: 80, color: "purple-500" },
                  { name: "Mobile Application Development", progress: 70, color: "blue-500" },
                ].map((course, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{course.name}</span>
                      <span className="text-sm font-medium">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className={`h-2 bg-${course.color}/20`} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Weekly Schedule</CardTitle>
              <CardDescription>Your class schedule for this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  {
                    day: "Monday",
                    classes: [
                      { name: "Algorithms & Data Structures", time: "08:00 - 10:30", location: "Room 301" },
                      { name: "Advanced Database", time: "13:00 - 15:30", location: "Computer Lab 2" },
                    ],
                    color: "primary",
                  },
                  {
                    day: "Tuesday",
                    classes: [{ name: "Software Engineering", time: "09:00 - 11:30", location: "Room 305" }],
                    color: "secondary",
                  },
                  {
                    day: "Wednesday",
                    classes: [
                      { name: "Web Programming", time: "10:00 - 12:30", location: "Computer Lab 1" },
                      { name: "Mobile Application Development", time: "14:00 - 16:30", location: "Computer Lab 3" },
                    ],
                    color: "green-500",
                  },
                  {
                    day: "Thursday",
                    classes: [],
                    color: "amber-500",
                  },
                  {
                    day: "Friday",
                    classes: [{ name: "Computer Networks", time: "08:00 - 10:30", location: "Room 305" }],
                    color: "purple-500",
                  },
                ].map((day, index) => (
                  <div key={index} className="rounded-lg border overflow-hidden">
                    <div className={`bg-${day.color}/10 px-4 py-3 font-medium border-b`}>{day.day}</div>
                    <div className="p-4">
                      {day.classes.length > 0 ? (
                        <div className="space-y-4">
                          {day.classes.map((cls, idx) => (
                            <div key={idx} className="flex justify-between items-start p-3 rounded-lg bg-muted/50">
                              <div>
                                <p className="font-medium">{cls.name}</p>
                                <p className="text-sm text-muted-foreground">{cls.time}</p>
                              </div>
                              <div className="text-sm text-muted-foreground bg-background px-2 py-1 rounded-md border">
                                {cls.location}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-center justify-center p-6 text-muted-foreground">
                          <p>No classes scheduled</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Important academic events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 border border-border/50">
                  <div className="h-10 w-10 rounded-full bg-red-500/10 flex items-center justify-center">
                    <CalendarDays className="h-5 w-5 text-red-500" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Midterm Examination Period</p>
                    <p className="text-sm text-muted-foreground">October 15-25, 2023</p>
                  </div>
                  <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-200">
                    10 days
                  </Badge>
                </div>

                <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 border border-border/50">
                  <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Course Registration for Next Semester</p>
                    <p className="text-sm text-muted-foreground">November 1-15, 2023</p>
                  </div>
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-200">
                    27 days
                  </Badge>
                </div>

                <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 border border-border/50">
                  <div className="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                    <Bell className="h-5 w-5 text-amber-500" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Final Examination Period</p>
                    <p className="text-sm text-muted-foreground">December 10-20, 2023</p>
                  </div>
                  <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-200">
                    67 days
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

