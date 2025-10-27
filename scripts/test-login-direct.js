const { GraphQLClient } = require('graphql-request')

const endpoint = 'https://superapps.if.unismuh.ac.id/graphql'
const client = new GraphQLClient(endpoint)

// Test simple login mutation
const LOGIN_MUTATION = `
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        nim
        nama
        email
      }
    }
  }
`

async function testLogin() {
  try {
    console.log('Testing login mutation...')
    const variables = {
      username: '105841102021',
      password: 'SamaSemua'
    }

    console.log('Variables:', variables)

    const data = await client.request(LOGIN_MUTATION, variables)
    console.log('Success! Response:')
    console.log(JSON.stringify(data, null, 2))
  } catch (error) {
    console.error('Error details:')
    console.error('Status:', error.response?.status)
    console.error('Errors:', error.response?.errors)
    console.error('Full error:', JSON.stringify(error, null, 2))
  }
}

testLogin()
