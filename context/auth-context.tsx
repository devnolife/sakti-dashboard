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
            setUser(userData.user)
            
            // For dosen role, set initial subrole from database if not already set
            if (userData.user.role === 'dosen' && userData.user.subRole) {
              const currentSubRole = localStorage.getItem("current-subrole")
              if (!currentSubRole) {
                localStorage.setItem("current-subrole", userData.user.subRole)
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
        // Always redirect to main role dashboard
        // Users can switch to subroles from there
        router.push(`/dashboard/${user.role}`)
        return
      }

      // Only redirect if user is trying to access unauthorized role dashboard  
      // Don't redirect if user is already on an allowed path
      if (user && pathname.startsWith("/dashboard/")) {
        const allowedPaths = [`/dashboard/${user.role}`]
        
        // For dosen users, allow access to subrole paths based on their database subrole
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
            }
          })
        }
        
        // Check if current path is allowed
        const isAllowedPath = allowedPaths.some(path => pathname.startsWith(path))
        
        // Only redirect if user is not on an allowed path
        // This prevents redirect loops when user is already on their correct dashboard
        if (!isAllowedPath) {
          router.push(`/dashboard/${user.role}`)
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
      
      // Verify if the selected role matches the user's actual role from database
      if (selectedRole && data.user.role !== selectedRole) {
        throw new Error(`Access denied. Your account role is ${data.user.role}, but you selected ${selectedRole}.`)
      }
      
      // Store user and token in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(data.user))
        localStorage.setItem("session-token", data.token)
        
        // For dosen role, set initial subrole from database
        if (data.user.role === 'dosen' && data.user.subRole) {
          localStorage.setItem("current-subrole", data.user.subRole)
        }
      }
      
      setUser(data.user)
      setIsLoading(false)

      // Always redirect to main role dashboard first
      // Users can switch to subroles using the switcher
      router.push(`/dashboard/${data.user.role}`)
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

