import { prisma } from './prisma';

/**
 * Get latest letter counter for all prodi and fakultas
 * Returns the last counter number for each scope
 */
export async function getLatestLetterCounters() {
  try {
    // Get all counters grouped by scope and prodi
    const counters = await prisma.document_counter.findMany({
      orderBy: [
        { scope: 'asc' },
        { prodi_id: 'asc' }
      ],
      include: {
        _count: {
          select: { surat: true }
        }
      }
    });

    // Group by fakultas and prodi
    const fakultasCounters = counters.filter(c => c.scope === 'fakultas' && c.prodi_id === '');
    const prodiCounters = counters.filter(c => c.scope === 'prodi' && c.prodi_id !== '');

    return {
      fakultas: fakultasCounters,
      prodi: prodiCounters,
      summary: {
        totalFakultasCounters: fakultasCounters.length,
        totalProdiCounters: prodiCounters.length,
        prodiList: [...new Set(prodiCounters.map(c => c.prodi_id))].filter(Boolean)
      }
    };
  } catch (error) {
    console.error('Error fetching letter counters:', error);
    throw error;
  }
}

/**
 * Get latest counter for specific prodi
 */
export async function getLatestCounterByProdi(prodiId: string, tahun?: string) {
  const currentYear = tahun || new Date().getFullYear().toString();

  const counter = await prisma.document_counter.findUnique({
    where: {
      tahun_prodi_id_scope: {
        tahun: currentYear,
        prodi_id: prodiId,
        scope: 'prodi'
      }
    }
  });

  return counter?.counter || 0;
}

/**
 * Get latest counter for fakultas
 */
export async function getLatestCounterFakultas(tahun?: string) {
  const currentYear = tahun || new Date().getFullYear().toString();

  const counter = await prisma.document_counter.findUnique({
    where: {
      tahun_prodi_id_scope: {
        tahun: currentYear,
        prodi_id: '',
        scope: 'fakultas'
      }
    }
  });

  return counter?.counter || 0;
}/**
 * Display formatted counter report
 */
export async function displayCounterReport() {
  const data = await getLatestLetterCounters();

  console.log('\n📊 LAPORAN NOMOR SURAT TERAKHIR');
  console.log('================================\n');

  // Fakultas Section
  console.log('🏛️  FAKULTAS:');
  console.log('─────────────────────────────────');
  if (data.fakultas.length === 0) {
    console.log('   Belum ada nomor surat fakultas\n');
  } else {
    data.fakultas.forEach(counter => {
      console.log(`   Counter: ${String(counter.counter).padStart(4, '0')} | Tahun: ${counter.tahun || 'N/A'} | Total Surat: ${counter._count.surat}`);
    });
    console.log('');
  }

  // Prodi Section
  console.log('🎓 PROGRAM STUDI:');
  console.log('─────────────────────────────────');

  if (data.prodi.length === 0) {
    console.log('   Belum ada nomor surat prodi\n');
  } else {
    // Group by prodi_id
    const groupedByProdi = data.prodi.reduce((acc, counter) => {
      const key = counter.prodi_id || 'Unknown';
      if (!acc[key]) acc[key] = [];
      acc[key].push(counter);
      return acc;
    }, {} as Record<string, typeof data.prodi>);

    for (const [prodiId, counters] of Object.entries(groupedByProdi)) {
      console.log(`\n   📌 Prodi: ${prodiId}`);
      counters.forEach(counter => {
        console.log(`      Counter: ${String(counter.counter).padStart(4, '0')} | Tahun: ${counter.tahun || 'N/A'} | Total Surat: ${counter._count.surat}`);
      });
    }
    console.log('');
  }

  // Summary
  console.log('📈 RINGKASAN:');
  console.log('─────────────────────────────────');
  console.log(`   Total Counter Fakultas: ${data.summary.totalFakultasCounters}`);
  console.log(`   Total Counter Prodi: ${data.summary.totalProdiCounters}`);
  console.log(`   Jumlah Prodi Aktif: ${data.summary.prodiList.length}`);
  console.log(`   Daftar Prodi: ${data.summary.prodiList.join(', ') || 'Belum ada'}`);
  console.log('');

  return data;
}

/**
 * Get next available counter number
 */
export async function getNextCounterNumber(
  scope: 'fakultas' | 'prodi',
  prodiId?: string,
  tahun?: string
) {
  const currentYear = tahun || new Date().getFullYear().toString();

  const whereClause = {
    tahun: currentYear,
    scope: scope,
    prodi_id: scope === 'prodi' ? (prodiId || '') : ''
  };

  // Find or create counter
  const counter = await prisma.document_counter.upsert({
    where: {
      tahun_prodi_id_scope: whereClause
    },
    update: {
      counter: { increment: 1 }
    },
    create: {
      ...whereClause,
      counter: 1
    }
  });

  return {
    currentCounter: counter.counter,
    formattedNumber: String(counter.counter).padStart(3, '0'),
    scope: scope,
    prodi: prodiId || null,
    tahun: currentYear
  };
}

/**
 * Example: Generate formatted letter number
 */
export function formatLetterNumber(
  counterNumber: number,
  jenisSurat: string,
  scope: 'fakultas' | 'prodi',
  prodiCode?: string,
  bulan?: string,
  tahunHijriah?: string,
  tahunMasehi?: string
) {
  const formatted = String(counterNumber).padStart(3, '0');
  const month = bulan || getRomanMonth();
  const hijri = tahunHijriah || '1446H';
  const masehi = tahunMasehi || new Date().getFullYear().toString();

  if (scope === 'fakultas') {
    // Format: 001/A/FT-UIN/XI/1446H/2025
    return `${formatted}/${jenisSurat}/FT-UIN/${month}/${hijri}/${masehi}`;
  } else {
    // Format: 001/A/IF-FT-UIN/XI/1446H/2025
    const kode = prodiCode || 'XX';
    return `${formatted}/${jenisSurat}/${kode}-FT-UIN/${month}/${hijri}/${masehi}`;
  }
}

/**
 * Helper: Get Roman numeral for current month
 */
function getRomanMonth(): string {
  const months = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
  return months[new Date().getMonth()];
}

/**
 * API Route Handler Example
 */
export async function getCounterReportAPI() {
  try {
    const data = await getLatestLetterCounters();

    return {
      success: true,
      data: {
        fakultas: data.fakultas.map(c => ({
          counter: c.counter,
          formattedCounter: String(c.counter).padStart(3, '0'),
          tahun: c.tahun,
          totalSurat: c._count.surat,
          scope: c.scope
        })),
        prodi: data.prodi.map(c => ({
          prodiId: c.prodi_id,
          counter: c.counter,
          formattedCounter: String(c.counter).padStart(3, '0'),
          tahun: c.tahun,
          totalSurat: c._count.surat,
          scope: c.scope
        })),
        summary: data.summary
      }
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
