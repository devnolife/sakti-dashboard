import { AlertCircle } from "lucide-react"

interface FormFieldErrorProps {
  message?: string
}

export function FormFieldError({ message }: FormFieldErrorProps) {
  if (!message) return null

  return (
    <div className="flex items-center mt-1 text-sm text-red-500">
      <AlertCircle className="h-4 w-4 mr-1" />
      <span>{message}</span>
    </div>
  )
}

