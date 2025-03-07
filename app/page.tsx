import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="text-white bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="container px-4 py-16 mx-auto md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">SAKTI - Sistem Informasi Akademik Fakultas Teknik</h1>
            <p className="mb-8 text-xl">Platform terpadu untuk pengelolaan akademik universitas</p>
            <Link href="/login">
              <Button size="lg" className="text-blue-700 bg-white hover:bg-gray-100">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container px-4 mx-auto">
          <h2 className="mb-12 text-3xl font-bold text-center">Fitur Utama</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="mb-4 text-xl font-semibold">Mahasiswa</h3>
              <p className="mb-4 text-gray-600">Akses informasi akademik, jadwal kuliah, nilai, dan pengajuan surat</p>
              <ul className="space-y-2 text-gray-600">
                <li>• Lihat jadwal kuliah</li>
                <li>• Akses nilai semester</li>
                <li>• Pengajuan surat</li>
                <li>• Pendaftaran KKP</li>
              </ul>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="mb-4 text-xl font-semibold">Dosen</h3>
              <p className="mb-4 text-gray-600">Kelola kelas, input nilai, dan supervisi mahasiswa</p>
              <ul className="space-y-2 text-gray-600">
                <li>• Input nilai mahasiswa</li>
                <li>• Kelola jadwal mengajar</li>
                <li>• Supervisi KKP</li>
                <li>• Laporan akademik</li>
              </ul>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="mb-4 text-xl font-semibold">Administrasi</h3>
              <p className="mb-4 text-gray-600">Pengelolaan data akademik, surat, dan program studi</p>
              <ul className="space-y-2 text-gray-600">
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
      <footer className="py-8 mt-auto text-white bg-gray-800">
        <div className="container px-4 mx-auto text-center">
          <p>© {new Date().getFullYear()} SAKTI - Sistem Akademik Fakultas Teknik</p>
        </div>
      </footer>
    </div>
  )
}

