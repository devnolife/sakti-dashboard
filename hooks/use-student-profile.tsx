import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

interface StudentProfile {
  id: string
  nim: string
  prodi_id: string | null
  semester: number
  academic_year: string
  phone: string | null
  address: string | null
  guardian: any
  gpa: number | null
  last_sync_at: Date | null
  users: {
    id: string
    username: string
    name: string
    avatar: string | null
    role: string
  }
  lecturers: {
    id: string
    nip: string
    email: string | null
    users: {
      name: string
    }
  } | null
  prodi: {
    kode: string
    nama: string
    jenjang: string
    fakultas: string
    akreditasi: string | null
  } | null
}

interface UseStudentProfileOptions {
  autoSync?: boolean // Automatically sync on mount
  syncInterval?: number // Auto-sync interval in milliseconds (0 = disabled)
}

export function useStudentProfile(options: UseStudentProfileOptions = {}) {
  const { autoSync = false, syncInterval = 0 } = options
  const { data: session } = useSession()
  const [profile, setProfile] = useState<StudentProfile | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null)

  /**
   * Fetch student profile without forcing sync
   */
  const fetchProfile = async () => {
    if (!session?.user || session.user.role !== 'mahasiswa') {
      setError('Not a student user')
      return null
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/student/sync')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch profile')
      }

      setProfile(data.data)
      return data.data
    } catch (err: any) {
      setError(err.message)
      return null
    } finally {
      setLoading(false)
    }
  }

  /**
   * Force sync student data from GraphQL
   */
  const syncProfile = async () => {
    if (!session?.user || session.user.role !== 'mahasiswa') {
      setError('Not a student user')
      return null
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/student/sync?sync=true')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to sync profile')
      }

      setProfile(data.data.student)
      setLastSyncTime(new Date())
      return data.data
    } catch (err: any) {
      setError(err.message)
      return null
    } finally {
      setLoading(false)
    }
  }

  /**
   * Force sync via POST (for admin or manual sync)
   */
  const forceSyncByNim = async (nim?: string) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/student/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nim })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to sync profile')
      }

      setProfile(data.data.student)
      setLastSyncTime(new Date())
      return data.data
    } catch (err: any) {
      setError(err.message)
      return null
    } finally {
      setLoading(false)
    }
  }

  // Auto-fetch on mount if autoSync is enabled
  useEffect(() => {
    if (autoSync && session?.user?.role === 'mahasiswa') {
      syncProfile()
    }
  }, [autoSync, session?.user?.role])

  // Set up auto-sync interval if enabled
  useEffect(() => {
    if (syncInterval > 0 && session?.user?.role === 'mahasiswa') {
      const interval = setInterval(() => {
        syncProfile()
      }, syncInterval)

      return () => clearInterval(interval)
    }
  }, [syncInterval, session?.user?.role])

  return {
    profile,
    loading,
    error,
    lastSyncTime,
    fetchProfile,
    syncProfile,
    forceSyncByNim
  }
}
