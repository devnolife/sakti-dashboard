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
    <section className="py-12 relative overflow-hidden min-h-[400px] bg-gradient-to-b from-gray-50 via-primary/5 to-brand/5">
      {/* Enhanced Background Elements */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-primary/10 via-brand/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-tr from-brand/10 via-primary/10 to-transparent rounded-full blur-3xl" />

      {/* Background Avatars */}
      {avatars.map((avatar, index) => (
        <div
          key={index}
          className={`absolute ${avatar.position} ${avatar.size} bg-gradient-to-br from-gray-300 to-gray-400 rounded-full shadow-lg`}
        />
      ))}

      {/* Decorative Elements */}
      <div className="absolute top-16 left-48 w-2 h-2 bg-primary rounded-full" />
      <div className="absolute bottom-16 right-48 w-2 h-2 bg-primary rounded-full" />
      <div className="absolute bottom-2 left-32 w-2 h-2 bg-primary rounded-full" />
      <div className="absolute top-8 right-16 w-2 h-2 bg-primary rounded-full" />
      <div className="absolute bottom-20 right-8 w-2 h-2 bg-primary rounded-full" />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center pt-16">
          <h2 className="text-2xl md:text-3xl font-semibold leading-normal text-[#101012] max-w-4xl mx-auto">
            <span>Education is not just about learning facts, it's about </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-brand">unlocking</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-primary"> your future potential.</span>
          </h2>
        </div>
      </div>
    </section>
  )
}

export default QuotesSection
