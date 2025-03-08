"use client"

import { ProdiExamRoleCard } from "./prodi-exam-role-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProdiExamSection() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Manajemen Ujian Program Studi</h1>
        <p className="text-muted-foreground">Kelola dan pantau proses ujian mahasiswa</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Tabs defaultValue="pending">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pending">Menunggu Persetujuan</TabsTrigger>
              <TabsTrigger value="scheduled">Terjadwal</TabsTrigger>
              <TabsTrigger value="completed">Selesai</TabsTrigger>
            </TabsList>
            <TabsContent value="pending">
              <Card>
                <CardHeader>
                  <CardTitle>Aplikasi Ujian Menunggu Persetujuan</CardTitle>
                  <CardDescription>Daftar aplikasi ujian yang memerlukan persetujuan Anda</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground py-8">
                    Tidak ada aplikasi ujian yang menunggu persetujuan saat ini
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="scheduled">
              <Card>
                <CardHeader>
                  <CardTitle>Ujian Terjadwal</CardTitle>
                  <CardDescription>Daftar ujian yang telah dijadwalkan</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground py-8">
                    Tidak ada ujian yang terjadwal untuk periode ini
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="completed">
              <Card>
                <CardHeader>
                  <CardTitle>Ujian Selesai</CardTitle>
                  <CardDescription>Daftar ujian yang telah selesai</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground py-8">
                    Tidak ada ujian yang telah selesai untuk periode ini
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* The ProdiExamRoleCard component is placed here */}
        <div>
          <ProdiExamRoleCard />
        </div>
      </div>
    </div>
  )
}

