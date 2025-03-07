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

// Sample data for available labs
const availableLabs = [
  {
    id: "lab-1",
    title: "Computer Networks Laboratory",
    description: "Learn about network protocols, configurations, and troubleshooting techniques.",
    image: "/placeholder.svg?height=200&width=400",
    instructor: "Dr. Ahmad Dahlan",
    instructorImage: "/placeholder.svg?height=100&width=100",
    schedule: "Monday & Wednesday, 10:00 - 12:00",
    capacity: 30,
    enrolled: 18,
    credits: 2,
    tags: ["Networking", "Cisco", "TCP/IP"],
    status: "open",
    semester: "Odd 2023/2024",
    category: "Core",
    location: "Building A, Room 101",
    color: "blue",
  },
  {
    id: "lab-2",
    title: "Database Systems Laboratory",
    description: "Practical implementation of database design, SQL queries, and database management.",
    image: "/placeholder.svg?height=200&width=400",
    instructor: "Prof. Siti Aminah",
    instructorImage: "/placeholder.svg?height=100&width=100",
    schedule: "Tuesday & Thursday, 13:00 - 15:00",
    capacity: 25,
    enrolled: 22,
    credits: 2,
    tags: ["SQL", "Database Design", "PostgreSQL"],
    status: "open",
    semester: "Odd 2023/2024",
    category: "Core",
    location: "Building B, Room 203",
    color: "green",
  },
  {
    id: "lab-3",
    title: "Artificial Intelligence Laboratory",
    description: "Hands-on experience with machine learning algorithms and AI applications.",
    image: "/placeholder.svg?height=200&width=400",
    instructor: "Dr. Budi Santoso",
    instructorImage: "/placeholder.svg?height=100&width=100",
    schedule: "Friday, 09:00 - 12:00",
    capacity: 20,
    enrolled: 15,
    credits: 3,
    tags: ["Machine Learning", "Python", "TensorFlow"],
    status: "open",
    semester: "Odd 2023/2024",
    category: "Elective",
    location: "Building C, Room 305",
    color: "purple",
  },
  {
    id: "lab-4",
    title: "Web Development Laboratory",
    description: "Build responsive web applications using modern frameworks and technologies.",
    image: "/placeholder.svg?height=200&width=400",
    instructor: "Prof. Joko Widodo",
    instructorImage: "/placeholder.svg?height=100&width=100",
    schedule: "Monday & Wednesday, 15:00 - 17:00",
    capacity: 30,
    enrolled: 28,
    credits: 2,
    tags: ["React", "Node.js", "JavaScript"],
    status: "almost-full",
    semester: "Odd 2023/2024",
    category: "Core",
    location: "Building A, Room 102",
    color: "orange",
  },
  {
    id: "lab-5",
    title: "Cybersecurity Laboratory",
    description: "Learn about security vulnerabilities, encryption, and ethical hacking techniques.",
    image: "/placeholder.svg?height=200&width=400",
    instructor: "Dr. Rini Pratiwi",
    instructorImage: "/placeholder.svg?height=100&width=100",
    schedule: "Tuesday & Thursday, 10:00 - 12:00",
    capacity: 20,
    enrolled: 20,
    credits: 3,
    tags: ["Security", "Cryptography", "Penetration Testing"],
    status: "full",
    semester: "Odd 2023/2024",
    category: "Elective",
    location: "Building B, Room 204",
    color: "red",
  },
  {
    id: "lab-6",
    title: "Mobile App Development Laboratory",
    description: "Create native and cross-platform mobile applications for iOS and Android.",
    image: "/placeholder.svg?height=200&width=400",
    instructor: "Dr. Hadi Prasetyo",
    instructorImage: "/placeholder.svg?height=100&width=100",
    schedule: "Wednesday & Friday, 13:00 - 15:00",
    capacity: 25,
    enrolled: 15,
    credits: 3,
    tags: ["Android", "iOS", "React Native"],
    status: "open",
    semester: "Odd 2023/2024",
    category: "Elective",
    location: "Building C, Room 306",
    color: "teal",
  },
]

export function AvailableLabsTab() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLab, setSelectedLab] = useState<any>(null)
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)
  const [filters, setFilters] = useState({
    categories: [] as string[],
    statuses: [] as string[],
  })
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [filteredLabs, setFilteredLabs] = useState(availableLabs)
  const [isSearching, setIsSearching] = useState(false)

  // Extract unique categories and statuses for filters
  const categories = Array.from(new Set(availableLabs.map((lab) => lab.category)))
  const statuses = Array.from(new Set(availableLabs.map((lab) => lab.status)))

  useEffect(() => {
    const filtered = availableLabs.filter((lab) => {
      // Apply search filter
      const matchesSearch =
        lab.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lab.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lab.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lab.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      // Apply category filter
      const matchesCategory = filters.categories.length === 0 || filters.categories.includes(lab.category)

      // Apply status filter
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

      // Update active filters
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

      // Update active filters
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

  // Format status for display
  const formatStatus = (status: string) => {
    switch (status) {
      case "open":
        return "Open"
      case "almost-full":
        return "Almost Full"
      case "full":
        return "Full"
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
                  className={`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${isSearching ? "text-primary" : "text-muted-foreground"} transition-colors`}
                />
                <Input
                  placeholder="Search laboratories by name, description, instructor, or tags..."
                  className="pl-10 transition-all bg-white border-muted dark:bg-gray-950 focus-visible:ring-primary/20 focus-visible:border-primary/30"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearching(true)}
                  onBlur={() => setIsSearching(false)}
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute -translate-y-1/2 right-2 top-1/2 h-7 w-7 text-muted-foreground hover:text-foreground"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 bg-white border-muted dark:bg-gray-950 hover:bg-muted/50"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    <span>Filters</span>
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
                  <DropdownMenuLabel>Categories</DropdownMenuLabel>
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
                <span className="text-sm text-muted-foreground">Active filters:</span>
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
                  Clear all
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
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredLabs.map((lab, index) => (
              <motion.div
                key={lab.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex h-full"
              >
                <LabCard lab={lab} onRegister={() => handleRegister(lab)} className="flex flex-col w-full" />
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
            <h3 className="mb-2 text-lg font-medium">No laboratories found</h3>
            <p className="max-w-md mb-6 text-muted-foreground">
              We couldn't find any laboratories matching your search criteria. Try adjusting your filters or search
              terms.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("")
                clearAllFilters()
              }}
              className="bg-white dark:bg-gray-900"
            >
              Clear all filters
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

