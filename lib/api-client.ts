/**
 * API Client Utility
 * Handles authenticated API requests with automatic token management
 */

interface FetchOptions extends RequestInit {
  requireAuth?: boolean
}

/**
 * Authenticated fetch wrapper
 * Automatically adds Authorization header from localStorage
 */
export async function apiFetch<T = any>(
  url: string,
  options: FetchOptions = {}
): Promise<{ data: T | null; error: string | null; status: number }> {
  try {
    const { requireAuth = true, ...fetchOptions } = options

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    }

    // Add auth token if required
    if (requireAuth && typeof window !== 'undefined') {
      const token = localStorage.getItem('session-token')
      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }
    }

    const response = await fetch(url, {
      ...fetchOptions,
      headers,
    })

    // Handle non-JSON responses
    const contentType = response.headers.get('content-type')
    if (!contentType?.includes('application/json')) {
      return {
        data: null,
        error: `Invalid response type: ${contentType}`,
        status: response.status,
      }
    }

    const result = await response.json()

    if (!response.ok) {
      return {
        data: null,
        error: result.error || result.message || `HTTP ${response.status}`,
        status: response.status,
      }
    }

    return {
      data: result,
      error: null,
      status: response.status,
    }
  } catch (error) {
    console.error('API Fetch Error:', error)
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Network error',
      status: 0,
    }
  }
}

/**
 * GET request helper
 */
export async function apiGet<T = any>(url: string, options?: FetchOptions) {
  return apiFetch<T>(url, { ...options, method: 'GET' })
}

/**
 * POST request helper
 */
export async function apiPost<T = any>(url: string, data?: any, options?: FetchOptions) {
  return apiFetch<T>(url, {
    ...options,
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined,
  })
}

/**
 * PUT request helper
 */
export async function apiPut<T = any>(url: string, data?: any, options?: FetchOptions) {
  return apiFetch<T>(url, {
    ...options,
    method: 'PUT',
    body: data ? JSON.stringify(data) : undefined,
  })
}

/**
 * DELETE request helper
 */
export async function apiDelete<T = any>(url: string, options?: FetchOptions) {
  return apiFetch<T>(url, { ...options, method: 'DELETE' })
}
