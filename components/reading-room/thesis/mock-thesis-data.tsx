import type { ThesisTitle } from "@/types/thesis"

export const mockThesisData: ThesisTitle[] = [
  {
    id: "thesis-001",
    title: "Implementasi Deep Learning untuk Deteksi Objek pada Citra Digital",
    author: {
      id: "std-001",
      name: "Ahmad Fauzi",
      nim: "1901234567",
      department: "Teknik Informatika",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    abstract:
      "Penelitian ini bertujuan untuk mengimplementasikan teknik deep learning, khususnya Convolutional Neural Networks (CNN), untuk mendeteksi objek pada citra digital. Metode yang diusulkan menggunakan arsitektur YOLO (You Only Look Once) yang dimodifikasi untuk meningkatkan akurasi dan kecepatan deteksi.",
    keywords: ["deep learning", "object detection", "computer vision", "CNN", "YOLO"],
    submissionDate: "2023-06-15",
    status: "pending",
    supervisor: {
      id: "sup-001",
      name: "Dr. Budi Santoso",
      department: "Teknik Informatika",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    department: "Teknik Informatika",
    year: 2023,
    similarityScore: 12,
    similarTheses: [
      {
        id: "sim-001",
        title: "Implementasi Deep Learning untuk Klasifikasi Citra Digital",
        author: "Rudi Hartono",
        year: 2021,
        similarityPercentage: 65,
      },
      {
        id: "sim-002",
        title: "Penerapan Convolutional Neural Networks untuk Deteksi Objek pada Video",
        author: "Sinta Dewi",
        year: 2022,
        similarityPercentage: 48,
      },
    ],
    reviewHistory: [
      {
        id: "rev-001",
        date: "2023-06-15",
        reviewer: "Admin",
        action: "submitted",
      },
      {
        id: "rev-002",
        date: "2023-06-18",
        reviewer: "Dr. Budi Santoso",
        action: "reviewed",
        comments: "Proposal bagus, tetapi perlu perbaikan pada metodologi.",
      },
    ],
  },
  {
    id: "thesis-002",
    title: "Analisis Performa Framework JavaScript Modern dalam Pengembangan Aplikasi Web",
    author: {
      id: "std-002",
      name: "Siti Nurhaliza",
      nim: "2020103045",
      department: "Sistem Informasi",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    abstract:
      "Penelitian ini membandingkan performa dari berbagai framework JavaScript modern seperti React, Vue, dan Angular dalam pengembangan aplikasi web. Analisis dilakukan berdasarkan waktu loading, penggunaan memori, dan pengalaman pengguna pada berbagai perangkat dan browser.",
    keywords: ["javascript", "framework", "web development", "performance analysis", "react", "vue", "angular"],
    submissionDate: "2023-06-14",
    status: "pending",
    supervisor: {
      id: "sup-002",
      name: "Dr. Rina Wijaya",
      department: "Sistem Informasi",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    department: "Sistem Informasi",
    year: 2023,
    similarityScore: 8,
    similarTheses: [],
    reviewHistory: [
      {
        id: "rev-003",
        date: "2023-06-14",
        reviewer: "Admin",
        action: "submitted",
      },
    ],
  },
  {
    id: "thesis-003",
    title: "Pengembangan Sistem Informasi Manajemen Perpustakaan Berbasis Cloud",
    author: {
      id: "std-003",
      name: "Budi Santoso",
      nim: "2021104078",
      department: "Sistem Informasi",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    abstract:
      "Penelitian ini mengembangkan sistem informasi manajemen perpustakaan berbasis cloud yang dapat diakses dari berbagai perangkat. Sistem ini mengintegrasikan fitur peminjaman, pengembalian, katalog digital, dan analitik penggunaan perpustakaan.",
    keywords: ["cloud computing", "library management", "information system", "digital catalog", "analytics"],
    submissionDate: "2023-06-13",
    status: "approved",
    supervisor: {
      id: "sup-003",
      name: "Prof. Hadi Wijaya",
      department: "Sistem Informasi",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    department: "Sistem Informasi",
    year: 2023,
    similarityScore: 15,
    similarTheses: [],
    reviewHistory: [
      {
        id: "rev-004",
        date: "2023-06-13",
        reviewer: "Admin",
        action: "submitted",
      },
      {
        id: "rev-005",
        date: "2023-06-16",
        reviewer: "Prof. Hadi Wijaya",
        action: "approved",
        comments: "Proposal yang sangat baik dan inovatif.",
      },
    ],
  },
]

