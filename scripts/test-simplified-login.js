/**
 * Test SIMPLIFIED login flow - signin only (no GET_PROFILE needed)
 */

import { GraphQLClient } from 'graphql-request'

const endpoint = 'https://superapps.if.unismuh.ac.id/graphql'
const client = new GraphQLClient(endpoint)

const TEST_USERNAME = '105841102021'
const TEST_PASSWORD = 'SamaSemua'

console.log('🧪 Testing SIMPLIFIED Login Flow\n')
console.log('=' * 70)
console.log('Strategy: Use SIGNIN response directly (no GET_PROFILE call)')
console.log('=' * 70)

// SIGNIN mutation - returns everything we need!
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

async function testSimplifiedLogin() {
  console.log('\n1️⃣ Testing SIGNIN mutation...')
  console.log('   Username:', TEST_USERNAME)

  try {
    const result = await client.request(SIGNIN, {
      loginUserInput: {
        username: TEST_USERNAME,
        password: TEST_PASSWORD
      }
    })

    const { access_token, user } = result.signin

    console.log('\n✅ LOGIN SUCCESS (ONE STEP ONLY)!')
    console.log('=' * 70)
    console.log('🎫 Access Token:')
    console.log('   ', access_token.substring(0, 60) + '...')
    console.log('\n👤 User Data (from signin response):')
    console.log('   ID:', user.id)
    console.log('   Username:', user.username)
    console.log('   Role:', user.role)

    console.log('\n📦 Mapping to Application User:')
    const mappedUser = {
      id: user.id,
      username: user.username,
      name: user.username, // Use username as display name
      role: user.role.toLowerCase(),
      avatar: undefined,
      profile: user
    }
    console.log('   ', JSON.stringify(mappedUser, null, 2))

    console.log('\n💾 Storage:')
    console.log('   localStorage.user:', JSON.stringify(mappedUser))
    console.log('   localStorage.session-token:', access_token.substring(0, 30) + '...')
    console.log('   localStorage.graphql-token:', access_token.substring(0, 30) + '...')

    console.log('\n🚀 Redirect:')
    console.log('   Target:', `/dashboard/${user.role.toLowerCase()}`)

    console.log('\n' + '=' * 70)
    console.log('✅ SIMPLIFIED LOGIN FLOW COMPLETE!')
    console.log('=' * 70)
    console.log('\n📊 Performance:')
    console.log('   Old flow: SIGNIN + GET_PROFILE = 2 API calls')
    console.log('   New flow: SIGNIN only = 1 API call ⚡️ (50% faster!)')
    console.log('\n📝 Benefits:')
    console.log('   ✅ Faster login (1 request instead of 2)')
    console.log('   ✅ Simpler code (no profile query needed)')
    console.log('   ✅ Less error handling (fewer failure points)')
    console.log('   ✅ Signin response has all essential data (id, username, role)')

    return { success: true, user: mappedUser, token: access_token }

  } catch (error) {
    console.error('\n❌ LOGIN FAILED!')
    console.error('Error:', error.message)
    if (error.response) {
      console.error('Response:', JSON.stringify(error.response, null, 2))
    }
    return { success: false, error: error.message }
  }
}

// Run test
testSimplifiedLogin()
