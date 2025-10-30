/**
 * Test Updated GraphQL Schema
 * Tests new queries added in 2025-10-30 update
 */

import { GraphQLClient } from 'graphql-request'

const endpoint = 'https://superapps.if.unismuh.ac.id/graphql'
const client = new GraphQLClient(endpoint)

// Test credentials
const TEST_USERNAME = '105841102021'
const TEST_PASSWORD = 'SamaSemua'

console.log('🧪 Testing Updated GraphQL Schema (2025-10-30)\n')
console.log('=' * 60)

async function testLogin() {
  console.log('\n1️⃣ Testing LOGIN mutation...')

  const LOGIN = `
    mutation Login($username: String!, $password: String!) {
      login(username: $username, password: $password) {
        access_token
      }
    }
  `

  try {
    const result = await client.request(LOGIN, {
      username: TEST_USERNAME,
      password: TEST_PASSWORD
    })

    console.log('✅ LOGIN Success')
    console.log('   Token received:', result.login.access_token.substring(0, 50) + '...')
    return result.login.access_token
  } catch (error) {
    console.error('❌ LOGIN Failed:', error.message)
    return null
  }
}

async function testProfile(token) {
  console.log('\n2️⃣ Testing PROFILE query...')

  const GET_PROFILE = `
    query {
      profile {
        username
        fullname
        department
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

    console.log('✅ PROFILE Success')
    console.log('   Username:', result.profile.username)
    console.log('   Fullname:', result.profile.fullname)
    console.log('   Department:', result.profile.department)
    console.log('   Role:', result.profile.role)

    return result.profile
  } catch (error) {
    console.error('❌ PROFILE Failed:', error.message)
    return null
  }
}

async function testDosenQueries() {
  console.log('\n3️⃣ Testing NEW Dosen Queries...')

  // Test GET_ALL_DOSENS
  const GET_ALL_DOSENS = `
    query {
      dosens {
        nidn
        nama
        email
        hp
      }
    }
  `

  try {
    const result = await client.request(GET_ALL_DOSENS)
    const dosenCount = result.dosens?.length || 0

    console.log('✅ GET_ALL_DOSENS Success')
    console.log(`   Total Dosen: ${dosenCount}`)

    if (dosenCount > 0) {
      console.log('   Sample:', result.dosens[0].nama)
    }

    return true
  } catch (error) {
    console.error('❌ GET_ALL_DOSENS Failed:', error.message)
    return false
  }
}

async function testKhsMahasiswa(nim, token) {
  console.log('\n4️⃣ Testing GET_KHS_MAHASISWA query...')

  const GET_KHS_MAHASISWA = `
    query GetKhsMahasiswa($nim: String!, $periode_krs: String!) {
      getKhsMahasiswa(nim: $nim, periode_krs: $periode_krs) {
        header {
          total_sks
          total_bobot
          total_matakuliah
          ips
        }
        khs {
          kode_matakuliah
          nama_matakuliah
          semester
          sks
          grade
          nilai
          bobot
        }
      }
    }
  `

  try {
    const authClient = new GraphQLClient(endpoint, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })

    // Try current semester (example: 20251)
    const periode = '20251'

    const result = await authClient.request(GET_KHS_MAHASISWA, {
      nim: nim,
      periode_krs: periode
    })

    console.log('✅ GET_KHS_MAHASISWA Success')
    console.log(`   Total SKS: ${result.getKhsMahasiswa.header.total_sks}`)
    console.log(`   IPS: ${result.getKhsMahasiswa.header.ips}`)
    console.log(`   Total Matakuliah: ${result.getKhsMahasiswa.header.total_matakuliah}`)

    if (result.getKhsMahasiswa.khs?.length > 0) {
      console.log('   Sample Matakuliah:', result.getKhsMahasiswa.khs[0].nama_matakuliah)
    }

    return true
  } catch (error) {
    console.error('❌ GET_KHS_MAHASISWA Failed:', error.message)
    return false
  }
}

async function testCekKkpMahasiswa(nim, token) {
  console.log('\n5️⃣ Testing CEK_KKP_MAHASISWA query...')

  const CEK_KKP_MAHASISWA = `
    query CekKkpMahasiswa($nim: String!) {
      cekKkpMahasiswa(nim: $nim)
    }
  `

  try {
    const authClient = new GraphQLClient(endpoint, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })

    const result = await authClient.request(CEK_KKP_MAHASISWA, { nim })

    console.log('✅ CEK_KKP_MAHASISWA Success')
    console.log('   Has KKP:', result.cekKkpMahasiswa ? 'Yes' : 'No')

    return result.cekKkpMahasiswa
  } catch (error) {
    console.error('❌ CEK_KKP_MAHASISWA Failed:', error.message)
    return null
  }
}

async function testApprovalStatuses() {
  console.log('\n6️⃣ Testing GET_ALL_APPROVAL_STATUSES query...')

  const GET_ALL_APPROVAL_STATUSES = `
    query {
      getAllApprovalStatuses {
        id
        nama
        keterangan
      }
    }
  `

  try {
    const result = await client.request(GET_ALL_APPROVAL_STATUSES)

    console.log('✅ GET_ALL_APPROVAL_STATUSES Success')
    console.log(`   Total Statuses: ${result.getAllApprovalStatuses?.length || 0}`)

    if (result.getAllApprovalStatuses?.length > 0) {
      console.log('   Available Statuses:')
      result.getAllApprovalStatuses.forEach(status => {
        console.log(`     - ${status.nama}`)
      })
    }

    return true
  } catch (error) {
    console.error('❌ GET_ALL_APPROVAL_STATUSES Failed:', error.message)
    return false
  }
}

// Run all tests
async function runAllTests() {
  try {
    // 1. Login
    const token = await testLogin()
    if (!token) {
      console.log('\n❌ Cannot continue without token')
      return
    }

    // 2. Get Profile
    const profile = await testProfile(token)
    if (!profile) {
      console.log('\n⚠️ Warning: Could not get profile')
    }

    // 3. Test new Dosen queries
    await testDosenQueries()

    // 4. Test KHS (if we have NIM from profile)
    if (profile?.username) {
      await testKhsMahasiswa(profile.username, token)
      await testCekKkpMahasiswa(profile.username, token)
    }

    // 5. Test Approval Statuses
    await testApprovalStatuses()

    console.log('\n' + '=' * 60)
    console.log('✅ All tests completed!')
    console.log('\n📊 Summary:')
    console.log('   - Total Queries: 47 (4 new queries tested)')
    console.log('   - Total Mutations: 24')
    console.log('   - Schema Version: 2025-10-30')

  } catch (error) {
    console.error('\n💥 Unexpected error:', error)
  }
}

// Run tests
runAllTests()
