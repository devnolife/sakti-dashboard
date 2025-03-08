"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Users, Phone, Mail, Building, CheckCircle, XCircle, Edit, Trash2, Briefcase } from "lucide-react"
import { locations, teams } from "./mock-data"

interface LocationDetailsDialogProps {
  locationId: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LocationDetailsDialog({ locationId, open, onOpenChange }: LocationDetailsDialogProps) {
  // Find location
  const location = locations.find((l) => l.id === locationId)

  if (!location) return null

  // Find teams using this location
  const locationTeams = teams.filter((t) => t.location === locationId)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl bg-gradient-to-br from-white to-accent-50/30">
        <DialogHeader>
          <DialogTitle className="text-accent-foreground">Detail Lokasi</DialogTitle>
          <DialogDescription>Informasi lengkap tentang lokasi program KKP Plus</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="details" className="mt-4">
          <TabsList className="grid w-full grid-cols-2 bg-muted/50">
            <TabsTrigger
              value="details"
              className="data-[state=active]:bg-white data-[state=active]:text-accent-foreground data-[state=active]:shadow-sm"
            >
              Detail Lokasi
            </TabsTrigger>
            <TabsTrigger
              value="programs"
              className="data-[state=active]:bg-white data-[state=active]:text-accent-foreground data-[state=active]:shadow-sm"
            >
              Program Terkait
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4 pt-4">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-semibold text-accent-foreground">{location.name}</h3>
              <div className="flex gap-2">
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
            </div>

            <p className="text-sm text-muted-foreground">{location.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-accent" />
                  <span>Alamat: {location.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-accent" />
                  <span>Kota: {location.city}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-accent" />
                  <span>Provinsi: {location.province}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-primary-500" />
                  <span>Kontak: {location.contactPerson}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-secondary-500" />
                  <span>Telepon: {location.contactPhone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-mint" />
                  <span>Email: {location.contactEmail}</span>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="text-sm font-medium mb-2">Kapasitas dan Ketersediaan</h4>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>Kapasitas: {location.capacity} mahasiswa</span>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="text-sm font-medium mb-2">Fasilitas</h4>
              <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                <li>Ruang kerja bersama</li>
                <li>Akses internet berkecepatan tinggi</li>
                <li>Peralatan dan perlengkapan kerja</li>
                <li>Ruang rapat dan diskusi</li>
                <li>Kantin dan area istirahat</li>
              </ul>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" className="flex items-center gap-1">
                <Edit className="h-4 w-4" />
                <span>Edit</span>
              </Button>
              <Button variant="destructive" className="flex items-center gap-1">
                <Trash2 className="h-4 w-4" />
                <span>Hapus</span>
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="programs" className="space-y-4 pt-4">
            <h3 className="text-lg font-semibold">Program Kerja di {location.name}</h3>
            <p className="text-sm text-muted-foreground">Daftar program kerja yang berlokasi di tempat ini</p>

            <div className="space-y-4">
              {locationTeams.length === 0 ? (
                <p className="text-center py-4 text-muted-foreground">
                  Belum ada program kerja yang terdaftar di lokasi ini
                </p>
              ) : (
                locationTeams.map((team) => (
                  <div key={team.id} className="flex items-start gap-4 p-3 border rounded-md">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                      <Briefcase className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                        <div>
                          <h4 className="text-sm font-medium">{team.name}</h4>
                          <p className="text-xs text-muted-foreground">{team.workProgram}</p>
                        </div>
                        <Badge className="mt-1 sm:mt-0">
                          {team.status === "planning"
                            ? "Perencanaan"
                            : team.status === "ongoing"
                              ? "Berjalan"
                              : team.status === "completed"
                                ? "Selesai"
                                : "Dievaluasi"}
                        </Badge>
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground">
                        {new Date(team.startDate).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}{" "}
                        -{" "}
                        {new Date(team.endDate).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

