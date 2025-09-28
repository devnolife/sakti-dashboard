'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

const CTASection = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#0451d3] rounded-2xl relative overflow-hidden shadow-lg">
          {/* Background Image Mask */}
          <div className="absolute top-32 right-0 w-[400px] h-[300px] opacity-20">
            <div className="w-full h-full bg-gradient-to-l from-white/10 to-transparent" />
          </div>

          <div className="grid lg:grid-cols-2 gap-8 p-8">
            {/* Left Content */}
            <div className="text-white space-y-8">
              <div className="space-y-4">
                <h2 className="font-bold text-2xl md:text-3xl leading-normal">
                  Turn Knowledge Into Opportunity
                </h2>
                <p className="font-normal text-sm md:text-base leading-relaxed">
                  Education is more than just lessons; it's the foundation of your journey.
                  Take control of your future today!
                </p>
              </div>
            </div>

            {/* Right Content */}
            <div className="text-white space-y-6">
              <div className="space-y-3">
                <h3 className="font-medium text-base md:text-lg leading-relaxed">
                  Stay up to date
                </h3>

                {/* Email Subscription */}
                <div className="flex gap-4 items-center">
                  <div className="backdrop-blur-[15px] bg-[rgba(255,255,255,0.05)] border border-white/25 rounded-full px-6 py-2 flex-1 shadow-lg">
                    <input
                      type="email"
                      placeholder="Enter your email ..."
                      className="bg-transparent text-white placeholder-white/50 text-sm w-full outline-none"
                    />
                  </div>
                  <Button className="bg-[#0451d3] hover:bg-[#0451d3]/90 border-2 border-white rounded-full px-6 py-2 text-sm font-semibold shadow-lg">
                    Subscribe
                  </Button>
                </div>

                <p className="font-normal text-xs md:text-sm leading-relaxed">
                  <span>By subscribing, you agree to our </span>
                  <Link href="#" className="font-semibold underline hover:no-underline">
                    Privacy & Policy
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTASection
