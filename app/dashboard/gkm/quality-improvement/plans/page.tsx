export default function ImprovementPlansPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Rencana Perbaikan</h1>
          <p className="text-gray-600 mt-2">
            Kelola dan pantau rencana perbaikan kualitas
          </p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          + Buat Rencana Baru
        </button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Total Plans</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-700">24</div>
            <div className="text-sm text-gray-500">semua rencana</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Active</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">12</div>
            <div className="text-sm text-gray-500">sedang berjalan</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Completed</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">8</div>
            <div className="text-sm text-gray-500">telah selesai</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Pending</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600">4</div>
            <div className="text-sm text-gray-500">menunggu persetujuan</div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg border shadow-sm">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Daftar Rencana Perbaikan</h3>
            <div className="flex space-x-2">
              <select className="border rounded-lg px-3 py-1 text-sm">
                <option>Semua Status</option>
                <option>Active</option>
                <option>Completed</option>
                <option>Pending</option>
              </select>
              <select className="border rounded-lg px-3 py-1 text-sm">
                <option>Semua Kategori</option>
                <option>Academic</option>
                <option>Infrastructure</option>
                <option>Service</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rencana Perbaikan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kategori
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  PIC
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Deadline
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
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
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900">Upgrade Lab Komputer</div>
                    <div className="text-sm text-gray-500">Penggantian komputer lab dengan spek terbaru</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Infrastructure
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Dr. Ahmad
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  30 Sep 2025
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{width: '75%'}}></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">75%</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    Active
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-900 cursor-pointer">
                  View Details
                </td>
              </tr>
              
              <tr>
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900">Digital Learning Platform</div>
                    <div className="text-sm text-gray-500">Implementasi platform pembelajaran digital</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Academic
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Prof. Siti
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  15 Oct 2025
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: '100%'}}></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">100%</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Completed
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-900 cursor-pointer">
                  View Report
                </td>
              </tr>
              
              <tr>
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900">Student Counseling Service</div>
                    <div className="text-sm text-gray-500">Peningkatan layanan konseling mahasiswa</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Service
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Dr. Budi
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  20 Nov 2025
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-600 h-2 rounded-full" style={{width: '45%'}}></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">45%</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    Active
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-900 cursor-pointer">
                  View Details
                </td>
              </tr>
              
              <tr>
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900">Library Digitization</div>
                    <div className="text-sm text-gray-500">Digitalisasi koleksi perpustakaan</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Infrastructure
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Dra. Lisa
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  25 Dec 2025
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gray-400 h-2 rounded-full" style={{width: '0%'}}></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">0%</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    Pending Approval
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-900 cursor-pointer">
                  Review Plan
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Plans by Category</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Infrastructure</span>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{width: '50%'}}></div>
                </div>
                <span className="text-sm text-gray-600">12</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm">Academic</span>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{width: '33%'}}></div>
                </div>
                <span className="text-sm text-gray-600">8</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm">Service</span>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{width: '17%'}}></div>
                </div>
                <span className="text-sm text-gray-600">4</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Upcoming Deadlines</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-2 bg-red-50 rounded">
              <div>
                <p className="text-sm font-medium text-red-800">Upgrade Lab Komputer</p>
                <p className="text-xs text-red-600">30 Sep 2025</p>
              </div>
              <span className="text-xs text-red-600">5 hari lagi</span>
            </div>
            
            <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
              <div>
                <p className="text-sm font-medium text-yellow-800">Student Counseling Service</p>
                <p className="text-xs text-yellow-600">20 Nov 2025</p>
              </div>
              <span className="text-xs text-yellow-600">55 hari lagi</span>
            </div>
            
            <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
              <div>
                <p className="text-sm font-medium text-blue-800">Library Digitization</p>
                <p className="text-xs text-blue-600">25 Dec 2025</p>
              </div>
              <span className="text-xs text-blue-600">90 hari lagi</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}