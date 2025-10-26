"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"
import type { Role } from "@/types/role"

interface User {
  id: string
  username: string
  name: string
  role: Role
  subRole?: string
  avatar?: string
  profile?: any
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (username: string, password: string, selectedRole?: Role) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const router = useRouter()
  const pathname = usePathname()

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      const token = typeof window !== "undefined" ? localStorage.getItem("session-token") : null

      if (token) {
        try {
          const response = await fetch("/api/auth/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })

          if (response.ok) {
            const userData = await response.json()
            // Map sub_role from API to subRole for frontend
            const mappedUser = {
              ...userData.user,
              subRole: userData.user.sub_role || userData.user.subRole
            }
            setUser(mappedUser)

            // For dosen role, set initial subrole from database if not already set
            if (mappedUser.role === 'dosen' && mappedUser.subRole) {
              const currentSubRole = localStorage.getItem("current-subrole")
              if (!currentSubRole) {
                localStorage.setItem("current-subrole", mappedUser.subRole)
              }
            }
          } else {
            localStorage.removeItem("session-token")
            localStorage.removeItem("user")
          }
        } catch (error) {
          console.error("Session check failed:", error)
          localStorage.removeItem("session-token")
          localStorage.removeItem("user")
        }
      }

      setIsLoading(false)
    }

    checkSession()
  }, [])

  // Redirect based on authentication status
  useEffect(() => {
    if (!isLoading) {
      // If user is not authenticated and trying to access protected routes
      if (!user && pathname.startsWith("/dashboard")) {
        router.push("/login")
        return
      }

      // If user is authenticated but on auth pages
      if (user && (pathname === "/login" || pathname === "/")) {
        // For dosen with leadership sub-roles, redirect to their sub-role dashboard
        if (user.role === 'dosen' && user.subRole) {
          const primarySubRole = user.subRole.split(',')[0].trim()

          // Leadership roles get redirected to their specific dashboards
          switch (primarySubRole) {
            case 'dekan':
              router.push('/dashboard/dekan')
              return
            case 'wakil_dekan_1':
              router.push('/dashboard/dosen/vice-dean-1')
              return
            case 'wakil_dekan_2':
              router.push('/dashboard/dosen/vice-dean-2')
              return
            case 'wakil_dekan_3':
              router.push('/dashboard/dosen/vice-dean-3')
              return
            case 'wakil_dekan_4':
              router.push('/dashboard/dosen/vice-dean-4')
              return
            case 'gkm':
              router.push('/dashboard/gkm')
              return
            case 'prodi':
              router.push('/dashboard/prodi')
              return
            case 'sekretaris_prodi':
              router.push('/dashboard/dosen') // Sekretaris prodi bisa akses dashboard dosen
              return
            default:
              // Regular dosen
              router.push('/dashboard/dosen')
              return
          }
        }

        // For other roles, redirect to main role dashboard
        router.push(`/dashboard/${user.role}`)
        return
      }

      // Only redirect if user is trying to access unauthorized role dashboard  
      // Don't redirect if user is already on an allowed path
      if (user && pathname.startsWith("/dashboard/")) {
        const allowedPaths: string[] = []

        // For dosen users, add their subrole paths
        if (user.role === 'dosen' && user.subRole) {
          const userSubRoles = user.subRole.split(',').map(role => role.trim())

          userSubRoles.forEach(subRole => {
            switch (subRole) {
              case 'dekan':
                allowedPaths.push('/dashboard/dekan')
                break
              case 'wakil_dekan_1':
                allowedPaths.push('/dashboard/dosen/vice-dean-1')
                break
              case 'wakil_dekan_2':
                allowedPaths.push('/dashboard/dosen/vice-dean-2')
                break
              case 'wakil_dekan_3':
                allowedPaths.push('/dashboard/dosen/vice-dean-3')
                break
              case 'wakil_dekan_4':
                allowedPaths.push('/dashboard/dosen/vice-dean-4')
                break
              case 'gkm':
                allowedPaths.push('/dashboard/gkm')
                break
              case 'prodi':
                allowedPaths.push('/dashboard/prodi')
                break
              case 'sekretaris_prodi':
                allowedPaths.push('/dashboard/dosen')
                break
              case 'dosen':
                allowedPaths.push('/dashboard/dosen')
                break
            }
          })

          // If no allowed paths added (shouldn't happen), add dosen as default
          if (allowedPaths.length === 0) {
            allowedPaths.push('/dashboard/dosen')
          }
        } else {
          // For non-dosen users, just add their main role dashboard
          allowedPaths.push(`/dashboard/${user.role}`)
        }

        // Check if current path is allowed
        const isAllowedPath = allowedPaths.some(path => pathname.startsWith(path))

        // Only redirect if user is not on an allowed path
        if (!isAllowedPath) {
          // For dosen with leadership roles, redirect to their primary sub-role dashboard
          if (user.role === 'dosen' && user.subRole && allowedPaths.length > 0) {
            router.push(allowedPaths[0]) // Redirect to first allowed path (primary sub-role)
          } else {
            router.push(`/dashboard/${user.role}`)
          }
        }
      }
    }
  }, [user, isLoading, pathname, router])

  const login = async (username: string, password: string, selectedRole?: Role) => {
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, selectedRole }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Login failed")
      }

      const data = await response.json()

      // Map sub_role from API to subRole for frontend
      const mappedUser = {
        ...data.user,
        subRole: data.user.sub_role || data.user.subRole
      }

      // Store user and token in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(mappedUser))
        localStorage.setItem("session-token", data.token)

        // For dosen role, set initial subrole from database
        if (mappedUser.role === 'dosen' && mappedUser.subRole) {
          localStorage.setItem("current-subrole", mappedUser.subRole)
        }
      }

      setUser(mappedUser)
      setIsLoading(false)

      // Don't redirect here - let the useEffect handle redirect based on role and sub-role
      // This ensures proper redirect logic for dosen with leadership sub-roles
    } catch (error) {
      setIsLoading(false)
      throw error
    }
  }

  const logout = async () => {
    try {
      // Call logout API if needed for cleanup
      const token = typeof window !== "undefined" ? localStorage.getItem("session-token") : null
      if (token) {
        await fetch("/api/auth/logout", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      }
    } catch (error) {
      console.error("Logout API call failed:", error)
    }

    // Clear local storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("user")
      localStorage.removeItem("session-token")
      localStorage.removeItem("current-subrole")
    }

    setUser(null)
    router.push("/login")
  }

  const value = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

