export default function AccreditationPreparationPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Persiapan Akreditasi</h1>
          <p className="text-gray-600 mt-2">
            Kelola persiapan dan perencanaan proses akreditasi
          </p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          + Tambah Task Baru
        </button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Total Tasks</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-700">48</div>
            <div className="text-sm text-gray-500">tugas persiapan</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Completed</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">32</div>
            <div className="text-sm text-gray-500">tugas selesai</div>
            <div className="mt-2 text-sm text-green-600">67% progress</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">In Progress</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">12</div>
            <div className="text-sm text-gray-500">sedang dikerjakan</div>
            <div className="mt-2 text-sm text-blue-600">25% of total</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Overdue</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600">4</div>
            <div className="text-sm text-gray-500">terlambat</div>
            <div className="mt-2 text-sm text-red-600">Need attention</div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg border shadow-sm">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Preparation Checklist</h3>
            <div className="flex space-x-2">
              <select className="border rounded-lg px-3 py-1 text-sm">
                <option>All Categories</option>
                <option>Documentation</option>
                <option>Assessment</option>
                <option>Team Preparation</option>
                <option>Infrastructure</option>
              </select>
              <select className="border rounded-lg px-3 py-1 text-sm">
                <option>All Status</option>
                <option>Completed</option>
                <option>In Progress</option>
                <option>Overdue</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="divide-y">
          <div className="p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3">
                <input type="checkbox" className="mt-1" checked disabled />
                <div>
                  <h4 className="font-medium text-gray-900">Self-Assessment Report Completion</h4>
                  <p className="text-sm text-gray-600">Complete comprehensive self-assessment for all study programs</p>
                  <div className="flex space-x-2 mt-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Assessment</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">High Priority</span>
                  </div>
                </div>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Completed</span>
            </div>
            
            <div className="ml-6 grid grid-cols-4 gap-4 text-sm mt-4">
              <div>
                <span className="text-gray-500">Assigned to:</span>
                <p className="font-medium">Dr. Ahmad, Prof. Siti</p>
              </div>
              <div>
                <span className="text-gray-500">Due Date:</span>
                <p className="font-medium">20 Aug 2025</p>
              </div>
              <div>
                <span className="text-gray-500">Completed:</span>
                <p className="font-medium text-green-600">22 Aug 2025</p>
              </div>
              <div>
                <span className="text-gray-500">Progress:</span>
                <p className="font-medium text-green-600">100%</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3">
                <input type="checkbox" className="mt-1" />
                <div>
                  <h4 className="font-medium text-gray-900">Document Repository Organization</h4>
                  <p className="text-sm text-gray-600">Organize and digitize all supporting documents and evidence</p>
                  <div className="flex space-x-2 mt-2">
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">Documentation</span>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">Medium Priority</span>
                  </div>
                </div>
              </div>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">In Progress</span>
            </div>
            
            <div className="ml-6">
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{width: '75%'}}></div>
              </div>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Assigned to:</span>
                  <p className="font-medium">Admin Team</p>
                </div>
                <div>
                  <span className="text-gray-500">Due Date:</span>
                  <p className="font-medium">30 Sep 2025</p>
                </div>
                <div>
                  <span className="text-gray-500">Progress:</span>
                  <p className="font-medium text-blue-600">75%</p>
                </div>
                <div>
                  <span className="text-gray-500">Status:</span>
                  <p className="font-medium text-blue-600">On Track</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3">
                <input type="checkbox" className="mt-1" />
                <div>
                  <h4 className="font-medium text-gray-900">Faculty Qualification Verification</h4>
                  <p className="text-sm text-gray-600">Verify and update all faculty qualifications and credentials</p>
                  <div className="flex space-x-2 mt-2">
                    <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded">Team Preparation</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">High Priority</span>
                  </div>
                </div>
              </div>
              <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">Overdue</span>
            </div>
            
            <div className="ml-6 grid grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Assigned to:</span>
                <p className="font-medium">HR Team</p>
              </div>
              <div>
                <span className="text-gray-500">Due Date:</span>
                <p className="font-medium text-red-600">15 Aug 2025</p>
              </div>
              <div>
                <span className="text-gray-500">Progress:</span>
                <p className="font-medium text-yellow-600">60%</p>
              </div>
              <div>
                <span className="text-gray-500">Days Overdue:</span>
                <p className="font-medium text-red-600">8 days</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3">
                <input type="checkbox" className="mt-1" />
                <div>
                  <h4 className="font-medium text-gray-900">Infrastructure Assessment</h4>
                  <p className="text-sm text-gray-600">Conduct comprehensive assessment of all facilities and equipment</p>
                  <div className="flex space-x-2 mt-2">
                    <span className="px-2 py-1 bg-teal-100 text-teal-800 text-xs rounded">Infrastructure</span>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">Medium Priority</span>
                  </div>
                </div>
              </div>
              <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">Not Started</span>
            </div>
            
            <div className="ml-6 grid grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Assigned to:</span>
                <p className="font-medium">Facility Team</p>
              </div>
              <div>
                <span className="text-gray-500">Due Date:</span>
                <p className="font-medium">15 Oct 2025</p>
              </div>
              <div>
                <span className="text-gray-500">Progress:</span>
                <p className="font-medium">0%</p>
              </div>
              <div>
                <span className="text-gray-500">Planned Start:</span>
                <p className="font-medium">1 Oct 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Progress by Category</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Documentation</span>
                <span>85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{width: '85%'}}></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">12 of 14 tasks completed</div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Assessment</span>
                <span>72%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{width: '72%'}}></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">8 of 11 tasks completed</div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Team Preparation</span>
                <span>58%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-600 h-2 rounded-full" style={{width: '58%'}}></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">7 of 12 tasks completed</div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Infrastructure</span>
                <span>45%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-orange-600 h-2 rounded-full" style={{width: '45%'}}></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">5 of 11 tasks completed</div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Team Assignments</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="font-medium text-blue-800">Dr. Ahmad Hidayat</p>
                <p className="text-sm text-blue-600">Coordinator - Assessment Team</p>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium text-blue-600">8 tasks</span>
                <p className="text-xs text-blue-500">6 completed</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <p className="font-medium text-green-800">Prof. Siti Nurhaliza</p>
                <p className="text-sm text-green-600">Documentation Lead</p>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium text-green-600">12 tasks</span>
                <p className="text-xs text-green-500">10 completed</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div>
                <p className="font-medium text-yellow-800">Dr. Budi Santoso</p>
                <p className="text-sm text-yellow-600">Infrastructure Team</p>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium text-yellow-600">6 tasks</span>
                <p className="text-xs text-yellow-500">3 completed</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div>
                <p className="font-medium text-purple-800">Admin Team</p>
                <p className="text-sm text-purple-600">Support & Coordination</p>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium text-purple-600">22 tasks</span>
                <p className="text-xs text-purple-500">13 completed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Preparation Timeline</h3>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Chart placeholder - Accreditation Preparation Gantt Chart</p>
        </div>
      </div>
    </div>
  )
}