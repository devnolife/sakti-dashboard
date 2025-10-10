'use client'

import Link from 'next/link'
import Image from 'next/image'
import { GraduationCap, Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react'

const Footer: React.FC = () => {
  const quickLinks = [
    { name: 'Beranda', href: '#home' },
    { name: 'Tentang Kami', href: '#about' },
    { name: 'Fitur', href: '#features' },
    { name: 'Program Studi', href: '#courses' },
    { name: 'Berita', href: '#news' },
    { name: 'Testimoni', href: '#testimonials' }
  ]

  const contact = [
    { label: 'Email', value: 'ft@unismuh.ac.id', href: 'mailto:ft@unismuh.ac.id', icon: Mail },
    { label: 'Telepon', value: '+62 411 865 545', href: 'tel:+62411865545', icon: Phone },
    { label: 'Alamat', value: 'Jl. Sultan Alauddin No.259, Makassar', href: '#', icon: MapPin }
  ]

  const legal = [
    { name: 'Kebijakan Privasi', href: '#' },
    { name: 'Syarat & Ketentuan', href: '#' },
    { name: 'Kebijakan Cookie', href: '#' }
  ]

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/ft.unismuh', label: 'Facebook', gradient: 'from-blue-600 to-blue-700' },
    { icon: Instagram, href: 'https://instagram.com/ft.unismuh', label: 'Instagram', gradient: 'from-pink-600 to-purple-600' },
    { icon: Youtube, href: 'https://youtube.com/@ft.unismuh', label: 'Youtube', gradient: 'from-red-600 to-red-700' }
  ]

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-white text-gray-900 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-500/5 via-cyan-500/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tr from-cyan-500/5 via-purple-500/5 to-transparent rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_2fr] gap-8 md:gap-12 lg:gap-16">

          {/* Brand Section - Enhanced and Clear */}
          <div className="space-y-4 md:space-y-5">
            <Link href="/" className="inline-block group">
              <div className="flex items-center space-x-2 md:space-x-3 mb-2 md:mb-3">
                <div className="group-hover:scale-110 transition-transform duration-300">
                  <Image
                    src="/logo/logo.png"
                    alt="SintekMu Logo"
                    width={48}
                    height={48}
                    className="object-contain md:w-14 md:h-14"
                  />
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-black leading-tight">
                    <span className="text-red-600">SINTEK</span>
                    <span className="text-blue-600">Mu</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Slogan - Clear and Professional */}
            <div className="space-y-1.5 md:space-y-2">
              <p className="text-sm md:text-base font-bold text-gray-900 leading-tight">
                Sistem Informasi Terintegrasi
              </p>
              <p className="text-xs md:text-sm font-semibold leading-relaxed">
                <span className="text-red-600">Fakultas Teknik</span><br />
                <span className="text-blue-600">Universitas Muhammadiyah Makassar</span>
              </p>
            </div>

            {/* Social Media - Modern with gradients */}
            <div className="flex gap-2 md:gap-3 pt-1 md:pt-2">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className={`bg-gradient-to-br ${social.gradient} rounded-lg md:rounded-xl w-10 h-10 md:w-11 md:h-11 flex items-center justify-center hover:scale-110 hover:shadow-xl transition-all duration-300 shadow-lg`}
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links - Modern */}
          <div className="space-y-4 md:space-y-5">
            <h3 className="text-gray-900 font-black text-base md:text-lg">
              Tautan Cepat
            </h3>
            <div className="space-y-2 md:space-y-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-gray-600 text-xs md:text-sm hover:text-purple-600 transition-colors duration-300 hover:translate-x-1 transform font-medium"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact - Modern with icons */}
          <div className="space-y-4 md:space-y-5">
            <h3 className="text-gray-900 font-black text-base md:text-lg">
              Hubungi Kami
            </h3>
            <div className="space-y-3 md:space-y-4">
              {contact.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-start gap-2 md:gap-3 text-gray-600 text-xs md:text-sm hover:text-purple-600 transition-colors duration-300 group"
                >
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-gradient-to-br from-purple-100 to-cyan-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <item.icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-purple-600" />
                  </div>
                  <span className="font-medium leading-relaxed">{item.value}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Legal & Policies - Modern */}
          <div className="space-y-4 md:space-y-5">
            <h3 className="text-gray-900 font-black text-base md:text-lg">
              Kebijakan
            </h3>
            <div className="space-y-2 md:space-y-3">
              {legal.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-gray-600 text-xs md:text-sm hover:text-purple-600 transition-colors duration-300 hover:translate-x-1 transform font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Photo Section - Right Side */}
          <div className="hidden lg:flex items-end justify-end -mr-8 lg:-mr-12 -mb-12">
            <Image
              src="/landing/footer.png"
              alt="Fakultas Teknik"
              width={1000}
              height={1000}
              className="w-full h-auto max-w-none"
            />
          </div>
        </div>

        {/* Copyright - Modern with gradient divider */}
        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t-2 border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
            <p className="text-gray-600 text-xs md:text-sm font-medium text-center md:text-left">
              © 2025 <span className="font-bold"><span className="text-red-600">SINTEK</span><span className="text-blue-600">Mu</span></span>. Semua hak dilindungi.
            </p>
            <div className="flex flex-col items-center md:items-end gap-0.5 md:gap-1">
              <p className="text-gray-500 text-[10px] md:text-xs text-center md:text-right">
                Fakultas Teknik Universitas Muhammadiyah Makassar
              </p>
              <p className="text-gray-500 text-[10px] md:text-xs text-center md:text-right">
                Created by <Link href="https://github.com/devnolife" target="_blank" rel="noopener noreferrer" className="text-blue-900 font-semibold hover:text-blue-700 transition-colors">devnolife</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
