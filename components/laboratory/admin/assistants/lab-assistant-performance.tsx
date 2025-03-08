"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import type { LabAssistant } from "./types"

interface LabAssistantPerformanceProps {
  assistants: LabAssistant[]
}

export function LabAssistantPerformance({ assistants }: LabAssistantPerformanceProps) {
  // Prepare data for the performance chart
  const performanceData = assistants
    .filter((assistant) => assistant.ratings)
    .map((assistant) => ({
      name: assistant.name.split(" ")[0], // Use first name for chart
      studentFeedback: assistant.ratings?.studentFeedback || 0,
      technicalKnowledge: assistant.ratings?.technicalKnowledge || 0,
      communication: assistant.ratings?.communication || 0,
      reliability: assistant.ratings?.reliability || 0,
      average: calculateAverage(assistant.ratings),
    }))
    .sort((a, b) => b.average - a.average)
    .slice(0, 10) // Top 10 assistants by average rating

  function calculateAverage(ratings: LabAssistant["ratings"]) {
    if (!ratings) return 0
    const { studentFeedback, technicalKnowledge, communication, reliability } = ratings
    return (studentFeedback + technicalKnowledge + communication + reliability) / 4
  }

  // Get assistants with attendance issues
  const assistantsWithAttendanceIssues = assistants
    .filter((assistant) => assistant.attendance && (assistant.attendance.absent > 2 || assistant.attendance.late > 3))
    .sort(
      (a, b) =>
        (b.attendance?.absent || 0) +
        (b.attendance?.late || 0) / 2 -
        (a.attendance?.absent || 0) -
        (a.attendance?.late || 0) / 2,
    )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Performance Ratings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="studentFeedback" name="Student Feedback" fill="#8884d8" />
                <Bar dataKey="technicalKnowledge" name="Technical Knowledge" fill="#82ca9d" />
                <Bar dataKey="communication" name="Communication" fill="#ffc658" />
                <Bar dataKey="reliability" name="Reliability" fill="#ff8042" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Attendance Issues</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Assistant</TableHead>
                <TableHead>Laboratory</TableHead>
                <TableHead>Absences</TableHead>
                <TableHead>Late Arrivals</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assistantsWithAttendanceIssues.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    No attendance issues found.
                  </TableCell>
                </TableRow>
              ) : (
                assistantsWithAttendanceIssues.map((assistant) => (
                  <TableRow key={assistant.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={assistant.avatar} alt={assistant.name} />
                          <AvatarFallback>{assistant.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{assistant.name}</p>
                          <p className="text-xs text-muted-foreground">{assistant.studentId}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{assistant.lab}</TableCell>
                    <TableCell>
                      <Badge variant={(assistant.attendance?.absent || 0) > 2 ? "destructive" : "secondary"}>
                        {assistant.attendance?.absent || 0}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={(assistant.attendance?.late || 0) > 3 ? "warning" : "secondary"}>
                        {assistant.attendance?.late || 0}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={assistant.status === "probation" ? "warning" : "secondary"}>
                        {assistant.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Top Performers</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Assistant</TableHead>
                <TableHead>Laboratory</TableHead>
                <TableHead>Student Feedback</TableHead>
                <TableHead>Technical Knowledge</TableHead>
                <TableHead>Overall Rating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {performanceData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    No performance data available.
                  </TableCell>
                </TableRow>
              ) : (
                performanceData.slice(0, 5).map((data, index) => {
                  const assistant = assistants.find((a) => a.name.startsWith(data.name))
                  if (!assistant) return null

                  return (
                    <TableRow key={assistant.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={assistant.avatar} alt={assistant.name} />
                            <AvatarFallback>{assistant.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{assistant.name}</p>
                            <p className="text-xs text-muted-foreground">{assistant.studentId}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{assistant.lab}</TableCell>
                      <TableCell>{data.studentFeedback.toFixed(1)}/5</TableCell>
                      <TableCell>{data.technicalKnowledge.toFixed(1)}/5</TableCell>
                      <TableCell>
                        <Badge variant="success">{data.average.toFixed(1)}/5</Badge>
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

