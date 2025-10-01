'use client'

import { Quote } from 'lucide-react'

const QuotesSection = () => {
  const avatars = [
    { size: 'w-20 h-20', position: 'top-32 left-16', color: 'from-purple-400 to-purple-600', delay: '0s' },
    { size: 'w-24 h-24', position: 'top-8 right-48', color: 'from-cyan-400 to-cyan-600', delay: '0.5s' },
    { size: 'w-24 h-24', position: 'top-20 left-64', color: 'from-orange-400 to-orange-600', delay: '1s' },
    { size: 'w-24 h-24', position: 'bottom-32 right-64', color: 'from-pink-400 to-pink-600', delay: '1.5s' },
    { size: 'w-20 h-20', position: 'bottom-16 right-32', color: 'from-teal-400 to-teal-600', delay: '2s' }
  ]

  const decorativeIcons = [
    { position: 'top-16 left-48', color: 'bg-purple-500', size: 'w-3 h-3' },
    { position: 'bottom-16 right-48', color: 'bg-cyan-500', size: 'w-3 h-3' },
    { position: 'bottom-2 left-32', color: 'bg-orange-500', size: 'w-2 h-2' },
    { position: 'top-8 right-16', color: 'bg-pink-500', size: 'w-3 h-3' },
    { position: 'bottom-20 right-8', color: 'bg-teal-500', size: 'w-2 h-2' }
  ]

  return (
    <section className="py-20 relative overflow-hidden min-h-[500px] bg-gradient-to-b from-white via-purple-50/30 to-cyan-50/30">
      {/* Enhanced Background Elements with animation */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-500/15 via-cyan-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tr from-cyan-500/15 via-purple-500/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Modern Avatar Circles with gradient and shadow */}
      {avatars.map((avatar, index) => (
        <div
          key={index}
          className={`absolute ${avatar.position} ${avatar.size} bg-gradient-to-br ${avatar.color} rounded-full shadow-2xl border-4 border-white animate-pulse`}
          style={{ animationDelay: avatar.delay }}
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center pt-16">
          {/* Modern Quote Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-500 to-cyan-500 text-white shadow-2xl mb-8 animate-pulse">
            <Quote className="w-10 h-10" />
          </div>

          {/* Enhanced Quote Card */}
          <div className="relative max-w-5xl mx-auto">
            <div className="bg-white/80 backdrop-blur-xl rounded-[40px] p-10 md:p-14 shadow-2xl border-2 border-purple-100 relative overflow-hidden">
              {/* Decorative corner elements */}
              <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-gradient-to-br from-purple-500/20 to-transparent blur-xl" />
              <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500/20 to-transparent blur-xl" />

              {/* Quote marks */}
              <div className="absolute top-6 left-6 text-8xl font-serif text-purple-500/10">"</div>
              <div className="absolute bottom-6 right-6 text-8xl font-serif text-cyan-500/10">"</div>

              <h2 className="relative text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-gray-900 max-w-4xl mx-auto">
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
