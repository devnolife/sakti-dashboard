// Simple introspection script using fetch
const GRAPHQL_ENDPOINT = 'https://superapps.if.unismuh.ac.id/graphql'

const introspectionQuery = `
  query IntrospectionQuery {
    __schema {
      queryType {
        name
        fields {
          name
          description
          args {
            name
            description
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
              ofType {
                name
                kind
              }
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
            description
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
          description
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
  try {
    console.log('🔍 Introspecting GraphQL endpoint...')
    console.log('Endpoint:', GRAPHQL_ENDPOINT)
    console.log('---\n')

    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: introspectionQuery,
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()

    if (result.errors) {
      console.error('GraphQL Errors:', result.errors)
      return
    }

    const schema = result.data.__schema

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
            console.log(`    - ${arg.name}: ${typeName}${arg.description ? ` (${arg.description})` : ''}`)
          })
        }
        const returnType = field.type.ofType?.name || field.type.name
        console.log(`  Returns: ${returnType}`)
      })
    }

    console.log('\n\n' + '='.repeat(80))
    console.log(`Total Queries: ${schema.queryType?.fields?.length || 0}`)

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
            console.log(`    - ${arg.name}: ${typeName}${arg.description ? ` (${arg.description})` : ''}`)
          })
        }
        const returnType = field.type.ofType?.name || field.type.name
        console.log(`  Returns: ${returnType}`)
      })
      console.log('\n\n' + '='.repeat(80))
      console.log(`Total Mutations: ${schema.mutationType.fields.length}`)
    } else {
      console.log('\nNo mutations available')
    }

    // Custom Types (limit to main ones)
    console.log('\n\n📋 MAIN CUSTOM TYPES:')
    console.log('='.repeat(80))
    const customTypes = schema.types.filter(
      (type: any) =>
        !type.name.startsWith('__') &&
        type.kind === 'OBJECT' &&
        type.name !== 'Query' &&
        type.name !== 'Mutation'
    )

    console.log(`\nFound ${customTypes.length} custom types\n`)
    customTypes.slice(0, 20).forEach((type: any) => {
      console.log(`\n▶ ${type.name}`)
      if (type.description) {
        console.log(`  ${type.description}`)
      }
      if (type.fields && type.fields.length > 0) {
        console.log(`  Fields (${type.fields.length}):`)
        type.fields.slice(0, 10).forEach((field: any) => {
          const fieldType = field.type.ofType?.name || field.type.name
          console.log(`    - ${field.name}: ${fieldType}`)
        })
        if (type.fields.length > 10) {
          console.log(`    ... and ${type.fields.length - 10} more fields`)
        }
      }
    })

    // Save to file
    const fs = await import('fs')
    const path = await import('path')
    const outputPath = path.join(process.cwd(), 'docs', 'GRAPHQL_SCHEMA.json')
    fs.writeFileSync(outputPath, JSON.stringify(result.data, null, 2))
    console.log(`\n\n✅ Full schema saved to: docs/GRAPHQL_SCHEMA.json`)

    // Create summary
    const summary = {
      endpoint: GRAPHQL_ENDPOINT,
      queriesCount: schema.queryType?.fields?.length || 0,
      mutationsCount: schema.mutationType?.fields?.length || 0,
      typesCount: customTypes.length,
      queries: schema.queryType?.fields?.map((f: any) => f.name) || [],
      mutations: schema.mutationType?.fields?.map((f: any) => f.name) || [],
      types: customTypes.map((t: any) => t.name),
    }

    const summaryPath = path.join(process.cwd(), 'docs', 'GRAPHQL_SUMMARY.json')
    fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2))
    console.log(`✅ Summary saved to: docs/GRAPHQL_SUMMARY.json`)

  } catch (error: any) {
    console.error('❌ Error introspecting GraphQL endpoint:')
    console.error(error.message)
    if (error.response) {
      console.error('Response:', error.response)
    }
  }
}

introspectGraphQL()
