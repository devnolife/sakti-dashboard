export default function DocumentManagementPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manajemen Dokumen</h1>
          <p className="text-gray-600 mt-2">
            Kelola dokumen dan bukti pendukung akreditasi
          </p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          + Upload Dokumen
        </button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Total Documents</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-700">267</div>
            <div className="text-sm text-gray-500">dokumen</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Verified</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">245</div>
            <div className="text-sm text-gray-500">telah diverifikasi</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Pending Review</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600">18</div>
            <div className="text-sm text-gray-500">menunggu review</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Missing</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600">4</div>
            <div className="text-sm text-gray-500">belum tersedia</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Completeness</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">95%</div>
            <div className="text-sm text-gray-500">kelengkapan</div>
          </div>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Document Repository</h3>
                <div className="flex space-x-2">
                  <select className="border rounded-lg px-3 py-1 text-sm">
                    <option>All Categories</option>
                    <option>Self-Assessment</option>
                    <option>Learning Outcomes</option>
                    <option>Faculty Documents</option>
                    <option>Infrastructure</option>
                    <option>Student Records</option>
                  </select>
                  <input 
                    type="text" 
                    placeholder="Search documents..." 
                    className="border rounded-lg px-3 py-1 text-sm w-48"
                  />
                </div>
              </div>
            </div>
            
            <div className="divide-y max-h-96 overflow-y-auto">
              <div className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                      <span className="text-xs font-medium text-blue-600">PDF</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Self-Assessment Report 2025</p>
                      <p className="text-sm text-gray-500">Uploaded by Dr. Ahmad • 2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Verified</span>
                    <button className="text-blue-600 hover:text-blue-800 text-sm">View</button>
                  </div>
                </div>
              </div>
              <div className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                      <span className="text-xs font-medium text-green-600">XLS</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Faculty Qualification Matrix</p>
                      <p className="text-sm text-gray-500">Uploaded by HR Team • 1 week ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">Pending Review</span>
                    <button className="text-blue-600 hover:text-blue-800 text-sm">View</button>
                  </div>
                </div>
              </div>
              <div className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center">
                      <span className="text-xs font-medium text-purple-600">DOC</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Learning Outcomes Assessment</p>
                      <p className="text-sm text-gray-500">Uploaded by Prof. Siti • 3 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Verified</span>
                    <button className="text-blue-600 hover:text-blue-800 text-sm">View</button>
                  </div>
                </div>
              </div>
              <div className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                      <span className="text-xs font-medium text-red-600">PDF</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Infrastructure Audit Report</p>
                      <p className="text-sm text-gray-500">Due date: 30 Sep 2025</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">Missing</span>
                    <button className="text-red-600 hover:text-red-800 text-sm">Upload</button>
                  </div>
                </div>
              </div>
              <div className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                      <span className="text-xs font-medium text-blue-600">PDF</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Student Satisfaction Survey Results</p>
                      <p className="text-sm text-gray-500">Uploaded by GKM Team • 1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">Pending Review</span>
                    <button className="text-blue-600 hover:text-blue-800 text-sm">View</button>
                  </div>
                </div>
              </div>
              <div className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                      <span className="text-xs font-medium text-green-600">XLS</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Graduate Employment Data</p>
                      <p className="text-sm text-gray-500">Uploaded by Career Center • 5 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Verified</span>
                    <button className="text-blue-600 hover:text-blue-800 text-sm">View</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Document Categories</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Self-Assessment</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: '100%'}}></div>
                  </div>
                  <span className="text-xs text-gray-500">25/25</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Learning Outcomes</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: '95%'}}></div>
                  </div>
                  <span className="text-xs text-gray-500">38/40</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Faculty Documents</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-600 h-2 rounded-full" style={{width: '87%'}}></div>
                  </div>
                  <span className="text-xs text-gray-500">52/60</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Infrastructure</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div className="bg-red-600 h-2 rounded-full" style={{width: '75%'}}></div>
                  </div>
                  <span className="text-xs text-gray-500">30/40</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Student Records</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: '98%'}}></div>
                  </div>
                  <span className="text-xs text-gray-500">98/100</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Research Output</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{width: '90%'}}></div>
                  </div>
                  <span className="text-xs text-gray-500">27/30</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-green-800">Document Verified</p>
                  <p className="text-xs text-gray-500">Self-Assessment Report verified by Dr. Ahmad</p>
                  <p className="text-xs text-gray-400">2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-blue-800">New Upload</p>
                  <p className="text-xs text-gray-500">Faculty qualification matrix uploaded</p>
                  <p className="text-xs text-gray-400">1 day ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-yellow-800">Review Requested</p>
                  <p className="text-xs text-gray-500">Student satisfaction survey needs review</p>
                  <p className="text-xs text-gray-400">2 days ago</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Storage Usage</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Used Storage</span>
                  <span>2.4 GB / 10 GB</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{width: '24%'}}></div>
                </div>
              </div>
              
              <div className="text-xs text-gray-500 space-y-1">
                <div className="flex justify-between">
                  <span>PDF Files</span>
                  <span>1.8 GB</span>
                </div>
                <div className="flex justify-between">
                  <span>Office Documents</span>
                  <span>0.4 GB</span>
                </div>
                <div className="flex justify-between">
                  <span>Images</span>
                  <span>0.2 GB</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Document Approval Workflow</h3>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Chart placeholder - Document Approval Process Flow</p>
        </div>
      </div>
    </div>
  )
}