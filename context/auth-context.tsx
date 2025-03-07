"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"
import type { Role } from "@/types/role"

interface User {
  id: string
  username: string
  name: string
  role: Role
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (username: string, password: string, role: Role) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users for different roles
const createMockUser = (username: string, role: Role): User => ({
  id: Math.random().toString(36).substring(2, 9),
  username,
  name: username.charAt(0).toUpperCase() + username.slice(1),
  role,
  avatar: "/placeholder.svg?height=40&width=40",
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const router = useRouter()
  const pathname = usePathname()

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = typeof window !== "undefined" ? localStorage.getItem("user") : null
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  // Redirect based on authentication status
  useEffect(() => {
    if (!isLoading) {
      // If user is not authenticated and trying to access protected routes
      if (!user && pathname.startsWith("/dashboard")) {
        router.push("/login")
      }

      // If user is authenticated but on auth pages
      if (user && (pathname === "/login" || pathname === "/")) {
        router.push(`/dashboard/${user.role}`)
      }

      // If user is authenticated but trying to access another role's dashboard
      if (user && pathname.startsWith("/dashboard/") && !pathname.startsWith(`/dashboard/${user.role}`)) {
        router.push(`/dashboard/${user.role}`)
      }
    }
  }, [user, isLoading, pathname, router])

  const login = async (username: string, password: string, role: Role) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Create a mock user for the selected role
    const mockUser = createMockUser(username, role)

    // Store user in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(mockUser))
    }
    setUser(mockUser)
    setIsLoading(false)

    // Redirect to dashboard
    router.push(`/dashboard/${role}`)
  }

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user")
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

