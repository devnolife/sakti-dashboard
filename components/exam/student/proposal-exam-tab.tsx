"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertCircle, BookOpen, FileText, Presentation, Calendar } from "lucide-react"
import type { StudentExam } from "./mock-student-exam-data"
import { ExamSubmissionForm } from "./exam-submission-form"

interface ProposalExamTabProps {
  examData: StudentExam
}

export function ProposalExamTab({ examData }: ProposalExamTabProps) {
  const [showSubmissionForm, setShowSubmissionForm] = useState(false)

  // Check if all requirements are completed
  const allRequirementsCompleted = examData.requirements.every((req) => req.completed)
  const canSubmit = allRequirementsCompleted && examData.status === "pending" && !examData.submissionDate

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="border-blue-200 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 pb-3 border-b border-blue-200">
              <div className="flex items-center justify-between">
                <CardTitle className="text-blue-800 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  Proposal Examination Requirements
                </CardTitle>
                <div className="text-sm font-medium text-blue-700 bg-white/80 px-3 py-1 rounded-full border border-blue-300">
                  {examData.requirements.filter((r) => r.completed).length}/{examData.requirements.length} Completed
                </div>
              </div>
              <CardDescription className="text-blue-700">
                Complete all requirements before submitting your proposal
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {examData.requirements.map((requirement) => (
                  <div
                    key={requirement.id}
                    className="flex items-start gap-3 p-4 hover:bg-blue-50/30 transition-colors"
                  >
                    <div className="mt-0.5">
                      {requirement.completed ? (
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                          <AlertCircle className="h-5 w-5 text-amber-600" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-blue-900">{requirement.title}</h3>
                      <p className="text-sm text-blue-700">{requirement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="bg-blue-50/50 p-4 border-t border-blue-200">
              {canSubmit ? (
                <Button onClick={() => setShowSubmissionForm(true)} className="w-full bg-blue-600 hover:bg-blue-700">
                  Submit Proposal Exam
                </Button>
              ) : (
                <Button disabled className="w-full">
                  {!allRequirementsCompleted
                    ? "Complete All Requirements First"
                    : examData.submissionDate
                      ? "Proposal Already Submitted"
                      : "Cannot Submit at This Time"}
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card className="border-blue-200 h-full">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 pb-3 border-b border-blue-200">
              <CardTitle className="text-blue-800 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                Examination Status
              </CardTitle>
              <CardDescription className="text-blue-700">Current status of your proposal exam</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex flex-col items-center justify-center text-center p-4">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                    <BookOpen className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-medium text-lg text-blue-800">Proposal Examination</h3>
                  <div className="mt-2">
                    {examData.status === "pending" && !examData.submissionDate && (
                      <div className="text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 text-sm font-medium">
                        Not Submitted
                      </div>
                    )}
                    {examData.status === "pending" && examData.submissionDate && (
                      <div className="text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 text-sm font-medium">
                        Submitted, Awaiting Review
                      </div>
                    )}
                    {examData.status === "scheduled" && (
                      <div className="text-purple-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-200 text-sm font-medium">
                        Examination Scheduled
                      </div>
                    )}
                    {examData.status === "passed" && (
                      <div className="text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-200 text-sm font-medium">
                        Passed
                      </div>
                    )}
                    {examData.status === "failed" && (
                      <div className="text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-200 text-sm font-medium">
                        Failed
                      </div>
                    )}
                  </div>
                </div>

                {examData.scheduledDate && (
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <h4 className="text-sm font-medium text-blue-800">Scheduled Date</h4>
                    <p className="text-blue-700 mt-1">{new Date(examData.scheduledDate).toLocaleString()}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {showSubmissionForm && (
        <ExamSubmissionForm
          examType="proposal"
          onClose={() => setShowSubmissionForm(false)}
          requirements={[
            { name: "title", label: "Research Title", type: "text", required: true },
            { name: "abstract", label: "Research Abstract", type: "textarea", required: true },
            { name: "document", label: "Proposal Document (PDF)", type: "file", required: true },
            { name: "presentation", label: "Presentation Slides (PPT/PDF)", type: "file", required: true },
          ]}
        />
      )}

      {examData.submissionDate && (
        <Card className="border-blue-200">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 pb-3 border-b border-blue-200">
            <CardTitle className="text-blue-800 flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              Submitted Proposal
            </CardTitle>
            <CardDescription className="text-blue-700">Your proposal examination submission details</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <h3 className="text-sm font-medium text-blue-800">Research Title</h3>
                  <p className="text-blue-700">{examData.title}</p>
                </div>

                {examData.abstract && (
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <h3 className="text-sm font-medium text-blue-800">Abstract</h3>
                    <p className="text-sm text-blue-700">{examData.abstract}</p>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <h3 className="text-sm font-medium text-blue-800">Submission Date</h3>
                  <p className="text-blue-700">{new Date(examData.submissionDate).toLocaleDateString()}</p>
                </div>

                {examData.scheduledDate && (
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <h3 className="text-sm font-medium text-blue-800">Examination Date</h3>
                    <p className="text-blue-700">{new Date(examData.scheduledDate).toLocaleString()}</p>
                  </div>
                )}

                <div className="flex gap-3">
                  <div className="flex-1 bg-blue-50 p-3 rounded-lg border border-blue-200 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <div>
                      <h3 className="text-sm font-medium text-blue-800">Proposal Document</h3>
                      <p className="text-xs text-blue-700">proposal.pdf</p>
                    </div>
                  </div>

                  <div className="flex-1 bg-blue-50 p-3 rounded-lg border border-blue-200 flex items-center gap-2">
                    <Presentation className="h-5 w-5 text-blue-600" />
                    <div>
                      <h3 className="text-sm font-medium text-blue-800">Presentation</h3>
                      <p className="text-xs text-blue-700">slides.pptx</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

