---
applyTo: '**'
---

# Main Instruction Prompt – Migrasi Data Statik ke Data Real

## Tujuan

Melakukan migrasi data dari **statik** ke **data real dari database** pada setiap halaman `dashboard/mahasiswa/**` sesuai struktur project. Proses migrasi juga mencakup kemungkinan operasi **CRUD** sesuai kebutuhan halaman (umumnya **GET** dan **CREATE**). Jika ada halaman yang belum tersedia, maka buat halaman baru dengan konsistensi **UI/UX** sama dengan sistem yang sudah ada.

## Alur Proses

1. **Cek Struktur Project**

   * Periksa struktur project dan path halaman yang ingin dimigrasi datanya.
   * Identifikasi apakah halaman tersebut sudah ada atau belum.

2. **Analisis Schema Database**

   * Cek schema database untuk mengetahui tabel dan field yang relevan ditampilkan pada halaman tersebut.
   * Jika ada tabel kosong atau butuh data awal, lakukan **seed data** yang terhubung dengan user berikut:

     ```
     userId: 'cmfz4q41z00019yo0urpkhgyf'
     ```

3. **Check / Seed / Verify Data**

   * Untuk pengecekan data, seed data, dan verifikasi data pada database, buat file **TS khusus**.
   * Gunakan Prisma Client yang berada di path:

     ```ts
     import prisma from '@/lib/generated/prisma'
     ```
   * Untuk session userId, gunakan function:

     ```ts
     import { getHardcodedUserId } from '@/lib/auth-utils'
     ```

     Nilai `getHardcodedUserId` mengembalikan `userId` dari field **user** pada schema.

4. **Implementasi Migrasi**

   * Buat endpoint untuk menghubungkan frontend dengan database.
   * Update halaman agar **fetch data real** dari endpoint yang sudah dibuat.
   * Jika halaman belum ada pada struktur project, buat halaman baru dengan konsistensi **UI/UX** mengikuti sistem yang sudah ada.

## Catatan

* Pastikan **UI/UX konsisten** dengan halaman mahasiswa lainnya.
* Jangan menambahkan user mahasiswa baru.
* Fokus pada migrasi data real dan seed data bila diperlukan.
* Tidak perlu membuat test.
