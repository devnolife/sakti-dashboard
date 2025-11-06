import { PrismaClient } from '@/lib/generated/prisma'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

interface RekomendasiJudulData {
  judul: string
  deskripsi: string
  bidang_keilmuan: string
  metodologi: string
  tingkat_kesulitan: 'Mudah' | 'Sedang' | 'Sulit'
  estimasi_waktu: string
  prerequisites: string[]
  prodi_kode: string
  dosen_nidn: string // NIDN dosen yang membuat rekomendasi
}

// Data rekomendasi judul per prodi
const rekomendasiJudulData: RekomendasiJudulData[] = [
  // ===== INFORMATIKA (55202) =====
  {
    judul: "Analisis Sentimen Media Sosial Menggunakan Machine Learning",
    deskripsi: "Penelitian untuk menganalisis sentimen positif/negatif dari data media sosial Twitter menggunakan algoritma machine learning seperti Naive Bayes, SVM, atau Deep Learning.",
    bidang_keilmuan: "Data Science",
    metodologi: "Eksperimental",
    tingkat_kesulitan: "Sedang",
    estimasi_waktu: "4-6 bulan",
    prerequisites: ["Python", "Machine Learning", "Text Processing", "Natural Language Processing"],
    prodi_kode: "55202",
    dosen_nidn: "0905078907" // RIZKI YUSLIANA BAKTI
  },
  {
    judul: "Sistem Rekomendasi Produk E-Commerce Berbasis Collaborative Filtering",
    deskripsi: "Pengembangan sistem rekomendasi untuk meningkatkan penjualan e-commerce dengan menganalisis pola pembelian dan preferensi pengguna menggunakan collaborative filtering.",
    bidang_keilmuan: "Artificial Intelligence",
    metodologi: "Prototype",
    tingkat_kesulitan: "Sedang",
    estimasi_waktu: "4-5 bulan",
    prerequisites: ["Python", "Recommendation System", "Database", "Web Development"],
    prodi_kode: "55202",
    dosen_nidn: "0903058406" // TITIN WAHYUNI
  },
  {
    judul: "Deteksi Penyakit Tanaman Menggunakan Convolutional Neural Network (CNN)",
    deskripsi: "Implementasi deep learning untuk mendeteksi dan mengklasifikasi penyakit pada tanaman berdasarkan citra daun menggunakan arsitektur CNN seperti ResNet atau MobileNet.",
    bidang_keilmuan: "Computer Vision",
    metodologi: "Eksperimental",
    tingkat_kesulitan: "Sulit",
    estimasi_waktu: "5-7 bulan",
    prerequisites: ["Python", "Deep Learning", "Computer Vision", "TensorFlow/PyTorch"],
    prodi_kode: "55202",
    dosen_nidn: "0917109102" // LUKMAN ANAS
  },
  {
    judul: "Aplikasi Mobile Monitoring Kesehatan Berbasis IoT",
    deskripsi: "Pengembangan aplikasi mobile untuk monitoring kesehatan real-time menggunakan sensor IoT seperti heart rate, temperature, dan blood pressure dengan integrasi cloud.",
    bidang_keilmuan: "Mobile Development",
    metodologi: "Prototype",
    tingkat_kesulitan: "Sedang",
    estimasi_waktu: "4-6 bulan",
    prerequisites: ["Flutter/React Native", "IoT", "Firebase", "REST API"],
    prodi_kode: "55202",
    dosen_nidn: "0916088803" // FAHRIM IRHAMNAH RACHMAN
  },
  {
    judul: "Sistem Informasi Manajemen Perpustakaan Berbasis Web dengan Barcode Scanner",
    deskripsi: "Pengembangan sistem perpustakaan digital dengan fitur katalog online, peminjaman, pengembalian otomatis, dan integrasi barcode scanner untuk efisiensi operasional.",
    bidang_keilmuan: "Sistem Informasi",
    metodologi: "Prototype",
    tingkat_kesulitan: "Mudah",
    estimasi_waktu: "3-4 bulan",
    prerequisites: ["PHP/Laravel", "MySQL", "Web Development", "Bootstrap"],
    prodi_kode: "55202",
    dosen_nidn: "0931087901" // MUHYIDDIN
  },
  {
    judul: "Implementasi Blockchain untuk Supply Chain Management",
    deskripsi: "Penelitian implementasi teknologi blockchain untuk meningkatkan transparansi, traceability, dan keamanan dalam supply chain management dengan smart contracts.",
    bidang_keilmuan: "Blockchain",
    metodologi: "Eksperimental",
    tingkat_kesulitan: "Sulit",
    estimasi_waktu: "6-8 bulan",
    prerequisites: ["Blockchain", "Smart Contracts", "Solidity", "Node.js", "Web3.js"],
    prodi_kode: "55202",
    dosen_nidn: "0930048304" // MUHAMMAD FAISAL
  },
  {
    judul: "Chatbot Customer Service Menggunakan Natural Language Processing",
    deskripsi: "Pengembangan chatbot cerdas untuk customer service yang dapat memahami pertanyaan pengguna dan memberikan respon yang relevan menggunakan NLP dan deep learning.",
    bidang_keilmuan: "Natural Language Processing",
    metodologi: "Prototype",
    tingkat_kesulitan: "Sedang",
    estimasi_waktu: "4-6 bulan",
    prerequisites: ["Python", "NLP", "NLTK/spaCy", "Rasa/Dialogflow", "Machine Learning"],
    prodi_kode: "55202",
    dosen_nidn: "0431037702" // CHYQUITHA DANUPUTRI
  },
  {
    judul: "Sistem Keamanan Jaringan Menggunakan Intrusion Detection System (IDS)",
    deskripsi: "Implementasi IDS untuk mendeteksi dan mencegah serangan cyber pada jaringan komputer menggunakan machine learning untuk analisis anomali traffic.",
    bidang_keilmuan: "Cybersecurity",
    metodologi: "Eksperimental",
    tingkat_kesulitan: "Sulit",
    estimasi_waktu: "5-7 bulan",
    prerequisites: ["Network Security", "Python", "Machine Learning", "Wireshark", "Linux"],
    prodi_kode: "55202",
    dosen_nidn: "0921098306" // LUKMAN
  },

  // ===== TEKNIK ELEKTRO (55201) =====
  {
    judul: "Smart Home System Berbasis IoT dengan Kontrol Suara",
    deskripsi: "Perancangan sistem smart home yang dapat dikontrol melalui perintah suara menggunakan Google Assistant atau Alexa dengan integrasi sensor dan aktuator IoT.",
    bidang_keilmuan: "IoT",
    metodologi: "Prototype",
    tingkat_kesulitan: "Sedang",
    estimasi_waktu: "4-5 bulan",
    prerequisites: ["Arduino/ESP32", "IoT", "Sensor & Aktuator", "Google Assistant API", "MQTT"],
    prodi_kode: "55201",
    dosen_nidn: "0903068203" // RAHMANIA
  },
  {
    judul: "Sistem Monitoring Energi Listrik Real-time Berbasis IoT",
    deskripsi: "Pengembangan sistem monitoring konsumsi energi listrik secara real-time dengan visualisasi data dan notifikasi penggunaan berlebih menggunakan platform IoT.",
    bidang_keilmuan: "IoT",
    metodologi: "Prototype",
    tingkat_kesulitan: "Sedang",
    estimasi_waktu: "4-6 bulan",
    prerequisites: ["Arduino/ESP32", "Sensor Arus", "IoT Platform", "Web Development", "Database"],
    prodi_kode: "55201",
    dosen_nidn: "0030106704" // ANDI FAHARUDDIN
  },
  {
    judul: "Desain dan Implementasi Solar Panel Tracking System",
    deskripsi: "Perancangan sistem tracking otomatis untuk panel surya yang dapat mengikuti posisi matahari untuk memaksimalkan efisiensi energi menggunakan mikrokontroler.",
    bidang_keilmuan: "Energi Terbarukan",
    metodologi: "Prototype",
    tingkat_kesulitan: "Sedang",
    estimasi_waktu: "5-6 bulan",
    prerequisites: ["Mikrokontroler", "Sensor LDR", "Motor Servo", "Elektronika Daya", "Solar Panel"],
    prodi_kode: "55201",
    dosen_nidn: "0907118201" // ADRIANI
  },
  {
    judul: "Sistem Kontrol Otomatis Greenhouse Pertanian Berbasis Fuzzy Logic",
    deskripsi: "Implementasi fuzzy logic controller untuk mengatur suhu, kelembaban, dan penyiraman otomatis pada greenhouse pertanian modern dengan monitoring berbasis IoT.",
    bidang_keilmuan: "Kontrol Otomatis",
    metodologi: "Eksperimental",
    tingkat_kesulitan: "Sulit",
    estimasi_waktu: "5-7 bulan",
    prerequisites: ["Fuzzy Logic", "Mikrokontroler", "Sensor DHT", "Relay", "Kontrol Otomatis"],
    prodi_kode: "55201",
    dosen_nidn: "0927097401" // ANDI ABD. HALIK LATEKO
  },
  {
    judul: "Prototype Robot Line Follower dengan Obstacle Avoidance",
    deskripsi: "Perancangan robot mobile yang dapat mengikuti garis dan menghindari halangan secara otomatis menggunakan sensor infrared dan ultrasonic.",
    bidang_keilmuan: "Robotika",
    metodologi: "Prototype",
    tingkat_kesulitan: "Mudah",
    estimasi_waktu: "3-4 bulan",
    prerequisites: ["Arduino", "Sensor IR", "Sensor Ultrasonic", "Motor DC", "Elektronika Dasar"],
    prodi_kode: "55201",
    dosen_nidn: "0918056902" // ANTARISSUBHI
  },

  // ===== ARSITEKTUR (55203) =====
  {
    judul: "Desain Bangunan Hemat Energi dengan Konsep Green Architecture",
    deskripsi: "Perancangan bangunan ramah lingkungan yang mengoptimalkan pencahayaan alami, ventilasi, dan penggunaan material berkelanjutan untuk mengurangi konsumsi energi.",
    bidang_keilmuan: "Green Architecture",
    metodologi: "Studi Kasus",
    tingkat_kesulitan: "Sedang",
    estimasi_waktu: "4-5 bulan",
    prerequisites: ["AutoCAD", "SketchUp", "Ecotect", "Energi & Bangunan", "Material Berkelanjutan"],
    prodi_kode: "55203",
    dosen_nidn: "0927098403" // CITRA AMALIA AMAL
  },
  {
    judul: "Revitalisasi Kawasan Bersejarah dengan Pendekatan Heritage Conservation",
    deskripsi: "Studi dan desain revitalisasi kawasan bersejarah dengan mempertahankan nilai heritage sambil mengakomodasi fungsi kontemporer untuk pariwisata budaya.",
    bidang_keilmuan: "Heritage Conservation",
    metodologi: "Studi Kasus",
    tingkat_kesulitan: "Sedang",
    estimasi_waktu: "5-6 bulan",
    prerequisites: ["Sejarah Arsitektur", "Konservasi Bangunan", "Urban Design", "Dokumentasi Heritage"],
    prodi_kode: "55203",
    dosen_nidn: "0907017301" // ROHANA
  },
  {
    judul: "Implementasi Building Information Modeling (BIM) pada Proyek Konstruksi",
    deskripsi: "Studi implementasi teknologi BIM untuk meningkatkan efisiensi perencanaan, koordinasi, dan manajemen proyek konstruksi gedung bertingkat.",
    bidang_keilmuan: "Building Information Modeling",
    metodologi: "Studi Kasus",
    tingkat_kesulitan: "Sulit",
    estimasi_waktu: "5-7 bulan",
    prerequisites: ["Revit", "BIM Concept", "Manajemen Konstruksi", "3D Modeling", "Navisworks"],
    prodi_kode: "55203",
    dosen_nidn: "0929068304" // ANDI ANNISA AMALIA
  },
  {
    judul: "Desain Ruang Publik Inklusif untuk Penyandang Disabilitas",
    deskripsi: "Perancangan ruang publik yang accessible dan inklusif untuk semua kalangan termasuk penyandang disabilitas dengan menerapkan prinsip universal design.",
    bidang_keilmuan: "Universal Design",
    metodologi: "Studi Kasus",
    tingkat_kesulitan: "Sedang",
    estimasi_waktu: "4-5 bulan",
    prerequisites: ["Universal Design", "Accessibility", "Urban Design", "Regulasi Bangunan"],
    prodi_kode: "55203",
    dosen_nidn: "0922108804" // SITI FUADILLAH ALHUMAIRAH AMIN
  },

  // ===== TEKNIK SIPIL (55204) =====
  {
    judul: "Analisis Kekuatan Struktur Jembatan Menggunakan Metode Elemen Hingga",
    deskripsi: "Studi analisis struktural jembatan dengan simulasi beban menggunakan software SAP2000 atau ETABS untuk mengevaluasi kekuatan dan defleksi struktur.",
    bidang_keilmuan: "Struktur",
    metodologi: "Eksperimental",
    tingkat_kesulitan: "Sulit",
    estimasi_waktu: "5-6 bulan",
    prerequisites: ["Analisis Struktur", "SAP2000/ETABS", "Mekanika Bahan", "Metode Elemen Hingga"],
    prodi_kode: "55204",
    dosen_nidn: "0930047504" // FAUZAN HAMDI
  },
  {
    judul: "Studi Kelayakan Penggunaan Material Beton Ramah Lingkungan",
    deskripsi: "Penelitian eksperimental terhadap kekuatan dan durabilitas beton dengan campuran material alternatif seperti fly ash atau bottom ash untuk konstruksi berkelanjutan.",
    bidang_keilmuan: "Material Konstruksi",
    metodologi: "Eksperimental",
    tingkat_kesulitan: "Sedang",
    estimasi_waktu: "5-7 bulan",
    prerequisites: ["Teknologi Beton", "Laboratorium Material", "Mix Design", "Testing Material"],
    prodi_kode: "55204",
    dosen_nidn: "0916036801" // NENNY
  },
  {
    judul: "Sistem Manajemen Proyek Konstruksi Berbasis Web",
    deskripsi: "Pengembangan aplikasi web untuk manajemen proyek konstruksi dengan fitur scheduling, budgeting, progress tracking, dan dokumentasi terintegrasi.",
    bidang_keilmuan: "Manajemen Konstruksi",
    metodologi: "Prototype",
    tingkat_kesulitan: "Sedang",
    estimasi_waktu: "4-6 bulan",
    prerequisites: ["Manajemen Proyek", "Web Development", "Database", "Microsoft Project"],
    prodi_kode: "55204",
    dosen_nidn: "0904126802" // HAMZAH AL-IMRAN
  },
  {
    judul: "Analisis Drainase Perkotaan untuk Mitigasi Banjir",
    deskripsi: "Studi sistem drainase kota dengan simulasi hidrologi untuk mengidentifikasi area rawan banjir dan merancang solusi mitigasi yang efektif.",
    bidang_keilmuan: "Hidrologi",
    metodologi: "Studi Kasus",
    tingkat_kesulitan: "Sedang",
    estimasi_waktu: "4-5 bulan",
    prerequisites: ["Hidrologi", "Drainase", "HEC-RAS", "GIS", "Manajemen Banjir"],
    prodi_kode: "55204",
    dosen_nidn: "0923048801" // FATRIADY MR
  },
  {
    judul: "Perencanaan Geometrik Jalan Raya Sesuai Standar Nasional",
    deskripsi: "Perancangan geometrik jalan raya dengan mempertimbangkan topografi, volume lalu lintas, dan standar keselamatan berdasarkan regulasi yang berlaku.",
    bidang_keilmuan: "Transportasi",
    metodologi: "Studi Kasus",
    tingkat_kesulitan: "Sedang",
    estimasi_waktu: "4-5 bulan",
    prerequisites: ["Geometrik Jalan", "AutoCAD Civil 3D", "Survei", "Standar Jalan"],
    prodi_kode: "55204",
    dosen_nidn: "0912087505" // M. AGUSALIM
  },

  // ===== PERENCANAAN WILAYAH DAN KOTA (55205) =====
  {
    judul: "Analisis Daya Dukung Lahan untuk Pengembangan Kawasan Permukiman",
    deskripsi: "Studi analisis kapasitas daya dukung lahan dengan mempertimbangkan aspek fisik, lingkungan, dan sosial untuk merencanakan pengembangan permukiman berkelanjutan.",
    bidang_keilmuan: "Perencanaan Wilayah",
    metodologi: "Studi Kasus",
    tingkat_kesulitan: "Sedang",
    estimasi_waktu: "4-6 bulan",
    prerequisites: ["Perencanaan Wilayah", "GIS", "Analisis Spasial", "Daya Dukung Lingkungan"],
    prodi_kode: "55205",
    dosen_nidn: "0926048906" // NINI APRIANI RUMATA
  },
  {
    judul: "Perencanaan Sistem Transportasi Publik Terintegrasi di Kota Makassar",
    deskripsi: "Studi perencanaan transportasi publik yang terintegrasi dengan analisis demand, pemilihan moda, dan perancangan rute untuk meningkatkan aksesibilitas.",
    bidang_keilmuan: "Transportasi Kota",
    metodologi: "Studi Kasus",
    tingkat_kesulitan: "Sedang",
    estimasi_waktu: "5-6 bulan",
    prerequisites: ["Transportasi", "Perencanaan Kota", "Survey Demand", "GIS", "Pemodelan Transportasi"],
    prodi_kode: "55205",
    dosen_nidn: "0919067904" // INDRIYANTI
  },
  {
    judul: "Pengembangan Smart City Concept untuk Kota Berkelanjutan",
    deskripsi: "Penelitian konsep smart city dengan integrasi teknologi IoT, big data, dan e-government untuk meningkatkan kualitas hidup perkotaan yang berkelanjutan.",
    bidang_keilmuan: "Smart City",
    metodologi: "Studi Kasus",
    tingkat_kesulitan: "Sulit",
    estimasi_waktu: "5-7 bulan",
    prerequisites: ["Smart City", "IoT", "Urban Planning", "E-Government", "Big Data"],
    prodi_kode: "55205",
    dosen_nidn: "0014017902" // ASNITA VIRLAYANI
  },
  {
    judul: "Strategi Pengembangan Ruang Terbuka Hijau (RTH) Perkotaan",
    deskripsi: "Perencanaan dan strategi pengembangan RTH untuk meningkatkan kualitas lingkungan, estetika kota, dan penyediaan ruang publik yang berkualitas.",
    bidang_keilmuan: "Perencanaan Kota",
    metodologi: "Studi Kasus",
    tingkat_kesulitan: "Sedang",
    estimasi_waktu: "4-5 bulan",
    prerequisites: ["Perencanaan Kota", "Landscape", "GIS", "Ekologi Kota", "Standar RTH"],
    prodi_kode: "55205",
    dosen_nidn: "0919046801" // FARIDA G
  },
  {
    judul: "Analisis Perubahan Penggunaan Lahan dengan Remote Sensing dan GIS",
    deskripsi: "Studi perubahan penggunaan lahan menggunakan citra satelit dan teknologi GIS untuk evaluasi perkembangan wilayah dan perencanaan tata ruang.",
    bidang_keilmuan: "Remote Sensing & GIS",
    metodologi: "Studi Kasus",
    tingkat_kesulitan: "Sedang",
    estimasi_waktu: "4-6 bulan",
    prerequisites: ["Remote Sensing", "GIS", "Citra Satelit", "QGIS/ArcGIS", "Analisis Spasial"],
    prodi_kode: "55205",
    dosen_nidn: "0916036401" // ISRAIL
  },
  {
    judul: "Perencanaan Kawasan Wisata Berbasis Community-Based Tourism",
    deskripsi: "Pengembangan konsep perencanaan kawasan wisata yang melibatkan masyarakat lokal untuk keberlanjutan ekonomi dan pelestarian budaya.",
    bidang_keilmuan: "Pariwisata",
    metodologi: "Studi Kasus",
    tingkat_kesulitan: "Sedang",
    estimasi_waktu: "4-5 bulan",
    prerequisites: ["Perencanaan Pariwisata", "Community Development", "Ekonomi Lokal", "Participatory Planning"],
    prodi_kode: "55205",
    dosen_nidn: "0916108605" // FATHURRAHMAN BURHANUDDIN
  }
]

async function seedRekomendasiJudul() {
  console.log('🌱 Seeding Rekomendasi Judul Penelitian...')

  try {
    // Get all lecturers from the database with user info
    const lecturers = await prisma.lecturers.findMany({
      select: {
        id: true,
        nip: true,
        prodi_id: true,
        users: {
          select: {
            name: true
          }
        }
      }
    })

    console.log(`📚 Found ${lecturers.length} lecturers in database`)

    // Get all prodi
    const prodiList = await prisma.prodi.findMany({
      select: {
        kode: true,
        nama: true
      }
    })

    console.log(`🎓 Found ${prodiList.length} prodi in database`)

    let createdCount = 0
    let skippedCount = 0

    for (const data of rekomendasiJudulData) {
      // Find the lecturer by NIP (using NIDN as NIP)
      const lecturer = lecturers.find(l => l.nip === data.dosen_nidn)

      if (!lecturer) {
        console.log(`⚠️  Skipping: Lecturer with NIP ${data.dosen_nidn} not found`)
        skippedCount++
        continue
      }

      // Verify prodi exists
      const prodi = prodiList.find(p => p.kode === data.prodi_kode)
      if (!prodi) {
        console.log(`⚠️  Skipping: Prodi with code ${data.prodi_kode} not found`)
        skippedCount++
        continue
      }

      // Check if rekomendasi already exists
      const existing = await prisma.rekomendasi_judul.findFirst({
        where: {
          judul: data.judul,
          dosen_id: lecturer.id
        }
      })

      if (existing) {
        console.log(`⏭️  Skipping: "${data.judul}" already exists`)
        skippedCount++
        continue
      }

      // Create rekomendasi judul
      await prisma.rekomendasi_judul.create({
        data: {
          judul: data.judul,
          deskripsi: data.deskripsi,
          bidang_keilmuan: data.bidang_keilmuan,
          metodologi: data.metodologi,
          tingkat_kesulitan: data.tingkat_kesulitan,
          estimasi_waktu: data.estimasi_waktu,
          prerequisites: data.prerequisites,
          status: 'Tersedia',
          prodi_kode: data.prodi_kode,
          dosen_id: lecturer.id
        }
      })

      createdCount++
      console.log(`✅ Created: "${data.judul}" (${prodi.nama}) by ${lecturer.users?.name || 'Unknown'}`)
    }

    console.log('\n📊 Rekomendasi Judul Seeding Summary:')
    console.log(`   ✅ Created: ${createdCount}`)
    console.log(`   ⏭️  Skipped: ${skippedCount}`)
    console.log(`   📝 Total: ${rekomendasiJudulData.length}`)

    // Show statistics per prodi
    const stats = await prisma.rekomendasi_judul.groupBy({
      by: ['prodi_kode'],
      _count: true
    })

    console.log('\n📈 Statistics by Prodi:')
    for (const stat of stats) {
      const prodi = prodiList.find(p => p.kode === stat.prodi_kode)
      console.log(`   ${prodi?.nama || stat.prodi_kode}: ${stat._count} rekomendasi`)
    }

  } catch (error) {
    console.error('❌ Error seeding rekomendasi judul:', error)
    throw error
  }
}

// Run if called directly
if (require.main === module) {
  seedRekomendasiJudul()
    .then(() => {
      console.log('✅ Rekomendasi Judul seeding completed!')
      process.exit(0)
    })
    .catch((error) => {
      console.error('❌ Rekomendasi Judul seeding failed:', error)
      process.exit(1)
    })
    .finally(async () => {
      await prisma.$disconnect()
    })
}

export { seedRekomendasiJudul }
