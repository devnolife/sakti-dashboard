/**
 * Test script untuk memeriksa data KRS dan KHS dari GraphQL
 * 
 * Cara run:
 * 1. Pastikan sudah login dan punya token
 * 2. Run: npx tsx scripts/test-krs-khs.ts
 */

import { executeGraphQLQuery, createAuthenticatedClient } from '../lib/graphql/client'
import { GET_KRS_MAHASISWA, GET_KHS_MAHASISWA } from '../lib/graphql/queries-superapps'

// Ganti dengan token dari login
const TOKEN = 'YOUR_TOKEN_HERE' // Atau ambil dari localStorage di browser

async function testKRS() {
  console.log('\n🧪 Testing GET_KRS_MAHASISWA...')
  console.log('==========================================')

  const client = createAuthenticatedClient(TOKEN)
  const { data, error } = await executeGraphQLQuery<any>(
    GET_KRS_MAHASISWA,
    { nim: null, periode_krs: null },
    client
  )

  if (error) {
    console.error('❌ Error:', error)
    return null
  }

  if (data?.getKrsMahasiswa) {
    console.log('✅ KRS Data received!')
    console.log('\nHeader:')
    console.log('  - Total SKS:', data.getKrsMahasiswa.header.total_sks)
    console.log('  - Total Mata Kuliah:', data.getKrsMahasiswa.header.total_matakuliah)

    console.log('\nMata Kuliah:')
    if (data.getKrsMahasiswa.krs && data.getKrsMahasiswa.krs.length > 0) {
      data.getKrsMahasiswa.krs.forEach((mk: any, i: number) => {
        console.log(`  ${i + 1}. ${mk.nama_matakuliah}`)
        console.log(`     - Kode: ${mk.kode_matakuliah}`)
        console.log(`     - SKS: ${mk.sks}`)
        console.log(`     - Semester: ${mk.semester}`)
      })
    } else {
      console.log('  (Tidak ada mata kuliah)')
    }

    return data.getKrsMahasiswa
  } else {
    console.error('❌ No data returned')
    return null
  }
}

async function testKHS() {
  console.log('\n🧪 Testing GET_KHS_MAHASISWA...')
  console.log('==========================================')

  const client = createAuthenticatedClient(TOKEN)
  const { data, error } = await executeGraphQLQuery<any>(
    GET_KHS_MAHASISWA,
    { nim: null, periode_krs: null },
    client
  )

  if (error) {
    console.error('❌ Error:', error)
    return null
  }

  if (data?.getKhsMahasiswa) {
    console.log('✅ KHS Data received!')
    console.log('\nHeader:')
    console.log('  - Total SKS:', data.getKhsMahasiswa.header.total_sks)
    console.log('  - Total Bobot:', data.getKhsMahasiswa.header.total_bobot)
    console.log('  - Total Mata Kuliah:', data.getKhsMahasiswa.header.total_matakuliah)
    console.log('  - IPS:', data.getKhsMahasiswa.header.ips)

    console.log('\nNilai Mata Kuliah:')
    if (data.getKhsMahasiswa.khs && data.getKhsMahasiswa.khs.length > 0) {
      data.getKhsMahasiswa.khs.forEach((mk: any, i: number) => {
        console.log(`  ${i + 1}. ${mk.nama_matakuliah}`)
        console.log(`     - Kode: ${mk.kode_matakuliah}`)
        console.log(`     - SKS: ${mk.sks}`)
        console.log(`     - Semester: ${mk.semester}`)
        console.log(`     - Nilai: ${mk.nilai}`)
        console.log(`     - Grade: ${mk.grade}`)
        console.log(`     - Bobot: ${mk.bobot}`)
      })
    } else {
      console.log('  (Tidak ada data nilai)')
    }

    return data.getKhsMahasiswa
  } else {
    console.error('❌ No data returned')
    return null
  }
}

async function main() {
  console.log('🚀 Starting KRS and KHS Data Test')
  console.log('==================================================\n')

  if (TOKEN === 'YOUR_TOKEN_HERE') {
    console.error('❌ ERROR: Please set your authentication token!')
    console.log('\nCara mendapatkan token:')
    console.log('1. Login ke dashboard')
    console.log('2. Buka DevTools (F12)')
    console.log('3. Ke tab Console')
    console.log('4. Ketik: localStorage.getItem("graphql-token")')
    console.log('5. Copy token dan paste ke TOKEN variable di script ini\n')
    return
  }

  const krsData = await testKRS()
  const khsData = await testKHS()

  console.log('\n==================================================')
  console.log('📊 Summary:')
  console.log('  - KRS:', krsData ? '✅ Success' : '❌ Failed')
  console.log('  - KHS:', khsData ? '✅ Success' : '❌ Failed')
  console.log('==================================================\n')
}

main().catch(console.error)
