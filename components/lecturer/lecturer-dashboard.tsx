"use client"
import { LecturerMetricsGrid } from "./lecturer-metrics-grid"
import { LecturerWelcome } from "./lecturer-welcome"
import { GuidanceOverview } from "./guidance-overview"
import { PendingTasksCard } from "./pending-tasks-card"

export default function LecturerDashboard() {
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Welcome and key metrics */}
      <div className="grid gap-6 md:grid-cols-2">
        <LecturerWelcome />
        <PendingTasksCard />
      </div>

      {/* Main metrics grid */}
      <LecturerMetricsGrid />

      {/* Guidance overview */}
      <GuidanceOverview />
    </div>
  )
}

