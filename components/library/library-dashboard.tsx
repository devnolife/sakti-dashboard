"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookList } from "./book-list"
import { BookGrid } from "./book-grid"
import { LibraryStats } from "./library-stats"
import { MyBorrowedBooks } from "./my-borrowed-books"
import { mockBooks } from "./mock-data"

export function LibraryDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [category, setCategory] = useState("all")
  const [viewType, setViewType] = useState("grid")

  // Filter books based on search query and category
  const filteredBooks = mockBooks.filter((book) => {
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
        <p className="text-muted-foreground">Cari dan pinjam buku dari perpustakaan fakultas.</p>
      </div>

      <LibraryStats />

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
                  <SelectValue placeholder="rKategoi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kategori</SelectItem>
                  <SelectItem value="computer-science">Ilmu Komputer</SelectItem>
                  <SelectItem value="mathematics">Matematika</SelectItem>
                  <SelectItem value="engineering">Teknik</SelectItem>
                  <SelectItem value="business">Bisnis</SelectItem>
                  <SelectItem value="science">Sains</SelectItem>
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
          <MyBorrowedBooks />
        </div>
      </div>
    </div>
  )
}

