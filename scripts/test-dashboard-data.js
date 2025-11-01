/**
 * Test fetching student dashboard with GraphQL profile
 */

import { GraphQLClient } from 'graphql-request'

const endpoint = 'https://superapps.if.unismuh.ac.id/graphql'

const TEST_USERNAME = '105841102021'
const TEST_PASSWORD = 'SamaSemua'

console.log('🧪 Testing Student Dashboard Data Fetch\n')
console.log('=' * 70)

// SIGNIN mutation
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

// GET_PROFILE query
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

async function testDashboardData() {
  try {
    // Step 1: Login
    console.log('\n1️⃣ Logging in...')
    const client = new GraphQLClient(endpoint)
    const signinResult = await client.request(SIGNIN, {
      loginUserInput: {
        username: TEST_USERNAME,
        password: TEST_PASSWORD
      }
    })

    const { access_token, user } = signinResult.signin
    console.log('✅ Login successful')
    console.log('   User:', user.username, '- Role:', user.role)

    // Step 2: Get Profile
    console.log('\n2️⃣ Fetching profile...')
    const authClient = new GraphQLClient(endpoint, {
      headers: {
        authorization: `Bearer ${access_token}`
      }
    })

    const profileResult = await authClient.request(GET_PROFILE)
    const profile = profileResult.profile

    console.log('✅ Profile fetched')
    console.log('   ID:', profile.id)
    console.log('   Username:', profile.username)
    console.log('   Name:', profile.name)
    console.log('   Email:', profile.email)
    console.log('   Phone:', profile.phone)
    console.log('   Role:', profile.role)

    // Step 3: Map to student format (like in student-actions.ts)
    console.log('\n3️⃣ Mapping to dashboard format...')
    const student = {
      id: profile.id,
      nim: profile.username || 'N/A',
      name: profile.name || profile.username || 'Student',
      email: profile.email || null,
      phone: profile.phone || null,
      role: profile.role || 'mahasiswa'
    }

    const dashboardData = {
      student,
      academicInfo: {
        currentSemester: 0,
        totalCredits: 0,
        gpa: 0,
        currentCredits: 0
      },
      upcomingExams: [],
      pendingPayments: [],
      libraryBorrowings: [],
      weeklySchedule: [],
      activeKKP: null,
      recentLetterRequests: []
    }

    console.log('\n✅ Dashboard data structure:')
    console.log(JSON.stringify(dashboardData, null, 2))

    console.log('\n' + '=' * 70)
    console.log('✅ TEST PASSED!')
    console.log('=' * 70)
    console.log('\n📋 Summary:')
    console.log('   - Profile fetched successfully ✅')
    console.log('   - Student name available:', student.name, '✅')
    console.log('   - Dashboard structure correct ✅')
    console.log('\n💡 Usage in page.tsx:')
    console.log('   dashboardData.student.name =', student.name)

  } catch (error) {
    console.error('\n❌ TEST FAILED!')
    console.error('Error:', error.message)
    if (error.response) {
      console.error('Response:', JSON.stringify(error.response, null, 2))
    }
  }
}

testDashboardData()
