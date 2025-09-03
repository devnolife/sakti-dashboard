export default function MetricsReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Metrik Kinerja</h1>
          <p className="text-gray-600 mt-2">
            Key Performance Indicators dan metrik kualitas
          </p>
        </div>
        <div className="flex space-x-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Generate KPI Report
          </button>
          <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50">
            Export Data
          </button>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">KPI Score</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">8.4</div>
            <div className="text-sm text-gray-500">dari 10.0</div>
            <div className="mt-2 text-sm text-green-600">↑ 0.3 dari periode lalu</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Metrics Tracked</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">28</div>
            <div className="text-sm text-gray-500">active metrics</div>
            <div className="mt-2 text-sm text-blue-600">5 categories</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Target Achievement</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">89%</div>
            <div className="text-sm text-gray-500">targets met</div>
            <div className="mt-2 text-sm text-purple-600">25 of 28 metrics</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Trend Direction</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">↗ 71%</div>
            <div className="text-sm text-gray-500">metrics improving</div>
            <div className="mt-2 text-sm text-green-600">20 metrics trending up</div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg border shadow-sm">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Key Performance Indicators</h3>
            <div className="flex space-x-2">
              <select className="border rounded-lg px-3 py-1 text-sm">
                <option>All Categories</option>
                <option>Academic Quality</option>
                <option>Student Services</option>
                <option>Faculty Performance</option>
                <option>Infrastructure</option>
                <option>Research & Innovation</option>
              </select>
              <button className="text-blue-600 hover:text-blue-800 text-sm border border-blue-300 px-3 py-1 rounded-lg">
                Customize View
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Academic Quality Metrics</h4>
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium">Student Satisfaction Score</span>
                    <span className="text-lg font-bold text-green-600">4.3/5.0</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: '86%'}}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Target: 4.0</span>
                    <span className="text-green-600">↑ 7.5% vs last period</span>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium">Graduate Employment Rate</span>
                    <span className="text-lg font-bold text-green-600">92%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: '92%'}}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Target: 85%</span>
                    <span className="text-green-600">↑ 3% vs last period</span>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium">Curriculum Relevance Score</span>
                    <span className="text-lg font-bold text-blue-600">8.2/10</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{width: '82%'}}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Target: 8.0</span>
                    <span className="text-blue-600">↑ 2.5% vs last period</span>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium">Average GPA</span>
                    <span className="text-lg font-bold text-purple-600">3.42</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{width: '85.5%'}}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Target: 3.25</span>
                    <span className="text-purple-600">↑ 0.08 vs last period</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Faculty Performance Metrics</h4>
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium">Teaching Effectiveness Score</span>
                    <span className="text-lg font-bold text-green-600">4.4/5.0</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: '88%'}}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Target: 4.0</span>
                    <span className="text-green-600">↑ 10% vs last period</span>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium">Research Publications</span>
                    <span className="text-lg font-bold text-blue-600">42</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{width: '84%'}}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Target: 40</span>
                    <span className="text-blue-600">↑ 5% vs last period</span>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium">Faculty Qualification Rate</span>
                    <span className="text-lg font-bold text-green-600">94%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: '94%'}}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Target: 90%</span>
                    <span className="text-green-600">↑ 2% vs last period</span>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium">Professional Development Hours</span>
                    <span className="text-lg font-bold text-yellow-600">36</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div className="bg-yellow-600 h-2 rounded-full" style={{width: '72%'}}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Target: 40</span>
                    <span className="text-yellow-600">↓ 10% vs last period</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Infrastructure & Services</h4>
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium">Facility Utilization Rate</span>
                    <span className="text-lg font-bold text-green-600">87%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: '87%'}}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Target: 80%</span>
                    <span className="text-green-600">↑ 8.8% vs last period</span>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium">IT Infrastructure Uptime</span>
                    <span className="text-lg font-bold text-green-600">99.5%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: '99.5%'}}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Target: 98%</span>
                    <span className="text-green-600">↑ 1.5% vs last period</span>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium">Service Response Time</span>
                    <span className="text-lg font-bold text-blue-600">18 hrs</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{width: '75%'}}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Target: 24 hrs</span>
                    <span className="text-blue-600">↓ 25% vs last period</span>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium">Equipment Maintenance Rate</span>
                    <span className="text-lg font-bold text-yellow-600">78%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div className="bg-yellow-600 h-2 rounded-full" style={{width: '78%'}}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Target: 85%</span>
                    <span className="text-red-600">↓ 5% vs last period</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Performance Trends</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Chart placeholder - KPI Performance Over Time</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Target vs Achievement</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Chart placeholder - Target Achievement Analysis</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Metrics Summary Dashboard</h3>
        <div className="grid gap-6 lg:grid-cols-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Top Performers</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Graduate Employment</span>
                <span className="text-green-600 font-medium">108% of target</span>
              </div>
              <div className="flex justify-between">
                <span>IT Infrastructure</span>
                <span className="text-green-600 font-medium">101% of target</span>
              </div>
              <div className="flex justify-between">
                <span>Teaching Effectiveness</span>
                <span className="text-green-600 font-medium">110% of target</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Needs Attention</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Equipment Maintenance</span>
                <span className="text-red-600 font-medium">92% of target</span>
              </div>
              <div className="flex justify-between">
                <span>Professional Development</span>
                <span className="text-yellow-600 font-medium">90% of target</span>
              </div>
              <div className="flex justify-between">
                <span>Research Funding</span>
                <span className="text-yellow-600 font-medium">88% of target</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Improvement Areas</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>Infrastructure maintenance</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>Faculty development</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Research collaboration</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Next Actions</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Review maintenance schedule</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Plan faculty training</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Update KPI targets</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}