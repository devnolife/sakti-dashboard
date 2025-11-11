/**
 * Utility untuk generate nomor surat sesuai format UNISMUH
 * 
 * Format Fakultas: XXX/KODE/05/BULAN/HIJRI/MASEHI
 * Format Prodi: XXX/KODE_PRODI/KODE/BULAN/HIJRI/MASEHI
 */

import { getCurrentYears, getBulanRomawi } from './date-utils'

export type LetterScope = 'fakultas' | 'prodi'

export interface GenerateNomorSuratParams {
  counter: number
  jenisKode: string // A, B, C, D
  scope: LetterScope
  kodeProdi?: string // IF, TE, AR, TS, PWK
}

/**
 * Generate nomor surat sesuai scope dan format UNISMUH
 * 
 * @param params - Parameter untuk generate nomor surat
 * @returns Nomor surat lengkap dengan format yang sesuai
 * 
 * @example
 * // Surat Fakultas
 * generateNomorSurat({ counter: 3, jenisKode: 'A', scope: 'fakultas' })
 * // Returns: "003/A/05/XI/1447/2025"
 * 
 * @example
 * // Surat Prodi
 * generateNomorSurat({ counter: 5, jenisKode: 'C', scope: 'prodi', kodeProdi: 'IF' })
 * // Returns: "005/IF/C/XI/1447/2025"
 */
export function generateNomorSurat(params: GenerateNomorSuratParams): string {
  const { counter, jenisKode, scope, kodeProdi } = params

  // Format counter jadi 3 digit
  const counterStr = String(counter).padStart(3, '0')

  // Ambil bulan Romawi dan tahun
  const bulanRomawi = getBulanRomawi()
  const { hijri, gregorian } = getCurrentYears()
  const hijriShort = String(hijri).slice(-4) // 4 digit terakhir tahun Hijri
  const masehi = String(gregorian)

  if (scope === 'fakultas') {
    // Format: XXX/KODE/05/BULAN/HIJRI/MASEHI
    return `${counterStr}/${jenisKode}/05/${bulanRomawi}/${hijriShort}/${masehi}`
  } else {
    // Format: XXX/KODE_PRODI/KODE/BULAN/HIJRI/MASEHI
    if (!kodeProdi) {
      throw new Error('kodeProdi is required for prodi scope letter')
    }
    return `${counterStr}/${kodeProdi}/${jenisKode}/${bulanRomawi}/${hijriShort}/${masehi}`
  }
}

/**
 * Parse nomor surat menjadi komponen-komponennya
 * 
 * @param nomorSurat - Nomor surat lengkap
 * @returns Object dengan komponen nomor surat
 * 
 * @example
 * parseNomorSurat("003/A/05/XI/1447/2025")
 * // Returns: { counter: 3, jenisKode: 'A', scope: 'fakultas', bulan: 'XI', hijri: '1447', masehi: '2025' }
 */
export function parseNomorSurat(nomorSurat: string) {
  const parts = nomorSurat.split('/')

  if (parts.length === 6) {
    // Format fakultas: XXX/KODE/05/BULAN/HIJRI/MASEHI
    const [counterStr, jenisKode, unismuh, bulan, hijri, masehi] = parts

    if (unismuh === '05') {
      return {
        counter: parseInt(counterStr, 10),
        jenisKode,
        scope: 'fakultas' as LetterScope,
        bulan,
        hijri,
        masehi
      }
    }
  }

  if (parts.length === 6) {
    // Format prodi: XXX/KODE_PRODI/KODE/BULAN/HIJRI/MASEHI
    const [counterStr, kodeProdi, jenisKode, bulan, hijri, masehi] = parts

    return {
      counter: parseInt(counterStr, 10),
      kodeProdi,
      jenisKode,
      scope: 'prodi' as LetterScope,
      bulan,
      hijri,
      masehi
    }
  }

  throw new Error(`Invalid nomor surat format: ${nomorSurat}`)
}

/**
 * Validasi format nomor surat
 * 
 * @param nomorSurat - Nomor surat yang akan divalidasi
 * @returns true jika format valid, false jika tidak
 */
export function validateNomorSurat(nomorSurat: string): boolean {
  try {
    parseNomorSurat(nomorSurat)
    return true
  } catch {
    return false
  }
}
