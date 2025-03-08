"use client"

import { useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Printer, Save, Plus, Trash } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { format } from "date-fns"

interface ControlCardEntry {
  id: number
  date: string
  uraian: string
  keterangan: string
  paraf: "Sudah" | "Belum"
}

interface StudentInfo {
  id: string
  nama: string
  nim: string
  penasehat_akademik: string
  tahun_akademik: string
  avatar?: string
}

interface SignatureInfo {
  tanggal: string
  namaProdi: string
  namaKetuaProdi: string
  nbm: string
}

interface AdvisorControlCardProps {
  student: StudentInfo
  initialEntries?: ControlCardEntry[]
  onSave?: (studentId: string, entries: ControlCardEntry[]) => void
}

export function AdvisorControlCard({ student, initialEntries = [], onSave }: AdvisorControlCardProps) {
  const [showDetail, setShowDetail] = useState(true)
  const [entries, setEntries] = useState<ControlCardEntry[]>(initialEntries)
  const [newEntry, setNewEntry] = useState<Partial<ControlCardEntry>>({
    date: format(new Date(), "dd MMMM yyyy"),
    uraian: "",
    keterangan: "",
    paraf: "Belum",
  })
  const [isEditing, setIsEditing] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const signatureInfo: SignatureInfo = {
    tanggal: format(new Date(), "dd MMMM yyyy"),
    namaProdi: "Informatika",
    namaKetuaProdi: "Dr. Ahmad Dahlan, M.Kom",
    nbm: "1234567",
  }

  const handleAddEntry = () => {
    if (!newEntry.uraian || !newEntry.keterangan) {
      toast({
        title: "Input tidak lengkap",
        description: "Mohon lengkapi uraian dan keterangan",
        variant: "destructive",
      })
      return
    }

    const entry: ControlCardEntry = {
      id: Date.now(),
      date: newEntry.date || format(new Date(), "dd MMMM yyyy"),
      uraian: newEntry.uraian || "",
      keterangan: newEntry.keterangan || "",
      paraf: "Belum",
    }

    setEntries([...entries, entry])
    setNewEntry({
      date: format(new Date(), "dd MMMM yyyy"),
      uraian: "",
      keterangan: "",
      paraf: "Belum",
    })

    toast({
      title: "Entri berhasil ditambahkan",
      description: "Entri baru telah ditambahkan ke kartu kontrol",
    })
  }

  const handleRemoveEntry = (id: number) => {
    setEntries(entries.filter((entry) => entry.id !== id))
    toast({
      title: "Entri dihapus",
      description: "Entri telah dihapus dari kartu kontrol",
    })
  }

  const handleToggleParaf = (id: number) => {
    setEntries(
      entries.map((entry) =>
        entry.id === id ? { ...entry, paraf: entry.paraf === "Sudah" ? "Belum" : "Sudah" } : entry,
      ),
    )
  }

  const handleSave = () => {
    if (onSave) {
      onSave(student.id, entries)
    }

    toast({
      title: "Kartu kontrol disimpan",
      description: "Perubahan pada kartu kontrol telah disimpan",
    })
  }

  const handlePrint = () => {
    toast({
      title: "Menyiapkan dokumen untuk cetak...",
      duration: 2000,
    })

    setTimeout(() => {
      const printContent = document.getElementById("control-card-printable")
      const originalContents = document.body.innerHTML

      if (printContent) {
        // Create a new window for printing
        const printWindow = window.open("", "_blank")
        if (printWindow) {
          printWindow.document.write(`
            <html>
              <head>
                <title>Kartu Kontrol Penasehat Akademik</title>
                <style>
                  body { font-family: Arial, sans-serif; }
                  .print-container { padding: 20px; }
                  table { width: 100%; border-collapse: collapse; margin: 15px 0; }
                  th, td { border: 1px solid #ddd; padding: 8px; text-align: center; }
                  th { background-color: #f2f2f2; }
                  .header { display: flex; justify-content: space-between; align-items: center; }
                  .center-content { text-align: center; }
                  .signature { text-align: right; margin-top: 30px; }
                  .footer { margin-top: 30px; border-top: 4px solid #1e40af; padding-top: 10px; }
                  .badge { display: inline-block; padding: 3px 8px; border-radius: 4px; font-size: 12px; }
                  .badge-success { background-color: #10b981; color: white; }
                  .badge-outline { border: 1px solid #6b7280; }
                  .student-info { margin: 15px 0; }
                  .student-info div { margin-bottom: 5px; }
                  ul { padding-left: 20px; }
                  li { margin-bottom: 5px; }
                </style>
              </head>
              <body>
                <div class="print-container">
                  ${printContent.innerHTML}
                </div>
                <script>
                  window.onload = function() { window.print(); window.close(); }
                </script>
              </body>
            </html>
          `)
          printWindow.document.close()
        } else {
          toast({
            title: "Gagal membuka jendela cetak",
            description: "Mohon izinkan pop-up untuk situs ini",
            variant: "destructive",
          })
        }
      }
    }, 500)
  }

  const handleDownloadPDF = async () => {
    toast({
      title: "Menyiapkan dokumen PDF...",
      duration: 2000,
    })

    try {
      // Dynamically import the jspdf and html2canvas libraries
      const [jsPDFModule, html2canvasModule] = await Promise.all([import("jspdf"), import("html2canvas")])

      const jsPDF = jsPDFModule.default
      const html2canvas = html2canvasModule.default

      const element = document.getElementById("control-card-printable")
      if (!element) return

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
      })

      const imgData = canvas.toDataURL("image/png")

      // A4 size: 210 x 297 mm
      const pdf = new jsPDF("p", "mm", "a4")
      const imgWidth = 210
      const pageHeight = 297
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight
      let position = 0

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      // Add new pages if content is longer than one page
      while (heightLeft > 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      pdf.save(`Kartu_Kontrol_${student.nim}.pdf`)

      toast({
        title: "PDF berhasil diunduh",
        description: "File telah disimpan ke perangkat Anda",
      })
    } catch (error) {
      console.error("Error generating PDF:", error)
      toast({
        title: "Gagal mengunduh PDF",
        description: "Terjadi kesalahan saat membuat file PDF",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Kartu Kontrol Penasehat Akademik</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Cetak
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownloadPDF}>
            <Download className="mr-2 h-4 w-4" />
            Unduh PDF
          </Button>
          <Button variant="default" size="sm" onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Simpan
          </Button>
        </div>
      </div>

      <Card className="border shadow-md" ref={cardRef}>
        <CardContent className="p-6 space-y-6" id="control-card-printable">
          {showDetail && (
            <div className="bg-muted/50 p-6 rounded-lg">
              <div className="flex items-center justify-between gap-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-ft-T7L7l1vUFh5KeljiEEEoF4RwUDZysM.png"
                    alt="Logo Fakultas Teknik"
                  />
                  <AvatarFallback>FT</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-center text-center">
                  <h3 className="text-xl font-bold text-primary">UNIVERSITAS MUHAMMADIYAH MAKASSAR</h3>
                  <h3 className="text-xl font-bold text-primary">PROGRAM STUDI INFORMATIKA</h3>
                  <h3 className="text-xl font-bold text-primary">FAKULTAS TEKNIK</h3>
                </div>
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/unggul-bu5YeqPdJk5brz6jhTnwRjzhs50lwL.png"
                    alt="Logo Unggul"
                  />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </div>
            </div>
          )}

          <div className="flex flex-col items-center justify-center space-y-2">
            {showDetail && <p className="text-xl text-primary">بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ</p>}
            <h3 className="text-xl font-bold">KARTU KONTROL PENASEHAT AKADEMIK</h3>
            <h3 className="text-xl font-bold">TAHUN AJARAN: {student.tahun_akademik}</h3>
          </div>

          <div className="space-y-2">
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-2 font-bold">Nama</div>
              <div className="col-span-10">: {student.nama}</div>
            </div>
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-2 font-bold">NIM/Stambuk</div>
              <div className="col-span-10">: {student.nim}</div>
            </div>
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-2 font-bold">Penasehat Akademik</div>
              <div className="col-span-10">: {student.penasehat_akademik}</div>
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted">
                  <TableHead className="text-center">No</TableHead>
                  <TableHead className="text-center">Hari/Tanggal</TableHead>
                  <TableHead className="text-center">Uraian</TableHead>
                  <TableHead className="text-center">Keterangan</TableHead>
                  <TableHead className="text-center">Paraf</TableHead>
                  {isEditing && <TableHead className="text-center">Aksi</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {entries.map((entry, index) => (
                  <TableRow key={entry.id}>
                    <TableCell className="text-center">{index + 1}</TableCell>
                    <TableCell className="text-center">{entry.date}</TableCell>
                    <TableCell className="text-center font-medium">{entry.uraian}</TableCell>
                    <TableCell className="text-center">{entry.keterangan}</TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant={entry.paraf === "Sudah" ? "success" : "outline"}
                        className="cursor-pointer"
                        onClick={() => isEditing && handleToggleParaf(entry.id)}
                      >
                        {entry.paraf}
                      </Badge>
                    </TableCell>
                    {isEditing && (
                      <TableCell className="text-center">
                        <Button variant="ghost" size="icon" onClick={() => handleRemoveEntry(entry.id)}>
                          <Trash className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
                {isEditing && (
                  <TableRow>
                    <TableCell className="text-center">{entries.length + 1}</TableCell>
                    <TableCell>
                      <Input
                        value={newEntry.date}
                        onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        placeholder="Uraian konsultasi"
                        value={newEntry.uraian}
                        onChange={(e) => setNewEntry({ ...newEntry, uraian: e.target.value })}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        placeholder="Keterangan"
                        value={newEntry.keterangan}
                        onChange={(e) => setNewEntry({ ...newEntry, keterangan: e.target.value })}
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline">Belum</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button variant="ghost" size="icon" onClick={handleAddEntry}>
                        <Plus className="h-4 w-4 text-primary" />
                      </Button>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-center mt-4">
            <Button variant={isEditing ? "destructive" : "outline"} onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? "Selesai Edit" : "Edit Kartu Kontrol"}
            </Button>
          </div>

          {showDetail && (
            <>
              <Separator className="my-4" />
              <div className="space-y-2">
                <p className="font-bold">Catatan: Sebelum Tanda Tangan Ketua Prodi, Mahasiswa diwajibkan:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li className="font-medium">
                    Konsultasi ke Penasehat Akademik setiap Bulan Semester Berjalan (Min. 5 kali)
                  </li>
                  <li className="font-medium">
                    Pengurusan Tanda Tangan dan Cetak KRS Online pada Awal Semester Berjalan (1 Bulan awal Semester)
                  </li>
                  <li className="font-medium">
                    Pengisian Uraian Kartu Kontrol diisi oleh Mahasiswa pada saat Konsultasi di Depan PA yang ditandai
                    dengan Paraf PA
                  </li>
                  <li className="font-medium">
                    Point 1, 2, dan 3 wajib dipenuhi sebagai Syarat Pengambilan Kartu UAS Semester Berjalan
                  </li>
                </ul>
              </div>

              <div className="text-right space-y-1 mt-6">
                <p>Makassar, {signatureInfo.tanggal}</p>
                <p>Ketua Prodi {signatureInfo.namaProdi}</p>
                <div className="h-16"></div>
                <p>{signatureInfo.namaKetuaProdi}</p>
                <p>NBM: {signatureInfo.nbm}</p>
              </div>

              <div className="mt-6 pt-4 border-t-4 border-primary bg-muted/30 p-4 rounded-b-lg">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">
                      Gedung Menara Iqra Lantai 3<br />
                      Jl. Sultan Alauddin No. 259 Telp. (0411) 866 972 Fax (0411) 865 588 Makassar 90221
                      <br />
                      Web:{" "}
                      <a href="https://if.unismuh.ac.id/" className="text-primary hover:underline">
                        https://if.unismuh.ac.id/
                      </a>
                      , e-mail:{" "}
                      <a href="mailto:if@unismuh.ac.id" className="text-primary hover:underline">
                        if@unismuh.ac.id
                      </a>
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/iso-sRoTQ5LzCgK8FuupxU4caXXXog34cF.png"
                      alt="ISO Certification"
                      className="h-12 w-auto object-contain"
                    />
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/merdeka-brEVHdXNXBw3ck1f7GsafYW1yTNNvd.png"
                      alt="Kampus Merdeka"
                      className="h-12 w-auto object-contain"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

