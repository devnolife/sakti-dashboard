import { ReactNode } from "react"

interface SimakLayoutProps {
  children: ReactNode
}

export default function SimakLayout({ children }: SimakLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {children}
    </div>
  )
}
