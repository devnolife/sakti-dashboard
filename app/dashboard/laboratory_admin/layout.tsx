import type React from "react"

export default function LaboratoryAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex-1 pt-14">
      <div className="container p-4 mx-auto md:p-6">{children}</div>
    </div>
  )
}

