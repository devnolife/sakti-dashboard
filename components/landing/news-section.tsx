'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Calendar,
  Clock,
  ArrowRight,
  Newspaper,
  Pin,
  Tag,
  Eye
} from 'lucide-react'
import Link from 'next/link'

interface NewsItem {
  id: string
  title: string
  excerpt: string
  category: 'Pengumuman' | 'Berita' | 'Event' | 'Akademik'
  date: string
  readTime: string
  views: number
  isPinned?: boolean
  image?: string
  tags: string[]
}

const newsItems: NewsItem[] = [
  {
    id: '1',
    title: 'Pendaftaran Magang Industri Semester Genap 2025',
    excerpt: 'Dibuka pendaftaran program magang industri untuk mahasiswa semester 6 dan 8. Tersedia 150+ perusahaan mitra siap menerima mahasiswa.',
    category: 'Pengumuman',
    date: '2025-01-15',
    readTime: '3 min',
    views: 1250,
    isPinned: true,
    tags: ['magang', 'industri', 'pendaftaran']
  },
  {
    id: '2',
    title: 'Workshop "AI dalam Teknik Sipil" Bersama Expert dari MIT',
    excerpt: 'Workshop eksklusif tentang penerapan kecerdasan buatan dalam bidang teknik sipil yang akan dipimpin langsung oleh Prof. Dr. Sarah Johnson dari MIT.',
    category: 'Event',
    date: '2025-01-12',
    readTime: '2 min',
    views: 890,
    tags: ['workshop', 'AI', 'teknik sipil']
  },
  {
    id: '3',
    title: 'Mahasiswa FT Unismuh Raih Juara 1 Kompetisi Robot Nasional',
    excerpt: 'Tim robotika Fakultas Teknik berhasil meraih juara 1 dalam Kompetisi Robot Indonesia 2024 kategori Line Follower dan Soccer Robot.',
    category: 'Berita',
    date: '2025-01-10',
    readTime: '4 min',
    views: 2100,
    tags: ['prestasi', 'robot', 'kompetisi']
  },
  {
    id: '4',
    title: 'Perubahan Jadwal UAS Semester Ganjil 2024/2025',
    excerpt: 'Pemberitahuan perubahan jadwal Ujian Akhir Semester (UAS) untuk beberapa mata kuliah. Mohon mahasiswa untuk memperhatikan jadwal terbaru.',
    category: 'Akademik',
    date: '2025-01-08',
    readTime: '2 min',
    views: 3200,
    tags: ['jadwal', 'uas', 'akademik']
  },
  {
    id: '5',
    title: 'Seminar Nasional "Teknologi Hijau untuk Masa Depan"',
    excerpt: 'Fakultas Teknik mengadakan seminar nasional dengan tema teknologi ramah lingkungan. Menghadirkan pembicara dari dalam dan luar negeri.',
    category: 'Event',
    date: '2025-01-05',
    readTime: '3 min',
    views: 1680,
    tags: ['seminar', 'teknologi hijau', 'lingkungan']
  },
  {
    id: '6',
    title: 'Beasiswa Prestasi untuk Mahasiswa Berprestasi 2025',
    excerpt: 'Tersedia beasiswa prestasi senilai Rp 10 juta untuk mahasiswa dengan IPK > 3.5 dan aktif dalam kegiatan kemahasiswaan.',
    category: 'Pengumuman',
    date: '2025-01-03',
    readTime: '2 min',
    views: 4500,
    tags: ['beasiswa', 'prestasi', 'mahasiswa']
  }
]

const NewsSection = () => {
  const getCategoryColor = (category: NewsItem['category']) => {
    switch (category) {
      case 'Pengumuman':
        return 'bg-red-100 text-red-700 border-red-200'
      case 'Berita':
        return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'Event':
        return 'bg-purple-100 text-purple-700 border-purple-200'
      case 'Akademik':
        return 'bg-green-100 text-green-700 border-green-200'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const pinnedNews = newsItems.filter(item => item.isPinned)
  const regularNews = newsItems.filter(item => !item.isPinned)

  return (
    <section id="news" className="relative py-16 overflow-hidden bg-gradient-to-b from-white via-primary/5 to-brand/5">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary/10 via-brand/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tr from-brand/10 via-secondary/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute inset-0 opacity-[0.12] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle_at_60%_40%,rgba(4,81,211,0.25),transparent_60%)' }} />

      <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-6">
          <div>
            <div className="inline-flex items-center mb-4">
              <Badge className="bg-primary text-white px-4 py-1.5 text-sm rounded-full shadow-lg">
                <Newspaper className="w-3 h-3 mr-2" />
                Berita & Pengumuman
              </Badge>
            </div>

            <h2 className="text-2xl md:text-3xl font-medium leading-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-primary via-brand to-primary/80">
              Update Terbaru Fakultas Teknik
            </h2>

            <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-2xl">
              Dapatkan informasi terkini seputar kegiatan akademik, prestasi mahasiswa,
              dan perkembangan terbaru di Fakultas Teknik Unismuh Makassar.
            </p>
          </div>

          <Button asChild className="rounded-full px-6 py-2 bg-primary hover:bg-primary/90">
            <Link href="/news" className="flex items-center gap-2">
              Lihat Semua
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* Pinned News */}
        {pinnedNews.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Pin className="w-4 h-4 text-red-500" />
              <span className="text-sm font-medium text-gray-700">Pengumuman Penting</span>
            </div>

            <div className="grid gap-4">
              {pinnedNews.map((item) => (
                <Card key={item.id} className="p-6 border-l-4 border-l-red-500 bg-gradient-to-r from-red-50/70 via-white to-brand/5 hover:shadow-md transition-all duration-300 relative overflow-hidden">
                  <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-brand via-primary to-brand" />
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className={`px-2 py-1 text-xs rounded-full border ${getCategoryColor(item.category)}`}>
                          {item.category}
                        </Badge>
                        <Pin className="w-3 h-3 text-red-500" />
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-primary transition-colors cursor-pointer">
                        {item.title}
                      </h3>

                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {item.excerpt}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(item.date)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {item.readTime}
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {item.views.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    <Button variant="outline" className="rounded-full self-start lg:self-center">
                      Baca Selengkapnya
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Regular News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularNews.slice(0, 6).map((item) => (
            <Card key={item.id} className="group overflow-hidden rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative">
              <span className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-primary via-brand to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              {/* Image placeholder - in real implementation, use actual images */}
              <div className="aspect-[16/10] bg-gradient-to-br from-primary/10 to-secondary/10 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Newspaper className="w-8 h-8 text-primary/40 mx-auto mb-2" />
                    <span className="text-xs text-gray-400">{item.category}</span>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <Badge className={`px-2 py-1 text-xs rounded-full border ${getCategoryColor(item.category)}`}>
                    {item.category}
                  </Badge>
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                  {item.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {item.tags.slice(0, 2).map((tag, index) => (
                    <span key={index} className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded-full">
                      <Tag className="w-2 h-2" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-100 pt-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(item.date)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {item.readTime}
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {item.views > 1000 ? `${(item.views / 1000).toFixed(1)}k` : item.views}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-8">
          <Button variant="outline" className="rounded-full px-8 py-2 border-primary text-primary hover:bg-primary hover:text-white">
            Muat Berita Lainnya
          </Button>
        </div>
      </div>
    </section>
  )
}

export default NewsSection
