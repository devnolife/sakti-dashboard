import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  if (!dateString) return "-"

  const date = new Date(dateString)

  // Check if date is valid
  if (isNaN(date.getTime())) return "-"

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date)
}

export function formatDateTime(dateString: string): string {
  if (!dateString) return "-"

  const date = new Date(dateString)

  // Check if date is valid
  if (isNaN(date.getTime())) return "-"

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "submitted":
      return "bg-blue-100 text-blue-800"
    case "in-review":
      return "bg-yellow-100 text-yellow-800"
    case "approved":
      return "bg-green-100 text-green-800"
    case "completed":
      return "bg-purple-100 text-purple-800"
    case "rejected":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

