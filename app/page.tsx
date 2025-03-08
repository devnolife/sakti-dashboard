import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">SIAKAD - Sistem Informasi Akademik</h1>
            <p className="text-xl mb-8">Platform terpadu untuk pengelolaan akademik universitas</p>
            <Link href="/login">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Fitur Utama</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Mahasiswa</h3>
              <p className="text-gray-600 mb-4">Akses informasi akademik, jadwal kuliah, nilai, dan pengajuan surat</p>
              <ul className="text-gray-600 space-y-2">
                <li>• Lihat jadwal kuliah</li>
                <li>• Akses nilai semester</li>
                <li>• Pengajuan surat</li>
                <li>• Pendaftaran KKP</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Dosen</h3>
              <p className="text-gray-600 mb-4">Kelola kelas, input nilai, dan supervisi mahasiswa</p>
              <ul className="text-gray-600 space-y-2">
                <li>• Input nilai mahasiswa</li>
                <li>• Kelola jadwal mengajar</li>
                <li>• Supervisi KKP</li>
                <li>• Laporan akademik</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Administrasi</h3>
              <p className="text-gray-600 mb-4">Pengelolaan data akademik, surat, dan program studi</p>
              <ul className="text-gray-600 space-y-2">
                <li>• Manajemen surat</li>
                <li>• Pengelolaan KKP</li>
                <li>• Administrasi prodi</li>
                <li>• Laporan fakultas</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} SIAKAD - Sistem Informasi Akademik Universitas</p>
        </div>
      </footer>
    </div>
  )
}

