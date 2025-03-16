"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, X } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface CorrespondenceFiltersProps {
  filters?: {
    status?: string
    date?: string
  }
  onFilterChange?: (key: string, value: string | undefined) => void
  onSearch?: (query: string) => void
}

export function CorrespondenceFilters({
  filters = {},
  onFilterChange = () => {},
  onSearch = () => {},
}: CorrespondenceFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [date, setDate] = useState<Date | undefined>(filters.date ? new Date(filters.date) : undefined)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  const handleStatusChange = (value: string) => {
    onFilterChange("status", value)
  }

  const handleDateSelect = (date: Date | undefined) => {
    setDate(date)
    onFilterChange("date", date ? date.toISOString() : undefined)
  }

  const handleResetFilters = () => {
    setSearchQuery("")
    setDate(undefined)
    onFilterChange("status", undefined)
    onFilterChange("date", undefined)
    onSearch("")
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-row flex-wrap items-end gap-4">
        {/* Search Field */}
        <div className="relative flex-1 min-w-[200px]">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari berdasarkan subjek..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
        </div>

        {/* Status Filter */}
        <div className="w-[180px]">
          <Label htmlFor="status-filter" className="text-sm font-medium mb-1.5 block">
            Status
          </Label>
          <Select value={filters.status || "all"} onValueChange={handleStatusChange}>
            <SelectTrigger id="status-filter">
              <SelectValue placeholder="Semua status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua status</SelectItem>
              <SelectItem value="pending">Menunggu</SelectItem>
              <SelectItem value="in_review">Sedang Ditinjau</SelectItem>
              <SelectItem value="approved">Disetujui</SelectItem>
              <SelectItem value="rejected">Ditolak</SelectItem>
              <SelectItem value="completed">Selesai</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Date Filter */}
        <div className="w-[180px]">
          <Label htmlFor="date-filter" className="text-sm font-medium mb-1.5 block">
            Tanggal
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date-filter"
                variant={"outline"}
                className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
              >
                <CalendarIcon className="w-4 h-4 mr-2" />
                {date ? format(date, "PPP") : "Pilih tanggal"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={handleDateSelect} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        {/* Reset Filters Button */}
        <Button variant="ghost" size="sm" onClick={handleResetFilters} className="gap-1 ml-auto text-xs h-9">
          <X className="h-3.5 w-3.5" />
          Reset filter
        </Button>
      </div>
    </div>
  )
}

