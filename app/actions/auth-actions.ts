/**
 * Authentication Actions menggunakan GraphQL
 */
'use server'

import { executeGraphQLQuery } from '@/lib/graphql/client'
import { LOGIN } from '@/lib/graphql/mutations-superapps'
import { cookies } from 'next/headers'
import { SignJWT, jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || 'your-secret-key-change-this-in-production'
)

// Login Response Type - Updated untuk GraphQL schema yang benar
interface LoginResponse {
  login: {
    access_token: string
  }
}

// GraphQL Login dengan Superapps
export async function loginWithGraphQL(username: string, password: string) {
  try {
    console.log('🔐 Attempting GraphQL login for:', username)

    // Step 1: Login to get access_token
    const { data, error } = await executeGraphQLQuery<LoginResponse>(
      LOGIN,
      { username, password }
    )

    if (error || !data?.login) {
      console.error('❌ GraphQL login error:', error)
      throw new Error(error || 'Login gagal. Periksa username dan password Anda.')
    }

    const { access_token } = data.login
    console.log('✅ GraphQL login successful, token received')

    // TODO: Step 2 should query profile with token to get user data
    // For now, we just return the token
    // const profile = await getProfile(access_token)

    // Store access_token in cookie
    const cookieStore = await cookies()
    cookieStore.set('graphql-token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    })

    return {
      success: true,
      token: access_token,
    }
  } catch (error) {
    console.error('❌ Login error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Login gagal',
    }
  }
}

// Verify session
export async function verifySession() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session-token')

    if (!token) {
      return { isValid: false, user: null }
    }

    const { payload } = await jwtVerify(token.value, JWT_SECRET)

    return {
      isValid: true,
      user: payload.user as any,
    }
  } catch (error) {
    console.error('Session verification failed:', error)
    return { isValid: false, user: null }
  }
}

// Logout
export async function logoutAction() {
  try {
    const cookieStore = await cookies()
    cookieStore.delete('session-token')
    return { success: true }
  } catch (error) {
    console.error('Logout error:', error)
    return { success: false, error: 'Logout gagal' }
  }
}

// Get current user from session
export async function getCurrentUser() {
  const session = await verifySession()
  return session.user
}
