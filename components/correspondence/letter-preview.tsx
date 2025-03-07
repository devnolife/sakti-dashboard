"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface LetterPreviewProps {
  letterType: string
  data: any
}

export function LetterPreview({ letterType, data }: LetterPreviewProps) {
  const [view, setView] = useState<"preview" | "data">("preview")

  if (!data) return null

  const renderLetterContent = () => {
    switch (letterType) {
      case "active":
        return (
          <div className="space-y-6 p-8 font-serif">
            <div className="flex justify-between items-center border-b pb-4">
              <div className="flex items-center gap-3">
                <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-xs text-gray-500">Logo</span>
                </div>
                <div>
                  <h2 className="text-lg font-bold">UNIVERSITAS INDONESIA</h2>
                  <p className="text-sm">Fakultas Ilmu Komputer</p>
                </div>
              </div>
              <div className="text-right text-sm">
                <p>Jl. Margonda Raya, Depok</p>
                <p>Jawa Barat 16424</p>
                <p>www.cs.ui.ac.id</p>
              </div>
            </div>

            <div className="text-center">
              <h1 className="text-xl font-bold underline">SURAT KETERANGAN AKTIF KULIAH</h1>
              <p className="text-sm">Nomor: 123/SK/FASILKOM/2023</p>
            </div>

            <div className="space-y-4">
              <p>Yang bertanda tangan di bawah ini:</p>
              <div className="pl-4">
                <p>Nama: Dr. Budi Santoso, M.Kom.</p>
                <p>Jabatan: Dekan Fakultas Ilmu Komputer</p>
                <p>Instansi: Universitas Indonesia</p>
              </div>

              <p>Dengan ini menerangkan bahwa:</p>
              <div className="pl-4">
                <p>Nama: Ahmad Fauzi</p>
                <p>NIM: 2023050001</p>
                <p>Program Studi: Ilmu Komputer</p>
                <p>Semester: {data.semester}</p>
                <p>Tahun Akademik: {data.academicYear}</p>
              </div>

              <p>
                Adalah benar mahasiswa aktif Fakultas Ilmu Komputer Universitas Indonesia yang terdaftar pada semester{" "}
                {data.semester} tahun akademik {data.academicYear}.
              </p>

              {data.isParentCivilServant === "yes" && (
                <p>
                  Orang tua mahasiswa yang bersangkutan adalah Pegawai Negeri Sipil/Aparatur Sipil Negara yang bekerja
                  di {data.parentInstitution} dengan jabatan {data.parentPosition}.
                </p>
              )}

              <p>Surat keterangan ini dibuat untuk keperluan {data.purpose}.</p>

              <div className="pt-8 text-right">
                <p>
                  Depok, {new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                </p>
                <p className="mb-16">Dekan,</p>
                <p className="font-bold">Dr. Budi Santoso, M.Kom.</p>
                <p>NIP. 197501232000121001</p>
              </div>
            </div>
          </div>
        )

      case "leave":
        return (
          <div className="space-y-6 p-8 font-serif">
            <div className="flex justify-between items-center border-b pb-4">
              <div className="flex items-center gap-3">
                <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-xs text-gray-500">Logo</span>
                </div>
                <div>
                  <h2 className="text-lg font-bold">UNIVERSITAS INDONESIA</h2>
                  <p className="text-sm">Fakultas Ilmu Komputer</p>
                </div>
              </div>
              <div className="text-right text-sm">
                <p>Jl. Margonda Raya, Depok</p>
                <p>Jawa Barat 16424</p>
                <p>www.cs.ui.ac.id</p>
              </div>
            </div>

            <div className="text-center">
              <h1 className="text-xl font-bold underline">SURAT IZIN CUTI AKADEMIK</h1>
              <p className="text-sm">Nomor: 456/SK/FASILKOM/2023</p>
            </div>

            <div className="space-y-4">
              <p>Yang bertanda tangan di bawah ini:</p>
              <div className="pl-4">
                <p>Nama: Dr. Budi Santoso, M.Kom.</p>
                <p>Jabatan: Dekan Fakultas Ilmu Komputer</p>
                <p>Instansi: Universitas Indonesia</p>
              </div>

              <p>Dengan ini memberikan izin cuti kepada:</p>
              <div className="pl-4">
                <p>Nama: Ahmad Fauzi</p>
                <p>NIM: 2023050001</p>
                <p>Program Studi: Ilmu Komputer</p>
                <p>Semester: {data.semester}</p>
                <p>Tahun Akademik: {data.academicYear}</p>
              </div>

              <p>
                Untuk mengambil cuti{" "}
                {data.leaveType === "academic"
                  ? "akademik"
                  : data.leaveType === "medical"
                    ? "sakit"
                    : data.leaveType === "personal"
                      ? "pribadi"
                      : "melahirkan"}{" "}
                selama periode:
              </p>
              <div className="pl-4">
                <p>
                  Tanggal Mulai:{" "}
                  {data.startDate.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                </p>
                <p>
                  Tanggal Selesai:{" "}
                  {data.endDate.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                </p>
              </div>

              <p>Dengan alasan: {data.reason}</p>

              <p>
                Selama masa cuti, mahasiswa yang bersangkutan tidak diperkenankan mengikuti kegiatan akademik dan
                non-akademik di kampus. Mahasiswa wajib melaporkan diri kepada Program Studi setelah masa cuti berakhir.
              </p>

              <div className="pt-8 text-right">
                <p>
                  Depok, {new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                </p>
                <p className="mb-16">Dekan,</p>
                <p className="font-bold">Dr. Budi Santoso, M.Kom.</p>
                <p>NIP. 197501232000121001</p>
              </div>
            </div>
          </div>
        )

      case "payment":
        return (
          <div className="space-y-6 p-8 font-serif">
            <div className="flex justify-between items-center border-b pb-4">
              <div className="flex items-center gap-3">
                <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-xs text-gray-500">Logo</span>
                </div>
                <div>
                  <h2 className="text-lg font-bold">UNIVERSITAS INDONESIA</h2>
                  <p className="text-sm">Fakultas Ilmu Komputer</p>
                </div>
              </div>
              <div className="text-right text-sm">
                <p>Jl. Margonda Raya, Depok</p>
                <p>Jawa Barat 16424</p>
                <p>www.cs.ui.ac.id</p>
              </div>
            </div>

            <div className="text-center">
              <h1 className="text-xl font-bold underline">SURAT KETERANGAN PEMBAYARAN</h1>
              <p className="text-sm">Nomor: 789/SK/FASILKOM/2023</p>
            </div>

            <div className="space-y-4">
              <p>Yang bertanda tangan di bawah ini:</p>
              <div className="pl-4">
                <p>Nama: Dr. Budi Santoso, M.Kom.</p>
                <p>Jabatan: Dekan Fakultas Ilmu Komputer</p>
                <p>Instansi: Universitas Indonesia</p>
              </div>

              <p>Dengan ini menerangkan bahwa:</p>
              <div className="pl-4">
                <p>Nama: {data.studentName}</p>
                <p>NIM: {data.studentId}</p>
                <p>Program Studi: Ilmu Komputer</p>
                <p>Semester: {data.semester}</p>
                <p>Tahun Akademik: {data.academicYear}</p>
              </div>

              <p>
                Telah melunasi seluruh biaya pendidikan untuk semester {data.semester} tahun akademik{" "}
                {data.academicYear} dengan rincian sebagai berikut:
              </p>

              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Deskripsi</th>
                    <th className="text-right py-2">Jumlah</th>
                    <th className="text-right py-2">Status</th>
                    <th className="text-right py-2">Tanggal</th>
                  </tr>
                </thead>
                <tbody>
                  {data.paymentDetails.map((item: any, index: number) => (
                    <tr key={index} className="border-b">
                      <td className="py-2">{item.description}</td>
                      <td className="text-right py-2">{item.amount}</td>
                      <td className="text-right py-2">{item.status}</td>
                      <td className="text-right py-2">{item.date}</td>
                    </tr>
                  ))}
                  <tr className="font-bold">
                    <td className="py-2">Total</td>
                    <td className="text-right py-2" colSpan={3}>
                      {data.totalPaid}
                    </td>
                  </tr>
                </tbody>
              </table>

              <p>Surat keterangan ini dibuat untuk dipergunakan sebagaimana mestinya.</p>

              <div className="pt-8 text-right">
                <p>
                  Depok, {new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                </p>
                <p className="mb-16">Dekan,</p>
                <p className="font-bold">Dr. Budi Santoso, M.Kom.</p>
                <p>NIP. 197501232000121001</p>
              </div>
            </div>
          </div>
        )

      case "custom":
        return (
          <div className="space-y-6 p-8 font-serif">
            <div className="flex justify-between items-center border-b pb-4">
              <div className="flex items-center gap-3">
                <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-xs text-gray-500">Logo</span>
                </div>
                <div>
                  <h2 className="text-lg font-bold">UNIVERSITAS INDONESIA</h2>
                  <p className="text-sm">Fakultas Ilmu Komputer</p>
                </div>
              </div>
              <div className="text-right text-sm">
                <p>Jl. Margonda Raya, Depok</p>
                <p>Jawa Barat 16424</p>
                <p>www.cs.ui.ac.id</p>
              </div>
            </div>

            <div className="text-center">
              <h1 className="text-xl font-bold underline">{data.letterTitle.toUpperCase()}</h1>
              <p className="text-sm">Nomor: 999/SK/FASILKOM/2023</p>
            </div>

            <div>
              <div className="mb-4">
                <p>Kepada Yth.</p>
                <p>{data.recipient}</p>
                <p>{data.recipientAddress}</p>
              </div>

              <p className="mb-4">Dengan hormat,</p>

              <div className="space-y-4">
                <p>{data.letterContent}</p>

                <p>
                  Demikian surat ini kami sampaikan untuk {data.letterPurpose}. Atas perhatian dan kerjasamanya, kami
                  ucapkan terima kasih.
                </p>
              </div>

              <div className="pt-8 text-right">
                <p>
                  Depok, {new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                </p>
                <p className="mb-16">Dekan,</p>
                <p className="font-bold">Dr. Budi Santoso, M.Kom.</p>
                <p>NIP. 197501232000121001</p>
              </div>
            </div>
          </div>
        )

      default:
        return <p>Preview tidak tersedia</p>
    }
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue="preview" value={view} onValueChange={(v) => setView(v as "preview" | "data")}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="preview">Pratinjau Surat</TabsTrigger>
          <TabsTrigger value="data">Data Formulir</TabsTrigger>
        </TabsList>
        <TabsContent value="preview" className="mt-4">
          <Card className="border shadow-md">
            <CardContent className="p-0">{renderLetterContent()}</CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="data" className="mt-4">
          <Card>
            <CardContent className="p-4">
              <pre className="bg-muted p-4 rounded-md overflow-auto text-xs">{JSON.stringify(data, null, 2)}</pre>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

