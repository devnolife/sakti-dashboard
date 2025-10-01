import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Tools | Admin Umum",
  description: "System administration and monitoring tools",
}

export default function AdminToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
