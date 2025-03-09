export interface ThesisTitle {
  id: string
  title: string
  student: {
    id: string
    name: string
    nim: string
    program: string
  }
  supervisor: {
    id: string
    name: string
  }
  keywords: string[]
  abstract: string
  year: number
  status: "approved" | "pending" | "rejected" | "completed"
  field: string
  submissionDate: string
}

export const mockThesisTitles: ThesisTitle[] = [
  {
    id: "thesis-001",
    title: "Implementasi Deep Learning untuk Deteksi Objek pada Sistem Keamanan Kampus",
    student: {
      id: "std-001",
      name: "Budi Santoso",
      nim: "12345678",
      program: "Informatika",
    },
    supervisor: {
      id: "sup-001",
      name: "Dr. Ahmad Wijaya",
    },
    keywords: ["deep learning", "object detection", "keamanan", "cctv"],
    abstract:
      "Penelitian ini mengimplementasikan teknologi deep learning untuk meningkatkan sistem keamanan kampus melalui deteksi objek pada rekaman CCTV. Metode yang digunakan adalah YOLO (You Only Look Once) dengan arsitektur CNN yang dimodifikasi untuk meningkatkan akurasi dan kecepatan deteksi.",
    year: 2023,
    status: "completed",
    field: "Artificial Intelligence",
    submissionDate: "2023-01-15",
  },
  {
    id: "thesis-002",
    title: "Analisis Sentimen pada Media Sosial Terhadap Kebijakan Pendidikan Tinggi",
    student: {
      id: "std-002",
      name: "Siti Rahma",
      nim: "23456789",
      program: "Informatika",
    },
    supervisor: {
      id: "sup-002",
      name: "Dr. Dewi Sartika",
    },
    keywords: ["analisis sentimen", "media sosial", "kebijakan pendidikan", "nlp"],
    abstract:
      "Penelitian ini menganalisis sentimen masyarakat di media sosial terhadap kebijakan pendidikan tinggi menggunakan metode Natural Language Processing (NLP). Data diambil dari Twitter dan Instagram dengan periode pengamatan selama 6 bulan.",
    year: 2022,
    status: "completed",
    field: "Natural Language Processing",
    submissionDate: "2022-06-20",
  },
  {
    id: "thesis-003",
    title: "Pengembangan Aplikasi Mobile untuk Monitoring Kesehatan Mental Mahasiswa",
    student: {
      id: "std-003",
      name: "Rudi Hartono",
      nim: "34567890",
      program: "Informatika",
    },
    supervisor: {
      id: "sup-003",
      name: "Dr. Bambang Supomo",
    },
    keywords: ["kesehatan mental", "aplikasi mobile", "monitoring", "mahasiswa"],
    abstract:
      "Penelitian ini mengembangkan aplikasi mobile untuk membantu mahasiswa memonitor kesehatan mental mereka selama masa studi. Aplikasi ini menggunakan pendekatan CBT (Cognitive Behavioral Therapy) dan dilengkapi dengan fitur journaling dan mood tracking.",
    year: 2023,
    status: "approved",
    field: "Mobile Application Development",
    submissionDate: "2023-03-10",
  },
  {
    id: "thesis-004",
    title: "Optimasi Jaringan Komputer Kampus Menggunakan Software-Defined Networking",
    student: {
      id: "std-004",
      name: "Diana Putri",
      nim: "45678901",
      program: "Informatika",
    },
    supervisor: {
      id: "sup-004",
      name: "Dr. Hendra Wijaya",
    },
    keywords: ["sdn", "jaringan komputer", "optimasi", "kampus"],
    abstract:
      "Penelitian ini mengimplementasikan Software-Defined Networking (SDN) untuk mengoptimalkan jaringan komputer kampus. Pendekatan ini memisahkan control plane dan data plane untuk meningkatkan fleksibilitas dan efisiensi manajemen jaringan.",
    year: 2022,
    status: "completed",
    field: "Computer Networks",
    submissionDate: "2022-09-05",
  },
  {
    id: "thesis-005",
    title: "Sistem Rekomendasi Mata Kuliah Berbasis Collaborative Filtering",
    student: {
      id: "std-005",
      name: "Andi Firmansyah",
      nim: "56789012",
      program: "Informatika",
    },
    supervisor: {
      id: "sup-005",
      name: "Dr. Ratna Sari",
    },
    keywords: ["sistem rekomendasi", "collaborative filtering", "mata kuliah", "personalisasi"],
    abstract:
      "Penelitian ini mengembangkan sistem rekomendasi mata kuliah pilihan untuk mahasiswa menggunakan metode collaborative filtering. Sistem ini mempertimbangkan preferensi mahasiswa, nilai sebelumnya, dan pola pengambilan mata kuliah oleh mahasiswa lain.",
    year: 2023,
    status: "pending",
    field: "Recommender Systems",
    submissionDate: "2023-05-18",
  },
  {
    id: "thesis-006",
    title: "Implementasi Blockchain untuk Verifikasi Ijazah Digital",
    student: {
      id: "std-006",
      name: "Faisal Rahman",
      nim: "67890123",
      program: "Informatika",
    },
    supervisor: {
      id: "sup-006",
      name: "Dr. Surya Darma",
    },
    keywords: ["blockchain", "ijazah digital", "verifikasi", "keamanan data"],
    abstract:
      "Penelitian ini mengimplementasikan teknologi blockchain untuk sistem verifikasi ijazah digital. Pendekatan ini meningkatkan keamanan dan mengurangi risiko pemalsuan dokumen akademik dengan memanfaatkan sifat immutable dari blockchain.",
    year: 2022,
    status: "completed",
    field: "Blockchain Technology",
    submissionDate: "2022-11-30",
  },
  {
    id: "thesis-007",
    title: "Pengembangan Chatbot untuk Layanan Akademik Menggunakan NLP",
    student: {
      id: "std-007",
      name: "Nadia Putri",
      nim: "78901234",
      program: "Informatika",
    },
    supervisor: {
      id: "sup-007",
      name: "Dr. Indra Kusuma",
    },
    keywords: ["chatbot", "nlp", "layanan akademik", "ai"],
    abstract:
      "Penelitian ini mengembangkan chatbot untuk membantu mahasiswa mendapatkan informasi tentang layanan akademik. Chatbot ini menggunakan Natural Language Processing (NLP) untuk memahami pertanyaan dalam bahasa alami dan memberikan respons yang relevan.",
    year: 2023,
    status: "approved",
    field: "Natural Language Processing",
    submissionDate: "2023-02-14",
  },
  {
    id: "thesis-008",
    title: "Analisis Performa Framework JavaScript Modern untuk Pengembangan Web",
    student: {
      id: "std-008",
      name: "Rizki Pratama",
      nim: "89012345",
      program: "Informatika",
    },
    supervisor: {
      id: "sup-008",
      name: "Dr. Rina Anggraini",
    },
    keywords: ["javascript", "framework", "web development", "performa"],
    abstract:
      "Penelitian ini menganalisis performa berbagai framework JavaScript modern (React, Vue, Angular, Svelte) dalam pengembangan aplikasi web. Analisis meliputi kecepatan rendering, ukuran bundle, dan penggunaan memori.",
    year: 2022,
    status: "completed",
    field: "Web Development",
    submissionDate: "2022-08-22",
  },
  {
    id: "thesis-009",
    title: "Sistem Deteksi Plagiarisme pada Kode Program Menggunakan Machine Learning",
    student: {
      id: "std-009",
      name: "Dian Permata",
      nim: "90123456",
      program: "Informatika",
    },
    supervisor: {
      id: "sup-009",
      name: "Dr. Budi Santoso",
    },
    keywords: ["plagiarisme", "kode program", "machine learning", "deteksi"],
    abstract:
      "Penelitian ini mengembangkan sistem untuk mendeteksi plagiarisme pada kode program mahasiswa menggunakan teknik machine learning. Sistem ini dapat mendeteksi kemiripan struktural meskipun ada perubahan nama variabel atau pengurutan kode.",
    year: 2023,
    status: "pending",
    field: "Machine Learning",
    submissionDate: "2023-04-05",
  },
  {
    id: "thesis-010",
    title: "Pengembangan Game Edukasi untuk Pembelajaran Algoritma dan Struktur Data",
    student: {
      id: "std-010",
      name: "Arif Wicaksono",
      nim: "01234567",
      program: "Informatika",
    },
    supervisor: {
      id: "sup-010",
      name: "Dr. Maya Indah",
    },
    keywords: ["game edukasi", "algoritma", "struktur data", "pembelajaran"],
    abstract:
      "Penelitian ini mengembangkan game edukasi untuk membantu mahasiswa memahami konsep algoritma dan struktur data. Game ini menggunakan pendekatan visual dan interaktif untuk menjelaskan konsep-konsep abstrak dalam pemrograman.",
    year: 2022,
    status: "completed",
    field: "Educational Technology",
    submissionDate: "2022-10-15",
  },
]

