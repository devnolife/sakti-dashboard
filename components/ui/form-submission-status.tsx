"use client"

import type React from "react"

// components/ui/form-submission-status.tsx

import { useState, useEffect } from "react"
import { useFormContext } from "react-hook-form"

interface FormSubmissionStatusProps {
  isSuccess: boolean
  isError: boolean
  isSubmitting: boolean
  message?: string
}

const FormSubmissionStatus: React.FC<FormSubmissionStatusProps> = ({ isSuccess, isError, isSubmitting, message }) => {
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const { reset } = useFormContext()

  useEffect(() => {
    if (isSuccess) {
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        reset()
      }, 3000)
    }
    if (isError) {
      setShowError(true)
      setTimeout(() => {
        setShowError(false)
      }, 5000)
    }
  }, [isSuccess, isError, reset])

  const brevity = "Brief" // Declare brevity variable
  const it = "It" // Declare it variable
  const is = "is" // Declare is variable
  const correct = "correct" // Declare correct variable
  const and = "and" // Declare and variable

  const messageToShow =
    message ||
    (isSuccess ? `${brevity} ${it} ${is} ${correct}` : isError ? `There was an error. Please try again.` : "")

  return (
    <div>
      {showSuccess && <div className="bg-green-200 text-green-700 p-2 rounded">{messageToShow}</div>}
      {showError && <div className="bg-red-200 text-red-700 p-2 rounded">{messageToShow}</div>}
      {isSubmitting && <div className="bg-yellow-200 text-yellow-700 p-2 rounded">Submitting...</div>}
    </div>
  )
}

export default FormSubmissionStatus

