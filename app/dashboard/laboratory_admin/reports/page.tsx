import type { Metadata } from "next"
import { StudentParticipation } from "@/components/laboratory/admin/reports/student-participation"
import { BarChart3, Users, TrendingUp, FileText } from "lucide-react"

export const metadata: Metadata = {
  title: "Laboratory Reports | Admin Dashboard",
  description: "Comprehensive laboratory reports and analytics",
}

export default function LabReportsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto py-8 space-y-8">
        {/* Modern Header Section */}
        <div className="relative overflow-hidden bg-white rounded-2xl shadow-xl border-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 opacity-90"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

          <div className="relative px-8 py-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white tracking-tight">
                  Laboratory Reports
                </h1>
                <p className="text-blue-100 text-lg mt-2">
                  Comprehensive analytics and insights for laboratory activities
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-white" />
                  <div>
                    <p className="text-white/80 text-sm">Total Students</p>
                    <p className="text-2xl font-bold text-white">540</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-6 w-6 text-white" />
                  <div>
                    <p className="text-white/80 text-sm">Avg Performance</p>
                    <p className="text-2xl font-bold text-white">87.5%</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-white" />
                  <div>
                    <p className="text-white/80 text-sm">Active Labs</p>
                    <p className="text-2xl font-bold text-white">5</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg border-0 overflow-hidden">
          <div className="p-8">
            <StudentParticipation />
          </div>
        </div>
      </div>
    </div>
  )
}

