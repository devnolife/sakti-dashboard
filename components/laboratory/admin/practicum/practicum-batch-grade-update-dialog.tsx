"use client"

import { useState } from "react"
import { Check, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { PracticumCourse } from "./types"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { toast } from "@/components/ui/use-toast"

interface PracticumBatchGradeUpdateDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  course: PracticumCourse | undefined
}

export default function PracticumBatchGradeUpdateDialog({
  open,
  onOpenChange,
  course,
}: PracticumBatchGradeUpdateDialogProps) {
  const [gradeComponent, setGradeComponent] = useState<string>("midterm")
  const [updateType, setUpdateType] = useState<string>("add")
  const [value, setValue] = useState<string>("0")
  const [labSection, setLabSection] = useState<string>("all")

  const handleUpdateGrades = () => {
    toast({
      title: "Grades updated",
      description: `${updateType === "add" ? "Added" : updateType === "subtract" ? "Subtracted" : "Set"} ${value} ${updateType !== "set" ? "points to" : "as the value for"} ${gradeComponent} for all students ${labSection !== "all" ? `in ${labSection}` : ""}.`,
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Batch Update Grades</DialogTitle>
          <DialogDescription>Update grades for multiple students at once.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Alert variant="default">
            <Info className="h-4 w-4" />
            <AlertTitle>About Batch Updates</AlertTitle>
            <AlertDescription className="text-xs">
              This will update grades for all students in the selected lab section. Be careful when using this feature
              as it will affect multiple student records.
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Label htmlFor="course">Course</Label>
            <Input id="course" value={course?.name || ""} disabled />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lab-section">Lab Section</Label>
            <Select value={labSection} onValueChange={setLabSection}>
              <SelectTrigger id="lab-section">
                <SelectValue placeholder="Select lab section" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sections</SelectItem>
                <SelectItem value="Lab A">Lab A</SelectItem>
                <SelectItem value="Lab B">Lab B</SelectItem>
                <SelectItem value="Lab C">Lab C</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="grade-component">Grade Component</Label>
            <Select value={gradeComponent} onValueChange={setGradeComponent}>
              <SelectTrigger id="grade-component">
                <SelectValue placeholder="Select grade component" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="midterm">Midterm</SelectItem>
                <SelectItem value="final">Final</SelectItem>
                <SelectItem value="assignments">Assignments</SelectItem>
                <SelectItem value="labReports">Lab Reports</SelectItem>
                <SelectItem value="attendance">Attendance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="update-type">Update Type</Label>
            <Select value={updateType} onValueChange={setUpdateType}>
              <SelectTrigger id="update-type">
                <SelectValue placeholder="Select update type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="add">Add Points</SelectItem>
                <SelectItem value="subtract">Subtract Points</SelectItem>
                <SelectItem value="set">Set Value</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="value">Value</Label>
            <Input
              id="value"
              type="number"
              min={updateType === "subtract" ? "0" : updateType === "set" ? "0" : "-100"}
              max="100"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleUpdateGrades}>
            <Check className="mr-2 h-4 w-4" />
            Update Grades
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

