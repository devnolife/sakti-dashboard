import { prisma } from './prisma';
import { document_counter } from './generated/prisma';

/**
 * Generate document number using the counter system
 * This works for all types of documents: surat, sertifikat, etc.
 */
export async function generateDocumentNumber(params: {
  scope: 'fakultas' | 'prodi';
  prodiId?: string;
  prodiCode?: string;
  documentType: 'surat' | 'sertifikat' | 'sk' | 'berita_acara' | 'other';
  jenisSurat?: string; // A, B, C, D for surat
  tahun?: string;
}) {
  console.table("🚀 ~ generateDocumentNumber ~ params:", params)
  const { scope, prodiId, prodiCode, documentType, jenisSurat, tahun } = params;
  const currentYear = tahun || new Date().getFullYear().toString();

  // Get and increment counter
  const counter = await prisma.document_counter.upsert({
    where: {
      tahun_prodi_id_scope: {
        tahun: currentYear,
        prodi_id: scope === 'prodi' ? (prodiId || '') : '',
        scope: scope
      }
    },
    update: {
      counter: { increment: 1 }
    },
    create: {
      counter: 1,
      tahun: currentYear,
      scope: scope,
      prodi_id: scope === 'prodi' ? (prodiId || '') : ''
    }
  });

  // Format the document number based on type and scope
  const formattedCounter = String(counter.counter).padStart(3, '0');
  const month = getRomanMonth();
  const hijriYear = getHijriYear();

  let documentNumber: string;

  if (documentType === 'surat') {
    // Format: 001/A/FT-UIN/XI/1446H/2025 atau 001/A/IF-FT-UIN/XI/1446H/2025
    const jenis = jenisSurat || 'A';
    if (scope === 'fakultas') {
      documentNumber = `${formattedCounter}/${jenis}/FT-UIN/${month}/${hijriYear}/${currentYear}`;
    } else {
      const kode = prodiCode || prodiId || 'XX';
      documentNumber = `${formattedCounter}/${jenis}/${kode}-FT-UIN/${month}/${hijriYear}/${currentYear}`;
    }
  } else if (documentType === 'sertifikat') {
    // Format: CERT/001/FT-UIN/2025 atau CERT/001/IF-FT-UIN/2025
    if (scope === 'fakultas') {
      documentNumber = `CERT/${formattedCounter}/FT-UIN/${currentYear}`;
    } else {
      const kode = prodiCode || prodiId || 'XX';
      documentNumber = `CERT/${formattedCounter}/${kode}-FT-UIN/${currentYear}`;
    }
  } else if (documentType === 'sk') {
    // Format: SK/001/FT-UIN/2025 atau SK/001/IF-FT-UIN/2025
    if (scope === 'fakultas') {
      documentNumber = `SK/${formattedCounter}/FT-UIN/${currentYear}`;
    } else {
      const kode = prodiCode || prodiId || 'XX';
      documentNumber = `SK/${formattedCounter}/${kode}-FT-UIN/${currentYear}`;
    }
  } else if (documentType === 'berita_acara') {
    // Format: BA/001/FT-UIN/2025 atau BA/001/IF-FT-UIN/2025
    if (scope === 'fakultas') {
      documentNumber = `BA/${formattedCounter}/FT-UIN/${currentYear}`;
    } else {
      const kode = prodiCode || prodiId || 'XX';
      documentNumber = `BA/${formattedCounter}/${kode}-FT-UIN/${currentYear}`;
    }
  } else {
    // Generic format
    if (scope === 'fakultas') {
      documentNumber = `${formattedCounter}/FT-UIN/${currentYear}`;
    } else {
      const kode = prodiCode || prodiId || 'XX';
      documentNumber = `${formattedCounter}/${kode}-FT-UIN/${currentYear}`;
    }
  }

  return {
    documentNumber,
    counter: counter.counter,
    formattedCounter,
    counterId: counter.id,
    scope,
    prodiId: scope === 'prodi' ? prodiId : null,
    tahun: currentYear
  };
}

/**
 * Create a surat entry with auto-generated number
 */
export async function createSuratWithNumber(params: {
  scope: 'fakultas' | 'prodi';
  prodiId?: string;
  prodiCode?: string;
  jenisSurat: string;
  perihal: string;
  keterangan?: string;
  letterRequestId?: string;
  signedDocumentId?: string;
  id_instansi?: number;
  id_kode_kategori?: number;
  id_masalah_surat?: number;
}) {
  const { scope, prodiId, prodiCode, jenisSurat, perihal, keterangan, letterRequestId, signedDocumentId, id_instansi, id_kode_kategori, id_masalah_surat } = params;

  // Generate document number
  const result = await generateDocumentNumber({
    scope,
    prodiId,
    prodiCode,
    documentType: 'surat',
    jenisSurat
  });

  // Create surat entry
  const surat = await prisma.surat.create({
    data: {
      nomor_surat: result.documentNumber,
      counter_id: result.counterId,
      scope,
      id_prodi: prodiId,
      kode_prodi: prodiCode,
      bulan: getRomanMonth(),
      tahun_hijriah: getHijriYear(),
      tahun_masehi: result.tahun,
      perihal,
      keterangan,
      letter_request_id: letterRequestId,
      signed_document_id: signedDocumentId,
      id_instansi,
      id_kode_kategori,
      id_masalah_surat
    }
  });

  return {
    surat,
    documentNumber: result.documentNumber,
    counter: result.counter
  };
}

/**
 * Link signed document with counter
 */
export async function linkSignedDocumentWithCounter(params: {
  signedDocumentId: string;
  scope: 'fakultas' | 'prodi';
  prodiId?: string;
  prodiCode?: string;
  documentType?: 'surat' | 'sertifikat' | 'sk' | 'berita_acara' | 'other';
  jenisSurat?: string;
}) {
  const { signedDocumentId, scope, prodiId, prodiCode, documentType = 'surat', jenisSurat } = params;

  // Generate document number
  const result = await generateDocumentNumber({
    scope,
    prodiId,
    prodiCode,
    documentType,
    jenisSurat
  });

  // Update signed document with counter and number
  const updatedDoc = await prisma.signed_documents.update({
    where: { id: signedDocumentId },
    data: {
      counter_id: result.counterId,
      no_surat: result.documentNumber,
      scope
    }
  });

  return {
    signedDocument: updatedDoc,
    documentNumber: result.documentNumber,
    counter: result.counter
  };
}

/**
 * Get document usage statistics
 */
export async function getDocumentCounterStats(counterId: number) {
  const counter = await prisma.document_counter.findUnique({
    where: { id: counterId },
    include: {
      surat: true,
      signed_documents: true,
      _count: {
        select: {
          surat: true,
          signed_documents: true
        }
      }
    }
  });

  if (!counter) return null;

  return {
    counter: counter.counter,
    scope: counter.scope,
    prodiId: counter.prodi_id,
    tahun: counter.tahun,
    totalSurat: counter._count.surat,
    totalSignedDocuments: counter._count.signed_documents,
    totalDocuments: counter._count.surat + counter._count.signed_documents
  };
}

/**
 * Get all counters with document counts
 */
export async function getAllCountersWithStats() {
  const counters = await prisma.document_counter.findMany({
    include: {
      _count: {
        select: {
          surat: true,
          signed_documents: true
        }
      }
    },
    orderBy: [
      { scope: 'asc' },
      { prodi_id: 'asc' }
    ]
  });

  return counters.map(c => ({
    id: c.id,
    counter: c.counter,
    scope: c.scope,
    prodiId: c.prodi_id,
    tahun: c.tahun,
    totalSurat: c._count.surat,
    totalSignedDocuments: c._count.signed_documents,
    totalDocuments: c._count.surat + c._count.signed_documents
  }));
}

/**
 * Helper: Get Roman numeral for current month
 */
function getRomanMonth(): string {
  const months = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
  return months[new Date().getMonth()];
}

/**
 * Helper: Get Hijri year (simplified - would need proper calendar conversion)
 */
function getHijriYear(): string {
  const gregorianYear = new Date().getFullYear();
  // Simplified conversion (actual would need proper Hijri calendar library)
  const hijriYear = gregorianYear - 579;
  return `${hijriYear}H`;
}
