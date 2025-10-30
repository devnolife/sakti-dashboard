/**
 * Introspect UserProfile type
 */

import { GraphQLClient } from 'graphql-request'

const endpoint = 'https://superapps.if.unismuh.ac.id/graphql'
const client = new GraphQLClient(endpoint)

console.log('🔍 Introspecting UserProfile Type...\n')

const INTROSPECT_USER_PROFILE = `
  query {
    __type(name: "UserProfile") {
      name
      kind
      fields {
        name
        type {
          name
          kind
          ofType {
            name
            kind
          }
        }
      }
    }
  }
`

try {
  const result = await client.request(INTROSPECT_USER_PROFILE)

  if (result.__type) {
    console.log('✅ UserProfile Type found!\n')
    console.log('=' * 70)
    console.log('📦 UserProfile Fields:')
    console.log('=' * 70)

    result.__type.fields.forEach(field => {
      const typeName = field.type.name || field.type.ofType?.name || field.type.kind
      const nullable = field.type.kind !== 'NON_NULL' ? ' (nullable)' : ''
      console.log(`   ${field.name}: ${typeName}${nullable}`)
    })

    console.log('\n' + '=' * 70)
    console.log('✅ Correct PROFILE Query:')
    console.log('=' * 70)
    console.log(`
query {
  profile {
    ${result.__type.fields.map(f => f.name).join('\n    ')}
  }
}
    `)
  } else {
    console.log('❌ UserProfile type not found!')
  }

} catch (error) {
  console.error('❌ Error:', error.message)
}
