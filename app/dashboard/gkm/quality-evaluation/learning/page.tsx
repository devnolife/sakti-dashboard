export default function LearningEvaluationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Evaluasi Pembelajaran</h1>
        <p className="text-gray-600 mt-2">
          Evaluasi efektivitas proses pembelajaran dan metode pengajaran
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Student Engagement</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">83%</div>
            <div className="text-sm text-gray-500">tingkat keterlibatan</div>
            <div className="mt-2 text-sm text-green-600">↑ 7% dari semester lalu</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Learning Satisfaction</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">4.3</div>
            <div className="text-sm text-gray-500">dari 5.0</div>
            <div className="mt-2 text-sm text-green-600">↑ 0.4 dari semester lalu</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Course Completion</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">94%</div>
            <div className="text-sm text-gray-500">tingkat penyelesaian</div>
            <div className="mt-2 text-sm text-green-600">↑ 2% dari semester lalu</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Average Grade</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">B+</div>
            <div className="text-sm text-gray-500">3.4 / 4.0</div>
            <div className="mt-2 text-sm text-green-600">↑ 0.2 dari semester lalu</div>
          </div>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Teaching Method Effectiveness</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <p className="font-medium text-green-800">Project-Based Learning</p>
                <p className="text-sm text-green-600">Digunakan dalam 15 mata kuliah</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-green-600">4.6</span>
                <p className="text-xs text-green-500">Sangat Efektif</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="font-medium text-blue-800">Case Study Method</p>
                <p className="text-sm text-blue-600">Digunakan dalam 12 mata kuliah</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-blue-600">4.2</span>
                <p className="text-xs text-blue-500">Efektif</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div>
                <p className="font-medium text-yellow-800">Traditional Lecture</p>
                <p className="text-sm text-yellow-600">Digunakan dalam 8 mata kuliah</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-yellow-600">3.8</span>
                <p className="text-xs text-yellow-500">Cukup Efektif</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Learning Technology Adoption</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Learning Management System</span>
              <div className="flex items-center">
                <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{width: '95%'}}></div>
                </div>
                <span className="text-sm text-green-600">95%</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Video Conferencing</span>
              <div className="flex items-center">
                <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{width: '89%'}}></div>
                </div>
                <span className="text-sm text-blue-600">89%</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Interactive Whiteboard</span>
              <div className="flex items-center">
                <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                  <div className="bg-yellow-600 h-2 rounded-full" style={{width: '67%'}}></div>
                </div>
                <span className="text-sm text-yellow-600">67%</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">VR/AR Tools</span>
              <div className="flex items-center">
                <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                  <div className="bg-red-600 h-2 rounded-full" style={{width: '23%'}}></div>
                </div>
                <span className="text-sm text-red-600">23%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Assessment Methods</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm">Written Exam</span>
              <span className="text-sm font-medium">45%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Project Portfolio</span>
              <span className="text-sm font-medium">30%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Presentation</span>
              <span className="text-sm font-medium">15%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Quiz/MCQ</span>
              <span className="text-sm font-medium">10%</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Learning Modalities</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm">Face-to-Face</span>
              <span className="text-sm font-medium">60%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Hybrid</span>
              <span className="text-sm font-medium">35%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Fully Online</span>
              <span className="text-sm font-medium">5%</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Student Support Services</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm">Tutoring</span>
              <span className="text-sm font-medium text-green-600">Available</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Academic Counseling</span>
              <span className="text-sm font-medium text-green-600">Active</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Learning Resources</span>
              <span className="text-sm font-medium text-green-600">Updated</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Peer Learning</span>
              <span className="text-sm font-medium text-yellow-600">Limited</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Learning Outcomes vs Expectations</h3>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Chart placeholder - Learning Outcomes Analysis</p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Course Performance Analysis</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Enrollment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Completion Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg Grade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Satisfaction
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Pemrograman Web</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">45</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">98%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">A-</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">4.8</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Excellent
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Basis Data</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">42</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">95%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">B+</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">4.2</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    Good
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}