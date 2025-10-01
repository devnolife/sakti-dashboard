'use client'

import { Badge } from '@/components/ui/badge'
import { GraduationCap, Users, BookOpen, Award } from 'lucide-react'

const WakilDekanSection = () => {
  const wakilDekan = [
    {
      id: 1,
      name: "Dr. Alamsyah, S.Pd.I., M.H.",
      jabatan: "Wakil Dekan IV",
      fungsi: "Menjalin kemitraan industri, pengelolaan alumni, dan pengembangan karir",
      photo: "/dekan/Wakil Dekan 4 Dr. Alamsyah, S.Pd.I., M.H..png",
      icon: Award,
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      id: 2,
      name: "Dr. Ir. Andi Makbul Syamsuri, ST., MT., IPM.",
      jabatan: "Wakil Dekan II",
      fungsi: "Mengelola kegiatan kemahasiswaan, organisasi, dan pengembangan soft skill",
      photo: "/dekan/Wakil Dekan 2 Dr. Ir. Andi Makbul Syamsuri, ST., MT., IPM..png",
      icon: Users,
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      id: 3,
      name: "Ir. Muhammad Syafaat S Kuba, ST., MT.",
      jabatan: "Dekan",
      fungsi: "Memimpin fakultas dan mengawasi seluruh kegiatan akademik dan non-akademik",
      photo: "/dekan/Dekan  Ir. Muhammad Syafaat S Kuba, ST., MT..png",
      icon: GraduationCap,
      gradient: "from-orange-500 to-red-500",
      isDekan: true
    },
    {
      id: 4,
      name: "Dr. Ir. Ar. Hj. Irnawaty Idrus, ST., MT., IPM., IAI.",
      jabatan: "Wakil Dekan I",
      fungsi: "Mengawasi kurikulum, penelitian, dan pengembangan akademik fakultas",
      photo: "/dekan/Wakil Dekan 1 Dr. Ir. Ar. Hj. Irnawaty Idrus, ST., MT., IPM., IAI..png",
      icon: BookOpen,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      id: 5,
      name: "Soemitro Emin Praja, ST., M.Si.",
      jabatan: "Wakil Dekan III",
      fungsi: "Koordinasi penelitian, publikasi ilmiah, dan pengabdian masyarakat",
      photo: "/dekan/Wakil Dekan 3 Soemitro Emin Praja, ST., M.Si..png",
      icon: Award,
      gradient: "from-green-500 to-emerald-500"
    }
  ]

  return (
    <section id="features" className="py-16 bg-gradient-to-b from-white via-purple-50/30 to-cyan-50/30 relative overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-500/15 via-cyan-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tr from-cyan-500/15 via-purple-500/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Modern Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-6 py-2.5 rounded-full text-sm font-bold mb-5 shadow-xl">
            <GraduationCap className="w-4 h-4" />
            <span>Tim Kepemimpinan</span>
          </div>

          <h2 className="mb-4 text-3xl font-black text-gray-900 md:text-4xl">
            Para <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-cyan-600 to-purple-600">Wakil Dekan</span>
          </h2>
          <p className="max-w-2xl mx-auto text-base text-gray-600 leading-relaxed">
            Kepemimpinan berpengalaman dalam mengembangkan pendidikan teknik berkualitas tinggi
          </p>
        </div>

        {/* Modern Minimalist Grid Layout - Large Photo Cards with Wider Width */}
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {wakilDekan.map((wakil, index) => {
              const cardColors = [
                { gradient: 'from-purple-500 to-pink-500' },
                { gradient: 'from-cyan-500 to-blue-500' },
                { gradient: 'from-orange-500 to-red-500' },
                { gradient: 'from-green-500 to-emerald-500' },
                { gradient: 'from-indigo-500 to-purple-500' }
              ]
              const cardColor = cardColors[index % cardColors.length]

              return (
                <div
                  key={wakil.id}
                  className="group relative"
                >
                  {/* Modern Minimalist Card - Same size for all */}
                  <div className="relative h-full min-h-[500px] overflow-hidden rounded-[32px] transition-all duration-500 group-hover:-translate-y-4 group-hover:scale-[1.08]">
                    {/* Photo with transparent gradient overlay - Same height for all */}
                    <div className="relative h-[520px] w-full overflow-hidden rounded-[32px] shadow-2xl">
                      <img
                        src={wakil.photo}
                        alt={wakil.name}
                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                      />

                      {/* Transparent gradient overlay - subtle color tint */}
                      <div className={`absolute inset-0 bg-gradient-to-t ${cardColor.gradient} opacity-20 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-30`} />

                      {/* Transparent dark overlay from bottom - more subtle */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      {/* Name and Position - centered text at bottom */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white text-center">
                        <h3 className="text-sm font-bold mb-1 leading-tight drop-shadow-lg">
                          {wakil.name}
                        </h3>
                        <p className="text-base font-bold opacity-95 drop-shadow-md">
                          {wakil.jabatan}
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default WakilDekanSection
