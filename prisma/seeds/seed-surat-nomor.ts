import { PrismaClient } from '../../lib/generated/prisma'
import { generateNomorSurat } from '../../lib/utils/surat-generator'
import { nanoid } from 'nanoid'

const prisma = new PrismaClient()

async function seedSuratNomor() {
  console.log('==== Seeding nomor surat dengan format baru...')

  try {
    const prodiKode = '55202'
    const prodi = await prisma.prodi.findUnique({
      where: { kode: prodiKode }
    })

    if (!prodi) {
      console.log('Prodi tidak ditemukan')
      return
    }

    console.log('Testing dengan Prodi: ' + prodi.nama)

    const letterTypes = await prisma.letter_types.findMany({
      where: {
        OR: [
          { prodi_id: prodiKode, is_active: true },
          { is_global: true, is_active: true }
        ]
      },
      include: { jenis_surat_link: true }
    })

    if (letterTypes.length === 0) {
      console.log('Tidak ada letter_types')
      return
    }

    const students = await prisma.students.findMany({
      where: { prodi_id: prodiKode },
      take: 5
    })

    if (students.length === 0) {
      console.log('Tidak ada students')
      return
    }

    // Get admin user untuk approved_by
    const adminUser = await prisma.users.findFirst({
      where: { role: 'admin' }
    })

    if (!adminUser) {
      console.log('Tidak ada admin user')
      return
    }

    for (const letterType of letterTypes) {
      console.log('Processing: ' + letterType.title)

      const jenisKode = letterType.jenis_surat_link?.kode || 'A'
      const scope = letterType.scope as 'fakultas' | 'prodi'
      const jumlahSurat = Math.floor(Math.random() * 3) + 2

      for (let i = 0; i < jumlahSurat; i++) {
        const student = students[Math.floor(Math.random() * students.length)]

        const request = await prisma.correspondence_requests.create({
          data: {
            id: nanoid(),
            letter_type_id: letterType.id,
            student_id: student.id,
            form_data: { perihal: 'Testing' },
            status: 'approved',
            approved_by: adminUser.id,
            approved_at: new Date()
          }
        })

        const jenis = scope === 'fakultas' ? 'FAKULTAS' : 'PRODI_' + prodiKode
        const prodi_id = scope === 'fakultas' ? null : prodiKode

        let counterRecord = await prisma.count_surat.findFirst({
          where: {
            jenis,
            tahun: new Date().getFullYear().toString(),
            prodi_id
          }
        })

        if (!counterRecord) {
          counterRecord = await prisma.count_surat.create({
            data: {
              jenis,
              counter: 0,
              tahun: new Date().getFullYear().toString(),
              prodi_id
            }
          })
        }

        const updatedCounter = await prisma.count_surat.update({
          where: { id: counterRecord.id },
          data: { counter: { increment: 1 } }
        })

        const nomorSurat = generateNomorSurat({
          counter: updatedCounter.counter,
          jenisKode,
          scope,
          kodeProdi: scope === 'prodi' ? 'IF' : undefined
        })

        const parts = nomorSurat.split('/')
        const bulan = scope === 'fakultas' ? parts[3] : parts[3]
        const hijri = scope === 'fakultas' ? parts[4] : parts[4]
        const masehi = scope === 'fakultas' ? parts[5] : parts[5]

        await prisma.surat.create({
          data: {
            nomor_surat: nomorSurat,
            id_jenis_surat: counterRecord.id,
            id_kode_kategori: letterType.jenis_surat_link?.id,
            bulan,
            tahun_hijriah: hijri,
            tahun_masehi: masehi,
            perihal: 'Testing',
            keterangan: 'Testing surat',
            id_prodi: prodiKode,
            kode_prodi: scope === 'prodi' ? 'IF' : null,
            letter_request_id: request.id,
            created_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
          }
        })

        console.log('  OK: ' + nomorSurat)
      }
    }

    console.log('Seeding completed!')

  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

seedSuratNomor()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
