import { GraphQLClient } from 'graphql-request'

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'https://superapps.if.unismuh.ac.id/graphql'

// Create GraphQL client
export const graphqlClient = new GraphQLClient(GRAPHQL_ENDPOINT, {
  headers: {
    'Content-Type': 'application/json',
  },
})

// Create authenticated client with token
export function createAuthenticatedClient(token: string) {
  return new GraphQLClient(GRAPHQL_ENDPOINT, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
}

/**
 * Mengekstrak pesan error yang user-friendly dari GraphQL error
 * Menghilangkan detail teknis seperti lokasi error, stack trace, dll
 */
function extractUserFriendlyError(error: any): string {
  // Jika error adalah string langsung, kembalikan
  if (typeof error === 'string') {
    return error
  }

  // Cek jika ada response.errors (format GraphQL standard)
  if (error?.response?.errors && Array.isArray(error.response.errors)) {
    const firstError = error.response.errors[0]
    if (firstError?.message) {
      return firstError.message
    }
  }

  // Cek error.message langsung
  if (error?.message) {
    return error.message
  }

  // Default error message
  return 'Terjadi kesalahan. Silakan coba lagi.'
}

// Error handling wrapper
export async function executeGraphQLQuery<T>(
  query: string,
  variables?: Record<string, any>,
  client: GraphQLClient = graphqlClient
): Promise<{ data: T | null; error: string | null }> {
  try {
    const data = await client.request<T>(query, variables)
    return { data, error: null }
  } catch (error: any) {
    console.error('GraphQL Error:', error)
    const userFriendlyError = extractUserFriendlyError(error)
    return {
      data: null,
      error: userFriendlyError,
    }
  }
}
