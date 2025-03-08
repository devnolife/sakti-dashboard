"use client"

import { ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { PracticumCourse } from "./types"

interface PracticumGradeFilterDropdownProps {
  courses: PracticumCourse[]
  selectedCourseId: string
  onSelectCourse: (courseId: string) => void
}

export default function PracticumGradeFilterDropdown({
  courses,
  selectedCourseId,
  onSelectCourse,
}: PracticumGradeFilterDropdownProps) {
  const selectedCourse = courses.find((course) => course.id === selectedCourseId)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-[240px] justify-between">
          <span className="truncate">{selectedCourse?.name || "Select Course"}</span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[240px]">
        <DropdownMenuLabel>Select Practicum Course</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={selectedCourseId} onValueChange={onSelectCourse}>
          {courses.map((course) => (
            <DropdownMenuRadioItem key={course.id} value={course.id}>
              {course.name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

