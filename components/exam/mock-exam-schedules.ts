import type { ExamSchedule, Classroom } from "@/types/exam-schedule"

export const mockClassrooms: Classroom[] = [
  { id: "c1", name: "Room 101", building: "Engineering Building", capacity: 30 },
  { id: "c2", name: "Room 102", building: "Engineering Building", capacity: 25 },
  { id: "c3", name: "Room 201", building: "Engineering Building", capacity: 40 },
  { id: "c4", name: "Room 301", building: "Engineering Building", capacity: 35 },
  { id: "c5", name: "Room 101", building: "Science Building", capacity: 30 },
  { id: "c6", name: "Room 102", building: "Science Building", capacity: 25 },
  { id: "c7", name: "Room 201", building: "Science Building", capacity: 40 },
  { id: "c8", name: "Room 301", building: "Science Building", capacity: 35 },
  { id: "c9", name: "Room 101", building: "Computer Science Building", capacity: 30 },
  { id: "c10", name: "Room 102", building: "Computer Science Building", capacity: 25 },
  { id: "c11", name: "Room 201", building: "Computer Science Building", capacity: 40 },
  { id: "c12", name: "Room 301", building: "Computer Science Building", capacity: 35 },
]

export const mockExamSchedules: ExamSchedule[] = [
  {
    id: "schedule-1",
    courseName: "Data Structures and Algorithms",
    date: new Date(2025, 2, 15).toISOString(),
    startTime: "08:00",
    endTime: "10:00",
    classroom: mockClassrooms[0],
  },
  {
    id: "schedule-2",
    courseName: "Database Systems",
    date: new Date(2025, 2, 15).toISOString(),
    startTime: "10:30",
    endTime: "12:30",
    classroom: mockClassrooms[1],
  },
  {
    id: "schedule-3",
    courseName: "Operating Systems",
    date: new Date(2025, 2, 16).toISOString(),
    startTime: "08:00",
    endTime: "10:00",
    classroom: mockClassrooms[2],
  },
  {
    id: "schedule-4",
    courseName: "Computer Networks",
    date: new Date(2025, 2, 16).toISOString(),
    startTime: "10:30",
    endTime: "12:30",
    classroom: mockClassrooms[3],
  },
  {
    id: "schedule-5",
    courseName: "Software Engineering",
    date: new Date(2025, 2, 17).toISOString(),
    startTime: "08:00",
    endTime: "10:00",
    classroom: mockClassrooms[4],
  },
  {
    id: "schedule-6",
    courseName: "Artificial Intelligence",
    date: new Date(2025, 2, 17).toISOString(),
    startTime: "10:30",
    endTime: "12:30",
    classroom: mockClassrooms[5],
  },
  {
    id: "schedule-7",
    courseName: "Machine Learning",
    date: new Date(2025, 2, 18).toISOString(),
    startTime: "08:00",
    endTime: "10:00",
    classroom: mockClassrooms[6],
  },
  {
    id: "schedule-8",
    courseName: "Web Development",
    date: new Date(2025, 2, 18).toISOString(),
    startTime: "10:30",
    endTime: "12:30",
    classroom: mockClassrooms[7],
  },
]

