export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Pengaturan</h1>
        <p className="text-gray-600 mt-2">
          Konfigurasi sistem dan preferensi GKM
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold">Quality Monitoring Settings</h3>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monitoring Frequency
                </label>
                <select className="w-full border rounded-lg px-3 py-2">
                  <option>Daily</option>
                  <option selected>Weekly</option>
                  <option>Monthly</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">How often quality metrics are collected</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Automatic Report Generation
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" checked />
                    <span className="text-sm">Generate monthly quality reports</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" checked />
                    <span className="text-sm">Send quarterly summaries to stakeholders</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">Auto-publish reports to portal</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quality Threshold Settings
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600">Student Satisfaction (min)</label>
                    <input type="number" className="w-full border rounded px-3 py-1 text-sm" value="4.0" step="0.1" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600">Faculty Rating (min)</label>
                    <input type="number" className="w-full border rounded px-3 py-1 text-sm" value="4.0" step="0.1" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600">Service Quality (min)</label>
                    <input type="number" className="w-full border rounded px-3 py-1 text-sm" value="3.8" step="0.1" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600">Infrastructure Score (min)</label>
                    <input type="number" className="w-full border rounded px-3 py-1 text-sm" value="3.5" step="0.1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold">Survey Configuration</h3>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default Survey Period
                </label>
                <select className="w-full border rounded-lg px-3 py-2">
                  <option>1 week</option>
                  <option selected>2 weeks</option>
                  <option>1 month</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Response Rate Target
                </label>
                <div className="flex items-center space-x-2">
                  <input type="range" className="flex-1" min="50" max="100" value="85" />
                  <span className="text-sm font-medium">85%</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reminder Settings
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" checked />
                    <span className="text-sm">Send reminder after 3 days</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" checked />
                    <span className="text-sm">Send final reminder 1 day before deadline</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">Send thank you message after completion</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold">Report Settings</h3>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Report Template
                </label>
                <select className="w-full border rounded-lg px-3 py-2">
                  <option selected>Standard GKM Template</option>
                  <option>Executive Summary Format</option>
                  <option>Detailed Analysis Format</option>
                  <option>Custom Template</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data Visualization
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" checked />
                    <span className="text-sm">Include trend charts</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" checked />
                    <span className="text-sm">Include comparison tables</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">Include detailed metrics appendix</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Distribution List
                </label>
                <textarea 
                  className="w-full border rounded-lg px-3 py-2 text-sm" 
                  rows="3"
                  placeholder="Enter email addresses separated by commas"
                  defaultValue="dekan@university.ac.id, wakildekan1@university.ac.id, kaprodi@university.ac.id"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Notification Settings</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-sm mb-2">Email Notifications</h4>
                <div className="space-y-2">
                  <label className="flex items-center text-sm">
                    <input type="checkbox" className="mr-2" checked />
                    Daily summary reports
                  </label>
                  <label className="flex items-center text-sm">
                    <input type="checkbox" className="mr-2" checked />
                    Quality threshold alerts
                  </label>
                  <label className="flex items-center text-sm">
                    <input type="checkbox" className="mr-2" />
                    Survey completion updates
                  </label>
                  <label className="flex items-center text-sm">
                    <input type="checkbox" className="mr-2" />
                    System maintenance notices
                  </label>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-2">Dashboard Alerts</h4>
                <div className="space-y-2">
                  <label className="flex items-center text-sm">
                    <input type="checkbox" className="mr-2" checked />
                    Low satisfaction scores
                  </label>
                  <label className="flex items-center text-sm">
                    <input type="checkbox" className="mr-2" checked />
                    Overdue reports
                  </label>
                  <label className="flex items-center text-sm">
                    <input type="checkbox" className="mr-2" />
                    New survey responses
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Data Retention</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Survey Data
                </label>
                <select className="w-full border rounded-lg px-3 py-1 text-sm">
                  <option>6 months</option>
                  <option>1 year</option>
                  <option selected>2 years</option>
                  <option>3 years</option>
                  <option>Indefinitely</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Report Archives
                </label>
                <select className="w-full border rounded-lg px-3 py-1 text-sm">
                  <option>2 years</option>
                  <option>3 years</option>
                  <option selected>5 years</option>
                  <option>Indefinitely</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Analytics Data
                </label>
                <select className="w-full border rounded-lg px-3 py-1 text-sm">
                  <option>6 months</option>
                  <option selected>1 year</option>
                  <option>2 years</option>
                </select>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h3 className="text-lg font-semibold mb-4">System Information</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Version</span>
                <span className="font-medium">GKM Dashboard v2.1.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last Updated</span>
                <span className="font-medium">August 15, 2025</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Database Size</span>
                <span className="font-medium">2.4 GB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Active Surveys</span>
                <span className="font-medium">8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Reports</span>
                <span className="font-medium">127</span>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full text-left p-2 text-sm hover:bg-blue-50 rounded">
                🔄 Refresh Data Sources
              </button>
              <button className="w-full text-left p-2 text-sm hover:bg-green-50 rounded">
                📊 Export All Settings
              </button>
              <button className="w-full text-left p-2 text-sm hover:bg-yellow-50 rounded">
                🔧 Reset to Defaults
              </button>
              <button className="w-full text-left p-2 text-sm hover:bg-purple-50 rounded">
                📋 Generate Settings Report
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end space-x-4">
        <button className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50">
          Reset
        </button>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          Save Settings
        </button>
      </div>
    </div>
  )
}