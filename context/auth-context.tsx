"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"
import type { Role } from "@/types/role"
import { executeGraphQLQuery } from "@/lib/graphql/client"
import { SIGNIN } from "@/lib/graphql/mutations-superapps"

// GraphQL Response Types (UPDATED 2025-10-30)
// SIMPLIFIED: No need for GET_PROFILE - signin returns user data directly!
interface GraphQLSigninResponse {
  signin: {
    access_token: string
    user: {
      id: string
      username: string
      role: string
    }
  }
}

interface User {
  id: string
  username: string
  name: string
  email?: string
  phone?: string
  role: Role
  subRole?: string
  avatar?: string
  profile?: any
  department?: {
    kode: string
    nama: string
  }
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
      const storedUser = typeof window !== "undefined" ? localStorage.getItem("user") : null

      if (token && storedUser) {
        try {
          // For now, we'll trust the stored user data
          // In production, you might want to verify with a GraphQL query
          const userData = JSON.parse(storedUser)
          setUser(userData)

          console.log('✅ Session restored for:', userData.name)
        } catch (error) {
          console.error("Session restore failed:", error)
          localStorage.removeItem("session-token")
          localStorage.removeItem("user")
          localStorage.removeItem("graphql-token")
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
          const userSubRoles = user.subRole.split(',').map((role: string) => role.trim())

          userSubRoles.forEach((subRole: string) => {
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
      console.log('🔐 Logging in with GraphQL (SIGNIN mutation)...')

      // Step 1: Call GraphQL signin mutation to get access_token and user data
      const signinResult = await executeGraphQLQuery<GraphQLSigninResponse>(
        SIGNIN,
        {
          loginUserInput: {
            username,
            password
          }
        }
      )

      const { data: signinData, error: signinError } = signinResult

      if (signinError || !signinData || !signinData.signin) {
        // Tampilkan pesan error yang user-friendly
        // Jika error terkait autentikasi, tampilkan pesan sederhana
        const errorMessage = signinError || 'Login gagal'
        const isAuthError = errorMessage.toLowerCase().includes('user tidak ada') || 
                           errorMessage.toLowerCase().includes('tidak aktif') ||
                           errorMessage.toLowerCase().includes('password') ||
                           errorMessage.toLowerCase().includes('username') ||
                           errorMessage.toLowerCase().includes('invalid') ||
                           errorMessage.toLowerCase().includes('unauthorized')
        
        throw new Error(isAuthError ? 'Username atau password salah' : 'Login gagal. Silakan coba lagi.')
      }

      const { access_token, user: signinUser } = signinData.signin
      console.log('✅ GraphQL signin successful!')
      console.log('   User ID:', signinUser.id)
      console.log('   Username:', signinUser.username)
      console.log('   Role:', signinUser.role)

      // Determine role dari signin response
      let role: Role = (signinUser.role?.toLowerCase() as Role) || 'mahasiswa'

      // Map GraphQL signin response to our User format (SIMPLIFIED 2025-10-30)
      // No need to call GET_PROFILE - signin already returns user data!
      const mappedUser: User = {
        id: signinUser.id,
        username: signinUser.username,
        name: signinUser.username, // Use username as name initially
        role: role,
        avatar: undefined,
        profile: signinUser // Store signin user data
      }

      // Store user and token in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(mappedUser))
        localStorage.setItem("session-token", access_token) // GraphQL token
        localStorage.setItem("graphql-token", access_token) // Store separately for GraphQL requests
      }

      setUser(mappedUser)
      setIsLoading(false)

      // Don't redirect here - let the useEffect handle redirect based on role
    } catch (error) {
      setIsLoading(false)
      console.error('❌ Login error:', error)
      throw error
    }
  }

  const logout = async () => {
    // Clear local storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("user")
      localStorage.removeItem("session-token")
      localStorage.removeItem("graphql-token")
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

