"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RecentTransactions } from "./recent-transactions"
import { Button } from "@/components/ui/button"
import { PlusCircle, Download, FileSpreadsheet, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"

export function ExpenseTracking() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Pelacakan Pengeluaran</h2>
          <p className="text-muted-foreground mt-2">Pantau dan kelola pengeluaran fakultas</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="hidden md:flex">
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Export Excel
          </Button>
          <Button variant="outline" size="sm" className="hidden md:flex">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
          <Button size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            Tambah Pengeluaran
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filter Pengeluaran</CardTitle>
          <CardDescription>Filter pengeluaran berdasarkan departemen, kategori, dan tanggal</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Departemen</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Departemen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Departemen</SelectItem>
                  <SelectItem value="sipil">Teknik Sipil - Irigasi</SelectItem>
                  <SelectItem value="elektro">Teknik Elektro</SelectItem>
                  <SelectItem value="arsitektur">Arsitektur</SelectItem>
                  <SelectItem value="informatika">Informatika</SelectItem>
                  <SelectItem value="pwk">Perencanaan Wilayah & Kota</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Kategori</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kategori</SelectItem>
                  <SelectItem value="operational">Operasional</SelectItem>
                  <SelectItem value="research">Penelitian</SelectItem>
                  <SelectItem value="development">Pengembangan</SelectItem>
                  <SelectItem value="scholarships">Beasiswa</SelectItem>
                  <SelectItem value="facilities">Fasilitas</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium mb-1 block">Rentang Tanggal</label>
              <DatePickerWithRange className="w-full" />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button>
              <Filter className="mr-2 h-4 w-4" />
              Terapkan Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transaksi Pengeluaran</CardTitle>
          <CardDescription>Daftar transaksi pengeluaran fakultas</CardDescription>
        </CardHeader>
        <CardContent>
          <RecentTransactions />
        </CardContent>
      </Card>
    </div>
  )
}

