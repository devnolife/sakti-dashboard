import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Digital Signatures | Admin Umum",
  description: "Manage digital signatures for documents",
}

export default function SignaturesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
