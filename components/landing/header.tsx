'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Menu, X, GraduationCap, Users, BookOpen, Phone, Mail } from 'lucide-react'

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = [
    { name: 'Beranda', href: '#home' },
    { name: 'Fitur', href: '#features' },
    { name: 'Tim', href: '#team' },
    { name: 'Kontak', href: '#contact-us' }
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-white/95 via-lavender-50/30 to-white/95 backdrop-blur-xl border-b border-white/30 dark:bg-gradient-to-r dark:from-neutral-900/90 dark:via-slate-900/40 dark:to-neutral-900/90 dark:border-neutral-700/20 shadow-lg shadow-lavender-200/10">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="bg-primary/10 p-3 rounded-xl border border-primary/20 group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
              <GraduationCap className="w-8 h-8 text-primary group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl text-primary">
                SINTEKMu
              </span>
              <span className="text-xs text-neutral-600 dark:text-neutral-300 hidden sm:block font-medium">
                Fakultas Teknik Unismuh
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative text-neutral-600 hover:text-primary dark:text-neutral-300 dark:hover:text-primary transition-all duration-300 font-medium px-3 py-2 rounded-lg hover:bg-primary/5 group"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Modern CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" asChild className="group border-2 border-secondary-alt/30 text-secondary-alt hover:border-secondary-alt/60 hover:bg-gradient-to-r hover:from-lavender-50/30 hover:to-mint-50/30 transition-all duration-500 hover:scale-105 rounded-xl backdrop-blur-sm shadow-lg shadow-lavender-200/10">
              <Link href="/login" className="font-semibold">Masuk</Link>
            </Button>
            <Button asChild className="group bg-gradient-to-r from-secondary to-secondary-alt hover:from-secondary/90 hover:to-secondary-alt/90 shadow-lg shadow-secondary/20 hover:shadow-xl hover:shadow-secondary/30 transition-all duration-500 hover:scale-105 rounded-xl font-semibold">
              <Link href="/dashboard" className="flex items-center gap-2">
                <span>Dashboard</span>
                <div className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform duration-300 text-xs">
                  →
                </div>
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:text-white dark:hover:bg-neutral-800"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-neutral-200 dark:border-neutral-800 py-4">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-neutral-600 hover:text-primary dark:text-neutral-300 dark:hover:text-primary transition-colors font-medium px-2 py-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                <Button variant="outline" asChild>
                  <Link href="/login">Masuk</Link>
                </Button>
                <Button asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>

      {/* Modern Quick Info Bar */}
      <div className="bg-gradient-to-r from-lavender-50/40 via-mint-50/30 to-peach-50/40 border-b border-white/30 backdrop-blur-sm">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex items-center justify-between py-3 text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-slate-600 dark:text-neutral-300">
                <Mail className="w-4 h-4 text-secondary" />
                <span className="hidden sm:inline font-medium">info@ft-unismuh.ac.id</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600 dark:text-neutral-300">
                <Phone className="w-4 h-4 text-secondary-alt" />
                <span className="hidden sm:inline font-medium">(0411) 861543</span>
              </div>
            </div>
            <div className="bg-gradient-to-r from-secondary/10 to-secondary-alt/10 px-4 py-2 rounded-full border border-white/30 backdrop-blur-sm shadow-lg shadow-lavender-200/10">
              <span className="text-xs font-semibold bg-gradient-to-r from-secondary to-secondary-alt bg-clip-text text-transparent">
                Sistem Informasi Terintegrasi
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header