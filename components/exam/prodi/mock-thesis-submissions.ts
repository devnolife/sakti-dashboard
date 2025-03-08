import type { ThesisSubmission } from "./types"

export const mockThesisSubmissions: ThesisSubmission[] = [
  {
    id: "ts-001",
    title: "Implementasi Deep Learning untuk Deteksi Penyakit pada Tanaman Padi",
    studentName: "Ahmad Fauzi",
    studentId: "1901234567",
    program: "Informatika",
    submissionDate: "2023-10-15T00:00:00Z",
    status: "pending",
    abstract:
      "Penelitian ini bertujuan untuk mengembangkan sistem deteksi penyakit pada tanaman padi menggunakan metode deep learning. Dengan memanfaatkan convolutional neural network (CNN), sistem ini dapat mengidentifikasi berbagai jenis penyakit pada tanaman padi melalui analisis citra daun. Data yang digunakan terdiri dari 5000 gambar daun padi dengan berbagai kondisi penyakit yang telah diklasifikasikan oleh ahli pertanian. Hasil penelitian menunjukkan bahwa model yang dikembangkan mencapai akurasi 95% dalam mengidentifikasi penyakit tanaman padi, yang berpotensi membantu petani dalam mendiagnosis dan menangani penyakit tanaman lebih awal.",
    keywords: ["Deep Learning", "Tanaman Padi", "Deteksi Penyakit", "CNN", "Computer Vision"],
    similarityScore: 25,
    similarTheses: [
      {
        title: "Penerapan Machine Learning untuk Identifikasi Hama pada Tanaman Padi",
        author: "Budi Santoso",
        year: "2022",
        similarityPercentage: 35,
      },
      {
        title: "Sistem Pakar untuk Diagnosis Penyakit Tanaman Padi Berbasis Mobile",
        author: "Dewi Anggraini",
        year: "2021",
        similarityPercentage: 28,
      },
    ],
  },
  {
    id: "ts-002",
    title: "Analisis Sentimen pada Media Sosial Twitter Terhadap Kebijakan Pendidikan di Indonesia",
    studentName: "Siti Nurhaliza",
    studentId: "1901234568",
    program: "Informatika",
    submissionDate: "2023-10-18T00:00:00Z",
    status: "approved",
    abstract:
      "Penelitian ini menganalisis sentimen masyarakat terhadap kebijakan pendidikan di Indonesia melalui data Twitter. Dengan menggunakan metode Natural Language Processing (NLP) dan algoritma klasifikasi, penelitian ini mengkategorikan opini publik menjadi sentimen positif, negatif, dan netral. Data yang dianalisis mencakup 10.000 tweet dalam Bahasa Indonesia yang dikumpulkan selama periode 6 bulan. Hasil penelitian menunjukkan bahwa 45% tweet memiliki sentimen negatif, 30% positif, dan 25% netral terhadap kebijakan pendidikan terkini. Analisis lebih lanjut mengidentifikasi isu-isu utama yang menjadi perhatian publik, seperti kurikulum, biaya pendidikan, dan infrastruktur sekolah.",
    keywords: ["Analisis Sentimen", "Twitter", "Kebijakan Pendidikan", "NLP", "Media Sosial"],
    similarityScore: 15,
    similarTheses: [
      {
        title: "Analisis Sentimen Pengguna Twitter Terhadap Pembelajaran Jarak Jauh",
        author: "Rini Puspita",
        year: "2022",
        similarityPercentage: 22,
      },
    ],
  },
  {
    id: "ts-003",
    title: "Pengembangan Sistem Rekomendasi Buku Berbasis Collaborative Filtering",
    studentName: "Muhammad Rizki",
    studentId: "1901234569",
    program: "Informatika",
    submissionDate: "2023-10-20T00:00:00Z",
    status: "revision",
    abstract:
      "Penelitian ini mengembangkan sistem rekomendasi buku menggunakan metode collaborative filtering untuk membantu pengguna menemukan buku yang sesuai dengan preferensi mereka. Sistem ini menganalisis pola perilaku dan preferensi pengguna untuk memberikan rekomendasi yang personal. Data yang digunakan mencakup 50.000 ulasan buku dari 5.000 pengguna pada platform online. Metode yang digunakan adalah item-based collaborative filtering dengan optimasi menggunakan singular value decomposition (SVD). Hasil evaluasi menunjukkan bahwa sistem ini mencapai nilai precision 0.82 dan recall 0.75, yang menunjukkan efektivitas dalam memberikan rekomendasi yang relevan bagi pengguna.",
    keywords: ["Sistem Rekomendasi", "Collaborative Filtering", "Buku", "Machine Learning", "SVD"],
    feedback:
      "Judul perlu lebih spesifik mengenai jenis collaborative filtering yang digunakan. Pertimbangkan untuk menambahkan konteks penerapan (misalnya untuk perpustakaan digital atau toko buku online).",
    similarityScore: 30,
    similarTheses: [
      {
        title: "Sistem Rekomendasi Film Menggunakan Hybrid Filtering",
        author: "Anita Wijaya",
        year: "2022",
        similarityPercentage: 40,
      },
      {
        title: "Perbandingan Metode Content-Based dan Collaborative Filtering pada Sistem Rekomendasi Musik",
        author: "Dimas Pratama",
        year: "2021",
        similarityPercentage: 35,
      },
    ],
  },
  {
    id: "ts-004",
    title: "Implementasi Blockchain untuk Sistem Manajemen Rantai Pasok Produk Pertanian",
    studentName: "Dian Permata",
    studentId: "1901234570",
    program: "Informatika",
    submissionDate: "2023-10-22T00:00:00Z",
    status: "pending",
    abstract:
      "Penelitian ini mengimplementasikan teknologi blockchain untuk meningkatkan transparansi dan efisiensi dalam rantai pasok produk pertanian. Dengan menggunakan smart contract pada platform Ethereum, sistem ini memungkinkan pelacakan produk dari petani hingga konsumen akhir. Metodologi penelitian mencakup pengembangan prototype sistem dan pengujian pada rantai pasok beras di Jawa Barat dengan melibatkan 10 petani, 3 distributor, dan 5 pengecer. Hasil penelitian menunjukkan bahwa implementasi blockchain dapat mengurangi waktu verifikasi produk hingga 80% dan meningkatkan kepercayaan konsumen terhadap keaslian produk pertanian.",
    keywords: ["Blockchain", "Rantai Pasok", "Produk Pertanian", "Smart Contract", "Ethereum"],
    similarityScore: 10,
    similarTheses: [],
  },
  {
    id: "ts-005",
    title: "Pengembangan Aplikasi Mobile untuk Monitoring Kesehatan Mental Mahasiswa",
    studentName: "Rina Fitriani",
    studentId: "1901234571",
    program: "Informatika",
    submissionDate: "2023-10-25T00:00:00Z",
    status: "rejected",
    abstract:
      "Penelitian ini mengembangkan aplikasi mobile untuk memantau kesehatan mental mahasiswa selama masa perkuliahan. Aplikasi ini mengintegrasikan fitur self-assessment, tracking mood harian, dan rekomendasi aktivitas untuk mengelola stres. Metodologi penelitian meliputi analisis kebutuhan, perancangan UX/UI, pengembangan aplikasi menggunakan Flutter, dan pengujian dengan 200 mahasiswa dari berbagai jurusan. Hasil penelitian menunjukkan bahwa 75% pengguna melaporkan peningkatan kesadaran terhadap kondisi kesehatan mental mereka, dan 60% mengalami penurunan tingkat stres setelah menggunakan aplikasi selama 4 minggu.",
    keywords: ["Aplikasi Mobile", "Kesehatan Mental", "Mahasiswa", "Flutter", "Self-Assessment"],
    feedback:
      "Topik terlalu luas dan kurang fokus pada aspek informatika. Perlu lebih menekankan pada algoritma atau teknologi yang digunakan dalam pengembangan aplikasi, bukan hanya pada aspek kesehatan mental.",
    similarityScore: 20,
    similarTheses: [
      {
        title: "Aplikasi Mobile untuk Monitoring Aktivitas Fisik Mahasiswa",
        author: "Fajar Ramadhan",
        year: "2022",
        similarityPercentage: 25,
      },
    ],
  },
  {
    id: "ts-006",
    title: "Optimasi Rute Pengiriman Barang Menggunakan Algoritma Genetika",
    studentName: "Budi Santoso",
    studentId: "1901234572",
    program: "Informatika",
    submissionDate: "2023-10-28T00:00:00Z",
    status: "pending",
    abstract:
      "Penelitian ini mengembangkan sistem optimasi rute pengiriman barang menggunakan algoritma genetika untuk meminimalkan jarak tempuh dan biaya operasional. Sistem ini dirancang untuk mengatasi permasalahan Vehicle Routing Problem (VRP) dengan mempertimbangkan berbagai kendala seperti kapasitas kendaraan, jendela waktu, dan kondisi lalu lintas. Data yang digunakan berasal dari perusahaan logistik di Jakarta dengan 50 titik pengiriman dan 10 kendaraan. Hasil penelitian menunjukkan bahwa algoritma genetika dapat menghasilkan rute yang 25% lebih efisien dibandingkan dengan metode perutean manual yang saat ini digunakan oleh perusahaan.",
    keywords: ["Algoritma Genetika", "Optimasi Rute", "Vehicle Routing Problem", "Logistik", "Pengiriman Barang"],
    similarityScore: 35,
    similarTheses: [
      {
        title: "Penerapan Algoritma Ant Colony Optimization untuk Optimasi Rute Distribusi Barang",
        author: "Hendra Wijaya",
        year: "2022",
        similarityPercentage: 45,
      },
      {
        title: "Optimasi Rute Pengiriman dengan Algoritma Simulated Annealing",
        author: "Putri Rahayu",
        year: "2021",
        similarityPercentage: 40,
      },
    ],
  },
]

