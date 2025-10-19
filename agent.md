Saya ingin melakukan migrasi data statik ke database real untuk:

**Modul**: Lokasi KKP Mahasiswa
**Path Halaman**: /app/dashboard/mahasiswa/kkp/locations/**

**Data yang akan dimigrasi**:
- Daftar lokasi KKP

**Fungsi yang dibutuhkan**:
- [x] GET - Ambil semua lokasi KKP yang tersedia ✅ COMPLETED
- [x] POST - Tambah lokasi KKP baru ✅ COMPLETED  
- [x] DELETE - Hapus lokasi KKP yang hanya dibuat oleh mahasiswa ✅ COMPLETED

**Relasi yang diperlukan**:
- [x] Student -> KkpLocation (one-to-many) ✅ COMPLETED
- [x] KkpLocation -> Company (many-to-one) ✅ COMPLETED
- [x] KkpLocation -> KkpDocument (one-to-many) ✅ COMPLETED

**Validasi yang diperlukan**:
- [x] Tidak ada duplikasi lokasi berdasarkan nama dan alamat ✅ COMPLETED
- [x] Hanya mahasiswa yang membuat lokasi yang bisa menghapusnya ✅ COMPLETED

**Status Migrasi**: ✅ **SELESAI SEMPURNA**

**Hasil Akhir**:
- ✅ Semua API endpoints (GET, POST, DELETE) berfungsi dengan sempurna
- ✅ Frontend fully functional dengan data real dari database
- ✅ Hardcoded userId untuk development testing berhasil diimplementasikan
- ✅ CRUD operations telah diuji dan berjalan dengan baik
- ✅ Migrasi dari data statik ke database real berhasil 100%