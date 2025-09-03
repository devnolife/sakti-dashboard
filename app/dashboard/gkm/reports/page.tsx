export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Laporan Mutu</h1>
        <p className="text-gray-600 mt-2">
          Dashboard utama untuk laporan dan analisis kualitas
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Published Reports</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">18</div>
            <div className="text-sm text-gray-500">laporan dipublikasi</div>
            <div className="mt-2 text-sm text-blue-600">Tahun 2025</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Pending Reports</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600">4</div>
            <div className="text-sm text-gray-500">menunggu review</div>
            <div className="mt-2 text-sm text-yellow-600">Draft stage</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Annual Report</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">95%</div>
            <div className="text-sm text-gray-500">progress laporan tahunan</div>
            <div className="mt-2 text-sm text-green-600">Due: Dec 2025</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Report Views</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">2,847</div>
            <div className="text-sm text-gray-500">total views</div>
            <div className="mt-2 text-sm text-purple-600">Bulan ini</div>
          </div>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Report Categories</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="font-medium text-blue-800">Laporan Berkala</p>
                <p className="text-sm text-blue-600">Monthly & quarterly reports</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-blue-600">12</span>
                <p className="text-xs text-blue-500">Published</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <p className="font-medium text-green-800">Metrik Kinerja</p>
                <p className="text-sm text-green-600">KPI & performance metrics</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-green-600">8</span>
                <p className="text-xs text-green-500">Published</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div>
                <p className="font-medium text-purple-800">Laporan Tahunan</p>
                <p className="text-sm text-purple-600">Annual quality reports</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-purple-600">3</span>
                <p className="text-xs text-purple-500">Published</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div>
                <p className="font-medium text-yellow-800">Special Reports</p>
                <p className="text-sm text-yellow-600">Ad-hoc & research reports</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-yellow-600">2</span>
                <p className="text-xs text-yellow-500">In Progress</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Recent Reports</h3>
          <div className="space-y-4">
            <div className="p-3 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-gray-900">Quality Assurance Report Q3 2025</h4>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Published</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Published:</span>
                  <p className="font-medium">20 Aug 2025</p>
                </div>
                <div>
                  <span className="text-gray-500">Views:</span>
                  <p className="font-medium">456</p>
                </div>
              </div>
            </div>
            
            <div className="p-3 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-gray-900">Student Satisfaction Analysis</h4>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Published</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Published:</span>
                  <p className="font-medium">15 Aug 2025</p>
                </div>
                <div>
                  <span className="text-gray-500">Views:</span>
                  <p className="font-medium">324</p>
                </div>
              </div>
            </div>
            
            <div className="p-3 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-gray-900">Infrastructure Assessment 2025</h4>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">Draft</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Expected:</span>
                  <p className="font-medium">30 Sep 2025</p>
                </div>
                <div>
                  <span className="text-gray-500">Progress:</span>
                  <p className="font-medium">75%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Report Generation Trends</h3>
          <div className="h-40 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500 text-sm">Reports per Month Chart</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Most Viewed Reports</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Annual Quality Report 2024</span>
              <span className="font-medium">1,234 views</span>
            </div>
            <div className="flex justify-between">
              <span>Faculty Performance Report</span>
              <span className="font-medium">890 views</span>
            </div>
            <div className="flex justify-between">
              <span>Student Satisfaction Q2</span>
              <span className="font-medium">756 views</span>
            </div>
            <div className="flex justify-between">
              <span>Infrastructure Assessment</span>
              <span className="font-medium">645 views</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Upcoming Deadlines</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-2 bg-red-50 rounded">
              <div>
                <p className="text-sm font-medium text-red-800">Monthly Report - August</p>
                <p className="text-xs text-red-600">Due: 31 Aug 2025</p>
              </div>
              <span className="text-xs text-red-600">2 hari</span>
            </div>
            
            <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
              <div>
                <p className="text-sm font-medium text-yellow-800">Q3 Performance Review</p>
                <p className="text-xs text-yellow-600">Due: 15 Sep 2025</p>
              </div>
              <span className="text-xs text-yellow-600">18 hari</span>
            </div>
            
            <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
              <div>
                <p className="text-sm font-medium text-blue-800">Annual Report 2025</p>
                <p className="text-xs text-blue-600">Due: 31 Dec 2025</p>
              </div>
              <span className="text-xs text-blue-600">125 hari</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Report Performance Dashboard</h3>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Chart placeholder - Report Generation & Consumption Metrics</p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid gap-4 md:grid-cols-4">
          <button className="p-4 border rounded-lg hover:bg-blue-50 transition-colors">
            <div className="text-blue-600 font-medium">Generate Report</div>
            <div className="text-sm text-gray-500">Create new report</div>
          </button>
          <button className="p-4 border rounded-lg hover:bg-green-50 transition-colors">
            <div className="text-green-600 font-medium">View Analytics</div>
            <div className="text-sm text-gray-500">Report performance</div>
          </button>
          <button className="p-4 border rounded-lg hover:bg-purple-50 transition-colors">
            <div className="text-purple-600 font-medium">Export Data</div>
            <div className="text-sm text-gray-500">Download reports</div>
          </button>
          <button className="p-4 border rounded-lg hover:bg-orange-50 transition-colors">
            <div className="text-orange-600 font-medium">Schedule Report</div>
            <div className="text-sm text-gray-500">Automated reporting</div>
          </button>
        </div>
      </div>
    </div>
  )
}