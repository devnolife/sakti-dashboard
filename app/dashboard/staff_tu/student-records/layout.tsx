import type React from "react"
export default function KkpLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="container py-6 mx-auto">{children}</div>
}

