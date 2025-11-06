"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

// Redirect ke halaman KKP guidance yang sudah digabung
export default function KkpPlusGuidancePage() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/dashboard/dosen/kkp-guidance")
  }, [router])

  return null
}

