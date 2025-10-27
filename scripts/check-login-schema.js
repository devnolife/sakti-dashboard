const { GraphQLClient, gql } = require('graphql-request')

const endpoint = 'https://superapps.if.unismuh.ac.id/graphql'
const client = new GraphQLClient(endpoint)

// Get LoginResponse type schema
const introspectionQuery = gql`
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
          }
        }
      }
    }
  }
`

async function checkLoginResponse() {
  try {
    const data = await client.request(introspectionQuery)
    console.log('LoginResponse schema:')
    console.log(JSON.stringify(data, null, 2))
  } catch (error) {
    console.error('Error:', error)
  }
}

checkLoginResponse()
