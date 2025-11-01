/**
 * Script Test Manual GraphQL
 * 1. Login dengan mutation Signin
 * 2. Ambil access_token
 * 3. Gunakan token sebagai Bearer token untuk query Profile
 */

const GRAPHQL_ENDPOINT = 'https://superapps.if.unismuh.ac.id/graphql'

// Mutation untuk Signin
const SIGNIN_MUTATION = `
mutation Signin {
  signin(loginUserInput: { username: "105841102021", password: "SamaSemua" }) {
    access_token
    user {
      id
      username
      role
    }
  }
}
`

// Query untuk Profile (membutuhkan Bearer token)
const PROFILE_QUERY = `
query Profile {
  profile {
    id
    username
    name
    email
    phone
    role
    department {
      kode
      nama
    }
  }
}
`

async function testGraphQLManual() {
  console.log('\n========================================')
  console.log('🧪 TEST MANUAL GRAPHQL')
  console.log('========================================\n')

  // STEP 1: LOGIN (SIGNIN)
  console.log('📝 STEP 1: Login dengan Signin mutation...')
  console.log('Endpoint:', GRAPHQL_ENDPOINT)
  console.log('Username: 105841102021')
  console.log('Password: SamaSemua')
  console.log('')

  try {
    const signinResponse = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: SIGNIN_MUTATION,
      }),
    })

    if (!signinResponse.ok) {
      throw new Error(`HTTP Error: ${signinResponse.status} ${signinResponse.statusText}`)
    }

    const signinData = await signinResponse.json()

    if (signinData.errors) {
      console.error('❌ SIGNIN FAILED!')
      console.error('Errors:', JSON.stringify(signinData.errors, null, 2))
      return
    }

    console.log('✅ SIGNIN SUCCESS!')
    console.log('')
    console.log('📊 Response Data:')
    console.log(JSON.stringify(signinData.data.signin, null, 2))
    console.log('')

    const accessToken = signinData.data.signin.access_token
    const user = signinData.data.signin.user

    console.log('🔑 Access Token:', accessToken.substring(0, 50) + '...')
    console.log('👤 User ID:', user.id)
    console.log('👤 Username:', user.username)
    console.log('👤 Role:', user.role)
    console.log('')

    // STEP 2: GET PROFILE dengan Bearer Token
    console.log('========================================')
    console.log('📝 STEP 2: Get Profile dengan Bearer Token...')
    console.log('')

    const profileResponse = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        query: PROFILE_QUERY,
      }),
    })

    if (!profileResponse.ok) {
      throw new Error(`HTTP Error: ${profileResponse.status} ${profileResponse.statusText}`)
    }

    const profileData = await profileResponse.json()

    if (profileData.errors) {
      console.error('❌ PROFILE QUERY FAILED!')
      console.error('Errors:', JSON.stringify(profileData.errors, null, 2))
      return
    }

    console.log('✅ PROFILE QUERY SUCCESS!')
    console.log('')
    console.log('📊 Profile Data:')
    console.log(JSON.stringify(profileData.data.profile, null, 2))
    console.log('')

    // Summary
    console.log('========================================')
    console.log('📋 SUMMARY')
    console.log('========================================')
    console.log('✅ Login berhasil')
    console.log('✅ Token diterima')
    console.log('✅ Profile berhasil diambil dengan Bearer token')
    console.log('')
    console.log('Profile Details:')
    console.log('  - ID:', profileData.data.profile.id)
    console.log('  - Username:', profileData.data.profile.username)
    console.log('  - Name:', profileData.data.profile.name)
    console.log('  - Email:', profileData.data.profile.email)
    console.log('  - Phone:', profileData.data.profile.phone)
    console.log('  - Role:', profileData.data.profile.role)
    if (profileData.data.profile.department) {
      console.log('  - Department:', profileData.data.profile.department.nama)
      console.log('  - Dept Code:', profileData.data.profile.department.kode)
    }
    console.log('')

  } catch (error) {
    console.error('❌ ERROR:', error.message)
    console.error(error)
  }
}

// Run test
testGraphQLManual()

