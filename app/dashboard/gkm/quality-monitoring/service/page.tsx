export default function ServiceQualityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Mutu Layanan</h1>
        <p className="text-gray-600 mt-2">
          Monitoring kualitas layanan akademik dan administratif
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Layanan Akademik</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Waktu Respons</span>
              <span className="font-medium text-green-600">24 jam</span>
            </div>
            <div className="flex justify-between">
              <span>Kepuasan Mahasiswa</span>
              <span className="font-medium text-green-600">89%</span>
            </div>
            <div className="flex justify-between">
              <span>Resolusi Masalah</span>
              <span className="font-medium text-green-600">92%</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Layanan Administrasi</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Proses Surat</span>
              <span className="font-medium text-yellow-600">3-5 hari</span>
            </div>
            <div className="flex justify-between">
              <span>Layanan Online</span>
              <span className="font-medium text-green-600">95%</span>
            </div>
            <div className="flex justify-between">
              <span>Akurasi Dokumen</span>
              <span className="font-medium text-green-600">98%</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Layanan Digital</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Uptime Sistem</span>
              <span className="font-medium text-green-600">99.5%</span>
            </div>
            <div className="flex justify-between">
              <span>User Adoption</span>
              <span className="font-medium text-green-600">87%</span>
            </div>
            <div className="flex justify-between">
              <span>Feedback Rating</span>
              <span className="font-medium text-green-600">4.2/5.0</span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Complaint Tracking</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
              <div>
                <p className="font-medium text-red-800">Sistem Pembayaran</p>
                <p className="text-sm text-red-600">Error saat upload bukti pembayaran</p>
              </div>
              <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">High</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
              <div>
                <p className="font-medium text-yellow-800">Layanan Surat</p>
                <p className="text-sm text-yellow-600">Keterlambatan pemrosesan surat</p>
              </div>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">Medium</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="font-medium text-blue-800">Portal Mahasiswa</p>
                <p className="text-sm text-blue-600">Request fitur baru</p>
              </div>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Low</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Service Level Metrics</h3>
          <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Chart placeholder - Service Performance Metrics</p>
          </div>
        </div>
      </div>
    </div>
  )
}
