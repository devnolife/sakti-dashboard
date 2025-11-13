/**
 * Check if letter_types exist in database
 */
import { PrismaClient } from '../lib/generated/prisma'

const prisma = new PrismaClient()

async function checkLetterTypes() {
  console.log('🔍 Checking letter_types in database...\n')

  try {
    const letterTypes = await prisma.letter_types.findMany({
      select: {
        id: true,
        title: true,
        is_active: true,
        approval_role: true,
      }
    })

    if (letterTypes.length === 0) {
      console.log('❌ No letter_types found in database!')
      console.log('\n💡 You need to seed letter types first.')
      console.log('   Run: npm run seed:letter-types')
      return
    }

    console.log(`✅ Found ${letterTypes.length} letter types:\n`)
    letterTypes.forEach((lt, index) => {
      console.log(`${index + 1}. ${lt.title}`)
      console.log(`   ID: ${lt.id}`)
      console.log(`   Active: ${lt.is_active}`)
      console.log(`   Approval Role: ${lt.approval_role}`)
      console.log()
    })

  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkLetterTypes()
