export default function ImprovementTrackingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Tracking Perbaikan</h1>
        <p className="text-gray-600 mt-2">
          Pantau progress dan hasil implementasi perbaikan kualitas
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">On Track</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">9</div>
            <div className="text-sm text-gray-500">sesuai jadwal</div>
            <div className="mt-2 text-sm text-green-600">75% dari target</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">At Risk</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600">2</div>
            <div className="text-sm text-gray-500">berpotensi terlambat</div>
            <div className="mt-2 text-sm text-yellow-600">Perlu perhatian</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Delayed</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600">1</div>
            <div className="text-sm text-gray-500">terlambat</div>
            <div className="mt-2 text-sm text-red-600">Butuh eskalasi</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Avg Progress</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">68%</div>
            <div className="text-sm text-gray-500">rata-rata kemajuan</div>
            <div className="mt-2 text-sm text-green-600">↑ 8% bulan ini</div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg border shadow-sm">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">Progress Tracking Dashboard</h3>
        </div>
        
        <div className="p-6">
          <div className="space-y-6">
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-medium text-gray-900">Upgrade Lab Komputer</h4>
                  <p className="text-sm text-gray-600">Infrastructure • PIC: Dr. Ahmad</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">On Track</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{width: '75%'}}></div>
                </div>
              </div>
              
              <div className="mt-3 grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Start Date:</span>
                  <p>1 Jul 2025</p>
                </div>
                <div>
                  <span className="text-gray-500">Target Date:</span>
                  <p>30 Sep 2025</p>
                </div>
                <div>
                  <span className="text-gray-500">Budget Used:</span>
                  <p>Rp 450M / 600M</p>
                </div>
              </div>
              <div className="mt-4">
                <h5 className="font-medium text-sm mb-2">Recent Milestones</h5>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-gray-600">Procurement completed (20 Aug)</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-gray-600">Installation 70% done (22 Aug)</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-gray-600">Testing phase started (23 Aug)</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-medium text-gray-900">Student Counseling Service</h4>
                  <p className="text-sm text-gray-600">Service • PIC: Dr. Budi</p>
                </div>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">At Risk</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>45%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-600 h-2 rounded-full" style={{width: '45%'}}></div>
                </div>
              </div>
              
              <div className="mt-3 grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Start Date:</span>
                  <p>15 Jul 2025</p>
                </div>
                <div>
                  <span className="text-gray-500">Target Date:</span>
                  <p>20 Nov 2025</p>
                </div>
                <div>
                  <span className="text-gray-500">Budget Used:</span>
                  <p>Rp 120M / 300M</p>
                </div>
              </div>
              <div className="mt-4">
                <h5 className="font-medium text-sm mb-2">Issues & Risks</h5>
                <div className="space-y-2">
                  <div className="flex items-start text-sm">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2 mt-1"></div>
                    <span className="text-gray-600">Staff recruitment behind schedule</span>
                  </div>
                  <div className="flex items-start text-sm">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2 mt-1"></div>
                    <span className="text-gray-600">Space allocation not confirmed</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-medium text-gray-900">Faculty Training Program</h4>
                  <p className="text-sm text-gray-600">Academic • PIC: Prof. Siti</p>
                </div>
                <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">Delayed</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>35%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-600 h-2 rounded-full" style={{width: '35%'}}></div>
                </div>
              </div>
              
              <div className="mt-3 grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Start Date:</span>
                  <p>1 Jun 2025</p>
                </div>
                <div>
                  <span className="text-gray-500">Target Date:</span>
                  <p>31 Aug 2025</p>
                </div>
                <div>
                  <span className="text-gray-500">Budget Used:</span>
                  <p>Rp 80M / 200M</p>
                </div>
              </div>
              <div className="mt-4">
                <h5 className="font-medium text-sm mb-2 text-red-600">Action Required</h5>
                <div className="space-y-2">
                  <div className="flex items-start text-sm">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2 mt-1"></div>
                    <span className="text-gray-600">Reschedule remaining training sessions</span>
                  </div>
                  <div className="flex items-start text-sm">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2 mt-1"></div>
                    <span className="text-gray-600">Secure additional trainers</span>
                  </div>
                </div>
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
                <span>Infrastructure</span>
                <span>72%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{width: '72%'}}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Academic</span>
                <span>58%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{width: '58%'}}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Service</span>
                <span>43%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-600 h-2 rounded-full" style={{width: '43%'}}></div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Key Performance Indicators</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">On-time Delivery</span>
              <span className="text-sm font-medium text-green-600">75%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Budget Adherence</span>
              <span className="text-sm font-medium text-blue-600">82%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Quality Score</span>
              <span className="text-sm font-medium text-green-600">4.2/5.0</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Stakeholder Satisfaction</span>
              <span className="text-sm font-medium text-green-600">89%</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Improvement Timeline</h3>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Chart placeholder - Project Timeline with Milestones</p>
        </div>
      </div>
    </div>
  )
}