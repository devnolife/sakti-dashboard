"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserCheck } from "lucide-react"

export default function ProdiLecturersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="flex gap-2 items-center text-3xl font-bold">
          <UserCheck className="w-8 h-8" />
          Dosen per Program Studi
        </h1>
        <p className="mt-1 text-muted-foreground">
          Kelola data dosen berdasarkan program studi
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Dosen per Prodi</CardTitle>
          <CardDescription>Halaman ini akan menampilkan daftar dosen per program studi</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="py-8 text-center text-muted-foreground">
            <UserCheck className="mx-auto mb-2 w-12 h-12 opacity-50" />
            <p>Fitur ini sedang dalam pengembangan</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

