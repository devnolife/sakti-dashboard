"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowRight, Calendar, Clock, Info, MapPin, Phone, Mail, BookOpen, AlertCircle } from "lucide-react"

interface AIKData {
  studentInfo: any
  currentExam?: {
    id: string
    title: string
    status: string
    scheduledDate?: string
    location?: string
    examiner?: {
      name: string
      nip: string
      position: string
      department: string
    }
  }
  examStatus: string
}

export function AIKKomfrenSchedule() {
  const [examStatus, setExamStatus] = useState<
    "not_registered" | "registered" | "scheduled" | "completed" | "passed" | "failed"
  >("scheduled")
  const [aikData, setAikData] = useState<AIKData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAIKData()
  }, [])

  const fetchAIKData = async () => {
    try {
      const response = await fetch('/api/student/aik-komfren')
      if (response.ok) {
        const result = await response.json()
        setAikData(result.data)
        setExamStatus(result.data.examStatus as any)
      }
    } catch (error) {
      console.error('Error fetching AIK data:', error)
    } finally {
      setLoading(false)
    }
  }

  const currentExam = aikData?.currentExam
  
  // Default materials for AIK Komfren exam
  const examMaterials = [
    "Al-Qur'an recitation (Surah Al-Baqarah: 1-10)",
    "Basic Islamic principles",
    "Islamic ethics and values",
    "Islamic history and philosophy",
    "Kemuhammadiyahan principles",
  ]

  if (loading) {
    return <div>Loading schedule information...</div>
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            AIK Komfren Exam Schedule
          </span>
        </h1>
        <p className="text-muted-foreground mt-2">View your exam schedule and examiner information</p>
      </div>

      {examStatus === "not_registered" && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Not Registered</AlertTitle>
          <AlertDescription>
            You have not registered for the AIK Komfren Exam yet. Please complete the registration process first.
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
            Your registration has been processed successfully. Your exam schedule is being prepared and will be
            available soon. You will be notified once the schedule is available.
          </AlertDescription>
        </Alert>
      )}

      {(examStatus === "scheduled" ||
        examStatus === "completed" ||
        examStatus === "passed" ||
        examStatus === "failed") && (
        <>
          <Card className="bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200 dark:from-primary-950/50 dark:to-primary-900/50 dark:border-primary-800/30">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-primary-800 dark:text-primary-300">Exam Schedule</CardTitle>
                <Badge
                  className={
                    examStatus === "scheduled"
                      ? "bg-amber-500"
                      : examStatus === "completed"
                        ? "bg-purple-500"
                        : examStatus === "passed"
                          ? "bg-green-500"
                          : "bg-red-500"
                  }
                >
                  {examStatus === "scheduled"
                    ? "Upcoming"
                    : examStatus === "completed"
                      ? "Completed"
                      : examStatus === "passed"
                        ? "Passed"
                        : "Failed"}
                </Badge>
              </div>
              <CardDescription className="text-primary-700 dark:text-primary-400">
                Your AIK Komfren Exam has been scheduled
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-background rounded-lg p-4 shadow-sm border border-primary-200 dark:border-primary-800/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span className="font-medium">Date</span>
                  </div>
                  <p className="text-lg">
                    {currentExam?.scheduledDate 
                      ? new Date(currentExam.scheduledDate).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "Not scheduled"}
                  </p>
                </div>
                <div className="bg-white dark:bg-background rounded-lg p-4 shadow-sm border border-primary-200 dark:border-primary-800/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <span className="font-medium">Time</span>
                  </div>
                  <p className="text-lg">
                    {currentExam?.scheduledDate 
                      ? new Date(currentExam.scheduledDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) + " - " + new Date(new Date(currentExam.scheduledDate).getTime() + 60*60*1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
                      : "Not scheduled"}
                  </p>
                </div>
                <div className="bg-white dark:bg-background rounded-lg p-4 shadow-sm border border-primary-200 dark:border-primary-800/30">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span className="font-medium">Location</span>
                  </div>
                  <p className="text-lg">{currentExam?.location || "Not assigned"}</p>
                </div>
              </div>

              <div className="bg-white dark:bg-background rounded-lg p-4 shadow-sm border border-primary-200 dark:border-primary-800/30">
                <div className="flex items-center gap-2 mb-4">
                  <Info className="h-5 w-5 text-primary" />
                  <span className="font-medium">Important Notes</span>
                </div>
                <p>Please arrive 15 minutes before the scheduled time. Bring your student ID card and a copy of the Al-Qur'an.</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full bg-white/80 dark:bg-background/80">
                <Calendar className="mr-2 h-4 w-4" /> Add to Calendar
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Examiner Information</CardTitle>
              <CardDescription>Details about your assigned examiner</CardDescription>
            </CardHeader>
            <CardContent>
              {currentExam?.examiner ? (
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex flex-col items-center">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="/placeholder.svg?height=100&width=100" alt={currentExam.examiner.name} />
                      <AvatarFallback>
                        {currentExam.examiner.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-medium text-lg mt-2">{currentExam.examiner.name}</h3>
                    <p className="text-sm text-muted-foreground">{currentExam.examiner.position}</p>
                    <p className="text-sm text-muted-foreground">{currentExam.examiner.department}</p>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Mail className="h-5 w-5 text-muted-foreground" />
                        <span>Contact via academic office</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-5 w-5 text-muted-foreground" />
                        <span>NIP: {currentExam.examiner.nip}</span>
                      </div>
                    </div>
                    <div className="border-t pt-4">
                      <h4 className="font-medium mb-2">Exam Materials</h4>
                      <ul className="space-y-2">
                        {examMaterials.map((material: string, index: number) => (
                          <li key={index} className="flex items-start gap-2">
                            <BookOpen className="h-5 w-5 text-primary mt-0.5" />
                            <span>{material}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Info className="h-12 w-12 mx-auto mb-4" />
                  <p>Examiner has not been assigned yet.</p>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/dashboard/mahasiswa/aik-komfren">Back to Dashboard</Link>
            </Button>
            {examStatus === "scheduled" && (
              <Button asChild>
                <Link href="/dashboard/mahasiswa/aik-komfren/completion">
                  Proceed to Exam Completion <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  )
}

