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
    <section id="contact-us" className="relative py-16 bg-gradient-to-br from-white via-slate-50/20 to-mint-50/30 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 overflow-hidden" ref={ref}>
      {/* Ultra Modern Background Elements */}
      <div className="absolute rounded-full top-12 right-12 w-64 h-64 bg-gradient-to-br from-slate-100/30 to-secondary/10 blur-3xl animate-pulse" />
      <div className="absolute delay-1000 rounded-full bottom-12 left-12 w-56 h-56 bg-gradient-to-tr from-mint-100/25 to-secondary-alt/10 blur-3xl animate-pulse" />

      <div className="relative flex flex-col gap-8 px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center gap-y-4">
          {/* Modern Floating Badge */}
          <div className="inline-flex items-center px-4 py-2 text-xs font-bold text-transparent transition-all duration-500 border rounded-full shadow-lg bg-gradient-to-r from-slate-100/70 to-mint-100/70 backdrop-blur-xl border-white/40 from-secondary to-secondary-alt bg-clip-text shadow-slate-200/20 hover:shadow-xl hover:shadow-slate-200/30 animate-float hover:scale-105">
            📞 Hubungi Kami
          </div>

          <div className="flex flex-col flex-wrap items-center justify-center gap-y-3">
            <div className="flex items-center gap-x-2">
              <h2 className="text-2xl font-extrabold leading-tight text-center text-neutral-900 dark:text-white lg:text-3xl">
                <span className="relative z-[1] bg-gradient-to-r from-neutral-900 to-neutral-600 bg-clip-text text-transparent dark:from-white dark:to-gray-300">
                  Mari bekerja
                  <img
                    src="/images/front-pages/landing-page/bg-shape.png"
                    alt="bg-shape"
                    className="absolute bottom-0 z-[1] h-[40%] w-[132%] -left-[19%] top-[17px]"
                  />
                </span>{' '}
                <span className="text-primary">
                  sama
                </span>
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-relaxed text-center text-neutral-600 dark:text-neutral-300">
              Ada pertanyaan atau saran? Kirimkan pesan kepada kami dan mari wujudkan digitalisasi akademik bersama.
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="lg:pl-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
            {/* Contact Info Card */}
            <div className="md:col-span-5">
              <div className="relative group">
                <div className="relative p-6 overflow-hidden transition-all duration-700 border-0 shadow-lg rounded-3xl bg-white/80 backdrop-blur-xl hover:shadow-2xl">
                  {/* Animated border effect */}
                  <div className="absolute inset-0 transition-opacity duration-700 opacity-0 bg-primary group-hover:opacity-20 blur-sm rounded-3xl" />

                  {/* Decorative border image - updated positioning */}
                  <img
                    src="/images/front-pages/landing-page/contact-border.png"
                    className="absolute -top-[5%] -left-[6%] max-w-full max-lg:hidden opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                    alt="contact-border"
                    width="150"
                  />

                  {/* Customer service image with modern effects */}
                  <div className="relative mb-6 overflow-hidden transition-transform duration-700 rounded-2xl group-hover:scale-105">
                    <img
                      src="/images/front-pages/landing-page/customer-service.png"
                      alt="customer-service"
                      className="w-full transition-all duration-700 rounded-2xl filter group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 transition-opacity duration-700 opacity-0 bg-gradient-to-t from-primary/10 to-transparent group-hover:opacity-100" />
                  </div>

                  {/* Contact Information */}
                  <div className="relative z-10 flex flex-wrap justify-between gap-6">
                    <div className="flex gap-4 group/item">
                      <Avatar className="w-12 h-12 transition-transform duration-300 group-hover/item:scale-110">
                        <AvatarFallback className="border bg-gradient-to-br from-primary/20 to-primary/10 text-primary border-primary/20">
                          <Mail className="w-5 h-5" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Email</p>
                        <p className="font-semibold transition-colors duration-300 text-neutral-900 dark:text-white group-hover/item:text-primary">
                          info@ft-unismuh.ac.id
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 group/item">
                      <Avatar className="w-12 h-12 transition-transform duration-300 group-hover/item:scale-110">
                        <AvatarFallback className="border bg-primary/20 text-primary border-primary/20">
                          <Phone className="w-5 h-5" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Telepon</p>
                        <p className="font-semibold transition-colors duration-300 text-neutral-900 dark:text-white group-hover/item:text-primary">
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
              <Card className="overflow-hidden transition-all duration-700 border-0 shadow-lg bg-white/80 backdrop-blur-xl hover:shadow-2xl rounded-3xl">
                <CardContent className="p-8">
                  <div className="flex flex-col mb-8 gap-y-2">
                    <h3 className="text-3xl font-bold text-primary">
                      Kirim Pesan
                    </h3>
                    <p className="leading-relaxed text-neutral-600 dark:text-neutral-300">
                      Jika Anda ingin bertanya tentang sistem, kerjasama, layanan akademik, atau memiliki saran,
                      silakan kirimkan pesan kepada kami.
                    </p>
                  </div>

                  <form className="flex flex-col items-start gap-8">
                    <div className="flex w-full gap-6">
                      <div className="flex-1 group">
                        <Label htmlFor="name-input" className="block mb-2 font-medium text-neutral-700 dark:text-neutral-300">
                          Nama Lengkap
                        </Label>
                        <Input
                          id="name-input"
                          placeholder="Masukkan nama lengkap"
                          className="h-12 transition-all duration-300 border-neutral-200 focus:border-primary/50 focus:ring-primary/20 group-hover:border-primary/30 rounded-xl"
                        />
                      </div>
                      <div className="flex-1 group">
                        <Label htmlFor="email-input" className="block mb-2 font-medium text-neutral-700 dark:text-neutral-300">
                          Alamat Email
                        </Label>
                        <Input
                          id="email-input"
                          type="email"
                          placeholder="Masukkan email"
                          className="h-12 transition-all duration-300 border-neutral-200 focus:border-primary/50 focus:ring-primary/20 group-hover:border-primary/30 rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="w-full group">
                      <Label htmlFor="message-input" className="block mb-2 font-medium text-neutral-700 dark:text-neutral-300">
                        Pesan
                      </Label>
                      <Textarea
                        id="message-input"
                        rows={8}
                        placeholder="Tulis pesan Anda"
                        className="transition-all duration-300 resize-none border-neutral-200 focus:border-primary/50 focus:ring-primary/20 group-hover:border-primary/30 rounded-xl"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="px-8 py-3 text-lg font-semibold transition-all duration-500 shadow-lg group bg-primary hover:bg-primary/90 hover:shadow-2xl hover:scale-105 rounded-xl"
                    >
                      <span className="flex items-center gap-3">
                        📧 Kirim Pesan
                        <div className="flex items-center justify-center w-6 h-6 transition-transform duration-300 rounded-full bg-white/20 group-hover:translate-x-1">
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
