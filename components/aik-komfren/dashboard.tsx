"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  GraduationCap,
  Info,
  User,
  AlertCircle,
  ArrowRight,
  BookMarked,
  Bookmark,
} from "lucide-react"

export function AIKKomfrenDashboard() {
  const [examStatus, setExamStatus] = useState<
    "not_registered" | "registered" | "scheduled" | "completed" | "passed" | "failed"
  >("not_registered")

  // This would come from an API in a real application
  const studentData = {
    name: "Andi Wijaya",
    nim: "12345678",
    faculty: "Faculty of Computer Science",
    program: "Computer Science",
    semester: 6,
  }

  const renderStatusBadge = () => {
    switch (examStatus) {
      case "not_registered":
        return (
          <Badge variant="outline" className="text-gray-500">
            Not Registered
          </Badge>
        )
      case "registered":
        return (
          <Badge variant="outline" className="text-blue-500">
            Registered
          </Badge>
        )
      case "scheduled":
        return (
          <Badge variant="outline" className="text-amber-500">
            Scheduled
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="text-purple-500">
            Completed
          </Badge>
        )
      case "passed":
        return <Badge className="bg-green-500">Passed</Badge>
      case "failed":
        return <Badge variant="destructive">Failed</Badge>
    }
  }

  const renderProgressStep = (
    step: number,
    title: string,
    description: string,
    status: "completed" | "current" | "upcoming",
  ) => (
    <div className="flex items-start gap-4">
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${
          status === "completed"
            ? "bg-primary text-primary-foreground"
            : status === "current"
              ? "border-primary text-primary"
              : "border-muted-foreground/30 text-muted-foreground/30"
        }`}
      >
        {status === "completed" ? <CheckCircle2 className="h-4 w-4" /> : step}
      </div>
      <div className="space-y-1">
        <p
          className={`font-medium ${
            status === "completed"
              ? "text-primary"
              : status === "current"
                ? "text-foreground"
                : "text-muted-foreground/60"
          }`}
        >
          {title}
        </p>
        <p className={`text-sm ${status === "upcoming" ? "text-muted-foreground/60" : "text-muted-foreground"}`}>
          {description}
        </p>
      </div>
    </div>
  )

  return (
    <div className="space-y-8">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            AIK Komfren Examination
          </span>
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage your AIK Komfren Examination process from registration to completion.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-primary/5 to-primary/10">
            <CardTitle className="text-sm font-medium">Exam Status</CardTitle>
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
              <GraduationCap className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{renderStatusBadge()}</div>
            <p className="text-xs text-muted-foreground mt-1">Last updated: Today</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-secondary/5 to-secondary/10">
            <CardTitle className="text-sm font-medium">Registration</CardTitle>
            <div className="h-8 w-8 rounded-full bg-secondary/20 flex items-center justify-center">
              <FileText className="h-4 w-4 text-secondary" />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{examStatus === "not_registered" ? "Not Started" : "Completed"}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {examStatus === "not_registered"
                ? "Register to start the process"
                : "Registration completed on 10/03/2025"}
            </p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-green-500/5 to-green-500/10">
            <CardTitle className="text-sm font-medium">Exam Schedule</CardTitle>
            <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
              <Calendar className="h-4 w-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">
              {examStatus === "not_registered" || examStatus === "registered" ? "Pending" : "15/03/2025"}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {examStatus === "not_registered" || examStatus === "registered"
                ? "Waiting for schedule assignment"
                : "10:00 AM - Room 301"}
            </p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-amber-500/5 to-amber-500/10">
            <CardTitle className="text-sm font-medium">Examiner</CardTitle>
            <div className="h-8 w-8 rounded-full bg-amber-500/20 flex items-center justify-center">
              <User className="h-4 w-4 text-amber-500" />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">
              {examStatus === "not_registered" || examStatus === "registered" ? "Not Assigned" : "Dr. Ahmad"}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {examStatus === "not_registered" || examStatus === "registered"
                ? "Examiner will be assigned after registration"
                : "Islamic Studies Department"}
            </p>
          </CardContent>
        </Card>
      </div>

      {examStatus === "not_registered" && (
        <Alert className="bg-primary/5 border-primary/20">
          <Info className="h-4 w-4 text-primary" />
          <AlertTitle>Get Started with AIK Komfren Exam</AlertTitle>
          <AlertDescription>
            You haven't registered for the AIK Komfren Exam yet. Start by completing the registration and payment
            process.
          </AlertDescription>
          <div className="mt-4">
            <Button asChild>
              <Link href="/dashboard/mahasiswa/aik-komfren/registration">
                Register Now <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Alert>
      )}

      {examStatus === "registered" && (
        <Alert className="bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-900/30 dark:text-blue-300">
          <Info className="h-4 w-4" />
          <AlertTitle>Registration Completed</AlertTitle>
          <AlertDescription>
            Your registration has been processed successfully. Please wait for your exam schedule and examiner
            assignment. You will be notified once the schedule is available.
          </AlertDescription>
          <div className="mt-4">
            <Button asChild variant="outline">
              <Link href="/dashboard/mahasiswa/aik-komfren/schedule">
                Check Schedule Status <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Alert>
      )}

      {examStatus === "scheduled" && (
        <Alert className="bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-900/20 dark:border-amber-900/30 dark:text-amber-300">
          <Calendar className="h-4 w-4" />
          <AlertTitle>Exam Scheduled</AlertTitle>
          <AlertDescription>
            Your AIK Komfren Exam has been scheduled for March 15, 2025 at 10:00 AM in Room 301. Your examiner will be
            Dr. Ahmad from the Islamic Studies Department. Please arrive 15 minutes before the scheduled time.
          </AlertDescription>
          <div className="mt-4">
            <Button asChild>
              <Link href="/dashboard/mahasiswa/aik-komfren/schedule">
                View Schedule Details <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Alert>
      )}

      {(examStatus === "completed" || examStatus === "passed" || examStatus === "failed") && (
        <Alert
          className={
            examStatus === "passed"
              ? "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-900/30 dark:text-green-300"
              : examStatus === "failed"
                ? "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-900/30 dark:text-red-300"
                : "bg-purple-50 border-purple-200 text-purple-800 dark:bg-purple-900/20 dark:border-purple-900/30 dark:text-purple-300"
          }
        >
          {examStatus === "passed" ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : examStatus === "failed" ? (
            <AlertCircle className="h-4 w-4" />
          ) : (
            <Info className="h-4 w-4" />
          )}
          <AlertTitle>
            {examStatus === "passed" ? "Exam Passed" : examStatus === "failed" ? "Exam Failed" : "Exam Completed"}
          </AlertTitle>
          <AlertDescription>
            {examStatus === "passed"
              ? "Congratulations! You have successfully passed the AIK Komfren Exam. Your certificate will be available soon."
              : examStatus === "failed"
                ? "Unfortunately, you did not pass the AIK Komfren Exam. Please contact your academic advisor for guidance on retaking the exam."
                : "Your exam has been completed and is currently being evaluated. Results will be available soon."}
          </AlertDescription>
          <div className="mt-4">
            <Button
              asChild
              variant={examStatus === "passed" ? "default" : examStatus === "failed" ? "destructive" : "outline"}
            >
              <Link href="/dashboard/mahasiswa/aik-komfren/completion">
                View Exam Details <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>AIK Komfren Exam Progress</CardTitle>
          <CardDescription>Track your progress through the AIK Komfren examination process</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {renderProgressStep(
              1,
              "Registration & Payment",
              "Register for the exam and pay the consumption fee",
              examStatus !== "not_registered" ? "completed" : "current",
            )}
            <div className="mx-4 h-5 border-l border-dashed border-muted-foreground/30"></div>
            {renderProgressStep(
              2,
              "Schedule & Examiner Assignment",
              "Receive your exam schedule and examiner information",
              examStatus === "not_registered" ? "upcoming" : examStatus === "registered" ? "current" : "completed",
            )}
            <div className="mx-4 h-5 border-l border-dashed border-muted-foreground/30"></div>
            {renderProgressStep(
              3,
              "Exam Preparation",
              "Prepare for your exam using the provided materials",
              examStatus === "not_registered" || examStatus === "registered"
                ? "upcoming"
                : examStatus === "scheduled"
                  ? "current"
                  : "completed",
            )}
            <div className="mx-4 h-5 border-l border-dashed border-muted-foreground/30"></div>
            {renderProgressStep(
              4,
              "Exam Completion",
              "Complete your exam and submit required information",
              examStatus === "not_registered" || examStatus === "registered" || examStatus === "scheduled"
                ? "upcoming"
                : examStatus === "completed"
                  ? "current"
                  : "completed",
            )}
            <div className="mx-4 h-5 border-l border-dashed border-muted-foreground/30"></div>
            {renderProgressStep(
              5,
              "Results & Certification",
              "Receive your exam results and certification",
              examStatus === "passed" || examStatus === "failed" ? "completed" : "upcoming",
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Exam Information</CardTitle>
            <CardDescription>Important information about the AIK Komfren Exam</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <BookMarked className="h-5 w-5 text-primary" />
              <span className="font-medium">Exam Format:</span>
              <span>Oral examination on Islamic studies</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <span className="font-medium">Duration:</span>
              <span>30-45 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="font-medium">Materials:</span>
              <span>Al-Qur'an, Hadith, and Islamic principles</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <span className="font-medium">Requirements:</span>
              <span>Minimum semester 4 student</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="#">View Complete Exam Guidelines</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your AIK Komfren Exam process</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start" asChild>
              <Link href="/dashboard/mahasiswa/aik-komfren/registration">
                <FileText className="mr-2 h-4 w-4" /> Registration & Payment
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/dashboard/mahasiswa/aik-komfren/schedule">
                <Calendar className="mr-2 h-4 w-4" /> View Schedule & Examiner
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/dashboard/mahasiswa/aik-komfren/completion">
                <CheckCircle2 className="mr-2 h-4 w-4" /> Exam Completion
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="#">
                <Bookmark className="mr-2 h-4 w-4" /> Study Materials
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

