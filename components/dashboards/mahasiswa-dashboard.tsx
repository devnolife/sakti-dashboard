import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  Calendar,
  FileText,
  GraduationCap,
  Briefcase,
  Bell,
  CheckCircle2,
  Clock,
  BookMarked,
  Award,
  Lightbulb,
} from "lucide-react"
import Link from "next/link"

export default function MahasiswaDashboard() {
  return (
    <div className="space-y-8">
      {/* Quick Stats Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-primary/5 to-primary/10">
            <CardTitle className="text-sm font-medium">Current Semester</CardTitle>
            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">7th Semester</div>
            <div className="text-xs text-muted-foreground mt-1">Fall 2023</div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-green-500/5 to-green-500/10">
            <CardTitle className="text-sm font-medium">Current GPA</CardTitle>
            <div className="h-9 w-9 rounded-full bg-green-500/10 flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-green-500" />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">3.75</div>
            <div className="flex items-center mt-1">
              <Badge variant="outline" className="text-xs font-normal bg-green-500/10 text-green-600 border-green-200">
                +0.05 from last semester
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-secondary/5 to-secondary/10">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <div className="h-9 w-9 rounded-full bg-secondary/10 flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-secondary" />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">5</div>
            <div className="text-xs text-muted-foreground mt-1">15 credit hours</div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-amber-500/5 to-amber-500/10">
            <CardTitle className="text-sm font-medium">KKP Status</CardTitle>
            <div className="h-9 w-9 rounded-full bg-amber-500/10 flex items-center justify-center">
              <Briefcase className="h-5 w-5 text-amber-500" />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">Pending</div>
            <div className="text-xs text-muted-foreground mt-1">Application submitted</div>
            <div className="mt-2">
              <Link href="/dashboard/mahasiswa/kkp">
                <Button variant="outline" size="sm" className="w-full text-xs h-8">
                  View KKP Status
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Section */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Upcoming Deadlines */}
        <Card className="border-none shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Upcoming Deadlines</CardTitle>
                <CardDescription>Important dates and assignments</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-primary h-8">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 border border-border/50">
                <div className="h-10 w-10 rounded-full bg-red-500/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-red-500" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Database Systems Final Project</p>
                  <p className="text-xs text-muted-foreground">Due in 2 days</p>
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
                  <p className="font-medium">Software Engineering Quiz</p>
                  <p className="text-xs text-muted-foreground">Due in 5 days</p>
                </div>
                <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-200">
                  Important
                </Badge>
              </div>
              <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 border border-border/50">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Briefcase className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">KKP English Certificate Submission</p>
                  <p className="text-xs text-muted-foreground">Due in 10 days</p>
                </div>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  KKP
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Degree Progress */}
        <Card className="border-none shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Degree Progress</CardTitle>
                <CardDescription>Your progress towards graduation</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-primary h-8">
                Details
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Overall Completion</span>
                  <span className="text-sm font-medium">78%</span>
                </div>
                <Progress value={78} className="h-2 bg-primary/20" indicatorClassName="bg-primary" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Core Courses</span>
                  <span className="text-sm font-medium">92%</span>
                </div>
                <Progress value={92} className="h-2 bg-green-500/20" indicatorClassName="bg-green-500" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Electives</span>
                  <span className="text-sm font-medium">65%</span>
                </div>
                <Progress value={65} className="h-2 bg-amber-500/20" indicatorClassName="bg-amber-500" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">KKP Requirements</span>
                  <span className="text-sm font-medium">70%</span>
                </div>
                <Progress value={70} className="h-2 bg-secondary/20" indicatorClassName="bg-secondary" />
              </div>
              <div className="pt-2">
                <Link href="/dashboard/mahasiswa/kkp/requirements">
                  <Button variant="outline" size="sm" className="w-full">
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Complete KKP Requirements
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Announcements Section */}
      <Card className="border-none shadow-md">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Announcements</CardTitle>
              <CardDescription>Important updates from your courses and university</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-primary h-8">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                <Bell className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium">KKP Application Period Now Open</h3>
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-200">
                    New
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  The KKP application period for the upcoming semester is now open. Please submit your application by
                  October 15, 2023.
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <Link href="/dashboard/mahasiswa/kkp/application">
                    <Button variant="outline" size="sm" className="h-8">
                      Apply Now
                    </Button>
                  </Link>
                  <p className="text-xs text-muted-foreground">Posted 2 days ago</p>
                </div>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center mt-1">
                <Calendar className="h-6 w-6 text-secondary" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium mb-1">Midterm Exam Schedule Released</h3>
                <p className="text-sm text-muted-foreground">
                  The midterm examination schedule for the Fall 2023 semester has been released. Please check your
                  student portal for details.
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <Button variant="outline" size="sm" className="h-8">
                    View Schedule
                  </Button>
                  <p className="text-xs text-muted-foreground">Posted 5 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Access Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/dashboard/mahasiswa/courses">
          <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300 h-full">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <BookMarked className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-1">My Courses</h3>
              <p className="text-sm text-muted-foreground">Access your current courses and materials</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/mahasiswa/grades">
          <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300 h-full">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="font-medium mb-1">My Grades</h3>
              <p className="text-sm text-muted-foreground">View your academic performance</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/mahasiswa/schedule">
          <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300 h-full">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-amber-500" />
              </div>
              <h3 className="font-medium mb-1">My Schedule</h3>
              <p className="text-sm text-muted-foreground">Check your weekly class schedule</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/mahasiswa/kkp">
          <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300 h-full">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                <Lightbulb className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-medium mb-1">KKP Program</h3>
              <p className="text-sm text-muted-foreground">Manage your internship requirements</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}

