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
    return {
      data: null,
      error: error.message || 'GraphQL request failed',
    }
  }
}
