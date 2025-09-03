export default function QualityImprovementPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Perbaikan Mutu</h1>
        <p className="text-gray-600 mt-2">
          Dashboard utama untuk inisiatif perbaikan kualitas
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Active Plans</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">12</div>
            <div className="text-sm text-gray-500">rencana perbaikan aktif</div>
            <div className="mt-2 text-sm text-green-600">3 baru bulan ini</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Implementation Rate</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">78%</div>
            <div className="text-sm text-gray-500">tingkat implementasi</div>
            <div className="mt-2 text-sm text-green-600">↑ 12% dari bulan lalu</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Success Rate</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">85%</div>
            <div className="text-sm text-gray-500">rencana berhasil</div>
            <div className="mt-2 text-sm text-green-600">Target: 80%</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Budget Utilization</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">67%</div>
            <div className="text-sm text-gray-500">dari budget tersedia</div>
            <div className="mt-2 text-sm text-blue-600">Rp 450M tersisa</div>
          </div>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Improvement Areas by Priority</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div>
                <p className="font-medium text-red-800">Learning Infrastructure</p>
                <p className="text-sm text-red-600">5 active initiatives</p>
              </div>
              <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">High Priority</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div>
                <p className="font-medium text-yellow-800">Faculty Development</p>
                <p className="text-sm text-yellow-600">4 active initiatives</p>
              </div>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">Medium Priority</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="font-medium text-blue-800">Student Services</p>
                <p className="text-sm text-blue-600">3 active initiatives</p>
              </div>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Low Priority</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Recent Achievements</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
              <div>
                <p className="font-medium text-green-800">WiFi Network Upgrade</p>
                <p className="text-sm text-gray-600">Coverage increased to 98% across campus</p>
                <p className="text-xs text-gray-500">Completed: 15 August 2025</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <div>
                <p className="font-medium text-blue-800">Faculty Training Program</p>
                <p className="text-sm text-gray-600">85% faculty completed digital literacy training</p>
                <p className="text-xs text-gray-500">Completed: 10 August 2025</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
              <div>
                <p className="font-medium text-purple-800">Student Feedback System</p>
                <p className="text-sm text-gray-600">New real-time feedback portal launched</p>
                <p className="text-xs text-gray-500">Completed: 5 August 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Quality Improvement Timeline</h3>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Chart placeholder - Improvement Initiatives Timeline</p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <button className="p-4 border rounded-lg hover:bg-blue-50 transition-colors">
            <div className="text-blue-600 font-medium">Create New Plan</div>
            <div className="text-sm text-gray-500">Start a new improvement initiative</div>
          </button>
          <button className="p-4 border rounded-lg hover:bg-green-50 transition-colors">
            <div className="text-green-600 font-medium">Review Progress</div>
            <div className="text-sm text-gray-500">Check ongoing initiatives</div>
          </button>
          <button className="p-4 border rounded-lg hover:bg-purple-50 transition-colors">
            <div className="text-purple-600 font-medium">Generate Report</div>
            <div className="text-sm text-gray-500">Create improvement summary</div>
          </button>
        </div>
      </div>
    </div>
  )
}