"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { BookOpen, GraduationCap, Award, FileText, Upload, X } from "lucide-react"

interface FormRequirement {
  name: string
  label: string
  type: "text" | "textarea" | "file" | "select"
  required: boolean
  options?: { value: string; label: string }[]
}

interface ExamSubmissionFormProps {
  examType: "proposal" | "result" | "closing"
  onClose: () => void
  requirements: FormRequirement[]
}

export function ExamSubmissionForm({ examType, onClose, requirements }: ExamSubmissionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [fileNames, setFileNames] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target
    if (files && files.length > 0) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }))
      setFileNames((prev) => ({ ...prev, [name]: files[0].name }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Exam Submitted",
        description: `Your ${examType} examination has been submitted successfully.`,
        variant: "default",
      })
      onClose()
    }, 1500)
  }

  const getExamTitle = () => {
    switch (examType) {
      case "proposal":
        return {
          title: "Proposal Examination Submission",
          description: "Submit your research proposal for review",
          icon: <BookOpen className="h-5 w-5 text-blue-600" />,
          color: "text-blue-800",
          descColor: "text-blue-700",
          bgColor: "from-blue-50 to-blue-100",
          borderColor: "border-blue-200",
          buttonColor: "bg-blue-600 hover:bg-blue-700",
        }
      case "result":
        return {
          title: "Result Examination Submission",
          description: "Submit your research results for review",
          icon: <GraduationCap className="h-5 w-5 text-purple-600" />,
          color: "text-purple-800",
          descColor: "text-purple-700",
          bgColor: "from-purple-50 to-purple-100",
          borderColor: "border-purple-200",
          buttonColor: "bg-purple-600 hover:bg-purple-700",
        }
      case "closing":
        return {
          title: "Closing Examination Submission",
          description: "Submit your final thesis for review",
          icon: <Award className="h-5 w-5 text-teal-600" />,
          color: "text-teal-800",
          descColor: "text-teal-700",
          bgColor: "from-teal-50 to-teal-100",
          borderColor: "border-teal-200",
          buttonColor: "bg-teal-600 hover:bg-teal-700",
        }
    }
  }

  const examInfo = getExamTitle()

  return (
    <Card className={`border-${examInfo.borderColor.split("-")[1]}`}>
      <CardHeader className={`bg-gradient-to-r ${examInfo.bgColor} pb-3 border-b ${examInfo.borderColor}`}>
        <CardTitle className={`${examInfo.color} flex items-center gap-2`}>
          {examInfo.icon}
          {examInfo.title}
        </CardTitle>
        <CardDescription className={examInfo.descColor}>{examInfo.description}</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="p-6 space-y-6">
          {requirements.map((req) => (
            <div key={req.name} className="space-y-2">
              <Label htmlFor={req.name} className="text-sm font-medium">
                {req.label} {req.required && <span className="text-red-500">*</span>}
              </Label>

              {req.type === "text" && (
                <Input
                  id={req.name}
                  name={req.name}
                  required={req.required}
                  onChange={handleChange}
                  className="border-input focus:border-primary focus:ring-1 focus:ring-primary"
                />
              )}

              {req.type === "textarea" && (
                <Textarea
                  id={req.name}
                  name={req.name}
                  required={req.required}
                  onChange={handleChange}
                  rows={4}
                  className="border-input focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                />
              )}

              {req.type === "file" && (
                <div className="space-y-2">
                  <div className="relative">
                    <Input
                      id={req.name}
                      name={req.name}
                      type="file"
                      required={req.required}
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <div
                      className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors ${
                        fileNames[req.name] ? "border-primary/30 bg-primary/5" : "border-muted"
                      }`}
                      onClick={() => document.getElementById(req.name)?.click()}
                    >
                      {fileNames[req.name] ? (
                        <div className="flex items-center justify-center gap-2">
                          <FileText className="h-5 w-5 text-primary" />
                          <span className="font-medium text-primary">{fileNames[req.name]}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 rounded-full ml-2"
                            onClick={(e) => {
                              e.stopPropagation()
                              setFileNames((prev) => {
                                const newState = { ...prev }
                                delete newState[req.name]
                                return newState
                              })
                              setFormData((prev) => {
                                const newState = { ...prev }
                                delete newState[req.name]
                                return newState
                              })
                              const input = document.getElementById(req.name) as HTMLInputElement
                              if (input) input.value = ""
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-4">
                          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                          <p className="text-sm font-medium">Click to upload or drag and drop</p>
                          <p className="text-xs text-muted-foreground mt-1">PDF, DOCX, PPT, PPTX up to 10MB</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {req.type === "select" && req.options && (
                <select
                  id={req.name}
                  name={req.name}
                  required={req.required}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:border-primary focus:ring-1 focus:ring-primary"
                >
                  <option value="">Select an option</option>
                  {req.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              )}
            </div>
          ))}
        </CardContent>
        <CardFooter
          className={`flex justify-between p-6 bg-${examInfo.bgColor.split("-")[1]}-50/50 border-t ${examInfo.borderColor}`}
        >
          <Button type="button" variant="outline" onClick={onClose} className="border-gray-300">
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting} className={examInfo.buttonColor}>
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Submitting...
              </>
            ) : (
              "Submit Examination"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

