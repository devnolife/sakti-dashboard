export default function CurriculumEvaluationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Evaluasi Kurikulum</h1>
        <p className="text-gray-600 mt-2">
          Evaluasi relevansi dan efektivitas kurikulum program studi
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Tingkat Relevansi</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">85%</div>
            <div className="text-sm text-gray-500">sesuai kebutuhan industri</div>
            <div className="mt-2 text-sm text-green-600">↑ 5% dari tahun lalu</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Graduate Employability</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">92%</div>
            <div className="text-sm text-gray-500">bekerja dalam 6 bulan</div>
            <div className="mt-2 text-sm text-green-600">↑ 3% dari tahun lalu</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Industry Feedback</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">4.1</div>
            <div className="text-sm text-gray-500">dari 5.0</div>
            <div className="mt-2 text-sm text-green-600">↑ 0.2 dari tahun lalu</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Curriculum Updates</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">8</div>
            <div className="text-sm text-gray-500">mata kuliah diperbarui</div>
            <div className="mt-2 text-sm text-blue-600">tahun akademik ini</div>
          </div>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Program Study Performance</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <p className="font-medium text-green-800">Teknik Informatika</p>
                <p className="text-sm text-green-600">87 mata kuliah</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-green-600">A</span>
                <p className="text-xs text-green-500">Excellent</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="font-medium text-blue-800">Sistem Informasi</p>
                <p className="text-sm text-blue-600">82 mata kuliah</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-blue-600">A-</span>
                <p className="text-xs text-blue-500">Very Good</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div>
                <p className="font-medium text-yellow-800">Data Science</p>
                <p className="text-sm text-yellow-600">75 mata kuliah</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-yellow-600">B+</span>
                <p className="text-xs text-yellow-500">Good</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Skills Gap Analysis</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Cloud Computing</span>
              <div className="flex items-center">
                <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                  <div className="bg-red-600 h-2 rounded-full" style={{width: '65%'}}></div>
                </div>
                <span className="text-sm text-red-600">Gap: 35%</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">AI/Machine Learning</span>
              <div className="flex items-center">
                <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                  <div className="bg-yellow-600 h-2 rounded-full" style={{width: '75%'}}></div>
                </div>
                <span className="text-sm text-yellow-600">Gap: 25%</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Mobile Development</span>
              <div className="flex items-center">
                <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{width: '90%'}}></div>
                </div>
                <span className="text-sm text-green-600">Gap: 10%</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">DevOps</span>
              <div className="flex items-center">
                <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                  <div className="bg-red-600 h-2 rounded-full" style={{width: '55%'}}></div>
                </div>
                <span className="text-sm text-red-600">Gap: 45%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Recent Curriculum Changes</h3>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium text-blue-800">Cloud Computing Fundamentals</p>
              <p className="text-xs text-blue-600">Added - Semester Genap 2025</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-sm font-medium text-green-800">DevOps Practice</p>
              <p className="text-xs text-green-600">Updated - Semester Genap 2025</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <p className="text-sm font-medium text-purple-800">AI Ethics</p>
              <p className="text-xs text-purple-600">Added - Semester Ganjil 2025</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Industry Partnerships</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span className="text-sm">Google Cloud Partner</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              <span className="text-sm">Microsoft Learn Partner</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
              <span className="text-sm">Oracle Academy</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
              <span className="text-sm">AWS Educate</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Learning Outcomes Achievement</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm">Critical Thinking</span>
              <span className="text-sm font-medium text-green-600">89%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Problem Solving</span>
              <span className="text-sm font-medium text-green-600">92%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Technical Skills</span>
              <span className="text-sm font-medium text-blue-600">85%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Communication</span>
              <span className="text-sm font-medium text-yellow-600">78%</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Curriculum Effectiveness Over Time</h3>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Chart placeholder - Curriculum Performance Metrics</p>
        </div>
      </div>
    </div>
  )
}