'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from 'lucide-react'

interface ContactInfo {
  icon: React.ReactNode
  title: string
  content: string
  color: string
}

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const contactInfo: ContactInfo[] = [
    {
      icon: <Mail className="w-5 h-5" />,
      title: 'Email',
      content: 'info@ft.unismuh.ac.id',
      color: 'text-primary'
    },
    {
      icon: <Phone className="w-5 h-5" />,
      title: 'Telepon',
      content: '+62 411 866 972',
      color: 'text-green-500'
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: 'Alamat',
      content: 'Jl. Sultan Alauddin No.259, Makassar',
      color: 'text-blue-500'
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: 'Jam Operasional',
      content: 'Senin - Jumat: 08:00 - 16:00',
      color: 'text-orange-500'
    }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
  }

  return (
    <section id='contact-us' className='py-24 bg-gradient-to-br from-violet-50 via-fuchsia-50 to-pink-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 relative overflow-hidden'>
      {/* Enhanced Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-violet-400 via-fuchsia-500 to-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-pink-400 via-rose-500 to-orange-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Simplified Floating Icons - Only 6 elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {['📧', '📞', '📍', '💬', '✨', '🚀'].map((icon, i) => (
          <div
            key={i}
            className="absolute opacity-25 text-2xl animate-bounce"
            style={{
              left: `${20 + i * 12}%`,
              top: `${25 + i * 8}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: '3s'
            }}
          >
            {icon}
          </div>
        ))}
      </div>

      <div className='container mx-auto px-4 relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className='text-center mb-16'
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
            whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-6 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 text-white border-0 px-6 py-3 text-sm font-bold shadow-xl hover:shadow-purple-500/30 transition-all duration-300 animate-bounce">
              💬 Let's Connect & Vibe!
            </Badge>
          </motion.div>
          
          <motion.h2 
            className='text-4xl lg:text-6xl font-black mb-6 leading-tight'
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Ready to{' '}
            <span className='bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent animate-gradient-x'>
              Collab & Slay?
            </span> 🔥
          </motion.h2>
          
          <motion.p 
            className='text-xl lg:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto font-medium leading-relaxed'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            Got questions or need some help? <span className="font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">No cap!</span> Hit us up and let's make{' '}
            <span className="font-bold text-cyan-600">magic happen</span> together! Our squad is always ready to help you level up! ✨💪
          </motion.p>
        </motion.div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
          
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='space-y-8'
          >
            <div className="space-y-6">
              <motion.h3 
                className="text-3xl font-black mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Hit Us Up! 📱💬
              </motion.h3>
              
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border-2 border-white/20 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 cursor-pointer hover:scale-105 hover:-translate-y-1 rounded-2xl group">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white shadow-lg group-hover:shadow-purple-500/30 hover:scale-110 transition-all duration-300">
                          {info.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-xl text-slate-800 dark:text-slate-100 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                            {info.title}
                          </h4>
                          <p className="text-slate-600 dark:text-slate-300 font-medium group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors duration-300">
                            {info.content}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Additional Info */}
            <Card className="bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-cyan-900/20 border-2 border-purple-200/50 dark:border-purple-700/30 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-500 rounded-2xl">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-cyan-500/30 hover:scale-110 transition-all duration-300">
                    <MessageSquare className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-2xl text-slate-800 dark:text-slate-100 mb-3">
                      24/7 Tech Support Squad 🛠️
                    </h4>
                    <p className="text-slate-600 dark:text-slate-300 mb-4 text-lg font-medium leading-relaxed">
                      Our <span className="font-bold text-purple-600">amazing support team</span> is ready to help you with any tech issues or questions about{' '}
                      <span className="font-bold text-cyan-600">SINTEKMu</span>. We're here to keep you winning! 🏆
                    </p>
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 font-bold px-4 py-2 rounded-full shadow-lg animate-pulse">
                      ⚡ Super Fast Response: 2-4 hours!
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border-2 border-white/20 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 text-white p-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <CardTitle className="text-3xl font-black mb-4 flex items-center gap-3">
                    ✉️ Slide Into Our DMs!
                  </CardTitle>
                  <p className="text-lg font-medium opacity-90 leading-relaxed">
                    Ready to talk <span className="font-bold">collab</span>, licensing, or got some <span className="font-bold">fire questions</span>? 
                    Drop us a line below and let's make it happen! 🚀💫
                  </p>
                </motion.div>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="font-bold text-purple-700 dark:text-purple-300">✨ Your Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="What should we call you?"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="font-bold text-purple-700 dark:text-purple-300">📧 Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.awesome@email.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="font-bold text-purple-700 dark:text-purple-300">🎯 What's This About?</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Give us the tea..."
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message" className="font-bold text-purple-700 dark:text-purple-300">💬 Your Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Spill everything here... we're all ears! 👂✨"
                      rows={6}
                      required
                    />
                  </div>
                  
                  <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 hover:from-purple-700 hover:via-fuchsia-700 hover:to-pink-700 text-white py-4 text-lg font-bold rounded-2xl shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105 group">
                    <Send className="w-5 h-5 mr-3 group-hover:translate-x-2 group-hover:rotate-12 transition-all duration-300" />
                    🚀 Send It & Let's Vibe!
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Map or Additional Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Card className="bg-gradient-to-r from-slate-50 to-purple-50 dark:from-slate-800 dark:to-purple-900/20 border-2 border-purple-200/50 dark:border-purple-700/30 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-500 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-cyan-500/5"></div>
            <CardContent className="relative p-10 text-center">
              <motion.h3 
                className="text-2xl lg:text-3xl font-black mb-6 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-cyan-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Faculty of Engineering - Unismuh Makassar 🏛️✨
              </motion.h3>
              <motion.p 
                className="text-lg text-slate-600 dark:text-slate-300 max-w-4xl mx-auto font-medium leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                We're <span className="font-bold text-purple-600">absolutely committed</span> to delivering the most{' '}
                <span className="font-bold text-cyan-600">fire academic services</span> through our modern, user-friendly integrated information system.{' '}
                Our <span className="font-bold text-fuchsia-600">legendary team</span> is ready to support you through every step of your academic journey! 🚀🎓💪
              </motion.p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

export default ContactUs