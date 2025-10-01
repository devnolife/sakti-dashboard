'use client'

import Link from 'next/link'
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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand Section - Enhanced and Clear */}
          <div className="space-y-5">
            <Link href="/" className="inline-block group">
              <div className="flex items-center space-x-3 mb-3">
                <div className="bg-gradient-to-br from-purple-600 to-cyan-600 p-3 rounded-2xl shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap className="w-10 h-10 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-black leading-tight">
                    <span className="text-red-600">SINTEK</span>
                    <span className="text-blue-600">Mu</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Slogan - Clear and Professional */}
            <div className="space-y-2">
              <p className="text-base font-bold text-gray-900 leading-tight">
                Sistem Informasi Terintegrasi
              </p>
              <p className="text-sm font-semibold text-purple-600 leading-relaxed">
                Fakultas Teknik<br />Universitas Muhammadiyah Makassar
              </p>
            </div>

            {/* Social Media - Modern with gradients */}
            <div className="flex gap-3 pt-2">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className={`bg-gradient-to-br ${social.gradient} rounded-xl w-11 h-11 flex items-center justify-center hover:scale-110 hover:shadow-xl transition-all duration-300 shadow-lg`}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-white" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links - Modern */}
          <div className="space-y-5">
            <h3 className="text-gray-900 font-black text-lg">
              Tautan Cepat
            </h3>
            <div className="space-y-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-gray-600 text-sm hover:text-purple-600 transition-colors duration-300 hover:translate-x-1 transform font-medium"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact - Modern with icons */}
          <div className="space-y-5">
            <h3 className="text-gray-900 font-black text-lg">
              Hubungi Kami
            </h3>
            <div className="space-y-4">
              {contact.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-start gap-3 text-gray-600 text-sm hover:text-purple-600 transition-colors duration-300 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-100 to-cyan-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <item.icon className="w-4 h-4 text-purple-600" />
                  </div>
                  <span className="font-medium leading-relaxed">{item.value}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Legal & Policies - Modern */}
          <div className="space-y-5">
            <h3 className="text-gray-900 font-black text-lg">
              Kebijakan
            </h3>
            <div className="space-y-3">
              {legal.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-gray-600 text-sm hover:text-purple-600 transition-colors duration-300 hover:translate-x-1 transform font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright - Modern with gradient divider */}
        <div className="mt-12 pt-8 border-t-2 border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm font-medium">
              © 2025 <span className="font-bold"><span className="text-red-600">SINTEK</span><span className="text-blue-600">Mu</span></span>. Semua hak dilindungi.
            </p>
            <p className="text-gray-500 text-xs">
              Fakultas Teknik Universitas Muhammadiyah Makassar
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
