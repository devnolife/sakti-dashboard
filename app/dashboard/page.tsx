"use client"

import { redirect } from "next/navigation"

export default function DashboardPage() {
  // Redirect to the mahasiswa dashboard by default
  redirect("/dashboard/mahasiswa")
}

