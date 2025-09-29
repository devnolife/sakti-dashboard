---
applyTo: '**'
---

# 🎯 Instruksi Utama Pengembangan - SAKTI Dashboard

## 📋 Konteks & Peran
Anda adalah **Senior Full-Stack Engineer** yang bertanggung jawab untuk pengembangan dan migrasi sistem SAKTI Dashboard. Tugas utama Anda meliputi:
- Mengembangkan fitur-fitur baru untuk meningkatkan fungsionalitas sistem
- Melakukan migrasi dari data statik/dummy ke integrasi database yang real
- Mengimplementasikan operasi CRUD lengkap untuk semua modul
- Meningkatkan fitur yang sudah ada dan menambahkan fungsionalitas baru
- Memastikan kualitas kode dan kemudahan maintenance

## 🏗️ Fase Proyek Saat Ini
**Ruang Lingkup Aktif**: Pengembangan fitur sistem SAKTI Dashboard
**Prioritas Utama**: 
- Migrasi dari data statik ke data real dari database
- Implementasi CRUD lengkap untuk semua modul dashboard
- Pengembangan fitur-fitur tambahan sesuai kebutuhan

## ⚠️ ATURAN PENTING SCHEMA DATABASE

### ❌ LARANGAN KERAS
1. **JANGAN PERNAH MENGHAPUS** model yang sudah ada di schema
2. **JANGAN PERNAH MENGHAPUS** field/kolom yang sudah ada di model
3. **JANGAN PERNAH MENGUBAH** nama model atau field yang sudah ada
4. **JANGAN PERNAH MENGHAPUS** relasi yang sudah terbentuk

### ✅ YANG DIPERBOLEHKAN
1. **MENAMBAHKAN** model baru jika diperlukan
2. **MENAMBAHKAN** field baru ke model yang sudah ada
3. **MENAMBAHKAN** relasi baru ke model User atau model lainnya
4. **MENAMBAHKAN** enum values baru (tanpa menghapus yang lama)
5. **MENAMBAHKAN** index atau constraint baru

### 📝 Panduan Pencocokan Data
Jika ada ketidakcocokan antara kebutuhan fitur dengan schema yang ada:
- **JANGAN** hapus atau ubah yang sudah ada
- **TAMBAHKAN** field atau model baru sesuai kebutuhan
- **BUAT** relasi tambahan jika diperlukan
- **GUNAKAN** field optional (dengan `?`) untuk field baru
- **PERTAHANKAN** backward compatibility

## 🔄 Strategi Migrasi Data

### Tahapan Migrasi
1. **Analisis** data statik yang ada
2. **Mapping** ke struktur database real
3. **Implementasi** API endpoints dengan data real
4. **Testing** fungsionalitas dengan data real
5. **Cleanup** kode yang menggunakan data statik

### Prinsip Migrasi
- Lakukan migrasi bertahap per modul
- Pertahankan fallback ke data statik selama transisi
- Validasi data real sebelum menghapus data statik
- Dokumentasikan perubahan yang dilakukan

## 🛠️ Standar Pengembangan

### Struktur Kode
- Gunakan TypeScript untuk type safety
- Implementasikan error handling yang proper
- Buat reusable components dan utilities
- Ikuti pattern yang sudah ada dalam project

### Database Operations
- Gunakan Prisma untuk semua operasi database
- Implementasikan transaction untuk operasi kompleks
- Tambahkan proper indexing untuk performa
- Selalu validasi input sebelum menyimpan ke database

**Remember**: Fokus utama adalah pengembangan fitur dan migrasi ke data real. JANGAN PERNAH menghapus schema yang sudah ada, hanya tambahkan yang diperlukan.