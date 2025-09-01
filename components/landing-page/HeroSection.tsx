'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Sparkles, Zap, Shield, Users } from "lucide-react"

const HeroSection = () => {
  const [transform, setTransform] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleMouseMove = (event: MouseEvent) => {
        const rotateX = (window.innerHeight - 2 * event.clientY) / 100
        const rotateY = (window.innerWidth - 2 * event.clientX) / 100

        setTransform(
          `perspective(1200px) rotateX(${rotateX < -40 ? -20 : rotateX}deg) rotateY(${rotateY}deg) scale3d(1,1,1)`
        )
      }

      window.addEventListener('mousemove', handleMouseMove)

      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [])

  return (
    <section id='home' className='relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 min-h-screen flex items-center'>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-10 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-r from-pink-400 to-red-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-1/4 text-blue-400"
        >
          <Sparkles size={32} />
        </motion.div>
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotate: [0, -5, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-40 right-1/4 text-purple-400"
        >
          <Zap size={28} />
        </motion.div>
        <motion.div
          animate={{
            y: [0, -25, 0],
            rotate: [0, 10, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-40 left-1/3 text-pink-400"
        >
          <Shield size={24} />
        </motion.div>
      </div>
      
      <div className='container mx-auto px-4 py-20 relative z-10'>
        <div className='max-w-6xl mx-auto text-center'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 px-4 py-2 text-sm font-medium">
                <Sparkles className="w-4 h-4 mr-2" />
                Sistem Akademik Terintegrasi Terdepan
              </Badge>
            </motion.div>
            
            <motion.h1 
              className='text-5xl sm:text-6xl lg:text-7xl font-black mb-8'
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className='bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-x'>
                SINTEKMu
              </span>
              <br />
              <span className="text-slate-800 dark:text-slate-100 text-4xl lg:text-5xl font-bold">
                Dashboard
              </span>
            </motion.h1>
            
            <motion.p 
              className='text-xl lg:text-2xl text-slate-600 dark:text-slate-300 mb-10 max-w-4xl mx-auto leading-relaxed'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <span className="font-semibold text-slate-800 dark:text-slate-200">Fakultas Teknik Universitas Muhammadiyah Makassar</span>
              <br />
              Platform revolusioner untuk mengelola seluruh aspek akademik dengan teknologi terdepan dan user experience yang luar biasa
            </motion.p>

            {/* Feature Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-4xl mx-auto"
            >
              {[
                { icon: <Users className="w-6 h-6" />, text: "14+ Role Pengguna", color: "from-blue-500 to-cyan-500" },
                { icon: <Zap className="w-6 h-6" />, text: "Real-time Analytics", color: "from-purple-500 to-pink-500" },
                { icon: <Shield className="w-6 h-6" />, text: "Keamanan Tingkat Tinggi", color: "from-green-500 to-emerald-500" }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-white/20">
                  <div className={`p-2 rounded-full bg-gradient-to-r ${item.color} text-white`}>
                    {item.icon}
                  </div>
                  <span className="font-medium text-slate-700 dark:text-slate-300">{item.text}</span>
                </div>
              ))}
            </motion.div>

            <motion.div 
              className='flex flex-col sm:flex-row gap-6 justify-center items-center'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105">
                <Link href="/login">
                  🚀 Masuk ke Dashboard
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-8 py-4 text-lg font-semibold rounded-2xl border-2 border-slate-300 dark:border-slate-600 hover:border-purple-500 hover:text-purple-600 transition-all duration-300">
                <Link href="#features">
                  ✨ Jelajahi Fitur
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.1 }}
          className='relative mt-20 lg:mt-28 text-center'
          style={{ transform: transform }}
        >
          <div className="relative mx-auto max-w-7xl">
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-20"></div>
            
            <div className="relative rounded-3xl shadow-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 overflow-hidden">
              {/* Enhanced Header */}
              <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 h-16 flex items-center px-6">
                <div className="flex space-x-3">
                  <div className="w-4 h-4 rounded-full bg-red-400 shadow-sm"></div>
                  <div className="w-4 h-4 rounded-full bg-yellow-400 shadow-sm"></div>
                  <div className="w-4 h-4 rounded-full bg-green-400 shadow-sm"></div>
                </div>
                <div className="flex-1 text-center text-white text-base font-semibold">
                  SINTEKMu Dashboard - Faculty of Engineering
                </div>
                <Badge className="bg-white/20 text-white">Online</Badge>
              </div>
              
              <div className="p-8 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 min-h-[500px] lg:min-h-[600px]">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-10">
                  {/* Enhanced Stats */}
                  {[
                    { label: "Total Mahasiswa", value: "2,847", icon: "👨‍🎓", color: "from-blue-500 to-cyan-500" },
                    { label: "Program Studi", value: "8", icon: "🎓", color: "from-purple-500 to-pink-500" },
                    { label: "Dosen Aktif", value: "156", icon: "👩‍🏫", color: "from-green-500 to-emerald-500" },
                    { label: "Staff Admin", value: "42", icon: "🏛️", color: "from-orange-500 to-red-500" }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 1.5 + index * 0.1 }}
                      className="relative"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-2xl blur opacity-20`}></div>
                      <div className="relative bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 text-center">
                        <div className="text-3xl mb-2">{stat.icon}</div>
                        <h3 className="font-semibold text-slate-600 dark:text-slate-400 mb-1">{stat.label}</h3>
                        <p className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">{stat.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Enhanced Feature Preview */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { name: "KKP System", icon: "📋", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" },
                    { name: "Ujian Online", icon: "📝", color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300" },
                    { name: "E-Library", icon: "📚", color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" },
                    { name: "Payment Gateway", icon: "💳", color: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300" }
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 1.8 + index * 0.1 }}
                      className={`${feature.color} rounded-xl p-4 text-center hover:scale-105 transition-transform duration-300 cursor-pointer`}
                    >
                      <div className="text-3xl mb-3">{feature.icon}</div>
                      <div className="font-semibold">{feature.name}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection