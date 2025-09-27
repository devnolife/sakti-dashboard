'use client'

import { useEffect, useRef } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Mail, Phone } from 'lucide-react'

const ContactUs: React.FC = () => {
  const skipIntersection = useRef(true)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (skipIntersection.current) {
          skipIntersection.current = false
          return
        }
        // Handle intersection if needed
      },
      { threshold: 0.35 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return (
    <section id="contact-us" className="relative py-[100px] bg-gradient-to-br from-blue-50/30 via-white to-indigo-50/20 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 overflow-hidden" ref={ref}>
      {/* Enhanced Background Elements with #3674B5 */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-primary/15 to-primary/8 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tl from-primary/12 to-primary/6 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-r from-primary/5 via-transparent to-primary/8 rounded-full blur-3xl" />

      <div className="relative flex flex-col gap-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col gap-y-6 items-center justify-center">
          {/* Enhanced Floating Badge with #3674B5 */}
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary/12 to-primary/8 backdrop-blur-xl border-2 border-primary/25 rounded-full text-sm font-semibold shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 animate-float">
            <span className="w-2 h-2 bg-primary rounded-full mr-3 animate-pulse"></span>
            <span className="text-primary">📞 Hubungi Kami</span>
          </div>

          <div className="flex flex-col items-center gap-y-4 justify-center flex-wrap">
            <div className="flex items-center gap-x-2">
              <h2 className="text-neutral-900 dark:text-white text-4xl lg:text-5xl font-extrabold text-center leading-tight">
                <span className="relative z-[1] bg-gradient-to-r from-neutral-900 to-neutral-600 bg-clip-text text-transparent dark:from-white dark:to-gray-300">
                  Mari bekerja
                  <img
                    src="/images/front-pages/landing-page/bg-shape.png"
                    alt="bg-shape"
                    className="absolute bottom-0 z-[1] h-[40%] w-[132%] -left-[19%] top-[17px]"
                  />
                </span>{' '}
                <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 bg-clip-text text-transparent">
                  sama
                </span>
              </h2>
            </div>
            <p className="text-lg text-center text-neutral-600 dark:text-neutral-300 max-w-2xl leading-relaxed">
              Ada pertanyaan atau saran? Kirimkan pesan kepada kami dan mari wujudkan digitalisasi akademik bersama.
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="lg:pl-[38px]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Contact Info Card */}
            <div className="md:col-span-5">
              <div className="relative group">
                <div className="border-0 p-6 relative rounded-3xl bg-white/80 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-700 overflow-hidden">
                  {/* Animated border effect */}
                  <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-20 transition-opacity duration-700 blur-sm rounded-3xl" />

                  {/* Decorative border image - updated positioning */}
                  <img
                    src="/images/front-pages/landing-page/contact-border.png"
                    className="absolute -top-[5%] -left-[6%] max-w-full max-lg:hidden opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                    alt="contact-border"
                    width="150"
                  />

                  {/* Customer service image with modern effects */}
                  <div className="relative overflow-hidden rounded-2xl mb-6 group-hover:scale-105 transition-transform duration-700">
                    <img
                      src="/images/front-pages/landing-page/customer-service.png"
                      alt="customer-service"
                      className="w-full rounded-2xl filter group-hover:brightness-110 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>

                  {/* Contact Information */}
                  <div className="flex justify-between flex-wrap gap-6 relative z-10">
                    <div className="flex gap-4 group/item">
                      <Avatar className="w-12 h-12 group-hover/item:scale-110 transition-transform duration-300">
                        <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary border border-primary/20">
                          <Mail className="w-5 h-5" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium">Email</p>
                        <p className="text-neutral-900 dark:text-white font-semibold group-hover/item:text-primary transition-colors duration-300">
                          info@ft-unismuh.ac.id
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 group/item">
                      <Avatar className="w-12 h-12 group-hover/item:scale-110 transition-transform duration-300">
                        <AvatarFallback className="bg-primary/20 text-primary border border-primary/20">
                          <Phone className="w-5 h-5" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium">Telepon</p>
                        <p className="text-neutral-900 dark:text-white font-semibold group-hover/item:text-primary transition-colors duration-300">
                          (0411) 861543
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-7">
              <Card className="border-0 bg-white/80 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-700 rounded-3xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex flex-col gap-y-2 mb-8">
                    <h3 className="text-3xl font-bold text-primary">
                      Kirim Pesan
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                      Jika Anda ingin bertanya tentang sistem, kerjasama, layanan akademik, atau memiliki saran,
                      silakan kirimkan pesan kepada kami.
                    </p>
                  </div>

                  <form className="flex flex-col items-start gap-8">
                    <div className="flex gap-6 w-full">
                      <div className="flex-1 group">
                        <Label htmlFor="name-input" className="text-neutral-700 dark:text-neutral-300 font-medium mb-2 block">
                          Nama Lengkap
                        </Label>
                        <Input
                          id="name-input"
                          placeholder="Masukkan nama lengkap"
                          className="border-neutral-200 focus:border-primary/50 focus:ring-primary/20 group-hover:border-primary/30 transition-all duration-300 rounded-xl h-12"
                        />
                      </div>
                      <div className="flex-1 group">
                        <Label htmlFor="email-input" className="text-neutral-700 dark:text-neutral-300 font-medium mb-2 block">
                          Alamat Email
                        </Label>
                        <Input
                          id="email-input"
                          type="email"
                          placeholder="Masukkan email"
                          className="border-neutral-200 focus:border-primary/50 focus:ring-primary/20 group-hover:border-primary/30 transition-all duration-300 rounded-xl h-12"
                        />
                      </div>
                    </div>

                    <div className="w-full group">
                      <Label htmlFor="message-input" className="text-neutral-700 dark:text-neutral-300 font-medium mb-2 block">
                        Pesan
                      </Label>
                      <Textarea
                        id="message-input"
                        rows={8}
                        placeholder="Tulis pesan Anda"
                        className="resize-none border-neutral-200 focus:border-primary/50 focus:ring-primary/20 group-hover:border-primary/30 transition-all duration-300 rounded-xl"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="group bg-primary hover:bg-primary/90 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 px-8 py-3 text-lg font-semibold rounded-xl"
                    >
                      <span className="flex items-center gap-3">
                        📧 Kirim Pesan
                        <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform duration-300">
                          →
                        </div>
                      </span>
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactUs
