# Perbaikan & Penambahan Fitur Sistem Ujian
## Tujuan
### Perbaikan Bug Scroll Form
Pada halaman pendaftaran ujian (/dashboard/mahasiswa/exams/register), form tidak bisa di-scroll ke bawah sehingga hanya terlihat setengah form saja.

### Perubahan & Penambahan Fitur "Ujian Proposalination Requirements"
Pada halaman (/dashboard/mahasiswa/exams) ganti seluruh requirement default dengan requirement baru sesuai tahap ujian (Ujian Proposal, Ujian Hasil, Ujian Tutup).
Tambahkan form upload file untuk setiap requirement. Semua file yang di-upload akan disimpan di folder public/uploads/[jenis-ujian].

Fitur Baru: Kelengkapan Berkas
Struktur Tahapan & Persyaratan
* Ujian Proposal
- Pembayaran BPP
- Biaya Komprehensif
- Surat SK Pembimbing
- Surat Keterangan Penyelesaian Laporan KKP
- Transkrip Nilai minimal 145 SKS
- Praktikum Ilmu Falaq
- Surat Pernyataan Publikasi Produk
- Bukti Publish Produk
- Surat Keterangan Baca Al-Qur’an
- Sertifikat DAD
- Uji Plagiat Skripsi
- Kartu Kontrol Mengikuti Seminar minimal 10 kali
- Persetujuan Pembimbing 1 & 2

* Ujian Hasil
- Pembayaran BPP
- Biaya Ujian Seminar (WD2)
- Transkrip Nilai
- Sertifikat Praktikum
- Uji Plagiat Skripsi
- Persetujuan Pembimbing 1 & 2
- Skripsi Jilid 6 Rangkap

* Ujian Tutup
- Pembayaran BPP
- Pembayaran Ujian
- Biaya Tambahan ke WD2
- Pembayaran Wisuda & Perpustakaan
- Uji Plagiat
- Persetujuan Pembimbing 1 & 2
- Skripsi Jilid 1 Rangkap
- Berkas LoA Submit Jurnal
- Transkrip Nilai minimal 150 SKS
- Berkas Persyaratan Yudisium

Validasi: hanya menerima format .pdf
Simpan metadata (nama file, jenis ujian, tanggal upload, mahasiswa) ke database.

Persyaratan Ujian
Tambahkan tab 3 bagian: Proposal | Hasil | Tutup.
Setiap item requirement tampil sebagai card dengan tombol Upload File.
Tampilkan status ✅ jika file sudah di-upload, ❌ jika belum.
Semua teks, label, button, notifikasi diganti ke Bahasa Indonesia penuh.