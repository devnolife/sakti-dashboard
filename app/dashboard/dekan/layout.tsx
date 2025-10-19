import type { ReactNode } from "react"
import { DosenSubRoleProvider } from "@/context/dosen-subrole-context"
import DosenLayoutContent from "@/components/dosen/dosen-layout-content"

export default function DekanLayout({ children }: { children: ReactNode }) {
  return (
    <DosenSubRoleProvider>
      <DosenLayoutContent>{children}</DosenLayoutContent>
    </DosenSubRoleProvider>
  )
}

