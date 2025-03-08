import type { Metadata } from "next"
import PracticumScheduleManagement from "@/components/laboratory/admin/practicum/practicum-schedule-management"

export const metadata: Metadata = {
  title: "Jadwal Praktikum | Admin Laboratorium",
  description: "Kelola jadwal praktikum untuk semua laboratorium",
}

export default function PracticumSchedulePage() {
  return <PracticumScheduleManagement />
}

