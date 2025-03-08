"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import type { LabAssistant } from "./types"

interface EditLabAssistantDialogProps {
  assistant: LabAssistant
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditLabAssistantDialog({ assistant, open, onOpenChange }: EditLabAssistantDialogProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: assistant.name,
    studentId: assistant.studentId,
    email: assistant.email,
    phone: assistant.phone || "",
    lab: assistant.lab,
    experience: assistant.experience.toString(),
    skills: assistant.skills || "",
    status: assistant.status,
  })

  // Update form data when assistant changes
  useEffect(() => {
    setFormData({
      name: assistant.name,
      studentId: assistant.studentId,
      email: assistant.email,
      phone: assistant.phone || "",
      lab: assistant.lab,
      experience: assistant.experience.toString(),
      skills: assistant.skills || "",
      status: assistant.status,
    })
  }, [assistant])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Here you would typically send the data to your API
    console.log("Updating lab assistant:", formData)

    toast({
      title: "Lab assistant updated",
      description: `${formData.name}'s information has been updated.`,
    })

    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Edit Laboratory Assistant</DialogTitle>
          <DialogDescription>Update the details of {assistant.name}.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="studentId">Student ID</Label>
                <Input id="studentId" name="studentId" value={formData.studentId} onChange={handleChange} required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="lab">Laboratory</Label>
                <Select value={formData.lab} onValueChange={(value) => handleSelectChange("lab", value)}>
                  <SelectTrigger id="lab">
                    <SelectValue placeholder="Select laboratory" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Computer Networks">Computer Networks</SelectItem>
                    <SelectItem value="Database Systems">Database Systems</SelectItem>
                    <SelectItem value="Programming">Programming</SelectItem>
                    <SelectItem value="Multimedia">Multimedia</SelectItem>
                    <SelectItem value="Artificial Intelligence">Artificial Intelligence</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">Experience (Semesters)</Label>
                <Select value={formData.experience} onValueChange={(value) => handleSelectChange("experience", value)}>
                  <SelectTrigger id="experience">
                    <SelectValue placeholder="Select experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0 (New)</SelectItem>
                    <SelectItem value="1">1 Semester</SelectItem>
                    <SelectItem value="2">2 Semesters</SelectItem>
                    <SelectItem value="3">3 Semesters</SelectItem>
                    <SelectItem value="4">4+ Semesters</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills">Skills & Qualifications</Label>
              <Textarea
                id="skills"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="Enter relevant skills, courses taken, certifications, etc."
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="probation">Probation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

