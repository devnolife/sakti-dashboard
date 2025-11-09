# Quick Start - Manajemen Jenis Surat

## Untuk Admin Umum

### 1. Akses Halaman
- Login sebagai Admin Umum
- Buka menu: **Korespondensi** → **Jenis Surat**
- URL: `/dashboard/admin-umum/letter-types`

### 2. Tambah Jenis Surat Baru

**Langkah-langkah:**
1. Klik tombol **"+ Tambah Jenis Surat"**
2. Isi form:
   - **Judul**: "Surat Keterangan Penelitian" ⭐
   - **Deskripsi**: "Surat untuk keperluan penelitian mahasiswa" ⭐
   - **Pihak yang Menyetujui**: Pilih "Dekan" ⭐
   - **Estimasi Hari**: Masukkan "5" ⭐
   - **Dokumen Diperlukan**: "KTM, Proposal Penelitian" (opsional)
   - **Template**: Isi jika ada template khusus (opsional)
   - **☑ Berlaku untuk semua prodi**: Centang jika global
3. Klik **"Tambah Jenis Surat"**

⭐ = Field wajib diisi

### 3. Edit Jenis Surat

1. Cari surat yang ingin diedit
2. Klik icon **Edit** (✏️)
3. Ubah informasi
4. Klik **"Simpan Perubahan"**

### 4. Nonaktifkan Jenis Surat

1. Klik icon **Trash** (🗑️)
2. Konfirmasi
3. Surat tidak akan muncul di pilihan mahasiswa/dosen

---

## Contoh Jenis Surat yang Bisa Dibuat

### 1. Surat Penelitian
- **Judul**: Surat Keterangan Penelitian
- **Approval**: Dekan
- **Estimasi**: 5-7 hari
- **Dokumen**: KTM, Proposal Penelitian, Surat Pengantar

### 2. Surat Magang
- **Judul**: Surat Pengantar Magang/PKL
- **Approval**: Kaprodi
- **Estimasi**: 3-5 hari
- **Dokumen**: KTM, KRS, Surat Permohonan Perusahaan

### 3. Surat Rekomendasi
- **Judul**: Surat Rekomendasi Beasiswa
- **Approval**: Dekan
- **Estimasi**: 7-10 hari
- **Dokumen**: KTM, Transkrip Nilai, Surat Permohonan

### 4. Surat Keterangan Berkelakuan Baik
- **Judul**: Surat Keterangan Berkelakuan Baik
- **Approval**: Admin Umum
- **Estimasi**: 2-3 hari
- **Dokumen**: KTM

---

## FAQ

**Q: Berapa lama surat akan aktif?**  
A: Setelah dibuat, surat langsung aktif dan bisa digunakan mahasiswa/dosen.

**Q: Bisa edit setelah dibuat?**  
A: Ya, bisa edit kapan saja. Perubahan langsung berlaku.

**Q: Bagaimana jika salah membuat?**  
A: Klik icon Trash untuk menonaktifkan. Surat tidak dihapus permanen.

**Q: Perbedaan Global vs Per-Prodi?**  
A: 
- **Global**: Semua prodi bisa akses
- **Per-Prodi**: Hanya prodi tertentu yang bisa akses

**Q: Bisa membuat template kustom?**  
A: Ya, di field "Template Surat" bisa isi format HTML atau text.

---

## Tips 💡

1. **Judul Jelas**: "Surat Keterangan Penelitian" lebih baik dari "Surat 1"
2. **Estimasi Realistis**: Jangan terlalu cepat atau terlalu lama
3. **Dokumen Lengkap**: Sebutkan semua dokumen yang benar-benar diperlukan
4. **Gunakan Global**: Untuk surat umum seperti aktif kuliah, cuti, dll

---

## Bantuan

Jika ada masalah:
1. Refresh halaman
2. Check apakah sudah login sebagai Admin Umum
3. Pastikan semua field wajib terisi
4. Lihat dokumentasi lengkap di `docs/LETTER_TYPES_MANAGEMENT.md`
