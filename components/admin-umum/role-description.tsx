import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Receipt, GraduationCap, Mail, FileText, Building, UserCog, Pencil } from "lucide-react"

export default function StaffUmumRoleDescription() {
  return (
    <Card className="border-none shadow-md">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardTitle className="text-2xl">Deskripsi Peran Administrasi Umum</CardTitle>
        <CardDescription>Tanggung jawab dan lingkup tugas Administrasi Umum dalam struktur organisasi</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Ikhtisar</TabsTrigger>
            <TabsTrigger value="non-regular">Mahasiswa Non-Reguler</TabsTrigger>
            <TabsTrigger value="correspondence">Korespondensi</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="prose max-w-none dark:prose-invert">
              <p>
                <strong>Administrasi Umum</strong> adalah peran penting dalam struktur organisasi yang bertanggung jawab untuk
                mengelola dua area utama:
              </p>
              <ol>
                <li>
                  Pengelolaan urusan mahasiswa non-reguler, khususnya terkait pemrosesan pembayaran dan urusan akademik.
                </li>
                <li>
                  Penyusunan korespondensi resmi, termasuk surat-surat yang ditujukan kepada pimpinan seperti Dekan dan
                  Wakil Dekan.
                </li>
              </ol>
              <p>
                Peran ini membutuhkan kemampuan administratif yang baik, pemahaman tentang prosedur akademik, dan
                keterampilan komunikasi tertulis yang efektif. Administrasi Umum bekerja sama dengan berbagai departemen dan
                pimpinan untuk memastikan kelancaran operasional dan komunikasi dalam institusi.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2">
              <Card className="border border-primary/20 bg-primary/5">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Mahasiswa Non-Reguler</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Receipt className="h-4 w-4 text-primary mt-0.5" />
                      <span>Pemrosesan dan verifikasi pembayaran</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <GraduationCap className="h-4 w-4 text-primary mt-0.5" />
                      <span>Pengelolaan urusan akademik</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <UserCog className="h-4 w-4 text-primary mt-0.5" />
                      <span>Pendaftaran dan administrasi mahasiswa</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border border-secondary/20 bg-secondary/5">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-secondary" />
                    <CardTitle className="text-lg">Korespondensi</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Pencil className="h-4 w-4 text-secondary mt-0.5" />
                      <span>Penyusunan draft surat resmi</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Building className="h-4 w-4 text-secondary mt-0.5" />
                      <span>Korespondensi dengan pimpinan</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FileText className="h-4 w-4 text-secondary mt-0.5" />
                      <span>Pengelolaan arsip surat</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="non-regular" className="space-y-4">
            <div className="prose max-w-none dark:prose-invert">
              <h3>Pengelolaan Urusan Mahasiswa Non-Reguler</h3>
              <p>
                Administrasi Umumbertanggung jawab untuk mengelola berbagai aspek yang berkaitan dengan mahasiswa non-reguler,
                termasuk program kelas karyawan, program ekstensi, dan program khusus lainnya. Tanggung jawab ini
                mencakup:
              </p>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Receipt className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Pemrosesan Pembayaran</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm">
                    <strong>Verifikasi Pembayaran:</strong> Memeriksa bukti pembayaran yang dikirimkan oleh mahasiswa
                    non-reguler untuk memastikan keabsahan dan kesesuaian dengan jumlah yang ditetapkan.
                  </p>
                  <p className="text-sm">
                    <strong>Pencatatan Transaksi:</strong> Mencatat semua transaksi pembayaran dalam sistem keuangan
                    institusi dan memastikan data tersimpan dengan benar.
                  </p>
                  <p className="text-sm">
                    <strong>Penerbitan Tanda Terima:</strong> Menerbitkan tanda terima atau bukti pembayaran resmi untuk
                    mahasiswa setelah pembayaran diverifikasi.
                  </p>
                  <p className="text-sm">
                    <strong>Penanganan Keterlambatan:</strong> Mengelola kasus keterlambatan pembayaran, termasuk
                    mengirimkan pengingat dan menerapkan kebijakan terkait sanksi keterlambatan.
                  </p>
                  <p className="text-sm">
                    <strong>Pelaporan Keuangan:</strong> Menyiapkan laporan keuangan berkala terkait pembayaran
                    mahasiswa non-reguler untuk keperluan audit dan evaluasi.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-secondary" />
                    <CardTitle className="text-lg">Urusan Akademik</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm">
                    <strong>Pendaftaran Mata Kuliah:</strong> Membantu mahasiswa non-reguler dalam proses pendaftaran
                    mata kuliah dan memastikan kesesuaian dengan kurikulum yang berlaku.
                  </p>
                  <p className="text-sm">
                    <strong>Penjadwalan Kuliah:</strong> Berkoordinasi dengan departemen akademik untuk menyusun jadwal
                    kuliah yang sesuai dengan kebutuhan mahasiswa non-reguler.
                  </p>
                  <p className="text-sm">
                    <strong>Pengelolaan Nilai:</strong> Memproses dan mendokumentasikan nilai mahasiswa non-reguler,
                    serta menangani permasalahan terkait nilai.
                  </p>
                  <p className="text-sm">
                    <strong>Konsultasi Akademik:</strong> Menyediakan layanan konsultasi dasar terkait permasalahan
                    akademik yang dihadapi mahasiswa non-reguler.
                  </p>
                  <p className="text-sm">
                    <strong>Koordinasi dengan Dosen:</strong> Menjadi penghubung antara mahasiswa non-reguler dengan
                    dosen untuk berbagai keperluan akademik.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <UserCog className="w-5 h-5 text-accent" />
                    <CardTitle className="text-lg">Administrasi Mahasiswa</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm">
                    <strong>Pendaftaran Mahasiswa Baru:</strong> Memproses pendaftaran mahasiswa non-reguler baru,
                    termasuk verifikasi dokumen dan persyaratan.
                  </p>
                  <p className="text-sm">
                    <strong>Pembaruan Data:</strong> Memastikan data mahasiswa non-reguler selalu terbarui dalam sistem
                    informasi akademik.
                  </p>
                  <p className="text-sm">
                    <strong>Penerbitan Surat Keterangan:</strong> Menyiapkan berbagai surat keterangan yang dibutuhkan
                    mahasiswa non-reguler untuk keperluan eksternal.
                  </p>
                  <p className="text-sm">
                    <strong>Penanganan Cuti dan Pengunduran Diri:</strong> Memproses permohonan cuti akademik dan
                    pengunduran diri dari mahasiswa non-reguler.
                  </p>
                  <p className="text-sm">
                    <strong>Dokumentasi:</strong> Mengelola arsip dan dokumentasi terkait mahasiswa non-reguler sesuai
                    dengan standar yang berlaku.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="correspondence" className="space-y-4">
            <div className="prose max-w-none dark:prose-invert">
              <h3>Penyusunan Korespondensi Resmi</h3>
              <p>
                Administrasi Umum bertanggung jawab untuk menyusun berbagai jenis korespondensi resmi, terutama yang ditujukan
                kepada pimpinan institusi. Tanggung jawab ini mencakup:
              </p>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Pencil className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Penyusunan Draft Surat</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm">
                    <strong>Surat Undangan:</strong> Menyusun draft surat undangan untuk berbagai kegiatan resmi,
                    seperti rapat koordinasi, seminar, dan acara akademik.
                  </p>
                  <p className="text-sm">
                    <strong>Surat Keputusan:</strong> Membantu dalam penyusunan draft surat keputusan terkait kebijakan
                    akademik dan administratif.
                  </p>
                  <p className="text-sm">
                    <strong>Surat Edaran:</strong> Menyiapkan draft surat edaran untuk menyampaikan informasi penting
                    kepada seluruh civitas akademika.
                  </p>
                  <p className="text-sm">
                    <strong>Surat Keterangan:</strong> Menyusun berbagai jenis surat keterangan sesuai dengan kebutuhan
                    institusi dan mahasiswa.
                  </p>
                  <p className="text-sm">
                    <strong>Surat Perjanjian:</strong> Membantu dalam penyusunan draft surat perjanjian kerjasama dengan
                    pihak eksternal.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Building className="w-5 h-5 text-secondary" />
                    <CardTitle className="text-lg">Korespondensi dengan Pimpinan</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm">
                    <strong>Surat untuk Dekan:</strong> Menyusun draft surat yang ditujukan kepada Dekan, termasuk
                    laporan, permohonan, dan informasi penting lainnya.
                  </p>
                  <p className="text-sm">
                    <strong>Surat untuk Wakil Dekan:</strong> Menyiapkan draft surat untuk Wakil Dekan sesuai dengan
                    bidang tugasnya masing-masing (akademik, keuangan, kemahasiswaan, dll).
                  </p>
                  <p className="text-sm">
                    <strong>Memo Internal:</strong> Menyusun memo internal untuk komunikasi antar departemen dan dengan
                    pimpinan.
                  </p>
                  <p className="text-sm">
                    <strong>Notulensi Rapat:</strong> Mendokumentasikan hasil rapat pimpinan dan menyusun notulensi yang
                    akan didistribusikan.
                  </p>
                  <p className="text-sm">
                    <strong>Laporan Berkala:</strong> Membantu dalam penyusunan laporan berkala untuk pimpinan terkait
                    berbagai aspek operasional.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-accent" />
                    <CardTitle className="text-lg">Pengelolaan Arsip Surat</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm">
                    <strong>Pengarsipan:</strong> Mengelola sistem pengarsipan surat masuk dan keluar secara sistematis
                    dan terorganisir.
                  </p>
                  <p className="text-sm">
                    <strong>Pencatatan:</strong> Mencatat semua korespondensi dalam buku agenda atau sistem informasi
                    yang digunakan.
                  </p>
                  <p className="text-sm">
                    <strong>Distribusi:</strong> Memastikan surat-surat didistribusikan kepada pihak-pihak yang dituju
                    secara tepat waktu.
                  </p>
                  <p className="text-sm">
                    <strong>Tindak Lanjut:</strong> Memantau tindak lanjut dari surat-surat penting dan memastikan
                    adanya respons yang sesuai.
                  </p>
                  <p className="text-sm">
                    <strong>Digitalisasi:</strong> Mengembangkan dan mengelola sistem arsip digital untuk memudahkan
                    pencarian dan akses terhadap dokumen.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

