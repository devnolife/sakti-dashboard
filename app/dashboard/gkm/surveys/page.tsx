export default function SurveysPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Survei & Feedback</h1>
        <p className="text-gray-600 mt-2">
          Dashboard utama untuk manajemen survei dan feedback stakeholder
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Active Surveys</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">8</div>
            <div className="text-sm text-gray-500">survei aktif</div>
            <div className="mt-2 text-sm text-blue-600">2 baru bulan ini</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Response Rate</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">87%</div>
            <div className="text-sm text-gray-500">tingkat respons</div>
            <div className="mt-2 text-sm text-green-600">↑ 12% dari semester lalu</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Total Responses</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">2,847</div>
            <div className="text-sm text-gray-500">total responden</div>
            <div className="mt-2 text-sm text-purple-600">Bulan ini</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Avg Satisfaction</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">4.2</div>
            <div className="text-sm text-gray-500">dari 5.0</div>
            <div className="mt-2 text-sm text-green-600">↑ 0.3 dari semester lalu</div>
          </div>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Survey Categories</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="font-medium text-blue-800">Student Satisfaction</p>
                <p className="text-sm text-blue-600">3 active surveys</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-blue-600">4.3</span>
                <p className="text-xs text-blue-500">Avg Rating</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <p className="font-medium text-green-800">Stakeholder Feedback</p>
                <p className="text-sm text-green-600">2 active surveys</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-green-600">4.1</span>
                <p className="text-xs text-green-500">Avg Rating</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div>
                <p className="font-medium text-purple-800">Faculty Evaluation</p>
                <p className="text-sm text-purple-600">2 active surveys</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-purple-600">4.0</span>
                <p className="text-xs text-purple-500">Avg Rating</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div>
                <p className="font-medium text-yellow-800">Service Quality</p>
                <p className="text-sm text-yellow-600">1 active survey</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-yellow-600">3.9</span>
                <p className="text-xs text-yellow-500">Avg Rating</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Recent Survey Results</h3>
          <div className="space-y-4">
            <div className="p-3 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-gray-900">Kepuasan Pembelajaran Online</h4>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Completed</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Responses:</span>
                  <p className="font-medium">1,234</p>
                </div>
                <div>
                  <span className="text-gray-500">Rating:</span>
                  <p className="font-medium text-green-600">4.2/5.0</p>
                </div>
              </div>
            </div>
            
            <div className="p-3 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-gray-900">Evaluasi Fasilitas Lab</h4>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Active</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Responses:</span>
                  <p className="font-medium">567</p>
                </div>
                <div>
                  <span className="text-gray-500">Progress:</span>
                  <p className="font-medium text-blue-600">78%</p>
                </div>
              </div>
            </div>
            
            <div className="p-3 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-gray-900">Alumni Tracer Study</h4>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">Planning</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Target:</span>
                  <p className="font-medium">2,000</p>
                </div>
                <div>
                  <span className="text-gray-500">Launch:</span>
                  <p className="font-medium">1 Oct 2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Response Trends</h3>
          <div className="h-40 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500 text-sm">Response Rate Chart</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Satisfaction Scores</h3>
          <div className="h-40 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500 text-sm">Satisfaction Trends</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Key Insights</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-1"></div>
              <p className="text-gray-700">Student satisfaction improved by 15% this semester</p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>
              <p className="text-gray-700">Online learning acceptance rate increased to 92%</p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-1"></div>
              <p className="text-gray-700">Infrastructure concerns mentioned in 23% of responses</p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-1"></div>
              <p className="text-gray-700">Career services rated highest among all services</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Survey Performance Overview</h3>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Chart placeholder - Survey Performance Dashboard</p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid gap-4 md:grid-cols-4">
          <button className="p-4 border rounded-lg hover:bg-blue-50 transition-colors">
            <div className="text-blue-600 font-medium">Create Survey</div>
            <div className="text-sm text-gray-500">Design new survey</div>
          </button>
          <button className="p-4 border rounded-lg hover:bg-green-50 transition-colors">
            <div className="text-green-600 font-medium">View Results</div>
            <div className="text-sm text-gray-500">Analyze responses</div>
          </button>
          <button className="p-4 border rounded-lg hover:bg-purple-50 transition-colors">
            <div className="text-purple-600 font-medium">Generate Report</div>
            <div className="text-sm text-gray-500">Create summary report</div>
          </button>
          <button className="p-4 border rounded-lg hover:bg-orange-50 transition-colors">
            <div className="text-orange-600 font-medium">Send Reminder</div>
            <div className="text-sm text-gray-500">Boost response rate</div>
          </button>
        </div>
      </div>
    </div>
  )
}