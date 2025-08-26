export default function FacilityQualityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Mutu Fasilitas</h1>
        <p className="text-gray-600 mt-2">
          Monitoring kondisi dan kualitas fasilitas kampus
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Ruang Kuliah</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Total Ruang</span>
              <span className="font-medium">45</span>
            </div>
            <div className="flex justify-between">
              <span>Kondisi Baik</span>
              <span className="font-medium text-green-600">38</span>
            </div>
            <div className="flex justify-between">
              <span>Perlu Perbaikan</span>
              <span className="font-medium text-yellow-600">7</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Laboratorium</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Total Lab</span>
              <span className="font-medium">12</span>
            </div>
            <div className="flex justify-between">
              <span>Operasional</span>
              <span className="font-medium text-green-600">11</span>
            </div>
            <div className="flex justify-between">
              <span>Maintenance</span>
              <span className="font-medium text-red-600">1</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Fasilitas IT</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>WiFi Coverage</span>
              <span className="font-medium text-green-600">98%</span>
            </div>
            <div className="flex justify-between">
              <span>Proyektor</span>
              <span className="font-medium text-green-600">42/45</span>
            </div>
            <div className="flex justify-between">
              <span>Sound System</span>
              <span className="font-medium text-yellow-600">38/45</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Utilitas</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>AC Berfungsi</span>
              <span className="font-medium text-green-600">89%</span>
            </div>
            <div className="flex justify-between">
              <span>Penerangan</span>
              <span className="font-medium text-green-600">95%</span>
            </div>
            <div className="flex justify-between">
              <span>Kebersihan</span>
              <span className="font-medium text-green-600">92%</span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Maintenance Schedule</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="font-medium text-blue-800">Ruang Lab Komputer 1</p>
                <p className="text-sm text-blue-600">Maintenance AC - 25 Agustus 2025</p>
              </div>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Scheduled</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
              <div>
                <p className="font-medium text-yellow-800">Ruang Kuliah A.201</p>
                <p className="text-sm text-yellow-600">Perbaikan proyektor - Overdue</p>
              </div>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">Overdue</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <div>
                <p className="font-medium text-green-800">Perpustakaan</p>
                <p className="text-sm text-green-600">Deep cleaning - Completed</p>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Completed</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Facility Utilization</h3>
          <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Chart placeholder - Facility Usage Statistics</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Facility Condition Report</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fasilitas
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lokasi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kondisi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Maintenance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">AC Split</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Ruang A.101</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Baik</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">15 Juli 2025</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Proyektor</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Ruang A.201</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Rusak</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">10 Juni 2025</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    Inactive
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}