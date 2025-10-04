const XLSX = require('xlsx');

// Generate single row test data - disesuaikan dengan perubahan terbaru
const templateData = [
  {
    "Judul Sertifikat": "Backend Developer Expert",
    "Nama Peserta": "Muhammad Rizky Firmansyah",
    "Nama Program": "Backend Development dengan NestJS",
    "Jumlah Pertemuan": 16,
    "Nilai Total": 98,
    "Jumlah Materi": 16,
    "Persentase Kehadiran": 100,
    "Penyelesaian Tugas": 100,
    "Skor Partisipasi": 98,
    "Nilai Akhir": "A+",
    
    // Mata Kuliah (4 mata kuliah)
    "Mata Kuliah 1": "NestJS Fundamentals",
    "Nilai MK1": "A+",
    "Skor MK1": 98,
    "Mata Kuliah 2": "Database Design & ORM",
    "Nilai MK2": "A+",
    "Skor MK2": 97,
    "Mata Kuliah 3": "RESTful API Development",
    "Nilai MK3": "A+",
    "Skor MK3": 99,
    "Mata Kuliah 4": "Microservices Architecture",
    "Nilai MK4": "A",
    "Skor MK4": 95,
    
    // Kompetensi (tanpa level) - hanya nama dan nilai
    "Kompetensi 1": "TypeScript & Node.js",
    "Nilai Kompetensi 1": 45,
    "Kompetensi 2": "Database Management",
    "Nilai Kompetensi 2": 42,
    "Kompetensi 3": "API Development",
    "Nilai Kompetensi 3": 40,
    "Kompetensi 4": "Testing & Debugging",
    "Nilai Kompetensi 4": 38,
    "Kompetensi 5": "Security Best Practices",
    "Nilai Kompetensi 5": 35,
    "Kompetensi 6": "DevOps & Deployment",
    "Nilai Kompetensi 6": 30,
    
    // Analytics
    "Kecepatan Belajar": 95,
    "Skor Kolaborasi": 92,
    "Efisiensi Pemecahan Masalah": 98,
    
    // Data Mingguan (10 minggu)
    "Minggu 1": 60,
    "Minggu 2": 65,
    "Minggu 3": 70,
    "Minggu 4": 75,
    "Minggu 5": 72,
    "Minggu 6": 78,
    "Minggu 7": 80,
    "Minggu 8": 82,
    "Minggu 9": 85,
    "Minggu 10": 88,
    
    // Teknologi (4 teknologi)
    "Teknologi 1": "NestJS",
    "Teknologi 2": "TypeORM",
    "Teknologi 3": "PostgreSQL",
    "Teknologi 4": "Redis"
    
    // REMOVED: Catatan Instruktur
    // REMOVED: Rekomendasi 1-3
    // REMOVED: Level Kompetensi 1-6
  }
];

// Create workbook and worksheet
const wb = XLSX.utils.book_new();
const ws = XLSX.utils.json_to_sheet(templateData);

// Set column widths for better readability
const colWidths = [
  { wch: 25 }, // Judul Sertifikat
  { wch: 30 }, // Nama Peserta
  { wch: 40 }, // Nama Program (lebih lebar)
  
  // Stats columns
  { wch: 18 }, // Jumlah Pertemuan
  { wch: 15 }, // Nilai Total
  { wch: 15 }, // Jumlah Materi
  { wch: 20 }, // Persentase Kehadiran
  { wch: 20 }, // Penyelesaian Tugas
  { wch: 18 }, // Skor Partisipasi
  { wch: 12 }, // Nilai Akhir
  
  // Mata Kuliah columns (4 x 3 columns)
  { wch: 30 }, { wch: 12 }, { wch: 12 },
  { wch: 30 }, { wch: 12 }, { wch: 12 },
  { wch: 30 }, { wch: 12 }, { wch: 12 },
  { wch: 30 }, { wch: 12 }, { wch: 12 },
  
  // Kompetensi columns (6 x 2 columns - tanpa level)
  { wch: 30 }, { wch: 20 },
  { wch: 30 }, { wch: 20 },
  { wch: 30 }, { wch: 20 },
  { wch: 30 }, { wch: 20 },
  { wch: 30 }, { wch: 20 },
  { wch: 30 }, { wch: 20 },
  
  // Analytics
  { wch: 20 }, // Kecepatan Belajar
  { wch: 20 }, // Skor Kolaborasi
  { wch: 30 }, // Efisiensi Pemecahan Masalah
  
  // Weekly data (10 weeks)
  { wch: 12 }, { wch: 12 }, { wch: 12 }, { wch: 12 }, { wch: 12 },
  { wch: 12 }, { wch: 12 }, { wch: 12 }, { wch: 12 }, { wch: 12 },
  
  // Technologies (4 columns)
  { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }
];

ws['!cols'] = colWidths;

// Add the main data worksheet
XLSX.utils.book_append_sheet(wb, ws, "Data Sertifikat");

// Add instruction sheet
const instructionData = [
  { "PETUNJUK PENGISIAN TEMPLATE SERTIFIKAT LABORATORIUM": "" },
  { "": "" },
  { "VERSION: 2.0 - UPDATED TEMPLATE": "" },
  { "": "" },
  { "⚠️ PERUBAHAN PENTING:": "" },
  { "• Subjudul otomatis digenerate oleh sistem": "" },
  { "• Kolom 'Level Kompetensi' telah dihapus": "" },
  { "• Kolom 'Catatan Instruktur' telah dihapus": "" },
  { "• Kolom 'Rekomendasi' telah dihapus": "" },
  { "": "" },
  { "📋 INFORMASI OTOMATIS DARI SISTEM:": "" },
  { "1. Subjudul Sertifikat:": "" },
  { "   Depan: 'Telah berhasil menyelesaikan Laboratorium [Nama Program] yang mencakup teori, praktik, serta pengembangan kemampuan sesuai bidang keahlian.'": "" },
  { "   Belakang: 'Atas keberhasilan menyelesaikan Laboratorium [Nama Program]'": "" },
  { "2. Tanggal Terbit: Otomatis menggunakan tanggal saat upload": "" },
  { "3. ID Verifikasi: Otomatis digenerate oleh sistem": "" },
  { "": "" },
  { "📊 PENJELASAN KOLOM DATA:": "" },
  { "": "" },
  { "KOLOM": "KETERANGAN", "FORMAT/CONTOH": "" },
  { "---": "---", "---": "" },
  { "": "" },
  { "DATA UTAMA:": "" },
  { "Judul Sertifikat": "Judul besar yang ditampilkan di sertifikat", "Backend Developer Expert": "" },
  { "Nama Peserta": "Nama lengkap peserta program", "Muhammad Rizky Firmansyah": "" },
  { "Nama Program": "Nama program laboratorium", "Backend Development dengan NestJS": "" },
  { "": "" },
  { "STATISTIK PEMBELAJARAN:": "" },
  { "Jumlah Pertemuan": "Total pertemuan program", "16": "" },
  { "Nilai Total": "Nilai keseluruhan (0-100)", "98": "" },
  { "Jumlah Materi": "Total materi yang dipelajari", "16": "" },
  { "Persentase Kehadiran": "Tingkat kehadiran (0-100)", "100": "" },
  { "Penyelesaian Tugas": "Persentase tugas selesai (0-100)", "100": "" },
  { "Skor Partisipasi": "Tingkat partisipasi (0-100)", "98": "" },
  { "Nilai Akhir": "Grade akhir peserta", "A+, A, A-, B+, B, B-, C": "" },
  { "": "" },
  { "MATA KULIAH (4 Mata Kuliah):": "" },
  { "Mata Kuliah 1-4": "Nama mata kuliah", "NestJS Fundamentals": "" },
  { "Nilai MK1-4": "Grade untuk mata kuliah", "A+, A, A-, B+, B": "" },
  { "Skor MK1-4": "Skor numerik (0-100)", "98": "" },
  { "": "" },
  { "KOMPETENSI (6 Kompetensi):": "" },
  { "Kompetensi 1-6": "Nama kompetensi yang dikuasai", "TypeScript & Node.js": "" },
  { "Nilai Kompetensi 1-6": "Tingkat penguasaan (0-100)", "45": "" },
  { "": "" },
  { "ANALITIK PEMBELAJARAN:": "" },
  { "Kecepatan Belajar": "Learning velocity (0-100)", "95": "" },
  { "Skor Kolaborasi": "Kemampuan kerja tim (0-100)", "92": "" },
  { "Efisiensi Pemecahan Masalah": "Problem solving (0-100)", "98": "" },
  { "": "" },
  { "DATA PROGRESS MINGGUAN:": "" },
  { "Minggu 1-10": "Progress per minggu (0-100)", "60, 65, 70, dst": "" },
  { "": "" },
  { "TEKNOLOGI:": "" },
  { "Teknologi 1-4": "Tools/framework yang dipelajari", "NestJS, TypeORM, PostgreSQL, Redis": "" },
  { "": "" },
  { "💡 TIPS PENGISIAN:": "" },
  { "• Pastikan semua kolom numerik berisi angka valid": "" },
  { "• Grade menggunakan format: A+, A, A-, B+, B, B-, C": "" },
  { "• Nilai kompetensi adalah persentase (0-100)": "" },
  { "• Data mingguan menunjukkan progress pembelajaran": "" },
  { "• Biarkan kosong jika data tidak tersedia (akan menggunakan default)": "" }
];

const wsInstruction = XLSX.utils.json_to_sheet(instructionData);
wsInstruction['!cols'] = [{ wch: 50 }, { wch: 60 }, { wch: 40 }];
XLSX.utils.book_append_sheet(wb, wsInstruction, "Petunjuk");

// Write the file
const fileName = 'template-certificate-final.xlsx';
XLSX.writeFile(wb, fileName);

console.log('✅ Template Excel FINAL berhasil dibuat!');
console.log(`📁 File: ${fileName}`);
console.log('\n📊 RINGKASAN PERUBAHAN:');
console.log('=====================================');
console.log('REMOVED:');
console.log('  ❌ Kolom Subjudul');
console.log('  ❌ Kolom Catatan Instruktur');
console.log('  ❌ Kolom Rekomendasi 1-3');
console.log('  ❌ Kolom Level Kompetensi 1-6');
console.log('\nKEPT:');
console.log('  ✅ Kompetensi (nama & nilai saja)');
console.log('  ✅ Semua data statistik');
console.log('  ✅ Mata kuliah dengan nilai');
console.log('  ✅ Data analytics & mingguan');
console.log('  ✅ Teknologi yang dipelajari');
console.log('\nAUTO-GENERATED:');
console.log('  🔄 Subjudul (template universal)');
console.log('  🔄 Tanggal terbit');
console.log('  🔄 ID Verifikasi');
console.log('=====================================');
console.log('\n📝 Detail Data Test:');
console.log(`Nama: ${templateData[0]["Nama Peserta"]}`);
console.log(`Program: ${templateData[0]["Nama Program"]}`);
console.log(`Nilai: ${templateData[0]["Nilai Akhir"]} (${templateData[0]["Nilai Total"]})`);
console.log(`Kehadiran: ${templateData[0]["Persentase Kehadiran"]}%`);
console.log('\n💡 File ini siap untuk testing sistem generate sertifikat!');
