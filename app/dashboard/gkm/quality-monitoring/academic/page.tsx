export default function AcademicQualityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Mutu Akademik</h1>
        <p className="text-gray-600 mt-2">
          Monitoring dan evaluasi kualitas akademik fakultas
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Indikator Akademik</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>IPK Rata-rata</span>
              <span className="font-medium">3.42</span>
            </div>
            <div className="flex justify-between">
              <span>Tingkat Kelulusan</span>
              <span className="font-medium text-green-600">94.2%</span>
            </div>
            <div className="flex justify-between">
              <span>Lama Studi Rata-rata</span>
              <span className="font-medium">4.2 tahun</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Kualitas Pembelajaran</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Evaluasi Dosen</span>
              <span className="font-medium text-green-600">4.1/5.0</span>
            </div>
            <div className="flex justify-between">
              <span>Kepuasan Mahasiswa</span>
              <span className="font-medium text-green-600">87%</span>
            </div>
            <div className="flex justify-between">
              <span>Rasio Dosen:Mahasiswa</span>
              <span className="font-medium">1:25</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Penelitian & PKM</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Publikasi Ilmiah</span>
              <span className="font-medium">42</span>
            </div>
            <div className="flex justify-between">
              <span>Hibah Penelitian</span>
              <span className="font-medium">15</span>
            </div>
            <div className="flex justify-between">
              <span>PKM Mahasiswa</span>
              <span className="font-medium">23</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Tren Kualitas Akademik</h3>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Chart placeholder - Academic Quality Trends</p>
        </div>
      </div>
    </div>
  )
}