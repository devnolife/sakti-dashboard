"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

export default function ProdiPerformancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="flex gap-2 items-center text-3xl font-bold">
          <TrendingUp className="w-8 h-8" />
          Performa Program Studi
        </h1>
        <p className="mt-1 text-muted-foreground">
          Analisis performa dan kinerja program studi
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Analisis Performa</CardTitle>
          <CardDescription>Halaman ini akan menampilkan analisis performa program studi</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="py-8 text-center text-muted-foreground">
            <TrendingUp className="mx-auto mb-2 w-12 h-12 opacity-50" />
            <p>Fitur ini sedang dalam pengembangan</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

