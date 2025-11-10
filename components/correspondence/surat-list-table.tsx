"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/context/auth-context"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { FileText, Calendar, User, Target } from "lucide-react"

interface Surat {
  id: number
  nomorSurat: string
  perihal: string | null
  jenisSurat: string
  kodejenis: string
  masalahSurat: string
  kodeMasalah: string
  tujuan: string
  kodeTujuan: string
  bulan: string
  tahunHijriah: string
  tahunMasehi: string
  createdAt: string
  mahasiswa: string
  nim: string
}

export function SuratListTable() {
  const { user } = useAuth()
  const [suratList, setSuratList] = useState<Surat[]>([])
  const [loading, setLoading] = useState(true)
  const [prodiId, setProdiId] = useState<string | null>(null)

  useEffect(() => {
    async function fetchStaffProdi() {
      if (!user?.id) return

      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('session-token') : null
        const response = await fetch('/api/staff/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {})
          },
          body: JSON.stringify({ userId: user.id })
        })

        if (response.ok) {
          const staff = await response.json()
          if (staff?.prodi_id) {
            setProdiId(staff.prodi_id)
          }
        }
      } catch (error) {
        console.error('Error fetching staff profile:', error)
      }
    }

    fetchStaffProdi()
  }, [user?.id])

  useEffect(() => {
    async function fetchSuratList() {
      if (!prodiId) return

      try {
        const response = await fetch(`/api/surat/list?prodiId=${prodiId}&limit=50`)
        if (response.ok) {
          const result = await response.json()
          setSuratList(result.data)
        }
      } catch (error) {
        console.error('Error fetching surat list:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSuratList()
  }, [prodiId])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (suratList.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Daftar Surat yang Telah Dibuat
          </CardTitle>
          <CardDescription>
            Riwayat semua surat yang telah diterbitkan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <FileText className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Belum ada surat</h3>
            <p className="text-muted-foreground">
              Surat yang telah diterbitkan akan muncul di sini
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Daftar Surat yang Telah Dibuat
        </CardTitle>
        <CardDescription>
          Total {suratList.length} surat telah diterbitkan
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Nomor Surat</TableHead>
                <TableHead>Perihal</TableHead>
                <TableHead>Jenis Surat</TableHead>
                <TableHead>Masalah</TableHead>
                <TableHead>Tujuan</TableHead>
                <TableHead>Mahasiswa</TableHead>
                <TableHead className="text-right">Tanggal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {suratList.map((surat) => (
                <TableRow key={surat.id}>
                  <TableCell className="font-mono font-medium text-sm">
                    {surat.nomorSurat}
                  </TableCell>
                  <TableCell>
                    <div className="max-w-[200px]">
                      <p className="font-medium truncate">
                        {surat.perihal || '-'}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <Badge variant="secondary" className="w-fit">
                        {surat.kodejenis}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {surat.jenisSurat}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <Badge variant="outline" className="w-fit">
                        {surat.kodeMasalah}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {surat.masalahSurat}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-start gap-2">
                      <Target className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
                      <div className="flex flex-col gap-1">
                        <Badge variant="default" className="w-fit">
                          {surat.kodeTujuan}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {surat.tujuan}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-start gap-2">
                      <User className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{surat.mahasiswa}</span>
                        <span className="text-xs text-muted-foreground">{surat.nim}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {formatDate(surat.createdAt)}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
