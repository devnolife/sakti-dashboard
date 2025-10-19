"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { LabCard } from "@/components/laboratory/lab-card"
import { LabRegistrationDialog } from "@/components/laboratory/lab-registration-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"

interface LabData {
  id: string
  code: string
  title: string
  description: string | null
  image: string
  instructor: string
  instructorImage: string
  schedule: string
  capacity: number
  enrolled: number
  credits: number
  tags: string[]
  status: string
  semester: string
  category: string
  location: string
  color: string
  isRegistered: boolean
}

interface AvailableLabsTabProps {
  labs?: LabData[]
}

export function AvailableLabsTab({ labs = [] }: AvailableLabsTabProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchText, setSearchText] = useState("") 
  const [selectedLab, setSelectedLab] = useState<any>(null)
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)
  const [filters, setFilters] = useState({
    categories: [] as string[],
    statuses: [] as string[],
  })
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [filteredLabs, setFilteredLabs] = useState(labs)
  const [isSearching, setIsSearching] = useState(false)

  
  const categories = Array.from(new Set(labs.map((lab) => lab.category)))
  const statuses = Array.from(new Set(labs.map((lab) => lab.status)))

  useEffect(() => {
    const filtered = labs.filter((lab) => {
      
      const matchesSearch =
        lab.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (lab.description?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
        lab.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lab.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      
      const matchesCategory = filters.categories.length === 0 || filters.categories.includes(lab.category)

      
      const matchesStatus = filters.statuses.length === 0 || filters.statuses.includes(lab.status)

      return matchesSearch && matchesCategory && matchesStatus
    })

    setFilteredLabs(filtered)
  }, [searchQuery, filters])

  const toggleCategoryFilter = (category: string) => {
    setFilters((prev) => {
      const newCategories = prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category]
      updateActiveFilters([...newCategories, ...prev.statuses])
      return {
        ...prev,
        categories: newCategories,
      }
    })
  }

  const toggleStatusFilter = (status: string) => {
    setFilters((prev) => {
      const newStatuses = prev.statuses.includes(status)
        ? prev.statuses.filter((s) => s !== status)
        : [...prev.statuses, status]

      
      updateActiveFilters([...prev.categories, ...newStatuses])

      return {
        ...prev,
        statuses: newStatuses,
      }
    })
  }

  const updateActiveFilters = (allFilters: string[]) => {
    setActiveFilters(allFilters)
  }

  const removeFilter = (filter: string) => {
    if (categories.includes(filter)) {
      toggleCategoryFilter(filter)
    } else if (statuses.includes(filter)) {
      toggleStatusFilter(filter)
    }
  }

  const clearAllFilters = () => {
    setFilters({
      categories: [],
      statuses: [],
    })
    setActiveFilters([])
  }

  const handleRegister = (lab: any) => {
    setSelectedLab(lab)
    setIsRegistrationOpen(true)
  }

  
  const formatStatus = (status: string) => {
    switch (status) {
      case "tersedia":
        return "Tersedia"
      case "almost-full":
        return "Hampir Penuh"
      case "full":
        return "Penuh"
      default:
        return status.charAt(0).toUpperCase() + status.slice(1)
    }
  }

  return (
    <div className="space-y-8">
      <Card className="overflow-hidden border-none shadow-sm bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-gray-900/80">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="relative flex-1 group">
                <div className="absolute inset-0 p-1 -m-1 transition-opacity rounded-md opacity-0 bg-gradient-to-r from-primary-100/20 to-accent-100/20 dark:from-primary-900/20 dark:to-accent-900/20 group-focus-within:opacity-100"></div>
                <Search
                  className={`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 z-10 ${isSearching ? "text-primary" : "text-muted-foreground"} transition-colors`}
                />
                <Input
                  placeholder="Cari laboratorium berdasarkan nama, deskripsi, instruktur, atau tag..."
                  className="relative z-0 pl-10 pr-16 transition-all bg-white border-muted dark:bg-gray-950 focus-visible:ring-primary/20 focus-visible:border-primary/30"
                  value={searchText}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    setSearchText(newValue);
                    // Option to update search query in real-time (remove if you only want to search on Enter/button click)
                    // setSearchQuery(newValue);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSearchQuery(searchText);
                    }
                  }}
                  onFocus={() => setIsSearching(true)}
                  onBlur={() => setIsSearching(false)}
                />
                <div className="absolute z-10 flex items-center gap-1 -translate-y-1/2 right-2 top-1/2">
                  {searchText && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-muted-foreground hover:text-foreground"
                      onClick={() => {
                        setSearchText("");
                        setSearchQuery("");
                      }}
                      type="button"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-muted-foreground hover:text-primary"
                    onClick={() => setSearchQuery(searchText)}
                    type="button"
                  >
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 bg-white border-muted dark:bg-gray-950 hover:bg-muted/50"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    <span>Filter</span>
                    {activeFilters.length > 0 && (
                      <Badge
                        variant="secondary"
                        className="ml-1 border-none bg-primary/10 text-primary hover:bg-primary/20"
                      >
                        {activeFilters.length}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Kategori</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {categories.map((category) => (
                    <DropdownMenuCheckboxItem
                      key={category}
                      checked={filters.categories.includes(category)}
                      onCheckedChange={() => toggleCategoryFilter(category)}
                    >
                      {category}
                    </DropdownMenuCheckboxItem>
                  ))}

                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {statuses.map((status) => (
                    <DropdownMenuCheckboxItem
                      key={status}
                      checked={filters.statuses.includes(status)}
                      onCheckedChange={() => toggleStatusFilter(status)}
                    >
                      {formatStatus(status)}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {activeFilters.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-muted-foreground">Filter aktif:</span>
                {activeFilters.map((filter) => (
                  <Badge
                    key={filter}
                    variant="outline"
                    className="flex items-center gap-1 px-3 py-1 transition-colors bg-muted/50 hover:bg-muted"
                  >
                    {formatStatus(filter)}
                    <button className="ml-1 rounded-full hover:bg-background" onClick={() => removeFilter(filter)}>
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs h-7 text-muted-foreground hover:text-foreground"
                  onClick={clearAllFilters}
                >
                  Hapus semua
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <AnimatePresence mode="wait">
        {filteredLabs.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr"
          >
            {filteredLabs.map((lab, index) => (
              <motion.div
                key={lab.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="h-full"
              >
                <div className="flex flex-col h-full">
                  <LabCard lab={lab} onRegister={() => handleRegister(lab)} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center px-4 py-16 text-center border rounded-xl bg-muted/10"
          >
            <div className="flex items-center justify-center w-20 h-20 mb-4 rounded-full bg-muted/30">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="mb-2 text-lg font-medium">Tidak ada laboratorium ditemukan</h3>
            <p className="max-w-md mb-6 text-muted-foreground">
              Kami tidak dapat menemukan laboratorium yang sesuai dengan kriteria pencarian Anda. Coba sesuaikan filter atau kata kunci pencarian Anda.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("")
                clearAllFilters()
              }}
              className="bg-white dark:bg-gray-900"
            >
              Hapus semua filter
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {selectedLab && (
        <LabRegistrationDialog lab={selectedLab} open={isRegistrationOpen} onOpenChange={setIsRegistrationOpen} />
      )}
    </div>
  )
}

