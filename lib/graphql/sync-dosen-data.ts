import { prisma } from '../prisma'
import { graphqlClient, executeGraphQLQuery } from './client'
import { GET_DOSEN } from './queries'

/**
 * Response type for Dosen GraphQL query
 */
export interface DosenResponse {
  dosen: {
    nidn: string
    nama: string
    gelar_depan?: string
    gelar_belakang?: string
    tempat_lahir?: string
    tanggal_lahir?: string
    email?: string
    prodiId?: string
    mahasiswa?: Array<{
      nim: string
      nama: string
    }>
  }
}

/**
 * Fetch and sync dosen data from GraphQL API to local database
 * This function is called after successful login for dosen users
 * 
 * @param nidn - Nomor Induk Dosen Nasional
 * @returns Object with success status and optional error or data
 */
export async function syncDosenDataFromGraphQL(nidn: string): Promise<{
  success: boolean
  error?: string
  data?: any
}> {
  try {
    console.log(`🔄 Syncing dosen data from GraphQL for NIDN/NIP: ${nidn}`)

    // Fetch data from GraphQL API
    const { data, error } = await executeGraphQLQuery<DosenResponse>(
      GET_DOSEN,
      { nidn },
      graphqlClient
    )

    if (error || !data?.dosen) {
      console.error('❌ Failed to fetch dosen data from GraphQL:', error)
      return {
        success: false,
        error: error || 'No data returned from GraphQL API'
      }
    }

    const dosenData = data.dosen
    console.log(`✅ Fetched dosen data from GraphQL: ${dosenData.nama}`)

    // Find the lecturer record in local database using nip (not nidn)
    const lecturer = await prisma.lecturers.findUnique({
      where: { nip: nidn },
      include: {
        users: true,
        prodi: true
      }
    })

    if (!lecturer) {
      console.warn(`⚠️ Lecturer with NIP ${nidn} not found in local database`)
      return {
        success: false,
        error: 'Lecturer not found in local database'
      }
    }

    // Check if data already synced recently (within last 24 hours)
    const lastSync = lecturer.last_sync_at
    const now = new Date()
    const hoursSinceSync = lastSync
      ? (now.getTime() - new Date(lastSync).getTime()) / (1000 * 60 * 60)
      : Infinity

    if (hoursSinceSync < 24 && lecturer.email) {
      console.log(`⏭️ Dosen data already synced recently (${Math.round(hoursSinceSync)}h ago), skipping...`)
      return {
        success: true,
        data: lecturer,
        error: 'Data already up to date'
      }
    }

    // STEP 1: Sync prodi data if exists in GraphQL response
    if (dosenData.prodiId) {
      const existingProdi = await prisma.prodi.findUnique({
        where: { kode: dosenData.prodiId }
      })

      if (!existingProdi) {
        console.log(`📝 Prodi with code ${dosenData.prodiId} not found`)
        // Note: We only have prodiId from GraphQL, nama_prodi needs to be fetched separately
        // For now, we'll skip creating if not exists
        console.warn(`⚠️ Prodi ${dosenData.prodiId} not found in database, skipping prodi sync`)
      }
    }

    // Build full name with titles for the user record
    const fullName = [
      dosenData.gelar_depan,
      dosenData.nama,
      dosenData.gelar_belakang
    ].filter(Boolean).join(' ')

    // STEP 2: Update lecturer record with GraphQL data
    // Note: lecturers table only has: id, user_id, nip, department, prodi_id, is_homebase, 
    // position, specialization, phone, office, email, last_sync_at
    const updatedLecturer = await prisma.lecturers.update({
      where: { nip: nidn },
      data: {
        // Update email if provided
        email: dosenData.email || lecturer.email,

        // Update department/prodi if provided
        department: dosenData.prodiId || lecturer.department,
        prodi_id: dosenData.prodiId || lecturer.prodi_id,

        // Update sync timestamp
        last_sync_at: new Date()
      },
      include: {
        users: true,
        prodi: true
      }
    })

    console.log(`✅ Successfully synced dosen data for: ${fullName}`)

    // STEP 3: Update User record with latest name if changed
    if (lecturer.users && fullName !== lecturer.users.name) {
      await prisma.users.update({
        where: { id: lecturer.user_id },
        data: {
          name: fullName
        }
      })
      console.log(`✅ Updated user name to: ${fullName}`)
    }

    return {
      success: true,
      data: updatedLecturer
    }

  } catch (error) {
    console.error('❌ Error syncing dosen data from GraphQL:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}

/**
 * Sync multiple dosen at once (for batch operations)
 * 
 * @param nidnList - Array of NIDN to sync
 * @returns Summary of sync operation
 */
export async function syncMultipleDosenFromGraphQL(nidnList: string[]): Promise<{
  total: number
  success: number
  failed: number
  errors: Array<{ nidn: string; error: string }>
}> {
  const results = {
    total: nidnList.length,
    success: 0,
    failed: 0,
    errors: [] as Array<{ nidn: string; error: string }>
  }

  console.log(`🔄 Starting batch sync for ${nidnList.length} dosen...`)

  for (const nidn of nidnList) {
    const result = await syncDosenDataFromGraphQL(nidn)

    if (result.success) {
      results.success++
    } else {
      results.failed++
      results.errors.push({
        nidn,
        error: result.error || 'Unknown error'
      })
    }

    // Add small delay to avoid overwhelming the API
    await new Promise(resolve => setTimeout(resolve, 100))
  }

  console.log(`✅ Batch sync completed: ${results.success} success, ${results.failed} failed`)

  return results
}
