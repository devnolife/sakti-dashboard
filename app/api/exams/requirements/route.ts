import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const examType = searchParams.get('type')

    if (!examType || !['proposal', 'result', 'closing'].includes(examType)) {
      return NextResponse.json(
        { error: 'Invalid exam type' },
        { status: 400 }
      )
    }

    // Mock requirements data - In production, this would come from database
    const requirementsData = {
      proposal: [
        {
          id: "req-1",
          title: "Pembayaran BPP",
          description: "Bukti pembayaran Biaya Penyelenggaraan Pendidikan",
          completed: false,
          order: 1
        },
        {
          id: "req-2", 
          title: "Biaya Komprehensif",
          description: "Bukti pembayaran biaya ujian komprehensif",
          completed: false,
          order: 2
        },
        {
          id: "req-3",
          title: "Surat SK Pembimbing", 
          description: "Surat Keputusan penunjukan pembimbing skripsi",
          completed: false,
          order: 3
        },
        {
          id: "req-4",
          title: "Surat Keterangan Penyelesaian Laporan KKP",
          description: "Surat keterangan telah menyelesaikan laporan KKP", 
          completed: false,
          order: 4
        },
        {
          id: "req-5",
          title: "Transkrip Nilai minimal 145 SKS",
          description: "Transkrip nilai yang menunjukkan minimal 145 SKS telah diselesaikan",
          completed: false,
          order: 5
        },
        {
          id: "req-6",
          title: "Praktikum Ilmu Falaq",
          description: "Sertifikat atau bukti telah menyelesaikan praktikum Ilmu Falaq",
          completed: false,
          order: 6
        },
        {
          id: "req-7",
          title: "Surat Pernyataan Publikasi Produk",
          description: "Surat pernyataan kesediaan publikasi produk penelitian",
          completed: false,
          order: 7
        },
        {
          id: "req-8",
          title: "Bukti Publish Produk",
          description: "Bukti publikasi atau rencana publikasi produk penelitian",
          completed: false,
          order: 8
        },
        {
          id: "req-9",
          title: "Surat Keterangan Baca Al-Qur'an",
          description: "Surat keterangan kemampuan membaca Al-Qur'an dengan baik",
          completed: false,
          order: 9
        },
        {
          id: "req-10",
          title: "Sertifikat DAD",
          description: "Sertifikat Dauroh Arabiyah Diniyah (DAD)",
          completed: false,
          order: 10
        },
        {
          id: "req-11",
          title: "Uji Plagiat Skripsi",
          description: "Hasil uji plagiat skripsi dengan tingkat similarity yang acceptable",
          completed: false,
          order: 11
        },
        {
          id: "req-12",
          title: "Kartu Kontrol Mengikuti Seminar minimal 10 kali",
          description: "Kartu kontrol kehadiran seminar akademik minimal 10 kali",
          completed: false,
          order: 12
        },
        {
          id: "req-13",
          title: "Persetujuan Pembimbing 1 & 2",
          description: "Form persetujuan dari pembimbing 1 dan pembimbing 2",
          completed: false,
          order: 13
        }
      ],
      result: [
        {
          id: "result-req-1",
          title: "Pembayaran BPP",
          description: "Bukti pembayaran Biaya Penyelenggaraan Pendidikan",
          completed: false,
          order: 1
        },
        {
          id: "result-req-2",
          title: "Biaya Ujian Seminar (WD2)",
          description: "Bukti pembayaran biaya ujian seminar ke WD2",
          completed: false,
          order: 2
        },
        {
          id: "result-req-3",
          title: "Transkrip Nilai",
          description: "Transkrip nilai terbaru",
          completed: false,
          order: 3
        },
        {
          id: "result-req-4",
          title: "Sertifikat Praktikum",
          description: "Sertifikat penyelesaian seluruh praktikum yang dipersyaratkan",
          completed: false,
          order: 4
        },
        {
          id: "result-req-5",
          title: "Uji Plagiat Skripsi",
          description: "Hasil uji plagiat skripsi versi terbaru",
          completed: false,
          order: 5
        },
        {
          id: "result-req-6",
          title: "Persetujuan Pembimbing 1 & 2",
          description: "Form persetujuan ujian hasil dari pembimbing 1 dan pembimbing 2",
          completed: false,
          order: 6
        },
        {
          id: "result-req-7",
          title: "Skripsi Jilid 6 Rangkap",
          description: "Skripsi yang telah dijilid sebanyak 6 rangkap",
          completed: false,
          order: 7
        }
      ],
      closing: [
        {
          id: "closing-req-1",
          title: "Pembayaran BPP",
          description: "Bukti pembayaran Biaya Penyelenggaraan Pendidikan",
          completed: false,
          order: 1
        },
        {
          id: "closing-req-2",
          title: "Pembayaran Ujian",
          description: "Bukti pembayaran biaya ujian tertutup",
          completed: false,
          order: 2
        },
        {
          id: "closing-req-3",
          title: "Biaya Tambahan ke WD2",
          description: "Bukti pembayaran biaya tambahan ke Wakil Dekan 2",
          completed: false,
          order: 3
        },
        {
          id: "closing-req-4",
          title: "Pembayaran Wisuda & Perpustakaan",
          description: "Bukti pembayaran biaya wisuda dan perpustakaan",
          completed: false,
          order: 4
        },
        {
          id: "closing-req-5",
          title: "Uji Plagiat",
          description: "Hasil uji plagiat final dengan tingkat similarity yang memenuhi standar",
          completed: false,
          order: 5
        },
        {
          id: "closing-req-6",
          title: "Persetujuan Pembimbing 1 & 2",
          description: "Form persetujuan ujian tertutup dari pembimbing 1 dan pembimbing 2",
          completed: false,
          order: 6
        },
        {
          id: "closing-req-7",
          title: "Skripsi Jilid 1 Rangkap",
          description: "Skripsi final yang telah dijilid 1 rangkap untuk perpustakaan",
          completed: false,
          order: 7
        },
        {
          id: "closing-req-8",
          title: "Berkas LoA Submit Jurnal",
          description: "Letter of Acceptance (LoA) atau bukti submit artikel ke jurnal",
          completed: false,
          order: 8
        },
        {
          id: "closing-req-9",
          title: "Transkrip Nilai minimal 150 SKS",
          description: "Transkrip nilai final dengan minimal 150 SKS",
          completed: false,
          order: 9
        },
        {
          id: "closing-req-10",
          title: "Berkas Persyaratan Yudisium",
          description: "Kelengkapan berkas persyaratan untuk yudisium",
          completed: false,
          order: 10
        }
      ]
    }

    const requirements = requirementsData[examType as keyof typeof requirementsData]

    return NextResponse.json({
      success: true,
      data: {
        examType,
        requirements: requirements || []
      }
    })

  } catch (error) {
    console.error('Requirements API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch requirements' },
      { status: 500 }
    )
  }
}
