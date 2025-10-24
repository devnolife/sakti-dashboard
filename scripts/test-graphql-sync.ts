/**
 * Test script to debug GraphQL sync
 * Run: npx tsx scripts/test-graphql-sync.ts
 */

import { graphqlClient, executeGraphQLQuery } from '../lib/graphql/client'
import { GET_MAHASISWA, MahasiswaResponse } from '../lib/graphql/queries'
import { syncStudentDataFromGraphQL } from '../lib/graphql/sync-student-data'

async function testGraphQLSync() {
  // Test dengan NIM yang ada di database
  const TEST_NIM = process.argv[2] || '105841109518' // Ganti dengan NIM yang valid

  console.log('🔍 Testing GraphQL Sync...')
  console.log('='.repeat(50))
  console.log(`Testing with NIM: ${TEST_NIM}\n`)

  // Step 1: Test GraphQL connection
  console.log('📡 Step 1: Testing GraphQL API connection...')
  try {
    const { data, error } = await executeGraphQLQuery<MahasiswaResponse>(
      GET_MAHASISWA,
      { nim: TEST_NIM },
      graphqlClient
    )

    if (error) {
      console.error('❌ GraphQL Error:', error)
      return
    }

    if (!data?.mahasiswa) {
      console.error('❌ No data returned from GraphQL')
      return
    }

    console.log('✅ GraphQL connection successful!')
    console.log('\n📦 Data received from GraphQL:')
    console.log(JSON.stringify(data.mahasiswa, null, 2))
    console.log('\n')

  } catch (err) {
    console.error('❌ Failed to fetch from GraphQL:', err)
    return
  }

  // Step 2: Test sync function
  console.log('🔄 Step 2: Testing sync function...')
  try {
    const result = await syncStudentDataFromGraphQL(TEST_NIM)

    if (result.success) {
      console.log('✅ Sync successful!')
      console.log('\n📊 Synced data:')
      console.log(JSON.stringify(result.data, null, 2))
    } else {
      console.error('❌ Sync failed:', result.error)
    }
  } catch (err) {
    console.error('❌ Exception during sync:', err)
  }

  console.log('\n' + '='.repeat(50))
  console.log('✅ Test completed!')
}

// Run the test
testGraphQLSync()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Fatal error:', err)
    process.exit(1)
  })
