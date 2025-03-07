"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { ExamStatus } from "@/types/exam"

interface ExamFiltersProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  statusFilter: ExamStatus | "all"
  setStatusFilter: (status: ExamStatus | "all") => void
}

export function ExamFilters({ searchQuery, setSearchQuery, statusFilter, setStatusFilter }: ExamFiltersProps) {
  return (
    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search exams..."
          className="w-full pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as ExamStatus | "all")}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="scheduled">Scheduled</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
          <SelectItem value="passed">Passed</SelectItem>
          <SelectItem value="failed">Failed</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

