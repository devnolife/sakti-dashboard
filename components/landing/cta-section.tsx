'use client'

import { Button } from '@/components/ui/button'
import { Mail, Send, Sparkles } from 'lucide-react'
import Link from 'next/link'

const CTASection = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden shadow-2xl bg-gradient-to-br from-purple-600 via-cyan-600 to-purple-700 rounded-[40px] border-4 border-white">
          {/* Animated background elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-l from-white/10 to-transparent rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-r from-cyan-500/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

          {/* Decorative floating elements */}
          <div className="absolute top-10 right-20 w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm animate-pulse" />
          <div className="absolute bottom-20 left-10 w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm animate-pulse" style={{ animationDelay: '0.5s' }} />
          <div className="absolute top-32 left-32 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm animate-pulse" style={{ animationDelay: '1.5s' }} />

          {/* Brand accent overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.15),transparent_60%)] mix-blend-overlay" />

          <div className="relative grid lg:grid-cols-2 gap-10 p-10 md:p-12 lg:p-14">
            {/* Left Content */}
            <div className="text-white space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/20 backdrop-blur-md rounded-full border-2 border-white/30 shadow-xl">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-bold">Join Our Community</span>
              </div>

              <div className="space-y-5">
                <h2 className="font-black text-3xl md:text-4xl lg:text-5xl leading-tight">
                  Turn Knowledge Into Opportunity
                </h2>
                <p className="font-medium text-base md:text-lg leading-relaxed text-white/90">
                  Education is more than just lessons; it's the foundation of your journey.
                  Take control of your future today!
                </p>
              </div>

              {/* Stats */}
              <div className="flex gap-8 pt-4">
                <div>
                  <div className="text-3xl font-black">5000+</div>
                  <div className="text-sm text-white/80">Students</div>
                </div>
                <div>
                  <div className="text-3xl font-black">50+</div>
                  <div className="text-sm text-white/80">Programs</div>
                </div>
                <div>
                  <div className="text-3xl font-black">95%</div>
                  <div className="text-sm text-white/80">Success Rate</div>
                </div>
              </div>
            </div>

            {/* Right Content - Modern subscription form */}
            <div className="text-white space-y-6 flex flex-col justify-center">
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border-2 border-white/20 shadow-2xl">
                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white text-purple-600 shadow-lg">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl">Stay up to date</h3>
                      <p className="text-sm text-white/80">Get the latest updates</p>
                    </div>
                  </div>

                  {/* Email Subscription Form */}
                  <div className="space-y-4">
                    <div className="relative">
                      <div className="absolute left-5 top-1/2 -translate-y-1/2">
                        <Mail className="w-5 h-5 text-white/60" />
                      </div>
                      <input
                        type="email"
                        placeholder="Enter your email address..."
                        className="w-full pl-14 pr-6 py-4 bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-2xl text-white placeholder-white/50 text-base outline-none focus:border-white/60 transition-all shadow-lg"
                      />
                    </div>

                    <Button className="w-full bg-white hover:bg-gray-100 text-gray-900 rounded-2xl px-8 py-6 text-base font-bold shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3">
                      <span>Subscribe Now</span>
                      <Send className="w-5 h-5" />
                    </Button>
                  </div>

                  <p className="text-xs text-center text-white/70 leading-relaxed">
                    <span>By subscribing, you agree to our </span>
                    <Link href="#" className="font-bold underline hover:no-underline hover:text-white transition-colors">
                      Privacy & Policy
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTASection
