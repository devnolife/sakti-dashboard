/**
 * Introspect LOGIN mutation specifically
 */

import { GraphQLClient } from 'graphql-request'

const endpoint = 'https://superapps.if.unismuh.ac.id/graphql'
const client = new GraphQLClient(endpoint)

console.log('🔍 Introspecting SIGNIN Mutation Detail (LOGIN renamed to SIGNIN)...\n')

const INTROSPECT_LOGIN = `
  query {
    __type(name: "Mutation") {
      fields {
        name
        args {
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
  const result = await client.request(INTROSPECT_LOGIN)

  // Find signin mutation (login was renamed to signin!)
  const loginMutation = result.__type.fields.find(f => f.name === 'signin')

  if (loginMutation) {
    console.log('✅ LOGIN Mutation found!\n')

    console.log('📥 Input Arguments:')
    loginMutation.args.forEach(arg => {
      const typeName = arg.type.name || arg.type.ofType?.name || 'Unknown'
      console.log(`   - ${arg.name}: ${typeName}`)
    })

    console.log('\n📤 Return Type:', loginMutation.type.name)

    if (loginMutation.type.fields) {
      console.log('\n🔑 Available Fields in Response:')
      loginMutation.type.fields.forEach(field => {
        console.log(`   - ${field.name}: ${field.type.name || field.type.kind}`)
      })
    }

    console.log('\n✅ Correct LOGIN mutation:')
    console.log(`
mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    ${loginMutation.type.fields?.map(f => f.name).join('\n    ')}
  }
}
    `)
  } else {
    console.log('❌ LOGIN mutation not found!')
    console.log('\nAvailable mutations:')
    result.__type.fields.forEach(field => {
      console.log(`   - ${field.name}`)
    })
  }

} catch (error) {
  console.error('❌ Error:', error.message)
}
