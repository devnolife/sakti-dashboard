"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertCircle, Lock, Award, FileText, Calendar, FileCheck, BookOpen } from "lucide-react"
import type { StudentExam } from "./mock-student-exam-data"
import { ExamSubmissionForm } from "./exam-submission-form"
import type { ExamStatus } from "@/types/exam"

interface ClosingExamTabProps {
  examData: StudentExam
  resultStatus: ExamStatus
}

export function ClosingExamTab({ examData, resultStatus }: ClosingExamTabProps) {
  const [showSubmissionForm, setShowSubmissionForm] = useState(false)

  // Check if result is passed (prerequisite)
  const resultPassed = resultStatus === "passed"

  // Update the requirements based on result status
  const updatedRequirements = examData.requirements.map((req) => {
    if (req.id === "close-req-4") {
      return { ...req, completed: resultPassed }
    }
    return req
  })

  // Check if all requirements are completed
  const allRequirementsCompleted = updatedRequirements.every((req) => req.completed)
  const canSubmit = allRequirementsCompleted && examData.status === "pending" && !examData.submissionDate

  return (
    <div className="space-y-6">
      {!resultPassed && (
        <div className="bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 text-amber-800 p-4 rounded-xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-200 flex items-center justify-center flex-shrink-0">
            <Lock className="h-5 w-5 text-amber-700" />
          </div>
          <div>
            <h3 className="font-medium text-amber-900">Result Exam Required</h3>
            <p className="text-sm text-amber-800">
              You must pass your result examination before proceeding with the closing exam.
            </p>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="border-teal-200 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-teal-50 to-teal-100 pb-3 border-b border-teal-200">
              <div className="flex items-center justify-between">
                <CardTitle className="text-teal-800 flex items-center gap-2">
                  <Award className="h-5 w-5 text-teal-600" />
                  Closing Examination Requirements
                </CardTitle>
                <div className="text-sm font-medium text-teal-700 bg-white/80 px-3 py-1 rounded-full border border-teal-300">
                  {updatedRequirements.filter((r) => r.completed).length}/{updatedRequirements.length} Completed
                </div>
              </div>
              <CardDescription className="text-teal-700">
                Complete all requirements before submitting your closing exam
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {updatedRequirements.map((requirement) => (
                  <div
                    key={requirement.id}
                    className={`flex items-start gap-3 p-4 ${
                      requirement.id === "close-req-4" && !resultPassed ? "bg-gray-50" : "hover:bg-teal-50/30"
                    } transition-colors`}
                  >
                    <div className="mt-0.5">
                      {requirement.completed ? (
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        </div>
                      ) : requirement.id === "close-req-4" && !resultPassed ? (
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                          <AlertCircle className="h-5 w-5 text-amber-600" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3
                        className={`font-medium ${
                          requirement.id === "close-req-4" && !resultPassed ? "text-gray-500" : "text-teal-900"
                        }`}
                      >
                        {requirement.title}
                      </h3>
                      <p
                        className={`text-sm ${
                          requirement.id === "close-req-4" && !resultPassed ? "text-gray-400" : "text-teal-700"
                        }`}
                      >
                        {requirement.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="bg-teal-50/50 p-4 border-t border-teal-200">
              {canSubmit ? (
                <Button onClick={() => setShowSubmissionForm(true)} className="w-full bg-teal-600 hover:bg-teal-700">
                  Submit Closing Exam
                </Button>
              ) : (
                <Button disabled className="w-full">
                  {!resultPassed
                    ? "Pass Result Exam First"
                    : !allRequirementsCompleted
                      ? "Complete All Requirements First"
                      : examData.submissionDate
                        ? "Closing Exam Already Submitted"
                        : "Cannot Submit at This Time"}
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card className="border-teal-200 h-full">
            <CardHeader className="bg-gradient-to-r from-teal-50 to-teal-100 pb-3 border-b border-teal-200">
              <CardTitle className="text-teal-800 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-teal-600" />
                Examination Status
              </CardTitle>
              <CardDescription className="text-teal-700">Current status of your closing exam</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex flex-col items-center justify-center text-center p-4">
                  <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mb-3">
                    <Award className="h-8 w-8 text-teal-600" />
                  </div>
                  <h3 className="font-medium text-lg text-teal-800">Closing Examination</h3>
                  <div className="mt-2">
                    {!resultPassed && (
                      <div className="text-gray-600 bg-gray-50 px-3 py-1 rounded-full border border-gray-200 text-sm font-medium">
                        Locked
                      </div>
                    )}
                    {resultPassed && examData.status === "pending" && !examData.submissionDate && (
                      <div className="text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 text-sm font-medium">
                        Not Submitted
                      </div>
                    )}
                    {resultPassed && examData.status === "pending" && examData.submissionDate && (
                      <div className="text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-200 text-sm font-medium">
                        Submitted, Awaiting Review
                      </div>
                    )}
                    {examData.status === "scheduled" && (
                      <div className="text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-200 text-sm font-medium">
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
                  <div className="bg-teal-50 p-3 rounded-lg border border-teal-200">
                    <h4 className="text-sm font-medium text-teal-800">Scheduled Date</h4>
                    <p className="text-teal-700 mt-1">{new Date(examData.scheduledDate).toLocaleString()}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {showSubmissionForm && (
        <ExamSubmissionForm
          examType="closing"
          onClose={() => setShowSubmissionForm(false)}
          requirements={[
            { name: "title", label: "Final Thesis Title", type: "text", required: true },
            { name: "abstract", label: "Final Abstract", type: "textarea", required: true },
            { name: "document", label: "Final Thesis Document (PDF)", type: "file", required: true },
            { name: "plagiarism", label: "Plagiarism Check Report (PDF)", type: "file", required: true },
            { name: "publication", label: "Publication Proof (PDF)", type: "file", required: true },
          ]}
        />
      )}

      {examData.submissionDate && (
        <Card className="border-teal-200">
          <CardHeader className="bg-gradient-to-r from-teal-50 to-teal-100 pb-3 border-b border-teal-200">
            <CardTitle className="text-teal-800 flex items-center gap-2">
              <FileText className="h-5 w-5 text-teal-600" />
              Submitted Closing Exam
            </CardTitle>
            <CardDescription className="text-teal-700">Your closing examination submission details</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-teal-50 p-3 rounded-lg border border-teal-200">
                  <h3 className="text-sm font-medium text-teal-800">Thesis Title</h3>
                  <p className="text-teal-700">{examData.title}</p>
                </div>

                {examData.abstract && (
                  <div className="bg-teal-50 p-3 rounded-lg border border-teal-200">
                    <h3 className="text-sm font-medium text-teal-800">Abstract</h3>
                    <p className="text-sm text-teal-700">{examData.abstract}</p>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="bg-teal-50 p-3 rounded-lg border border-teal-200">
                  <h3 className="text-sm font-medium text-teal-800">Submission Date</h3>
                  <p className="text-teal-700">{new Date(examData.submissionDate).toLocaleDateString()}</p>
                </div>

                {examData.scheduledDate && (
                  <div className="bg-teal-50 p-3 rounded-lg border border-teal-200">
                    <h3 className="text-sm font-medium text-teal-800">Examination Date</h3>
                    <p className="text-teal-700">{new Date(examData.scheduledDate).toLocaleString()}</p>
                  </div>
                )}

                <div className="flex gap-3 flex-wrap">
                  <div className="flex-1 min-w-[120px] bg-teal-50 p-3 rounded-lg border border-teal-200 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-teal-600" />
                    <div>
                      <h3 className="text-sm font-medium text-teal-800">Final Thesis</h3>
                      <p className="text-xs text-teal-700">thesis.pdf</p>
                    </div>
                  </div>

                  <div className="flex-1 min-w-[120px] bg-teal-50 p-3 rounded-lg border border-teal-200 flex items-center gap-2">
                    <FileCheck className="h-5 w-5 text-teal-600" />
                    <div>
                      <h3 className="text-sm font-medium text-teal-800">Plagiarism Report</h3>
                      <p className="text-xs text-teal-700">plagiarism.pdf</p>
                    </div>
                  </div>

                  <div className="flex-1 min-w-[120px] bg-teal-50 p-3 rounded-lg border border-teal-200 flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-teal-600" />
                    <div>
                      <h3 className="text-sm font-medium text-teal-800">Publication</h3>
                      <p className="text-xs text-teal-700">publication.pdf</p>
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

