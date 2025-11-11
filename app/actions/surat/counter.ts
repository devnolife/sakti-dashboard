"use server"

import { prisma } from '@/lib/prisma'
import { getCurrentYears } from '@/lib/utils/date-utils'
import type { LetterScope } from '@/lib/utils/surat-generator'

/**
 * Get atau create counter untuk surat
 * 
 * Aturan:
 * - Fakultas: shared counter (scope='fakultas', prodi_id=null, jenis='FAKULTAS')
 * - Prodi: counter terpisah per prodi (scope='prodi', prodi_id='55202', jenis='PRODI_55202')
 */
export async function getOrCreateCounter(params: {
  scope: LetterScope
  prodiId?: string
}): Promise<{ counter: number; id: number }> {
  const { scope, prodiId } = params
  const { gregorian: tahun } = getCurrentYears()
  const tahunStr = tahun.toString()

  let jenis: string
  let prodi_id: string | null = null

  if (scope === 'fakultas') {
    // Counter fakultas: shared untuk semua surat fakultas
    jenis = 'FAKULTAS'
    prodi_id = null
  } else {
    // Counter prodi: terpisah per prodi
    if (!prodiId) {
      throw new Error('prodiId is required for prodi scope counter')
    }
    jenis = `PRODI_${prodiId}`
    prodi_id = prodiId
  }

  // Cari counter yang ada
  let counterRecord = await prisma.count_surat.findFirst({
    where: {
      jenis,
      tahun: tahunStr,
      prodi_id
    }
  })

  // Jika belum ada, create
  if (!counterRecord) {
    counterRecord = await prisma.count_surat.create({
      data: {
        jenis,
        counter: 0,
        tahun: tahunStr,
        prodi_id
      }
    })
  }

  return {
    counter: counterRecord.counter,
    id: counterRecord.id
  }
}

/**
 * Increment counter dan return nomor berikutnya
 * 
 * @returns Nomor counter yang baru (setelah increment)
 */
export async function incrementCounter(params: {
  scope: LetterScope
  prodiId?: string
}): Promise<number> {
  const { scope, prodiId } = params
  const { gregorian: tahun } = getCurrentYears()
  const tahunStr = tahun.toString()

  let jenis: string
  let prodi_id: string | null = null

  if (scope === 'fakultas') {
    jenis = 'FAKULTAS'
    prodi_id = null
  } else {
    if (!prodiId) {
      throw new Error('prodiId is required for prodi scope counter')
    }
    jenis = `PRODI_${prodiId}`
    prodi_id = prodiId
  }

  // Cari atau create counter
  const currentCounter = await getOrCreateCounter({ scope, prodiId })

  // Increment counter
  const updated = await prisma.count_surat.update({
    where: { id: currentCounter.id },
    data: {
      counter: {
        increment: 1
      }
    }
  })

  return updated.counter
}

/**
 * Get preview next counter (tanpa increment)
 */
export async function getNextCounter(params: {
  scope: LetterScope
  prodiId?: string
}): Promise<number> {
  const current = await getOrCreateCounter(params)
  return current.counter + 1
}

/**
 * Get semua counter aktif untuk tahun ini
 * Untuk keperluan dashboard/statistik
 */
export async function getAllCounters(prodiId?: string) {
  const { gregorian: tahun } = getCurrentYears()
  const tahunStr = tahun.toString()

  const where: any = {
    tahun: tahunStr
  }

  if (prodiId) {
    // Ambil counter prodi ini saja
    where.prodi_id = prodiId
  } else {
    // Ambil counter fakultas
    where.prodi_id = null
  }

  const counters = await prisma.count_surat.findMany({
    where,
    orderBy: {
      jenis: 'asc'
    }
  })

  return counters
}

/**
 * Reset counter (untuk testing atau tahun baru)
 * HATI-HATI: Jangan digunakan di production kecuali benar-benar perlu
 */
export async function resetCounter(params: {
  scope: LetterScope
  prodiId?: string
}) {
  const { scope, prodiId } = params
  const { gregorian: tahun } = getCurrentYears()
  const tahunStr = tahun.toString()

  let jenis: string
  let prodi_id: string | null = null

  if (scope === 'fakultas') {
    jenis = 'FAKULTAS'
    prodi_id = null
  } else {
    if (!prodiId) {
      throw new Error('prodiId is required for prodi scope counter')
    }
    jenis = `PRODI_${prodiId}`
    prodi_id = prodiId
  }

  await prisma.count_surat.updateMany({
    where: {
      jenis,
      tahun: tahunStr,
      prodi_id
    },
    data: {
      counter: 0
    }
  })

  return { success: true }
}
