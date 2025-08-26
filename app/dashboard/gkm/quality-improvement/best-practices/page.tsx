export default function BestPracticesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Best Practices</h1>
          <p className="text-gray-600 mt-2">
            Kumpulan praktik terbaik dalam perbaikan kualitas
          </p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          + Tambah Best Practice
        </button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Total Practices</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-700">18</div>
            <div className="text-sm text-gray-500">praktik terdokumentasi</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Implemented</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">12</div>
            <div className="text-sm text-gray-500">telah diimplementasi</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Success Rate</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">85%</div>
            <div className="text-sm text-gray-500">tingkat keberhasilan</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Categories</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">6</div>
            <div className="text-sm text-gray-500">kategori praktik</div>
          </div>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold">Featured Best Practices</h3>
            </div>
            
            <div className="divide-y">
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-2">Digital Learning Integration</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Implementasi platform pembelajaran digital yang meningkatkan engagement mahasiswa sebesar 40% dan efisiensi pembelajaran sebesar 35%.
                    </p>
                    <div className="flex space-x-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Academic</span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">High Impact</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm mt-4">
                  <div>
                    <span className="text-gray-500">Implementation:</span>
                    <p className="font-medium">6 months</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Budget:</span>
                    <p className="font-medium">Rp 500M</p>
                  </div>
                  <div>
                    <span className="text-gray-500">ROI:</span>
                    <p className="font-medium text-green-600">200%</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h5 className="font-medium text-sm mb-2">Key Success Factors:</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Faculty training and support program</li>
                    <li>• Gradual rollout approach</li>
                    <li>• Student feedback integration</li>
                    <li>• Technical support team establishment</li>
                  </ul>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-2">Predictive Maintenance System</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Sistem maintenance prediktif untuk fasilitas kampus yang mengurangi downtime sebesar 60% dan biaya maintenance sebesar 30%.
                    </p>
                    <div className="flex space-x-2">
                      <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded">Infrastructure</span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">High Impact</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm mt-4">
                  <div>
                    <span className="text-gray-500">Implementation:</span>
                    <p className="font-medium">4 months</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Budget:</span>
                    <p className="font-medium">Rp 300M</p>
                  </div>
                  <div>
                    <span className="text-gray-500">ROI:</span>
                    <p className="font-medium text-green-600">150%</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h5 className="font-medium text-sm mb-2">Key Success Factors:</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• IoT sensors implementation</li>
                    <li>• Data analytics platform</li>
                    <li>• Staff training program</li>
                    <li>• Regular system updates</li>
                  </ul>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-2">Student-Centered Service Design</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Redesain layanan akademik dengan pendekatan student-centered yang meningkatkan kepuasan mahasiswa dari 75% menjadi 92%.
                    </p>
                    <div className="flex space-x-2">
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">Service</span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">High Impact</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm mt-4">
                  <div>
                    <span className="text-gray-500">Implementation:</span>
                    <p className="font-medium">8 months</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Budget:</span>
                    <p className="font-medium">Rp 200M</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Satisfaction:</span>
                    <p className="font-medium text-green-600">92%</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h5 className="font-medium text-sm mb-2">Key Success Factors:</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Comprehensive user research</li>
                    <li>• Service journey mapping</li>
                    <li>• Staff empowerment training</li>
                    <li>• Continuous feedback loop</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Practice Categories</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Academic Innovation</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">6 practices</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Infrastructure</span>
                <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded">4 practices</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Service Excellence</span>
                <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">3 practices</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Technology</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">3 practices</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Faculty Development</span>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">2 practices</span>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Implementation Status</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Successfully Implemented</span>
                  <span>67%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{width: '67%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>In Progress</span>
                  <span>22%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{width: '22%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Under Review</span>
                  <span>11%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-600 h-2 rounded-full" style={{width: '11%'}}></div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Impact Metrics</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Cost Reduction</span>
                <span className="text-sm font-medium text-green-600">₹2.5Cr/year</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Efficiency Gain</span>
                <span className="text-sm font-medium text-blue-600">35%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Quality Improvement</span>
                <span className="text-sm font-medium text-purple-600">25%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Stakeholder Satisfaction</span>
                <span className="text-sm font-medium text-green-600">+17%</span>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Recent Awards</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm">Best Digital Innovation 2025</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm">Service Excellence Award</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Sustainability Initiative</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}