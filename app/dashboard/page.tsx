"use client"

import { redirect } from "next/navigation"

export default function DashboardPage() {
  // Alihkan ke dashboard mahasiswa secara default
  redirect("/dashboard/mahasiswa")
}
