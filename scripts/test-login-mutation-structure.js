// Test LOGIN mutation structure
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const content = readFileSync(join(__dirname, '../lib/graphql/mutations-superapps.ts'), 'utf-8')

// Extract LOGIN mutation
const loginMatch = content.match(/export const LOGIN = gql`([^`]+)`/)
const LOGIN = loginMatch ? loginMatch[1] : null

console.log('=== Testing LOGIN Mutation Structure ===\n')
console.log('LOGIN mutation content:')
console.log(LOGIN)
console.log('\n')

// Check if it contains correct fields
if (LOGIN.includes('access_token')) {
  console.log('✅ CORRECT: Uses access_token')
} else {
  console.log('❌ ERROR: Does not use access_token')
}

if (LOGIN.includes('token') && !LOGIN.includes('access_token')) {
  console.log('❌ ERROR: Still uses old "token" field')
}

if (LOGIN.includes('user {')) {
  console.log('❌ ERROR: Still trying to query user fields')
}

if (!LOGIN.includes('user {') && !LOGIN.includes('token') && LOGIN.includes('access_token')) {
  console.log('✅ All checks passed! LOGIN mutation is correct.')
}
