export default function AccreditationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Akreditasi</h1>
        <p className="text-gray-600 mt-2">
          Dashboard utama untuk manajemen proses akreditasi
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Current Status</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">A</div>
            <div className="text-sm text-gray-500">peringkat akreditasi</div>
            <div className="mt-2 text-sm text-green-600">Valid until 2027</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Programs Accredited</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">8</div>
            <div className="text-sm text-gray-500">program studi</div>
            <div className="mt-2 text-sm text-blue-600">3 in renewal process</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Document Completeness</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">92%</div>
            <div className="text-sm text-gray-500">dokumen lengkap</div>
            <div className="mt-2 text-sm text-yellow-600">8% pending</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Next Assessment</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">8</div>
            <div className="text-sm text-gray-500">bulan lagi</div>
            <div className="mt-2 text-sm text-orange-600">April 2026</div>
          </div>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Accreditation Status by Program</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <p className="font-medium text-green-800">Teknik Informatika</p>
                <p className="text-sm text-green-600">Valid until: Dec 2027</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-green-600">A</span>
                <p className="text-xs text-green-500">Excellent</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="font-medium text-blue-800">Sistem Informasi</p>
                <p className="text-sm text-blue-600">Valid until: Jun 2026</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-blue-600">B</span>
                <p className="text-xs text-blue-500">Very Good</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <p className="font-medium text-green-800">Data Science</p>
                <p className="text-sm text-green-600">Valid until: Mar 2028</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-green-600">A</span>
                <p className="text-xs text-green-500">Excellent</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div>
                <p className="font-medium text-yellow-800">Manajemen Informatika</p>
                <p className="text-sm text-yellow-600">Renewal in progress</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-yellow-600">-</span>
                <p className="text-xs text-yellow-500">Under Review</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Preparation Progress</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Document Collection</span>
                <span>95%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{width: '95%'}}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Self-Assessment Report</span>
                <span>80%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{width: '80%'}}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Evidence Documentation</span>
                <span>88%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{width: '88%'}}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Team Preparation</span>
                <span>72%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-600 h-2 rounded-full" style={{width: '72%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-green-800">Document Review Completed</p>
                <p className="text-xs text-gray-500">22 Aug 2025</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-blue-800">Self-Assessment Updated</p>
                <p className="text-xs text-gray-500">20 Aug 2025</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-yellow-800">Stakeholder Meeting</p>
                <p className="text-xs text-gray-500">18 Aug 2025</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Upcoming Deadlines</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-2 bg-red-50 rounded">
              <div>
                <p className="text-sm font-medium text-red-800">Final Report Submission</p>
                <p className="text-xs text-red-600">30 Sep 2025</p>
              </div>
              <span className="text-xs text-red-600">5 hari</span>
            </div>
            
            <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
              <div>
                <p className="text-sm font-medium text-yellow-800">Assessor Visit Preparation</p>
                <p className="text-xs text-yellow-600">15 Oct 2025</p>
              </div>
              <span className="text-xs text-yellow-600">20 hari</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Quality Indicators</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm">Faculty Qualification</span>
              <span className="text-sm font-medium text-green-600">98%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Student Satisfaction</span>
              <span className="text-sm font-medium text-green-600">4.2/5.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Research Output</span>
              <span className="text-sm font-medium text-blue-600">85%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Graduate Employment</span>
              <span className="text-sm font-medium text-green-600">92%</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Accreditation Timeline</h3>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Chart placeholder - Accreditation Process Timeline</p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid gap-4 md:grid-cols-4">
          <button className="p-4 border rounded-lg hover:bg-blue-50 transition-colors">
            <div className="text-blue-600 font-medium">Prepare Documents</div>
            <div className="text-sm text-gray-500">Manage accreditation docs</div>
          </button>
          <button className="p-4 border rounded-lg hover:bg-green-50 transition-colors">
            <div className="text-green-600 font-medium">View Results</div>
            <div className="text-sm text-gray-500">Check assessment results</div>
          </button>
          <button className="p-4 border rounded-lg hover:bg-purple-50 transition-colors">
            <div className="text-purple-600 font-medium">Generate Report</div>
            <div className="text-sm text-gray-500">Create progress report</div>
          </button>
          <button className="p-4 border rounded-lg hover:bg-yellow-50 transition-colors">
            <div className="text-yellow-600 font-medium">Schedule Meeting</div>
            <div className="text-sm text-gray-500">Coordinate team meeting</div>
          </button>
        </div>
      </div>
    </div>
  )
}