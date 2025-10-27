// Introspect UserProfile type
const endpoint = 'https://superapps.if.unismuh.ac.id/graphql'

async function introspectUserProfile() {
  const query = {
    query: `
      {
        __type(name: "UserProfile") {
          name
          fields {
            name
            type {
              name
              kind
              ofType { name kind }
            }
          }
        }
      }
    `
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(query)
  })

  const json = await response.json()
  console.log('UserProfile fields:')
  console.log(JSON.stringify(json.data.__type.fields, null, 2))
}

introspectUserProfile()
