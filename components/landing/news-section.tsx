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

        {/* Pinned News - Modern elevated style */}
        {pinnedNews.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-red-500 text-white shadow-lg">
                <Pin className="w-5 h-5" />
              </div>
              <span className="text-base font-bold text-gray-900">Pengumuman Penting</span>
            </div>

            <div className="grid gap-5">
              {pinnedNews.map((item) => (
                <Card key={item.id} className="group p-7 border-l-[6px] border-l-red-500 bg-white hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 relative overflow-hidden border-2 border-red-100 rounded-2xl">
                  <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-500 via-orange-500 to-red-500" />

                  {/* Background glow */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-red-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  <div className="relative flex flex-col lg:flex-row gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge className={`px-3 py-1.5 text-xs font-bold rounded-xl border-2 shadow-md ${getCategoryColor(item.category)}`}>
                          {item.category}
                        </Badge>
                        <div className="flex items-center gap-1.5 text-red-600 font-semibold text-xs">
                          <Pin className="w-4 h-4" />
                          <span>PINNED</span>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-primary transition-colors cursor-pointer">
                        {item.title}
                      </h3>

                      <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                        {item.excerpt}
                      </p>

                      <div className="flex items-center gap-5 text-xs text-gray-500 font-medium">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          {formatDate(item.date)}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          {item.readTime}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Eye className="w-4 h-4" />
                          {item.views.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    <Button className="rounded-2xl self-start lg:self-center bg-red-500 hover:bg-red-600 text-white px-6 py-3 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                      Baca Selengkapnya
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Regular News Grid - Modern elevated cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {regularNews.slice(0, 6).map((item, index) => {
            const cardColors = [
              { border: 'border-purple-200', glow: 'hover:shadow-purple-500/20', iconBg: 'bg-purple-500' },
              { border: 'border-cyan-200', glow: 'hover:shadow-cyan-500/20', iconBg: 'bg-cyan-500' },
              { border: 'border-orange-200', glow: 'hover:shadow-orange-500/20', iconBg: 'bg-orange-500' },
              { border: 'border-pink-200', glow: 'hover:shadow-pink-500/20', iconBg: 'bg-pink-500' },
              { border: 'border-teal-200', glow: 'hover:shadow-teal-500/20', iconBg: 'bg-teal-500' },
              { border: 'border-indigo-200', glow: 'hover:shadow-indigo-500/20', iconBg: 'bg-indigo-500' }
            ]
            const cardColor = cardColors[index % cardColors.length]

            return (
              <Card key={item.id} className={`group overflow-hidden rounded-3xl border-2 ${cardColor.border} hover:shadow-2xl ${cardColor.glow} transition-all duration-500 hover:-translate-y-3 relative bg-white`}>
                <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-purple-500 via-cyan-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Image placeholder with modern gradient */}
                <div className="aspect-[16/10] bg-gradient-to-br from-purple-50 via-white to-cyan-50 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${cardColor.iconBg} text-white shadow-xl mb-3 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12`}>
                        <Newspaper className="w-8 h-8" />
                      </div>
                      <span className="text-sm font-semibold text-gray-600">{item.category}</span>
                    </div>
                  </div>

                  {/* Animated background glow */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-purple-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  {/* Category Badge - Modern floating style */}
                  <div className="absolute top-4 left-4">
                    <Badge className={`px-3 py-1.5 text-xs font-bold rounded-xl border-2 shadow-lg ${getCategoryColor(item.category)}`}>
                      {item.category}
                    </Badge>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                    {item.excerpt}
                  </p>

                  {/* Tags with modern style */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {item.tags.slice(0, 2).map((tag, index) => (
                      <span key={index} className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-xs font-semibold text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Meta Info with enhanced spacing */}
                  <div className="flex items-center justify-between text-xs text-gray-500 border-t-2 border-gray-100 pt-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(item.date)}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {item.readTime}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 font-semibold">
                      <Eye className="w-3.5 h-3.5" />
                      {item.views > 1000 ? `${(item.views / 1000).toFixed(1)}k` : item.views}
                    </div>
                  </div>
                </div>

                {/* Corner decoration */}
                <div className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Card>
            )
          })}
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
