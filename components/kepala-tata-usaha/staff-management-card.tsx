"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from "framer-motion"
import {
  Users,
  UserCheck,
  UserPlus,
  TrendingUp,
  Award,
  Clock,
  Mail,
  Phone,
  MapPin,
  MoreHorizontal
} from "lucide-react"

interface StaffMember {
  id: string
  name: string
  position: string
  department: string
  performance: number
  status: "active" | "leave" | "training" | "inactive"
  joinDate: string
  email: string
  phone?: string
  avatar?: string
  achievements: number
}

interface StaffManagementCardProps {
  title: string
  staffList?: StaffMember[]
}

const defaultStaffList: StaffMember[] = [
  {
    id: "1",
    name: "Dr. Siti Rahayu, M.Pd",
    position: "Kepala Sub Bagian Akademik",
    department: "Administrasi Akademik",
    performance: 95,
    status: "active",
    joinDate: "2018-03-15",
    email: "siti.rahayu@teknik.ac.id",
    phone: "+62 812-3456-7890",
    achievements: 12
  },
  {
    id: "2", 
    name: "Ahmad Wijaya, S.Kom",
    position: "Staff IT Support",
    department: "Teknologi Informasi",
    performance: 88,
    status: "active",
    joinDate: "2020-07-22",
    email: "ahmad.wijaya@teknik.ac.id",
    phone: "+62 813-4567-8901",
    achievements: 8
  },
  {
    id: "3",
    name: "Maria Susanti, S.E",
    position: "Kepala Sub Bagian Keuangan",
    department: "Keuangan",
    performance: 92,
    status: "training",
    joinDate: "2017-11-08",
    email: "maria.susanti@teknik.ac.id",
    phone: "+62 814-5678-9012",
    achievements: 15
  },
  {
    id: "4",
    name: "Budi Santoso, S.T",
    position: "Staff Sarana Prasarana", 
    department: "Sarana Prasarana",
    performance: 85,
    status: "active",
    joinDate: "2019-05-14",
    email: "budi.santoso@teknik.ac.id",
    achievements: 6
  },
  {
    id: "5",
    name: "Dewi Lestari, S.Pd",
    position: "Staff Layanan Mahasiswa",
    department: "Layanan Mahasiswa", 
    performance: 90,
    status: "leave",
    joinDate: "2021-01-20",
    email: "dewi.lestari@teknik.ac.id",
    phone: "+62 815-6789-0123",
    achievements: 4
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "active": return "bg-green-100 text-green-800 border-green-300"
    case "training": return "bg-blue-100 text-blue-800 border-blue-300"
    case "leave": return "bg-yellow-100 text-yellow-800 border-yellow-300"
    case "inactive": return "bg-gray-100 text-gray-800 border-gray-300"
    default: return "bg-gray-100 text-gray-800 border-gray-300"
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case "active": return "Aktif"
    case "training": return "Pelatihan"
    case "leave": return "Cuti"
    case "inactive": return "Non-Aktif"
    default: return "Unknown"
  }
}

const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
}

export default function StaffManagementCard({
  title,
  staffList = defaultStaffList
}: StaffManagementCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-gray-800">
                  {title}
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  Manajemen dan Monitoring Staf Fakultas
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <UserPlus className="w-4 h-4" />
              Tambah Staf
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Staff Statistics */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{staffList.length}</div>
              <div className="text-sm text-gray-600">Total Staf</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {staffList.filter(s => s.status === 'active').length}
              </div>
              <div className="text-sm text-gray-600">Aktif</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {Math.round(staffList.reduce((acc, s) => acc + s.performance, 0) / staffList.length)}%
              </div>
              <div className="text-sm text-gray-600">Rata-rata Kinerja</div>
            </div>
          </div>

          {/* Staff List */}
          <div className="space-y-4">
            {staffList.map((staff, index) => (
              <motion.div
                key={staff.id}
                className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-300 hover:border-indigo-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={staff.avatar} />
                      <AvatarFallback className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold">
                        {getInitials(staff.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{staff.name}</h4>
                      <p className="text-sm text-gray-600">{staff.position}</p>
                      <p className="text-xs text-gray-500">{staff.department}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="outline" 
                      className={`${getStatusColor(staff.status)} text-xs`}
                    >
                      {getStatusText(staff.status)}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Kinerja</span>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-green-500" />
                        <span className="font-medium text-gray-900">{staff.performance}%</span>
                      </div>
                    </div>
                    <Progress value={staff.performance} className="h-2" />
                  </div>
                  
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="w-3 h-3" />
                      <span>{staff.email}</span>
                    </div>
                    {staff.phone && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="w-3 h-3" />
                        <span>{staff.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-gray-600">
                      <Award className="w-3 h-3" />
                      <span>{staff.achievements} pencapaian</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                  <span className="text-xs text-gray-500">
                    Bergabung: {new Date(staff.joinDate).toLocaleDateString('id-ID')}
                  </span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="text-xs">
                      <UserCheck className="w-3 h-3 mr-1" />
                      Evaluasi
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      Jadwal
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <Button className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600">
              <UserPlus className="w-4 h-4 mr-2" />
              Rekrut Staf Baru
            </Button>
            <Button variant="outline" className="flex-1">
              <Users className="w-4 h-4 mr-2" />
              Laporan Kinerja
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}