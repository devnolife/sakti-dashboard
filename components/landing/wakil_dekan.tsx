'use client'

import { Badge } from '@/components/ui/badge'
import { GraduationCap, Users, BookOpen, Award } from 'lucide-react'

const WakilDekanSection = () => {
  const wakilDekan = [
    {
      id: 1,
      name: "Prof. Dr. Ahmad Santoso, M.T.",
      jabatan: "Dekan",
      fungsi: "Memimpin fakultas dan mengawasi seluruh kegiatan akademik dan non-akademik",
      photo: "/api/placeholder/280/350",
      icon: GraduationCap,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      id: 2,
      name: "Dr. Siti Aminah, S.T., M.Eng.",
      jabatan: "Wakil Dekan Akademik",
      fungsi: "Mengawasi kurikulum, penelitian, dan pengembangan akademik fakultas",
      photo: "/api/placeholder/280/350",
      icon: BookOpen,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      id: 3,
      name: "Dr. Eng. Budi Pratama, S.T., M.T.",
      jabatan: "Wakil Dekan Kemahasiswaan",
      fungsi: "Mengelola kegiatan kemahasiswaan, organisasi, dan pengembangan soft skill",
      photo: "/api/placeholder/280/350",
      icon: Users,
      gradient: "from-green-500 to-emerald-500"
    },
    {
      id: 4,
      name: "Dr. Maya Sari, S.T., M.M.",
      jabatan: "Wakil Dekan Penelitian",
      fungsi: "Koordinasi penelitian, publikasi ilmiah, dan pengabdian masyarakat",
      photo: "/api/placeholder/280/350",
      icon: Award,
      gradient: "from-orange-500 to-red-500"
    },
    {
      id: 5,
      name: "Dr. Ir. Andi Rahman, M.T.",
      jabatan: "Wakil Dekan Kerjasama",
      fungsi: "Menjalin kemitraan industri, pengelolaan alumni, dan pengembangan karir",
      photo: "/api/placeholder/280/350",
      icon: Award,
      gradient: "from-indigo-500 to-purple-500"
    }
  ]

  return (
    <section id="features" className="py-12 bg-gray-50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Clean Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 bg-[#0451d3] text-white px-4 py-1.5 rounded-full text-xs font-medium mb-4">
            <GraduationCap className="w-3 h-3" />
            <span>Tim Kepemimpinan</span>
          </div>

          <h2 className="mb-3 text-2xl font-bold text-gray-900 md:text-3xl">
            Para <span className="text-[#0451d3]">Wakil Dekan</span>
          </h2>
          <p className="max-w-2xl mx-auto text-sm text-gray-600 md:text-base">
            Kepemimpinan berpengalaman dalam mengembangkan pendidikan teknik berkualitas
          </p>
        </div>

        {/* Simple Horizontal Slider */}
        <div className="relative">
          <div className="flex gap-4 px-2 pb-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
            {wakilDekan.map((wakil, index) => (
              <div
                key={wakil.id}
                className="flex-none w-56 snap-start group"
              >
                {/* Clean Card */}
                <div className="overflow-hidden transition-all duration-300 bg-white shadow-md rounded-xl group-hover:shadow-lg group-hover:-translate-y-1">

                  {/* Photo Section */}
                  <div className="relative">
                    <div className="aspect-[4/5] overflow-hidden">
                      <img
                        src={wakil.photo}
                        alt={wakil.name}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                      />

                      {/* Simple overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    </div>

                    {/* Icon badge */}
                    <div className={`absolute top-3 right-3 w-8 h-8 bg-gradient-to-r ${wakil.gradient} rounded-full flex items-center justify-center shadow-md`}>
                      <wakil.icon className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="mb-2 text-sm font-bold text-gray-900 line-clamp-2">
                      {wakil.name}
                    </h3>

                    <div className={`inline-block px-2 py-1 rounded-full bg-gradient-to-r ${wakil.gradient} text-white text-xs font-medium mb-2`}>
                      {wakil.jabatan}
                    </div>

                    <p className="text-xs leading-relaxed text-gray-600 line-clamp-3">
                      {wakil.fungsi}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Simple indicators */}
          <div className="flex justify-center mt-4 space-x-1">
            {wakilDekan.map((_, index) => (
              <div key={index} className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default WakilDekanSection
