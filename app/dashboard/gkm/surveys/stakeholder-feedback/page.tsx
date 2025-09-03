export default function StakeholderFeedbackPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Feedback Stakeholder</h1>
          <p className="text-gray-600 mt-2">
            Feedback dan evaluasi dari stakeholder eksternal dan internal
          </p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          + Kirim Survey Baru
        </button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Active Surveys</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">6</div>
            <div className="text-sm text-gray-500">survei aktif</div>
            <div className="mt-2 text-sm text-blue-600">2 industry, 4 internal</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Response Rate</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">78%</div>
            <div className="text-sm text-gray-500">tingkat respons</div>
            <div className="mt-2 text-sm text-green-600">↑ 8% dari periode lalu</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Avg Satisfaction</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">4.1</div>
            <div className="text-sm text-gray-500">dari 5.0</div>
            <div className="mt-2 text-sm text-green-600">↑ 0.2 dari periode lalu</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Total Stakeholders</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">142</div>
            <div className="text-sm text-gray-500">stakeholder terdaftar</div>
            <div className="mt-2 text-sm text-orange-600">Industry & Government</div>
          </div>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Stakeholder Categories</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="font-medium text-blue-800">Industry Partners</p>
                <p className="text-sm text-blue-600">42 companies participated</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-blue-600">4.3</span>
                <p className="text-xs text-blue-500">Avg Rating</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <p className="font-medium text-green-800">Alumni Employers</p>
                <p className="text-sm text-green-600">28 organizations</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-green-600">4.2</span>
                <p className="text-xs text-green-500">Avg Rating</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div>
                <p className="font-medium text-purple-800">Government Agencies</p>
                <p className="text-sm text-purple-600">15 agencies</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-purple-600">4.0</span>
                <p className="text-xs text-purple-500">Avg Rating</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div>
                <p className="font-medium text-yellow-800">Academic Partners</p>
                <p className="text-sm text-yellow-600">12 institutions</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-yellow-600">4.1</span>
                <p className="text-xs text-yellow-500">Avg Rating</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div>
                <p className="font-medium text-red-800">Professional Bodies</p>
                <p className="text-sm text-red-600">8 associations</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-red-600">3.9</span>
                <p className="text-xs text-red-500">Avg Rating</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Recent Feedback Sessions</h3>
          <div className="space-y-4">
            <div className="p-3 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-gray-900">Industry Advisory Board Meeting</h4>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Completed</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Date:</span>
                  <p className="font-medium">15 Aug 2025</p>
                </div>
                <div>
                  <span className="text-gray-500">Participants:</span>
                  <p className="font-medium">24 industry leaders</p>
                </div>
              </div>
              <div className="mt-2">
                <span className="text-gray-500 text-sm">Key Topics:</span>
                <p className="text-sm text-gray-700">Curriculum relevance, skill requirements</p>
              </div>
            </div>
            
            <div className="p-3 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-gray-900">Alumni Employer Survey 2025</h4>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Active</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Response Rate:</span>
                  <p className="font-medium">65%</p>
                </div>
                <div>
                  <span className="text-gray-500">Deadline:</span>
                  <p className="font-medium">30 Sep 2025</p>
                </div>
              </div>
              <div className="mt-2">
                <span className="text-gray-500 text-sm">Focus:</span>
                <p className="text-sm text-gray-700">Graduate competency assessment</p>
              </div>
            </div>
            
            <div className="p-3 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-gray-900">Partnership Evaluation Workshop</h4>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">Planned</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Date:</span>
                  <p className="font-medium">10 Oct 2025</p>
                </div>
                <div>
                  <span className="text-gray-500">Expected:</span>
                  <p className="font-medium">35 partners</p>
                </div>
              </div>
              <div className="mt-2">
                <span className="text-gray-500 text-sm">Agenda:</span>
                <p className="text-sm text-gray-700">Collaboration effectiveness review</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Key Stakeholder Feedback</h3>
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <h4 className="font-medium text-green-800 mb-3">Positive Feedback</h4>
            <div className="space-y-3">
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-sm text-green-800 font-medium">"Graduate technical skills are excellent"</p>
                  <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">Industry</span>
                </div>
                <p className="text-xs text-green-600">PT. Tech Innovators - "Alumni show strong programming and problem-solving capabilities"</p>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-sm text-green-800 font-medium">"Curriculum alignment with industry needs"</p>
                  <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">Employer</span>
                </div>
                <p className="text-xs text-green-600">Bank Mandiri - "Graduates are well-prepared for digital transformation roles"</p>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-sm text-green-800 font-medium">"Strong research collaboration potential"</p>
                  <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">Academic</span>
                </div>
                <p className="text-xs text-green-600">Universitas Indonesia - "Joint research projects show promising results"</p>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-orange-800 mb-3">Suggestions for Improvement</h4>
            <div className="space-y-3">
              <div className="p-4 bg-orange-50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-sm text-orange-800 font-medium">"Enhance soft skills training"</p>
                  <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded">Industry</span>
                </div>
                <p className="text-xs text-orange-600">Gojek - "Communication and leadership skills need more development"</p>
              </div>
              
              <div className="p-4 bg-orange-50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-sm text-orange-800 font-medium">"Include more cloud computing courses"</p>
                  <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded">Government</span>
                </div>
                <p className="text-xs text-orange-600">Kementerian Kominfo - "Cloud skills are increasingly important for digital government"</p>
              </div>
              
              <div className="p-4 bg-orange-50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-sm text-orange-800 font-medium">"Increase international exposure"</p>
                  <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded">Professional</span>
                </div>
                <p className="text-xs text-orange-600">IEEE Indonesia - "More participation in international conferences and competitions"</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Stakeholder Satisfaction Trends</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Chart placeholder - Stakeholder Satisfaction Over Time</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Feedback Response Analysis</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Graduate Competency</span>
                <span>4.4/5.0</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{width: '88%'}}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Curriculum Relevance</span>
                <span>4.2/5.0</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{width: '84%'}}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Industry Collaboration</span>
                <span>4.0/5.0</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{width: '80%'}}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Research Quality</span>
                <span>3.8/5.0</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-600 h-2 rounded-full" style={{width: '76%'}}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Innovation & Technology</span>
                <span>3.9/5.0</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-orange-600 h-2 rounded-full" style={{width: '78%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}