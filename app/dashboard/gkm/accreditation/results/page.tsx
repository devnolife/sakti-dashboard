export default function AssessmentResultsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Hasil Penilaian</h1>
        <p className="text-gray-600 mt-2">
          Hasil penilaian akreditasi dan rekomendasi perbaikan
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Overall Score</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">362</div>
            <div className="text-sm text-gray-500">dari 400 poin</div>
            <div className="mt-2 text-sm text-green-600">Grade A</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Programs Assessed</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">3</div>
            <div className="text-sm text-gray-500">program studi</div>
            <div className="mt-2 text-sm text-blue-600">All passed</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Strong Areas</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">12</div>
            <div className="text-sm text-gray-500">aspek unggul</div>
            <div className="mt-2 text-sm text-purple-600">Above standard</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Improvement Areas</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">5</div>
            <div className="text-sm text-gray-500">rekomendasi</div>
            <div className="mt-2 text-sm text-orange-600">For enhancement</div>
          </div>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Assessment Results by Criteria</h3>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-gray-900">Visi, Misi, Tujuan, dan Strategi</h4>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded">A</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Score: 36/40</span>
                <span>90%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{width: '90%'}}></div>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-gray-900">Tata Pamong, Tata Kelola, dan Kerja Sama</h4>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded">A</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Score: 34/40</span>
                <span>85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{width: '85%'}}></div>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-gray-900">Mahasiswa</h4>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">B</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Score: 32/40</span>
                <span>80%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{width: '80%'}}></div>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-gray-900">Sumber Daya Manusia</h4>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded">A</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Score: 38/40</span>
                <span>95%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{width: '95%'}}></div>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-gray-900">Keuangan, Sarana, dan Prasarana</h4>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-sm rounded">B</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Score: 30/40</span>
                <span>75%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-600 h-2 rounded-full" style={{width: '75%'}}></div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Program Study Results</h3>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-green-900">Teknik Informatika</h4>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded">A</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-green-700">Total Score:</span>
                  <p className="font-medium">368/400</p>
                </div>
                <div>
                  <span className="text-green-700">Validity:</span>
                  <p className="font-medium">5 years</p>
                </div>
              </div>
              <div className="mt-2">
                <span className="text-green-700 text-sm">Strengths:</span>
                <p className="text-sm text-green-600">Excellent faculty qualifications, strong industry partnerships</p>
              </div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-blue-900">Sistem Informasi</h4>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">B</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-blue-700">Total Score:</span>
                  <p className="font-medium">348/400</p>
                </div>
                <div>
                  <span className="text-blue-700">Validity:</span>
                  <p className="font-medium">5 years</p>
                </div>
              </div>
              <div className="mt-2">
                <span className="text-blue-700 text-sm">Areas for improvement:</span>
                <p className="text-sm text-blue-600">Research output, international collaboration</p>
              </div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-green-900">Data Science</h4>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded">A</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-green-700">Total Score:</span>
                  <p className="font-medium">375/400</p>
                </div>
                <div>
                  <span className="text-green-700">Validity:</span>
                  <p className="font-medium">5 years</p>
                </div>
              </div>
              <div className="mt-2">
                <span className="text-green-700 text-sm">Strengths:</span>
                <p className="text-sm text-green-600">Innovative curriculum, state-of-the-art facilities</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Assessor Recommendations</h3>
        <div className="space-y-4">
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium text-yellow-900">Infrastructure Enhancement</h4>
                <p className="text-yellow-700 text-sm mt-1">
                  Upgrade laboratory equipment and increase capacity to support growing student enrollment. 
                  Consider adding specialized labs for emerging technologies.
                </p>
                <div className="flex space-x-2 mt-2">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">Priority: High</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Timeline: 6-12 months</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium text-blue-900">Research Collaboration</h4>
                <p className="text-blue-700 text-sm mt-1">
                  Increase international research collaborations and publication in high-impact journals. 
                  Establish research centers in key technology areas.
                </p>
                <div className="flex space-x-2 mt-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Priority: Medium</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Timeline: 12-24 months</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium text-green-900">Industry Partnership</h4>
                <p className="text-green-700 text-sm mt-1">
                  Maintain and expand current industry partnerships. The collaboration with leading tech companies 
                  provides excellent practical learning opportunities.
                </p>
                <div className="flex space-x-2 mt-2">
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Status: Strength</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Action: Continue</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium text-purple-900">Student Services</h4>
                <p className="text-purple-700 text-sm mt-1">
                  Enhance student support services including career counseling, mental health support, 
                  and academic guidance programs.
                </p>
                <div className="flex space-x-2 mt-2">
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">Priority: Medium</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Timeline: 3-6 months</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium text-orange-900">Digital Transformation</h4>
                <p className="text-orange-700 text-sm mt-1">
                  Accelerate digital transformation initiatives in teaching, learning, and administrative processes. 
                  Implement comprehensive learning management system.
                </p>
                <div className="flex space-x-2 mt-2">
                  <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded">Priority: High</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Timeline: 6-18 months</span>
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
            <p className="text-gray-500">Chart placeholder - Assessment Scores Over Time</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Action Plan Status</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Infrastructure Enhancement</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-600 h-2 rounded-full" style={{width: '30%'}}></div>
                </div>
                <span className="text-xs text-gray-600">30%</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm">Research Collaboration</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{width: '15%'}}></div>
                </div>
                <span className="text-xs text-gray-600">15%</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm">Student Services</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{width: '65%'}}></div>
                </div>
                <span className="text-xs text-gray-600">65%</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm">Digital Transformation</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-600 h-2 rounded-full" style={{width: '45%'}}></div>
                </div>
                <span className="text-xs text-gray-600">45%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}