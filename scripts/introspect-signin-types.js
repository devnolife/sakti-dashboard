/**
 * Introspect SigninUserInput and SigninResponse types
 */

import { GraphQLClient } from 'graphql-request'

const endpoint = 'https://superapps.if.unismuh.ac.id/graphql'
const client = new GraphQLClient(endpoint)

console.log('🔍 Introspecting SIGNIN Types...\n')

const INTROSPECT_SIGNIN_TYPES = `
  query {
    signinInput: __type(name: "SigninUserInput") {
      name
      kind
      inputFields {
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
    signinResponse: __type(name: "SigninResponse") {
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
  }
`

try {
  const result = await client.request(INTROSPECT_SIGNIN_TYPES)

  console.log('=' * 70)
  console.log('📥 SigninUserInput Fields:')
  console.log('=' * 70)

  if (result.signinInput?.inputFields) {
    result.signinInput.inputFields.forEach(field => {
      const typeName = field.type.name || field.type.ofType?.name || field.type.kind
      const required = field.type.kind === 'NON_NULL' ? ' (required)' : ' (optional)'
      console.log(`   ${field.name}: ${typeName}${required}`)
    })
  }

  console.log('\n' + '=' * 70)
  console.log('📤 SigninResponse Fields:')
  console.log('=' * 70)

  if (result.signinResponse?.fields) {
    result.signinResponse.fields.forEach(field => {
      const typeName = field.type.name || field.type.ofType?.name || field.type.kind
      console.log(`   ${field.name}: ${typeName}`)

      // If this field is an object, show its fields
      if (field.type.ofType?.fields) {
        console.log(`     ↳ Fields:`)
        field.type.ofType.fields.forEach(subfield => {
          console.log(`       - ${subfield.name}: ${subfield.type.name || subfield.type.kind}`)
        })
      }
    })
  }

  console.log('\n' + '=' * 70)
  console.log('✅ Correct SIGNIN Mutation:')
  console.log('=' * 70)
  console.log(`
mutation Signin($loginUserInput: SigninUserInput!) {
  signin(loginUserInput: $loginUserInput) {
    ${result.signinResponse?.fields?.map(f => {
    if (f.type.ofType?.fields) {
      return `${f.name} {\n      ${f.type.ofType.fields.map(sf => sf.name).join('\n      ')}\n    }`
    }
    return f.name
  }).join('\n    ')}
  }
}
  `)

  console.log('\n📝 Example Variables:')
  console.log(`{
  "loginUserInput": {
    "username": "105841102021",
    "password": "SamaSemua"
  }
}`)

} catch (error) {
  console.error('❌ Error:', error.message)
  if (error.response) {
    console.error('Response:', JSON.stringify(error.response, null, 2))
  }
}
