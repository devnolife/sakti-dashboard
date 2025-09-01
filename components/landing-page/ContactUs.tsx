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
    <section id='contact-us' className='py-20 bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 dark:from-slate-900 dark:via-rose-900 dark:to-slate-900 relative overflow-hidden'>
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-rose-400 to-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-r from-pink-400 to-orange-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
      </div>

      <div className='container mx-auto px-4 relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className='text-center mb-16'
        >
          <Badge className="mb-4 bg-gradient-to-r from-rose-600 to-orange-600 text-white border-0 px-4 py-2">
            📞 Hubungi Kami
          </Badge>
          
          <h2 className='text-4xl lg:text-5xl font-bold mb-6'>
            Mari{' '}
            <span className='bg-gradient-to-r from-rose-600 via-pink-600 to-orange-600 bg-clip-text text-transparent'>
              Bekerja Sama
            </span>
          </h2>
          
          <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
            Ada pertanyaan atau butuh bantuan? Jangan ragu untuk menghubungi kami. 
            Tim kami siap membantu Anda.
          </p>
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
              <h3 className="text-2xl font-semibold mb-6">Informasi Kontak</h3>
              
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="hover:shadow-md transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className={`${info.color} bg-muted p-3 rounded-full`}>
                          {info.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg">{info.title}</h4>
                          <p className="text-muted-foreground">{info.content}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Additional Info */}
            <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <MessageSquare className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Dukungan Teknis</h4>
                    <p className="text-muted-foreground mb-4">
                      Tim support kami siap membantu Anda dengan masalah teknis atau pertanyaan 
                      seputar penggunaan sistem SINTEKMu.
                    </p>
                    <Badge variant="secondary">Response time: 2-4 jam</Badge>
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
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Kirim Pesan</CardTitle>
                <p className="text-muted-foreground">
                  Untuk diskusi mengenai kerjasama, lisensi, atau pertanyaan pre-sales, 
                  silakan isi form di bawah ini.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nama Lengkap</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Masukkan nama Anda"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="nama@email.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subjek</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Subjek pesan Anda"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Pesan</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tulis pesan Anda di sini..."
                      rows={6}
                      required
                    />
                  </div>
                  
                  <Button type="submit" size="lg" className="w-full group">
                    <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                    Kirim Pesan
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
          <Card className="bg-muted/50">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-semibold mb-4">
                Fakultas Teknik Universitas Muhammadiyah Makassar
              </h3>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Kami berkomitmen untuk memberikan layanan akademik terbaik melalui sistem informasi 
                terintegrasi yang modern dan user-friendly. Tim kami siap membantu Anda dalam setiap 
                langkah perjalanan akademik Anda.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

export default ContactUs