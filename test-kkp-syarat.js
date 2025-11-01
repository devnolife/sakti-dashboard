/**
 * Test script untuk KKP Syarat
 * Test query GET_KKP_SYARAT_BY_KODE_PRODI
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

const KKP_SYARAT_QUERY = `
query GetKkpSyaratByKodeProdi($kodeProdi: String!) {
  getKkpSyaratByKodeProdi(kodeProdi: $kodeProdi) {
    id
    prodi_kode_prodi
    nama
    logo
    url_check
    response_should_be
    is_upload_file
    is_activated
    is_deleted
    created_by
    updated_by
    created_at
    updated_at
  }
}
`

async function testKkpSyarat() {
  console.log('\n========================================')
  console.log('🧪 TEST KKP SYARAT')
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
    console.log('✅ Login berhasil')
    console.log('👤 Username:', signinData.data.signin.user.username)
    console.log('')

    // STEP 2: GET KKP SYARAT
    console.log('========================================')
    console.log('📝 STEP 2: Get KKP Syarat (Kode Prodi: 55202 - Informatika)...')
    console.log('')

    const kkpSyaratResponse = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        query: KKP_SYARAT_QUERY,
        variables: {
          kodeProdi: "55202"
        }
      }),
    })

    const kkpSyaratData = await kkpSyaratResponse.json()
    
    if (kkpSyaratData.errors) {
      console.error('❌ KKP Syarat query failed:', JSON.stringify(kkpSyaratData.errors, null, 2))
    } else if (kkpSyaratData.data?.getKkpSyaratByKodeProdi) {
      const requirements = kkpSyaratData.data.getKkpSyaratByKodeProdi
      
      console.log('✅ KKP Syarat berhasil diambil!')
      console.log('')
      console.log('📊 Total Requirements:', requirements.length)
      console.log('')
      
      // Filter active requirements
      const activeReqs = requirements.filter(req => req.is_activated && !req.is_deleted)
      console.log('✅ Active Requirements:', activeReqs.length)
      console.log('')
      
      if (activeReqs.length > 0) {
        console.log('📋 Daftar Syarat Aktif:')
        activeReqs.forEach((req, index) => {
          console.log(`\n${index + 1}. ${req.nama}`)
          console.log(`   ID: ${req.id}`)
          console.log(`   Prodi: ${req.prodi_kode_prodi}`)
          console.log(`   Upload File: ${req.is_upload_file ? 'Ya' : 'Tidak'}`)
          if (req.url_check) {
            console.log(`   URL Check: ${req.url_check}`)
          }
          if (req.response_should_be) {
            console.log(`   Expected Response: ${req.response_should_be}`)
          }
          console.log(`   Status: ${req.is_activated ? 'Aktif' : 'Tidak Aktif'}`)
        })
      } else {
        console.log('⚠️ Tidak ada syarat aktif')
      }
    } else {
      console.log('⚠️ No KKP Syarat data available')
    }
    console.log('')

    // SUMMARY
    console.log('========================================')
    console.log('📋 SUMMARY')
    console.log('========================================')
    console.log('✅ Login berhasil')
    console.log('✅ Bearer token berfungsi')
    
    if (kkpSyaratData.data?.getKkpSyaratByKodeProdi) {
      const requirements = kkpSyaratData.data.getKkpSyaratByKodeProdi
      const activeReqs = requirements.filter(req => req.is_activated && !req.is_deleted)
      console.log(`✅ KKP Syarat: ${requirements.length} total, ${activeReqs.length} aktif`)
    }
    
    console.log('')
    console.log('🎉 Test berhasil!')
    console.log('')

  } catch (error) {
    console.error('❌ ERROR:', error.message)
    console.error(error)
  }
}

// Run test
testKkpSyarat()

