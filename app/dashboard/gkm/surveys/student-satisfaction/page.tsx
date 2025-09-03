export default function StudentSatisfactionPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kepuasan Mahasiswa</h1>
          <p className="text-gray-600 mt-2">
            Survei dan analisis tingkat kepuasan mahasiswa
          </p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          + Buat Survei Baru
        </button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Overall Satisfaction</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">4.3</div>
            <div className="text-sm text-gray-500">dari 5.0</div>
            <div className="mt-2 text-sm text-green-600">↑ 0.4 dari semester lalu</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Response Rate</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">89%</div>
            <div className="text-sm text-gray-500">tingkat partisipasi</div>
            <div className="mt-2 text-sm text-green-600">Target: 85%</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Total Responses</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">1,867</div>
            <div className="text-sm text-gray-500">mahasiswa berpartisipasi</div>
            <div className="mt-2 text-sm text-purple-600">dari 2,100 mahasiswa</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Recommendation Rate</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">92%</div>
            <div className="text-sm text-gray-500">akan merekomendasikan</div>
            <div className="mt-2 text-sm text-green-600">↑ 7% dari semester lalu</div>
          </div>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Satisfaction by Category</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <p className="font-medium text-green-800">Kualitas Pengajaran</p>
                <p className="text-sm text-green-600">Teaching quality & methods</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-green-600">4.6</span>
                <div className="w-16 bg-gray-200 rounded-full h-1 mt-1">
                  <div className="bg-green-600 h-1 rounded-full" style={{width: '92%'}}></div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="font-medium text-blue-800">Fasilitas Akademik</p>
                <p className="text-sm text-blue-600">Labs, library, classrooms</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-blue-600">4.2</span>
                <div className="w-16 bg-gray-200 rounded-full h-1 mt-1">
                  <div className="bg-blue-600 h-1 rounded-full" style={{width: '84%'}}></div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div>
                <p className="font-medium text-purple-800">Layanan Akademik</p>
                <p className="text-sm text-purple-600">Registration, counseling</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-purple-600">4.1</span>
                <div className="w-16 bg-gray-200 rounded-full h-1 mt-1">
                  <div className="bg-purple-600 h-1 rounded-full" style={{width: '82%'}}></div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div>
                <p className="font-medium text-yellow-800">Lingkungan Kampus</p>
                <p className="text-sm text-yellow-600">Campus environment</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-yellow-600">3.9</span>
                <div className="w-16 bg-gray-200 rounded-full h-1 mt-1">
                  <div className="bg-yellow-600 h-1 rounded-full" style={{width: '78%'}}></div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div>
                <p className="font-medium text-red-800">Fasilitas Umum</p>
                <p className="text-sm text-red-600">Parking, canteen, wifi</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-red-600">3.5</span>
                <div className="w-16 bg-gray-200 rounded-full h-1 mt-1">
                  <div className="bg-red-600 h-1 rounded-full" style={{width: '70%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Recent Survey Results</h3>
          <div className="space-y-4">
            <div className="p-3 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-gray-900">Evaluasi Semester Genap 2024/2025</h4>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Completed</span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Period:</span>
                  <p className="font-medium">Jun - Jul 2025</p>
                </div>
                <div>
                  <span className="text-gray-500">Responses:</span>
                  <p className="font-medium">1,867</p>
                </div>
                <div>
                  <span className="text-gray-500">Rating:</span>
                  <p className="font-medium text-green-600">4.3/5.0</p>
                </div>
              </div>
            </div>
            
            <div className="p-3 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-gray-900">Survei Fasilitas Online Learning</h4>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Active</span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Period:</span>
                  <p className="font-medium">Aug 2025</p>
                </div>
                <div>
                  <span className="text-gray-500">Responses:</span>
                  <p className="font-medium">1,234 / 2,100</p>
                </div>
                <div>
                  <span className="text-gray-500">Progress:</span>
                  <p className="font-medium text-blue-600">59%</p>
                </div>
              </div>
            </div>
            
            <div className="p-3 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-gray-900">Exit Survey - Alumni 2025</h4>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">Planning</span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Target:</span>
                  <p className="font-medium">450 alumni</p>
                </div>
                <div>
                  <span className="text-gray-500">Launch:</span>
                  <p className="font-medium">1 Oct 2025</p>
                </div>
                <div>
                  <span className="text-gray-500">Duration:</span>
                  <p className="font-medium">2 weeks</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Student Feedback Highlights</h3>
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <h4 className="font-medium text-green-800 mb-3">Positive Feedback</h4>
            <div className="space-y-3">
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800 font-medium">"Dosen sangat membantu dan responsif"</p>
                <p className="text-xs text-green-600 mt-1">Mentioned by 89% of respondents</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800 font-medium">"Kurikulum sesuai dengan kebutuhan industri"</p>
                <p className="text-xs text-green-600 mt-1">Mentioned by 84% of respondents</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800 font-medium">"Fasilitas lab komputer sangat memadai"</p>
                <p className="text-xs text-green-600 mt-1">Mentioned by 78% of respondents</p>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-red-800 mb-3">Areas for Improvement</h4>
            <div className="space-y-3">
              <div className="p-3 bg-red-50 rounded-lg">
                <p className="text-sm text-red-800 font-medium">"Parkir kendaraan masih kurang"</p>
                <p className="text-xs text-red-600 mt-1">Mentioned by 67% of respondents</p>
              </div>
              <div className="p-3 bg-red-50 rounded-lg">
                <p className="text-sm text-red-800 font-medium">"WiFi kampus sering lambat"</p>
                <p className="text-xs text-red-600 mt-1">Mentioned by 45% of respondents</p>
              </div>
              <div className="p-3 bg-red-50 rounded-lg">
                <p className="text-sm text-red-800 font-medium">"Layanan administrasi perlu dipercepat"</p>
                <p className="text-xs text-red-600 mt-1">Mentioned by 38% of respondents</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Satisfaction Trends</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Chart placeholder - Satisfaction Score Trends Over Time</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Response Distribution by Program</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Teknik Informatika</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{width: '85%'}}></div>
                </div>
                <span className="text-xs text-gray-600">567/667</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm">Sistem Informasi</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{width: '92%'}}></div>
                </div>
                <span className="text-xs text-gray-600">645/700</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm">Data Science</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{width: '88%'}}></div>
                </div>
                <span className="text-xs text-gray-600">655/733</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}