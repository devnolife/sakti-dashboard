"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Users, Phone, Mail, Building, CheckCircle, XCircle } from "lucide-react"
import { locations } from "./mock-data"
import { LocationDetailsDialog } from "./location-details-dialog"

interface LocationsListProps {
  searchQuery: string
}

export function LocationsList({ searchQuery }: LocationsListProps) {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)

  // Filter locations based on search query
  const filteredLocations = locations.filter((location) => {
    return (
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.province.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.contactPerson.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredLocations.length === 0 ? (
          <div className="md:col-span-2 lg:col-span-3 text-center py-10">
            Tidak ada lokasi yang sesuai dengan kriteria pencarian
          </div>
        ) : (
          filteredLocations.map((location) => (
            <Card
              key={location.id}
              className="overflow-hidden border-primary-100 bg-gradient-to-br from-white to-accent-50/30 shadow-sm hover:shadow-md transition-all"
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg text-accent-foreground">{location.name}</CardTitle>
                  {location.isActive ? (
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1 shadow-sm"
                    >
                      <CheckCircle className="h-3 w-3" />
                      <span>Aktif</span>
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="bg-red-50 text-red-700 border-red-200 flex items-center gap-1 shadow-sm"
                    >
                      <XCircle className="h-3 w-3" />
                      <span>Tidak Aktif</span>
                    </Badge>
                  )}
                </div>
                <CardDescription className="line-clamp-2">{location.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-accent" />
                    <span>
                      {location.address}, {location.city}, {location.province}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-primary-500" />
                    <span>{location.contactPerson}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-secondary-500" />
                    <span>{location.contactPhone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-mint" />
                    <span>{location.contactEmail}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary-600" />
                    <span>Kapasitas: {location.capacity} mahasiswa</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full border-accent-200 bg-white hover:bg-accent-50 hover:text-accent-foreground transition-all"
                  onClick={() => setSelectedLocation(location.id)}
                >
                  Lihat Detail
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>

      {selectedLocation && (
        <LocationDetailsDialog
          locationId={selectedLocation}
          open={!!selectedLocation}
          onOpenChange={(open) => {
            if (!open) setSelectedLocation(null)
          }}
        />
      )}
    </>
  )
}

