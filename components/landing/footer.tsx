'use client'

import Link from 'next/link'
import { GraduationCap, Facebook, Instagram, Youtube } from 'lucide-react'

const Footer: React.FC = () => {
  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Features', href: '#features' },
    { name: 'Courses', href: '#courses' },
    { name: 'Testimonials', href: '#testimonials' }
  ]

  const contact = [
    { label: 'Email', value: 'support@ft-unismuh.ac.id', href: 'mailto:support@ft-unismuh.ac.id' },
    { label: 'Phone', value: '+1 234 567 890', href: 'tel:+12345678890' },
    { label: 'Address', value: '123 Learning Street, Makassar, Indonesia', href: '#' }
  ]

  const legal = [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Cookie Policy', href: '#' }
  ]

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/ft.unismuh', label: 'Facebook', bgColor: 'bg-[#0451d3]' },
    { icon: Instagram, href: 'https://instagram.com/ft.unismuh', label: 'Instagram', bgColor: 'bg-black' },
    { icon: Youtube, href: 'https://youtube.com/@ft.unismuh', label: 'Youtube', bgColor: 'bg-black' }
  ]

  return (
    <footer className="bg-white text-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="bg-[#0451d3]/10 p-1.5 rounded-lg">
                <GraduationCap className="w-8 h-8 text-[#0451d3]" />
              </div>
              <div>
                <div className="text-xl font-bold">
                  <span className="text-[#0451d3]">SINTEK</span>
                  <span className="text-[#101012]">Mu</span>
                </div>
              </div>
            </Link>
            <p className="text-[#101012] text-sm max-w-[240px]">
              Let's Talk About Your Future
            </p>

            {/* Social Media */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className={`${social.bgColor} rounded-lg w-8 h-8 flex items-center justify-center hover:scale-110 transition-transform duration-300`}
                >
                  <social.icon className="w-3 h-3 text-white" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-[#101012] font-semibold text-lg">
              Quick Links
            </h3>
            <div className="space-y-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-[#101012] text-sm hover:text-[#0451d3] transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-[#101012] font-semibold text-lg">
              Contact
            </h3>
            <div className="space-y-2">
              {contact.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block text-[#101012] text-sm hover:text-[#0451d3] transition-colors duration-300"
                >
                  {item.value}
                </Link>
              ))}
            </div>
          </div>

          {/* Legal & Policies */}
          <div className="space-y-4">
            <h3 className="text-[#101012] font-semibold text-lg">
              Legal & Policies
            </h3>
            <div className="space-y-2">
              {legal.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-[#101012] text-sm hover:text-[#0451d3] transition-colors duration-300"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-8 pt-4">
          <p className="text-[rgba(4,81,211,0.5)] text-sm">
            © 2025 SINTEKMu. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
