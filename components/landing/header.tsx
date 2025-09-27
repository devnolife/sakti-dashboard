'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Menu, X, GraduationCap, Users, BookOpen, Phone, Mail, Sparkles, Zap } from 'lucide-react'

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: 'Beranda', href: '#home', icon: '🏠' },
    { name: 'Fitur', href: '#features', icon: '⚡' },
    { name: 'Tim', href: '#team', icon: '👥' },
    { name: 'Kontak', href: '#contact-us', icon: '📧' }
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
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-transparent transition-all duration-500 bg-gradient-to-r from-primary via-primary/90 to-primary/80 bg-clip-text group-hover:from-primary/90 group-hover:to-primary">
                  SINTEKMu
                </span>
                <Sparkles className="w-4 h-4 transition-all duration-300 text-primary/60 group-hover:text-yellow-500 group-hover:animate-spin" />
              </div>
              <span className="hidden text-sm font-medium transition-colors duration-300 text-primary/70 dark:text-primary/60 sm:block group-hover:text-primary/80">
                Fakultas Teknik Unismuh
              </span>
            </div>
          </Link>

          {/* Modern Navigation with glass effect */}
          <nav className="items-center hidden px-2 py-2 space-x-2 border shadow-lg md:flex bg-white/20 backdrop-blur-md rounded-2xl border-white/30">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative group flex items-center space-x-2 text-neutral-600 hover:text-primary dark:text-neutral-300 dark:hover:text-primary transition-all duration-500 font-medium px-4 py-2.5 rounded-xl hover:bg-white/40 hover:backdrop-blur-md hover:shadow-md overflow-hidden"
              >
                <span className="text-lg">{item.icon}</span>
                <span className="relative z-10">{item.name}</span>
                <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-primary/10 to-primary/5 group-hover:opacity-100 rounded-xl"></div>
                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-primary/80 group-hover:w-full group-hover:left-0 transition-all duration-500"></div>
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

          {/* Modern Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative p-3 transition-all duration-300 border md:hidden rounded-2xl bg-white/20 backdrop-blur-md border-white/30 text-neutral-600 hover:text-neutral-900 hover:bg-white/40 dark:text-neutral-300 dark:hover:text-white dark:hover:bg-neutral-800/40 hover:scale-110 hover:shadow-lg group"
          >
            <div className="relative">
              {isMenuOpen ? (
                <X className="w-6 h-6 transition-transform duration-300 transform group-hover:rotate-180" />
              ) : (
                <Menu className="w-6 h-6 transition-transform duration-300 transform group-hover:scale-110" />
              )}
            </div>
            <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-primary/10 to-primary/5 group-hover:opacity-100 rounded-2xl"></div>
          </button>
        </div>

        {/* Enhanced Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute left-0 right-0 transition-all duration-500 ease-out transform border-t shadow-2xl md:hidden top-full bg-white/90 backdrop-blur-2xl border-primary/20 shadow-primary/20">
            <div className="px-4 py-6">
              <nav className="flex flex-col space-y-3">
                {navigation.map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center px-4 py-3 space-x-3 font-medium transition-all duration-300 text-neutral-600 hover:text-primary dark:text-neutral-300 dark:hover:text-primary rounded-xl hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5 hover:shadow-md group"
                    onClick={() => setIsMenuOpen(false)}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <span className="text-xl transition-transform duration-300 group-hover:scale-110">{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                ))}
                <div className="flex flex-col pt-4 space-y-3 border-t border-primary/20">
                  <Button variant="outline" asChild className="border-2 bg-white/40 backdrop-blur-md border-primary/30 hover:border-primary/60 hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5 rounded-xl">
                    <Link href="/login" className="flex items-center justify-center space-x-2">
                      <span>Masuk</span>
                    </Link>
                  </Button>
                  <Button asChild className="shadow-xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary hover:shadow-2xl hover:shadow-primary/30 rounded-xl">
                    <Link href="/dashboard" className="flex items-center justify-center space-x-2">
                      <Zap className="w-4 h-4" />
                      <span>Dashboard</span>
                    </Link>
                  </Button>
                </div>
              </nav>
            </div>
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
