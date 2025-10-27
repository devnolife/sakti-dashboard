import { GraphQLClient, gql } from 'graphql-request'

const GRAPHQL_ENDPOINT = 'https://superapps.if.unismuh.ac.id/graphql'

const introspectionQuery = gql`
  query IntrospectionQuery {
    __schema {
      queryType {
        name
        fields {
          name
          description
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
            ofType {
              name
              kind
            }
          }
        }
      }
      mutationType {
        name
        fields {
          name
          description
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
            ofType {
              name
              kind
            }
          }
        }
      }
      types {
        name
        kind
        description
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
  }
`

async function introspectGraphQL() {
  const client = new GraphQLClient(GRAPHQL_ENDPOINT, {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  try {
    console.log('🔍 Introspecting GraphQL endpoint...')
    console.log('Endpoint:', GRAPHQL_ENDPOINT)
    console.log('---\n')

    const data: any = await client.request(introspectionQuery)
    const schema = data.__schema

    // Query Types
    console.log('📥 AVAILABLE QUERIES:')
    console.log('='.repeat(80))
    if (schema.queryType?.fields) {
      schema.queryType.fields.forEach((field: any) => {
        console.log(`\n✓ ${field.name}`)
        if (field.description) {
          console.log(`  Description: ${field.description}`)
        }
        if (field.args && field.args.length > 0) {
          console.log('  Arguments:')
          field.args.forEach((arg: any) => {
            const typeName = arg.type.ofType?.name || arg.type.name
            console.log(`    - ${arg.name}: ${typeName}`)
          })
        }
        const returnType = field.type.ofType?.name || field.type.name
        console.log(`  Returns: ${returnType}`)
      })
    }

    // Mutation Types
    console.log('\n\n📤 AVAILABLE MUTATIONS:')
    console.log('='.repeat(80))
    if (schema.mutationType?.fields) {
      schema.mutationType.fields.forEach((field: any) => {
        console.log(`\n✓ ${field.name}`)
        if (field.description) {
          console.log(`  Description: ${field.description}`)
        }
        if (field.args && field.args.length > 0) {
          console.log('  Arguments:')
          field.args.forEach((arg: any) => {
            const typeName = arg.type.ofType?.name || arg.type.name
            console.log(`    - ${arg.name}: ${typeName}`)
          })
        }
        const returnType = field.type.ofType?.name || field.type.name
        console.log(`  Returns: ${returnType}`)
      })
    } else {
      console.log('\nNo mutations available')
    }

    // Custom Types
    console.log('\n\n📋 CUSTOM TYPES:')
    console.log('='.repeat(80))
    const customTypes = schema.types.filter(
      (type: any) =>
        !type.name.startsWith('__') &&
        type.kind === 'OBJECT' &&
        type.name !== 'Query' &&
        type.name !== 'Mutation'
    )

    customTypes.forEach((type: any) => {
      console.log(`\n▶ ${type.name}`)
      if (type.description) {
        console.log(`  ${type.description}`)
      }
      if (type.fields && type.fields.length > 0) {
        console.log('  Fields:')
        type.fields.forEach((field: any) => {
          const fieldType = field.type.ofType?.name || field.type.name
          console.log(`    - ${field.name}: ${fieldType}`)
        })
      }
    })

    // Save to file
    const fs = require('fs')
    const path = require('path')
    const outputPath = path.join(__dirname, '../docs/GRAPHQL_SCHEMA.json')
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2))
    console.log(`\n\n✅ Full schema saved to: docs/GRAPHQL_SCHEMA.json`)

  } catch (error: any) {
    console.error('❌ Error introspecting GraphQL endpoint:')
    console.error(error.message)
    if (error.response) {
      console.error('Response:', error.response)
    }
  }
}

introspectGraphQL()
