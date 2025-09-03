'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { ArrowRight, Users, BookOpen, BarChart3 } from 'lucide-react'

const GetStarted = () => {
  const benefits = [
    {
      icon: <Users className="w-5 h-5" />,
      text: "Multi-role access untuk semua stakeholder"
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      text: "Sistem akademik terintegrasi lengkap"
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      text: "Analytics dan reporting real-time"
    }
  ]

  return (
    <section className='relative py-24 bg-gradient-to-br from-violet-50 via-fuchsia-50 to-cyan-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 overflow-hidden'>
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-violet-400 via-fuchsia-500 to-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Simplified Floating Shapes - Only 5 elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-3 h-3 rounded-full opacity-25 ${
              i % 3 === 0 ? 'bg-gradient-to-r from-purple-400 to-pink-500' :
              i % 3 === 1 ? 'bg-gradient-to-r from-cyan-400 to-blue-500' :
              'bg-gradient-to-r from-pink-400 to-rose-500'
            } animate-bounce`}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: '3s'
            }}
          />
        ))}
      </div>
      
      <div className='container mx-auto px-4'>
        <div className='flex flex-col lg:flex-row items-center justify-between gap-12'>
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='flex-1 space-y-8'
          >
            <div className='space-y-6'>
              <motion.div
                initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
                whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Badge className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 text-white border-0 px-6 py-3 text-sm font-bold shadow-xl hover:shadow-purple-500/30 transition-all duration-300 animate-bounce">
                  🚀 Ready to Slay? Let's Go!
                </Badge>
              </motion.div>
              
              <motion.h2 
                className='text-4xl lg:text-6xl font-black leading-tight'
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Ready to{' '}
                <span className='bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-x'>
                  Level Up?
                </span> 🔥
              </motion.h2>
              
              <motion.p 
                className='text-xl lg:text-2xl text-slate-600 dark:text-slate-300 font-medium leading-relaxed'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              >
                Join Fakultas Teknik Unismuh Makassar and experience the most{' '}
                <span className="font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">lit</span> dan{' '}
                <span className="font-bold text-cyan-600">game-changing</span> academic platform ever! 💪✨
              </motion.p>
            </div>

            {/* Benefits List */}
            <div className='space-y-4'>
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className='flex items-center gap-3'
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform duration-300">
                    {benefit.icon}
                  </div>
                  <span className="text-slate-600 dark:text-slate-300 font-medium hover:text-purple-600 transition-colors duration-300">{benefit.text}</span>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className='flex flex-col sm:flex-row gap-6'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              viewport={{ once: true }}
            >
              <Button asChild size="lg" className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 hover:from-violet-700 hover:via-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-bold rounded-2xl shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105 group">
                <Link href="/login">
                  🚀 Let's Get Started!
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-8 py-4 text-lg font-bold rounded-2xl border-2 border-purple-500 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-600 transition-all duration-300 transform hover:scale-105">
                <Link href="#features">
                  ✨ Explore Features
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Content - Dashboard Preview */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className='flex-1 max-w-lg'
          >
            <Card className="overflow-hidden shadow-xl border bg-white/80 dark:bg-slate-800/80 rounded-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:scale-105 group">
              <CardContent className="p-0">
                {/* Header */}
                <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-50"></div>
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-2">
                        <div className="w-4 h-4 bg-red-400 rounded-full shadow-sm animate-pulse"></div>
                        <div className="w-4 h-4 bg-yellow-400 rounded-full shadow-sm animation-delay-300 animate-pulse"></div>
                        <div className="w-4 h-4 bg-green-400 rounded-full shadow-sm animation-delay-600 animate-pulse"></div>
                      </div>
                      <div className="text-white font-bold text-lg">SINTEKMu Dashboard</div>
                    </div>
                    <Badge className="bg-gradient-to-r from-green-400 to-emerald-500 text-white border-0 shadow-lg animate-pulse">
                      🟢 Live & Slaying
                    </Badge>
                  </div>
                </div>

                {/* Dashboard Content */}
                <div className="p-8 space-y-8 bg-gradient-to-br from-white to-purple-50 dark:from-slate-800 dark:to-purple-900/20">
                  {/* Enhanced Quick Stats */}
                  <div className="grid grid-cols-2 gap-6">
                    <motion.div 
                      className="text-center p-4 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200/50 dark:border-purple-700/30"
                      whileHover={{ scale: 1.05, y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">2,847</div>
                      <div className="text-sm font-semibold text-purple-600 dark:text-purple-400">🎓 Students</div>
                    </motion.div>
                    <motion.div 
                      className="text-center p-4 rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 border border-cyan-200/50 dark:border-cyan-700/30"
                      whileHover={{ scale: 1.05, y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="text-3xl font-black bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">156</div>
                      <div className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">👩‍🏫 Lecturers</div>
                    </motion.div>
                  </div>

                  {/* Enhanced Recent Activity */}
                  <div className="space-y-4">
                    <h4 className="font-bold text-lg text-slate-800 dark:text-slate-200 flex items-center gap-2">
                      ⚡ Live Activity Feed
                    </h4>
                    <div className="space-y-3">
                      {[
                        { activity: "KKP approved! 🎉", time: "2 min ago", status: "success", emoji: "🟢" },
                        { activity: "Exam scheduled 📋", time: "5 min ago", status: "info", emoji: "🔵" },
                        { activity: "Letter processed 📝", time: "10 min ago", status: "warning", emoji: "🟡" }
                      ].map((item, index) => (
                        <motion.div 
                          key={index} 
                          className="flex items-center justify-between p-3 rounded-xl bg-white/60 dark:bg-slate-700/60 border border-purple-200/30 dark:border-purple-700/30 hover:bg-purple-50/80 dark:hover:bg-purple-900/20 transition-all duration-300"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <div className="flex items-center gap-3">
                            <div className="text-lg">{item.emoji}</div>
                            <span className="font-medium text-sm text-slate-700 dark:text-slate-300">{item.activity}</span>
                          </div>
                          <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">{item.time}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Enhanced Action Buttons */}
                  <div className="grid grid-cols-2 gap-4">
                    <Button size="sm" variant="outline" className="text-sm font-semibold py-3 rounded-xl border-2 border-purple-200 text-purple-600 hover:bg-purple-50 dark:border-purple-700 dark:text-purple-400 dark:hover:bg-purple-900/20 transition-all duration-300 hover:scale-105">
                      📊 Create Report
                    </Button>
                    <Button size="sm" className="text-sm font-semibold py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105">
                      👀 View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default GetStarted