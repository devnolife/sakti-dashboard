/**
 * GraphQL Queries untuk Superapps API
 * Endpoint: https://superapps.if.unismuh.ac.id/graphql
 * 
 * Berdasarkan introspection: 2025-10-30
 * Total Queries: 47
 */

// ============================================
// AUTHENTICATION & USER
// ============================================

/**
 * SAY_HELLO Query
 * Simple hello query for testing connection
 */
export const SAY_HELLO = `
  query {
    sayHello
  }
`

/**
 * PROFILE Query (requires authentication)
 * Returns current user profile (UPDATED 2025-10-30)
 * Fields: id, username, name, email, phone, role
 */
export const GET_PROFILE = `
  query {
    profile {
      id
      username
      name
      email
      phone
      role
    }
  }
`

// ============================================
// DOSEN (LECTURER) QUERIES
// ============================================

export const GET_ALL_DOSENS = `
  query {
    dosens {
      nidn
      nama
      email
      hp
    }
  }
`

export const GET_DOSEN_BY_NIDN = `
  query GetDosen($nidn: String!) {
    dosen(nidn: $nidn) {
      nidn
      nama
      email
      hp
    }
  }
`

export const GET_DOSENS_BY_NAME = `
  query GetDosensByName($nama: String!) {
    dosensByName(nama: $nama) {
      nidn
      nama
      email
      hp
    }
  }
`

export const GET_DOSEN_BY_EMAIL = `
  query GetDosenByEmail($email: String!) {
    dosenByEmail(email: $email) {
      nidn
      nama
      email
      hp
    }
  }
`

// ============================================
// MAHASISWA (STUDENT) QUERIES
// ============================================

export const GET_ALL_MAHASISWA = `
  query GetAllMahasiswa {
    mahasiswas {
      nim
      nama
      hp
      prodi_kode_prodi
    }
  }
`

export const GET_MAHASISWA_BY_NIM = `
  query GetMahasiswaByNim($nim: String!) {
    mahasiswa(nim: $nim) {
      nim
      nama
      hp
      prodi_kode_prodi
    }
  }
`

export const GET_MAHASISWA_BY_EMAIL = `
  query GetMahasiswaByEmail($email: String!) {
    mahasiswaByEmail(email: $email) {
      nim
      nama
      hp
      prodi_kode_prodi
    }
  }
`

export const GET_MAHASISWA_BY_NAME = `
  query GetMahasiswaByName($nama: String!) {
    mahasiswasByName(nama: $nama) {
      nim
      nama
      hp
      prodi_kode_prodi
    }
  }
`

export const GET_MAHASISWA_BY_PRODI = `
  query GetMahasiswaByProdi($kode_prodi: String!) {
    mahasiswasByProdi(kode_prodi: $kode_prodi) {
      nim
      nama
      hp
      prodi_kode_prodi
    }
  }
`

// ============================================
// ACADEMIC RECORDS
// ============================================

export const GET_KRS_MAHASISWA = `
  query GetKrsMahasiswa($nim: String!, $periode_krs: String!) {
    getKrsMahasiswa(nim: $nim, periode_krs: $periode_krs) {
      header {
        total_sks
        total_matakuliah
      }
      krs {
        kode_matakuliah
        nama_matakuliah
        semester
        sks
      }
    }
  }
`

export const GET_KHS_MAHASISWA = `
  query GetKhsMahasiswa($nim: String!, $periode_krs: String!) {
    getKhsMahasiswa(nim: $nim, periode_krs: $periode_krs) {
      header {
        total_sks
        total_bobot
        total_matakuliah
        ips
      }
      khs {
        kode_matakuliah
        nama_matakuliah
        semester
        sks
        grade
        nilai
        bobot
      }
    }
  }
`

export const GET_TRANSKRIP_MAHASISWA = `
  query GetTranskripMahasiswa($nim: String!) {
    getAllTranskripMahasiswa(nim: $nim) {
      header {
        total_sks_program
        total_sks_lulus
        total_matakuliah_program
        total_matakuliah_lulus
        ipk
      }
      transkrip {
        kode_matakuliah
        nama_matakuliah
        semester
        sks
        periode_krs
        status_nilai
        grade
        nilai
        bobot
      }
    }
  }
`

// ============================================
// KKP (INTERNSHIP) QUERIES
// ============================================

export const GET_ALL_KKP = `
  query GetAllKkp {
    getAllKkps {
      id
      prodi_kode_prodi
      no_surat
      tanggal_surat
      no_sk_kkp
      tanggal_sk_kkp
      instansi
      tempat
      mahasiswa_nim_ketua
      dosen_nidn_pembimbing_prodi
      nama_pembimbing_lapangan
      keterangan
      created_at
      updated_at
    }
  }
`

export const GET_KKP_BY_ID = `
  query GetKkpById($id: String!) {
    getKkp(id: $id) {
      id
      prodi_kode_prodi
      no_surat
      tanggal_surat
      no_sk_kkp
      tanggal_sk_kkp
      instansi
      tempat
      mahasiswa_nim_ketua
      dosen_nidn_pembimbing_prodi
      nama_pembimbing_lapangan
      keterangan
      created_at
      updated_at
    }
  }
`

export const CEK_KKP_MAHASISWA = `
  query CekKkpMahasiswa($nim: String!) {
    cekKkpMahasiswa(nim: $nim)
  }
`

export const GET_ALL_KKP_MAHASISWA = `
  query GetAllKkpMahasiswa {
    getAllKkpMahasiswas {
      id
      mahasiswa_nim
      keterangan
      kkp_id
      created_at
      updated_at
      mahasiswa {
        nim
        nama
        prodi_kode_prodi
      }
    }
  }
`

export const GET_KKP_MAHASISWA_BY_ID = `
  query GetKkpMahasiswaById($id: String!) {
    getKkpMahasiswa(id: $id) {
      id
      mahasiswa_nim
      keterangan
      kkp_id
      created_at
      updated_at
      mahasiswa {
        nim
        nama
        prodi_kode_prodi
      }
      kkp {
        id
        no_surat
        instansi
      }
    }
  }
`

export const GET_MAHASISWA_KKP_SYARAT_WITH_APPROVAL = `
  query GetMahasiswaKkpSyaratWithApproval($nim: String!) {
    getMahasiswaKkpSyaratWithApproval(nim: $nim) {
      mahasiswa_nim
      syarat_id
      syarat_nama
      latest_kelengkapan {
        kelengkapan_id
        uploaded_file_id
        keterangan
        updated_at
      }
      latest_approval {
        approval_id
        approval_status_id
        approval_status_nama
        updated_at
      }
    }
  }
`

export const GET_ALL_APPROVED_MAHASISWA = `
  query GetAllApprovedMahasiswa {
    getAllApprovedMahasiswa {
      kkpMahasiswaid
      nim
      nama
      prodi
    }
  }
`

export const GET_ALL_APPROVED_MAHASISWA_STATS = `
  query GetAllApprovedMahasiswaStats {
    getAllApprovedMahasiswaStats {
      kkpMahasiswaId
      nim
      nama
      prodi
      persentaseSyaratDisetujui
      jumlahSyaratDisetujui
      jumlahSyarat
    }
  }
`

// ============================================
// KKP SYARAT (REQUIREMENTS)
// ============================================

export const GET_ALL_KKP_SYARAT = `
  query GetAllKkpSyarat {
    getAllKkpSyarat {
      id
      prodi_kode_prodi
      nama
      logo
      url_check
      response_should_be
      is_upload_file
      is_activated
      created_at
      updated_at
    }
  }
`

export const GET_KKP_SYARAT_BY_PRODI = `
  query GetKkpSyaratByProdi($kodeProdi: String!) {
    getKkpSyaratByKodeProdi(kodeProdi: $kodeProdi) {
      id
      prodi_kode_prodi
      nama
      logo
      url_check
      is_upload_file
      is_activated
    }
  }
`

export const GET_KKP_SYARAT_BY_ID = `
  query GetKkpSyaratById($id: String!) {
    getKkpSyarat(id: $id) {
      id
      prodi_kode_prodi
      nama
      logo
      url_check
      response_should_be
      is_upload_file
      is_activated
      created_at
      updated_at
    }
  }
`

export const GET_APPROVAL_TIMELINE = `
  query GetApprovalTimeline($nim: String!, $kkp_syarat_id: String!) {
    getApprovalTimeline(nim: $nim, kkp_syarat_id: $kkp_syarat_id) {
      approval_id
      approval_status_id
      approval_status_nama
      updated_at
    }
  }
`

// ============================================
// KKP INSTANSI (INSTITUTION)
// ============================================

export const GET_ALL_KKP_INSTANSI = `
  query GetAllKkpInstansi {
    getAllKkpInstansi {
      id
      nama
      alamat
      logo
      is_activated
      created_at
      updated_at
    }
  }
`

export const GET_KKP_INSTANSI_BY_ID = `
  query GetKkpInstansiById($id: String!) {
    getKkpInstansi(id: $id) {
      id
      nama
      alamat
      logo
      keterangan
      is_activated
      created_at
      updated_at
    }
  }
`

export const GET_ALL_INSTANSI_APPROVED = `
  query GetAllInstansiApproved {
    getAllInstansiApproved {
      id
      nama
      alamat
      logo
      is_activated
    }
  }
`

// ============================================
// FAKULTAS & PRODI
// ============================================

export const GET_ALL_FAKULTAS = `
  query GetAllFakultas {
    getAllFakultas {
      id
      status
      kode_fakultas
      nama_fakultas
      nama_fakultas_eng
      nama_alias
      dekan
    }
  }
`

export const GET_FAKULTAS_BY_ID = `
  query GetFakultasById($id: Int!) {
    getFakultas(id: $id) {
      id
      status
      kode_fakultas
      nama_fakultas
      nama_fakultas_eng
      nama_alias
      dekan
    }
  }
`

export const GET_ALL_PRODI = `
  query GetAllProdi {
    getAllProdis {
      id
      kode_fakultas
      kode_prodi
      nama_prodi
      nama_prodi_eng
      gelar_pendek
      gelar_panjang
      gelar_eng
      total_sks_lulus
      nidn_ketua_prodi
    }
  }
`

export const GET_PRODI_BY_ID = `
  query GetProdiById($id: Float!) {
    getProdi(id: $id) {
      id
      kode_fakultas
      kode_prodi
      nama_prodi
      nama_prodi_eng
      gelar_pendek
      gelar_panjang
      gelar_eng
      total_sks_lulus
      nidn_ketua_prodi
    }
  }
`

export const GET_PRODI_BY_KODE = `
  query GetProdiByKode($kodeProdi: String!) {
    getProdiByKodeProdi(kodeProdi: $kodeProdi) {
      id
      kode_fakultas
      kode_prodi
      nama_prodi
      nama_prodi_eng
      gelar_pendek
      gelar_panjang
      gelar_eng
      total_sks_lulus
      nidn_ketua_prodi
    }
  }
`

// ============================================
// APPROVAL STATUS
// ============================================

export const GET_ALL_APPROVAL_STATUSES = `
  query GetAllApprovalStatuses {
    getAllApprovalStatuses {
      id
      nama
      keterangan
    }
  }
`

export const GET_ALL_KKP_APPROVALS = `
  query GetAllKkpApprovals {
    getAllKkpApprovals {
      id
      tanggal_jam
      keterangan
      approvalStatus {
        id
        nama
      }
    }
  }
`

export const GET_KKP_APPROVAL_BY_ID = `
  query GetKkpApprovalById($id: String!) {
    getKkpApproval(id: $id) {
      id
      tanggal_jam
      keterangan
      approvalStatus {
        id
        nama
        keterangan
      }
    }
  }
`
