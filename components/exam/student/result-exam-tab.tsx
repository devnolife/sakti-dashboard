"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertCircle, Lock, GraduationCap, FileText, Presentation, Calendar, Database } from "lucide-react"
import type { StudentExam } from "./mock-student-exam-data"
import { ExamSubmissionForm } from "./exam-submission-form"
import type { ExamStatus } from "@/types/exam"

interface ResultExamTabProps {
  examData: StudentExam
  proposalStatus: ExamStatus
}

export function ResultExamTab({ examData, proposalStatus }: ResultExamTabProps) {
  const [showSubmissionForm, setShowSubmissionForm] = useState(false)

  // Check if proposal is passed (prerequisite)
  const proposalPassed = proposalStatus === "passed"

  // Update the requirements based on proposal status
  const updatedRequirements = examData.requirements.map((req) => {
    if (req.id === "res-req-5") {
      return { ...req, completed: proposalPassed }
    }
    return req
  })

  // Check if all requirements are completed
  const allRequirementsCompleted = updatedRequirements.every((req) => req.completed)
  const canSubmit = allRequirementsCompleted && examData.status === "pending" && !examData.submissionDate

  return (
    <div className="space-y-6">
      {!proposalPassed && (
        <div className="bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 text-amber-800 p-4 rounded-xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-200 flex items-center justify-center flex-shrink-0">
            <Lock className="h-5 w-5 text-amber-700" />
          </div>
          <div>
            <h3 className="font-medium text-amber-900">Ujian Proposal Required</h3>
            <p className="text-sm text-amber-800">
              You must pass your Ujian Proposalination before proceeding with the Ujian hasil.
            </p>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="border-purple-200 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 pb-3 border-b border-purple-200">
              <div className="flex items-center justify-between">
                <CardTitle className="text-purple-800 flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-purple-600" />
                  Ujian hasilination Requirements
                </CardTitle>
                <div className="text-sm font-medium text-purple-700 bg-white/80 px-3 py-1 rounded-full border border-purple-300">
                  {updatedRequirements.filter((r) => r.completed).length}/{updatedRequirements.length} Completed
                </div>
              </div>
              <CardDescription className="text-purple-700">
                Complete all requirements before submitting your Ujian hasil
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {updatedRequirements.map((requirement) => (
                  <div
                    key={requirement.id}
                    className={`flex items-start gap-3 p-4 ${
                      requirement.id === "res-req-5" && !proposalPassed ? "bg-gray-50" : "hover:bg-purple-50/30"
                    } transition-colors`}
                  >
                    <div className="mt-0.5">
                      {requirement.completed ? (
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        </div>
                      ) : requirement.id === "res-req-5" && !proposalPassed ? (
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
                          requirement.id === "res-req-5" && !proposalPassed ? "text-gray-500" : "text-purple-900"
                        }`}
                      >
                        {requirement.title}
                      </h3>
                      <p
                        className={`text-sm ${
                          requirement.id === "res-req-5" && !proposalPassed ? "text-gray-400" : "text-purple-700"
                        }`}
                      >
                        {requirement.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="bg-purple-50/50 p-4 border-t border-purple-200">
              {canSubmit ? (
                <Button
                  onClick={() => setShowSubmissionForm(true)}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  Submit Ujian hasil
                </Button>
              ) : (
                <Button disabled className="w-full">
                  {!proposalPassed
                    ? "Pass Ujian Proposal First"
                    : !allRequirementsCompleted
                      ? "Complete All Requirements First"
                      : examData.submissionDate
                        ? "Ujian hasil Already Submitted"
                        : "Cannot Submit at This Time"}
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card className="border-purple-200 h-full">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 pb-3 border-b border-purple-200">
              <CardTitle className="text-purple-800 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-600" />
                Examination Status
              </CardTitle>
              <CardDescription className="text-purple-700">Current status of your Ujian hasil</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex flex-col items-center justify-center text-center p-4">
                  <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-3">
                    <GraduationCap className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-medium text-lg text-purple-800">Ujian hasilination</h3>
                  <div className="mt-2">
                    {!proposalPassed && (
                      <div className="text-gray-600 bg-gray-50 px-3 py-1 rounded-full border border-gray-200 text-sm font-medium">
                        Locked
                      </div>
                    )}
                    {proposalPassed && examData.status === "pending" && !examData.submissionDate && (
                      <div className="text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 text-sm font-medium">
                        Not Submitted
                      </div>
                    )}
                    {proposalPassed && examData.status === "pending" && examData.submissionDate && (
                      <div className="text-purple-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-200 text-sm font-medium">
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
                  <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                    <h4 className="text-sm font-medium text-purple-800">Scheduled Date</h4>
                    <p className="text-purple-700 mt-1">{new Date(examData.scheduledDate).toLocaleString()}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {showSubmissionForm && (
        <ExamSubmissionForm
          examType="result"
          onClose={() => setShowSubmissionForm(false)}
          requirements={[
            { name: "title", label: "Research Title", type: "text", required: true },
            { name: "abstract", label: "Research Abstract", type: "textarea", required: true },
            { name: "document", label: "Complete Research Paper (PDF)", type: "file", required: true },
            { name: "presentation", label: "Presentation Slides (PPT/PDF)", type: "file", required: true },
            { name: "data", label: "Data Analysis Files (Optional)", type: "file", required: false },
          ]}
        />
      )}

      {examData.submissionDate && (
        <Card className="border-purple-200">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 pb-3 border-b border-purple-200">
            <CardTitle className="text-purple-800 flex items-center gap-2">
              <FileText className="h-5 w-5 text-purple-600" />
              Submitted Ujian hasil
            </CardTitle>
            <CardDescription className="text-purple-700">Your Ujian hasilination submission details</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                  <h3 className="text-sm font-medium text-purple-800">Research Title</h3>
                  <p className="text-purple-700">{examData.title}</p>
                </div>

                {examData.abstract && (
                  <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                    <h3 className="text-sm font-medium text-purple-800">Abstract</h3>
                    <p className="text-sm text-purple-700">{examData.abstract}</p>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                  <h3 className="text-sm font-medium text-purple-800">Submission Date</h3>
                  <p className="text-purple-700">{new Date(examData.submissionDate).toLocaleDateString()}</p>
                </div>

                {examData.scheduledDate && (
                  <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                    <h3 className="text-sm font-medium text-purple-800">Examination Date</h3>
                    <p className="text-purple-700">{new Date(examData.scheduledDate).toLocaleString()}</p>
                  </div>
                )}

                <div className="flex gap-3 flex-wrap">
                  <div className="flex-1 min-w-[120px] bg-purple-50 p-3 rounded-lg border border-purple-200 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-purple-600" />
                    <div>
                      <h3 className="text-sm font-medium text-purple-800">Research Paper</h3>
                      <p className="text-xs text-purple-700">paper.pdf</p>
                    </div>
                  </div>

                  <div className="flex-1 min-w-[120px] bg-purple-50 p-3 rounded-lg border border-purple-200 flex items-center gap-2">
                    <Presentation className="h-5 w-5 text-purple-600" />
                    <div>
                      <h3 className="text-sm font-medium text-purple-800">Presentation</h3>
                      <p className="text-xs text-purple-700">results.pptx</p>
                    </div>
                  </div>

                  <div className="flex-1 min-w-[120px] bg-purple-50 p-3 rounded-lg border border-purple-200 flex items-center gap-2">
                    <Database className="h-5 w-5 text-purple-600" />
                    <div>
                      <h3 className="text-sm font-medium text-purple-800">Data Files</h3>
                      <p className="text-xs text-purple-700">data.zip</p>
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

