import { prisma } from '@/lib/prisma'
import { generateNomorSurat, getCurrentYears } from './date-utils'

/**
 * Get next counter for letter numbering
 * @param jenisSurat - Type of letter (e.g., 'SKA', 'SIP')
 * @param prodiId - Prodi code
 * @returns Next counter number
 */
export async function getNextCounter(jenisSurat: string, prodiId: string): Promise<number> {
  const currentYear = getCurrentYears().gregorian.toString()

  // Find or create counter for this jenis_surat + year + prodi
  const counter = await prisma.count_surat.findFirst({
    where: {
      jenis: jenisSurat,
      tahun: currentYear,
      prodi_id: prodiId
    }
  })

  if (!counter) {
    // Create new counter for this year
    const newCounter = await prisma.count_surat.create({
      data: {
        jenis: jenisSurat,
        counter: 1,
        tahun: currentYear,
        prodi_id: prodiId
      }
    })
    return newCounter.counter
  }

  // Increment existing counter
  const updated = await prisma.count_surat.update({
    where: { id: counter.id },
    data: {
      counter: {
        increment: 1
      }
    }
  })

  return updated.counter
}

/**
 * Get current counter without incrementing
 * @param jenisSurat - Type of letter
 * @param prodiId - Prodi code
 * @returns Current counter number
 */
export async function getCurrentCounter(jenisSurat: string, prodiId: string): Promise<number> {
  const currentYear = getCurrentYears().gregorian.toString()

  const counter = await prisma.count_surat.findFirst({
    where: {
      jenis: jenisSurat,
      tahun: currentYear,
      prodi_id: prodiId
    }
  })

  return counter?.counter || 0
}

/**
 * Generate complete letter number
 * @param jenisSurat - Type of letter (e.g., 'SKA', 'SIP')
 * @param prodiKode - Prodi code short (e.g., 'IF', 'TE')
 * @param prodiId - Prodi ID for counter
 * @returns Complete letter number
 */
export async function generateLetterNumber(
  jenisSurat: string,
  prodiKode: string,
  prodiId: string
): Promise<string> {
  const counter = await getNextCounter(jenisSurat, prodiId)
  return generateNomorSurat(counter, jenisSurat, prodiKode)
}

/**
 * Preview next letter number without incrementing counter
 * @param jenisSurat - Type of letter
 * @param prodiKode - Prodi code short
 * @param prodiId - Prodi ID
 * @returns Previewed letter number
 */
export async function previewLetterNumber(
  jenisSurat: string,
  prodiKode: string,
  prodiId: string
): Promise<string> {
  const currentCounter = await getCurrentCounter(jenisSurat, prodiId)
  const nextCounter = currentCounter + 1
  return generateNomorSurat(nextCounter, jenisSurat, prodiKode)
}

/**
 * Reset counter for new year (should be run via cron job)
 * @param year - Year to reset for
 */
export async function resetCountersForNewYear(year: string): Promise<void> {
  // This should be called at the beginning of each year
  // All counters will naturally start at 0 for the new year
  // because we use unique constraint on [jenis, tahun, prodi_id]
  console.log(`Counters will auto-reset for year ${year} on first use`)
}

/**
 * Get letter statistics
 * @param prodiId - Prodi ID
 * @returns Statistics object
 */
export async function getLetterStatistics(prodiId: string) {
  const currentYear = getCurrentYears().gregorian.toString()

  const counters = await prisma.count_surat.findMany({
    where: {
      tahun: currentYear,
      prodi_id: prodiId
    }
  })

  const total = counters.reduce((sum, c) => sum + c.counter, 0)

  const byType = counters.map(c => ({
    jenis: c.jenis,
    counter: c.counter
  }))

  return {
    year: currentYear,
    prodi_id: prodiId,
    total,
    byType
  }
}
