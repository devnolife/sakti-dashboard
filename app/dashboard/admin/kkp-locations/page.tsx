"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Plus,
  Search,
  Edit,
  Trash2,
  MapPin,
  Building2,
  Users,
  AlertCircle,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface KKPLocation {
  id: string
  name: string
  address: string
  city: string
  province: string
  industry: string
  positions: string[]
  quota: number
  remaining: number
  status: "available" | "full" | "inactive"
  contactPerson: string
  contactEmail: string
  contactPhone: string
  description?: string
}

export default function KKPLocationsPage() {
  const [locations, setLocations] = useState<KKPLocation[]>([
    {
      id: "1",
      name: "PT. Tech Indonesia - Jakarta",
      address: "Jl. Gatot Subroto No. 100",
      city: "Jakarta",
      province: "DKI Jakarta",
      industry: "Information Technology",
      positions: ["Software Developer", "Data Analyst", "UI/UX Designer"],
      quota: 5,
      remaining: 3,
      status: "available",
      contactPerson: "Bambang Sutrisno",
      contactEmail: "hr@techindonesia.com",
      contactPhone: "021-5551234",
      description: "Kesempatan magang di perusahaan IT terkemuka",
    },
    {
      id: "2",
      name: "PT. Digital Nusantara - Jakarta",
      address: "Jl. Sudirman No. 50",
      city: "Jakarta",
      province: "DKI Jakarta",
      industry: "Digital Marketing",
      positions: ["Marketing Analyst", "Content Creator", "SEO Specialist"],
      quota: 3,
      remaining: 0,
      status: "full",
      contactPerson: "Dewi Lestari",
      contactEmail: "recruitment@digitalnusantara.com",
      contactPhone: "021-5555678",
      description: "Agensi digital marketing terpercaya",
    },
  ])
  const [searchTerm, setSearchTerm] = useState("")
  const [showDialog, setShowDialog] = useState(false)
  const [editingLocation, setEditingLocation] = useState<KKPLocation | null>(null)

  const filteredLocations = locations.filter(
    (loc) =>
      loc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loc.city.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const stats = {
    total: locations.length,
    available: locations.filter((l) => l.status === "available").length,
    totalQuota: locations.reduce((acc, l) => acc + l.quota, 0),
    totalRemaining: locations.reduce((acc, l) => acc + l.remaining, 0),
  }

  return (
    <div className="mt-20 space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Lokasi KKP</h2>
          <p className="text-muted-foreground">
            Kelola lokasi dan tempat pelaksanaan KKP
          </p>
        </div>
        <Button onClick={() => setShowDialog(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Tambah Lokasi
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Lokasi</CardTitle>
            <Building2 className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Semua lokasi KKP</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Lokasi Tersedia</CardTitle>
            <MapPin className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.available}</div>
            <p className="text-xs text-muted-foreground">Masih menerima peserta</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Kuota</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalQuota}</div>
            <p className="text-xs text-muted-foreground">Kapasitas peserta</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Sisa Kuota</CardTitle>
            <AlertCircle className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRemaining}</div>
            <p className="text-xs text-muted-foreground">Kuota tersisa</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Lokasi KKP</CardTitle>
          <CardDescription>
            Kelola semua lokasi pelaksanaan KKP
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
              <Input
                placeholder="Cari lokasi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Lokasi</TableHead>
                  <TableHead>Kota/Provinsi</TableHead>
                  <TableHead>Industri</TableHead>
                  <TableHead>Posisi</TableHead>
                  <TableHead>Kuota</TableHead>
                  <TableHead>Kontak</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLocations.map((location) => (
                  <TableRow key={location.id}>
                    <TableCell>
                      <div className="font-medium">{location.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {location.address}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>{location.city}</div>
                      <div className="text-sm text-muted-foreground">
                        {location.province}
                      </div>
                    </TableCell>
                    <TableCell>{location.industry}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {location.positions.slice(0, 2).map((pos, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {pos}
                          </Badge>
                        ))}
                        {location.positions.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{location.positions.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{location.remaining}</span>
                        <span className="text-muted-foreground">/</span>
                        <span className="text-muted-foreground">{location.quota}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{location.contactPerson}</div>
                      <div className="text-xs text-muted-foreground">
                        {location.contactPhone}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          location.status === "available"
                            ? "default"
                            : location.status === "full"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {location.status === "available"
                          ? "Tersedia"
                          : location.status === "full"
                            ? "Penuh"
                            : "Nonaktif"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditingLocation(location)
                            setShowDialog(true)
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setLocations(locations.filter((l) => l.id !== location.id))
                            toast({
                              title: "Berhasil",
                              description: "Lokasi berhasil dihapus",
                            })
                          }}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
