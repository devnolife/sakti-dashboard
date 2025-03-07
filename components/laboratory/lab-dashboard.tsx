"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter } from "lucide-react"
import { LabCard } from "@/components/laboratory/lab-card"
import { LabRegistrationDialog } from "@/components/laboratory/lab-registration-dialog"

// Sample data for available labs
const availableLabs = [
  {
    id: "lab-1",
    title: "Computer Networks Laboratory",
    description: "Learn about network protocols, configurations, and troubleshooting techniques.",
    image: "/placeholder.svg?height=200&width=400",
    instructor: "Dr. Ahmad Dahlan",
    schedule: "Monday & Wednesday, 10:00 - 12:00",
    capacity: 30,
    enrolled: 18,
    credits: 2,
    tags: ["Networking", "Cisco", "TCP/IP"],
    status: "open",
  },
  {
    id: "lab-2",
    title: "Database Systems Laboratory",
    description: "Practical implementation of database design, SQL queries, and database management.",
    image: "/placeholder.svg?height=200&width=400",
    instructor: "Prof. Siti Aminah",
    schedule: "Tuesday & Thursday, 13:00 - 15:00",
    capacity: 25,
    enrolled: 22,
    credits: 2,
    tags: ["SQL", "Database Design", "PostgreSQL"],
    status: "open",
  },
  {
    id: "lab-3",
    title: "Artificial Intelligence Laboratory",
    description: "Hands-on experience with machine learning algorithms and AI applications.",
    image: "/placeholder.svg?height=200&width=400",
    instructor: "Dr. Budi Santoso",
    schedule: "Friday, 09:00 - 12:00",
    capacity: 20,
    enrolled: 15,
    credits: 3,
    tags: ["Machine Learning", "Python", "TensorFlow"],
    status: "open",
  },
  {
    id: "lab-4",
    title: "Web Development Laboratory",
    description: "Build responsive web applications using modern frameworks and technologies.",
    image: "/placeholder.svg?height=200&width=400",
    instructor: "Prof. Joko Widodo",
    schedule: "Monday & Wednesday, 15:00 - 17:00",
    capacity: 30,
    enrolled: 28,
    credits: 2,
    tags: ["React", "Node.js", "JavaScript"],
    status: "almost-full",
  },
  {
    id: "lab-5",
    title: "Cybersecurity Laboratory",
    description: "Learn about security vulnerabilities, encryption, and ethical hacking techniques.",
    image: "/placeholder.svg?height=200&width=400",
    instructor: "Dr. Rini Pratiwi",
    schedule: "Tuesday & Thursday, 10:00 - 12:00",
    capacity: 20,
    enrolled: 20,
    credits: 3,
    tags: ["Security", "Cryptography", "Penetration Testing"],
    status: "full",
  },
]

export function LabDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLab, setSelectedLab] = useState<any>(null)
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)

  const filteredLabs = availableLabs.filter(
    (lab) =>
      lab.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lab.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lab.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const handleRegister = (lab: any) => {
    setSelectedLab(lab)
    setIsRegistrationOpen(true)
  }

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden gradient-border">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search laboratories by name, description, or tags..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredLabs.map((lab) => (
          <LabCard key={lab.id} lab={lab} onRegister={() => handleRegister(lab)} />
        ))}
      </div>

      {filteredLabs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No laboratories found matching your search criteria.</p>
        </div>
      )}

      {selectedLab && (
        <LabRegistrationDialog lab={selectedLab} open={isRegistrationOpen} onOpenChange={setIsRegistrationOpen} />
      )}
    </div>
  )
}

