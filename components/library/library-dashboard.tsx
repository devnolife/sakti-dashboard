"use client"

import { useState, useEffect } from "react"
import { Search, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { BookList } from "./book-list"
import { BookGrid } from "./book-grid"
import { LibraryStats } from "./library-stats"
import { MyBorrowedBooks } from "./my-borrowed-books"

interface LibraryData {
  stats: {
    totalBooks: number
    availableBooks: number
    borrowedBooks: number
    recentReturns: number
  }
  books: Array<{
    id: string
    title: string
    author: string
    coverImage: string | null
    category: string
    isAvailable: boolean
    description: string | null
    publishedYear: number
    publisher: string
    isbn: string
    totalCopies: number
    availableCopies: number
    location: string
    language: string
  }>
  borrowedBooks: Array<{
    id: string
    title: string
    author: string
    borrowDate: string
    dueDate: string
    status: string
    fine: number | null
  }>
  categories: Array<{
    code: string
    name: string
  }>
}

export function LibraryDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [category, setCategory] = useState("all")
  const [viewType, setViewType] = useState("grid")
  const [libraryData, setLibraryData] = useState<LibraryData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch library data from API
  useEffect(() => {
    const fetchLibraryData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        console.log('🚀 Fetching library data...')
        const response = await fetch('/api/student/library')
        
        if (!response.ok) {
          throw new Error(`Failed to fetch library data: ${response.status}`)
        }
        
        const data = await response.json()
        console.log('📚 Library data received:', data)
        setLibraryData(data)
      } catch (error) {
        console.error('❌ Error fetching library data:', error)
        setError(error instanceof Error ? error.message : 'Failed to load library data')
      } finally {
        setLoading(false)
      }
    }

    fetchLibraryData()
  }, [])

  // Show loading state
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Ruang Baca</h2>
          <p className="text-muted-foreground">Memuat data perpustakaan...</p>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <Loader2 className="animate-spin h-8 w-8 text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">Memuat data perpustakaan...</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Ruang Baca</h2>
          <p className="text-muted-foreground">Terjadi kesalahan saat memuat data.</p>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <p className="text-red-600 mb-4">❌ {error}</p>
                <Button 
                  onClick={() => window.location.reload()} 
                  variant="outline"
                >
                  Coba Lagi
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!libraryData) {
    return null
  }

  // Filter books based on search query and category
  const filteredBooks = libraryData.books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = category === "all" || book.category === category
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Ruang Baca</h2>
        <p className="text-muted-foreground">Cari dan pinjam buku dari perpustakaan fakultas.</p>        </div>

        <LibraryStats stats={libraryData.stats} />

        <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari buku berdasarkan judul atau penulis..."
                className="w-full pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kategori</SelectItem>
                  {libraryData.categories.map((cat) => (
                    <SelectItem key={cat.code} value={cat.code}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Tabs defaultValue="grid" className="w-full sm:w-[200px]" value={viewType} onValueChange={setViewType}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="grid">Grid</TabsTrigger>
                  <TabsTrigger value="list">List</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          <div className="mt-6">
            {viewType === "grid" ? <BookGrid books={filteredBooks} /> : <BookList books={filteredBooks} />}
          </div>

          {filteredBooks.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-lg text-muted-foreground">Tidak ada buku yang ditemukan.</p>
              <Button
                variant="link"
                onClick={() => {
                  setSearchQuery("")
                  setCategory("all")
                }}
              >
                Reset pencarian
              </Button>
            </div>
          )}
        </div>

        <div>
          <MyBorrowedBooks borrowedBooks={libraryData.borrowedBooks} />
        </div>
      </div>
    </div>
  )
}

