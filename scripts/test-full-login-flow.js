// Full login flow test
const endpoint = 'https://superapps.if.unismuh.ac.id/graphql'

async function fullLoginFlow() {
  try {
    console.log('=== FULL LOGIN FLOW TEST ===\n')

    // Step 1: Login
    console.log('Step 1: LOGIN')
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

    const loginResponse = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginMutation)
    })

    const loginJson = await loginResponse.json()

    if (loginJson.errors) {
      console.log('❌ Login failed:', loginJson.errors)
      return
    }

    const { access_token } = loginJson.data.login
    console.log('✅ Login successful!')
    console.log('Token:', access_token.substring(0, 50) + '...\n')

    // Step 2: Get Profile
    console.log('Step 2: GET PROFILE')
    const profileQuery = {
      query: `
        query {
          profile {
            username
            fullname
            department
            role
          }
        }
      `
    }

    const profileResponse = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
      },
      body: JSON.stringify(profileQuery)
    })

    const profileJson = await profileResponse.json()

    if (profileJson.errors) {
      console.log('❌ Profile failed:', profileJson.errors)
      return
    }

    console.log('✅ Profile retrieved successfully!')
    console.log('User Data:')
    console.log(JSON.stringify(profileJson.data.profile, null, 2))

    console.log('\n=== ✅ FULL LOGIN FLOW SUCCESSFUL! ===')

  } catch (error) {
    console.error('Error:', error.message)
  }
}

fullLoginFlow()
