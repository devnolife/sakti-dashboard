"use server"

import { prisma } from "@/lib/prisma"
import { getCurrentYears, getBulanRomawi } from "@/lib/utils/date-utils"

export interface NextNumberPreview {
  jenisSurat: string
  kodeSurat: string
  nextNumber: number
  previewNomor: string
  tahun: string
}

/**
 * Get preview of next letter numbers for all letter types
 * @param prodiId - Program Studi ID
 * @returns Array of next number previews
 */
export async function getNextLetterNumbers(prodiId: string): Promise<NextNumberPreview[]> {
  try {
    // Get current Hijri and Gregorian years
    const { hijri, gregorian } = getCurrentYears()
    const bulanRomawi = getBulanRomawi()
    const masehi = gregorian.toString()

    // Get all active letter types (jenis_surat)
    const jenisSurat = await prisma.jenis_surat.findMany({
      orderBy: { kode: 'asc' }
    })

    // Get current counters for this year and prodi
    const counters = await prisma.count_surat.findMany({
      where: {
        tahun: masehi,
        prodi_id: prodiId
      }
    })

    // Create a map of counters by jenis
    const counterMap = new Map<string, number>()
    counters.forEach(c => {
      counterMap.set(c.jenis, c.counter)
    })

    // Build preview for each jenis surat
    const previews: NextNumberPreview[] = jenisSurat.map(jenis => {
      const currentCounter = counterMap.get(jenis.kode) || 0
      const nextNumber = currentCounter + 1

      // Format: XXX/FT/bulan/tahun_hijri/tahun_masehi
      // Example: 001/FT/XI/1446/2024
      const paddedNumber = nextNumber.toString().padStart(3, '0')
      const previewNomor = `${paddedNumber}/${jenis.kode}/${bulanRomawi}/${hijri}/${masehi}`

      return {
        jenisSurat: jenis.nama,
        kodeSurat: jenis.kode,
        nextNumber,
        previewNomor,
        tahun: masehi
      }
    })

    return previews
  } catch (error) {
    console.error("Error getting next letter numbers:", error)
    throw new Error("Gagal mengambil preview nomor surat")
  }
}
