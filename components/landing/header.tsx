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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled
      ? 'bg-white/80 backdrop-blur-2xl border-b border-primary/20 shadow-2xl shadow-primary/10'
      : 'bg-white/95 backdrop-blur-xl border-b border-primary/5 shadow-lg shadow-primary/5'
      } dark:bg-neutral-900/85 dark:border-neutral-700/20`}>
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="relative flex items-center justify-between h-20">
          {/* Enhanced Logo with modern glassmorphism */}
          <Link href="/" className="relative flex items-center space-x-4 group">
            <div className="relative">
              <div className="absolute transition-opacity duration-500 -inset-1 bg-gradient-to-r from-primary via-primary/80 to-secondary blur opacity-30 group-hover:opacity-60 rounded-2xl"></div>
              <div className="relative p-4 transition-all duration-700 border-2 bg-gradient-to-br from-primary/20 via-primary/15 to-primary/25 rounded-2xl border-primary/30 group-hover:border-primary/50 group-hover:shadow-2xl group-hover:shadow-primary/30 group-hover:scale-110 backdrop-blur-sm">
                <GraduationCap className="w-8 h-8 transition-all duration-700 text-primary group-hover:rotate-12 group-hover:text-primary/90" />
                <div className="absolute w-2 h-2 rounded-full top-1 right-1 bg-gradient-to-r from-yellow-400 to-orange-500 animate-pulse"></div>
              </div>
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

          {/* Modern CTA Buttons with advanced effects */}
          <div className="items-center hidden space-x-3 md:flex">
            <Button variant="outline" asChild className="relative overflow-hidden transition-all duration-500 border-2 group border-primary/30 hover:border-primary/60 bg-white/40 backdrop-blur-md hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5 hover:scale-105 hover:shadow-xl rounded-xl">
              <Link href="/login" className="relative z-10 flex items-center space-x-2">
                <span>Masuk</span>
                <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-primary/5 to-transparent group-hover:opacity-100"></div>
              </Link>
            </Button>
            <Button asChild className="relative overflow-hidden transition-all duration-500 border-0 shadow-xl group bg-gradient-to-r from-primary via-primary/95 to-primary/90 hover:from-primary/90 hover:via-primary hover:to-primary hover:shadow-2xl hover:shadow-primary/40 hover:scale-110 rounded-xl">
              <Link href="/dashboard" className="relative z-10 flex items-center space-x-2">
                <Zap className="w-4 h-4 group-hover:animate-bounce" />
                <span>Dashboard</span>
                <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-white/10 to-transparent group-hover:opacity-100"></div>
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

      {/* Ultra-modern Quick Info Bar */}
      <div className="border-b bg-gradient-to-r from-primary/12 via-primary/8 to-primary/12 border-primary/20 backdrop-blur-sm">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-between py-3 text-sm">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3 cursor-pointer text-primary/90 dark:text-primary/80 group">
                <div className="p-1.5 bg-primary/20 rounded-lg group-hover:bg-primary/30 transition-colors duration-300">
                  <Mail className="w-4 h-4 transition-transform duration-300 text-primary group-hover:scale-110" />
                </div>
                <span className="hidden font-medium transition-colors duration-300 sm:inline group-hover:text-primary">info@ft-unismuh.ac.id</span>
              </div>
              <div className="flex items-center space-x-3 cursor-pointer text-primary/90 dark:text-primary/80 group">
                <div className="p-1.5 bg-primary/20 rounded-lg group-hover:bg-primary/30 transition-colors duration-300">
                  <Phone className="w-4 h-4 transition-transform duration-300 text-primary group-hover:scale-110" />
                </div>
                <span className="hidden font-medium transition-colors duration-300 sm:inline group-hover:text-primary">(0411) 861543</span>
              </div>
            </div>
            <Badge variant="secondary" className="relative overflow-hidden text-sm font-semibold bg-gradient-to-r from-primary/20 via-primary/15 to-primary/20 text-primary border-2 border-primary/30 hover:border-primary/50 hover:shadow-lg transition-all duration-500 rounded-full px-4 py-1.5 group cursor-pointer">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 animate-pulse"></div>
                <span>Sistem Informasi Terintegrasi</span>
                <Sparkles className="w-4 h-4 transition-all duration-300 text-primary/70 group-hover:text-yellow-500 group-hover:animate-spin" />
              </div>
              <div className="absolute inset-0 transition-opacity duration-500 transform translate-x-full -skew-x-12 opacity-0 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:opacity-100 group-hover:translate-x-0"></div>
            </Badge>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
