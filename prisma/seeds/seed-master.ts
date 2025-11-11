/**
 * Master Seed Script
 * Runs all seed scripts in correct order
 * 
 * Usage: npx tsx prisma/seeds/seed-master.ts
 */

import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

const seeds = [
  {
    name: 'Admin Users',
    script: 'npx tsx prisma/seeds/seed-admin-users.ts',
    description: 'Create admin accounts (Admin Umum, Admin Keuangan, Admin Prodi)'
  },
  {
    name: 'Student Users',
    script: 'npx tsx prisma/seeds/seed-students-minimal.ts',
    description: 'Create 5 students per prodi'
  },
  {
    name: 'Workflow Test Data',
    script: 'npx tsx prisma/seeds/seed-workflow-test.ts',
    description: 'Create test letter requests in various workflow stages'
  }
]

async function main() {
  console.log('🌱 Running Master Seed Script...\n')

  for (const seed of seeds) {
    console.log(`\n${'='.repeat(60)}`)
    console.log(`📦 ${seed.name}`)
    console.log(`   ${seed.description}`)
    console.log('='.repeat(60))

    try {
      const { stdout, stderr } = await execAsync(seed.script)
      console.log(stdout)
      if (stderr) console.error(stderr)
      console.log(`✅ ${seed.name} completed`)
    } catch (error: any) {
      console.error(`❌ Error in ${seed.name}:`, error.message)
      console.log('Continuing with next seed...')
    }
  }

  console.log('\n' + '='.repeat(60))
  console.log('✅ All seeds completed!')
  console.log('='.repeat(60))
  console.log('\n📋 Summary:')
  console.log('   - Admin Users: 7 accounts (1 Admin Umum, 1 Admin Keuangan, 5 Admin Prodi)')
  console.log('   - Students: 25 accounts (5 per prodi)')
  console.log('   - Workflow Test: 11 letter requests')
  console.log('\n🔑 Default Passwords:')
  console.log('   - Admin: admin123')
  console.log('   - Mahasiswa: mahasiswa123')
  console.log('\n📧 Login Examples:')
  console.log('   - Admin Umum: admin.umum / admin123')
  console.log('   - Admin Keuangan: admin.keuangan / admin123')
  console.log('   - Admin Prodi: admin.prodi.55202 / admin123')
  console.log('   - Mahasiswa: 2555202001 / mahasiswa123')
}

main()
  .then(() => {
    console.log('\n✨ Seeding complete! Database is ready for testing.')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Fatal error:', error)
    process.exit(1)
  })
