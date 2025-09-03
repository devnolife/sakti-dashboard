export default function PeriodicReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Laporan Berkala</h1>
          <p className="text-gray-600 mt-2">
            Laporan rutin bulanan, kuartalan, dan semesteran
          </p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          + Generate Report
        </button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Monthly Reports</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">8</div>
            <div className="text-sm text-gray-500">reports this year</div>
            <div className="mt-2 text-sm text-blue-600">August pending</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Quarterly Reports</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">2</div>
            <div className="text-sm text-gray-500">completed in 2025</div>
            <div className="mt-2 text-sm text-green-600">Q3 in progress</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Semester Reports</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">1</div>
            <div className="text-sm text-gray-500">completed</div>
            <div className="mt-2 text-sm text-purple-600">Sem. Genap 2025</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">On Schedule</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">91%</div>
            <div className="text-sm text-gray-500">reports on time</div>
            <div className="mt-2 text-sm text-green-600">↑ 5% from last year</div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg border shadow-sm">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Report Schedule & Status</h3>
            <div className="flex space-x-2">
              <select className="border rounded-lg px-3 py-1 text-sm">
                <option>All Types</option>
                <option>Monthly</option>
                <option>Quarterly</option>
                <option>Semester</option>
              </select>
              <select className="border rounded-lg px-3 py-1 text-sm">
                <option>2025</option>
                <option>2024</option>
                <option>2023</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Report Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Period
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Published
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">Quality Assurance Report</div>
                    <div className="text-sm text-gray-500">Academic & service quality assessment</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    Monthly
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  August 2025
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  31 Aug 2025
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    Draft
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  -
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-900 cursor-pointer">
                  Edit Draft
                </td>
              </tr>
              
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">Student Satisfaction Report</div>
                    <div className="text-sm text-gray-500">Monthly survey analysis</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    Monthly
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  July 2025
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  31 Jul 2025
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Published
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  5 Aug 2025
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-900 cursor-pointer">
                  View Report
                </td>
              </tr>
              
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">Q3 Performance Review</div>
                    <div className="text-sm text-gray-500">Quarterly performance assessment</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Quarterly
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Q3 2025
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  15 Oct 2025
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    In Progress
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  -
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-900 cursor-pointer">
                  Continue Work
                </td>
              </tr>
              
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">Infrastructure Assessment</div>
                    <div className="text-sm text-gray-500">Facility condition and utilization</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                    Semester
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Sem Ganjil 2025
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  30 Dec 2025
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                    Scheduled
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  -
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-900 cursor-pointer">
                  Start Report
                </td>
              </tr>
              
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">Faculty Performance Report</div>
                    <div className="text-sm text-gray-500">Teaching effectiveness analysis</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Quarterly
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Q2 2025
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  15 Jul 2025
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Published
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  20 Jul 2025
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-900 cursor-pointer">
                  View Report
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Report Completion Trends</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Chart placeholder - Report Completion Timeline</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Key Metrics Summary</h3>
          <div className="space-y-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-blue-800">Average Completion Time</span>
                <span className="text-lg font-bold text-blue-600">5.2 days</span>
              </div>
              <p className="text-xs text-blue-600 mt-1">↓ 1.3 days from last quarter</p>
            </div>
            
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-green-800">On-Time Delivery Rate</span>
                <span className="text-lg font-bold text-green-600">91%</span>
              </div>
              <p className="text-xs text-green-600 mt-1">↑ 5% improvement this year</p>
            </div>
            
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-purple-800">Average Report Length</span>
                <span className="text-lg font-bold text-purple-600">24 pages</span>
              </div>
              <p className="text-xs text-purple-600 mt-1">Standard range: 18-30 pages</p>
            </div>
            
            <div className="p-3 bg-orange-50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-orange-800">Report Views (Avg)</span>
                <span className="text-lg font-bold text-orange-600">247</span>
              </div>
              <p className="text-xs text-orange-600 mt-1">↑ 15% increase in readership</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Report Templates & Standards</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Monthly Report Template</h4>
            <p className="text-sm text-gray-600 mb-3">Standard template for monthly quality reports</p>
            <div className="flex space-x-2">
              <button className="text-blue-600 hover:text-blue-800 text-sm">Download</button>
              <button className="text-green-600 hover:text-green-800 text-sm">Use Template</button>
            </div>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Quarterly Report Template</h4>
            <p className="text-sm text-gray-600 mb-3">Comprehensive quarterly assessment format</p>
            <div className="flex space-x-2">
              <button className="text-blue-600 hover:text-blue-800 text-sm">Download</button>
              <button className="text-green-600 hover:text-green-800 text-sm">Use Template</button>
            </div>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Semester Report Template</h4>
            <p className="text-sm text-gray-600 mb-3">Detailed semester evaluation template</p>
            <div className="flex space-x-2">
              <button className="text-blue-600 hover:text-blue-800 text-sm">Download</button>
              <button className="text-green-600 hover:text-green-800 text-sm">Use Template</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}