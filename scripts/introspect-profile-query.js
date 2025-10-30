/**
 * Introspect PROFILE query
 */

import { GraphQLClient } from 'graphql-request'

const endpoint = 'https://superapps.if.unismuh.ac.id/graphql'
const client = new GraphQLClient(endpoint)

console.log('🔍 Introspecting PROFILE Query...\n')

const INTROSPECT_PROFILE = `
  query {
    __type(name: "Query") {
      fields {
        name
        type {
          name
          kind
          fields {
            name
            type {
              name
              kind
            }
          }
        }
      }
    }
  }
`

try {
  const result = await client.request(INTROSPECT_PROFILE)

  // Find profile query
  const profileQuery = result.__type.fields.find(f => f.name === 'profile')

  if (profileQuery) {
    console.log('✅ PROFILE Query found!\n')
    console.log('📤 Return Type:', profileQuery.type.name)

    if (profileQuery.type.fields) {
      console.log('\n🔑 Available Fields in UserProfile:')
      profileQuery.type.fields.forEach(field => {
        const typeName = field.type.name || field.type.kind
        console.log(`   - ${field.name}: ${typeName}`)
      })

      console.log('\n✅ Correct PROFILE query:')
      console.log(`
query {
  profile {
    ${profileQuery.type.fields.map(f => f.name).join('\n    ')}
  }
}
      `)
    }
  } else {
    console.log('❌ PROFILE query not found!')
  }

} catch (error) {
  console.error('❌ Error:', error.message)
}
