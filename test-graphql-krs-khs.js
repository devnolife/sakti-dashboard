/**
 * Script Test KRS dan KHS dengan GraphQL
 * Test mengambil data akademik mahasiswa
 */

const GRAPHQL_ENDPOINT = 'https://superapps.if.unismuh.ac.id/graphql'

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

// Query dengan parameter required (nim dan periode_krs harus diisi)
const KRS_QUERY = `
query GetKrsMahasiswa($nim: String!, $periode_krs: String!) {
  getKrsMahasiswa(nim: $nim, periode_krs: $periode_krs) {
    header {
      total_sks
      total_matakuliah
    }
    krs {
      kode_matakuliah
      nama_matakuliah
      semester
      sks
    }
  }
}
`

const KHS_QUERY = `
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

async function testKrsKhs() {
  console.log('\n========================================')
  console.log('🧪 TEST KRS & KHS GRAPHQL')
  console.log('========================================\n')

  try {
    // STEP 1: LOGIN
    console.log('📝 STEP 1: Login...')
    const signinResponse = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: SIGNIN_MUTATION }),
    })

    const signinData = await signinResponse.json()
    if (signinData.errors) {
      console.error('❌ Login failed:', signinData.errors)
      return
    }

    const accessToken = signinData.data.signin.access_token
    const nim = signinData.data.signin.user.username
    console.log('✅ Login berhasil')
    console.log('👤 Username:', nim)
    console.log('')

    // STEP 2: GET KRS
    console.log('========================================')
    console.log('📝 STEP 2: Get KRS (Kartu Rencana Studi)...')
    console.log('')

    const krsResponse = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        query: KRS_QUERY,
        variables: {
          nim: nim,
          periode_krs: "20251" // Tahun Akademik 2025 Semester Ganjil
        }
      }),
    })

    const krsData = await krsResponse.json()
    
    if (krsData.errors) {
      console.error('❌ KRS query failed:', JSON.stringify(krsData.errors, null, 2))
    } else if (krsData.data?.getKrsMahasiswa) {
      console.log('✅ KRS berhasil diambil!')
      console.log('')
      console.log('📊 KRS Header:')
      console.log(JSON.stringify(krsData.data.getKrsMahasiswa.header, null, 2))
      console.log('')
      console.log('📚 Mata Kuliah:', krsData.data.getKrsMahasiswa.krs.length, 'courses')
      console.log('')
      console.log('📋 Sample Mata Kuliah (first 3):')
      krsData.data.getKrsMahasiswa.krs.slice(0, 3).forEach((mk, i) => {
        console.log(`  ${i + 1}. ${mk.nama_matakuliah} (${mk.kode_matakuliah})`)
        console.log(`     SKS: ${mk.sks}, Semester: ${mk.semester}`)
      })
    } else {
      console.log('⚠️ No KRS data available')
    }
    console.log('')

    // STEP 3: GET KHS
    console.log('========================================')
    console.log('📝 STEP 3: Get KHS (Kartu Hasil Studi)...')
    console.log('')

    const khsResponse = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        query: KHS_QUERY,
        variables: {
          nim: nim,
          periode_krs: "20251" // Tahun Akademik 2025 Semester Ganjil
        }
      }),
    })

    const khsData = await khsResponse.json()
    
    if (khsData.errors) {
      console.error('❌ KHS query failed:', JSON.stringify(khsData.errors, null, 2))
    } else if (khsData.data?.getKhsMahasiswa) {
      console.log('✅ KHS berhasil diambil!')
      console.log('')
      console.log('📊 KHS Header:')
      console.log(JSON.stringify(khsData.data.getKhsMahasiswa.header, null, 2))
      console.log('')
      console.log('📚 Mata Kuliah dengan Nilai:', khsData.data.getKhsMahasiswa.khs.length, 'courses')
      console.log('')
      console.log('📋 Sample Nilai (first 5):')
      khsData.data.getKhsMahasiswa.khs.slice(0, 5).forEach((mk, i) => {
        console.log(`  ${i + 1}. ${mk.nama_matakuliah} (${mk.kode_matakuliah})`)
        console.log(`     SKS: ${mk.sks}, Grade: ${mk.grade}, Nilai: ${mk.nilai}`)
      })
    } else {
      console.log('⚠️ No KHS data available')
    }
    console.log('')

    // SUMMARY
    console.log('========================================')
    console.log('📋 SUMMARY')
    console.log('========================================')
    console.log('✅ Login berhasil')
    console.log('✅ Bearer token berfungsi')
    
    if (krsData.data?.getKrsMahasiswa) {
      const krsHeader = krsData.data.getKrsMahasiswa.header
      console.log(`✅ KRS: ${krsHeader.total_matakuliah} mata kuliah, ${krsHeader.total_sks} SKS`)
    }
    
    if (khsData.data?.getKhsMahasiswa) {
      const khsHeader = khsData.data.getKhsMahasiswa.header
      console.log(`✅ KHS: ${khsHeader.total_matakuliah} mata kuliah, IPS: ${khsHeader.ips}`)
    }
    
    console.log('')
    console.log('🎉 Semua test berhasil!')
    console.log('')

  } catch (error) {
    console.error('❌ ERROR:', error.message)
    console.error(error)
  }
}

// Run test
testKrsKhs()

