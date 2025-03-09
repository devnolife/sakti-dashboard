"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ThesisTitlesList } from "./thesis-titles-list"
import { ThesisStatsCards } from "./thesis-stats-cards"
import { mockThesisTitles } from "./mock-thesis-data"

export function ThesisTitlesDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [field, setField] = useState("all")
  const [year, setYear] = useState("all")

  // Get unique fields and years for filters
  const fields = Array.from(new Set(mockThesisTitles.map((thesis) => thesis.field)))
  const years = Array.from(new Set(mockThesisTitles.map((thesis) => thesis.year))).sort((a, b) => b - a)

  // Filter thesis titles based on search query, field, and year
  const filteredTheses = mockThesisTitles.filter((thesis) => {
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

