export default function LecturerEvaluationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Evaluasi Dosen</h1>
        <p className="text-gray-600 mt-2">
          Evaluasi kinerja dan kualitas mengajar dosen
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Rata-rata Evaluasi</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">4.2</div>
            <div className="text-sm text-gray-500">dari 5.0</div>
            <div className="mt-2 text-sm text-green-600">↑ 0.3 dari semester lalu</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Tingkat Partisipasi</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">89%</div>
            <div className="text-sm text-gray-500">mahasiswa berpartisipasi</div>
            <div className="mt-2 text-sm text-green-600">↑ 5% dari semester lalu</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Dosen Terbaik</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">15</div>
            <div className="text-sm text-gray-500">dosen dengan skor ≥ 4.5</div>
            <div className="mt-2 text-sm text-green-600">↑ 3 dari semester lalu</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Perlu Perbaikan</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600">3</div>
            <div className="text-sm text-gray-500">dosen dengan skor 35</div>
            <div className="mt-2 text-sm text-red-600">↑ 1 dari semester lalu</div>
          </div>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Top Performing Lecturers</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <p className="font-medium text-green-800">Dr. Ahmad Hidayat, M.Kom</p>
                <p className="text-sm text-green-600">Teknik Informatika</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-green-600">4.8</span>
                <p className="text-xs text-green-500">Pemrograman Web</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <p className="font-medium text-green-800">Prof. Dr. Siti Nurhaliza, M.T</p>
                <p className="text-sm text-green-600">Sistem Informasi</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-green-600">4.7</span>
                <p className="text-xs text-green-500">Basis Data</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <p className="font-medium text-green-800">Dr. Muhammad Rizki, M.Sc</p>
                <p className="text-sm text-green-600">Teknik Informatika</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-green-600">4.6</span>
                <p className="text-xs text-green-500">Machine Learning</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Areas for Improvement</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div>
                <p className="font-medium text-red-800">Drs. Budi Santoso, M.Kom</p>
                <p className="text-sm text-red-600">Sistem Informasi</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-red-600">3.2</span>
                <p className="text-xs text-red-500">Matematika Diskrit</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div>
                <p className="font-medium text-yellow-800">Dr. Andi Suryadi, M.T</p>
                <p className="text-sm text-yellow-600">Teknik Informatika</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-yellow-600">3.4</span>
                <p className="text-xs text-yellow-500">Jaringan Komputer</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div>
                <p className="font-medium text-yellow-800">Dra. Lisa Permata, M.Si</p>
                <p className="text-sm text-yellow-600">Sistem Informasi</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-yellow-600">3.5</span>
                <p className="text-xs text-yellow-500">Statistika</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Evaluation Trends</h3>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Chart placeholder - Lecturer Evaluation Trends Over Time</p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Detailed Evaluation Report</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama Dosen
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Program Studi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mata Kuliah
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Skor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Dr. Ahmad Hidayat, M.Kom</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Teknik Informatika</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Pemrograman Web</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">4.8</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Excellent
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-900 cursor-pointer">
                  View Details
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Drs. Budi Santoso, M.Kom</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Sistem Informasi</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Matematika Diskrit</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">3.2</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    Needs Improvement
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-900 cursor-pointer">
                  Create Action Plan
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
