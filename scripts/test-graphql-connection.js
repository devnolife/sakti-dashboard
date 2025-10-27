const { GraphQLClient } = require('graphql-request')

const endpoint = 'https://superapps.if.unismuh.ac.id/graphql'
const client = new GraphQLClient(endpoint)

// Test 1: Simple query
async function testHello() {
  try {
    console.log('=== Test 1: sayHello query ===')
    const query = `{ sayHello }`
    const data = await client.request(query)
    console.log('✓ Success:', data)
  } catch (error) {
    console.error('✗ Error:', error.response?.errors || error.message)
  }
}

// Test 2: Get all prodis
async function testProdi() {
  try {
    console.log('\n=== Test 2: getAllProdis query ===')
    const query = `
      query {
        getAllProdis {
          kode_prodi
          nama_prodi
        }
      }
    `
    const data = await client.request(query)
    console.log('✓ Success! Found', data.getAllProdis.length, 'programs')
    console.log('First prodi:', data.getAllProdis[0])
  } catch (error) {
    console.error('✗ Error:', error.response?.errors || error.message)
  }
}

// Test 3: Login mutation (test structure only)
async function testLoginStructure() {
  try {
    console.log('\n=== Test 3: Login mutation structure ===')

    // Try without user fields first
    const simpleLogin = `
      mutation {
        login(username: "105841102021", password: "SamaSemua") {
          token
        }
      }
    `
    const data = await client.request(simpleLogin)
    console.log('✓ Login success! Token received')
  } catch (error) {
    console.error('✗ Login error:')
    if (error.response?.errors) {
      error.response.errors.forEach(err => {
        console.error('  -', err.message)
      })
    } else {
      console.error('  -', error.message)
    }
  }
}

async function runTests() {
  await testHello()
  await testProdi()
  await testLoginStructure()
}

runTests()
