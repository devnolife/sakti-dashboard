// Node.js 18+ has native fetch
const endpoint = 'https://superapps.if.unismuh.ac.id/graphql'

async function testLogin() {
  try {
    console.log('=== Testing LOGIN mutation ===\n')

    const loginMutation = {
      query: `
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
      `,
      variables: {
        username: '105841102021',
        password: 'SamaSemua'
      }
    }

    console.log('Sending request with variables:', loginMutation.variables)

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginMutation)
    })

    console.log('\nStatus:', response.status, response.statusText)

    const json = await response.json()
    console.log('\nResponse:')
    console.log(JSON.stringify(json, null, 2))

    if (json.errors) {
      console.log('\n❌ GraphQL Errors:')
      json.errors.forEach(err => {
        console.log('  -', err.message)
        if (err.extensions) {
          console.log('   ', JSON.stringify(err.extensions, null, 2))
        }
      })
    }

    if (json.data?.login) {
      console.log('\n✅ Login successful!')
      console.log('Token:', json.data.login.token)
      console.log('User:', json.data.login.user)
    }

  } catch (error) {
    console.error('Error:', error.message)
  }
}

testLogin()
