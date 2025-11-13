/**
 * Fetch Real Students from SINTA GraphQL
 * Usage: npx tsx scripts/fetch-students-sinta.ts [prodi_code] [limit]
 * Example: npx tsx scripts/fetch-students-sinta.ts 55202 10
 */

import { graphqlClient, executeGraphQLQuery } from '../lib/graphql/client'
import { GET_MAHASISWA, MahasiswaResponse } from '../lib/graphql/queries'
import fs from 'fs'
import path from 'path'

interface StudentData {
  nim: string
  nama: string
  prodi_id: string
  prodi_name: string
  angkatan: number
  email?: string
  hp?: string
  ipk?: number
  semester?: number
  dosen_pa_nidn?: string
  dosen_pa_name?: string
}

// Sample NIM format untuk fetch
// Format: [tahun][kode_prodi][nomor_urut]
// Contoh: 2055202001 = Angkatan 2020, Prodi 55202 (Informatika), No 001

async function fetchStudentData(nim: string): Promise<StudentData | null> {
  try {
    console.log(`  🔍 Fetching NIM: ${nim}...`)

    const { data, error } = await executeGraphQLQuery<MahasiswaResponse>(
      GET_MAHASISWA,
      { nim },
      graphqlClient
    )

    if (error || !data?.mahasiswa) {
      console.log(`    ❌ Not found or error: ${error}`)
      return null
    }

    const mhs = data.mahasiswa

    // Extract prodi code from NIM (format: TAHUN+KODE_PRODI+NOMOR)
    // Example: 2055202001 -> kode prodi = 55202
    let prodiCode = mhs.kodeProdi || ''
    if (!prodiCode && nim.length >= 7) {
      prodiCode = nim.substring(2, 7) // Extract 5 digits prodi code
    }

    const studentData: StudentData = {
      nim: mhs.nim,
      nama: mhs.nama || `Student ${nim}`,
      prodi_id: prodiCode,
      prodi_name: mhs.prodi?.namaProdi || 'Unknown',
      angkatan: mhs.angkatan || parseInt(nim.substring(0, 2)) + 2000,
      email: mhs.email || undefined,
      hp: mhs.hp || undefined,
      ipk: mhs.khs?.[0]?.ipk || undefined,
      semester: mhs.khs?.length || 1,
      dosen_pa_nidn: mhs.dosenPenasehat?.nidn || undefined,
      dosen_pa_name: mhs.dosenPenasehat?.nama || undefined,
    }

    console.log(`    ✅ Found: ${studentData.nama}`)
    return studentData

  } catch (err) {
    console.error(`    ❌ Error fetching ${nim}:`, err)
    return null
  }
}

async function fetchMultipleStudents(
  prodiCode: string,
  startYear: number = 20, // Angkatan 2020
  endYear: number = 25,   // Angkatan 2025
  studentsPerYear: number = 5
): Promise<StudentData[]> {
  const students: StudentData[] = []

  console.log(`\n🎓 Fetching students for Prodi: ${prodiCode}`)
  console.log(`   Angkatan: ${2000 + startYear} - ${2000 + endYear}`)
  console.log(`   Target: ${studentsPerYear} per angkatan\n`)

  for (let year = startYear; year <= endYear; year++) {
    console.log(`📅 Angkatan 20${year}...`)

    for (let i = 1; i <= studentsPerYear; i++) {
      // Generate NIM: [tahun][prodi][nomor]
      const nim = `${year}${prodiCode}${String(i).padStart(3, '0')}`

      const studentData = await fetchStudentData(nim)
      if (studentData) {
        students.push(studentData)
      }

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 200))
    }

    console.log()
  }

  return students
}

async function fetchStudentsFromProdiList(): Promise<StudentData[]> {
  const allStudents: StudentData[] = []

  // Daftar prodi di Fakultas Teknik (REAL CODES)
  const prodiList = [
    { code: '20201', name: 'Teknik Elektro' },
    { code: '22201', name: 'Teknik Pengairan' },
    { code: '23201', name: 'Arsitektur' },
    { code: '55202', name: 'Informatika' },
    { code: '35201', name: 'Perencanaan Wilayah dan Kota' },
  ]

  console.log('🌱 Starting student data collection from SINTA...')
  console.log('='.repeat(60))

  for (const prodi of prodiList) {
    console.log(`\n📚 Processing ${prodi.name} (${prodi.code})...`)

    // Fetch 3 students per angkatan (2022-2025) = 12 students per prodi
    const students = await fetchMultipleStudents(
      prodi.code,
      22, // Start from 2022
      25, // Until 2025
      3   // 3 students per year
    )

    allStudents.push(...students)
    console.log(`   ✅ Collected ${students.length} students from ${prodi.name}`)
  }

  console.log('\n' + '='.repeat(60))
  console.log(`✅ Total students collected: ${allStudents.length}`)

  return allStudents
}

async function saveToFile(students: StudentData[]) {
  const outputDir = path.join(process.cwd(), 'prisma', 'data')
  const outputFile = path.join(outputDir, 'students-sinta.json')

  // Create directory if not exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  fs.writeFileSync(
    outputFile,
    JSON.stringify(students, null, 2),
    'utf-8'
  )

  console.log(`\n💾 Data saved to: ${outputFile}`)

  // Generate summary
  const summary = {
    total: students.length,
    by_prodi: {} as Record<string, number>,
    by_angkatan: {} as Record<number, number>,
  }

  students.forEach(s => {
    summary.by_prodi[s.prodi_id] = (summary.by_prodi[s.prodi_id] || 0) + 1
    summary.by_angkatan[s.angkatan] = (summary.by_angkatan[s.angkatan] || 0) + 1
  })

  console.log('\n📊 Summary:')
  console.log('   By Prodi:', summary.by_prodi)
  console.log('   By Angkatan:', summary.by_angkatan)
}

// Main execution
async function main() {
  const args = process.argv.slice(2)

  if (args[0] === 'single' && args[1]) {
    // Fetch single student by NIM
    console.log('🔍 Fetching single student...')
    const student = await fetchStudentData(args[1])
    if (student) {
      console.log('\n📄 Student Data:')
      console.log(JSON.stringify(student, null, 2))
    }
  } else if (args[0] && args[0] !== 'all') {
    // Fetch students from specific prodi
    const prodiCode = args[0]
    const limit = parseInt(args[1] || '10')

    console.log(`🎓 Fetching ${limit} students from Prodi ${prodiCode}...`)
    const students = await fetchMultipleStudents(prodiCode, 22, 25, limit)
    await saveToFile(students)
  } else {
    // Fetch from all prodi
    const students = await fetchStudentsFromProdiList()
    await saveToFile(students)
  }

  console.log('\n✨ Done!\n')
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ Fatal error:', error)
    process.exit(1)
  })
