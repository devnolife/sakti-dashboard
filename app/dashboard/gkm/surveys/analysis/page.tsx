export default function SurveyAnalysisPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analisis Survei</h1>
          <p className="text-gray-600 mt-2">
            Analisis mendalam dan insights dari data survei
          </p>
        </div>
        <div className="flex space-x-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Export Report
          </button>
          <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50">
            Custom Analysis
          </button>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Total Surveys</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-700">24</div>
            <div className="text-sm text-gray-500">completed surveys</div>
            <div className="mt-2 text-sm text-blue-600">6 months period</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Response Rate</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">82%</div>
            <div className="text-sm text-gray-500">average response rate</div>
            <div className="mt-2 text-sm text-green-600">↑ 8% improvement</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Satisfaction Trend</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">↗ 12%</div>
            <div className="text-sm text-gray-500">improvement trend</div>
            <div className="mt-2 text-sm text-purple-600">Last 6 months</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Action Items</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">15</div>
            <div className="text-sm text-gray-500">improvement actions</div>
            <div className="mt-2 text-sm text-orange-600">8 completed</div>
          </div>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Satisfaction Score Analysis</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Chart placeholder - Satisfaction Scores Comparison</p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">4.2</div>
              <p className="text-gray-600">Students</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">4.1</div>
              <p className="text-gray-600">Stakeholders</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Response Rate Trends</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Chart placeholder - Response Rate Over Time</p>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm">
              <span>Target Response Rate: 80%</span>
              <span className="text-green-600">Current: 82%</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Key Performance Indicators</h3>
        <div className="grid gap-6 lg:grid-cols-3">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Teaching Quality</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Course Content Quality</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: '90%'}}></div>
                  </div>
                  <span className="text-sm text-green-600">4.5</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Lecturer Effectiveness</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{width: '88%'}}></div>
                  </div>
                  <span className="text-sm text-blue-600">4.4</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Assessment Methods</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{width: '82%'}}></div>
                  </div>
                  <span className="text-sm text-purple-600">4.1</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Facilities & Services</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Learning Facilities</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{width: '84%'}}></div>
                  </div>
                  <span className="text-sm text-blue-600">4.2</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Library Services</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: '86%'}}></div>
                  </div>
                  <span className="text-sm text-green-600">4.3</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">IT Infrastructure</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-600 h-2 rounded-full" style={{width: '76%'}}></div>
                  </div>
                  <span className="text-sm text-yellow-600">3.8</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Student Support</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Academic Counseling</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: '88%'}}></div>
                  </div>
                  <span className="text-sm text-green-600">4.4</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Career Services</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{width: '92%'}}></div>
                  </div>
                  <span className="text-sm text-purple-600">4.6</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Student Activities</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{width: '80%'}}></div>
                  </div>
                  <span className="text-sm text-blue-600">4.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Sentiment Analysis & Word Cloud</h3>
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <h4 className="font-medium mb-3">Most Mentioned Keywords</h4>
            <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Word Cloud placeholder - Top keywords from feedback</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Sentiment Distribution</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Positive</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-3">
                    <div className="bg-green-600 h-3 rounded-full" style={{width: '68%'}}></div>
                  </div>
                  <span className="text-sm text-green-600">68%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Neutral</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-3">
                    <div className="bg-blue-600 h-3 rounded-full" style={{width: '23%'}}></div>
                  </div>
                  <span className="text-sm text-blue-600">23%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Negative</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-3">
                    <div className="bg-red-600 h-3 rounded-full" style={{width: '9%'}}></div>
                  </div>
                  <span className="text-sm text-red-600">9%</span>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <h5 className="font-medium text-sm mb-2">Top Concerns</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Parking availability</span>
                  <span className="text-red-600">34%</span>
                </div>
                <div className="flex justify-between">
                  <span>WiFi connectivity</span>
                  <span className="text-red-600">28%</span>
                </div>
                <div className="flex justify-between">
                  <span>Administrative processes</span>
                  <span className="text-red-600">19%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Demographic Analysis</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-sm mb-2">Response by Program</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Teknik Informatika</span>
                  <span className="text-sm font-medium">867 responses</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Sistem Informasi</span>
                  <span className="text-sm font-medium">645 responses</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Data Science</span>
                  <span className="text-sm font-medium">655 responses</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-sm mb-2">Response by Academic Year</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Year 1</span>
                  <span className="text-sm font-medium">523 responses</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Year 2</span>
                  <span className="text-sm font-medium">489 responses</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Year 3</span>
                  <span className="text-sm font-medium">634 responses</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Year 4</span>
                  <span className="text-sm font-medium">521 responses</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Action Items & Recommendations</h3>
          <div className="space-y-4">
            <div className="p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-medium text-red-800">High Priority</h4>
                <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">3 items</span>
              </div>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• Expand parking facilities</li>
                <li>• Upgrade WiFi infrastructure</li>
                <li>• Streamline admin processes</li>
              </ul>
            </div>
            
            <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-medium text-yellow-800">Medium Priority</h4>
                <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">5 items</span>
              </div>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Enhance lab equipment</li>
                <li>• Improve canteen services</li>
                <li>• Expand library hours</li>
              </ul>
            </div>
            
            <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-medium text-green-800">Strengths to Maintain</h4>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">7 items</span>
              </div>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Teaching quality</li>
                <li>• Career services</li>
                <li>• Industry partnerships</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}