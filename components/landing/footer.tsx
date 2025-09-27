'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { GraduationCap, MapPin, Phone, Mail, Facebook, Instagram, Youtube, Linkedin } from 'lucide-react'

const Footer: React.FC = () => {
  const quickLinks = [
    { name: 'Beranda', href: '/' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Login', href: '/login' },
    { name: 'Kontak', href: '#contact-us' }
  ]

  const services = [
    { name: 'Sistem Akademik', href: '/dashboard/mahasiswa' },
    { name: 'Pembayaran Online', href: '/dashboard/mahasiswa/payment' },
    { name: 'Surat Menyurat', href: '/dashboard/mahasiswa/correspondence' },
    { name: 'Laboratorium', href: '/dashboard/mahasiswa/laboratory' }
  ]

  const departments = [
    { name: 'Teknik Informatika', href: '#' },
    { name: 'Teknik Sipil', href: '#' },
    { name: 'Teknik Elektro', href: '#' },
    { name: 'Teknik Mesin', href: '#' },
    { name: 'Teknik Industri', href: '#' }
  ]

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/ft.unismuh', label: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com/ft.unismuh', label: 'Instagram' },
    { icon: Youtube, href: 'https://youtube.com/@ft.unismuh', label: 'Youtube' },
    { icon: Linkedin, href: 'https://linkedin.com/school/ft-unismuh', label: 'LinkedIn' }
  ]

  return (
    <footer className="relative bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white overflow-hidden">
      {/* Enhanced Background Elements with #3674B5 */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary/15 to-primary/8 rounded-full blur-3xl opacity-60" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-primary/12 to-primary/6 rounded-full blur-3xl opacity-60" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-primary/5 via-transparent to-primary/8 rounded-full blur-3xl opacity-40" />

      {/* Newsletter Section */}
      <div className="relative border-b border-neutral-700/50 backdrop-blur-sm">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left group">
              <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-white to-primary/90 bg-clip-text text-transparent group-hover:from-primary group-hover:to-primary/80 transition-all duration-500">
                Tetap Terhubung
              </h3>
              <p className="text-neutral-300 text-lg leading-relaxed group-hover:text-neutral-200 transition-colors duration-300">
                Dapatkan informasi terbaru tentang sistem dan layanan Fakultas Teknik
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto lg:min-w-[450px] group">
              <Input
                type="email"
                placeholder="Masukkan email Anda"
                className="bg-neutral-800/50 backdrop-blur-sm border-neutral-600 hover:border-primary/40 text-white placeholder-neutral-400 flex-1 h-12 rounded-xl focus:border-primary/50 focus:ring-primary/20 group-hover:border-primary/30 transition-all duration-300"
              />
              <Button className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary whitespace-nowrap px-8 py-3 rounded-xl shadow-lg hover:shadow-xl hover:shadow-primary/30 transition-all duration-500 hover:scale-110 font-semibold">
                🚀 Berlangganan
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Section */}
          <div className="lg:col-span-2 group">
            <Link href="/" className="flex items-center space-x-4 mb-8 group-hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-br from-primary/25 to-primary/15 p-4 rounded-2xl border-2 border-primary/30 group-hover:border-primary/50 group-hover:shadow-xl group-hover:shadow-primary/20 transition-all duration-500">
                <GraduationCap className="w-12 h-12 text-primary group-hover:rotate-12 transition-transform duration-500" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-3xl bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">SINTEKMu</span>
                <span className="text-neutral-300 font-medium">Fakultas Teknik Unismuh</span>
              </div>
            </Link>
            <p className="text-neutral-300 mb-8 max-w-md leading-relaxed text-lg">
              Sistem Informasi Terintegrasi Fakultas Teknik Universitas Muhammadiyah Makassar.
              Platform digital untuk mengelola seluruh aspek akademik dan administrasi fakultas.
            </p>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-start space-x-4 group/contact">
                <div className="bg-primary/10 p-2 rounded-lg group-hover/contact:bg-primary/20 transition-colors duration-300">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                </div>
                <span className="text-neutral-300 group-hover/contact:text-white transition-colors duration-300">
                  Jl. Sultan Alauddin No. 259, Makassar, Sulawesi Selatan 90221
                </span>
              </div>
              <div className="flex items-center space-x-4 group/contact">
                <div className="bg-secondary/10 p-2 rounded-lg group-hover/contact:bg-secondary/20 transition-colors duration-300">
                  <Phone className="w-5 h-5 text-secondary flex-shrink-0" />
                </div>
                <span className="text-neutral-300 group-hover/contact:text-white transition-colors duration-300">(0411) 861543</span>
              </div>
              <div className="flex items-center space-x-4 group/contact">
                <div className="bg-primary/10 p-2 rounded-lg group-hover/contact:bg-primary/20 transition-colors duration-300">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                </div>
                <span className="text-neutral-300 group-hover/contact:text-white transition-colors duration-300">info@ft-unismuh.ac.id</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="group">
            <h4 className="font-bold text-xl mb-6 text-white group-hover:text-primary transition-colors duration-300">Menu Utama</h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-neutral-300 hover:text-primary transition-all duration-300 hover:translate-x-2 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="group">
            <h4 className="font-bold text-xl mb-6 text-white group-hover:text-primary transition-colors duration-300">Layanan</h4>
            <ul className="space-y-4">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-neutral-300 hover:text-primary transition-all duration-300 hover:translate-x-2 inline-block"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Departments */}
          <div className="group">
            <h4 className="font-bold text-xl mb-6 text-white group-hover:text-primary transition-colors duration-300">Program Studi</h4>
            <ul className="space-y-4">
              {departments.map((dept) => (
                <li key={dept.name}>
                  <Link
                    href={dept.href}
                    className="text-neutral-300 hover:text-primary transition-all duration-300 hover:translate-x-2 inline-block"
                  >
                    {dept.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media */}
        <div className="mt-16 pt-8 border-t border-neutral-700/50">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-8">
            <p className="text-neutral-400 text-center sm:text-left">
              © 2024 Fakultas Teknik Universitas Muhammadiyah Makassar. All rights reserved.
            </p>

            <div className="flex items-center space-x-6">
              <span className="text-neutral-300 font-medium">Ikuti Kami:</span>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    className="group bg-neutral-800/50 hover:bg-primary p-3 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg backdrop-blur-sm border border-neutral-700 hover:border-primary/50"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 group-hover:text-white transition-colors duration-300" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Additional Info */}
        <div className="mt-12 pt-8 border-t border-neutral-700/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group p-6 rounded-2xl bg-neutral-800/30 backdrop-blur-sm border border-neutral-700/50 hover:border-primary/30 transition-all duration-500 hover:scale-105">
              <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <div className="w-8 h-8 bg-primary rounded-lg group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <h5 className="font-bold text-primary mb-2 text-lg">Terakreditasi</h5>
              <p className="text-neutral-300">BAN-PT Unggul</p>
            </div>
            <div className="text-center group p-6 rounded-2xl bg-neutral-800/30 backdrop-blur-sm border border-neutral-700/50 hover:border-primary/30 transition-all duration-500 hover:scale-105">
              <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <div className="w-8 h-8 bg-primary rounded-lg group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <h5 className="font-bold text-primary mb-2 text-lg">ISO Certified</h5>
              <p className="text-neutral-300">ISO 9001:2015</p>
            </div>
            <div className="text-center group p-6 rounded-2xl bg-neutral-800/30 backdrop-blur-sm border border-neutral-700/50 hover:border-primary/30 transition-all duration-500 hover:scale-105">
              <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <div className="w-8 h-8 bg-primary rounded-lg group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <h5 className="font-bold text-primary mb-2 text-lg">24/7 Support</h5>
              <p className="text-neutral-300">Layanan Teknis</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
