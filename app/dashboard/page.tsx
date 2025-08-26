"use client"

import { redirect } from "next/navigation"
import { useAuth } from "@/context/auth-context"

export default function DashboardPage() {
  const { user } = useAuth()
  
  // Redirect to user's role-specific dashboard
  if (user) {
    redirect(`/dashboard/${user.role}`)
  }
  
  // If no user, redirect to login
  redirect("/login")
}

