"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, GraduationCap, Award, Handshake, TrendingUp, FileText, ArrowUpRight, AlertTriangle } from "lucide-react"

export function DashboardSummary() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      <Card className="overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 border-none shadow-md transition-all hover:shadow-lg dark:from-blue-950/40 dark:to-blue-900/40">
        <CardHeader className="pb-2">
          <div className="flex gap-2 items-center">
            <div className="p-2 bg-blue-100 rounded-full dark:bg-blue-800/50">
              <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <CardTitle className="text-lg">Mahasiswa Aktif</CardTitle>
              <CardDescription>Semester ini</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">2,847</div>
          <div className="flex items-center mt-1 text-xs text-blue-600/80 dark:text-blue-400/80">
            <ArrowUpRight className="mr-1 w-3 h-3" />
            <span>Naik 12% dari semester lalu</span>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden bg-gradient-to-br from-green-50 to-green-100 border-none shadow-md transition-all hover:shadow-lg dark:from-green-950/40 dark:to-green-900/40">
        <CardHeader className="pb-2">
          <div className="flex gap-2 items-center">
            <div className="p-2 bg-green-100 rounded-full dark:bg-green-800/50">
              <GraduationCap className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <CardTitle className="text-lg">IPK Rata-rata</CardTitle>
              <CardDescription>Fakultas</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-green-600 dark:text-green-400">3.42</div>
          <div className="flex items-center mt-1 text-xs text-green-600/80 dark:text-green-400/80">
            <ArrowUpRight className="mr-1 w-3 h-3" />
            <span>Naik 0.05 dari semester lalu</span>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100 border-none shadow-md transition-all hover:shadow-lg dark:from-purple-950/40 dark:to-purple-900/40">
        <CardHeader className="pb-2">
          <div className="flex gap-2 items-center">
            <div className="p-2 bg-purple-100 rounded-full dark:bg-purple-800/50">
              <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <CardTitle className="text-lg">KTW (%)</CardTitle>
              <CardDescription>Kelulusan tepat waktu</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">78.5%</div>
          <div className="flex items-center mt-1 text-xs text-purple-600/80 dark:text-purple-400/80">
            <ArrowUpRight className="mr-1 w-3 h-3" />
            <span>Naik 3.2% dari tahun lalu</span>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden bg-gradient-to-br from-amber-50 to-amber-100 border-none shadow-md transition-all hover:shadow-lg dark:from-amber-950/40 dark:to-amber-900/40">
        <CardHeader className="pb-2">
          <div className="flex gap-2 items-center">
            <div className="p-2 bg-amber-100 rounded-full dark:bg-amber-800/50">
              <Award className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <CardTitle className="text-lg">Penelitian Aktif</CardTitle>
              <CardDescription>Tahun akademik</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">45</div>
          <div className="flex items-center mt-1 text-xs text-amber-600/80 dark:text-amber-400/80">
            <ArrowUpRight className="mr-1 w-3 h-3" />
            <span>8 penelitian baru</span>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden bg-gradient-to-br from-indigo-50 to-indigo-100 border-none shadow-md transition-all hover:shadow-lg dark:from-indigo-950/40 dark:to-indigo-900/40">
        <CardHeader className="pb-2">
          <div className="flex gap-2 items-center">
            <div className="p-2 bg-indigo-100 rounded-full dark:bg-indigo-800/50">
              <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <CardTitle className="text-lg">PKM Aktif</CardTitle>
              <CardDescription>Program kreativitas</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">23</div>
          <div className="flex items-center mt-1 text-xs text-indigo-600/80 dark:text-indigo-400/80">
            <ArrowUpRight className="mr-1 w-3 h-3" />
            <span>5 kegiatan baru</span>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden bg-gradient-to-br from-teal-50 to-teal-100 border-none shadow-md transition-all hover:shadow-lg dark:from-teal-950/40 dark:to-teal-900/40">
        <CardHeader className="pb-2">
          <div className="flex gap-2 items-center">
            <div className="p-2 bg-teal-100 rounded-full dark:bg-teal-800/50">
              <Handshake className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            </div>
            <div>
              <CardTitle className="text-lg">Kerjasama Aktif</CardTitle>
              <CardDescription>Mitra industri</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-teal-600 dark:text-teal-400">18</div>
          <div className="flex items-center mt-1 text-xs text-red-600/80 dark:text-red-400/80">
            <AlertTriangle className="mr-1 w-3 h-3" />
            <span>3 akan berakhir bulan ini</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
