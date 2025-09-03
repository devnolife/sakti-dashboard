export default function AnnualReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Laporan Tahunan</h1>
          <p className="text-gray-600 mt-2">
            Laporan komprehensif kualitas dan kinerja tahunan
          </p>
        </div>
        <div className="flex space-x-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Start 2025 Report
          </button>
          <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50">
            View Archive
          </button>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Current Report</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">2025</div>
            <div className="text-sm text-gray-500">in progress</div>
            <div className="mt-2 text-sm text-blue-600">95% complete</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Published Reports</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">4</div>
            <div className="text-sm text-gray-500">reports available</div>
            <div className="mt-2 text-sm text-green-600">2021-2024</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Total Downloads</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">2,847</div>
            <div className="text-sm text-gray-500">all time downloads</div>
            <div className="mt-2 text-sm text-purple-600">456 this year</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Average Pages</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">124</div>
            <div className="text-sm text-gray-500">pages per report</div>
            <div className="mt-2 text-sm text-orange-600">Comprehensive coverage</div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg border shadow-sm">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">Annual Report Progress 2025</h3>
        </div>
        
        <div className="p-6">
          <div className="space-y-6">
            <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
              <div>
                <h4 className="font-medium text-green-800">Executive Summary</h4>
                <p className="text-sm text-green-600">Overview and key highlights</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">✓ Complete</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
              <div>
                <h4 className="font-medium text-green-800">Academic Quality Assessment</h4>
                <p className="text-sm text-green-600">Teaching, learning, and curriculum evaluation</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">✓ Complete</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
              <div>
                <h4 className="font-medium text-green-800">Student Services & Satisfaction</h4>
                <p className="text-sm text-green-600">Service quality and student feedback analysis</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">✓ Complete</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
              <div>
                <h4 className="font-medium text-blue-800">Infrastructure & Facilities</h4>
                <p className="text-sm text-blue-600">Facility assessment and utilization</p>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">🔄 In Progress (90%)</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
              <div>
                <h4 className="font-medium text-green-800">Faculty Performance</h4>
                <p className="text-sm text-green-600">Teaching effectiveness and research output</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">✓ Complete</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
              <div>
                <h4 className="font-medium text-green-800">Research & Innovation</h4>
                <p className="text-sm text-green-600">Research activities and publication analysis</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">✓ Complete</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
              <div>
                <h4 className="font-medium text-green-800">Stakeholder Engagement</h4>
                <p className="text-sm text-green-600">Industry partnerships and alumni feedback</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">✓ Complete</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg">
              <div>
                <h4 className="font-medium text-yellow-800">Quality Improvement Initiatives</h4>
                <p className="text-sm text-yellow-600">Improvement plans and implementation</p>
              </div>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">⏳ Pending Review</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-800">Appendices & Supporting Data</h4>
                <p className="text-sm text-gray-600">Data tables, charts, and detailed metrics</p>
              </div>
              <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">📋 Scheduled</span>
            </div>
          </div>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-blue-800">Overall Progress</span>
              <span className="text-blue-800">95%</span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-3">
              <div className="bg-blue-600 h-3 rounded-full" style={{width: '95%'}}></div>
            </div>
            <p className="text-sm text-blue-600 mt-2">Expected completion: 15 December 2025</p>
          </div>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Previous Annual Reports</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Annual Report 2024</h4>
                <p className="text-sm text-gray-600">Comprehensive quality assessment</p>
                <p className="text-xs text-gray-500">Published: March 15, 2025 • 128 pages</p>
              </div>
              <div className="flex flex-col space-y-2">
                <button className="text-blue-600 hover:text-blue-800 text-sm">View Report</button>
                <button className="text-green-600 hover:text-green-800 text-sm">Download PDF</button>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Annual Report 2023</h4>
                <p className="text-sm text-gray-600">Quality assurance and improvement</p>
                <p className="text-xs text-gray-500">Published: March 20, 2024 • 115 pages</p>
              </div>
              <div className="flex flex-col space-y-2">
                <button className="text-blue-600 hover:text-blue-800 text-sm">View Report</button>
                <button className="text-green-600 hover:text-green-800 text-sm">Download PDF</button>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Annual Report 2022</h4>
                <p className="text-sm text-gray-600">Post-pandemic quality recovery</p>
                <p className="text-xs text-gray-500">Published: April 10, 2023 • 132 pages</p>
              </div>
              <div className="flex flex-col space-y-2">
                <button className="text-blue-600 hover:text-blue-800 text-sm">View Report</button>
                <button className="text-green-600 hover:text-green-800 text-sm">Download PDF</button>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Annual Report 2021</h4>
                <p className="text-sm text-gray-600">Adaptation and resilience</p>
                <p className="text-xs text-gray-500">Published: May 15, 2022 • 120 pages</p>
              </div>
              <div className="flex flex-col space-y-2">
                <button className="text-blue-600 hover:text-blue-800 text-sm">View Report</button>
                <button className="text-green-600 hover:text-green-800 text-sm">Download PDF</button>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Report Analytics</h3>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">Most Downloaded</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Annual Report 2024</span>
                  <span className="font-medium">847 downloads</span>
                </div>
                <div className="flex justify-between">
                  <span>Annual Report 2023</span>
                  <span className="font-medium">634 downloads</span>
                </div>
                <div className="flex justify-between">
                  <span>Annual Report 2022</span>
                  <span className="font-medium">523 downloads</span>
                </div>
              </div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">Reader Engagement</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Average Reading Time</span>
                  <span className="font-medium">24 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span>Most Read Section</span>
                  <span className="font-medium">Executive Summary</span>
                </div>
                <div className="flex justify-between">
                  <span>External Citations</span>
                  <span className="font-medium">12 references</span>
                </div>
              </div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-medium text-purple-800 mb-2">Report Impact</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Accreditation References</span>
                  <span className="font-medium">8 instances</span>
                </div>
                <div className="flex justify-between">
                  <span>Policy Changes Initiated</span>
                  <span className="font-medium">5 policies</span>
                </div>
                <div className="flex justify-between">
                  <span>Media Coverage</span>
                  <span className="font-medium">3 articles</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Key Highlights from 2024 Report</h3>
        <div className="grid gap-6 lg:grid-cols-3">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Major Achievements</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-1"></div>
                <span>Achieved Grade A accreditation for all programs</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-1"></div>
                <span>Student satisfaction increased to 4.3/5.0</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-1"></div>
                <span>Graduate employment rate reached 92%</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-1"></div>
                <span>Launched 3 new industry partnerships</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Quality Improvements</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>
                <span>Upgraded all computer labs with latest equipment</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>
                <span>Implemented new learning management system</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>
                <span>Enhanced faculty development programs</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>
                <span>Improved student counseling services</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Future Initiatives</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-1"></div>
                <span>Digital transformation roadmap 2025-2027</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-1"></div>
                <span>International accreditation preparation</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-1"></div>
                <span>Research center establishment</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-1"></div>
                <span>Sustainability initiative implementation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}