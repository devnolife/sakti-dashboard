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
    <section className='relative py-20 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-slate-900 dark:via-emerald-900 dark:to-slate-900 overflow-hidden'>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-emerald-400 to-teal-600 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-blob"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-r from-teal-400 to-cyan-600 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-blob animation-delay-2000"></div>
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
              <Badge variant="outline" className="bg-primary/10">
                🚀 Mulai Sekarang
              </Badge>
              
              <h2 className='text-3xl lg:text-4xl font-bold'>
                Siap untuk{' '}
                <span className='bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>
                  Memulai?
                </span>
              </h2>
              
              <p className='text-xl text-muted-foreground'>
                Bergabunglah dengan Fakultas Teknik Unismuh Makassar dan rasakan pengalaman 
                sistem akademik yang terintegrasi dan modern.
              </p>
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
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    {benefit.icon}
                  </div>
                  <span className="text-muted-foreground">{benefit.text}</span>
                </motion.div>
              ))}
            </div>

            <div className='flex flex-col sm:flex-row gap-4'>
              <Button asChild size="lg" className="text-white group">
                <Link href="/login">
                  Akses Dashboard
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#features">
                  Pelajari Lebih Lanjut
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Right Content - Dashboard Preview */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className='flex-1 max-w-lg'
          >
            <Card className="overflow-hidden shadow-2xl border-0 bg-card/80 backdrop-blur">
              <CardContent className="p-0">
                {/* Header */}
                <div className="bg-gradient-to-r from-primary to-secondary p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                      <div className="text-white font-medium">SINTEKMu Dashboard</div>
                    </div>
                    <Badge variant="secondary" className="bg-white/20 text-white">
                      Online
                    </Badge>
                  </div>
                </div>

                {/* Dashboard Content */}
                <div className="p-6 space-y-6">
                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">2,847</div>
                      <div className="text-sm text-muted-foreground">Mahasiswa</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-secondary">156</div>
                      <div className="text-sm text-muted-foreground">Dosen</div>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">Aktivitas Terkini</h4>
                    <div className="space-y-2">
                      {[
                        { activity: "KKP disetujui", time: "2 menit lalu", status: "success" },
                        { activity: "Ujian dijadwalkan", time: "5 menit lalu", status: "info" },
                        { activity: "Surat diproses", time: "10 menit lalu", status: "warning" }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${
                              item.status === 'success' ? 'bg-green-500' :
                              item.status === 'info' ? 'bg-blue-500' : 'bg-orange-500'
                            }`}></div>
                            <span>{item.activity}</span>
                          </div>
                          <span className="text-muted-foreground text-xs">{item.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <Button size="sm" variant="outline" className="text-xs">
                      Buat Laporan
                    </Button>
                    <Button size="sm" className="text-xs">
                      Lihat Detail
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