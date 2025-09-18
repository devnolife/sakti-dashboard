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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-white/20 dark:bg-neutral-900/80 dark:border-neutral-700/20 shadow-lg shadow-black/5">
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

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" asChild className="border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300">
              <Link href="/login">Masuk</Link>
            </Button>
            <Button asChild className="bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <Link href="/dashboard">Dashboard</Link>
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

      {/* Quick Info Bar */}
      <div className="bg-secondary/10 border-b border-secondary/20">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex items-center justify-between py-2 text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-neutral-600 dark:text-neutral-300">
                <Mail className="w-4 h-4 text-tertiary" />
                <span className="hidden sm:inline">info@ft-unismuh.ac.id</span>
              </div>
              <div className="flex items-center space-x-2 text-neutral-600 dark:text-neutral-300">
                <Phone className="w-4 h-4 text-secondary" />
                <span className="hidden sm:inline">(0411) 861543</span>
              </div>
            </div>
            <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20">
              Sistem Informasi Terintegrasi
            </Badge>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header