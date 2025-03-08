"use client"
import { Badge } from "@/components/ui/badge"
import type { PracticumSchedule } from "./types"

interface PracticumScheduleCalendarProps {
  schedules: PracticumSchedule[]
}

export default function PracticumScheduleCalendar({ schedules }: PracticumScheduleCalendarProps) {
  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]
  const timeSlots = [
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ]

  // Group schedules by day
  const schedulesByDay = days.reduce(
    (acc, day) => {
      acc[day] = schedules.filter((schedule) => schedule.day === day)
      return acc
    },
    {} as Record<string, PracticumSchedule[]>,
  )

  const getScheduleForTimeSlot = (day: string, timeSlot: string) => {
    const daySchedules = schedulesByDay[day] || []
    return daySchedules.filter((schedule) => {
      const startHour = Number.parseInt(schedule.startTime.split(":")[0])
      const timeSlotHour = Number.parseInt(timeSlot.split(":")[0])
      return startHour === timeSlotHour
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "upcoming":
        return "bg-blue-500"
      case "completed":
        return "bg-gray-300"
      case "cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-300"
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-7 gap-4">
        <div className="col-span-1"></div>
        {days.map((day) => (
          <div key={day} className="text-center font-medium">
            {day}
          </div>
        ))}
      </div>

      {timeSlots.map((timeSlot) => (
        <div key={timeSlot} className="grid grid-cols-7 gap-4">
          <div className="flex items-center justify-end pr-2 text-sm text-muted-foreground">{timeSlot}</div>

          {days.map((day) => {
            const schedulesForSlot = getScheduleForTimeSlot(day, timeSlot)

            return (
              <div key={`${day}-${timeSlot}`} className="min-h-[60px] rounded-md border border-dashed p-1">
                {schedulesForSlot.map((schedule) => {
                  const durationHours =
                    Number.parseInt(schedule.endTime.split(":")[0]) - Number.parseInt(schedule.startTime.split(":")[0])

                  return (
                    <div
                      key={schedule.id}
                      className={`rounded-md p-1 text-xs ${getStatusColor(schedule.status)} text-white h-full overflow-hidden`}
                      style={{ minHeight: `${Math.max(durationHours * 30, 30)}px` }}
                    >
                      <div className="font-medium">{schedule.title}</div>
                      <div>
                        {schedule.startTime} - {schedule.endTime}
                      </div>
                      <div>{schedule.lab}</div>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      ))}

      <div className="flex items-center justify-end space-x-2 pt-4">
        <Badge className="bg-green-500">Aktif</Badge>
        <span className="text-sm text-muted-foreground">Aktif</span>

        <Badge className="bg-blue-500">Akan Datang</Badge>
        <span className="text-sm text-muted-foreground">Akan Datang</span>

        <Badge variant="outline">Selesai</Badge>
        <span className="text-sm text-muted-foreground">Selesai</span>

        <Badge variant="destructive">Dibatalkan</Badge>
        <span className="text-sm text-muted-foreground">Dibatalkan</span>
      </div>
    </div>
  )
}

