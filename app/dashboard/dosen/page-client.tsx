"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import ModernDashboard from "@/components/dosen/modern-dashboard-with-api"
import { Button } from "@/components/ui/button"

export default function DosenPageClient() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [dashboardData, setDashboardData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isLoading && user?.role !== 'dosen') {
      router.push('/login')
      return
    }

    if (!isLoading && user?.role === 'dosen') {
      const fetchData = async () => {
        try {
          setLoading(true)
          const token = localStorage.getItem('session-token')
          const response = await fetch('/api/dosen/dashboard', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })

          if (!response.ok) {
            throw new Error('Failed to fetch dashboard data')
          }

          const data = await response.json()
          setDashboardData(data)
        } catch (err) {
          console.error('Error fetching dosen data:', err)
          setError('Failed to load dashboard data')
        } finally {
          setLoading(false)
        }
      }

      fetchData()
    }
  }, [user, isLoading, router])

  if (isLoading || loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-red-500">{error}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Reload
          </Button>
        </div>
      </div>
    )
  }

  if (!dashboardData) {
    return null
  }

  return <ModernDashboard dashboardData={dashboardData} />
}
