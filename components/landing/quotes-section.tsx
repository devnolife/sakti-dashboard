'use client'

import { Quote } from 'lucide-react'
import Image from 'next/image'

const QuotesSection = () => {
  const leaderBubbles = [
    {
      size: 'w-24 h-24',
      position: 'top-12 right-72',
      color: 'from-purple-400 to-purple-600',
      delay: '0s',
      role: 'Kaprodi',
      title: 'Informatika',
      name: 'Rizki Yusliana Bakti, S.T., M.T.',
      photo: '/prodi/kaprodi Informatika Ibu Rizki Yusliana Bakti, S.T., M.T..png'
    },
    {
      size: 'w-32 h-32',
      position: 'bottom-40 left-20',
      color: 'from-cyan-400 to-cyan-600',
      delay: '0.4s',
      role: 'Sekprodi',
      title: 'Informatika',
      name: 'Titin Wahyuni S.Pd., M.T.',
      photo: '/prodi/Sekprodi Informatika Ibu Titin Wahyuni S.Pd., M.T..png'
    },
    {
      size: 'w-28 h-28',
      position: 'top-24 left-40',
      color: 'from-orange-400 to-orange-600',
      delay: '0.8s',
      role: 'Kaprodi',
      title: 'Elektro',
      name: 'Ir. Rahmania S.T., M.T., IPM.',
      photo: '/prodi/Kaprodi Elektro Ibu Ir. Rahmania S.T., M.T., IPM..png'
    },
    {
      size: 'w-36 h-36',
      position: 'top-48 right-24',
      color: 'from-teal-400 to-teal-600',
      delay: '1.2s',
      role: 'Sekprodi',
      title: 'Elektro',
      name: 'Ir. Andi Abdul Halik Lateko, S.T., M.T., Ph.D.',
      photo: '/prodi/Sekprodi Elektro Bapak Ir. Andi Abdul Halik Lateko, S.T., M.T., Ph.D..png'
    },
    {
      size: 'w-28 h-28',
      position: 'bottom-32 right-80',
      color: 'from-pink-400 to-pink-600',
      delay: '1.6s',
      role: 'Kaprodi',
      title: 'Arsitektur',
      name: 'Ar. Hj. Citra Amalia, S.T., M.T., IAI.',
      photo: '/prodi/Kaprodi Arsitek Ibu Ar. Hj. Citra Amalia, S.T., M.T., IAI..png'
    },
    {
      size: 'w-28 h-28',
      position: 'top-8 left-96',
      color: 'from-indigo-400 to-indigo-600',
      delay: '2.0s',
      role: 'Kaprodi',
      title: 'PWK',
      name: 'Ir. Nini Apriani Rumata, S.T., M.T., IPM.',
      photo: '/prodi/Kaprodi PWK ibu Ir. Nini Apriani Rumata, S.T., M.T., IPM..png'
    },
    {
      size: 'w-24 h-24',
      position: 'bottom-24 left-80',
      color: 'from-emerald-400 to-emerald-600',
      delay: '2.4s',
      role: 'Kaprodi',
      title: 'Pengairan',
      name: 'Ir. Agusalim, S.T., M.T.',
      photo: '/prodi/Kaprodi pengairan Bapak Ir. Agusalim, S.T., M.T..png'
    },
    {
      size: 'w-32 h-32',
      position: 'bottom-52 right-40',
      color: 'from-violet-400 to-violet-600',
      delay: '2.8s',
      role: 'Sekprodi',
      title: 'Pengairan',
      name: 'Sumardi S.T., M.Sc.',
      photo: '/prodi/Sekprodi Pengairan Bapak Sumardi S.T., M.Sc..png'
    }
  ]

  // Bubble dekoratif untuk mengisi area kosong (bukan pimpinan prodi)
  const decorativeBubbles = [
    { size: 'w-16 h-16', position: 'top-28 right-72', color: 'from-purple-300 to-purple-500', delay: '5.0s' },
    { size: 'w-14 h-14', position: 'bottom-36 left-48', color: 'from-cyan-300 to-cyan-500', delay: '5.3s' },
    { size: 'w-18 h-18', position: 'top-44 right-24', color: 'from-pink-300 to-pink-500', delay: '5.6s' },
    { size: 'w-12 h-12', position: 'bottom-4 left-72', color: 'from-orange-300 to-orange-500', delay: '5.9s' },
    { size: 'w-20 h-20', position: 'top-60 left-24', color: 'from-rose-300 to-rose-500', delay: '6.2s' },
    { size: 'w-15 h-15', position: 'bottom-60 right-32', color: 'from-indigo-300 to-indigo-500', delay: '6.5s' },
    { size: 'w-17 h-17', position: 'top-36 left-96', color: 'from-emerald-300 to-emerald-500', delay: '6.8s' },
    { size: 'w-13 h-13', position: 'bottom-52 right-56', color: 'from-amber-300 to-amber-500', delay: '7.1s' },
    { size: 'w-19 h-19', position: 'top-48 right-96', color: 'from-teal-300 to-teal-500', delay: '7.4s' },
    { size: 'w-11 h-11', position: 'bottom-24 left-88', color: 'from-violet-300 to-violet-500', delay: '7.7s' },
    { size: 'w-22 h-22', position: 'top-56 right-12', color: 'from-lime-300 to-lime-500', delay: '8.0s' },
    { size: 'w-10 h-10', position: 'bottom-44 left-16', color: 'from-fuchsia-300 to-fuchsia-500', delay: '8.3s' }
  ]

  const decorativeIcons = [
    { position: 'top-16 left-48', color: 'bg-purple-500', size: 'w-3 h-3' },
    { position: 'bottom-16 right-48', color: 'bg-cyan-500', size: 'w-3 h-3' },
    { position: 'bottom-2 left-32', color: 'bg-orange-500', size: 'w-2 h-2' },
    { position: 'top-8 right-16', color: 'bg-pink-500', size: 'w-3 h-3' },
    { position: 'bottom-20 right-8', color: 'bg-teal-500', size: 'w-2 h-2' },
    { position: 'top-24 left-8', color: 'bg-rose-500', size: 'w-2 h-2' },
    { position: 'bottom-8 right-88', color: 'bg-indigo-500', size: 'w-3 h-3' },
    { position: 'top-40 left-4', color: 'bg-emerald-500', size: 'w-2 h-2' },
    { position: 'bottom-32 right-4', color: 'bg-amber-500', size: 'w-2 h-2' },
    { position: 'top-64 left-40', color: 'bg-lime-500', size: 'w-3 h-3' },
    { position: 'bottom-56 right-20', color: 'bg-fuchsia-500', size: 'w-2 h-2' },
    { position: 'top-72 right-60', color: 'bg-sky-500', size: 'w-3 h-3' }
  ]

  return (
    <section className="py-20 relative overflow-hidden min-h-[700px] bg-gradient-to-b from-white via-purple-50/30 to-cyan-50/30">
      {/* Enhanced Background Elements with animation */}
      <div className="absolute top-0 left-0 rounded-full w-96 h-96 bg-gradient-to-br from-purple-500/15 via-cyan-500/10 to-transparent blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 rounded-full w-80 h-80 bg-gradient-to-tr from-cyan-500/15 via-purple-500/10 to-transparent blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Leadership Photo Bubbles */}
      {leaderBubbles.map((leader, index) => (
        <div
          key={index}
          className={`absolute ${leader.position} ${leader.size} rounded-full shadow-2xl border-4 border-white overflow-hidden group animate-bounce hover:scale-110 transition-all duration-300 z-10`}
          style={{
            animationDelay: leader.delay,
            animationDuration: '3s'
          }}
          title={`${leader.role} ${leader.title} - ${leader.name}`}
        >
          {/* Gradient Background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${leader.color} opacity-20`} />

          {/* Photo */}
          <Image
            src={leader.photo}
            alt={`${leader.role} ${leader.title} - ${leader.name}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 150px, 200px"
          />

          {/* Hover Overlay with Info */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center transition-opacity duration-300 opacity-0 bg-black/70 group-hover:opacity-100">
            <div className="text-xs font-semibold text-white">{leader.role}</div>
            <div className="text-xs text-white">{leader.title}</div>
          </div>
        </div>
      ))}

      {/* Decorative Bubbles untuk mengisi area kosong */}
      {decorativeBubbles.map((bubble, index) => (
        <div
          key={index}
          className={`absolute ${bubble.position} ${bubble.size} bg-gradient-to-br ${bubble.color} rounded-full shadow-xl border-2 border-white/50 animate-bounce opacity-60`}
          style={{
            animationDelay: bubble.delay,
            animationDuration: '4s'
          }}
        />
      ))}

      {/* Enhanced Decorative Elements */}
      {decorativeIcons.map((icon, index) => (
        <div
          key={index}
          className={`absolute ${icon.position} ${icon.size} ${icon.color} rounded-full shadow-lg animate-pulse`}
          style={{ animationDelay: `${index * 0.3}s` }}
        />
      ))}

      {/* Main Content Card */}
      <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="-mt-8 text-center">
          {/* Modern Quote Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 mb-8 text-white shadow-2xl rounded-3xl bg-gradient-to-br from-purple-500 to-cyan-500 animate-pulse">
            <Quote className="w-10 h-10" />
          </div>

          {/* Enhanced Quote Card */}
          <div className="relative max-w-5xl mx-auto">
            <div className="bg-white/80 backdrop-blur-xl rounded-[40px] p-10 md:p-14 shadow-2xl border-2 border-purple-100 relative overflow-hidden">
              {/* Decorative corner elements */}
              <div className="absolute w-24 h-24 rounded-full -top-6 -left-6 bg-gradient-to-br from-purple-500/20 to-transparent blur-xl" />
              <div className="absolute w-24 h-24 rounded-full -bottom-6 -right-6 bg-gradient-to-br from-cyan-500/20 to-transparent blur-xl" />

              {/* Quote marks */}
              <div className="absolute font-serif top-6 left-6 text-8xl text-purple-500/10">"</div>
              <div className="absolute font-serif bottom-6 right-6 text-8xl text-cyan-500/10">"</div>

              <h2 className="relative max-w-4xl mx-auto text-3xl font-bold leading-tight text-gray-900 md:text-4xl lg:text-5xl">
                <span>Education is not just about learning facts, it's about </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-cyan-600 to-purple-600 animate-pulse">unlocking</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-purple-600 to-cyan-600 animate-pulse"> your future potential.</span>
              </h2>

              {/* Decorative line */}
              <div className="mt-8 w-32 h-1.5 bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500 rounded-full mx-auto" />
            </div>

            {/* 3D shadow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5 rounded-[40px] translate-y-4 -z-10 blur-xl" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default QuotesSection
