"use client"

import { useState, useEffect } from "react"
import { Search, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { ThesisTitlesList } from "./thesis-titles-list"
import { ThesisStatsCards } from "./thesis-stats-cards"

interface ThesisTitle {
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
  status: 'pending' | 'approved' | 'rejected' | 'completed'
  field: string
  submissionDate: string
}

interface ThesisData {
  theses: ThesisTitle[]
  stats: {
    total: number
    approved: number
    pending: number
    byField: Record<string, number>
  }
}

export function ThesisTitlesDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [field, setField] = useState("all")
  const [year, setYear] = useState("all")
  const [thesisData, setThesisData] = useState<ThesisData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch thesis data from API
  useEffect(() => {
    const fetchThesisData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        console.log('🚀 Fetching thesis titles data...')
        const response = await fetch('/api/student/library/thesis-titles')
        
        if (!response.ok) {
          throw new Error(`Failed to fetch thesis titles: ${response.status}`)
        }
        
        const data = await response.json()
        console.log('📝 Thesis data received:', data)
        setThesisData(data)
      } catch (error) {
        console.error('❌ Error fetching thesis data:', error)
        setError(error instanceof Error ? error.message : 'Failed to load thesis data')
      } finally {
        setLoading(false)
      }
    }

    fetchThesisData()
  }, [])

  // Show loading state
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Judul Skripsi</h2>
          <p className="text-muted-foreground">Memuat data judul skripsi...</p>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <Loader2 className="animate-spin h-8 w-8 text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">Memuat data judul skripsi...</p>
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
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Judul Skripsi</h2>
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

  if (!thesisData) {
    return null
  }

  // Get unique fields and years for filters
  const fields = Array.from(new Set(thesisData.theses.map((thesis) => thesis.field)))
  const years = Array.from(new Set(thesisData.theses.map((thesis) => thesis.year))).sort((a, b) => b - a)

  // Filter thesis titles based on search query, field, and year
  const filteredTheses = thesisData.theses.filter((thesis) => {
    const matchesSearch =
      thesis.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thesis.keywords.some((keyword) => keyword.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesField = field === "all" || thesis.field === field
    const matchesYear = year === "all" || thesis.year === Number.parseInt(year)
    return matchesSearch && matchesField && matchesYear
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Judul Skripsi</h2>
        <p className="text-muted-foreground">Lihat daftar judul skripsi yang telah diajukan dan disetujui.</p>
      </div>

      <ThesisStatsCards stats={thesisData.stats} />

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Cari judul atau kata kunci..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Select value={field} onValueChange={setField}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Bidang" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Bidang</SelectItem>
              {fields.map((field) => (
                <SelectItem key={field} value={field}>
                  {field}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={year.toString()} onValueChange={setYear}>
            <SelectTrigger className="w-full sm:w-[120px]">
              <SelectValue placeholder="Tahun" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua</SelectItem>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <ThesisTitlesList theses={filteredTheses} />

      {filteredTheses.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-lg text-muted-foreground">Tidak ada judul skripsi yang ditemukan.</p>
          <Button
            variant="link"
            onClick={() => {
              setSearchQuery("")
              setField("all")
              setYear("all")
            }}
          >
            Reset pencarian
          </Button>
        </div>
      )}
    </div>
  )
}

