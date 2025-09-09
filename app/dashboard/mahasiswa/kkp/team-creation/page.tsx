'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import { useState } from "react"
import {
  Users,
  Plus,
  Search,
  UserPlus,
  Crown,
  Mail,
  Phone,
  GraduationCap,
  MapPin,
  Calendar,
  CheckCircle,
  AlertCircle,
  Trash2,
  Edit,
  Send,
  UserCheck,
  Clock,
  Star
} from "lucide-react"
import { useI18n } from '@/lib/i18n'

interface TeamMember {
  id: string
  nim: string
  name: string
  email: string
  phone: string
  gpa: number
  semester: number
  role: 'leader' | 'member'
  status: 'confirmed' | 'pending' | 'declined'
  skills: string[]
}

interface Team {
  id: string
  name: string
  description: string
  targetLocation: string
  maxMembers: number
  currentMembers: TeamMember[]
  createdAt: Date
  status: 'draft' | 'recruiting' | 'full' | 'finalized'
}

const mockCurrentUser: TeamMember = {
  id: "1",
  nim: "2021210001",
  name: "Ahmad Rahman",
  email: "ahmad.rahman@student.unismuh.ac.id",
  phone: "+62 812-3456-7890",
  gpa: 3.67,
  semester: 7,
  role: 'leader',
  status: 'confirmed',
  skills: ["Web Development", "Database Design", "Project Management"]
}

const mockAvailableStudents = [
  {
    id: "2",
    nim: "2021210002", 
    name: "Siti Nurhaliza",
    email: "siti.nurhaliza@student.unismuh.ac.id",
    gpa: 3.45,
    semester: 7,
    skills: ["UI/UX Design", "Frontend Development", "Adobe Creative Suite"]
  },
  {
    id: "3",
    nim: "2021210003",
    name: "Budi Santoso", 
    email: "budi.santoso@student.unismuh.ac.id",
    gpa: 3.78,
    semester: 7,
    skills: ["Backend Development", "API Development", "System Architecture"]
  },
  {
    id: "4",
    nim: "2021210004",
    name: "Maya Putri",
    email: "maya.putri@student.unismuh.ac.id", 
    gpa: 3.52,
    semester: 8,
    skills: ["Data Analysis", "Machine Learning", "Python"]
  }
]

export default function TeamCreationPage() {
  const { t } = useI18n()
  const [searchTerm, setSearchTerm] = useState("")
  const [team, setTeam] = useState<Team>({
    id: "team-001",
    name: "",
    description: "",
    targetLocation: "",
    maxMembers: 4,
    currentMembers: [mockCurrentUser],
    createdAt: new Date(),
    status: 'draft'
  })
  
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])
  const [invitationMessage, setInvitationMessage] = useState("")

  const filteredStudents = mockAvailableStudents.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.nim.includes(searchTerm) ||
    student.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const handleInviteStudents = () => {
    // Logic to send invitations to selected students
    console.log("Inviting students:", selectedStudents)
    setSelectedStudents([])
  }

  const getGpaColor = (gpa: number) => {
    if (gpa >= 3.5) return "text-green-600"
    if (gpa >= 3.0) return "text-yellow-600" 
    return "text-red-600"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 space-y-8">
      {/* Header */}
      <motion.div
        className="text-center space-y-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          {t('kkp.team_creation')}
        </h1>
        <p className="text-gray-600 text-lg">
          Bentuk tim KKP yang solid untuk mencapai tujuan bersama
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Team Setup Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Team Information */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-gray-800">
                    Informasi Tim
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    Atur detail tim KKP Anda
                  </p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="team-name">Nama Tim</Label>
                  <Input 
                    id="team-name" 
                    placeholder="Masukkan nama tim..."
                    value={team.name}
                    onChange={(e) => setTeam({...team, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-members">Maksimal Anggota</Label>
                  <select 
                    id="max-members"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={team.maxMembers}
                    onChange={(e) => setTeam({...team, maxMembers: Number(e.target.value)})}
                  >
                    <option value={2}>2 Orang</option>
                    <option value={3}>3 Orang</option>
                    <option value={4}>4 Orang</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="target-location">Lokasi Target KKP</Label>
                <Input 
                  id="target-location" 
                  placeholder="Perusahaan/instansi yang dituju..."
                  value={team.targetLocation}
                  onChange={(e) => setTeam({...team, targetLocation: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="team-description">Deskripsi Tim</Label>
                <Textarea 
                  id="team-description"
                  placeholder="Jelaskan tujuan tim, keahlian yang dicari, dan visi KKP..."
                  rows={4}
                  value={team.description}
                  onChange={(e) => setTeam({...team, description: e.target.value})}
                />
              </div>
            </CardContent>
          </Card>

          {/* Current Team Members */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500">
                    <UserCheck className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold text-gray-800">
                      Anggota Tim Saat Ini
                    </CardTitle>
                    <p className="text-sm text-gray-600 mt-1">
                      {team.currentMembers.length} dari {team.maxMembers} anggota
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">
                    {Math.round((team.currentMembers.length / team.maxMembers) * 100)}%
                  </div>
                  <p className="text-xs text-gray-600">Terisi</p>
                </div>
              </div>
              <Progress value={(team.currentMembers.length / team.maxMembers) * 100} className="mt-4" />
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                {team.currentMembers.map((member, index) => (
                  <motion.div
                    key={member.id}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {member.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-800">{member.name}</h3>
                            {member.role === 'leader' && (
                              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                                <Crown className="w-3 h-3 mr-1" />
                                Ketua
                              </Badge>
                            )}
                            <Badge 
                              className={`${member.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                                         member.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                                         'bg-red-100 text-red-800'}`}
                            >
                              {member.status === 'confirmed' ? <CheckCircle className="w-3 h-3 mr-1" /> :
                               member.status === 'pending' ? <Clock className="w-3 h-3 mr-1" /> :
                               <AlertCircle className="w-3 h-3 mr-1" />}
                              {member.status === 'confirmed' ? 'Terkonfirmasi' :
                               member.status === 'pending' ? 'Menunggu' : 'Ditolak'}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3 text-sm text-gray-600">
                            <p>NIM: {member.nim}</p>
                            <p>Semester: {member.semester}</p>
                            <p className={`font-medium ${getGpaColor(member.gpa)}`}>
                              IPK: {member.gpa}
                            </p>
                            <p>{member.email}</p>
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {member.skills.map((skill, skillIndex) => (
                              <Badge key={skillIndex} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {member.role !== 'leader' && (
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Student Search and Invitation */}
          {team.currentMembers.length < team.maxMembers && (
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500">
                    <Search className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold text-gray-800">
                      Cari & Undang Anggota
                    </CardTitle>
                    <p className="text-sm text-gray-600 mt-1">
                      Temukan mahasiswa yang cocok untuk tim Anda
                    </p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Cari berdasarkan nama, NIM, atau keahlian..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {selectedStudents.length > 0 && (
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-blue-800">
                        {selectedStudents.length} mahasiswa dipilih
                      </h4>
                      <Button 
                        size="sm" 
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={handleInviteStudents}
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Kirim Undangan
                      </Button>
                    </div>
                    <Textarea 
                      placeholder="Tulis pesan undangan (opsional)..."
                      value={invitationMessage}
                      onChange={(e) => setInvitationMessage(e.target.value)}
                      rows={2}
                    />
                  </div>
                )}

                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {filteredStudents.map((student, index) => (
                    <motion.div
                      key={student.id}
                      className={`p-4 border rounded-lg transition-all duration-300 cursor-pointer ${
                        selectedStudents.includes(student.id) 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:shadow-md'
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => {
                        setSelectedStudents(prev => 
                          prev.includes(student.id) 
                            ? prev.filter(id => id !== student.id)
                            : [...prev, student.id]
                        )
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {student.name.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800">{student.name}</h4>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span>NIM: {student.nim}</span>
                              <span className={getGpaColor(student.gpa)}>
                                IPK: {student.gpa}
                              </span>
                              <span>Sem: {student.semester}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex flex-wrap gap-1 justify-end mb-2">
                            {student.skills.slice(0, 2).map((skill, skillIndex) => (
                              <Badge key={skillIndex} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {student.skills.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{student.skills.length - 2}
                              </Badge>
                            )}
                          </div>
                          {selectedStudents.includes(student.id) ? (
                            <CheckCircle className="w-5 h-5 text-blue-600" />
                          ) : (
                            <UserPlus className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {/* Team Statistics */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                Statistik Tim
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Anggota Saat Ini</span>
                  <span className="font-bold text-2xl text-blue-600">
                    {team.currentMembers.length}/{team.maxMembers}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Rata-rata IPK</span>
                  <span className="font-bold text-lg text-green-600">
                    {(team.currentMembers.reduce((acc, member) => acc + member.gpa, 0) / team.currentMembers.length).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status Tim</span>
                  <Badge className={`${
                    team.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                    team.status === 'recruiting' ? 'bg-yellow-100 text-yellow-800' :
                    team.status === 'full' ? 'bg-green-100 text-green-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {team.status === 'draft' ? 'Draft' :
                     team.status === 'recruiting' ? 'Merekrut' :
                     team.status === 'full' ? 'Penuh' : 'Final'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team Formation Guidelines */}
          <Card className="border-0 shadow-xl bg-gradient-to-r from-green-50 to-emerald-50">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Panduan Pembentukan Tim
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span>Tim optimal terdiri dari 3-4 anggota dengan keahlian yang saling melengkapi</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span>Pastikan semua anggota memiliki IPK minimal 3.0</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span>Pilih anggota dari semester yang sama atau berdekatan</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span>Komunikasi yang baik adalah kunci kesuksesan tim</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
              disabled={!team.name || team.currentMembers.length < 2}
            >
              <Send className="w-4 h-4 mr-2" />
              Finalisasi Tim
            </Button>
            <Button variant="outline" className="w-full">
              <Edit className="w-4 h-4 mr-2" />
              Simpan sebagai Draft
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}