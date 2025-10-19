// Query definitions for GraphQL API

export const GET_MAHASISWA_USER = `
  query MahasiswaUser($nim: String!) {
    mahasiswaUser(nim: $nim) {
      nim
      nama
      hp
      email
      prodi
      foto
      passwd
    }
  }
`

export const GET_MAHASISWA_INFO = `
  query MahasiswaInfo($nim: String!) {
    mahasiswaInfo(nim: $nim) {
      nim
      nama
      angkatan
      kodeProdi
      namaProdi
      kodePenasehat
      nidnPa
      namaPa
      sksBerjalan
      totalSksSelesai
      totalSksLulus
      totalNilaiXKredit
      ipk
      aktifTerakhirTa
      statusTerakhirTa
      aktif
      cuti
      nonAktif
      jumlahSemester
      kkp
      aik
      proposal
    }
  }
`

export const GET_MAHASISWA = `
  query Mahasiswa($nim: String!) {
    mahasiswa(nim: $nim) {
      nim
      kodeProdi
      angkatan
      nama
      jenisKelamin
      tempatLahir
      tanggalLahir
      nik
      hp
      email
      dosenPA
      semesterAwal
      tahunAkademikLulus
      tanggalLulus
      lulus
      noSeriIjazah
      masaStudi
      ayah {
        nama
        pekerjaan
        penghasilan
      }
      ibu {
        nama
        pekerjaan
      }
      wali {
        nama
      }
      khs {
        kodeMk
        namaMk
        sks
        nilai
        nilaiAngka
        semester
        tahunAkademik
      }
      dosenPenasehat {
        nidn
        nama
        gelar_depan
        gelar_belakang
        email
      }
      prodi {
        kode
        nama
        jenjang
        fakultas
      }
    }
  }
`

export const GET_DOSEN = `
  query Dosen($nidn: String!) {
    dosen(nidn: $nidn) {
      nidn
      nama
      gelar_depan
      gelar_belakang
      tempat_lahir
      tanggal_lahir
      email
      prodiId
      mahasiswa {
        nim
        nama
      }
    }
  }
`

export const GET_PROFILE_DOSEN = `
  query ProfileDosen {
    profileDosen {
      nidn
      nama
      gelar_depan
      gelar_belakang
      tempat_lahir
      tanggal_lahir
      email
      prodiId
    }
  }
`

export const GET_PA_DOSEN = `
  query PaDosen {
    paDosen {
      nim
      nama
      angkatan
      kodeProdi
      namaProdi
      ipk
      totalSksLulus
      jumlahSemester
      statusTerakhirTa
    }
  }
`

export const GET_INFO_MAHASISWA_PA = `
  query InfoMahasiswaPa($nim: String!) {
    infoMahasiswaPa(nim: $nim) {
      nim
      nama
      angkatan
      kodeProdi
      namaProdi
      nidnPa
      namaPa
      ipk
      totalSksLulus
      totalSksSelesai
      sksBerjalan
      aktifTerakhirTa
      statusTerakhirTa
      aktif
      cuti
      nonAktif
      jumlahSemester
      kkp
      aik
      proposal
    }
  }
`

export const GET_ALL_PRODI = `
  query GetAllProdi {
    getAllProdi {
      kode
      nama
      jenjang
      fakultas
      akreditasi
    }
  }
`

export const GET_PRODI = `
  query GetProdi($id: String!) {
    getProdi(id: $id) {
      kode
      nama
      jenjang
      fakultas
      akreditasi
    }
  }
`

export const GET_PROFILE = `
  query Profile {
    profile {
      id
      name
      email
      role
    }
  }
`

// Type definitions for GraphQL responses
export interface MahasiswaUserResponse {
  mahasiswaUser: {
    nim: string
    nama: string
    hp: string | null
    email: string | null
    prodi: string | null
    foto: string | null
    passwd: string  // MD5 hashed password
  }
}

export interface MahasiswaInfoResponse {
  mahasiswaInfo: {
    nim: string
    nama: string
    angkatan: number
    kodeProdi: string
    namaProdi: string
    kodePenasehat: string | null
    nidnPa: string | null
    namaPa: string
    sksBerjalan: number | null
    totalSksSelesai: number | null
    totalSksLulus: number | null
    totalNilaiXKredit: number | null
    ipk: number | null
    aktifTerakhirTa: string | null
    statusTerakhirTa: string | null
    aktif: number | null
    cuti: number | null
    nonAktif: number | null
    jumlahSemester: number | null
    kkp: number | null
    aik: number | null
    proposal: number | null
  }
}

export interface MahasiswaResponse {
  mahasiswa: {
    nim: string
    kodeProdi: string | null
    angkatan: number | null
    nama: string | null
    jenisKelamin: string | null
    tempatLahir: string | null
    tanggalLahir: string | null
    nik: string | null
    hp: string | null
    email: string | null
    dosenPA: string | null
    semesterAwal: string | null
    tahunAkademikLulus: string | null
    tanggalLulus: string | null
    lulus: boolean | null
    noSeriIjazah: string | null
    masaStudi: string | null
    ayah: {
      nama: string
      pekerjaan: string
      penghasilan: string
    } | null
    ibu: {
      nama: string
      pekerjaan: string
    } | null
    wali: {
      nama: string
    } | null
    khs: Array<{
      kodeMk: string
      namaMk: string
      sks: number
      nilai: string
      nilaiAngka: number
      semester: string
      tahunAkademik: string
    }> | null
    dosenPenasehat: {
      nidn: string
      nama: string
      gelar_depan: string | null
      gelar_belakang: string | null
      email: string | null
    } | null
    prodi: {
      kode: string
      nama: string
      jenjang: string
      fakultas: string
    } | null
  }
}

export interface DosenResponse {
  dosen: {
    nidn: string
    nama: string | null
    gelar_depan: string | null
    gelar_belakang: string | null
    tempat_lahir: string | null
    tanggal_lahir: string | null
    email: string | null
    prodiId: string | null
    mahasiswa: Array<{
      nim: string
      nama: string
    }> | null
  }
}

export interface ProdiResponse {
  kode: string
  nama: string
  jenjang: string
  fakultas: string
  akreditasi?: string
}

export interface AllProdiResponse {
  getAllProdi: ProdiResponse[]
}
