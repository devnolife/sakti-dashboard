// Get full schema for LoginResponse type
const endpoint = 'https://superapps.if.unismuh.ac.id/graphql'

async function introspectLoginResponse() {
  try {
    const introspectionQuery = {
      query: `
        {
          __type(name: "LoginResponse") {
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
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(introspectionQuery)
    })

    const json = await response.json()

    if (json.data?.__type) {
      console.log('LoginResponse fields:')
      console.log(JSON.stringify(json.data.__type.fields, null, 2))
    } else {
      console.log('Response:', JSON.stringify(json, null, 2))
    }

  } catch (error) {
    console.error('Error:', error.message)
  }
}

introspectLoginResponse()
