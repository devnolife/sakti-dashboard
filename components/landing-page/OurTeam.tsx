'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Award, Users, Briefcase, GraduationCap, Mail, Phone } from "lucide-react"

interface TeamMember {
  name: string
  position: string
  fullPosition: string
  image: string
  email: string
  phone: string
  background: string
  specialties: string[]
  color: string
  icon: React.ReactNode
}

const OurTeam = () => {
  const leadership: TeamMember[] = [
    {
      name: "Prof. Dr. Ir. H. Amran Rahim, M.T.",
      position: "Dekan",
      fullPosition: "Dekan Fakultas Teknik",
      image: "/placeholder-user.jpg", // You'll need to add actual photos
      email: "dekan@ft.unismuh.ac.id",
      phone: "+62 411 866 972",
      background: "Teknik Sipil, Manajemen Konstruksi",
      specialties: ["Manajemen Konstruksi", "Teknik Sipil", "Penelitian Infrastruktur"],
      color: "from-blue-600 to-indigo-600",
      icon: <Award className="w-6 h-6" />
    }
  ]

  const viceRectors: TeamMember[] = [
    {
      name: "Dr. Ir. H. Muhammad Isran Ramli, M.T.",
      position: "Wakil Dekan I",
      fullPosition: "Wakil Dekan Bidang Akademik",
      image: "/placeholder-user.jpg",
      email: "wd1@ft.unismuh.ac.id",
      phone: "+62 411 866 973",
      background: "Teknik Mesin, Akademik",
      specialties: ["Kurikulum", "Pembelajaran", "Penelitian & PKM"],
      color: "from-emerald-500 to-teal-600",
      icon: <GraduationCap className="w-6 h-6" />
    },
    {
      name: "Dr. Ir. Hj. Andi Arwin Amiruddin, M.T.",
      position: "Wakil Dekan II",
      fullPosition: "Wakil Dekan Bidang Keuangan & Umum",
      image: "/placeholder-user.jpg",
      email: "wd2@ft.unismuh.ac.id",
      phone: "+62 411 866 974",
      background: "Teknik Sipil, Manajemen Keuangan",
      specialties: ["Keuangan", "Anggaran", "Sarana & Prasarana"],
      color: "from-purple-500 to-violet-600",
      icon: <Briefcase className="w-6 h-6" />
    },
    {
      name: "Dr. Ir. H. Syamsul Rijal, M.T.",
      position: "Wakil Dekan III",
      fullPosition: "Wakil Dekan Bidang Kemahasiswaan",
      image: "/placeholder-user.jpg",
      email: "wd3@ft.unismuh.ac.id",
      phone: "+62 411 866 975",
      background: "Teknik Elektro, Kemahasiswaan",
      specialties: ["Kemahasiswaan", "Alumni", "Prestasi Mahasiswa"],
      color: "from-orange-500 to-red-500",
      icon: <Users className="w-6 h-6" />
    },
    {
      name: "Dr. Ir. H. Abd. Rasyid Jalil, M.T.",
      position: "Wakil Dekan IV",
      fullPosition: "Wakil Dekan Bidang Kerjasama & Pengembangan",
      image: "/placeholder-user.jpg",
      email: "wd4@ft.unismuh.ac.id",
      phone: "+62 411 866 976",
      background: "Teknik Industri, Kerjasama",
      specialties: ["Kerjasama", "Pengembangan", "Inovasi"],
      color: "from-pink-500 to-rose-600",
      icon: <Award className="w-6 h-6" />
    }
  ]

  return (
    <section id='team' className='py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900 relative overflow-hidden'>
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
      </div>

      <div className='container mx-auto px-4 relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className='text-center mb-16'
        >
          <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 px-4 py-2">
            <Users className="w-4 h-4 mr-2" />
            Tim Kepemimpinan
          </Badge>
          
          <h2 className='text-4xl lg:text-5xl font-bold mb-6'>
            <span className='bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent'>
              Pimpinan Fakultas
            </span>
          </h2>
          
          <p className='text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto'>
            Dipimpin oleh para ahli berpengalaman yang berkomitmen untuk memajukan pendidikan teknik berkualitas tinggi
          </p>
        </motion.div>

        {/* Dean Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="flex justify-center">
            {leadership.map((member, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="max-w-2xl"
              >
                <Card className="overflow-hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 group">
                  <div className={`h-2 bg-gradient-to-r ${member.color}`}></div>
                  <CardContent className="p-8">
                    <div className="flex flex-col lg:flex-row items-center gap-8">
                      {/* Photo */}
                      <div className="relative">
                        <div className={`absolute -inset-1 bg-gradient-to-r ${member.color} rounded-full blur opacity-25 group-hover:opacity-40 transition-opacity duration-500`}></div>
                        <div className="relative w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden border-4 border-white shadow-xl">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      {/* Info */}
                      <div className="flex-1 text-center lg:text-left space-y-4">
                        <div>
                          <h3 className="text-2xl lg:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                            {member.name}
                          </h3>
                          <div className="flex items-center justify-center lg:justify-start gap-2 mb-3">
                            <div className={`p-2 rounded-full bg-gradient-to-r ${member.color} text-white`}>
                              {member.icon}
                            </div>
                            <span className="text-lg font-semibold text-slate-600 dark:text-slate-400">
                              {member.fullPosition}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <p className="text-slate-600 dark:text-slate-300">
                            <span className="font-medium">Keahlian:</span> {member.background}
                          </p>
                          
                          <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                            {member.specialties.map((specialty, idx) => (
                              <Badge key={idx} variant="secondary" className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                                {specialty}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2">
                            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                              <Mail className="w-4 h-4" />
                              {member.email}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                              <Phone className="w-4 h-4" />
                              {member.phone}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Vice Deans Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">
              Para Wakil Dekan
            </h3>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Tim kepemimpinan yang mengelola berbagai aspek operasional fakultas
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {viceRectors.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full overflow-hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 group">
                  <div className={`h-2 bg-gradient-to-r ${member.color}`}></div>
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                      {/* Photo */}
                      <div className="relative flex-shrink-0">
                        <div className={`absolute -inset-1 bg-gradient-to-r ${member.color} rounded-full blur opacity-25 group-hover:opacity-40 transition-opacity duration-500`}></div>
                        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-white shadow-lg">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      {/* Info */}
                      <div className="flex-1 text-center sm:text-left space-y-3">
                        <div>
                          <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-1">
                            {member.name}
                          </h4>
                          <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                            <div className={`p-1.5 rounded-full bg-gradient-to-r ${member.color} text-white`}>
                              {member.icon}
                            </div>
                            <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                              {member.fullPosition}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-sm text-slate-600 dark:text-slate-300">
                            <span className="font-medium">Bidang:</span> {member.background}
                          </p>
                          
                          <div className="flex flex-wrap gap-1 justify-center sm:justify-start">
                            {member.specialties.map((specialty, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {specialty}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex flex-col gap-1 pt-1">
                            <div className="flex items-center justify-center sm:justify-start gap-1 text-xs text-slate-600 dark:text-slate-400">
                              <Mail className="w-3 h-3" />
                              {member.email}
                            </div>
                            <div className="flex items-center justify-center sm:justify-start gap-1 text-xs text-slate-600 dark:text-slate-400">
                              <Phone className="w-3 h-3" />
                              {member.phone}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <Card className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 border-0 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6">Fakultas Teknik dalam Angka</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                  { label: "Tahun Berdiri", value: "1980", icon: "🏛️" },
                  { label: "Program Studi", value: "8", icon: "🎓" },
                  { label: "Total Mahasiswa", value: "2,847", icon: "👨‍🎓" },
                  { label: "Tenaga Pengajar", value: "156", icon: "👩‍🏫" }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl mb-2">{stat.icon}</div>
                    <div className="text-3xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm opacity-90">{stat.label}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

export default OurTeam