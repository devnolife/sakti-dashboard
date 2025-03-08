"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { LabAssistant } from "./types"

interface LabAssistantScheduleProps {
  assistants: LabAssistant[]
}

export function LabAssistantSchedule({ assistants }: LabAssistantScheduleProps) {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const timeSlots = ["08:00 - 10:00", "10:00 - 12:00", "13:00 - 15:00", "15:00 - 17:00"]

  // Create a schedule map to easily look up assistants by day and time
  const scheduleMap: Record<string, Record<string, LabAssistant[]>> = {}

  daysOfWeek.forEach((day) => {
    scheduleMap[day] = {}
    timeSlots.forEach((time) => {
      scheduleMap[day][time] = []
    })
  })

  // Populate the schedule map
  assistants.forEach((assistant) => {
    if (assistant.schedule) {
      assistant.schedule.forEach((session) => {
        const { day, time } = session
        if (scheduleMap[day] && scheduleMap[day][time]) {
          scheduleMap[day][time].push(assistant)
        }
      })
    }
  })

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Weekly Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2 bg-muted font-medium text-left">Time / Day</th>
                  {daysOfWeek.map((day) => (
                    <th key={day} className="border p-2 bg-muted font-medium text-left">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((time) => (
                  <tr key={time}>
                    <td className="border p-2 font-medium">{time}</td>
                    {daysOfWeek.map((day) => (
                      <td key={`${day}-${time}`} className="border p-2">
                        {scheduleMap[day][time].length > 0 ? (
                          <div className="space-y-2">
                            {scheduleMap[day][time].map((assistant, index) => {
                              const session = assistant.schedule?.find((s) => s.day === day && s.time === time)
                              return (
                                <div key={index} className="flex items-center space-x-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage src={assistant.avatar} alt={assistant.name} />
                                    <AvatarFallback className="text-xs">{assistant.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="text-xs font-medium">{assistant.name}</p>
                                    <p className="text-xs text-muted-foreground">{session?.course}</p>
                                    <p className="text-xs text-muted-foreground">Room: {session?.room}</p>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground">No assistants scheduled</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Unassigned Assistants</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {assistants
              .filter((assistant) => !assistant.schedule || assistant.schedule.length === 0)
              .map((assistant) => (
                <div key={assistant.id} className="flex items-center space-x-3 p-3 border rounded-md">
                  <Avatar>
                    <AvatarImage src={assistant.avatar} alt={assistant.name} />
                    <AvatarFallback>{assistant.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{assistant.name}</p>
                    <p className="text-sm text-muted-foreground">{assistant.lab}</p>
                    <Badge variant={assistant.status === "active" ? "success" : "secondary"}>{assistant.status}</Badge>
                  </div>
                </div>
              ))}
            {assistants.filter((assistant) => !assistant.schedule || assistant.schedule.length === 0).length === 0 && (
              <p className="text-muted-foreground col-span-full">All assistants have been assigned to schedules.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

