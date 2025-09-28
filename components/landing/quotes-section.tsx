'use client'

const QuotesSection = () => {
  const avatars = [
    { size: 'w-16 h-16', position: 'top-32 left-16' },
    { size: 'w-20 h-20', position: 'top-8 right-48' },
    { size: 'w-20 h-20', position: 'top-20 left-64' },
    { size: 'w-20 h-20', position: 'bottom-32 right-64' },
    { size: 'w-16 h-16', position: 'bottom-16 right-32' }
  ]

  return (
    <section className="py-12 bg-gray-50 relative overflow-hidden min-h-[400px]">
      {/* Background Avatars */}
      {avatars.map((avatar, index) => (
        <div
          key={index}
          className={`absolute ${avatar.position} ${avatar.size} bg-gradient-to-br from-gray-300 to-gray-400 rounded-full shadow-lg`}
        />
      ))}

      {/* Decorative Elements */}
      <div className="absolute top-16 left-48 w-2 h-2 bg-[#0451d3] rounded-full" />
      <div className="absolute bottom-16 right-48 w-2 h-2 bg-[#0451d3] rounded-full" />
      <div className="absolute bottom-2 left-32 w-2 h-2 bg-[#0451d3] rounded-full" />
      <div className="absolute top-8 right-16 w-2 h-2 bg-[#0451d3] rounded-full" />
      <div className="absolute bottom-20 right-8 w-2 h-2 bg-[#0451d3] rounded-full" />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center pt-16">
          <h2 className="text-2xl md:text-3xl font-semibold leading-normal text-[#101012] max-w-4xl mx-auto">
            <span>Education is not just about learning facts, it's about </span>
            <span className="text-[#0451d3]">unlocking</span>
            <span className="text-[#0451d3]"> your future potential.</span>
          </h2>
        </div>
      </div>
    </section>
  )
}

export default QuotesSection
