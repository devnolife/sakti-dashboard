// Test corrected LOGIN mutation
const endpoint = 'https://superapps.if.unismuh.ac.id/graphql'

async function testLoginFixed() {
  try {
    console.log('=== Testing CORRECTED LOGIN mutation ===\n')

    const loginMutation = {
      query: `
        mutation Login($username: String!, $password: String!) {
          login(username: $username, password: $password) {
            access_token
          }
        }
      `,
      variables: {
        username: '105841102021',
        password: 'SamaSemua'
      }
    }

    console.log('Credentials:', loginMutation.variables)

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginMutation)
    })

    const json = await response.json()

    if (json.errors) {
      console.log('\n❌ Errors:', json.errors)
    } else if (json.data?.login) {
      console.log('\n✅ LOGIN SUCCESSFUL!')
      console.log('Access Token:', json.data.login.access_token)

      // Now test getting profile with token
      await testProfile(json.data.login.access_token)
    }

  } catch (error) {
    console.error('Error:', error.message)
  }
}

async function testProfile(token) {
  try {
    console.log('\n=== Testing PROFILE query with token ===\n')

    const profileQuery = {
      query: `
        query {
          profile {
            id
            nama
            username
            role
            nim
            nidn
            nip
            email
          }
        }
      `
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(profileQuery)
    })

    const json = await response.json()

    if (json.errors) {
      console.log('❌ Profile errors:', json.errors)
    } else if (json.data?.profile) {
      console.log('✅ PROFILE DATA:')
      console.log(JSON.stringify(json.data.profile, null, 2))
    }

  } catch (error) {
    console.error('Profile error:', error.message)
  }
}

testLoginFixed()
