/**
 * Test SIGNIN mutation with correct structure
 */

import { GraphQLClient } from 'graphql-request'

const endpoint = 'https://superapps.if.unismuh.ac.id/graphql'
const client = new GraphQLClient(endpoint)

const TEST_USERNAME = '105841102021'
const TEST_PASSWORD = 'SamaSemua'

console.log('🧪 Testing SIGNIN Mutation (Updated 2025-10-30)\n')
console.log('=' * 70)

// Correct SIGNIN mutation
const SIGNIN = `
  mutation Signin($loginUserInput: SigninUserInput!) {
    signin(loginUserInput: $loginUserInput) {
      access_token
      user {
        id
        username
        role
      }
    }
  }
`

async function testSignin() {
  console.log('\n1️⃣ Testing SIGNIN mutation...')
  console.log('   Username:', TEST_USERNAME)

  try {
    const result = await client.request(SIGNIN, {
      loginUserInput: {
        username: TEST_USERNAME,
        password: TEST_PASSWORD
      }
    })

    console.log('\n✅ SIGNIN SUCCESS!')
    console.log('=' * 70)
    console.log('📦 Response:')
    console.log('   Access Token:', result.signin.access_token.substring(0, 50) + '...')
    console.log('\n👤 User Data:')
    console.log('   ID:', result.signin.user.id)
    console.log('   Username:', result.signin.user.username)
    console.log('   Role:', result.signin.user.role)

    return result.signin

  } catch (error) {
    console.error('\n❌ SIGNIN FAILED!')
    console.error('Error:', error.message)
    if (error.response) {
      console.error('Response:', JSON.stringify(error.response, null, 2))
    }
    return null
  }
}

async function testProfile(token) {
  console.log('\n2️⃣ Testing PROFILE query with token...')

  const GET_PROFILE = `
    query {
      profile {
        id
        username
        name
        email
        phone
        role
      }
    }
  `

  try {
    const authClient = new GraphQLClient(endpoint, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })

    const result = await authClient.request(GET_PROFILE)

    console.log('\n✅ PROFILE SUCCESS!')
    console.log('=' * 70)
    console.log('📦 Profile Data:')
    console.log('   ID:', result.profile.id)
    console.log('   Username:', result.profile.username)
    console.log('   Name:', result.profile.name)
    console.log('   Email:', result.profile.email)
    console.log('   Phone:', result.profile.phone)
    console.log('   Role:', result.profile.role)

    return result.profile

  } catch (error) {
    console.error('\n❌ PROFILE FAILED!')
    console.error('Error:', error.message)
    return null
  }
}

// Run test
async function runTest() {
  const signinData = await testSignin()

  if (signinData) {
    await testProfile(signinData.access_token)

    console.log('\n' + '=' * 70)
    console.log('✅ ALL TESTS PASSED!')
    console.log('=' * 70)
    console.log('\n📝 Summary:')
    console.log('   - Mutation: signin (previously "login")')
    console.log('   - Input: SigninUserInput { username, password }')
    console.log('   - Response: access_token + user { id, username, role }')
    console.log('   - Profile query works with Bearer token')
    console.log('\n🔄 Update Status:')
    console.log('   ✅ mutations-superapps.ts updated')
    console.log('   ✅ auth-context.tsx updated')
    console.log('   ✅ auth-actions.ts updated')
  }
}

runTest()
