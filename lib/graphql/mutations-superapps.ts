/**
 * GraphQL Mutations untuk Superapps API
 * Endpoint: https://superapps.if.unismuh.ac.id/graphql
 * 
 * Berdasarkan introspection: 2025-10-30
 * Total Mutations: 24
 */

// ============================================
// AUTHENTICATION
// ============================================

/**
 * SIGNIN Mutation (UPDATED 2025-10-30)
 * Previously named "login", now renamed to "signin"
 * Input: SigninUserInput { username, password }
 * Returns: access_token + user data (id, username, role)
 */
export const SIGNIN = `
  mutation Signin($loginUserInput: SigninUserInput!) {
    signin(loginUserInput: $loginUserInput) {
      access_token
      user {
        id
        username
        role
      }
    }
  }
`

/**
 * LOGIN Mutation (DEPRECATED - use SIGNIN instead)
 * Kept for backward compatibility
 * Use SIGNIN mutation for new code
 */
export const LOGIN = SIGNIN

/**
 * PROFILE Query (requires authentication)
 * Use with createAuthenticatedClient(token)
 * UPDATED 2025-10-30: Fields changed to id, username, name, email, phone, role
 * UPDATED 2025-10-30: Added department with kode and nama for prodi info
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
      department {
        kode
        nama
      }
    }
  }
`

// ============================================
// KKP MUTATIONS
// ============================================

export const CREATE_KKP = `
  mutation CreateKkp($input: CreateKkpInput!) {
    createKkp(input: $input) {
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

export const CREATE_KKP_APPROVAL = `
  mutation CreateKkpApproval($input: CreateKkpApprovalInput!) {
    createKkpApproval(input: $input) {
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

// ============================================
// PRODI MANAGEMENT
// ============================================

export const CREATE_PRODI = `
  mutation CreateProdi($createProdiInput: CreateProdiInput!) {
    createProdi(createProdiInput: $createProdiInput) {
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

export const UPDATE_PRODI = `
  mutation UpdateProdi($updateProdiInput: UpdateProdiInput!) {
    updateProdi(updateProdiInput: $updateProdiInput) {
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

export const REMOVE_PRODI = `
  mutation RemoveProdi($id: Float!) {
    removeProdi(id: $id) {
      id
      kode_prodi
      nama_prodi
    }
  }
`

// ============================================
// KKP SYARAT (REQUIREMENTS)
// ============================================

export const CREATE_KKP_SYARAT = `
  mutation CreateKkpSyarat($input: CreateKkpSyaratInput!) {
    createKkpSyarat(input: $input) {
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

export const UPDATE_KKP_SYARAT = `
  mutation UpdateKkpSyarat($id: String!, $input: UpdateKkpSyaratInput!) {
    updateKkpSyarat(id: $id, input: $input) {
      id
      prodi_kode_prodi
      nama
      logo
      url_check
      response_should_be
      is_upload_file
      is_activated
      updated_at
    }
  }
`

export const REMOVE_KKP_SYARAT = `
  mutation RemoveKkpSyarat($id: String!) {
    removeKkpSyarat(id: $id) {
      id
      nama
    }
  }
`

// ============================================
// KKP INSTANSI (INSTITUTION)
// ============================================

export const AJUKAN_KKP_INSTANSI = `
  mutation AjukanKkpInstansi($createKkpInstansiInput: CreateKkpInstansiInput!) {
    ajukanKkpInstansi(createKkpInstansiInput: $createKkpInstansiInput) {
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

export const CREATE_KKP_INSTANSI_APPROVAL = `
  mutation CreateKkpInstansiApproval($input: CreateKkpInstansiApprovalInput!) {
    createKkpInstansiApproval(input: $input) {
      id
      kkp_instansi_id
      approval_status_id
      keterangan
      created_at
      updated_at
    }
  }
`

// ============================================
// KKP INSTANSI BAGIAN (DEPARTMENT)
// ============================================

export const CREATE_KKP_INSTANSI_BAGIAN = `
  mutation CreateKkpInstansiBagian($createKkpInstansiBagianInput: CreateKkpInstansiBagianInput!) {
    createKkpInstansiBagian(createKkpInstansiBagianInput: $createKkpInstansiBagianInput) {
      id
      kkp_instansi_id
      nama
      alamat
      keterangan
      is_activated
      created_at
      updated_at
    }
  }
`

export const UPDATE_KKP_INSTANSI_BAGIAN = `
  mutation UpdateKkpInstansiBagian($id: String!, $updateKkpInstansiBagianInput: UpdateKkpInstansiBagianInput!) {
    updateKkpInstansiBagian(id: $id, updateKkpInstansiBagianInput: $updateKkpInstansiBagianInput) {
      id
      kkp_instansi_id
      nama
      alamat
      keterangan
      is_activated
      updated_at
    }
  }
`

export const REMOVE_KKP_INSTANSI_BAGIAN = `
  mutation RemoveKkpInstansiBagian($id: String!) {
    removeKkpInstansiBagian(id: $id) {
      id
      nama
    }
  }
`

export const CREATE_KKP_INSTANSI_BAGIAN_APPROVAL = `
  mutation CreateKkpInstansiBagianApproval($createKkpInstansiBagianApprovalInput: CreateKkpInstansiBagianApprovalInput!) {
    createKkpInstansiBagianApproval(createKkpInstansiBagianApprovalInput: $createKkpInstansiBagianApprovalInput) {
      id
      kkp_instansi_bagian_id
      approval_status_id
      keterangan
      created_at
      updated_at
    }
  }
`

export const UPDATE_KKP_INSTANSI_BAGIAN_APPROVAL = `
  mutation UpdateKkpInstansiBagianApproval($id: String!, $updateKkpInstansiBagianApprovalInput: UpdateKkpInstansiBagianApprovalInput!) {
    updateKkpInstansiBagianApproval(id: $id, updateKkpInstansiBagianApprovalInput: $updateKkpInstansiBagianApprovalInput) {
      id
      kkp_instansi_bagian_id
      approval_status_id
      keterangan
      updated_at
    }
  }
`

export const REMOVE_KKP_INSTANSI_BAGIAN_APPROVAL = `
  mutation RemoveKkpInstansiBagianApproval($id: String!) {
    removeKkpInstansiBagianApproval(id: $id) {
      id
    }
  }
`

// ============================================
// KKP MAHASISWA SYARAT KELENGKAPAN
// ============================================

export const CREATE_KKP_MAHASISWA_SYARAT_KELENGKAPAN = `
  mutation CreateKkpMahasiswaSyaratKelengkapan($createKkpMahasiswaSyaratKelengkapanInput: CreateKkpMahasiswaSyaratKelengkapanInput!) {
    createKkpMahasiswaSyaratKelengkapan(createKkpMahasiswaSyaratKelengkapanInput: $createKkpMahasiswaSyaratKelengkapanInput) {
      id
      kkp_mahasiswa_syarat_id
      uploaded_file_id
      get_response
      get_approved
      keterangan
      created_at
      updated_at
    }
  }
`

export const CREATE_KKP_MAHASISWA_SYARAT_KELENGKAPAN_APPROVAL = `
  mutation CreateKkpMahasiswaSyaratKelengkapanApproval($createKkpMahasiswaSyaratKelengkapanApprovalInput: CreateKkpMahasiswaSyaratKelengkapanApprovalInput!) {
    createKkpMahasiswaSyaratKelengkapanApproval(createKkpMahasiswaSyaratKelengkapanApprovalInput: $createKkpMahasiswaSyaratKelengkapanApprovalInput) {
      id
      kkp_mahasiswa_syarat_kelengkapan_id
      approval_status_id
      keterangan
      created_at
      updated_at
    }
  }
`

export const UPDATE_KKP_MAHASISWA_SYARAT_KELENGKAPAN_APPROVAL = `
  mutation UpdateKkpMahasiswaSyaratKelengkapanApproval($id: String!, $updateKkpMahasiswaSyaratKelengkapanApprovalInput: UpdateKkpMahasiswaSyaratKelengkapanApprovalInput!) {
    updateKkpMahasiswaSyaratKelengkapanApproval(id: $id, updateKkpMahasiswaSyaratKelengkapanApprovalInput: $updateKkpMahasiswaSyaratKelengkapanApprovalInput) {
      id
      kkp_mahasiswa_syarat_kelengkapan_id
      approval_status_id
      keterangan
      updated_at
    }
  }
`

export const REMOVE_KKP_MAHASISWA_SYARAT_KELENGKAPAN_APPROVAL = `
  mutation RemoveKkpMahasiswaSyaratKelengkapanApproval($id: String!) {
    removeKkpMahasiswaSyaratKelengkapanApproval(id: $id) {
      id
    }
  }
`
