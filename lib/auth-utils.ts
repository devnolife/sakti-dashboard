import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

// JWT Secret
const JWT_SECRET: string = (process.env.NEXTAUTH_SECRET && process.env.NEXTAUTH_SECRET.trim().length > 0)
  ? process.env.NEXTAUTH_SECRET
  : 'your-secret-key'

if (!process.env.NEXTAUTH_SECRET) {
  console.warn('[auth-utils] NEXTAUTH_SECRET tidak ditemukan di environment, menggunakan fallback development secret.')
}

/**
 * Mengekstrak pesan error yang user-friendly untuk autentikasi
 * Menghilangkan detail teknis dan menampilkan pesan sederhana
 */
export function getAuthErrorMessage(error: any): string {
  // Jika error adalah string langsung
  if (typeof error === 'string') {
    const errorLower = error.toLowerCase()
    // Cek jika error terkait autentikasi
    if (errorLower.includes('user tidak ada') ||
        errorLower.includes('tidak aktif') ||
        errorLower.includes('password') ||
        errorLower.includes('username') ||
        errorLower.includes('invalid') ||
        errorLower.includes('unauthorized') ||
        errorLower.includes('authentication') ||
        errorLower.includes('credentials')) {
      return 'Username atau password salah'
    }
    return error
  }

  // Cek jika ada response.errors (format GraphQL standard)
  if (error?.response?.errors && Array.isArray(error.response.errors)) {
    const firstError = error.response.errors[0]
    if (firstError?.message) {
      const errorMessage = firstError.message.toLowerCase()
      if (errorMessage.includes('user tidak ada') ||
          errorMessage.includes('tidak aktif') ||
          errorMessage.includes('password') ||
          errorMessage.includes('username') ||
          errorMessage.includes('invalid') ||
          errorMessage.includes('unauthorized')) {
        return 'Username atau password salah'
      }
      return firstError.message
    }
  }

  // Cek error.message langsung
  if (error?.message) {
    const errorMessage = error.message.toLowerCase()
    if (errorMessage.includes('user tidak ada') ||
        errorMessage.includes('tidak aktif') ||
        errorMessage.includes('password') ||
        errorMessage.includes('username') ||
        errorMessage.includes('invalid') ||
        errorMessage.includes('unauthorized')) {
      return 'Username atau password salah'
    }
    return error.message
  }

  // Default error message
  return 'Username atau password salah'
}

/**
 * Get user ID from GraphQL token stored in localStorage
 * This is used by server actions to identify the current user
 */
export async function getServerActionUserId(): Promise<string> {
  try {
    // Try to get from GraphQL token (stored after login)
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user')
      if (user) {
        const parsed = JSON.parse(user)
        return parsed.id || parsed.username
      }
    }

    // Server-side: try to get from cookies
    const cookieStore = await cookies()
    const token = cookieStore.get('graphql-token') || cookieStore.get('session-token')

    if (token) {
      try {
        const decoded = jwt.verify(token.value, JWT_SECRET) as any
        return decoded.userId || decoded.sub || decoded.username
      } catch (e) {
        console.error('Token verification failed:', e)
      }
    }

    // Fallback for development
    console.warn('⚠️ No user ID found, using fallback')
    return 'unknown-user'

  } catch (error) {
    console.error('Error getting user ID:', error)
    return 'unknown-user'
  }
}

/**
 * Get current user from token in request header
 */
export async function getCurrentUserFromToken(request?: NextRequest): Promise<string | null> {
  try {
    if (!request) {
      return null
    }

    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')

    if (!token) {
      return null
    }

    // Verify JWT token
    const decoded = jwt.verify(token, JWT_SECRET) as any
    return decoded.userId || decoded.sub || decoded.username

  } catch (error) {
    console.error('Error getting user from token:', error)
    return null
  }
}

/**
 * Legacy hardcoded user ID for testing
 * @deprecated Use getServerActionUserId() instead
 */
export function getHardcodedUserId(): string {
  return 'cmg4j3mf200019ypx53e5ujp1' // MAHASISWA001 ID
}
