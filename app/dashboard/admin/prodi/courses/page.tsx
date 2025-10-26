"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen } from "lucide-react"

export default function ProdiCoursesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="flex gap-2 items-center text-3xl font-bold">
          <BookOpen className="w-8 h-8" />
          Mata Kuliah per Program Studi
        </h1>
        <p className="mt-1 text-muted-foreground">
          Kelola mata kuliah berdasarkan program studi
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mata Kuliah per Prodi</CardTitle>
          <CardDescription>Halaman ini akan menampilkan daftar mata kuliah per program studi</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="py-8 text-center text-muted-foreground">
            <BookOpen className="mx-auto mb-2 w-12 h-12 opacity-50" />
            <p>Fitur ini sedang dalam pengembangan</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

